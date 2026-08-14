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
  var BOARD_W = 9;                  // board thickness
  var RINK_X0 = BOARD_W, RINK_X1 = W - BOARD_W;
  var RINK_Y0 = 0;                  // open at the top: the zone runs on into neutral ice
  var RINK_Y1 = H - 16;
  var CORNER_R = 62;                // the rounded corners of an end zone
  var DECK_Y = RINK_Y1 - 70;        // contact below this counts as decking it
  var PUCK_R = 6;
  var NET_W = 78;                   // mouth width
  var NET_D = 34;                   // how deep the mesh reads below the mouth
  var NET_Y_MIN = 200;              // the net roams within this band
  var NET_Y_MAX = 390;

  /* ---- tuning ---- */
  var GRAV = 620;                   // px/s^2
  var TAP_VY = -336;                // a tap sets rise, it does not stack
  var VX_SPEED = 122;               // horizontal speed: fixed, never ramps or decays
  var ICE_BOUNCE = 0.3;             // dead enough that decking it cannot bounce back over the goal line
  var START_TIME = 9;
  var GOAL_TIME = 3;                // seconds a goal buys
  var TIME_CAP = 10;                // the clock never banks past this
  var GOAL_PTS = 1;                 // a goal is worth one, the multiplier does the rest
  var MULT_CAP = 50;
  var CENTRE_FRAC = 0.15;           // this share either side of centre = bar down
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
  var puck, net, timeLeft, score, goals, bars, multiplier;
  var floaters = [], rings = [], flash = null, iceMarks = [];

  // one net, which slides to its next spot after every goal
  function netMoving() {
    return Math.abs(net.targetX - net.x) > 1 || Math.abs(net.targetY - net.y) > 1;
  }

  function netHome() {
    var pad = RINK_X0 + NET_W / 2 + 26;
    return pad + Math.random() * (W - pad * 2);
  }

  /* Would the puck drop straight into a net at (nx, ny) from where it is now,
     with no tap on the way? Pure look-ahead over the same physics; it changes
     nothing, it only lets us place the next net somewhere that has to be
     earned with at least one hop. */
  function reachableWithoutTap(nx, ny, vx) {
    var sx = puck.x, sy = puck.y, svx = vx, svy = puck.vy;
    var step = 1 / 60;
    for (var i = 0; i < 420; i++) {
      var prev = sy;
      svy += GRAV * step;
      sx += svx * step;
      sy += svy * step;
      if (sx - PUCK_R < RINK_X0) { sx = RINK_X0 + PUCK_R; svx = Math.abs(svx); }
      else if (sx + PUCK_R > RINK_X1) { sx = RINK_X1 - PUCK_R; svx = -Math.abs(svx); }
      if (prev <= ny && sy > ny && svy > 0 && Math.abs(sx - nx) <= NET_W / 2 - PUCK_R) return true;
      if (sy > DECK_Y) return false;   // decked before it ever got there
    }
    return false;
  }

  function pickNextNet() {
    var fallback = null;
    for (var i = 0; i < 60; i++) {
      var nx = netHome();
      var ny = NET_Y_MIN + Math.random() * (NET_Y_MAX - NET_Y_MIN);
      if (Math.abs(nx - net.x) < 90) continue;
      // the puck leaves AWAY from the net, so that is the path to test
      var vx = (nx >= puck.x ? -1 : 1) * VX_SPEED;
      if (!fallback) fallback = { x: nx, y: ny, vx: vx };
      if (!reachableWithoutTap(nx, ny, vx)) return { x: nx, y: ny, vx: vx };
    }
    return fallback || { x: netHome(), y: NET_Y_MIN, vx: -VX_SPEED };
  }

  function spawnPuck() {
    /* Out to one side AND drifting further out, so the opening drop heads for
       the boards rather than falling straight into the centred net: the first
       goal has to be earned with a tap like every other. */
    var side = Math.random() < 0.5 ? -1 : 1;
    puck = {
      x: W / 2 + side * (92 + Math.random() * 30), y: 120,
      vx: side * VX_SPEED, vy: 0,
      spin: 0, onIce: false
    };
  }

  function reset() {
    score = 0; goals = 0; bars = 0; multiplier = 1;
    timeLeft = START_TIME;
    floaters = []; rings = []; iceMarks = []; flash = null;
    // a net starts where a net belongs: centred, crossbar on the goal line
    net = { x: W / 2, y: DECK_Y, glow: 0 };
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
    // the goal is worth one; the multiplier you have built is what pays
    var pts = GOAL_PTS * multiplier;
    score += pts;
    /* Only a clean one down the middle advances the multiplier. Scoring off
       centre still counts for points but wipes it, so a scruffy goal costs you
       the run you were building. */
    multiplier = barDown ? Math.min(multiplier + 1, MULT_CAP) : 1;
    // a goal buys time, but the clock never banks more than the cap
    timeLeft = Math.min(timeLeft + GOAL_TIME, TIME_CAP);

    floaters.push({
      x: W / 2, y: 200,
      text: barDown ? 'BAR DOWN!  +' + pts : '+' + pts,
      t: 0, life: barDown ? 1.1 : 0.75,
      color: barDown ? C.warning : C.success,
      size: barDown ? 25 : 18
    });
    if (multiplier > 1) {
      floaters.push({ x: W / 2, y: 232, text: 'now x' + multiplier, t: 0, life: 0.9, color: C.accentHover, size: 15 });
    }
    rings.push({ x: net.x, y: net.y, t: 0, dur: 0.6, r0: 10, r1: 64, color: barDown ? C.warning : C.success });
    flash = { t: 0, dur: 0.22, color: barDown ? C.warning : C.success };
    net.glow = 0.6;
    Arcade.vibrate(barDown ? 55 : 28);

    // the mesh spits it back out, which is what a real puck does, so the same
    // puck stays in play and there is nothing to reset
    puck.x = net.x;
    puck.y = net.y - PUCK_R - 2;
    puck.vy = POP_VY;
    puck.onIce = false;
    /* Place the next net where the pop alone cannot reach it, so every goal
       has to be set up with at least one tap, then kick the puck the OTHER
       way: the puck and the net separate, and you have to bring them back
       together. */
    var nxt = pickNextNet();
    net.targetX = nxt.x;
    net.targetY = nxt.y;
    puck.vx = nxt.vx;
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
      floaters.push({ x: puck.x, y: Math.max(120, puck.y - 30), text: 'multiplier gone', t: 0, life: 0.8, color: C.dim, size: 13 });
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

    /* Boards. The end boards are rounded, the sides run straight up and the
       top is open into the neutral zone (a ceiling keeps the puck in play but
       is never drawn). Contact low in the zone decks it. */
    var cornerCX = puck.x < RINK_X0 + CORNER_R ? RINK_X0 + CORNER_R
                 : puck.x > RINK_X1 - CORNER_R ? RINK_X1 - CORNER_R : null;
    var hit = false, hitY = puck.y, sideHit = false;
    var preVy = puck.vy;

    if (cornerCX !== null && puck.y > RINK_Y1 - CORNER_R) {
      var ccy = RINK_Y1 - CORNER_R;
      var ddx = puck.x - cornerCX, ddy = puck.y - ccy;
      var dist = Math.sqrt(ddx * ddx + ddy * ddy);
      var lim = CORNER_R - PUCK_R;
      if (dist > lim && dist > 0) {
        var nx = ddx / dist, ny = ddy / dist;
        puck.x = cornerCX + nx * lim;
        puck.y = ccy + ny * lim;
        var dot = puck.vx * nx + puck.vy * ny;
        puck.vx -= 2 * dot * nx;
        puck.vy -= 2 * dot * ny;
        puck.vx *= 0.98; puck.vy *= 0.72;
        hit = true; hitY = puck.y;
      }
    } else {
      if (puck.x - PUCK_R < RINK_X0) {
        puck.x = RINK_X0 + PUCK_R; puck.vx = Math.abs(puck.vx); hit = true; sideHit = true;
      } else if (puck.x + PUCK_R > RINK_X1) {
        puck.x = RINK_X1 - PUCK_R; puck.vx = -Math.abs(puck.vx); hit = true; sideHit = true;
      }
      if (puck.y + PUCK_R > RINK_Y1) {
        puck.y = RINK_Y1 - PUCK_R;
        puck.vy = -Math.abs(puck.vy) * ICE_BOUNCE;
        if (Math.abs(puck.vy) < 40) puck.vy = 0;
        hit = true; hitY = puck.y;
      }
    }

    /* Horizontal speed is fixed by design. The rounded corners reflect the
       whole velocity vector, which would otherwise leave the puck crawling or
       tearing sideways depending on the angle it clipped, so the magnitude is
       pinned straight back and only the direction survives. */
    puck.vx = (puck.vx >= 0 ? 1 : -1) * VX_SPEED;

    // an unseen ceiling, so a keen tapper cannot lose the puck off the top
    if (puck.y - PUCK_R < 2) {
      puck.y = 2 + PUCK_R;
      puck.vy = Math.abs(puck.vy) * 0.5 + 30;
    }

    if (hit) {
      /* Only ring on a real impact. A puck rolling along the boards re-contacts
         every frame, which was firing a ring per frame and stacking up as a
         column of growing white circles. */
      if (sideHit || Math.abs(preVy) > 120) {
        rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.22, r0: 5, r1: 15, color: C.dim });
      }
      if (hitY > DECK_Y) {
        if (!puck.onIce) {
          puck.onIce = true;
          iceMarks.push({ x: puck.x, y: puck.y + PUCK_R + 3, t: 0 });
          if (iceMarks.length > 12) iceMarks.shift();
          missed();
        }
      } else {
        puck.onIce = false;
      }
    }

    /* A net still sliding into place is not playable yet: it draws as a ghost
       and nothing collides with it until it has settled. */
    if (netMoving()) {
      for (var mm = iceMarks.length - 1; mm >= 0; mm--) {
        iceMarks[mm].t += dt;
        if (iceMarks[mm].t > 1.4) iceMarks.splice(mm, 1);
      }
      return;
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

    /* The posts and the back are solid; the top face is NOT, because looking
       down at a net the top face is the opening. Anything that ends up inside
       the mouth has gone in. */
    var nHalf = NET_W / 2;
    var nLeft = net.x - nHalf, nRight = net.x + nHalf;
    var nTop = net.y, nBot = net.y + NET_D;
    if (puck.x + PUCK_R > nLeft && puck.x - PUCK_R < nRight &&
        puck.y + PUCK_R > nTop && puck.y - PUCK_R < nBot) {
      var inOff = puck.x - net.x;
      var inA = Math.abs(inOff);
      // only a puck on its way DOWN has gone in; coming up from below is the
      // back of the net, which is solid
      if (inA <= nHalf - PUCK_R && puck.vy > 0) {
        scoreGoal(net, inA <= NET_W * CENTRE_FRAC);
        return;
      }
      if (inA > nHalf - PUCK_R) {
        // clipped a post: send it back out the near side
        if ((puck.x + PUCK_R) - nLeft < nRight - (puck.x - PUCK_R)) {
          puck.x = nLeft - PUCK_R; puck.vx = -Math.abs(puck.vx);
        } else {
          puck.x = nRight + PUCK_R; puck.vx = Math.abs(puck.vx);
        }
      } else {
        // rising into the back of the net: knocked straight back down
        puck.y = nBot + PUCK_R;
        puck.vy = Math.abs(puck.vy) * 0.5 + 30;
      }
      rings.push({ x: puck.x, y: puck.y, t: 0, dur: 0.22, r0: 5, r1: 16, color: C.danger });
    }

    for (var m = iceMarks.length - 1; m >= 0; m--) {
      iceMarks[m].t += dt;
      if (iceMarks[m].t > 1.4) iceMarks.splice(m, 1);
    }
  }

  /* ---- drawing ---- */

  /* The zone outline: straight sides running off the top into neutral ice,
     rounded end boards at the bottom. Left open at the top on purpose. */
  function rinkPath() {
    ctx.beginPath();
    ctx.moveTo(RINK_X0, -4);
    ctx.lineTo(RINK_X0, RINK_Y1 - CORNER_R);
    ctx.arcTo(RINK_X0, RINK_Y1, RINK_X0 + CORNER_R, RINK_Y1, CORNER_R);
    ctx.lineTo(RINK_X1 - CORNER_R, RINK_Y1);
    ctx.arcTo(RINK_X1, RINK_Y1, RINK_X1, RINK_Y1 - CORNER_R, CORNER_R);
    ctx.lineTo(RINK_X1, -4);
  }

  function drawRink() {
    ctx.fillStyle = C.bgDeep;
    ctx.fillRect(0, 0, W, H);

    // the sheet
    rinkPath();
    ctx.closePath();
    ctx.fillStyle = C.surface;
    ctx.fill();

    ctx.save();
    rinkPath();
    ctx.closePath();
    ctx.clip();

    var goalLineY = DECK_Y;

    // end-zone faceoff circles, set just up ice of the goal line
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 2;
    var dotY = goalLineY - 104;
    var dots = [{ x: 92, y: dotY }, { x: W - 92, y: dotY }];
    for (var i = 0; i < dots.length; i++) {
      ctx.globalAlpha = 0.38;
      ctx.beginPath();
      ctx.arc(dots[i].x, dots[i].y, 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = C.danger;
      ctx.beginPath();
      ctx.arc(dots[i].x, dots[i].y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // goal line, and the blue line away up at the top of the zone
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(RINK_X0, goalLineY); ctx.lineTo(RINK_X1, goalLineY);
    ctx.stroke();
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = C.accent;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(RINK_X0, 26); ctx.lineTo(RINK_X1, 26);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // scuff where the puck has been decked
    ctx.strokeStyle = C.muted;
    ctx.lineWidth = 2;
    for (var m = 0; m < iceMarks.length; m++) {
      var mk = iceMarks[m];
      ctx.globalAlpha = 0.4 * (1 - mk.t / 1.4);
      ctx.beginPath();
      ctx.moveTo(mk.x - 9, mk.y);
      ctx.lineTo(mk.x + 9, mk.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // the boards: white with a red kickplate, and no top rail
    rinkPath();
    ctx.strokeStyle = '#dde5ec';
    ctx.lineWidth = BOARD_W * 2;
    ctx.lineCap = 'butt';
    ctx.stroke();
    rinkPath();
    ctx.strokeStyle = C.danger;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  /* A hockey net seen from directly above: you are looking into the mouth and
     down at the mesh. Red pipe with white mesh is the pairing that makes it
     read as a hockey goal at a glance, which the last version had backwards. */
  function drawNet(n) {
    var net = n;
    var fade = netMoving() ? 0.22 : 1;
    var x = net.x, halfW = NET_W / 2;
    var top = net.y, bot = net.y + NET_D;

    // the throat, darkening as it goes back
    ctx.globalAlpha = fade;
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
    ctx.globalAlpha = 0.34 * fade;
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
    ctx.globalAlpha = (0.16 + net.glow * 0.34) * fade;
    ctx.fillRect(x - NET_W * CENTRE_FRAC, top + 2, NET_W * CENTRE_FRAC * 2, NET_D - 4);
    ctx.globalAlpha = 0.7 * fade;
    ctx.strokeStyle = C.warning;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x - NET_W * CENTRE_FRAC, top); ctx.lineTo(x - NET_W * CENTRE_FRAC, bot);
    ctx.moveTo(x + NET_W * CENTRE_FRAC, top); ctx.lineTo(x + NET_W * CENTRE_FRAC, bot);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = fade;

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
    ctx.globalAlpha = 0.75 * fade;
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
    ctx.arc(0, 0, PUCK_R, 0, Math.PI * 2);
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
