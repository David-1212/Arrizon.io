# Raicilla Hnos. Arrizón — Sitio web

Página informativa de un solo archivo (`index.html`) con estilos (`css/styles.css`) e
interacciones (`js/main.js`). Diseño artesanal-premium, claro, con animaciones y
optimización SEO (meta tags, datos estructurados, sitemap y robots).

## Cómo ver el sitio

Abre `index.html` en tu navegador. Se recomienda un servidor local (para que todo
cargue bien): si tienes Python o Node, desde esta carpeta corre:

```
# Python
python -m http.server 8080

# Node
npx serve .
```

y abre `http://localhost:8080`.

## IMPORTANTE: datos que debes reemplazar

Todo está centralizado en **`js/main.js`**, arriba, en el objeto `CONTACT`:

| Dato | Valor actual | Qué hacer |
|---|---|---|
| WhatsApp | `523881058508` (+52 388 105 8508) | Verificar número |
| Teléfono | +52 388 105 5998 | Verificar |
| Correo | `raicillahnosarrizon@gmail.com` | Reemplazar por el correo real |
| Instagram | `https://www.instagram.com/hnos.arrizon` | Reemplazar por el handle real |
| TikTok | `https://www.tiktok.com/@hnos.arrizon` | Reemplazar por el handle real |
| Facebook | `https://www.facebook.com/Hnos.Arrizon` | Ya es el oficial |

La **frase principal** está en el hero: *"Sabor y tradición es Raicilla Hnos. Arrizón"*
(es el lema real de la marca). Cámbiala en `index.html` (sección `hero__title`).

La **medalla del mapa** está como iframe de Google Maps en la sección "Visita".
Para afinar la ubicación exacta de la Taberna La Vieja, busca el punto en Google Maps,
elige "Compartir → Insertar un mapa" y copia el iframe en `index.html` (sección `visita__map`).

## Notas sobre las medallas

No encontré medallas de concurso específicas de la marca, así que en la sección
"Reconocimientos" se incluyen logros verificados:
- Primer registro de marca de raicilla en la zona de Mascota.
- Sandra Arrizón, Embajadora de la Raicilla 2019 (XII Festival de la Raicilla).
- Denominación de Origen de la Raicilla (2019).
- Participación en IX Expo Tequila Tlaquepaque y XII Festival de la Raicilla.

Si la familia tiene medallas reales (oro/plata en concursos), edita la sección
`medals__row` en `index.html` para agregarlas.

## Carrusel de la historia

La sección "Historia" (`#historia`, en `index.html`) es un carrusel **estilo
Netflix**: una fila de tarjetas del mismo tamaño que se desliza horizontalmente
con scroll nativo (arrastra con el dedo o el mouse, con efecto de encaje por
tarjeta) y un adelanto de la siguiente. Avance automático cada ~4.5 segundos;
las flechas ‹ › avanzan de 1 en 1. Al llegar al final, vuelve al inicio.
Se pausa al pasar el mouse o al tocar la fila.

Cada tarjeta (`article.hcard`) muestra una foto, el año y un texto:

```html
<article class="hcard">
  <div class="hcard__media">
    <img src="images/mi-foto.jpg" alt="Describe la foto" loading="lazy">
    <span class="hcard__year">1932</span>
  </div>
  <div class="hcard__body">
    <h3>Título del capítulo</h3>
    <p>Texto…</p>
  </div>
</article>
```

Coloca la foto en `images/` y cambia `src`, `alt` y `hcard__year`. No importa
cuántas tarjetas haya: el bucle infinito funciona con cualquiera. Las fotos de
ejemplo usan imágenes ya existentes: `botella_cristalino.jpg`, `agave1.jpg`,
`fondo.jpeg`, `maestros.jpg`, `botella 2.jpg`, `logo.png`, `agave 4.jpg` y
`producto-2.jpg`.

Para cambiar la velocidad del autoplay, busca `AUTOPLAY_MS` (milisegundos) en el
bloque "CARRUSEL HISTORIA" de `js/main.js`. Pon `0` para desactivarlo.

## Ponches de frutas (fotos pendientes)

La sección de productos ya muestra 8 ponches. Cada uno necesita su foto en
`images/` con estos nombres exactos (mientras no existan, se usa `producto-4.jpg`
como respaldo):

```
images/ponche-jamaica.jpg    images/ponche-guayaba.jpg
images/ponche-mango.jpg      images/ponche-tamarindo.jpg
images/ponche-maracuya.jpg   images/ponche-limon.jpg
images/ponche-capulin.jpg    images/ponche-cafe.jpg
```

Cada miniatura es clicable y abre WhatsApp con el nombre del ponche. Para cambiar
sabores, edita las tarjetas `.punch` dentro de `#productos` en `index.html`.

## Estructura

```
index.html       → contenido, todas las secciones y SEO head
css/styles.css   → diseño y animaciones
js/main.js       → age gate, scroll, WhatsApp, formulario
images/          → fotos de la marca y fondos
robots.txt       → instrucciones para buscadores
sitemap.xml      → mapa del sitio para Google (con imágenes)
```

## Extras ya incluidos

- Aviso de mayoría de edad (18+), con recordatorio por `localStorage`.
- Botones de pedido por WhatsApp con mensaje prellenado (producto + visita).
- Formulario de contacto que envía el mensaje directo a WhatsApp (sin servidor).
- Cronología animada, contadores, parallax, reveal on scroll, modal de catálogo
  ("Ver todos"), botón flotante de WhatsApp y menú móvil.

## SEO (lista de pendientes antes de publicar)

El sitio ya trae: `<title>`, `meta description`, `robots`, canonical, Open Graph,
Twitter Card, meta `geo`, `preload` del hero, datos estructurados `LocalBusiness`,
`ItemList` (productos) y `FAQPage`, además de `robots.txt` y `sitemap.xml`.

Antes de subirlo a producción:

1. **Reemplaza `https://TU-DOMINIO.com`** por el dominio real en `index.html`
   (canonical, `og:url`, `og:image`, JSON-LD) y en `robots.txt`/`sitemap.xml`.
2. **Comprime `images/fondo.jpeg`** (pesa ~2.6 MB). Es la imagen LCP del hero;
   idealmente debe pesar < 300 KB (puedes usar Squoosh, TinyPNG o `ffmpeg`).
3. **Agrega la foto de Sandra** como `images/sandra.jpg` (la referencia ya existe
   en la sección "Maestros" y hoy queda rota).
4. Registra el sitio en **Google Search Console** y **Bing Webmaster Tools**,
   y envía `sitemap.xml`.
5. Conecta **Google Analytics 4** (o Plausible/GA4 alternativo) antes del lanzamiento.
6. Revisa los `alt` de las imágenes y añade los que falten si cambias fotos.
7. Verifica el handle real de **Instagram/TikTok** en `js/main.js` (`CONTACT`)
   y el **correo real** (hoy el formulario usa el correo Gmail como placeholder).
8. El horario de la Taberna está en el JSON-LD (10:00–18:00, 7 días). Ajústalo
   en `index.html` si es diferente.
