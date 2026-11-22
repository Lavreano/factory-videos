# Música — licencias y fuentes

> **Regla:** solo música con licencia que permita uso comercial en redes y en anuncios. Cada pista que entra al estudio se anota acá.
> **No usar "type beats" de YouTube** sin una licencia (lease) comprada. "Free for non-profit" no sirve para marcas.

## Licencia de Mixkit (Stock Music Free License)

- **Permite:** proyectos comerciales y personales, incluidos videos de YouTube, marketing en redes sociales, anuncios online y videoclips.
- **Atribución:** no hace falta.
- **No permite:**
  - usar la música en CDs, DVDs, videojuegos ni emisiones de TV o radio;
  - redistribuirla como archivo suelto;
  - remixarla, registrarla o reclamarla como propia.
- **Content ID:** los términos oficiales no lo mencionan. Si llega un reclamo, se guarda la página de la pista como prueba de la licencia.
- **Fuentes:** [mixkit.co/free-stock-music](https://mixkit.co/free-stock-music/) y [mixkit.co/license](https://mixkit.co/license/). Revisado el 2026-10-27.

## Pistas preseleccionadas (2026-10-27)

| Archivo | Título · género · artista | Tempo medido | Drop | Para |
|---|---|---|---|---|
| `hiphop-ovo-mixkit412.mp3` | OVO · Trap · Arulo | ~117 BPM | s 11 | Reels con energía estilo Drake (Aura, synx build) |
| `hiphop-thunder-mixkit318.mp3` | Thunder · Hip Hop · Arulo | ~96 BPM | s 21 | Ganchos con contraste |
| `hiphop-lil-pump-type-mixkit410.mp3` | Lil Pump Type · Hip Hop · Arulo | ~83 BPM | s 16 | Ritmo marcado, 808 fuerte |
| `hiphop-baileys-mixkit476.mp3` | Baileys · R&B contemporáneo · Diego Nava | ~96 BPM | s 10 | Tono más suave y premium |
| `hiphop-party-mixkit303.mp3` | Party · Trap · Arulo | ~136 BPM | s 14 | Cortes rápidos |
| `tech-other-world-mixkit723.mp3` | Other World · Electrónica · Lily J | ~103 BPM | s 10 | Synous (producto, aurora) |
| `tech-forest-walk-mixkit607.mp3` | Forest Walk · Electrónica · Eugenio Mininni | ~117 BPM | s 17 | Synous, synx build |
| `tech-hazy-after-hours-mixkit132.mp3` | Hazy After Hours · Electrónica · Alejandro Magaña | ~123 BPM | s 16 | synx build (técnico, nocturno) |
| `tech-brainiac-mixkit167.mp3` | Brainiac · Electrónica · Alejandro Magaña | ~118 BPM | s 16,3 (medido) | Synous estilo SaaS: destacada Proyectos (2026-10-31) |
| `tech-house-vibes-mixkit130.mp3` | Tech House Vibes · Electrónica (Mixkit) | ~123 BPM | ~s 14,3 | synx build: destacadas "Feedback de clientes" (2026-10-31). Pareja y llena de s 17 a s 84 |
| `tech-deep-urban-mixkit162.mp3` | Deep Urban · Electrónica (Mixkit) | ~129 BPM | s 45 | Fondos largos |

**Sobre los datos:**

- El tempo y el drop se midieron con `scripts/lib/musica_analisis.py` (autocorrelación del onset y salto de energía). Son **estimaciones**. Antes de cortar al beat, se calibran sobre el kick real.
- **Fragmentos de escucha** (22 s, con el drop en el segundo 5): `escucha/`.
- **Todas las candidatas** (86 pistas, sin versionar): `candidatas/`. Su análisis está en `candidatas/analisis.json`.

## Usadas en reels

| Reel | Pista | Desde (s) | Notas |
|---|---|---|---|
| `aura/2026-10-27-url-a-creativos` | `hiphop-ovo-mixkit412.mp3` | 5,9 | Medida a 87 BPM, fase 0,244 s; el drop de 5,06 s cae en el flood rojo |
| `synous/2026-10-31-historias-destacadas-servicios` | `tech-other-world-mixkit723.mp3` | 4,05 | Drop real en 9,1 s de la pista (no en 10): cae en 5,1 s, cuando la línea de luz toca el logo. −14,5 LUFS, pico −1,9 dBTP |
| `synous/2026-10-31-historias-destacadas-proceso` | `tech-forest-walk-mixkit607.mp3` | 11,95 (+13 por historia) | Drop real en 16,45 s: cae en 4,55 s de la historia 01, cuando el código se desarma en el esquema. Sigue de corrido en las 6 historias |
| `synx/2026-10-31-feedback-clientes-{1..3}` | `let-it-burn.mp3` | 14,5 (+ duración de las anteriores) | Sigue de corrido entre historias; el beat (15,65 s) entra cuando aparece el primer chat. Reemplazó a Tech House Vibes, que Laureano descartó |

## Pistas aportadas por Laureano

| Archivo | Origen | Licencia | Notas |
|---|---|---|---|
| `let-it-burn.mp3` | Descargada por Laureano el 2026-10-31 (`assets/synx/feedback/Let it burn.mp3`) | **Sin copyright, según Laureano.** Fuente y licencia no registradas | Si llega un reclamo en Instagram, cambiarla por una de Mixkit |
