-- Insert stakeholders data for retail-personalization scenario
INSERT INTO public.stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('retail-personalization', 'Thomas Martin', 'DSI', 'Élevée', 'Neutre', ARRAY['Sécurité', 'Intégration', 'Performance'], 'Démonstration technique approfondie'),
('retail-personalization', 'Sophie Leblanc', 'Directrice Générale', 'Très élevée', 'Positive', ARRAY['ROI', 'Timing', 'Ressources'], 'Business case solide avec métriques'),
('retail-personalization', 'Julien Rousseau', 'Responsable E-commerce', 'Modérée', 'Très positive', ARRAY['Formation équipe', 'Changement processus'], 'Formation et accompagnement'),
('retail-personalization', 'Équipe Développement', 'Équipe technique', 'Modérée', 'Neutre', ARRAY['Charge de travail', 'Nouvelles technologies'], 'Implication dans le projet');