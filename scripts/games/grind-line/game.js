/* Grind Line — glue.
 *
 * Owns nothing. Wires the pure engine to the render layer, the DOM and
 * arcade.js. All game logic lives in engine.js; all drawing in render.js.
 */
(function () {
  'use strict';
  var E = window.GrindLineEngine, R = window.GrindLineRender, D = window.GL_DATA;
  if (!E || !R || !D) return;

  var cv = document.getElementById('game');
  var lineEl = document.getElementById('line');
  var beatEl = document.getElementById('beatname');
  var panel = document.getElementById('adjust');
  var overlay = document.getElementById('overlay');
  var oTitle = document.getElementById('overlay-title');
  var oMsg = document.getElementById('overlay-msg');
  var oBtn = document.getElementById('overlay-btn');

  var PHASES = ['forecheck','breakout','nz','dzone','entry','ozone'];
  var PHASE_LABEL = { forecheck:'Forecheck', breakout:'Breakout', nz:'Neutral zone',
                      dzone:'D-zone', entry:'Entry', ozone:'O-zone' };
  var byPhase = {};
  for (var id in D.systems) (byPhase[D.systems[id].phase] = byPhase[D.systems[id].phase] || []).push(id);

  var SHIFTS = 12;
  var state = null, phase = 'idle', shiftsLeft = SHIFTS, tracked = false, last = 0;

  /* Broadcast call, not a coaching note. */
  var CALL = {
    ADVANCE:  ['Out clean.', 'Through, with speed.', 'They walk out of there.'],
    HOLD:     ['They hang on to it.', 'Possession kept.', 'Working it, still theirs.'],
    DUMP:     ['Chipped in. Territory, no puck.', 'Off the glass and out.'],
    TURNOVER: ['Turned over. Other way.', 'Picked off.', 'Lost it.'],
    COUNTER:  ['Stripped, and they are gone the other way.', 'Turnover, odd man coming back.'],
    CHANCE:   ['Chance!', 'Shot on the way.'],
    WHISTLE:  ['Whistle.', 'Play stops.'],
    PENALTY:  ['Two minutes. That one was not worth it.']
  };
  function say(html) { lineEl.innerHTML = html; }
  function callFor(r, st) {
    var pool = CALL[r.outcome] || ['...'];
    var txt = pool[Math.floor(E.nextRand(st) * pool.length)];
    if (r.outcome === 'CHANCE' && r.shot === 'GOAL') txt = 'SCORES! ' + (st.possession === 'us' ? 'That is yours.' : 'They get one.');
    return '<b>' + r.option.label + '.</b> ' + txt;
  }

  /* ------------------------------------------------------------ flow */
  function newGame() {
    state = E.newShift({ seed: 'gl-' + Date.now(), roster: ['fast','smart','deep'] });
    state.calls.them = JSON.parse(JSON.stringify(D.coaches.marchetti.systems));
    shiftsLeft = SHIFTS; tracked = false;
    overlay.hidden = true;
    // the whole board matters in this one, so put it in view on start
    if (cv.scrollIntoView) cv.scrollIntoView({ block: 'center', behavior: 'smooth' });
    faceoff(true);
  }
  function faceoff(first) {
    var centre = true;
    if (first) {
      state.zone = 1; state.situation = 'rush';
      state.possession = E.nextRand(state) < 0.5 ? 'us' : 'them';
      state.faceoffWonBy = state.possession;
      state.whistle = false; state.shiftOver = false; state.lineChange = false; state.beats = 0;
    } else {
      E.faceoffFrom(state);                     // located by rule, then a 50/50 draw
      centre = state.lastWhistle === 'goal';
    }
    var wait = R.setBeat(E.classify(state, D), state, !first);
    say(state.faceoffWonBy === 'us' ? '<b>You win the draw.</b>' : '<b>They win the draw.</b>');
    setTimeout(function () {
      R.faceoff({ centre: centre, weWon: state.faceoffWonBy === 'us' }, askBeat);
    }, first ? 150 : wait + 120);
  }
  function askBeat() {
    if (state.shiftOver || shiftsLeft <= 0) return endShift();
    var key = E.classify(state, D);
    var wait = R.setBeat(key, state, true) + 120;   // let the skate finish first
    var beat = D.beats[key];
    beatEl.textContent = beat.name;
    setTimeout(function () {
      R.setOptions(beat.options, true);
      phase = 'decide';
      say(state.possession === 'us'
        ? 'Shaded ice is theirs. <b>Find the seam.</b>'
        : 'They have it. <b>How do you defend it?</b>');
    }, wait);
  }
  function choose(optId) {
    if (phase !== 'decide') return;
    phase = 'resolve';
    if (!tracked && window.Arcade) { window.Arcade.trackPlay('grind-line'); tracked = true; }
    var before = { usF: state.wear.usF, usD: state.wear.usD };
    var r = E.step(state, optId, D);
    R.setOptions([], false);
    R.playEvents(r.events, { spot: R.spotOf(optId) }, function () {
      say(callFor(r, state));
      var dF = state.wear.usF - before.usF, dD = state.wear.usD - before.usD;
      if (dD >= 4) R.floater('+ D WEAR', 30, R.LAYOUTS[r.beat] ? 200 : 200, R.colors.warn);
      else if (dF >= 5) R.floater('+ F WEAR', 66, 200, R.colors.warn);
      if (state.whistle) { R.whistleBreak(state.lastWhistle || 'stoppage'); setTimeout(whistle, 800); }
      else if (state.shiftOver) setTimeout(endShift, 700);
      else if (state.lineChange) {
        state.lineChange = false;                // bench changes, play does NOT stop
        ['usF','usD'].forEach(function (k) { state.wear[k] = Math.max(0, state.wear[k] * 0.72); });
        say('<b>Change on the fly.</b> Fresh legs, play is still going.');
        setTimeout(askBeat, 640);
      } else setTimeout(askBeat, 620);
    });
  }
  function whistle() {
    phase = 'whistle';
    shiftsLeft--;
    recover();
    say('<b>Whistle.</b> ' + shiftsLeft + ' shift' + (shiftsLeft === 1 ? '' : 's') + ' left. Adjust, or go.');
    buildPanel();
    panel.hidden = false;
  }
  function endShift() {
    phase = 'whistle'; shiftsLeft--; recover();
    say('<b>Line change.</b> Your legs were gone. ' + Math.max(0, shiftsLeft) + ' left.');
    buildPanel(); panel.hidden = false;
  }
  function recover() {
    var deep = state.roster.indexOf('deep') >= 0 ? 1.35 : 1;
    ['usF','usD'].forEach(function (k) { state.wear[k] = Math.max(0, state.wear[k] * (1 - 0.45 * deep)); });
    ['themF','themD'].forEach(function (k) { state.wear[k] = Math.max(0, state.wear[k] * 0.55); });
    if (state.strength !== '5v5') state.strength = '5v5';
  }
  function resume() {
    panel.hidden = true;
    if (shiftsLeft <= 0) return gameOver();
    faceoff(false);
  }
  function gameOver() {
    phase = 'over';
    var win = state.score.us > state.score.them;
    oTitle.textContent = win ? 'You won it.' : state.score.us === state.score.them ? 'Even.' : 'They got you.';
    oMsg.innerHTML = 'Final <b>' + state.score.us + ' - ' + state.score.them + '</b>. ' +
      (win ? 'The reads were there.' : 'Watch what they take away, not what you want to do.');
    oBtn.textContent = 'Run it back';
    overlay.hidden = false;
    if (window.Arcade) window.Arcade.trackDone('grind-line',
      { us: state.score.us, them: state.score.them, shifts: SHIFTS });
  }

  /* Whistle is the only place standing calls may change. */
  function buildPanel() {
    var html = '<div class="gl-adjust-inner"><p class="gl-adjust-head">Standing calls &mdash; tap to change</p><div class="gl-chips">';
    PHASES.forEach(function (ph) {
      var cur = state.calls.us[ph];
      html += '<button type="button" class="gl-chip" data-phase="' + ph + '">' +
              '<span class="gl-chip-ph">' + PHASE_LABEL[ph] + '</span>' +
              '<span class="gl-chip-sys">' + D.systems[cur].name + '</span></button>';
    });
    html += '</div><button type="button" class="game-btn" id="gl-resume">Drop the puck</button></div>';
    panel.innerHTML = html;
    panel.querySelectorAll('.gl-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        var ph = b.getAttribute('data-phase'), list = byPhase[ph];
        var i = list.indexOf(state.calls.us[ph]);
        state.calls.us[ph] = list[(i + 1) % list.length];
        b.querySelector('.gl-chip-sys').textContent = D.systems[state.calls.us[ph]].name;
      });
    });
    document.getElementById('gl-resume').addEventListener('click', resume);
  }

  /* ----------------------------------------------------------- input */
  cv.addEventListener('pointerdown', function (e) {
    var id = R.hitTest(e.clientX, e.clientY);
    if (id) choose(id);
  });
  window.addEventListener('keydown', function (e) {
    if (phase !== 'decide') return;
    var beat = D.beats[E.classify(state, D)];
    var i = parseInt(e.key, 10) - 1;
    if (i >= 0 && beat.options[i]) choose(beat.options[i].id);
  });
  oBtn.addEventListener('click', newGame);

  /* ------------------------------------------------------------ loop */
  R.init(cv);
  state = E.newShift({});
  R.setBeat('DZ.us.retrieval', state, false);
  (function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(now - last, 30); last = now;
    R.tick(dt, !state || state.possession !== 'them');
  })(0);
})();
