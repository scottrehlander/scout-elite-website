# Scout Elite Website — Project Instructions

## What this is
Jekyll static site for Scout Elite, a hockey video analysis SaaS targeting youth and minor hockey coaches. Hosted on GitHub Pages at `scout-elite.com`. The app itself lives at `https://xpress.scout-elite.com`.

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

## Directory structure
```
_pages/           # Main site pages (features/, how-it-works.md, etc.)
_pages/features/  # Feature sub-pages (ai-reports.md, playbooks.md, video.md)
_landing-pages/   # Persona landing pages (coach, parent, skills coach)
_posts/           # Blog posts
_help/            # Help / knowledge base articles
_includes/        # Liquid partials
_layouts/         # Page templates (default.html, post.html, kb-article.html)
styles/           # CSS files (main.css is the primary one)
scripts/          # JS files
img/              # Images and favicons
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
- `last_modified_at` → `<lastmod>` in sitemap.xml via `jekyll-sitemap`
- `canonical_url` → overrides auto-generated canonical if needed

If `image` is missing, social shares (Twitter/X, Slack, iMessage) show no thumbnail.

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

## Active work branch
`feature/rewrite-for-v2` — current development branch for the v2 site rewrite.
