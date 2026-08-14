/* Bar Down — one-touch puck juggling against a clock. Tap to loft the puck,
   ride it off the boards, and drop it in under the crossbar. Goals buy time,
   so the run only ends when the clock does. Letting it hit the ice kills the
   streak multiplier, which is the whole risk: the greedy line scores most.
   Prototype for the Scout Elite Arcade. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var W = 360, H = 520;
  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);

  /* ---- geometry ---- */
  var BOARD_W = 10;                 // side boards
  var ICE_Y = 462;                  // ice surface
  var GLASS_Y = 58;                 // top of the glass: the puck cannot leave
  var PUCK_R = 7;
  var BAR_H = 108;                  // mouth height: crossbar to ice
  var NET_DEPTH = 42;

  /* ---- tuning ---- */
  var GRAV = 640;                   // px/s^2
  var TAP_VY = -298;                // a tap sets rise, it does not stack
  var VX_BASE = 108;                // horizontal speed, never decays
  var VX_STEP = 5;                  // +per goal, so it tightens as you go
  var VX_MAX = 184;
  var ICE_BOUNCE = 0.46;            // puck keeps some life off the ice
  var BAR_BOUNCE = 0.55;
  var START_TIME = 30;
  var GOAL_TIME = 4;                // seconds a goal buys
  var BAR_TIME = 5;                 // a bar-down buys more
  var GOAL_PTS = 100;
  var BAR_PTS = 250;
  var MULT_CAP = 6;
  var BAR_BAND = 24;                // crossing this close under the bar = bar down
  var OPEN_FRAC = 0.62;             // front share of the mouth you can drop into

  var BEST_KEY = 'bar-down';
  var scoreEl = document.getElementById('score');
  var timeEl = document.getElementById('time');
  var multEl = document.getElementById('mult');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayBtn = document.getElementById('overlay-btn');

  var state = 'idle';               // idle | playing | over
  var puck, net, timeLeft, score, goals, streak, bestStreak, vxMag, celebrate;
  var floaters = [];
  var rings = [];
  var flash = null;
  var iceMarks = [];                // scuff where the puck lands, pure flavour

  function mult() { return Math.min(1 + streak, MULT_CAP); }

  function placeNet(firstTime) {
    // keep the net clear of the boards and never right on top of the puck
    var min = 132, max = W - BOARD_W - NET_DEPTH - 14;
    var x;
    for (var tries = 0; tries < 12; tries++) {
      x = min + Math.random() * (max - min);
      if (firstTime || !puck || Math.abs(x - puck.x) > 90) break;
    }
    net = { x: x, barY: ICE_Y - BAR_H, backX: x + NET_DEPTH, glow: 0 };
  }

  function spawnPuck() {
    puck = {
      x: BOARD_W + 26, y: 150,
      vx: vxMag, vy: 0,
      spin: 0, onIce: false
    };
  }

  function reset() {
    score = 0; goals = 0; streak = 0; bestStreak = 0;
    timeLeft = START_TIME;
    vxMag = VX_BASE;
    celebrate = 0;
    floaters = []; rings = []; iceMarks = []; flash = null;
    placeNet(true);
    spawnPuck();
    syncHud();
  }

  function syncHud() {
    scoreEl.textContent = String(score);
    timeEl.textContent = String(Math.max(0, Math.ceil(timeLeft)));
    multEl.textContent = 'x' + mult();
  }

  function start() {
    reset();
    state = 'playing';
    overlay.hidden = true;
  }

  function gameOver() {
    state = 'over';
    Arcade.trackDone('bar-down', { score: score, goals: goals, streak: bestStreak });
    var newBest = Arcade.saveBest(BEST_KEY, score);
    overlayTitle.textContent = 'Horn sounds';
    overlayMsg.textContent = (newBest ? 'New best: ' : '')
      + score + ' points on ' + goals + (goals === 1 ? ' goal' : ' goals')
      + (bestStreak > 1 ? ', best run of ' + bestStreak + ' without touching the ice.' : '.')
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
    rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.28, r0: PUCK_R + 2, r1: 20, color: C.accent });
    Arcade.vibrate(8);
  }

  Arcade.onTap(canvas, function () {
    if (state === 'playing') tap();
    else start();
  });
  Arcade.onKey([' ', 'ArrowUp', 'Enter'], function () {
    if (state === 'playing') tap();
    else start();
  });
  overlayBtn.addEventListener('click', start);

  function scoreGoal(barDown) {
    goals++;
    var pts = (barDown ? BAR_PTS : GOAL_PTS) * mult();
    score += pts;
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    timeLeft += barDown ? BAR_TIME : GOAL_TIME;
    vxMag = Math.min(vxMag + VX_STEP, VX_MAX);

    floaters.push({
      x: W / 2, y: 170,
      text: barDown ? 'BAR DOWN!  +' + pts : '+' + pts,
      t: 0, life: barDown ? 1.1 : 0.8,
      color: barDown ? C.warning : C.success,
      size: barDown ? 24 : 18
    });
    if (mult() > 1) {
      floaters.push({
        x: W / 2, y: 200, text: 'x' + mult() + ' streak',
        t: 0, life: 0.8, color: C.accentHover, size: 14
      });
    }
    rings.push({ x: net.x + 12, y: net.barY + BAR_H / 2, t: 0, dur: 0.6, r0: 8, r1: 60,
      color: barDown ? C.warning : C.success });
    flash = { t: 0, dur: 0.22, color: barDown ? C.warning : C.success };
    net.glow = 0.6;
    Arcade.vibrate(barDown ? 55 : 30);
    celebrate = 0.45;
    syncHud();
  }

  function breakStreak() {
    if (streak > 0) {
      floaters.push({ x: puck.x, y: ICE_Y - 34, text: 'streak lost', t: 0, life: 0.7, color: C.dim, size: 13 });
    }
    streak = 0;
    syncHud();
  }

  function update(dt) {
    for (var f = floaters.length - 1; f >= 0; f--) {
      floaters[f].t += dt;
      floaters[f].y -= 22 * dt;
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

    // the puck sits in the net for a beat after a goal, then a fresh one drops
    if (celebrate > 0) {
      celebrate -= dt;
      if (celebrate <= 0) { placeNet(false); spawnPuck(); }
      return;
    }

    var prevX = puck.x, prevY = puck.y;
    puck.vy += GRAV * dt;
    puck.x += puck.vx * dt;
    puck.y += puck.vy * dt;
    puck.spin += puck.vx * dt * 0.05;

    // the glass: an over-eager tapper would otherwise park the puck off screen
    if (puck.y - PUCK_R < GLASS_Y) {
      puck.y = GLASS_Y + PUCK_R;
      puck.vy = Math.abs(puck.vy) * 0.5 + 40;
      rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.25, r0: 6, r1: 18, color: C.dim });
    }

    // side boards: ricochet, no speed lost
    if (puck.x - PUCK_R < BOARD_W) {
      puck.x = BOARD_W + PUCK_R;
      puck.vx = Math.abs(puck.vx);
      rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.25, r0: 6, r1: 18, color: C.dim });
    } else if (puck.x + PUCK_R > W - BOARD_W) {
      puck.x = W - BOARD_W - PUCK_R;
      puck.vx = -Math.abs(puck.vx);
      rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.25, r0: 6, r1: 18, color: C.dim });
    }

    // Dropping in over the top: the front of the mouth is open, the back half
    // is solid bar. Falling through the open part is the money shot.
    var openTo = net.x + NET_DEPTH * OPEN_FRAC;
    var descending = prevY + PUCK_R <= net.barY && puck.y + PUCK_R > net.barY && puck.vy > 0;
    if (descending && puck.x > net.x - PUCK_R && puck.x < openTo) {
      scoreGoal(true);
      return;
    }
    // the solid remainder of the crossbar swats it away
    if (puck.x >= openTo - PUCK_R && puck.x < net.backX + PUCK_R) {
      if (descending) {
        puck.y = net.barY - PUCK_R;
        puck.vy = -puck.vy * BAR_BOUNCE;
        net.glow = 0.35;
        rings.push({ x: puck.x, y: net.barY, t: 0, dur: 0.3, r0: 6, r1: 24, color: C.warning });
      } else if (prevY - PUCK_R >= net.barY && puck.y - PUCK_R < net.barY && puck.vy < 0) {
        puck.y = net.barY + PUCK_R;
        puck.vy = -puck.vy * BAR_BOUNCE;
      }
    }

    // goal: cross the goal line either way, under the bar and above the ice.
    // Both directions on purpose: a one-way net halves your chances and the
    // invisible back wall just reads as a bug.
    var crossed = (prevX < net.x && puck.x >= net.x) || (prevX > net.x && puck.x <= net.x);
    if (crossed && puck.y > net.barY && puck.y < ICE_Y) {
      scoreGoal(false);
      return;
    }

    // ice
    if (puck.y + PUCK_R > ICE_Y) {
      puck.y = ICE_Y - PUCK_R;
      if (puck.vy > 60) {
        iceMarks.push({ x: puck.x, t: 0 });
        if (iceMarks.length > 14) iceMarks.shift();
      }
      puck.vy = -puck.vy * ICE_BOUNCE;
      if (Math.abs(puck.vy) < 40) puck.vy = 0;
      if (!puck.onIce) { puck.onIce = true; breakStreak(); }
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

    // faint crowd band up top
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, 46);
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    for (var cx = 8; cx < W; cx += 13) {
      ctx.beginPath(); ctx.moveTo(cx, 10); ctx.lineTo(cx, 36); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // side boards
    ctx.fillStyle = '#dde5ec';
    ctx.fillRect(0, 46, BOARD_W, ICE_Y - 46);
    ctx.fillRect(W - BOARD_W, 46, BOARD_W, ICE_Y - 46);
    ctx.fillStyle = C.danger;
    ctx.fillRect(BOARD_W - 3, 46, 3, ICE_Y - 46);
    ctx.fillRect(W - BOARD_W, 46, 3, ICE_Y - 46);

    // ice surface and the kickplate under it
    ctx.fillStyle = '#e9eff5';
    ctx.fillRect(0, ICE_Y, W, H - ICE_Y);
    ctx.fillStyle = C.danger;
    ctx.fillRect(0, ICE_Y, W, 3);

    // scuff marks where the puck has landed
    ctx.strokeStyle = C.muted;
    ctx.lineWidth = 2;
    for (var i = 0; i < iceMarks.length; i++) {
      var mk = iceMarks[i];
      ctx.globalAlpha = 0.35 * (1 - mk.t / 1.4);
      ctx.beginPath();
      ctx.moveTo(mk.x - 9, ICE_Y + 7);
      ctx.lineTo(mk.x + 9, ICE_Y + 7);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawNet() {
    var x = net.x, by = net.barY;

    // mesh
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, by, NET_DEPTH, ICE_Y - by);
    ctx.clip();
    ctx.fillStyle = C.bgDeep;
    ctx.globalAlpha = 0.55;
    ctx.fillRect(x, by, NET_DEPTH, ICE_Y - by);
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = C.dim;
    ctx.lineWidth = 1;
    for (var g = 0; g <= NET_DEPTH; g += 7) {
      ctx.beginPath(); ctx.moveTo(x + g, by); ctx.lineTo(x + g, ICE_Y); ctx.stroke();
    }
    for (var g2 = 0; g2 <= ICE_Y - by; g2 += 7) {
      ctx.beginPath(); ctx.moveTo(x, by + g2); ctx.lineTo(x + NET_DEPTH, by + g2); ctx.stroke();
    }
    ctx.restore();
    ctx.globalAlpha = 1;

    // the open mouth you can drop into, so the target is obvious
    ctx.fillStyle = C.warning;
    ctx.globalAlpha = 0.10 + net.glow * 0.22;
    ctx.fillRect(x, by, NET_DEPTH * OPEN_FRAC, BAR_BAND);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = C.warning;
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(x, by); ctx.lineTo(x + NET_DEPTH * OPEN_FRAC, by);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // frame: crossbar, back, and the front post
    ctx.strokeStyle = net.glow > 0 ? C.warning : '#f2f2f2';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + NET_DEPTH * OPEN_FRAC, by); ctx.lineTo(x + NET_DEPTH, by); // solid bar
    ctx.moveTo(x + NET_DEPTH, by); ctx.lineTo(x + NET_DEPTH, ICE_Y);          // back
    ctx.stroke();
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, by); ctx.lineTo(x, ICE_Y);                   // the post you aim past
    ctx.stroke();
    ctx.lineCap = 'butt';
  }

  function drawPuck() {
    ctx.save();
    ctx.translate(puck.x, puck.y);
    ctx.rotate(puck.spin);
    ctx.fillStyle = '#1b1b1b';
    ctx.beginPath();
    ctx.ellipse(0, 0, PUCK_R, PUCK_R * 0.82, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f2f2f2';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = '#f2f2f2';
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-PUCK_R + 3, 0); ctx.lineTo(PUCK_R - 3, 0);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();

    // a hint of the arc it is on
    ctx.strokeStyle = C.accent;
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(puck.x - puck.vx * 0.06, puck.y - puck.vy * 0.06);
    ctx.lineTo(puck.x, puck.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function draw() {
    drawRink();
    if (net) drawNet();
    if (puck && state !== 'idle') drawPuck();

    for (var i = 0; i < rings.length; i++) {
      var rg = rings[i];
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

    // until the first goal, point at the thing they are meant to do
    if (state === 'playing' && goals === 0 && net) {
      var hx = net.x + NET_DEPTH * OPEN_FRAC / 2;
      var pulse = 0.55 + 0.45 * Math.sin(Date.now() / 260);
      ctx.globalAlpha = pulse;
      ctx.fillStyle = C.warning;
      ctx.font = '700 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('let it drop in here', hx, net.barY - 34);
      ctx.beginPath();
      ctx.moveTo(hx, net.barY - 26);
      ctx.lineTo(hx - 7, net.barY - 15);
      ctx.lineTo(hx + 7, net.barY - 15);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // the clock bites at the end, so make the last seconds felt
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
