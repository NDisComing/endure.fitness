-- ==============================================================================
-- ENDURE FITNESS DATABASE SCHEMA (Supabase PostgreSQL)
-- ==============================================================================

-- 1. ENUMS & EXTENSIONS
create type user_role as enum ('coach', 'client');
create type booking_status as enum ('confirmed', 'cancelled', 'completed');

-- 2. USER PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role user_role default 'client' not null,
  coach_id uuid references public.profiles(id),
  phone_number text,
  target_calories int default 2200,
  target_protein int default 150,
  target_carbs int default 250,
  target_fat int default 70,
  injuries_notes text,
  created_at timestamptz default now()
);

-- 3. BOOKINGS & SCHEDULE
create table public.trainer_availability (
  id uuid default gen_random_uuid() primary key,
  trainer_id uuid references public.profiles(id) on delete cascade not null,
  day_of_week int not null, -- 0 = Sunday, 6 = Saturday
  start_time time not null,
  end_time time not null
);

create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  trainer_id uuid references public.profiles(id) on delete cascade not null,
  session_type text not null, -- e.g., '1-on-1 PT', 'Assessment'
  start_time timestamptz not null,
  end_time timestamptz not null,
  status booking_status default 'confirmed' not null,
  notes text,
  created_at timestamptz default now()
);

-- 4. EXERCISES & WORKOUTS
create table public.exercises (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null, -- 'Chest', 'Back', 'Legs', 'Core'
  video_url text not null,
  instructions text,
  created_at timestamptz default now()
);

create table public.assigned_workouts (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  day_label text not null, -- e.g., 'Monday - Push'
  exercise_ids uuid[] default '{}',
  created_at timestamptz default now()
);

-- 5. MEAL LOGS & AI SCANNING
create table public.meal_logs (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  image_url text,
  meal_type text not null, -- 'Breakfast', 'Lunch', 'Dinner', 'Snack'
  items jsonb default '[]'::jsonb, -- AI breakdown: [{name, grams, calories, protein, carbs, fat}]
  total_calories int not null,
  total_protein int default 0,
  total_carbs int default 0,
  total_fat int default 0,
  coach_comment text,
  logged_at timestamptz default now()
);

-- 6. ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.trainer_availability enable row level security;
alter table public.exercises enable row level security;
alter table public.assigned_workouts enable row level security;
alter table public.meal_logs enable row level security;

-- Public read for coach availability
create policy "Anyone can read trainer availability" on public.trainer_availability
  for select using (true);

-- Clients can manage their own bookings
create policy "Users can view their own bookings" on public.bookings
  for select using (auth.uid() = client_id or auth.uid() = trainer_id);

create policy "Clients can insert bookings" on public.bookings
  for insert with check (auth.uid() = client_id);

-- Meals: client manages own, coach manages assigned clients
create policy "Clients can CRUD own meals" on public.meal_logs
  for all using (auth.uid() = client_id);

create policy "Coaches view and review assigned client meals" on public.meal_logs
  for all using (
    exists (
      select 1 from public.profiles 
      where profiles.id = meal_logs.client_id and profiles.coach_id = auth.uid()
    )
  );
