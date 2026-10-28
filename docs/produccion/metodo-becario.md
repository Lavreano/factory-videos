# Método "becario": reglas de retención y herramientas

> **Fuente:** el kit `becario-reels/` que sumó Laureano el 2026-10-28. Es una skill de reels animados hechos en Remotion.
> **No cambiamos de motor:** el estudio sigue con HyperFrames. De ese kit se adoptan las **reglas**, el **medidor de ritmo** y la **biblioteca de efectos sintetizados**.
> Las escenas del kit quedan como lista de pendientes para nuestra biblioteca.

## Las 8 reglas (salen de analizar cuadro por cuadro reels que retienen)

1. **El gancho manda.**
   - La primera frase y su titular deciden si alguien se queda.
   - Tiene que ser concreta, en letra grande, en líneas cortas (≤ 14 letras) y **sin subtítulos**, porque el texto ya está en pantalla.
2. **Nada quieto más de 0,6 s.** Cada escena tiene varios "momentos" repartidos por la frase. → `scripts/ritmo.py` lo mide.
3. **Una frase, una escena, una idea.** Si una frase necesita dos escenas, son dos frases.
4. **Lo que se dice, se ve.** Cada elemento entra **en la palabra que lo nombra**, y las palabras clave van resaltadas. Es lo que hace que un video parezca editado a mano.
5. **Textos de pantalla cortos:** que se lean en un segundo.
6. **Variedad:** nunca más de dos escenas seguidas del mismo tipo.
7. **Final con acción:** una sola acción concreta, como "Comentá PALABRA".
8. **Honestidad:** el gancho no promete lo que el video no da. Coincide con nuestras reglas de `CLAUDE.md` §3.

## Ritmo medido (QA obligatorio desde el 2026-10-28)

```bash
source scripts/_entorno.sh && "$PY" scripts/ritmo.py videos/<marca>/<reel>/render/<reel>.mp4
```

**Cómo mide:**

- compara cada cuadro con el anterior por zonas (arriba, centro y abajo) y por baldosas chicas;
- cuenta como evento cualquier cambio visible;
- **no cuenta** el empuje lento de cámara ni las luces del fondo.

**Qué tiene que dar:**

| Medida | Objetivo |
|---|---|
| Cuadros quietos | 10–35 % |
| Arranques de movimiento | 1–3 por segundo |
| **Huecos** (> 0,6 s sin nada nuevo) | **0**. Si hay alguno, el script sale con código 1 |

**Cómo se arregla un hueco**, del recurso más eficaz al menos eficaz:

1. Repartir mejor los momentos: que un elemento entre en una palabra del final de la frase.
2. Cambiar a una escena con más momentos.
3. Partir la frase en dos.
4. Acortar las pausas de la voz.

**No se tapa un hueco con un efecto de sonido:** el problema es visual.

> **Primera medición, 2026-10-28.** Aura `url-a-creativos` dio 49,5 % de cuadros quietos y 4 huecos (0–0,9 s en el gancho, 3,3–3,9 s, 17,7–18,6 s y el cierre del CTA). Se arreglaron con un golpe en el "20.", el cursor viajando durante el tipeo, el latido de "más." y el CTA moviéndose hasta el final.

## Guion para voz (complementa la skill `guion-reel`)

- **Duración:** 25–60 s de voz, ideal 30–45 s. **8–16 frases** de 6 a 14 palabras.
- **Velocidad:** unas 170 palabras por minuto, así que 45 s ≈ 125 palabras. Si la voz va por debajo de unas 190 ppm, acelerarla un 5 % (`atempo=1.05`) queda mejor en reels.
- **Palabras clave entre `*asteriscos*`:** 1 o 2 por frase, nunca más de 3 o 4.
- **Cifras en número** ("3 webs", "80 %").
- **Pronunciación:** si la voz pronuncia mal una palabra, se escribe aparte cómo se dice y en pantalla queda bien escrita. Ejemplo: Claude → "Clod".
- **Pausas:** ninguna pausa interna de más de unos 0,26 s. Los reels que retienen no dejan huecos.
- **Palabra del CTA:** corta, en mayúsculas, sin tildes ni eñes, para que la automatización la reconozca (como CREATIVOS o SISTEMA).

## Portada y publicación

- **Portada:** el número o la promesa del gancho, en grande, con una sola palabra en el color de acento.
- **Tres vistas:** la portada se revisa entera, en el **recorte 3:4 de la cuadrícula del perfil** (solo la franja y = 240–1680) y en miniatura. El título tiene que leerse en las tres.
- **Alternar fondo claro y oscuro** entre reels, para que la cuadrícula no quede monótona.
- **Instagram:**
  - la primera línea de la descripción completa el gancho (≤ 125 caracteres);
  - 3 a 6 líneas cortas, el mismo CTA del video y 3 a 5 hashtags, no 30.
- **TikTok:**
  - empezar con las palabras que alguien buscaría;
  - 1 a 3 líneas y 3 a 5 hashtags.
- **Voz con IA (Gemini):** al publicar, activar la **etiqueta de contenido generado con IA**. Las dos apps la piden para voces sintéticas realistas.
- **"Comentá PALABRA":**
  - en Instagram se automatiza con ManyChat (socio oficial de Meta);
  - TikTok no deja escribir por privado a quien comenta, así que va con enlace en la bio o un comentario fijado.
  - Antes de publicar, el recurso tiene que existir.

## Efectos de sonido sintetizados

- **Qué son:** 17 WAV generados por síntesis pura, sin muestras de terceros, así que no tienen licencia que cuidar.
- **Están en:** `assets/compartidos/sfx/sintetizados/`. Son deterministas: con la misma semilla salen los mismos archivos.
- **Para retocarlos o crear variantes:** `scripts/lib/sonidos.py` (necesita `scipy`).
- **Qué hay:** burbuja, campana, clic, cristal, ding, éxito, golpe, negación, papel, pop, proyector, puff, subida, swoosh, tecla, tic, whoosh.

## Escenas del kit que todavía no tiene nuestra biblioteca (pendientes)

| Escena | Momentos | Para qué |
|---|---|---|
| `chat` | 5 | Mensajes que entran uno por uno (pedido → respuesta) |
| `editor` | 4 | Ventana de código o texto que se escribe |
| `movil` | 3 | Teléfono con pantallas que cambian |
| `cifras` | 1–3 | Varias cifras grandes a la vez |
| `ficha` | 1–4 | Tarjeta con datos que se completan |
| `lista` | 2–5 | Ítems que entran en su palabra |
| `pasos` | 2–4 | Proceso numerado (fases) |
| `tachado` | 2 | Palabra equivocada tachada y reemplazada |
| `objecion` | 2 | "¿Pensás que…?" → respuesta |
| `pregunta` | 3 | Pregunta con opciones |
| `barras` | 2–5 | Gráfico de barras que crece |
| `galeria` | 2 | Varias imágenes en abanico |

Ya cubiertas en nuestra biblioteca: `titular` (`gancho-tipografico`), `contador` (`prueba-contador`), `comparacion` (`nosotros-vs-otros`), `imagen` (`pantallas-producto`) y `cta` (`cta-palabra-clave`).
