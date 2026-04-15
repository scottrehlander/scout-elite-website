---
layout: post
title: "Top New England Boys Hockey Programs Ranked: 10U, 12U & 14U"
seo_title: "Top New England Boys Hockey Programs by Age Group | 10U 12U 14U"
seo_description: "The definitive ranked list of New England boys hockey programs at 10U, 12U, and 14U using MyHockeyRankings national data. Includes an interactive map of team locations across Massachusetts, Connecticut, Rhode Island, New Hampshire, Maine, and Vermont."
date: 2026-04-19
categories: [hockey]
tags: [Massachusetts hockey programs, New England hockey teams, E9 hockey teams, EHF hockey teams, 10U hockey, 12U hockey, 14U hockey, top hockey programs Massachusetts, youth hockey rankings, AAA hockey New England, bantam hockey Massachusetts, peewee hockey Massachusetts, squirt hockey Massachusetts]
author: "Coach Scott"
excerpt: "A data-driven look at where New England boys hockey programs rank nationally at 10U, 12U, and 14U."
image: "/img/blog/beanpot-trophy.jpg"
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>


I pulled every New England and Massachusetts boys program that appeared in the [MyHockeyRankings (MHR)](https://myhockeyrankings.com/){:target="_blank" rel="noopener"} national top 100 at **10U (Squirt)**, **12U (Peewee)**, and **14U (Bantam)** for the 2024-25 season. I've organized them by age group, mapped them geographically, and added context about league affiliation so you know who's competing where.

This is especially useful if you're:
- **A parent** trying to understand which programs are worth pursuing at tryouts
- **New to the New England area** and unsure which organizations have national standing
- **Comparing leagues** (EHF vs. E9 vs. Independent) and want to see which produces more nationally-ranked teams

> **A quick note on MHR ratings:** MyHockeyRankings uses a performance-based algorithmic rating (similar to chess Elo). A rating in the **high 90s** means you're competing with the best programs in the country. **92-96** is solidly national AAA level. **90-92** is strong regional AAA. The rating accounts for opponent strength, not just wins and losses. [Full methodology here.](https://myhockeyrankings.com/how-to){:target="_blank" rel="noopener"}


## Where Are These Programs Located?

The map below shows the approximate home location of every New England program that appears in the tables below. Markers are color-coded by primary league affiliation. Click any marker for details.

<div id="ne-hockey-map" style="height: 480px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<div style="font-size:0.85em; margin-bottom:1.5em; color:#555;">
  <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#cc0000;margin-right:5px;"></span>EHF Elite / National &nbsp;
  <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#1a5276;margin-right:5px;"></span>E9 White &nbsp;
  <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e67e22;margin-right:5px;"></span>EHF / Other &nbsp;
  <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#27ae60;margin-right:5px;"></span>Independent AAA &nbsp;
  <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#7d3c98;margin-right:5px;"></span>Town / VHL
</div>

<script>
(function() {
  var map = L.map('ne-hockey-map').setView([42.35, -71.6], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 13
  }).addTo(map);

  function marker(lat, lng, color, name, town, league, notes) {
    return L.circleMarker([lat, lng], {
      radius: 9, fillColor: color, color: '#fff',
      weight: 2, opacity: 1, fillOpacity: 0.88
    }).bindPopup('<strong>' + name + '</strong><br>' + town + '<br><em>' + league + '</em>' + (notes ? '<br><span style="font-size:0.9em">' + notes + '</span>' : ''));
  }

  var teams = [
    // EHF Elite (red)
    marker(42.689, -71.132, '#cc0000', 'Middlesex Islanders East', 'North Andover, MA', 'EHF Elite', '#7 nationally at 14U · #11 at 12U · ~#13 at 10U'),
    marker(42.666, -71.424, '#e67e22', 'Middlesex Islanders West', 'Tyngsboro, MA', 'EHF Platinum', 'Top 100 nationally at 10U'),
    marker(42.355, -71.160, '#cc0000', 'Boston Jr Eagles', 'Brighton, MA', 'EHF Elite', '#8 at 14U · #12 at 12U · #9 at 10U'),
    marker(42.069, -70.819, '#cc0000', 'Bay State Breakers', 'Pembroke, MA', 'EHF Elite', '#20 at 12U · ~#15 at 10U'),
    marker(42.349, -71.552, '#cc0000', 'Minuteman Flames', 'Marlborough, MA', 'EHF Elite', '#23 at 12U · ~#37 at 10U'),
    marker(42.065, -71.251, '#cc0000', 'South Shore Kings', 'Foxboro, MA', 'EHF Elite', '#31 at 12U · ~#23 at 10U'),
    marker(42.776, -70.948, '#cc0000', 'Top Gun', 'Byfield, MA', 'EHF Elite', '#79 at 14U · #42 at 12U · #6 at 10U'),
    marker(42.128, -70.912, '#cc0000', 'Boston Jr Terriers', 'Rockland, MA', 'EHF Elite', '#44 at 14U · #49 at 12U · ~#35 at 10U'),
    marker(41.984, -70.974, '#cc0000', 'Northeast Generals', 'Bridgewater, MA', 'EHF Elite', '#54 at 14U'),
    marker(41.072, -71.560, '#cc0000', 'Cape Cod Whalers', 'Cape Cod, MA', 'EHF', '#23 at 14U'),
    marker(42.554, -71.269, '#e67e22', 'New England Bulldogs', 'Billerica, MA', 'EHF', 'Top 100 at 10U'),
    // EHF out of state
    marker(41.083, -73.538, '#cc0000', 'Mid-Fairfield Hockey Club', 'Stamford, CT', 'EHF Elite', '#65 at 14U · #5 at 12U · #3 at 10U'),
    marker(41.879, -71.382, '#e67e22', 'Providence Capitals', 'Pawtucket, RI', 'EHF', '#75 at 14U · #10 at 10U'),
    marker(41.702, -72.608, '#e67e22', 'Northern CT Nor\'Easter', 'Connecticut', 'EHF', '#17 at 12U'),
    // E9 White (blue)
    marker(42.775, -71.078, '#1a5276', 'Valley Jr Warriors', 'Haverhill, MA', 'E9 White North', '~#46 at 10U'),
    marker(42.491, -71.276, '#1a5276', 'East Coast Wizards', 'Bedford, MA', 'E9 White North', '~#41 at 10U'),
    marker(42.237, -70.887, '#1a5276', 'Boston Advantage', 'Hingham, MA', 'E9 White', '#72 at 12U · ~#76 at 10U'),
    marker(42.244, -70.897, '#1a5276', 'Lovell Winter Club', 'Hingham, MA', 'E9 White North', '#4 nationally at 10U'),
    marker(42.467, -71.014, '#1a5276', 'Boston Americans', 'Saugus, MA', 'E9 White', '#63 at 14U · #55 at 12U'),
    marker(42.612, -71.234, '#1a5276', 'Boston Junior Rangers', 'Tewksbury, MA', 'E9', 'Top 100 at 10U'),
    marker(42.101, -72.651, '#1a5276', 'Springfield Jr Thunderbirds', 'West Springfield, MA', 'E9 White', '#46 at 12U · Top 100 at 10U'),
    marker(42.310, -71.060, '#1a5276', 'Greater Boston Jr Bruins', 'Dorchester, MA', 'E9', '#62 at 12U'),
    marker(42.374, -71.031, '#1a5276', 'Middlesex Icemen', 'East Boston, MA', 'E9', '#81 at 12U'),
    marker(42.460, -71.392, '#1a5276', 'Assabet Valley Patriots', 'West Concord, MA', 'E9', '#98 at 14U'),
    // E9 out of state
    marker(43.730, -70.260, '#1a5276', 'Casco Bay Mariners', 'Falmouth, ME', 'E9', 'Top 100 at 10U'),
    marker(44.467, -73.212, '#1a5276', 'Vermont Jr Catamounts', 'South Burlington, VT', 'E9', 'Ranked 10U'),
    // Independent AAA (green)
    marker(42.262, -71.802, '#27ae60', 'Worcester Shamrocks', 'Worcester, MA', 'Independent AAA', '#2 nationally at 10U'),
    marker(42.108, -72.589, '#27ae60', 'Greater Springfield Aces', 'Springfield, MA', 'Independent AAA', '~#27 at 10U'),
    marker(42.158, -71.097, '#27ae60', 'Neponset Valley River Rats', 'Canton area, MA', 'Independent AAA', '#21 at 14U'),
    marker(42.058, -71.118, '#27ae60', 'East Coast Militia', 'South Shore, MA', 'Independent AAA', '#57 at 14U'),
    marker(42.280, -71.050, '#27ae60', 'Boston Ice Dogs', 'South Shore, MA', 'Independent AAA', '#71 at 12U'),
    marker(42.360, -71.057, '#27ae60', 'Boston Hockey Academy', 'Boston, MA', 'Independent AAA', '#76 at 14U'),
    marker(42.050, -71.050, '#27ae60', 'Atlantic Coast Academy', 'South Shore, MA', 'Independent AAA', '#97 at 14U'),
    marker(42.981, -70.946, '#27ae60', 'Seacoast Performance Academy', 'Exeter, NH', 'Independent', '#28 at 14U'),
    // VHL / Town
    marker(42.377, -71.238, '#7d3c98', 'Waltham Hawks', 'Waltham, MA', 'VHL / Town', 'Top 100 at 10U - remarkable for a town program')
  ];

  teams.forEach(function(t) { t.addTo(map); });
})();
</script>

> **Map note:** Locations shown are approximate organizational home areas. Many programs use multiple rinks. Zoom in or click any marker for details.


## 14U (Bantam) - New England Teams in the National Top 100

14U Bantam is the age group where national rankings start carrying serious weight. College scouts begin paying attention, and the gap between programs starts to really separate. Here's every New England program that cracked the national top 100 at 14U in 2024-25.

*Source: [MHR USA 14U All Rankings](https://myhockeyrankings.com/rank.php?y=2025&v=114){:target="_blank" rel="noopener"}*

| US Rank | Program | Home | League | MHR Rating |
|---|---|---|---|---|
| **#7** | Middlesex Islanders East (Elite) | North Andover, MA | EHF Elite | 97.10 |
| **#8** | Boston Jr Eagles (Elite) | Brighton, MA | EHF Elite | 96.92 |
| **#21** | Neponset Valley River Rats | Canton area, MA | Independent | 94.81 |
| **#23** | Cape Cod Whalers | Cape Cod, MA | EHF | 94.62 |
| **#28** | Seacoast Performance Academy | Exeter, NH | Independent | 94.44 |
| **#44** | Boston Jr Terriers (Elite) | Rockland, MA | EHF Elite | 93.33 |
| **#54** | Northeast Generals (Elite) | Bridgewater, MA | EHF Elite | 92.72 |
| **#57** | East Coast Militia (National) | South Shore, MA | Independent | 92.51 |
| **#63** | Boston Americans | Saugus, MA | E9 White | 92.22 |
| **#65** | Mid-Fairfield Hockey Club (Elite) | Stamford, CT | EHF Elite | 92.19 |
| **#75** | Providence Capitals (Elite) | Pawtucket, RI | EHF | 91.48 |
| **#76** | Boston Hockey Academy | Boston, MA | Independent | 91.36 |
| **#79** | Top Gun (Elite) | Byfield, MA | EHF Elite | 91.12 |
| **#97** | Atlantic Coast Academy | South Shore, MA | Independent | 90.09 |
| **#98** | Assabet Valley Patriots (Elite) | West Concord, MA | E9 | 90.08 |

**What stands out:** Two Massachusetts EHF Elite programs - Middlesex Islanders East and Boston Jr Eagles - are legitimately in the national top 10. Seven of the 15 NE teams in the top 100 are EHF Elite or EHF affiliated. The only E9-affiliated program in the top 75 is the Boston Americans at #63. Independent programs punch above their weight - Neponset Valley River Rats at #21 and Seacoast Performance Academy at #28 are both remarkable showings outside the major leagues.


## 12U (Peewee) - New England Teams in the National Top 100

12U Peewee is where many families start to feel the pressure of the club hockey landscape. Programs are more defined, team rosters are more locked in, and this is often the first age where coaches are building real systems.

*Source: [MHR USA 12U All Rankings](https://myhockeyrankings.com/rank.php?y=2025&v=124){:target="_blank" rel="noopener"}*

| US Rank | Program | Home | League | MHR Rating |
|---|---|---|---|---|
| **#5** | Mid-Fairfield Hockey Club (Elite) | Stamford, CT | EHF Elite | 99.31 |
| **#11** | Middlesex Islanders East (Elite) | North Andover, MA | EHF Elite | 97.64 |
| **#12** | Boston Jr Eagles (Elite) | Brighton, MA | EHF Elite | 97.45 |
| **#17** | Northern CT Nor'Easter (Elite) | Connecticut | EHF | 96.11 |
| **#20** | Bay State Breakers (Elite) | Pembroke, MA | EHF Elite | 96.04 |
| **#23** | Minuteman Flames (Elite) | Marlborough, MA | EHF Elite | 95.47 |
| **#31** | South Shore Kings (Elite) | Foxboro, MA | EHF Elite | 94.24 |
| **#42** | Top Gun (Elite) | Byfield, MA | EHF Elite | 93.37 |
| **#46** | Springfield Jr Thunderbirds (Elite) | West Springfield, MA | E9 White | 93.08 |
| **#49** | Boston Jr Terriers (Elite) | Rockland, MA | EHF Elite | 92.72 |
| **#55** | Boston Americans | Saugus, MA | E9 White | 92.57 |
| **#62** | Greater Boston Jr Bruins | Dorchester, MA | E9 | 92.33 |
| **#71** | Boston Ice Dogs (Selects) | South Shore, MA | Independent | 91.87 |
| **#72** | Boston Advantage (Elite) | Hingham, MA | E9 White | 91.84 |
| **#81** | Middlesex Icemen (Elite) | East Boston, MA | E9 | 91.64 |

**What stands out:** 12U is where EHF Elite absolutely dominates - seven of the top 15 New England programs in the national rankings play in EHF Elite. Mid-Fairfield at #5 nationally is elite by any measure. The depth here is striking: **six Massachhusetts EHF programs are in the national top 50** simultaneously at this age group. That's not an accident - it's what decades of competitive infrastructure produces.


## 10U (Squirt) - New England Teams in the National Top 100

10U is youth hockey at its most formative. The rankings here matter less for the players and more for parents trying to understand where their son is developing relative to the country. That said, the results are genuinely remarkable.

*Source: [MHR USA 10U All Rankings](https://myhockeyrankings.com/rank.php?y=2025&a=1&v=122){:target="_blank" rel="noopener"}*

| Approx. US Rank | Program | Home | League | MHR Rating |
|---|---|---|---|---|
| **#2** | Worcester Shamrocks | Worcester, MA | Independent | 99.5 |
| **#3** | Mid-Fairfield Hockey Club (Elite) | Stamford, CT | EHF Elite | 99.4 |
| **#4** | Lovell Winter Club (Elite) | Hingham, MA | E9 White North | 99.2 |
| **#6** | Top Gun (Elite) | Byfield, MA | EHF Elite | 98.5 |
| **#9** | Boston Jr Eagles (Elite) | Brighton, MA | EHF Elite | 97.8 |
| **#10** | Providence Capitals (Elite) | Pawtucket, RI | EHF | 97.8 |
| **~#13** | Middlesex Islanders East (Elite) | North Andover, MA | EHF Elite | 96.7 |
| **~#15** | Bay State Breakers (Elite) | Pembroke, MA | EHF Elite | 96.4 |
| **~#23** | South Shore Kings (Elite) | Foxboro, MA | EHF Elite | 95.4 |
| **~#27** | Greater Springfield Aces | Springfield, MA | Independent | 95.1 |
| **~#35** | Boston Jr Terriers (Elite) | Rockland, MA | EHF Elite | 94.1 |
| **~#37** | Minuteman Flames (Elite) | Marlborough, MA | EHF Elite | 93.5 |
| **~#41** | East Coast Wizards (Elite) | Bedford, MA | E9 White North | 92.8 |
| **~#46** | Valley Jr Warriors (Elite) | Haverhill, MA | E9 White North | 92.5 |
| **~#65** | New England Bulldogs | Billerica, MA | EHF | 91.1 |
| **~#65** | Bay State Breakers (T1-Platinum) | Pembroke, MA | EHF Platinum | 91.1 |
| **~#68** | Boston Junior Rangers | Tewksbury, MA | E9 | 91.0 |
| **~#74** | Casco Bay Mariners | Falmouth, ME | E9 | 90.6 |
| **~#76** | Boston Advantage (Elite) | Hingham, MA | E9 | 90.5 |
| **~#78** | Middlesex Islanders West (T1-Platinum) | Tyngsboro, MA | EHF Platinum | 90.4 |
| **~#82** | Waltham Hawks | Waltham, MA | VHL / Town | 90.2 |

> Ranks marked with ~ are approximate. Only Little Caesars (MI) finished ahead of Worcester Shamrocks nationally at 10U. That's a program from Worcester, Massachusetts, rated #2 in the entire country.

**What stands out:** The 10U results are jaw-dropping. **New England has five programs in the national top 15.** Worcester Shamrocks at #2 is a story unto itself - an independent program from central Massachusetts competing with elite travel programs from Michigan, Illinois, and Southern California. Lovell Winter Club at #4 plays in the E9, which tells you that the top E9 White North organizations are legitimate national powers even at the youngest tracked age groups.

The Waltham Hawks - a **town hockey program in the VHL** - at #82 nationally is worth pausing on. That's a recreational-rooted program competing with top AAA clubs from across the country. That's what high-participation town hockey in Massachusetts can produce.

---

## Key Takeaways for Parents

**1. EHF Elite is genuinely elite.** If you're skeptical about whether a league in Massachusetts really competes nationally - stop being skeptical. The data bears it out across three age groups. Multiple EHF Elite programs rank in the top 15 nationally, year over year.

**2. There are nationally competitive programs across a wide geography.** This region isn't just Boston-centric. Worcester, the South Shore, the North Shore, Cape Cod, Springfield, southern New Hampshire, Rhode Island, and Connecticut all have top programs.

**3. The E9 White North organizations carry national credibility.** Lovell Winter Club (#4 nationally at 10U), Valley Jr Warriors, and East Coast Wizards all appear well within national top 100. The E9 White North is not EHF Elite, but it's nationally competitive hockey.

**4. Independent programs can be excellent.** Worcester Shamrocks (#2 nationally at 10U), Neponset Valley River Rats (#21 at 14U), and Seacoast Performance Academy (#28 at 14U) are all independent or outside the main two leagues. The league name isn't everything. Evaluate the program.

**5. Your son doesn't have to play in EHF or E9 to get good development.** But if national ranking or visibility matters to your family, you should understand where the programs sit - and this data is the clearest picture available.

*Have a program I missed or data that should be fixed? Reach out - I'll try to keep this post accurate.*


## Develop Your Team's Game with Video Analysis

Whether you're a coach at an EHF Elite program or a parent of a VHL town team, one of the highest-leverage things you can do for player development is **show them what you're talking about on video**.

Scout Elite was built for exactly this - youth and minor hockey parents and coaches who want real video analysis without a $10,000 platform or a full-time video staff. Clip games live from your phone, organize teaching moments into focused reviews, and share them directly with players.

<div style="margin: 1.5em 0; text-align: center;">
	<a href="https://xpress.scout-elite.com/" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:1.2em;padding:0.7em 2em;">Sign Up for Scout Elite - Free 14 Day Trial</a>
</div>
