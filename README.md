# Portafolio — Gabriel Reyna

Sitio personal con foco en proyectos de Data y Machine Learning. Next.js 16 + Tailwind v4, sin backend ni base de datos.

Para entender por qué está construido así, lee **`instrucciones.md`** antes que cualquier otra cosa. Ese archivo es el contrato del proyecto.

## Arrancar en local

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build |
| `npm run lint` | ESLint |
| `npm run type-check` | Verificación de tipos sin emitir |

## Estructura

```
src/
  app/                 # Rutas (App Router)
    layout.tsx         # Shell global, fuentes, provider de tema
    page.tsx           # Home
    globals.css        # Tailwind v4 + tokens de tema
    proyectos/
      page.tsx         # Lista con filtro
      [slug]/page.tsx  # Detalle de proyecto
    blog/
      page.tsx         # Lista de notas
      [slug]/page.tsx  # Nota individual (renderiza MDX)
    contacto/
      page.tsx
    not-found.tsx
  components/
    layout/            # Header, footer, theme provider/toggle
    project/           # Card y filtro de proyectos
    blog/              # Card de blog
    ui/                # Primitivos reutilizables (por ahora vacío)
  data/
    site.ts            # Nombre, rol, tagline, URL
    socials.ts         # Enlaces sociales
    projects.ts        # Todos los proyectos tipados
  lib/
    blog.ts            # Lectura de MDX desde filesystem
    utils.ts           # formatDate, cn
content/
  blog/                # Notas .mdx
public/
  cv/                  # gabriel-reyna-cv.pdf va aquí
```

## Agregar contenido

**Un proyecto nuevo**: agregar un objeto al arreglo en `src/data/projects.ts`. Las páginas de detalle se generan estáticamente desde ese arreglo.

**Una nota de blog**: crear `content/blog/mi-slug.mdx` con este frontmatter:

```yaml
---
title: "Título de la nota"
date: "2026-09-01"
description: "Una o dos líneas para la tarjeta y el meta description."
tags: ["metodología", "post-mortem"]
---
```

El slug de la URL es el nombre del archivo sin extensión.

## Deploy en Vercel

1. Subir el repo a GitHub.
2. En Vercel, importar el repo. La detección de Next.js es automática — no cambiar los defaults.
3. Habilitar 2FA en GitHub y Vercel (obligatorio; ver instrucciones.md §4).
4. Cada push a `main` dispara deploy automático.

## Antes del primer deploy

Revisa la lista de pendientes en `instrucciones.md` §14 — hay placeholders (usuario de GitHub, dominio, archivo del CV) que deben resolverse.
