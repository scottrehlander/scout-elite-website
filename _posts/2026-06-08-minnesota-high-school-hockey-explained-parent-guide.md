---
layout: post
display_title: "Minnesota High School Hockey Explained: The Complete Parent's Guide"
title: "Minnesota High School Hockey Explained: Teams, Rankings & Tournament Guide"
description: "How Minnesota high school hockey actually works: why it's the main event here instead of the consolation bracket, the programs that define the state tournament, the latest rankings and championship results, and the data behind the State of Hockey. With a team map and source-backed stats."
date: 2026-06-08
categories: [insights]
tags: [Minnesota high school hockey, MSHSL hockey, Minnesota state hockey tournament, Minnesota hockey rankings, State of Hockey, Edina hockey, Hill-Murray hockey, Warroad hockey, Moorhead hockey, Minnetonka hockey, Minnesota hockey teams, Minnesota hockey map, Minnesota girls high school hockey, StribVarsity rankings, Xcel Energy Center hockey, Minnesota hockey parent guide, Class 1A hockey, Class 2A hockey, Roseau hockey, Eveleth hockey]
author: "Coach Scott"
excerpt: "In most states, high school hockey is the consolation bracket for kids who didn't make a club team. In Minnesota, it's the main event - the most attended high school sporting event in the country. Here's how it works, with a team map and the data to back it up."
image: "/img/blog/youth-hockey-goalie-score-player.png"
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

If you've spent any time around youth hockey outside the upper Midwest, you've absorbed a certain hierarchy: AAA club hockey sits at the top, and high school hockey is what's left over - the place kids land when they don't make a club team, or age out of one. In Michigan, Massachusetts, Illinois, and most of the Sun Belt, that's roughly how it works.

**Minnesota flips that hierarchy completely.**

Here, high school hockey *is* the top of the pyramid. The best 17-year-olds in the state aren't commuting two hours to play for a private AAA brand - they're playing for their hometown high school, in front of crowds that would embarrass some NHL arenas, chasing a state tournament that's been running since 1945 and routinely outdraws professional sports.

This is the guide to that world: how Minnesota high school hockey is structured, the programs that have defined it, the most recent rankings and championship results, and why the data says staying home was the smart play all along.

> **Looking for the youth side - community associations, Tier I, and the spring/summer AAA scene?** That's a different system here, and it has [its own complete guide](/blog/2026/06/08/minnesota-youth-hockey-explained-parent-guide/). This post is about the high school game.


## Minnesota High School Hockey Map

The map below plots the programs that have shaped Minnesota's high school hockey - the historic dynasties, the small-town powers, and the teams ranked at the top of the most recent statewide polls. Click any marker for a snapshot of why that program matters.

> **Important note:** Locations are approximate - a school's town, not necessarily its home rink.

<div id="mn-hs-map" style="height: 560px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<script>
(function() {
	var map = L.map('mn-hs-map').setView([46.1, -94.2], 6);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 13
	}).addTo(map);

	function marker(lat, lng, name, town, note) {
		return L.circleMarker([lat, lng], {
			radius: 8,
			fillColor: '#007acc',
			color: '#ffffff',
			weight: 2,
			opacity: 1,
			fillOpacity: 0.9
		}).bindPopup(
			'<strong>' + name + '</strong><br>' + town +
			'<br><span style="font-size:0.92em">' + note + '</span>'
		);
	}

	var programs = [
		marker(44.8897, -93.3499, 'Edina', 'Edina, MN', 'Boys: 10 state titles, the most in MSHSL history. Girls: 5 state titles (2017, &apos;18, &apos;19, &apos;21, &apos;24). The program every other Minnesota school measures itself against.'),
		marker(44.9530, -93.0280, 'Hill-Murray', 'Maplewood, MN', 'Boys: 32 state tournament appearances, more than any program ever. Girls: back-to-back Class 2A champions (2025, 2026), beating Centennial/Spring Lake Park 4-3 in the 2026 final.'),
		marker(46.8738, -96.7678, 'Moorhead', 'Moorhead, MN', 'Back-to-back Class 2A boys champions - beat Minnetonka 5-4 in double overtime in the 2026 final, the first repeat title for a Class AA program since Edina in 2013-14.'),
		marker(44.9211, -93.4687, 'Minnetonka', 'Minnetonka, MN', '2026 Class 2A boys runner-up after a 5-4 double-overtime loss to Moorhead. A perennial top-5 program in the StribVarsity statewide rankings.'),
		marker(48.9036, -95.3144, 'Warroad', 'Warroad, MN', 'Known as &quot;Hockeytown, USA.&quot; Boys: 2026 Class 1A champions (first Class A title since 2005). Girls: 5-time state champions, runners-up to Breck in 2026.'),
		marker(47.4272, -92.9377, 'Hibbing/Chisholm', 'Hibbing, MN', '2026 Class 1A boys runner-up, falling 5-4 in overtime to Warroad after rallying late to force the extra session.'),
		marker(47.4622, -92.5394, 'Eveleth-Gilbert', 'Eveleth, MN', 'The cradle of Minnesota high school hockey - Eveleth won four straight state titles in the 1940s behind legendary freshman John Mayasich, records that still stand today.'),
		marker(48.8453, -95.7619, 'Roseau', 'Roseau, MN', 'A town of ~2,500 in the far north, tied for the most state tournament appearances in history (34). The Rams produced the Broten brothers and have punched above their weight for generations.'),
		marker(45.0105, -93.3499, 'Breck School', 'Golden Valley, MN', '2026 Class 1A girls champions, beating rival Warroad 4-1 for the program&apos;s fifth state title. One of the two private-school powers (with Blake) that have defined Class A girls hockey for two decades.'),
		marker(44.8835, -93.1419, 'St. Thomas Academy', 'Mendota Heights, MN', 'Ranked #2 in the November 2025 StribVarsity statewide poll, led by Mr. Hockey finalist Cole Braunshausen - a regular top-10 presence.'),
		marker(45.0724, -93.4557, 'Maple Grove', 'Maple Grove, MN', 'Ranked #6 in the November 2025 StribVarsity poll after opening Lake Conference play with wins over both Edina and Wayzata.'),
		marker(44.9250, -93.4083, 'The Blake School', 'Hopkins, MN', 'Six girls state championships (2007, &apos;09, &apos;13, &apos;14, &apos;16, &apos;17) - the other half of the Blake/Breck rivalry that has owned Class A girls hockey since the 2010s.'),
		marker(45.0027, -93.4880, 'Wayzata', 'Plymouth, MN', 'A Lake Conference heavyweight and one of the largest programs in the state, a near-permanent fixture in the statewide top 10.'),
		marker(44.8547, -93.4708, 'Eden Prairie', 'Eden Prairie, MN', 'Class 2A champions in 2009 and 2011 behind future NHLer Kyle Rau - one of the dominant metro programs of the 2010s.'),
		marker(44.9436, -93.1572, 'Cretin-Derham Hall', 'St. Paul, MN', 'A St. Paul private-school power with multiple state titles and a long line of Division I and pro athletes across sports.'),
		marker(46.8137, -92.0460, 'Duluth East', 'Duluth, MN', 'The Greyhounds are one of the most storied northern programs, with a long history of deep tournament runs out of the rugged Section 7AA.'),
		marker(47.2372, -93.5302, 'Grand Rapids', 'Grand Rapids, MN', 'The Thunderhawks won the 2017 Class 2A title and remain the standard-bearer for Iron Range big-school hockey.'),
		marker(45.2330, -93.2914, 'Andover', 'Andover, MN', 'A newer power that broke through for the 2022 Class 2A championship, proving the suburbs north of the metro can hang with anyone.')
	];

	programs.forEach(function(p) { p.addTo(map); });
})();
</script>

<div style="background:var(--secondary-bg);border:1px solid var(--border-color);border-left:3px solid var(--accent-primary);padding:1.25em 1.5em;margin:2em 0;border-radius:0 var(--radius-md) var(--radius-md) 0;">
  <p style="margin:0 0 0.35em;font-size:0.75em;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent-primary);">Built for coaches and parents in markets like this</p>
  <p style="margin:0 0 0.6em;font-size:1.05em;font-weight:600;color:var(--text-primary);line-height:1.4;">High school staffs run on volunteer hours and tight budgets - but game film is still your most underused development tool.</p>
  <p style="margin:0 0 1em;color:var(--text-secondary);line-height:1.6;font-size:0.95em;">Scout Elite is video analysis built for youth and high school hockey coaches and parents - upload the game, clip the moments that matter, run focused film sessions, and build player development reports kids can actually act on before the next practice. No production crew or video staff required.</p>
  {% include xpress-cta.html placement="map-cta" text="Try Scout Elite Free &rarr; No Account Needed" style="font-size:0.95em;" %}
</div>


## Minnesota High School Hockey Programs at a Glance

| Program | Town | Class | Why It Matters |
|---|---|---|---|
| [Edina](https://www.edinaschools.org/){:target="_blank" rel="noopener"} | Edina | 2A | 10 boys titles (most ever), 5 girls titles |
| [Hill-Murray](https://www.hill-murray.org/){:target="_blank" rel="noopener"} | Maplewood | 2A | 32 boys tournament appearances (most ever); back-to-back girls champs |
| [Moorhead](https://www.moorheadschools.org/moorheadhigh){:target="_blank" rel="noopener"} | Moorhead | 2A | Back-to-back boys champions (2025, 2026) |
| [Warroad](https://www.warroad.k12.mn.us/){:target="_blank" rel="noopener"} | Warroad | 1A | "Hockeytown, USA" - 2026 boys champs, 5-time girls champs |
| [Roseau](https://www.roseau.k12.mn.us/){:target="_blank" rel="noopener"} | Roseau | 1A | Tied for most tournament appearances ever (34) |
| [Eveleth-Gilbert](https://www.evelethgilbert.org/){:target="_blank" rel="noopener"} | Eveleth | 1A | The historic cradle of the sport in Minnesota |
| [St. Thomas Academy](https://www.cadets.com/){:target="_blank" rel="noopener"} | Mendota Heights | 1A | 2025-26 statewide #2; Mr. Hockey finalist program |
| [Breck School](https://www.breckschool.org/){:target="_blank" rel="noopener"} | Golden Valley | 1A | 2026 girls champs; Class A girls dynasty |
| [The Blake School](https://www.blakeschool.org/){:target="_blank" rel="noopener"} | Hopkins | 1A | 6 girls state titles |
| [MSHSL](https://www.mshsl.org/){:target="_blank" rel="noopener"} | — | — | The governing body for all Minnesota high school sports |

*Note: "Class 2A" (formerly "Class AA") is the large-school class; "Class 1A" (formerly "Class A") is the small-school class. Private schools like St. Thomas Academy, Breck, and Blake often compete in 1A despite metro locations, which is why small-town and private-school programs dominate the same bracket.*


## Why High School Hockey Is the Main Event in Minnesota

In most of the country's strongest hockey markets, the path to "elite" runs through a private club, and the best players leave their hometown teams as early as Peewee or Bantam to chase it. That's the model in Michigan, Massachusetts, Illinois, and most of the Sun Belt.

Minnesota built its system the other way around, and it never went back. Here, **age cutoffs and the entire competitive calendar are tied to the school calendar**, rinks are owned by cities and park boards, and players generally compete within their home district.<sup><a href="#sources">†</a></sup> The practical result is that **the best 16- and 17-year-olds in a Minnesota town almost always play for that town's high school**, not a private organization an hour away.

That structure isn't just sentimental - the data says it works. A Minnesota Hockey study found that **78% of players who stayed in their high school program through graduation reached Division I hockey within three seasons, compared to just 59% of players who left for club programs early**.<sup><a href="#sources">†</a></sup> Meanwhile, other hockey-rich states have been losing high school hockey to club migration - Massachusetts alone has lost at least 78 towns' high school programs since 2001 as talent drifted toward private circuits.<sup><a href="#sources">†</a></sup> Minnesota never let that happen at scale, and its results suggest the decision paid off.

An independent review of the state's hockey culture summed up the difference: *"Minnesota youth hockey is closely tied to its schools and school districts,"* with a competitive environment noticeably calmer than AAA-heavy markets - "very little...competitive BS between parents. No yelling from the stands, just good hockey."<sup><a href="#sources">†</a></sup>


## The State Tournament: The Biggest Show in High School Sports

Minnesota fields **298 high schools with varsity hockey programs** - more than any other state - and the **Minnesota State High School Hockey Tournament**, played every winter at Xcel Energy Center in St. Paul, is one of the most attended high school sporting events in the country.<sup><a href="#sources">†</a></sup>

The tournament dates to 1945, when it was first played at the St. Paul Auditorium, and moved to its current home at Xcel Energy Center in 2001.<sup><a href="#sources">†</a></sup> A Class AA semifinal in 2015 drew **21,609 fans**, a record crowd for an indoor hockey game in Minnesota history, and the tournament has cleared **100,000 total fans across its four days on 38 separate occasions**.<sup><a href="#sources">†</a></sup> Plenty of NHL games draw smaller crowds than a Thursday session of "The Tourney."

### The Programs That Define the Tournament

A handful of programs have shaped the tournament's history more than any others:

- **Edina** has won **10 boys state championships**, the most of any program in MSHSL history, plus **5 girls titles** (2017, '18, '19, '21, '24).
- **Hill-Murray** (Maplewood) has made **32 tournament appearances**, more than any program ever.
- **Roseau**, a town of roughly 2,500 in the far north, is tied for the **most state tournament trips in history (34)** - and produced NHL stars Neal and Aaron Broten.
- **Eveleth** (now Eveleth-Gilbert) won **four consecutive state titles in the 1940s** behind a freshman phenom named John Mayasich, and several of those records still stand more than 75 years later.

### The 2025-26 Season

The most recent season produced two of the more dramatic championship finishes in tournament history. In the **Class 2A final on March 7, 2026**, **Moorhead** rallied from multiple three-goal deficits to beat top-seeded **Minnetonka 5-4 in double overtime** on a goal from junior Evan Wanner - making the Spuds the first Class AA program to repeat as champions since Edina won back-to-back titles in 2013 and 2014.<sup><a href="#sources">†</a></sup> In the **Class 1A final** that same day, **Warroad** scored with 46 seconds left in regulation to force overtime, then won it **5-4** on a goal from Mooney Shaugabay just over a minute into the extra session - the program's first Class A title since 2005.<sup><a href="#sources">†</a></sup>

Heading into that tournament run, the **StribVarsity statewide top 10** (released November 24, 2025) shaped up like this:

| Rank | Team | Notes |
|---|---|---|
| 1 | Moorhead | Defending Class 2A champions, returned top scorers Zac Zimmerman and Tyden Bergeson |
| 2 | St. Thomas Academy | Led by Mr. Hockey finalist Cole Braunshausen |
| 3 | Hill-Murray | Built around Chaz Lentz after a 57-point junior season |
| 4 | Minnetonka | Opened with a 6-3 win over Lakeville South |
| 5 | Hibbing/Chisholm | Class A program that opened by upsetting Cretin-Derham Hall |
| 6 | Maple Grove | Beat both Edina and Wayzata in its Lake Conference debut |
| 7 | Shakopee | Ground out a 2-1 win over rival Chanhassen |
| 8 | Holy Angels | Reloading after losing Mr. Hockey finalist Henry Lechner |
| 9 | Edina | Started the season 0-2 at the Turkey Trot |
| 10 | Rosemount | Opened with wins over East Ridge and Park |

*Full top-25 source: StribVarsity, November 24, 2025.*<sup><a href="#sources">†</a></sup>


## Girls High School Hockey: A National Leader

Minnesota has been a national leader in girls high school hockey since the state sanctioned it in the mid-1990s, and a handful of programs have dominated the state tournament for two decades:

- **Edina** has **5 girls state titles** (2017, '18, '19, '21, '24).
- **Warroad** has **5 state championships** and entered the 2026 tournament chasing an unprecedented four-peat - they fell just short, losing the Class 1A final to Breck.
- **The Blake School** (Hopkins) has **6 state titles** (2007, '09, '13, '14, '16, '17), and **Breck School** (Golden Valley) has **5**, including the most recent in 2026 - the Blake/Breck rivalry has effectively owned Class A girls hockey since the early 2010s.
- **Hill-Murray** won back-to-back **Class 2A titles in 2025 and 2026**.

The 2026 finals were classics: **Hill-Murray held off a furious third-period rally from Centennial/Spring Lake Park to win 4-3** for the Class 2A title, and **Breck scored twice in the final five minutes to beat Warroad 4-1** for the Class 1A crown, denying the Warriors their bid for history.<sup><a href="#sources">†</a></sup>


## The Pipeline: Where Minnesota's High School Players End Up

Here's the number that ties this entire system together: **311 NHL players have been born in Minnesota - nearly 100 more than Massachusetts, the next-closest state at 229.**<sup><a href="#sources">†</a></sup> Minnesota produces more NHL talent than any state in the country, and it has done so for generations, mostly out of the same high school programs on this map.

**Phil Housley**, a South St. Paul product, holds the all-time scoring record among Minnesota-born NHL players with **1,232 career points**, and ranks fourth all-time among NHL defensemen in goals.<sup><a href="#sources">†</a></sup> More recently, **Jake Guentzel** has led all Minnesota-born players in scoring during the 2025-26 NHL season.

The pipeline runs just as deep in college. The **University of Minnesota Golden Gophers** have produced **four Hobey Baker Award winners** - Neal Broten (1981), Robb Stauber (1988), Brian Bonin (1996), and Jordan Leopold (2002) - and the program keeps churning out national-award contenders, with Chaska native **Jimmy Snuggerud** a 2025 Hobey Baker finalist and **Luke Mittelstadt** and **Brodie Ziemer** both earning 2026 nominations.<sup><a href="#sources">†</a></sup>

The system that looks "backwards" from the outside - school-based, community-run, tournament-driven - is the same one that has produced more NHL players than any other state in America, by a wide margin. That's not a coincidence. It's the point.


## What This Means If You're New to Minnesota

If you're moving here from a club-driven market, here's the practical version:

- **Your high school program is the destination, not a fallback.** The best players in the state are playing locally. The path runs through your community association and into your local high school.
- **Sections and classes shape your road to the tournament.** Schools are slotted into Class 1A (small) or 2A (large) and into geographic sections; your section is your bracket.
- **Private schools often play 1A**, which is why small-town and private-school programs share the same championship bracket - something that surprises a lot of newcomers.
- **The "AAA or bust" mindset doesn't apply here.** Minnesota's results - 311 NHL players, a four-Hobey-Baker college program, a 78%-vs-59% Division I conversion rate for kids who stay home - suggest it never had to.
- **The youth game that feeds all this is its own world.** Community associations, Tier I fall leagues, and a separate spring/summer AAA scene each play a role before kids ever reach varsity. [That's covered in the companion youth hockey guide.](/blog/2026/06/08/minnesota-youth-hockey-explained-parent-guide/)


## How Video Analysis Fits Into High School Hockey

Here's something Minnesota's high school programs have in common with every other hockey market in the country: the coaches doing the development work are almost never backed by a video department or a broadcast-level production budget. They're teachers, parents, and volunteers trying to give kids structured, specific feedback with the time and tools they actually have.

That's exactly the gap video analysis closes. A coach who can clip a shift, mark the moment a gap collapsed, and share it with a player in minutes gives that kid something concrete to work on before the next practice - without a production crew or an enterprise platform.

At Scout Elite, we built our [video analysis and player development tools](/blog/2026/05/01/scout-elite-performance-coaching-tools/) for exactly this kind of coaching: high-volume, locally run, and built on relationships rather than budgets. Whether you're breaking down film for a varsity playoff push or helping your kid see what the coach is talking about, [the tools are designed for that context](/blog/2026/05/01/scout-elite-performance-coaching-tools/).

<div style="margin: 1.5em 0; text-align: center;">
  {% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}
</div>


## Minnesota High School Hockey at a Glance

| Item | Detail |
|---|---|
| Governing body | Minnesota State High School League (MSHSL) |
| Varsity programs | 298 schools - most of any state |
| Classes | Class 1A (small schools) and Class 2A (large schools) |
| State tournament | Xcel Energy Center, St. Paul - one of the most-attended HS events in the country (100,000+ fans over four days) |
| Most boys titles | Edina (10) |
| Most appearances | Hill-Murray (32, boys) |
| 2026 boys champions | Moorhead (2A), Warroad (1A) |
| 2026 girls champions | Hill-Murray (2A), Breck (1A) |
| NHL players born in MN | 311 - more than any other state |

*Data current as of the 2025-26 season. Sources: [MSHSL](https://www.mshsl.org/){:target="_blank" rel="noopener"} · [Minnesota Hockey](https://www.minnesotahockey.org/){:target="_blank" rel="noopener"}*

---

If you found this guide useful - or if there's a program I shortchanged or a stat I got wrong - reach out. Minnesota high school hockey is a culture unlike anything else in American sports, and it deserves to be understood on its own terms.

And if you want the other half of the picture - the youth associations, Tier I, and AAA clubs that develop these players before they ever pull on a varsity sweater - [read the companion youth hockey guide here.](/blog/2026/06/08/minnesota-youth-hockey-explained-parent-guide/)

*-- Coach Scott*

---

<a name="sources"></a>

## Sources

1. MyHockeyRankings, ["How and Why Minnesota Hockey Is Different."](https://myhockeyrankings.com/news.php?b=319){:target="_blank" rel="noopener"} Independent national ratings organization's analysis of Minnesota's school-district-based structure and competitive culture.

2. Golden Stick Hockey, ["Other States Train Hockey Players. Minnesota Builds Them."](https://www.goldenstickhockey.com/post/minnesota-youth-hockey-development){:target="_blank" rel="noopener"} Source for the 78%-vs-59% Division I conversion data and the Massachusetts high-school-program attrition figure.

3. Wikipedia, ["High school boys ice hockey in Minnesota."](https://en.wikipedia.org/wiki/High_school_boys_ice_hockey_in_Minnesota){:target="_blank" rel="noopener"} Tournament history, the 298-school figure, and attendance records.

4. The Rink Live, ["75 years of records: A statistical review of the Minnesota boys' state tournament."](https://www.therinklive.com/high-school/75-years-of-records-a-statistical-review-of-the-minnesota-boys-state-tournament){:target="_blank" rel="noopener"} Edina's 10 titles, Hill-Murray's 32 appearances, Roseau's tournament history, and Eveleth's 1940s dynasty.

5. Vintage MN Hockey, ["Boys State H.S. Hockey Champions (1945-2026)."](https://history.vintagemnhockey.com/page/show/813791-boys-state-h-s-hockey-champions-1945-2025-){:target="_blank" rel="noopener"}

6. SI / StribVarsity, ["Minnesota High School Boys Hockey Top 25 State Rankings - November 24, 2025."](https://www.si.com/high-school/minnesota/minnesota-high-school-boys-hockey-top-25-state-rankings-november-24-2025-01kavf8fyy71){:target="_blank" rel="noopener"}

7. KSTP, ["Boys State Hockey: Moorhead makes it back-to-back state titles with thrilling double-overtime win over Minnetonka."](https://kstp.com/minnesota-sports/boys-state-hockey-moorhead-makes-it-back-to-back-state-titles-with-thrilling-double-overtime-win-over-minnetonka/){:target="_blank" rel="noopener"} March 2026.

8. StribVarsity, ["Warroad defeats Hibbing/Chisholm 5-4 in OT to win Class 1A boys hockey championship."](https://varsity.startribune.com/warroad-boys-hockey-state-tournament-class-1a-championship-hibbingchisholm/601589199){:target="_blank" rel="noopener"} March 2026.

9. KSTP, ["Girls State Hockey: Hill-Murray successfully defends Class 2A title with 4-3 win over Centennial/SLP."](https://kstp.com/minnesota-sports/girls-state-hockey-hill-murray-successfully-defends-class-2a-title-with-4-3-win-over-centennial-slp/){:target="_blank" rel="noopener"} February 2026.

10. Bring Me The News, ["Girls hockey tournament: Breck/Groves Academy tops Warroad for Class A title."](https://bringmethenews.com/minnesota-sports/girls-hockey-tournament-breck-groves-academy-tops-warroad-for-class-a-title){:target="_blank" rel="noopener"} February 2026.

11. 1390 Granite City Sports, ["Minnesota's Hockey Legacy Shines With 311 NHL Players Born In The State."](https://1390granitecitysports.com/hockey-history-minnesota/){:target="_blank" rel="noopener"} NHL birthplace data, Phil Housley's career scoring record, and Jake Guentzel's 2025-26 standing.

12. University of Minnesota Athletics, ["Gophers' Snuggerud Named a Hobey Baker Top 10 Finalist"](https://gophersports.com/news/2025/3/19/mens-hockey-gophers-snuggerud-named-a-hobey-baker-top-10-finalist){:target="_blank" rel="noopener"} and ["Mittelstadt, Ziemer Named Hobey Baker Nominees."](https://gophersports.com/news/2026/1/21/mens-hockey-mittelstadt-ziemer-named-hobey-baker-nominees){:target="_blank" rel="noopener"} Gophers Hobey Baker history and recent finalists/nominees.

13. Minnesota State High School League, ["Hockey."](https://www.mshsl.org/){:target="_blank" rel="noopener"} Class structure and tournament administration.
