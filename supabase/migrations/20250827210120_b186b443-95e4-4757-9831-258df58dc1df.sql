-- Suite enrichissement pour les 5 scénarios restants en batch

-- KPI Performance (ModaStyle)
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience) VALUES
('kpi-performance', 'Sarah Lemoine', 'Directrice Marketing', 'Data-driven et perfectionniste', 'Analytique et directe', 'Décisionnaire marketing', ARRAY['ROI marketing', 'Attribution précise', 'Optimisation performance'], ARRAY['Complexité donnée', 'Coût solution', 'Intégration technique'], ARRAY['Prouver ROI marketing', 'Optimiser budgets', 'Croissance CA'], '10 ans marketing digital e-commerce'),
('kpi-performance', 'Maxime Durand', 'CTO', 'Technique et pragmatique', 'Factuel et concis', 'Validation technique', ARRAY['Performance technique', 'Intégration propre', 'Maintenance simple'], ARRAY['Complexité API', 'Impact performance', 'Coût dev'], ARRAY['Stack optimisé', 'Données fiables', 'Évolutivité'], '12 ans tech e-commerce');

-- Digital Agency (TechFlow Digital)
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience) VALUES
('digital-agency', 'Julien Martinez', 'Fondateur & CEO', 'Entrepreneur ambitieux et orienté croissance', 'Dynamique et persuasif', 'Décisionnaire final', ARRAY['Croissance agence', 'Efficacité équipe', 'Satisfaction client'], ARRAY['Coût outil', 'Adoption équipe', 'ROI incertain'], ARRAY['Scaler agence', 'Optimiser processus', 'Différenciation'], '8 ans entrepreneur digital'),
('digital-agency', 'Camille Rousset', 'Directrice Client', 'Relationnelle et organisée', 'Empathique et structurée', 'Influence opérationnelle', ARRAY['Satisfaction client', 'Suivi projet', 'Communication'], ARRAY['Complexité outil', 'Formation équipe', 'Résistance changement'], ARRAY['Fidéliser clients', 'Simplifier suivi', 'Qualité service'], '6 ans management client');

-- FinTech (MoneyFlow)
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience) VALUES
('fintech-startup', 'Alexandre Chen', 'CEO & Founder', 'Visionnaire tech et risk-taker calculé', 'Inspirant et stratégique', 'Décisionnaire final', ARRAY['Innovation produit', 'Croissance rapide', 'Avantage concurrentiel'], ARRAY['Coût développement', 'Complexité intégration', 'Time-to-market'], ARRAY['Disruption fintech', 'Lever fonds', 'Leadership marché'], '12 ans fintech & IA'),
('fintech-startup', 'Dr. Lisa Wang', 'Chief Data Scientist', 'Scientifique rigoureuse et innovante', 'Précise et méthodique', 'Expertise IA critique', ARRAY['Précision modèles', 'Innovation IA', 'Performance technique'], ARRAY['Qualité données', 'Biais algorithmes', 'Explicabilité'], ARRAY['Excellence technique', 'Innovation IA', 'Impact scientifique'], 'PhD IA + 8 ans fintech');

-- Manufacturing IoT (MetalCorp)
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience) VALUES
('manufacturing-iot', 'Pierre Fourneau', 'Directeur Production', 'Opérationnel pragmatique, focus efficacité', 'Direct et opérationnel', 'Décisionnaire production', ARRAY['Efficacité production', 'Qualité produit', 'Réduction coûts'], ARRAY['Arrêt production', 'Complexité technique', 'ROI incertain'], ARRAY['Optimiser rendement', 'Réduire défauts', 'Compétitivité'], '25 ans industrie manufacturière'),
('manufacturing-iot', 'Sylvain Tech', 'Responsable IT/OT', 'Technique sécuritaire, expert systèmes', 'Technique et méthodique', 'Validation IT/OT', ARRAY['Sécurité systèmes', 'Fiabilité IoT', 'Intégration'], ARRAY['Cybersécurité', 'Complexité réseau', 'Maintenance'], ARRAY['Industrie 4.0', 'Sécurité maximale', 'Innovation tech'], '15 ans IT industriel');