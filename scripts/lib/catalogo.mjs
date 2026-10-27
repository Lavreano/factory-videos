// catalogo.mjs — Genera el README.md de cada pieza y biblioteca/catalogo.md.
// La tabla de parámetros sale de data-composition-variables de cada escena.html,
// así la documentación nunca queda desfasada del código.
//
// Uso: node scripts/lib/catalogo.mjs
import fs from "node:fs";
import path from "node:path";
import { RAIZ, piezasBiblioteca, idDePieza } from "./proyecto.mjs";

// Descripción editorial de cada pieza (lo que no se puede deducir del código).
const META = {
  "gancho-tipografico": { dur: 2.6, bloques: "1 Gancho · 2 Promesa", que: "2–3 líneas grandes; cada palabra sube desde desenfoque a nítido con stagger. Las palabras clave van en el acento con subrayado que se dibuja. Con `portada=true` la línea 1 ya está en el fotograma 0 (miniatura legible).", cuando: "Siempre en el gancho. También para la promesa (una sola línea)." },
  "enemigo-glitch": { dur: 3, bloques: "3 Enemigo común", que: "Web genérica gris (solo `--color-ugly-*`) que entra, se rompe con un glitch de franjas con semilla y queda apagada y tachada. Arriba, el nombre del enemigo.", cuando: "Para nombrar la práctica que el seguidor ideal hace hoy y no le funciona." },
  "solucion-reveal-3d": { dur: 4.5, bloques: "4 Solución con nombre propio", que: "Estructura de módulos 3D (Three.js) que se levanta desde el piso; el núcleo brilla con el acento; dolly-out y órbita lenta. Debajo, el nombre del método.", cuando: "El momento de más producción: revelar el método o sistema con nombre. Alternativa: reemplazar el `<canvas>` por un `<video muted>` exportado de Spline/Unicorn a `assets/<marca>/3d/`." },
  "prueba-contador": { dur: 3, bloques: "5 Prueba", que: "Cifra grande que cuenta (tabular, miles con punto) + gráfico de línea que se dibuja a la par, con punto y halo. Rótulo `DATO DE EJEMPLO`.", cuando: "Resultado con cifra. Solo datos reales con permiso o rotulados." },
  "before-after": { dur: 4, bloques: "5 Prueba · 4 Solución", que: "Divisor que barre de una web vieja y genérica a una landing moderna hecha con los tokens de la marca. Etiquetas ANTES/DESPUÉS.", cuando: "La prueba más fuerte para landings. Con un caso real: reemplazar los mocks por capturas en `assets/media/`." },
  "nosotros-vs-otros": { dur: 4, bloques: "6 Valor + objeción", que: "Tabla comparativa: ✕ gris para otros, check en el acento para nosotros; la columna nuestra se resalta con un marco; filas en secuencia.", cuando: "Desarmar la objeción típica (\"lo hago con IA\", \"otro cobra menos\")." },
  "mockup-ui-cursor": { dur: 5, bloques: "4 Solución · 5 Prueba (proceso en vivo)", que: "Ventana de app/landing con cursor falso: clic en un campo, tipeo, clic en el botón y mensaje de éxito. Zoom de cámara estilo Screen Studio.", cuando: "Mostrar el producto funcionando, un flujo de la app o un clic→éxito." },
  "cta-palabra-clave": { dur: 3, bloques: "7 Urgencia + CTA", que: "\"Comentá\" + la palabra clave enorme (ajustada a ~760 px), letra por letra, dentro de un marco que se dibuja y un brillo que late una cantidad finita de veces. No tiene salida: es el final del reel.", cuando: "Siempre en el cierre." },
  "wipe-mascara": { dur: 0.5, bloques: "Transición", que: "Panel que entra barriendo con clip-path, tapa el corte y sale hacia el otro lado.", cuando: "Cambio de bloque con energía. Montar en `corte − 0.25`." },
  "desplazamiento": { dur: 0.4, bloques: "Transición", que: "Corte con desplazamiento (whip): franjas con semilla cruzan con desenfoque y un velo tapa el corte.", cuando: "Cortes rápidos dentro del ritmo del gancho o de un montaje. Montar en `corte − 0.2`." },
  "zoom-through": { dur: 0.6, bloques: "Transición", que: "Círculo del color de fondo que crece desde un punto con un anillo de acento adelante, y se disuelve.", cuando: "Atravesar un botón o un elemento hacia la escena siguiente. Montar en `corte − 0.35` con `x`/`y` en el elemento." },
  flash: { dur: 0.35, bloques: "Transición", que: "Destello corto.", cuando: "Golpe de beat o corte seco. Montar en `corte − 0.06`. Con moderación." },
  "grano-gradiente": { dur: "slot", bloques: "Fondo", que: "Gradiente radial con el acento + grano de película animado (semilla que cambia N veces por segundo).", cuando: "Fondo cálido o cinematográfico para cualquier bloque." },
  "grilla-brillo": { dur: "slot", bloques: "Fondo", que: "Grilla técnica fina con un brillo del acento que recorre la pantalla de arriba abajo.", cuando: "Fondo por defecto de marcas técnicas (personal, synx build, Synous)." },
  particulas: { dur: "slot", bloques: "Fondo", que: "Partículas con semilla que suben despacio; algunas en el acento.", cuando: "Fondo con vida para la solución o el CTA." },
};

function variables(archivo) {
  const html = fs.readFileSync(archivo, "utf8");
  const m = html.match(/data-composition-variables='([\s\S]*?)'>/);
  if (!m) return [];
  try {
    return JSON.parse(m[1]);
  } catch {
    return [];
  }
}

const fmt = (v) => (v === "" ? "_(vacío)_" : typeof v === "string" ? `\`${v}\`` : `\`${JSON.stringify(v)}\``);

function readme(p) {
  const meta = META[p.nombre] || { dur: "?", bloques: "?", que: "", cuando: "" };
  const id = idDePieza(p.archivo);
  const vars = variables(p.archivo);
  const filas = vars.map((v) => `| \`${v.id}\` | ${v.type} | ${v.label} | ${fmt(v.default)} |`).join("\n");
  const ejemplo = JSON.stringify(Object.fromEntries(vars.slice(0, 3).map((v) => [v.id, v.default])));
  const dur = meta.dur === "slot" ? "la del slot (se adapta)" : `${meta.dur} s por defecto`;
  return `# ${p.nombre}

${meta.que}

| | |
|---|---|
| Tipo | ${p.tipo} |
| id de composición | \`${id}\` |
| Bloque(s) de la estructura | ${meta.bloques} |
| Duración | ${dur} |
| Cuándo usarla | ${meta.cuando} |

![preview](preview.png)

## Parámetros

| Variable | Tipo | Qué es | Default |
|---|---|---|---|
${filas || "| — | | | |"}

Colores, fuentes, radios, sombras, easings y duraciones salen **siempre** de \`tokens.css\` de la marca del reel.

## Cómo montarla en un reel

\`\`\`html
<div id="${id}" data-composition-id="${id}" data-composition-src="compositions/${p.nombre}.html"
  data-start="0" data-duration="${meta.dur === "slot" ? 15 : meta.dur}" data-track-index="2" data-track-kind="graphics"
  data-width="1080" data-height="1920" style="z-index: 2"
  data-variable-values='${ejemplo.replace(/'/g, "&#39;")}'></div>
\`\`\`

- \`id\`, \`data-composition-id\` y la clave del timeline son \`${id}\`: **no cambiarlos**. Para usar la misma pieza dos veces en un reel, duplicar el archivo y renombrar el id en las tres partes.
- \`data-start\` numérico (las escenas 3D lo usan para pasar el tiempo global a local).
- La salida se calcula sola con el \`data-duration\` del host.

## Probarla sola

\`\`\`bash
bash scripts/laboratorio.sh ${p.nombre} --marca personal --duracion ${meta.dur === "slot" ? 4 : meta.dur}
\`\`\`
`;
}

function catalogo(piezas) {
  const fila = (p) => {
    const meta = META[p.nombre] || {};
    const vars = variables(p.archivo).map((v) => `\`${v.id}\``).join(", ");
    const dur = meta.dur === "slot" ? "slot" : `${meta.dur} s`;
    return `| [\`${p.nombre}\`](${p.tipo}/${p.nombre}/README.md) | \`${idDePieza(p.archivo)}\` | ${dur} | ${meta.bloques || ""} | ${vars} | ${meta.cuando || ""} |`;
  };
  const tabla = (tipo) => piezas.filter((p) => p.tipo === tipo).map(fila).join("\n");
  const cab = "| Pieza | id | Duración | Bloque | Parámetros | Cuándo usarla |\n|---|---|---|---|---|---|";
  return `# Catálogo de la biblioteca

> Generado por \`node scripts/lib/catalogo.mjs\` a partir del código de cada pieza. No editar a mano: editar la pieza (o la descripción en \`scripts/lib/catalogo.mjs\`) y regenerar.

Todas las piezas son **sin marca**: toman colores, fuentes, radios, sombras, easings y duraciones de \`tokens.css\`. Se prueban solas con \`bash scripts/laboratorio.sh <pieza> --marca <slug>\`.

## Escenas

${cab}
${tabla("escenas")}

## Transiciones

Se montan **encima** de las escenas (z-index alto), centradas en el corte.

${cab}
${tabla("transiciones")}

## Fondos

Se montan **debajo** de las escenas, ocupando todo el reel o un bloque.

${cab}
${tabla("fondos")}

## Mapa por bloque de la estructura (7 pasos)

| # | Bloque | Piezas |
|---|---|---|
| 1 | Gancho | \`gancho-tipografico\`, \`prueba-contador\` (gancho con cifra), \`before-after\` (gancho de contraste) |
| 2 | Promesa | \`gancho-tipografico\` (1 línea) + \`wipe-mascara\` |
| 3 | Enemigo común | \`enemigo-glitch\` |
| 4 | Solución con nombre propio | \`solucion-reveal-3d\`, \`mockup-ui-cursor\` |
| 5 | Prueba | \`prueba-contador\`, \`before-after\`, \`mockup-ui-cursor\` |
| 6 | Valor + objeción | \`nosotros-vs-otros\` |
| 7 | Urgencia + CTA | \`cta-palabra-clave\` |

## Lenguaje de motion de UI para 9:16 (pendientes como escenas propias)

Del lenguaje visual del nicho (landings que venden). Varias ya están cubiertas; el resto se construye cuando un reel lo necesite (pipeline paso 8):

| Motion | Estado |
|---|---|
| Hero reveal | Cubierto por \`before-after\` (DESPUÉS) y \`gancho-tipografico\` |
| Contadores | \`prueba-contador\` |
| Cursor tour / clic→éxito | \`mockup-ui-cursor\` |
| Before/after | \`before-after\` |
| Comparativa | \`nosotros-vs-otros\` |
| Process draw | Parcial: \`draw-line\` en \`solucion-reveal-3d\` y \`prueba-contador\`. \`TODO:\` escena propia (fases numeradas que se dibujan) |
| Rotador de palabras | \`TODO:\` (slot-rotate de una palabra) |
| Notificaciones de venta | \`TODO:\` (toasts apilados; datos siempre DATO DE EJEMPLO) |
| Bento grid | \`TODO:\` |
| Precios tipo odómetro | No aplica: **nunca se muestran precios** en un reel. Reutilizable para otras cifras con \`prueba-contador\`. |
`;
}

const piezas = piezasBiblioteca();
for (const p of piezas) fs.writeFileSync(path.join(path.dirname(p.archivo), "README.md"), readme(p));
fs.writeFileSync(path.join(RAIZ, "biblioteca", "catalogo.md"), catalogo(piezas));
console.log(`✓ ${piezas.length} README + biblioteca/catalogo.md`);
