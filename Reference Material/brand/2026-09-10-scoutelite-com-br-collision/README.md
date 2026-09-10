# Name collision: scoutelite.com.br ("Scout Elite Analytics")

**Compiled 2026-09-10** from primary sources. Raw artifacts are in `raw/` so every
claim below can be re-checked without trusting this summary. Not legal advice; this is
a factual record assembled so a lawyer (or future us) does not have to rebuild it.

## One-line version

A Brazilian company launched an EA FC 26 "Pro Clubs" gaming-analytics product called
**Scout Elite Analytics** on 2026-08-20. Brazilian users searching for it find
scout-elite.com instead. It is real human traffic, not bots, and it is currently
distorting our analytics. We predate them by two years and ten months.

## Timeline

| Date | Event | Source |
|---|---|---|
| 2016-06-30 | `scoutelite.com` (no hyphen) registered by an unrelated third party | `raw/` RDAP, Verisign |
| **2023-10-25** | **`scout-elite.com` registered (us)** | `raw/rdap-scout-elite-com.json` |
| 2024-04-23 | First Wayback capture of our site under our ownership | `raw/wayback-scout-elite-com.txt` |
| 2024-12-08 | Our earliest published post (`the-scout-elite-manifesto`) | `_posts/` in this repo |
| 2025-09-09 | First commit in this repo | `git log --reverse` |
| **2026-08-20** | **`scoutelite.com.br` registered (them)** | `raw/rdap-scoutelite-com-br.json` |
| 2026-09-04 | Their traffic starts hitting us: 489 GSC clicks in one day vs a 6-15/day baseline | Search Console |
| 2026-09-05 | 190 clicks | Search Console |
| 2026-09-10 | This record compiled | -- |

Wayback has **zero** snapshots of `scoutelite.com.br`, consistent with a domain three
weeks old. Our own domain predates theirs by **1,030 days**.

## What they are

`https://scoutelite.com.br` -> "Scout Elite Analytics", self-described (in Portuguese) as
"Painel analítico para clubes de Scout Elite EA FC 26" -- an analytics dashboard for EA FC 26
Pro Clubs teams: automatic collection of official EA data, AI tactical analysis, art
generator, stream widgets, manager dashboard. Free trial offered.

Screenshot: `raw/scoutelite-com-br-homepage.png`. HTML as served: `raw/scoutelite-com-br-homepage.html`.

Different country, different industry (video-game esports vs youth ice hockey), different
customers. The overlap is the **name only**.

## Evidence that this is real users, not bot traffic

This was the original question and the answer is unambiguous.

1. **Search Console records the clicks.** GSC data comes from Google's own serving layer
   and is already crawler-filtered; bots do not appear in it. Brazil shows **650 clicks
   from 3,037 impressions over 90 days, a 21.4% CTR** (US comparison: 1.6%). That CTR is
   the signature of people searching a brand name and finding it ranked 1-3.
2. **GA4 and GSC agree within 3%.** GA4 reports 670 Brazilian `google / organic` sessions;
   GSC reports 650 Brazilian clicks. Ratio 1.03x. Fabricated sessions cannot track a
   number Google holds privately.
3. **The queries name them.** Brazilian query list includes literal `scoutelite.com.br`
   and `www.scoutelite.com.br`, plus "scout elite clubs" and "scout elite pro clubs"
   ("Pro Clubs" is the EA FC game mode).
4. **No ghost-spam signals.** Hostname check clean (only our own hosts plus 3 localhost
   dev sessions). No zero-engagement segments, no unexplained referrers.

## Impact on our numbers (90 days to 2026-09-07)

| Metric | With Brazil | Excluding Brazil |
|---|---|---|
| Search clicks | 1,180 | **530** |
| Click growth vs prior 90d | +1,080% | **+430%** (US+Canada: +386%) |
| `try_click` events | 293 | **~64** (Brazil 211, Portugal 18) |

US `try_click` over 90 days is **28**. Any analysis of which CTA placements work is
premature until that number is much larger.

**Reporting rule going forward:** exclude `bra` and `prt` from every report.
`gsc-pull.py --exclude-country bra prt` does this. GA4 needs an equivalent saved comparison.

## What we have and do not have

**Have:** continuous use of the name since 2023-10-25, with third-party timestamps
(domain registrar, Internet Archive, git history, Google Search Console).

**Do not have:** any trademark registration, US or Brazilian.

**Not verified:** whether anyone has filed for "Scout Elite" with the USPTO. The USPTO
API redirected when queried on 2026-09-10 and web search is not authoritative. This is an
open item -- check tmsearch.uspto.gov for the exact phrase in classes 042 (SaaS) and
041 (sports training/education). Do not treat the absence of a finding here as clearance.

## On sending a cease and desist

Considered and **not recommended as of this date**, for reasons worth recording:

- **Trademark rights are territorial.** Use-based US common-law rights do not reach a
  Brazilian company operating in Brazil. Acting there would generally require a Brazilian
  (INPI) registration, which we do not have.
- **The likelihood-of-confusion case is weak.** Different goods and services, different
  customers, different channels. What we are seeing is search-engine ambiguity, not
  consumers being misled about who they are buying from -- Brazilian visitors land, see
  hockey, and leave.
- **"Scout" and "Elite" are both descriptive in sports analytics.** Neither party coined
  the combination; descriptive marks get thin protection.
- **Downside is real.** A demand letter on weak footing can invite a declaratory-judgment
  response, costs money, and gaming communities amplify this kind of thing.
- **Sequencing is backwards.** Register first, then there is something to enforce.

**Revisit immediately if** they expand into the US market, move into youth or real-world
sports, begin ranking for our own terms (E9, EHF, hockey video analysis) rather than just
the brand name, or approach our customers.

## Recommended next steps

1. **File a US trademark** in class 042 (SaaS) and/or 041, claiming first use 2023-10-25.
   That date is the asset we already own; the filing converts it into something
   enforceable. Talk to a trademark attorney for an hour first -- that is the right spend,
   not a demand letter.
2. **Keep this record current.** Re-run the collectors if their site changes materially.
3. **Filter bra/prt from all reporting** so decisions are made on the real 530 clicks.
4. `scoutelite.com` (no hyphen) has been held by an unrelated party since 2016 and is not
   available defensively.

## Re-collecting this evidence

```bash
curl -s https://rdap.registro.br/domain/scoutelite.com.br
curl -s https://rdap.verisign.com/com/v1/domain/scout-elite.com
curl -s "http://web.archive.org/cdx/search/cdx?url=scout-elite.com&fl=timestamp,statuscode,original&collapse=timestamp:6"
```
