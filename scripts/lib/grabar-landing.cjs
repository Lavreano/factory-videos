// v3 recorder: deterministic frame-by-frame capture. reducedMotion kills lenis + Reveal transitions (no pops, no fight with scrollTo);
// scroll position is a pure function of time (continuous, never stops: slows to ~30% near section tops).
const { chromium } = require(process.argv[2]);
const fs = require('fs'); const path = require('path');
const [,, , OUT, URL, MODE = 'desktop', DUR = '24', FPS = '30'] = process.argv;
setTimeout(() => { console.log('WATCHDOG'); process.exit(2); }, 2400000); // heavy live landings need ~1.5 s per screenshot
(async () => {
  fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ args: ['--hide-scrollbars'] });
  const ctx = await b.newContext(MODE === 'mobile'
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' }
    : { viewport: { width: 1440, height: 844 }, deviceScaleFactor: 1.3333, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(1200);
  const plan = await p.evaluate(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const tops = [...document.querySelectorAll('section, footer')].map(s => Math.round(s.getBoundingClientRect().top + scrollY - 45));
    return { max, stops: [0, ...new Set(tops.filter(t => t > 60 && t < max))].sort((a, b) => a - b).concat([max]), lenis: !!window.lenis };
  });
  console.log(JSON.stringify(plan));
  // y(t): integrate dt = dy / w(y)
  const R = MODE === 'mobile' ? 300 : 420, MIN = 0.3;
  const w = (y) => { const d = Math.min(...plan.stops.map(s => Math.abs(y - s))); const k = Math.min(1, d / R); return MIN + (1 - MIN) * (k * k * (3 - 2 * k)); };
  const N = 4000, ys = [], cum = [0];
  for (let i = 0; i <= N; i++) ys.push(plan.max * i / N);
  for (let i = 1; i <= N; i++) cum.push(cum[i - 1] + (plan.max / N) / w((ys[i] + ys[i - 1]) / 2));
  const total = cum[N];
  const HOLD = 0.8, D = Number(DUR), fps = Number(FPS), moveT = D - 2 * HOLD;
  const yAt = (t) => { const k = Math.min(1, Math.max(0, (t - HOLD) / moveT));
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;   // global ease in/out (gentle)
    const kk = 0.35 * k + 0.65 * e; const target = kk * total;
    let lo = 0, hi = N; while (hi - lo > 1) { const m = (lo + hi) >> 1; (cum[m] <= target ? lo = m : hi = m); }
    const f = (target - cum[lo]) / Math.max(1e-9, cum[hi] - cum[lo]); return ys[lo] + (ys[hi] - ys[lo]) * f; };
  const frames = Math.round(D * fps); const log = [];
  if (process.argv[8] === 'pagina') {
    // fast mode: with reducedMotion the page is static, so one full-page capture + a synthetic scroll gives the same frames.
    // Fixed/sticky elements appear only once at their place on the page (instead of following the viewport).
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
    // clip to the viewport width: a page with horizontal overflow would otherwise give a huge (or timed-out) capture
    const alto = await p.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
    const ancho = await p.evaluate(() => innerWidth);
    // Chrome blanks anything past ~16384 device px in one capture: tall pages go in strips (pagina-0.png, -1, ...)
    const dsfCap = MODE === 'mobile' ? 2 : 1.3333, tramo = Math.floor(15000 / dsfCap);
    if (alto * dsfCap <= 15000) {
      await p.screenshot({ path: path.join(OUT, 'pagina.png'), fullPage: true, clip: { x: 0, y: 0, width: ancho, height: alto }, timeout: 120000 });
    } else {
      for (let i = 0, y0 = 0; y0 < alto; i++, y0 += tramo)
        await p.screenshot({ path: path.join(OUT, `pagina-${i}.png`), fullPage: true, clip: { x: 0, y: y0, width: ancho, height: Math.min(tramo, alto - y0) }, timeout: 120000 });
    }
    const vh = await p.evaluate(() => innerHeight);
    for (let i = 0; i < frames; i++) log.push(yAt(i / fps));
    fs.writeFileSync(path.join(OUT, 'y.json'), JSON.stringify({ plan, y: log, vh, dsf: MODE === 'mobile' ? 2 : 1.3333, fps }));
    await b.close(); console.log('done (pagina)'); process.exit(0);
  }
  for (let i = 0; i < frames; i++) {
    const y = yAt(i / fps);
    await p.evaluate((y) => { window.scrollTo(0, y); return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }, y);
    await p.screenshot({ path: path.join(OUT, `f${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 94 });
    log.push(Math.round(y));
    if (i % 60 === 0) console.log(i, '/', frames, Math.round(y));
  }
  fs.writeFileSync(path.join(OUT, 'y.json'), JSON.stringify({ plan, y: log }));
  await b.close(); console.log('done'); process.exit(0); // the watchdog timer would otherwise keep the process alive
})();
