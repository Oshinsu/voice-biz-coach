-- Mise à jour des interlocuteurs pour SportZone au lieu de Byss VNS
UPDATE interlocutors 
SET name = CASE 
  WHEN name = 'Marie Dubois' THEN 'Sophie Martin'
  WHEN name = 'Thomas Bernard' THEN 'Alexandre Rousseau'
  ELSE name
END,
role = CASE 
  WHEN role = 'Directrice Pédagogique' THEN 'Directrice Marketing'
  WHEN role = 'Directeur IT' THEN 'Directeur E-commerce'
  ELSE role
END,
personality = CASE 
  WHEN name = 'Marie Dubois' THEN 'Analytique et orientée ROI, exigeante sur les preuves de performance'
  WHEN name = 'Thomas Bernard' THEN 'Technique et pragmatique, focus sur l''intégration et la sécurité'
  ELSE personality
END,
experience = CASE 
  WHEN name = 'Marie Dubois' THEN '8 ans dans le retail sportif, spécialiste en transformation digitale'
  WHEN name = 'Thomas Bernard' THEN '12 ans en e-commerce, expert des solutions omnicanales'
  ELSE experience
END,
motivations = CASE 
  WHEN role = 'Directrice Pédagogique' THEN ARRAY['Augmenter le taux de conversion', 'Améliorer l''expérience client', 'Différenciation concurrentielle']
  WHEN role = 'Directeur IT' THEN ARRAY['Optimiser les performances techniques', 'Intégration fluide avec l''existant', 'Sécurité des données']
  ELSE motivations
END,
concerns = CASE 
  WHEN role = 'Directrice Pédagogique' THEN ARRAY['ROI incertain', 'Complexité de mise en œuvre', 'Résistance des équipes']
  WHEN role = 'Directeur IT' THEN ARRAY['Performance du système', 'Coût d''intégration', 'Maintenance technique']
  ELSE concerns
END,
priorities = CASE 
  WHEN role = 'Directrice Pédagogique' THEN ARRAY['Performance commerciale', 'Satisfaction client', 'Efficacité opérationnelle']
  WHEN role = 'Directeur IT' THEN ARRAY['Stabilité technique', 'Sécurité', 'Facilité de maintenance']
  ELSE priorities
END
WHERE scenario_id = 'retail-personalization';

-- Mise à jour des produits pour SportZone
UPDATE products 
SET name = 'SportAI Personal Shopper',
description = 'Solution d''IA avancée pour personnaliser l''expérience d''achat sportif en temps réel',
pricing_starter = '€2,500/mois - Jusqu''à 10,000 visiteurs/mois',
pricing_professional = '€7,500/mois - Jusqu''à 100,000 visiteurs/mois',
pricing_enterprise = '€15,000/mois - Visiteurs illimités + support premium',
key_features = ARRAY[
  'Recommandations IA en temps réel',
  'Personnalisation multi-canal (web, mobile, magasin)',
  'Analytics comportementaux avancés',
  'A/B testing automatisé',
  'Intégration CRM/ERP native',
  'Dashboard ROI en temps réel'
],
competitive_advantages = ARRAY[
  'Algorithme d''IA propriétaire spécialisé sport',
  'Intégration omnicanale complète',
  'ROI prouvé +35% en moyenne',
  'Déploiement en 4 semaines',
  'Support technique français'
],
roi = '+35% conversion, +28% panier moyen, +42% fidélisation',
implementation_time = '4-6 semaines avec formation incluse'
WHERE scenario_id = 'retail-personalization';

-- Mise à jour des stakeholders pour SportZone
UPDATE stakeholders 
SET name = CASE 
  WHEN name = 'Paul Leclerc' THEN 'David Mercier'
  WHEN name = 'Isabelle Moreau' THEN 'Céline Blanchard'
  WHEN name = 'Jean-Marc Rousseau' THEN 'Julien Fabre'
  WHEN name = 'Caroline Petit' THEN 'Nathalie Girard'
  WHEN name = 'Michel Leroy' THEN 'Patrick Lemoine'
  WHEN name = 'Anne Lambert' THEN 'Valérie Moreau'
  WHEN name = 'Pierre Simon' THEN 'Marc Lefebvre'
  WHEN name = 'Sophie Garnier' THEN 'Émilie Roux'
  WHEN name = 'Laurent Fournier' THEN 'Thierry Vincent'
  WHEN name = 'Sylvie Mercier' THEN 'Sandrine Perez'
  WHEN name = 'Antoine Morel' THEN 'Christophe Nguyen'
  WHEN name = 'Nathalie Durand' THEN 'Amélie Bertrand'
  ELSE name
END,
role = CASE 
  WHEN role = 'Président ESCAP' THEN 'PDG SportZone'
  WHEN role = 'VP Académique' THEN 'Directeur Général'
  WHEN role = 'Directeur Finances' THEN 'Directeur Financier'
  WHEN role = 'Responsable Innovation' THEN 'Directeur Innovation'
  WHEN role = 'Représentant Enseignants' THEN 'Responsable Merchandising'
  WHEN role = 'Responsable Communication' THEN 'Directeur Communication'
  WHEN role = 'Directeur Technique' THEN 'DSI'
  WHEN role = 'Coordinatrice Pédagogique' THEN 'Responsable Formation'
  WHEN role = 'Administrateur Système' THEN 'Administrateur IT'
  WHEN role = 'Responsable Qualité' THEN 'Directeur Qualité'
  WHEN role = 'Chargé Relations Entreprises' THEN 'Directeur Partenariats'
  WHEN role = 'Responsable Étudiants' THEN 'Directeur Expérience Client'
  ELSE role
END
WHERE scenario_id = 'retail-personalization';