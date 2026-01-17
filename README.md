# Web Cosmiatría & Estética

Plataforma web moderna para servicios de cosmiatría, incluyendo landing page pública, sistema de reservas en tiempo real y panel de administración.

## Características

*   **Landing Page Premium**: Diseño oscuro y elegante con Tailwind CSS.
*   **Gestión de Turnos**: Los clientes pueden ver servicios y reservar citas.
*   **Administración**: Panel protegido para que la especialista apruebe o cancele turnos.
*   **Base de Datos**: PostgreSQL vía Supabase para persistencia de datos.

## Tecnologías

*   Next.js 14+ (App Router)
*   Tailwind CSS + Shadcn/UI
*   Supabase (Auth & Database)
*   TypeScript

## Configuración Local

1.  Clonar repositorio.
2.  Instalar dependencias: `npm install`.
3.  Configurar variables de entorno en `.env.local`:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL="tu-url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-key"
    ```
4.  Correr el servidor: `npm run dev`.

## Deploy

Este proyecto está optimizado para desplegarse en [Vercel](https://vercel.com).
Ver `DEPLOY.md` para instrucciones detalladas.
