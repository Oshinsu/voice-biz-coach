-- Insert detailed data for retail-personalization scenario

-- Insert interlocutor data
INSERT INTO public.interlocutors (
  scenario_id, name, role, personality, communication_style, decision_power,
  priorities, concerns, motivations, experience, background, psychology_profile, decision_process
) VALUES (
  'retail-personalization',
  'Marie Dubois',
  'Directrice Marketing Digital',
  'Analytique et orientée résultats',
  'Directe et factuelle, préfère les données concrètes',
  'Forte - influence directe sur le budget marketing',
  ARRAY['ROI mesurable', 'Amélioration de l''expérience client', 'Innovation technologique'],
  ARRAY['Complexité d''implémentation', 'Formation des équipes', 'Retour sur investissement'],
  ARRAY['Reconnaissance professionnelle', 'Succès de l''entreprise', 'Innovation'],
  '8 ans en marketing digital, spécialisée en e-commerce',
  'Formation en école de commerce, expérience chez Amazon et Zalando',
  '{"decision_style": "analytique", "risk_tolerance": "modérée", "communication_preference": "données", "influence_factors": ["preuves", "études de cas", "ROI"]}'::jsonb,
  'Analyse approfondie > Tests pilotes > Validation par la direction > Déploiement'
);

-- Insert product data
INSERT INTO public.products (
  scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise,
  key_features, competitive_advantages, roi, implementation_time, technical_specs,
  market_positioning, target_segments, marketing_plan
) VALUES (
  'retail-personalization',
  'PersonaRetail AI',
  'Plateforme de personnalisation e-commerce alimentée par l''IA pour optimiser l''expérience client et augmenter les conversions',
  '2 500€/mois - Jusqu''à 50k visiteurs',
  '8 500€/mois - Jusqu''à 500k visiteurs',
  'Sur mesure - Plus de 500k visiteurs',
  ARRAY['Recommandations en temps réel', 'Segmentation automatique', 'A/B testing intégré', 'Analytics avancés', 'API complète'],
  ARRAY['IA propriétaire avancée', 'Intégration ultra-rapide', 'ROI prouvé +35%', 'Support dédié 24/7'],
  '+35% de taux de conversion en moyenne, ROI de 450% sur 12 mois',
  '2-4 semaines pour intégration complète',
  '{"technology": "Machine Learning + Deep Learning", "integrations": ["Shopify", "Magento", "WooCommerce", "API REST"], "performance": "< 50ms response time", "security": "SOC2, GDPR compliant"}'::jsonb,
  '{"position": "Leader innovation", "target": "E-commerce premium", "differentiation": "IA propriétaire", "pricing": "Premium justified"}'::jsonb,
  ARRAY['E-commerce 10M+ CA', 'Retailers multi-canaux', 'Marques premium', 'Places de marché'],
  '{"strategy": "Account-based marketing", "channels": ["LinkedIn", "Events", "Partenariats"], "budget": "150k€", "timeline": "6 mois"}'::jsonb
);

-- Insert company SWOT analysis
INSERT INTO public.swot_analyses (
  scenario_id, analysis_type, strengths, weaknesses, opportunities, threats,
  porter_analysis, pestel_analysis, market_data
) VALUES (
  'retail-personalization',
  'company',
  '["Leader du marché français", "Équipe technique experte", "Portefeuille clients premium", "Innovation continue", "Partenariats stratégiques"]'::jsonb,
  '["Dépendance au marché français", "Ressources limitées R&D", "Processus de vente long", "Prix premium"]'::jsonb,
  '["Expansion européenne", "IA générative", "Mobile-first", "Retail physique", "Acquisitions"]'::jsonb,
  '["Concurrence GAFAM", "Régulation GDPR", "Crise économique", "Nouvelles technologies", "Clients internalisent"]'::jsonb,
  '{"rivalry": "Modérée - marché fragmenté", "suppliers": "Faible - cloud commoditisé", "buyers": "Forte - clients exigeants", "substitutes": "Modérée - solutions internes", "barriers": "Élevées - expertise IA"}'::jsonb,
  '{"political": "Stable - soutien innovation", "economic": "Incertain - inflation", "social": "Favorable - digitalisation", "technology": "Rapide - IA revolution", "environment": "Neutre", "legal": "Contraignant - GDPR"}'::jsonb,
  '{"market_size": "2.5Md€ en France", "growth_rate": "15% annuel", "competitors": 12, "market_share": "8%", "customer_acquisition_cost": "12k€", "customer_lifetime_value": "85k€"}'::jsonb
);

-- Insert product SWOT analysis
INSERT INTO public.swot_analyses (
  scenario_id, analysis_type, strengths, weaknesses, opportunities, threats
) VALUES (
  'retail-personalization',
  'product',
  '["IA propriétaire avancée", "Intégration simple", "ROI prouvé", "Interface intuitive", "Support premium"]'::jsonb,
  '["Prix élevé", "Complexité technique", "Dépendance données", "Courbe d''apprentissage"]'::jsonb,
  '["Nouvelles fonctionnalités IA", "Marchés verticaux", "Mobile natif", "Prédictif avancé"]'::jsonb,
  '["Solutions open source", "Commoditisation", "Réglementations", "Évolution technologique"]'::jsonb
);

-- Insert stakeholders
INSERT INTO public.stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('retail-personalization', 'Thomas Martin', 'DSI', 'Élevée', 'Neutre', ARRAY['Sécurité', 'Intégration', 'Performance'], 'Démonstration technique approfondie'),
('retail-personalization', 'Sophie Leblanc', 'Directrice Générale', 'Très élevée', 'Positive', ARRAY['ROI', 'Timing', 'Ressources'], 'Business case solide avec métriques'),
('retail-personalization', 'Julien Rousseau', 'Responsable E-commerce', 'Modérée', 'Très positive', ARRAY['Formation équipe', 'Changement processus'], 'Formation et accompagnement'),
('retail-personalization', 'Équipe Développement', 'Équipe technique', 'Modérée', 'Neutre', ARRAY['Charge de travail', 'Nouvelles technologies'], 'Implication dans le projet');