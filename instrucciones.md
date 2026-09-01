# Instrucciones — Portafolio web de Gabriel Reyna

Este archivo es el **prompt maestro** del sitio. Cualquier IA (Claude Code u otra) que genere código para este proyecto debe leer este archivo completo antes de empezar, y respetar las decisiones tomadas aquí incluso si conoce alternativas "mejores".

---

## 1. Propósito del sitio

Sitio personal que sustituye al PDF del CV cuando un reclutador técnico quiere ver evidencia más profunda: código real, decisiones metodológicas, resultados con contexto y limitaciones declaradas.

Objetivo secundario: un blog corto para documentar decisiones técnicas de mis proyectos y dejar rastro público de cómo razono.

**No** es un sitio para conseguir clientes freelance ni para vender productos. No lleva analíticas de marketing, embudos ni pop-ups.

## 2. Sobre mí (contexto para toda escritura del sitio)

- **Nombre**: Gabriel Reyna Alvarado
- **Ubicación**: Lima, Perú
- **Formación**: Ciencias de la Computación, UPC (en curso)
- **Enfoque**: Data Analysis, Machine Learning aplicado, visión computacional. El desarrollo web es capacidad secundaria.
- **Stack técnico real**: Python, scikit-learn, XGBoost, SHAP, Polars/Pandas, Streamlit, Tableau, SQL, OpenCV, PyTorch/TensorFlow, Java/Spring Boot, Git.
- **Contacto**: g.alonsoreyna@gmail.com · linkedin.com/in/gabriel-reyna-alvarado · github.com/[usuario]

## 3. Público objetivo

Reclutadores técnicos y hiring managers de:
- Consultoras de datos y áreas de analítica de bancos, retail y telco en Perú
- Startups regionales de IA
- Programas de práctica y trainee en Data/ML

Ese público desconfía de portafolios genéricos. Espera ver:
- Que entiendo lo que hace un modelo por dentro
- Declaración explícita de limitaciones y riesgos metodológicos
- Números concretos (F1, AUC, tamaño de dataset, tiempo de query), no descripciones abstractas
- Código en GitHub, no capturas

## 4. Stack técnico obligatorio

| Capa | Elección | Justificación |
|---|---|---|
| Framework | **Next.js 16** (App Router) | LTS activo, Turbopack por defecto |
| Runtime React | **React 19** | Server Components, `use` API |
| Lenguaje | **TypeScript** en modo strict | Nada de `any` |
| Estilos | **Tailwind CSS v4** con tokens en `@theme` | Sin librerías de componentes pesadas (nada de MUI/Chakra) |
| Modo tema | **next-themes** con `attribute="class"` | Toggle claro/oscuro |
| Blog | **MDX** en archivos dentro del repo (`/content/blog/*.mdx`) con `next-mdx-remote/rsc` | Sin CMS, sin BD |
| Portafolio | Archivo TS: `src/data/projects.ts` exportando arreglo tipado | Sin CMS, sin BD |
| Hosting | **Vercel**, deploy automático desde `main` en GitHub | |
| Analíticas | **Vercel Analytics** (opcional, gratuito, sin cookies de terceros) | |
| Formulario contacto | `mailto:` por default. Si formulario, **Formspree** o **Web3Forms** (tier gratuito) | Sin backend propio |

**Prohibido**: bases de datos, autenticación, funciones serverless con estado, secretos en runtime que no sean claves públicas de servicios de terceros.

## 5. Estructura de secciones

### `/` — Home
- Hero: nombre, título de posicionamiento, tagline, CTAs a `/proyectos` y descarga de CV
- 3 tarjetas de proyectos destacados (flag `featured: true` en `projects.ts`)
- 3 entradas recientes del blog
- Footer con contacto y links sociales

### `/proyectos` — Portafolio
- Lista con **filtro por tag**: `Machine Learning`, `Visualización`, `Visión Computacional`, `Backend`, `Otros`
- Cada tarjeta: título, año en mono, resumen de una línea, métricas en tabular figures, stack
- Cada proyecto tiene página propia en `/proyectos/[slug]` con esta plantilla:
  1. Meta compacta (stack, categorías, rol si aplica)
  2. Números destacados (si hay métricas)
  3. **Contexto** — qué problema, para quién
  4. **Decisiones metodológicas** — numeradas
  5. **Resultados** con números
  6. **Limitaciones** declaradas
  7. Enlaces (repo, demo, reporte técnico) si existen

### `/blog` — Blog
- Lista cronológica inversa de entradas MDX
- Frontmatter esperado: `title`, `date` (ISO), `description`, `tags`
- Tiempo de lectura calculado a 220 palabras/minuto
- Categorías previstas: post-mortems de proyectos, notas metodológicas breves, reseñas

### `/contacto` — Contacto
- Email, LinkedIn, GitHub como definition list — sin formulario en v1
- Botón de descarga del CV

## 6. Tono y estilo de escritura

**Idioma**: español, siempre. Nombres técnicos en inglés respetados (no traducir "machine learning" ni "dataset").

Voz:
- Primera persona singular por defecto; nosotros solo cuando fue trabajo de equipo
- Técnica pero no acartonada
- Números específicos siempre que existan
- Declaro limitaciones sin excusarme
- **Sin** frases de relleno tipo "apasionado por la tecnología", "amante del código"
- **Sin** superlativos vacíos ("excelentes resultados", "gran éxito")
- **Sin** emojis en secciones formales; permitidos con moderación en blog

**Ejemplo del tono correcto** para una tarjeta de proyecto:

> Recomendador híbrido para reducir desperdicio alimentario en hogares. Combina TF-IDF, ALS implícito y urgencia por vencimiento. Evaluado con protocolo de canasta enmascarada: 100% de cobertura de catálogo. Descarté PageRank tras ablación (peso óptimo = 0), documentado en el reporte.

**Ejemplo del tono a evitar**:

> Un proyecto increíble donde apliqué mis conocimientos en IA para ayudar a las familias. Los resultados fueron excelentes y aprendí muchísimo trabajando en equipo. 🚀

## 7. Estilo visual — concepto "cuaderno científico"

La dirección visual es la de un cuaderno de laboratorio o journal técnico. Papel, tinta, hairlines. Nada de gradientes, glassmorphism, cartas SaaS con sombras suaves ni el combo "fondo negro + verde acid" que se lee como plantilla de portafolio generado.

**Modo claro por defecto**, toggle a modo oscuro que respeta la misma lógica (fondo azul-tinta profundo, no negro puro; texto crema, no blanco puro).

Paleta (tokens definidos en `src/app/globals.css` con `@theme`):

| Rol | Claro | Oscuro |
|---|---|---|
| `--color-paper` (fondo) | `#F8F6F0` | `#10171F` |
| `--color-ink` (texto) | `#1A1A1A` | `#E8E4DA` |
| `--color-ink-muted` (secundario) | `#6B6B6B` | `#9AA4B0` |
| `--color-rule` (hairlines) | `#D6D0C0` | `#253242` |
| `--color-accent` (enlaces, focos) | `#14304A` | `#7DB4E1` |
| `--color-signal` (destaque puntual) | `#B4841E` | `#E6B563` |

Regla clave: **el acento se usa poco**. Un color señalando algo importante gana peso solo si el resto está en silencio.

Tipografía (cargada con `next/font`):

- **Fraunces** (display) — títulos y encabezados. Serif con personalidad, con eje `SOFT` para dulcificar en tamaños grandes
- **Newsreader** (body) — cuerpo largo, pensada para lectura sostenida
- **JetBrains Mono** (mono) — metadata, años, métricas, tags, todo lo que se beneficia de figuras tabulares

Tres familias es el techo. No sumar más sin justificación.

Layout:
- Ancho máximo del contenido: 5xl (Tailwind) para secciones amplias; `--measure` (68ch) para bloques de lectura
- Alineación izquierda. Sin centrar párrafos
- Espaciado generoso — el aire es parte del mensaje
- **Sin** border-radius grandes. Radios de 2-4px máximo
- **Sin** sombras difusas. Hairlines de 1px como estructura
- Figuras tabulares (`font-variant-numeric: tabular-nums`) en toda métrica

## 8. Patrones a evitar (tells de sitio generado)

Estos aparecen en la guía de diseño del studio y hay que evitarlos activamente:

- Eyebrows en ALL CAPS con tracking espaciado sobre cada título
- Cadenas de metadata unidas por middle dot: `A · B · C`
- Etiquetas tipo `WORD — fragmento` con em dash espaciado
- Flecha `→` apendida a botones y enlaces
- Un solo palabra de un título en color/italic/bold para "acento"
- Grid de tarjetas idénticas con esquinas redondeadas y sombra `rgba(0,0,0,.1)`
- Fondo casi negro (`#0B0B0B`, `#111`) haciendo de negro
- Numeración `01 / 02 / 03` cuando el contenido no es realmente una secuencia

## 9. Accesibilidad y rendimiento

- Contraste AA mínimo en todos los textos
- `alt` obligatorio en toda imagen; si es decorativa, `alt=""`
- Imágenes con `next/image`, formato WebP/AVIF automático
- Fuentes con `next/font` — nunca `@import` en CSS
- `prefers-reduced-motion` respetado (ya configurado en `globals.css`)
- Focus visible en todos los elementos interactivos
- **Metas Lighthouse**: 95+ Performance, 100 Accesibilidad
- Videos externos: solo enlazados a YouTube/Vimeo, nunca subidos al repo

## 10. SEO y metadata

- `generateMetadata` por página con título y descripción (150-160 caracteres)
- Imagen OG por defecto para el sitio; una personalizada por proyecto cuando aporte
- `sitemap.xml` y `robots.txt` generados por Next.js (pendiente agregar)
- Schema.org `Person` como JSON-LD en Home (pendiente agregar)

## 11. Convenciones de código

Estructura de carpetas:

```
src/
  app/            # rutas
  components/     # agrupados por dominio: layout/, project/, blog/, ui/
  data/           # projects.ts, socials.ts, site.ts
  lib/            # utilidades (blog.ts, utils.ts)
content/
  blog/           # .mdx
public/
  cv/             # CV en PDF
```

- Server Components por defecto; `"use client"` solo si hay interactividad real
- Nada de `any` en TypeScript
- Nombres en inglés en el código; contenido de UI en español
- Commits en español, presente imperativo: `agrega tarjeta de proyecto`, `corrige contraste del hero`

## 12. Qué NO hacer

- No agregar sistema de comentarios en el blog en v1
- No agregar autenticación
- No incrustar videos pesados
- No usar Framer Motion salvo caso justificado
- No hacer scroll infinito
- No pop-ups de cookies (no hay tracking de terceros)
- No usar librerías de gráficos si un SVG estático alcanza

## 13. Protocolo para Claude Code

Al recibir cualquier tarea sobre este proyecto:

1. Lee este archivo completo antes de escribir código
2. En una sola frase, di **qué vas a hacer** y **qué archivos vas a crear o modificar**
3. Si vas a instalar una dependencia nueva, justifícala en una línea
4. Después ejecuta

Si algo de la tarea contradice este archivo, pregunta antes de improvisar.

## 14. Pendientes conocidos

Bloqueantes antes del deploy:

- **CV**: colocar `gabriel-reyna-cv.pdf` en `public/cv/` y cambiar `cvAvailable` a `true` en `src/data/site.ts`.
- **Dominio**: actualizar `site.url` en `src/data/site.ts`. De ese valor dependen el sitemap, robots y las URLs canónicas.

No bloqueantes:

- **Certificados**: nombrar los cursos concretos de Platzi y Coursera en `src/data/education.ts`, o quitar la entrada.
- **Repos faltantes**: ALDIMI Predict, el recomendador SKI y Career Assessment no tienen repositorio enlazado. Smart Kitchen y FruitGuard sí.
- **Repos de curso en GitHub**: el perfil tiene varios repositorios sin descripción (`expo`, `fundamentosjuegos20241`, `Teor-a-de-los-Juegos-pt3`). Conviene fijar los buenos con "pinned repositories" para controlar lo que se ve primero.
- **Imágenes de proyecto**: ninguna todavía. Todas las tarjetas renderizan en modo tipográfico, que es un estado válido. Ver `public/projects/README.md`.
- **Imagen OG**: `public/og.png` se generó con Lora como sustituta de Fraunces porque el entorno de build no tenía la fuente real. Regenerable localmente con las fuentes del sitio.

Resueltos:

- GitHub: `https://github.com/ZtanQ`.
- Inglés: B2, Cambridge First, marzo 2025.
- Foto de About: retrato con mirada a cámara, recortado a 4:5.
