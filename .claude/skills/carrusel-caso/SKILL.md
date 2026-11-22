---
name: carrusel-caso
description: Full workflow for an animated client case-study carousel (7 slides, 1080x1350, HyperFrames loops) for synx build or Synous. Use when Laureano asks for a "carrusel" or "post" about a client, a before/after, results, or "caso de estudio". Covers copy approval, live-landing captures, the per-slide project setup, stills review, render and export, plus the mandatory criteria check.
---

# carrusel-caso

## 0. Before anything

Read **`docs/produccion/criterios-laureano.md`** in full. It holds every correction Laureano has given; its checklist is mandatory before showing any draft.

When Laureano corrects something:

1. Add the rule and the correction to that manual in the same turn.
2. Then apply the fix.

## 1. Copy (wait for approval)

1. **Gather the facts from the real sources**:
   - the client folder in `D:\Laureano\Desktop\1. Synx Build\Clientes\<cliente>\` — read-only, never open `.env*`;
   - the live landings;
   - the synx panel (`supabase-panel`): aggregates only, no personal data.
2. **Check permission**: the client must have `permiso: confirmado` in `marcas/<marca>/pruebas-reales.md`.
3. **Send the copy slide by slide as plain text.**
   - Figures: Laureano decides them. Flag a mismatch with the panel once, with evidence.
   - Name errors: neutralize them.
   - Never show prices.
4. **Wait for "dale" or "va".** If he says "pasame el copy", send only the copy.
5. **Write `guion.md`** in the carousel folder: the final copy, a table of figures with their source, and the material used.

## 2. Material

- **Captures of live landings**, taken after the scroll-reveal animations have run:
  - Command: `source scripts/_entorno.sh; node scripts/capturar-landing.cjs <url> <out>`.
  - It produces desktop and mobile versions, each as a hero shot and a full page.
- **Landings with animations: record them as video**: `node scripts/grabar-landing.cjs <url> <out.mp4> --dur 40` (smooth scroll + Chrome screencast). Make a 1 fps contact sheet, pick segments with content (skip empty bands), cut them with ffmpeg `-ss/-t`, and play them as a `<video class="clip">` inside the MacBook; a 14 s segment means a 14 s slide.
- **Prices in the captures**: cover or crop them before use. That includes the old event's price in a "before" page.
- **Client photos**: from the landing repo or a folder Laureano gives.
  - Never enlarged: native size or downscaled.
  - **Avatar**: wide crop with the face high, at 240 px.
- **Client logo or isotype for hubs.** Check it visually: the repo's "logotipo" may belong to another product; the favicon can be the real isotype.
- **Phone recordings** (VFR): trim with `setpts=PTS-STARTPTS,fps=30,trim=end_frame=N`. For a loop, play the clip forward then in reverse to fill the slide's duration.

## 3. Project

- **Folder**: `videos/<marca>/CARROUSELES/<fecha>-carrusel-caso-<cliente>/` (synx). Junctions break if folders move: recreate them.
- **Slide folders**: `composicion/` is slide 01; `composicion-s2..s7/` share `composicion/assets` through junctions:
  `mkdir composicion-sN && cmd //c "mklink /J composicion-sN\\assets composicion\\assets"`.
- **Start from the latest carousel of the same brand.** For synx: `videos/synx/CARROUSELES/2026-11-14-carrusel-caso-daniele/` (or `-manuela`).
  - Copy `composicion/{AGENTS.md,CLAUDE.md,compositions,hyperframes.json,meta.json,package.json}` and `assets/{lib,marca,slide.css,synx.css}`.
  - Also copy `grano.png` and `logotipo.svg`.
- **`generar.py` is self-contained**: it holds the HEAD, the icons, the helpers and the `SLIDES` list.
  - Write the new carousel's `generar.py` from the previous one, replacing only the `SLIDES` list, `CLIENTE` and the names.
  - Edit `generar.py`, never the generated `index.html`.
  - Run with `python generar.py`.
- **Existing helpers**:
  - `desliza` / `ping` — ping-pong scroll.
  - `onda_cifra(var, P)` — gradient wave on a figure.
  - Counter — `mil()` plus a 1.6 s ease-out.
  - `flujo` / cables with `S.cometa`.
  - `ventana()` for windows.
  - Before/after viewer: "Antes" on the left.
  - MacBook tour with a fade-out.
- **Per-slide duration**: add `dur=14` to the dict and `dur: 14` to `opts`. The HEAD must use `data-duration="{dur}"`.

## 4. Review with stills (no renders)

1. Lint and snapshot every slide in parallel:
   ```bash
   source scripts/_entorno.sh
   for d in composicion composicion-s{2..7}; do (cd $d && rm -rf .hyperframes/artifacts/snapshots; npx --yes hyperframes@0.8.221 lint | grep -E "[1-9][0-9]* error"; npx --yes hyperframes@0.8.221 snapshot --at 2.5 --no-end >/dev/null) & done; wait
   ```
2. Build `muestras/hoja.jpg` (4×2 at 540×675) and **look at it**.
3. Run the manual's checklist rule by rule.
4. Fix everything first, then show Laureano a single sheet with a short summary.
   - Ask one question: "¿Lo renderizo así o ajustamos algo antes?"

## 5. Render and deliver (only after approval)

1. **Render**: `bash scripts/render-carrusel.sh <carpeta> <prefijo> 1:portada 2:... 7:...`, in the background for the full set.
   - Re-render only the slides that changed.
2. **Stills**: `ffmpeg -ss <t> -i render/<pre>-0N-<slug>-ig.mp4 -frames:v 1 render/imagenes/<pre>-0N-<slug>.png`.
   - Pick the moment where the animation reads best: counters finished, toast visible.
3. **Contact sheet**: `render/hoja.jpg`.
4. **Check**: ffprobe each export for 1080×1350, 30 fps and the right duration.
5. **Deliver**: the paths, plus one line per change.
