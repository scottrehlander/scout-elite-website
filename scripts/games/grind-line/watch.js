/* Grind Line — spectator mode.
 *
 * Two coaches play each other, forever, with nobody at the controls. This is a
 * refinement surface, not a game: if two AIs playing is not worth watching,
 * nothing built on top of it will be either. Every beat prints what was called,
 * what happened, and WHY.
 */
(function () {
  'use strict';
  var E = window.GrindLineEngine, R = window.GrindLineRender,
      Co = window.GrindLineCoach, D = window.GL_DATA;
  if (!E || !R || !Co || !D) return;

  var cv = document.getElementById('game');
  var logEl = document.getElementById('log');
  var aEl = document.getElementById('coach-a'), bEl = document.getElementById('coach-b');
  var scoreEl = document.getElementById('score');
  var beatEl = document.getElementById('beatname');
  var btnSide = document.getElementById('btn-side');
  var panel = document.getElementById('adjust');
  var btnPause = document.getElementById('btn-pause');
  var btnSpeed = document.getElementById('btn-speed');
  var btnMute = document.getElementById('btn-mute');
  var btnNew = document.getElementById('btn-new');

  var SHIFTS = 14;
  var byPhase = Co.byPhaseIndex(D);
  var ids = Object.keys(D.coaches);
  var STYLES = ['aggressive', 'balanced', 'cautious'];

  var A, B, state, shiftsLeft, running = true, speed = 1, busy = false, gameNo = 0;
  var humanBlue = false;              // who calls the plays for the blue bench
  var waiting = null;                 // the beat a human is being asked about

  function rnd() { return E.nextRand(state); }
  function fmtSystems(c) {
    return ['forecheck','breakout','nz','dzone','entry','ozone']
      .map(function (p) { return D.systems[c.systems[p]].name; }).join(' &middot; ');
  }
  function paintCoaches() {
    aEl.innerHTML = '<span class="gl-w-name">' + A.name + '</span>' +
      '<span class="gl-w-style">' + A.style + '</span>' +
      '<span class="gl-w-sys">' + fmtSystems(A) + '</span>';
    bEl.innerHTML = '<span class="gl-w-name">' + B.name + '</span>' +
      '<span class="gl-w-style">' + B.style + '</span>' +
      '<span class="gl-w-sys">' + fmtSystems(B) + '</span>';
  }
  function paintScore() {
    scoreEl.textContent = A.name.replace('Coach ','') + ' ' + state.score.us +
      ' — ' + state.score.them + ' ' + B.name.replace('Coach ','') +
      '   ·   shift ' + (SHIFTS - shiftsLeft + 1) + '/' + SHIFTS;
  }
  function log(cls, html) {
    var d = document.createElement('div');
    d.className = 'gl-w-line ' + (cls || '');
    d.innerHTML = html;
    logEl.appendChild(d);
    while (logEl.childNodes.length > 40) logEl.removeChild(logEl.firstChild);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function newGame() {
    gameNo++;
    var i = Math.floor(Math.random() * ids.length), j = (i + 1 + Math.floor(Math.random() * (ids.length - 1))) % ids.length;
    A = Co.make(Object.assign({ id: ids[i], style: STYLES[Math.floor(Math.random() * 3)] }, D.coaches[ids[i]]));
    B = Co.make(Object.assign({ id: ids[j], style: STYLES[Math.floor(Math.random() * 3)] }, D.coaches[ids[j]]));
    state = E.newShift({ seed: 'watch-' + gameNo + '-' + Date.now(),
                         roster: ['fast','smart','deep'] });
    state.calls.us = JSON.parse(JSON.stringify(A.systems));
    state.calls.them = JSON.parse(JSON.stringify(B.systems));
    shiftsLeft = SHIFTS;
    logEl.innerHTML = '';
    log('gl-w-head', 'Game ' + gameNo + ' &mdash; <b>' + A.name + '</b> (' + A.style +
        ') vs <b>' + B.name + '</b> (' + B.style + ')');
    paintCoaches(); paintScore();
    faceoff(true);
  }

  var ZONE_NAME = { 0: 'your end', 1: 'centre ice', 2: 'their end' };
  function faceoff(first) {
    var centre = true;
    if (first) {                       // opening draw is at centre ice
      state.zone = 1; state.situation = 'rush';
      state.possession = rnd() < 0.5 ? 'us' : 'them';
      state.faceoffWonBy = state.possession;
      state.whistle = false; state.shiftOver = false; state.lineChange = false; state.beats = 0;
    } else {
      E.faceoffFrom(state);            // placed by why play stopped, then a 50/50 draw
      centre = state.lastWhistle === 'goal';
    }
    var key = E.classify(state, D);
    var wait = R.setBeat(key, state, !first);     // let the skate land first
    paintScore();
    var winner = state.faceoffWonBy === 'us' ? A : B;
    log('gl-w-fo', '&#9679; Draw at ' + ZONE_NAME[state.zone] + ' &mdash; <b>' +
        winner.name.replace('Coach ', '') + '</b> wins it' +
        '<span class="gl-w-why">into ' + D.beats[key].name.toLowerCase() + '</span>');
    setTimeout(function () {
      R.faceoff({ centre: centre, weWon: state.faceoffWonBy === 'us' }, nextBeat);
    }, first ? 250 : (wait + 120) / speed);
  }

  function nextBeat() {
    if (!running) { busy = false; return; }
    busy = true;
    var key = E.classify(state, D), beat = D.beats[key];
    var wait = R.setBeat(key, state, true) + 120;   // let the skate finish first
    setTimeout(function () {
      var opts = E.optionsFor(key, state, D);
      if (humanBlue) {                          // your bench: you make the call
        waiting = { key: key, beat: beat, opts: opts };
        R.setOptions(opts, true);
        beatEl.textContent = beat.name + ' \u2014 ' +
          (state.possession === 'us' ? 'find the seam' : 'how do you defend it?');
        return;
      }
      resolveBeat(key, beat, Co.pick(A, state, key, opts, D), opts);
    }, wait / speed);
  }

  function resolveBeat(key, beat, id, opts) {
    waiting = null; R.setOptions([], false);
    beatEl.textContent = beat.name;
    var chosen = null, i;
    for (i = 0; i < opts.length; i++) if (opts[i].id === id) chosen = opts[i];
    var r = E.step(state, id, D);

    Co.record(A, beat.call, r.good);
    Co.record(B, beat.vsPhase, !r.good);

    var why = r.why ? r.why.text : 'no single factor';
    log(r.good ? 'gl-w-good' : 'gl-w-bad',
        '<span class="gl-w-beat">' + beat.name + '</span>' +
        '<b>' + chosen.label + '</b> &rarr; <span class="gl-w-out">' + r.outcome +
        (r.shot ? ' / ' + r.shot : '') + '</span>' +
        '<span class="gl-w-why">' + why + '</span>');

    R.playEvents(r.events, { spot: R.spotOf(id), byThem: state.possession === 'them' }, function () {
      paintScore();
      if (state.whistle || state.shiftOver) {
        R.whistleBreak(state.lastWhistle || 'stoppage');
        setTimeout(whistle, 820 / speed);
      } else if (state.lineChange) {
        lineChange();                       // bench changes, play does NOT stop
      } else setTimeout(nextBeat, 420 / speed);
    });
  }

  /* Changing on the fly: wear recovers a little, the benches may adjust, and
   * the puck stays exactly where it is. No draw, no camera reset. */
  function lineChange() {
    state.lineChange = false;
    ['usF','usD'].forEach(function (k) { state.wear[k] = Math.max(0, state.wear[k] * 0.72); });
    ['themF','themD'].forEach(function (k) { state.wear[k] = Math.max(0, state.wear[k] * 0.76); });
    log('gl-w-adj', '&#8635; change on the fly &mdash; play continues');
    setTimeout(nextBeat, 460 / speed);
  }

  function whistle() {
    shiftsLeft--;
    var deep = 1.35;
    ['usF','usD'].forEach(function (k) { state.wear[k] = Math.max(0, state.wear[k] * (1 - 0.45 * deep)); });
    ['themF','themD'].forEach(function (k) { state.wear[k] = Math.max(0, state.wear[k] * 0.55); });
    state.strength = '5v5';

    var ca = Co.adjust(A, D, byPhase, rnd), cb = Co.adjust(B, D, byPhase, rnd);
    if (ca) log('gl-w-adj', '&#9654; ' + ca.text + ' <span class="gl-w-why">' + ca.phase + ' was losing</span>');
    if (cb) log('gl-w-adj', '&#9654; ' + cb.text + ' <span class="gl-w-why">' + cb.phase + ' was losing</span>');
    if (ca || cb) paintCoaches();
    state.calls.us = JSON.parse(JSON.stringify(A.systems));
    state.calls.them = JSON.parse(JSON.stringify(B.systems));

    if (humanBlue && shiftsLeft > 0) { buildPanel(); panel.hidden = false; return; }
    if (shiftsLeft <= 0) {
      log('gl-w-head', 'Final: <b>' + state.score.us + ' — ' + state.score.them + '</b>. ' +
          (state.score.us === state.score.them ? 'Even.' :
           (state.score.us > state.score.them ? A.name : B.name) + ' takes it.'));
      setTimeout(newGame, 2200 / speed);
      return;
    }
    setTimeout(function () { faceoff(false); }, 700 / speed);
  }

  var PH = ['forecheck','breakout','nz','dzone','entry','ozone'];
  var PH_LABEL = { forecheck:'Forecheck', breakout:'Breakout', nz:'Neutral zone',
                   dzone:'D-zone', entry:'Entry', ozone:'O-zone' };
  function buildPanel() {
    var html = '<div class="gl-adjust-inner"><p class="gl-adjust-head">Your standing calls &mdash; tap to change</p><div class="gl-chips">';
    PH.forEach(function (ph) {
      html += '<button type="button" class="gl-chip" data-phase="' + ph + '">' +
              '<span class="gl-chip-ph">' + PH_LABEL[ph] + '</span>' +
              '<span class="gl-chip-sys">' + D.systems[A.systems[ph]].name + '</span></button>';
    });
    html += '</div><button type="button" class="game-btn" id="gl-resume">Drop the puck</button></div>';
    panel.innerHTML = html;
    panel.querySelectorAll('.gl-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ph = btn.getAttribute('data-phase'), list = byPhase[ph];
        A.systems[ph] = list[(list.indexOf(A.systems[ph]) + 1) % list.length];
        state.calls.us = JSON.parse(JSON.stringify(A.systems));
        btn.querySelector('.gl-chip-sys').textContent = D.systems[A.systems[ph]].name;
        paintCoaches();
      });
    });
    document.getElementById('gl-resume').addEventListener('click', function () {
      panel.hidden = true;
      if (shiftsLeft <= 0) { newGame(); return; }
      setTimeout(function () { faceoff(false); }, 200);
    });
  }

  cv.addEventListener('pointerdown', function (e) {
    R.audio();
    if (!waiting) return;
    var id = R.hitTest(e.clientX, e.clientY);
    if (id) resolveBeat(waiting.key, waiting.beat, id, waiting.opts);
  });
  window.addEventListener('keydown', function (e) {
    if (!waiting) return;
    var i = parseInt(e.key, 10) - 1;
    if (i >= 0 && waiting.opts[i]) resolveBeat(waiting.key, waiting.beat, waiting.opts[i].id, waiting.opts);
  });
  btnSide.addEventListener('click', function () {
    humanBlue = !humanBlue;
    btnSide.textContent = humanBlue ? 'Blue: You' : 'Blue: AI';
    btnSide.classList.toggle('gl-w-btn--on', humanBlue);
    log('gl-w-head', humanBlue ? 'You have the blue bench.' : A.name + ' has the blue bench.');
    if (humanBlue) R.audio();
    else if (waiting) {                       // hand the beat back mid-decision
      var w = waiting;
      resolveBeat(w.key, w.beat, Co.pick(A, state, w.key, w.opts, D), w.opts);
    }
  });

  btnPause.addEventListener('click', function () {
    running = !running;
    btnPause.textContent = running ? 'Pause' : 'Play';
    if (running && !busy) nextBeat();
  });
  btnSpeed.addEventListener('click', function () {
    speed = speed === 1 ? 2 : speed === 2 ? 4 : 1;
    btnSpeed.textContent = speed + '×';
  });
  btnMute.addEventListener('click', function () {
    var on = btnMute.getAttribute('data-on') !== '0';
    btnMute.setAttribute('data-on', on ? '0' : '1');
    btnMute.textContent = on ? 'Sound off' : 'Sound on';
    R.setMuted(on);
  });
  btnNew.addEventListener('click', newGame);
  document.addEventListener('pointerdown', function () { R.audio(); }, { once: true });

  R.init(cv);
  var last = 0;
  (function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(now - last, 30); last = now;
    R.tick(dt * speed, !state || state.possession !== 'them');
  })(0);
  newGame();
})();
