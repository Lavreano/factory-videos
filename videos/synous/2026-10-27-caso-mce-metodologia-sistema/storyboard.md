# Storyboard — caso-mce-metodologia-sistema

**Marca:** `synous` · **Duración:** 33 s · 30 fps · solo texto en pantalla · **Estado:** composición armada; muestra del gancho renderizada.

| # | Inicio–fin | Visual | Texto en pantalla | Movimiento | Escena | Origen del dato |
|---|---|---|---|---|---|---|
| 1 | 0–2,4 | Void navy con grilla y aurora | "Tu metodología / **no cabe** en WhatsApp." | La línea 1 ya está en el fotograma 0 (portada). La 2 sube del desenfoque y el subrayado se dibuja | `gancho-tipografico` | — |
| T | 2,15 | Panel de superficie | — | `wipe-mascara` | transición | — |
| 2 | 2,4–4,6 | Void | `CASO · CONSCIENCIA MCE` / "Mirá en qué la **convertimos.**" | Igual que el gancho | `promesa` (copia local del gancho) | Permiso confirmado |
| T | 4,4 | Franjas | — | `desplazamiento` | transición | — |
| 3 | 4,6–9,0 | Web genérica gris que se tacha (`mi-metodologia-FINAL-v7.pdf`) | "Chats. Planillas. **PDFs.**" / "Cada alumno nuevo suma trabajo." | Glitch con semilla 21 | `enemigo-glitch` | Dolor genérico (no habla de MCE) |
| T | 8,94 | Destello celeste | — | `flash` | transición | — |
| 4 | 9,0–18,5 | Monitor con 3 capturas de app.conscienciamce.com | `SISTEMA OPERATIVO DIGITAL` / "La metodología de Santiago, en un **sistema.**" + "Un **portal** para cada alumno." → "**Atlas:** una IA que conoce el método." → "Mapas, hábitos, salud, **comunidad.**" | Las capturas entran deslizándose, con un push de cámara ×1,06 y un contador 01/03 | `pantallas-producto` (**nueva**) | `MCE 2.0/frontend/src/app` |
| — | 18,5–19 | Respiro | — | Fondo quieto | — | — |
| 5 | 19–23,6 | Cifra + línea | `MCE 2.0` / "**38**" / "pantallas: **22** para el alumno, **16** para el equipo." / `DATOS DEL CÓDIGO` | Conteo de 1,5 s y la línea de 0 a 38 que se dibuja | `prueba-contador` | Conteo de `page.tsx` en MCE 2.0 |
| 5b | 23,6–26 | Void | `V1.0 → V2.0` / "Versión 2.0: / reconstruida desde **cero.**" | Igual que el gancho | `version` (copia local) | `MCE 2.0/CLAUDE.md`, `docs/HISTORIAL.md` |
| T | 25,7 | Zoom al centro | — | `zoom-through` | transición | — |
| 6 | 26–30 | Tabla Plantilla ↔ Propio | "No es una plantilla. Es su **método.**" + 4 filas | Las filas entran escalonadas | `nosotros-vs-otros` | Funciones reales de MCE 2.0 |
| — | 30–30,3 | Respiro | — | Corte limpio | — | — |
| 7 | 30,3–33 | CTA | "Comentá / **SISTEMA** / y te mando las 7 señales de que tu operación ya te queda chica." | 2 pulsos de brillo | `cta-palabra-clave` | Recurso `TODO:` |

## Pendientes antes del render completo

1. **Capturas reales del bloque 4.** Hay que reemplazar las `assets/media/provisoria-atlas.png`, que salen recortadas del mockup en baja resolución, por estas tres:
   - `mce-inicio.png`: inicio del alumno;
   - `mce-atlas.png`: Atlas;
   - `mce-mapa.png`: mapa energético o hábitos.

   Salen de la sesión de Laureano en app.conscienciamce.com, y **ninguna puede mostrar datos de otros alumnos**.
2. **Recurso de SISTEMA:** "7 señales de que tu operación ya te queda chica".
3. **Música:** todavía no hay una pista en `assets/compartidos/musica/`.

## Escena nueva

`pantallas-producto` ya está en `biblioteca/escenas/`. Hay que sumarla al catálogo (paso 8).
