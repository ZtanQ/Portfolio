El CV vive aquí como `gabriel-reyna-cv.pdf` y el sitio lo enlaza desde
`/cv/gabriel-reyna-cv.pdf`.

Para actualizarlo basta reemplazar el archivo conservando el nombre: la ruta
está fijada en `cvPath`, dentro de `src/data/site.ts`.

La bandera `cvAvailable` del mismo archivo controla si los dos enlaces de
descarga (hero y Contact) se renderizan. Ponerla en `false` si alguna vez se
retira el PDF, para no dejar un 404 en el CTA principal.
