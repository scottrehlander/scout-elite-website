/* Breakaway — top-down deke dodger. You rush up ice, backcheckers hunt
   you from the top of the screen and commit to the hit. Deke late.
   Prototype for the hidden Scout Elite Arcade. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var W = 360, H = 520;
  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);

  /* ---- tuning ---- */
  var BOARD_W = 14;
  var PLAYER_Y = 410;
  var PLAYER_R = 11;
  var DEF_R = 12;
  var HIT_DIST = 20;          // collision distance (radii sum minus forgiveness)
  var BASE_SPEED = 250;       // world scroll px/s
  var RAMP = 4.5;             // world speed gain per second
  var MAX_SPEED = 620;
  var DEKE_VX = 680;          // deke burst velocity
  var DEKE_DECAY = 12;        // how fast the burst bleeds off
  var DEKE_COOLDOWN = 0.05;   // just a double-fire guard, dekes chain freely
  var COMMIT_DIST = 150;      // defender locks his line this far above you
  var STEER_BASE = 95;        // tracking lateral speed at base world speed
  var STEER_MAX = 185;        // tracking lateral speed at max world speed
  var LUNGE_MAX_BASE = 250;   // committed lateral lunge cap, ramps with speed
  var LUNGE_MAX_TOP = 330;
  var SPAWN_MAX = 5;
  var PAIRS_AFTER = 250;      // meters before defender gates appear
  var PAIR_CHANCE = 0.25;
  var PAIR_HALF_GAP = 72;     // half distance between gate defenders

  /* defender archetypes: big slow bodies, regulars, and burners */
  var DEF_TYPES = [
    { w: 0.30, mul: 0.78, r: 13.5, agility: 0.85 }, // plodder
    { w: 0.45, mul: 1.00, r: 12.0, agility: 1.00 }, // regular
    { w: 0.25, mul: 1.28, r: 10.5, agility: 1.20 }  // burner
  ];
  // attackers close at the same rate no matter the level: your reaction
  // window stays constant, levels add pressure via density and tracking
  var DEF_CLOSING = BASE_SPEED * 0.55 + 130;
  /* levels: survive the stretch, finish on the goalie, ramp and repeat */
  var LEVEL_LEN = 600;        // meters of open ice before the goalie showdown
  var GOAL_PTS = 50;          // scoring on the breakaway
  var GOALIE_R = 13;
  var GOALIE_STEER = 150;     // lateral tracking, +15 per level
  var GOALIE_LUNGE = 280;     // dive speed cap, +15 per level
  var SHOT_TTI = 0.15;        // the shot releases this close to the net
  var OPEN_GAP = 28;          // lateral daylight needed at release to score
  var SAVE_LINES = ['Glove save.', 'Blocker. Robbed.', 'Pads. Denied.', 'He read it all the way.'];
  var LEVEL_SPEED_STEP = 50;  // world speed floor bump per level
  var LEVEL_SPAWN_TIGHTEN = 0.95; // spawn interval multiplier per level

  var PASS_PTS = 5;           // every defender you beat
  var NEAR_MISS_X = 46;       // close shave without a tagged deke
  var NEAR_MISS_BONUS = 5;
  var MILESTONE_BUMP = 5;

  /* trick dekes: the later you leave it (time-to-impact when you tapped),
     the flashier the move and the bigger the bonus. The ring on a defender
     uses the same windows: green = slick, gold = epic. */
  var TRICK_EPIC_TTI = 0.5;   // seconds from getting hit
  var TRICK_SLICK_TTI = 0.85;
  var TRICK_EPIC_PTS = 30;
  var TRICK_SLICK_PTS = 15;
  var TRICK_THREAT_X = 40;    // defender counts as a threat if his line hits this close
  var EPIC_MOVES = [
    { kind: 'spin', name: 'SPINORAMA!' },
    { kind: 'legs', name: 'THROUGH THE LEGS!' },
    { kind: 'understick', name: 'UNDER THE STICK!' },
    { kind: 'nutmeg', name: 'NUTMEG!' },
    { kind: 'heel', name: 'HEEL-TO-HEEL!' },
    { kind: 'tuck', name: 'ONE-HAND TUCK!' },
    { kind: 'datsyuk', name: 'DATSYUK DOUBLE TOUCH!' },
    { kind: 'legsfake', name: 'BETWEEN-THE-LEGS FAKE!' }
  ];
  var SLICK_MOVES = [
    { kind: 'toedrag', name: 'Toe drag' },
    { kind: 'shimmy', name: 'Head fake' },
    { kind: 'fakeshot', name: 'Fake shot' },
    { kind: 'f2b', name: 'Forehand to backhand' },
    { kind: 'b2f', name: 'Backhand to forehand' },
    { kind: 'poke', name: 'Offensive poke check' },
    { kind: 'power', name: 'Power move' },
    { kind: 'chip', name: 'Chip and chase' },
    { kind: 'faketoedrag', name: 'Fake toe drag' }
  ];

  var MIN_X = BOARD_W + PLAYER_R + 2;
  var MAX_X = W - BOARD_W - PLAYER_R - 2;

  var BEST_KEY = 'breakaway-score';
  var scoreEl = document.getElementById('score');
  var distEl = document.getElementById('dist');
  var levelEl = document.getElementById('level');
  var bestEl = document.getElementById('best');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayControls = document.getElementById('overlay-controls');
  var overlayBtn = document.getElementById('overlay-btn');

  var state = 'idle'; // idle | playing | howto | over
  var howtoShown = false; // the goalie explainer, once per page load
  var howtoAt = 0;        // when it appeared; dismissable after 0.5s
  var speed, dist, worldPos, spawnTimer, nextMilestone;
  var score, beaten;
  var level, levelStart, phase, net, goalie, levelupT; // phase: run | showdown | levelup
  var shot; // the showdown release in flight, null otherwise
  var player, defenders, particles, floaters;
  var arrowFlash = { '-1': 0, '1': 0 }; // tap-zone chevrons light up on use

  bestEl.textContent = Arcade.best(BEST_KEY);

  /* static ice speckle */
  var speckles = [];
  for (var s = 0; s < 40; s++) {
    speckles.push({ x: BOARD_W + Math.random() * (W - BOARD_W * 2), y0: Math.random() * H });
  }

  function ramp01() { return (speed - BASE_SPEED) / (MAX_SPEED - BASE_SPEED); }

  function reset() {
    speed = BASE_SPEED;
    dist = 0;
    worldPos = 0;
    spawnTimer = 1.1;
    nextMilestone = 100;
    score = 0;
    beaten = 0;
    level = 1;
    levelStart = 0;
    phase = 'run';
    net = null;
    goalie = null;
    shot = null;
    levelupT = 0;
    player = { x: W / 2, vx: 0, cooldown: 0, lean: 0, trick: null };
    defenders = [];
    particles = [];
    floaters = [];
    scoreEl.textContent = '0';
    distEl.textContent = '0';
    levelEl.textContent = '1';
  }

  function start() {
    reset();
    state = 'playing';
    overlay.hidden = true;
    overlay.style.background = '';
  }

  function resume() {
    state = 'playing';
    overlay.hidden = true;
    overlay.style.background = '';
  }

  function gameOver() {
    state = 'over';
    Arcade.trackDone('breakaway', { score: score, level: level, beaten: beaten, meters: Math.floor(dist) });
    var newBest = Arcade.saveBest(BEST_KEY, score);
    bestEl.textContent = Arcade.best(BEST_KEY);
    overlayControls.hidden = true;
    overlayTitle.textContent = 'Lined up and finished';
    overlayMsg.textContent = (newBest ? 'New best: ' : '')
      + score + ' points. Level ' + level + ', ' + beaten + ' defenders beaten over ' + Math.floor(dist) + ' m.'
      + (newBest ? '' : ' Best is ' + Arcade.best(BEST_KEY) + '.');
    overlayBtn.textContent = 'Another rush';
    overlay.hidden = false;
    Arcade.vibrate(60);
  }

  function addScore(pts) {
    score += pts;
    scoreEl.textContent = String(score);
  }

  function deke(dir) {
    if (state !== 'playing' || player.cooldown > 0) return;
    Arcade.trackPlay('breakaway');
    player.vx = dir * DEKE_VX;
    player.cooldown = DEKE_COOLDOWN;
    player.lean = dir;
    player.trick = null;
    player.dekeDir = dir;
    arrowFlash[String(dir)] = 0.25;
    Arcade.vibrate(10);

    // tag every committed defender that was genuinely about to hit us:
    // his time-to-impact right now decides how flashy the escape gets
    for (var t = 0; t < defenders.length; t++) {
      var d = defenders[t];
      if (d.gate || d.missed || d.y >= PLAYER_Y) continue;
      var tti = (PLAYER_Y - d.y) / d.vy;
      var impactX = d.x + d.vx * tti;
      if (Math.abs(impactX - player.x) < TRICK_THREAT_X) {
        d.dekeTti = (d.dekeTti === undefined) ? tti : Math.min(d.dekeTti, tti);
      }
    }

    // same for the goalie on a showdown
    if (goalie && !shot && phase === 'showdown' && goalie.y < PLAYER_Y) {
      var gtti = (PLAYER_Y - goalie.y) / (speed * 0.55);
      var gImpactX = goalie.x + (goalie.committed ? goalie.vx * gtti : 0);
      if (Math.abs(gImpactX - player.x) < TRICK_THREAT_X) {
        goalie.dekeTti = (goalie.dekeTti === undefined) ? gtti : Math.min(goalie.dekeTti, gtti);
      }
    }
    for (var i = 0; i < 6; i++) {
      particles.push({
        x: player.x - dir * 8, y: PLAYER_Y + 6 + Math.random() * 6,
        vx: -dir * (60 + Math.random() * 120), vy: 20 + Math.random() * 60,
        t: 0, life: 0.3 + Math.random() * 0.2
      });
    }
  }

  function spawnDefender() {
    // bias spawns toward the player so tracking starts honest
    var x = player.x + (Math.random() * 2 - 1) * 130;
    x = Math.max(MIN_X + 10, Math.min(MAX_X - 10, x));

    // roll an archetype by weight
    var roll = Math.random(), type = DEF_TYPES[DEF_TYPES.length - 1];
    for (var i = 0, acc = 0; i < DEF_TYPES.length; i++) {
      acc += DEF_TYPES[i].w;
      if (roll < acc) { type = DEF_TYPES[i]; break; }
    }

    defenders.push({
      x: x, y: -30,
      vx: 0,
      vy: DEF_CLOSING * type.mul,
      r: type.r, agility: type.agility, fast: type.mul > 1.1,
      committed: false, gate: false, missed: false
    });
  }

  function spawnGate() {
    var cx = MIN_X + 60 + Math.random() * (MAX_X - MIN_X - 120);
    var vy = DEF_CLOSING - 20;
    [-1, 1].forEach(function (side) {
      defenders.push({
        x: cx + side * PAIR_HALF_GAP, y: -30,
        vx: 0, vy: vy,
        committed: true, gate: true, missed: false
      });
    });
  }

  function update(dt) {
    if (state !== 'playing') return;

    speed = Math.min(speed + RAMP * dt, MAX_SPEED);
    dist += speed * dt / 10;
    worldPos += speed * dt;
    distEl.textContent = String(Math.floor(dist));

    if (dist >= nextMilestone) {
      floaters.push({ x: W / 2, y: 180, text: nextMilestone + ' m', t: 0, life: 0.9, color: C.accentHover, size: 26 });
      nextMilestone += 100;
      speed = Math.min(speed + MILESTONE_BUMP, MAX_SPEED);
    }

    // player
    player.x += player.vx * dt;
    player.vx -= player.vx * DEKE_DECAY * dt;
    if (Math.abs(player.vx) < 8) player.vx = 0;
    if (player.x < MIN_X) { player.x = MIN_X; player.vx = 0; }
    if (player.x > MAX_X) { player.x = MAX_X; player.vx = 0; }
    if (player.cooldown > 0) player.cooldown -= dt;
    player.lean *= Math.pow(0.001, dt); // settle back upright
    arrowFlash['-1'] = Math.max(0, arrowFlash['-1'] - dt);
    arrowFlash['1'] = Math.max(0, arrowFlash['1'] - dt);
    if (player.trick) {
      player.trick.t += dt;
      if (player.trick.t > player.trick.dur) player.trick = null;
    }

    // level phases
    if (phase === 'run' && dist - levelStart >= LEVEL_LEN) {
      phase = 'showdown';
      floaters.push({ x: W / 2, y: 200, text: 'BREAKAWAY!', t: 0, life: 1.1, color: C.accentHover, size: 24 });
    } else if (phase === 'showdown') {
      updateShowdown(dt);
    } else if (phase === 'levelup') {
      if (net) { net.y += speed * 0.6 * dt; if (net.y > H + 80) net = null; }
      if (goalie) { goalie.y += speed * 0.6 * dt; if (goalie.y > H + 60) goalie = null; }
      levelupT -= dt;
      if (levelupT <= 0) {
        level++;
        levelStart = dist;
        speed = Math.max(speed, Math.min(BASE_SPEED + (level - 1) * LEVEL_SPEED_STEP, MAX_SPEED));
        phase = 'run';
        spawnTimer = 1.0;
        levelEl.textContent = String(level);
        floaters.push({ x: W / 2, y: 200, text: 'LEVEL ' + level, t: 0, life: 1.1, color: C.accentHover, size: 26 });
      }
    }

    // spawning (open ice only)
    if (phase === 'run') {
      spawnTimer -= dt;
      if (spawnTimer <= 0 && defenders.length < SPAWN_MAX) {
        if (dist > PAIRS_AFTER && Math.random() < PAIR_CHANCE) spawnGate();
        else spawnDefender();
        var interval = Math.max(0.45, Math.max(0.55, 1.3 - ramp01() * 0.6) * Math.pow(LEVEL_SPAWN_TIGHTEN, level - 1));
        spawnTimer = interval * (0.85 + Math.random() * 0.4);
      }
    }

    // defenders
    var steer = STEER_BASE + ramp01() * (STEER_MAX - STEER_BASE);
    var lungeMax = LUNGE_MAX_BASE + ramp01() * (LUNGE_MAX_TOP - LUNGE_MAX_BASE);

    for (var i = defenders.length - 1; i >= 0; i--) {
      var d = defenders[i];

      var st = steer * (d.agility || 1);
      var lg = lungeMax * (d.agility || 1);

      if (!d.committed) {
        if (d.y < PLAYER_Y - COMMIT_DIST) {
          // still hunting: steer toward the puck carrier
          var dx = player.x - d.x;
          var step = Math.min(Math.abs(dx), st * dt);
          d.x += Math.sign(dx) * step;
          d.vx = Math.sign(dx) * st;
        } else {
          // commit: aim at where you are RIGHT NOW and live with it
          d.committed = true;
          var timeToYou = Math.max((PLAYER_Y - d.y) / d.vy, 0.12);
          d.vx = Math.max(-lg, Math.min(lg, (player.x - d.x) / timeToYou));
          d.vy *= 1.12;
        }
      } else if (!d.gate) {
        d.x += d.vx * dt;
      }
      d.y += d.vy * dt;
      if (d.x < MIN_X - 4) d.x = MIN_X - 4;
      if (d.x > MAX_X + 4) d.x = MAX_X + 4;

      // collision, sized to the defender's body
      var ddx = d.x - player.x, ddy = d.y - PLAYER_Y;
      var hd = (d.r || DEF_R) + PLAYER_R - 3;
      if (ddx * ddx + ddy * ddy < hd * hd) { gameOver(); return; }

      // beaten: he's past you. Base points for every defender, trick bonus
      // on top when you deked while he had you lined up (no distance
      // requirement: a big escape deke should never disqualify the trick).
      if (!d.missed && d.y > PLAYER_Y + 8) {
        d.missed = true;
        beaten++;
        addScore(PASS_PTS);
        floaters.push({ x: d.x, y: d.y, text: '+' + PASS_PTS, t: 0, life: 0.5, color: C.dim, size: 12 });

        if (!d.gate) {
          var move = null, bonus = 0;
          if (d.dekeTti !== undefined && d.dekeTti <= TRICK_EPIC_TTI) {
            move = EPIC_MOVES[Math.floor(Math.random() * EPIC_MOVES.length)];
            bonus = TRICK_EPIC_PTS;
          } else if (d.dekeTti !== undefined && d.dekeTti <= TRICK_SLICK_TTI) {
            move = SLICK_MOVES[Math.floor(Math.random() * SLICK_MOVES.length)];
            bonus = TRICK_SLICK_PTS;
          } else if (Math.abs(ddx) < NEAR_MISS_X) {
            bonus = NEAR_MISS_BONUS;
          }
          if (bonus) addScore(bonus);
          if (move) {
            var epic = bonus === TRICK_EPIC_PTS;
            player.trick = { kind: move.kind, t: 0, dur: epic ? 0.6 : 0.45, dir: player.dekeDir || 1 };
            floaters.push({
              x: W / 2, y: PLAYER_Y - 70, text: move.name + '  +' + bonus,
              t: 0, life: epic ? 1.1 : 0.8, color: epic ? C.warning : C.success, size: epic ? 21 : 15
            });
            Arcade.vibrate(epic ? 35 : 20);
          } else if (bonus) {
            floaters.push({ x: d.x, y: d.y - 16, text: '+' + bonus, t: 0, life: 0.7, color: C.success, size: 16 });
          }
        }
      }

      if (d.y > H + 40) defenders.splice(i, 1);
    }

    // the shot in flight, and its result
    if (shot) {
      shot.t += dt;
      if (!shot.resolved && shot.t >= shot.dur) {
        shot.resolved = true;
        shot.fx = 0.5;
        if (shot.goal) {
          var gBonus = 0, gMove = null;
          if (goalie && goalie.dekeTti !== undefined && goalie.dekeTti <= TRICK_EPIC_TTI) {
            gMove = EPIC_MOVES[Math.floor(Math.random() * EPIC_MOVES.length)];
            gBonus = TRICK_EPIC_PTS;
          } else if (goalie && goalie.dekeTti !== undefined && goalie.dekeTti <= TRICK_SLICK_TTI) {
            gMove = SLICK_MOVES[Math.floor(Math.random() * SLICK_MOVES.length)];
            gBonus = TRICK_SLICK_PTS;
          }
          addScore(GOAL_PTS + gBonus);
          if (gMove) player.trick = { kind: gMove.kind, t: 0, dur: 0.6, dir: player.dekeDir || 1 };
          floaters.push({
            x: W / 2, y: PLAYER_Y - 90,
            text: gMove ? gMove.name + '  GOAL! +' + (GOAL_PTS + gBonus) : 'GOAL! +' + GOAL_PTS,
            t: 0, life: 1.4, color: C.warning, size: 24
          });
          Arcade.vibrate(60);
          levelupT = 1.7;
        } else {
          floaters.push({
            x: W / 2, y: PLAYER_Y - 80,
            text: SAVE_LINES[Math.floor(Math.random() * SAVE_LINES.length)],
            t: 0, life: 1.2, color: C.dim, size: 17
          });
          Arcade.vibrate(30);
          levelupT = 1.4;
        }
        phase = 'levelup';
      }
      if (shot.resolved) {
        shot.fx -= dt;
        if (shot.fx <= 0) shot = null;
      }
    }

    // particles and floaters
    for (var p = particles.length - 1; p >= 0; p--) {
      var pt = particles[p];
      pt.t += dt;
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      if (pt.t > pt.life) particles.splice(p, 1);
    }
    for (var f = floaters.length - 1; f >= 0; f--) {
      var fl = floaters[f];
      fl.t += dt;
      fl.y -= 24 * dt;
      if (fl.t > fl.life) floaters.splice(f, 1);
    }
  }

  function updateShowdown(dt) {
    // let the last backcheckers flush out, then the net comes to you
    if (!net && defenders.length === 0) {
      net = { y: -100 };
      goalie = { x: W / 2, y: -84, vx: 0, committed: false, done: false };
    }
    if (!net) return;

    var vy = speed * 0.55;
    net.y += vy * dt;
    goalie.y = net.y + 16;

    // first time at the net: freeze the moment and explain the finish
    if (!howtoShown && net.y > 40) {
      howtoShown = true;
      state = 'howto';
      howtoAt = performance.now();
      overlay.style.background = 'rgba(10, 10, 10, 0.62)';
      overlayControls.hidden = true;
      overlayTitle.textContent = 'Breakaway!';
      overlayMsg.textContent = 'The goalie mirrors your every move. The moment his ring turns gold he commits to his dive, and that is your window: deke, and the shot fires far side on its own when you reach the hash marks. Ring still green? Chain dekes to drag him out of position first.';
      overlayBtn.textContent = 'Finish it';
      overlay.hidden = false;
      return;
    }

    // after the release, he just finishes his slide while the puck flies
    if (shot) {
      if (goalie.committed) goalie.x += goalie.vx * dt * 0.6;
      if (goalie.x < MIN_X) goalie.x = MIN_X;
      if (goalie.x > MAX_X) goalie.x = MAX_X;
      return;
    }

    var tti = (PLAYER_Y - goalie.y) / vy;
    if (!goalie.committed) {
      if (tti > TRICK_EPIC_TTI) {
        // squares up: mirrors you across the ice with a bit of lag
        var gdx = player.x - goalie.x;
        var gs = GOALIE_STEER + (level - 1) * 15;
        goalie.x += Math.sign(gdx) * Math.min(Math.abs(gdx), gs * dt);
      } else {
        // the ring just went gold: he sells out on where you are right now
        goalie.committed = true;
        var lunge = GOALIE_LUNGE + (level - 1) * 15;
        goalie.vx = Math.max(-lunge, Math.min(lunge, (player.x - goalie.x) / Math.max(tti - SHOT_TTI, 0.1)));
      }
    } else {
      goalie.x += goalie.vx * dt;
    }
    if (goalie.x < MIN_X) goalie.x = MIN_X;
    if (goalie.x > MAX_X) goalie.x = MAX_X;

    // the release: at the hash marks the shot goes, daylight or not
    if (tti <= SHOT_TTI) {
      var gap = Math.abs(goalie.x - player.x);
      var side = Math.sign(player.x - goalie.x) || player.dekeDir || 1;
      shot = {
        t: 0, dur: 0.24, resolved: false, fx: 0,
        sx: player.x, sy: PLAYER_Y - 23,
        goal: gap >= OPEN_GAP,
        relTx: side * 22
      };
    }
  }

  /* ---- drawing ---- */

  function drawPattern(spacing, phase, fn) {
    var y0 = ((worldPos + phase) % spacing + spacing) % spacing;
    for (var y = y0 - spacing; y < H + spacing; y += spacing) fn(y);
  }

  function drawRink() {
    ctx.fillStyle = C.surface;
    ctx.fillRect(0, 0, W, H);

    // ice speckle
    ctx.fillStyle = C.text;
    ctx.globalAlpha = 0.05;
    speckles.forEach(function (sp) {
      var y = (sp.y0 + worldPos) % H;
      ctx.fillRect(sp.x, y, 2, 2);
    });
    ctx.globalAlpha = 1;

    // faceoff circles between the lines
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.55;
    drawPattern(960, 720, function (y) {
      ctx.beginPath(); ctx.arc(95, y, 52, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(W - 95, y, 52, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // blue lines
    ctx.fillStyle = C.accent;
    ctx.globalAlpha = 0.5;
    drawPattern(480, 0, function (y) { ctx.fillRect(0, y - 4, W, 8); });
    ctx.globalAlpha = 1;

    // center red line
    ctx.fillStyle = C.danger;
    ctx.globalAlpha = 0.35;
    drawPattern(960, 240, function (y) { ctx.fillRect(0, y - 3, W, 6); });
    ctx.globalAlpha = 1;

    // boards with scrolling hash marks
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, BOARD_W, H);
    ctx.fillRect(W - BOARD_W, 0, BOARD_W, H);
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    drawPattern(90, 0, function (y) {
      ctx.beginPath(); ctx.moveTo(2, y); ctx.lineTo(BOARD_W - 2, y + 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W - BOARD_W + 2, y + 8); ctx.lineTo(W - 2, y); ctx.stroke();
    });
  }

  function drawNet() {
    if (!net) return;
    var cx = W / 2, gl = net.y;
    // goal line
    ctx.fillStyle = C.danger;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(BOARD_W, gl - 2, W - BOARD_W * 2, 4);
    ctx.globalAlpha = 1;
    // crease
    ctx.fillStyle = C.accent;
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.arc(cx, gl, 30, 0, Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
    // frame and mesh sit behind the goal line
    ctx.strokeStyle = C.text;
    ctx.lineWidth = 3;
    ctx.strokeRect(cx - 32, gl - 26, 64, 26);
    ctx.strokeStyle = C.dim;
    ctx.lineWidth = 1;
    for (var i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - 32 + i * 16, gl - 26);
      ctx.lineTo(cx - 32 + i * 16, gl);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(cx - 32, gl - 13);
    ctx.lineTo(cx + 32, gl - 13);
    ctx.stroke();
  }

  function drawGoalie() {
    if (!goalie) return;

    // same ring language as the defenders: green = slick window, gold = epic
    if (!shot && phase === 'showdown' && goalie.y < PLAYER_Y && state === 'playing') {
      var tti = (PLAYER_Y - goalie.y) / (speed * 0.55);
      var impactX = goalie.x + (goalie.committed ? goalie.vx * tti : 0);
      if (tti <= TRICK_SLICK_TTI && Math.abs(impactX - player.x) < TRICK_THREAT_X) {
        var epic = tti <= TRICK_EPIC_TTI;
        var pulse = 1 + 0.08 * Math.sin(worldPos * 0.06);
        ctx.strokeStyle = epic ? C.warning : C.success;
        ctx.globalAlpha = epic ? 0.9 : 0.6;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(goalie.x, goalie.y, (GOALIE_R + 6) * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // paddle down across the ice
    ctx.strokeStyle = C.text;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(goalie.x - 15, goalie.y + 12);
    ctx.lineTo(goalie.x + 15, goalie.y + 12);
    ctx.stroke();

    ctx.fillStyle = C.text;
    ctx.beginPath();
    ctx.arc(goalie.x, goalie.y, GOALIE_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.bgDeep;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawShot() {
    if (!shot) return;
    // target follows the world: far corner of the net on a goal, the goalie's
    // body on a save
    var tx, ty;
    if (shot.goal) {
      tx = W / 2 + shot.relTx;
      ty = (net ? net.y : shot.sy) - 13;
    } else if (goalie) {
      tx = goalie.x;
      ty = goalie.y;
    } else {
      tx = shot.sx;
      ty = shot.sy - 60;
    }

    var t01 = Math.min(shot.t / shot.dur, 1);
    var e = 1 - (1 - t01) * (1 - t01); // ease out
    var px = shot.sx + (tx - shot.sx) * e;
    var py = shot.sy + (ty - shot.sy) * e;

    if (!shot.resolved) {
      ctx.strokeStyle = C.text;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shot.sx + (px - shot.sx) * 0.55, shot.sy + (py - shot.sy) * 0.55);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = C.text;
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (shot.fx > 0) {
      // mesh ripple on a goal, catch flash on a save
      var k = 1 - shot.fx / 0.5;
      ctx.strokeStyle = shot.goal ? C.warning : C.dim;
      ctx.globalAlpha = 1 - k;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(tx, ty, 8 + k * 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      if (shot.goal) {
        ctx.fillStyle = C.text;
        ctx.beginPath();
        ctx.arc(tx, ty, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawDefender(d) {
    var r = d.r || DEF_R;

    // burners get a speed trail so you can read them coming
    if (d.fast) {
      ctx.strokeStyle = C.dim;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(d.x - 4, d.y - r - 6); ctx.lineTo(d.x - 4, d.y - r - 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(d.x + 4, d.y - r - 10); ctx.lineTo(d.x + 4, d.y - r - 22); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // stick: aimed at you while hunting, locked along the lunge once committed
    var ang;
    if (d.gate) ang = Math.PI / 2;
    else if (d.committed) ang = Math.atan2(d.vy, d.vx);
    else ang = Math.atan2(PLAYER_Y - d.y, player.x - d.x);

    ctx.strokeStyle = d.committed ? C.text : C.dim;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x + Math.cos(ang) * 22, d.y + Math.sin(ang) * 22);
    ctx.stroke();

    ctx.fillStyle = C.dim;
    ctx.beginPath();
    ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.bgDeep;
    ctx.lineWidth = 2;
    ctx.stroke();

    // trick-window ring: he has you lined up, a late deke pays.
    // green = slick window, gold = epic window.
    if (!d.gate && !d.missed && d.y < PLAYER_Y) {
      var tti = (PLAYER_Y - d.y) / d.vy;
      var impactX = d.x + d.vx * tti;
      if (tti <= TRICK_SLICK_TTI && Math.abs(impactX - player.x) < TRICK_THREAT_X) {
        var epic = tti <= TRICK_EPIC_TTI;
        var pulse = 1 + 0.08 * Math.sin(worldPos * 0.06);
        ctx.strokeStyle = epic ? C.warning : C.success;
        ctx.globalAlpha = epic ? 0.9 : 0.6;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(d.x, d.y, ((d.r || DEF_R) + 6) * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }

  function drawPlayer() {
    var lean = Math.max(-1, Math.min(1, player.lean));
    var tr = player.trick;
    var t01 = tr ? Math.min(tr.t / tr.dur, 1) : 0;

    // deke streaks (not during a spin, it smears the rotation)
    if (Math.abs(player.vx) > 120 && !(tr && tr.kind === 'spin')) {
      ctx.strokeStyle = C.text;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(player.x - Math.sign(player.vx) * 16, PLAYER_Y - 4);
      ctx.lineTo(player.x - Math.sign(player.vx) * 34, PLAYER_Y - 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(player.x - Math.sign(player.vx) * 14, PLAYER_Y + 8);
      ctx.lineTo(player.x - Math.sign(player.vx) * 30, PLAYER_Y + 8);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // trick-driven placement, in coords relative to the body center
    var bodyOffX = 0;   // shimmy wiggle
    var rot = 0;        // spinorama rotation
    var puckLX = lean * 10, puckLY = -23;   // puck, local
    var puckUnder = false;                  // draw puck under the body (between the legs)
    var puckScale = 1;                      // > 1 while airborne (chip)
    var stickLX = null, stickLY = null;     // blade target when not on the puck
    var swipe = 0;                          // beaten stick sweeping over the puck
    var wickets = 0;                        // his skates, for the nutmeg
    var shotFlash = 0;                      // the sold-but-fake shot release

    if (tr) {
      var k = Math.sin(t01 * Math.PI); // 0 → 1 → 0 over the move
      if (tr.kind === 'spin') {
        rot = tr.dir * t01 * Math.PI * 2;
      } else if (tr.kind === 'toedrag') {
        puckLX = tr.dir * 20 * k;
        puckLY = -23 + 32 * k;
      } else if (tr.kind === 'legs') {
        puckLX = tr.dir * 9 * (2 * t01 - 1);
        puckLY = -23 + 40 * k;              // dips behind the body mid-move
        puckUnder = puckLY > -8;
      } else if (tr.kind === 'shimmy') {
        // head fake: quick double look-off
        bodyOffX = tr.dir * 8 * Math.sin(t01 * Math.PI * 4);
      } else if (tr.kind === 'f2b' || tr.kind === 'b2f') {
        // one smooth pull across the body, forehand-backhand either way
        var dd = (tr.kind === 'f2b' ? 1 : -1) * tr.dir;
        puckLX = dd * 13 * Math.cos(Math.PI * t01);
        puckLY = -23 + 7 * k;
      } else if (tr.kind === 'poke') {
        // jab the puck ahead, past his blade, and collect it
        puckLX = lean * 4;
        puckLY = -23 - 26 * k;
      } else if (tr.kind === 'understick') {
        // puck slides ahead while his stick sweeps over top
        puckLY = -23 - 16 * k;
        swipe = k;
      } else if (tr.kind === 'nutmeg') {
        // right through his wheels
        puckLY = -23 - 36 * k;
        wickets = k;
      } else if (tr.kind === 'power') {
        // drop the shoulder, puck tucked wide on the far side
        bodyOffX = tr.dir * 5 * k;
        puckLX = tr.dir * 18 * k;
        puckLY = -23 + 16 * k;
      } else if (tr.kind === 'heel') {
        // heel-to-heel: open up sideways and glide through
        rot = tr.dir * (Math.PI / 2) * k;
        bodyOffX = tr.dir * 6 * k;
      } else if (tr.kind === 'tuck') {
        // one hand on the stick, full reach around
        puckLX = tr.dir * 26 * k;
        puckLY = -23 - 10 * k;
      } else if (tr.kind === 'chip') {
        // chip it over his stick and skate onto it
        puckLY = -23 - 34 * k;
        puckScale = 1 + 0.45 * k;
      } else if (tr.kind === 'fakeshot') {
        if (t01 < 0.5) {          // wind up: pull the puck back beside you
          var w = t01 / 0.5;
          puckLX = tr.dir * 14 * w;
          puckLY = -23 + 33 * w;
        } else {                  // ...and snap it forward, gone
          var s2 = (t01 - 0.5) / 0.5;
          puckLX = tr.dir * 14 * (1 - s2);
          puckLY = 10 - 36 * s2;
        }
      } else if (tr.kind === 'faketoedrag') {
        if (t01 < 0.5) {          // sell the toe drag out wide...
          var w2 = t01 / 0.5;
          puckLX = tr.dir * 18 * Math.sin(w2 * Math.PI / 2);
          puckLY = -23 + 20 * w2;
        } else {                  // ...then cut it back the other way
          var s3 = (t01 - 0.5) / 0.5;
          puckLX = tr.dir * (18 - 30 * s3);
          puckLY = -3 - 20 * s3;
          bodyOffX = -tr.dir * 5 * s3;
        }
      } else if (tr.kind === 'datsyuk') {
        if (t01 < 0.6) {          // touch one: push it through and let it run
          var w3 = t01 / 0.6;
          puckLX = tr.dir * 22 * w3;
          puckLY = -23 - 18 * w3;
          stickLX = -tr.dir * 10; // stick swings away, no contact, sells the give-up
          stickLY = -16;
        } else {                  // touch two: catch up and collect it
          var s4 = (t01 - 0.6) / 0.4;
          puckLX = tr.dir * (22 - 10 * s4);
          puckLY = -41 + 18 * s4;
        }
      } else if (tr.kind === 'legsfake') {
        // wind up a between-the-legs shot, flash the release, keep it
        puckLX = tr.dir * 4 * (1 - t01);
        puckLY = -23 + 38 * k;
        puckUnder = puckLY > -8;
        if (t01 > 0.45 && t01 < 0.75) shotFlash = Math.sin((t01 - 0.45) / 0.3 * Math.PI);
      }
    }

    ctx.save();
    ctx.translate(player.x + bodyOffX, PLAYER_Y);
    if (rot) ctx.rotate(rot);

    // spinorama trail
    if (tr && tr.kind === 'spin') {
      ctx.strokeStyle = C.accentHover;
      ctx.globalAlpha = 0.5 * (1 - t01);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, PLAYER_R + 7, -Math.PI / 2, -Math.PI / 2 + rot, tr.dir < 0);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function puck() {
      if (puckScale > 1.05) {
        // lift shadow under an airborne puck
        ctx.fillStyle = C.bgDeep;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.ellipse(puckLX, puckLY + 5, 5, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = C.text;
      ctx.beginPath();
      ctx.arc(puckLX, puckLY, 4.5 * puckScale, 0, Math.PI * 2);
      ctx.fill();
    }

    if (puckUnder) puck();

    // stick to the puck (or wherever the blade is mid-trick)
    ctx.strokeStyle = C.text;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(stickLX === null ? puckLX : stickLX, (stickLY === null ? puckLY : stickLY) + 3);
    ctx.stroke();

    // trick props: the stick you slipped under, the wheels you went through
    if (swipe > 0) {
      var sa = tr.dir * (t01 - 0.5) * 2.2;
      ctx.strokeStyle = C.dim;
      ctx.globalAlpha = swipe * 0.9;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(puckLX - Math.cos(sa) * 20, puckLY - 8 - Math.sin(sa) * 6);
      ctx.lineTo(puckLX + Math.cos(sa) * 20, puckLY - 8 + Math.sin(sa) * 6);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (wickets > 0) {
      ctx.fillStyle = C.dim;
      ctx.globalAlpha = wickets * 0.9;
      ctx.beginPath(); ctx.arc(-8, -42, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(8, -42, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
    if (shotFlash > 0) {
      ctx.strokeStyle = C.text;
      ctx.globalAlpha = shotFlash * 0.7;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.lineTo(0, -34);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // body, squashed slightly during the burst
    ctx.save();
    ctx.scale(1 + Math.abs(lean) * 0.12, 1 - Math.abs(lean) * 0.1);
    ctx.fillStyle = C.accentHover;
    ctx.beginPath();
    ctx.arc(0, 0, PLAYER_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.bgDeep;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    if (!puckUnder) puck();

    ctx.restore();
  }

  function drawTapArrows() {
    if (state !== 'playing' && state !== 'howto') return;
    [-1, 1].forEach(function (dir) {
      var x = dir === -1 ? 46 : W - 46;
      var y = 482;
      var flash = arrowFlash[String(dir)];
      ctx.strokeStyle = C.text;
      ctx.globalAlpha = 0.16 + (flash / 0.25) * 0.4;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x - dir * 8, y - 12);
      ctx.lineTo(x + dir * 8, y);
      ctx.lineTo(x - dir * 8, y + 12);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
    });
  }

  function draw() {
    drawRink();
    drawNet();

    ctx.fillStyle = C.text;
    particles.forEach(function (pt) {
      ctx.globalAlpha = 0.5 * (1 - pt.t / pt.life);
      ctx.fillRect(pt.x, pt.y, 3, 3);
    });
    ctx.globalAlpha = 1;

    defenders.forEach(drawDefender);
    drawGoalie();
    drawTapArrows();
    if (state !== 'idle') drawPlayer();
    drawShot();

    ctx.textAlign = 'center';
    floaters.forEach(function (fl) {
      ctx.globalAlpha = 1 - fl.t / fl.life;
      ctx.fillStyle = fl.color;
      ctx.font = '700 ' + fl.size + 'px Inter, sans-serif';
      ctx.fillText(fl.text, fl.x, fl.y);
    });
    ctx.globalAlpha = 1;
  }

  Arcade.onTap(canvas, function (e, pt) {
    if (state === 'playing') deke(pt.nx < 0.5 ? -1 : 1);
  });
  Arcade.onKey(['ArrowLeft', 'a', 'A'], function () { deke(-1); });
  Arcade.onKey(['ArrowRight', 'd', 'D'], function () { deke(1); });
  function tryDismissHowto() {
    if (state === 'howto' && performance.now() - howtoAt >= 500) resume();
  }

  Arcade.onKey([' ', 'Enter'], function () {
    if (state === 'howto') tryDismissHowto();
    else if (state !== 'playing') start();
  });
  overlayBtn.addEventListener('click', function () {
    if (state === 'howto') tryDismissHowto();
    else start();
  });
  Arcade.onTap(overlay, function () { tryDismissHowto(); });
  document.addEventListener('keydown', tryDismissHowto);

  reset();
  Arcade.loop(function (dt) {
    update(dt);
    draw();
  });
})();
