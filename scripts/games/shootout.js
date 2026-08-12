/* Shootout — pick your spot, time the release, and stay ahead of a
   goalie who keeps a book on your habits between visits.
   Prototype for the hidden Scout Elite Arcade. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var W = 360, H = 430;
  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);

  // ---- net frame geometry ----
  var POST_L = 46, POST_R = 304, POST_W = 10;   // post outer x, thickness
  var BAR_Y = 64, BAR_H = 10;                   // crossbar
  var GOAL_Y = 316;                             // goal line top
  var NET_X0 = POST_L + POST_W, NET_X1 = POST_R;
  var NET_Y0 = BAR_Y + BAR_H, NET_Y1 = GOAL_Y;

  var GOALIE_X = 180, GOALIE_Y = 225;           // silhouette anchor
  var RELEASE_X = 180, RELEASE_Y = 352;         // where the puck leaves from

  // ---- zones: 0 glove high, 1 blocker high, 2 glove low, 3 blocker low, 4 five-hole
  var ZONES = [
    { name: 'Glove high',   rect: [56, 74, 124, 126],  cx: 110, cy: 130 },
    { name: 'Blocker high', rect: [180, 74, 124, 126], cx: 250, cy: 130 },
    { name: 'Glove low',    rect: [56, 200, 89, 116],  cx: 96,  cy: 268 },
    { name: 'Blocker low',  rect: [215, 200, 89, 116], cx: 264, cy: 268 },
    { name: 'Five-hole',    rect: [145, 200, 70, 116], cx: 180, cy: 292 }
  ];
  var ADJ = [[1, 2], [0, 3], [0, 4], [1, 4], [2, 3]]; // spatial neighbors

  // ---- release meter ----
  var METER_X = 44, METER_W = 272, METER_Y = 368, METER_H = 16;
  var GREEN_HALF = 0.12;        // green window = 24% of the bar
  var BASE_FREQ = 1.2;          // cursor Hz at the start of a run
  var FREQ_STEP = 0.08;         // added every SPEEDUP_EVERY shots
  var SPEEDUP_EVERY = 3;
  var MAX_FREQ = 2.0;

  // ---- pacing / rules ----
  var WINDUP_T = 0.8;           // "skater in alone..." beat
  var RESULT_T = 0.95;          // full result beat
  var FLIGHT_T = 0.28;          // clean shot, release to net
  var WEAK_FLIGHT_T = 0.42;     // weak shot floats in
  var LUNGE_T = 0.32;           // goalie reaction time within the result
  var ADJACENT_SAVE_CHANCE = 0.45;
  var MAX_SAVES = 3;
  var FREE_SHOTS = 3;           // uniform goalie for first shots of a session

  var BEST_KEY = 'shootout';
  var TEND_KEY = 'shootout-tendencies';

  var COVERED_LINES = [
    "He's onto your high glove.",
    'He was waiting on the high blocker.',
    "He's onto your glove side.",
    "He's sitting on your blocker side.",
    'The five-hole slammed shut.'
  ];
  var ADJACENT_LINES = [
    'Sprawled across and got a piece.',
    'Kicked it out with the pad.',
    'Got just enough of it.'
  ];

  var scoreEl = document.getElementById('score');
  var savesEl = document.getElementById('saves');
  var bestEl = document.getElementById('best');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayBook = document.getElementById('overlay-book');
  var overlayBtn = document.getElementById('overlay-btn');
  var wipeBtn = document.getElementById('wipe-btn');

  var state = 'idle';   // idle | windup | live | result | over
  var stateT = 0;
  var meterT = 0;
  var cursorPos = 0;    // 0..1, frozen at the release point during a result
  var swayT = 0;
  var score = 0;
  var savesUsed = 0;
  var runShots = 0;     // shots this run, drives meter speed
  var sessionShots = 0; // shots since page load, drives the no-book warm-up
  var shotZone = 0;     // where you aimed
  var coverZone = 0;    // what the goalie chose to take away
  var goalieTarget = 0; // where he visibly lunges
  var outcome = null;   // 'goal' | 'covered' | 'adjacent' | 'weak'
  var applied = false;  // HUD updated for the current result yet?
  var verdict = '';
  var tendencies = loadTendencies();

  function loadTendencies() {
    var raw = Arcade.recall(TEND_KEY, null);
    var out = [0, 0, 0, 0, 0];
    if (raw && raw.length === 5) {
      for (var i = 0; i < 5; i++) out[i] = Math.max(0, Math.floor(Number(raw[i]) || 0));
    }
    return out;
  }

  function tendencyTotal() {
    var sum = 0;
    for (var i = 0; i < 5; i++) sum += tendencies[i];
    return sum;
  }

  function bookLine() {
    var top = 0;
    for (var i = 1; i < 5; i++) if (tendencies[i] > tendencies[top]) top = i;
    var n = tendencies[top];
    if (n === 0) return 'His book on you is empty.';
    return ZONES[top].name + ' tagged ' + n + (n === 1 ? ' time' : ' times') + ' in his book.';
  }

  function meterFreq() {
    return Math.min(BASE_FREQ + Math.floor(runShots / SPEEDUP_EVERY) * FREQ_STEP, MAX_FREQ);
  }

  function pickCoverZone() {
    if (sessionShots < FREE_SHOTS) return Math.floor(Math.random() * 5); // no book on you yet
    var total = 0, i;
    for (i = 0; i < 5; i++) total += tendencies[i] + 1; // +1 smoothing
    var r = Math.random() * total;
    for (i = 0; i < 5; i++) {
      r -= tendencies[i] + 1;
      if (r < 0) return i;
    }
    return 4;
  }

  function zoneAt(x, y) {
    var i, r;
    for (i = 0; i < 5; i++) {
      r = ZONES[i].rect;
      if (x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3]) return i;
    }
    // outside the net: snap to the nearest zone so taps stay generous
    var nearest = 0, nd = Infinity;
    for (i = 0; i < 5; i++) {
      var dx = x - ZONES[i].cx, dy = y - ZONES[i].cy;
      var d = dx * dx + dy * dy;
      if (d < nd) { nd = d; nearest = i; }
    }
    return nearest;
  }

  function flightTime() {
    return outcome === 'weak' ? WEAK_FLIGHT_T : FLIGHT_T;
  }

  function startWindup() {
    state = 'windup';
    stateT = 0;
  }

  function start() {
    score = 0;
    savesUsed = 0;
    runShots = 0;
    scoreEl.textContent = '0';
    savesEl.textContent = String(MAX_SAVES);
    overlay.hidden = true;
    startWindup();
  }

  function gameOver() {
    state = 'over';
    var newBest = Arcade.saveBest(BEST_KEY, score);
    bestEl.textContent = Arcade.best(BEST_KEY);
    overlayTitle.textContent = 'He shut the door';
    overlayMsg.textContent = newBest
      ? 'New best: ' + score + (score === 1 ? ' goal.' : ' goals.')
      : score + (score === 1 ? ' goal.' : ' goals.') + ' Best is ' + Arcade.best(BEST_KEY) + '.';
    overlayBook.textContent = bookLine();
    overlayBook.hidden = false;
    overlayBtn.textContent = 'Shoot again';
    wipeBtn.hidden = false;
    overlay.hidden = false;
    Arcade.vibrate(60);
  }

  function shoot(zone) {
    if (state !== 'live') return;
    var clean = Math.abs(cursorPos - 0.5) <= GREEN_HALF;
    shotZone = zone;
    coverZone = pickCoverZone(); // his read comes from the book as it stood
    sessionShots++;
    runShots++;
    tendencies[zone]++;
    Arcade.store(TEND_KEY, tendencies);

    if (!clean) {
      outcome = 'weak';
      goalieTarget = zone; // telegraphed release, he tracks the puck itself
      verdict = 'Read it the whole way.';
    } else if (coverZone === zone) {
      outcome = 'covered';
      goalieTarget = coverZone;
      verdict = COVERED_LINES[zone];
    } else if (ADJ[coverZone].indexOf(zone) !== -1 && Math.random() < ADJACENT_SAVE_CHANCE) {
      outcome = 'adjacent';
      goalieTarget = coverZone;
      verdict = ADJACENT_LINES[Math.floor(Math.random() * ADJACENT_LINES.length)];
    } else {
      outcome = 'goal';
      goalieTarget = coverZone; // he committed to his guess and it was wrong
      verdict = 'GOAL';
    }
    applied = false;
    state = 'result';
    stateT = 0;
  }

  Arcade.onTap(canvas, function (e, pt) {
    if (state !== 'live') return;
    shoot(zoneAt(pt.nx * W, pt.ny * H));
  });
  Arcade.onKey(['1', '2', '3', '4', '5'], function (key) {
    shoot(Number(key) - 1);
  });
  Arcade.onKey([' ', 'Enter'], function () {
    if (state === 'idle' || state === 'over') start();
  });
  overlayBtn.addEventListener('click', start);
  wipeBtn.addEventListener('click', function () {
    tendencies = [0, 0, 0, 0, 0];
    Arcade.store(TEND_KEY, tendencies);
    overlayBook.textContent = 'Book wiped. He has nothing on you.';
    overlayBook.hidden = false;
  });

  function update(dt) {
    swayT += dt;
    if (state === 'windup') {
      stateT += dt;
      if (stateT >= WINDUP_T) {
        state = 'live';
        meterT = 0;
        cursorPos = 0;
      }
    } else if (state === 'live') {
      meterT += dt;
      cursorPos = 0.5 + 0.5 * Math.sin(meterT * meterFreq() * Math.PI * 2 - Math.PI / 2);
    } else if (state === 'result') {
      stateT += dt;
      if (!applied && stateT >= flightTime()) {
        applied = true;
        if (outcome === 'goal') {
          score++;
          scoreEl.textContent = String(score);
          Arcade.vibrate(25);
        } else {
          savesUsed++;
          savesEl.textContent = String(MAX_SAVES - savesUsed);
        }
      }
      if (stateT >= RESULT_T) {
        if (savesUsed >= MAX_SAVES) gameOver();
        else startWindup();
      }
    }
  }

  // ---- drawing ----

  function roundRectPath(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawBackdrop() {
    ctx.fillStyle = C.bgDeep;
    ctx.fillRect(0, 0, W, GOAL_Y);
    ctx.fillStyle = C.surface;
    ctx.fillRect(0, GOAL_Y, W, H - GOAL_Y);
    ctx.fillStyle = C.danger;
    ctx.globalAlpha = 0.55;
    ctx.fillRect(0, GOAL_Y, W, 5);
    ctx.globalAlpha = 1;
  }

  function drawMesh() {
    ctx.strokeStyle = C.text;
    ctx.globalAlpha = 0.07;
    ctx.lineWidth = 1;
    ctx.beginPath();
    var x, y;
    for (x = NET_X0 + 14; x < NET_X1; x += 18) {
      ctx.moveTo(x, NET_Y0);
      ctx.lineTo(x, NET_Y1);
    }
    for (y = NET_Y0 + 12; y < NET_Y1; y += 16) {
      ctx.moveTo(NET_X0, y);
      ctx.lineTo(NET_X1, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawGoalie() {
    var ox = 0, oy = 0;
    if (state === 'result') {
      var z = ZONES[goalieTarget];
      var k = Math.min(stateT / LUNGE_T, 1);
      k = 1 - (1 - k) * (1 - k);
      ox = (z.cx - GOALIE_X) * 0.55 * k;
      oy = (z.cy - GOALIE_Y) * 0.4 * k;
    } else if (state === 'windup' || state === 'live') {
      ox = Math.sin(swayT * 2.2) * 3;
    }
    var x = GOALIE_X + ox;

    // leg pads
    ctx.fillStyle = C.dim;
    roundRectPath(x - 26, 238 + oy, 18, 78, 7);
    ctx.fill();
    roundRectPath(x + 8, 238 + oy, 18, 78, 7);
    ctx.fill();

    // torso
    ctx.fillStyle = C.bg;
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    roundRectPath(x - 26, 162 + oy, 52, 88, 12);
    ctx.fill();
    ctx.stroke();

    // mask
    ctx.beginPath();
    ctx.arc(x, 148 + oy, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // glove, shooter's left
    ctx.fillStyle = C.dim;
    ctx.beginPath();
    ctx.arc(x - 38, 208 + oy, 12, 0, Math.PI * 2);
    ctx.fill();

    // blocker, shooter's right
    roundRectPath(x + 27, 196 + oy, 15, 24, 4);
    ctx.fill();

    // stick down to the ice
    ctx.strokeStyle = C.dim;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 34, 220 + oy);
    ctx.lineTo(x + 44, GOAL_Y - 2);
    ctx.stroke();
  }

  function drawFrame() {
    var frameW = POST_R + POST_W - POST_L;
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(POST_L, BAR_Y, POST_W, GOAL_Y - BAR_Y);
    ctx.fillRect(POST_R, BAR_Y, POST_W, GOAL_Y - BAR_Y);
    ctx.fillRect(POST_L, BAR_Y, frameW, BAR_H);
    ctx.fillStyle = C.danger;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(POST_L + 3, BAR_Y + BAR_H, 3, GOAL_Y - BAR_Y - BAR_H);
    ctx.fillRect(POST_R + 4, BAR_Y + BAR_H, 3, GOAL_Y - BAR_Y - BAR_H);
    ctx.fillRect(POST_L, BAR_Y + 3, frameW, 3);
    ctx.globalAlpha = 1;
  }

  function drawZones() {
    var live = state === 'live';
    for (var i = 0; i < 5; i++) {
      var z = ZONES[i];
      var isGuess = state === 'result' && i === coverZone;
      ctx.strokeStyle = isGuess ? C.accentHover : (live ? C.accentHover : C.dim);
      ctx.globalAlpha = isGuess ? 0.85 : (live ? 0.7 : 0.28);
      ctx.lineWidth = isGuess ? 3 : 2;
      ctx.beginPath();
      ctx.arc(z.cx, z.cy, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.globalAlpha = live ? 0.35 : 0.15;
      ctx.beginPath();
      ctx.arc(z.cx, z.cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function puckAt(x, y) {
    ctx.fillStyle = '#141414';
    ctx.strokeStyle = C.text;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawPuck() {
    if (state === 'windup' || state === 'live') {
      puckAt(RELEASE_X, RELEASE_Y);
      return;
    }
    if (state !== 'result') return;

    var z = ZONES[shotZone];
    var flight = flightTime();
    var k = Math.min(stateT / flight, 1);
    var e = 1 - (1 - k) * (1 - k);
    var px = RELEASE_X + (z.cx - RELEASE_X) * e;
    var py = RELEASE_Y + (z.cy - RELEASE_Y) * e;

    if (k < 1) {
      // motion trail
      ctx.strokeStyle = C.text;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(RELEASE_X + (z.cx - RELEASE_X) * e * 0.7, RELEASE_Y + (z.cy - RELEASE_Y) * e * 0.7);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else if (outcome === 'goal') {
      var g = Math.min((stateT - flight) / 0.4, 1);
      ctx.strokeStyle = C.success;
      ctx.globalAlpha = 1 - g;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(z.cx, z.cy, 12 + g * 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      // saved: puck falls off him to the ice
      var drop = stateT - flight;
      py = Math.min(z.cy + drop * drop * 900 + drop * 60, GOAL_Y - 6);
      px = z.cx + (z.cx < 180 ? -1 : z.cx > 180 ? 1 : 0) * drop * 40;
    }

    puckAt(px, py);
  }

  function drawMessage() {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (state === 'windup') {
      ctx.font = '600 15px Inter, sans-serif';
      ctx.fillStyle = C.dim;
      ctx.fillText('Skater in alone...', 180, 34);
    } else if (state === 'live') {
      ctx.font = '600 15px Inter, sans-serif';
      ctx.fillStyle = C.accentHover;
      ctx.fillText('Pick your spot.', 180, 34);
    } else if (state === 'result' && stateT >= flightTime()) {
      if (outcome === 'goal') {
        ctx.font = '800 40px Inter, sans-serif';
        ctx.fillStyle = C.success;
        ctx.fillText('GOAL', 180, 36);
      } else {
        ctx.font = '600 15px Inter, sans-serif';
        ctx.fillStyle = C.warning;
        ctx.fillText(verdict, 180, 34);
      }
    }
  }

  function drawMeter() {
    var live = state === 'live';
    ctx.fillStyle = C.bg;
    roundRectPath(METER_X, METER_Y, METER_W, METER_H, 8);
    ctx.fill();
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    roundRectPath(METER_X, METER_Y, METER_W, METER_H, 8);
    ctx.stroke();

    // green release window
    var gx = METER_X + (0.5 - GREEN_HALF) * METER_W;
    ctx.fillStyle = C.success;
    ctx.globalAlpha = live ? 0.8 : 0.25;
    ctx.fillRect(gx, METER_Y + 2, GREEN_HALF * 2 * METER_W, METER_H - 4);
    ctx.globalAlpha = 1;

    // cursor: sweeping while live, frozen where you released during the result
    if (live || state === 'result') {
      var cx = METER_X + cursorPos * METER_W;
      ctx.fillStyle = live ? C.text : C.dim;
      ctx.fillRect(cx - 2, METER_Y - 4, 4, METER_H + 8);
    }
  }

  function draw() {
    drawBackdrop();
    drawMesh();
    drawGoalie();
    drawFrame();
    drawZones();
    drawPuck();
    drawMessage();
    drawMeter();
  }

  // ---- init ----
  bestEl.textContent = Arcade.best(BEST_KEY);
  savesEl.textContent = String(MAX_SAVES);
  if (tendencyTotal() > 0) {
    overlayBook.textContent = 'He kept his book from last time. ' + bookLine();
    overlayBook.hidden = false;
    wipeBtn.hidden = false;
  }

  Arcade.loop(function (dt) {
    update(dt);
    draw();
  });
})();
