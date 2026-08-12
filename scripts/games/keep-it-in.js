/* Keep It In — pinch pucks at the blue line before they escape the zone.
   Prototype for the hidden Scout Elite Arcade. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var W = 360, H = 520;
  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);

  var BOARD_W = 14;                 // side boards thickness
  var LANE_L = BOARD_W + 9;         // puck x in left lane
  var LANE_R = W - BOARD_W - 9;     // puck x in right lane
  var BLUE_Y = 430;                 // the blue line
  var WIN_TOP = 368, WIN_BOT = 458; // pinch window (tap while puck inside)
  var ESCAPE_Y = 486;               // past this, puck is out of the zone

  var BEST_KEY = 'keep-it-in';
  var scoreEl = document.getElementById('score');
  var bestEl = document.getElementById('best');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayBtn = document.getElementById('overlay-btn');

  var state = 'idle'; // idle | playing | over
  var score = 0;
  var pucks = [];     // {lane:-1|1, y, vy, baseVy, wobble:null|{start,phase}, kept:false}
  var dmen = { '-1': { lungeT: 0, cooldown: 0 }, '1': { lungeT: 0, cooldown: 0 } };
  var pulses = [];    // save effects {x, y, t}
  var spawnTimer = 0.8;
  var elapsed = 0;

  bestEl.textContent = Arcade.best(BEST_KEY);

  function laneX(lane) { return lane === -1 ? LANE_L : LANE_R; }
  function dmanX(lane) { return lane === -1 ? 44 : W - 44; }

  function puckSpeed() { return Math.min(175 + score * 7, 540); }
  function spawnInterval() { return Math.max(1.55 - score * 0.035, 0.55); }

  function spawnPuck(lane) {
    pucks.push({
      lane: lane,
      y: -12,
      vy: puckSpeed() * (0.92 + Math.random() * 0.16),
      wobble: (score >= 8 && Math.random() < 0.25) ? { at: 190 + Math.random() * 120, phase: 0, t: 0 } : null,
      kept: false
    });
  }

  function reset() {
    score = 0;
    pucks = [];
    pulses = [];
    spawnTimer = 0.9;
    elapsed = 0;
    dmen['-1'].lungeT = dmen['1'].lungeT = 0;
    dmen['-1'].cooldown = dmen['1'].cooldown = 0;
    scoreEl.textContent = '0';
  }

  function start() {
    reset();
    state = 'playing';
    overlay.hidden = true;
  }

  function gameOver() {
    state = 'over';
    var newBest = Arcade.saveBest(BEST_KEY, score);
    bestEl.textContent = Arcade.best(BEST_KEY);
    overlayTitle.textContent = 'Cleared the zone';
    overlayMsg.textContent = newBest
      ? 'New best: ' + score + ' pucks kept in.'
      : score + ' kept in. Best is ' + Arcade.best(BEST_KEY) + '.';
    overlayBtn.textContent = 'Pinch again';
    overlay.hidden = false;
    Arcade.vibrate(60);
  }

  function pinch(lane) {
    if (state !== 'playing') return;
    var d = dmen[String(lane)];
    if (d.cooldown > 0) return;
    d.lungeT = 0.22;

    var hit = null;
    for (var i = 0; i < pucks.length; i++) {
      var p = pucks[i];
      if (!p.kept && p.lane === lane && p.y >= WIN_TOP && p.y <= WIN_BOT) { hit = p; break; }
    }
    if (hit) {
      hit.kept = true;
      hit.vy = -620; // rimmed back up the boards
      score++;
      scoreEl.textContent = String(score);
      pulses.push({ x: laneX(lane), y: hit.y, t: 0 });
      Arcade.vibrate(15);
    } else {
      d.cooldown = 0.5; // whiffed the pinch, out of position
    }
  }

  Arcade.onTap(canvas, function (e, pt) {
    if (state === 'playing') pinch(pt.nx < 0.5 ? -1 : 1);
  });
  Arcade.onKey(['ArrowLeft', 'a', 'A'], function () { pinch(-1); });
  Arcade.onKey(['ArrowRight', 'd', 'D'], function () { pinch(1); });
  Arcade.onKey([' ', 'Enter'], function () { if (state !== 'playing') start(); });
  overlayBtn.addEventListener('click', start);

  function update(dt) {
    if (state !== 'playing') return;
    elapsed += dt;

    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      var lane = Math.random() < 0.5 ? -1 : 1;
      spawnPuck(lane);
      if (score >= 15 && Math.random() < 0.3) {
        // double rim: second puck on the other side, slightly behind
        setTimeout(function () { if (state === 'playing') spawnPuck(-lane); }, 240);
      }
      spawnTimer = spawnInterval() * (0.85 + Math.random() * 0.3);
    }

    for (var i = pucks.length - 1; i >= 0; i--) {
      var p = pucks[i];
      var vy = p.vy;
      if (!p.kept && p.wobble) {
        // fake: slows briefly near the wobble point, then bursts
        var dist = p.y - p.wobble.at;
        if (dist > -40 && dist < 0) vy *= 0.55;
        else if (dist >= 0 && dist < 60) vy *= 1.45;
      }
      p.y += vy * dt;

      if (p.kept && p.y < -20) { pucks.splice(i, 1); continue; }
      if (!p.kept && p.y > ESCAPE_Y) { gameOver(); return; }
    }

    ['-1', '1'].forEach(function (k) {
      var d = dmen[k];
      if (d.lungeT > 0) d.lungeT = Math.max(0, d.lungeT - dt);
      if (d.cooldown > 0) d.cooldown = Math.max(0, d.cooldown - dt);
    });

    for (var j = pulses.length - 1; j >= 0; j--) {
      pulses[j].t += dt;
      if (pulses[j].t > 0.45) pulses.splice(j, 1);
    }
  }

  function drawRink() {
    // ice
    ctx.fillStyle = C.surface;
    ctx.fillRect(0, 0, W, H);

    // faint faceoff circles for flavor
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.beginPath(); ctx.arc(95, 150, 52, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(W - 95, 150, 52, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;

    // pinch windows on each board
    ctx.fillStyle = C.accent;
    ctx.globalAlpha = 0.16;
    ctx.fillRect(BOARD_W, WIN_TOP, 26, WIN_BOT - WIN_TOP);
    ctx.fillRect(W - BOARD_W - 26, WIN_TOP, 26, WIN_BOT - WIN_TOP);
    ctx.globalAlpha = 1;

    // blue line
    ctx.fillStyle = C.accent;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(0, BLUE_Y - 4, W, 8);
    ctx.globalAlpha = 1;

    // boards
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, BOARD_W, H);
    ctx.fillRect(W - BOARD_W, 0, BOARD_W, H);
  }

  function drawDman(lane) {
    var d = dmen[String(lane)];
    var lunge = d.lungeT > 0 ? (d.lungeT / 0.22) : 0;
    var x = dmanX(lane) + lane * lunge * 16;
    var y = BLUE_Y;
    var whiffed = d.cooldown > 0;

    // stick toward the board
    ctx.strokeStyle = whiffed ? C.dim : C.text;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + lane * (18 + lunge * 10), y + 10);
    ctx.stroke();

    // body
    ctx.fillStyle = whiffed ? C.dim : C.accentHover;
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.bgDeep;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawPuck(p) {
    var x = laneX(p.lane);
    // motion trail
    ctx.strokeStyle = p.kept ? C.success : C.text;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, p.y - Math.sign(p.vy) * 26);
    ctx.lineTo(x, p.y);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = p.kept ? C.success : C.text;
    ctx.beginPath();
    ctx.arc(x, p.y, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw() {
    drawRink();
    pulses.forEach(function (pl) {
      var k = pl.t / 0.45;
      ctx.strokeStyle = C.success;
      ctx.globalAlpha = 1 - k;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pl.x, pl.y, 10 + k * 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
    drawDman(-1);
    drawDman(1);
    pucks.forEach(drawPuck);
  }

  Arcade.loop(function (dt) {
    update(dt);
    draw();
  });
})();
