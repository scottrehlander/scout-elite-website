// Builds /downloads/hockey-practice-plan-template.pdf and a PNG preview of each page
// from template.html. Run from the website repo root:
//   node "Reference Material/Blog/practice-plan-template/build.mjs"
// Uses the scout-elite repo's Playwright (sibling checkout), the same pattern as other
// headless-Chromium scripts on the Pi.
import { chromium } from "file:///home/n8n/workp/scout-elite/node_modules/playwright/index.mjs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.join(here, "template.html")).href);
await page.pdf({ path: path.join(root, "downloads/hockey-practice-plan-template.pdf"),
                 format: "Letter", printBackground: true, preferCSSPageSize: true });
// Page previews for the blog post (print media, one screenshot per page section).
await page.emulateMedia({ media: "print" });
const sections = await page.$$("section.page");
for (let i = 0; i < sections.length; i++) {
  await sections[i].screenshot({ path: path.join(here, `preview-${i + 1}.png`) });
}
await browser.close();
console.log("wrote downloads/hockey-practice-plan-template.pdf and previews");
