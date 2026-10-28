// Sound design for url-a-creativos: music (OVO from 5.9 s) + one SFX per event, each placed so its
// measured PEAK lands on the event. Writes render/url-a-creativos-final.mp4.
// Usage (from the studio root): node videos/aura/2026-10-27-url-a-creativos/sonido.mjs
import { execFileSync } from "node:child_process";
import path from "node:path";

const reel = "videos/aura/2026-10-27-url-a-creativos";
const sfx = "assets/compartidos/sfx";
// Optional args: <video in> <mp4 out> [--voz] (e.g. the motion-blurred render, with voice-over).
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const video = pos[0] || path.join(reel, "render", "url-a-creativos.mp4");
const salida = pos[1] || path.join(reel, "render", "url-a-creativos-final.mp4");

// Beat grid measured on the track (87 BPM, phase 0.244 s) — same B() as the composition.
const B = (k) => 0.244 + 0.6897 * k;
const Q = 0.6897 / 4;

// [file, peak inside the file (s, from candidatas/analisis.json), volume dB]
const S = {
  click: ["click-mixkit2568.mp3", 0.005, -8],
  pop: ["pop-mixkit3005.mp3", 0.034, -14],
  whoosh: ["whoosh-mixkit1491.mp3", 0.296, -9],
  impacto: ["impacto-mixkit498.mp3", 0.08, -7],
  swoosh: ["swoosh-mixkit1487.mp3", 0.17, -13],
  tipeo: ["tipeo-mixkit2538.mp3", 0, -18],
};

const eventos = [
  ["pop", B(1) + 0.1], ["pop", B(2) + 0.1],                         // hook words
  ["swoosh", B(3) + 0.1],                                            // match cut
  ["tipeo", B(4), 8 * Q, 1.0],                                       // typing: [kind, t, length, offset in file]
  ["swoosh", B(5) + 0.3],                                            // cursor glide
  ["click", B(6) + 2 * Q - 0.05],                                    // click
  ["whoosh", B(7)], ["impacto", B(7)],                               // DROP: red flood
  ...[0, 1, 2, 3].map((k) => ["pop", B(9) + k * Q + 0.05]),         // swatches
  ["pop", B(10) + 2 * Q + 0.05], ["pop", B(10) + 3 * Q + 0.05],      // tone chips
  ["whoosh", B(11)],                                                 // light flood
  ...[0, 2, 4, 6, 8].map((k) => ["pop", B(11) + Q + k * Q / 2 + 0.1]), // grid build
  ["swoosh", B(15) + 0.1],                                           // camera into the hero card
  ["swoosh", B(17)], ["swoosh", B(18)],                              // ratio changes
  ["swoosh", B(19) + Q + 0.1],                                       // split into angles
  ...[0, 1, 2].map((k) => ["pop", B(20) + k * 2 * Q + 0.05]),       // angle chips
  ["whoosh", B(23)], ["impacto", B(23)],                             // dark switch
  ["whoosh", B(27)], ["impacto", B(27)],                             // logo
  ["pop", B(28) + 2 * Q + 0.1],                                      // CTA box
];

// Voice-over (optional, --voz): each phrase is cut from the TTS take (word times from transcribir.py)
// and placed on its scene. [source start, source end, reel time]
const VOZ_WAV = path.join(reel, "voz", "voz-puck-v2.wav");
const FRASES = [
  [20.66, 22.70, 0.12],              // Otros testean veinte anuncios.
  [22.98, 24.05, B(2) - 0.1],        // Vos, uno.  (with the red "1.")
  [24.50, 29.25, B(3) + 0.08],       // Pegás el link de tu marca y Aura lee tu logo, tus colores, tu tono.
  [29.15, 31.60, B(11) + 0.05],      // Te arma variaciones listas para testear,
  [31.85, 32.95, B(15) + 0.35],      // en todos los formatos.
  [33.30, 35.10, B(19) + 0.25],      // Con un ángulo distinto en cada una.
  [35.50, 37.45, B(23) - 0.05],      // Porque en Meta gana quien testea más.  (with the kinetic lines)
  [38.05, 40.75, B(27) + 0.3],       // Comentá CREATIVOS y te paso el link para probarlo gratis.
];
const conVoz = process.argv.includes("--voz");

const args = ["-v", "error", "-y", "-i", video, "-ss", "5.9", "-t", "22", "-i", "assets/compartidos/musica/hiphop-ovo-mixkit412.mp3"];
const filtros = ["[1:a]afade=t=in:d=0.2,afade=t=out:st=20.6:d=1.4,volume=-2dB[m0]"];
const etiquetas = ["[m]"];
let entrada = 2;
if (conVoz) {
  const vz = [];
  FRASES.forEach(([a, b, t], i) => {
    args.push("-ss", String(a), "-t", String(b - a), "-i", VOZ_WAV);
    filtros.push(`[${entrada}:a]aresample=48000,afade=t=in:d=0.03,afade=t=out:st=${(b - a - 0.06).toFixed(3)}:d=0.06,adelay=${Math.round(t * 1000)}:all=1[v${i}]`);
    vz.push(`[v${i}]`);
    entrada++;
  });
  // Voice bus, then duck the music under it (sidechain) and keep the voice on top.
  filtros.push(`${vz.join("")}amix=inputs=${vz.length}:normalize=0,volume=3dB,asplit=2[voz][llave]`);
  filtros.push(`[m0][llave]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=280[m]`);
  etiquetas.push("[voz]");
} else {
  filtros[0] = filtros[0].replace("[m0]", "[m]");
}
eventos.forEach(([tipo, t, largo, offset], i) => {
  const [archivo, pico, db] = S[tipo];
  const inicio = Math.max(0, t - pico);
  if (largo) args.push("-ss", String(offset || 0), "-t", String(largo));
  args.push("-i", path.join(sfx, archivo));
  const n = entrada++;
  filtros.push(`[${n}:a]aresample=48000,volume=${db}dB,adelay=${Math.round(inicio * 1000)}:all=1[s${i}]`);
  etiquetas.push(`[s${i}]`);
});
filtros.push(`${etiquetas.join("")}amix=inputs=${etiquetas.length}:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.74:level=false,aresample=48000[a]`);
args.push("-filter_complex", filtros.join(";"), "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", "22", salida);
execFileSync("ffmpeg", args, { stdio: "inherit" });
console.log(`✓ ${salida} (${eventos.length} SFX)`);
