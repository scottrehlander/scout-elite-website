/* Coach's Challenge — scrub the replay, make the offside call.
   Prototype for the hidden Scout Elite Arcade.

   Truth is generated FIRST: each round picks a margin in frames and a
   sign (onside/offside), then builds 90 precomputed frames of positions
   so the trailing teammate crosses the blue line exactly that many
   frames before or after the puck. The puck is drawn from its own
   precomputed frames, the same data used for judging. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var W = 360, H = 300;
  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);

  var FRAMES = 90;       // 3.0s of "video" at 30fps
  var FPS = 30;
  var LINE_X = 180;      // vertical blue line, attack goes left to right
  var BOARD = 8;         // top/bottom board edge thickness
  var BEST_KEY = 'coaches-challenge';

  var streakEl = document.getElementById('streak');
  var bestEl = document.getElementById('best');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayBtn = document.getElementById('overlay-btn');
  var scrub = document.getElementById('scrub');
  var playBtn = document.getElementById('btn-play');
  var backBtn = document.getElementById('btn-back');
  var fwdBtn = document.getElementById('btn-fwd');
  var counterEl = document.getElementById('frame-counter');
  var onsideBtn = document.getElementById('btn-onside');
  var offsideBtn = document.getElementById('btn-offside');

  var state = 'idle';    // idle | watching | review | verdict | over
  var streak = 0;
  var roundIndex = 0;
  var round = null;      // { offside, margin, decisive, puck[], carrier[], mate[], dman[] }
  var playhead = 0;      // float frame position, 0 .. FRAMES-1
  var playing = false;
  var verdictT = 0;      // seconds since the correct call, drives the line flash
  var clock = 0;         // global clock for the pulsing ring
  var nextTimer = null;

  scrub.max = String(FRAMES - 1);
  bestEl.textContent = Arcade.best(BEST_KEY);

  function irand(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  function rand(lo, hi) { return lo + Math.random() * (hi - lo); }
  function frameWord(n) { return n === 1 ? 'frame' : 'frames'; }

  /* ---------- round generation, truth first ---------- */

  // Monotonic left-to-right x per frame, with mild speed variation, shifted
  // so the FIRST frame with x >= LINE_X is exactly crossFrame.
  function buildXs(crossFrame, speed, speedVar) {
    var xs = [0];
    var phase = rand(0, Math.PI * 2);
    var i;
    for (i = 1; i < FRAMES; i++) {
      xs.push(xs[i - 1] + speed * (1 + speedVar * Math.sin(phase + i * 0.13)));
    }
    var step = xs[crossFrame] - xs[crossFrame - 1];
    var shift = (LINE_X + step * 0.35) - xs[crossFrame];
    for (i = 0; i < FRAMES; i++) xs[i] += shift;
    return xs;
  }

  // Gentle vertical curve around a lane.
  function buildYs(y0, amp, freq) {
    var ys = [];
    var phase = rand(0, Math.PI * 2);
    for (var i = 0; i < FRAMES; i++) ys.push(y0 + amp * Math.sin(phase + i * freq));
    return ys;
  }

  function newRound() {
    var margin = Math.round(Math.max(1, 12 * Math.pow(0.85, roundIndex)));
    var offside = Math.random() < 0.5;
    var puckCross = 45 + irand(-8, 8);
    var mateCross = offside ? puckCross - margin : puckCross + margin;

    var topLane = Math.random() < 0.5;
    var carrierY0 = topLane ? rand(88, 120) : rand(180, 212);
    var mateY0 = topLane ? rand(180, 212) : rand(88, 120);

    var i, puck = [], carrier = [], mate = [], dman = [];

    // Puck path first; its frames are the truth for the call.
    var puckXs = buildXs(puckCross, rand(2.0, 2.5), 0.12);
    var puckYs = buildYs(carrierY0, rand(4, 10), rand(0.03, 0.055));
    for (i = 0; i < FRAMES; i++) puck.push({ x: puckXs[i], y: puckYs[i] });

    // Carrier trails his own puck by ~10px along the travel direction.
    for (i = 0; i < FRAMES; i++) {
      var a = puck[Math.max(i - 1, 0)];
      var b = puck[Math.min(i + 1, FRAMES - 1)];
      var dx = b.x - a.x, dy = b.y - a.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      carrier.push({ x: puck[i].x - (dx / len) * 10, y: puck[i].y - (dy / len) * 10 });
    }

    // Trailing teammate: different lane, gentle curve, crosses exactly
    // margin frames before (offside) or after (onside) the puck.
    var mateXs = buildXs(mateCross, rand(1.9, 2.4), 0.14);
    var mateYs = buildYs(mateY0, rand(14, 26), rand(0.02, 0.04));
    for (i = 0; i < FRAMES; i++) mate.push({ x: mateXs[i], y: mateYs[i] });

    // Defender backing up on the far side of the line. Visual noise only.
    var dx0 = rand(206, 224);
    var dSpeed = rand(0.9, 1.3);
    var dYs = buildYs(rand(138, 162), rand(8, 16), rand(0.02, 0.04));
    for (i = 0; i < FRAMES; i++) {
      dman.push({ x: Math.min(dx0 + dSpeed * i, W - 24), y: dYs[i] });
    }

    round = {
      offside: offside,
      margin: margin,
      decisive: puckCross, // the frame the puck crosses; the call is judged here
      puck: puck,
      carrier: carrier,
      mate: mate,
      dman: dman
    };
    playhead = 0;
    playing = true;
    state = 'watching';
    syncDeck();
  }

  /* ---------- replay deck ---------- */

  function canDrive() { return state === 'watching' || state === 'review'; }
  function atEnd() { return playhead >= FRAMES - 1 - 1e-6; }

  function syncDeck() {
    var f = Math.round(playhead);
    scrub.value = String(f);
    counterEl.textContent = 'f ' + (f + 1) + ' / ' + FRAMES;
    playBtn.textContent = playing ? 'Pause' : (atEnd() ? 'Replay' : 'Play');
  }

  function pauseForReview() {
    playing = false;
    if (state === 'watching') state = 'review';
  }

  function togglePlay() {
    if (!canDrive()) return;
    if (playing) {
      pauseForReview();
    } else {
      if (atEnd()) playhead = 0;
      playing = true;
    }
    syncDeck();
  }

  function stepFrame(dir) {
    if (!canDrive()) return;
    pauseForReview();
    playhead = Math.min(Math.max(Math.round(playhead) + dir, 0), FRAMES - 1);
    syncDeck();
  }

  function onScrub() {
    if (!canDrive()) return;
    pauseForReview();
    playhead = Number(scrub.value);
    syncDeck();
  }

  /* ---------- making the call ---------- */

  function makeCall(saidOffside) {
    if (!canDrive()) return;
    Arcade.trackPlay('coaches-challenge');
    playing = false;
    if (saidOffside === round.offside) {
      state = 'verdict';
      verdictT = 0;
      playhead = round.decisive;
      streak++;
      streakEl.textContent = String(streak);
      syncDeck();
      Arcade.vibrate(20);
      nextTimer = setTimeout(function () {
        if (state !== 'verdict') return;
        roundIndex++;
        newRound();
      }, 1400);
    } else {
      gameOver();
    }
  }

  function gameOver() {
    state = 'over';
    playhead = round.decisive;
    syncDeck();
    var truth = 'It was ' + (round.offside ? 'offside' : 'onside') + ' by ' +
      round.margin + ' ' + frameWord(round.margin) + '.';
    var newBest = Arcade.saveBest(BEST_KEY, streak);
    bestEl.textContent = Arcade.best(BEST_KEY);
    overlayTitle.textContent = 'Wrong call';
    overlayMsg.textContent = truth + ' Streak: ' + streak + '.' +
      (newBest ? ' New best.' : ' Best is ' + Arcade.best(BEST_KEY) + '.');
    overlayBtn.textContent = 'Run it back';
    overlay.hidden = false;
    Arcade.vibrate(60);
  }

  function start() {
    if (nextTimer) { clearTimeout(nextTimer); nextTimer = null; }
    streak = 0;
    roundIndex = 0;
    streakEl.textContent = '0';
    overlay.hidden = true;
    newRound();
  }

  /* ---------- input ---------- */

  // One listener on the overlay covers the button too (click bubbles up),
  // so a tap anywhere on the game-over card restarts.
  overlay.addEventListener('click', function () {
    if (state === 'idle' || state === 'over') start();
  });
  playBtn.addEventListener('click', togglePlay);
  backBtn.addEventListener('click', function () { stepFrame(-1); });
  fwdBtn.addEventListener('click', function () { stepFrame(1); });
  scrub.addEventListener('input', onScrub);
  onsideBtn.addEventListener('click', function () { makeCall(false); });
  offsideBtn.addEventListener('click', function () { makeCall(true); });

  // Tapping the replay itself plays/pauses, like a video player.
  Arcade.onTap(canvas, function () { togglePlay(); });

  Arcade.onKey([' '], function () {
    if (state === 'idle' || state === 'over') start();
    else togglePlay();
  });
  Arcade.onKey(['Enter'], function () {
    if (state === 'idle' || state === 'over') start();
  });
  Arcade.onKey(['ArrowLeft'], function () { stepFrame(-1); });
  Arcade.onKey(['ArrowRight'], function () { stepFrame(1); });
  Arcade.onKey(['o', 'O'], function () { makeCall(false); });
  Arcade.onKey(['f', 'F'], function () { makeCall(true); });

  /* ---------- drawing ---------- */

  function lerpPos(arr, ph) {
    var f0 = Math.floor(ph);
    var f1 = Math.min(f0 + 1, FRAMES - 1);
    var t = ph - f0;
    var a = arr[f0], b = arr[f1];
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }

  function drawRink(flashLine) {
    ctx.fillStyle = C.surface;
    ctx.fillRect(0, 0, W, H);

    // faint faceoff circle and dot for flavor
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;
    ctx.beginPath(); ctx.arc(84, 150, 44, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(84, 150, 4, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;

    // the blue line
    ctx.fillStyle = C.accent;
    ctx.globalAlpha = flashLine ? 0.45 + 0.55 * Math.abs(Math.sin(verdictT * 9)) : 0.85;
    ctx.fillRect(LINE_X - 3, 0, 6, H);
    ctx.globalAlpha = 1;

    // board edges
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, BOARD);
    ctx.fillRect(0, H - BOARD, W, BOARD);
  }

  function drawSkater(p, fill, r) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.bgDeep;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawVerdict(m) {
    // marker showing the gap between the teammate and the line
    ctx.strokeStyle = C.warning;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(LINE_X, m.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(m.x, m.y - 7); ctx.lineTo(m.x, m.y + 7);
    ctx.moveTo(LINE_X, m.y - 7); ctx.lineTo(LINE_X, m.y + 7);
    ctx.stroke();

    if (state !== 'verdict') return;

    var label = (round.offside ? 'Offside by ' : 'Onside by ') +
      round.margin + ' ' + frameWord(round.margin) + '.';
    ctx.font = '600 15px Inter, system-ui, sans-serif';
    var bw = ctx.measureText(label).width + 28;
    var bh = 32;
    var bx = (W - bw) / 2;
    var by = 16;
    ctx.fillStyle = C.bgDeep;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(bx, by, bw, bh);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = C.success;
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = C.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, W / 2, by + bh / 2 + 1);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  function drawScene() {
    drawRink(state === 'verdict');
    if (!round) return;

    var d = lerpPos(round.dman, playhead);
    var c = lerpPos(round.carrier, playhead);
    var m = lerpPos(round.mate, playhead);
    var p = lerpPos(round.puck, playhead);

    drawSkater(d, C.dim, 10);      // backing-up defender, noise
    drawSkater(c, C.accent, 11);   // puck carrier
    drawSkater(m, C.accentHover, 11); // the trailing teammate you judge

    // subtle pulsing ring marks the guy the call is about
    ctx.strokeStyle = C.accentHover;
    ctx.globalAlpha = 0.35 + 0.25 * Math.sin(clock * 4);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(m.x, m.y, 17 + 2 * Math.sin(clock * 4), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // the puck, drawn from its own precomputed frames
    ctx.fillStyle = C.text;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();

    if (state === 'verdict' || state === 'over') drawVerdict(m);
  }

  Arcade.loop(function (dt) {
    clock += dt;
    if (state === 'verdict') verdictT += dt;
    if (playing && canDrive()) {
      playhead += dt * FPS;
      if (playhead >= FRAMES - 1) {
        playhead = FRAMES - 1;
        playing = false;
        if (state === 'watching') state = 'review';
      }
      syncDeck();
    }
    drawScene();
  });
})();
