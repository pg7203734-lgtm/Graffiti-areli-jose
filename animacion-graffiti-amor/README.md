Animación parallax "graffiti-amor" (rama: graffiti-amor)

He creado una demo interactiva y un script para generar un GIF parallax a partir de la demo.

Qué hay en la rama:
- animacion-graffiti-amor/index.html  — Demo parallax que usa la imagen original (referencia relativa a ../file_000...png)
- animacion-graffiti-amor/styles.css
- animacion-graffiti-amor/script.js
- animacion-graffiti-amor/generate_gif.sh  — script para generar frames y producir el GIF (usa puppeteer + ffmpeg)
- animacion-graffiti-amor/render.js  — helper Node para capturar frames con puppeteer

Instrucciones rápidas para generar el GIF (local):
1) Asegúrate de tener node (>=16), npm y ffmpeg instalados.
2) En la raíz del repo, ejecuta:
   cd animacion-graffiti-amor
   chmod +x generate_gif.sh
   ./generate_gif.sh
3) Al terminar tendrás graffiti-amor-parallax.gif en la carpeta animacion-graffiti-amor/

Notas:
- Esta primera versión usa la misma imagen para 3 capas (efecto parallax simulado). Si quieres capas "reales" recortadas (foreground/mid/background) puedo separarlas manualmente y reemplazar las capas por PNGs individuales para un parallax más convincente.
- Si quieres que yo genere el GIF por ti y lo suba directamente al repo, dímelo y lo intentaré (puede requerir ejecutar el pipeline de render en un runner o que me permitas cargar un artefacto ya creado).

Si quieres, ahora mismo puedo:
- Separar manualmente la imagen en 3 capas y actualizar la demo para obtener un parallax más natural.
- Ejecutar el script en un runner (si me das permiso para ejecutar tareas externas) y subir el GIF resultante a la rama.
