-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Tablas de Servicios (Services)
create table public.services (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  duration_minutes integer not null, -- Duración en minutos
  price decimal(10, 2) not null,
  image_url text,
  is_active boolean default true
);

-- 2. Tablas de Turnos (Appointments)
create type appointment_status as enum ('pending', 'confirmed', 'cancelled', 'completed');

create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service_id uuid references public.services(id) not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null, -- Se calcula: start_time + service.duration
  client_name text not null,
  client_email text not null,
  client_phone text,
  status appointment_status default 'pending',
  notes text
);

-- 3. Disponibilidad (Schedules)
-- Simple: Define horario de apertura y cierre por día de semana (0=Domingo, 6=Sábado)
create table public.schedules (
  id uuid default uuid_generate_v4() primary key,
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean default true,
  unique(day_of_week)
);

-- Row Level Security (RLS) - Seguridad

-- Habilitar RLS
alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.schedules enable row level security;

-- Políticas (Policies)

-- Services: Todo el mundo puede ver los servicios activos
create policy "Public services are viewable by everyone"
  on public.services for select
  using ( is_active = true );

-- Appointments: 
-- Cliente: Puede crear turnos (insert)
create policy "Clients can create appointments"
  on public.appointments for insert
  with check ( true );

-- Admin (Autenticado): Puede ver todos los turnos
-- Nota: Esto requiere que el admin esté logueado en Supabase Auth
create policy "Admins can view all appointments"
  on public.appointments for select
  using ( auth.role() = 'authenticated' );

-- Datos Semilla (Seed Data) - Ejemplos
insert into public.services (name, description, duration_minutes, price, image_url) values
('Limpieza Facial Profunda', 'Elimina impurezas y puntos negros.', 60, 25000, null),
('Peeling Químico', 'Renovación celular para mejorar manchas.', 45, 30000, null),
('Masaje Kobido', 'Lifting natural japonés.', 50, 28000, null);

insert into public.schedules (day_of_week, start_time, end_time) values
(1, '09:00', '18:00'), -- Lunes
(2, '09:00', '18:00'), -- Martes
(3, '09:00', '18:00'), -- Miércoles
(4, '09:00', '18:00'), -- Jueves
(5, '09:00', '18:00'), -- Viernes
(6, '10:00', '14:00'); -- Sábado
