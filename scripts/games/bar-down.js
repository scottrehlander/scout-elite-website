/* Bar Down — one-touch puck juggling against a clock.

   The camera looks down on a net lying mouth-up, so the puck drops into it
   the way a ball drops through a hoop. Tap to loft it, ride it off the
   boards, and drop it in. Straight down the middle is a bar down: it pays
   double AND builds the multiplier, so the clean shot is the whole game.

   One puck, all run. Scoring pops it back out off the mesh, which is what a
   real puck does and means play never stops to reset; the net then slides
   away to a new spot. The red pipe is solid, so clipping a post pings the
   puck back out rather than counting.

   Goals buy time, and only the clock can end a run.
   Prototype for the Scout Elite Arcade. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var W = 360, H = 520;
  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);

  /* ---- geometry ---- */
  var BOARD_W = 10;                 // side boards
  var GLASS_Y = 54;                 // top of the glass: the puck cannot leave
  var ICE_Y = 486;                  // where a miss lands
  var PUCK_R = 8;
  var NET_W = 96;                   // mouth width
  var NET_D = 34;                   // how deep the mesh reads below the mouth
  var NET_Y_MIN = 250;              // the net roams within this band
  var NET_Y_MAX = 430;

  /* ---- tuning ---- */
  var GRAV = 620;                   // px/s^2
  var TAP_VY = -300;                // a tap sets rise, it does not stack
  var VX_BASE = 104;                // horizontal speed, never decays
  var VX_STEP = 4;                  // +per goal, so it tightens as you go
  var VX_MAX = 178;
  var ICE_BOUNCE = 0.5;
  var START_TIME = 35;
  var GOAL_TIME = 4;
  var BAR_TIME = 5;
  var GOAL_PTS = 100;
  var BAR_PTS = 250;
  var MULT_CAP = 8;
  var CENTRE_FRAC = 0.19;           // this share either side of centre = bar down
  var NET_SLIDE = 300;              // px/s the net travels to its next spot
  var POP_VY = -292;                // how hard the mesh spits the puck back out

  var BEST_KEY = 'bar-down';
  var scoreEl = document.getElementById('score');
  var timeEl = document.getElementById('time');
  var multEl = document.getElementById('mult');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayBtn = document.getElementById('overlay-btn');

  var state = 'idle';               // idle | playing | over
  var puck, net, timeLeft, score, goals, bars, multiplier, vxMag;
  var floaters = [], rings = [], flash = null, iceMarks = [];

  // one net, which slides to its next spot after every goal
  function netHome() {
    var pad = BOARD_W + NET_W / 2 + 8;
    return pad + Math.random() * (W - pad * 2);
  }

  function moveNet() {
    var next;
    do { next = netHome(); } while (Math.abs(next - net.x) < 90);
    net.targetX = next;
    net.targetY = NET_Y_MIN + Math.random() * (NET_Y_MAX - NET_Y_MIN);
  }

  function spawnPuck() {
    puck = {
      x: W / 2 + (Math.random() * 60 - 30), y: 140,
      vx: (Math.random() < 0.5 ? -1 : 1) * vxMag, vy: 0,
      spin: 0, onIce: false
    };
  }

  function reset() {
    score = 0; goals = 0; bars = 0; multiplier = 1;
    timeLeft = START_TIME;
    vxMag = VX_BASE;
    floaters = []; rings = []; iceMarks = []; flash = null;
    net = { x: netHome(), y: NET_Y_MAX - 20, glow: 0 };
    net.targetX = net.x;
    net.targetY = net.y;
    spawnPuck();
    syncHud();
  }

  function syncHud() {
    scoreEl.textContent = String(score);
    timeEl.textContent = String(Math.max(0, Math.ceil(timeLeft)));
    multEl.textContent = 'x' + multiplier;
  }

  function start() {
    reset();
    state = 'playing';
    overlay.hidden = true;
  }

  function gameOver() {
    state = 'over';
    Arcade.trackDone('bar-down', { score: score, goals: goals, bars: bars });
    var newBest = Arcade.saveBest(BEST_KEY, score);
    overlayTitle.textContent = 'Horn sounds';
    overlayMsg.textContent = (newBest ? 'New best: ' : '')
      + score + ' points on ' + goals + (goals === 1 ? ' goal' : ' goals')
      + (bars > 0 ? ', ' + bars + ' of them bar down.' : '.')
      + (newBest ? '' : ' Best is ' + Arcade.best(BEST_KEY) + '.');
    overlayBtn.textContent = 'Another shift';
    overlay.hidden = false;
    Arcade.vibrate(60);
  }

  function tap() {
    if (state !== 'playing') return;
    Arcade.trackPlay('bar-down');
    puck.vy = TAP_VY;
    puck.onIce = false;
    rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.26, r0: PUCK_R + 2, r1: 20, color: C.accent });
    Arcade.vibrate(8);
  }

  Arcade.onTap(canvas, function () { if (state === 'playing') tap(); else start(); });
  Arcade.onKey([' ', 'ArrowUp', 'Enter'], function () { if (state === 'playing') tap(); else start(); });
  overlayBtn.addEventListener('click', start);

  function scoreGoal(net, barDown) {
    goals++;
    if (barDown) bars++;
    var pts = (barDown ? BAR_PTS : GOAL_PTS) * multiplier;
    score += pts;
    // only a clean one down the middle builds the multiplier
    if (barDown) multiplier = Math.min(multiplier + 1, MULT_CAP);
    timeLeft += barDown ? BAR_TIME : GOAL_TIME;
    vxMag = Math.min(vxMag + VX_STEP, VX_MAX);

    floaters.push({
      x: W / 2, y: 200,
      text: barDown ? 'BAR DOWN!  +' + pts : '+' + pts,
      t: 0, life: barDown ? 1.1 : 0.75,
      color: barDown ? C.warning : C.success,
      size: barDown ? 25 : 18
    });
    if (barDown && multiplier > 1) {
      floaters.push({ x: W / 2, y: 232, text: 'multiplier x' + multiplier, t: 0, life: 0.9, color: C.accentHover, size: 15 });
    }
    rings.push({ x: net.x, y: net.y, t: 0, dur: 0.6, r0: 10, r1: 64, color: barDown ? C.warning : C.success });
    flash = { t: 0, dur: 0.22, color: barDown ? C.warning : C.success };
    net.glow = 0.6;
    Arcade.vibrate(barDown ? 55 : 28);

    // the mesh spits it back out, which is what a real puck does, so the same
    // puck stays in play and there is nothing to reset
    puck.x = net.x;
    puck.y = net.y + NET_D * 0.5;
    puck.vy = POP_VY;
    puck.vx = (puck.vx >= 0 ? 1 : -1) * Math.max(Math.abs(puck.vx) * 0.85, 55);
    puck.onIce = false;
    moveNet();
    syncHud();
  }

  function offThePost(off) {
    puck.y = net.y - PUCK_R - 1;
    puck.vy = -Math.abs(puck.vy) * 0.62 - 30;
    puck.vx = (off >= 0 ? 1 : -1) * Math.max(Math.abs(puck.vx), 70);
    net.glow = 0.3;
    rings.push({ x: net.x + off, y: net.y, t: 0, dur: 0.34, r0: 5, r1: 26, color: C.danger });
    floaters.push({ x: net.x + off, y: net.y - 26, text: 'off the post', t: 0, life: 0.6, color: C.danger, size: 13 });
    Arcade.vibrate(18);
  }

  function missed() {
    if (multiplier > 1) {
      floaters.push({ x: puck.x, y: ICE_Y - 40, text: 'multiplier gone', t: 0, life: 0.8, color: C.dim, size: 13 });
    }
    multiplier = 1;
    syncHud();
  }

  function update(dt) {
    for (var f = floaters.length - 1; f >= 0; f--) {
      floaters[f].t += dt;
      floaters[f].y -= 20 * dt;
      if (floaters[f].t > floaters[f].life) floaters.splice(f, 1);
    }
    for (var r = rings.length - 1; r >= 0; r--) {
      rings[r].t += dt;
      if (rings[r].t > rings[r].dur) rings.splice(r, 1);
    }
    if (flash) { flash.t += dt; if (flash.t > flash.dur) flash = null; }
    if (net && net.glow > 0) net.glow = Math.max(0, net.glow - dt);

    if (state !== 'playing') return;

    timeLeft -= dt;
    if (timeLeft <= 0) { timeLeft = 0; syncHud(); gameOver(); return; }
    syncHud();

    // the net slides to wherever it is headed next
    var ndx = net.targetX - net.x, ndy = net.targetY - net.y;
    var nd = Math.sqrt(ndx * ndx + ndy * ndy);
    if (nd > 1) {
      var step = Math.min(NET_SLIDE * dt, nd);
      net.x += ndx / nd * step;
      net.y += ndy / nd * step;
    }

    var prevY = puck.y;
    puck.vy += GRAV * dt;
    puck.x += puck.vx * dt;
    puck.y += puck.vy * dt;
    puck.spin += puck.vx * dt * 0.05;

    // glass, so an eager tapper gets the puck back instead of losing it
    if (puck.y - PUCK_R < GLASS_Y) {
      puck.y = GLASS_Y + PUCK_R;
      puck.vy = Math.abs(puck.vy) * 0.5 + 40;
      rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.22, r0: 6, r1: 16, color: C.dim });
    }

    // side boards
    if (puck.x - PUCK_R < BOARD_W) {
      puck.x = BOARD_W + PUCK_R;
      puck.vx = Math.abs(puck.vx);
      rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.22, r0: 6, r1: 16, color: C.dim });
    } else if (puck.x + PUCK_R > W - BOARD_W) {
      puck.x = W - BOARD_W - PUCK_R;
      puck.vx = -Math.abs(puck.vx);
      rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.22, r0: 6, r1: 16, color: C.dim });
    }

    /* Crossing the mouth on the way down. The red pipe is solid: clip a post
       and it pings back out instead of counting. */
    if (prevY <= net.y && puck.y > net.y && puck.vy > 0) {
      var off = puck.x - net.x;
      var a = Math.abs(off), half = NET_W / 2;
      if (a <= half - PUCK_R) {
        scoreGoal(net, a <= NET_W * CENTRE_FRAC);
        return;
      }
      if (a <= half + PUCK_R) {
        offThePost(off);
      }
    }

    // ice
    if (puck.y + PUCK_R > ICE_Y) {
      puck.y = ICE_Y - PUCK_R;
      if (puck.vy > 60) {
        iceMarks.push({ x: puck.x, t: 0 });
        if (iceMarks.length > 12) iceMarks.shift();
      }
      puck.vy = -puck.vy * ICE_BOUNCE;
      if (Math.abs(puck.vy) < 40) puck.vy = 0;
      if (!puck.onIce) { puck.onIce = true; missed(); }
    }
    for (var m = iceMarks.length - 1; m >= 0; m--) {
      iceMarks[m].t += dt;
      if (iceMarks[m].t > 1.4) iceMarks.splice(m, 1);
    }
  }

  /* ---- drawing ---- */

  function drawRink() {
    ctx.fillStyle = C.surface;
    ctx.fillRect(0, 0, W, H);

    // crowd band
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, GLASS_Y - 8);
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    for (var cx = 8; cx < W; cx += 13) {
      ctx.beginPath(); ctx.moveTo(cx, 10); ctx.lineTo(cx, GLASS_Y - 16); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // glass line
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, GLASS_Y); ctx.lineTo(W, GLASS_Y); ctx.stroke();

    // side boards with a red kickplate facing the ice
    ctx.fillStyle = '#dde5ec';
    ctx.fillRect(0, GLASS_Y, BOARD_W, H - GLASS_Y);
    ctx.fillRect(W - BOARD_W, GLASS_Y, BOARD_W, H - GLASS_Y);
    ctx.fillStyle = C.danger;
    ctx.fillRect(BOARD_W - 3, GLASS_Y, 3, H - GLASS_Y);
    ctx.fillRect(W - BOARD_W, GLASS_Y, 3, H - GLASS_Y);

    // the ice, where a miss lands
    ctx.fillStyle = '#e9eff5';
    ctx.fillRect(BOARD_W, ICE_Y, W - BOARD_W * 2, H - ICE_Y);
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(BOARD_W, ICE_Y); ctx.lineTo(W - BOARD_W, ICE_Y); ctx.stroke();

    ctx.strokeStyle = C.muted;
    ctx.lineWidth = 2;
    for (var i = 0; i < iceMarks.length; i++) {
      var mk = iceMarks[i];
      ctx.globalAlpha = 0.4 * (1 - mk.t / 1.4);
      ctx.beginPath();
      ctx.moveTo(mk.x - 9, ICE_Y + 9);
      ctx.lineTo(mk.x + 9, ICE_Y + 9);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* A hockey net seen from directly above: you are looking into the mouth and
     down at the mesh. Red pipe with white mesh is the pairing that makes it
     read as a hockey goal at a glance, which the last version had backwards. */
  function drawNet(n) {
    var net = n;
    var x = net.x, halfW = NET_W / 2;
    var top = net.y, bot = net.y + NET_D;

    // the throat, darkening as it goes back
    var grad = ctx.createLinearGradient(0, top, 0, bot);
    grad.addColorStop(0, 'rgba(8,10,13,0.94)');
    grad.addColorStop(1, 'rgba(20,26,32,0.82)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(x - halfW, top);
    ctx.lineTo(x + halfW, top);
    ctx.lineTo(x + halfW - 7, bot);
    ctx.lineTo(x - halfW + 7, bot);
    ctx.closePath();
    ctx.fill();

    // white mesh inside the throat
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = '#ffffff';
    ctx.globalAlpha = 0.34;
    ctx.lineWidth = 1;
    for (var gx = -halfW; gx <= halfW; gx += 9) {
      ctx.beginPath();
      ctx.moveTo(x + gx, top);
      ctx.lineTo(x + gx * 0.83, bot);
      ctx.stroke();
    }
    for (var gy = 0; gy <= NET_D; gy += 8) {
      ctx.beginPath();
      ctx.moveTo(x - halfW, top + gy);
      ctx.lineTo(x + halfW, top + gy);
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;

    // the centre lane: where a bar down lives
    ctx.fillStyle = C.warning;
    ctx.globalAlpha = 0.16 + net.glow * 0.34;
    ctx.fillRect(x - NET_W * CENTRE_FRAC, top + 2, NET_W * CENTRE_FRAC * 2, NET_D - 4);
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = C.warning;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x - NET_W * CENTRE_FRAC, top); ctx.lineTo(x - NET_W * CENTRE_FRAC, bot);
    ctx.moveTo(x + NET_W * CENTRE_FRAC, top); ctx.lineTo(x + NET_W * CENTRE_FRAC, bot);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // red pipe: the posts and the bar, seen from above
    ctx.strokeStyle = net.glow > 0 ? '#ff5566' : C.danger;
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x - halfW, top);
    ctx.lineTo(x + halfW, top);
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - halfW, top); ctx.lineTo(x - halfW + 7, bot);
    ctx.moveTo(x + halfW, top); ctx.lineTo(x + halfW - 7, bot);
    ctx.stroke();
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - halfW + 7, bot); ctx.lineTo(x + halfW - 7, bot);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.lineCap = 'butt';
  }

  function drawPuck() {
    ctx.save();
    ctx.translate(puck.x, puck.y);
    ctx.rotate(puck.spin);
    ctx.fillStyle = '#1b1b1b';
    ctx.beginPath();
    ctx.ellipse(0, 0, PUCK_R, PUCK_R * 0.84, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f2f2f2';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-PUCK_R + 3, 0); ctx.lineTo(PUCK_R - 3, 0);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();

    // a hint of the arc it is riding
    ctx.strokeStyle = C.accent;
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(puck.x - puck.vx * 0.07, puck.y - puck.vy * 0.07);
    ctx.lineTo(puck.x, puck.y);
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* Where it will cross the mouths, so choosing a net is a decision rather
       than a guess. Same physics as update(), boards included. */
    if (state === 'playing' && puck.vy > 0) {
      var t = 0, sx = puck.x, sy = puck.y, svx = puck.vx, svy = puck.vy;
      while (sy < net.y && t < 2.5) {
        svy += GRAV * (1 / 60);
        sx += svx * (1 / 60);
        sy += svy * (1 / 60);
        if (sx - PUCK_R < BOARD_W) { sx = BOARD_W + PUCK_R; svx = Math.abs(svx); }
        else if (sx + PUCK_R > W - BOARD_W) { sx = W - BOARD_W - PUCK_R; svx = -Math.abs(svx); }
        t += 1 / 60;
      }
      ctx.fillStyle = C.accentHover;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(sx, net.y - 12);
      ctx.lineTo(sx - 5, net.y - 22);
      ctx.lineTo(sx + 5, net.y - 22);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function draw() {
    drawRink();
    if (net) drawNet(net);
    if (puck && state !== 'idle') drawPuck();

    for (var r = 0; r < rings.length; r++) {
      var rg = rings[r];
      var k = rg.t / rg.dur;
      ctx.strokeStyle = rg.color;
      ctx.globalAlpha = 1 - k;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(rg.x, rg.y, rg.r0 + (rg.r1 - rg.r0) * k, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.textAlign = 'center';
    for (var f = 0; f < floaters.length; f++) {
      var fl = floaters[f];
      ctx.globalAlpha = 1 - fl.t / fl.life;
      ctx.fillStyle = fl.color;
      ctx.font = '700 ' + fl.size + 'px Inter, sans-serif';
      ctx.fillText(fl.text, fl.x, fl.y);
      ctx.globalAlpha = 1;
    }

    if (state === 'playing' && goals === 0 && net) {
      ctx.globalAlpha = 0.55 + 0.45 * Math.sin(Date.now() / 260);
      ctx.fillStyle = C.warning;
      ctx.font = '700 13px Inter, sans-serif';
      ctx.fillText('drop it straight down the middle', W / 2, Math.max(96, net.y - 46));
      ctx.globalAlpha = 1;
    }

    if (state === 'playing' && timeLeft <= 5) {
      ctx.globalAlpha = 0.35 + 0.3 * Math.sin(timeLeft * 12);
      ctx.fillStyle = C.danger;
      ctx.fillRect(0, 0, W, 5);
      ctx.fillRect(0, H - 5, W, 5);
      ctx.globalAlpha = 1;
    }

    if (flash) {
      ctx.globalAlpha = 0.16 * (1 - flash.t / flash.dur);
      ctx.fillStyle = flash.color;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
  }

  reset();
  state = 'idle';
  Arcade.loop(function (dt) {
    update(dt);
    draw();
  });
})();
