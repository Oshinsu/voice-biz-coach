-- Créer le type enum pour les rôles d'utilisateur
create type public.app_role as enum ('admin', 'school', 'user');

-- Table des profils utilisateur
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  first_name text,
  last_name text,
  avatar_url text,
  school_name text, -- pour les comptes école
  organization text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table des rôles utilisateur
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, role)
);

-- Table des sessions d'entraînement
create table public.training_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  scenario_id text not null,
  conversation_type text not null, -- 'cold_call' ou 'rdv'
  phase text not null,
  score numeric(5,2),
  duration_seconds integer,
  objectives_completed text[],
  feedback text,
  audio_transcript text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table des KPI/statistiques globales
create table public.user_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  total_sessions integer default 0,
  average_score numeric(5,2) default 0,
  total_duration_minutes integer default 0,
  best_score numeric(5,2) default 0,
  completed_scenarios text[],
  preferred_scenarios text[],
  improvement_rate numeric(5,2) default 0,
  last_session_date timestamp with time zone,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Activer RLS sur toutes les tables
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.training_sessions enable row level security;
alter table public.user_stats enable row level security;

-- Fonction sécurisée pour vérifier les rôles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Politiques RLS pour profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Politiques RLS pour user_roles
create policy "Users can view own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

create policy "Admins can manage all roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'));

-- Politiques RLS pour training_sessions
create policy "Users can view own sessions"
  on public.training_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on public.training_sessions for insert
  with check (auth.uid() = user_id);

create policy "Schools can view their students sessions"
  on public.training_sessions for select
  using (
    public.has_role(auth.uid(), 'school') and
    exists (
      select 1 from public.profiles 
      where id = user_id 
      and organization = (
        select school_name from public.profiles where id = auth.uid()
      )
    )
  );

-- Politiques RLS pour user_stats
create policy "Users can view own stats"
  on public.user_stats for select
  using (auth.uid() = user_id);

create policy "Users can update own stats"
  on public.user_stats for update
  using (auth.uid() = user_id);

create policy "Users can insert own stats"
  on public.user_stats for insert
  with check (auth.uid() = user_id);

-- Fonction pour créer un profil automatiquement
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  
  -- Assigner le rôle user par défaut
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  -- Créer les stats initiales
  insert into public.user_stats (user_id)
  values (new.id);
  
  return new;
end;
$$;

-- Trigger pour créer automatiquement le profil
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Fonction pour mettre à jour updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers pour updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_user_stats_updated_at
  before update on public.user_stats
  for each row execute function public.update_updated_at_column();