/* The Telestrator — draw the route, then watch your skater run EXACTLY
   what you drew. Prototype for the hidden Scout Elite Arcade. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var W = 360, H = 480;
  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);
  canvas.style.touchAction = 'none';

  // ---- rink geometry ----
  var M = 8;                          // board inset
  var PAD = 18;                       // route stays this far inside the canvas
  var NET_CX = W / 2, NET_W = 56, NET_DEPTH = 13, GOAL_Y = 40;
  var POST_L = NET_CX - NET_W / 2, POST_R = NET_CX + NET_W / 2;
  var CREASE_R = 30;
  var GOALIE_W = 26, GOALIE_H = 10, GOALIE_Y = 53;
  var GOALIE_RANGE = 19;              // max x offset from net center
  var GOALIE_SPEED = 90;              // px/s lateral

  // ---- tuning ----
  var SKATE_SPEED = 150;              // px/s along the route
  var LEAD = 0.35;                    // defenders aim this many seconds ahead
  var POKE_DIST = 15;                 // defender within this of skater = turnover
  var BLOCK_DIST = 11;                // body within this of the shot line = block
  var SHOT_SPEED = 620;               // puck trace speed, px/s
  var MIN_SEG = 2.5;                  // min sampled segment while drawing

  // ---- levels: skater start, defender starts, pursuit speed, ink budget ----
  var LEVELS = [
    { ink: 700, dspeed: 0,   start: { x: 180, y: 430 },
      defs: [{ x: 180, y: 235 }] },
    { ink: 640, dspeed: 105, start: { x: 120, y: 430 },
      defs: [{ x: 126, y: 225 }, { x: 234, y: 225 }] },
    { ink: 580, dspeed: 118, start: { x: 240, y: 430 },
      defs: [{ x: 126, y: 215 }, { x: 234, y: 215 }] },
    { ink: 520, dspeed: 126, start: { x: 180, y: 435 },
      defs: [{ x: 104, y: 210 }, { x: 256, y: 210 }, { x: 180, y: 140 }] },
    { ink: 460, dspeed: 135, start: { x: 130, y: 435 },
      defs: [{ x: 104, y: 205 }, { x: 256, y: 205 }, { x: 180, y: 135 }] }
  ];

  var STORE_KEY = 'telestrator';

  var levelEl = document.getElementById('level');
  var starsEl = document.getElementById('stars');
  var inkFill = document.getElementById('ink-fill');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayBtn = document.getElementById('overlay-btn');
  var btnRun = document.getElementById('btn-run');
  var btnRedraw = document.getElementById('btn-redraw');
  var btnNext = document.getElementById('btn-next');

  var state = 'idle'; // idle | draw | ready | run | shot | result | complete
  var levelIx = 0;
  var level = LEVELS[0];

  var route = [];     // polyline; route[0] is always the skater start
  var cum = [];       // cumulative length at each route point
  var inkUsed = 0;
  var drawing = false;

  var skater = { x: 0, y: 0 };
  var heading = -Math.PI / 2;
  var puckOnStick = true;
  var runDist = 0;
  var defs = [];
  var goalie = { x: NET_CX };
  var shot = null;

  var resultTitle = '', resultSub = '';
  var effects = [];   // expanding rings {x, y, t, dur, r0, r1, color}
  var flash = null;   // full-canvas flash {t, dur, color}

  var bestStars = Arcade.recall(STORE_KEY, [0, 0, 0, 0, 0]);
  if (!bestStars || bestStars.length !== LEVELS.length) bestStars = [0, 0, 0, 0, 0];
  var earned = [0, 0, 0, 0, 0]; // this run

  // ---- small helpers ----

  function starString(n) {
    var s = '';
    for (var i = 0; i < 3; i++) s += i < n ? '★' : '☆';
    return s;
  }

  function sum(arr) {
    var s = 0;
    for (var i = 0; i < arr.length; i++) s += arr[i];
    return s;
  }

  function updateHud() {
    levelEl.textContent = String(levelIx + 1);
    starsEl.textContent = starString(bestStars[levelIx]);
  }

  function updateInk() {
    var left = Math.max(0, 1 - inkUsed / level.ink);
    inkFill.style.width = (left * 100).toFixed(1) + '%';
    inkFill.className = left < 0.15 ? 'ink-meter__fill ink-meter__fill--low' : 'ink-meter__fill';
  }

  function showButtons(run, redrawBtn, next) {
    btnRun.hidden = !run;
    btnRedraw.hidden = !redrawBtn;
    btnNext.hidden = !next;
  }

  function pointSegDist(px, py, ax, ay, bx, by) {
    var dx = bx - ax, dy = by - ay;
    var l2 = dx * dx + dy * dy;
    var t = l2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
    t = Math.max(0, Math.min(1, t));
    var qx = ax + t * dx, qy = ay + t * dy;
    return { d: Math.sqrt((px - qx) * (px - qx) + (py - qy) * (py - qy)), t: t };
  }

  // ---- route handling ----

  function routeTotal() { return cum.length ? cum[cum.length - 1] : 0; }

  function beginRoute() {
    route = [{ x: level.start.x, y: level.start.y }];
    cum = [0];
    inkUsed = 0;
    updateInk();
  }

  function clampPoint(p) {
    return {
      x: Math.min(W - PAD, Math.max(PAD, p.x)),
      y: Math.min(H - PAD, Math.max(PAD, p.y))
    };
  }

  function appendPoint(raw) {
    var budget = level.ink;
    if (inkUsed >= budget) return;
    var p = clampPoint(raw);
    var last = route[route.length - 1];
    var dx = p.x - last.x, dy = p.y - last.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    if (d < MIN_SEG) return;
    if (inkUsed + d > budget) {
      var t = (budget - inkUsed) / d;
      p = { x: last.x + dx * t, y: last.y + dy * t };
      d = budget - inkUsed;
    }
    route.push(p);
    inkUsed += d;
    cum.push(inkUsed);
    updateInk();
  }

  function pointAt(d) {
    var n = route.length;
    if (n === 0) return { x: level.start.x, y: level.start.y };
    if (d <= 0 || n === 1) return { x: route[0].x, y: route[0].y };
    var total = cum[n - 1];
    if (d >= total) return { x: route[n - 1].x, y: route[n - 1].y };
    var i = 1;
    while (cum[i] < d) i++;
    var t = (d - cum[i - 1]) / (cum[i] - cum[i - 1]);
    return {
      x: route[i - 1].x + (route[i].x - route[i - 1].x) * t,
      y: route[i - 1].y + (route[i].y - route[i - 1].y) * t
    };
  }

  // ---- pointer input: drawing is a drag on the canvas ----

  function toLogical(e) {
    var r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (W / r.width),
      y: (e.clientY - r.top) * (H / r.height)
    };
  }

  canvas.addEventListener('pointerdown', function (e) {
    if (state !== 'draw' && state !== 'ready') return;
    e.preventDefault();
    if (canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
    }
    drawing = true;
    state = 'draw';
    showButtons(false, false, false);
    if (route.length === 0) beginRoute();
    // the route is anchored at the skater: a drag starting elsewhere
    // connects from the last route point (initially the skater)
    appendPoint(toLogical(e));
  });

  canvas.addEventListener('pointermove', function (e) {
    if (!drawing) return;
    e.preventDefault();
    appendPoint(toLogical(e));
  });

  function endStroke() {
    if (!drawing) return;
    drawing = false;
    if (routeTotal() > 6) {
      state = 'ready';
      showButtons(true, true, false);
    }
  }
  canvas.addEventListener('pointerup', endStroke);
  canvas.addEventListener('pointercancel', endStroke);

  // ---- level flow ----

  function resetActors() {
    skater = { x: level.start.x, y: level.start.y };
    heading = -Math.PI / 2;
    puckOnStick = true;
    defs = level.defs.map(function (d) { return { x: d.x, y: d.y }; });
    goalie = { x: NET_CX };
    shot = null;
    runDist = 0;
  }

  function loadLevel(ix) {
    levelIx = ix;
    level = LEVELS[ix];
    route = []; cum = []; inkUsed = 0;
    resetActors();
    resultTitle = ''; resultSub = '';
    effects = []; flash = null;
    state = 'draw';
    showButtons(false, false, false);
    updateHud();
    updateInk();
  }

  function redraw() {
    route = []; cum = []; inkUsed = 0;
    resetActors();
    resultTitle = ''; resultSub = '';
    state = 'draw';
    showButtons(false, false, false);
    updateInk();
  }

  function runIt() {
    if (state !== 'ready') return;
    resetActors();
    state = 'run';
    showButtons(false, false, false);
  }

  // ---- run, shot, results ----

  function startShot() {
    var end = route[route.length - 1];
    // shoot at the post farther from the goalie's center
    var target = goalie.x >= NET_CX
      ? { x: POST_L + 6, y: GOAL_Y }
      : { x: POST_R - 6, y: GOAL_Y };
    var dx = target.x - end.x, dy = target.y - end.y;
    var len = Math.sqrt(dx * dx + dy * dy);
    var blockers = defs.map(function (d) { return { x: d.x, y: d.y, kind: 'defender' }; });
    blockers.push({ x: goalie.x, y: GOALIE_Y, kind: 'goalie' });
    var hit = null;
    for (var i = 0; i < blockers.length; i++) {
      var b = blockers[i];
      var r = pointSegDist(b.x, b.y, end.x, end.y, target.x, target.y);
      if (r.d <= BLOCK_DIST && (!hit || r.t < hit.t)) hit = { t: r.t, kind: b.kind };
    }
    shot = {
      ax: end.x, ay: end.y, bx: target.x, by: target.y,
      len: len, d: 0,
      blockedBy: hit ? hit.kind : null,
      stopAt: hit ? Math.max(hit.t * len, 1) : len
    };
    puckOnStick = false;
    state = 'shot';
  }

  function shotPuckPos() {
    var t = shot.len > 0 ? shot.d / shot.len : 1;
    return { x: shot.ax + (shot.bx - shot.ax) * t, y: shot.ay + (shot.by - shot.ay) * t };
  }

  function turnover() {
    state = 'result';
    puckOnStick = false;
    resultTitle = 'Turnover.';
    resultSub = 'Poke check. He ran exactly what you drew.';
    effects.push({ x: skater.x, y: skater.y, t: 0, dur: 0.5, r0: 10, r1: 42, color: C.danger });
    flash = { t: 0, dur: 0.25, color: C.danger };
    Arcade.vibrate(60);
    showButtons(false, true, false);
  }

  function blockedResult() {
    state = 'result';
    resultTitle = 'Blocked.';
    resultSub = shot.blockedBy === 'goalie'
      ? 'The goalie read it the whole way.'
      : 'Right into a shin pad.';
    var p = shotPuckPos();
    effects.push({ x: p.x, y: p.y, t: 0, dur: 0.5, r0: 6, r1: 30, color: C.warning });
    showButtons(false, true, false);
  }

  function goalResult() {
    state = 'result';
    var frac = 1 - inkUsed / level.ink;
    var stars = frac >= 0.25 ? 3 : frac >= 0.10 ? 2 : 1;
    if (stars > earned[levelIx]) earned[levelIx] = stars;
    if (stars > bestStars[levelIx]) {
      bestStars[levelIx] = stars;
      Arcade.store(STORE_KEY, bestStars);
    }
    updateHud();
    resultTitle = 'Goal!';
    resultSub = starString(stars) + '  Ink used: ' + Math.round(inkUsed) + ' of ' + level.ink + '.';
    effects.push({ x: shot.bx, y: shot.by, t: 0, dur: 0.7, r0: 8, r1: 64, color: C.success });
    effects.push({ x: shot.bx, y: shot.by, t: -0.12, dur: 0.7, r0: 4, r1: 44, color: C.success });
    flash = { t: 0, dur: 0.3, color: C.success };
    Arcade.vibrate(80);
    btnNext.textContent = levelIx === LEVELS.length - 1 ? 'Finish clinic' : 'Next level';
    showButtons(false, false, true);
  }

  function showComplete() {
    state = 'complete';
    overlayTitle.textContent = 'Clinic complete.';
    overlayMsg.textContent = 'This run: ' + sum(earned) + ' of 15 stars. Your best: '
      + sum(bestStars) + ' of 15. The whiteboard never lies.';
    overlayBtn.textContent = 'Run it back';
    overlay.hidden = false;
    showButtons(false, false, false);
  }

  // ---- buttons and keys ----

  btnRun.addEventListener('click', runIt);
  btnRedraw.addEventListener('click', function () {
    if (state === 'ready' || state === 'result') redraw();
  });
  btnNext.addEventListener('click', function () {
    if (state !== 'result') return;
    if (levelIx === LEVELS.length - 1) showComplete();
    else loadLevel(levelIx + 1);
  });
  overlayBtn.addEventListener('click', function () {
    if (state === 'complete') {
      earned = [0, 0, 0, 0, 0];
      loadLevel(0);
    }
    overlay.hidden = true;
    if (state === 'idle') state = 'draw';
  });

  Arcade.onKey(['Enter', ' '], function () {
    if (!overlay.hidden) { overlayBtn.click(); return; }
    if (!btnRun.hidden) runIt();
    else if (!btnNext.hidden) btnNext.click();
  });
  Arcade.onKey(['r', 'R'], function () {
    if (state === 'ready' || state === 'result') redraw();
  });

  // ---- simulation ----

  function update(dt) {
    for (var i = effects.length - 1; i >= 0; i--) {
      effects[i].t += dt;
      if (effects[i].t > effects[i].dur) effects.splice(i, 1);
    }
    if (flash) {
      flash.t += dt;
      if (flash.t > flash.dur) flash = null;
    }

    if (state === 'run') {
      runDist += SKATE_SPEED * dt;
      var total = routeTotal();
      var prevX = skater.x, prevY = skater.y;
      var pos = pointAt(Math.min(runDist, total));
      skater.x = pos.x;
      skater.y = pos.y;
      if (pos.x !== prevX || pos.y !== prevY) {
        heading = Math.atan2(pos.y - prevY, pos.x - prevX);
      }

      // goalie shadows the skater's x, clamped to the crease
      var want = Math.min(NET_CX + GOALIE_RANGE, Math.max(NET_CX - GOALIE_RANGE, skater.x));
      var gd = want - goalie.x;
      var gmax = GOALIE_SPEED * dt;
      goalie.x += Math.max(-gmax, Math.min(gmax, gd));

      // defenders chase a point 0.35s ahead on the route
      if (level.dspeed > 0) {
        var aim = pointAt(Math.min(runDist + SKATE_SPEED * LEAD, total));
        for (var j = 0; j < defs.length; j++) {
          var df = defs[j];
          var ddx = aim.x - df.x, ddy = aim.y - df.y;
          var dl = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dl > 0.5) {
            var step = Math.min(level.dspeed * dt, dl);
            df.x += ddx / dl * step;
            df.y += ddy / dl * step;
          }
        }
      }

      // poke check?
      for (var k = 0; k < defs.length; k++) {
        var sx = defs[k].x - skater.x, sy = defs[k].y - skater.y;
        if (Math.sqrt(sx * sx + sy * sy) <= POKE_DIST) { turnover(); return; }
      }

      if (runDist >= total) startShot();
    } else if (state === 'shot') {
      shot.d += SHOT_SPEED * dt;
      if (shot.d >= shot.stopAt) {
        shot.d = shot.stopAt;
        if (shot.blockedBy) blockedResult();
        else goalResult();
      }
    }
  }

  // ---- rendering ----

  function rinkPath() {
    var rTop = 52, rBot = 14;
    var x0 = M, y0 = M, x1 = W - M, y1 = H - M;
    ctx.beginPath();
    ctx.moveTo(x0 + rTop, y0);
    ctx.lineTo(x1 - rTop, y0);
    ctx.arcTo(x1, y0, x1, y0 + rTop, rTop);
    ctx.lineTo(x1, y1 - rBot);
    ctx.arcTo(x1, y1, x1 - rBot, y1, rBot);
    ctx.lineTo(x0 + rBot, y1);
    ctx.arcTo(x0, y1, x0, y1 - rBot, rBot);
    ctx.lineTo(x0, y0 + rTop);
    ctx.arcTo(x0, y0, x0 + rTop, y0, rTop);
    ctx.closePath();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  function drawRink() {
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    rinkPath();
    ctx.fillStyle = C.surface;
    ctx.fill();

    ctx.save();
    rinkPath();
    ctx.clip();

    // goal line
    ctx.fillStyle = C.danger;
    ctx.globalAlpha = 0.65;
    ctx.fillRect(M, GOAL_Y - 1.5, W - 2 * M, 3);
    ctx.globalAlpha = 1;

    // crease
    ctx.fillStyle = C.accent;
    ctx.globalAlpha = 0.14;
    ctx.beginPath();
    ctx.arc(NET_CX, GOAL_Y, CREASE_R, 0, Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(NET_CX, GOAL_Y, CREASE_R, 0, Math.PI, false);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // faceoff circles and dots
    ctx.strokeStyle = C.line;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(110, 112, 34, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(250, 112, 34, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.danger;
    ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.arc(110, 112, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(250, 112, 5, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // net
    ctx.fillStyle = C.bgDeep;
    ctx.fillRect(POST_L, GOAL_Y - NET_DEPTH, NET_W, NET_DEPTH);
    ctx.strokeStyle = C.text;
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = 2;
    ctx.strokeRect(POST_L, GOAL_Y - NET_DEPTH, NET_W, NET_DEPTH);
    ctx.globalAlpha = 1;

    ctx.restore();

    // boards
    rinkPath();
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function drawRoute() {
    if (route.length < 2) return;
    ctx.save();
    ctx.strokeStyle = C.accent;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.setLineDash([7, 6]);
    ctx.beginPath();
    ctx.moveTo(route[0].x, route[0].y);
    for (var i = 1; i < route.length; i++) ctx.lineTo(route[i].x, route[i].y);
    ctx.stroke();
    ctx.restore();

    // X marks the shot
    var end = route[route.length - 1];
    ctx.strokeStyle = C.accentHover;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(end.x - 5, end.y - 5); ctx.lineTo(end.x + 5, end.y + 5);
    ctx.moveTo(end.x + 5, end.y - 5); ctx.lineTo(end.x - 5, end.y + 5);
    ctx.stroke();
  }

  function drawDefenders() {
    for (var i = 0; i < defs.length; i++) {
      ctx.fillStyle = C.dim;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(defs[i].x, defs[i].y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = C.bgDeep;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function drawGoalie() {
    ctx.fillStyle = C.text;
    roundRect(goalie.x - GOALIE_W / 2, GOALIE_Y - GOALIE_H / 2, GOALIE_W, GOALIE_H, 4);
    ctx.fill();
  }

  function drawSkater() {
    ctx.fillStyle = C.accent;
    ctx.beginPath();
    ctx.arc(skater.x, skater.y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.bgDeep;
    ctx.lineWidth = 2;
    ctx.stroke();
    if (puckOnStick) {
      var px = skater.x + Math.cos(heading) * 12 + Math.cos(heading + Math.PI / 2) * 5;
      var py = skater.y + Math.sin(heading) * 12 + Math.sin(heading + Math.PI / 2) * 5;
      ctx.fillStyle = C.bgDeep;
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawShot() {
    if (!shot) return;
    var p = shotPuckPos();
    ctx.strokeStyle = C.text;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(shot.ax, shot.ay);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.text;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawEffects() {
    for (var i = 0; i < effects.length; i++) {
      var ef = effects[i];
      if (ef.t < 0) continue;
      var k = ef.t / ef.dur;
      ctx.strokeStyle = ef.color;
      ctx.globalAlpha = 1 - k;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(ef.x, ef.y, ef.r0 + (ef.r1 - ef.r0) * k, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (flash) {
      ctx.fillStyle = flash.color;
      ctx.globalAlpha = 0.28 * (1 - flash.t / flash.dur);
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
  }

  function drawBanner() {
    if (state !== 'result' || !resultTitle) return;
    var bw = 260, bh = 78, bx = (W - bw) / 2, by = 196;
    ctx.fillStyle = C.bgDeep;
    ctx.globalAlpha = 0.88;
    roundRect(bx, by, bw, bh, 10);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    roundRect(bx, by, bw, bh, 10);
    ctx.stroke();
    ctx.fillStyle = C.text;
    ctx.font = '700 26px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(resultTitle, W / 2, by + 36);
    ctx.fillStyle = C.dim;
    ctx.font = '400 13px Inter, sans-serif';
    ctx.fillText(resultSub, W / 2, by + 58);
    ctx.textAlign = 'left';
  }

  function drawHint() {
    if (state !== 'draw' || drawing || route.length > 1) return;
    ctx.fillStyle = C.dim;
    ctx.font = '400 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Draw his route', level.start.x, level.start.y - 24);
    ctx.textAlign = 'left';
  }

  function draw() {
    drawRink();
    drawRoute();
    drawDefenders();
    drawGoalie();
    drawSkater();
    if (state === 'shot' || (state === 'result' && shot)) drawShot();
    drawEffects();
    drawBanner();
    drawHint();
  }

  loadLevel(0);
  state = 'idle'; // wait behind the intro overlay

  Arcade.loop(function (dt) {
    update(dt);
    draw();
  });
})();
