# Guía de Despliegue en Vercel

Sigue estos pasos para publicar tu sitio web en Internet (GRATIS).

## Paso 1: Crear cuenta en Vercel
1.  Ve a [vercel.com](https://vercel.com).
2.  Haz clic en **"Sign Up"**.
3.  Elige **"Continue with GitHub"** y usa tu cuenta de GitHub.

## Paso 2: Importar el Proyecto
1.  En tu panel de Vercel, haz clic en **"Add New..."** -> **"Project"**.
2.  Verás una lista de tus repositorios de GitHub.
3.  Busca `estetica-web` y haz clic en **"Import"**.

## Paso 3: Configurar Variables (MUY IMPORTANTE)
En la pantalla de configuración del proyecto ("Configure Project"):
1.  Busca la sección **"Environment Variables"**.
2.  Tienes que agregar las mismas claves que tienes en tu archivo `.env.local`:

    *   **NAME**: `NEXT_PUBLIC_SUPABASE_URL`
    *   **VALUE**: (Copia el valor de tu archivo .env.local)
    *   *Clic en Add*

    *   **NAME**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   **VALUE**: (Copia la clave larga de tu archivo .env.local)
    *   *Clic en Add*

## Paso 4: Desplegar
1.  Haz clic en el botón grande **"Deploy"**.
2.  Espera unos segundos... Verás cohetes y confeti. 🚀
3.  Vercel te dará un **dominio** (ej: `estetica-web.vercel.app`).

¡Esa es tu nueva página web pública! Compártela con tus clientes.
