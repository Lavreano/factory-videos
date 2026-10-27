# Estudio de Reels — Laureano Sierra

Un estudio para producir reels verticales (1080×1920) **hechos con código**: tipografía cinética, 3D, motion de UI y cortes con ritmo, sin abrir un editor de video. Laureano dirige; Claude escribe la composición, la renderiza y la revisa.

Un solo motor para **cuatro marcas**: `personal` (Laureano Sierra), `synx` (SYNX BUILD), `synous` (Synous AI) y `aura` (Aura Studio). Lo que cambia por marca vive en `marcas/<marca>/`.

---

## Requisitos

| Herramienta | Versión | Notas |
|---|---|---|
| Node.js | **≥ 22** | HyperFrames lo exige. En esta máquina está con fnm (`.node-version` = 22). Los scripts lo activan solos. |
| ffmpeg / ffprobe | 9.x | `winget install --id Gyan.FFmpeg -e`. Los scripts lo buscan en `WinGet\Links`. |
| Chrome | — | HyperFrames usa el Chrome del sistema para renderizar. |
| Python | 3.12 en `.venv` | Para la transcripción (faster-whisper). |
| Git Bash | — | Todos los scripts son `bash`. En VS Code: terminal Git Bash. |

Instalación desde cero:

```bash
npm install                                   # gsap, three, fuentes (fontsource)
uv venv .venv --python 3.12
uv pip install --python .venv/Scripts/python.exe faster-whisper
bash scripts/instalar-fuentes.sh              # copia las fuentes a cada marca
npx skills add heygen-com/hyperframes         # skills del motor (ya instaladas)
npx skills add CloudAI-X/threejs-skills       # skills de Three.js (ya instaladas)
```

Diagnóstico del motor: `npx hyperframes doctor` (con Node 22 activo).

---

## Cómo se hace un reel (resumen)

```bash
bash scripts/nuevo-reel.sh personal mi-tema A-1    # 0. crear el proyecto
#    completar brief.md                               1. brief
#    pedirle a Claude el guion (skill guion-reel)     2. guion      → aprobar
#    pedirle el storyboard                            3. storyboard → aprobar
bash scripts/render.sh videos/personal/AAAA-MM-DD-mi-tema --muestra 4   # 4. muestra → aprobar
bash scripts/render.sh videos/personal/AAAA-MM-DD-mi-tema               # 5. render completo
#    pedirle el QA (skill qa-reel)                    6. QA
bash scripts/exportar-instagram.sh render/x.mp4 render/x-ig.mp4         # 7. exportar
```

Detalle de cada paso: [docs/produccion/pipeline.md](docs/produccion/pipeline.md).
Para ver y editar el reel en el navegador: `cd videos/<marca>/<carpeta>/composicion && npx hyperframes preview --background`.

---

## Qué hay en cada carpeta

| Carpeta | Para qué |
|---|---|
| `CLAUDE.md` | Reglas maestras que Claude lee en cada sesión. |
| `docs/estrategia/` | Método compartido: audiencia, estructura de 7 pasos, ganchos, pruebas, calendario. |
| `docs/produccion/` | Pipeline, especificaciones (zonas seguras, exportación), cómo escribir prompts de motion. |
| `docs/recursos.md` | Librerías y referencias externas. |
| `marcas/<marca>/` | Perfil, audiencia, ganchos, enemigos, CTAs, pruebas reales, contexto de la app, `DESIGN.md`, `tokens.css`, fuentes y logos. |
| `marcas/_plantilla/` | Base para sumar una marca (`bash scripts/nueva-marca.sh <slug>`). |
| `.claude/skills/` | Skills propias (estilo, ritmo, subtítulos, movimiento, composición, guion-reel, prompt-motion, analizar-referencia, qa-reel) + las de HyperFrames y Three.js. |
| `plantillas/` | Brief, guion, storyboard, ficha de revisión, análisis de referencia y el `index.html` inicial de cada reel. |
| `biblioteca/` | Escenas, transiciones y fondos reutilizables **sin marca**. Ver [biblioteca/catalogo.md](biblioteca/catalogo.md). |
| `referencias/<marca>/` | Videos de referencia (`videos/`, no se versionan) y sus análisis (`analisis/`). |
| `assets/` | `compartidos/` (sfx, música y fondos con licencia) y uno por marca (`3d/`, `imagenes/`, `grabaciones/`). |
| `scripts/` | Herramientas (ver abajo). |
| `videos/<marca>/AAAA-MM-DD-slug/` | Un proyecto por reel. |

---

## Scripts

| Script | Qué hace |
|---|---|
| `nuevo-reel.sh <marca> <slug> [codigo]` | Crea el proyecto del reel con las plantillas y la composición de HyperFrames enlazada a los tokens de la marca. |
| `nueva-marca.sh <slug>` | Suma una marca desde `_plantilla` y crea sus carpetas. |
| `render.sh <reel> [--muestra N] [--calidad q] [--marca m]` | Sincroniza tokens, corre lint, renderiza, verifica la duración y arma la hoja de contactos. |
| `sincronizar-marca.sh <reel> [marca]` | Vuelve a copiar `tokens.css` + fuentes de la marca a la composición. |
| `laboratorio.sh <pieza> [--marca m]` | Prueba una pieza de la biblioteca sola, con los tokens de cualquier marca. |
| `analizar-referencia.sh <marca\|general> <video>` | Metadatos, cortes, fotogramas, audio, transcripción y hoja de contactos de una referencia. |
| `transcribir.py <audio>` | Transcripción con tiempos por palabra (JSON + SRT). Correr con `.venv/Scripts/python.exe`. |
| `hoja-contactos.sh <carpeta>` | Grilla de fotogramas en una sola imagen. |
| `exportar-instagram.sh <entrada> <salida>` | Exportación final para IG (H.264 High, CRF 18, AAC 48 kHz, faststart) con verificación. |
| `instalar-fuentes.sh [marca]` | Copia las fuentes de cada marca desde `node_modules/@fontsource`. |

---

## Multi-marca: cómo funciona

1. Cada marca tiene un `tokens.css` con **los mismos nombres de variables** (`--color-bg`, `--color-accent`, `--font-display`, `--ease-enter`, …); solo cambian los valores.
2. Las escenas de `biblioteca/` usan **solo** esas variables. Nunca un color o una fuente fija.
3. Cada reel carga `composicion/assets/marca/tokens.css`, que copia `sincronizar-marca.sh` desde la marca del reel.
4. Resultado: la misma escena se ve SYNX en un reel de SYNX y Synous en uno de Synous, sin tocar su código. Probalo: `bash scripts/laboratorio.sh before-after --marca synx`.

## Contexto de las apps

Las apps de cada marca se leen **en vivo y en solo lectura**: la ruta está en `marcas/<marca>/contexto-app.md`, y se suma a la sesión con `/add-dir <ruta>`. Nunca se modifica nada ahí.

## Reglas que no se negocian

- Un reel, una marca.
- Animación determinística (sin timers, sin `Date.now()`, sin `Math.random()` sin semilla).
- No se inventan datos, clientes ni testimonios: todo ejemplo va rotulado `DATO DE EJEMPLO`.
- Nunca se muestran precios.
