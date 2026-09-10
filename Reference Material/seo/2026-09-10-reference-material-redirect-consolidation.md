# Backlog: the retired `Reference Material` URLs never consolidated

**Filed 2026-09-10** off live Search Console data. Not started.

## The problem in one table

Three URLs that should have folded into the cost post are still ranking *above* it,
months after the redirects went in (90 days to 2026-09-07, all countries):

| URL | position | impressions | clicks |
|---|---|---|---|
| `/blog/2026/05/20/how-much-does-youth-hockey-cost/` (the real post) | **9.1** | 1,456 | 7 |
| `/Reference Material/Blog/youth-hockey-cost/youth-hockey-costs-blog-post/` | 8.7 | 668 | 6 |
| `/Reference Material/Blog/youth-hockey-cost/youth-hockey-cost-research/` | **7.6** | 526 | 0 |
| `/Reference Material/Blog/youth-hockey-cost/youth-hockey-cost-research-supplement/` | 8.9 | 75 | 0 |

~1,270 impressions per 90 days sitting on dead URLs. The real post is at position 23.6
for its own head term, "how much does youth hockey cost", with zero clicks.

There is a fourth in the same state: `/Reference Material/Blog/mn-districts-map-handoff/`,
redirecting to the Minnesota youth hockey post.

## Why it did not consolidate

**1. GitHub Pages cannot issue 301s.** `jekyll-redirect-from` emits a client-side
meta-refresh + JS page instead. Verified: `curl -L` against the live URL does not follow
it, the effective URL never changes. Google honours meta-refresh but more slowly and
more weakly than a server redirect.

**2. The stub sends contradictory signals.** The generated page carries BOTH
`<meta name="robots" content="noindex">` and `<link rel="canonical">` to the target.
Those fight: noindex says drop this page, canonical says fold its signals into that one.
Google resolves it by dropping the page, so the authority may never transfer. For a
redirect you want the canonical **without** the noindex.

Live stub as served on 2026-09-10:

```html
<link rel="canonical" href="https://scout-elite.com/blog/2026/05/20/how-much-does-youth-hockey-cost/">
<script>location="https://scout-elite.com/blog/2026/05/20/how-much-does-youth-hockey-cost/"</script>
<meta http-equiv="refresh" content="0; url=https://scout-elite.com/blog/.../">
<meta name="robots" content="noindex">
```

## Do NOT just delete the redirects

Removing `redirect_from:` turns four indexed URLs into 404s and discards whatever
authority they still hold. The redirects are correct in intent; the template is wrong.

## Proposed fix

1. **Override the redirect template to drop the `noindex`.** `jekyll-redirect-from`
   renders through a `redirect` layout; providing `_layouts/redirect.html` in the repo
   overrides the gem's built-in. Keep the canonical, keep the meta-refresh, remove the
   robots tag. Verify the generated stub changes before shipping.
2. **Strengthen the real cost post** so it deserves better than position 9. It is at
   23.6 for its exact-match head term, which is the bigger half of this problem and is
   not a redirect issue at all.
3. **Re-measure after 4-6 weeks.** Consolidation is slow; the success condition is the
   `Reference Material` rows falling out of the page report while the real post's
   impressions rise. Use:
   `~/.venvs/gsc/bin/python "Reference Material/analytics/gsc-pull.py" --days 90 --dims page`

## Open question

Whether a `_layouts/redirect.html` override actually wins over the gem's layout on the
GitHub Pages build (it should, local layouts take precedence, but GH Pages runs its own
plugin set). If it does not, the fallback is hand-writing the four stub HTML files at
those paths and dropping `redirect_from` for them.

## Related

Note that `exclude: - "Reference Material"` in `_config.yml` is working correctly. No
internal note prose is live; verified against production 2026-09-10. Only these
redirect stubs are, and they contain no content. Do not "fix" the exclude, it is not broken.
