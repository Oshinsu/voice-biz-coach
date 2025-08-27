-- Enrichissement scénarios restants partie 1
-- Byss VNS pour École Commerce (ESCAP)
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience) VALUES
('byss-vns-school', 'Marie Dubois', 'Directrice Pédagogique', 'Innovante et centrée sur l''efficacité pédagogique', 'Collaborative et inspirante', 'Décideuse principale', ARRAY['Innovation pédagogique', 'Résultats étudiants', 'Réputation école'], ARRAY['Adoption par enseignants', 'Budget formation', 'ROI pédagogique'], ARRAY['Excellence pédagogique', 'Innovation constante', 'Leadership marché'], '12 ans direction pédagogique'),
('byss-vns-school', 'Thomas Bernard', 'Directeur IT', 'Pragmatique et orienté solutions, expert technique', 'Direct et factuel', 'Validation technique', ARRAY['Sécurité données', 'Intégration LMS', 'Performance'], ARRAY['Complexité technique', 'Maintenance', 'Support utilisateur'], ARRAY['Innovation technique', 'Excellence service', 'Efficacité opérationnelle'], '8 ans IT éducation supérieure');

INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time) VALUES
('byss-vns-school', 'Byss VNS Education', 'Plateforme de simulation commerciale avec IA conversationnelle pour écoles', '€2,000/mois - 100 étudiants', '€5,000/mois - 500 étudiants', '€12,000/mois - Étudiants illimités + advanced analytics', ARRAY['Simulations réalistes IA', 'Feedback instantané', 'Analytics apprentissage', 'Intégration LMS', 'Multi-langues', 'Certifications'], ARRAY['IA conversationnelle unique', 'Spécialisé vente', 'Pédagogie prouvée', 'Support académique', 'Innovation constante'], '+45% engagement étudiants, +60% compétences vente, +30% employabilité', '6-8 semaines avec formation'),
('byss-vns-school', 'Byss Analytics Pro', 'Suite analytics avancée pour optimiser l''apprentissage', '€800/mois - Analytics de base', '€2,000/mois - IA prédictive', '€4,500/mois - Coaching automatisé', ARRAY['Analytics apprentissage', 'Prédictions performance', 'Recommandations IA', 'Tableaux de bord', 'Exports données', 'API'], ARRAY['IA prédictive unique', 'Spécialisé éducation', 'Insights actionnables', 'Interface intuitive'], '+25% réussite étudiants, -40% décrochage, +50% efficacité enseignants', '2-4 semaines');

INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('byss-vns-school', 'product', '{"points": ["Innovation IA conversationnelle", "Spécialisation vente", "Pédagogie validée", "Support académique"]}', '{"points": ["Marché de niche", "Dépendance technologique", "Coût développement"]}', '{"points": ["Digitalisation éducation", "Demande compétences vente", "Expansion internationale"]}', '{"points": ["Concurrents edtech", "Budget éducation réduit", "Résistance changement"]}');

INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('byss-vns-school', 'Paul Leclerc', 'Président ESCAP', 'Très élevée', 'Favorable', ARRAY['Réputation', 'Innovation'], 'Vision stratégique et excellence'),
('byss-vns-school', 'Isabelle Moreau', 'VP Académique', 'Élevée', 'Favorable', ARRAY['Qualité pédagogique', 'Innovation'], 'Excellence académique et innovation'),
('byss-vns-school', 'Jean-Marc Rousseau', 'Directeur Finances', 'Élevée', 'Neutre', ARRAY['Budget', 'ROI'], 'Justification financière rigoureuse'),
('byss-vns-school', 'Caroline Petit', 'Responsable Innovation', 'Moyenne', 'Très favorable', ARRAY['Adoption', 'Formation'], 'Innovation et accompagnement'),
('byss-vns-school', 'Michel Leroy', 'Représentant Enseignants', 'Moyenne', 'Réservé', ARRAY['Formation', 'Changement'], 'Facilité usage et bénéfices pédagogiques');

-- Optimisation Analytics E-commerce (ModaStyle)
INSERT INTO interlocutors (scenario_id, name, role, personality, communication_style, decision_power, priorities, concerns, motivations, experience) VALUES
('kpi-performance', 'Léa Martineau', 'Directrice Marketing', 'Data-driven et orientée performance, très exigeante', 'Directe et analytique', 'Décideuse principale', ARRAY['ROI marketing', 'Attribution multi-canal', 'Growth'], ARRAY['Complexité attribution', 'Coût acquisition', 'Fiabilité données'], ARRAY['Optimiser ROAS', 'Croissance sustainable', 'Excellence data'], '7 ans e-commerce, experte growth'),
('kpi-performance', 'Maxime Roussel', 'Head of Data', 'Technique et perfectionniste, focus sur la précision', 'Méthodique et précis', 'Validation technique', ARRAY['Qualité données', 'Architecture data', 'Performance'], ARRAY['Intégration complexe', 'Qualité données', 'Ressources tech'], ARRAY['Excellence technique', 'Innovation data', 'Efficacité'], '8 ans data e-commerce');

INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time) VALUES
('kpi-performance', 'DataFlow Analytics', 'Plateforme d''attribution multi-canal avec IA prédictive pour e-commerce', '€1,500/mois - Attribution de base', '€4,500/mois - IA prédictive + alertes', '€9,500/mois - Suite complète + consulting', ARRAY['Attribution multi-canal', 'IA prédictive', 'Alertes temps réel', 'Dashboards custom', 'API complète', 'Machine learning'], ARRAY['IA propriétaire e-commerce', 'Attribution précise', 'Temps réel', 'Interface intuitive', 'Support expert'], '+40% ROAS, -25% CAC, +60% visibilité attribution', '3-5 semaines avec migration données');

INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('kpi-performance', 'market', '{"points": ["Expertise e-commerce", "IA avancée", "Attribution précise", "Support expert"]}', '{"points": ["Prix premium", "Complexité setup", "Dépendance data"]}', '{"points": ["Croissance e-commerce", "Privacy-first", "Automation marketing"]}', '{"points": ["Google Analytics 4", "Concurrents établis", "Régulations data"]}');

INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('kpi-performance', 'Olivier Chen', 'CEO ModaStyle', 'Très élevée', 'Favorable', ARRAY['Croissance', 'ROI'], 'Performance et croissance'),
('kpi-performance', 'Sandra Dubois', 'Directrice E-commerce', 'Élevée', 'Favorable', ARRAY['Conversion', 'UX'], 'Optimisation conversion et UX'),
('kpi-performance', 'Kevin Lambert', 'CTO', 'Moyenne', 'Neutre', ARRAY['Architecture', 'Performance'], 'Validation technique et intégration'),
('kpi-performance', 'Anaïs Moreau', 'Performance Manager', 'Moyenne', 'Très favorable', ARRAY['Campagnes', 'Attribution'], 'Optimisation campagnes et mesure');