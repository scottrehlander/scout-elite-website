# Handoff: Add Minnesota Hockey Districts to the Youth-Post Map

**For:** the agent picking this up (Sonnet).
**Task:** Add all Minnesota Hockey *districts* to the map in the Minnesota youth hockey post, with informative popups, a Leaflet layers toggle, and a new in-body districts table. The map currently only shows AAA clubs and the prep program — districts (the actual foundation of youth hockey here) are missing.

**Target file:** `_posts/2026-06-08-minnesota-youth-hockey-explained-parent-guide.md`
**Specifically:** the `mn-youth-map` `<script>` block, plus a new table in the body and an update to the "12 districts" text if the verified count differs.

Do **not** remove or alter the existing AAA (orange `#e8590c`) or prep (purple `#7048e8`) markers. Districts are an additive third layer.

---

## 1. Get the data right first (do not trust a remembered list)

The district structure is **administrative** and is **not on MyHockeyRankings**. MHR is team/association-level (good for individual AAA/association team ratings and records) — it does **not** define districts or which associations belong to them. Sources, in priority order:

1. **`minnesotahockey.org/associations`** — the canonical list of districts and their member associations. **Source of truth for the district list itself.** (Note: this page sometimes returns 403 to automated fetches — if so, use web search against the domain, or fetch individual district sites below.)
2. **Each district's own website** — e.g. `minnesotahockeydistrict8.com` — for region description, member-association roster, and often a coverage map.
3. **MHR** — optional only, if you want one team-level stat per district (e.g., highest-rated association team in that region). Not required for the core task.

### ⚠️ Verify before coding
- The district list is **non-contiguous** — the numbers skip (there is no District 7/13/14 in the current setup, etc.). Confirm exactly which numbers are active.
- Sources disagree between **"12"** and **"13"** districts. The post body currently states **"12 districts"** in two places (the "Layer 1" section and the at-a-glance table). Whatever the verified count is, make the **map, the body prose, and the table all agree**, and cite the source.
- Do not invent centroid coordinates from memory — geocode each district's approximate geographic center from its actual member towns once you have the verified roster.

---

## 2. Per-district info to capture

For each district, gather:
- **District number** (e.g., "District 3")
- **Common region name** (e.g., "East Metro / St. Paul suburbs")
- **Major towns / area covered**
- **Approx. number of member associations**
- **2–3 notable member associations**, each linked to its site
- **Link to the district's own website**
- *(Optional)* a feeder high school or two from that region, to tie back to the companion HS post

---

## 3. Design decision (already decided): Option 1

Districts are **areas, not points**, so centroid pins are for *geographic orientation only* — the rich info lives in a table, not crammed into map popups.

- **Map:** one labeled centroid marker per district in a new color (use teal `#0ca678`), with a concise popup (district number + region name + town list + association count + district-site link).
- **Layers toggle:** wrap each category in an `L.layerGroup` and add `L.control.layers(null, { 'Districts': ..., 'AAA clubs': ..., 'Prep': ... })` so users can switch layers on/off. 13 + 10 + 1 markers in one static view is too cluttered otherwise.
- **Legend:** extend the existing bottom-right legend `div` to add the teal "Minnesota Hockey district" swatch (keep the existing orange/purple entries).
- **New body table:** add a **"Minnesota Hockey Districts at a Glance"** table near the Layer 1 (Community Associations) section — number, region, major towns, # associations, notable associations (linked), district-site link. This table carries the substance; the map is orientation.

**Not chosen** (context, don't do these): polygon/GeoJSON boundaries (no clean source published; high effort) and a second separate map (page weight). If a clean district-boundary GeoJSON happens to surface, flag it to the user before switching approaches.

---

## 4. Implementation notes

- Reuse the existing helper: `marker(lat, lng, color, name, town, note)` already in the script block. Add a color constant `var DIST = '#0ca678';`.
- Build three `L.layerGroup`s (districts, AAA, prep), add each to the map, and pass them to `L.control.layers`. Move the existing AAA/prep markers into their layer groups rather than `.addTo(map)` individually.
- Keep popup HTML consistent with current markers: `<strong>` name, `<br>` town, `<span style="font-size:0.92em">` note. District popups can also include the district-site link inside the note.
- Consider widening the initial map view / lowering the zoom slightly so all districts (which span the whole state, incl. far north and southeast) are visible on load. Current view is `setView([45.4, -93.4], 7)` — districts may warrant `[46.3, -94.2], 6` or similar; verify all markers fit.
- Update the legend `div.innerHTML` to add the district row.

---

## 5. Citation / dating (required)

District counts and member-association numbers **shift season to season**, so source and date them:
- Add a source line to the **Sources** section citing `minnesotahockey.org/associations` (and any individual district sites used) for the district list and association counts.
- In the new districts table caption, note the data is current as of the **2025-26 season** (consistent with the rest of the post).
- If you pull specific association counts per district, cite where each came from.

---

## 6. After the edit

- Re-run the project UTM audit (per `.github/agents.md`) even though no new CTAs are added — it's cheap and the project rule calls for it after editing a post:
  ```bash
  grep -r 'xpress\.scout-elite\.com' _posts _pages _landing-pages _layouts index.md \
    --include="*.md" --include="*.html" -l | \
    xargs grep -l 'xpress\.scout-elite\.com' | \
    xargs grep -n 'xpress\.scout-elite\.com' | \
    grep -v 'utm_source\|include xpress-cta\|page\.slug\|page\.utm_campaign\|Log In\|nav-login\|xpress\.scout-elite\.com`\|agents\.md\|getting-started\|support\.md'
  ```
  (Known pre-existing benign hit: a lowercase "Log in" line in `_posts/2026-05-01-scout-elite-performance-coaching-tools.md` — not a conversion CTA, ignore it.)
- Sanity-check: every district marker has a working district-site link; map marker count = verified district count + existing 10 club/prep markers; body prose, table, and map all agree on the district count.

---

## Quick reference: current map block shape (for orientation)

The existing script defines `marker(lat, lng, color, name, town, note)`, two color constants (`AAA`, `PREP`), a `programs` array of `marker(...)` calls, a `forEach` that adds them to the map, and a bottom-right `legend` control. Extend this pattern — add the `DIST` constant, a districts array, layer groups, and the layers control; expand the legend. Keep everything else intact.
