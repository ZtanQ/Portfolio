# CV — fuente LaTeX

`gabriel-reyna-cv.tex` es la fuente del PDF que el sitio sirve en
`/cv/gabriel-reyna-cv.pdf`. El PDF compilado **no** vive aquí: vive en
`public/cv/`, que es lo que Next sirve.

## Compilar

Sin instalar nada: subir el `.tex` a [Overleaf](https://overleaf.com), que ya
trae todos los paquetes, y descargar el PDF.

En local, con MiKTeX o TeX Live:

```bash
pdflatex gabriel-reyna-cv.tex
pdflatex gabriel-reyna-cv.tex   # segunda pasada, por hyperref
```

Dos pasadas porque `hyperref` necesita la primera para resolver referencias.

## Publicar el resultado

```bash
cp gabriel-reyna-cv.pdf ../public/cv/gabriel-reyna-cv.pdf
```

**El nombre importa.** La ruta está fijada en `cvPath`, dentro de
`src/data/site.ts`. Si el PDF llega con otro nombre —`Gabriel_CV.pdf`, por
ejemplo— los dos enlaces de descarga del sitio devuelven 404 sin avisar. La
bandera `cvAvailable` del mismo archivo controla si esos enlaces se renderizan.

## Paquetes

Solo distribución base: `geometry`, `titlesec`, `enumitem`, `xcolor`,
`hyperref`, `microtype`, `charter`. Nada que haya que instalar aparte, y nada
que exija XeLaTeX o LuaLaTeX.

## Una sola fuente

El `.tex` vive **aquí**, no en `public/cv/`. Todo lo que está en `public/` se
sirve por web: dejar la fuente ahí la publica en
`portfolio-ztanq.vercel.app/cv/gabriel-reyna-cv.tex`, y además invita a que
aparezcan dos copias divergentes del mismo documento. En `public/cv/` va solo
el PDF.

## Dos detalles tipográficos resueltos

**Los enlaces de cabecera muestran el dominio.** Un CV se imprime; si la
cabecera dice solo "Portfolio", en papel no lleva a ninguna parte. El comando
`\urlref{url}{texto visible}` deja el dominio a la vista y clicable a la vez.

**`C++` usa el comando `\cpp`.** Charter separa los dos signos y sale como
"C+ +". El comando aplica kerning manual; si al compilar quedara demasiado
apretado o suelto, se ajustan los dos valores de su definición.

## Al editarlo

El CV y el sitio son el mismo argumento en dos formatos, y un reclutador suele
tener los dos abiertos. Cuando cambie un dato aquí, revisar su equivalente en
`src/data/`:

| Dato | Archivo del sitio |
|---|---|
| Idiomas, áreas de trabajo | `about.ts` |
| Cirion, Camote Studio | `experience.ts` |
| UPC, Pittsburgh, GameLab, certificados | `education.ts` |
| Métricas de proyecto | `projects.ts` |
| Tecnologías del hero | `stack.ts` |

Las reglas de tono están en `instrucciones.md` §6: números concretos siempre que
existan, sin superlativos vacíos, limitaciones declaradas sin excusarse.

## Compilar desde este archivo, no desde otra copia

Si editas en Overleaf, **reemplaza el contenido del proyecto por este archivo**
antes de compilar. Un proyecto de Overleaf con su propia copia deriva: ya pasó
dos veces, y la segunda dejó en el PDF una línea suelta —`| LinkedIn
Certifications`— que esta fuente no tiene.

Regla simple: este `.tex` manda. Si el PDF y este archivo discrepan, el PDF
está mal.

## Pendientes

Ninguno abierto en el CV. Power BI queda como está por decisión tomada: ver
`HANDOFF.md` §5.

Los certificados originales están en `certificados/`, en la raíz del proyecto.
Esa carpeta está en `.gitignore` a propósito: es material de consulta, no se
publica.
