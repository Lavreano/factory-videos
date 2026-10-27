# CLAUDE.md — Estudio de Reels (Laureano Sierra)

Estudio de reels verticales (9:16) hechos con código. Laureano dirige; Claude escribe la composición, la renderiza y la revisa. Un solo motor (HyperFrames + GSAP + Three.js) compartido por cuatro marcas. Lo que cambia por marca vive en `marcas/<marca>/`.

Marcas (slugs): `personal` (Laureano Sierra), `synx` (synx build), `synous` (Synous AI), `aura` (Aura Studio).

---

## 1. Orden de lectura al empezar cualquier reel

0. **Identificar la marca.** Si el pedido no la dice, **preguntar antes de hacer cualquier otra cosa.**
1. `marcas/<marca>/perfil.md`, `audiencia.md`, `DESIGN.md` y `tokens.css`.
2. `marcas/<marca>/contexto-app.md`. Si el reel muestra la app o su oferta, pedirle a Laureano que sume la carpeta con `/add-dir <ruta>` y leerla. Si no está accesible, avisar; nunca inventar.
3. `docs/estrategia/estructura-reel.md` y `docs/estrategia/principios-audiencia.md`.
4. `marcas/<marca>/banco-ganchos.md`, `enemigos-comunes.md`, `ctas.md` y `pruebas-reales.md`.
5. `docs/produccion/especificaciones.md`.
6. Las 5 skills de criterio: `estilo`, `ritmo`, `subtitulos`, `movimiento`, `composicion` (`.claude/skills/`).
7. `biblioteca/catalogo.md`: antes de crear una escena nueva, verificar si ya existe una reutilizable.
8. Antes de escribir o tocar una composición: skill `hyperframes` (contrato de render) y `hyperframes-cli`.

## 2. Pipeline obligatorio (nunca saltear pasos)

| # | Paso | Herramienta | ¿Espera aprobación? |
|---|---|---|---|
| 0 | Crear el proyecto | `bash scripts/nuevo-reel.sh <marca> <slug>` | — |
| 1 | **Brief**: marca, tema, pilar y código, objetivo, a quién le habla, palabra clave del CTA | `brief.md` | — |
| 2 | **Guion** con la estructura de 7 pasos y tiempos | skill `guion-reel` → `guion.md` | **Sí** |
| 3 | **Storyboard**: una fila por escena | `storyboard.md` (+ skill `prompt-motion` por fila) | **Sí** |
| 4 | **Muestra**: solo el gancho (3–5 s) en `draft`, 4–6 fotogramas revisados | `bash scripts/render.sh <reel> --muestra 4` | **Sí** |
| 5 | **Render completo** | `bash scripts/render.sh <reel>` | — |
| 6 | **QA** | skill `qa-reel` → `revision.md` | — |
| 7 | **Exportar** | `bash scripts/exportar-instagram.sh <entrada> <salida>` | — |
| 8 | **Reutilizar**: si salió una escena nueva y buena, parametrizarla, moverla a `biblioteca/` y actualizar `catalogo.md` | — | — |

Detalle de cada paso: `docs/produccion/pipeline.md`.

## 3. Reglas de contenido

- **Un reel, una marca.** Nunca mezclar públicos, tonos ni estéticas entre marcas.
- Se le habla al **seguidor ideal de la marca del reel** (`audiencia.md`), no solo al cliente ideal. En la marca personal: dueños de negocio y emprendedores, **nunca colegas devs o diseñadores**.
- Un dato de producto que sale de la carpeta de la app se usa tal cual y se **cita el archivo de origen** en el storyboard.
- El gancho funciona **sin sonido** y se entiende en los primeros **1,5 s**.
- Cada reel lleva al menos una **cifra concreta** o un **contraste** claro.
- Una idea por pantalla. Máximo **~7 palabras** de texto principal a la vez.
- Copy en **español rioplatense con voseo**, salvo que el brief diga otra cosa.
- **No inventar** resultados, métricas ni testimonios. Todo ejemplo va rotulado `DATO DE EJEMPLO` (en el guion, en el storyboard y en pantalla).
- Casos reales con nombre de cliente: solo si en `pruebas-reales.md` figura `permiso: confirmado`.
- **Nunca mostrar precios** de los servicios en un reel.
- Respetar las palabras prohibidas de cada marca (`perfil.md`). En la marca personal, el gancho "secreto poco conocido" se escribe **sin** la palabra "secreto".

## 4. Reglas técnicas

- Formato: **1080×1920, 30 fps** (60 fps solo si el brief lo pide).
- **Animación determinística. No se negocia.**
  - Todo movimiento sale de un timeline GSAP pausado registrado en `window.__timelines["<id>"]`, o del evento `hf-seek` (Three.js / canvas).
  - Prohibido: `setTimeout`, `setInterval`, `Date.now()`, `requestAnimationFrame` como reloj, `repeat: -1`, `Math.random()` sin semilla (usar `mulberry32`, ver `biblioteca/lib/prng.js`).
  - Fuentes cargadas antes de medir texto (`document.fonts.ready`), y el timeline se registra **al final** del callback.
  - Componentes de terceros (React Bits, Uiverse, etc.) que animan en tiempo real se **reescriben** con timelines antes de usarlos.
  - Spline / Unicorn Studio: se exportan como clip a `assets/<marca>/3d/` y entran como `<video muted>`.
- **Todo color, fuente, radio, sombra, easing y duración sale de `tokens.css`.** Nada de hex, px de radio ni familias sueltas en las escenas. Todas las marcas usan **los mismos nombres de variables**.
- Las escenas de `biblioteca/` no traen marca: cambian de marca cambiando el `tokens.css` que carga el reel (`scripts/sincronizar-marca.sh`).
- Contrato HyperFrames (resumen; el completo está en la skill `hyperframes`):
  - Cada elemento temporizado lleva `class="clip"`, `data-start`, `data-duration`. Usar `fromTo`, nunca `from`.
  - Host, root de la escena y clave del timeline con **el mismo id**. Ids únicos en todo el reel (prefijados por escena).
  - Nunca tweenear `display`/`visibility` en un `.clip`; animar un hijo.
  - Assets con rutas relativas a la raíz de la composición (`assets/...`).
  - Después de editar: `npx hyperframes lint` y `npx hyperframes check --json`.
- Respetar las **zonas seguras** de Instagram (`docs/produccion/especificaciones.md`).
- **Después de cada render, extraer fotogramas y mirarlos antes de decir que está listo.** Si algo se ve mal, se corrige antes de seguir.
- Las carpetas de las apps son **solo lectura**: nunca modificar, borrar ni commitear nada ahí.
- Entorno Windows + Git Bash: los scripts cargan `scripts/_entorno.sh`, que pone en el PATH ffmpeg (winget) y Node 22 (fnm). HyperFrames exige Node ≥ 22.

## 5. Comunicación

- Respuestas cortas entre pasos. Mostrar archivos, no describirlos.
- Ante una decisión creativa ambigua, proponer **2 opciones concretas** y dejar que Laureano elija.
- **Nunca borrar** archivos de `referencias/`, `assets/` ni `videos/` sin preguntar.

## 6. Mapa rápido

| Necesito… | Está en… |
|---|---|
| Qué es cada marca y cómo habla | `marcas/<marca>/perfil.md` |
| A quién le hablamos | `marcas/<marca>/audiencia.md` |
| Colores, fuentes, motion por marca | `marcas/<marca>/DESIGN.md` + `tokens.css` |
| Fórmula del reel | `docs/estrategia/estructura-reel.md` |
| Escenas listas | `biblioteca/catalogo.md` |
| Cómo pedir una animación precisa | `docs/produccion/prompts-motion.md` |
| Problemas ya resueltos | `docs/produccion/pipeline.md` → "Problemas conocidos" |
