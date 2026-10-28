# Editar un video "a cámara" en 5 pasadas

> **Fuente:** *The 5-Pass Reel Edit Kit* (@zeeuiux), el PDF que sumó Laureano el 2026-10-28. El original está en `5-Pass-Reel-Edit-Kit.pdf`.
> **Para qué sirve:** reels donde **Laureano habla a cámara**. Es el formato de la marca personal (lifestyle) y de cualquier reel B2B donde aparezca.
> **Cómo se adapta:** las 5 pasadas se hacen con las herramientas del estudio. Los prompts originales, en inglés, se citan tal cual porque funcionan.

## Antes de empezar

- **Clip crudo:** a 1080p, de menos de 30 MB y sin los silencios del principio y del final.
- **Encuadre:** dejar **aire arriba de la cabeza**. Ahí va el texto de la pasada 02.
- **Una pasada por vez**, con vista previa y notas en el **revisor**, antes de seguir:

```bash
bash scripts/revisar.sh videos/<marca>/<reel>
```

- **Formato de entrega:** 1080×1920, 30 fps, H.264, −14 LUFS y picos por debajo de −1 dB. Es nuestro estándar (`exportar-instagram.sh`).

## Las 5 pasadas

| # | Pasada | Qué hace | Herramienta del estudio | "Listo cuando…" |
|---|---|---|---|---|
| 01 | **Transcribir** | Saca el tiempo de cada palabra (`words.json`) y lista las pausas de más de 0,4 s y las trabas. Después recorta las pausas dejando ~0,1 s de respiro a cada lado | `scripts/transcribir.py` (faster-whisper, tiempos por palabra) + ffmpeg | Todas las palabras están bien escritas y no queda aire muerto |
| 02 | **Recorte** | Separa a la persona del fondo en cada cuadro: bordes suaves, *light wrap*, sin contorno blanco, sin agujeros en las manos, con el detalle del pelo | `TODO:` RobustVideoMatting (ONNX) a 2× + relleno de huecos. Se va a necesitar con los videos de la marca personal | Contra un damero y contra fondo oscuro con una palabra gigante detrás de la cabeza: pelo limpio, sin contorno |
| 03 | **Subtítulos** | 1 a 3 palabras por vez, cada una en el momento en que se dice. Una palabra clave grande por frase, el resto chico. Mínimo 0,4 s en pantalla y **nunca sobre la cara** | Skill `subtitulos` + `words.json` | Cada subtítulo cae en su palabra y no tapa la cara |
| 04 | **Motion** | Planifica una escena por idea (palabra disparadora, tiempo, qué aparece y por qué), **la muestra en tabla y espera el OK**. Después la construye en HTML/CSS y la compone con el recorte (adelante o detrás de la persona) | HyperFrames + `storyboard.md` | Plan aprobado y cada gráfico cae en su palabra |
| 05 | **Sonido** | Golpe en el gancho, tap en cada clic, whoosh en cada cambio de escena y campana al cierre. La voz siempre arriba, con la música bajando debajo. Limpia la voz (graves y siseo) y masteriza a −14 LUFS | `sonido.mjs` del reel (efectos por su pico, sidechain) + `assets/compartidos/sfx/` | Hay un sonido en cada corte y cada clic, y la voz manda |

## Prompts originales (para pegar o adaptar)

**Setup:**

> You're my reel editor. I've uploaded a raw talking-head clip. We'll edit it in 5 passes, one at a time. After each pass, render a preview and wait for my notes. 01 Transcribe: word-level timestamps → words.json · 02 Cut-out: separate me from the background, soft edges, light wrap, no outline · 03 Captions: 1–3 words, key word big, rest small · 04 Motion: one scene per idea, fired on its word · 05 Sound: hits, taps, chime, voice on top. Export: 1080×1920, 30 fps, H.264, -14 LUFS. Do it all in code: Python and ffmpeg for video and audio, HTML/CSS/JS for graphics, rendered frame by frame in a headless browser, so every graphic is timed to the frame. Keep a project folder with words.json, the cut-out matte, each layer and every render, so a change to one pass doesn't break the others. Keep text and graphics inside Instagram's safe area. Start with pass 01. Don't move on until I say "next".

**Pasada 04 (motion):**

> Read words.json and plan one scene per idea: the trigger word, its time, what appears on screen and why. Show me the plan as a table and wait for my OK. Build each scene in HTML/CSS, fire it on its word, and composite it with the cut-out so graphics can sit behind me or in front of me. One idea on screen at a time. Fast in, hold, clean out.

**Pasada 05 (sonido):**

> Add SFX on the cues from pass 04: a hit on the hook, a tap on every click, a whoosh on every scene change, a chime to close. Keep my voice on top. If you add music, duck it under my voice. Clean my voice (cut rumble and hiss), then master to -14 LUFS with peaks under -1 dB.

## Notas de dirección

Son notas tipo, para usar en el revisor. Al revisor se le suma el tiempo y la posición exacta de cada nota.

- "The outline around me looks fake. Soft edges only, with a light wrap."
- "That graphic covers my face. Move it up and keep my face clear."
- "Too much on screen. One idea at a time."
- "The [word] graphic lands late. Fire it 3 frames earlier."
- "Captions go by too fast. Hold each one at least 0.4s."
- "Make the hook hit harder: a bigger first word and a hit on frame one."
- "Only re-render 00:04 to 00:07. Keep the rest as it is."

## Reglas de estilo tipo (a adaptar con los tokens de cada marca)

| Tema | Regla |
|---|---|
| Tipografía | Palabra clave en **serif itálica grande**, una por frase. Las palabras de apoyo, en sans semibold chica. Las etiquetas, en mono mayúscula con tracking ancho. Máximo 3 palabras en pantalla, nunca sobre la cara |
| Motion | Entrada rápida (0,2–0,35 s), sostener y salida limpia. Ease-out al entrar. Una idea por escena, disparada por su palabra. Texto **detrás de la persona** (gracias al recorte) para ganchos y palabras grandes. Push-in suave (máximo 6 %) para enfatizar. Nada de zooms con temblor |
| Sonido | Golpe en el gancho, tap en los clics, whoosh en los cambios de escena y campana al cierre |
| Prohibido | Contorno blanco tipo sticker, subtítulos con emojis, colores arcoíris, más de 2 fuentes en pantalla |

## Antes de publicar

- **Verlo dos veces en el celular**, con sonido y sin sonido. Las dos versiones tienen que entenderse.
- **Nada importante** debajo de los botones ni del texto de Instagram.
- **Portada:** un cuadro con una sola palabra grande.
