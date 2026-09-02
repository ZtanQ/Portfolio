# Instrucciones — Portafolio web de Gabriel Reyna

Este archivo es el **prompt maestro** del sitio. Cualquier IA (Claude Code u otra) que genere código para este proyecto debe leer este archivo completo antes de empezar, y respetar las decisiones tomadas aquí incluso si conoce alternativas "mejores".

Se lee junto con `HANDOFF.md`, que dice **en qué estado está el proyecto**. Este archivo dice **cómo debe ser**. Si los dos discrepan sobre un hecho, gana `HANDOFF.md`; si discrepan sobre una regla, gana este.

> **Numeración estable.** `HANDOFF.md` y la auditoría de escaneo citan §7, §8 y §12 por número. Las secciones 1–14 conservan su numeración para siempre; lo nuevo se agrega al final (§15, §16). No renumerar.

---

## 1. Propósito del sitio

Sitio personal que sustituye al PDF del CV cuando un reclutador técnico quiere ver evidencia más profunda: código real, decisiones metodológicas, resultados con contexto y limitaciones declaradas.

El sitio se evalúa en dos tiempos y hay que diseñar para los dos:

- **Escaneo (6–10 segundos).** El evaluador no lee: busca anclas. Nombre, rol objetivo, tres o cuatro tecnologías, y un enlace inequívoco al CV. Si eso no está visible sin hacer scroll, no hay segundo tiempo.
- **Verificación (2–5 minutos).** Ahí entran el stack enlazado a evidencia, las fichas de proyecto con decisiones y limitaciones, y el código en GitHub.

La regla que ordena todo el sitio se deriva de esa secuencia: **el interés va antes que la verificación**. Material de prueba puesto delante del interés es una barrera, no una virtud.

Objetivo secundario: un blog corto para documentar decisiones técnicas de mis proyectos y dejar rastro público de cómo razono.

**No** es un sitio para conseguir clientes freelance ni para vender productos. No lleva embudos ni pop-ups. La única analítica es Vercel Analytics (sin cookies de terceros).

## 2. Sobre mí (contexto para toda escritura del sitio)

- **Nombre**: Gabriel Reyna Alvarado
- **Ubicación**: Lima, Perú
- **Formación**: Ciencias de la Computación, UPC (noveno ciclo, egreso 2026)
- **Enfoque**: Data Analysis, Machine Learning aplicado, visión computacional. El desarrollo de videojuegos es la segunda línea; el desarrollo web es capacidad secundaria, no producto.
- **Stack técnico real**: Python, scikit-learn, XGBoost, SHAP, Polars/Pandas, Streamlit, Gradio, Tableau, Power BI, SQL, OpenCV, Java/Spring Boot, Git.
- **Contacto**: g.alonsoreyna@gmail.com · linkedin.com/in/gabriel-reyna-alvarado · github.com/ZtanQ

## 3. Público objetivo

Reclutadores técnicos y hiring managers de:
- Consultoras de datos y áreas de analítica de bancos, retail y telco en Perú
- Startups regionales de IA
- Programas de práctica y trainee en Data/ML
- Roles Data/ML del mercado internacional (por eso el sitio está en inglés, ver §6)

Ese público desconfía de portafolios genéricos, y en 2026 desconfía además de portafolios *generados*. La sospecha por defecto es "esto lo escupió un LLM y no hay nadie detrás". Todo el sitio existe para desactivar esa sospecha:

- Que entiendo lo que hace un modelo por dentro
- Declaración explícita de limitaciones y riesgos metodológicos
- Números concretos (F1, AUC, tamaño de dataset, tiempo de query), no descripciones abstractas
- Origen de los datos declarado, incluido cuando son sintéticos y por qué
- Código en GitHub, no capturas
- Sistemas que se pueden usar en vivo, no solo describir

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
| CI | **GitHub Actions**: `lint` + `type-check` + `build` en cada push y PR | Evidencia de automatización, ver §15 |
| Analíticas | **Vercel Analytics** | Instalado |
| Formulario contacto | `mailto:`, sin formulario | Sin backend propio |

**Prohibido**: bases de datos, autenticación, funciones serverless con estado, secretos en runtime que no sean claves públicas de servicios de terceros.

**Sobre migrar a Astro**: descartado. La recomendación existe y es razonable en abstracto —islas, cero JS por defecto—, pero este sitio ya es casi todo Server Components con dos islas cliente (toggle de tema y filtro de proyectos), ya está desplegado y ya cumple las metas de Lighthouse. Migrar cuesta semanas y no compra ninguna señal que un reclutador pueda ver. No reabrir sin un número que lo justifique.

## 5. Estructura de secciones

### `/` — Home

Orden de secciones. El criterio es §1: interés, después verificación.

1. **Hero comprimido** — nombre, rol objetivo, tagline de una o dos líneas, tres o cuatro tecnologías núcleo, y los CTA (`/projects` y descarga de CV). Todo esto **antes del primer scroll**, en móvil también.
2. **Selected projects** — tres fichas con `featured: true`. Es la prueba, y va primero.
3. **Experience** — Cirion antes que Camote, por relevancia y no por fecha.
4. **Stack con evidencia** — los catorce enlaces de `stack.ts`, en su rol real: verificación de una afirmación ya hecha.
5. **Writing** y **Contact** — cierre.

El bloque completo de stack **no va en el hero**: son catorce decisiones antes de ofrecer una acción. La regla de evidencia que lo sostiene (§15) no cambia; cambia dónde cae.

Este orden reemplaza al documentado en `HANDOFF.md` §5. La razón de aquella decisión —"Experience antes que Projects, porque un reclutador valida experiencia"— sigue siendo válida para *Experience frente a Writing*, pero no frente a los proyectos: la experiencia es una práctica de tres meses y los proyectos son el cuerpo de trabajo.

El home es largo. Debe tener **anclas internas** navegables (`#projects`, `#experience`, `#stack`, `#contact`) para que quien llega buscando algo concreto pueda saltar.

### `/projects` — Portafolio
- Lista con **filtro por tag**, con el estado en la URL: `Machine Learning`, `Data Visualization`, `Computer Vision`, `Backend`
- Cada tarjeta: título, año en mono, resumen de una línea, métricas en figuras tabulares, stack
- **En móvil el título va primero.** Nunca un bloque de métricas por encima del nombre del proyecto: tres numerales sin sujeto no significan nada
- Cada proyecto tiene página propia en `/projects/[slug]` con esta plantilla:
  1. Meta compacta (stack, categorías, rol si aplica)
  2. Números destacados (si hay métricas)
  3. **Contexto** — qué problema, para quién
  4. **Origen de los datos** — fuente, tamaño, y si son sintéticos o simulados, por qué y contra qué se validaron
  5. **Decisiones metodológicas** — numeradas
  6. **Arquitectura** — diagrama estático cuando el sistema tiene más de una pieza (§15)
  7. **Resultados** con números
  8. **Limitaciones** declaradas
  9. Enlaces: repositorio, **demo en vivo** si existe, reporte técnico

Entre tres y cinco proyectos, nunca más. Hoy son cinco y están completos: agregar los recomendadores de curso (`Steam_recommendations-`, `PicaTeclas`) diluiría el conjunto sin agregar señal. Quedan fuera a propósito.

### `/writing` — Blog
- Lista cronológica inversa de entradas MDX
- Frontmatter esperado: `title`, `date` (ISO), `description`, `tags`
- Tiempo de lectura calculado a 220 palabras/minuto
- Categorías previstas: post-mortems de proyectos, notas metodológicas breves, reseñas

### `/about`
Foto, bio, áreas de trabajo, educación, idiomas y juegos publicados. Breve. Una sección "sobre mí" larga con aficiones irrelevantes diluye el mensaje.

### Contacto
No tiene página propia: es sección del home más enlace en el footer. Email, LinkedIn, GitHub como definition list, sin formulario.

## 6. Tono y estilo de escritura

**Idioma: inglés, todo el sitio.** El objetivo doble —prácticas en Perú y roles Data/ML internacionales— se resuelve en inglés, que el público peruano de este perfil lee sin fricción. Las rutas en español de la migración (`/proyectos`, `/blog`, `/contacto`) fueron eliminadas; no reintroducirlas ni crear versiones paralelas. Este archivo, `HANDOFF.md` y los mensajes de commit siguen en español: son documentos internos.

Voz:
- Primera persona singular por defecto; nosotros solo cuando fue trabajo de equipo
- Técnica pero no acartonada
- Números específicos siempre que existan
- Declaro limitaciones sin excusarme
- Modelo **acción – escala – resultado** en toda descripción de trabajo: qué hice, sobre cuánto, con qué efecto medible
- **Sin** frases de relleno tipo "passionate about", "amante del código"
- **Sin** superlativos vacíos ("excelentes resultados", "gran éxito")
- **Sin** emojis en secciones formales; permitidos con moderación en blog
- **Sin** cierres tipo "Let's connect"

**Ejemplo del tono correcto** para una tarjeta de proyecto:

> Hybrid recommender for reducing household food waste. Combines TF-IDF, implicit ALS and expiry urgency. Evaluated with a masked-basket protocol: 100% catalogue coverage. Ruled out PageRank after an ablation (optimal weight = 0), documented in the report.

**Ejemplo del tono a evitar**:

> An incredible project where I applied my AI knowledge to help families. The results were excellent and I learned a lot working as a team.

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

**Dos colores, dos trabajos**: `--color-accent` solo para navegación y enlaces; `--color-signal` solo para dato. Nunca se cruzan. El acento se usa poco: un color señalando algo importante gana peso solo si el resto está en silencio.

**Contraste verificado, no estimado.** El ámbar oscuro `#8A6410` da 4.97:1. El ámbar más claro `#B4841E` da 3.10:1 y **solo puede usarse en numerales de 24px o más** (`--color-signal-lg`). Los ratios están anotados en `globals.css`: si entra un color nuevo, se rehace la verificación contra fondo claro y oscuro **antes** de usarlo, y se anota igual.

Tipografía (cargada con `next/font`):

- **Fraunces** (display) — títulos y encabezados
- **Newsreader** (body) — cuerpo largo, lectura sostenida
- **JetBrains Mono** (mono) — metadata, años, métricas, tags, todo lo que se beneficia de figuras tabulares

Tres familias es el techo, y son tres a propósito: display, lectura y dato son tres trabajos distintos. La recomendación de mercado habla de dos, pensando en sitios que usan la mono solo de adorno; aquí carga todas las cifras. **No sumar una cuarta, y no bajar a dos.**

Layout:
- Ancho máximo del contenido: `70rem` para secciones amplias; `--measure` para bloques de lectura
- Los ~30rem que quedan a la derecha de la prosa en escritorio son **columna de margen**, no vacío: año, rol, equipo, estado. Es el segundo eje vertical del sistema y viene del propio concepto de cuaderno
- Alineación izquierda. Sin centrar párrafos
- **Alternancia de densidad**: no todas las secciones con la misma textura. Números y gráficos solo en el hero y en las páginas de proyecto; About, educación, experiencia y writing se quedan en registro editorial
- Espaciado generoso — el aire es parte del mensaje
- **Sin** border-radius grandes. Radios de 2-4px máximo
- **Sin** sombras difusas. Hairlines de 1px como estructura
- Figuras tabulares (`font-variant-numeric: tabular-nums`) en toda métrica

## 8. Patrones a evitar (tells de sitio generado)

Estos son los que delatan una plantilla. Hay que evitarlos activamente:

- Eyebrows en ALL CAPS con tracking espaciado sobre cada título
- Cadenas de metadata unidas por middle dot: `A · B · C`
- Etiquetas tipo `WORD — fragmento` con em dash espaciado
- Flecha `→` apendida a botones y enlaces
- Una sola palabra de un título en color/italic/bold para "acento"
- Grid de tarjetas idénticas con esquinas redondeadas y sombra `rgba(0,0,0,.1)`
- Fondo casi negro (`#0B0B0B`, `#111`) haciendo de negro
- Numeración `01 / 02 / 03` cuando el contenido no es realmente una secuencia

Agregados tras revisar el informe de tendencias 2025–2026. Son las recomendaciones *de moda* que este sitio rechaza, y se listan aquí para que ninguna IA las reintroduzca creyendo que moderniza:

- **Bento grid** de celdas asimétricas con bordes redondeados. Es el patrón dominante de 2026 y por eso mismo es el que más se parece a todos los demás
- **Glassmorphism**, `backdrop-blur`, bordes `white/10`, nav sticky translúcida
- **Modo oscuro por defecto** con Slate-900 y acento cian o esmeralda
- **Mapa de calor de contribuciones de GitHub**: mide constancia de commits, no capacidad. Es una métrica de vanidad
- **Skill bars** o cualquier porcentaje/estrellas sobre un lenguaje. El stack enlazado a evidencia (§15) es la alternativa y es mejor
- **Badges de CI** incrustados en el sitio: van en el README del repositorio, que es donde significan algo
- Efectos de máquina de escribir, preloaders, cursores personalizados, scroll-jacking

## 9. Accesibilidad y rendimiento

- Contraste AA mínimo en todos los textos, verificado (§7)
- `alt` obligatorio en toda imagen; si es decorativa, `alt=""`
- Imágenes con `next/image`, formato WebP/AVIF automático
- Fuentes con `next/font` — nunca `@import` en CSS
- `prefers-reduced-motion` respetado (ya configurado en `globals.css`)
- Focus visible en todos los elementos interactivos
- **Metas Lighthouse**: 95+ Performance, 100 Accesibilidad
- **Móvil no es un caso secundario.** Un layout que se rompe o desborda en móvil descalifica sin apelación: es la prueba más barata de negligencia que un evaluador puede hacer. Toda sección se revisa a 375px antes de darse por terminada
- Videos externos: solo enlazados a YouTube/Vimeo, nunca subidos al repo
- Ningún enlace muerto. Antes de distribuir el sitio se comprueban todos los repositorios, demos y descargas

## 10. SEO y metadata

- `generateMetadata` por página con título y descripción (150-160 caracteres)
- Imagen OG por defecto para el sitio; una personalizada por proyecto cuando aporte
- `sitemap.xml` y `robots.txt` generados por Next.js
- Schema.org `Person` como JSON-LD en Home
- `site.url` en `src/data/site.ts` es la **única** fuente del dominio: de ahí salen `metadataBase`, `openGraph.url`, el sitemap, robots y el JSON-LD

## 11. Convenciones de código

Estructura de carpetas:

```
src/
  app/            # rutas
  components/     # agrupados por dominio: layout/, project/, blog/, ui/
  data/           # projects.ts, socials.ts, site.ts, stack.ts, ...
  lib/            # utilidades (blog.ts, utils.ts)
content/
  blog/           # .mdx
public/
  cv/             # CV en PDF
cv/               # fuente LaTeX del CV
documentos/       # investigación de referencia, no se publica
```

- Server Components por defecto; `"use client"` solo si hay interactividad real
- Nada de `any` en TypeScript
- Nombres en inglés en el código y en el contenido de UI
- Commits en español, presente imperativo: `agrega tarjeta de proyecto`, `corrige contraste del hero`
- En las tarjetas solo el título es enlace; el área clickeable se extiende con `after:absolute after:inset-0`. No envolver la tarjeta entera en un `<Link>`
- **Sin dependencias nuevas** sin justificarlas antes
- **No hay formateador configurado, y es a propósito.** El código ya sigue el estilo por defecto de Prettier —dos espacios, comillas dobles, punto y coma—, pero Prettier no está instalado ni hay `.prettierrc`. Si corres `npx prettier --check src`, marcará archivos: son saltos de línea CRLF, que `core.autocrlf=true` normaliza a LF al commitear, y un párrafo partido a mano. Nada de eso llega al repositorio. **No hacer un pase de formato sobre el árbol completo**: genera ruido en archivos que nadie tocó y no arregla nada
- **`CLAUDE.md` y `AGENTS.md` los escribe `next dev`**, no una persona. Reaparecen solos cada vez que arranca el servidor de desarrollo, así que se commitean junto al trabajo en lugar de borrarlos una y otra vez. `CLAUDE.md` es una línea que incluye a `AGENTS.md`; el contenido real es el bloque `nextjs-agent-rules`, que apunta a la documentación de la versión de Next instalada en `node_modules`

## 12. Qué NO hacer

- No agregar sistema de comentarios en el blog en v1
- No agregar autenticación
- No incrustar videos pesados
- No usar Framer Motion salvo caso justificado
- No hacer scroll infinito
- No pop-ups de cookies (no hay tracking de terceros)
- No usar librerías de gráficos si un SVG estático alcanza
- Animación: transiciones de estado por debajo de 200 ms y nada que retrase la lectura. Si entra una microinteracción, se justifica antes; `prefers-reduced-motion` manda siempre

## 13. Protocolo para Claude Code

Al recibir cualquier tarea sobre este proyecto:

1. Lee este archivo completo y `HANDOFF.md` antes de escribir código
2. En una sola frase, di **qué vas a hacer** y **qué archivos vas a crear o modificar**
3. Si vas a instalar una dependencia nueva, justifícala en una línea
4. Después ejecuta
5. Si el cambio contradice una decisión documentada en `HANDOFF.md` §5, reescribe esa decisión en el mismo commit. No la ignores en silencio

Si algo de la tarea contradice este archivo, pregunta antes de improvisar.

## 14. Pendientes conocidos

Ver `HANDOFF.md` §3 para la cola completa y su orden. Resumen de lo abierto:

- **Demos en vivo** de ALDIMI, el recomendador SKI y FruitGuard. El campo `links.demo` existe en `projects.ts` y no lo usa ningún proyecto (§15)
- **Imágenes de proyecto**: ninguna todavía. Las tarjetas renderizan en modo tipográfico, que es un estado válido
- **Dominio propio**: `site.url` apunta al `.vercel.app` por ahora
- **Certificados de francés**: los exámenes están rendidos, los certificados no han llegado. Hasta entonces `about.ts` dice solo "Intermediate", sin nombrar examen
- **Repos fijados en GitHub**: el perfil tiene repos de curso sin descripción que son lo primero que se ve
- **2FA** en GitHub y Vercel

## 15. Criterios de evaluación externa (informe 2026)

`documentos/Diseño Portafolio Computer Science.md` es un informe de mercado sobre portafolios de estudiantes de CS. Se usa **como criterio de evaluación, no como dirección visual**: su recomendación estética final (dark bento, glass, acento cian) es literalmente la plantilla que §8 evita, y contradice su propio diagnóstico de que los evaluadores están saturados de sitios idénticos. Sus fuentes de UX son en buena parte blogs de SEO; sus criterios de contratación, en cambio, coinciden con lo que ya sostiene este sitio.

Lo que se adopta:

- **Contrato del *above the fold*.** Nombre, rol objetivo, tres o cuatro tecnologías núcleo y enlace al CV, visibles sin scroll en escritorio y en móvil. Es la ventana de 6–10 segundos de §1
- **CTA de CV persistente** en el header, no solo en el hero
- **Demos desplegadas** por encima de capturas. Para un perfil de Data/ML, que el evaluador toque el modelo vale más que cualquier imagen: Streamlit Community Cloud para ALDIMI y el recomendador, Hugging Face Spaces para FruitGuard. **Con una condición**: un tier gratuito que tarda un minuto en despertar juega en contra. Si la app duerme, el enlace lo dice ("cold start, ~30 s"); si no se puede garantizar que levante, no se enlaza
- **Origen de los datos, explícito** en cada ficha. Dos de los proyectos corren sobre datos sintéticos o simulados, y en ambos casos hay una razón buena —confidencialidad de pacientes en ALDIMI, validación contra el UNEP Food Waste Index en Smart Kitchen—. Declararlo es el argumento; esconderlo es lo que se lee como truco
- **Un diagrama de arquitectura** en los proyectos que tienen más de una pieza, al nivel de contexto o de contenedores del modelo C4: qué habla con qué y por qué protocolo. Career Assessment Platform (frontend + API Spring Boot + base relacional, en dos repositorios) es el caso más claro; ALDIMI, en segundo lugar. SVG estático, en la paleta del sitio, con hairlines: nunca cajas de colores importadas de una herramienta de diagramas. **No diagramar lo que no existe**
- **CI visible** en el repositorio: GitHub Actions con `lint`, `type-check` y `build`, y el badge en el README del repo. En el repo, no en el sitio (§8)
- **Higiene de repositorios**: README con descripción y comando de ejecución en cada repo enlazado, repos buenos fijados en el perfil, sin enlaces muertos. Es lo primero que ve quien sale del portafolio hacia GitHub
- **Tres a cinco proyectos**, con profundidad. Ya se cumple (§5)
- **CV apto para ATS**: una sola columna, texto seleccionable, fuentes estándar, sin iconos, sin tablas de maquetación, sin barras de competencia. `cv/gabriel-reyna-cv.tex` ya cumple: cualquier rediseño futuro que lo lleve a dos columnas rompe el parseo y queda prohibido
- **Dominio propio**, cuando se compre

Lo que se rechaza, y por qué (no reabrir sin motivo nuevo):

| Recomendación del informe | Decisión |
|---|---|
| Dirección "Technical Dark Bento", Slate-900 + cian | Rechazada. Es el aspecto por defecto de un portafolio generado; el concepto de cuaderno científico (§7) es la ventaja diferencial, no un capricho |
| Migrar a Astro | Rechazada. Ver §4 |
| Máximo dos familias tipográficas | Rechazada. Tres, y cada una tiene un trabajo (§7) |
| Mapa de calor de contribuciones de GitHub | Rechazado. Métrica de vanidad |
| Nav sticky con `backdrop-blur` | Rechazada. Contradice §7 |
| Skill bars | Rechazadas, y el informe también las rechaza |
| Showreel en autoplay | No aplica: el perfil que se vende aquí es Data/ML; los videojuegos viven en `/about` y en Camote Studio |

**La regla de evidencia se mantiene por encima de todo esto**: una tecnología solo entra en el stack del hero si enlaza a algo que la prueba (`src/data/stack.ts`). Es lo mejor que tiene el sitio y no se toca. Lo único que cambió es su posición (§5).

## 16. Checklist antes de distribuir el sitio

Se corre entero antes de mandar el enlace a alguien. Cada línea es verificable, no opinable.

**Escaneo**
- [ ] A 375px de ancho y sin hacer scroll se leen: nombre, rol, 3–4 tecnologías y el enlace al CV
- [ ] Ninguna tarjeta muestra métricas antes del título del proyecto
- [ ] El CV se descarga desde el header en cualquier página

**Evidencia**
- [ ] Los seis repositorios enlazados responden y son públicos
- [ ] Cada demo enlazada levanta; si duerme, el enlace lo advierte
- [ ] Cada tecnología del hero enlaza a evidencia real
- [ ] Cada ficha declara origen de datos, resultados con números y limitaciones

**Ingeniería**
- [ ] `npm run lint`, `npm run type-check` y `npm run build` pasan en limpio
- [ ] El workflow de GitHub Actions está verde y el badge aparece en el README
- [ ] `npm audit` sin vulnerabilidades altas

**Forma**
- [ ] Lighthouse: 95+ Performance, 100 Accesibilidad, en móvil y escritorio
- [ ] Contraste AA verificado para cualquier token nuevo, anotado en `globals.css`
- [ ] Nada del listado de §8 se coló en el sitio
- [ ] El CV es de una columna, con texto seleccionable
