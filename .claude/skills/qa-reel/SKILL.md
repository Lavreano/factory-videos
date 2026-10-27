---
name: qa-reel
description: Checklist de control de calidad de un reel renderizado antes de exportarlo. Usar después del render completo, antes de correr scripts/exportar-instagram.sh, o cuando Laureano pregunta si un reel está listo. Completa revision.md con hallazgos y arreglos.
---

# qa-reel

## Insumos
- `render/<slug>.mp4`, `render/<slug>-frames/` (1 por segundo) y `render/<slug>-hoja.jpg` (los genera `scripts/render.sh`).
- `guion.md`, `storyboard.md`, `brief.md`, y `marcas/<marca>/perfil.md` + `pruebas-reales.md`.

## Pasos
1. **Mirar** la hoja de contactos completa y, además, fotogramas puntuales:
   ```bash
   ffmpeg -ss 0 -i render/<slug>.mp4 -frames:v 1 qa-0.png      # portada
   ffmpeg -ss 1.5 -i render/<slug>.mp4 -frames:v 1 qa-1_5.png  # gancho a 1,5 s
   ```
   y uno justo antes y uno justo después de cada corte del storyboard (saltos o parpadeos).
2. Correr el chequeo de HyperFrames sobre la composición: `cd composicion && npx hyperframes check --json` (layout, contraste, motion).
3. Medir audio (si hay): `ffmpeg -i render/<slug>.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12` → pico ≤ **−1 dBTP**.
4. Verificar formato con `ffprobe` (lo hace también `exportar-instagram.sh`).
5. Completar `revision.md` (plantilla `plantillas/ficha-revision.md`) marcando cada casilla con evidencia, y la tabla de hallazgos con tiempo, severidad (alta / media / baja) y arreglo.

## Checklist (cada punto se verifica, no se supone)
| Punto | Cómo se verifica | Pasa si |
|---|---|---|
| Gancho legible en 1,5 s sin sonido | `qa-1_5.png` | La frase completa se lee y tiene ≤ 7 palabras |
| Portada legible en miniatura | `qa-0.png` escalada a 200 px | Se lee la frase principal |
| Zonas seguras | Fotogramas | Sin texto en y < 220, y > 1500, x > 940 |
| Ortografía | Leer todos los textos de los fotogramas | Sin errores, tildes y voseo correctos |
| Contraste | `check --json` | Sin errores de contraste |
| Ritmo | Hoja de contactos | Ningún plano > 4 s sin cambio |
| Subtítulos sincronizados | 3 fotogramas con voz vs. transcripción | Palabra resaltada = palabra que suena (±2 cuadros) |
| Sin parpadeos ni saltos | Fotogramas a ±1 cuadro de cada corte | Estados coherentes en la unión |
| Audio sin clipping | ebur128 | Pico ≤ −1 dBTP |
| Datos de ejemplo rotulados | Fotogramas con cifras | `DATO DE EJEMPLO` visible mientras se ve el dato |
| Permisos | `pruebas-reales.md` | Ningún nombre real sin `permiso: confirmado` |
| Sin precios | Fotogramas | Ningún precio de servicios |
| Duración | ffprobe | 25–45 s (prueba: 15 s) |

## Resultado
- **Listo para exportar:** todo pasa, o solo hallazgos de severidad baja anotados.
- **No listo:** cualquier hallazgo alto o medio → se arregla, se vuelve a renderizar y se repite el QA (nueva versión en `revision.md`).
