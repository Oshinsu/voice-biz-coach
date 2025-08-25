-- Create table for navigation menu items
CREATE TABLE public.navigation_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  href text NOT NULL,
  order_index integer NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read navigation items (public data)
CREATE POLICY "Navigation items are publicly readable" 
ON public.navigation_items 
FOR SELECT 
USING (is_active = true);

-- Create policy for admins to manage navigation items
CREATE POLICY "Admins can manage navigation items" 
ON public.navigation_items 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default navigation items
INSERT INTO public.navigation_items (name, href, order_index) VALUES 
('Accueil', '/', 1),
('Scénarios', '/scenarios', 2),
('Services', '/services', 3),
('Qui sommes-nous', '/about', 4),
('Contact', '/contact', 5);

-- Create table for site configuration/settings
CREATE TABLE public.site_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read site config (public data)
CREATE POLICY "Site config is publicly readable" 
ON public.site_config 
FOR SELECT 
USING (true);

-- Create policy for admins to manage site config
CREATE POLICY "Admins can manage site config" 
ON public.site_config 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default site configuration
INSERT INTO public.site_config (key, value, description) VALUES 
('site_title', '"Byss VNS"', 'Site title displayed in header'),
('site_subtitle', '"Virtual Negotiation Simulator"', 'Site subtitle displayed in header'),
('auth_button_login', '"Connexion"', 'Login button text'),
('auth_button_signup', '"Essai gratuit"', 'Signup button text'),
('profile_button', '"Mon profil"', 'Profile button text');

-- Add triggers for updated_at
CREATE TRIGGER update_navigation_items_updated_at
BEFORE UPDATE ON public.navigation_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at
BEFORE UPDATE ON public.site_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();