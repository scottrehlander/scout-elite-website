---
layout: post
display_title: "ISL Hockey: All 16 Independent School League Schools, Mapped"
title: "Massachusetts Prep School Hockey: All 16 ISL Schools, Mapped"
description: "Prep school hockey in Massachusetts: all 16 Independent School League schools mapped, what Keller and Eberhart mean, and how ISL fits into NEPSAC."
date: 2026-09-09
last_modified_at: 2026-09-10
categories: [insights]
tags: [ISL hockey, Independent School League, prep school hockey, NEPSAC hockey, New England prep hockey, Massachusetts prep schools, Keller Division, Eberhart Division, high school hockey, youth hockey in New England, boys hockey, girls hockey, youth hockey parent guide]
author: "Coach Scott"
excerpt: "Sixteen schools, two divisions, and the league most Massachusetts club families end up asking about around 14U. Every ISL hockey school mapped, plus how the league actually connects to the E9 and EHF."
image:
  path: /img/blog/isl-prep-hockey-guide.jpg
  alt: "ISL Prep Hockey guide: the sixteen Independent School League schools split into Keller and Eberhart division columns over rink line art"
permalink: /blog/isl-prep-school-hockey-guide/
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

Somewhere in the 14U years, the conversation in the stands changes. It stops being about which division your club landed in and starts being about ninth grade. Public high school, stay in club, or apply to prep. And the moment someone says "prep," the next three names out of their mouth are almost always ISL schools.

This is the page for that conversation. Sixteen schools, where they are, which division they play in, and what the league is actually for.

If you got here from the [E9](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/) or [EHF](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/) guides, the short version of the connection is at the bottom, and it is more concrete than most people expect.

> **What this is.** An organization guide to the 16 ISL member schools and their hockey programs, current as of 2026-09-09. Records and postseason results are from the completed 2025-26 season. Division alignment and enrollment figures come from the league and the sources listed at the end.

## The ISL in 60 Seconds

The **Independent School League** is an athletic conference of 16 private college-preparatory schools, almost all of them in eastern Massachusetts, plus one in Rhode Island. It was founded in **1948** as the Private School League and took its current name in **1974**.<sup><a href="#sources">†</a></sup>

Three facts matter more than anything else on this page, and most parents learn them late.

**1. The ISL is a school league, not a hockey league.** Member schools compete against each other in roughly 25 sports. Hockey is one of them. That sounds obvious until you realize what follows from it: your son or daughter is applying to a school, being admitted by an admissions office, and playing hockey as a student.

**2. No postgraduates.** ISL schools do not allow PG students to compete, and many member schools do not run a postgraduate year at all.<sup><a href="#sources">†</a></sup> This is the single biggest structural difference between the ISL and the rest of New England prep hockey, and it changes the age of the team your kid would be playing against. Elsewhere in NEPSAC, a roster can carry postgraduates who are a year older than the oldest senior on the ice.

**3. Financial aid is need-based only.** ISL rules commit member schools to awarding aid strictly on demonstrated financial need, with no athletic or academic scholarships.<sup><a href="#sources">†</a></sup> If someone tells you a school is offering money because of hockey, that is not how this league works.

All 16 schools field boys varsity hockey. Thirteen field girls varsity hockey (the three all-boys schools, Belmont Hill, Roxbury Latin, and St. Sebastian's, obviously do not).<sup><a href="#sources">†</a></sup>

## The Map

Sixteen campuses. Use the toggle to separate the two boys hockey divisions. Click a marker for the town, division, and what kind of school it is.

<div id="isl-map" style="height: 560px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<script>
(function() {
	var map = L.map('isl-map').setView([42.30, -71.15], 8);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 13
	}).addTo(map);

	function marker(lat, lng, color, name, town, note) {
		return L.circleMarker([lat, lng], {
			radius: 8,
			fillColor: color,
			color: '#ffffff',
			weight: 2,
			opacity: 1,
			fillOpacity: 0.9
		}).bindPopup(
			'<strong>' + name + '</strong><br>' + town +
			'<br><span style="font-size:0.92em">' + note + '</span>'
		);
	}

	var KEL = '#a51c30';
	var EBE = '#0b5cab';

	var keller = L.layerGroup([
		marker(42.4065, -71.1801, KEL, 'Belmont Hill School', 'Belmont, MA', 'Keller Division. Boys only, day school, 471 students. Elite 8 team in 2026.'),
		marker(42.7502, -70.8981, KEL, "The Governor's Academy", 'Byfield, MA', 'Keller Division. Boarding, 405 students. Founded 1763, the oldest boarding school in New England.'),
		marker(42.6042, -71.5667, KEL, 'Lawrence Academy', 'Groton, MA', 'Keller Division. Boarding, 424 students. 2018 NEPSAC champions.'),
		marker(42.2560, -71.0705, KEL, 'Milton Academy', 'Milton, MA', 'Keller Division. Boarding, 471 students. Co-hosts the Flood-Marr and Harrington tournaments.'),
		marker(42.2595, -71.1839, KEL, 'Noble and Greenough School', 'Dedham, MA', 'Keller Division. Day-primary, 518 students. Girls team went 27-1-0 in 2025-26.'),
		marker(42.2694, -71.2067, KEL, "St. Sebastian's School", 'Needham, MA', 'Keller Division. Boys only, day school, 380 students. No. 4 seed in the 2026 Elite 8.'),
		marker(41.7063, -70.7692, KEL, 'Tabor Academy', 'Marion, MA', 'Keller Division. Boarding, 507 students. Top seed in the 2026 Large School bracket.'),
		marker(42.2076, -71.0066, KEL, 'Thayer Academy', 'Braintree, MA', 'Keller Division. Day school, 496 students. Two Hobey Baker winners among its alumni.')
	]);

	var eberhart = L.layerGroup([
		marker(42.3727, -71.1350, EBE, 'Buckingham Browne &amp; Nichols', 'Cambridge, MA', 'Eberhart Division. Day school, 525 students, the largest in the league.'),
		marker(42.7075, -71.0883, EBE, 'Brooks School', 'North Andover, MA', 'Eberhart Division. Boarding, 353 students. Won the NEPSAC Large School title in 2015.'),
		marker(42.5947, -71.5993, EBE, 'Groton School', 'Groton, MA', 'Eberhart Division. Boarding, 351 students. Joined the ISL in 1972.'),
		marker(42.4967, -71.3686, EBE, 'Middlesex School', 'Concord, MA', 'Eberhart Division. Boarding, 402 students.'),
		marker(42.3244, -71.3264, EBE, 'The Rivers School', 'Weston, MA', 'Eberhart Division. Day school, 382 students. Sent three players to the USA Hockey NTDP in 2025.'),
		marker(42.2761, -71.1581, EBE, 'The Roxbury Latin School', 'West Roxbury, MA', 'Eberhart Division. Boys only, day school, 219 students. Founded 1645, the oldest school in continuous existence in North America.'),
		marker(41.4883, -71.2713, EBE, "St. George's School", 'Middletown, RI', 'Eberhart Division. Boarding, 380 students. The only ISL school outside Massachusetts.'),
		marker(42.3095, -71.5298, EBE, "St. Mark's School", 'Southborough, MA', "Eberhart Division. Boarding, 380 students. 24-3-0 and the 2026 Elite 8 runner-up.")
	]);

	keller.addTo(map);
	eberhart.addTo(map);

	L.control.layers(null, {
		'<span style="color:#a51c30;font-weight:600">Keller Division</span>': keller,
		'<span style="color:#0b5cab;font-weight:600">Eberhart Division</span>': eberhart
	}, { collapsed: false }).addTo(map);

	var legend = L.control({position: 'bottomright'});
	legend.onAdd = function() {
		var div = L.DomUtil.create('div', '');
		div.style.cssText = 'background:white;padding:10px 14px;border-radius:6px;font-size:0.82em;line-height:1.7;box-shadow:0 1px 5px rgba(0,0,0,0.2)';
		div.innerHTML =
			'<strong style="display:block;margin-bottom:4px;color:#222">ISL Boys Hockey</strong>' +
			'<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#a51c30;margin-right:6px;vertical-align:middle"></span><span style="color:#222">Keller Division</span><br>' +
			'<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#0b5cab;margin-right:6px;vertical-align:middle"></span><span style="color:#222">Eberhart Division</span>';
		return div;
	};
	legend.addTo(map);
})();
</script>

> **Important note:** Markers are campus locations. A few schools skate at rinks a short drive from campus, and Groton School and Lawrence Academy sit close enough together in Groton that their markers nearly overlap.

{% include map-cta.html %}

## Keller vs Eberhart: What the Two Divisions Mean

The ISL splits boys hockey (and football) into two divisions. **Keller** is the larger-school group, **Eberhart** the smaller one, and the split runs roughly on total boys enrollment.<sup><a href="#sources">†</a></sup>

Here is the part that trips everybody up: **the division names are about school size, not strength.** In 2026, an Eberhart team was the No. 2 seed in New England's top bracket and played for the championship, while two Keller teams went out in the quarterfinals of that same bracket and another Keller team was seeded into the second-tier bracket. Read the division as a scheduling group, not a ranking.

### Keller Division

| School | Town | Type | HS Enrollment | Head Coach (2025-26) |
|---|---|---|---|---|
| [**Belmont Hill School**](https://www.belmonthill.org/){:target="_blank" rel="noopener"} | Belmont, MA | Day, boys only | 471 | Brian Phinney |
| [**The Governor's Academy**](https://www.thegovernorsacademy.org/){:target="_blank" rel="noopener"} | Byfield, MA | Boarding, coed | 405 | Brian McGuirk |
| [**Lawrence Academy**](https://www.lacademy.edu/){:target="_blank" rel="noopener"} | Groton, MA | Boarding, coed | 424 | Robbie Barker |
| [**Milton Academy**](https://www.milton.edu/){:target="_blank" rel="noopener"} | Milton, MA | Boarding, coed | 471 | Jim Gaudet |
| [**Noble and Greenough School**](https://www.nobles.edu/){:target="_blank" rel="noopener"} | Dedham, MA | Day-primary, coed | 518 | Dan McGoff |
| [**St. Sebastian's School**](https://www.stsebs.org/){:target="_blank" rel="noopener"} | Needham, MA | Day, boys only | 380 | Sean McCann |
| [**Tabor Academy**](https://www.taboracademy.org/){:target="_blank" rel="noopener"} | Marion, MA | Boarding, coed | 507 | Gerald Dineen |
| [**Thayer Academy**](https://www.thayer.org/){:target="_blank" rel="noopener"} | Braintree, MA | Day, coed | 496 | David Hymovitz |

### Eberhart Division

| School | Town | Type | HS Enrollment | Head Coach (2025-26) |
|---|---|---|---|---|
| [**Buckingham Browne & Nichols**](https://www.bbns.org/){:target="_blank" rel="noopener"} | Cambridge, MA | Day, coed | 525 | Cason Hohmann |
| [**Brooks School**](https://www.brooksschool.org/){:target="_blank" rel="noopener"} | North Andover, MA | Boarding, coed | 353 | Dave Ries |
| [**Groton School**](https://www.groton.org/){:target="_blank" rel="noopener"} | Groton, MA | Boarding, coed | 351 | Bill Riley |
| [**Middlesex School**](https://www.mxschool.edu/){:target="_blank" rel="noopener"} | Concord, MA | Boarding, coed | 402 | Eddie Pavlini |
| [**The Rivers School**](https://www.rivers.org/){:target="_blank" rel="noopener"} | Weston, MA | Day, coed | 382 | Freddy Meyer |
| [**The Roxbury Latin School**](https://www.roxburylatin.org/){:target="_blank" rel="noopener"} | West Roxbury, MA | Day, boys only | 219 | David Cataruzolo |
| [**St. George's School**](https://www.stgeorges.edu/){:target="_blank" rel="noopener"} | Middletown, RI | Boarding, coed | 380 | Allie Skelley |
| [**St. Mark's School**](https://www.stmarksschool.org/){:target="_blank" rel="noopener"} | Southborough, MA | Boarding, coed | 380 | Carl Corazzini |

Enrollment figures, day/boarding classification and division alignment come from the league's published membership data; coaches are as listed in New England Hockey Journal's preseason division breakdowns.<sup><a href="#sources">&dagger;</a></sup> One thing that classification hides: "boarding" means the school runs a boarding program, not that everybody boards. Several of these schools enroll a large day population alongside it, and a few of the boarding schools are the easiest commutes on the list.

## How ISL Hockey Fits Into NEPSAC

The ISL is one conference inside **NEPSAC**, the New England Preparatory School Athletic Council, which is what runs the actual championships. Your ISL team's season ends in a NEPSAC bracket, not an ISL one.

NEPSAC sorts boys hockey into three postseason tournaments, each an eight-team field:

| Tournament | Also called | What it is |
|---|---|---|
| **Stuart/Corkery** | Elite 8 | The open bracket. The best eight teams in New England prep, regardless of school size. |
| **Martin/Earl** | Large School | The large-school bracket for teams not pulled into the Elite 8. |
| **Piatelli/Simmons** | Small School | The small-school bracket. |

NEPSAC classifies by student body size, and the ISL classifies by boys enrollment, so the two do not line up cleanly. That is not a bug anyone is fixing. It is just something to know before you assume a division tells you a level.<sup><a href="#sources">†</a></sup>

### What that looked like in 2026

Seven of the 16 ISL schools reached a NEPSAC boys bracket in March 2026, and they were spread across all three of them.<sup><a href="#sources">†</a></sup>

| School | ISL Division | Bracket | Seed | How it ended |
|---|---|---|---|---|
| **St. Mark's** | Eberhart | Elite 8 | 2 (24-3-0) | Beat Belmont Hill 7-2, beat Kimball Union 7-3, **lost the final 4-2 to Avon Old Farms** |
| **St. Sebastian's** | Keller | Elite 8 | 4 (19-7-0) | Lost the quarterfinal 3-0 to Hotchkiss |
| **Belmont Hill** | Keller | Elite 8 | 7 | Lost the quarterfinal 7-2 to St. Mark's |
| **Tabor** | Keller | Large School | 1 (19-7-0) | Beat Choate 2-1, lost the semifinal 5-4 in overtime to Brunswick |
| **Thayer** | Keller | Large School | 5 | Lost the quarterfinal 2-1 to Brunswick |
| **Rivers** | Eberhart | Small School | 4 (13-8-3) | Lost the quarterfinal 5-0 to Berkshire |
| **St. George's** | Eberhart | Small School | 6 | Lost the quarterfinal 4-1 to Canterbury |

Look at that table again with the division column in mind. Eberhart, the "small school" division, produced the Elite 8 runner-up. Keller, the "large school" division, had its best team outside the Elite 8 seeded into the second-tier bracket. Go back to the 2023 championships and it inverts: Keller's Lawrence Academy and Governor's played in the **Small School** bracket that year, alongside Eberhart's St. Mark's and Brooks.<sup><a href="#sources">&dagger;</a></sup>

**The ISL division your kid's team plays in tells you who they play, not how good they are.**

## The Girls Side

Thirteen ISL schools field girls varsity hockey, and unlike the boys, **there is no Keller/Eberhart split**. It is one division.<sup><a href="#sources">†</a></sup>

Brooks, BB&N, Governor's, Groton, Lawrence, Middlesex, Milton, Nobles, Rivers, St. George's, St. Mark's, Tabor, and Thayer.

It also does not get the attention it deserves relative to its results. In 2025-26, **Nobles went 27-1-0** and took the No. 1 seed in the girls Elite 8 (the Chuck Vernon tournament), losing 5-4 in overtime in the semifinals to eventual champion Loomis Chaffee. **Tabor**, seeded seventh, knocked off No. 2 Phillips Andover 2-1 in overtime in the quarterfinals before losing its own semifinal 3-2. Two ISL schools in the last four of New England's top girls bracket.<sup><a href="#sources">†</a></sup>

The girls calendar also has its own marquee holiday event, and it shares both a weekend and a pair of hosts with the boys one. Nobles and Milton co-host the boys **Flood-Marr**, which started in 1965, and the girls **Harrington Invitational**, which started in 1972. Each runs eight schools through a four-game December format.<sup><a href="#sources">&dagger;</a></sup> If you want to see a lot of prep hockey in one weekend without buying a season's worth of tickets, that is the weekend.

## What ISL Hockey Has Produced

Two data points that say more than a list of college commitments would.

**Thayer Academy has two Hobey Baker Award winners.** Mike Mottau '96 won it at Boston College in 2000, and Adam Gaudette, a Braintree native, won it at Northeastern in 2018 after leading all of NCAA Division I with 30 goals and 60 points.<sup><a href="#sources">†</a></sup> One school, two national player-of-the-year awards.

**Alex Carpenter came out of Governor's Academy.** She won the 2015 Patty Kazmaier Award at Boston College and has gone on to multiple US Olympic teams and the PWHL.<sup><a href="#sources">†</a></sup>

And the coaching bench is deeper than most public high school leagues can offer. Rivers is coached by **Freddy Meyer**, who captained Boston University and played 281 NHL games. St. Mark's is coached by **Carl Corazzini**, another BU captain who played for the Bruins and Blackhawks, and who won an Eberhart title and a NEPSAC Small School title in his first year on the job.<sup><a href="#sources">†</a></sup>

<div style="margin: 1.5em 0; text-align: center;">
{% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}
</div>

## How the ISL Connects to the E9 and the EHF

This is the part I actually wanted to write, because it almost never gets laid out anywhere, and it is the reason a club family should care about this page at all.

### The timing is not a coincidence

Look at the ages. **The E9's oldest boys group is 14U.** There is no 15U, no 16U, no 18U. [Every one of the league's boys divisions](/blog/e9-divisions-by-team/) sits at 14U or younger, and for most players 14U is the ninth grade year. The league runs out of room at almost exactly the point prep school starts.

So the E9 does not compete with prep for players. **It hands them off.** And the handoff happens a year before the hockey makes it obvious, because the application goes in during eighth grade while your kid is still skating 13U in the same league. That is why the tryout conversation and the admissions conversation collide every winter, and why families feel blindsided by a school calendar running a full year ahead of the hockey one.

The [EHF](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/) is different, and this is worth knowing before you assume the two leagues present the same choice. The EHF keeps going past 14U, fielding 15U, 16U and 18U groups straight through the high school years.<sup><a href="#sources">&dagger;</a></sup> That makes prep a genuine either/or for an EHF family, because prep hockey is a winter school sport and a player cannot do both.

### The pipeline has names on it

In April 2025, three Rivers School freshmen, **Carter Meyer, Finn Sears, and Sam Pandolfo**, were selected to the USA Hockey National Team Development Program U-17 team. The school's own account of it notes that the three "have been nearly inseparable since they were eight years old, first skating with the Boston Junior Eagles" before ending up on the same line at Rivers.<sup><a href="#sources">†</a></sup>

The Boston Jr Eagles are an EHF organization based in Brighton. They are on our [EHF map](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/), where they carried the highest average MyHockeyRankings rating of any Massachusetts EHF organization in the 2025-26 data we pulled. Three kids from one EHF club, to one ISL school, to the national program, in a single class.

That is one class at one school, not a study. But it is exactly the shape of the pipeline, and it is the shape nobody draws for you at a 14U tryout.

### Sometimes it is the same building

The clearest overlap is physical. **The Governor's Academy plays at Whiston-Bragdon Arena in Byfield, and rentals for that arena are handled by Top Gun Arena.**<sup><a href="#sources">†</a></sup> Top Gun is an EHF club, and it sits at Byfield on our [EHF map](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/), because that is where it is based.

An ISL school and an EHF organization, sharing one sheet of ice. If you overlay the ISL map above on the E9 and EHF maps, this stops looking like a coincidence: the same eastern Massachusetts corridor, the same towns, and in a few cases the same rinks.

### What that means for your decision

Three honest observations, none of which will make the decision for you.

**The ISL is a school choice with a hockey program attached, not a hockey choice with a school attached.** Admissions decides. Financial aid is need-based only. If the academic fit is wrong, the hockey will not fix it.

**The no-PG rule is a real competitive variable.** It cuts both ways. Your kid will not be playing against 19-year-olds inside the league, and your kid also will not have the option of a repeat year to grow into. Weigh it deliberately.

**Junior hockey is still the standard route to college hockey, prep or not.** That is not my read, it is what Coach Greg Capello told us directly in [our high school hockey webinar](/blog/2026/04/13/high-school-hockey-webinar-recap-coach-greg-capello/): junior hockey is now the standard path, even for prep school players. Prep is a genuinely good four years. It is not a shortcut past the four years of D1 hockey that might be your goal.

## Where to Follow the Season

Placement and membership stay put. Standings do not. Bookmark the live sources rather than trusting a copied table:

- **[ISL boys ice hockey](https://www.islsports.org/boys-ice-hockey/){:target="_blank" rel="noopener"}** and **[ISL girls ice hockey](https://www.islsports.org/girls-ice-hockey/){:target="_blank" rel="noopener"}** on the league's own site, for schedules and division standings.
- **[U.S. Hockey Report](https://www.ushr.com/neprep/standings){:target="_blank" rel="noopener"}** for New England prep standings, rankings and box scores, broken out by league including ISL Keller and ISL Eberhart. Much of it is subscriber-only.
- **[New England Hockey Journal](https://www.hockeyjournal.com/){:target="_blank" rel="noopener"}** for previews, brackets and results. Also largely subscriber-only, and the best writing on this level of hockey anywhere.
- **[NEPSAC](https://nepsac.org/tournaments/tournament-postseason/){:target="_blank" rel="noopener"}** for the postseason brackets themselves.

## Make the Four Years Count

Whichever way this decision goes, the hockey part is the same problem it always was. Thirty-odd games happen, and by spring almost none of them are still in anybody's head.

Prep programs come with real coaching staffs and real facilities. Most club and public high school teams are running on volunteers and a phone in the stands. That gap is not about talent. It is about whether anybody kept the film and did anything with it.

That is what we built Scout Elite for: coaches and parents turning game video into development in minutes, without a video staff.

<div style="margin: 1.5em 0; text-align: center;">
{% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}
</div>

*Membership, division alignment and 2025-26 results captured 2026-09-09. Leagues move teams and schools change coaches. Spot something wrong? Reach out and I will fix it here.*

---

<a name="sources"></a>

## Sources

1. Independent School League, ["Boys' Ice Hockey."](https://www.islsports.org/boys-ice-hockey/){:target="_blank" rel="noopener"} Member schools fielding boys varsity ice hockey, Keller and Eberhart division standings archives.

2. Independent School League, ["Girls' Ice Hockey."](https://www.islsports.org/girls-ice-hockey/){:target="_blank" rel="noopener"} Girls varsity ice hockey membership and standings archives, single division.

3. Independent School League, ["Essential Understandings."](https://www.islsports.org/essential-understandings/){:target="_blank" rel="noopener"} Source for the postgraduate ineligibility rule and the need-based-only financial aid commitment.

4. Wikipedia, ["Independent School League (New England)."](https://en.wikipedia.org/wiki/Independent_School_League_(New_England)){:target="_blank" rel="noopener"} Founding as the Private School League in 1948 and renaming in 1974; member school table (location, founding year, year joined, high school enrollment, day/boarding); Keller and Eberhart division alignment; the note that NEPSAC classifies strictly by total student body while the ISL splits on boys enrollment, and the resulting mismatches.

5. New England Preparatory School Athletic Council, ["Tournament / Postseason"](https://nepsac.org/tournaments/tournament-postseason/){:target="_blank" rel="noopener"} and ["Boys' Ice Hockey (NEPSBIHA)."](https://nepsac.org/coaches-associations/boys-sports/boys-ice-hockey-nepsbiha/){:target="_blank" rel="noopener"} Tournament structure and the Stuart/Corkery (Elite 8), Martin/Earl (Large School) and Piatelli/Simmons (Small School) naming.

6. Evan Marinofsky, ["ISL Keller Division: A team-by-team breakdown for 2025-26."](https://www.hockeyjournal.com/isl-keller-division-a-team-by-team-breakdown-for-2025-26/){:target="_blank" rel="noopener"} New England Hockey Journal, November 18, 2025. Keller division membership and head coaches.

7. Evan Marinofsky, ["ISL Eberhart: A team-by-team breakdown for 2025-26."](https://www.hockeyjournal.com/isl-eberhart-a-team-by-team-breakdown-for-2025-26/){:target="_blank" rel="noopener"} New England Hockey Journal, November 20, 2025. Eberhart division membership and head coaches.

8. Evan Marinofsky, ["NEPSAC boys Elite 8 tournament 2026: Full schedule, bracket and results."](https://www.hockeyjournal.com/nepsac-boys-elite-8-tournament-2026-full-schedule-bracket-and-results/){:target="_blank" rel="noopener"} New England Hockey Journal, March 8, 2026. Seeds, regular season records and every result in the 2026 Stuart/Corkery bracket.

9. Evan Marinofsky, ["NEPSAC boys Large School tournament 2026: Full schedule, bracket and results."](https://www.hockeyjournal.com/nepsac-boys-large-school-tournament-2026-full-schedule-bracket-and-results/){:target="_blank" rel="noopener"} New England Hockey Journal, March 8, 2026.

10. Evan Marinofsky, ["NEPSAC boys Small School tournament 2026: Full schedule, bracket and results."](https://www.hockeyjournal.com/nepsac-boys-small-school-tournament-2026-full-schedule-bracket-and-results/){:target="_blank" rel="noopener"} New England Hockey Journal, March 8, 2026.

11. Patrick Donnelly, ["NEPSAC girls Elite 8 tournament 2026: Full schedule, bracket and results."](https://www.hockeyjournal.com/nepsac-girls-elite-8-tournament-2026-full-schedule-bracket-and-results/){:target="_blank" rel="noopener"} New England Hockey Journal, March 8, 2026. Nobles at 27-1-0 as the No. 1 seed, Tabor's quarterfinal upset of Phillips Andover, and the Chuck Vernon bracket results.

12. Independent School League, ["Three Rivers Freshmen Selected for Prestigious USA Hockey National Team Development Program."](https://www.islsports.org/three-rivers-freshman-selected-for-prestigious-usa-hockey-national-team-development-program/){:target="_blank" rel="noopener"} April 16, 2025. Source for the Carter Meyer / Finn Sears / Sam Pandolfo NTDP selections, their shared Boston Junior Eagles background, and Freddy Meyer's playing career.

13. Independent School League, ["Former Thayer Hockey Player Wins Hobey Baker Award."](https://www.islsports.org/former-thayer-hockey-player-wins-hobey-baker-award/){:target="_blank" rel="noopener"} April 9, 2018. Adam Gaudette's 2018 Hobey Baker and Mike Mottau '96 winning it in 2000.

14. Independent School League, ["Alex Carpenter '11: From the Govs Rink to the World Stage."](https://www.islsports.org/alex-carpenter-11-from-the-govs-rink-to-the-world-stage/){:target="_blank" rel="noopener"} May 7, 2025. The league's girls ice hockey page also carries its 2015 note on Carpenter winning the Patty Kazmaier Memorial Award as a Boston College junior.

15. The Governor's Academy, ["Athletic Facilities."](https://www.thegovernorsacademy.org/athletics/facilities){:target="_blank" rel="noopener"} Whiston-Bragdon Arena, with rental inquiries directed to Top Gun Arena.

16. Wikipedia, ["Carl Corazzini."](https://en.wikipedia.org/wiki/Carl_Corazzini){:target="_blank" rel="noopener"} Boston University captain, NHL games with the Bruins and Blackhawks, and the Eberhart and NEPSAC Piatelli/Simmons titles in his first season at St. Mark's.

17. The Nobleman, ["Nobles Hockey Returns: a Flood-Marr and Harrington Preview."](https://thenoblemanonline.com/5270/sports/nobles-hockey-returns-a-flood-marr-and-harrington-preview/){:target="_blank" rel="noopener"} Noble and Greenough School's student newspaper. Source for the founding years (Flood-Marr 1965, Harrington 1972), the Nobles and Milton co-hosting arrangement, and the eight-school, four-game format. Schedules for the current editions are posted each December by New England Hockey Journal, most recently the ["Harrington Invitational: Full preview and schedule for 2025."](https://www.hockeyjournal.com/full-preview-and-schedule-for-2025-harrington-invitational/){:target="_blank" rel="noopener"}

18. U.S. Hockey Report, ["New England Prep Standings."](https://www.ushr.com/neprep/standings){:target="_blank" rel="noopener"} Per-league prep standings including ISL Keller and ISL Eberhart. Largely subscriber-only.

19. MyHockeyRankings, ["Eastern Hockey Federation league page."](https://myhockeyrankings.com/league-info?l=109){:target="_blank" rel="noopener"} Source for the EHF fielding age groups above 14U, including 15U, 16U and 18U.

20. Scout Elite, ["E9 2026-27 Divisions: Every Team, by Birth Year"](/blog/e9-divisions-by-team/) and ["Massachusetts Youth Hockey Teams: EHF Guide & Map."](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/) Source for the E9's 14U ceiling on the boys side and the EHF club locations and ratings referenced above.

---

{% include ma-hockey-guide-series.html current="isl" %}
