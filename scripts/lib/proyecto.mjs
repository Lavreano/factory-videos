// proyecto.mjs — Helper compartido por los scripts del estudio.
// Prepara una carpeta de composición HyperFrames con las librerías locales,
// los tokens/fuentes de una marca y las piezas de la biblioteca.
//
// Uso (CLI):
//   node scripts/lib/proyecto.mjs preparar <dirComposicion> <marca> [--sin-piezas]
//   node scripts/lib/proyecto.mjs marca    <dirComposicion> <marca>
//   node scripts/lib/proyecto.mjs piezas   <dirComposicion>
//   node scripts/lib/proyecto.mjs laboratorio <dirComposicion> <pieza> <duracion> [varsJSON] [fondo]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const HF_VERSION = "0.8.209";

const rel = (...p) => path.join(RAIZ, ...p);

function copiar(origen, destino) {
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.copyFileSync(origen, destino);
}

function copiarDir(origen, destino, filtro = () => true) {
  fs.mkdirSync(destino, { recursive: true });
  for (const e of fs.readdirSync(origen, { withFileTypes: true })) {
    const o = path.join(origen, e.name);
    const d = path.join(destino, e.name);
    if (e.isDirectory()) copiarDir(o, d, filtro);
    else if (filtro(e.name)) copiar(o, d);
  }
}

export function marcasValidas() {
  return fs
    .readdirSync(rel("marcas"), { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name);
}

/** Copia gsap, three (module + core) y estudio.js a assets/lib/. */
export function librerias(dir) {
  const lib = path.join(dir, "assets", "lib");
  copiar(rel("node_modules", "gsap", "dist", "gsap.min.js"), path.join(lib, "gsap.min.js"));
  copiar(rel("node_modules", "three", "build", "three.module.min.js"), path.join(lib, "three.module.min.js"));
  copiar(rel("node_modules", "three", "build", "three.core.min.js"), path.join(lib, "three.core.min.js"));
  copiar(rel("biblioteca", "lib", "estudio.js"), path.join(lib, "estudio.js"));
}

/** Sincroniza tokens.css + fuentes/ de la marca en assets/marca/ (reemplaza lo anterior). */
export function marca(dir, slug) {
  const origen = rel("marcas", slug);
  if (!fs.existsSync(path.join(origen, "tokens.css"))) {
    throw new Error(`La marca "${slug}" no existe o no tiene tokens.css (marcas/${slug}/tokens.css).`);
  }
  const destino = path.join(dir, "assets", "marca");
  fs.rmSync(destino, { recursive: true, force: true });
  copiar(path.join(origen, "tokens.css"), path.join(destino, "tokens.css"));
  copiarDir(path.join(origen, "fuentes"), path.join(destino, "fuentes"), (n) => n.endsWith(".woff2"));
  fs.writeFileSync(path.join(destino, "MARCA.txt"), `${slug}\n`);
}

/** Lista las piezas de la biblioteca: [{ tipo, nombre, archivo }]. */
export function piezasBiblioteca() {
  const out = [];
  for (const tipo of ["escenas", "transiciones", "fondos"]) {
    const base = rel("biblioteca", tipo);
    if (!fs.existsSync(base)) continue;
    for (const e of fs.readdirSync(base, { withFileTypes: true })) {
      const archivo = path.join(base, e.name, "escena.html");
      if (e.isDirectory() && fs.existsSync(archivo)) out.push({ tipo, nombre: e.name, archivo });
    }
  }
  return out;
}

/** Copia todas las piezas a compositions/<nombre>.html (no pisa las ya editadas salvo forzar). */
export function piezas(dir, { forzar = false } = {}) {
  const comp = path.join(dir, "compositions");
  fs.mkdirSync(comp, { recursive: true });
  const copiadas = [];
  for (const p of piezasBiblioteca()) {
    const d = path.join(comp, `${p.nombre}.html`);
    if (forzar || !fs.existsSync(d)) {
      copiar(p.archivo, d);
      copiadas.push(p.nombre);
    }
  }
  return copiadas;
}

/** id de composición declarado en una pieza (data-composition-id del root). */
export function idDePieza(archivo) {
  const html = fs.readFileSync(archivo, "utf8");
  const m = html.match(/<div id="root"[^>]*data-composition-id="([^"]+)"/);
  if (!m) throw new Error(`No encuentro data-composition-id en ${archivo}`);
  return m[1];
}

function packageJson(nombre) {
  return JSON.stringify(
    {
      name: nombre,
      private: true,
      type: "module",
      scripts: {
        dev: `npx --yes hyperframes@${HF_VERSION} preview`,
        check: `npx --yes hyperframes@${HF_VERSION} check`,
        render: `npx --yes hyperframes@${HF_VERSION} render`,
      },
    },
    null,
    2,
  );
}

const HYPERFRAMES_JSON = JSON.stringify(
  {
    $schema: "https://hyperframes.heygen.com/schema/hyperframes.json",
    registry: "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
    paths: { blocks: "compositions", components: "compositions/components", assets: "assets" },
    media: { autoProxy: true },
  },
  null,
  2,
);

/** Cabecera común del index.html de cualquier proyecto del estudio. */
export function cabecera(titulo) {
  return `<!doctype html>
<html lang="es" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>${titulo}</title>
    <!-- Marca: assets/marca/tokens.css (lo escribe scripts/sincronizar-marca.sh) -->
    <link rel="stylesheet" href="assets/marca/tokens.css" />
    <script src="assets/lib/gsap.min.js"></script>
    <script src="assets/lib/estudio.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: var(--color-bg); }
      #base { position: absolute; inset: 0; background: var(--color-bg); }
    </style>
  </head>`;
}

/** Prepara una carpeta de composición completa. */
export function preparar(dir, slug, { conPiezas = true } = {}) {
  fs.mkdirSync(path.join(dir, "assets", "media"), { recursive: true });
  librerias(dir);
  marca(dir, slug);
  if (conPiezas) piezas(dir);
  const nombre = path.basename(path.dirname(dir)) || "reel";
  if (!fs.existsSync(path.join(dir, "package.json"))) fs.writeFileSync(path.join(dir, "package.json"), packageJson(nombre));
  if (!fs.existsSync(path.join(dir, "hyperframes.json"))) fs.writeFileSync(path.join(dir, "hyperframes.json"), HYPERFRAMES_JSON);
  fs.writeFileSync(path.join(dir, "estudio.json"), JSON.stringify({ marca: slug, hyperframes: HF_VERSION }, null, 2));
}

/** index.html del laboratorio: un fondo opcional + una pieza ocupando toda la duración. */
export function laboratorio(dir, nombrePieza, duracion, vars = {}, fondo = "") {
  const pieza = piezasBiblioteca().find((p) => p.nombre === nombrePieza);
  if (!pieza) throw new Error(`No existe la pieza "${nombrePieza}" en biblioteca/.`);
  const id = idDePieza(pieza.archivo);
  let fondoHost = "";
  if (fondo) {
    const pf = piezasBiblioteca().find((p) => p.nombre === fondo);
    if (!pf) throw new Error(`No existe el fondo "${fondo}".`);
    const idf = idDePieza(pf.archivo);
    fondoHost = `
      <div id="${idf}" data-composition-id="${idf}" data-composition-src="compositions/${fondo}.html"
        data-start="0" data-duration="${duracion}" data-track-index="1" data-track-kind="graphics"
        data-width="1080" data-height="1920" style="z-index: 1"></div>`;
  }
  const valores = JSON.stringify(vars).replace(/'/g, "&#39;");
  const html = `${cabecera(`Laboratorio — ${nombrePieza}`)}
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${duracion}" data-width="1080" data-height="1920">
      <div id="base"></div>${fondoHost}
      <div id="${id}" data-composition-id="${id}" data-composition-src="compositions/${nombrePieza}.html"
        data-start="0" data-duration="${duracion}" data-track-index="2" data-track-kind="graphics"
        data-width="1080" data-height="1920" style="z-index: 2"
        data-variable-values='${valores}'></div>
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

// ---------- CLI ----------
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [cmd, dirArg, ...resto] = process.argv.slice(2);
  try {
    if (!cmd || !dirArg) throw new Error("Uso: proyecto.mjs <preparar|marca|piezas|laboratorio> <dir> ...");
    const dir = path.resolve(dirArg);
    if (cmd === "preparar") {
      preparar(dir, resto[0], { conPiezas: !resto.includes("--sin-piezas") });
      console.log(`✓ Composición preparada en ${dir} (marca: ${resto[0]})`);
    } else if (cmd === "marca") {
      marca(dir, resto[0]);
      console.log(`✓ Tokens de "${resto[0]}" sincronizados en ${path.join(dir, "assets", "marca")}`);
    } else if (cmd === "piezas") {
      const c = piezas(dir, { forzar: resto.includes("--forzar") });
      console.log(`✓ Piezas copiadas: ${c.length ? c.join(", ") : "(ninguna nueva)"}`);
    } else if (cmd === "laboratorio") {
      const [pieza, duracion, varsJson, fondo] = resto;
      preparar(dir, process.env.MARCA || "personal", { conPiezas: false });
      piezas(dir, { forzar: true });
      laboratorio(dir, pieza, Number(duracion) || 4, varsJson ? JSON.parse(varsJson) : {}, fondo || "");
      console.log(`✓ Laboratorio listo: ${pieza} (${duracion}s, marca ${process.env.MARCA || "personal"})`);
    } else {
      throw new Error(`Comando desconocido: ${cmd}`);
    }
  } catch (e) {
    console.error(`✗ ${e.message}`);
    process.exit(1);
  }
}
