// Renders the hero: (1) page 1 of template.html filled in by hand (12U sample) -> hero-sheet.png,
// (2) hero.html at 2x -> hero@2x.png. Then downscale to img/blog/hockey-practice-plan-template.jpg
// (1600x840) with jimp, per .github/agents.md. Both PNGs are build intermediates; don't commit them.
//   node "Reference Material/Blog/practice-plan-template/hero.mjs"
import { chromium } from "file:///home/n8n/workp/scout-elite/node_modules/playwright/index.mjs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();

const s = await b.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await s.goto(pathToFileURL(path.join(here, "template.html")).href);
await s.addStyleTag({ url: "https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap" });
await s.addStyleTag({ content: `.hw{font-family:Caveat,cursive;color:#1f4fb8;font-weight:700;line-height:1.05}
 .field .hw{font-size:15pt;padding-left:4px;margin-top:-1px}
 .box .hw{font-size:16pt;margin-top:2px} td .hw{font-size:14.5pt} body{background:#fff}` });
await s.evaluate(() => {
  const pg = document.querySelectorAll("section.page")[0];
  const put = (el, t) => { const d = document.createElement("div"); d.className = "hw"; d.innerHTML = t; el.appendChild(d); };
  const f = [...pg.querySelectorAll(".field")];
  put(f[1], "12U"); put(f[2], "Nov 18"); put(f[3], "60"); put(f[5], "15 / 2"); put(f[6], "3");
  const ck = pg.querySelector(".checks");
  ck.innerHTML = ck.innerHTML.replace("☐ Full", '<b style="color:#1f4fb8;font-family:Caveat;font-size:15pt">&#10003;</b> Full');
  const box = pg.querySelectorAll(".row2 .box");
  put(box[0], "Win 1v1 battles. Close the gap early."); put(box[1], "Pucks, 8 cones, 2 nets");
  const rows = [...pg.querySelectorAll("table.plan tbody tr")];
  [["6:00","8","Keep-away, 3 zones","Head up, protect the puck"],
   ["6:08","10","1v1 continuous","Stick on puck, inside lane"],
   ["6:18","10","Gap control, 4 lines","Match speed by the blue line"]]
    .forEach((r, i) => { const td = rows[i].querySelectorAll("td"); [1,2,3,4].forEach((c, k) => put(td[c], r[k])); });
  rows[1].querySelector("td.rink svg").insertAdjacentHTML("beforeend",
    `<path d="M150 140 C120 120 110 90 80 80 S40 70 30 85" fill="none" stroke="#1f4fb8" stroke-width="3" stroke-linecap="round"/>
     <path d="M30 85 l8 -9 M30 85 l11 3" stroke="#1f4fb8" stroke-width="3" stroke-linecap="round"/>
     <text x="150" y="160" font-family="Caveat" font-size="26" fill="#1f4fb8" font-weight="700">X</text>
     <text x="88" y="118" font-family="Caveat" font-size="26" fill="#1f4fb8" font-weight="700">O</text>`);
});
await s.evaluate(() => document.fonts.ready); await s.waitForTimeout(500);
await (await s.$("section.page")).screenshot({ path: path.join(here, "hero-sheet.png") });

const p = await b.newPage({ viewport: { width: 1600, height: 840 }, deviceScaleFactor: 2 });
await p.goto(pathToFileURL(path.join(here, "hero.html")).href, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: path.join(here, "hero@2x.png") });
await b.close();
console.log("wrote hero-sheet.png and hero@2x.png; now downscale with jimp");
