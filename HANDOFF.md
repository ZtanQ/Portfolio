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

- **Home**: Hero (con stack agrupado y enlazado a evidencia) → Experience → Selected projects → Writing → Contact
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

### Alta prioridad — Repo faltante: SKI

Cuatro de cinco proyectos ya tienen código enlazado:

| Proyecto | Repos |
|---|---|
| ALDIMI Predict | `itosh10110/ALDIMI` |
| Smart Kitchen Intelligence | `jose-melgar/Smart-Kitchen-Intelligence` (entrenamiento y despliegue) + `ZtanQ/Smart_Kitchen` (análisis y dashboard) |
| FruitGuard | `Dreelliot/FruitGuard` |
| Career Assessment Platform | `DecideClaro/Vocatio-backend` + `DecideClaro/frontend-Vocation` |
| Motor de recomendación SKI | **falta** |

Falta solo el recomendador SKI, y es el que más duele: es donde el sitio afirma la ablación de PageRank con peso óptimo cero y el protocolo de canasta enmascarada. Quien quiera verificar ese resultado negativo —que es el argumento más fuerte de la ficha— no tiene dónde ir.

El campo es `links.repos` en `src/data/projects.ts`: una lista de `{ label, url }`, no una cadena. Cuando un proyecto vive en más de un repositorio, la etiqueta dice qué contiene cada uno, para que el lector sepa cuál abrir en vez de adivinar entre dos enlaces idénticos. Con un solo repo la etiqueta es `"Source on GitHub"`.

### Alta prioridad — Certificados

`src/data/education.ts` tiene una entrada "Platzi · Coursera" con nota "Course names pending". Sin nombres concretos se lee como relleno.

Están en `linkedin.com/in/gabriel-reyna-alvarado/details/certifications/`. Nombrar dos o tres reconocibles vale más que listar diez.

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

### Baja — Trabajo no representado

Hay dos repos que conectan temáticamente con el recomendador SKI y no están en el sitio:

- `Steam_recommendations-` — recomendador de videojuegos en Go
- `PicaTeclas` — recomendador web en Jupyter

Decidir si merecen entrar como proyectos. Nota: **Go no aparece en ninguna parte del sitio** pese a existir código en ese lenguaje.

### Baja — Imagen OG

`public/og.png` se generó con Lora sustituyendo a Fraunces, porque el entorno no tenía la fuente real. Es regenerable localmente con las fuentes correctas si se quiere fidelidad total. Funciona como está.

---

## 4. Reglas que no se negocian

Vienen de `instrucciones.md` y aplican a cualquier cambio:

- **Regla de evidencia**: una tecnología solo entra en el stack del hero si enlaza a algo que la prueba. `src/data/stack.ts`.
- **Dos colores, dos trabajos**: `--color-accent` (azul) solo para navegación y enlaces; `--color-signal` (ámbar) solo para dato. Nunca se cruzan.
- **Contraste verificado**: el ámbar claro `#8A6410` da 4.97:1. El ámbar más claro `#B4841E` da 3.10:1 y **solo puede usarse en numerales de 24px o más** (`--color-signal-lg`). No usarlo para texto pequeño.
- **Alternancia de densidad**: números y gráficos solo en el hero y en las páginas de proyecto. About, educación, experiencia y writing se quedan en registro editorial sin métricas.
- **Tono**: sin emojis en secciones formales, sin "passionate about", sin superlativos vacíos, sin cierres tipo "Let's connect". Números concretos siempre que existan. Limitaciones declaradas sin excusarse.
- **Accesibilidad**: en las tarjetas solo el título es enlace, y el área clickeable se extiende con `after:absolute after:inset-0`. No volver a envolver la tarjeta entera en un `<Link>`.
- **Sin dependencias nuevas** sin justificarlas antes.

---

## 5. Decisiones ya tomadas, no revisar sin motivo

- **UPC GameLab** es un taller, no un proyecto. Vive en Educación y se cuenta como el origen del equipo de Camote Studio.
- **Experience va antes que Projects** en el home, y **Cirion antes que Camote** por relevancia, no por fecha. Está documentado en `src/data/experience.ts`.
- **Contacto no tiene página propia**: es sección del home más enlace en el footer.
- **No hay sección de Skills**: el stack del hero cumple esa función con evidencia enlazada, que es mejor que una grilla de logos.
- **Space Drunks** se atribuye a Camote Studio; en itch está bajo la cuenta `Unlucky-Alpaca`.

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

- **Build verificado** — `npm run build` corre completo en local y en Vercel; las tres fuentes descargan.
- **Repositorio creado** — importado a `github.com/ZtanQ/Portfolio`. Había un `.git` accidental y vacío dentro de `src/app/` que habría convertido esa carpeta en un submódulo vacío; se eliminó antes del primer commit.
- **Rutas en español eliminadas** — `/proyectos`, `/blog`, `/contacto` y `content/blog/metrica-perfecta-mala-noticia.mdx`. Nada las enlazaba. Se conservan `src/lib/blog.ts` y `src/components/blog/`, que pese al nombre son los módulos que usa `/writing`.
- **`next-mdx-remote` 5.0.0 → 6.0.0** — cierra GHSA-g4xw-jxrg-5f6m (alta). La exposición real era nula porque el MDX sale del propio repo, pero Vercel lo marcaba en cada deploy. La v6 conserva el export `/rsc` y la firma de `MDXRemote`; no hubo cambios de código.
- **Bloqueante 1, dominio** — `site.url` apunta a `https://portfolio-ztanq.vercel.app`, sin barra final. Verificado en el build: sitemap, robots, `og:image` y JSON-LD salen con el host correcto.
- **Bloqueante 2, CV** — `public/cv/gabriel-reyna-cv.pdf` colocado y `cvAvailable` en `true`. Verificado que renderizan los dos enlaces: "Download CV" en el hero y "Download CV (PDF)" en Contact.
