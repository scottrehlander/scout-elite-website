/* Grind Line — coaches.
 *
 * Both benches are agents. A coach does two things: picks the play at each beat
 * (weighted by utility, bent by temperament) and changes a standing call when a
 * matchup keeps losing. Pure, seeded through the engine's RNG, loads in node
 * and the browser.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./engine.js'));
  else root.GrindLineCoach = factory(root.GrindLineEngine);
}(this, function (E) {
  'use strict';

  /* Temperament: how a coach reads the same odds differently. */
  var STYLE = {
    aggressive: { CHANCE: 0.40, ADVANCE: 0.30, DUMP:-0.30, WHISTLE:-0.25, COUNTER:-0.10 },
    balanced:   {},
    cautious:   { DUMP: 0.30, WHISTLE: 0.25, HOLD: 0.20, COUNTER:-0.35, TURNOVER:-0.20 }
  };

  function make(profile) {
    return {
      id: profile.id,
      name: profile.name,
      style: profile.style || 'balanced',
      blurb: profile.blurb || '',
      systems: JSON.parse(JSON.stringify(profile.systems)),
      adapt: profile.adapt == null ? 0.35 : profile.adapt,
      ledger: {},                       // phase -> {good, bad} since last change
      changes: []                       // what they switched, for the watch log
    };
  }

  function bias(coach, w) {
    var tbl = STYLE[coach.style] || {}, s = 0, k;
    for (k in w) if (tbl[k]) s += w[k] * tbl[k];
    return s;
  }

  /* Pick the play. Utility plus temperament — an aggressive coach genuinely
   * takes worse odds for a chance, which is what makes benches feel different. */
  function pick(coach, state, beatKey, opts, data) {
    var best = opts[0].id, bv = -Infinity, i;
    for (i = 0; i < opts.length; i++) {
      var w = E.weightsFor(beatKey, opts[i].id, state, data);
      if (!w) continue;
      var v = E.utility(w, state) + bias(coach, w);
      if (v > bv) { bv = v; best = opts[i].id; }
    }
    return best;
  }

  /* Ledger the result against whichever standing call governed the beat. */
  function record(coach, phase, good) {
    if (!phase) return;
    var L = coach.ledger[phase] || (coach.ledger[phase] = { good: 0, bad: 0 });
    if (good) L.good++; else L.bad++;
  }

  /* Change a call that keeps losing. This is what makes beating the same read
   * three times CAUSE the other bench to show you something else. */
  function adjust(coach, data, byPhase, rand) {
    var changed = null, ph, L;
    for (ph in coach.ledger) {
      L = coach.ledger[ph];
      var n = L.good + L.bad;
      if (n < 5) continue;                     // a bench that changes every whistle reads as panic
      var badRate = L.bad / n;
      if (badRate < 0.62) continue;
      if (rand() > coach.adapt + (badRate - 0.62)) continue;
      var list = byPhase[ph]; if (!list || list.length < 2) continue;
      var cur = coach.systems[ph];
      var next = list[(list.indexOf(cur) + 1 + Math.floor(rand() * (list.length - 1))) % list.length];
      if (next === cur) next = list[(list.indexOf(cur) + 1) % list.length];
      coach.systems[ph] = next;
      coach.ledger[ph] = { good: 0, bad: 0 };
      changed = { phase: ph, from: cur, to: next,
                  text: coach.name + ' goes to ' + data.systems[next].name };
      coach.changes.push(changed);
      break;                                   // one adjustment per whistle
    }
    return changed;
  }

  function byPhaseIndex(data) {
    var m = {}, id;
    for (id in data.systems) (m[data.systems[id].phase] = m[data.systems[id].phase] || []).push(id);
    return m;
  }

  return { make: make, pick: pick, record: record, adjust: adjust,
           byPhaseIndex: byPhaseIndex, STYLE: STYLE };
}));
