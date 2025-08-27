-- Enrichissement complet du scénario Fintech avec données SWOT et analyses manquantes

-- 1. Insertion des analyses SWOT pour fintech-startup
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats, market_data, porter_analysis, pestel_analysis) VALUES 
('fintech-startup', 'complete', 
-- Strengths
'{"internal_strengths": [
  "Équipe technique experte (PhD IA + 12 ans fintech)",
  "Algorithmes propriétaires différenciants",
  "Agilité startup vs grandes banques",
  "Vision produit claire et focus",
  "Conformité RGPD native",
  "Stack technique moderne et scalable"
]}',
-- Weaknesses  
'{"internal_weaknesses": [
  "Ressources financières limitées vs géants tech",
  "Équipe réduite (scaling challenge)",
  "Notoriété marque faible",
  "Absence d\\''historique long terme",
  "Dépendance fondateurs clés",
  "Coûts R&D élevés"
]}',
-- Opportunities
'{"market_opportunities": [
  "Marché crédit EU: €12.5Tn en croissance",
  "Transformation digitale accélérée post-COVID",
  "Régulation Open Banking favorable",
  "Nouvelles sources données (IoT, mobile)",
  "Demande IA explicable en forte hausse",
  "Partenariats fintechs-banques traditionnelles"
]}',
-- Threats
'{"external_threats": [
  "BigTech (Google, Amazon) entrée marché",
  "Banques traditionnelles rattrapage IA",
  "Durcissement réglementaire GDPR/AIA",
  "Volatilité financement startup tech",
  "Concurrence pure-players établis",
  "Risque talent war IA"
]}',
-- Market Data
'{"market_size": "€12.5Tn marché crédit EU", 
  "growth_rate": "+15% annuel IA fintech", 
  "key_players": ["Experian", "FICO", "Zest AI", "Kabbage"],
  "regulatory_environment": "GDPR, AIA Act, PSD2, Basel III",
  "technological_trends": ["Explainable AI", "Real-time scoring", "Alternative data", "Edge computing"]
}',
-- Porter Analysis
'{"competitive_forces": {
  "new_entrants": "ÉLEVÉ - Barrières technologiques faibles, capital-risque abondant",
  "suppliers": "MOYEN - Dépendance AWS/GCP, mais alternatives existent", 
  "buyers": "ÉLEVÉ - Banques ont fort pouvoir négociation, switching costs élevés",
  "substitutes": "ÉLEVÉ - Solutions internes, consulting, concurrents directs",
  "competitive_rivalry": "TRÈS ÉLEVÉ - Marché fragmenté, innovation constante"
}}',
-- PESTEL Analysis  
'{"macro_environment": {
  "political": "Régulation IA Act 2024, Brexit impacts, souveraineté numérique EU",
  "economic": "Inflation impact financement, taux intérêt volatils, récession tech",
  "social": "Acceptation IA croissante, préoccupations privacy, inclusion financière", 
  "technological": "LLMs, edge computing, quantum computing threat/opportunity",
  "environmental": "Green finance, ESG scoring, carbon footprint algorithmes",
  "legal": "GDPR strict, AI Act, responsabilité algorithmes, audit trails obligatoires"
}}'
);

-- 2. Enrichissement des données produits techniques
UPDATE products SET 
technical_specs = '{
  "architecture": {
    "deployment": "Cloud-native Kubernetes",
    "scalability": "Auto-scaling 10K-10M requests/day", 
    "latency": "<50ms scoring API response",
    "availability": "99.99% SLA multi-region"
  },
  "ai_models": {
    "algorithms": ["XGBoost optimisé", "Deep Neural Networks", "Ensemble Methods"],
    "training_data": "50M+ credit histories, 500+ features",
    "accuracy": "92% vs 76% traditional scoring",
    "bias_mitigation": "Fairness algorithms intégrés"
  },
  "security": {
    "encryption": "AES-256 at rest, TLS 1.3 in transit",
    "compliance": ["GDPR", "PCI DSS", "SOC 2 Type II"], 
    "auditing": "Immutable audit trails",
    "access_control": "Zero-trust architecture"
  },
  "integration": {
    "apis": "RESTful + GraphQL",
    "formats": "JSON, XML, CSV bulk",
    "connectors": "Core banking systems, CRMs",
    "webhook_support": "Real-time notifications"
  }
}'
WHERE scenario_id = 'fintech-startup' AND name = 'CreditAI Engine';

UPDATE products SET
market_positioning = '{
  "target_segments": ["Neo-banks", "Traditional banks digital", "Lending platforms", "Fintech B2B"],
  "value_proposition": "Scoring crédit 10x plus précis avec IA explicable et conformité native",
  "competitive_advantage": "Seule solution combinant précision IA + explicabilité réglementaire + time-to-market rapide",
  "pricing_strategy": "Value-based pricing aligné sur réduction défauts mesurée"
}',
marketing_plan = '{
  "go_to_market": {
    "phase_1": "Proof of concept avec 3 neo-banks partenaires", 
    "phase_2": "Expansion banques tier-2 européennes",
    "phase_3": "Enterprise grandes banques internationales"
  },
  "sales_channels": ["Direct sales", "Partner ecosystem", "API marketplace"],
  "key_messages": ["IA explicable", "ROI mesuré", "Compliance native", "Time-to-market rapide"],
  "success_metrics": ["ARR growth", "Logo acquisition", "NPS score", "Time-to-value"]
}'
WHERE scenario_id = 'fintech-startup' AND name = 'CreditAI Engine';

-- 3. Ajout stakeholders fintech manquants
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('fintech-startup', 'Sarah Martinez', 'CPO (Chief Product Officer)', 'Forte - Vision produit', 'Favorable si roadmap claire', 
 ARRAY['Time-to-market', 'User experience', 'Product-market fit'], 
 'Démontrer impact sur KPIs produit et satisfaction utilisateur'),
 
('fintech-startup', 'Michael Thompson', 'CFO', 'Très forte - Budget final', 'Sceptique - ROI à prouver',
 ARRAY['Coût total possession', 'ROI timeline', 'Cash flow impact'],
 'Business case détaillé avec métriques financières précises'),
 
('fintech-startup', 'Emma Wilson', 'Head of Compliance', 'Moyenne - Validation réglementaire', 'Neutre - Besoin assurance',
 ARRAY['Conformité réglementaire', 'Audit trails', 'Responsabilité légale'],
 'Certification conformité et documentation audit complète'),
 
('fintech-startup', 'David Kumar', 'Head of Engineering', 'Forte - Implémentation technique', 'Favorable si architecture solide',
 ARRAY['Scalabilité', 'Maintenance', 'Team bandwidth'],
 'Architecture review et plan intégration détaillé');

-- 4. Mise à jour des informations scenario principal  
UPDATE scenarios SET
pain_points = ARRAY[
  'Modèles scoring crédit traditionnels peu précis (76% accuracy)',
  'Taux de défaut élevé impactant la rentabilité (8.5% vs 5% cible)', 
  'Manque données alternatives pour populations underbanked',
  'Processus d''approbation crédit trop long (5-7 jours)',
  'Difficulté conformité réglementaire IA (GDPR, AI Act)',
  'Coûts de faux positifs/négatifs très élevés'
],
main_objectives = ARRAY[
  'Réduire taux défaut crédit de 40% minimum',
  'Améliorer précision scoring à 90%+ avec IA',
  'Accélérer processus approbation sous 24h',
  'Maintenir conformité réglementaire stricte',
  'Augmenter volume approbations de 25%',
  'ROI positif en moins de 12 mois'
],
available_tools = ARRAY[
  'Système scoring legacy FICO basique',
  'Données crédit bureaux traditionnels',
  'CRM Salesforce avec API basiques', 
  'Core banking system maison',
  'Dashboard BI Tableau existant',
  'Infrastructure AWS en cours modernisation'
]
WHERE id = 'fintech-startup';