# Taller: Publicación y despliegue de una aplicación React + Supabase

## 1. Introducción

Publicar una aplicación web implica comprender el recorrido que sigue una solicitud desde el navegador hasta el servidor, cómo se resuelve un dominio mediante DNS, cómo funciona HTTPS y qué servicios intervienen en el alojamiento y despliegue.

## 2. Flujo de una solicitud web

1. El usuario escribe una URL en el navegador.
2. El navegador consulta DNS para obtener la dirección IP del dominio.
3. Se establece una conexión HTTPS con el servidor/CDN.
4. El servidor entrega los archivos de la aplicación.
5. En una SPA de React, el navegador ejecuta JavaScript y realiza las peticiones necesarias a la API o a Supabase.

## 3. URL, dominio y subdominio

Una URL puede contener protocolo, dominio, puerto, ruta, parámetros y fragmento. El dominio identifica el sitio y un subdominio permite separar servicios, por ejemplo `app.ejemplo.com`.

## 4. DNS

DNS traduce nombres de dominio a información que permite localizar servicios. Algunos registros habituales son:

- **A:** dominio hacia una dirección IPv4.
- **AAAA:** dominio hacia una dirección IPv6.
- **CNAME:** alias de un nombre hacia otro nombre.
- **MX:** servidores encargados del correo.
- **TXT:** información textual usada, entre otras cosas, para verificaciones.
- **NS:** servidores autoritativos del dominio.

El TTL indica durante cuánto tiempo puede mantenerse una respuesta en caché. Después de modificar DNS, la propagación depende de las cachés y del TTL.

### Comandos DNS solicitados

Los comandos del taller son:

```bash
nslookup github.io
dig github.com A
dig github.com MX
dig +trace anthropic.com
```

En el entorno donde se preparó este documento, `nslookup` y `dig` no están instalados, por lo que no se deben inventar resultados. Al realizar la actividad localmente, se deben ejecutar los cuatro comandos y anexar sus salidas o capturas reales.

## 5. Dominio, DNS y hosting

- El **registrador** permite registrar y administrar el dominio.
- El **DNS** resuelve los nombres y dirige el tráfico hacia los servicios correspondientes.
- El **hosting** almacena y sirve la aplicación.
- Los **nameservers (NS)** indican qué servidores DNS son autoritativos para el dominio.

El precio depende del TLD y del registrador. Como referencia, Namecheap publica precios distintos para `.com` y `.co`, mientras Cloudflare Registrar indica que cobra los dominios a precio de costo, sin margen del registrador.

## 6. HTTPS y TLS

HTTPS protege la comunicación mediante TLS. Un certificado permite verificar la identidad del sitio y establecer una conexión cifrada. Las autoridades certificadoras pueden emitir certificados con distintos niveles de validación, como DV, OV y EV. También existen certificados wildcard para cubrir subdominios.

HSTS permite indicar al navegador que debe utilizar HTTPS. Una buena configuración de producción debe mantener HTTPS activo y evitar contenido mixto.

## 7. Modelos de hosting

- **Hosting estático:** adecuado para HTML, CSS, JavaScript y aplicaciones SPA ya compiladas.
- **Servidor tradicional/VM:** permite ejecutar procesos y configuraciones propias.
- **Contenedores:** empaquetan la aplicación y sus dependencias.
- **Serverless:** ejecuta funciones bajo demanda sin administrar directamente un servidor permanente.
- **CDN:** distribuye archivos estáticos desde ubicaciones cercanas a los usuarios.

## 8. Comparación de plataformas

| Plataforma | Uso principal | Característica destacada |
|---|---|---|
| GitHub Pages | Sitios estáticos y documentación | Integración directa con repositorios GitHub |
| Vercel | Frontend y aplicaciones web | Despliegues automáticos y funciones |
| Netlify | Sitios estáticos/Jamstack | Deploy previews y funciones |
| Cloudflare Pages | Frontend estático | Integración con la red global de Cloudflare |
| Render | Web apps y servicios | Static sites y servicios backend |

## 9. Supabase

Supabase ofrece servicios backend como PostgreSQL, autenticación, almacenamiento y APIs. Para una aplicación React, las variables públicas necesarias para el cliente pueden incluir la URL del proyecto y la clave pública `anon`.

La clave `service_role` es secreta y no debe exponerse en el frontend. Las políticas **RLS (Row Level Security)** deben utilizarse para controlar qué filas puede consultar o modificar cada usuario.

También deben configurarse correctamente las URLs de autenticación y redirección para el entorno de producción.

## 10. Variables de entorno

Las credenciales y configuraciones deben mantenerse fuera del código fuente cuando corresponda. En Vite, las variables que deben llegar al frontend suelen utilizar el prefijo `VITE_`; esto **no convierte un secreto en secreto**, porque las variables expuestas al cliente pueden terminar dentro del bundle.

Nunca se debe colocar `service_role` ni otras credenciales privadas en variables que se envían al navegador. Si una credencial privada se expone, debe revocarse o rotarse.

## 11. Build y CI/CD

Antes de publicar una aplicación React normalmente se ejecuta:

```bash
npm install
npm run build
```

El resultado de Vite suele quedar en `dist/`. Un flujo CI/CD puede ejecutar pruebas, construir el proyecto y publicar automáticamente cada vez que se hace push a la rama principal.

# Parte 2: Tutorial práctico — GitHub Pages

## 12. Repositorio

Repositorio utilizado:

`juanusuga033/workspace`

URL esperada para GitHub Pages:

`https://juanusuga033.github.io/workspace/`

## 13. Configurar Vite

Si el proyecto usa Vite, el `base` debe coincidir con el nombre del repositorio cuando se publica como proyecto en GitHub Pages:

```js
export default {
  base: '/workspace/'
}
```

La configuración exacta debe integrarse con el archivo `vite.config.js` o `vite.config.ts` existente, sin eliminar otras opciones del proyecto.

## 14. Rutas de React

GitHub Pages sirve archivos estáticos. Por eso, una SPA debe considerar el problema de las rutas directas. Una alternativa sencilla es utilizar `HashRouter`. Si se usa `BrowserRouter`, debe implementarse una estrategia de fallback/404 compatible con GitHub Pages.

## 15. Variables de Supabase

Ejemplo conceptual de variables para Vite:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_CLAVE_ANON
```

No se deben incluir claves privadas en el frontend.

## 16. GitHub Actions

GitHub Pages puede desplegarse mediante GitHub Actions. Un flujo típico construye el proyecto y utiliza las acciones oficiales de Pages para cargar y desplegar el artefacto.

Ejemplo de workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

El workflow debe ajustarse a la estructura real del proyecto, especialmente si no utiliza `npm ci`, si el lockfile tiene otro formato o si el comando de build es diferente.

## 17. Configurar Pages

En GitHub:

1. Abrir **Settings** del repositorio.
2. Entrar en **Pages**.
3. Seleccionar GitHub Actions como método de publicación.
4. Hacer push a `main`.
5. Revisar la ejecución en **Actions**.
6. Abrir la URL publicada cuando el workflow termine correctamente.

## 18. Comandos Git

Después de preparar los cambios localmente:

```bash
git add .
git commit -m "chore: configurar despliegue en GitHub Pages"
git push origin main
```

## 19. Dominio personalizado

GitHub Pages permite asociar un dominio personalizado desde la configuración de Pages. Los registros DNS necesarios dependen de si se utiliza un dominio raíz o un subdominio. Para un dominio raíz se pueden utilizar los registros A/AAAA publicados por GitHub; para un subdominio normalmente se utiliza un CNAME hacia el dominio de Pages correspondiente.

Las direcciones IPv4 de GitHub Pages publicadas por GitHub son:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Después de configurar DNS, GitHub permite activar **Enforce HTTPS** cuando el certificado esté disponible.

## 20. Límites y consideraciones

GitHub Pages está pensado para alojamiento estático. GitHub publica límites como un tamaño recomendado de 1 GB para el repositorio fuente, un máximo de 1 GB para el sitio publicado y límites de uso como ancho de banda y frecuencia de builds. Los workflows de GitHub Actions tienen consideraciones diferentes a los builds automáticos tradicionales de Pages.

Supabase también tiene límites según el plan. En el plan Free se incluyen recursos limitados y los proyectos con poca actividad pueden ser pausados después de un periodo de inactividad.

## 21. Solución de problemas

| Problema | Posible causa | Solución |
|---|---|---|
| Pantalla en blanco | `base` incorrecto | Revisar `base: '/workspace/'` |
| CSS/JS no carga | Rutas absolutas incorrectas | Revisar rutas y build |
| 404 al entrar a una ruta | SPA sin fallback | Usar HashRouter o estrategia de 404 |
| Login de Supabase falla | URL de redirección incorrecta | Configurar URLs de producción en Supabase |
| Workflow falla en npm ci | Lockfile ausente/desactualizado | Revisar `package-lock.json` y dependencias |
| Datos no aparecen | RLS bloquea la consulta | Revisar políticas RLS de forma segura |
| Clave expuesta | Se puso un secreto en el frontend | Revocar/rotar la credencial y moverla al backend |

## 22. Checklist de entrega

- [ ] Investigación de DNS completada.
- [ ] Salidas reales de `nslookup` y `dig` anexadas.
- [ ] Comparación de plataformas incluida.
- [ ] Explicación de Supabase y RLS incluida.
- [ ] Variables de entorno explicadas.
- [ ] `base` de Vite configurado según el nombre del repositorio.
- [ ] Workflow de GitHub Pages creado y probado.
- [ ] Build completado sin errores.
- [ ] URL de GitHub Pages verificada.
- [ ] Captura de GitHub Actions.
- [ ] Captura de configuración/RLS de Supabase sin exponer secretos.
- [ ] Commit y push realizados.
