-- Insert default navigation and config data
INSERT INTO public.navigation_items (name, href, order_index) 
SELECT 'Accueil', '/', 1 WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE href = '/');

INSERT INTO public.navigation_items (name, href, order_index) 
SELECT 'Scénarios', '/scenarios', 2 WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE href = '/scenarios');

INSERT INTO public.navigation_items (name, href, order_index) 
SELECT 'À propos', '/about', 3 WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE href = '/about');

INSERT INTO public.navigation_items (name, href, order_index) 
SELECT 'Services', '/services', 4 WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE href = '/services');

INSERT INTO public.navigation_items (name, href, order_index) 
SELECT 'Contact', '/contact', 5 WHERE NOT EXISTS (SELECT 1 FROM public.navigation_items WHERE href = '/contact');

-- Insert default site config
INSERT INTO public.site_config (key, value, description) 
SELECT 'site_name', '"Byss VNS"', 'Nom du site' WHERE NOT EXISTS (SELECT 1 FROM public.site_config WHERE key = 'site_name');

INSERT INTO public.site_config (key, value, description) 
SELECT 'site_description', '"Plateforme de formation commerciale par IA"', 'Description du site' WHERE NOT EXISTS (SELECT 1 FROM public.site_config WHERE key = 'site_description');

INSERT INTO public.site_config (key, value, description) 
SELECT 'contact_email', '"contact@byssvns.fr"', 'Email de contact' WHERE NOT EXISTS (SELECT 1 FROM public.site_config WHERE key = 'contact_email');

INSERT INTO public.site_config (key, value, description) 
SELECT 'logo_url', '"/logo.png"', 'URL du logo' WHERE NOT EXISTS (SELECT 1 FROM public.site_config WHERE key = 'logo_url');