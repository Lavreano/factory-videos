// Record a live landing as video while it scrolls smoothly, so its real entrance animations are captured
// (a full-page screenshot misses them). Uses Chrome's screencast (CDP) and rebuilds a constant 30 fps MP4 with ffmpeg.
// usage (from a scripts/_entorno.sh shell):
//   node scripts/grabar-landing.cjs <url> <out.mp4> [--ancho 1440] [--alto 810] [--espera 2.5] [--dur 30] [--hasta <px|fin>] [--movil]
//   --espera: seconds holding on the hero before scrolling · --dur: seconds the scroll lasts · --hasta: target scroll (default: page end)
//   --paso: frame-by-frame with virtual time (smooth, no dropped frames; slower to record). Use it when the page has heavy animations.
// Cut slide segments afterwards with ffmpeg (-ss/-t, setpts to fit 7 s). Same browser discovery as capturar-landing.cjs.
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

function buscar(base, nombre) {
  if (!fs.existsSync(base)) return null;
  for (const d of fs.readdirSync(base)) { const p = path.join(base, d, "node_modules", nombre); if (fs.existsSync(p)) return p; }
  return null;
}
function chrome() {
  const base = path.join(os.homedir(), ".cache", "puppeteer", "chrome");
  if (!fs.existsSync(base)) return null;
  for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, "chrome-win64", "chrome.exe"); if (fs.existsSync(p)) return p; }
  return null;
}
const PPT = process.env.PPT || buscar(path.join(process.env.LOCALAPPDATA || "", "npm-cache", "_npx"), "puppeteer-core");
const CHROME = process.env.CHROME || chrome();
if (!PPT || !CHROME) { console.error("No encuentro puppeteer-core o Chrome (corré una vez `npx hyperframes@0.8.221 capture <url>`)."); process.exit(1); }
const puppeteer = require(PPT);

const args = process.argv.slice(2);
const url = args[0], out = args[1];
if (!url || !out) { console.error("uso: node scripts/grabar-landing.cjs <url> <salida.mp4> [--ancho 1440] [--alto 810] [--espera 2.5] [--dur 30] [--hasta px|fin] [--movil]"); process.exit(1); }
const opt = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const movil = args.includes("--movil");
const W = +opt("--ancho", movil ? 390 : 1440), H = +opt("--alto", movil ? 844 : 810);
const ESPERA = +opt("--espera", 2.5), DUR = +opt("--dur", 30), HASTA = opt("--hasta", "fin");
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "grabar-"));
  const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars", `--window-size=${W},${H}`] });
  const p = await b.newPage();
  await p.setViewport(movil ? { width: W, height: H, deviceScaleFactor: 3, isMobile: true, hasTouch: true } : { width: W, height: H, deviceScaleFactor: 1 });
  await p.goto(url, { waitUntil: "load", timeout: 120000 });
  await espera(3000);
  const cdp = await p.createCDPSession();
  if (args.includes("--paso")) {
    // frame-by-frame with the page clock frozen: advance exactly 1/30 s of virtual time, scroll, capture; no dropped frames
    const total = Math.round((ESPERA + DUR + 1.5) * 30);
    const fin = await p.evaluate((h) => (h === "fin" ? document.documentElement.scrollHeight - innerHeight : +h), HASTA);
    await cdp.send("Emulation.setVirtualTimePolicy", { policy: "pause" });
    const avanzar = (ms) => new Promise((ok) => { cdp.once("Emulation.virtualTimeBudgetExpired", ok); cdp.send("Emulation.setVirtualTimePolicy", { policy: "advance", budget: ms }); });
    for (let i = 0; i < total; i++) {
      const t = i / 30 - ESPERA, x = Math.max(0, Math.min(1, t / DUR)), k = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      await p.evaluate((y) => scrollTo(0, y), fin * k);
      await avanzar(1000 / 30);
      const shot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 88 });
      fs.writeFileSync(path.join(tmp, `f${String(i).padStart(5, "0")}.jpg`), Buffer.from(shot.data, "base64"));
      if (i % 150 === 0) console.log(`cuadro ${i}/${total}`);
    }
    await b.close();
    execFileSync("ffmpeg", ["-v", "error", "-y", "-framerate", "30", "-i", path.join(tmp, "f%05d.jpg"), "-vf", "format=yuv420p,scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-movflags", "+faststart", out], { stdio: "inherit" });
    console.log(`ok ${out} · ${total} cuadros (modo paso) · scroll hasta ${fin}px`);
    return;
  }
  const frames = [];
  cdp.on("Page.screencastFrame", async (f) => {
    const file = path.join(tmp, `f${String(frames.length).padStart(5, "0")}.jpg`);
    fs.writeFileSync(file, Buffer.from(f.data, "base64"));
    frames.push({ file, t: f.metadata.timestamp });
    try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch (e) {}
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 88, maxWidth: movil ? W * 3 : W, maxHeight: movil ? H * 3 : H, everyNthFrame: 1 });
  await espera(ESPERA * 1000);
  // smooth scroll inside the page (ease in-out), so the site's own scroll animations fire as for a visitor
  const fin = await p.evaluate((h) => (h === "fin" ? document.documentElement.scrollHeight - innerHeight : +h), HASTA);
  await p.evaluate((fin, dur) => new Promise((ok) => {
    const t0 = performance.now(), y0 = scrollY;
    const paso = (now) => { const x = Math.min(1, (now - t0) / (dur * 1000)); const k = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      scrollTo(0, y0 + (fin - y0) * k); if (x < 1) requestAnimationFrame(paso); else ok(); };
    requestAnimationFrame(paso);
  }), fin, DUR);
  await espera(1500);
  await cdp.send("Page.stopScreencast");
  await b.close();
  if (frames.length < 2) { console.error("La grabación no produjo cuadros."); process.exit(1); }
  // ffmpeg concat with each frame's real duration → constant 30 fps
  const lista = frames.map((f, i) => `file '${f.file.replace(/\\/g, "/")}'\nduration ${((frames[i + 1] ? frames[i + 1].t : f.t + 1 / 30) - f.t).toFixed(4)}`).join("\n") + `\nfile '${frames[frames.length - 1].file.replace(/\\/g, "/")}'\n`;
  fs.writeFileSync(path.join(tmp, "lista.txt"), lista);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", path.join(tmp, "lista.txt"), "-vf", "fps=30,format=yuv420p,scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-movflags", "+faststart", out], { stdio: "inherit" });
  console.log(`ok ${out} · ${frames.length} cuadros · ${(frames[frames.length - 1].t - frames[0].t).toFixed(1)} s · scroll hasta ${fin}px`);
})().catch((e) => { console.error(e); process.exit(1); });
