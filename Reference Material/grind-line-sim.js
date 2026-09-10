#!/usr/bin/env node
/* Grind Line — headless balance harness.
 *
 * Same engine the game runs on, driven by policy functions instead of thumbs.
 * Exits nonzero on any failed gate. Run after ANY change to _data/gl/*.json.
 *
 *   node "Reference Material/grind-line-sim.js"          # gates
 *   node "Reference Material/grind-line-sim.js" -v       # + per-option tables
 *
 * Follows the zamboni-solver.js precedent: content is machine-proved, never
 * eyeballed.
 */
'use strict';
const fs = require('fs'), path = require('path');
const E = require(path.join(__dirname, '..', 'scripts', 'games', 'grind-line', 'engine.js'));

const DIR = path.join(__dirname, '..', '_data', 'gl');
const load = f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
const data = { beats:load('beats.json'), systems:load('systems.json'),
               matchups:load('matchups.json'), traits:load('traits.json'),
               coaches:load('coaches.json') };
const VERBOSE = process.argv.indexOf('-v') >= 0;

/* ------------------------------------------------------------- policies */
const policies = {
  random: (s, beatKey, opts) => opts[Math.floor(E.nextRand(s) * opts.length)].id,
  first:  (s, beatKey, opts) => opts[0].id,
  greedy: (s, beatKey, opts) => best(s, beatKey, opts, 1),
  worst:  (s, beatKey, opts) => best(s, beatKey, opts, -1)
};

function best(s, beatKey, opts, sign) {
  let pick = opts[0].id, bv = -Infinity;
  for (const o of opts) {
    const w = E.weightsFor(beatKey, o.id, s, data);
    if (!w) continue;
    const v = sign * E.utility(w, s);
    if (v > bv) { bv = v; pick = o.id; }
  }
  return pick;
}

/* --------------------------------------------------------------- driving */
function playShift(state, policy, stats) {
  state.whistle = false;
  let guard = 0;
  while (!state.whistle && !state.shiftOver && !state.lineChange && guard++ < 40) {
    const beatKey = E.classify(state, data);
    const opts = E.optionsFor(beatKey, state, data);
    const action = policy(state, beatKey, opts);
    const r = E.step(state, action, data);
    if (stats) {
      stats.outcomes[r.outcome] = (stats.outcomes[r.outcome] || 0) + 1;
      stats.beats++;
      stats.beatKeys[beatKey] = (stats.beatKeys[beatKey] || 0) + 1;
      if (r.shot) stats.shots[r.shot] = (stats.shots[r.shot] || 0) + 1;
    }
  }
  return guard;
}

function playGame(seed, policy, ourCalls, coachId, opts) {
  opts = opts || {};
  const coach = data.coaches[coachId];
  const st = E.newShift({
    seed, roster: opts.roster || ['fast','smart','deep'],
    calls: { us: Object.assign({}, ourCalls), them: Object.assign({}, coach.systems) }
  });
  const stats = { outcomes:{}, shots:{}, beatKeys:{}, beats:0, shifts:0, shiftLens:[] };
  const SHIFTS = opts.shifts || 18;
  for (let i = 0; i < SHIFTS; i++) {
    const before = stats.beats;
    st.whistle = false; st.shiftOver = false; st.lineChange = false; st.beats = 0;
    // faceoff: fresh situation, alternating starts, wear partly recovered
    const r = E.nextRand(st);
    st.zone = r < 0.34 ? 0 : r < 0.67 ? 1 : 2;
    st.possession = E.nextRand(st) < 0.5 ? 'us' : 'them';
    st.situation = st.zone === 1 ? 'rush' : (st.possession === 'us' ? 'retrieval' : 'established');
    const deep = (opts.roster || []).indexOf('deep') >= 0 ? 1.35 : 1;
    for (const k of ['usF','usD','themF','themD']) {
      const rec = k.slice(0,2) === 'us' ? 0.42 * deep : 0.42;
      st.wear[k] = Math.max(0, st.wear[k] * (1 - rec));
    }
    if (st.strength !== '5v5' && E.nextRand(st) < 0.5) st.strength = '5v5';
    playShift(st, policy, stats);
    stats.shifts++;
    stats.shiftLens.push(stats.beats - before);
  }
  return { score: st.score, stats };
}

/* Aggregate many games. Returns goal differential per game and raw stats. */
function run(policy, ourCalls, coachId, n, roster) {
  const agg = { us:0, them:0, games:0, outcomes:{}, shots:{}, beats:0, shiftLens:[], beatKeys:{} };
  for (let i = 0; i < n; i++) {
    const g = playGame('sim-' + coachId + '-' + i, policy, ourCalls, coachId, { roster });
    agg.us += g.score.us; agg.them += g.score.them; agg.games++;
    agg.beats += g.stats.beats;
    for (const k in g.stats.outcomes) agg.outcomes[k] = (agg.outcomes[k]||0) + g.stats.outcomes[k];
    for (const k in g.stats.shots) agg.shots[k] = (agg.shots[k]||0) + g.stats.shots[k];
    for (const k in g.stats.beatKeys) agg.beatKeys[k] = (agg.beatKeys[k]||0) + g.stats.beatKeys[k];
    agg.shiftLens = agg.shiftLens.concat(g.stats.shiftLens);
  }
  return agg;
}

const DEFAULT_CALLS = { breakout:'controlled', forecheck:'1-2-2', nz:'back-off',
                        dzone:'collapse', entry:'carry-in', ozone:'cycle' };
const COACHES = Object.keys(data.coaches);
const PHASES = ['breakout','forecheck','nz','dzone','entry','ozone'];
const byPhase = {};
for (const id in data.systems) (byPhase[data.systems[id].phase] ||= []).push(id);

/* ---------------------------------------------------------------- gates */
const fails = [], notes = [];
function gate(ok, label, detail) {
  (ok ? notes : fails).push((ok ? 'PASS  ' : 'FAIL  ') + label + (detail ? '  — ' + detail : ''));
}
const mean = a => a.reduce((x,y)=>x+y,0) / (a.length||1);
const pct  = (n,d) => d ? (100*n/d) : 0;

const N = 60;

/* 1. read skill must pay: greedy >> random >> worst */
let G=0,R=0,Wo=0;
for (const c of COACHES) {
  G  += run(policies.greedy, DEFAULT_CALLS, c, N).us - run(policies.greedy, DEFAULT_CALLS, c, N).them;
  R  += run(policies.random, DEFAULT_CALLS, c, N).us - run(policies.random, DEFAULT_CALLS, c, N).them;
  Wo += run(policies.worst,  DEFAULT_CALLS, c, N).us - run(policies.worst,  DEFAULT_CALLS, c, N).them;
}
const perGame = x => (x / (COACHES.length * N)).toFixed(2);
gate(G > R && R > Wo, 'reading pays (greedy > random > worst)',
     `diff/game  greedy ${perGame(G)}  random ${perGame(R)}  worst ${perGame(Wo)}`);
gate((G - Wo) / (COACHES.length * N) > 1.0, 'read spread is felt (>1.0 goals/game)',
     `spread ${perGame(G - Wo)}`);

/* 2. no dominant and no dead standing call, per phase */
for (const ph of PHASES) {
  const res = byPhase[ph].map(sys => {
    const calls = Object.assign({}, DEFAULT_CALLS); calls[ph] = sys;
    let d = 0;
    for (const c of COACHES) { const a = run(policies.greedy, calls, c, N); d += a.us - a.them; }
    return { sys, d: d / (COACHES.length * N) };
  }).sort((a,b) => b.d - a.d);
  const spread = res[0].d - res[res.length-1].d;
  gate(spread < 1.6, `no dominant ${ph} call (spread < 1.6)`,
       res.map(r => `${r.sys} ${r.d.toFixed(2)}`).join('  '));
}

/* 3. no dead option: every option must be the best answer to something */
const deadOpts = [];
for (const beatKey in data.beats) {
  const beat = data.beats[beatKey];
  const phase = beat.vsPhase;
  const rivals = phase ? byPhase[phase] : [null];
  const PROFILES = [
    { label:'fresh',      wear:{usF:0,usD:0,themF:0,themD:0},     strength:'5v5', roster:['fast','smart'] },
    { label:'gassed',     wear:{usF:78,usD:82,themF:10,themD:10}, strength:'5v5', roster:['fast','smart'] },
    { label:'shorthand',  wear:{usF:40,usD:45,themF:20,themD:20}, strength:'4v5', roster:['smart','vet-d'] },
    { label:'powerplay',  wear:{usF:20,usD:20,themF:50,themD:55}, strength:'5v4', roster:['skilled','fast'] },
    { label:'heavy team', wear:{usF:30,usD:30,themF:40,themD:40}, strength:'5v5', roster:['heavy','vet-d'] }
  ];
  const winners = new Set();
  for (const rv of rivals) for (const pf of PROFILES) {
    const st = E.newShift({ roster: pf.roster });
    st.zone = E.ZONES.indexOf(beatKey.split('.')[0]);
    st.possession = beatKey.split('.')[1];
    st.situation = beatKey.split('.')[2];
    st.wear = Object.assign({}, pf.wear);
    st.strength = pf.strength;
    if (rv && phase) st.calls.them[phase] = rv;
    winners.add(best(st, beatKey, beat.options, 1));
  }
  for (const o of beat.options) if (!winners.has(o.id)) deadOpts.push(beatKey + '.' + o.id);
}
gate(deadOpts.length === 0, 'no dead options (each is best in some state)',
     deadOpts.length ? deadOpts.join(', ') : 'all ' +
       Object.values(data.beats).reduce((n,b)=>n+b.options.length,0) + ' options live');

/* 4. flow shape: outcome mix, shift length, scoring */
const flow = run(policies.greedy, DEFAULT_CALLS, COACHES[0], N * 2);
const tot = Object.values(flow.outcomes).reduce((a,b)=>a+b,0);
const share = k => pct(flow.outcomes[k]||0, tot);
gate(share('TURNOVER') < 40, 'TURNOVER does not dominate (<40%)', share('TURNOVER').toFixed(1)+'%');
for (const o of E.OUTCOMES)
  if (o !== 'PENALTY') gate(share(o) > 1.0, `outcome ${o} occurs (>1%)`, share(o).toFixed(1)+'%');
const avgLen = mean(flow.shiftLens);
gate(avgLen >= 3 && avgLen <= 12, 'shift length in band, perfect play (3-12)', avgLen.toFixed(1));
/* Casual play must not produce 20-beat shifts. Wear, not the backstop cap,
 * has to be what ends a shift for a player who is still learning the reads. */
const casual = run(policies.random, DEFAULT_CALLS, COACHES[0], N * 2);
const casualLen = mean(casual.shiftLens);
gate(casualLen >= 3 && casualLen <= 13, 'shift length in band, casual play (3-13)', casualLen.toFixed(1));
gate(Math.abs(casualLen - avgLen) < 6, 'shift length is stable across skill',
     'perfect ' + avgLen.toFixed(1) + ' vs casual ' + casualLen.toFixed(1));
const gpg = (flow.us + flow.them) / flow.games;
gate(gpg >= 2 && gpg <= 12, 'goals per game in band (2-12)', gpg.toFixed(1));

/* 5. possession actually flips: the player must defend a fair share */
let usBeats = 0, themBeats = 0;
for (const k in flow.beatKeys) {
  if (k.split('.')[1] === 'us') usBeats += flow.beatKeys[k];
  if (k.split('.')[1] === 'them') themBeats += flow.beatKeys[k];
}
const defShare = pct(themBeats, usBeats + themBeats);
gate(defShare > 20 && defShare < 65, 'defensive beats are a real share (20-65%)',
     defShare.toFixed(1)+'% of beats spent defending');

/* 5b. the puck must actually travel: no zone may swallow the game, and every
 * defensive beat that should be able to move the puck must have ADVANCE. This
 * gate exists because OZ.them.retrieval and NZ.them.rush shipped with no
 * ADVANCE outcome at all, so the opponent could never break out and play
 * pooled in the offensive zone. */
const zoneShare = { DZ:0, NZ:0, OZ:0 };
for (const k in flow.beatKeys) zoneShare[k.split('.')[0]] += flow.beatKeys[k];
const zTot = zoneShare.DZ + zoneShare.NZ + zoneShare.OZ;
for (const z of ['DZ','NZ','OZ'])
  gate(pct(zoneShare[z], zTot) > 12 && pct(zoneShare[z], zTot) < 55,
       `zone ${z} share is sane (12-55%)`, pct(zoneShare[z], zTot).toFixed(1) + '%');
gate(pct(flow.beatKeys['DZ.us.retrieval'] || 0, flow.beats) > 5,
     'the breakout actually happens (>5% of beats)',
     pct(flow.beatKeys['DZ.us.retrieval'] || 0, flow.beats).toFixed(1) + '%');
const MOBILE = ['OZ.them.retrieval','NZ.them.rush','DZ.us.retrieval','DZ.us.established','NZ.us.rush'];
const stuck = MOBILE.filter(bk => !Object.values(data.matchups[bk] || {})
  .some(e => e.base.ADVANCE || e.base.DUMP));
gate(stuck.length === 0, 'every transit beat can move the puck',
     stuck.length ? stuck.join(', ') : MOBILE.length + ' transit beats have ADVANCE/DUMP');

/* 6. determinism: same seed + same actions -> same result */
const a1 = playGame('determinism', policies.greedy, DEFAULT_CALLS, COACHES[0]);
const a2 = playGame('determinism', policies.greedy, DEFAULT_CALLS, COACHES[0]);
gate(JSON.stringify(a1.score) === JSON.stringify(a2.score), 'deterministic from seed',
     JSON.stringify(a1.score));

/* 7. wear must actually bite */
const fresh = E.newShift({}); const tired = E.newShift({});
tired.wear = { usF:80, usD:80, themF:5, themD:5 };
const wf = E.weightsFor('DZ.us.retrieval','weak',fresh,data);
const wt = E.weightsFor('DZ.us.retrieval','weak',tired,data);
gate(E.goodOdds(wf,fresh) - E.goodOdds(wt,tired) > 0.08, 'wear shifts the odds (>8pts)',
     ((E.goodOdds(wf,fresh)-E.goodOdds(wt,tired))*100).toFixed(1)+' pts');

/* --------------------------------------------------------------- report */
if (VERBOSE) {
  console.log('\nBeat mix (greedy, coach ' + COACHES[0] + '):');
  Object.entries(flow.beatKeys).sort((a,b)=>b[1]-a[1])
    .forEach(([k,v]) => console.log('  ' + k.padEnd(22) + pct(v,flow.beats).toFixed(1) + '%'));
  console.log('\nOutcome mix:');
  E.OUTCOMES.forEach(o => console.log('  ' + o.padEnd(10) + share(o).toFixed(1) + '%'));
  console.log('\nShots:', JSON.stringify(flow.shots));
}
console.log('');
notes.forEach(n => console.log('  ' + n));
fails.forEach(f => console.log('  ' + f));
console.log('\n' + notes.length + ' passed, ' + fails.length + ' failed\n');
process.exit(fails.length ? 1 : 0);
