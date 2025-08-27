-- Clean up duplicate products in retail-personalization scenario
DELETE FROM products 
WHERE scenario_id = 'retail-personalization' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY scenario_id, name ORDER BY created_at) as rn
    FROM products 
    WHERE scenario_id = 'retail-personalization'
  ) ranked WHERE rn = 1
);

-- Clean up duplicate interlocutors in fintech-startup scenario  
DELETE FROM interlocutors 
WHERE scenario_id = 'fintech-startup' 
AND id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY scenario_id, name ORDER BY created_at) as rn
    FROM interlocutors 
    WHERE scenario_id = 'fintech-startup'
  ) ranked WHERE rn = 1
);

-- Reduce stakeholders in retail-personalization from 12 to 5 (keep most relevant ones)
DELETE FROM stakeholders 
WHERE scenario_id = 'retail-personalization' 
AND id NOT IN (
  SELECT id FROM stakeholders 
  WHERE scenario_id = 'retail-personalization' 
  ORDER BY 
    CASE 
      WHEN role ILIKE '%CEO%' OR role ILIKE '%Director%' THEN 1
      WHEN role ILIKE '%Manager%' THEN 2
      WHEN role ILIKE '%Lead%' THEN 3
      ELSE 4
    END
  LIMIT 5
);

-- Add missing products for saas-hr-tool scenario
INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi, implementation_time)
VALUES 
(
  'saas-hr-tool',
  'TalentFlow Pro',
  'Solution complète de gestion RH avec IA pour automatiser le recrutement, la gestion des talents et l''évaluation des performances',
  '49€/mois jusqu''à 50 employés',
  '149€/mois jusqu''à 200 employés',
  'Sur devis pour 200+ employés',
  ARRAY['Recrutement automatisé par IA', 'Gestion des performances', 'Planification des équipes', 'Analytics RH avancés', 'Intégrations ERP'],
  ARRAY['IA propriétaire de matching candidats', 'Interface intuitive', 'Conformité RGPD native', 'Support client 24/7'],
  'ROI de 300% en 18 mois grâce à la réduction du temps de recrutement de 60%',
  '2-4 semaines selon la taille de l''entreprise'
),
(
  'saas-hr-tool',
  'TalentFlow Analytics',
  'Module d''analytics RH avancé pour optimiser les processus de recrutement et de rétention des talents',
  '29€/mois',
  '89€/mois avec rapports personnalisés',
  '199€/mois avec IA prédictive',
  ARRAY['Tableaux de bord en temps réel', 'Prédiction du turnover', 'Analyse de la performance', 'Rapports automatisés'],
  ARRAY['Algorithmes prédictifs uniques', 'Visualisations avancées', 'Intégration facile'],
  'Réduction de 40% du turnover grâce aux insights prédictifs',
  '1-2 semaines'
),
(
  'saas-hr-tool',
  'TalentFlow Mobile',
  'Application mobile pour les managers et employés avec fonctionnalités RH essentielles',
  'Inclus dans TalentFlow Pro',
  'Inclus dans TalentFlow Pro',
  'Inclus dans TalentFlow Pro',
  ARRAY['Approbation des congés', 'Suivi des performances mobiles', 'Chat d''équipe intégré', 'Notifications push'],
  ARRAY['Interface native iOS/Android', 'Mode hors-ligne', 'Sécurité biométrique'],
  'Amélioration de 25% de l''engagement employé via l''accessibilité mobile',
  'Déploiement immédiat'
);