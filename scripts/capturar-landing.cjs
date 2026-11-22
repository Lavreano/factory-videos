// Capture a live landing after its scroll-reveal animations have run: full page + hero viewport, desktop (1920) and mobile (390 @3x).
// usage (from scripts/_entorno.sh shell): node scripts/capturar-landing.cjs <url> <outPrefix>
// Writes <outPrefix>-desk-hero.png, -desk-full.png, -movil-hero.png, -movil-full.png.
// Uses HyperFrames' own puppeteer-core + Chrome (no extra install). Override with PPT=<path to puppeteer-core> CHROME=<chrome.exe>.
const fs = require("fs");
const path = require("path");
const os = require("os");

function buscar(base, nombre) {
  if (!fs.existsSync(base)) return null;
  for (const d of fs.readdirSync(base)) {
    const p = path.join(base, d, "node_modules", nombre);
    if (fs.existsSync(p)) return p;
  }
  return null;
}
function chrome() {
  const base = path.join(os.homedir(), ".cache", "puppeteer", "chrome");
  if (!fs.existsSync(base)) return null;
  for (const v of fs.readdirSync(base).sort().reverse()) {
    const p = path.join(base, v, "chrome-win64", "chrome.exe");
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const PPT = process.env.PPT || buscar(path.join(process.env.LOCALAPPDATA || "", "npm-cache", "_npx"), "puppeteer-core");
const CHROME = process.env.CHROME || chrome();
if (!PPT || !CHROME) { console.error("No encuentro puppeteer-core o Chrome: corré una vez `npx hyperframes@0.8.221 capture <url>` o pasá PPT/CHROME."); process.exit(1); }
const puppeteer = require(PPT);
const [url, out] = process.argv.slice(2);
if (!url || !out) { console.error("uso: node scripts/capturar-landing.cjs <url> <prefijoSalida>"); process.exit(1); }
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
  for (const [tag, vp] of [["desk", { width: 1920, height: 1080, deviceScaleFactor: 1 }], ["movil", { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }]]) {
    const p = await b.newPage();
    await p.setViewport(vp);
    await p.goto(url, { waitUntil: "load", timeout: 120000 });
    await espera(4000);
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto; y += Math.round(vp.height * 0.6)) { await p.evaluate((y) => window.scrollTo(0, y), y); await espera(450); }
    await p.evaluate(() => window.scrollTo(0, 0));
    await espera(3500);
    await p.screenshot({ path: `${out}-${tag}-hero.png` });
    await p.screenshot({ path: `${out}-${tag}-full.png`, fullPage: true });
    console.log(tag, alto);
    await p.close();
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
