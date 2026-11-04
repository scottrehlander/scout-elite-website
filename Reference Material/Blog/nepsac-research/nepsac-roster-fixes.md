# NEPSAC hockey roster: corrections to nepsac-schools.csv (FAA and `no` audit)

Compiled 2026-11-04 (2026-27 season). Input: `nepsac-schools.csv` + `nepsac-schools-notes.md` in this folder (not
edited). Downloads are in `faa/` beside this file. All fetches used User-Agent `scout-elite-research`. Not used:
myhockeyrankings.com (blocks automated fetches), hnibnews.com, rschoolstats.com.

NEPSAC membership is checked against https://nepsac.org/about/nepsac-member-schools/ (the copy the earlier pass
saved, `rosters/nepsac_members.html`). Every school named below is on its District IV list ("District IV – 65
Schools The Albany Academy ... Greenwich Academy Greenwich Country Day School Hamden Hall Country Day School Harvey
School ... King School Kingswood-Oxford School ... Rye Country Day School Sacred Heart Greenwich ... St. Luke's
School ...") as a **full** member; none is on the "ASSOCIATE MEMBERSHIPS" list.

## Headline

- **The FAA (Fairchester Athletic Association) runs a boys' and a girls' varsity hockey league.** In 2025-26 the
  boys' league had six teams (Greenwich Country Day, Kingswood Oxford, Rye Country Day, St. Luke's, Hamden Hall,
  King) and the girls' league five (Greenwich Academy, Greenwich Country Day, Rye Country Day, Sacred Heart
  Greenwich, King). Harvey School (Katonah NY) plays the FAA boys' teams and is listed as a "League" opponent on
  Hamden Hall's 2026-27 schedule.
- USHR has no FAA grouping. It files KO and St. Luke's under "NEPSIHA Independent", leaves GCDS and Rye boys out
  entirely, and puts the FAA girls' teams under NEPSGIHA Independent / Other Independent.
- **Kingswood Oxford plays FAA, not Holt.** Its 2025-26 schedule has no Holt Conference opponents at all (details
  below). The MHR "Holt" listing a reader saw has no support on KO's own site.
- Three NEPSAC full members with varsity boys' hockey are missing from the CSV: King School, Hamden Hall, Harvey.
  King also has an FAA girls' varsity team.

## 1. FAA hockey membership

The FAA's own site (Wix, https://www.faasports.org/) is thin: the hockey pages' schedules and standings are
empty or load in the browser, and old URLs (`/sports/mice/...`) now 404. What it does show:
- https://www.faasports.org/about : "FAA at a Glance 12 Member Schools 15 Championshp Sports". Its school logo strip
  (image names in the page source) is the 12: Brunswick, Greenwich Country Day, Greens Farms Academy, Greenwich
  Academy, Hamden Hall, School of the Holy Child, Hopkins, King, Masters School, Rye Country Day, Sacred Heart
  Greenwich, St. Luke's. **Kingswood Oxford and Harvey are not among the 12**: they take part in FAA hockey
  without being FAA member schools. (I inferred that from the logo list; the site has no text member list.)
- https://www.faasports.org/sports/hockey-boys : bracket image `faa/boys_bracket.png` ("FAA BOYS ICE HOCKEY
  CHAMPIONSHIP"): "#1 GCDS 6 / #4 St. Luke's 3" (2/25), "#2 Kingswood Oxford 5 / #3 Rye Country Day 4" (2/25),
  final 2/28 at Wings "#1 GCDS 4 / #2 Kingswood Oxford 3", trophy "2026 FAA Champion".
- https://www.faasports.org/sports/hockey-girls : "Dec 8, 2025 Ice Hockey - Girls Rye Country Day School 0
  Greenwich Country Day 3".

### Boys' FAA varsity hockey (2025-26; 2026-27 per Hamden Hall's schedule)

| School | NEPSAC | In CSV? | Source + quote |
|---|---|---|---|
| Greenwich Country Day (Greenwich CT) | full | yes, boys=no | https://www.gcds.net/news/2026-03-05/gcds-boys-hockey-captures-first-faa-championship-in-thrilling-overtime-victory : "capturing both the FAA League Championship and the FAA Tournament Championship in the same season — with a dramatic 4-3 overtime victory against Kingswood Oxford School at Wings Arena in Stamford" |
| Kingswood Oxford (West Hartford CT) | full | yes, boys=NEPSIHA Independent | https://www.kingswoodoxford.org/athletics/sport/ice-hockey/ : "The Kingswood Oxford ice hockey program competes in the FAA and NEPSAC leagues" |
| Rye Country Day (Rye NY) | full | yes, boys=no | https://www.ryecountryday.org/athletics/news/athletics-post/~board/news/post/boys-varsity-ice-hockey-team-named-faa-tournament-champions-for-second-consecutive-year : "the Boys' Varsity Ice Hockey team captured the 2025 FAA Teddy Balkind Memorial Championship, defeating King, 6-3" (2025); also the 2026 FAA bracket above ("#3 Rye Country Day") |
| St. Luke's (New Canaan CT) | full | yes, boys=NEPSIHA Independent | 2026 FAA bracket ("#4 St. Luke's"); MaxPreps (backup) https://www.maxpreps.com/ct/new-canaan/st-lukes-storm/ice-hockey/25-26/schedule/ : "League 4-4-2", with league-starred games "vs Rye Country Day*", "vs King*", "@ Greenwich Country Day*", "@ Kingswood Oxford*", "vs Hamden Hall Country Day*" |
| Hamden Hall (Hamden CT) | full | **no (add)** | https://www.hamdenhall.org/team-detail?Team=96022 : "Ice Hockey-Boys, Varsity 2026 - 2027 ... Home League vs. Greenwich Country Day School ... Home League vs. King School ... Home League vs. Kingswood-Oxford School ... Home League vs. St. Luke's School ... Away League vs. Rye Country Day School ... Tournament FAA Semifinals ... FAA Championship"; 2024 news https://www.hamdenhall.org/news-detail?pk=1321226 : "clinched a spot in the Fairchester Athletic Association League playoffs" |
| King School (Stamford CT) | full | **no (add)** | https://www.kingschoolct.org/community/news/post/~board/all-school-news/post/king-athletics-celebrates-winter-202526-all-league-and-all-nepsac-honors : "FAA Boys Ice Hockey FAA Honorable Mention - Jake Oertel '28" (winter 2025-26); MaxPreps (backup) https://www.maxpreps.com/ct/stamford/king-vikings/ice-hockey/25-26/schedule/ : "League 1-9" |
| Harvey School (Katonah NY) | full | **no (add)** | Plays the FAA schedule; league status is the one soft spot. https://news.halstonmedia.com/katonah-lewisboro-times/katonah-lewisboro-times/stories/harvey-hockey-preview,58461 (Dec 4, 2025; "Article courtesy of The Harvey School"): "as we compete in a strong FAA league". Hamden Hall's 2026-27 schedule above: "Home League vs. Harvey School". But in 2025-26 Harvey's games were not counted in FAA standings: MaxPreps https://www.maxpreps.com/ny/katonah/harvey-cavaliers/ice-hockey/25-26/schedule/ shows "League 0-0" and none of its games starred, and Harvey was not in the 2026 FAA bracket. |

Kingswood Oxford, Rye and GCDS boys rosters are coed teams in at least KO's case: KO's 2025-26 roster lists
"Alexandra Lenarchyk" and "Elizabeth Raccio" (https://www.kingswoodoxford.org/athletics/team/ice-hockey-varsity/2025-2026/),
so KO's girls play on the FAA boys' team; KO has no separate girls' team (girls=no stands).

Not FAA hockey despite being FAA members: Brunswick (its varsity plays the NEPSAC Large schedule; no Brunswick
games are league-starred on the King or St. Luke's MaxPreps schedules), and Greens Farms, Hopkins, Masters, Holy
Child, which showed no varsity hockey on the pages I checked.

### Girls' FAA varsity hockey (2025-26)

| School | NEPSAC | In CSV? | Source + quote |
|---|---|---|---|
| Greenwich Academy (Greenwich CT) | full | yes, girls=Other Independent | Own site https://www.greenwichacademy.org/athletics/championships : "ICE HOCKEY Division II New England Champions 2005-2006, 2006-2007 FAA Champions 2025-2026". MaxPreps (backup) https://www.maxpreps.com/ct/greenwich/greenwich-academy-gators/ice-hockey/girls/ : "the Greenwich Academy Varsity Girls Ice Hockey team won their FAA Final @ Wings Arena, Stamford game against Rye Country Day High School by a score of 3-1" (Feb 27, 2026); schedule page "League 6-0-1" |
| Greenwich Country Day | full | yes, girls=NEPSGIHA Independent | https://www.gcds.net/news/2025-03-05/gcds-girls-hockey-captures-first-faa-championship-in-thrilling-overtime-victory : "Girls Hockey team secured their first-ever Fairfield [sic] Athletic Association (FAA) Championship with a dramatic 3-2 overtime victory against crosstown rival Greenwich Academy" (2025); local press 2026 https://greenwichsportsbeat.com/2026/01/18/greenwich-country-day-school-ice-hockey-team-tops-sacred-heart-greenwich-in-faa-matchup-at-wings-arena/ : "The win raised Greenwich Country Day's FAA record to 2-0" |
| Rye Country Day | full | yes, girls=NEPSGIHA Independent | https://www.faasports.org/sports/hockey-girls : "Ice Hockey - Girls Rye Country Day School 0 Greenwich Country Day 3"; and the 2026 FAA final vs Greenwich Academy (above) |
| Sacred Heart Greenwich | full | yes, girls=NEPSGIHA Independent | https://www.shgreenwich.org/athletics : "Sacred Heart Greenwich Athletics competes as a member of the Fairchester Athletic Association" (Ice Hockey listed under Winter); student paper https://shgreenwichkingstreetchronicle.org/147532/sports-and-health/sacred-hearts-ice-hockey-team-shines-in-first-varsity-season/ : "the team qualified for the Fairchester Athletic Association (FAA) and the New England Preparatory School Athletic Council (NEPSAC) tournaments"; MaxPreps GA page: "FAA Semifinal vs. Sacred Heart Greenwich" |
| King School | full | **no (add)** | King honors page (above): "FAA Girls Hockey FAA 1st Team - Ella Maldonado '26 FAA 2nd Team - Greta Malloy '28"; https://www.kingschoolct.org/upper-school-athletics lists "Ice Hockey - Varsity Girls"; GA schedule (MaxPreps) has "vs King*" as a league game |

St. Luke's girls: began in 2024 as "the first-ever co-op girls ice hockey club team" with King
(https://www.kingschoolct.org/community/news/post/~board/all-school-news/post/king-co-op-girls-ice-hockey-earns-win-in-inaugural-match-and-winter-athletic-teams-look-to-the-post-season).
Whether St. Luke's now has its own varsity team is **unconfirmed** (see section 3).

The FAA girls' teams GA, GCDS, Rye and Sacred Heart are also on NEPSAC's 2026-27 girls' Large-school list
(classification PDF, see `nepsac-brackets.md`), so they play FAA *and* the NEPSAC tournament. None of the FAA
boys' teams is on the 2026-27 boys' classification list.

## 2. Kingswood Oxford

- League: "The Kingswood Oxford ice hockey program competes in the FAA and NEPSAC leagues, drawing student-athletes
  who embrace challenge on and off the ice. Playing out of South Windsor Arena..."
  (https://www.kingswoodoxford.org/athletics/sport/ice-hockey/). The 2026 FAA final loss to GCDS confirms FAA play.
- Girls: KO lists only "Ice Hockey – Varsity", with girls on its roster (above). No separate girls' team.
- 2025-26 schedule (https://www.kingswoodoxford.org/athletics/team/ice-hockey-varsity/2025-2026/, "Record: W L T
  10 4 1"; the 2026-2027 page has no games posted yet). 18 listed games, 2 cancelled:
  - FAA opponents (13 of 18): Rye Country Day x3 (incl. "Rye Country Day School Home Feb 26 2026 ... Win 5 - 4",
    the FAA semifinal), Greenwich Country Day x4 (incl. "Greenwich Country Day School Away Feb 28 2026 2:00 pm ...
    Loss 3 - 4", the FAA final; the Feb 23 game "CANCELLED", the Feb 14 game shows no result), Hamden Hall x2,
    St. Luke's x2, King x2 (Feb 21 shown "11 - 1").
  - Others: Harvey x2 (FAA schedule partner, see above), Wilbraham & Monson x2 (NEPSIHA Independent on USHR),
    Portledge (NY, not a NEPSAC member).
  - **Holt Conference opponents: none.** (Holt per the CSV: Berwick, Hebron, Kents Hill, North Yarmouth, Pingree,
    Portsmouth Abbey, Worcester.)
- So KO's correct league is FAA. USHR's "NEPSIHA Independent" label is USHR's catch-all for teams outside a NEPSAC
  hockey league; it isn't wrong about NEPSAC, but FAA is the league.

## 3. Audit of every `no`

### `boys = no` (7 rows)
| School | Result |
|---|---|
| Greenwich Country Day | **Has boys' varsity: FAA** (2026 FAA champion, above) |
| Rye Country Day | **Has boys' varsity: FAA** (2025 FAA champion, 2026 semifinalist, above) |
| Greenwich Academy, Newton Country Day, Sacred Heart Greenwich, Winsor, Dana Hall | Girls' schools: `no` is correct (N/A) |

### `girls = no` (23 rows)
Boys' schools, so `no` is correct (N/A): Avon Old Farms, Belmont Hill, Brunswick, Roxbury Latin, Salisbury, South
Kent, St. Sebastian's, Trinity-Pawling, St. Andrew's College, Upper Canada College.

Kingswood Oxford: `no` stands (girls play on the coed varsity, above).

Coed schools checked on their own sites:

Checked by a helper pass (downloads in `faa/girls-audit/`). **Five of the coed `no`s have a girls' team**, but
none plays in a New England prep league, which is why USHR's prep pages miss them:

| School | Girls' team? | League | Source + quote |
|---|---|---|---|
| Culver Academies | **yes**: Girls U19/Prep (plus U16) | independent (schedule shows "Conf 0-0-0"; plays a JWHL Showcase, JWHL membership not confirmed) | https://culverathletics.com/sports/womens-ice-hockey/schedule : "2026-27 Girls U19/Prep Ice Hockey Schedule ... JWHL Showcase Arlington, VA" |
| Nichols School | **yes**: "Hockey - Girls Prep" | USA Hockey Tier I (High School Girls 2A Nationals); no league named for 2026-27 | https://www.nicholsschool.org/page/team-detail?Team=417215 : "Hockey - Girls Prep 2026 - 2027 Head Coach: Stephanie Nadler"; https://www.nicholsschool.org/news-detail?pk=1617758 : "the 2026 Chipotle-USA Hockey High School Girls 2A National Championships" |
| Ridley College | **yes**: Prep Girls Hockey | OWHA U22 Division (Ontario) | https://www.ridleycollege.com/athletics/high-performance-athletics/girls-hockey : "The OWHA's U22 Division is comprised of the top junior programs across Ontario, with Ridley College being the league's only academic institution." |
| The Winchendon School | **yes**: girls 16U and 19U | USA Hockey full-season model, national schedule (left the New England prep model after 2022-23) | winchendon.org answered 403 "Access Denied" to our User-Agent, so skipped. Press: https://www.hockeyjournal.com/how-winchendon-girls-hockey-has-taken-advantage-of-full-season-model/ (June 3, 2026): "broke from the traditional New England prep model after the 2022-23 season, implementing the full-season USA Hockey model with 16U and 19U teams" |
| Moses Brown | **yes, as a co-op** | RIIL (RI state league), "Smithfield/Coventry/Moses Brown Co-op" | https://www.mosesbrown.org/athletics/winter-sports/hockey-girls : "Girls Hockey ... Varsity"; https://rihssports.com/STANDINGS/CURRENT/GIRLS/GIRL'S%20ICE%20HOCKEY.htm : "Smithfield/Coventry/Moses Brown Co-op 10 3 2" |
| Académie Saint-Louis | partial: a new girls' **U15** school team from 2026-27, no U18/prep team | RSEQ "M15 D1 Relève" | https://aslouis.qc.ca/2025/10/14/lacademie-saint-louis-accueillera-une-equipe-feminine-m15-d1-releve-des-2026-2027/ : "L'ASL fera partie des 6 écoles pionnières de cette nouvelle ligue qui amorcera ses activités dès la rentrée 2026-2027." Keep `no` (not varsity) |
| The Albany Academy | no | n/a | https://www.albanyacademy.org/athletics/league-affiliations : row "Winter Ice Hockey N/A Varsity 1 & 2 NEPSAC" (N/A in the Girls column) |
| CATS Academy Boston | no | n/a | https://www.catsacademyboston.com/ : "Boys' Varsity Hockey American Hockey Academy (boys)" |
| Wilbraham & Monson | no | n/a | https://www.wma.us/athletics/teams : team list has no ice hockey entry |
| Bishop's College School | no | n/a | https://www.bishopscollegeschool.com/athletics/sports/winter-crease : "Varsity U18 Hockey Prep U17 Hockey" (boys only) |
| Wyoming Seminary | no | n/a | https://www.wyomingseminary.org/athletics/upper-school-athletics/ice-hockey : one "Ice Hockey" program (the boys' prep team) |
| St. Luke's | unconfirmed, probably no standalone team | likely still a King-hosted co-op | https://www.stlukesct.org/athletics/upper-school-athletics : "Winter Basketball Ice Hockey Ski Team Squash" (no girls' team named); USHR girls lists "King School Girls Hockey ... Other Independent" (https://girls.ushr.com/other/team/schedule/2025/2048) |

Odd one: W&M's team list has **no ice hockey at all**, yet the CSV has W&M boys in NEPSIHA Independent (from USHR)
and KO played "Wilbraham & Monson Academy" twice in 2025-26, and W&M ("WMA") is on NEPSAC's 2026-27 boys'
Small list. So the boys' team exists; the list page is just incomplete. No change.

## 4. NEPSAC members with varsity hockey missing from the CSV

Checked against NEPSAC's 2026-27 boys' and girls' classification lists (`nepsac-brackets.md`): every school on
those lists is already in the CSV. The missing schools are the FAA ones, which aren't in NEPSAC's hockey
associations' tournament lists:

| Added | Boys | Girls | Evidence |
|---|---|---|---|
| King School | FAA | FAA | section 1 |
| Hamden Hall Country Day School | FAA | no (its team list has "Ice Hockey-Boys, Varsity" and "Ice Hockey-Coed, JV", no girls' team) | section 1 |
| Harvey School | FAA (schedule; counted in standings from 2026-27 per Hamden Hall) | not checked | section 1 |

Other NEPSAC members I checked and did **not** add (no varsity hockey found on the school's athletics page, or
nothing current):
- No hockey on the athletics landing page: Ethel Walker (https://www.ethelwalker.org/athletics-riding/athletics/),
  Miss Porter's (https://www.porters.org/athletics), Cheshire Academy (https://www.cheshireacademy.org/athletics),
  Suffield (https://www.suffieldacademy.org/athletics), Hopkins (https://www.hopkins.edu/athletics), Wheeler
  (https://www.wheelerschool.org/athletics), Hyde (https://www.hyde.edu/athletics), Lee Academy
  (https://www.leeacademy.org/athletics), Masters School (https://www.mastersny.org/athletics), Greens Farms
  (https://www.gfacademy.org/athletics), Western Reserve Academy, associate (https://www.wra.net/athletics; MaxPreps
  shows "Overall 0-0" for 2024-25 and 2025-26, so the program looks dormant). These are absence-of-evidence checks
  on landing pages, not proof.
- Not found by search: Marianapolis, Gould, Lexington Christian.
- Open, not settled: **Forman School** (Litchfield CT) has a Hudl "Mens Varsity IceHockey" page and a MaxPreps
  team, but MaxPreps 2025-26 shows "Overall 0-0" and its athletics page didn't mention hockey; **Wooster School**
  (Danbury CT) still has an "Ice Hockey - Varsity" team page
  (https://www.woosterschool.org/page.cfm?p=1470&opid=39) whose opponent list is "Canterbury School Forman School
  Harvey School Immaculate High School King School Kingswood-Oxford School Millbrook School South Kent School St.
  Luke's School", but I found no 2025-26 or 2026-27 games. **School of the Holy Child** (Rye NY): shc.org timed out.
- Not considered: junior boarding/day schools (Eaglebrook, Cardigan Mountain, Rectory, Indian Mountain, Rumsey Hall,
  Fay, Fessenden, etc.): middle-school programs, not prep varsity.

## Corrections table (CSV edits)

| school | column | old | new | source URL + quote |
|---|---|---|---|---|
| Greenwich Country Day | boys | no | FAA | https://www.gcds.net/news/2026-03-05/gcds-boys-hockey-captures-first-faa-championship-in-thrilling-overtime-victory : "capturing both the FAA League Championship and the FAA Tournament Championship in the same season" |
| Greenwich Country Day | girls | NEPSGIHA Independent | FAA | https://greenwichsportsbeat.com/2026/01/18/greenwich-country-day-school-ice-hockey-team-tops-sacred-heart-greenwich-in-faa-matchup-at-wings-arena/ : "The win raised Greenwich Country Day's FAA record to 2-0" |
| Greenwich Country Day | conference | NEPSGIHA Independent | FAA | (boys league, per the CSV's rule) |
| Rye Country Day | boys | no | FAA | https://www.ryecountryday.org/athletics/news/athletics-post/~board/news/post/boys-varsity-ice-hockey-team-named-faa-tournament-champions-for-second-consecutive-year : "the Boys' Varsity Ice Hockey team captured the 2025 FAA Teddy Balkind Memorial Championship" |
| Rye Country Day | girls | NEPSGIHA Independent | FAA | https://www.faasports.org/sports/hockey-girls : "Ice Hockey - Girls Rye Country Day School 0 Greenwich Country Day 3" |
| Rye Country Day | conference | NEPSGIHA Independent | FAA | (boys league) |
| Kingswood Oxford | boys | NEPSIHA Independent | FAA | https://www.kingswoodoxford.org/athletics/sport/ice-hockey/ : "The Kingswood Oxford ice hockey program competes in the FAA and NEPSAC leagues" |
| Kingswood Oxford | conference | NEPSIHA Independent | FAA | same |
| St. Luke's | boys | NEPSIHA Independent | FAA | https://www.faasports.org/sports/hockey-boys (bracket image): "#4 St. Luke's 3" in the "FAA BOYS ICE HOCKEY CHAMPIONSHIP" |
| St. Luke's | conference | NEPSIHA Independent | FAA | same |
| Greenwich Academy | girls | Other Independent | FAA | https://www.maxpreps.com/ct/greenwich/greenwich-academy-gators/ice-hockey/girls/ : "won their FAA Final @ Wings Arena, Stamford game against Rye Country Day High School by a score of 3-1" |
| Greenwich Academy | conference | Other Independent | FAA | same |
| Sacred Heart Greenwich | girls | NEPSGIHA Independent | FAA | https://www.shgreenwich.org/athletics : "Sacred Heart Greenwich Athletics competes as a member of the Fairchester Athletic Association" |
| Sacred Heart Greenwich | conference | NEPSGIHA Independent | FAA | same |
| Culver Academies | girls | no | Independent (Girls U19/Prep; USA Hockey) | https://culverathletics.com/sports/womens-ice-hockey/schedule : "2026-27 Girls U19/Prep Ice Hockey Schedule" |
| Nichols | girls | no | USA Hockey Tier I (Girls Prep; no prep league) | https://www.nicholsschool.org/page/team-detail?Team=417215 : "Hockey - Girls Prep 2026 - 2027" |
| Ridley College | girls | no | OWHA U22 | https://www.ridleycollege.com/athletics/high-performance-athletics/girls-hockey : "The OWHA's U22 Division is comprised of the top junior programs across Ontario, with Ridley College being the league's only academic institution." |
| Winchendon | girls | no | USA Hockey full-season (16U/19U, national schedule) | https://www.hockeyjournal.com/how-winchendon-girls-hockey-has-taken-advantage-of-full-season-model/ : "implementing the full-season USA Hockey model with 16U and 19U teams" (school site blocked us) |
| Moses Brown | girls | no | RIIL co-op (Smithfield/Coventry/Moses Brown) | https://rihssports.com/STANDINGS/CURRENT/GIRLS/GIRL'S%20ICE%20HOCKEY.htm : "Smithfield/Coventry/Moses Brown Co-op 10 3 2" |

Also worth adding to the notes: the CSV's league counts change (Boys: NEPSIHA Independent 21 -> 19, new FAA
group of 6 NEPSAC schools + Harvey; Girls: NEPSGIHA Independent and Other Independent shrink by 3 and 1, new FAA
group of 5).

## Added schools (CSV columns)

`boarding_day` / `student_body` cite the school's own wording where I found it; the rest is marked.

| school | conference | town | state | boarding_day | boys | girls | lat | lon | geocode_query | source_url | notes | student_body | nepsac_membership |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| King School | FAA | Stamford | CT | day | FAA | FAA | 41.1108172 | -73.5339031 | King School, Stamford, Connecticut | https://www.kingschoolct.org/community/news/post/~board/all-school-news/post/king-athletics-celebrates-winter-202526-all-league-and-all-nepsac-honors ; https://www.kingschoolct.org/upper-school-athletics | OSM feature is named "King and Low-Heywood Thomas School" (the old name), amenity=school on the Newfield Ave campus; site says "An independent day school educating students PreK-Grade 12". Girls began as a 2024 club co-op with St. Luke's | coed | full |
| Hamden Hall Country Day School | FAA | Hamden | CT | day (name; not separately verified) | FAA | no | 41.3418006 | -72.9138571 | Hamden Hall Country Day School, Hamden, Connecticut | https://www.hamdenhall.org/team-detail?Team=96022 | Matched "1108, Whitney Avenue" (amenity=school). Home rinks: Northford Ice Pavilion, Quinnipiac | coed (not verified) | full |
| Harvey School | FAA | Katonah | NY | day + boarding (site nav has "Boarding"; type not verified) | FAA | no (not checked) | 41.2577617 | -73.6644380 | Harvey School, Katonah, New York | https://news.halstonmedia.com/katonah-lewisboro-times/katonah-lewisboro-times/stories/harvey-hockey-preview,58461 ; https://www.hamdenhall.org/team-detail?Team=96022 | Matched "260, Jay Street, Katonah" (amenity=school). In 2025-26 its games weren't counted in FAA standings; Hamden Hall lists it as a League opponent for 2026-27. Coach Colton Orr (ex-NHL) | coed (not verified) | full |

Raw geocode responses: `faa/geocode/`.

## FAA member list

FAA member schools (12, per https://www.faasports.org/about "12 Member Schools" and its logo strip), all NEPSAC
full members, with their 2025-26 varsity hockey:

| FAA member | Boys' hockey | Girls' hockey |
|---|---|---|
| Brunswick School | yes, but not in FAA hockey (NEPSAC Large schedule) | boys' school |
| Greens Farms Academy | none found | none found |
| Greenwich Academy | girls' school | **FAA** (2026 champion) |
| Greenwich Country Day School | **FAA** (2026 champion) | **FAA** (2025 champion) |
| Hamden Hall Country Day School | **FAA** | none |
| Hopkins School | none found | none found |
| King School | **FAA** | **FAA** |
| The Masters School | none found | none found |
| Rye Country Day School | **FAA** (2024, 2025 champion) | **FAA** (2026 finalist) |
| Sacred Heart Greenwich | girls' school | **FAA** |
| School of the Holy Child | girls' school | not checked (site timed out) |
| St. Luke's School | **FAA** | unconfirmed (began as a King co-op club) |

FAA hockey affiliates (not among the 12 members): Kingswood Oxford (boys, FAA, full NEPSAC member), Harvey School
(boys, FAA schedule, full NEPSAC member).

Source for championship years: King lists "Ice Hockey 2025 FAA Regular Season Champions 2024 FAA Regular Season
Champions 2023 FAA Tournament Champions" (https://www.kingschoolct.org/athletics/championships, boys); Rye's 2025
post says "the second consecutive season that the team is crowned FAA Tournament Champions".
