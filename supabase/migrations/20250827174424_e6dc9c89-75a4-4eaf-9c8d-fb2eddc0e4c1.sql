-- Fix critical security issues first

-- 1. Fix site_config RLS policy to restrict public access to admin-only
DROP POLICY IF EXISTS "Site config is publicly readable" ON public.site_config;
CREATE POLICY "Site config is publicly readable for basic keys" 
ON public.site_config 
FOR SELECT 
USING (key IN ('site_name', 'site_description', 'contact_email', 'logo_url'));

-- 2. Update functions to use proper search_path security
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$function$;

DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

-- 3. Create scenarios table
CREATE TABLE IF NOT EXISTS public.scenarios (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Débutant', 'Intermédiaire', 'Avancé')),
  company_name TEXT NOT NULL,
  company_sector TEXT NOT NULL,
  company_size TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  success_probability INTEGER NOT NULL CHECK (success_probability >= 0 AND success_probability <= 100),
  main_objectives TEXT[] NOT NULL,
  available_tools TEXT[] NOT NULL,
  pain_points TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on scenarios
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

-- Create policy for scenarios (publicly readable)
CREATE POLICY "Scenarios are publicly readable" 
ON public.scenarios 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage scenarios" 
ON public.scenarios 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Create personas table
CREATE TABLE IF NOT EXISTS public.personas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  sector TEXT NOT NULL,
  company_size TEXT NOT NULL,
  budget TEXT NOT NULL,
  pain_points TEXT[] NOT NULL,
  priorities TEXT[] NOT NULL,
  decision_process TEXT NOT NULL,
  objection_style TEXT NOT NULL,
  communication_style TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on personas
ALTER TABLE public.personas ENABLE ROW LEVEL SECURITY;

-- Create policy for personas (publicly readable)
CREATE POLICY "Personas are publicly readable" 
ON public.personas 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage personas" 
ON public.personas 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. Insert default navigation items
INSERT INTO public.navigation_items (name, href, order_index) VALUES
('Accueil', '/', 1),
('Scénarios', '/scenarios', 2),
('À propos', '/about', 3),
('Services', '/services', 4),
('Contact', '/contact', 5)
ON CONFLICT (href) DO NOTHING;

-- 6. Insert default site config
INSERT INTO public.site_config (key, value, description) VALUES
('site_name', '"Byss VNS"', 'Nom du site'),
('site_description', '"Plateforme de formation commerciale par IA"', 'Description du site'),
('contact_email', '"contact@byssvns.fr"', 'Email de contact'),
('logo_url', '"/logo.png"', 'URL du logo')
ON CONFLICT (key) DO NOTHING;

-- Add update triggers
CREATE TRIGGER update_scenarios_updated_at
BEFORE UPDATE ON public.scenarios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_personas_updated_at
BEFORE UPDATE ON public.personas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();