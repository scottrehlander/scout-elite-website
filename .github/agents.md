# Scout Elite Website — Project Instructions

## What this is
Jekyll static site for Scout Elite, a hockey video analysis SaaS targeting youth and minor hockey coaches. Hosted on GitHub Pages at `scout-elite.com`. The app itself lives at `https://xpress.scout-elite.com`.

## App source — ground truth for features
The Scout Elite app source lives at `../scout-elite` (sibling directory). When you need to know what a feature actually does — capabilities, pricing tiers, limits, copy claims — read the source there rather than guessing. Useful anchors:
- `src/app/lib/workflow-registry.ts` — feature list with `requiredTier` and beta flags
- `src/app/lib/get-user-tier.ts` — free-tier limits (e.g. practice plans, custom drills)
- `src/app/components/FeatureGate.tsx` — which actions gate at which tier
- `supabase/migrations/` — schema, the source of truth for what a feature stores/can do

## League data — ground truth for hockey posts
Standings, schedules and division placements on `elite9hockey.com` are **JS-rendered inside a `widgets.vahockey.com` iframe**. WebFetch returns only the nav shell and will look like the page is empty. To actually read them: render the page with headless Chromium (see Browser checks below), pull the iframe `src`, then load that URL directly and dump `document.body.innerText`.
- The widget's `season` param is the **ending** year: `2027` = the 2026-27 season. Swap it to diff one season against another — that is how the 2026-27 restructure was *proved* rather than assumed (2025-26 had no Elite tier).
- `league=e9bhl` boys, `league=E9G` girls. In the text dump, group headers are division names and the rows beneath them are teams; parse, don't transcribe.
- Publish **placements** (fixed for a season) and link out for **live standings** (they change). Placement tables stay accurate; copied standings rot.
- Name decoding: `- E` / `- S` are a club's Elite and Select teams, `T1` / `T2` the girls equivalent, and `Giants - West` / `Giants East` are branches of 95 Giants, not separate clubs. Watch the collisions: Express (Walpole) vs Westchester Express (NY), Winter Club vs Lovell Academy.
- The 2026-27 E9 spans six states (MA, NH, VT, RI, ME, NY). Don't assume a club is in Massachusetts.

## Stack
- **Jekyll** (Ruby). No Node.js, no npm, no build pipeline.
- **Plugins:** `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-redirect-from`
- **Deployment:** GitHub Pages (CNAME in repo root)
- **Fonts:** Inter via Google Fonts
- **CSS:** Custom properties only — no framework. Variables defined in `styles/main.css`.

## Running locally
```bash
bundle exec jekyll serve
```
Output goes to `_site/`. Never commit `_site/`.

No Ruby on this machine (e.g. the n8n-1 Linux box)? Use Docker instead:
```bash
mkdir -p ~/.cache/scout-elite-gems && docker run --rm --user "$(id -u):$(id -g)" \
  -e BUNDLE_PATH=/gems -e GEM_HOME=/gems -e HOME=/tmp \
  -v ~/.cache/scout-elite-gems:/gems -v "$PWD:/site" -w /site -p 4000:4000 \
  ruby:3 bash -c "bundle install --quiet && bundle exec jekyll serve --host 0.0.0.0 --watch"
```
LAN preview from other machines: `http://n8n-1:4000`.

**Verify with `bundle exec jekyll build`** (~1s) — catches Liquid/template errors before serving.

**Browser checks (n8n-1 box):** the `playwright` npm package isn't installed — `npm i playwright-core` in a scratch dir and launch Chromium with `executablePath: ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome` and `--no-sandbox`. The Playwright MCP plugin fails here (it expects Google Chrome at /opt/google/chrome).

**Resizing/compressing images:** no ImageMagick, `sharp`, or Python PIL on the n8n-1 box — `npm i jimp@0.22` in a scratch dir (`Jimp.read` → `crop`/`resize`/`quality(80)` → `writeAsync`); on Windows use PowerShell `System.Drawing` (GDI+). Hero/OG images → ~1200-1600px-wide JPG.

**Generating blog hero/OG art:** author it as an HTML/SVG page and screenshot it with headless Chromium at `deviceScaleFactor: 2`, then downscale to **1600x840** with jimp (`RESIZE_BICUBIC`, quality 86) — that 2x-then-downscale step is what keeps the type crisp. House style is set by `img/blog/e9-season-guide-2026-27.jpg` and `img/blog/e9-divisions-2026-27.jpg`: near-black ground, faint rink line art (center circle, blue/red lines, faceoff circles) under heavy italic Inter 900 with `scaleX(.94)`, an outlined-stroke year, and a data motif on the right. Vary the composition between posts so sibling articles don't look duplicated.

**Capturing app screenshots (marketing assets):** run `npm run dev` in `../scout-elite` (hits QA Supabase) and drive headless Chromium via `playwright-core`. Login mirrors `../scout-elite/tests/e2e/auth.setup.ts` (choice screen → "Sign in with Email" → labeled fields; creds in `../scout-elite/.env.local`). Seed pretty tutorial content with `POST /api/onboarding/start-tour` per tour. Dismiss tour popups before shooting. Web-ready derivatives live in `img/how-it-works/` (source PNGs stay untracked in `img/app-screenshots/2026-07-candidates/`).

## Directory structure
```
_pages/           # Main site pages (features/, how-it-works.md, etc.)
_pages/features/  # Feature sub-pages (practice-planning.md, ai-reports.md, playbooks.md, video.md, teams.md)
_pages/arcade/    # Hockey games (unlisted, noindex) — see the Arcade section
_landing-pages/   # Persona landing pages (coach, parent, skills coach)
_posts/           # Blog posts
_help/            # Help / knowledge base articles
_includes/        # Liquid partials
_layouts/         # Page templates (default.html, post.html, kb-article.html)
styles/           # CSS files (main.css is the primary one)
scripts/          # JS files
scripts/games/    # One IIFE per arcade game + the shared arcade.js helper
img/              # Images and favicons
Reference Material/  # Excluded from the build; dev tooling (e.g. zamboni-solver.js)
_config.yml       # Jekyll config — collections, plugins, permalink rules
Gemfile           # Ruby dependencies
index.md          # Homepage
```

## Blog post conventions
- **Map posts** inline Leaflet from unpkg in the post body (no build step). `_posts/2026-06-08-minnesota-youth-hockey-explained-parent-guide.md` is the most evolved example: an `L.layerGroup` per category, an `L.control.layers` toggle, and a hand-rolled bottom-right legend. Always carry the "approximate organizational bases, not every rink" caveat. Verify markers/tiles render at 1280px **and** 375px.
- Adding a post to the Massachusetts series means adding an entry to `_includes/ma-hockey-guide-series.html` and passing `current="<key>"` from the post.
- `{% include map-cta.html %}` is the mid-post CTA used in the league and map guides.
- **Guard against cannibalization in the E9 cluster** (~40% of site impressions). The split as of 2026-08-31: `/blog/e9-hockey-season-guide/` owns what the divisions *mean*, `/blog/e9-divisions-by-team/` owns *which team is in which*, `/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/` owns MA organizations plus MHR ratings. Prefer updating one of those to minting a fifth E9 URL, and when a live page has gone factually wrong, fix it in place rather than publishing the correction elsewhere.
- **The prep/high-school cluster is separate and was greenfield as of 2026-09-10** (2 impressions across every prep/NEPSAC query). `/blog/isl-prep-school-hockey-guide/` owns the ISL: all 16 schools, Keller vs Eberhart, the map. A NEPSAC post is planned to own the governing body and the postseason brackets (`Reference Material/Blog/nepsac-post-plan.md`); when it ships, trim the ISL post's NEPSAC section rather than letting both explain Stuart/Corkery.
- Season-specific reference posts still get evergreen `/blog/<slug>/` permalinks with no year, so they accrue authority across seasons and get refreshed in place.

## Frontmatter conventions
Every page needs at minimum:
```yaml
---
layout: default
title: "Descriptive page title with keywords"
description: "One or two sentences. Specific. Keyword-bearing."
permalink: /path/to/page/
last_modified_at: YYYY-MM-DD
---
```

## SEO
SEO is handled by `jekyll-seo-tag` via `{% seo %}` in `_layouts/default.html`. It reads:
- `title` → `<title>`, `og:title`, `twitter:title`
- `description` → `<meta name="description">`, `og:description`
- `image` → `og:image`, `twitter:image` (use path string or `{path, alt}` object)
  - **Gotcha:** when `image` is a `{path, alt}` object, listing/card templates must read `{{ post.image.path | default: post.image }}` — `post.image` alone dumps the raw hash (see `_pages/blog.md`).
- `last_modified_at` → `<lastmod>` in sitemap.xml via `jekyll-sitemap`
- `canonical_url` → overrides auto-generated canonical if needed

If `image` is missing, social shares (Twitter/X, Slack, iMessage) show no thumbnail.

## Analytics — Search Console and GA4 are wired up

Both are readable from this box via one Google service account. The key lives **outside the
repo** at `~/.config/gsc/sa.json`; the venv with the client libraries is `~/.venvs/gsc`.

```bash
~/.venvs/gsc/bin/python "Reference Material/analytics/gsc-pull.py" --days 90 --compare --exclude-country bra prt
~/.venvs/gsc/bin/python "Reference Material/analytics/ga4-pull.py"  --days 90 --property 505222412
~/.venvs/gsc/bin/python "Reference Material/analytics/ga4-pull.py"  --days 90 --bots --property 505222412
```

Pulls land in `Reference Material/analytics/out/<date>/` and are gitignored. GSC is a
**domain property** (`sc-domain:scout-elite.com`), not a URL-prefix one; hardcoding
`https://scout-elite.com/` returns a 403 that reads like a permissions failure. The GA4
Data API is enabled, the Admin API is not, so always pass `--property 505222412`.

**Always exclude `bra` and `prt`, or every number is wrong.** A Brazilian EA FC Pro Clubs
product called **Scout Elite Analytics** (`scoutelite.com.br`, registered 2026-08-20) sends
real humans searching its name into this site. It was **650 of 1,180 search clicks and 211
of 293 `try_click` events** in the 90 days to 2026-09-07. It is not bot traffic (Search
Console records the clicks, and GSC agrees with GA4 to within 3%), it is just worthless
traffic that inflates every headline number. It lands almost entirely on `/` and
`/scout-elite-live/`, so blog-page figures are unaffected. Full record with primary
sources: `Reference Material/brand/2026-09-10-scoutelite-com-br-collision/`.

Custom event params (`placement`, `plan`, `game`) only reach GA4 reports and the API once
registered as custom dimensions in GA4 admin, and registration is not retroactive. The
puller's custom-dimension reports fail soft when they are missing.

### What the Search Console data actually says (measured 2026-09-10, 90d)

**Informational queries convert; navigational ones do not.** Blog pages ranking for
question-shaped queries run **2.5-4% CTR**. The one page dominated by people searching the
league's own name runs **0.87%**, and splitting its queries shows why: 12,817 of its 12,970
impressions come from `e9`, `e9 hockey`, `elite 9` and variants at 0.57% CTR, versus 1.96%
on everything else. Those searchers want elite9hockey.com and no title rewrite beats the
official site for its own name.

**So do not design a post around a governing body's brand name.** `ISL hockey` belongs to
islsports.org the same way. Target what the official site answers badly: division lists,
maps, comparisons, "which team/school", parent-decision queries.

**Titles that convert here lead with category plus geography, then name a deliverable.**
"Massachusetts Youth Hockey Leagues Explained: ..." (4.12%), "E9 2026-27 Divisions: Every
Team, by Birth Year" (3.76%), "Massachusetts Youth Hockey Teams: EHF Guide & Map" (2.64%).
Keep titles under ~60 characters and descriptions under ~155, both measured on the rendered
page, not the frontmatter.

Re-measure before theorising. The full evidence for any claim above is one command away.

## Liquid & data gotchas
- **Liquid executes inside HTML comments.** A `{% include %}` of the same file in a comment = infinite recursion ("stack level too deep"). Keep Liquid tags out of comments.
- **Shared JS data:** dataset lives in `_data/*.json` (single source), injected via `<script>window.X = {{ site.data.x | jsonify }}</script>`, and *also* server-rendered in HTML — don't rely on JS-only rendering for indexable content.
- **`Reference Material/` is excluded and that exclusion works.** If you see HTML under that path in `_site` or on production, it is `jekyll-redirect-from` stubs, not leaked notes: the cost and Minnesota posts declare `redirect_from:` for URLs that were live before the exclude existed. The stubs contain a canonical, a meta-refresh and `noindex`, and no note prose. **Do not delete those redirects** (it 404s ~1,270 impressions/90d of indexed URLs) and **do not "fix" the exclude** (it is not broken). They have failed to consolidate, and the fix is written up in `Reference Material/seo/2026-09-10-reference-material-redirect-consolidation.md`.

## Hockey glossary system
Searchable glossary at `/hockey-glossary/`. Single source `_data/hockey_glossary.json` feeds: the widget (`_includes/hockey-glossary.html`, server-rendered + JS-enhanced), site-wide post tooltips (`scripts/glossary-tooltips.js`, injected for `layout: post` in `default.html`), and `DefinedTermSet` JSON-LD. The concepts essay post links to it (kept separate to avoid keyword cannibalization).

## CSS conventions
Dark theme. Use CSS custom properties — never hardcode colors.

Key variables:
- `--primary-bg`, `--secondary-bg` — page/section backgrounds
- `--card-bg` — card backgrounds
- `--text-primary`, `--text-secondary` — text
- `--accent-primary`, `--accent-hover` — blue brand color and hover state
- `--border-color` — borders
- `--radius-md`, `--radius-lg` — border radii
- `--shadow-sm` — box shadow

## Copy voice
Direct and practical. Written by parent coaches for parent coaches. No fluff, no corporate tone. See `_pages/features/ai-reports.md` and `_pages/features/playbooks.md` for the established voice. Hero hooks lead with the coach's problem, not the feature name.

**No em-dashes in site prose** — use commas, periods, or parentheses.

**Positioning pillars (2026-07):** lead with the time save ("minutes, not evenings") and AI-assisted identity; work in "it learns your team / gets smarter as you use it" where relevant; never frame the tools as a required workflow or sequence (each works standalone, any order); audience is team coaches, skills coaches, and parents. Don't quote explicit before/after time numbers (no "2 minutes instead of 15").

**"Development" over "coaching" (2026-07-23):** "coach" is fine when it names a person (Team Coach persona, "their coach", "the coach's reports" — parent-friendly, keep). When copy names the activity the *reader* does, say "development" / "developing your players" so parents and skills coaches aren't read out.

**Pricing phrasing:** Solo is NOT a coach plan — parents buy it. Say "creation toolkit, coach or parent", never "coaches start at $4.99". Starter caps are creation caps ("Create 3 reports", "Create 3 plans"); viewing shared content is always unlimited and free. Report tiering per Scott (2026-07-23): Starter creates 3, Solo unlimited, Pro shares.

**Tagline:** "Review. Plan. Develop. Repeat." is approved for site use (hero eyebrow on /how-it-works/). Never write "Xpress" in prose — the brand name was dropped in-app 2026-07-22; the `xpress.scout-elite.com` domain and CTA include are unchanged.

**Personas (2026-07-23, per Scott):** Skills Coach = often a *remote video-analysis* coach, not primarily on-ice — pitch is one organized system per client family, season-long report history parents can reference, knowledgebase + distribution of their teaching. Hockey Parent = random camera-roll clips (brilliant ones and maddening ones) + their own report history; works even if the coach isn't on Scout Elite; avoid labor-sounding features (telestration) in parent copy.

## Key URLs
- Production site: `https://scout-elite.com`
- App / signup: `https://xpress.scout-elite.com`
- Try flow (no signup): `https://xpress.scout-elite.com/try`

## CTA links to xpress — always use the include

Every link that points to `xpress.scout-elite.com` for a conversion action (trial, register, subscribe) **must** use the Liquid include, not a hardcoded `<a>` tag:

```liquid
{% include xpress-cta.html placement="<placement>" text="Button text" %}
```

**`_includes/xpress-cta.html`** is the single source of truth for UTM params. It builds the full URL automatically:
- `utm_source=scout-elite` and `utm_medium=website` are always injected
- `utm_campaign` comes from `page.utm_campaign` frontmatter → `page.slug` → `include.campaign` (in that priority order)
- `utm_content` = the `placement` param (also sets `data-try-placement` for the click event in `scripts/main.js`)

**Full parameter reference:**
| Param | Default | Notes |
|---|---|---|
| `placement` | — | Required. E.g. `home-hero`, `pricing-solo`, `blog-post-cta` |
| `dest` | `/try` | Path after domain. May include query params: `/account/register?plan=solo` |
| `text` | `Try Scout Elite Free →` | Link text, HTML entities OK |
| `class` | `btn btn-primary` | CSS classes |
| `style` | — | Inline styles |
| `onclick` | — | onclick handler value |
| `campaign` | — | Explicit override (skip if page.slug gives a good value) |
| `rel` | `noopener` | rel attribute |

**Pages that need `utm_campaign` in frontmatter** (because `page.slug` is ambiguous):
- `index.md` → `utm_campaign: homepage`
- `_pages/features/index.md` → `utm_campaign: features-index`
- Any landing page → `utm_campaign: landing-<persona>`

**Examples:**

Hero CTA (campaign auto-set to page.slug):
```liquid
{% include xpress-cta.html placement="feature-ai-hero" text="Try It Free &rarr; No Signup" %}
```

Pricing card with plan pre-selected:
```liquid
{% include xpress-cta.html dest="/account/register?plan=solo" placement="pricing-solo" text="Start Solo Trial" class="pricing-card__cta" %}
```

Blog post CTA (campaign becomes the post slug automatically — no extra work):
```liquid
<div style="margin: 1.5em 0; text-align: center;">
{% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}
</div>
```

### After making changes or adding content — always verify

**After any of the following, run a UTM audit:**
- Adding a new blog post
- Adding a new page or landing page
- Editing existing CTAs
- Adding a new CTA surface anywhere

Audit command — finds any xpress conversion links that are missing UTM params:
```bash
grep -r 'xpress\.scout-elite\.com' _posts _pages _landing-pages _layouts index.md \
  --include="*.md" --include="*.html" -l | \
  xargs grep -l 'xpress\.scout-elite\.com' | \
  xargs grep -n 'xpress\.scout-elite\.com' | \
  grep -v 'utm_source\|include xpress-cta\|page\.slug\|page\.utm_campaign\|Log In\|nav-login\|xpress\.scout-elite\.com`\|agents\.md\|getting-started\|support\.md'
```

Any line that appears in the output is a hardcoded xpress link without UTM coverage — it should either be converted to the include or have `{{ page.slug }}` / `{{ page.utm_campaign }}` injected into the campaign param manually.

**Non-CTA links that are intentionally left without UTMs** (do not flag these):
- Nav "Log In" (`nav-login`) — existing user link, not a conversion action
- `support.md` prose links — contextual references, not CTAs
- `getting-started.md` — help content
- `agents.md` — this file

## Arcade (/arcade/) — 2026-08-16
Eight touch-first hockey games. **Unlisted, not secret:** every page carries `sitemap: false` + `noindex: true` (the layout emits the robots meta) so they stay out of search, but a small gamepad icon in the nav links to `/arcade/`. Don't "helpfully" remove that link on the grounds that the arcade is hidden. The arcade lived at `/games/` for one day (2026-08-12); those URLs were deliberately left to 404 rather than redirected, since nothing was indexed or linked.

**Rink Crossword is the flagship.** Breakaway, Zamboni and Bar Down are the other finished games; the remaining four are prototypes.

### Arcade conventions
- Pages in `_pages/arcade/*.html` plus the `index.md` menu. Each page sets `arcade: true`, which makes `_layouts/default.html` load `styles/games.css` **and skip the footer newsletter block** — that block loads reCAPTCHA, whose floating badge parks over the game controls. Removing it at the source also avoids the reCAPTCHA attribution obligation that hiding the badge would create.
- Shared helper `scripts/games/arcade.js`: DPR-aware canvas scaling, unified touch input, localStorage bests, seeded PRNG, local day key, analytics. Each game is one page + one ES5 IIFE in `scripts/games/`, colors via `Arcade.colors` (CSS vars only, never hardcoded hex).
- Nav icon is `.nav-arcade` in `_layouts/default.html`: icon only on desktop, icon plus an "Arcade" label inside the mobile drawer, where a bare icon would read as a rendering bug.
- **Three tiers on the index, and the distinctions are deliberate.** "Featured game" is a single promoted title in a full-width `.arcade-featured` card (currently Rink Crossword). That card is a **div, not an anchor**: its description carries its own link to the glossary, and a link inside a link is invalid HTML that browsers silently split. The CTA stretches an invisible `::after` layer over the whole card to keep it clickable, and the inline link sits above it on `z-index`. Keep that shape if you add anything clickable to the card. it is hand-picked, not rotated, and the featured game is *not* repeated in the grid below. "Ready to play" holds the other finished games (Breakaway, Zamboni, Bar Down), with no prototype badge anywhere on their pages. "Prototypes" holds the rest: dashed cards with a `.arcade-card__chip` badge, plus a `.proto-notice` banner on each page linking to the feedback board at `https://scout-elite.supahub.com/en`. To promote a game out of prototypes: move its card up, drop its `.proto-notice`, and clear its title badge. To change the featured game: swap the `.arcade-featured` block and move the outgoing one back into the grid.
- **Analytics (GA4).** `Arcade.trackPlay(game)` fires `arcade_play` once per page load from the first *meaningful input* (a deke, a pinch, a slide, a typed letter), never from page load or a Start button, so a real play is distinguishable from a visit. `Arcade.trackDone(game, params)` fires `arcade_complete` on a genuine finish. Every event carries a `game` param, so one event name covers the arcade and breaks down per game. gtag only loads on production builds, so it all no-ops locally, and calls are wrapped: analytics must never break a game. **Params only reach GA4 reports once registered as custom dimensions in the GA4 admin** (DebugView and BigQuery see them regardless).
- Arcade pages carry no xpress CTAs, so the UTM audit does not flag them.
- **Card thumbnails are real screenshots**, not art: `img/arcade/<slug>.jpg`, captured mid-play (a trick banner mid-flight, a half-resurfaced sheet, solved entries shaded green) by `Reference Material/capture-arcade-thumbs.js`. **Re-run it and commit the output after any change to a game's visuals**, or the cards quietly drift out of date. It needs the local preview running plus playwright-core on NODE_PATH; usage is in the script header. Per-game framing lives in its `SHOTS` entry: `fit: 'cover'` zooms into the action for the arcade games, `fit: 'contain'` fits the whole board for the puzzles, and `focus` picks the vertical band. The script hides the fixed header while shooting, since it otherwise paints over tall boards. Images are lazy-loaded with width/height attributes, and the CSS needs `height: auto` for `aspect-ratio` to beat those attributes.
- Testing pattern: headless Chromium (playwright-core, see Browser checks above) driving the Docker `jekyll serve` on :4000 with a tap-bot. Stub `window.gtag` and assert on captured calls to test analytics. For Breakaway showdowns, temporarily sed `LEVEL_LEN` from 600 to 120 and restore it after.

### Rink Crossword (flagship)
Builds a criss-cross grid in the browser from `_data/hockey_glossary.json`, seeded by the local date (day 0 = 2026-08-13). No generation step, no cron: it picks up new glossary terms automatically on the next deploy. Clues are the definitions with the answer redacted, and any *other* answer in the same grid is redacted too, so one clue cannot hand over another. Rules worth preserving:
- The phone-sized grid cap (`MAX_W`/`MAX_H`) is enforced **during** word placement, never as an after-the-fact rejection, so retries chase quality instead of falling back to an oversized board.
- The whole puzzle object is saved to localStorage with the player's progress, so a glossary change shipped mid-solve cannot rearrange a board someone already started.
- On phones the puzzle is an app screen (`.cw-screen`) whose height `crossword.js` measures from the real distance to the bottom of the viewport, not a `dvh` calc: `dvh` does not always match the viewport and any change above the board shifts a hardcoded offset. Cell size then comes from the screen height minus the board's siblings, never from the wrapper element, because the wrapper is a flex child that an oversized board inflates, so measuring it feeds the board's own size back in and it never shrinks. Verify at 360x640 and 375x667, not just tall phones.
- There is no Check button. Green shading on a fully correct entry is the only correctness signal, deliberately.
- Typing past the end of an entry jumps to the next unsolved clue, so the cursor can never park on a filled square (that was a real bug, 2026-08-13).
- Verify generator changes by simulating a few hundred days headlessly (word-count distribution, max grid width), never by eyeballing one day.
- `arcade_complete` params: `mode`, `puzzle`, `seconds`, `words`, `revealed` (0 = solved without help).

### Breakaway
Top-down deke dodger, score-based (passes +5, slick tricks +15, epic +30, goals +50). 17 named trick moves tiered by how late you deke, with a ring telegraph on threats (green = slick window, gold = epic). Three defender archetypes (plodder/regular/burner) whose closing speed stays **constant across levels by design**, so the reaction window never shrinks; levels escalate via spawn density and lateral tracking instead. 600m levels end in a goalie showdown with an auto-released shot. One-time explainer pause at the first net; tap-zone chevrons mark the deke zones. All tuning constants sit at the top of `scripts/games/breakaway.js`. `arcade_complete` params: `score`, `level`, `beaten`, `meters`.

### Zamboni
Ice-slide resurfacing puzzle, 25 levels (optimal par 4 up to 21). **Every level and its par is machine-proved by `Reference Material/zamboni-solver.js`** (exact BFS over position + remaining-scuff state, same slide rules as the game; it parses the LEVELS array straight out of `scripts/games/zamboni.js`). Run `node 'Reference Material/zamboni-solver.js'` after ANY level change: it exits nonzero on an unsolvable level or a non-optimal par. Level-select buttons are generated from the LEVELS array, so adding levels needs no HTML edit. New levels are easiest to make with a slide-walk generator (scuff exactly what k random slides sweep, then let the solver compute true par). Visual convention (2026-08-12, after a contrast complaint): blockers render as white dasher-board tiles with a red kickplate on every ice-facing edge, painted after the grid lines so they always pop against the dark ice. **Keep obstacle contrast high in any new levels or games.** `arcade_complete` params: `level`, `moves`, `par`, `stars`.

### Bar Down
_Promoted out of prototypes 2026-08-14._ **Bar Down** is the Flappy Dunk formula in hockey dress (see the backlog entry it came from). The camera looks straight down on **one** net lying mouth-up, roaming in both axes, so the puck drops in like a ball through a hoop; a goal is worth a single point and the multiplier is what pays: **only a bar down (dead centre) advances it**, one per goal to a cap of 50x, while an off-centre goal still pays but wipes it back to 1, as does decking the puck. That is the whole risk: a scruffy goal costs you the run you were building. The play area is an end zone seen from above: rounded end boards at the bottom that the puck curls around, straight side boards running off the top, and **no boards across the top**, so the zone reads as continuing into neutral ice. An undrawn ceiling keeps the puck in play. Horizontal speed is **fixed** (`VX_SPEED`, no ramp) and is pinned back to that magnitude after every board contact, because the rounded corners reflect the whole velocity vector and would otherwise leave the puck crawling or tearing sideways depending on the angle it clipped. The next net is placed by `pickNextNet`, which looks ahead over the same physics and rejects any spot the puck could drop into on the rebound alone, so every goal has to be set up with at least one tap; this is done purely by placement, never by restricting the puck. The net opens each run centred with its crossbar on the goal line, where a net really sits, and while it is sliding to its next spot it draws at low alpha and is **not collidable at all**, so a target still in transit can never be scored on or bounced off. The opening drop spawns wide and drifting wider, and board bounce is damped (`ICE_BOUNCE`) enough that a decked puck cannot pop back over the goal line, so no goal can ever land without a tap: verified by running the game untouched and asserting a score of zero. Spawn a ring effect only on a real impact, never on plain contact, or a puck rolling along the boards emits one per frame and stacks into a column of growing white circles. The posts and the back of the net are solid, so clipping a post pings the puck back out instead of counting; **the top face is deliberately NOT a collider**, because looking down at a net the top face is the opening, and making it solid once swatted away every clean drop and made the game unscoreable. **One puck lasts the whole run:** scoring pops it back out off the mesh (what a real puck does) rather than respawning, so play never stops to reset, and the net slides away to its next spot while the puck is still airborne. Getting here took a wrong turn worth recording: the first build was a side view with a net standing on the ice, which Scott rejected on sight because it did not read as a hockey goal. Two lessons from that. **A hockey net is red pipe with white mesh** and the first version had it backwards (white pipe, dark mesh), which alone destroys recognition. And an elevated, mouth-up target is what makes the genre work, because gravity does the aiming; a net standing on the ice forced an invented reason to drop pucks in from above and satisfied neither the sport nor the game. Tune it by sweeping a metronome bot across tap cadences and checking the score spread, but do not tune *to* the bot: a metronome cannot play this at fast cadences and a human can, because a human watches the puck.

### Grind Line
_Built 2026-09-02, shipped as a prototype._ A hockey **systems** game: read what the defence takes away, call the play, and keep calling it whether you have the puck or not. Full design rationale is in `Reference Material/grind-line-design.md`; this is what the code does.

**Architecture, and it is a deliberate exception to the one-page-one-IIFE arcade rule.** Three modules plus a node harness:
- `scripts/games/grind-line/engine.js` — **pure reducer**, `step(state, action, data) -> {state, events}`. No DOM, no timers, no `Math.random`; the RNG lives in state so a run is exactly `{seed, actions[]}`. Loads in node and the browser (UMD).
- `scripts/games/grind-line/render.js` — consumes the engine's **event stream** (`PASS`, `HIT`, `SHOT`, `GOAL`, `WEAR`, `TURNOVER`, `ZONE`, `WHISTLE`...). It owns player positions and the camera; it knows no hockey. **New content therefore needs no new animation code.**
- `scripts/games/grind-line/game.js` — glue only: input, arcade.js, the whistle panel.
- `_data/gl/{beats,systems,matchups,traits,coaches}.json` — all hockey, injected into the page with `jsonify`.

**Never dead-end the puck.** Every beat resolves to one of eight outcomes and only `WHISTLE` is terminal; `TURNOVER` and `COUNTER` flip possession and the player keeps acting, now on defence. Two beats shipped with **no `ADVANCE` outcome at all** (`OZ.them.retrieval`, `NZ.them.rush`), so the opponent could never break out and play pooled in the o-zone at 49%. A gate now asserts every transit beat can move the puck. Similarly `situation:'retrieval'` was only ever set at a faceoff until `settle()` was added, which kept the breakout — the signature beat — at 3% of play.

**Verification is not optional here.** Three scripts, all exiting nonzero:
- `node "Reference Material/grind-line-sim.js"` — 29 balance gates (`-v` for beat/outcome tables). Run after ANY `_data/gl` change.
- `node "Reference Material/grind-line-layout-check.js"` — every player, option spot and label inside its beat's camera window, no label overlaps. Catches what would otherwise only appear as a mangled screenshot.
- Both were written before the content was authored at volume, and both caught real bugs the same day.

**Bugs worth not repeating.** `value()` and `polarity()` disagreed about a loose puck, so in every battle the option that won the puck most often scored *worst*. Safe plays (rim, chip, hold) were all dead because expected value never picks them: they exist to cut variance, so a whistle had to be worth more when gassed (it is a rest and a line change), a counter worth less, and **risk had to scale with fatigue** so tiredness punishes ambition rather than caution. The overlay uses the `hidden` **attribute**, not a class (`.game-overlay[hidden]`) — a class does nothing. The canvas sizes off parent **width** like `Arcade.setupCanvas`; every arcade page sits below the fold on a phone and that is fine, so `game.js` scrolls the board into view on start instead of shrinking it.

**Zone flow, and why it looked broken.** The engine never moves more than one zone per beat (measured: 0 multi-zone jumps in 24,000 beats). What read as the puck teleporting was two driver bugs. The faceoff **picked a random zone and random possession every time**, and an on-the-fly line change was modelled as a **whistle**, which sent it to that random faceoff roughly every 11 beats. Now: a line change never stops play (`state.lineChange`, wear recovers, puck stays put), and `E.faceoffFrom()` places the draw by rule — goal to centre ice, penalty in the offender's end, icing in the end of the team that iced it, a goalie freeze stays where it happened. **Possession is then a straight 50/50 draw**, because nobody is owed a faceoff, and `settle()` routes the winner into offence and the loser into defence automatically (centre → zone entry vs neutral defend; their end → o-zone cycle vs forecheck; your end → breakout vs d-zone defend). A goalie freezing 31% of shots was also stopping play every 6.4 beats; at 16% freeze / 42% rebound it is 7.6. **Presentation matters as much as the rule here:** a whistle dims the ice, names the reason and sounds; then both centres come to the dot and the puck is dropped. Relocating the puck silently is what made a legal faceoff look like a glitch. A dump is drawn differently from a carry (flung ahead, nobody converging, it is a race) because otherwise `DUMP` and `ADVANCE` are indistinguishable on screen.

**Making transitions read as hockey, and how to measure it.** "Jumpy" turned out to be four separate discontinuities, none of them findable by eye. Verify with the smoothness harness (sample `R.debug()` every rAF, report max per-frame movement and any frame more than 4x its neighbours): the target is **zero discontinuities**, and it went from puck jumping **78 world units in a single frame** to 14.
- **Formations must translate, not rearrange.** Every beat has its own layout, so tweening each player straight to his new spot slid ten men 100+ units at once. `setBeat` now moves the whole formation rigidly behind the puck carrier first (reads as skating over the line), then settles into the new shape, with duration scaled by distance travelled. It returns that duration and the drivers wait for it instead of starting the play over the top.
- **A zone-generic beat still needs a picture per zone.** The engine aliases every loose puck to `DZ.loose.battle`, which is right — a battle plays the same anywhere. The renderer had one battle layout, parked at cam 198, so a rebound in the offensive zone was drawn in **your own end** and the next beat snapped back: a full-sheet round trip from a turnover that never changed zone. `setBeat` now resolves the layout against `state.zone` first (`layoutFor`), and `NZ.loose.battle` / `OZ.loose.battle` layouts exist. The layout check guards it, and was verified by deleting a layout and confirming it fails.
- **Never assign the puck to a player.** `puck = pos[carrier]` teleported it, because the carrier begins the beat at his *previous* layout position. Blend the puck onto him instead.
- **`easeOut` launches at full speed.** Use `easeIO` for anything travelling a long way, and scale travel time with distance: a fixed 240ms dump crossed a zone in eight frames.
- **Cap `dt` at 30ms.** One slow frame in an `easeOut` tween is a teleport.
- **The camera rides the puck** across the line and only settles on the beat's framing afterwards, or it arrives before the players do. Pans are also speed-capped (~475ms end to end) so a long move reads as travel rather than a cut.

**`/arcade/grind-line-watch/` is now watch OR play.** A `Blue: AI / Blue: You` toggle hands you the blue bench mid-game and back again, so you can compare your calls against a coach's on the same run. When you have the bench you call every beat (tap the rings or keys 1-3) and get the standing-calls panel at each whistle; the reason log keeps printing either way, which is the point. This page supersedes `/arcade/grind-line/` — it has the coaches, the adaptation, the faceoffs, the smooth transitions and the log, and the older page has none of it. **Shipped 2026-09-10 unmerged, as a deliberate call by Scott** (it is a prototype, both pages are `noindex` + `sitemap: false`, and only `/arcade/grind-line/` is linked from the index). Merging them is still the right end state, so do not add features to both: put new work in the watch page and fold it down when someone promotes Grind Line out of prototypes.

**Watch mode (`/arcade/grind-line-watch/`, unlisted, dev surface).** Two coaches play each other continuously with nobody at the controls, printing every beat as `beat · call → outcome · why`. Built 2026-09-02 after the playable build felt flat, and it earned itself immediately: it exposed that **only one bench has tactical agency**. Side A picks a play at every beat; side B only sets standing calls between shifts. Measured over 648 games across every coach pairing and style: **side A wins 87.7%, 3.39 goals to 0.66.** That is the root of "it does not explain why I am successful sometimes and not others" — you are successful almost always. The fix is a model change, not tuning: **both benches must choose at each beat and the matchup of the two choices resolves**, which is the simultaneous-selection idea the original Systems backlog entry started from and which this build drifted away from.

**Engine returns the reason, not just the outcome.** Every modifier notes what it did (`coverage`, `matchup`, `wear`, `trait`, `call`, `strength`, `momentum`) and `step()` returns the factor that pushed hardest in the direction things actually went. The first build knew exactly which system took which lane away and threw it away before anything could show the player; that was its worst failure.

**Shifts end three ways** and all three are real: a whistle, a wear bar redlining, or an on-the-fly change at 11 beats. The third exists because wear starts at zero, so without it the first shift of every game ran to exhaustion.

### Prototypes
Grind Line (systems; see its own section), Keep It In (blue-line pinch timing), Shootout (goalie learns your shot tendencies across visits, persisted), Coach's Challenge (frame-scrub offside calls), The Telestrator (draw a route, players run it literally). Play events only, no completion events, except Grind Line which fires `arcade_complete` on a finished game.

### Games backlog
- ~~**Bar Down**~~ **Built 2026-08-13, promoted out of prototypes 2026-08-14.** Came from a request for the Flappy Dunk / Ziosk-tabletop-basketball formula in hockey dress; see the Bar Down section above.
- ~~**Grind Line**~~ **Built 2026-09-02, shipped as a prototype.** Came from a request for a turn-based systems game for kids; became a roguelike auto-battler in the Super Auto Pets lineage. See the Grind Line section above and `Reference Material/grind-line-design.md`. Still unbuilt from that design: the run structure (playoff push, draft 1-of-3), penalties/PP/PK, player traits surfaced in the UI, and the second tap verb (time the check).

## Current state (2026-09-10)
- **Analytics are live.** Search Console and GA4 both pullable from this box; see the Analytics section. Always filter `bra`/`prt`.
- **New post:** [ISL prep school hockey](/blog/isl-prep-school-hockey-guide/), 16 schools, map, Keller/Eberhart, NEPSAC, and the E9/EHF pipeline. Published 2026-09-10 with 0 impressions; the thing to watch is its query mix, not its volume (see the SEO evidence above).
- **Brand collision:** `scoutelite.com.br` launched 2026-08-20 and is the single biggest distortion in every analytics number. Record in `Reference Material/brand/`.
- **Open backlog:** the NEPSAC post, and the `Reference Material` redirect consolidation. Both written up under `Reference Material/`.

## Earlier state (2026-08-16)
- The arcade is live at `/arcade/`, linked from the nav. See the Arcade section above.
- Four finished games (Rink Crossword featured, plus Breakaway, Zamboni, Bar Down) and five prototypes (Grind Line, Keep It In, Shootout, Coach's Challenge, The Telestrator).
- Nav order: Home, How it Works, Features, Pricing, Support, Help, Blog, then the arcade icon, then Try Free / Log In.
- **E9 content (2026-08-31):** the league restructured for 2026-27 (new Elite tier above White, tier count varies by birth year, six-state footprint). `/blog/e9-hockey-season-guide/` was rewritten for it and `/blog/e9-divisions-by-team/` shipped as the placement list. **Known stale:** the season guide's hero image `img/blog/e9-season-guide-2026-27.jpg` still shows the retired White North / White South / Blue / Red ladder. Two open verifications: girls U10 is published with a North group only, and the `- E` / `- S` = Elite / Select reading is inferred from placement patterns, not confirmed by the league.

## Earlier state (2026-07-23)
- `/how-it-works/` is the persona-story page (shipped, replaced the intro.js tour page): split hero, three second-person "week" narratives deep-linkable via `#team-coach` / `#skills-coach` / `#parent`, screenshot figures via the page-scoped `.shot` component, Development Loop section. intro.js was removed from `_layouts/default.html` — don't reintroduce it.
- Nav order: How it Works sits directly after Home.
- Homepage pricing advertises the Starter report/plan creation caps. The app enforces the 3-report Starter cap on its `staging` branch (`46a7e37`); **promotion to app prod (`master`) was still pending as of 2026-07-23** — until then prod under-promises (free users get more than advertised).
- Known stale: `_landing-pages/20251022-skills-coach-1.md` still sells the old on-ice skills-coach framing, and the 2025 ad LPs carry the old video-first pitch.
