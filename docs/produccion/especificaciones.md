# Especificaciones técnicas

## Formato

| Parámetro | Valor |
|---|---|
| Resolución | **1080 × 1920** (9:16) |
| FPS | **30** (60 solo si el brief lo pide) |
| Códec de video | H.264 High, `yuv420p` |
| Códec de audio | AAC, 192 kbps, **48 kHz** |
| Contenedor | MP4 con `-movflags +faststart` |
| Duración | 25–45 s (reels de prueba o cortos: 15–20 s) |
| Audio | Picos ≤ **−1 dBTP**; voz entre −16 y −14 LUFS integrados |

## Zonas seguras de Instagram Reels

```
 0 ┌──────────────────────────────┐
   │   ZONA RESERVADA (≈220 px)   │  barra de estado, "Reels", cámara
220├──────────────────────┬───────┤
   │                      │       │
   │                      │  ≈140 │  botones: like, comentar,
   │    ZONA DE TEXTO     │  px   │  compartir, guardar, audio
   │    CLAVE             │       │
   │   (x: 60 → 940)      │       │
   │                      │       │
1330├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤       │  ← límite cómodo para texto clave
   │   solo apoyo /       │       │
1500├──────────────────────┴───────┤
   │   ZONA RESERVADA (≈420 px)   │  descripción, @usuario, audio, CTA de la app
1920└──────────────────────────────┘
```

| Zona | Píxeles | Regla |
|---|---|---|
| Superior | 0 → 220 | Nada de texto. Solo fondo o textura. |
| Inferior | 1500 → 1920 | Nada de texto. Solo fondo o textura. |
| Derecha | 940 → 1080 | Nada de texto ni UI importante (botones de la app). |
| Izquierda | 0 → 60 | Margen de respiro. |
| **Texto clave** | x 60–940, y 220–1500 | Todo lo que hay que leer. |
| **Banda cómoda** | y 220–1330 | Gancho, cifra y palabra del CTA. La skill de HyperFrames recomienda no pasar de 1330 px para el texto principal, porque algunos anuncios y apps tapan más abajo. |
| Subtítulos | y 1180–1460 | Debajo de la escena principal, sin tapar el texto clave. |

Variables disponibles en `tokens.css`: `--safe-top`, `--safe-bottom`, `--safe-right`, `--safe-left`.

## Tamaños mínimos de texto

| Uso | Mínimo | Recomendado |
|---|---|---|
| Títulos / gancho | **72 px** | 110–160 px |
| Cuerpo | **44 px** | 48–56 px |
| Subtítulos | **52 px** | 56–64 px, peso ≥ 600 |
| Etiquetas / rótulos (`DATO DE EJEMPLO`) | 28 px | 30–34 px en mono |

Contraste mínimo: **4.5:1** para cuerpo y subtítulos, **3:1** para títulos ≥ 72 px. `npx hyperframes check --json` audita el contraste.

## Portada

- El fotograma 0 (o el que se elija como portada) **tiene que leerse en miniatura** (≈ 200 px de ancho): una frase de ≤ 5 palabras, en ≥ 120 px, con alto contraste.
- Nunca negro, nunca solo un logo.
- Para elegir otro fotograma: `ffmpeg -ss <seg> -i reel.mp4 -frames:v 1 portada.png`.

## Exportación (lo que hace `scripts/exportar-instagram.sh`)

```bash
ffmpeg -y -i entrada.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" \
  -c:v libx264 -profile:v high -preset slow -crf 18 \
  -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -movflags +faststart \
  salida.mp4
```

Si el render no tiene audio, el script agrega una pista silenciosa (Instagram procesa mejor los MP4 con audio).

Verificación:

```bash
ffprobe -v error -show_entries stream=codec_name,profile,width,height,pix_fmt,r_frame_rate,sample_rate \
  -show_entries format=duration -of default=nw=1 salida.mp4
```

Medir picos de audio:

```bash
ffmpeg -i salida.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12
```

## Comandos ffmpeg útiles

| Para | Comando |
|---|---|
| Un fotograma en un segundo | `ffmpeg -ss 2.5 -i reel.mp4 -frames:v 1 f.png` |
| Un fotograma por segundo | `ffmpeg -i reel.mp4 -vf fps=1 frames/f_%03d.png` |
| Detectar cortes | `ffmpeg -i ref.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 \| grep pts_time` |
| Extraer audio para Whisper | `ffmpeg -i ref.mp4 -vn -ac 1 -ar 16000 audio.wav` |
| Recortar un tramo | `ffmpeg -ss 0 -to 4 -i reel.mp4 -c copy tramo.mp4` |
