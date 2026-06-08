---
layout: post
display_title: "Minnesota Youth Hockey Explained: The Complete Parent's Guide"
title: "Minnesota Youth Hockey Explained: Associations, Tier I, and AAA Clubs Guide"
description: "How youth hockey actually works in Minnesota: the community association system that runs the winter, the June-July tryout calendar, the fall Tier I high-performance leagues, and the spring/summer AAA club scene. With a club map, costs, and source-backed data for parents."
date: 2026-06-08
categories: [insights]
tags: [Minnesota youth hockey, Minnesota Hockey, Minnesota youth hockey associations, Minnesota AAA hockey, Minnesota Tier 1 hockey, Minnesota Made hockey, Minnesota Machine hockey, Minnesota Blades hockey, Minnesota Steel hockey, Shattuck-St Mary's hockey, Minnesota spring summer hockey, Minnesota hockey clubs, Squirt Peewee Bantam, youth hockey Minnesota, Minnesota hockey districts, State of Hockey, Minnesota hockey map, Minnesota hockey tryouts, Minnesota girls youth hockey]
author: "Coach Scott"
excerpt: "Minnesota calls itself the State of Hockey, and it earns the name - but its youth system looks almost nothing like the AAA-driven landscape in most of the country. Community associations run the winter, Tier I runs the fall, and AAA runs the summer. Here's how to navigate all three."
image: "/img/blog/hockey-player-youth-puck.png"
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

If you've researched youth hockey anywhere outside the upper Midwest, you've built a mental model of how it works: a handful of private AAA organizations, a fall-to-spring travel circuit, tryouts that sort the best 10-year-olds into competing brands, and a five-figure price tag. That's roughly how it works in Michigan, Massachusetts, Illinois, and most of the Sun Belt.

**Minnesota's youth hockey system is built almost backwards from that - and understanding why is the single most useful thing a new hockey parent here can do.**

In Minnesota, the foundation isn't a private club. It's your **community association** - a city-run, volunteer-staffed program tied to your local rink and your school district. That's where the overwhelming majority of kids play from Mites through Bantams, and where the actual development happens. The state's elite "AAA" layer exists, but it's split into two very different pieces that run at *different times of year* than anywhere else: a **fall** Tier I season run by Minnesota Hockey itself, and a **spring/summer** private-club AAA scene that looks a lot more like the rest of the country.

This guide walks through all three layers - associations, Tier I, and AAA - so you know where your kid actually fits.

> **Looking for the high school side - the state tournament, the famous programs, the rankings?** That's the destination all of this feeds into, and it has [its own complete guide](/blog/2026/06/08/minnesota-high-school-hockey-explained-parent-guide/). This post is about the youth game underneath it.


## Minnesota Youth Hockey Map: Districts, AAA Clubs & Prep Programs

This map covers all three layers at once - use the toggle in the upper right to switch between them. **Minnesota Hockey districts** (teal) are the geographic foundation everything else sits on - your home address determines your district, and your district determines your community association. **Spring/summer AAA clubs** (orange) and the state's one true **year-round prep/boarding program** (purple) are the elite layers that supplement that foundation. Click any marker for a snapshot.

> **Important note:** District markers are placed near each region's geographic center for orientation - they represent an *area*, not a single rink or office. Club and prep markers are approximate home bases, not every facility a program uses.

<div id="mn-youth-map" style="height: 560px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<script>
(function() {
	var map = L.map('mn-youth-map').setView([46.2, -94.0], 6);

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

	var DIST = '#0ca678';
	var AAA = '#e8590c';
	var PREP = '#7048e8';

	var districts = L.layerGroup([
		marker(44.9778, -93.2650, DIST, 'District 1', 'Minneapolis', 'Inner-city Minneapolis associations - City of Lakes Titans, Langford Park, Edgcumbe, DinoMights. <a href="https://district1.pucksystems2.com/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(45.0850, -93.0000, DIST, 'District 2', 'East Metro / North Suburbs', 'White Bear Lake, Stillwater, Forest Lake, Mahtomedi, Mounds View, Roseville, North St. Paul. <a href="https://www.d2hockey.org/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(45.0725, -93.4558, DIST, 'District 3', 'Northwest Metro', 'Maple Grove, Brooklyn Park, Hopkins, Osseo, Wayzata, Mound, Delano, Long Lake. <a href="https://www.d3hockey.org/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(44.4475, -95.7886, DIST, 'District 4', 'Southwest Minnesota', 'Marshall, Worthington, Fairmont, Luverne, Redwood Falls, Windom, Sleepy Eye. <a href="https://www.minnesotahockey.org/page/show/88424-district-4" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(45.5608, -94.1622, DIST, 'District 5', 'Central Minnesota', 'St. Cloud, Willmar, Buffalo, Hutchinson, St. Michael-Albertville, Monticello, Litchfield. <a href="https://www.minnesotahockey.org/page/show/88425-district-5" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(44.8612, -93.4708, DIST, 'District 6', 'Southwest Metro', 'Edina, Minnetonka, Eden Prairie, Burnsville, Bloomington, Chaska, Eastview. <a href="https://www.minnesotahockey.org/page/show/88426-district-6" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(44.7300, -93.0700, DIST, 'District 8', 'Southeast Metro', '13 associations - Eagan, Lakeville, Woodbury, Rosemount, Apple Valley, Hastings, Cottage Grove, Red Wing. <a href="https://www.minnesotahockeydistrict8.com/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(44.0500, -92.7500, DIST, 'District 9', 'Southern Minnesota', 'Mankato, Rochester, Owatonna, Northfield, Albert Lea, Austin, Faribault, Winona. <a href="https://www.mndistrict9hockey.com/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(45.4350, -93.2200, DIST, 'District 10', 'North Metro / East Central', 'Andover, Anoka, Blaine, Coon Rapids, Elk River, Cambridge-Isanti, North Branch. <a href="https://district10hockey.org/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(46.7800, -92.3000, DIST, 'District 11', 'Northeast Minnesota', 'Duluth, Hermantown, Cloquet, Proctor, Esko, Two Harbors, Moose Lake, Grand Marais. <a href="https://www.minnesotahockeydistrict11.com/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(47.4500, -92.6000, DIST, 'District 12', 'Iron Range', 'Virginia, Eveleth, Hibbing/Chisholm, Grand Rapids, Ely, International Falls, Hoyt Lakes. <a href="https://www.d12hockey.org/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(46.3000, -94.7000, DIST, 'District 15', 'West Central Minnesota', 'Brainerd, Alexandria, Moorhead, Detroit Lakes, Fergus Falls, Park Rapids, Wadena. <a href="https://d15.pucksystems.com/" target="_blank" rel="noopener">District site &rarr;</a>'),
		marker(47.4700, -95.0150, DIST, 'District 16', 'Northwest Minnesota', 'Bemidji, Crookston, East Grand Forks, Thief River Falls, Roseau, Warroad, Bagley. <a href="https://www.mnhockeyd16.com/" target="_blank" rel="noopener">District site &rarr;</a>')
	]);

	var aaaClubs = L.layerGroup([
		marker(44.8570, -93.3700, AAA, 'Minnesota Made / Machine', 'Edina, MN', 'The state&apos;s best-known spring/summer AAA brand, based at the Minnesota Made Ice Center in Edina. Descended from the famous &quot;Minnesota 88s,&quot; eight of whom were drafted by NHL teams - including Erik Johnson, Kyle Okposo, and Jamie McBain.'),
		marker(44.8408, -93.2983, AAA, 'Minnesota Blades', 'Bloomington, MN', 'Founded in 1989 as the Minnesota Stars. Their 11U AAA squad opened the 2025 spring season 6-0-0 with a 99.40 MHR rating - one of the highest youth ratings recorded in the state all year.'),
		marker(44.8189, -93.6055, AAA, 'Minnesota Steel', 'Chaska, MN', 'A growing AAA club and member of the Youth Elite League (YEL), fielding boys teams from the 2011 birth year through 2018 plus a full girls program from U8 through U19.'),
		marker(44.9239, -92.9594, AAA, 'Minnesota Athletic Club (MAC)', 'Woodbury, MN', 'East-metro AAA program anchored at the new Woodbury ICE facility (opened fall 2025), with supporting venues across the east metro.'),
		marker(44.8041, -93.1668, AAA, 'Green Dash / MN Thundercats', 'Eagan, MN', 'A south-metro AAA program training across Eagan, Apple Valley, Lakeville, Rosemount, and the surrounding suburbs.'),
		marker(45.2789, -92.9852, AAA, 'Minnesota Mallards', 'Forest Lake, MN', 'A north-metro AAA youth program connected to the junior-level Minnesota Mallards (NAHL) organization.'),
		marker(45.0941, -93.3563, AAA, 'Team Minnesota', 'Brooklyn Park / New Hope, MN', 'A summer/fall AAA program based out of Brooklyn Park Arena and New Hope Arena, built to expose Minnesota players to national-level competition and options across North America.'),
		marker(44.0839, -93.2260, AAA, 'Kodiaks AAA', 'Owatonna, MN', 'Founded in Colorado in 1999 and relocated to southern Minnesota - the south-of-the-metro answer to the Twin Cities AAA scene.'),
		marker(46.8136, -92.2535, AAA, 'Minnesota Northern Wings', 'Hermantown, MN', 'The Iron Range and Duluth-area AAA program - one of the oldest and most established spring/summer clubs in northern Minnesota.')
	]);

	var prep = L.layerGroup([
		marker(44.2950, -93.2688, PREP, 'Shattuck-St Mary&apos;s', 'Faribault, MN', 'A full-time hockey boarding school running AAA and prep programs nearly year-round. 12 USA Hockey Tier I national titles (boys). Alumni include Jonathan Toews, Zach Parise, and Nathan MacKinnon.')
	]);

	districts.addTo(map);
	aaaClubs.addTo(map);
	prep.addTo(map);

	L.control.layers(null, {
		'Minnesota Hockey districts': districts,
		'Spring/summer AAA clubs': aaaClubs,
		'Prep / boarding programs': prep
	}, { collapsed: false }).addTo(map);

	var legend = L.control({position: 'bottomright'});
	legend.onAdd = function() {
		var div = L.DomUtil.create('div', '');
		div.style.cssText = 'background:white;padding:10px 14px;border-radius:6px;font-size:0.82em;line-height:1.7;box-shadow:0 1px 5px rgba(0,0,0,0.2)';
		div.innerHTML =
			'<strong style="display:block;margin-bottom:4px;color:#222">Program Type</strong>' +
			'<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#0ca678;margin-right:6px;vertical-align:middle"></span><span style="color:#222">Minnesota Hockey district (community)</span><br>' +
			'<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e8590c;margin-right:6px;vertical-align:middle"></span><span style="color:#222">Spring/summer AAA club</span><br>' +
			'<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#7048e8;margin-right:6px;vertical-align:middle"></span><span style="color:#222">Year-round prep / boarding</span>';
		return div;
	};
	legend.addTo(map);
})();
</script>

<div style="background:var(--secondary-bg);border:1px solid var(--border-color);border-left:3px solid var(--accent-primary);padding:1.25em 1.5em;margin:2em 0;border-radius:0 var(--radius-md) var(--radius-md) 0;">
  <p style="margin:0 0 0.35em;font-size:0.75em;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent-primary);">Built for coaches and parents in markets like this</p>
  <p style="margin:0 0 0.6em;font-size:1.05em;font-weight:600;color:var(--text-primary);line-height:1.4;">Association volunteer or AAA club coach - either way, game film is your most underused development tool.</p>
  <p style="margin:0 0 1em;color:var(--text-secondary);line-height:1.6;font-size:0.95em;">Scout Elite is video analysis built for youth hockey coaches and parents - upload the game, clip the moments that matter, run focused film sessions, and build player development reports kids can actually act on before the next practice. No production budget or video staff required.</p>
  {% include xpress-cta.html placement="map-cta" text="Try Scout Elite Free &rarr; No Account Needed" style="font-size:0.95em;" %}
</div>


## Minnesota Youth Hockey Programs at a Glance

| Program | Type | Home Base | What It Is |
|---|---|---|---|
| [Minnesota Hockey](https://www.minnesotahockey.org/){:target="_blank" rel="noopener"} | Governing body | St. Paul, MN | USA Hockey's Minnesota affiliate; oversees 13 districts and 130+ community associations |
| [Minnesota Made / Machine](https://www.mnmadeaaahockey.com/){:target="_blank" rel="noopener"} | Spring/summer AAA | Edina, MN | Legacy of the famous "Minnesota 88s"; the state's best-known AAA brand |
| [Minnesota Blades](https://www.minnesotablades.com/){:target="_blank" rel="noopener"} | Spring/summer AAA | Bloomington, MN | Founded 1989 as the Minnesota Stars; Mites through Midgets |
| [Minnesota Steel](https://mnsteelhockey.com/){:target="_blank" rel="noopener"} | Spring/summer AAA | Chaska, MN | Youth Elite League member; boys and girls AAA across the metro |
| [Minnesota Athletic Club](https://www.mnathleticclub.com/program/club-hockey-aaa/4812){:target="_blank" rel="noopener"} | Spring/summer AAA | Woodbury, MN | East-metro AAA at the new Woodbury ICE facility |
| [Green Dash / MN Thundercats](https://www.greendashhockey.com/){:target="_blank" rel="noopener"} | Spring/summer AAA | Eagan, MN | South-metro AAA program |
| [Minnesota Mallards](https://www.mnmallards.com/aaa/){:target="_blank" rel="noopener"} | Spring/summer AAA | Forest Lake, MN | North-metro AAA tied to the NAHL Mallards |
| [Team Minnesota](https://www.teammnhockeyclub.com/){:target="_blank" rel="noopener"} | Summer/fall AAA | Brooklyn Park / New Hope, MN | Exposure-focused program for national competition |
| [Kodiaks AAA](https://www.jrkodiaks.com/){:target="_blank" rel="noopener"} | Spring/summer AAA | Owatonna, MN | Southern Minnesota AAA club |
| [Northern Wings](https://www.northernwingshockey.com/){:target="_blank" rel="noopener"} | Spring/summer AAA | Hermantown, MN | Northern Minnesota's established AAA program |
| [Shattuck-St Mary's](https://www.s-sm.org/athletics/hockey-center-of-excellence){:target="_blank" rel="noopener"} | Prep / boarding | Faribault, MN | Full-time hockey boarding school; 12 USA Hockey Tier I national titles (boys) |

*Note: Minnesota's governing body was founded in 1947 as the "Minnesota Amateur Hockey Association" - acronym MAHA. That's unrelated to the modern Michigan Amateur Hockey Association that runs Michigan's AAA system, a coincidence that trips up a lot of families researching both states.*


## Why Minnesota Youth Hockey Doesn't Look Like Anywhere Else

In most strong hockey markets, the path to "elite" runs through a private club. Families pay into one of a handful of AAA organizations, the best players leave their hometown teams to join them, and the resulting league plays a long, travel-heavy season from fall through spring. That's the model in Michigan's MAHA, Massachusetts's E9 and EHF circuits, and most of Illinois, California, and the Sun Belt.

Minnesota inverted that model decades ago, and it never went back.

Minnesota Hockey itself describes the system as **community-based rather than club-based**: rinks are owned by cities and park boards, programs are run by local volunteers, and the entire competitive calendar is built around the **school calendar**, not a national club schedule.<sup><a href="#sources">†</a></sup> An independent review of the state's hockey culture put it directly: *"Minnesota youth hockey is closely tied to its schools and school districts,"* with players generally required to compete within their home district and a competitive culture noticeably calmer than AAA-heavy markets - "very little...competitive BS between parents. No yelling from the stands, just good hockey."<sup><a href="#sources">†</a></sup>

The practical effect: **the best 12-year-old in a Minnesota town is very likely playing for that town's community association**, not commuting an hour to suit up for a private organization. And the data says that's the better bet - a Minnesota Hockey study found **78% of players who stayed in their hometown program through high school graduation reached Division I hockey within three seasons, compared to just 59% of players who left for club programs early**.<sup><a href="#sources">†</a></sup>


## Layer 1: Community Associations - The Winter Foundation

**Minnesota Hockey** is the state's USA Hockey affiliate, founded in 1947 (originally the Minnesota Amateur Hockey Association). It's the **largest state governing body for hockey in the country**, organized into **13 geographic districts** (numbered 1 through 16, with several numbers retired or merged over the decades) and **more than 130 local community associations**.<sup><a href="#sources">†</a></sup> Those associations - run by your city, your park board, and a small army of volunteer parents - are where your kid will actually play through the winter.

Geography is destiny here in a very literal sense: **your home address determines your district, and your district determines which association you play for.** Here's the lay of the land:

| District | Region | Major Towns / Area | Member Associations (sample) |
|---|---|---|---|
| [District 1](https://district1.pucksystems2.com/){:target="_blank" rel="noopener"} | Minneapolis | Minneapolis | City of Lakes Titans, Langford Park, Edgcumbe, DinoMights |
| [District 2](https://www.d2hockey.org/){:target="_blank" rel="noopener"} | East Metro / North Suburbs | White Bear Lake, Stillwater, Forest Lake, Roseville | White Bear Lake, Stillwater Area, Mahtomedi, Mounds View |
| [District 3](https://www.d3hockey.org/){:target="_blank" rel="noopener"} | Northwest Metro | Maple Grove, Brooklyn Park, Hopkins, Osseo | Maple Grove, Hopkins, Robbinsdale Armstrong/Cooper, Wayzata |
| [District 4](https://www.minnesotahockey.org/page/show/88424-district-4){:target="_blank" rel="noopener"} | Southwest Minnesota | Marshall, Worthington, Fairmont, Luverne | Marshall, Worthington, Fairmont, Redwood Falls |
| [District 5](https://www.minnesotahockey.org/page/show/88425-district-5){:target="_blank" rel="noopener"} | Central Minnesota | St. Cloud, Willmar, Buffalo, Hutchinson | St. Cloud, Willmar, St. Michael-Albertville, Monticello |
| [District 6](https://www.minnesotahockey.org/page/show/88426-district-6){:target="_blank" rel="noopener"} | Southwest Metro | Edina, Minnetonka, Eden Prairie, Burnsville | Edina, Minnetonka, Eden Prairie, Chaska |
| [District 8](https://www.minnesotahockeydistrict8.com/){:target="_blank" rel="noopener"} | Southeast Metro | Eagan, Lakeville, Woodbury, Rosemount | Lakeville, Eagan Wildcats, Woodbury Predators, Rosemount Irish |
| [District 9](https://www.mndistrict9hockey.com/){:target="_blank" rel="noopener"} | Southern Minnesota | Mankato, Rochester, Owatonna, Northfield | Mankato Area, Rochester Youth Hockey, Owatonna, Northfield |
| [District 10](https://district10hockey.org/){:target="_blank" rel="noopener"} | North Metro / East Central | Andover, Anoka, Blaine, Coon Rapids | Andover Huskies, Anoka, Blaine, Champlin Park |
| [District 11](https://www.minnesotahockeydistrict11.com/){:target="_blank" rel="noopener"} | Northeast Minnesota | Duluth, Hermantown, Cloquet, Two Harbors | Duluth, Hermantown, Cloquet, Proctor |
| [District 12](https://www.d12hockey.org/){:target="_blank" rel="noopener"} | Iron Range | Virginia, Eveleth, Hibbing, Grand Rapids | Eveleth-Gilbert, Hibbing/Chisholm, Grand Rapids, International Falls |
| [District 15](https://d15.pucksystems.com/){:target="_blank" rel="noopener"} | West Central Minnesota | Brainerd, Alexandria, Moorhead, Detroit Lakes | Brainerd, Alexandria, Moorhead, Fergus Falls |
| [District 16](https://www.mnhockeyd16.com/){:target="_blank" rel="noopener"} | Northwest Minnesota | Bemidji, Crookston, Warroad, Roseau | Bemidji, Crookston, Warroad, Roseau |

*Districts current as of the 2025-26 season. Numbers 7, 13, and 14 are not currently active - the list simply runs 1-6, 8-12, then 15-16. Source: [Minnesota Hockey Districts/Associations](https://www.minnesotahockey.org/associations){:target="_blank" rel="noopener"}, plus each district's own site.*

The associations use the same USA Hockey age framework as everyone else, with one Minnesota-specific twist: **age cutoffs are tied to the school calendar.** The cutoff moved from July 1 to June 1 starting in the 2020-21 season, specifically so kids would play with their own grade rather than splitting birth-year groups across classmates.<sup><a href="#sources">†</a></sup>

| Level | Common Name | Approx. Ages | Structure |
|---|---|---|---|
| 6U | Mini-Mite | 5-6 | Introductory skill-building, no real competition |
| 8U | Mite | 7-9 | Multiple in-house levels (I, II, III) by skill and size |
| 10U | Squirt | 9-11 | Multiple team levels (A, B, C) within each association |
| 12U | Peewee | 11-13 | Multiple team levels (A, B, C); travel begins in earnest |
| 14U | Bantam | 13-15 | Multiple team levels (A, B, C); top players draw Tier I interest |
| 15U-18U | Junior Gold / HS age | 14-18 | Mostly absorbed into high school hockey for the winter |

Within each level, associations field multiple teams by ability - typically an **A** (most competitive travel), **B**, and **C/recreational** track, plus in-house "house" hockey at the youngest ages. A kid generally tries out within their own association each fall and is placed on the team that fits. **This is the layer that matters most**, and it's nearly free of the brand-shopping that defines youth hockey elsewhere - you play for where you live.

Costs at this level are dramatically lower than private AAA. Association fees vary, but they sit far below the five-figure AAA numbers you'll see below - which is part of why the system stays so broad. (For a full breakdown of what each level actually costs, see our guide to [how much youth hockey costs](/blog/2026/05/20/how-much-does-youth-hockey-cost/).)


## The Bantam Fork: Where the Paths Split

The pivotal moment in a Minnesota player's youth career comes around **Bantam (14U) and the 15U/16U age**. This is where the single community-association track branches:

- **The high school path (the default):** Most players move from their Bantam association team straight into their local **high school program** for the winter. This is the road the overwhelming majority take, and - per the data above - the one with the best Division I track record.
- **Junior hockey:** A small number of elite or late-developing players leave for junior leagues (USHL, NAHL, and tier III juniors) to chase a faster development curve and college exposure.
- **Prep/boarding:** A handful head to Shattuck-St Mary's or out-of-state prep schools (more on that below).

What you'll notice is missing: a winter-long AAA club option. In Minnesota, the 15U-18U ages that would belong to private AAA organizations in Michigan or Massachusetts are, for most players, **simply high school hockey**. The "elite" alternatives run on a different clock.


## Layer 2: Tier I - Minnesota's Fall High-Performance Leagues

So where does "AAA" live in a state that runs its winter through schools? The closest equivalent is **Tier I**, and the way Minnesota Hockey built it tells you everything about the state's priorities.

Tier I was established in **2015** for the 16U/18U (and Girls 16U/19U) age groups, then expanded in **2016** to add 14U and 15U.<sup><a href="#sources">†</a></sup> But unlike MAHA's private Tier I organizations or Massachusetts's E9 and EHF clubs, **Minnesota's Tier I teams aren't run by private organizations at all - they're built and run by Minnesota Hockey itself**, as **regional select teams drawn from the state's existing districts.**

The teams carry names tied to their home regions rather than corporate sponsors - **Loons**, **Walleye**, **Polars**, **Lakers**, **Moose**, **Green Giants**, **Voyageurs**, **Grey Ducks**, and **Blue Ox** among them - and they're staffed by pulling the top players out of their home districts for a concentrated run of high-level competition.<sup><a href="#sources">†</a></sup>

And here's the detail that separates Minnesota from every AAA-heavy state in the country: **the entire Tier I season happens in the fall.** Tryouts run roughly **June through July**, and the league plays a compact schedule of 15-20 games - including the Minnesota Showcase and playoffs - that **wraps up before the high school season begins**, specifically so players can return to their hometown teams for the winter.<sup><a href="#sources">†</a></sup> Teams compete under USA Hockey rules and remain eligible for the USA Hockey Tier I National Championship, the same pipeline MAHA and E9 programs chase. Minnesota just runs its version on a different clock.

If your player is at that level, Tier I tryouts in June-July are worth attending - but understand it's a **two-month fall commitment, not a winter-long replacement for high school hockey.**


## Layer 3: Spring & Summer AAA - Where Minnesota Looks Like Everyone Else

Once the high school tournament ends in March and the thaw sets in, Minnesota's calendar shifts into something far more familiar to families from AAA-heavy states: a **private-club, tournament-driven, MyHockeyRankings-tracked spring and summer AAA scene.**

This is where the state's most ambitious players go to chase exposure, play AAA-caliber competition from other states, and build the resume college programs and junior leagues look for. The competition is organized through leagues like the **Youth Elite League (YEL)** and a dense **tournament circuit** (the PlayHockey-run Spring Stampede, Summer Round Up, and others), with teams rated nationally on **MyHockeyRankings (MHR)** just like AAA everywhere else.

Several well-established brands anchor that scene:

### Minnesota Made / Minnesota Machine
The state's best-known spring/summer AAA name traces directly to the **Minnesota 88s**, a legendary group of players born in 1988 who developed together from age 8 through their draft years. **Eight of the 88s were eventually drafted by NHL teams** - including Erik Johnson, Kyle Okposo, Jamie McBain, and Peter Mueller.<sup><a href="#sources">†</a></sup> The [Minnesota Made](https://www.mnmadeaaahockey.com/){:target="_blank" rel="noopener"} organization (and the Machine name, born from a standout 1996 squad) carries that model forward today.

### Minnesota Blades
Founded in **1989 as the Minnesota Stars**, the [Blades](https://www.minnesotablades.com/){:target="_blank" rel="noopener"} are one of the longest-running AAA brands in the state, fielding teams from Mites through Midgets. Their **11U AAA squad opened the 2025 spring season 6-0-0 with a 99.40 MHR rating** - one of the strongest youth ratings any Minnesota AAA team posted that season, and a number that would hold its own in any AAA state.<sup><a href="#sources">†</a></sup>

### Minnesota Steel
Based in the Southwest Metro (Chaska/Waconia), [Minnesota Steel](https://mnsteelhockey.com/){:target="_blank" rel="noopener"} is a **member of the Youth Elite League (YEL)**, fielding boys AAA teams from the 2011 birth year through 2017/2018 plus a full girls program from U8 through U19. The club has expanded toward the St. Michael-Albertville area to serve the fast-growing northwest suburbs.

### Minnesota Athletic Club (MAC)
An east-metro program anchored at the new **Woodbury ICE** facility (opened fall 2025), [the MAC](https://www.mnathleticclub.com/program/club-hockey-aaa/4812){:target="_blank" rel="noopener"} runs AAA across the Woodbury/Cottage Grove side of the metro - part of how the AAA scene has filled in geographically over the last decade.

### Green Dash / MN Thundercats, Mallards, Team Minnesota & Kodiaks
The scene runs deeper than the big names. [Green Dash Hockey](https://www.greendashhockey.com/){:target="_blank" rel="noopener"} (MN Thundercats) serves the south metro out of Eagan; the [Minnesota Mallards](https://www.mnmallards.com/aaa/){:target="_blank" rel="noopener"} run a north-metro AAA program tied to their NAHL junior club in Forest Lake; [Team Minnesota](https://www.teammnhockeyclub.com/){:target="_blank" rel="noopener"} focuses on exposing players to national competition; and the [Kodiaks](https://www.jrkodiaks.com/){:target="_blank" rel="noopener"}, founded in Colorado in 1999, relocated to Owatonna to serve southern Minnesota. Up north, the [Northern Wings](https://www.northernwingshockey.com/){:target="_blank" rel="noopener"} give Iron Range and Duluth-area families an AAA option without the multi-hour drive to the Twin Cities.

### Shattuck-St Mary's: The Year-Round Outlier
No conversation about Minnesota's elite youth hockey is complete without **Shattuck-St Mary's School** in Faribault - a full-time hockey boarding school that runs AAA and prep programs essentially year-round, outside the high school calendar entirely. The boys program has won **12 USA Hockey Tier I national championships**, and alumni include **Jonathan Toews**, **Zach Parise**, and **Nathan MacKinnon**.<sup><a href="#sources">†</a></sup> Shattuck is the one corner of Minnesota hockey that operates almost exactly like an elite program anywhere else: private, national in scope, and unattached to a hometown.

**A note on cost:** spring/summer AAA is where Minnesota's prices start to resemble the national AAA market - club fees, tournament travel, and extra ice add up quickly, often into the thousands per season on top of your association and high school costs. It's **optional, not mandatory.** It exists for families who want extra development and exposure, not as the only route to a serious hockey future. (Again, our [youth hockey cost guide](/blog/2026/05/20/how-much-does-youth-hockey-cost/) breaks the numbers down by level.)


## Girls Youth Hockey in Minnesota

Girls hockey runs on the same three-layer model - community associations in the winter, Tier I in the fall, AAA around the edges - and Minnesota has been a national leader at every level for decades.

The **Girls Tier I structure mirrors the boys' system**: regional select teams (Loons, Walleye, Lakers, Moose, Green Giants, Blue Ox, Grey Ducks among them) competing in **fall leagues at the 14U and 16U levels**, run by Minnesota Hockey rather than private clubs.<sup><a href="#sources">†</a></sup> On the club side, programs like **Minnesota Steel** field full girls AAA tracks from U8 through U19, and the spring/summer circuit includes girls divisions alongside the boys.

From there, the path leads into Minnesota's powerhouse high school girls programs - Edina, Warroad, Blake, Breck, Hill-Murray - which we cover in the [high school hockey guide](/blog/2026/06/08/minnesota-high-school-hockey-explained-parent-guide/).


## Where It All Leads: High School and Beyond

Every layer in this guide ultimately feeds the same destination: **Minnesota high school hockey**, and the state tournament that has made it famous. The community associations develop the base, Tier I sharpens the top of each age group in the fall, and the spring/summer AAA scene adds exposure - but the winter belongs to the high schools, and that's where these players end up.

It's worth restating the payoff, because it's the whole argument for how Minnesota does this: **311 NHL players have been born in Minnesota - nearly 100 more than Massachusetts, the next-closest state.**<sup><a href="#sources">†</a></sup> The University of Minnesota alone has produced four Hobey Baker Award winners. The "backwards" system - community-based, school-tied, with a fall-only Tier I and an off-season AAA scene - produces more NHL talent than any state in America, by a wide margin. That's not a coincidence. It's the point.

For the famous programs, rankings, and championship history, [read the companion high school hockey guide.](/blog/2026/06/08/minnesota-high-school-hockey-explained-parent-guide/)


## What This Means If You're New to Minnesota Hockey

If you're moving here from a club-driven market, here's the practical version:

- **Start with your community association.** It's not a fallback - it's the path. The best players in the state are mostly playing locally through the winter, and that's where real development happens.
- **Don't go shopping for a winter AAA brand.** There isn't one in the way you're used to. Your association and, later, your high school *are* the competitive track.
- **Tier I tryouts (June-July) are worth it if your player is at that level** - but it's a two-month fall commitment, not a winter-long club.
- **Spring/summer AAA is optional.** Treat it as supplemental development and exposure, not a requirement.
- **Geography still shapes your options**, just differently. Your Minnesota Hockey district sets your association and your Tier I select team; your school sets your high school path.
- **The "AAA or bust" mindset doesn't apply here** - and Minnesota's results suggest it never had to.


## How Video Analysis Fits Into Minnesota's Model

Here's something Minnesota's community-based system has in common with every other hockey market: the coaches doing the development work - association volunteers, Tier I select-team staffs, AAA club coaches - are almost never backed by a video department or a broadcast-level production budget. They're parents, teachers, and volunteers trying to give kids structured, specific feedback with the time and tools they actually have.

That's exactly the gap video analysis closes. A coach who can clip a shift, mark the moment a gap collapsed, and share it with a player in minutes gives that kid something concrete to work on before the next practice - without a production crew or an enterprise platform.

At Scout Elite, we built our [video analysis and player development tools](/blog/2026/05/01/scout-elite-performance-coaching-tools/) for exactly this kind of coaching: high-volume, locally run, and built on relationships rather than budgets. Whether you're running film for your association's Bantam team, prepping a Tier I tryout group for a fall run, or just helping your kid see what the coach is talking about, [the tools are designed for that context](/blog/2026/05/01/scout-elite-performance-coaching-tools/).

<div style="margin: 1.5em 0; text-align: center;">
  {% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}
</div>


## Minnesota Youth Hockey at a Glance

| Layer | Season | Who Runs It | Notes |
|---|---|---|---|
| Community Association (House / Travel) | October - March | 130+ local associations under Minnesota Hockey | The foundation of the system; A/B/C team levels Mites through Bantams |
| Tier I High Performance | Fall (roughly Aug - Nov) | Minnesota Hockey (district select teams) | 14U-18U boys and girls; tryouts June-July; ends before high school season |
| Spring / Summer AAA | April - August | Private clubs (Minnesota Made/Machine, Blades, Steel, MAC, and others) | Tournament and exposure-driven; YEL + PlayHockey circuit; MHR-rated; supplemental |
| Prep / Boarding | Nearly year-round | Private schools (Shattuck-St Mary's) | The closest thing in Minnesota to the "national AAA" model used elsewhere |
| High School (the destination) | November - March | Individual high schools (MSHSL) | Where it all leads - see the [high school guide](/blog/2026/06/08/minnesota-high-school-hockey-explained-parent-guide/) |

*Data current as of the 2025-26 season. Sources: [Minnesota Hockey](https://www.minnesotahockey.org/){:target="_blank" rel="noopener"} · [MyHockeyRankings](https://myhockeyrankings.com/){:target="_blank" rel="noopener"}*

---

If you found this guide useful - or if there's a club I missed or a detail I got wrong - reach out. Minnesota youth hockey is a culture unlike anything else in American sports, and it deserves to be understood on its own terms rather than measured against AAA states it was never trying to copy.

And if you're a hockey family who just moved here from a club-driven market: welcome to the State of Hockey. Get to know your association. You're about to see what happens when an entire state builds its hockey around hometown teams instead of private brands - and somehow still produces more NHL players than anywhere else in the country.

*-- Coach Scott*

---

<a name="sources"></a>

## Sources

1. Minnesota Hockey, ["2025-26 Age Charts and Participation Levels."](https://www.minnesotahockey.org/page/show/85059-age-charts-and-participation-levels){:target="_blank" rel="noopener"}

2. Minnesota Hockey, ["Districts/Associations."](https://www.minnesotahockey.org/associations){:target="_blank" rel="noopener"} District and member-association structure (13 active districts numbered 1-16, 130+ associations). Individual district sites consulted for regional rosters: [District 1](https://district1.pucksystems2.com/){:target="_blank" rel="noopener"}, [District 2](https://www.d2hockey.org/){:target="_blank" rel="noopener"}, [District 3](https://www.d3hockey.org/){:target="_blank" rel="noopener"}, [District 8](https://www.minnesotahockeydistrict8.com/){:target="_blank" rel="noopener"}, [District 9](https://www.mndistrict9hockey.com/){:target="_blank" rel="noopener"}, [District 10](https://district10hockey.org/){:target="_blank" rel="noopener"}, [District 11](https://www.minnesotahockeydistrict11.com/){:target="_blank" rel="noopener"}, [District 12](https://www.d12hockey.org/){:target="_blank" rel="noopener"}, [District 15](https://d15.pucksystems.com/){:target="_blank" rel="noopener"}, and [District 16](https://www.mnhockeyd16.com/){:target="_blank" rel="noopener"}.

3. Wikipedia, ["Minnesota Hockey."](https://en.wikipedia.org/wiki/Minnesota_Hockey){:target="_blank" rel="noopener"} Founding history, district structure, and USA Hockey affiliation.

4. MyHockeyRankings, ["How and Why Minnesota Hockey Is Different."](https://myhockeyrankings.com/news.php?b=319){:target="_blank" rel="noopener"} Independent national ratings organization's analysis of Minnesota's school-district-based structure and competitive culture.

5. Golden Stick Hockey, ["Other States Train Hockey Players. Minnesota Builds Them."](https://www.goldenstickhockey.com/post/minnesota-youth-hockey-development){:target="_blank" rel="noopener"} Source for the 78%-vs-59% Division I conversion data.

6. Minnesota Hockey, ["Fall Tier I High Performance Leagues."](https://www.minnesotahockey.org/tier1){:target="_blank" rel="noopener"} Structure, timing, and district-select-team format of Minnesota's Tier I program.

7. Minnesota Hockey, ["Frequently Asked Questions on Tier I."](https://www.minnesotahockey.org/page/show/2429406-frequently-asked-questions-on-tier-i-){:target="_blank" rel="noopener"}

8. Minnesota Hockey, ["Youth Tier I 14U"](https://www.minnesotahockey.org/page/show/2429367-youth-tier-i-14u){:target="_blank" rel="noopener"} and ["Girls Tier I 14U."](https://www.minnesotahockey.org/page/show/2429371-girls-tier-i-14u){:target="_blank" rel="noopener"} District select team names (Loons, Walleye, Polars, Lakers, Moose, Green Giants, Voyageurs, Grey Ducks, Blue Ox).

9. Minnesota Made AAA Hockey, ["About Us"](https://www.mnmadeaaahockey.com/aboutus){:target="_blank" rel="noopener"} and Minnesota Machine Hockey Club, ["History."](http://machinehockey.pointstreaksites.com/view/minnesotamachine/history){:target="_blank" rel="noopener"} Origin of the "Minnesota 88s" and their NHL draft alumni.

10. The Minnesota Blades AAA Hockey Club, ["Home."](https://www.minnesotablades.com/){:target="_blank" rel="noopener"} Club history (founded 1989 as the Minnesota Stars) and 2025 11U AAA rating/record via MyHockeyRankings.

11. Minnesota Steel Hockey Club, ["AAA Program."](https://mnsteelhockey.com/){:target="_blank" rel="noopener"} Youth Elite League membership, boys and girls age groups.

12. Minnesota Athletic Club, ["Club Hockey AAA."](https://www.mnathleticclub.com/program/club-hockey-aaa/4812){:target="_blank" rel="noopener"} Woodbury ICE facility and east-metro venues.

13. Green Dash Hockey (MN Thundercats), [official site](https://www.greendashhockey.com/){:target="_blank" rel="noopener"}; Minnesota Mallards, ["AAA Hockey"](https://www.mnmallards.com/aaa/){:target="_blank" rel="noopener"}; Team Minnesota Hockey Club, [official site](https://www.teammnhockeyclub.com/){:target="_blank" rel="noopener"}; Kodiaks AAA Hockey Club, ["About Us."](https://www.jrkodiaks.com/aboutus){:target="_blank" rel="noopener"}

14. Minnesota Northern Wings AAA Hockey, [official site.](https://www.northernwingshockey.com/){:target="_blank" rel="noopener"}

15. Shattuck-St Mary's School, ["Boys Prep Hockey"](https://www.s-sm.org/athletics/hockey-center-of-excellence/boys-prep-hockey){:target="_blank" rel="noopener"} and Wikipedia, ["Shattuck-Saint Mary's School."](https://en.wikipedia.org/wiki/Shattuck-Saint_Mary%27s_School){:target="_blank" rel="noopener"} National championship totals and notable alumni.

16. PlayHockey.com, ["Events."](https://playhockey.com/events){:target="_blank" rel="noopener"} Spring/summer AAA tournament circuit (Spring Stampede, Summer Round Up).

17. 1390 Granite City Sports, ["Minnesota's Hockey Legacy Shines With 311 NHL Players Born In The State."](https://1390granitecitysports.com/hockey-history-minnesota/){:target="_blank" rel="noopener"} NHL birthplace data.

18. USA Hockey, ["10 Years Ago Today: USA Hockey Approves American Development Model."](https://www.usahockey.com/news_article/show/986127){:target="_blank" rel="noopener"} Background on the ADM framework that Minnesota Hockey adapted into its community-based model.
