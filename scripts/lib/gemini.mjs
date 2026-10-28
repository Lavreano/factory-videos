// gemini.mjs — Gemini API helpers for the studio (voice / TTS).
// The key comes from the GEMINI_API_KEY environment variable (Windows user variable, set with setx).
// It is never written to a file of the studio nor printed.
//
//   node scripts/lib/gemini.mjs modelos            → lists the TTS-capable models
import { execFileSync } from "node:child_process";

export function clave() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  // A shell opened before `setx` doesn't have it yet: read the user variable from the registry.
  try {
    const out = execFileSync("reg", ["query", "HKCU\\Environment", "/v", "GEMINI_API_KEY"], { encoding: "utf8" });
    const m = out.match(/GEMINI_API_KEY\s+REG_\w+\s+(\S+)/);
    if (m) return m[1];
  } catch {}
  throw new Error("Falta GEMINI_API_KEY (setx GEMINI_API_KEY \"...\" y reiniciar la terminal).");
}

export async function api(ruta, cuerpo) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/${ruta}`, {
    method: cuerpo ? "POST" : "GET",
    headers: { "x-goog-api-key": clave(), "content-type": "application/json" },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${j.error?.status || ""} ${j.error?.message || ""}`.slice(0, 300));
  return j;
}

if (process.argv[2] === "modelos") {
  const j = await api("models?pageSize=200");
  const tts = j.models.filter((m) => /tts|audio/i.test(m.name)).map((m) => m.name);
  console.log(`✓ Conexión OK: ${j.models.length} modelos. Con voz/audio:\n  ${tts.join("\n  ") || "(ninguno)"}`);
}
