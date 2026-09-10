/* Grind Line — game flow engine.
 *
 * PURE. No DOM, no timers, no canvas, no Math.random. This file is the game;
 * everything else (render, input, analytics) is a consumer.
 *
 *   step(state, actionId, data) -> { state, events, beat, outcome }
 *
 * The RNG lives inside state, so a run is exactly {seed, actions[]}: that one
 * property buys deterministic tests, the headless sim, seed-code sharing and
 * bug repro from a shared code.
 *
 * `data` is the _data/gl/*.json bundle, injected. The engine knows no hockey.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GrindLineEngine = factory();
}(this, function () {
  'use strict';

  var ZONES = ['DZ', 'NZ', 'OZ'];
  var OUTCOMES = ['ADVANCE','HOLD','DUMP','TURNOVER','COUNTER','CHANCE','WHISTLE','PENALTY'];
  var SHOT = ['GOAL','SAVE_FREEZE','REBOUND','BLOCK'];

  /* Beat keys that exist in data, mapped from situations that can arise but
   * were not worth authoring separately. Explicit, so dispatch stays total. */
  var ALIAS = {
    'DZ.us.rush':'DZ.us.retrieval',      'DZ.us.battle':'DZ.loose.battle',
    'DZ.them.retrieval':'DZ.them.established', 'DZ.them.battle':'DZ.loose.battle',
    'NZ.us.retrieval':'NZ.us.rush',      'NZ.us.established':'NZ.us.rush',
    'NZ.us.battle':'DZ.loose.battle',    'NZ.them.established':'NZ.them.rush',
    'NZ.them.retrieval':'NZ.them.rush',  'NZ.them.battle':'DZ.loose.battle',
    'NZ.loose.battle':'DZ.loose.battle', 'NZ.loose.retrieval':'DZ.loose.battle',
    'OZ.us.retrieval':'OZ.us.established','OZ.us.battle':'DZ.loose.battle',
    'OZ.them.established':'OZ.them.retrieval','OZ.them.rush':'OZ.them.retrieval',
    'OZ.them.battle':'DZ.loose.battle',  'OZ.loose.battle':'DZ.loose.battle',
    'OZ.loose.retrieval':'DZ.loose.battle','DZ.loose.retrieval':'DZ.loose.battle'
  };

  /* ------------------------------------------------------------------ rng */
  function nextRand(state) {                      // mulberry32, state-carried
    var t = (state.rng = (state.rng + 0x6D2B79F5) | 0);
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function seedFrom(str) {
    var h = 2166136261, i;
    for (i = 0; i < String(str).length; i++) {
      h ^= String(str).charCodeAt(i); h = Math.imul(h, 16777619);
    }
    return h | 0;
  }

  /* ---------------------------------------------------------------- state */
  function newShift(opts) {
    opts = opts || {};
    return {
      seed: opts.seed || 'grind',
      rng: seedFrom(opts.seed || 'grind'),
      zone: opts.zone == null ? 0 : opts.zone,
      possession: opts.possession || 'us',
      situation: opts.situation || 'retrieval',
      wear: opts.wear || { usF:0, usD:0, themF:0, themD:0 },
      strength: opts.strength || '5v5',
      calls: opts.calls || {
        us:   { breakout:'controlled', forecheck:'1-2-2', nz:'back-off',
                dzone:'collapse', entry:'carry-in', ozone:'cycle' },
        them: { breakout:'wheel', forecheck:'2-1-2', nz:'stand-up',
                dzone:'press', entry:'dump-chase', ozone:'net-front' }
      },
      roster: opts.roster || ['fast','smart'],
      score: opts.score || { us:0, them:0 },
      beats: 0,
      recent: [],
      whistle: false,
      shiftOver: false,
      lineChange: false,
      faceoffWonBy: null,
      faceoffZone: null,
      lastWhistle: null,
      lastWhistleBy: null,
      lastGoalBy: null
    };
  }

  /* ------------------------------------------------------- beat dispatch */
  function classify(state, data) {
    var key = ZONES[state.zone] + '.' + state.possession + '.' + state.situation;
    if (data.beats[key]) return key;
    if (ALIAS[key] && data.beats[ALIAS[key]]) return ALIAS[key];
    return 'DZ.loose.battle';
  }
  function optionsFor(beatKey, state, data) { return data.beats[beatKey].options; }

  /* ------------------------------------------------- the modifier pipeline
   * Weights are never constants. Each modifier is a pure (weights, ...) ->
   * weights, so adding one changes every beat in the game without a branch. */

  // outcomes that help whoever currently holds the puck
  var HOLDER_GOOD = { ADVANCE:1, HOLD:1, CHANCE:1 };
  var FLIP        = { TURNOVER:1, COUNTER:1 };

  function polarity(state) {
    var weHold = state.possession === 'us';
    var good = [], bad = [], o, i;
    for (i = 0; i < OUTCOMES.length; i++) {
      o = OUTCOMES[i];
      if (o === 'PENALTY') { bad.push(o); continue; }
      if (o === 'DUMP' || o === 'WHISTLE') continue;              // neutral
      if (weHold ? HOLDER_GOOD[o] : FLIP[o]) good.push(o); else bad.push(o);
    }
    return { good: good, bad: bad };
  }

  /* Move `amt` of weight from the bad pool into the good pool, proportionally.
   * Positive amt favours us, negative favours them. */
  function nudge(w, amt, pol) {
    if (!amt) return w;
    var from = amt > 0 ? pol.bad : pol.good, to = amt > 0 ? pol.good : pol.bad;
    var take = Math.abs(amt), sumFrom = 0, sumTo = 0, i;
    for (i = 0; i < from.length; i++) sumFrom += (w[from[i]] || 0);
    for (i = 0; i < to.length; i++)   sumTo   += (w[to[i]]   || 0);
    if (sumFrom <= 0) return w;
    take = Math.min(take, sumFrom * 0.85);                    // never zero a pool
    for (i = 0; i < from.length; i++)
      if (w[from[i]]) w[from[i]] -= take * (w[from[i]] / sumFrom);
    if (sumTo <= 0) { w[to[0]] = (w[to[0]] || 0) + take; return w; }
    for (i = 0; i < to.length; i++)
      if (w[to[i]]) w[to[i]] += take * (w[to[i]] / sumTo);
    return w;
  }

  function tagAmount(map, tags) {
    var amt = 0, i;
    if (!map) return 0;
    for (i = 0; i < tags.length; i++) if (map[tags[i]]) amt += map[tags[i]];
    return amt;
  }

  function note(F, key, amt, text) {
    if (F && amt) F.push({ key: key, amt: amt, text: text });
  }
  function applyCall(w, opt, beat, state, data, pol, F) {
    if (!beat.call) return w;
    var sys = data.systems[state.calls.us[beat.call]];
    if (!sys) return w;
    var a = tagAmount(sys.boosts, opt.tags) * 0.6;
    note(F, 'call', a, (a > 0 ? 'your ' : 'your ') + sys.name + (a > 0 ? ' suits it' : ' fights it'));
    return nudge(w, a, pol);
  }
  function applyTraits(w, opt, state, data, pol, F) {
    var amt = 0, i, t, best = null, bestAmt = 0;
    for (i = 0; i < state.roster.length; i++) {
      t = data.traits[state.roster[i]]; if (!t) continue;
      var a = tagAmount(t.boosts, opt.tags) + tagAmount(t.penalties, opt.tags);
      amt += a;
      if (Math.abs(a) > Math.abs(bestAmt)) { bestAmt = a; best = t; }
    }
    if (best) note(F, 'trait', amt * 0.55, best.name + (bestAmt > 0 ? ' fits this' : ' does not fit this'));
    return nudge(w, amt * 0.55, pol);
  }
  /* How much a play can go wrong. A tired or shorthanded team can still rim it
   * off the glass; it cannot still make a weak-side reverse under pressure. */
  function riskOf(opt) {
    if (opt.tags.indexOf('safe') >= 0) return 0.3;
    if (opt.tags.indexOf('patient') >= 0) return 0.7;
    return 1;
  }
  function applyWear(w, state, pol, opt, F) {
    var ours = (state.wear.usF + state.wear.usD) / 2;
    var theirs = (state.wear.themF + state.wear.themD) / 2;
    var d = theirs - ours;
    if (d < 0) d *= riskOf(opt);          // fatigue punishes ambition, not caution
    var a = d * 0.16;
    if (Math.abs(a) > 1.5)
      note(F, 'wear', a, a > 0 ? 'their legs are gone' : 'your legs are gone');
    return nudge(w, a, pol);
  }
  function applyStrength(w, state, pol, opt, F) {
    if (state.strength === '5v4') { note(F, 'strength', 18, 'on the power play'); return nudge(w, 18, pol); }
    if (state.strength === '4v5') { note(F, 'strength', -18 * riskOf(opt), 'killing a penalty');
      return nudge(w, -18 * riskOf(opt), pol); }
    return w;
  }
  function applyMomentum(w, state, pol, F) {
    var s = 0, i;
    for (i = 0; i < state.recent.length; i++) s += state.recent[i];
    var a = Math.max(-4, Math.min(4, s * 1.4));
    if (Math.abs(a) > 2.5) note(F, 'momentum', a, a > 0 ? 'you have them reeling' : 'you are on your heels');
    return nudge(w, a, pol);
  }
  function applyTendency(w, opt, beat, state, data, pol, F) {
    if (!beat.vsPhase) return w;
    var sys = data.systems[state.calls.them[beat.vsPhase]];
    if (!sys) return w;
    var amt = 0, i, took = null, gave = null;
    for (i = 0; i < opt.tags.length; i++) {
      if (sys.takes && sys.takes.indexOf(opt.tags[i]) >= 0) { amt -= 7; took = opt.tags[i]; }
      if (sys.concedes && sys.concedes.indexOf(opt.tags[i]) >= 0) { amt += 7; gave = opt.tags[i]; }
    }
    if (took) note(F, 'coverage', -7, sys.name + ' takes away the ' + took);
    if (gave) note(F, 'coverage', 7, sys.name + ' concedes the ' + gave);
    return nudge(w, amt, pol);
  }

  function weightsFor(beatKey, optId, state, data, factors) {
    var beat = data.beats[beatKey];
    var entry = (data.matchups[beatKey] || {})[optId];
    var opt = null, i;
    for (i = 0; i < beat.options.length; i++) if (beat.options[i].id === optId) opt = beat.options[i];
    if (!entry || !opt) return null;

    var w = {}, k, F = factors || null;
    for (k in entry.base) w[k] = entry.base[k];
    if (beat.vsPhase) {
      var theirs = state.calls.them[beat.vsPhase];
      var d = entry.vs && entry.vs[theirs];
      if (d) {
        var mag = 0;
        for (k in d) { w[k] = (w[k] || 0) + d[k]; mag += Math.abs(d[k]); }
        var pol0 = polarity(state), gd = 0;
        for (k in d) if (pol0.good.indexOf(k) >= 0) gd += d[k];
        note(F, 'matchup', gd || (mag ? 1 : 0),
             (gd >= 0 ? 'good look against ' : 'wrong play against ') + data.systems[theirs].name);
      }
    }
    var pol = polarity(state);
    w = applyCall(w, opt, beat, state, data, pol, F);
    w = applyTraits(w, opt, state, data, pol, F);
    w = applyWear(w, state, pol, opt, F);
    w = applyStrength(w, state, pol, opt, F);
    w = applyMomentum(w, state, pol, F);
    w = applyTendency(w, opt, beat, state, data, pol, F);

    var total = 0;
    for (k in w) { if (w[k] < 0) w[k] = 0; total += w[k]; }
    if (total <= 0) return { HOLD: 1 };
    for (k in w) w[k] = w[k] / total;
    return w;
  }

  /* Probability that this option produces an outcome we want. Used for the
   * "how open is this lane" read in the UI. NOT the decision metric. */
  function goodOdds(w, state) {
    var pol = polarity(state), s = 0, i;
    for (i = 0; i < pol.good.length; i++) s += (w[pol.good[i]] || 0);
    return s;
  }

  /* What an outcome is actually worth to us, in this state.
   *
   * Expected value alone makes every safe play worthless, because a rim or a
   * chip exists to REDUCE VARIANCE, not to raise the mean. Two state terms fix
   * that and both are real hockey: when you are gassed a whistle is a rest and
   * a line change, and a counter is a goal against you cannot skate back from.
   * That is why tired teams rim it and take the icing. */
  function value(outcome, state) {
    var weHold = state.possession === 'us';   // must match polarity(): loose = not ours
    var worn = (state.wear.usF + state.wear.usD) / 200;          // 0..1
    var short = state.strength === '4v5';
    var V = weHold
      ? { ADVANCE:1, HOLD:0.55, CHANCE:1, DUMP:0.35, WHISTLE:0.05,
          TURNOVER:-0.8, COUNTER:-1.2, PENALTY:-1 }
      : { ADVANCE:-1, HOLD:-0.5, CHANCE:-1, DUMP:-0.2, WHISTLE:0.35,
          TURNOVER:0.9, COUNTER:1.1, PENALTY:-1 };
    var v = V[outcome] || 0;
    if (outcome === 'WHISTLE') v += 0.5 * worn + (short ? 0.55 : 0);
    if (outcome === 'COUNTER') v -= (weHold ? 1 : -1) * (0.5 * worn + (short ? 0.4 : 0));
    if (outcome === 'DUMP')    v += 0.3 * worn;
    return v;
  }
  function utility(w, state) {
    var u = 0, k;
    for (k in w) u += w[k] * value(k, state);
    return u;
  }

  function roll(w, state) {
    var r = nextRand(state), acc = 0, k;
    for (k in w) { acc += w[k]; if (r <= acc) return k; }
    return 'HOLD';
  }

  /* ------------------------------------------------------------- mutation */
  function dir(state) { return state.possession === 'them' ? -1 : 1; }

  /* Whoever just won the puck is in their own end, so this is a retrieval and
   * the next beat is a breakout. Without this, `retrieval` was only ever set at
   * a faceoff and the breakout — the signature beat — was 3% of play. */
  function settle(state) {
    var ownEnd = state.possession === 'us' ? state.zone === 0 : state.zone === 2;
    state.situation = ownEnd ? 'retrieval' : 'established';
  }

  function resolveShot(state, data) {
    var w = { GOAL:0.18, SAVE_FREEZE:0.16, REBOUND:0.42, BLOCK:0.24 };
    var attackerWear = state.possession === 'us'
      ? (state.wear.themF + state.wear.themD) / 2 : (state.wear.usF + state.wear.usD) / 2;
    w.GOAL += attackerWear * 0.0016;                       // tired defenders concede
    if (state.strength === (state.possession === 'us' ? '5v4' : '4v5')) w.GOAL += 0.07;
    var t = w.GOAL + w.SAVE_FREEZE + w.REBOUND + w.BLOCK, k;
    for (k in w) w[k] = w[k] / t;
    return roll(w, state);
  }

  function apply(outcome, state, beat, data) {
    var d = dir(state), s = state, shot = null;

    if (outcome === 'ADVANCE') {
      var nz = s.zone + d;
      if (nz < 0 || nz > 2) { s.situation = 'established'; }
      else { s.zone = nz; s.situation = 'rush'; }
    } else if (outcome === 'HOLD') {
      s.situation = 'established';
    } else if (outcome === 'DUMP') {
      var dz = s.zone + d;
      s.zone = dz < 0 ? 0 : dz > 2 ? 2 : dz;
      s.possession = 'loose'; s.situation = 'battle';
    } else if (outcome === 'TURNOVER') {
      s.possession = s.possession === 'us' ? 'them' : 'us';
      settle(s);
    } else if (outcome === 'COUNTER') {
      s.possession = s.possession === 'us' ? 'them' : 'us';
      var cz = s.zone + dir(s);
      s.zone = cz < 0 ? 0 : cz > 2 ? 2 : cz;
      s.situation = 'rush';
    } else if (outcome === 'CHANCE') {
      shot = resolveShot(s, data);
      if (shot === 'GOAL') {
        if (s.possession === 'us') s.score.us++; else s.score.them++;
        s.lastGoalBy = s.possession;
        s.whistle = true; s.lastWhistle = 'goal'; s.lastWhistleBy = s.possession;
      } else if (shot === 'SAVE_FREEZE') {
        s.whistle = true; s.lastWhistle = 'frozen'; s.lastWhistleBy = s.possession;
      } else if (shot === 'REBOUND') {
        s.possession = 'loose'; s.situation = 'battle';
      } else {                                       // BLOCK
        s.possession = s.possession === 'us' ? 'them' : 'us';
        settle(s);
      }
    } else if (outcome === 'WHISTLE') {
      s.whistle = true; s.lastWhistle = 'stoppage'; s.lastWhistleBy = s.possession;
    } else if (outcome === 'PENALTY') {
      s.whistle = true; s.lastWhistle = 'penalty'; s.lastWhistleBy = 'us';
      s.strength = s.possession === 'us' ? '5v4' : '4v5';
    }

    if (s.possession === 'loose' && s.situation !== 'battle') s.situation = 'battle';
    return shot;
  }

  function applyWearFor(state, beat, outcome) {
    var pol = polarity(state), bad = pol.bad.indexOf(outcome) >= 0;
    var mult = bad ? 1.6 : (pol.good.indexOf(outcome) >= 0 ? 0.8 : 1);
    var k;
    for (k in beat.wear) state.wear[k] = Math.min(100, state.wear[k] + beat.wear[k] * mult);
    return bad ? -1 : (pol.good.indexOf(outcome) >= 0 ? 1 : 0);
  }

  /* Where the next draw is, from why play stopped. A random zone here is what
   * made the puck appear to jump from the o-zone to the d-zone without ever
   * crossing the neutral zone. Nothing about a faceoff is random. */
  function faceoffFrom(state) {
    var w = state.lastWhistle, by = state.lastWhistleBy;

    /* WHERE the draw is, from why play stopped. Nothing here is random — a
     * random zone was what made the puck appear to jump from the o-zone to the
     * d-zone without ever crossing the neutral zone. */
    if (w === 'goal') state.zone = 1;                        // centre ice
    else if (w === 'penalty') state.zone = by === 'us' ? 0 : 2;   // offender's end
    else if (w === 'stoppage') state.zone = by === 'us' ? 0 : 2;  // iced it, defend it
    /* frozen by the goalie: the draw stays in that end */
    state.zone = state.zone < 0 ? 0 : state.zone > 2 ? 2 : state.zone;

    /* WHO gets it is a coin flip, because a faceoff is contested. Handing the
     * puck to a side was the wrong model: nobody is owed a draw. Traits or a
     * centre's faceoff rating would tilt this later; the base is 50/50. */
    var weWin = nextRand(state) < 0.5;
    state.possession = weWin ? 'us' : 'them';
    state.faceoffWonBy = state.possession;
    state.faceoffZone = state.zone;

    /* settle() then routes both benches into the right system for the result:
     * win it in their end and you are cycling, lose it in yours and you are
     * defending, win it at centre and you are on the rush. */
    settle(state);
    if (state.zone === 1) state.situation = 'rush';

    state.whistle = false; state.shiftOver = false; state.lineChange = false;
    state.beats = 0;
    return state;
  }

  /* ----------------------------------------------------------- dramatize */
  function dramatize(beatKey, opt, outcome, shot, state) {
    var e = [], t = 0;
    e.push({ t: t, type: opt.tags.indexOf('safe') >= 0 ? 'CARRY' : 'PASS', option: opt.id });
    t += 380;
    if (outcome === 'TURNOVER' || outcome === 'COUNTER') {
      e.push({ t: t, type: 'HIT', clean: true, power: outcome === 'COUNTER' ? 1 : 0.6 });
      t += 160;
      e.push({ t: t, type: 'TURNOVER', to: state.possession });
    } else if (outcome === 'CHANCE') {
      e.push({ t: t, type: 'SHOT' }); t += 260;
      e.push({ t: t, type: shot === 'GOAL' ? 'GOAL' : shot === 'BLOCK' ? 'BLOCK' : 'SAVE' });
    } else if (outcome === 'PENALTY') {
      e.push({ t: t, type: 'HIT', clean: false, power: 1 }); t += 200;
      e.push({ t: t, type: 'PENALTY' });
    } else if (outcome === 'DUMP') {
      e.push({ t: t, type: 'CARRY', dump: true });
    }
    e.push({ t: t + 120, type: 'ZONE', zone: ZONES[state.zone] });
    if (state.whistle) e.push({ t: t + 200, type: 'WHISTLE', reason: state.lastWhistle });
    return e;
  }

  /* ---------------------------------------------------------------- step */
  function step(state, actionId, data) {
    var beatKey = classify(state, data), beat = data.beats[beatKey];
    var opt = null, i;
    for (i = 0; i < beat.options.length; i++) if (beat.options[i].id === actionId) opt = beat.options[i];
    if (!opt) opt = beat.options[0];

    var factors = [];
    var w = weightsFor(beatKey, opt.id, state, data, factors) || { HOLD: 1 };
    var outcome = roll(w, state);
    var good = polarity(state).good.indexOf(outcome) >= 0;
    /* The reason the player is owed: the factor that pushed hardest in the
     * direction things actually went. */
    var why = null, bestMag = 0, fi;
    for (fi = 0; fi < factors.length; fi++) {
      var f = factors[fi];
      if ((f.amt > 0) !== good) continue;
      if (Math.abs(f.amt) > bestMag) { bestMag = Math.abs(f.amt); why = f; }
    }
    if (!why && factors.length) {
      for (fi = 0; fi < factors.length; fi++)
        if (Math.abs(factors[fi].amt) > bestMag) { bestMag = Math.abs(factors[fi].amt); why = factors[fi]; }
    }
    var shot = apply(outcome, state, beat, data);
    var sign = applyWearFor(state, beat, outcome);

    state.recent.push(sign);
    if (state.recent.length > 3) state.recent.shift();
    state.beats++;
    if (state.wear.usF >= 100 || state.wear.usD >= 100) state.shiftOver = true;
    /* Changing on the fly does NOT stop play: the bench changes, the puck keeps
     * going. Modelling it as a whistle was what sent the driver to a faceoff
     * and teleported the puck across the sheet mid-flow. */
    if (state.beats >= 11) { state.lineChange = true; state.beats = 0; }

    return { state: state, events: dramatize(beatKey, opt, outcome, shot, state),
             beat: beatKey, beatName: beat.name, option: opt, outcome: outcome, shot: shot,
             weights: w, factors: factors, why: why, good: good };
  }

  return {
    ZONES: ZONES, OUTCOMES: OUTCOMES, SHOT: SHOT,
    newShift: newShift, classify: classify, optionsFor: optionsFor,
    weightsFor: weightsFor, goodOdds: goodOdds, value: value, utility: utility, settle: settle,
    riskOf: riskOf, step: step,
    seedFrom: seedFrom, nextRand: nextRand, polarity: polarity, faceoffFrom: faceoffFrom
  };
}));
