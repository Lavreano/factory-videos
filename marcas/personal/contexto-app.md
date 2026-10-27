# Contexto de app — Marca personal

La marca personal muestra el trabajo de las dos unidades de negocio. Puede leer en vivo los proyectos de portfolio y los repos de las apps.

| Campo | Valor |
|---|---|
| Ruta absoluta del proyecto / portfolio | `TODO:` (ej. `D:\Laureano\...\portfolio`) |
| Otras carpetas útiles | `TODO:` (landings de clientes con permiso, capturas del proceso) |

## Qué leer

- `README.md` y `docs/` del proyecto.
- Componentes de UI: `TODO:` (ej. `src/components/`).
- Copy real: `TODO:` (ej. `src/content/`, `messages/es.json`).
- Capturas: `TODO:` (ej. `public/screenshots/`).

## Qué ignorar

`node_modules/`, `.next/`, `dist/`, `build/`, `.vercel/`, `.git/`, **cualquier `.env*`**, claves, credenciales y datos de clientes.

## Cómo se usa

1. Pedirle a Laureano: `/add-dir <ruta>` (o arrancar Claude Code con `--add-dir <ruta>`).
2. Leer solo lo indicado arriba.
3. Todo dato que salga de ahí se cita en el storyboard: `origen: <ruta/archivo>`.
4. **Solo lectura.** Nunca modificar, borrar ni commitear nada en esa carpeta.
5. Si la carpeta no está accesible: avisar y no inventar.
