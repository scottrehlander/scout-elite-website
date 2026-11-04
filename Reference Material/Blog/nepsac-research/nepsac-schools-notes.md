# NEPSAC ice hockey schools, 2026-27: research notes

Compiled 2026-11-04. Data file: `nepsac-schools.csv` (82 rows) in the same folder.

## What the CSV contains

- Every school that has a 2026-27 boys or girls prep varsity team on USHR's New England Prep pages and is a NEPSAC
  member. `nepsac_membership` says whether it is a **full** member or an **associate** member, checked against
  https://nepsac.org/about/nepsac-member-schools/ (it lists the associate members separately).
- `conference` is the boys league. For schools without a boys team it is the girls league.
- `boys` / `girls` give the league that team plays in, or `no` when the school has no team on the USHR list.
- Two columns go beyond the spec: `student_body` (coed/boys/girls) and `nepsac_membership`.
- Leagues come from the USHR 2026-27 league standings pages. Each one is cited in `source_url`, along with the
  Wikipedia ISL, Lakes Region and Founders pages and nepsac.org where they apply. USHR standings pages show team
  lists for free; only the records are paywalled.
- Lat/lon all come from OpenStreetMap Nominatim geocodes, and `geocode_query` records the query used. Mostly that
  was the school's name plus its town and state, which matched an `amenity=school` campus feature. Three needed a
  street address instead: Millbrook (the name search found the public high school), Hoosac (no campus feature in
  OSM; address from hoosac.org) and BB&N (the name search found the Lower School, so I used the Upper School). Raw
  responses are in `rosters/geocode/`.
- Not in the CSV: USHR teams from non-member schools. Boys: Northwood (NY), Bishop O'Connell (VA; the only team on
  the MAPHL page), Delbarton, Gilmour, La Salle College HS, Princeton Day, The Hun School, Rice Memorial, St. John's
  Prep. Girls: Northwood, Portledge (NY). Also left out: the separate Mount St. Charles 18U team (Other Independent).

## Counts

**Boys varsity: 75 teams** (62 full members plus 13 associates). 60 are in New England.

| Boys league (USHR) | Teams |
|---|---|
| ISL (16 total) | Eberhart 8, Keller 8 |
| Founders League | 8 (all 8 also play in the Housatonic league) |
| Housatonic | 10 total: the 8 Founders schools plus Deerfield and Salisbury |
| Lakes Region | 8 |
| Holt Conference | 7 (incl. North Yarmouth, an associate) |
| NEPSIHA Independent | 21 (incl. Moses Brown, an associate) |
| Two Nations Prep | 8 (Albany Academy plus 7 associates: BCS, Hill, Lawrenceville, Nichols, Ridley, Stanstead, UCC) |
| Other Independent | 4 (South Kent, Académie Saint-Louis, Culver, St. Andrew's College) |
| Mid Atlantic | 1 (Wyoming Seminary) |
| MAPHL | 0 NEPSAC schools |

**Girls varsity: 59 teams** (55 full plus 4 associates). 53 are in New England.
ISL 12, Founders 6 (Housatonic 7 with Deerfield), Lakes Region 8, Holt 2, Vaillancourt Conference 6,
NEPSGIHA Independent 17, Other Independent 7. Seven schools have girls hockey but no boys team: Greenwich Academy,
Greenwich Country Day, Sacred Heart Greenwich, Newton Country Day, Winsor, Dana Hall and Rye Country Day (NY).

**Schools by state (82 rows):** MA 31, CT 18, NH 8, ME 4, RI 4, VT 1 (66 in New England), NY 6, PA 2, NJ 1, IN 1,
QC 3, ON 3.
Boys teams by state: MA 28, CT 15, NH 8, ME 4, RI 4, VT 1, NY 5, PA 2, NJ 1, IN 1, QC 3, ON 3.
Girls teams by state: MA 25, CT 12, NH 8, ME 4, RI 3, VT 1, NY 3, PA 1, NJ 1, QC 1.

**Outside New England.** Full members: Albany Academy, Hoosac, Millbrook, Trinity-Pawling, Rye Country Day (all NY).
Associates: Nichols (NY), Hill and Wyoming Seminary (PA), Lawrenceville (NJ), Culver (IN), and six Canadian schools.

## Disagreements and things to know

- **Kingswood Oxford:** nepsac.org's leagues page puts KO in the Founders League, but on USHR its boys hockey team
  plays as NEPSIHA Independent. The Founders hockey page lists 8 schools without KO, so the Founders League's
  general membership and its hockey membership differ.
- **Founders vs Housatonic:** the two overlap. Housatonic is the hockey grouping, Founders plus Deerfield and
  Salisbury, neither of which belongs to the Founders League.
- **Athletic league vs hockey league.** nepsac.org's leagues page is about general athletic leagues, so hockey can
  differ. Examples: Berwick, Pingree and Portsmouth Abbey are EIL schools but play Holt hockey; Hebron and Kents
  Hill are MAISAD schools that also play Holt; Mount St. Charles is SENEISAA but plays NEPSIHA Independent; South
  Kent is in the Housatonic Valley league but plays as Other Independent. Girls hockey has its own groupings
  (Vaillancourt Conference, per both nepsac.org and USHR).
- **Rivers girls** play in the ISL (girlsprephockey.us team page, full ISL schedule, All-League honors); USHR girls wrongly lists them under NEPSGIHA Independent. Corrected 2026-11-04.
- **ISL divisions:** Wikipedia's ISL page (as of 2023-24) has the same Keller/Eberhart split as USHR 2026-27, and
  says St. Paul's moved from the ISL to the Lakes Region. USHR 2026-27 is the newer source.
- **Moses Brown and North Yarmouth** are NEPSAC associate members, not full members. USHR stars them as affiliates
  in its team menu but still puts them on its New England address list.
- **Addresses:** USHR gives Thayer's rink address, but the coordinates are for the Braintree campus. USHR says
  "Plymouth NH" for Holderness, but the campus is in the town of Holderness.

## Gaps and caveats

- **`boarding_day` and `student_body` are from general knowledge, not from a cited source.** The ISL schools can be
  checked against the Day/Boarding column on Wikipedia's ISL page. The rest should be spot-checked on school
  websites before publishing. Least certain: Académie Saint-Louis (marked day, unverified), and the "5-day boarding
  option" at Nobles. Belmont Hill also offers 5-day boarding but is marked plain day.
- `boys = no` means there was no team on the USHR list. Kingswood Oxford, Wilbraham & Monson, Winchendon, St.
  Luke's, Albany Academy and CATS have no girls team listed there, which may just mean USHR doesn't cover them.
- No source for the "Holt Conference" name beyond USHR; Wikipedia has no Holt or Housatonic page.
- **Sources not used:** hockeyjournal.com, which blocks plain fetches; per the coordinator's correction I did not
  get around the block. Also not used: hnibnews.com and rschoolstats.com.
- **User-Agent:** the first two page fetches (the nepsac.org and ushr.com home pages) went out with a browser
  User-Agent before the correction arrived. I deleted those copies and fetched every page again as
  "scout-elite-research"; all the data comes from the honest fetches.
