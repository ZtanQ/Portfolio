# HANDOFF — Estado del portafolio

Documento de traspaso. Léelo junto con `instrucciones.md`, que contiene el sistema de diseño y las reglas de tono. Este archivo dice **dónde está el proyecto ahora** y **qué falta, en orden**.

---

## 0. Estado de verificación

**Resuelto.** `npm run build` ya corre de principio a fin, en local y en Vercel. `next/font` descarga Fraunces, Newsreader y JetBrains Mono sin problema; la duda que había sobre el sandbox sin internet quedó descartada. `tsc --noEmit` y `eslint` pasan limpios y `npm audit` reporta 0 vulnerabilidades.

Una trampa conocida: si borras rutas y el build falla con `TS2307` sobre módulos que ya no existen, es caché viejo de `next dev` en `.next/dev/types/`. Borra `.next` y reconstruye.

---

## 1. Qué es este proyecto

Portafolio personal de Gabriel Reyna, estudiante de Ciencias de la Computación en UPC (noveno ciclo), Lima. Perfil orientado a Data y Machine Learning, con desarrollo de videojuegos como segunda línea.

Doble objetivo: prácticas o trainee en Perú, y roles Data/ML en el mercado internacional. Por eso el sitio está **íntegramente en inglés**.

Stack: Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4. Sin base de datos, sin backend, sin librerías de componentes ni de animación. Los datos viven en `src/data/*.ts` y los posts en `content/blog/*.mdx`.

---

## 2. Estado actual

Completo y funcionando:

- **Home**: Hero comprimido (nombre, rol, cuatro tecnologías núcleo, CTA) → índice de secciones → Selected projects → Experience → Stack con evidencia → Writing → Contact
- **`/projects`** con filtro por tag y estado en URL, y **`/projects/[slug]`** para cada uno
- **`/writing`** y **`/writing/[slug]`** renderizando MDX
- **`/about`** con foto, bio, áreas de trabajo, educación, idiomas y juegos publicados
- Modo claro/oscuro, sitemap, robots, JSON-LD de Person, imagen OG, skip link

Cinco proyectos: ALDIMI Predict, Smart Kitchen Intelligence, el recomendador SKI, FruitGuard y Career Assessment Platform.

En línea:

- Repositorio: `github.com/ZtanQ/Portfolio`, rama `main`
- Desplegado en `https://portfolio-ztanq.vercel.app`, automático desde `main`

Las rutas en español que quedaron de la migración (`/proyectos`, `/blog`, `/contacto`) y el post duplicado en español fueron eliminadas. El sitio sirve solo la versión en inglés.

---

## 3. Cola de trabajo, en orden

**Los dos bloqueantes de deploy están resueltos.** El dominio está configurado y el CV está en su sitio; lo que sigue son mejoras de contenido, no obstáculos.

La cola se reordenó tras cruzar la auditoría de escaneo con el informe de mercado 2026 (`documentos/Diseño Portafolio Computer Science.md`, filtrado en `instrucciones.md` §15).

### Alta — Demos en vivo

Es el hueco más grande que queda, y el único que no puedo cerrar yo. Para un perfil de Data/ML, que el evaluador toque el modelo vale más que cualquier captura.

- ALDIMI Predict y el recomendador SKI → Streamlit Community Cloud
- FruitGuard → Hugging Face Spaces

El campo `links.demo` ya existe en `projects.ts` y no lo usa ningún proyecto: una vez desplegado, es rellenar el campo. **Condición**: si la app duerme, el enlace lo advierte ("cold start, ~30 s"); si no se puede garantizar que levante, no se enlaza. Un enlace que tarda un minuto en responder juega en contra.

### Baja — Certificados de francés

Los exámenes CAF y DELF están rendidos, pero los certificados todavía no llegan. Hasta entonces `about.ts` declara solo "Intermediate", sin nombrar examen: afirmar una credencial que no se puede mostrar rompe la regla de evidencia.

Cuando lleguen, nombrar examen y resultado en `about.ts` junto al nivel, con el mismo formato que el inglés (`B2 — Cambridge First, 2025`), y reflejarlo en el CV.

### Media — Imágenes de proyecto

Ninguna todavía. Todas las tarjetas renderizan en modo tipográfico, con las métricas grandes en mono, que es un estado válido y deliberado.

Existe material: capturas de dashboards de Tableau y Streamlit, gráficos SHAP y matriz de confusión. Para agregar una imagen basta rellenar el campo `image` de un proyecto:

```ts
image: {
  src: "/projects/aldimi-dashboard.png",
  alt: "ALDIMI Predict dashboard showing clinical risk distribution",
},
```

La tarjeta cambia sola de modo. Ver `public/projects/README.md`. Criterio: no agregar una captura débil solo por llenar el hueco.

### Media — Repos fijados en GitHub

El perfil `ZtanQ` tiene 11 repos públicos, varios de curso sin descripción (`expo`, `fundamentosjuegos20241`, `Teor-a-de-los-Juegos-pt3`). Son lo primero que ve quien llega desde el portafolio.

Fijar los buenos con *pinned repositories*: `Smart_Kitchen`, `Steam_recommendations-`, `PicaTeclas`.

### Baja — Imagen OG

`public/og.png` se generó con Lora sustituyendo a Fraunces, porque el entorno no tenía la fuente real. Es regenerable localmente con las fuentes correctas si se quiere fidelidad total. Funciona como está.

---

## 4. Reglas que no se negocian

Vienen de `instrucciones.md` y aplican a cualquier cambio:

- **Regla de evidencia**: una tecnología solo entra en la lista de stack si enlaza a algo que la prueba. `src/data/stack.ts`. Las cuatro del hero salen del mismo archivo, marcadas con `core`: no hay forma de poner una arriba sin su evidencia.
- **Dos colores, dos trabajos**: `--color-accent` (azul) solo para navegación y enlaces; `--color-signal` (ámbar) solo para dato. Nunca se cruzan.
- **Contraste verificado**: el ámbar claro `#8A6410` da 4.97:1. El ámbar más claro `#B4841E` da 3.10:1 y **solo puede usarse en numerales de 24px o más** (`--color-signal-lg`). No usarlo para texto pequeño.
- **Alternancia de densidad**: números y gráficos solo en las tarjetas de proyecto y en las páginas de proyecto. About, educación, experiencia y writing se quedan en registro editorial sin métricas.
- **Tono**: sin emojis en secciones formales, sin "passionate about", sin superlativos vacíos, sin cierres tipo "Let's connect". Números concretos siempre que existan. Limitaciones declaradas sin excusarse.
- **Accesibilidad**: en las tarjetas solo el título es enlace, y el área clickeable se extiende con `after:absolute after:inset-0`. No volver a envolver la tarjeta entera en un `<Link>`.
- **Sin dependencias nuevas** sin justificarlas antes.

---

## 5. Decisiones ya tomadas, no revisar sin motivo

- **UPC GameLab** es un taller, no un proyecto. Vive en Educación y se cuenta como el origen del equipo de Camote Studio.
- **Projects va antes que Experience** en el home. Esta decisión reemplaza a la anterior, que ponía Experience primero porque un reclutador valida experiencia. Sigue siendo cierto frente a Writing, pero no frente a los proyectos: la práctica en Cirion duró tres meses y los proyectos son el cuerpo de trabajo. El criterio que manda es el de `instrucciones.md` §1, interés antes que verificación. **Cirion antes que Camote** dentro de Experience no cambia: es por relevancia, no por fecha, y está documentado en `src/data/experience.ts`.
- **El stack con evidencia cierra la página, no la abre.** Los catorce enlaces vivían en el hero y empujaban los CTA casi dos pantallas hacia abajo en móvil. La regla de evidencia no cambió; cambió su posición. En el hero quedan cuatro tecnologías, derivadas del mismo archivo con la marca `core` para que ninguna pueda aparecer arriba sin su prueba.
- **`Steam_recommendations-` y `PicaTeclas` se quedan fuera.** Son dos recomendadores de curso que conectan temáticamente con SKI, y entrarían como sexto y séptimo proyecto. La regla de profundidad sobre cantidad —tres a cinco, `instrucciones.md` §5— dice que diluyen. Efecto colateral asumido: **Go no aparece en ninguna parte del sitio** pese a existir código en ese lenguaje.
- **Contacto no tiene página propia**: es sección del home más enlace en el footer.
- **No hay sección de Skills**: la sección Stack con evidencia cumple esa función, y una lista donde cada ítem enlaza a su prueba es mejor que una grilla de logos o una barra de porcentaje.
- **Space Drunks** se atribuye a Camote Studio; en itch está bajo la cuenta `Unlucky-Alpaca`.
- **"LinkedIn Certifications" se queda en el CV.** Se señaló dos veces como línea que no nombra ninguna certificación concreta, y la decisión fue mantenerla: funciona como enlace a la lista completa, junto a los tres certificados con nombre. No volver a quitarla.
- **Power BI se queda como está.** Aparece en el stack del hero (`stack.ts`) y en el de Cirion (`experience.ts`), pero no en el CV, cuya descripción de Cirion menciona Matplotlib y Seaborn. La discrepancia es conocida y se decidió no tocarla. No reabrir sin motivo nuevo.
- **La fuente del CV es `cv/gabriel-reyna-cv.tex`.** Si se compila en Overleaf, hay que reemplazar el contenido del proyecto por ese archivo antes de compilar: una copia paralela en Overleaf ya derivó dos veces. Si el PDF y el `.tex` discrepan, el PDF está mal.

---

## 6. Deploy

GitHub → Vercel, deploy automático desde `main`. Ya está conectado y desplegando.

- Repositorio: `github.com/ZtanQ/Portfolio`
- Producción: `https://portfolio-ztanq.vercel.app`
- `site.url` en `src/data/site.ts` es la única fuente del dominio: de ahí salen `metadataBase`, `openGraph.url`, el sitemap, robots y el JSON-LD de Person

Si más adelante se conecta un dominio propio: cambiar esa línea, marcar el nuevo como *Primary* en Vercel y dejar el `.vercel.app` redirigiendo. Vercel responde en ambos, y las canónicas deben apuntar a uno solo.

Pendiente: **activar 2FA en GitHub y Vercel**, requisito del brief original.

---

## 7. Registro de lo resuelto

Por orden de cierre, para no volver a abrirlo sin motivo:

- **Contrato al día** — `instrucciones.md` decía que el contenido del sitio va en español y enumeraba `/proyectos`, `/blog` y `/contacto`, rutas eliminadas hace commits. Reescrito: secciones 1-14 conservan su numeración (HANDOFF las cita), §15 recoge los criterios del informe 2026 con lo adoptado y lo rechazado, §16 es el checklist de lanzamiento. Existía además una copia idéntica del archivo fuera del repositorio, en `Portafolio/`; se eliminó antes de que derivara como derivó el CV en Overleaf.
- **Home reordenado** — hero comprimido con las cuatro tecnologías núcleo y los CTA en una pantalla, índice de secciones navegable, proyectos antes que experiencia y el stack como cierre. `hero.tsx` adelgazado, `stack-section.tsx` nuevo, `page.tsx` reordenado con anclas.
- **Tarjeta de proyecto en móvil** — las métricas ya no aparecen encima del título. Utilidades `order` en `project-card.tsx`: título primero en una columna, columna izquierda restaurada en `md`.
- **CV en el header** — enlace persistente en todas las páginas, no solo en el hero. La lista de navegación pasa a `flex-wrap` para no desbordar a 375px.
- **CI en GitHub Actions** — `.github/workflows/ci.yml` corre `lint`, `type-check` y `build` en cada push y PR, con badge en el README. El badge va al repositorio, no al sitio.
- **Origen de los datos, declarado de frente** — campo `dataOrigin` en `Project` y sección «Where the data comes from» en la ficha, entre Contexto y Decisiones. Los cinco proyectos lo tienen, incluido Career Assessment, que no usa datos y lo dice. Las tres líneas que ya decían lo mismo desde «decisiones» se eliminaron: ALDIMI sintético, la validación de Smart Kitchen contra el UNEP y los nombres de carpeta corruptos de FruitGuard. Se dice una vez y en el sitio donde se busca.
- **Columna de margen en la ficha de proyecto** — el meta dejó de ser una banda horizontal bajo el título y pasó a la derecha, como las anotaciones al costado de un cuaderno: código, año, rol, stack y categorías. Los enlaces al repositorio subieron con él: estaban al final de tres pantallas de prosa, que es donde nadie busca lo que más quiere ver. El aside va después del resumen en el DOM, así que el orden de lectura no depende del CSS.
- **Diagramas de arquitectura** — dos, en `src/components/project/architecture/`. Career Assessment: SPA en Angular con interceptor que adjunta el JWT, API Spring Boot en 8080 con `JwtAuthenticationFilter`, PostgreSQL 16; el `docker-compose.yml` levanta solo la base, no la API, y eso se dice. ALDIMI: la separación entre entrenamiento y servicio, que es lo que la prosa no muestra —los notebooks ajustan y serializan cuatro estimadores, el dashboard solo los carga, SQLite detrás—. Ambos leídos de los repositorios con `WebFetch`, no de memoria: los ficheros, los puertos y las versiones se verificaron antes de dibujarlos. SVG a mano, hairlines, `currentColor` para que sirvan en los dos temas.
- **`stack` de Career Assessment corregido** — decía `SQL` y el repositorio dice `org.postgresql.Driver` y `postgres:16`. Ahora dice PostgreSQL.

- **Build verificado** — `npm run build` corre completo en local y en Vercel; las tres fuentes descargan.
- **Repositorio creado** — importado a `github.com/ZtanQ/Portfolio`. Había un `.git` accidental y vacío dentro de `src/app/` que habría convertido esa carpeta en un submódulo vacío; se eliminó antes del primer commit.
- **Rutas en español eliminadas** — `/proyectos`, `/blog`, `/contacto` y `content/blog/metrica-perfecta-mala-noticia.mdx`. Nada las enlazaba. Se conservan `src/lib/blog.ts` y `src/components/blog/`, que pese al nombre son los módulos que usa `/writing`.
- **`next-mdx-remote` 5.0.0 → 6.0.0** — cierra GHSA-g4xw-jxrg-5f6m (alta). La exposición real era nula porque el MDX sale del propio repo, pero Vercel lo marcaba en cada deploy. La v6 conserva el export `/rsc` y la firma de `MDXRemote`; no hubo cambios de código.
- **Bloqueante 1, dominio** — `site.url` apunta a `https://portfolio-ztanq.vercel.app`, sin barra final. Verificado en el build: sitemap, robots, `og:image` y JSON-LD salen con el host correcto.
- **Bloqueante 2, CV** — `public/cv/gabriel-reyna-cv.pdf` colocado y `cvAvailable` en `true`. Verificado que renderizan los dos enlaces: "Download CV" en el hero y "Download CV (PDF)" en Contact.
- **Repos enlazados, los cinco proyectos** — ya no hay fichas sin código verificable:

  | Proyecto | Repo |
  |---|---|
  | ALDIMI Predict | `itosh10110/ALDIMI` |
  | Smart Kitchen Intelligence | `ZtanQ/Smart_Kitchen` — análisis y dashboard |
  | Motor de recomendación SKI | `jose-melgar/Smart-Kitchen-Intelligence` — entrenamiento y despliegue |
  | FruitGuard | `Dreelliot/FruitGuard` |
  | Career Assessment Platform | `DecideClaro/Vocatio-backend` + `DecideClaro/frontend-Vocation` |

  Smart Kitchen y SKI son el mismo cuerpo de trabajo repartido en dos repositorios: el análisis con el dashboard por un lado, el entrenamiento con el despliegue por el otro. Cada ficha enlaza el suyo, no los dos.

  El campo dejó de ser `links.repo` (cadena) y pasó a ser `links.repos`, una lista de `{ label, url }`, porque Career Assessment vive en dos repositorios y un solo campo obligaba a esconder uno. Con un repo la etiqueta es `"Source on GitHub"`; con varios, la etiqueta dice qué contiene cada uno.

  Los seis repositorios se comprobaron públicos y alcanzables con `git ls-remote` antes de enlazarlos.
- **README puesto al día** — describía `proyectos/`, `blog/` y `contacto/`, eliminadas en la migración, y pedía resolver placeholders ya resueltos. Ahora documenta la estructura real, incluida `cv/`, y enlaza producción.
- **Nivel de francés** — `about.ts` lo tenía vacío y renderizaba el idioma sin nivel. Ahora dice "Intermediate", igual que el CV.
- **Certificados nombrados** — `education.ts` ya no dice "Course names pending". Declara tres con nombre, emisor y año: Scrum Fundamentals Certified (SCRUMstudy, 2023), Introduction to MongoDB (2023) y Pixel Art for Video Games (Michigan State via Coursera, 2024). Los originales están en `certificados/`, en la raíz y fuera de git a propósito: son documentos personales y el Statement of Results de Cambridge incluye número de verificación.

  La ruta de MongoDB emitió además un certificado por módulo. Se nombra solo "Introduction to MongoDB": listar los doce alargaría la sección sin aportar evidencia.
- **Corrección: el curso de Computer Vision no era un programa de Pittsburgh** — el sitio decía "University of Pittsburgh, 2025" y el CV "Remote, 2022 – 2025". El certificado dice otra cosa: curso *Computer Vision — Artificial Intelligence* del **Winter School 2025 de la UPC**, dictado por Nils Murrugarra-Llerena, profesor asociado de Pittsburgh, **del 21 al 25 de julio de 2025**. Cinco días, no tres años, y organizado por la UPC. Corregido en `education.ts`, en la ficha de FruitGuard del CV y en la entrada de Educación del CV.
