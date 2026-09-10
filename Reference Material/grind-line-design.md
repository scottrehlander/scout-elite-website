# Grind Line — game flow engine

Working plan, 2026-09-02, written after two throwaway prototypes
(`grind-line-resolve-prototype.html`, `grind-line-chain-prototype.html`).
The prototypes proved the *feel*. This document is the **software architecture for
game flow, transitions and variability**. Hockey content is section 6 onward and is
deliberately downstream of the engine.

---

## 1. What the prototypes got wrong

Both are a **hardcoded decision tree with terminal states**: pick right and advance,
pick wrong and it stops. Two faults, and the architecture below exists to kill them.

1. **A turnover ends the game instead of flipping it.** Losing the puck is not an
   ending, it is the other team starting. Only a whistle is ever a dead end.
2. **Every situation was hand-authored**, so there is exactly one path and zero
   variability. Nothing generated anything.

---

## 2. The core: one pure reducer

```js
step(state, action, rng) -> { state, events }
```

Pure. No DOM, no timers, no canvas, no `Math.random`. This function **is** the game.

Three consequences, and they are the reason for the shape:

- **The renderer is a consumer, not a participant.** `step` decides *what happened*
  and emits events; the render layer decides *how it looks*. New content therefore
  needs **no new animation code** — a new system produces a different event stream out
  of the same primitives. This is the single most important decision in the document.
- **The simulator and the game are the same code.** 100k shifts a second headlessly in
  node, or one shift at 60fps with a camera and a sound of a body hitting the boards.
- **Seeded RNG lives in state**, so a run is fully described by `{seed, actions[]}`.

### The event stream

```js
{ t:0,   type:'PASS',     from:'D1', to:'LW' }
{ t:380, type:'HIT',      by:'F2', on:'LW', power:1, clean:true }
{ t:380, type:'WEAR',     side:'us', unit:'D', delta:+6 }
{ t:520, type:'TURNOVER', to:'them' }
{ t:900, type:'ZONE',     zone:'DZ' }
```

A small closed vocabulary of primitives (`PASS`, `CARRY`, `SHOT`, `HIT`, `BLOCK`,
`SAVE`, `GOAL`, `WEAR`, `TURNOVER`, `ZONE`, `WHISTLE`, `PENALTY`, `LINE_CHANGE`).
The renderer implements each primitive **once**. The sim never knows they are drawn.

---

## 3. The beat loop

```js
while (!state.whistle && !state.shiftOver) {
  const beat    = classify(state)                 // zone+possession+situation -> beat type
  const options = optionsFor(beat, state)         // from your standing call
  const action  = await input(options)            // or policy(state) in the sim
  const outcome = resolve(beat, action, state, rng)
  const events  = dramatize(outcome, state)
  state         = apply(outcome, state)
}
```

Six functions, and the whole game is in them. `input` is **injectable** — a human tap
in the game, a policy function in the harness. That substitution is what makes the
thing testable at all.

### Nested loops, each its own reducer

```
run     -> 3 games (single-elimination playoff; a loss ends the run)
 game   -> periods
  period-> shifts
   shift-> beats, until WHISTLE or a wear bar redlines
```

The **whistle is the menu moment** — the only place standing calls may change. Play
never stops for a menu.

---

## 4. Transitions: the outcome vocabulary

Every beat resolves to exactly one outcome. Each is a state mutation, **never a stop**.

| Outcome | Effect |
|---|---|
| `ADVANCE` | keep puck, zone +1 toward their net |
| `HOLD` | keep puck, same zone (cycle, regroup) |
| `DUMP` | possession → loose, zone +1, situation → `retrieval` |
| `TURNOVER` | possession flips, same zone |
| `COUNTER` | possession flips, zone −1, situation → `rush` (odd-man against) |
| `CHANCE` | → shot sub-resolve |
| `WHISTLE` | dead puck → faceoff. **The only dead end.** |
| `PENALTY` | whistle + strength change |

Shot sub-resolve: `GOAL` → whistle · `SAVE+freeze` → whistle · `SAVE+rebound` → loose
in OZ · `BLOCK` → loose or `COUNTER`.

`TURNOVER` and `COUNTER` being transitions rather than terminals is most of what
separates this from the prototype. Possession flips, the camera pans, **you are now
defending**, and you still get a beat — so the player acts on both sides of the puck.

---

## 5. Variability — five independent axes that multiply

Variability is architectural, not authored. No branch in the engine is written twice.

**Axis 1 — stochastic resolution.** Weighted outcome tables plus a seeded roll. Right
read ≈ 80%, wrong read ≈ 20%. Keep the spread wide: a muddy 55/45 destroys the payoff
of reading correctly, which is why graded partial credit was rejected earlier.

**Axis 2 — the modifier pipeline.** This is where variability compounds. Weights are
never constants; they pass through a composable chain:

```js
baseWeights(option, theirSystem)
  |> applyTraits(state.roster)      // fast winger improves the wide drive
  |> applyWear(state.wear)          // their gassed D concede more
  |> applyStrength(state.strength)  // 5v4 rewrites everything
  |> applyMomentum(state.recent)    // rolling, or hemmed in
  |> applyCoachTendency(theirCoach)
  |> normalize
```

Each modifier is a pure `(weights, state) -> weights`. Adding one changes **every beat
in the game** without touching a branch. This is the mechanism that turns a small
content set into a large possibility space.

**Axis 3 — opponent policy.** The other coach is an agent, not a table: a tendency
profile plus an adaptation rule (they change their standing call when a matchup keeps
losing). Beating the same read three times *causes* the opponent to change.

**Axis 4 — procedural shift seeding.** Faceoff spot, strength, score, carried-over
wear, which line is out. No two shifts open identically.

**Axis 5 — content combinatorics.** systems × traits × coaches. The cheapest axis and
the last one to reach for.

---

## 6. Determinism, replay, sharing

RNG state lives inside `state`, so a run is exactly `{seed, actions[]}`. That one
decision buys four features at once:

- **Seed-code sharing** — the async peer competition, with no backend.
- **Deterministic tests** and reproducible failures.
- **The sim harness** (below).
- **Bug repro** from a shared code.

---

## 7. Verification harness

Follows the `zamboni-solver.js` precedent: content is machine-checked, never eyeballed.

```js
simulate(seed, policy) -> { result, log }
```

`Reference Material/grind-line-sim.js` runs N thousand shifts under `randomPolicy`,
`greedyPolicy` and `perfectPolicy`, and exits nonzero unless:

- no dominant system (no call wins > X% across all opponents)
- no dead system (every call is the best answer to something)
- shift length distribution inside the target band
- goals per shift inside the target band
- `perfectPolicy` beats `randomPolicy` by a satisfying, tunable margin
- no outcome dominates the transition table (e.g. `TURNOVER` not > 40%)

Run after ANY change to `_data/gl/*.json`.

---

## 8. File layout

The arcade's usual "one page + one ES5 IIFE" does not survive this. Grind Line needs
three modules, and that is a deliberate, documented exception.

```
scripts/games/grind-line/engine.js   # pure reducer. no DOM. loadable in node.
scripts/games/grind-line/render.js   # event-stream consumer. camera, shading, hits.
scripts/games/grind-line/game.js     # IIFE glue: input, arcade.js, analytics
_data/gl/*.json                      # all content (below)
Reference Material/grind-line-sim.js # node harness
```

---

## 9. Content — all hockey lives in JSON

The engine knows nothing about hockey. This is what lets the hockey be red-penned in a
diff and the balance be simulated.

```
_data/gl/systems.json    # one entry per system, ALL zones: coverage shapes,
                         #   what it takes away, what it concedes, wear it inflicts
_data/gl/beats.json      # beat types -> options, which standing call governs
_data/gl/matchups.json   # option x opposing system -> outcome weights
_data/gl/traits.json     # player traits -> modifiers
_data/gl/coaches.json    # opponent identities: preferences, adaptation rate
```

**A system is a team identity that projects into every zone, not a per-beat puzzle.**
This was the prototype's second big fault: beat 1's 1-2-2 forecheck and beat 2's
tight-gap neutral zone were authored independently and shared no logic. Authoring a
1-2-2 means authoring its forecheck, its NZ structure and its d-zone look together,
consistently — that consistency is what makes learning to recognise it pay off.

### Beat types

`zone + possession + situation` selects the beat. Ten covers a full game.

| Zone | Poss | Situation | Beat | Governed by |
|---|---|---|---|---|
| DZ | us | retrieval | Breakout | breakout call |
| DZ | us | established | Regroup | breakout call |
| DZ | them | established | D-zone defend | d-zone coverage |
| DZ | them | rush | Rush defend (odd-man) | d-zone coverage |
| DZ | loose | battle | Puck battle | traits + wear only |
| NZ | us | rush | Zone entry | entry call |
| NZ | them | rush | Neutral defend | NZ call |
| OZ | us | rush | Rush chance | entry call |
| OZ | us | established | O-zone cycle | o-zone call |
| OZ | them | retrieval | Forecheck | forecheck call |

Defensive beats are where the checking content lives (step up and angle, or hold the
house). Named systems are not yet in `_data/hockey_glossary.json` (only the concepts:
forecheck, breakout, regroup, transition, zone entry) — adding them feeds Rink
Crossword and the site-wide tooltips for free.

---

## 10. Build order

1. **`engine.js` headless.** State, `classify`, `optionsFor`, `resolve`, `apply`,
   outcome vocabulary, seeded RNG. Pure. Testable from node on day one.
2. **`grind-line-sim.js` + the gates.** Before authoring content at volume.
3. **The modifier pipeline**, with wear and traits as the first two modifiers.
4. **One full opponent identity.** 3 forechecks x 3 breakouts, consistent across zones.
5. **`render.js`.** Reuse what the prototypes proved (below). Event consumer only.
6. **Whistles, faceoffs, line changes, wear-driven shift ends.**
7. **Run structure.** Playoff push, draft 1-of-3 between rounds.
8. **Penalties, PP/PK.** 2 PP and 2 PK systems.
9. **Polish + analytics.** `arcade_play` on first meaningful input, `arcade_complete`
   on a finished run.

**Steps 1-4 need no pixels at all.** They are the risky part and they are all testable
headlessly, which is the whole argument for this architecture.

---

## 11. Carried over from the prototypes (proven, do not re-litigate)

- Scrolling camera; orientation **never** flips; your net always at the bottom. At full
  rink width on a portrait phone you see half the sheet, and the look-ahead peek comes
  free.
- Coverage shading instead of coloured lanes: the read is deduction, not announcement.
- The covering defender's shading **flares on impact** — shows what you threw into.
- Hit feel needs all six: anticipation, hitstop, shake, particles, board flex, sound.
  The hitter must draw **on top of** the victim or the hit is invisible.
- Short beats, 1.1-1.75s. Cut epilogues.
- Success continues, failure ends the possession. Structural, not VFX.
- Stamps pinned to the viewport, not the ice.
