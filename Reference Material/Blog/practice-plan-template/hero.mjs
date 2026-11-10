// Renders hero.html at 2x; the 1600x840 JPG is made from the PNG with jimp (see .github/agents.md).
//   node "Reference Material/Blog/practice-plan-template/hero.mjs"
import { chromium } from "file:///home/n8n/workp/scout-elite/node_modules/playwright/index.mjs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 840 }, deviceScaleFactor: 2 });
await p.goto(pathToFileURL(path.join(here, "hero.html")).href, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: path.join(here, "hero@2x.png") });
await b.close();
