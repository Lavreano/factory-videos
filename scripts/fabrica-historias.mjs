// fabrica-historias.mjs — Batch factory for synx build landing stories (template: plantillas/historia-landing).
// Each job only changes the landing: name, desktop recording (live URL or an existing screen recording) and,
// when there is a live URL, the mobile recording. Everything else (tunnel, beam, badge, closing) is the template.
//
// Usage (from the studio root, via the wrapper that loads ffmpeg + Node 22):
//   bash scripts/fabrica-historias.sh <list.json> [--fase preparar|render|todo] [--solo slug1,slug2]
// List item: { "slug": "aida-masterclass", "nombre": "Aida Qui", "url": "https://..." }
//        or: { "slug": "ailen-camejo", "nombre": "Ailen Camejo", "video": "D:/.../ailencamejo.mp4" }  (desktop only)
// Optional per item: "movil": false, "telefono": "#hex" (phone finish colour),
//   "desde"/"hasta": seconds of the source video to keep, "recorte": ffmpeg crop of the screen area (video jobs only),
//   "vivo": { "hero": 6 } records the desktop live with its animations (slow, ~8 min) instead of the frozen fast capture.
// Output per story: videos/synx/historias/<slug>/{composicion,render/<slug>-ig.mp4,render/<slug>-hoja.jpg}
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const RAIZ = process.cwd();
const PLANTILLA = path.join(RAIZ, "plantillas/historia-landing");
const SALIDA = path.join(RAIZ, "videos/synx/historias");
const PW = process.env.PLAYWRIGHT_PATH || "C:/Users/Chuky/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const GRABADOR = path.join(RAIZ, "scripts/lib/grabar-landing.cjs");
// pinned: a new HyperFrames release makes npx stop and ask "Ok to proceed?", which hangs a detached batch
const HF = process.env.HYPERFRAMES_VERSION || "0.8.221";
const DUR_DESK = 20, DUR_MOB = 8, FPS = 30;
// "pagina" (default): full-page capture, valid because reducedMotion freezes the page. "cuadros": one screenshot per frame (slow).
const MODO_GRABACION = process.env.MODO_GRABACION || "pagina";
// Chrome screen recordings (1920x1040): the browser UI takes the first 87 rows; crop to the 1440:844 screen ratio
const CROP_CHROME = "crop=1626:953:147:87";

const args = process.argv.slice(2);
const lista = JSON.parse(fs.readFileSync(args[0], "utf8"));
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const fase = opt("--fase", "todo");
const solo = opt("--solo", "");
const jobs = solo ? lista.filter((j) => solo.split(",").includes(j.slug)) : lista;

const run = (cmd, a, o = {}) => execFileSync(cmd, a, { stdio: "inherit", ...o });
const sh = (cmd, a, o = {}) => execFileSync(cmd, a, { encoding: "utf8", ...o }).trim();
const dur = (f) => Number(sh("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]));
const log = (m) => console.log(`[fabrica] ${m}`);

function copiar(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const a = path.join(src, e.name), b = path.join(dst, e.name);
    e.isDirectory() ? copiar(a, b) : fs.copyFileSync(a, b);
  }
}

function grabar(url, modo, segundos, mp4, fin) {
  const tmp = mp4 + ".frames";
  if (!fs.existsSync(path.join(tmp, "y.json"))) run("node", [GRABADOR, PW, tmp, url, modo, String(segundos), String(FPS), MODO_GRABACION]); // reuse a finished capture
  if (fs.existsSync(path.join(tmp, "pagina.png")) || fs.existsSync(path.join(tmp, "pagina-0.png"))) { // fast mode: one full-page capture + synthetic scroll (~1 min instead of ~15)
    run("python", [path.join(RAIZ, "scripts/lib/scroll-desde-captura.py"), tmp, mp4]);
    ultimoCuadro(mp4, fin); fs.rmSync(tmp, { recursive: true, force: true }); return;
  }
  run("ffmpeg", ["-v", "error", "-y", "-framerate", String(FPS), "-i", path.join(tmp, "f%05d.jpg"),
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", "-preset", "slow", "-movflags", "+faststart", mp4]);
  ultimoCuadro(mp4, fin);
  fs.rmSync(tmp, { recursive: true, force: true });
}

function desdeVideo(entrada, mp4, fin, desde = 0, hasta, recorte = CROP_CHROME) {
  const largo = (hasta ?? dur(entrada)) - desde; // optional trim: drops the start/end of a raw screen recording
  const k = DUR_DESK / largo; // retime the kept part to the template's scroll length
  run("ffmpeg", ["-v", "error", "-y", "-ss", String(desde), "-t", String(largo), "-i", entrada, "-an",
    "-vf", `${recorte},setpts=${k.toFixed(6)}*PTS,fps=${FPS},scale=1920:1124:flags=lanczos`,
    "-t", String(DUR_DESK), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", "-preset", "slow", "-movflags", "+faststart", mp4]);
  ultimoCuadro(mp4, fin);
}

function ultimoCuadro(mp4, fin) {
  run("ffmpeg", ["-v", "error", "-y", "-sseof", "-0.2", "-i", mp4, "-frames:v", "1", "-q:v", "2", fin]);
}

function preparar(j) {
  const dir = path.join(SALIDA, j.slug), comp = path.join(dir, "composicion"), media = path.join(comp, "assets/media/v3");
  const movil = j.movil ?? Boolean(j.url);
  if (!fs.existsSync(path.join(comp, "index.html"))) copiar(PLANTILLA, comp);
  else fs.copyFileSync(path.join(PLANTILLA, "index.html"), path.join(comp, "index.html")); // template changes reach every story
  fs.mkdirSync(path.join(dir, "render"), { recursive: true });
  const desk = path.join(media, "scroll-desk.mp4"), mob = path.join(media, "scroll-mob.mp4");
  const listo = (f, img) => fs.existsSync(f) && fs.statSync(f).size > 1000 && fs.existsSync(img); // a failed run leaves empty files
  if (!listo(desk, path.join(media, "scroll-desk-fin.jpg"))) {
    // a recorded video wins for desktop (keeps the landing's animations); the url still feeds the phone
    log(`${j.slug}: desktop ${j.video ? "from " + path.basename(j.video) : "recording " + j.url}`);
    if (j.vivo) { // live capture with the landing's animations (scripts/lib/grabar-vivo.cjs): hero hold + scroll = 20 s
      const heroS = j.vivo.hero ?? 4;
      run("node", [path.join(RAIZ, "scripts/lib/grabar-vivo.cjs"), PW, desk, j.url, String(heroS), String(DUR_DESK - heroS - 0.8)]);
      ultimoCuadro(desk, path.join(media, "scroll-desk-fin.jpg"));
    } else !j.video ? grabar(j.url, "desktop", DUR_DESK, desk, path.join(media, "scroll-desk-fin.jpg"))
          : desdeVideo(j.video, desk, path.join(media, "scroll-desk-fin.jpg"), j.desde, j.hasta, j.recorte);
  }
  if (movil && !listo(mob, path.join(media, "scroll-mob-fin.jpg"))) {
    log(`${j.slug}: mobile recording`);
    grabar(j.url, "mobile", DUR_MOB, mob, path.join(media, "scroll-mob-fin.jpg"));
  }
  if (!movil) { // the template still references the mobile clip: a 1-frame placeholder keeps the markup valid
    fs.copyFileSync(desk, mob); // always refresh: a failed run can leave an empty file here
    fs.copyFileSync(path.join(media, "scroll-desk-fin.jpg"), path.join(media, "scroll-mob-fin.jpg"));
  }
  // per-story values in the template
  const html = path.join(comp, "index.html");
  let s = fs.readFileSync(html, "utf8");
  const total = movil ? 39.8 : 31.8;
  s = s.replace(/nombre: "[^"]*"/, `nombre: ${JSON.stringify(j.nombre)}`)
       .replace(/movil: (true|false),/, `movil: ${movil},`)
       .replace(/semilla: "[^"]*"/, `semilla: ${JSON.stringify(j.slug)}`)
       .replace(/telefono: \{ color: "[^"]*" \}/, `telefono: { color: "${j.telefono || "#1d1d22"}" }`)
       .replace(/(data-composition-id="main" data-start="0" data-duration=")[\d.]+"/, `$1${total}"`)
       .replace(/(id="rec-m"[^>]*?data-duration=")[\d.]+"/, `$1${movil ? 8 : 5}"`); // without phone the mobile clip must end before the root
  fs.writeFileSync(html, s);
  fs.writeFileSync(path.join(dir, "historia.json"), JSON.stringify({ ...j, movil, duracion: total }, null, 2));
}

function renderizar(j) {
  const dir = path.join(SALIDA, j.slug), comp = path.join(dir, "composicion"), r = path.join(dir, "render");
  const master = path.join(r, `${j.slug}.mp4`), ig = path.join(r, `${j.slug}-ig.mp4`);
  if (fs.existsSync(ig)) return log(`${j.slug}: already rendered`);
  log(`${j.slug}: render`);
  run("npx", ["--yes", `hyperframes@${HF}`, "render", "--quality", "delivery", "--output", `../render/${j.slug}.mp4`], { cwd: comp, shell: true }); // relative: the studio path has a space
  run("bash", ["scripts/exportar-instagram.sh", path.relative(RAIZ, master), path.relative(RAIZ, ig)]);
  run("ffmpeg", ["-v", "error", "-y", "-i", ig, "-vf", "fps=1,scale=180:-1,tile=8x5", "-frames:v", "1", path.join(r, `${j.slug}-hoja.jpg`)]);
  fs.rmSync(master, { force: true }); // the master is ~200 MB; the -ig export is the deliverable
}

for (const j of jobs) {
  try {
    if (fase !== "render") preparar(j);
    if (fase !== "preparar") renderizar(j);
  } catch (e) { log(`${j.slug}: FAILED ${e.message.split("\n")[0]}`); }
}
log("done");
