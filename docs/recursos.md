# Recursos externos

Fuentes de **inspiración para adaptar**, no para copiar. Todo lo que venga de afuera se reescribe con los tokens de la marca y con timelines determinísticos antes de entrar a un reel.

## Diseño y componentes

| Recurso | URL | Para qué lo usamos | Cómo se adapta |
|---|---|---|---|
| Refero Styles | https://styles.refero.design | Sistemas de diseño de webs reales en formato DESIGN.md. Referencia para escribir `marcas/<marca>/DESIGN.md`. | Se toman criterios (escala, ritmo, contraste), nunca la marca ajena. |
| React Bits | https://reactbits.dev | Texto animado, fondos y efectos. | Animan en tiempo real: **se reescriben con GSAP** (`fromTo` en un timeline pausado). |
| Beam (libraries.dev) | https://libraries.dev/beam | Bordes con brillo animado. | Recrear el brillo con un `conic-gradient` cuya rotación tweenea GSAP. |
| Uiverse | https://uiverse.io | Piezas de UI (botones, inputs, cards). | Copiar la estructura, cambiar valores por tokens, quitar `animation: infinite`. |
| PrebuiltUI | https://prebuiltui.com/components | Componentes de UI y secciones de landing. | Base para los mockups de `before-after` y `mockup-ui-cursor`. |
| MotionSites | https://motionsites.ai | Prompts de webs 3D. | Referencia de lenguaje para `prompt-motion` y escenas 3D. |
| Unicorn Studio | https://unicorn.studio | Shaders y escenas WebGL con exportación a video. | **Exportar como clip** (MP4/WebM 1080×1920) a `assets/<marca>/3d/` y usar como `<video muted>`. Nunca en vivo. |
| Spline | https://spline.design | Escenas 3D propias. | **Exportar como clip** a `assets/<marca>/3d/`. Nunca en vivo. |

## Motor y librerías

| Recurso | URL | Notas |
|---|---|---|
| HyperFrames | https://hyperframes.heygen.com | Motor de render. Skills en `.agents/skills/` (enlazadas en `.claude/skills/`). `npx hyperframes docs <tema>` para la referencia. |
| Registro de HyperFrames | `npx hyperframes catalog --json` | ~450 bloques (transiciones, títulos, captions, 3D). Buscar acá **antes** de construir un efecto a mano. |
| GSAP | https://gsap.com/docs | Motor de timelines. Copia local en `node_modules/gsap` (se copia a cada reel). |
| Three.js | https://threejs.org/docs | 3D en código. Copia local en `node_modules/three`. |
| threejs-skills (CloudAI-X) | https://github.com/CloudAI-X/threejs-skills | Skills de Three.js (fundamentals, animation, shaders, loaders) instaladas en `.claude/skills/`. |
| Fontsource | https://fontsource.org | Fuentes OFL en npm. `scripts/instalar-fuentes.sh` copia los `.woff2` a `marcas/<marca>/fuentes/`. |
| faster-whisper | https://github.com/SYSTRAN/faster-whisper | Transcripción con tiempos por palabra (`scripts/transcribir.py`). |

## Audio (con licencia)

| Recurso | Notas |
|---|---|
| Skill `media-use` de HyperFrames | Trae SFX con créditos (`.agents/skills/media-use/audio/assets/sfx/CREDITS.md`) y flujos para música y voz. |
| `assets/compartidos/sfx/`, `musica/` | Solo material con licencia verificada. Anotar origen y licencia en un `LICENCIAS.md` dentro de cada carpeta. |
