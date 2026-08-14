# Scout Elite Website — Project Instructions

## What this is
Jekyll static site for Scout Elite, a hockey video analysis SaaS targeting youth and minor hockey coaches. Hosted on GitHub Pages at `scout-elite.com`. The app itself lives at `https://xpress.scout-elite.com`.

## App source — ground truth for features
The Scout Elite app source lives at `../scout-elite` (sibling directory). When you need to know what a feature actually does — capabilities, pricing tiers, limits, copy claims — read the source there rather than guessing. Useful anchors:
- `src/app/lib/workflow-registry.ts` — feature list with `requiredTier` and beta flags
- `src/app/lib/get-user-tier.ts` — free-tier limits (e.g. practice plans, custom drills)
- `src/app/components/FeatureGate.tsx` — which actions gate at which tier
- `supabase/migrations/` — schema, the source of truth for what a feature stores/can do

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

## Liquid & data gotchas
- **Liquid executes inside HTML comments.** A `{% include %}` of the same file in a comment = infinite recursion ("stack level too deep"). Keep Liquid tags out of comments.
- **Shared JS data:** dataset lives in `_data/*.json` (single source), injected via `<script>window.X = {{ site.data.x | jsonify }}</script>`, and *also* server-rendered in HTML — don't rely on JS-only rendering for indexable content.

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

## Arcade (/arcade/) — 2026-08-13
Seven touch-first hockey games. **Unlisted, not secret:** every page carries `sitemap: false` + `noindex: true` (the layout emits the robots meta) so they stay out of search, but a small gamepad icon in the nav links to `/arcade/`. Don't "helpfully" remove that link on the grounds that the arcade is hidden. The arcade lived at `/games/` for one day (2026-08-12); those URLs were deliberately left to 404 rather than redirected, since nothing was indexed or linked.

**Rink Crossword is the flagship.** Breakaway and Zamboni are the other two finished games; the rest are prototypes.

### Arcade conventions
- Pages in `_pages/arcade/*.html` plus the `index.md` menu. Each page sets `arcade: true`, which makes `_layouts/default.html` load `styles/games.css` **and skip the footer newsletter block** — that block loads reCAPTCHA, whose floating badge parks over the game controls. Removing it at the source also avoids the reCAPTCHA attribution obligation that hiding the badge would create.
- Shared helper `scripts/games/arcade.js`: DPR-aware canvas scaling, unified touch input, localStorage bests, seeded PRNG, local day key, analytics. Each game is one page + one ES5 IIFE in `scripts/games/`, colors via `Arcade.colors` (CSS vars only, never hardcoded hex).
- Nav icon is `.nav-arcade` in `_layouts/default.html`: icon only on desktop, icon plus an "Arcade" label inside the mobile drawer, where a bare icon would read as a rendering bug.
- **Three tiers on the index, and the distinctions are deliberate.** "Featured game" is a single promoted title in a full-width `.arcade-featured` card (currently Rink Crossword); it is hand-picked, not rotated, and the featured game is *not* repeated in the grid below. "Ready to play" holds the other finished games, with no prototype badge anywhere on their pages. "Prototypes" holds the rest: dashed cards with a `.arcade-card__chip` badge, plus a `.proto-notice` banner on each page linking to the feedback board at `https://scout-elite.supahub.com/en`. To promote a game out of prototypes: move its card up, drop its `.proto-notice`, and clear its title badge. To change the featured game: swap the `.arcade-featured` block and move the outgoing one back into the grid.
- **Analytics (GA4).** `Arcade.trackPlay(game)` fires `arcade_play` once per page load from the first *meaningful input* (a deke, a pinch, a slide, a typed letter), never from page load or a Start button, so a real play is distinguishable from a visit. `Arcade.trackDone(game, params)` fires `arcade_complete` on a genuine finish. Every event carries a `game` param, so one event name covers the arcade and breaks down per game. gtag only loads on production builds, so it all no-ops locally, and calls are wrapped: analytics must never break a game. **Params only reach GA4 reports once registered as custom dimensions in the GA4 admin** (DebugView and BigQuery see them regardless).
- Arcade pages carry no xpress CTAs, so the UTM audit does not flag them.
- **Card thumbnails are real screenshots**, not art: `img/arcade/<slug>.jpg`, captured mid-play (a trick banner mid-flight, a half-resurfaced sheet, solved entries shaded green) by `Reference Material/capture-arcade-thumbs.js`. **Re-run it and commit the output after any change to a game's visuals**, or the cards quietly drift out of date. It needs the local preview running plus playwright-core on NODE_PATH; usage is in the script header. Per-game framing lives in its `SHOTS` entry: `fit: 'cover'` zooms into the action for the arcade games, `fit: 'contain'` fits the whole board for the puzzles, and `focus` picks the vertical band. The script hides the fixed header while shooting, since it otherwise paints over tall boards. Images are lazy-loaded with width/height attributes, and the CSS needs `height: auto` for `aspect-ratio` to beat those attributes.
- Testing pattern: headless Chromium (playwright-core, see Browser checks above) driving the Docker `jekyll serve` on :4000 with a tap-bot. Stub `window.gtag` and assert on captured calls to test analytics. For Breakaway showdowns, temporarily sed `LEVEL_LEN` from 600 to 120 and restore it after.

### Rink Crossword (flagship)
Builds a criss-cross grid in the browser from `_data/hockey_glossary.json`, seeded by the local date (day 0 = 2026-08-13). No generation step, no cron: it picks up new glossary terms automatically on the next deploy. Clues are the definitions with the answer redacted, and any *other* answer in the same grid is redacted too, so one clue cannot hand over another. Rules worth preserving:
- The phone-sized grid cap (`MAX_W`/`MAX_H`) is enforced **during** word placement, never as an after-the-fact rejection, so retries chase quality instead of falling back to an oversized board.
- The whole puzzle object is saved to localStorage with the player's progress, so a glossary change shipped mid-solve cannot rearrange a board someone already started.
- On phones the puzzle is an app screen (`.cw-screen`, a viewport-height flex column) so board and keys are usable together; cells fit against **both** axes, not width alone.
- There is no Check button. Green shading on a fully correct entry is the only correctness signal, deliberately.
- Typing past the end of an entry jumps to the next unsolved clue, so the cursor can never park on a filled square (that was a real bug, 2026-08-13).
- Verify generator changes by simulating a few hundred days headlessly (word-count distribution, max grid width), never by eyeballing one day.
- `arcade_complete` params: `mode`, `puzzle`, `seconds`, `words`, `revealed` (0 = solved without help).

### Breakaway
Top-down deke dodger, score-based (passes +5, slick tricks +15, epic +30, goals +50). 17 named trick moves tiered by how late you deke, with a ring telegraph on threats (green = slick window, gold = epic). Three defender archetypes (plodder/regular/burner) whose closing speed stays **constant across levels by design**, so the reaction window never shrinks; levels escalate via spawn density and lateral tracking instead. 600m levels end in a goalie showdown with an auto-released shot. One-time explainer pause at the first net; tap-zone chevrons mark the deke zones. All tuning constants sit at the top of `scripts/games/breakaway.js`. `arcade_complete` params: `score`, `level`, `beaten`, `meters`.

### Zamboni
Ice-slide resurfacing puzzle, 25 levels (optimal par 4 up to 21). **Every level and its par is machine-proved by `Reference Material/zamboni-solver.js`** (exact BFS over position + remaining-scuff state, same slide rules as the game; it parses the LEVELS array straight out of `scripts/games/zamboni.js`). Run `node 'Reference Material/zamboni-solver.js'` after ANY level change: it exits nonzero on an unsolvable level or a non-optimal par. Level-select buttons are generated from the LEVELS array, so adding levels needs no HTML edit. New levels are easiest to make with a slide-walk generator (scuff exactly what k random slides sweep, then let the solver compute true par). Visual convention (2026-08-12, after a contrast complaint): blockers render as white dasher-board tiles with a red kickplate on every ice-facing edge, painted after the grid lines so they always pop against the dark ice. **Keep obstacle contrast high in any new levels or games.** `arcade_complete` params: `level`, `moves`, `par`, `stars`.

### Prototypes
Keep It In (blue-line pinch timing), Shootout (goalie learns your shot tendencies across visits, persisted), Coach's Challenge (frame-scrub offside calls), The Telestrator (draw a route, players run it literally). Play events only, no completion events.

### Games backlog
- **Bar Down (one-touch tap-to-loft, timed):** the Flappy Dunk / Ziosk-tabletop-basketball formula in hockey dress, requested 2026-08-13 (Scott's kids play the basketball one at Texas Roadhouse). Tap to loft the puck upward, keep it airborne, and snipe it into a net; the run is on a countdown that scoring extends, so a hot streak plays forever and a cold one ends fast. Streak multipliers reward clean snipes, with the top tier being an actual bar-down (off the crossbar and in). The basketball original wraps the ball around the screen edges; hockey has a better answer, since the puck should ricochet off the boards, which is both more authentic and the same "it comes back at you" feel. Loud, physical, zero-instruction, and the only arcade game we would have with a real risk/reward score chase.
- **Systems (turn-based, 2 players):** the puck moves between zones; each turn both players secretly pick the system they will run for that situation, then the game resolves success from the matchup odds plus a random roll. Examples: the team in the offensive zone *without* the puck picks a forecheck (1-2-2, 2-1-2, ...) while the puck team picks a breakout path (up the wall, center swing, stretch pass); with the puck in the o-zone you pick how to generate a chance (cycle, point shot, slot drive) while the defenders pick a d-zone coverage (man, zone, box+1). Same shape in every zone. Idea logged 2026-08-12.

## Current state (2026-08-13)
- The arcade shipped and is live at `/arcade/`, linked from the nav. See the Arcade section above.
- Nav order: Home, How it Works, Features, Pricing, Support, Help, Blog, then the arcade icon, then Try Free / Log In.

## Earlier state (2026-07-23)
- `/how-it-works/` is the persona-story page (shipped, replaced the intro.js tour page): split hero, three second-person "week" narratives deep-linkable via `#team-coach` / `#skills-coach` / `#parent`, screenshot figures via the page-scoped `.shot` component, Development Loop section. intro.js was removed from `_layouts/default.html` — don't reintroduce it.
- Nav order: How it Works sits directly after Home.
- Homepage pricing advertises the Starter report/plan creation caps. The app enforces the 3-report Starter cap on its `staging` branch (`46a7e37`); **promotion to app prod (`master`) was still pending as of 2026-07-23** — until then prod under-promises (free users get more than advertised).
- Known stale: `_landing-pages/20251022-skills-coach-1.md` still sells the old on-ice skills-coach framing, and the 2025 ad LPs carry the old video-first pitch.
