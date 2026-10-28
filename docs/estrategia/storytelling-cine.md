# Storytelling y cine: anuncios que cuentan una historia

> **Decisión de Laureano (2026-10-28).** Explicar el producto ya no funciona tan bien. Los reels **cuentan una historia** y se ven como **cine**, animados con Three.js.
> **Fuentes:**
>
> - `referencias/general/analisis/storytelling-open-loops.md`: las 4 reglas;
> - `referencias/general/analisis/storytelling-maestro.md`: open loops y prueba con nombre;
> - `docs/produccion/playbook-motion.md` y `docs/produccion/metodo-becario.md`.

## 1. Por qué historia y no explicación

Un anuncio que explica el producto le habla a alguien que **ya decidió** escuchar. Una historia frena al que **no** había decidido nada: la cabeza no puede dejar un conflicto sin resolver.

El producto aparece como **el giro de la historia**, no como su tema.

## 2. La estructura (las 4 reglas)

1. **Empezar con el conflicto.** Nada de "Hola, hoy te voy a contar…". El primer cuadro ya está en el medio del problema: ¿qué está pasando? ¿qué está mal?
2. **Contar el final al principio.** En los primeros 3 segundos se ve o se nombra la transformación. El espectador ya sabe adónde va: lo que quiere ver es **cómo se llegó**.
3. **La atención crece, nunca baja.** Cada bloque sube un escalón en tensión, escala visual o sonido. Lo más grande va cerca del final, no al principio.
4. **Open loops en el medio.** Son mini ganchos que abren una pregunta y la cierran más adelante: "y ahí apareció el problema de verdad…", "pero eso no fue lo peor". Son lo que hace que lleguen al final.
   - **Regla del estudio:** un open loop se **cierra dentro del video**. El CTA entrega algo más, no lo que quedó pendiente. Prometer y no cumplir va contra nuestra regla de honestidad.

### Cómo encaja con los 7 pasos de `estructura-reel.md`

| Paso clásico | En versión historia |
|---|---|
| 1. Gancho | **El conflicto en curso**, más un destello del final ("así terminó") |
| 2. Promesa | Implícita: el final que ya se vio |
| 3. Enemigo común | **El antagonista de la historia**: el hábito, la creencia o la situación que traba al protagonista |
| 4. Solución | **El giro**: aparece el sistema o el producto. No se explica, se ve actuar |
| 5. Prueba | **El desenlace**: el final que mostramos al principio, ahora entendido |
| 6. Valor + objeción | Un open loop que se cierra ("y no hizo falta…") |
| 7. CTA | Fuera de la historia, en una línea |

### Plantilla de guion-historia (25–40 s)

| Tiempo | Bloque | Qué pasa |
|---|---|---|
| 0–2 s | Conflicto | Imagen del problema en su peor momento. **Sin sonido tiene que entenderse** |
| 2–4 s | Final adelantado | Un destello de cómo termina (2–3 cuadros de la escena final) + "Así terminó." |
| 4–10 s | Contexto | Cómo se llegó al conflicto. **Open loop 1** al cierre del bloque |
| 10–18 s | Escalada | Empeora. Cada plano, un escalón más. **Open loop 2** |
| 18–26 s | Giro | Aparece el sistema o el producto y cambia la física de la escena (luz, color, orden) |
| 26–32 s | Desenlace | Volvemos a la escena del final: ahora se entiende. Se cierran los loops |
| 32–36 s | CTA | Una línea. "Comentá PALABRA…" |

**Protagonista sin personas reales generadas.** Claude no genera fotos ni personas realistas, y no inventamos testimonios. El protagonista es:

- **un objeto** (un creativo, una landing, un mensaje de WhatsApp);
- **un espacio** (un escritorio, una ciudad de pantallas);
- **un personaje abstracto o la mascota de la marca** (el robot de Aura);
- o **el propio cliente con permiso** (casos reales de `pruebas-reales.md`).

## 3. "Todo es cine": lenguaje visual con Three.js

### Cámara (lo que más separa al cine de una animación)

- **Una sola cámara física.** Se mueve, no salta: dolly, travelling lateral, grúa y órbita lenta. Nunca dos movimientos de cámara a la vez.
- **Lentes:**
  - 35 mm (FOV ≈ 54° en 9:16) para el espacio;
  - 50–85 mm (FOV 30–40°) para el detalle y la emoción.
- **Profundidad de campo:** el foco va donde está la historia y **se desplaza** (rack focus) cuando cambia el protagonista. Se hace con `BokehPass` o un DOF por píxel.
- **Peso:** aceleración y frenado suaves, sin velocidad constante robótica. La posición se integra con una curva de velocidad, no con keyframes de posición.
- **Motion blur real:** render a 240 fps y `tmix` de 8 subframes (ya está en el pipeline).

### Luz (la emoción)

- **Clave lateral dura y relleno muy bajo:** lo oscuro cuenta tanto como lo iluminado.
- **Contraluz (rim)** para separar al protagonista del fondo.
- **La luz cambia con la historia.** El conflicto va frío y desaturado; el giro cambia la temperatura o enciende el acento de la marca, y ese es el momento visual del producto.
- **Luz volumétrica o haces** (niebla con `FogExp2` + planos aditivos) para dar aire y escala.

### Materiales y mundo

- Materiales PBR (`MeshPhysicalMaterial`): vidrio, metal mate y papel. Nada de colores planos de "animación de PowerPoint".
- **Escala:** un objeto chico en un espacio grande transmite soledad o conflicto. El giro invierte la escala.

### Post-producción (dentro de Three.js, determinística)

- `EffectComposer` con:
  - `UnrealBloomPass` suave, solo en el acento;
  - grano de película (`FilmPass` o un shader con semilla);
  - viñeta;
  - una gradación de color por acto (LUT o curvas en un shader).
- Prohibido: aberración cromática fuerte, lens flares, sacudidas de cámara (como en las piezas buenas del corpus).

### Ritmo de cine (sin perder retención)

- **Plano largo con movimiento interno, no cortes cada 1,5 s.** La cámara siempre se mueve, así que `ritmo.py` igual da 0 huecos.
- **Cortes duros solo en el beat fuerte** (el drop o el giro). Entre bloques: match cuts y floods con la luz.
- **Sonido de cine:**
  - ambiente de sala (room tone) bajo todo el reel;
  - golpe grave en el giro;
  - silencio de 0,3 s antes del giro;
  - la música entra fuerte recién en el giro.

## 4. Contrato técnico (lo que no cambia)

- Three.js se maneja **solo desde `hf-seek`** con el tiempo local (`Estudio.tiempoLocal`): ni `requestAnimationFrame` ni `clock`.
- Todo azar con `mulberry32`.
- La cámara y las luces son **función del tiempo** (curvas definidas en el código), y se pueden recalcular en cualquier cuadro.
- Los colores de la marca salen de `tokens.css`: se leen con `Estudio.token()` y se pasan a los materiales.
- Postproceso con `EffectComposer` renderizado en el mismo `hf-seek`.
- Verificación: hoja de contactos, `ritmo.py` y fotogramas a tamaño completo de cada acto.

## 5. Qué falta construir en la biblioteca

| Pieza | Para qué |
|---|---|
| `cine-base` | Rig de Three.js con cámara física (curva de velocidad), DOF, bloom, grano, viñeta, niebla y gradación por acto. Base de todo reel cine |
| `camino-historia` | Línea 3D con bucles que la cámara recorre: la metáfora de los open loops |
| `objeto-heroe` | Producto o creativo en el centro: material PBR, luz que cambia en el giro |
| `ciudad-pantallas` | Muchas pantallas o creativos en el espacio, la escala del "volumen" (Aura) o del "sistema" (Synous) |
