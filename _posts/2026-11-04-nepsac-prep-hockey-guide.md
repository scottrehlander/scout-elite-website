---
layout: post
display_title: "NEPSAC Hockey: Every New England Prep School Team, Mapped"
title: "New England Prep School Hockey: Every NEPSAC School, Mapped"
description: "All 85 NEPSAC prep and boarding school hockey teams, mapped and listed by state: which leagues take postgraduates, how the Elite 8 is picked, and who wins."
date: 2026-11-04
last_modified_at: 2026-11-04
categories: [insights]
tags: [NEPSAC hockey, prep school hockey, New England prep hockey, boarding school hockey, ISL hockey, Founders League, Housatonic League, Lakes Region League, Holt Conference, FAA hockey, postgraduate year, Elite 8, girls hockey, boys hockey, youth hockey parent guide]
author: "Coach Scott"
excerpt: "Prep hockey is not one league. It is 85 schools in about ten leagues with different rules, and one of those rules decides how old the kid across from yours is. Every NEPSAC school mapped, plus how the playoffs actually get picked."
image:
  path: /img/blog/nepsac-prep-hockey-guide.jpg
  alt: "NEPSAC hockey guide: the three boys' prep brackets, Elite 8, Large School and Small School, with their 2025-26 champions over rink line art"
permalink: /blog/nepsac-prep-hockey-guide/
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

When families start talking about prep school, they talk about "prep hockey" as if it were one thing. It is not. It is 85 schools across about ten leagues, from Maine to Pennsylvania with a few in Canada, and the leagues do not all play by the same rules. One of those rules decides whether the oldest player on the other bench is 17 or 19.

This is the page for figuring out which part of prep hockey a school actually sits in, and what that means for your kid.

If you are here for the ISL specifically, the [ISL guide](/blog/isl-prep-school-hockey-guide/) goes school by school through all 16. This page is the layer above it.

> **When this was written.** Researched in November 2026, at the start of the 2026-27 season. Every result, record and champion on this page is from the **2025-26 season or earlier**. Leagues, memberships and Large/Small classifications are for **2026-27**, as published by NEPSAC and the leagues in October and November 2026. Sources are listed at the end.

## Prep Hockey in 60 Seconds

**NEPSAC** (the New England Preparatory School Athletic Council) is not a league you play a regular season in. It is the body that sets eligibility rules for its member schools and runs the championships.<sup><a href="#sources">1</a></sup>

The regular season happens in the **leagues**: the [ISL](https://www.islsports.org/boys-ice-hockey/){:target="_blank" rel="noopener"}, the [Founders](https://thefoundersleague.org/){:target="_blank" rel="noopener"} and [Housatonic](https://ushr.com/neprep/standings/2026/housatonic){:target="_blank" rel="noopener"} schools, the [Lakes Region](https://ushr.com/neprep/standings/2026/lakes-region){:target="_blank" rel="noopener"}, the [Holt](https://ushr.com/neprep/standings/2026/holt-conference){:target="_blank" rel="noopener"}, the [FAA](https://www.faasports.org/sports/hockey-boys){:target="_blank" rel="noopener"}, the [Two Nations Prep](https://ushr.com/neprep/standings/2026/two-nations-prep){:target="_blank" rel="noopener"} league, and a large group of independents that schedule on their own. Your league is your regular season. NEPSAC is your postseason.

The ISL, the Founders League and the FAA run their own websites, and those links go there. We could not find an official site for the Housatonic, Lakes Region, Holt or Two Nations Prep leagues (NEPSAC's own league directory lists none for the Lakes Region), so those links go to each league's standings on U.S. Hockey Report.<sup><a href="#sources">1,12</a></sup>

Three things about that structure matter more than anything else on this page:

**1. The leagues set different rules on postgraduates.** The ISL bans them. Almost every other league publishes no rule at all, which leaves NEPSAC's age limit as the only written one. More on that below, because it is the part most families learn late.

**2. Your bracket is decided by enrollment, and it changes.** NEPSAC splits its boys' schools into Large and Small every fall by boys' enrollment. A school can win the Large bracket one March and be a Small school the next.

**3. Not every school can reach the NEPSAC playoffs.** Thirteen schools on the map are NEPSAC *associate* members (11 of them outside New England). They play NEPSAC teams all season but are not eligible for the NEPSAC tournaments. And as of 2026-27, the FAA's boys' teams are not on NEPSAC's boys' tournament list either.<sup><a href="#sources">5,6</a></sup>

## The Map

Every school with a boys' or girls' varsity prep team in 2026-27. The map opens on all 85 schools, colored by boys' league, with girls-only schools in their own color. **Switch to "Girls"** to see the 66 schools with a girls' varsity team, colored by girls' league. Click any school for both leagues, whether it boards, and whether it is a full NEPSAC member. Use the layer control (top right) to show one league at a time.

<div id="nepsac-view" role="group" aria-label="Map view" style="display:flex;gap:8px;flex-wrap:wrap;margin:1.5em 0 0.6em">
	<button type="button" data-view="boys" aria-pressed="true" style="padding:0.45em 1em;border-radius:6px;border:1px solid #007acc;background:#007acc;color:#fff;font-weight:600;cursor:pointer">Boys</button>
	<button type="button" data-view="girls" aria-pressed="false" style="padding:0.45em 1em;border-radius:6px;border:1px solid #007acc;background:transparent;color:inherit;font-weight:600;cursor:pointer">Girls</button>
</div>
<div id="nepsac-map" style="height: 600px; width: 100%; border-radius: 8px; margin: 0 0 1.5em; z-index: 1;"></div>

<script>
(function() {
	var map = L.map('nepsac-map').setView([42.6, -72.2], 7);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 13
	}).addTo(map);

	// [lat, lng, boys' league (map color), girls' league (null = no girls' varsity), name, town, popup note]
	var S = [
		[42.406, -71.1826, "ISL Keller", null, "Belmont Hill", "Belmont, MA", "Boys: ISL Keller. Girls: no girls varsity.<br>5-day boarding and day, boys. NEPSAC member."],
		[42.7501, -70.9023, "ISL Keller", "ISL", "Governor&#x27;s", "Byfield, MA", "Boys: ISL Keller. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.6033, -71.5643, "ISL Keller", "ISL", "Lawrence Academy", "Groton, MA", "Boys: ISL Keller. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.254, -71.0712, "ISL Keller", "ISL", "Milton", "Milton, MA", "Boys: ISL Keller. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.2595, -71.1839, "ISL Keller", "ISL", "Noble &amp; Greenough", "Dedham, MA", "Boys: ISL Keller. Girls: ISL.<br>5-day boarding and day, coed. NEPSAC member."],
		[42.2694, -71.2067, "ISL Keller", null, "St. Sebastian&#x27;s", "Needham, MA", "Boys: ISL Keller. Girls: no girls varsity.<br>Day, boys. NEPSAC member."],
		[41.7088, -70.7677, "ISL Keller", "ISL", "Tabor", "Marion, MA", "Boys: ISL Keller. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.2076, -71.0066, "ISL Keller", "ISL", "Thayer", "Braintree, MA", "Boys: ISL Keller. Girls: ISL.<br>Day, coed. NEPSAC member."],
		[42.3712, -71.1356, "ISL Eberhart", "ISL", "BB&amp;N", "Cambridge, MA", "Boys: ISL Eberhart. Girls: ISL.<br>Day, coed. NEPSAC member."],
		[42.7075, -71.0883, "ISL Eberhart", "ISL", "Brooks", "North Andover, MA", "Boys: ISL Eberhart. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.5931, -71.5865, "ISL Eberhart", "ISL", "Groton", "Groton, MA", "Boys: ISL Eberhart. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.4956, -71.3688, "ISL Eberhart", "ISL", "Middlesex", "Concord, MA", "Boys: ISL Eberhart. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.3235, -71.3254, "ISL Eberhart", "ISL", "Rivers", "Weston, MA", "Boys: ISL Eberhart. Girls: ISL.<br>Day, coed. NEPSAC member."],
		[42.276, -71.1566, "ISL Eberhart", null, "Roxbury Latin", "West Roxbury, MA", "Boys: ISL Eberhart. Girls: no girls varsity.<br>Day, boys. NEPSAC member."],
		[41.4919, -71.2736, "ISL Eberhart", "ISL", "St. George&#x27;s", "Middletown, RI", "Boys: ISL Eberhart. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[42.3095, -71.5298, "ISL Eberhart", "ISL", "St. Mark&#x27;s", "Southborough, MA", "Boys: ISL Eberhart. Girls: ISL.<br>Boarding and day, coed. NEPSAC member."],
		[41.7804, -72.835, "Housatonic", null, "Avon Old Farms", "Avon, CT", "Boys: Founders League school, plays Housatonic hockey. Girls: no girls varsity.<br>Boarding and day, boys. NEPSAC member."],
		[41.4584, -72.8013, "Housatonic", "Housatonic", "Choate", "Wallingford, CT", "Boys: Founders League school, plays Housatonic hockey. Girls: Housatonic.<br>Boarding and day, coed. NEPSAC member."],
		[42.5438, -72.6093, "Housatonic", "Housatonic", "Deerfield", "Deerfield, MA", "Boys: Housatonic. Girls: Housatonic.<br>Boarding and day, coed. NEPSAC member."],
		[41.9417, -73.4405, "Housatonic", "Housatonic", "Hotchkiss", "Lakeville, CT", "Boys: Founders League school, plays Housatonic hockey. Girls: Housatonic.<br>Boarding and day, coed. NEPSAC member."],
		[41.7273, -73.4866, "Housatonic", "Housatonic", "Kent", "Kent, CT", "Boys: Founders League school, plays Housatonic hockey. Girls: Housatonic.<br>Boarding and day, coed. NEPSAC member."],
		[41.8407, -72.6393, "Housatonic", "Housatonic", "Loomis Chaffee", "Windsor, CT", "Boys: Founders League school, plays Housatonic hockey. Girls: Housatonic.<br>Boarding and day, coed. NEPSAC member."],
		[42.0029, -73.392, "Housatonic", null, "Salisbury", "Salisbury, CT", "Boys: Housatonic. Girls: no girls varsity.<br>Boarding and day, boys. NEPSAC member."],
		[41.6063, -73.1264, "Housatonic", "Housatonic", "Taft", "Watertown, CT", "Boys: Founders League school, plays Housatonic hockey. Girls: Housatonic.<br>Boarding and day, coed. NEPSAC member."],
		[41.572, -73.5898, "Housatonic", null, "Trinity-Pawling", "Pawling, NY", "Boys: Founders League school, plays Housatonic hockey. Girls: no girls varsity.<br>Boarding and day, boys. NEPSAC member."],
		[41.892, -72.7955, "Housatonic", "Housatonic", "Westminster", "Simsbury, CT", "Boys: Founders League school, plays Housatonic hockey. Girls: Housatonic.<br>Boarding and day, coed. NEPSAC member."],
		[43.5807, -71.2071, "Lakes Region", "Lakes Region", "Brewster Academy", "Wolfeboro, NH", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding and day, coed. NEPSAC member."],
		[43.7672, -71.6667, "Lakes Region", "Lakes Region", "Holderness", "Holderness, NH", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding and day, coed. NEPSAC member."],
		[43.5448, -72.2554, "Lakes Region", "Lakes Region", "Kimball Union", "Meriden, NH", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding and day, coed. NEPSAC member."],
		[43.6074, -71.6531, "Lakes Region", "Lakes Region", "New Hampton", "New Hampton, NH", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding and day, coed. NEPSAC member."],
		[43.4509, -71.8242, "Lakes Region", "Lakes Region", "Proctor", "Andover, NH", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding and day, coed. NEPSAC member."],
		[43.1897, -71.5788, "Lakes Region", "Lakes Region", "St. Paul&#x27;s", "Concord, NH", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding, coed. NEPSAC member."],
		[43.4462, -71.5882, "Lakes Region", "Lakes Region", "Tilton", "Tilton, NH", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding and day, coed. NEPSAC member."],
		[43.1462, -72.5127, "Lakes Region", "Lakes Region", "Vermont Academy", "Saxtons River, VT", "Boys: Lakes Region. Girls: Lakes Region.<br>Boarding and day, coed. NEPSAC member."],
		[43.2304, -70.8019, "Holt", "Independent", "Berwick", "South Berwick, ME", "Boys: Holt. Girls: Independent.<br>5-day and 7-day boarding and day, coed. NEPSAC member."],
		[44.201, -70.41, "Holt", "Holt", "Hebron", "Hebron, ME", "Boys: Holt. Girls: Holt.<br>Boarding and day, coed. NEPSAC member."],
		[44.4012, -70.0051, "Holt", "Vaillancourt", "Kents Hill", "Readfield, ME", "Boys: Holt. Girls: Vaillancourt.<br>Boarding and day, coed. NEPSAC member."],
		[42.6401, -70.8824, "Holt", "Holt", "Pingree", "South Hamilton, MA", "Boys: Holt. Girls: Holt.<br>Day, coed. NEPSAC member."],
		[41.6023, -71.2709, "Holt", "Independent", "Portsmouth Abbey", "Portsmouth, RI", "Boys: Holt. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[42.2528, -71.791, "Holt", "Vaillancourt", "Worcester Academy", "Worcester, MA", "Boys: Holt. Girls: Vaillancourt.<br>Boarding and day, coed. NEPSAC member."],
		[43.7985, -70.1863, "Holt", "Vaillancourt", "North Yarmouth Academy", "Yarmouth, ME", "Boys: Holt. Girls: Vaillancourt.<br>Boarding and day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[41.7593, -72.735, "FAA", null, "Kingswood Oxford", "West Hartford, CT", "Boys: FAA. Girls: no girls varsity.<br>Day, coed. NEPSAC member."],
		[41.1923, -73.4965, "FAA", null, "St. Luke&#x27;s", "New Canaan, CT", "Boys: FAA. Girls: no girls varsity.<br>Day, coed. NEPSAC member."],
		[41.05, -73.6147, "FAA", "FAA", "Greenwich Country Day", "Greenwich, CT", "Boys: FAA. Girls: FAA.<br>Day, coed. NEPSAC member."],
		[40.9895, -73.6805, "FAA", "FAA", "Rye Country Day", "Rye, NY", "Boys: FAA. Girls: FAA.<br>Day, coed. NEPSAC member."],
		[41.1108, -73.5339, "FAA", "FAA", "King School", "Stamford, CT", "Boys: FAA. Girls: FAA.<br>Day, coed. NEPSAC member."],
		[41.3418, -72.9139, "FAA", null, "Hamden Hall Country Day School", "Hamden, CT", "Boys: FAA. Girls: no girls varsity.<br>Day, coed. NEPSAC member."],
		[41.2578, -73.6644, "FAA", "Outside prep leagues", "Harvey School", "Katonah, NY", "Boys: FAA. Girls: Independent (outside prep leagues).<br>Day and 5-day boarding (grades 9-12), coed. NEPSAC member."],
		[42.646, -73.7873, "Two Nations Prep", null, "Albany Academy", "Albany, NY", "Boys: Two Nations Prep. Girls: no girls varsity.<br>Day, coed. NEPSAC member."],
		[45.3726, -71.8391, "Two Nations Prep", null, "Bishop&#x27;s College School", "Sherbrooke, QC", "Boys: Two Nations Prep. Girls: no girls varsity.<br>Boarding and day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[40.2454, -75.6341, "Two Nations Prep", "Independent", "The Hill School", "Pottstown, PA", "Boys: Two Nations Prep. Girls: Independent.<br>Boarding and day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[40.2974, -74.7233, "Two Nations Prep", "Independent", "Lawrenceville", "Lawrenceville, NJ", "Boys: Two Nations Prep. Girls: Independent.<br>Boarding and day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[42.9423, -78.8575, "Two Nations Prep", "Outside prep leagues", "Nichols", "Buffalo, NY", "Boys: Two Nations Prep. Girls: Independent (outside prep leagues).<br>Day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[43.1531, -79.2569, "Two Nations Prep", "Outside prep leagues", "Ridley College", "St. Catharines, ON", "Boys: Two Nations Prep. Girls: Independent (outside prep leagues).<br>Boarding and day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[45.0126, -72.0923, "Two Nations Prep", "Independent", "Stanstead College", "Stanstead, QC", "Boys: Two Nations Prep. Girls: Independent.<br>Boarding and day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[43.6929, -79.4038, "Two Nations Prep", null, "Upper Canada College", "Toronto, ON", "Boys: Two Nations Prep. Girls: no girls varsity.<br>Boarding and day, boys. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[42.6518, -71.1294, "Independent", "Independent", "Andover", "Andover, MA", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[42.5315, -71.1275, "Independent", "Vaillancourt", "Austin Prep", "Reading, MA", "Boys: Independent. Girls: Vaillancourt.<br>Day, coed. NEPSAC member."],
		[42.1165, -73.4159, "Independent", "Independent", "Berkshire", "Sheffield, MA", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[41.0369, -73.6371, "Independent", null, "Brunswick", "Greenwich, CT", "Boys: Independent. Girls: no girls varsity.<br>Day, boys. NEPSAC member."],
		[41.5881, -73.4129, "Independent", "Independent", "Canterbury", "New Milford, CT", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[42.1717, -71.014, "Independent", null, "CATS Academy Boston", "Braintree, MA", "Boys: Independent. Girls: no girls varsity.<br>Boarding and day, coed. NEPSAC member."],
		[42.6328, -71.9135, "Independent", "Independent", "Cushing", "Ashburnham, MA", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[42.3075, -71.1391, "Independent", "Independent", "Dexter Southfield", "Brookline, MA", "Boys: Independent. Girls: Independent.<br>Day, coed. NEPSAC member."],
		[42.9777, -70.9412, "Independent", "Independent", "Exeter", "Exeter, NH", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[41.6293, -73.3097, "Independent", "Independent", "Frederick Gunn School", "Washington, CT", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[42.8571, -73.3439, "Independent", "Independent", "Hoosac", "Hoosick, NY", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[41.8451, -73.618, "Independent", "Independent", "Millbrook", "Millbrook, NY", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[41.9956, -71.5016, "Independent", "Independent", "Mount St. Charles", "Woonsocket, RI", "Boys: Independent. Girls: Independent.<br>Day, coed. NEPSAC member."],
		[42.667, -72.487, "Independent", "Vaillancourt", "Northfield Mt. Hermon", "Gill, MA", "Boys: Independent. Girls: Vaillancourt.<br>Boarding and day, coed. NEPSAC member."],
		[41.885, -71.9678, "Independent", "Vaillancourt", "Pomfret", "Pomfret, CT", "Boys: Independent. Girls: Vaillancourt.<br>Boarding and day, coed. NEPSAC member."],
		[41.6793, -73.4811, "Independent", null, "South Kent", "South Kent, CT", "Boys: Independent. Girls: no girls varsity.<br>Boarding and day, boys. NEPSAC member."],
		[42.1253, -72.4382, "Independent", null, "Wilbraham &amp; Monson", "Wilbraham, MA", "Boys: Independent. Girls: no girls varsity.<br>7-day and 5-day boarding and day, coed. NEPSAC member."],
		[42.2649, -72.6742, "Independent", "Independent", "Williston Northampton", "Easthampton, MA", "Boys: Independent. Girls: Independent.<br>Boarding and day, coed. NEPSAC member."],
		[42.6749, -72.0401, "Independent", "Outside prep leagues", "Winchendon", "Winchendon, MA", "Boys: Independent. Girls: Independent (outside prep leagues).<br>Boarding and day, coed. NEPSAC member."],
		[41.8337, -71.3982, "Independent", "Outside prep leagues", "Moses Brown", "Providence, RI", "Boys: Independent. Girls: Independent (outside prep leagues).<br>Day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[46.8307, -71.3149, "Independent", null, "Académie Saint-Louis", "Quebec City, QC", "Boys: Independent. Girls: no girls varsity.<br>Day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[41.2248, -86.4028, "Independent", "Outside prep leagues", "Culver Academies", "Culver, IN", "Boys: Independent. Girls: Independent (outside prep leagues).<br>Boarding, coordinate. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[44.011, -79.4773, "Independent", null, "St. Andrew&#x27;s College", "Aurora, ON", "Boys: Independent. Girls: no girls varsity.<br>Boarding and day, boys. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[41.2647, -75.8973, "Independent", null, "Wyoming Seminary", "Kingston, PA", "Boys: Independent. Girls: no girls varsity.<br>Boarding and day, coed. NEPSAC associate member (not eligible for NEPSAC tournaments)."],
		[41.0422, -73.6274, "Girls only", "FAA", "Greenwich Academy", "Greenwich, CT", "Girls&#x27; school (no boys&#x27; team). Girls: FAA.<br>Day, girls. NEPSAC member."],
		[42.3457, -71.1919, "Girls only", "Independent", "Newton Country Day", "Newton, MA", "Girls&#x27; school (no boys&#x27; team). Girls: Independent.<br>Day, girls. NEPSAC member."],
		[41.0644, -73.6917, "Girls only", "FAA", "Sacred Heart Greenwich", "Greenwich, CT", "Girls&#x27; school (no boys&#x27; team). Girls: FAA.<br>Day, girls. NEPSAC member."],
		[42.3403, -71.107, "Girls only", "Independent", "Winsor", "Boston, MA", "Girls&#x27; school (no boys&#x27; team). Girls: Independent.<br>Day, girls. NEPSAC member."],
		[42.2909, -71.2885, "Girls only", "Independent", "Dana Hall", "Wellesley, MA", "Girls&#x27; school (no boys&#x27; team). Girls: Independent.<br>Boarding and day, girls. NEPSAC member."]
	];
	var VIEWS = {
		boys: {key: 2, title: "Boys' league", tag: 'boys', labels: {'Girls only': 'Girls-only schools'}, colors: {"ISL Keller": "#a51c30", "ISL Eberhart": "#0b5cab", "Housatonic": "#2b8a3e", "Lakes Region": "#e8590c", "Holt": "#7048e8", "FAA": "#8b5a2b", "Two Nations Prep": "#1098ad", "Independent": "#495057", "Girls only": "#f08c00"}},
		girls: {key: 3, title: "Girls' league", tag: 'girls', colors: {"ISL": "#a51c30", "Housatonic": "#2b8a3e", "Lakes Region": "#e8590c", "Holt": "#7048e8", "FAA": "#8b5a2b", "Vaillancourt": "#1098ad", "Independent": "#495057", "Outside prep leagues": "#adb5bd"}}
	};

	function marker(r, color) {
		return L.circleMarker([r[0], r[1]], {
			radius: 7, fillColor: color, color: '#ffffff', weight: 2, opacity: 1, fillOpacity: 0.9
		}).bindPopup('<strong>' + r[4] + '</strong><br>' + r[5] + '<br><span style="font-size:0.92em">' + r[6] + '</span>');
	}

	var current = [], control = null, legend = null;
	function show(name) {
		var v = VIEWS[name];
		current.forEach(function(g) { map.removeLayer(g); });
		if (control) map.removeControl(control);
		if (legend) map.removeControl(legend);
		current = []; var overlays = {};
		for (var k in v.colors) {
			var rows = S.filter(function(r) { return r[v.key] === k; });
			if (!rows.length) continue;
			var g = L.layerGroup(rows.map(function(r) { return marker(r, v.colors[k]); })).addTo(map);
			current.push(g);
			var label = (v.labels && v.labels[k]) || (k + ' (' + v.tag + ')');
			overlays['<span style="color:' + v.colors[k] + ';font-weight:600">' + label + ' [' + rows.length + ']</span>'] = g;
		}
		control = L.control.layers(null, overlays, { collapsed: true }).addTo(map);
		legend = L.control({position: 'bottomright'});
		legend.onAdd = function() {
			var div = L.DomUtil.create('div', '');
			div.style.cssText = 'background:white;padding:8px 12px;border-radius:6px;font-size:0.78em;line-height:1.6;box-shadow:0 1px 5px rgba(0,0,0,0.2)';
			var h = '<strong style="display:block;margin-bottom:3px;color:#222">' + v.title + '</strong>';
			for (var k in v.colors) {
				h += '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + v.colors[k] + ';margin-right:6px;vertical-align:middle"></span><span style="color:#222">' + ((v.labels && v.labels[k]) || k) + '</span><br>';
			}
			div.innerHTML = h;
			return div;
		};
		// On phones the legend covers the map; the layer control (top right) shows the same colors.
		if (window.innerWidth >= 600) legend.addTo(map);
		document.querySelectorAll('#nepsac-view button').forEach(function(b) {
			var on = b.getAttribute('data-view') === name;
			b.setAttribute('aria-pressed', on ? 'true' : 'false');
			b.style.background = on ? '#007acc' : 'transparent';
			b.style.color = on ? '#fff' : 'inherit';
		});
	}
	document.querySelectorAll('#nepsac-view button').forEach(function(b) {
		b.addEventListener('click', function() { show(b.getAttribute('data-view')); });
	});
	show('boys');
})();
</script>

*Approximate campus locations, geocoded from each school's address. Three Ontario schools (Ridley, St. Andrew's, Upper Canada College) and Culver Academies in Indiana are on the map but outside the starting view; zoom out to see them.*

{% include map-cta.html %}

## The Leagues at a Glance

The boys' side, league by league. Counts are 2026-27 boys' varsity teams on the map above.<sup><a href="#sources">1,12</a></sup>

| League | Boys' teams | Where | Postgraduates? |
|---|---|---|---|
| **ISL** (Keller and Eberhart divisions) | 16 | Eastern Massachusetts, plus St. George's in Rhode Island | **Not allowed** (league rule) |
| **Housatonic** (the eight Founders League schools, plus Deerfield and Salisbury) | 10 | Connecticut, plus Deerfield (MA) and Trinity-Pawling (NY) | No published league rule; PGs do play |
| **Lakes Region** | 8 | New Hampshire, plus Vermont Academy | No published league rule |
| **Holt** | 7 | Maine, Massachusetts, Rhode Island | No published league rule |
| **FAA** (Fairchester Athletic Association) | 7 | Fairfield County CT and Westchester NY day schools, plus Kingswood Oxford | No published league rule |
| **Two Nations Prep** | 8 | New York, Pennsylvania, New Jersey, Ontario, Quebec | No published league rule; The Hill and Lawrenceville follow the MAPL rule below |
| **Independents** | 24 | Everywhere, from Andover and Exeter to Cushing, Winchendon and Millbrook | NEPSAC rules only |

A few things the table does not show:

- **"Independent" is not a weaker tier.** It just means the school schedules on its own instead of inside a conference. Andover, Exeter, Cushing, Dexter Southfield, Williston, Berkshire and Winchendon are all independents, and independents have won 13 NEPSAC boys' titles since 2010.<sup><a href="#sources">8</a></sup>
- **Founders vs. Housatonic.** The Founders League is a Connecticut all-sports conference. For boys' hockey, its eight schools play in the Housatonic league with Deerfield and Salisbury, and NEPSAC's boys' hockey by-laws list the Housatonic, not the Founders, as the league.<sup><a href="#sources">5</a></sup>
- **The FAA is the one most guides miss.** It is an all-sports conference of independent day schools in Fairfield County and Westchester, and it runs its own boys' and girls' hockey leagues. Greenwich Country Day won the 2026 boys' title, beating Kingswood Oxford 4-3 in overtime.<sup><a href="#sources">13,14</a></sup> None of the FAA boys' teams is on NEPSAC's 2026-27 boys' tournament list, so their season ends with the FAA tournament. The FAA girls' teams are on the girls' list and can play both.<sup><a href="#sources">6,7</a></sup>
- **The girls' leagues are not the same as the boys'.** Some schools play girls' hockey in a different league, or in a girls-only one like the [Vaillancourt Conference](https://sites.google.com/view/vaillancourtconference/home){:target="_blank" rel="noopener"} (formed in 2023).<sup><a href="#sources">1</a></sup> The map popups show each school's girls' league.

### Schools by state

Every school on the map, by state. Girls-only schools are marked (girls), and the 19 schools with no girls' varsity team are marked (boys only). An asterisk marks a NEPSAC associate member, which plays NEPSAC schools but is not eligible for the NEPSAC tournaments.<sup><a href="#sources">2,5</a></sup>

**Massachusetts (31):** Andover, Austin Prep, BB&N, Belmont Hill (boys only), Berkshire, Brooks, CATS Academy Boston (boys only), Cushing, Dana Hall (girls), Deerfield, Dexter Southfield, Governor's, Groton, Lawrence Academy, Middlesex, Milton, Newton Country Day (girls), Noble & Greenough, Northfield Mt. Hermon, Pingree, Rivers, Roxbury Latin (boys only), St. Mark's, St. Sebastian's (boys only), Tabor, Thayer, Wilbraham & Monson (boys only), Williston Northampton, Winchendon, Winsor (girls), Worcester Academy

**Connecticut (20):** Avon Old Farms (boys only), Brunswick (boys only), Canterbury, Choate, Frederick Gunn School, Greenwich Academy (girls), Greenwich Country Day, Hamden Hall Country Day School (boys only), Hotchkiss, Kent, King School, Kingswood Oxford (boys only), Loomis Chaffee, Pomfret, Sacred Heart Greenwich (girls), Salisbury (boys only), South Kent (boys only), St. Luke's (boys only), Taft, Westminster

**New Hampshire (8):** Brewster Academy, Exeter, Holderness, Kimball Union, New Hampton, Proctor, St. Paul's, Tilton

**Maine (4):** Berwick, Hebron, Kents Hill, North Yarmouth Academy*

**Rhode Island (4):** Moses Brown*, Mount St. Charles, Portsmouth Abbey, St. George's

**Vermont (1):** Vermont Academy

**New York (7):** Albany Academy (boys only), Harvey School, Hoosac, Millbrook, Nichols*, Rye Country Day, Trinity-Pawling (boys only)

**New Jersey (1):** Lawrenceville*

**Pennsylvania (2):** The Hill School*, Wyoming Seminary* (boys only)

**Indiana (1):** Culver Academies*

**Quebec (3):** Académie Saint-Louis* (boys only), Bishop's College School* (boys only), Stanstead College*

**Ontario (3):** Ridley College*, St. Andrew's College* (boys only), Upper Canada College* (boys only)

## The Age Question: Postgraduates and the September 1 Rule

This is the section to read twice.

A **postgraduate** (PG) is a student who has already finished high school and enrolls at a prep school for one more year, usually for academics, hockey, or both. In a league that allows them, a PG can be a year older than the oldest senior on the ice.

Here is what is actually written down:

- **NEPSAC's rule is about age, not grade.** A player is eligible if they are "19 years old, or younger, on September 1 of each school year." That is in NEPSAC's handbook and on its membership page today.<sup><a href="#sources">3,4</a></sup> NEPSAC's handbook and hockey by-laws do not mention postgraduates at all.
- **The ISL bans PGs.** Its own published principles refer to "the League rules regarding the ineligibility of post-graduates."<sup><a href="#sources">9</a></sup>
- **The MAPL is stricter on age.** The Mid-Atlantic Prep League, a Pennsylvania and New Jersey all-sports conference that includes The Hill and Lawrenceville, says a player "may not turn 19 years of age before July 1," two months earlier than NEPSAC's cutoff, and allows only a limited number of PGs.<sup><a href="#sources">10</a></sup>
- **Every other hockey league we checked publishes no PG rule.** The Housatonic, Lakes Region, Holt, FAA and Two Nations leagues have no eligibility rules online. That does not prove there is no limit, but it means NEPSAC's age rule is the only one in writing.

What that means in practice: **outside the ISL, a team can dress a 19-year-old.** For a 15-year-old freshman, that is the difference between playing against kids who are a year or two older and playing against young men who are four years older. Neither is wrong. Some families want the older competition, and some want four years in a league where everyone is a high school student. You just want to know which one you are choosing.

The other two written NEPSAC rules worth knowing: a player who has enrolled in college classes loses eligibility regardless of age, and a player who transfers mid-year cannot play varsity for the new school that season if they already played varsity for the old one.<sup><a href="#sources">3</a></sup>

## Large vs. Small: How Your School's Bracket Is Decided

NEPSAC's boys' postseason is three eight-team brackets:<sup><a href="#sources">5</a></sup>

| Tournament | Also called | Who gets in |
|---|---|---|
| **Stuart/Corkery** | Elite 8 | The top 8 teams, regardless of school size |
| **Martin/Earl** | Large School | The next 8 Large schools |
| **Piatelli/Simmons** | Small School | The next 8 Small schools |

Whether a school is Large or Small is not a fixed number. The by-laws say schools "will be divided evenly based upon male enrollment in grades 9-12 prior to the start of the season."<sup><a href="#sources">5</a></sup> In other words, it is a median split, redone every fall. For 2026-27 that produced 29 Large and 28 Small boys' schools.<sup><a href="#sources">6</a></sup>

Because it is redone every year, schools move. **Cushing won the 2026 Large School title and is on the 2026-27 Small list.** Lawrence Academy won the Small School title in 2018 and 2023 and is a Large school this season.<sup><a href="#sources">6,8</a></sup> NEPSAC publishes the lists, not the enrollment numbers behind them.

Two practical consequences:

- **A school's league division does not tell you its NEPSAC bracket.** The ISL's Keller and Eberhart divisions are the league's own split, and they do not line up with NEPSAC's Large and Small lists.
- **The girls have their own lists.** Several schools are Large for boys and Small for girls (Westminster, Williston, Worcester, Dexter Southfield and Lawrence among them), which suggests the girls' split is by girls' enrollment.<sup><a href="#sources">7</a></sup> The girls' by-laws are not published online, so that last part is an inference.

## How the Elite 8 Gets Picked

This is the part that decides whether a great season ends in the Elite 8 or one bracket down.

1. **Every team gets an RPI.** It is a number built from three pieces: the team's own winning percentage counts for **25%**, its opponents' winning percentage for **21%**, and its opponents' opponents' winning percentage for **54%**. Ties count as half a win, and a regular-season shootout counts as a tie.<sup><a href="#sources">5</a></sup>
2. **The top 16 by RPI go into a head-to-head comparison** (NEPSAC calls it JSPR), similar to the PairWise system college hockey uses. Each pair of teams is compared on four things: head-to-head result, RPI, record against common opponents, and record against the other teams under consideration. The top 8 after those comparisons make the Elite 8.<sup><a href="#sources">5</a></sup>
3. **The Large and Small brackets are filled by RPI alone,** from the teams left over.
4. **A selection committee meets on the final Sunday of the regular season** and may move a seed one place up or down, as long as the top four seeds keep home ice. The top four seeds in each bracket host their quarterfinals.<sup><a href="#sources">5</a></sup>

The plain-language takeaway: **more than half of a team's RPI is its opponents' opponents.** A team with a strong record against a soft schedule can finish behind a team with a worse record against a hard one. That is why prep coaches care so much about who they schedule in December.

To be eligible at all, a boys' team must play at least 15 games against NEPSAC hockey teams and no more than 35 games in total, scrimmages included.<sup><a href="#sources">5</a></sup> The quarterfinals are the Wednesday after the regular season ends, the semifinals that Saturday, and the finals that Sunday. The 2026 boys' finals were on March 8 at UConn.<sup><a href="#sources">8</a></sup> NEPSAC had not published the 2027 dates when this was written.

The girls' Elite 8 is the **Chuck Vernon** tournament, with the **Patsy Odden** (Large) and **Dorothy Howard** (Small) tournaments alongside it. The girls' format began in 2020; before that, girls' prep hockey had Division 1 and Division 2 tournaments.<sup><a href="#sources">8,11</a></sup> The girls' selection works the same way. The top 24 eligible teams go to the postseason: the top 8 by JSPR, regardless of size, play the Chuck Vernon, the next 8 Large schools by RPI play the Patsy Odden, and the next 8 Small schools play the Dorothy Howard. A team needs at least 15 games and no more than 35.<sup><a href="#sources">16,18</a></sup> That description comes from girlsprephockey.us, which says its standings are its own reading of the league rules, because the girls' by-laws are not published online.

## Who Actually Wins

Every NEPSAC boys' champion since 2010, from NEPSAC's own bracket archives. There was no tournament in 2021 (COVID); the 2020 tournaments were played in full on March 8, 2020.<sup><a href="#sources">8</a></sup> The league column is each school's league today.

| Year | Elite 8 (Stuart/Corkery) | Large School (Martin/Earl) | Small School (Piatelli/Simmons) |
|---|---|---|---|
| 2026 | Avon Old Farms (Housatonic) | Cushing (Independent) | Winchendon (Independent) |
| 2025 | Cushing (Independent) | Phillips Andover (Independent) | Kimball Union (Lakes Region) |
| 2024 | Kimball Union (Lakes Region) | Kent (Housatonic) | Canterbury (Independent) |
| 2023 | Avon Old Farms (Housatonic) | Taft (Housatonic) | Lawrence Academy (ISL) |
| 2022 | Salisbury (Housatonic) | Kent (Housatonic) | Pomfret (Independent) |
| 2021 | no tournament | no tournament | no tournament |
| 2020 | Salisbury (Housatonic) | Loomis Chaffee (Housatonic) | The Gunnery (Independent) |
| 2019 | Kimball Union (Lakes Region) | Kent (Housatonic) | Tilton (Lakes Region) |
| 2018 | Kimball Union (Lakes Region) | Brunswick (Independent) | Lawrence Academy (ISL) |
| 2017 | Kimball Union (Lakes Region) | Avon Old Farms (Housatonic) | Pomfret (Independent) |
| 2016 | The Gunnery (Independent) | Thayer (ISL) | St. Mark's (ISL) |
| 2015 | Salisbury (Housatonic) | Brooks (ISL) | St. Mark's (ISL) |
| 2014 | Salisbury (Housatonic) | Loomis Chaffee (Housatonic) | Kimball Union (Lakes Region) |
| 2013 | Salisbury (Housatonic) | Cushing (Independent) | Brooks (ISL) |
| 2012 | Lawrence Academy (ISL) | Berkshire (Independent) | Kimball Union (Lakes Region) |
| 2011 | Milton (ISL) | Westminster (Housatonic) | Dexter (Independent) |
| 2010 | Avon Old Farms (Housatonic) | Choate (Housatonic) | Kimball Union (Lakes Region) |

The Gunnery is now the Frederick Gunn School.

What the table says:

- **The Elite 8 has mostly belonged to the Housatonic and Kimball Union.** Of 16 Elite 8 titles since 2010, Housatonic schools won 8 (Salisbury 5, Avon Old Farms 3) and Kimball Union won 4. The ISL has 2, both before 2013.
- **The ISL wins where it plays.** Its schools have won 5 Small School titles and 2 Large School titles in the same stretch. That fits the league's design: no postgraduates, so its teams are often younger than the teams they face in the Elite 8.
- **Seeds are not destiny.** Avon Old Farms won the 2026 Elite 8 as the **No. 8 seed**, beating No. 2 St. Mark's 4-2 in the final.<sup><a href="#sources">8</a></sup>

Girls' Elite 8 (Chuck Vernon) champions since it began: Noble and Greenough (2020, 2024), Williston Northampton (2022, 2023) and Loomis Chaffee (2025, 2026). Loomis beat Deerfield 5-1 in the 2026 final; Exeter won the 2026 Large School title and Groton the Small School title.<sup><a href="#sources">8,15</a></sup>

## What a Girls' Prep Season Looks Like

First, which schools: 66 of the 85 schools on the map field a girls' varsity team. [Switch the map to "Girls"](#nepsac-view) to see just those, colored by girls' league, and the state-by-state list marks the 19 that don't.

The girls' calendar has a shape worth knowing before your daughter's first winter. In 2025-26, 20 tournaments were on it:<sup><a href="#sources">15</a></sup>

| When | What |
|---|---|
| **December** | **Ten holiday tournaments**, eight of them Dec. 18-21: Harrington Invitational (Nobles), Patsy K. Odden Invitational (Taft), Edward G. Watkins Invitational (Cushing), Howard Invitational (St. George's), Dexter Southfield Holiday, Governor's Jamboree, Portsmouth Abbey Holiday, Newton Country Day, plus the Pingree and Exeter Invitationals earlier in the month |
| **January** | New Year's Prep Puck Drop (Williston Northampton) |
| **February** | Maine Prep Cup (Hebron), Hill Invitational, then the league playoffs: FAA, Vaillancourt Conference, EIL and Lakes Region |
| **March** | The three NEPSAC tournaments (Chuck Vernon, Patsy Odden, Dorothy Howard), March 4-8, 2026 |

Not every "tournament" is a bracket. The Exeter Invitational in December 2025 ran eight teams through three games each over a weekend, with no final.<sup><a href="#sources">15</a></sup> If you want to watch a lot of girls' prep hockey in one place, the holiday weekend is the one.


## Choosing a School: What to Ask

Most of the decision is not about hockey. It is about the school: academics, admissions, cost, and whether your kid wants to live there. But on the hockey side, these are the questions the structure above says to ask, and the answers are usually one email to the coach away.

1. **Which league does the team play in, and does it allow postgraduates?** If yes, ask how many PGs are on this year's roster and how many usually are.
2. **Is the school Large or Small this year, and has it moved?** That decides which bracket a good season leads to.
3. **Is the school a full NEPSAC member?** Associate members, and for now the FAA's boys' teams, are not on the NEPSAC tournament path.
4. **Who is on the schedule?** Because opponents' records are most of the RPI, a December schedule full of strong teams is a decision the coach made on purpose. Ask about it.
5. **Boarding or day, and what does that mean here?** Some schools board five days a week only (Belmont Hill, Harvey), some are nearly all boarders, and some boarding schools have a large day population. The map popups show each school's own description.
6. **If you have a daughter: which girls' league, and which bracket?** The girls' league and the girls' Large/Small list can both differ from the boys'.

{% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}

## Where to Follow the 2026-27 Season

- **[NEPSAC tournaments](https://nepsac.org/tournaments/tournament-postseason/){:target="_blank" rel="noopener"}** for brackets once they are announced, and the **[tournament archives](https://nepsac.org/tournaments/tournament-archives/){:target="_blank" rel="noopener"}** for every past bracket.
- **[NEPSAC classifications](https://nepsac.org/coaches-associations/boys-sports/boys-ice-hockey-nepsbiha/){:target="_blank" rel="noopener"}**: the current Large and Small lists for **[boys](https://nepsac.org/coaches-associations/boys-sports/boys-ice-hockey-nepsbiha/){:target="_blank" rel="noopener"}** and **[girls](https://nepsac.org/coaches-associations/girls-sports/girls-ice-hockey-nepsgiha/){:target="_blank" rel="noopener"}**.
- **[U.S. Hockey Report](https://www.ushr.com/neprep/standings){:target="_blank" rel="noopener"}** for standings by league. Much of it is subscriber-only.
- **[New England Hockey Journal](https://www.hockeyjournal.com/){:target="_blank" rel="noopener"}** for previews and results. Also largely subscriber-only.
- **[girlsprephockey.us](https://girlsprephockey.us/){:target="_blank" rel="noopener"}** for the girls' schedule and tournaments. The site describes its own results as unofficial.

## Make the Four Years Count

Whichever school it ends up being, the hockey problem is the same one it always was. Thirty-odd games happen, and by spring almost none of them are still in anybody's head. Prep programs come with real coaching staffs. Most club teams before prep run on volunteers and a phone in the stands.

That is what we built Scout Elite for: coaches and parents turning game video into development in minutes, without a video staff.

<div style="margin: 1.5em 0; text-align: center;">
{% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}
</div>

*Researched November 2026. Results are from the 2025-26 season and earlier; leagues and classifications are for 2026-27. Leagues move teams and schools change. Spot something wrong? Reach out and I will fix it here.*

---

<a name="sources"></a>

## Sources

1. New England Preparatory School Athletic Council, ["NEPSAC Leagues."](https://nepsac.org/about/nepsac-leagues/){:target="_blank" rel="noopener"} The member leagues and their schools, including the Vaillancourt Conference (girls' hockey, formed 2023).

2. NEPSAC, ["Member Schools."](https://nepsac.org/about/nepsac-member-schools/){:target="_blank" rel="noopener"} Full and associate members.

3. NEPSAC, ["By-Law and Policy Handbook 2023-24."](https://assets-rst7.rschooltoday.com/rst7files/uploads/sites/328/2023/11/28094022/NEPSAC-23-24-Handbook-112823.pdf){:target="_blank" rel="noopener"} The age rule ("19 years old, or younger, on September 1"), college enrollment, paid athletes and mid-year transfer rules. The newest general handbook published online at the time of writing.

4. NEPSAC, ["Membership Application."](https://nepsac.org/about/nepsac-membership-application/){:target="_blank" rel="noopener"} The same age rule on NEPSAC's current site, and the note that associate members follow it.

5. New England Prep School Boys' Ice Hockey Association, ["Constitution and By-Laws," revised February 25, 2026.](https://assets-rst7.rschooltoday.com/rst7files/uploads/sites/328/2026/02/25115340/NEPSIHA-By-Laws-2-25-26.pdf){:target="_blank" rel="noopener"} The three tournaments, the Large/Small split by boys' enrollment, RPI weights and JSPR selection, the selection committee, the 15-game minimum and 35-game cap, and associate members' tournament ineligibility.

6. NEPSAC, ["Classifications, Boys Ice Hockey," last updated November 3, 2026.](https://assets-rst7.rschooltoday.com/rst7files/uploads/sites/328/2026/11/03141303/NEPSAC-Classifications-LAST-UPDATED-11_3_2026-Boys-Ice-Hockey.pdf){:target="_blank" rel="noopener"} The 2026-27 Large and Small lists.

7. NEPSAC, ["Classifications, Girls Hockey," last updated October 16, 2026.](https://assets-rst7.rschooltoday.com/rst7files/uploads/sites/328/2026/10/28195203/NEPSAC-Classifications-LAST-UPDATED-10_16_2026-Girls-Hockey.pdf){:target="_blank" rel="noopener"}

8. NEPSAC, ["Tournament Archives."](https://nepsac.org/tournaments/tournament-archives/){:target="_blank" rel="noopener"} Boys' and girls' bracket PDFs for every year, the source for every champion, seed and final score on this page, and the 2026 final venues.

9. Independent School League, ["Essential Understandings."](https://www.islsports.org/essential-understandings/){:target="_blank" rel="noopener"} The ISL's postgraduate ineligibility rule.

10. The Hill School, ["Postgraduate Program."](https://www.thehill.org/admission/postgraduate){:target="_blank" rel="noopener"} The MAPL age rule ("may not turn 19 years of age before July 1"). The limited number of PGs is from Wikipedia, ["Mid-Atlantic Prep League."](https://en.wikipedia.org/wiki/Mid-Atlantic_Prep_League){:target="_blank" rel="noopener"}

11. Bob York, ["NEPSAC Girls Ice Hockey Association Honors Coaches with Tournament Names,"](https://nepsac.org/nepsac-girls-ice-hockey-association-honors-coaches-with-tournaments-names-2){:target="_blank" rel="noopener"} NEPSAC, March 2, 2020. The girls' Elite 8 format and tournament names, and the boys' three-bracket format dating to 2008-09.

12. U.S. Hockey Report, ["New England Prep standings."](https://www.ushr.com/neprep/standings){:target="_blank" rel="noopener"} League membership for 2026-27 boys' and girls' teams.

13. Fairchester Athletic Association, ["Boys' Hockey"](https://www.faasports.org/sports/hockey-boys){:target="_blank" rel="noopener"} and ["Girls' Hockey."](https://www.faasports.org/sports/hockey-girls){:target="_blank" rel="noopener"} FAA brackets and results. Kingswood Oxford's league from its own ["Ice Hockey"](https://www.kingswoodoxford.org/athletics/sport/ice-hockey/){:target="_blank" rel="noopener"} page.

14. Greenwich Country Day School, ["GCDS Boys Hockey Captures First FAA Championship in Thrilling Overtime Victory,"](https://www.gcds.net/news/2026-03-05/gcds-boys-hockey-captures-first-faa-championship-in-thrilling-overtime-victory){:target="_blank" rel="noopener"} March 5, 2026.

15. girlsprephockey.us, ["2026 Tournaments."](https://girlsprephockey.us/seasons/43/tournaments){:target="_blank" rel="noopener"} The 2025-26 girls' tournament calendar and the 2026 NEPSAC girls' results (which match NEPSAC's bracket PDFs). The site describes its results as unofficial.

16. ["Girls Elite 8 Forecast: Who Will Make the Top Prep Tournament?"](https://hockeyjournal.com/girls-elite-8-forecast-who-will-make-the-top-prep-tournament/){:target="_blank" rel="noopener"} New England Hockey Journal, February 16, 2024. The JSPR system for the girls' Elite 8.

17. Boarding/day and coed status: each school's own published description (About, Fast Facts or Admissions pages), or the NAIS school directory where the school's site does not say. The full list, with a source for every school, is available on request.

18. girlsprephockey.us, ["2026 League Standings."](https://girlsprephockey.us/seasons/43/standings){:target="_blank" rel="noopener"} The 2025-26 girls' standings for all 59 teams and the girls' postseason selection rules. The site says its standings are "calculated based on interpretation of league rules, and may not reflect official league standings."

{% include ma-hockey-guide-series.html current="nepsac" %}
