# HANDOFF — Estado del portafolio

Documento de traspaso. Léelo junto con `instrucciones.md`, que contiene el sistema de diseño y las reglas de tono. Este archivo dice **dónde está el proyecto ahora** y **qué falta, en orden**.

---

## 0. Lo primero: verificar que compila

El proyecto nunca se ha construido en un entorno con acceso a internet. Todo el desarrollo se hizo en un sandbox sin acceso a `fonts.googleapis.com`, así que `next/font` nunca pudo descargar Fraunces, Newsreader ni JetBrains Mono.

`tsc --noEmit` y `eslint` pasan limpios, pero **`npm run build` no se ha ejecutado nunca de principio a fin**.

Antes de tocar nada:

```bash
npm install
npm run build
```

Si falla, arregla eso antes que cualquier otra cosa de la lista. No es un fallo esperado, pero es lo único sin verificar.

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

---

## 3. Cola de trabajo, en orden

### Bloqueante 1 — Dominio

`src/data/site.ts` tiene `url: "https://gabrielreyna.dev"` como valor provisional. De ahí dependen el sitemap, robots, las URLs canónicas y la ruta absoluta de la imagen OG.

Hay que reemplazarlo por el dominio real antes del primer deploy.

### Bloqueante 2 — CV

El PDF no existe. En `src/data/site.ts` hay una bandera `cvAvailable: false` que oculta los dos enlaces de descarga (hero y Contact) para no dejar un 404 en el CTA principal.

1. Colocar el PDF en `public/cv/gabriel-reyna-cv.pdf`
2. Cambiar `cvAvailable` a `true`
3. Verificar que aparezcan los dos enlaces

### Alta prioridad — Repos faltantes

Solo dos de cinco proyectos tienen código enlazado:

| Proyecto | Repo |
|---|---|
| Smart Kitchen Intelligence | `github.com/ZtanQ/Smart_Kitchen` |
| FruitGuard | `github.com/Dreelliot/FruitGuard` |
| ALDIMI Predict | **falta** |
| Motor de recomendación SKI | **falta** |
| Career Assessment Platform | **falta** |

Los tres que faltan son justamente donde el sitio afirma más rigor metodológico: SHAP, detección de fuga de datos, ablación de PageRank. Alguien que lea eso y quiera verificarlo no tiene dónde ir.

Si están en repos privados o bajo la cuenta de un compañero, decidir qué hacer. El campo es `links.repo` en `src/data/projects.ts`.

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

GitHub → Vercel, deploy automático desde `main`. Activar 2FA en ambas plataformas antes de conectar; era requisito del brief original.
