# Tipos de prueba visual

La prueba es lo que convierte una promesa en algo creíble (bloque 5 de `estructura-reel.md`). Acá están los tipos que usamos y la escena de la biblioteca que resuelve cada uno.

**Regla de oro:** solo pruebas **reales** con `permiso: confirmado` en `marcas/<marca>/pruebas-reales.md`, o rotuladas `DATO DE EJEMPLO` en pantalla. Nunca inventar números, clientes ni testimonios.

| Tipo | Qué muestra | Cuándo usarla | Escena de biblioteca |
|---|---|---|---|
| **Antes / después** | La misma pieza (landing, sistema, operación) antes y después de intervenirla. | Cuando el cambio es visible. Es la prueba más fuerte para landings. | `before-after` |
| **Proceso en vivo** | El trabajo mientras se hace: wireframe → diseño → publicado, o un flujo de la app funcionando. | Para mostrar criterio y método, no solo resultado. Ideal para el territorio "Proceso". | `mockup-ui-cursor` (+ transición `zoom-through`) |
| **Número en pantalla** | Una cifra grande que cuenta hacia arriba, con un gráfico que se dibuja. | Cuando hay un dato concreto (registros, conversión, alumnos, días). | `prueba-contador` |
| **Reacción o testimonio de un tercero** | Captura de mensaje, cita o video del cliente. | Solo con permiso confirmado. Datos personales tapados. | `mockup-ui-cursor` con la captura como imagen; o capa de video en `assets/<marca>/grabaciones/` |
| **Comparativa lado a lado** | Nosotros vs. la alternativa (template, IA sin criterio, parches). | Para desarmar objeciones (bloque 6). | `nosotros-vs-otros` |
| **Experimento "probé X durante Y"** | Un registro con fechas y resultado del experimento propio. | Territorio "Proceso" / pilar Conocimiento personal. | `prueba-contador` (línea de tiempo) + `mockup-ui-cursor` |

## Cómo rotular

- `DATO DE EJEMPLO` en mono, tamaño ≥ 28 px, color `--color-text-muted`, siempre visible mientras se ve el dato.
- Prueba real: en el storyboard se anota **de dónde sale** (archivo, captura, documento) y el estado de permiso.
- Casos con nombre propio: solo si `permiso: confirmado`. Si está `pendiente`, se puede usar el dato **sin nombre** solo si Laureano lo aprueba explícitamente en el brief.
