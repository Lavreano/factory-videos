// Live recorder: records a landing WITH its animations (hero effects, reveals, canvas), frame by frame.
// The page clock is frozen (Playwright clock: Date, timers, requestAnimationFrame) and CSS/Web animations are paused;
// every frame we advance both by exactly 1/30 s, scroll, and take a screenshot. Slow, but smooth and with no jumps
// (the Chrome screencast gave ~3 fps with timestamps out of order on heavy pages).
// Use it when the landing's motion is the point; the fast "pagina" mode freezes the page.
//
// Usage: node grabar-vivo.cjs <playwright path> <out.mp4> <url> [hero seconds=3] [scroll seconds=18]
const { chromium } = require(process.argv[2]);
const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const [,, , OUT, URL, HERO = '3', SCROLL = '18'] = process.argv;
const FPS = 30, DT = 1000 / FPS;
setTimeout(() => { console.log('WATCHDOG'); process.exit(2); }, 2400000);
(async () => {
  const tmp = OUT + '.vivo'; fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
  const b = await chromium.launch({ args: ['--hide-scrollbars'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 844 }, deviceScaleFactor: 1.3333 });
  const p = await ctx.newPage();
  await p.clock.install(); // fake timers that still flow in real time until paused
  await p.goto(URL, { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(3000); // with fake timers 'networkidle' never settles
  // warm-up pass: loads lazy images into the cache, then reload so the hero intro plays from the start
  await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); } window.scrollTo(0, 0); });
  await p.reload({ waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(1500);
  await p.clock.pauseAt((await p.evaluate(() => Date.now())) + 1500);
  const max = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const cdp = await ctx.newCDPSession(p);
  const hero = Number(HERO), scroll = Number(SCROLL), frames = Math.round((hero + scroll + 0.8) * FPS);
  const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  for (let i = 0; i < frames; i++) {
    const k = Math.min(1, Math.max(0, (i / FPS - hero) / scroll));
    await p.evaluate(({ y, dt }) => {
      window.scrollTo(0, y);
      for (const a of document.getAnimations()) { // CSS animations/transitions run on their own clock: step them by hand
        try { a.pause(); a.currentTime = (a.currentTime || 0) + dt; } catch {}
      }
    }, { y: max * (0.35 * k + 0.65 * ease(k)), dt: DT });
    await p.clock.runFor(DT);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
    fs.writeFileSync(path.join(tmp, `f${String(i).padStart(5, '0')}.jpg`), Buffer.from(data, 'base64'));
    if (i % 60 === 0) console.log(`frame ${i}/${frames}`);
  }
  await b.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(tmp, 'f%05d.jpg'),
    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow', '-movflags', '+faststart', OUT], { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`done (vivo) ${frames} frames`); process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
