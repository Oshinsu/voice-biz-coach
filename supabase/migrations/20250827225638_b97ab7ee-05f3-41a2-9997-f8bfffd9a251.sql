-- Corriger l'erreur de syntaxe et continuer l'enrichissement

-- MANUFACTURING IOT - Corriger la ligne avec l'erreur
INSERT INTO products (scenario_id, name, description, pricing_starter, pricing_professional, pricing_enterprise, key_features, competitive_advantages, roi) VALUES
('manufacturing-iot', 'Supply Chain Intelligence', 'Intelligence supply chain avec tracking temps réel, prédiction disruptions et optimisation stocks multi-sites.', '2000€/mois', '10000€/mois', '35000€/mois', ARRAY['Tracking temps réel', 'Prédiction disruptions', 'Optimisation stocks multi-sites', 'Supplier risk scoring', 'Scenario planning'], ARRAY['Prédiction disruptions 90% précision', 'Optimisation multi-contraintes', 'Risk scoring automatique'], 'Réduction stocks 30%, amélioration service 20%, mitigation risques supply');

-- ENRICHISSEMENT SWOT ANALYSES - 5-6 par scénario

-- FINTECH STARTUP SWOT
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats, market_data, porter_analysis, pestel_analysis) VALUES
('fintech-startup', 'company', 
'{"innovation": "API-first architecture révolutionnaire", "technical": "Équipe CTO ex-Google/Stripe", "market": "Traction 150+ clients en 18 mois", "financial": "Series A 15M€ Sequoia Capital"}',
'{"competition": "Concurrents établis (Stripe, Adyen)", "regulation": "Compliance PCI DSS complexe", "talent": "Guerre des talents tech", "scale": "Infrastructure scaling challenges"}',
'{"market": "Marché fintech EU 240Md€ en 2025", "regulation": "PSD2/PSD3 favorable innovation", "partnerships": "Partenariats néobanques", "international": "Expansion US/APAC prévue"}',
'{"regulation": "Durcissement réglementation", "competition": "Guerre des prix", "economic": "Récession impact fintech", "cyber": "Risques cybersécurité accrus"}',
'{"market_size": "240Md€", "growth_rate": "15%/an", "penetration": "35%", "key_players": ["Stripe", "Adyen", "Checkout"]}',
'{"suppliers": "Low - cloud providers", "buyers": "Medium - fintech clients", "substitutes": "High - traditional banks", "entrants": "High - low barriers", "rivalry": "Very High"}',
'{"political": "Favorable innovation", "economic": "Inflation impact", "social": "Digital adoption", "technological": "AI/ML trends", "environmental": "Green fintech", "legal": "GDPR/PSD2"}'),

('fintech-startup', 'product', 
'{"performance": "Latence 50ms vs 200ms marché", "features": "Anti-fraude IA temps réel", "integration": "2 lignes de code", "support": "24h/7j français"}',
'{"pricing": "Premium pricing vs low-cost", "complexity": "Courbe apprentissage API", "documentation": "Documentation technique", "adoption": "Changement providers difficile"}',
'{"ai": "IA générative pour compliance", "international": "Multi-devises 150+ pays", "verticals": "Spécialisation secteurs", "mobile": "SDK mobile natif"}',
'{"commoditization": "Commoditisation APIs", "regulation": "Nouvelles régulations", "opensource": "Alternatives open-source", "giants": "GAFAM entrée directe"}',
'{"nps": "78 (très bon)", "churn": "5%/an", "upsell": "45%", "integration_time": "2 semaines vs 6 mois"}',
'{"suppliers": "Dépendance AWS/GCP", "buyers": "Switching costs élevés", "substitutes": "Solutions internes", "entrants": "Barrières techniques", "rivalry": "Différenciation IA"}',
'{"regulation": "Open banking favorable", "innovation": "Continuous delivery", "security": "Zero-trust required", "performance": "Real-time expectations"}');

-- RETAIL PERSONALIZATION SWOT
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('retail-personalization', 'company',
'{"technology": "Deep learning propriétaire", "data": "50M+ profils clients", "performance": "+42% conversion", "team": "Équipe ex-Amazon/Google"}',
'{"market_share": "Nouveau entrant vs Adobe/Salesforce", "funding": "Besoin Series B 25M€", "sales": "Équipe commerciale junior", "brand": "Notoriété faible"}',
'{"market": "Marché personnalisation 8Md€", "trends": "Zero-party data trends", "partnerships": "Intégrations e-commerce", "international": "Expansion EMEA"}',
'{"privacy": "Durcissement RGPD", "competition": "Adobe/Google concurrence", "economic": "Récession retail", "technology": "Cookies tiers disparition"}'),

('retail-personalization', 'market',
'{"size": "Marché EU personnalisation 8Md€", "growth": "Croissance 22%/an", "drivers": "Attentes consommateurs", "maturity": "Adoption croissante"}',
'{"saturation": "Saturation pure-players", "complexity": "Intégrations complexes", "costs": "Coûts acquisition élevés", "regulation": "RGPD contraignant"}',
'{"omnichannel": "Unification online/offline", "ai": "IA générative contenu", "voice": "Commerce vocal", "social": "Social commerce"}',
'{"recession": "Budgets marketing serrés", "consolidation": "Consolidation acteurs", "regulation": "Fin cookies tiers", "competition": "Big Tech dominance"}');

-- DIGITAL AGENCY SWOT
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('digital-agency', 'company',
'{"expertise": "15+ ans marketing digital", "clients": "Portefeuille Fortune 500", "team": "120 experts certifiés", "innovation": "R&D 15% CA"}',
'{"scalability": "Modèle services intensif", "margin": "Marges sous pression", "talent": "Rétention talents", "geographic": "Concentration France"}',
'{"ai": "IA générative révolution", "data": "Marketing data-driven", "automation": "Automatisation workflows", "international": "Expansion EU"}',
'{"competition": "Consulting big4 entrée", "automation": "Automatisation menace emplois", "economic": "Récession budgets marketing", "regulation": "RGPD complexité"}'),

('digital-agency', 'market',
'{"size": "Marché marketing digital 45Md€", "growth": "12%/an croissance", "digital": "Digitalisation accélérée", "performance": "ROI measurement focus"}',
'{"saturation": "Marché saturé agencies", "pressure": "Pression prix", "skills": "Gap compétences IA", "client": "Clients volatils"}',
'{"ecommerce": "E-commerce boom", "b2b": "B2B digitalization", "sustainability": "Marketing durable", "personalization": "Hyper-personnalisation"}',
'{"recession": "Budgets premiers coupés", "inhouse": "Internalisation clients", "bigtech": "Google/Meta dominance", "automation": "No-code tools"}');

-- CYBERSECURITY CONSULTING SWOT  
INSERT INTO swot_analyses (scenario_id, analysis_type, strengths, weaknesses, opportunities, threats) VALUES
('cybersecurity-consulting', 'company',
'{"expertise": "Équipe ethical hackers", "certifications": "ISO27001/SOC2", "clients": "CAC40 références", "innovation": "Threat intelligence propriétaire"}',
'{"scale": "Taille vs Big4", "international": "Présence limitée EU", "automation": "Processes manuels", "marketing": "Visibilité marché"}',
'{"regulation": "NIS2 compliance obligatoire", "threats": "Cybermenaces croissantes", "cloud": "Migration cloud sécurisée", "ai": "AI security nouveau"}',
'{"competition": "Consolidation marché", "talent": "Guerre talents cyber", "commoditization": "Solutions automatisées", "economic": "Budgets IT réduits"}'),

('cybersecurity-consulting', 'market',
'{"growth": "Marché cyber 28%/an", "regulation": "NIS2/GDPR drivers", "awareness": "Sensibilisation dirigeants", "investment": "Budgets sécurité prioritaires"}',
'{"complexity": "Solutions complexes", "skills": "Pénurie compétences", "false_positives": "Alert fatigue", "costs": "Coûts élevés PME"}',
'{"zerotrust": "Zero Trust architecture", "cloud": "Cloud security", "iot": "IoT security", "ai": "AI-powered defense"}',
'{"nation_state": "Attaques étatiques", "ransomware": "Ransomware sophistiqués", "supply_chain": "Supply chain attacks", "regulation": "Compliance burden"}');

-- STAKEHOLDERS enrichment pour tous les scénarios
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
-- FINTECH STARTUP stakeholders
('fintech-startup', 'Chief Technology Officer', 'Décideur technique final', 'High', 'Neutral', ARRAY['Sécurité API', 'Performance scaling', 'Coûts infrastructure'], 'Démo technique approfondie, architecture review'),
('fintech-startup', 'VP Engineering', 'Influenceur technique', 'High', 'Positive', ARRAY['Complexité intégration', 'Maintenance long-terme'], 'Focus sur developer experience, documentation'),
('fintech-startup', 'Chief Financial Officer', 'Contrôleur budget', 'High', 'Skeptical', ARRAY['ROI unclear', 'Coûts cachés', 'Lock-in vendor'], 'Business case solide, références clients'),
('fintech-startup', 'Head of Compliance', 'Validateur réglementaire', 'Medium', 'Neutral', ARRAY['Conformité PCI DSS', 'Audit trails', 'Risques réglementaires'], 'Certification compliance, audit reports'),

-- RETAIL PERSONALIZATION stakeholders  
('retail-personalization', 'Chief Marketing Officer', 'Sponsor principal', 'High', 'Positive', ARRAY['ROI marketing', 'Customer privacy', 'Change management'], 'KPIs marketing, case studies secteur'),
('retail-personalization', 'Head of E-commerce', 'Utilisateur final', 'High', 'Positive', ARRAY['Impact conversion', 'Intégration technique', 'User experience'], 'A/B tests résultats, démo personnalisation'),
('retail-personalization', 'IT Director', 'Validateur technique', 'Medium', 'Neutral', ARRAY['Sécurité données', 'Performance site', 'Complexité maintenance'], 'Architecture technique, security review'),
('retail-personalization', 'Data Protection Officer', 'Contrôleur RGPD', 'Medium', 'Skeptical', ARRAY['Conformité RGPD', 'Consent management', 'Data minimization'], 'Privacy by design, compliance documentation');

-- DIGITAL AGENCY stakeholders
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('digital-agency', 'Chief Marketing Officer', 'Décideur final marketing', 'High', 'Positive', ARRAY['ROI campaigns', 'Agency performance', 'Innovation'], 'Performance metrics, innovation showcase'),
('digital-agency', 'Digital Marketing Manager', 'Utilisateur quotidien', 'High', 'Positive', ARRAY['Ease of use', 'Campaign efficiency', 'Learning curve'], 'Hands-on training, user interface'),
('digital-agency', 'Chief Financial Officer', 'Contrôleur budgets', 'Medium', 'Neutral', ARRAY['Cost efficiency', 'Contract terms', 'Hidden costs'], 'Cost-benefit analysis, transparent pricing'),
('digital-agency', 'IT Security Manager', 'Validateur sécurité', 'Medium', 'Skeptical', ARRAY['Data security', 'Access controls', 'Compliance'], 'Security certifications, access management');

-- CYBERSECURITY CONSULTING stakeholders
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('cybersecurity-consulting', 'Chief Information Security Officer', 'Décideur sécurité', 'High', 'Positive', ARRAY['Threat coverage', 'Response time', 'False positives'], 'Threat intelligence, SLA guarantees'),
('cybersecurity-consulting', 'IT Operations Manager', 'Utilisateur système', 'High', 'Neutral', ARRAY['Operational impact', 'Alert fatigue', 'Integration complexity'], 'Operational efficiency, smooth integration'),
('cybersecurity-consulting', 'Chief Executive Officer', 'Sponsor budget', 'High', 'Neutral', ARRAY['Business impact', 'Regulatory compliance', 'ROI security'], 'Business risk mitigation, compliance assurance'),
('cybersecurity-consulting', 'Chief Financial Officer', 'Contrôleur investissement', 'Medium', 'Skeptical', ARRAY['Security ROI', 'Insurance impact', 'Budget allocation'], 'Insurance premium reduction, risk quantification');

-- KPI PERFORMANCE stakeholders
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('kpi-performance', 'Chief Executive Officer', 'Sponsor exécutif', 'High', 'Positive', ARRAY['Decision speed', 'Data accuracy', 'Executive dashboard'], 'Executive dashboards, decision impact'),
('kpi-performance', 'Chief Data Officer', 'Validateur données', 'High', 'Positive', ARRAY['Data quality', 'Governance', 'Analytics accuracy'], 'Data governance, quality metrics'),
('kpi-performance', 'Chief Financial Officer', 'Utilisateur finances', 'High', 'Neutral', ARRAY['Financial accuracy', 'Audit trails', 'Compliance reporting'], 'Financial controls, audit capabilities'),
('kpi-performance', 'Business Intelligence Manager', 'Utilisateur technique', 'Medium', 'Positive', ARRAY['Tool complexity', 'User adoption', 'Training needs'], 'User experience, training programs');

-- MANUFACTURING IOT stakeholders
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('manufacturing-iot', 'Chief Operations Officer', 'Sponsor opérationnel', 'High', 'Positive', ARRAY['Production efficiency', 'Downtime reduction', 'ROI operational'], 'Operational KPIs, efficiency gains'),
('manufacturing-iot', 'Plant Manager', 'Utilisateur terrain', 'High', 'Positive', ARRAY['Worker safety', 'Implementation disruption', 'Training requirements'], 'Safety improvements, smooth rollout'),
('manufacturing-iot', 'IT Director', 'Validateur infrastructure', 'Medium', 'Neutral', ARRAY['Network security', 'System integration', 'Scalability'], 'IT architecture, security protocols'),
('manufacturing-iot', 'Maintenance Manager', 'Bénéficiaire direct', 'Medium', 'Positive', ARRAY['Predictive accuracy', 'False alarms', 'Workflow changes'], 'Maintenance optimization, accuracy metrics');

-- SAAS HR TOOL stakeholders
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('saas-hr-tool', 'Chief Human Resources Officer', 'Sponsor RH principal', 'High', 'Positive', ARRAY['Employee experience', 'HR efficiency', 'Compliance'], 'HR metrics, employee satisfaction'),
('saas-hr-tool', 'HR Business Partner', 'Utilisateur quotidien', 'High', 'Positive', ARRAY['Tool usability', 'Manager adoption', 'Process changes'], 'User training, process optimization'),
('saas-hr-tool', 'Chief Technology Officer', 'Validateur technique', 'Medium', 'Neutral', ARRAY['Data security', 'System integration', 'Scalability'], 'Technical architecture, security review'),
('saas-hr-tool', 'Chief Financial Officer', 'Contrôleur budget RH', 'Medium', 'Skeptical', ARRAY['HR ROI', 'Implementation costs', 'Vendor lock-in'], 'ROI calculation, cost transparency');

-- INDUSTRIAL MARKETPLACE stakeholders
INSERT INTO stakeholders (scenario_id, name, role, influence, support, concerns, approach) VALUES
('industrial-marketplace', 'Chief Procurement Officer', 'Décideur achats', 'High', 'Positive', ARRAY['Supplier quality', 'Cost savings', 'Process efficiency'], 'Procurement metrics, supplier performance'),
('industrial-marketplace', 'Purchasing Manager', 'Utilisateur achats', 'High', 'Positive', ARRAY['Platform usability', 'Supplier onboarding', 'Negotiation tools'], 'User experience, supplier network'),
('industrial-marketplace', 'Chief Financial Officer', 'Contrôleur savings', 'Medium', 'Neutral', ARRAY['Cost transparency', 'Payment terms', 'Financial controls'], 'Financial benefits, payment security'),
('industrial-marketplace', 'Supply Chain Manager', 'Gestionnaire supply', 'Medium', 'Positive', ARRAY['Supply continuity', 'Risk management', 'Logistics integration'], 'Supply chain optimization, risk mitigation');