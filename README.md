# Portafolio — Gabriel Reyna

[![CI](https://github.com/ZtanQ/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ZtanQ/Portfolio/actions/workflows/ci.yml)

Sitio personal con foco en proyectos de Data y Machine Learning. Next.js 16 +
Tailwind v4, sin backend ni base de datos. El contenido del sitio está en
inglés; la documentación y los commits, en español.

- **Producción**: <https://portfolio-ztanq.vercel.app>
- **Contrato del proyecto**: `instrucciones.md` — sistema de diseño y reglas de
  tono. Léelo antes de tocar nada.
- **Estado y cola de trabajo**: `HANDOFF.md` — qué está hecho y qué falta.

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

Si el build falla con `TS2307` sobre módulos que ya no existen, es caché viejo
de `next dev` en `.next/dev/types/`. Borrar `.next` y reconstruir.

## Estructura

```
src/
  app/                    # Rutas (App Router)
    layout.tsx            # Shell global, fuentes, provider de tema
    page.tsx              # Home: hero, experiencia, proyectos, writing, contacto
    globals.css           # Tailwind v4 + tokens de tema
    about/page.tsx
    projects/
      page.tsx            # Lista con filtro por tag, estado en la URL
      [slug]/page.tsx     # Detalle de proyecto
    writing/
      page.tsx            # Lista de notas
      [slug]/page.tsx     # Nota individual (renderiza MDX)
    robots.ts             # robots.txt generado
    sitemap.ts            # sitemap.xml generado
    not-found.tsx
  components/
    layout/               # Header, footer, hero, contacto, experiencia,
                          # theme provider/toggle, JSON-LD de Person
    project/              # Card y filtro de proyectos
    blog/                 # Card de nota
  data/                   # Todo el contenido, tipado
    site.ts               # Nombre, rol, tagline, URL, bandera y ruta del CV
    about.ts              # Bio, foto, áreas de trabajo, idiomas
    projects.ts           # Los cinco proyectos
    experience.ts         # Cirion, Camote Studio
    education.ts          # UPC, Pittsburgh, GameLab, certificados
    stack.ts              # Stack del hero, cada ítem con su evidencia
    games.ts              # Juegos publicados en itch.io
    socials.ts            # Email, LinkedIn, GitHub, itch.io
  lib/
    blog.ts               # Lectura de MDX desde filesystem
    utils.ts              # formatDate, cn
content/
  blog/                   # Notas .mdx (la carpeta se llama blog; la ruta
                          # pública es /writing)
cv/
  gabriel-reyna-cv.tex    # Fuente LaTeX del CV — ver cv/README.md
public/
  cv/                     # gabriel-reyna-cv.pdf (solo el PDF, no la fuente)
  img/                    # Foto de About
  projects/               # Imágenes de proyecto — ver public/projects/README.md
  og.png                  # Imagen OG por defecto
```

No hay ruta `/contacto`: el contacto es una sección del home más un enlace en el
footer.

## Agregar contenido

**Un proyecto nuevo**: agregar un objeto al arreglo en `src/data/projects.ts`.
Las páginas de detalle se generan estáticamente desde ese arreglo. El campo
`links.repos` es una lista de `{ label, url }`: con un solo repositorio la
etiqueta es `"Source on GitHub"`; con varios, cada etiqueta dice qué contiene.

**Una nota**: crear `content/blog/mi-slug.mdx` con este frontmatter:

```yaml
---
title: "Title of the note"
date: "2026-09-01"
description: "One or two lines for the card and the meta description."
tags: ["methodology", "post-mortem"]
---
```

El slug de la URL es el nombre del archivo sin extensión. El tiempo de lectura
se calcula a 220 palabras por minuto.

**El CV**: editar `cv/gabriel-reyna-cv.tex`, compilar y copiar el PDF a
`public/cv/gabriel-reyna-cv.pdf` conservando el nombre — la ruta está fijada en
`cvPath`, dentro de `src/data/site.ts`. Instrucciones completas en
`cv/README.md`.

## Deploy

GitHub → Vercel, deploy automático desde `main`. Ya está conectado.

`site.url` en `src/data/site.ts` es la única fuente del dominio: de ahí salen
`metadataBase`, `openGraph.url`, el sitemap, robots y el JSON-LD de Person.

Pendiente: activar 2FA en GitHub y Vercel (ver `instrucciones.md` §4).
