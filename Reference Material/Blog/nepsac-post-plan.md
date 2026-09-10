# Backlog: the NEPSAC post

**Status:** requested by Scott 2026-09-10, right after the ISL guide shipped. Next up.
**Target:** new post in `_posts/`, evergreen permalink, suggested `/blog/nepsac-prep-hockey-guide/`.
**Why:** the [ISL guide](/blog/isl-prep-school-hockey-guide/) leans on NEPSAC in three places
(the three-bracket postseason, the classification mismatch, the 2026 results table) and links out
to nepsac.org for all of it. NEPSAC is the layer above the ISL and nothing on the site owns it.

---

## 1. What this post owns

Same anti-cannibalization discipline as the E9 cluster. The split has to be explicit up front,
because the ISL post already spends real words on NEPSAC:

| URL | Owns |
|---|---|
| `/blog/isl-prep-school-hockey-guide/` | **one conference**: the 16 ISL schools, Keller/Eberhart, the no-PG rule |
| **this post** | **the governing body and the postseason**: every league under NEPSAC, how the three brackets are seeded, how classification works |

The ISL post should end up linking here for "how the brackets work," and this post should link
there for "the ISL specifically." Trim the ISL post's *How the ISL Fits Into NEPSAC* section down
once this exists, rather than letting both explain Stuart/Corkery.

**The idea nothing on the site has:** parents talk about "prep hockey" as one thing. It is not.
NEPSAC is ~70 schools across at least ten member leagues with wildly different rules, and the
single biggest variable between them is whether a school takes postgraduates. The ISL does not.
Most of the rest do. That one rule changes the age of the kid across from yours.

## 2. Verified facts already in hand (2026-09-09/10 research pass)

All of this was confirmed during the ISL post and does not need re-verification, just a freshness
check on dates.

**Structure.** NEPSAC = New England Preparatory School Athletic Council, the body that runs the
championships. Member schools compete in conferences (ISL, Founders, Lakes Region, Housatonic,
Holt, MAPHL, Mid Atlantic, NEPSIHA Independent, Two Nations Prep, plus independents). The
conference is your regular season; NEPSAC is your postseason.

**Boys brackets, three eight-team fields:**

| Tournament | Also called |
|---|---|
| Stuart/Corkery | Elite 8 (open bracket, best 8 regardless of school size) |
| Martin/Earl | Large School |
| Piatelli/Simmons | Small School |

**Girls:** Chuck Vernon is the Elite 8; Large School and Small School run alongside.

**Classification is by total student body size and can move year to year**, which is why a
conference's own big/small split does not track NEPSAC's. This is the mismatch the ISL post
already documents with 2026 and 2023 examples.

**2026 boys results, fully verified (NEHJ, March 8 2026):**
- Elite 8 final: No. 8 Avon Old Farms 4, No. 2 St. Mark's 2. QFs: Avon 4 Dexter Southfield 2;
  St. Mark's 7 Belmont Hill 2; Kimball Union 1 Salisbury 0; Hotchkiss 3 St. Sebastian's 0.
  SFs: St. Mark's 7 Kimball Union 3; Avon 5 Hotchkiss 0. Top seeds: Dexter 19-1-5, St. Mark's
  24-3-0, Salisbury 23-4-2, St. Sebastian's 19-7-0.
- Large School final: No. 2 Cushing 7, No. 4 Brunswick 0. Top seeds: Tabor 19-7-0, Cushing
  17-11-2, Phillips Andover 15-10-4, Brunswick 17-9-0.
- Small School final: No. 2 Winchendon 5, No. 1 Holderness 2. Top seeds: Holderness 18-6-3,
  Winchendon 19-7-5, Canterbury 18-9-2, Rivers 13-8-3.

**2026 girls Elite 8 (Chuck Vernon), verified:** final Loomis Chaffee 5, Deerfield 1. Loomis beat
Nobles 5-4 (OT) in the semi; Nobles was No. 1 at 27-1-0. Tabor (No. 7) beat No. 2 Phillips Andover
2-1 (OT) in the QF. Championship at Dexter Southfield.

**The ~70-school NE prep universe** is enumerable from the USHR team-page list (see §4). It spans
MA, NH, CT, RI, ME, VT, NY, NJ, PA, OH, plus Canadian affiliate schools marked with an asterisk.

## 3. Angle and shape

Lead with the parent problem, per house voice: *"prep hockey" is not one league, and the school
your kid is looking at may or may not play against 19-year-olds.*

Proposed spine:
1. What NEPSAC actually is (governing body, not a league you play in).
2. **The conference map.** Which league is which, geographically. This is the map component,
   and it is the reason the post earns a URL: nothing anywhere plots NEPSAC's conferences.
   Same Leaflet-from-unpkg pattern as the ISL/E9/EHF maps, one `L.layerGroup` per conference,
   `L.control.layers` toggle, hand-rolled bottom-right legend, and the standard
   "approximate campus locations" caveat.
3. **The PG question**, the highest-value section. ISL bans them; most other leagues do not.
   Needs per-league sourcing, this is the main research gap (§5).
4. How the three brackets are seeded, and why a conference's big/small split does not match.
5. The 2026 postseason in one table, all three boys brackets plus girls.
6. Where to follow it live (NEPSAC, USHR, NEHJ).
7. Sources, numbered, scientific-paper style like the ISL and Minnesota posts.

## 4. Sources, and what actually works

Learned the hard way during the ISL pass:

| Source | Status |
|---|---|
| `nepsac.org` | works, plain fetch. Leagues list + tournament/postseason pages |
| `hockeyjournal.com` (NEHJ) | **WebFetch gets 403.** Works with `curl -A "Mozilla/5.0 (Macintosh...) Chrome/128.0"`. Article body sits in `<article>`; first ~2 paragraphs plus the full results block render for free, the per-team analysis is paywalled |
| `ushr.com` | team/league lists render free; **standings and rankings are subscriber-only** |
| `islsports.org` | works. Its archived standings links now point at a migrated Arbiter platform and are dead, do not link them |
| `rschoolstats.com` | dead, migrated to Arbiter. Do not cite |
| `thenoblemanonline.com` | works, plain fetch. Nobles' student paper. Good primary-ish detail on Flood-Marr/Harrington that the trade press does not carry |
| `hnibnews.com` | **do not cite.** The domain now serves gambling spam. It has good historical NEPSAC coverage in search results but the live pages are gone |
| Wikipedia per-league pages | fine for membership tables and founding history, cite as such |

## 5. Still to research

- **Per-league PG rules.** The ISL ban is documented in its Essential Understandings. Need the
  equivalent for Founders, Lakes Region, Housatonic, Holt. This is the post's centerpiece and it
  is the one thing not yet sourced.
- **Full conference rosters** for the map: which schools sit in which league, current season.
- **Whether NEPSAC publishes its classification thresholds** or just the resulting brackets.
- Multi-year champion list, if it can be pulled from nepsac.org tournament archives, to say
  something about which leagues actually win.

## 6. Housekeeping when it ships

- Add to `_includes/ma-hockey-guide-series.html` with a new `current` key, and pass it from the
  post. The ISL entry uses `current="isl"`.
- Own hero image, house style, 1600x840. The ISL hero
  (`img/blog/isl-prep-hockey-guide.jpg`) uses an outlined headline plus two labeled division
  columns; vary the composition so the two do not read as duplicates. A conference-count or
  bracket-tree motif would work.
- Run the UTM audit and verify the map at 1280 **and** 375.
