# Efectos de sonido — licencias y fuentes

**Licencia:** Mixkit Sound Effects Free License. Permite uso comercial en videos y en redes, sin atribución, y prohíbe redistribuir los archivos sueltos. Fuente: [mixkit.co/free-sound-effects](https://mixkit.co/free-sound-effects/). Revisado el 2026-10-28.

| Archivo | Uso | Pico dentro del archivo |
|---|---|---|
| `click-mixkit2568.mp3` | Clic del cursor | 0,005 s |
| `pop-mixkit3005.mp3` | Aparición de tarjetas, chips y muestras | 0,034 s |
| `whoosh-mixkit1491.mp3` | Floods de color (transiciones) | 0,296 s |
| `impacto-mixkit498.mp3` | Golpe grave en el drop, el cambio a oscuro y el logo | 0,08 s |
| `swoosh-mixkit1487.mp3` | Movimientos de cámara y cambios de formato | 0,17 s |
| `tipeo-mixkit2538.mp3` | Tipeo (tramo desde el segundo 1) | — |

**Cómo se ubica cada efecto:**

- el **pico medido** del efecto cae en el evento, no el inicio del archivo;
- los efectos van por debajo de la música (de −7 a −18 dB);
- la mezcla final se normaliza a −14 LUFS, con un limitador y un pico real ≤ −1 dBTP.

**Implementación de referencia:** `videos/aura/2026-10-27-url-a-creativos/sonido.mjs`.

**Candidatas sin versionar:** `candidatas/`. El análisis está en `candidatas/analisis.json`.
