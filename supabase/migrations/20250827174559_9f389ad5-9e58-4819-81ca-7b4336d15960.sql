-- Create scenarios and personas tables with data migration

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

-- Insert sample scenarios data
INSERT INTO public.scenarios (id, title, description, difficulty, company_name, company_sector, company_size, budget_range, success_probability, main_objectives, available_tools, pain_points) VALUES
('industrial-marketplace', 'Vente B2B - Marketplace industrielle', 'Convaincre un directeur d''une entreprise de métallurgie de précision d''adopter votre marketplace B2B pour optimiser ses achats industriels.', 'Intermédiaire', 'PrecisionMetal Pro', 'Métallurgie de précision', '150-300 employés', '50k-100k€', 75, 
ARRAY['Réduire les coûts d''approvisionnement de 15%', 'Améliorer la traçabilité des pièces', 'Accélérer les délais de livraison'], 
ARRAY['Plateforme collaborative', 'Analytics avancés', 'API d''intégration'], 
ARRAY['Coûts d''approvisionnement élevés', 'Délais de livraison imprévisibles', 'Difficulté à tracer les pièces']),

('saas-hr-tool', 'SaaS RH - Outil de gestion des talents', 'Vendez votre solution SaaS de gestion des talents à une directrice RH d''une scale-up tech en forte croissance.', 'Avancé', 'TechGrow Solutions', 'Technologie/SaaS', '200-500 employés', '75k-150k€', 60,
ARRAY['Structurer le processus de recrutement', 'Améliorer la rétention des talents', 'Optimiser les évaluations de performance'],
ARRAY['Module de recrutement IA', 'Tableaux de bord RH', 'Intégrations SIRH'],
ARRAY['Croissance rapide des équipes', 'Turnover élevé', 'Processus RH non structurés']),

('cybersecurity-consulting', 'Conseil en cybersécurité', 'Convaincre le DSI d''une banque régionale d''investir dans vos services de conseil en cybersécurité pour se conformer aux nouvelles réglementations.', 'Avancé', 'Banque Régionale Loire', 'Services financiers', '500-1000 employés', '200k-500k€', 45,
ARRAY['Conformité réglementaire DORA', 'Réduire les risques cyber', 'Former les équipes internes'],
ARRAY['Audit de sécurité', 'Plan de remédiation', 'Formation des équipes'],
ARRAY['Nouvelles réglementations complexes', 'Menaces cyber croissantes', 'Équipes internes limitées']);

-- Insert sample personas data
INSERT INTO public.personas (id, title, sector, company_size, budget, pain_points, priorities, decision_process, objection_style, communication_style) VALUES
('directeur-industriel', 'Directeur Industriel', 'Industrie manufacturière', 'PME (50-250 employés)', '50k-200k€', 
ARRAY['Optimisation des coûts de production', 'Amélioration de la qualité', 'Respect des délais'], 
ARRAY['ROI démontrable', 'Facilité d''implémentation', 'Support technique'], 
'Pragmatique, demande des preuves concrètes et des références clients', 
'Direct et factuel', 'Terre-à-terre, apprécie les données chiffrées'),

('directrice-rh-tech', 'Directrice RH Tech', 'Technologie/SaaS', 'Scale-up (100-500 employés)', '100k-300k€',
ARRAY['Attraction des talents', 'Rétention des employés', 'Évolutivité des processus'],
ARRAY['Innovation RH', 'Expérience collaborateur', 'Analytics RH'],
'Collaborative, consulte son équipe, évalue l''impact culture d''entreprise',
'Analytique mais challengeant', 'Moderne, apprécie l''innovation et les nouvelles approches'),

('dsi-banque', 'DSI Banque', 'Services financiers', 'Grande entreprise (500+ employés)', '500k-2M€',
ARRAY['Conformité réglementaire', 'Sécurité des données', 'Continuité de service'],
ARRAY['Compliance', 'Sécurité', 'Robustesse technique'],
'Méthodique, processus long avec comité de décision, focus sécurité',
'Très prudent et technique', 'Formel, privilégie la documentation et les certifications');