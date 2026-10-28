# Playbook de motion: cómo llegar a nivel Prompt Motion

> **Fuentes:**
>
> - "Claude Motion Playbook" (logiaweb.net/hub/library/guides/claude-motion-playbook), leído el 2026-10-27;
> - prompt-motion.com: galería de unos 234 videos de motion hechos con Claude, cada uno con su prompt. El análisis completo está en `referencias/general/analisis/prompt-motion/analisis.md`.
>
> El playbook está pensado para "Claude Motion" (beta: exporta MP4 solo en los planes Team y Enterprise). **Acá el motor es HyperFrames**: hace lo mismo, código → MP4 determinístico, sin depender del plan.

## Flujo (adaptado al pipeline del estudio)

1. **Elegir una referencia de movimiento** en `referencias/general/videos/prompt-motion/`. Hay un índice de los 234 en `analisis.md`; filtrar por Product UI, Kinetic type, Shapes, Charts o Diagramas.
   - **Copiar el estilo de movimiento y el ritmo.** Nunca la marca, el copy ni los colores de la referencia.
2. **Sumarle nuestra idea abajo del prompt de la referencia.** Si no se agrega, Claude "solo cambia colores". Siempre hay que agregar:
   - el concepto (qué muestra o qué dice);
   - el **copy exacto** en pantalla;
   - la audiencia y la plataforma (Instagram);
   - la duración (10, 15, 20 o 30 s);
   - la relación de aspecto (**9:16**).
3. **Darle la marca.** En el estudio ya está resuelto: `marcas/<marca>/tokens.css`, `DESIGN.md` y `logos/`. Las capturas reales del producto van en `assets/media/` del reel. **Sin assets de marca, el resultado parece plantilla.**
4. **Esfuerzo máximo, e iterar escena por escena.** Cada escena es código independiente: cambiar una no rompe las otras. Pedir arreglos solo de la escena que falla.

## Estructuras probadas (las 9 del playbook, en nuestro formato)

| Caso de uso | Duración | Estructura | Marca donde encaja |
|---|---|---|---|
| Reel de presentación de marca | 15 s | Gancho fuerte en el **primer segundo** → secuencia de técnicas (tipografía, formas, movimientos de cámara, cambios de color) → cuadro final limpio, con cortes **al ritmo de la música** | Las tres |
| Revelado de logo | 3–5 s | El logo se arma con formas, líneas, letras o partículas, y termina en el tagline. Estilo calmo y premium, o rápido y fuerte | Intro u outro de cada marca |
| Film de lanzamiento de producto | < 15 o 30 s | Gancho → beats separados de "prueba del producto" y de "IA" → cortes sincronizados a la música | Aura (MCP, features), Synous |
| Teaser de feature | 15 s | Nombre de la feature → qué hace → la pantalla → cierre con fecha o "Muy pronto" | Aura (cuando se libere algo) |
| Explicador de negocio | 30 s | 5 escenas: problema → qué hacemos → cómo funciona en 3 pasos → una prueba → nombre | synx build, Synous |
| Reel de portfolio | 20 s | Proyectos destacados → cierre con nombre y rol | synx build (landings), Synous (casos) |
| Anuncio de hito | 10–15 s | Número + cuánto llevó + a quién agradecer | Las tres, solo con un número real |
| Animación de UI a partir de un frame | 5–10 s | Respeta la pantalla estática **tal cual** y solo le agrega movimiento | Aura y Synous (capturas reales) |
| Loop de morph de UI (avanzado) | 7 compases a ~120 BPM | Una forma que pasa por 8 a 12 estados de UI (botón, loader, toggle, gráfico…) en loop perfecto | Separadores y fondos de marca |

## Reglas técnicas que suman (además de las de `CLAUDE.md`)

- **Todo estilo se calcula a partir del tiempo.** Nada de transiciones CSS ni timers. El estudio ya lo cumple con los timelines pausados y `hf-seek`.
- **Springs en forma cerrada** (función del tiempo), en lugar de simulación física. Usar springs separados para cada borde de un indicador de tabs y para la perilla de un toggle.
- **Desenfoque de movimiento:**
  - renderizar 4 subframes por frame y mezclarlos con ffmpeg `tmix` (a 60 fps, en el playbook);
  - `TODO:` probar cómo se haría con HyperFrames: render a fps alto y después `tmix` + `fps=30`.
- **Sincronizar con la música:**
  - analizar los beats (con numpy, o con faster-whisper si es la voz) y cortar en el beat;
  - antes del render completo, **renderizar un fotograma por beat** como vista previa.
- **Nunca poner `will-change`** en algo que la cámara escala, porque el texto sale borroso.
- **Texto que se reemplaza por otro:** la entrada y la salida van con tiempos separados. Nunca se pisan.
- **En un loop**, el último fotograma tiene que ser idéntico al primero, incluida la posición y la velocidad del cursor.
- **Prohibido en UI** (según el playbook, para piezas de UI limpias):
  - easing con rebote;
  - estallidos de partículas;
  - brillos y degradados sobre el chrome de la interfaz;
  - íconos con trazos distintos entre sí;
  - **tiempo muerto**.

## Consejos

- **Ver la referencia completa** antes de copiar su prompt.
- **Arrancar con 10–15 s** para iterar más rápido. Recién después estirar a 30.
- **Siempre aclarar plataforma y relación de aspecto.**
- **Claude anima lo que le das, no genera fotos reales ni personas.** Para visuales de producto, íconos o mockups hay que tener los assets antes, ya sea reales o hechos con Aura o Limora.

## Errores comunes

- Pegar el prompt de la referencia sin cambios: queda la historia y el copy del creador original.
- Copiar la marca de la referencia en vez de su movimiento.
- No decir plataforma, duración ni relación de aspecto.
- No dar assets de marca: el resultado se ve como una plantilla.
- Esperar fotos reales o personas generadas.
- Poner `will-change` en elementos que la cámara escala.
- Terminar un loop en un fotograma distinto del primero.
