-- Fix critical security issues with proper CASCADE

-- 1. Fix site_config RLS policy to restrict public access to admin-only
DROP POLICY IF EXISTS "Site config is publicly readable" ON public.site_config;
CREATE POLICY "Site config is publicly readable for basic keys" 
ON public.site_config 
FOR SELECT 
USING (key IN ('site_name', 'site_description', 'contact_email', 'logo_url'));

-- 2. Update functions to use proper search_path security (with CASCADE)
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role) CASCADE;
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

-- Recreate the dropped policies
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Schools can view their students sessions" 
ON public.training_sessions 
FOR SELECT 
USING (has_role(auth.uid(), 'school'::app_role) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = training_sessions.user_id) AND (profiles.organization = ( SELECT profiles_1.school_name
           FROM profiles profiles_1
          WHERE (profiles_1.id = auth.uid())))))));

CREATE POLICY "Admins can manage navigation items" 
ON public.navigation_items 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage site config" 
ON public.site_config 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update other functions
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