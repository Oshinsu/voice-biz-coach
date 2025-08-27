-- Extend scenarios table with all missing fields
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS revenue TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS employees TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS linkedin TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS founded_year INTEGER;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS key_people TEXT[];
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS current_solution TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS timeline_description TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS sales_goal TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS expected_revenue TEXT;
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS probable_objections TEXT[];
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS success_criteria TEXT[];
ALTER TABLE scenarios ADD COLUMN IF NOT EXISTS tools TEXT[];

-- Create interlocutors table
CREATE TABLE IF NOT EXISTS public.interlocutors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  personality TEXT,
  communication_style TEXT,
  decision_power TEXT,
  priorities TEXT[],
  concerns TEXT[],
  motivations TEXT[],
  experience TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  pricing_starter TEXT,
  pricing_professional TEXT,
  pricing_enterprise TEXT,
  key_features TEXT[],
  competitive_advantages TEXT[],
  roi TEXT,
  implementation_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create swot_analysis table
CREATE TABLE IF NOT EXISTS public.swot_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL, -- 'our_product', 'their_situation', 'competitor'
  strengths JSONB,
  weaknesses JSONB,
  opportunities JSONB,
  threats JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stakeholders table
CREATE TABLE IF NOT EXISTS public.stakeholders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  influence TEXT,
  support TEXT,
  concerns TEXT[],
  approach TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.interlocutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swot_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stakeholders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Interlocutors are publicly readable" ON public.interlocutors FOR SELECT USING (true);
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);
CREATE POLICY "SWOT analysis are publicly readable" ON public.swot_analysis FOR SELECT USING (true);
CREATE POLICY "Stakeholders are publicly readable" ON public.stakeholders FOR SELECT USING (true);

-- Admin policies for management
CREATE POLICY "Admins can manage interlocutors" ON public.interlocutors FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage swot analysis" ON public.swot_analysis FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage stakeholders" ON public.stakeholders FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at
CREATE TRIGGER update_interlocutors_updated_at BEFORE UPDATE ON public.interlocutors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_swot_analysis_updated_at BEFORE UPDATE ON public.swot_analysis FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_stakeholders_updated_at BEFORE UPDATE ON public.stakeholders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert complete scenario data for byss-vns-school
UPDATE scenarios SET
  company_sector = 'Enseignement Supérieur - Commerce',
  company_size = 'Institution de taille moyenne (2500 étudiants, 150 professeurs)',
  budget_range = '150 000€ - 300 000€ pour solutions pédagogiques innovantes',
  sector = 'Enseignement Supérieur - Commerce',
  size = 'Institution de taille moyenne (2500 étudiants, 150 professeurs)',
  revenue = 'Budget formation annuel : 3,2M€',
  location = 'Aix-en-Provence, France',
  employees = '150 professeurs + 80 staff administratif',
  website = 'www.escap-commerce.fr',
  linkedin = 'ESCAP École Supérieure Commerce',
  founded_year = 1985,
  key_people = ARRAY[
    'Michel Dubois - Directeur Général (12 ans d''ancienneté)',
    'Dr. Marie Rousseau - Directrice Pédagogique Master Commerce',
    'Thomas Martin - DSI (Systèmes d''Information)',
    'Sophie Leclerc - Directrice Relations Entreprises'
  ],
  current_solution = 'Jeux de rôles traditionnels, cas d''étude papier, simulations basiques',
  timeline_description = 'Déploiement souhaité pour la rentrée de septembre (6 mois)',
  sales_goal = 'Contrat licence École (500+ étudiants) sur 3 ans = 180 000€ TTC',
  expected_revenue = '180 000€ sur 3 ans (60k€/an)',
  probable_objections = ARRAY[
    'Le budget est-il justifié comparé aux méthodes actuelles gratuites ? Comment prouver concrètement que 25€/étudiant génèrera plus de valeur que les jeux de rôles traditionnels qui ne coûtent rien ?',
    'Nos professeurs vont-ils réussir à adopter cette technologie ? Certains ont plus de 55 ans et sont peu à l''aise avec le digital. Combien d''heures de formation faudra-t-il ? Et si ils résistent au changement ?',
    'Comment mesurer concrètement l''amélioration des résultats étudiants ? Sur quels KPIs ? Comment comparer avec les promotions précédentes ? Avez-vous des études longitudinales sur 3-5 ans ?',
    'Que se passe-t-il si la technologie dysfonctionne en plein cours ? Avez-vous un plan de continuité ? Comment gérer 50 étudiants frustrés si l''IA ne répond plus ? Quel est votre taux de disponibilité ?'
  ],
  success_criteria = ARRAY[
    'Accord Dr. Rousseau pour présentation au Comité de Direction',
    'Démonstration live convaincante avec professeurs témoins',
    'Proposition pilote acceptée sur 1 classe test (50 étudiants)',
    'Validation technique infrastructure par DSI de l''école',
    'Négociation contrat cadre pluriannuel',
    'Engagement formation professeurs incluse'
  ],
  tools = ARRAY[
    'Calculateur ROI Éducatif (employabilité, satisfaction, ranking)',
    'Comparateur vs solutions concurrentes',
    'Audit pédagogique méthodes actuelles',
    'Planificateur implémentation académique',
    'Simulateur budget départemental'
  ]
WHERE id = 'byss-vns-school';

-- Insert interlocutor for byss-vns-school
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience)
VALUES (
  'byss-vns-school',
  'Dr. Marie Rousseau',
  'Directrice Pédagogique Master Commerce et Négociation',
  'Innovatrice pragmatique, exigeante sur la qualité pédagogique, ouverte aux nouvelles technologies mais prudente sur les investissements',
  'Professionnelle et structurée, pose des questions précises, apprécie les preuves d''efficacité pédagogique',
  'Forte influence - Décisionnaire pour son département avec validation Directeur Général requis pour budgets >200k€',
  ARRAY[
    'Améliorer l''employabilité des diplômés',
    'Moderniser les méthodes pédagogiques',
    'Maintenir l''excellence académique de l''école',
    'Justifier les investissements par des résultats mesurables'
  ],
  ARRAY[
    'Complexité technique d''adoption pour les professeurs',
    'ROI difficile à mesurer dans l''éducation',
    'Résistance au changement du corps professoral',
    'Budget serré avec autres priorités d''investissement'
  ],
  ARRAY[
    'Être reconnue comme pionnière en innovation pédagogique',
    'Améliorer la satisfaction et réussite étudiante',
    'Attirer de meilleurs étudiants grâce à la modernité',
    'Obtenir des témoignages positifs d''entreprises partenaires'
  ],
  '15 ans dans l''enseignement supérieur, ancienne consultante en stratégie commerciale, docteure en sciences de gestion'
);

-- Insert product for byss-vns-school
INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time)
VALUES (
  'byss-vns-school',
  'Byss VNS - Voice Negotiation Simulator',
  'Plateforme de simulation commerciale par IA conversationnelle, permettant aux étudiants de s''entraîner à la négociation avec des personas clients réalistes',
  'Licence Éducation : 25€/étudiant/an (minimum 50 étudiants)',
  'Licence Département : 18€/étudiant/an (minimum 200 étudiants) + outils pédagogiques avancés',
  'Licence École : 12€/étudiant/an (minimum 500 étudiants) + formation professeurs + support dédié',
  ARRAY[
    'Simulations vocales IA avec 50+ personas clients variés',
    'Scénarios commerciaux adaptés aux secteurs d''activité',
    'Évaluation automatique des performances de négociation',
    'Dashboard pédagogique pour suivi des étudiants',
    'Bibliothèque de cas d''usage business réels',
    'Intégration LMS (Moodle, Canvas, Blackboard)',
    'Rapports détaillés de progression individuelle',
    'Mode coaching en temps réel pour accompagnement'
  ],
  ARRAY[
    'Seule solution IA conversationnelle dédiée à l''enseignement commercial',
    'Adaptation française des méthodes de vente locales',
    'Évolutivité des scenarios selon besoins pédagogiques',
    'Engagement étudiant supérieur aux méthodes traditionnelles',
    'Mesure objective des compétences soft skills'
  ],
  '30% d''amélioration des résultats de négociation étudiante, 45% d''augmentation de l''engagement cours',
  '6-8 semaines avec formation professeurs incluse'
);

-- Insert SWOT analysis for byss-vns-school
INSERT INTO swot_analysis (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats)
VALUES 
(
  'byss-vns-school',
  'our_product',
  '[
    {"item": "Solution innovante unique sur le marché éducatif français", "impact": "Fort", "probability": "Élevée", "score": 9},
    {"item": "IA conversationnelle de pointe développée en France", "impact": "Fort", "probability": "Élevée", "score": 8},
    {"item": "Équipe fondatrice expérience EdTech + Commercial", "impact": "Moyen", "probability": "Élevée", "score": 7},
    {"item": "Adaptabilité aux besoins spécifiques pédagogiques", "impact": "Fort", "probability": "Élevée", "score": 8},
    {"item": "Prix compétitif vs solutions internationales", "impact": "Fort", "probability": "Élevée", "score": 8}
  ]'::jsonb,
  '[
    {"item": "Startup jeune avec références limitées dans l''éducation", "impact": "Fort", "probability": "Élevée", "score": 7},
    {"item": "Technologie complexe nécessitant accompagnement change management", "impact": "Moyen", "probability": "Élevée", "score": 6},
    {"item": "Dépendance à la qualité de connexion internet", "impact": "Faible", "probability": "Moyenne", "score": 4},
    {"item": "Courbe d''apprentissage pour professeurs moins tech-savvy", "impact": "Moyen", "probability": "Moyenne", "score": 5}
  ]'::jsonb,
  '[
    {"item": "Digitalisation accélérée de l''enseignement supérieur post-COVID", "impact": "Fort", "probability": "Élevée", "score": 9},
    {"item": "Demande croissante pour soft skills dans recrutement", "impact": "Fort", "probability": "Élevée", "score": 8},
    {"item": "Budgets européens pour transformation numérique éducation", "impact": "Moyen", "probability": "Moyenne", "score": 6},
    {"item": "Partenariats potentiels avec autres écoles du réseau", "impact": "Fort", "probability": "Moyenne", "score": 7}
  ]'::jsonb,
  '[
    {"item": "Arrivée de géants tech (Microsoft, Google) sur le marché EdTech", "impact": "Fort", "probability": "Moyenne", "score": 6},
    {"item": "Résistance structurelle au changement dans l''enseignement", "impact": "Moyen", "probability": "Élevée", "score": 6},
    {"item": "Réductions budgets éducation en période économique difficile", "impact": "Fort", "probability": "Faible", "score": 4},
    {"item": "Concurrence solutions gratuites ou low-cost existantes", "impact": "Moyen", "probability": "Moyenne", "score": 5}
  ]'::jsonb
),
(
  'byss-vns-school',
  'competitor',
  '[
    {"item": "Capsim Business Simulation : Marché établi, références internationales", "impact": "Moyen", "probability": "Élevée", "score": 7},
    {"item": "Marketplace Simulations : Intégration LMS native, support multilingue", "impact": "Moyen", "probability": "Élevée", "score": 7},
    {"item": "Jeux de rôles traditionnels : Pas de coût technologique, maîtrise professeurs", "impact": "Moyen", "probability": "Élevée", "score": 6}
  ]'::jsonb,
  '[
    {"item": "Solutions génériques non adaptées marché français", "impact": "Moyen", "probability": "Élevée", "score": 6},
    {"item": "Pas d''IA conversationnelle pour simulations vocales réalistes", "impact": "Fort", "probability": "Élevée", "score": 8},
    {"item": "Interfaces souvent datées et peu engageantes", "impact": "Moyen", "probability": "Élevée", "score": 6},
    {"item": "Support technique limité en français", "impact": "Moyen", "probability": "Élevée", "score": 6}
  ]'::jsonb,
  '[
    {"item": "Budget éducation en croissance pour transformation digitale", "impact": "Fort", "probability": "Élevée", "score": 8},
    {"item": "Besoin établi de modernisation pédagogique", "impact": "Fort", "probability": "Élevée", "score": 8}
  ]'::jsonb,
  '[
    {"item": "Innovation Byss VNS disruptive sur leurs modèles économiques", "impact": "Fort", "probability": "Moyenne", "score": 7},
    {"item": "Adaptation possible de leurs solutions au marché français", "impact": "Moyen", "probability": "Moyenne", "score": 5}
  ]'::jsonb
);

-- Insert stakeholder for byss-vns-school
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach)
VALUES (
  'byss-vns-school',
  'Dr. Marie Rousseau',
  'Décisionnaire Principal',
  'Très élevée',
  'Neutre-Positif',
  ARRAY['ROI pédagogique', 'Adoption professeurs', 'Budget'],
  'Démonstration impact étudiant + formation équipe'
);

-- Insert complete scenario data for kpi-performance
UPDATE scenarios SET
  company_sector = 'E-commerce Mode',
  company_size = '50 employés',
  budget_range = '15-25k€/an pour analytics (budget total marketing 1M€)',
  sector = 'E-commerce Mode',
  size = '50 employés',
  revenue = '8M€/an',
  location = 'Lyon, France',
  employees = '50 personnes répartie entre Lyon (siège), entrepôt Rillieux-la-Pape et télétravail',
  website = 'www.modastyle.fr',
  linkedin = 'ModaStyle Mode Éthique',
  founded_year = 2018,
  key_people = ARRAY[
    'Clara Dubois - CEO & Fondatrice (ancienne acheteuse chez Zara)',
    'Sophie Martin - Directrice Marketing & Analytics',
    'Jules - Traffic Manager',
    'Amélie - CRM Manager'
  ],
  current_solution = 'Google Analytics 4 + Google Ads + Facebook Business Manager + Klaviyo + 15 fichiers Excel consolidés manuellement chaque semaine par Sophie Martin',
  timeline_description = 'Q1 2024 - urgence car lancement collection printemps',
  sales_goal = 'Contrat Pro à 599€/mois (12 mois)',
  expected_revenue = '7,188€',
  probable_objections = ARRAY[
    'Comment être sûr que vos données sont plus fiables que Google Analytics qui est gratuit ?',
    'Notre équipe n''a pas le temps de se former sur un nouvel outil, Jules et Amélie sont déjà débordés',
    'Vos 47% d''amélioration du ROAS, c''est calculé sur quelle base ? Nos campagnes sont déjà optimisées',
    'Et si votre outil tombe en panne pendant le Black Friday ? On ne peut pas se permettre de perdre le tracking'
  ],
  success_criteria = ARRAY[
    'Audit analytics actuel révélant 20-30% d''attribution manquée',
    'Démonstration ROI live convaincante',
    'Test pilote accepté sur 1 mois',
    'Validation technique intégration Shopify',
    'Négociation tarif startup obtenue'
  ],
  tools = ARRAY[
    'Audit attribution analytics actuel',
    'Calculateur ROI avec économies vs CAC',
    'Benchmark performance vs concurrents',
    'Planificateur implémentation sans coupure',
    'Simulateur impact ROAS optimisé'
  ]
WHERE id = 'kpi-performance';

-- Insert interlocutor for kpi-performance
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience)
VALUES (
  'kpi-performance',
  'Sophie Martin',
  'Directrice Marketing & Analytics',
  'Perfectionniste data-driven, impatiente face à l''inefficacité, adore les dashboards et métriques. Workaholic assumée qui vérifie ses KPIs le dimanche soir. Frustrée de ne pas avoir les bonnes données pour prendre des décisions rapides.',
  'Directe et chiffrée. Coupe court aux discussions sans données. Pose 3 questions précises par minute en rendez-vous. Adore les graphiques et déteste les présentations PowerPoint fleuves. Prend des notes sur son iPad avec Apple Pencil.',
  'Décisionnaire jusqu''à 30k€, validation CEO Clara Dubois au-delà. Influence forte sur la roadmap tech et budgets marketing.',
  ARRAY[
    'Attribution précise du ROI par canal marketing',
    'Réduction du CAC (actuellement 47€, objectif 35€)',
    'Prédiction du churn client pour actions préventives',
    'Automatisation des reportings hebdomadaires',
    'Optimisation des budgets publicitaires en temps réel'
  ],
  ARRAY[
    'Temps d''implémentation : ne peut pas se permettre 2 mois sans data',
    'Formation équipe : Jules (traffic manager) et Amélie (CRM) peu techniques',
    'Intégration avec Shopify Plus sans casser les conversions actuelles',
    'Fiabilité des prédictions IA : a été échaudée par un outil précédent'
  ],
  ARRAY[
    'Reconnaissance professionnelle : veut être promue VP Growth en 2024',
    'Performance financière : bonus indexé sur l''amélioration du ROAS',
    'Passion data : ancienne consultante chez Converteo, fascinée par les corrélations'
  ],
  '8 ans en marketing digital : 3 ans chez Converteo (conseil), 2 ans chez Spartoo (e-commerce), 3 ans chez ModaStyle. MBA HEC spécialisation Marketing Quantitatif. Certification Google Analytics, certifiée Facebook Blueprint.'
);

-- Insert product for kpi-performance
INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time)
VALUES (
  'kpi-performance',
  'DataTrack Pro',
  'Plateforme d''attribution marketing et analytics prédictive spécialement conçue pour les e-commerces omni-canal. IA propriétaire entraînée sur 500M+ de sessions e-commerce. Connecteurs natifs avec 200+ outils marketing. Déploiement sans code en 24h.',
  '299€/mois (jusqu''à 100k sessions/mois, 5 canaux)',
  '599€/mois (jusqu''à 500k sessions/mois, canaux illimités, IA prédictive)',
  '1200€/mois (sessions illimitées, white-label, API dédiée, CSM)',
  ARRAY[
    'Attribution multi-touch avec modèles Shapley et Data-Driven',
    'Prédiction de churn avec 89% de précision (30j avant)',
    'Optimisation budgets publicitaires en temps réel via algorithmes génétiques',
    'Segmentation automatique de la clientèle (RFM enrichi)',
    'Calcul de LTV prédictive par cohorte et segment',
    'Alertes intelligentes sur les anomalies de performance',
    'Tableau de bord temps réel avec 50+ métriques e-commerce',
    'Recommandations IA d''actions marketing (quotidiennes)',
    'Tests A/B automatisés sur les campagnes',
    'Intégration native Shopify, Klaviyo, Meta, Google, TikTok'
  ],
  ARRAY[
    'Setup sans code en 24h vs 2-6 semaines pour Northbeam/Triple Whale',
    'IA propriétaire 30% plus précise que Google Analytics 4 sur l''attribution',
    'Support français avec CSM dédié vs support international',
    'Coût 60% inférieur à Northbeam pour fonctionnalités équivalentes',
    'Spécialisation mode/lifestyle : connaît les saisonnalités secteur'
  ],
  'Clients moyens : +47% ROAS, -23% CAC, +12% LTV en 6 mois. Retour investissement 312% première année.',
  '24h setup + 1 semaine calibrage IA + formation équipe'
);

-- Add marketplace-b2b scenario from enhancedScenariosComplete
INSERT INTO scenarios (
  id, title, description, difficulty, company_name, company_sector, company_size, budget_range, 
  success_probability, main_objectives, available_tools, pain_points,
  sector, size, revenue, location, employees, founded_year, key_people,
  current_solution, timeline_description, sales_goal, expected_revenue,
  probable_objections, success_criteria, tools
) VALUES (
  'marketplace-b2b',
  'Marketplace B2B Industrielle',
  'Convaincre un leader de la métallurgie d''adopter une marketplace B2B pour optimiser ses achats industriels avec un ROI de 15% et une réduction des délais fournisseurs',
  'Difficile',
  'MetalCast Précision',
  'Métallurgie de précision',
  '150 employés, 25M€ CA',
  '15-30k€/an (soit 0,1% CA) mais ouvert si ROI prouvé sur optimisation achats (objectif -3% coûts)',
  45,
  ARRAY[
    'Démontrer économies de 3-5% sur budget achats annuel (750k€-1,25M€)',
    'Prouver sécurisation approvisionnements vs risques actuels',
    'Rassurer sur qualité fournisseurs marketplace vs historiques',
    'Quantifier gain temps équipe achats pour tâches stratégiques',
    'Convaincre sur facilité adoption et ROI rapide'
  ],
  ARRAY[
    'Audit économies potentielles achats actuels',
    'Calculateur ROI 36 mois avec économies vs investissement',
    'Benchmark prix matières vs marché (acier, alu, cuivre)',
    'Planificateur implémentation par phases sans rupture',
    'Simulateur performance fournisseurs actuels vs marketplace'
  ],
  ARRAY[
    'Négociations fournisseurs chronophages : 40% du temps des 6 acheteurs passé en appels/emails',
    'Visibilité prix marché limitée : suspicion de surpaiement sur l''acier (+12% vs marché)',
    'Ruptures approvisionnement coûteuses : 3 arrêts production en 2023 = 45k€ de perte',
    'Process achats non digitalisé : 200 bons de commande papier/mois, erreurs récurrentes',
    'Dépendance 5 fournisseurs historiques : risque concentration, peu de négociation possible',
    'Gestion stock approximative : 350k€ immobilisé vs 280k€ optimal selon audit',
    'Reporting achats inexistant : impossible de mesurer performance acheteurs ou fournisseurs'
  ],
  'Métallurgie de précision',
  '150 employés, 25M€ CA',
  '25M€/an (croissance 8% mais marges sous pression)',
  'Oyonnax, France (Vallée de la Plasturgie)',
  '150 employés',
  1978,
  ARRAY[
    'Pierre Dubois - CEO (3e génération)',
    'Christine Moreau - Directrice Achats & Supply Chain',
    'DSI - Validation technique'
  ],
  'Négociation directe téléphonique + catalogues papier fournisseurs + ERP Sage pour commandes + Excel pour suivi prix',
  'Q2 2024 pour préparation budget 2025, implémentation souhaitée janvier 2025',
  'Contrat Enterprise 36 mois = 180 000€ (5k€/mois)',
  '180 000€ TTC sur 3 ans',
  ARRAY[
    'Nos fournisseurs actuels nous conviennent parfaitement depuis 15 ans, on a des relations de confiance avec eux. Pourquoi bouleverser des partenariats qui marchent ?',
    '5000€/mois c''est énorme pour notre taille ! Ça représente 60k€/an soit 0,24% de notre CA. Comment justifier cette dépense face aux actionnaires familiaux qui demandent 8% d''économies ?',
    'Notre équipe achats a 48 ans de moyenne d''âge et maîtrise parfaitement les négociations directes. Ils vont résister à ce changement de méthode après 20 ans d''expérience.',
    'Comment être sûr que vos 50 000 fournisseurs sont aussi fiables que nos partenaires actuels ? Nous ne pouvons pas nous permettre une rupture sur les pièces critiques pour Renault.'
  ],
  ARRAY[
    'Audit coûts actuels accepté révélant 8-15% d''économies potentielles',
    'Démonstration live convaincante avec cas d''usage métallurgie',
    'Validation technique intégration ERP Sage par DSI',
    'Références clients similaires (métallurgie/automobile) contactées',
    'Pilote 3 mois accepté sur 20% des achats non critiques',
    'Négociation tarif préférentiel PME familiale obtenue'
  ],
  ARRAY[
    'Audit économies potentielles achats actuels',
    'Calculateur ROI 36 mois avec économies vs investissement',
    'Benchmark prix matières vs marché (acier, alu, cuivre)',
    'Planificateur implémentation par phases sans rupture',
    'Simulateur performance fournisseurs actuels vs marketplace'
  ]
);

-- Insert interlocutor for marketplace-b2b
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience)
VALUES (
  'marketplace-b2b',
  'Christine Moreau',
  'Directrice Achats & Supply Chain',
  'Rigoureuse et analytique, ancienne contrôleur de gestion reconvertie achats. Workaholic qui maîtrise Excel à la perfection. Frustrée par le manque d''outils modernes mais pragmatique sur les investissements. Fière de ses relations fournisseurs construites en 12 ans.',
  'Directe et factuelle, pose 5 questions précises par sujet abordé. Adore les chiffres et tableaux comparatifs. Interrompt si pas assez concret. Prend des notes manuscrites détaillées dans son carnet Moleskine rouge.',
  'Décisionnaire opérationnel jusqu''à 25k€. Au-delà, validation Pierre Dubois (CEO) et CFO requis. Forte influence sur stratégie achats et choix fournisseurs.',
  ARRAY[
    'Réduction coûts achats de 3% (objectif 2024 imposé par actionnaires familiaux)',
    'Sécurisation approvisionnements critiques (acier, aluminium, traitements)',
    'Digitalisation process achats pour gagner en efficacité',
    'Diversification base fournisseurs pour réduire dépendances',
    'Amélioration indicateurs performance achats (actuellement inexistants)'
  ],
  ARRAY[
    'Qualité fournisseurs marketplace vs partenaires historiques de confiance',
    'Complexité technique adoption par équipe achat (moyenne d''âge 48 ans)',
    'Risque rupture approvisionnement pendant transition',
    'ROI réel vs promesses commerciales des éditeurs',
    'Confidentialité prix négociés avec concurrents sur plateforme'
  ],
  ARRAY[
    'Reconnaissance professionnelle : moderniser achats et prouver impact business',
    'Performance financière : bonus indexé sur économies réalisées',
    'Efficacité opérationnelle : moins de temps admin, plus de stratégie'
  ],
  '12 ans chez MetalCast : 5 ans contrôle gestion, 7 ans achats. Diplômée ESCP, formation achats HEC Executive. Connaissance parfaite des coûts matières et fournisseurs historiques.'
);

-- Insert product for marketplace-b2b  
INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time)
VALUES (
  'marketplace-b2b',
  'IndustryMarket Pro',
  'Marketplace B2B spécialisée industrie avec 50 000+ fournisseurs vérifiés, outils de négociation automatisée, analytics achats avancés et garantie approvisionnement. IA de matching fournisseur/besoin et prédiction prix matières.',
  '999€/mois (jusqu''à 1000 ref, 3 acheteurs)',
  '2500€/mois (refs illimitées, 10 acheteurs, analytics avancés)',
  '5000€/mois (multi-sites, API ERP, CSM dédié, SLA 99.9%)',
  ARRAY[
    '50 000+ fournisseurs industrie vérifiés (certifications, santé financière)',
    'Négociation inversée automatisée : fournisseurs enchérissent sur vos appels d''offres',
    'Analytics achats : suivi prix marché, performance fournisseurs, économies réalisées',
    'Intégration ERP native (Sage, SAP, Oracle) pour commandes automatiques',
    'IA matching fournisseur/besoin selon géographie, délais, certifications',
    'Prédiction prix matières (acier, alu, cuivre) sur 6 mois',
    'Catalogue intelligent : 2M+ références techniques avec équivalences',
    'Workflow validation commandes multi-niveaux selon montants',
    'SLA fournisseurs contractuels avec pénalités retard automatiques',
    'Dashboard temps réel : stock, commandes en cours, alertes rupture'
  ],
  ARRAY[
    'Spécialisation industrie vs marketplaces généralistes (Amazon Business)',
    'Fournisseurs européens vérifiés vs Alibaba (confiance, délais, qualité)',
    'Négociation inversée vs négociation directe traditionnelle (+15% économies)',
    'IA prédictive prix vs réactivité pure (+8% optimisation budgets)',
    'Intégration ERP native vs silos de données',
    'Support français vs support offshore Ariba/Oracle'
  ],
  'Clients similaires : 15% réduction coûts achats, 25% gain temps acheteurs, 40% réduction ruptures stock',
  '3 mois : 1 mois setup + 1 mois formation + 1 mois optimisation'
);