// voz.mjs — Voice-over with Gemini TTS (key from GEMINI_API_KEY, see gemini.mjs).
//
//   node scripts/lib/voz.mjs <texto.txt> <salida.wav> [--voz Puck] [--modelo gemini-3.8-flash-tts] [--estilo "..."]
//
// The style line is prepended as a natural-language direction (accent, pace, tone).
// Output: WAV 24 kHz mono (Gemini returns raw PCM s16le).
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { api } from "./gemini.mjs";

// Google's documented TTS pattern: one short "Say …:" line, then the text. Long director's notes
// (even marked "never read") got spoken aloud on 2026-10-28.
const ESTILO = "Say in Rioplatense Spanish from Buenos Aires, with natural voseo, like an intimate cinematic narrator " +
  "talking to one person, building energy toward the end:";

const [entrada, salida, ...resto] = process.argv.slice(2);
if (!entrada || !salida) {
  console.error('Uso: node scripts/lib/voz.mjs <texto.txt> <salida.wav> [--voz Puck] [--modelo gemini-3.8-flash-tts] [--estilo "..."]');
  process.exit(1);
}
const opt = (n, d) => { const i = resto.indexOf(`--${n}`); return i >= 0 ? resto[i + 1] : d; };
const voz = opt("voz", "Puck"), modelo = opt("modelo", "gemini-3.8-flash-tts"), estilo = opt("estilo", ESTILO);
const texto = fs.readFileSync(entrada, "utf8").trim();

async function generar(intento = 1) {
  try {
    return await api(`models/${modelo}:generateContent`, {
      contents: [{ parts: [{ text: `${estilo}\n${texto}` }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voz } } },
      },
    });
  } catch (e) {
    // Free tier: a few requests per minute. Wait and retry on 429.
    if (/429|RESOURCE_EXHAUSTED/.test(e.message) && intento < 5) {
      await new Promise((r) => setTimeout(r, 30000 * intento));
      return generar(intento + 1);
    }
    throw e;
  }
}

const j = await generar();
const parte = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
if (!parte) throw new Error("Gemini no devolvió audio.");
const mime = parte.inlineData.mimeType || "";
const tasa = Number((mime.match(/rate=(\d+)/) || [])[1] || 24000);
const pcm = salida.replace(/\.wav$/i, "") + ".pcm";
fs.writeFileSync(pcm, Buffer.from(parte.inlineData.data, "base64"));
execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "s16le", "-ar", String(tasa), "-ac", "1", "-i", pcm, salida]);
fs.unlinkSync(pcm);
const dur = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", salida]).toString().trim();
console.log(`✓ ${salida} (${voz}, ${modelo}, ${Number(dur).toFixed(2)} s)`);
