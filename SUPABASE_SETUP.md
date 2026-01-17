# Guía de Configuración de Supabase

Para que el sistema de turnos funcione, necesitamos una "nube" donde guardar los datos. Usaremos **Supabase** (que es gratis). Sigue estos pasos:

## 1. Crear Proyecto
1.  Ve a [supabase.com](https://supabase.com/) e inicia sesión (o crea una cuenta).
2.  Haz clic en **"New Project"**.
3.  Elige tu organización, ponle un nombre (ej: `Lumina Estética`) y una contraseña segura para la base de datos.
4.  Espera unos minutos a que se cree el proyecto.

## 2. Configurar la Base de Datos
1.  En el menú izquierdo, busca el ícono de **SQL Editor** (parece una terminal `>_`).
2.  Haz clic en **"New Query"**.
3.  Copia TODO el contenido del archivo `supabase/schema.sql` que he creado en tu proyecto.
    *   (Puedes abrir ese archivo en tu editor de código o pedirme que te lo muestre).
4.  Pega el código en el editor de Supabase y dale al botón **"Run"**.
    *   Verás un mensaje de "Success".

## 3. Conectar con el Sitio Web
1.  Ve a **Project Settings** (ícono de engranaje ⚙️ abajo a la izquierda).
2.  Entra en **API**.
3.  Copia la **Project URL**.
4.  Copia la **anon public key**.

## 4. Guardar las Claves
Crea un archivo llamado `.env.local` en la carpeta `estetica-web` (junto al `.env.local.example` que te dejaré) y pega tus claves así:

```bash
NEXT_PUBLIC_SUPABASE_URL="tu-project-url-aqui"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key-aqui"
```

¡Y listo! Con esto la web podrá guardar y leer turnos.
