export interface Company {
  name: string;
  sector: string;
  size: string;
  revenue: string;
  location: string;
  description: string;
  painPoints: string[];
  currentSolution: string;
  budget: string;
  timeline: string;
}

export interface Interlocutor {
  name: string;
  role: string;
  personality: string;
  communicationStyle: string;
  decisionPower: string;
  priorities: string[];
  concerns: string[];
  motivations: string[];
  experience: string;
}

export interface Product {
  name: string;
  description: string;
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
  };
  keyFeatures: string[];
  competitiveAdvantages: string[];
  roi: string;
  implementationTime: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  company: Company;
  interlocutor: Interlocutor;
  product: Product;
  objectives: string[];
  salesGoal: string;
  expectedRevenue: string;
  swot: SwotAnalysis;
  competitorSwot: SwotAnalysis;
  probableObjections: string[];
  successCriteria: string[];
  tools: string[];
  difficulty: "Facile" | "Moyen" | "Difficile";
  probability: number;
}

export const scenarios: Scenario[] = [
  {
    id: "kpi-performance",
    title: "Optimisation Analytics E-commerce",
    description: "Vendre une plateforme d'analytics avancée à un e-commerce en croissance",
    difficulty: "Moyen",
    probability: 75,
    company: {
      name: "ModaStyle",
      sector: "E-commerce Mode",
      size: "50 employés",
      revenue: "8M€/an",
      location: "Lyon, France",
      description: "E-commerce spécialisé dans la mode éthique et durable, fondé en 2018 par Clara Dubois, ancienne acheteuse chez Zara. Pionnier français du commerce équitable en ligne avec 12 marques partenaires certifiées GOTS. Croissance de 45% en 2023, présence en France, Belgique et Suisse. Stack technique : Shopify Plus, Klaviyo pour l'email, Meta Ads et Google Ads. Équipe de 50 personnes répartie entre Lyon (siège), entrepôt Rillieux-la-Pape et télétravail. Ambition : devenir leader européen de la mode éthique d'ici 2027.",
      painPoints: [
        "Attribution marketing fragmentée : impossible de savoir si une vente vient de Google, Facebook, email ou influenceurs", 
        "Taux de churn de 23% sans comprendre les signaux précurseurs de départ",
        "Budget publicitaire de 80k€/mois mal optimisé faute de visibilité cross-canal",
        "Équipe marketing frustrée de passer 40% de son temps sur des rapports manuels",
        "Retours produits de 12% avec peu d'insights sur les raisons",
        "Saisonnalité imprévisible malgré 5 ans d'historique"
      ],
      currentSolution: "Google Analytics 4 + Google Ads + Facebook Business Manager + Klaviyo + 15 fichiers Excel consolidés manuellement chaque semaine par Sophie Martin",
      budget: "15-25k€/an pour analytics (budget total marketing 1M€)",
      timeline: "Q1 2024 - urgence car lancement collection printemps"
    },
    interlocutor: {
      name: "Sophie Martin",
      role: "Directrice Marketing & Analytics",
      personality: "Perfectionniste data-driven, impatiente face à l'inefficacité, adore les dashboards et métriques. Workaholic assumée qui vérifie ses KPIs le dimanche soir. Frustrée de ne pas avoir les bonnes données pour prendre des décisions rapides.",
      communicationStyle: "Directe et chiffrée. Coupe court aux discussions sans données. Pose 3 questions précises par minute en rendez-vous. Adore les graphiques et déteste les présentations PowerPoint fleuves. Prend des notes sur son iPad avec Apple Pencil.",
      decisionPower: "Décisionnaire jusqu'à 30k€, validation CEO Clara Dubois au-delà. Influence forte sur la roadmap tech et budgets marketing.",
      priorities: [
        "Attribution précise du ROI par canal marketing", 
        "Réduction du CAC (actuellement 47€, objectif 35€)",
        "Prédiction du churn client pour actions préventives",
        "Automatisation des reportings hebdomadaires",
        "Optimisation des budgets publicitaires en temps réel"
      ],
      concerns: [
        "Temps d'implémentation : ne peut pas se permettre 2 mois sans data",
        "Formation équipe : Jules (traffic manager) et Amélie (CRM) peu techniques",
        "Intégration avec Shopify Plus sans casser les conversions actuelles", 
        "Fiabilité des prédictions IA : a été échaudée par un outil précédent"
      ],
      motivations: [
        "Reconnaissance professionnelle : veut être promue VP Growth en 2024",
        "Performance financière : bonus indexé sur l'amélioration du ROAS",
        "Passion data : ancienne consultante chez Converteo, fascinée par les corrélations"
      ],
      experience: "8 ans en marketing digital : 3 ans chez Converteo (conseil), 2 ans chez Spartoo (e-commerce), 3 ans chez ModaStyle. MBA HEC spécialisation Marketing Quantitatif. Certification Google Analytics, certifiée Facebook Blueprint."
    },
    product: {
      name: "DataTrack Pro",
      description: "Plateforme d'attribution marketing et analytics prédictive spécialement conçue pour les e-commerces omni-canal. IA propriétaire entraînée sur 500M+ de sessions e-commerce. Connecteurs natifs avec 200+ outils marketing. Déploiement sans code en 24h.",
      pricing: {
        starter: "299€/mois (jusqu'à 100k sessions/mois, 5 canaux)",
        professional: "599€/mois (jusqu'à 500k sessions/mois, canaux illimités, IA prédictive)", 
        enterprise: "1200€/mois (sessions illimitées, white-label, API dédiée, CSM)"
      },
      keyFeatures: [
        "Attribution multi-touch avec modèles Shapley et Data-Driven",
        "Prédiction de churn avec 89% de précision (30j avant)",
        "Optimisation budgets publicitaires en temps réel via algorithmes génétiques",
        "Segmentation automatique de la clientèle (RFM enrichi)",
        "Calcul de LTV prédictive par cohorte et segment",
        "Alertes intelligentes sur les anomalies de performance",
        "Tableau de bord temps réel avec 50+ métriques e-commerce",
        "Recommandations IA d'actions marketing (quotidiennes)",
        "Tests A/B automatisés sur les campagnes",
        "Intégration native Shopify, Klaviyo, Meta, Google, TikTok"
      ],
      competitiveAdvantages: [
        "Setup sans code en 24h vs 2-6 semaines pour Northbeam/Triple Whale",
        "IA propriétaire 30% plus précise que Google Analytics 4 sur l'attribution",
        "Support français avec CSM dédié vs support international",
        "Coût 60% inférieur à Northbeam pour fonctionnalités équivalentes",
        "Spécialisation mode/lifestyle : connaît les saisonnalités secteur"
      ],
      roi: "Clients moyens : +47% ROAS, -23% CAC, +12% LTV en 6 mois. Retour investissement 312% première année.",
      implementationTime: "24h setup + 1 semaine calibrage IA + formation équipe"
    },
    objectives: ["Démontrer la valeur du tracking unifié", "Quantifier les pertes actuelles"],
    salesGoal: "Contrat Pro à 599€/mois (12 mois)",
    expectedRevenue: "7,188€",
    swot: {
      strengths: [
        "IA propriétaire entraînée sur 500M+ sessions e-commerce (impact: 9/10, probabilité: 9/10)",
        "Setup en 24h vs 2-6 semaines concurrence (impact: 8/10, probabilité: 10/10)",
        "Spécialisation e-commerce mode/lifestyle avec use cases sectoriels (impact: 7/10, probabilité: 8/10)",
        "Support client français avec CSM dédiés (impact: 6/10, probabilité: 9/10)",
        "Prix 60% inférieur à Northbeam/Triple Whale (impact: 8/10, probabilité: 10/10)",
        "Connecteurs natifs avec 200+ outils marketing sans développement (impact: 7/10, probabilité: 9/10)",
        "ROI prouvé : +47% ROAS moyen chez clients similaires (impact: 9/10, probabilité: 8/10)"
      ],
      weaknesses: [
        "Startup de 2 ans vs acteurs établis depuis 10+ ans (impact: 6/10, probabilité: 8/10)",
        "Prix premium vs Google Analytics gratuit (impact: 7/10, probabilité: 9/10)",
        "Équipe technique de 12 personnes vs 200+ chez Salesforce (impact: 5/10, probabilité: 7/10)",
        "Pas encore de certification ISO 27001 (impact: 4/10, probabilité: 6/10)",
        "Fonctionnalités avancées encore en développement (impact: 5/10, probabilité: 6/10)"
      ],
      opportunities: [
        "Marché attribution marketing croît de 23% par an (impact: 9/10, probabilité: 9/10)",
        "iOS 14.5 et cookieless obligent à repenser l'attribution (impact: 8/10, probabilité: 10/10)",
        "ModaStyle a un besoin urgent Q1 2024 (impact: 9/10, probabilité: 8/10)",
        "Frustration client avec setup complexe des concurrents (impact: 7/10, probabilité: 8/10)",
        "Budget marketing 1M€ permet investissement analytics (impact: 8/10, probabilité: 7/10)"
      ],
      threats: [
        "Northbeam, Triple Whale avec 5-10M$ de funding (impact: 7/10, probabilité: 8/10)",
        "Google Analytics 4 s'améliore constamment (impact: 6/10, probabilité: 9/10)",
        "Solutions open-source comme PostHog gagnent en maturité (impact: 5/10, probabilité: 6/10)",
        "Recession économique réduit budgets outils marketing (impact: 8/10, probabilité: 4/10)",
        "Réglementation RGPD/DMA peut limiter tracking (impact: 6/10, probabilité: 7/10)"
      ]
    },
    competitorSwot: {
      strengths: [
        "Google Analytics 4 gratuit et universellement connu (impact: 8/10, probabilité: 10/10)",
        "Équipe maîtrise déjà Excel et process actuels (impact: 6/10, probabilité: 10/10)",
        "Coût total actuel proche de zéro (impact: 7/10, probabilité: 10/10)",
        "Données historiques de 5 ans dans GA4 (impact: 6/10, probabilité: 9/10)"
      ],
      weaknesses: [
        "Attribution multi-touch impossible dans GA4 (impact: 9/10, probabilité: 10/10)",
        "Aucune prédiction de churn ou LTV (impact: 8/10, probabilité: 10/10)",
        "Reporting manuel chronophage : 2j/semaine perdus (impact: 7/10, probabilité: 10/10)",
        "Données en silos : impossible de croiser Facebook + Google + Klaviyo (impact: 8/10, probabilité: 10/10)",
        "Optimisation budgets publicitaires reactive, pas proactive (impact: 7/10, probabilité: 9/10)"
      ],
      opportunities: [
        "Économies immédiates sans nouvel outil (impact: 6/10, probabilité: 10/10)",
        "Pas de formation équipe requise (impact: 4/10, probabilité: 10/10)",
        "Contrôle total des données (impact: 5/10, probabilité: 8/10)"
      ],
      threats: [
        "Concurrents ModaStyle utilisent des outils plus avancés (impact: 8/10, probabilité: 7/10)",
        "Mauvaises décisions marketing faute de data fiable (impact: 9/10, probabilité: 8/10)",
        "Perte de 23% des clients sans signaux d'alerte (impact: 9/10, probabilité: 9/10)",
        "ROAS stagnant alors que budgets publicitaires augmentent (impact: 8/10, probabilité: 8/10)"
      ]
    },
    probableObjections: ["C'est trop cher pour nous", "Google Analytics suffit"],
    successCriteria: ["Démonstration des pertes actuelles", "ROI chiffré présenté"],
    tools: ["calc_kpi", "score_phase"]
  },
  {
    id: "saas-crm",
    title: "Solution CRM pour PME",
    description: "Vendre un CRM innovant à une PME en croissance rapide",
    difficulty: "Facile",
    probability: 85,
    company: {
      name: "TechServices",
      sector: "Services IT",
      size: "25 employés",
      revenue: "3M€/an",
      location: "Lille, France",
      description: "ESN spécialisée dans l'accompagnement digital des PME depuis 2015. Fondée par Marc Dubois et Thomas Leroy, deux anciens consultants d'Accenture. Expertise : migration cloud, cybersécurité, digitalisation processus métier. Clients typiques : PME 50-200 salariés dans l'industrie et services. Croissance 25% par an depuis 3 ans. Équipe : 8 développeurs, 4 consultants fonctionnels, 6 chefs de projet, 4 commerciaux, 3 support. Certifications Microsoft Gold Partner, AWS Select Partner. Ambition : atteindre 5M€ CA en 2025 et ouvrir antenne Bruxelles.",
      painPoints: [
        "Leads dispersés entre 4 commerciaux sans visibilité centralisée : perte d'opportunités par doublons",
        "Suivi client post-projet inexistant : taux de renouvellement de seulement 60% vs 85% marché",
        "Reporting commercial manuel : Marc passe 1 jour/semaine à consolider Excel de chaque commercial",
        "Pipeline prévisionnel impossible : difficile de prévoir trésorerie et ressources",
        "Relances prospects incohérentes : chaque commercial a sa méthode, pas de standardisation",
        "Historique client perdu : quand un commercial part, toute la relation client s'évapore",
        "Facturation retardée faute de visibilité sur l'avancement projets"
      ],
      currentSolution: "4 fichiers Excel distincts (un par commercial) + Outlook pour emails + OneNote pour notes clients + Teams pour communication interne",
      budget: "5-10k€/an (représente 0,2% du CA mais Marc prêt à investir pour structurer croissance)",
      timeline: "Q2 2024 - urgence car recrutement 3 nouveaux commerciaux prévu"
    },
    interlocutor: {
      name: "Marc Dubois",
      role: "Co-fondateur & Directeur Commercial",
      personality: "Entrepreneur pragmatique, ancien consultant habitué aux méthodes structurées mais qui privilégie l'efficacité à la sophistication. Impatient face aux outils complexes. Leader bienveillant mais exigeant sur les résultats. Adore les démonstrations concrètes plutôt que les discours théoriques.",
      communicationStyle: "Direct et terre-à-terre. Aime les exemples concrets et les chiffres simples. Coupe court aux présentations trop techniques. Préfère les réunions de 30min max. Teste immédiatement ce qu'on lui montre. Pose des questions pratiques du type 'combien de clics pour faire ça ?'",
      decisionPower: "Décisionnaire final jusqu'à 15k€/an, co-décision avec Thomas Leroy (CTO) au-delà. Influence forte sur tous les choix outils et process commerciaux.",
      priorities: [
        "Simplicité d'adoption par équipe commerciale (âge moyen 28 ans, niveau tech variable)",
        "ROI visible sous 3 mois : gain temps ou amélioration conversion",
        "Centralisation données clients sans perdre informations existantes", 
        "Standardisation process commercial pour faciliter onboarding nouveaux",
        "Visibilité pipeline pour anticiper besoins en recrutement"
      ],
      concerns: [
        "Résistance équipe aux changements : dernière tentative CRM (Zoho) abandonnée en 2022",
        "Temps de formation : équipe commerciale sur le terrain 80% du temps",
        "Migration données Excel sans perte : 3 ans d'historique client critique",
        "Coût caché : méfiant après expérience coûteuse avec éditeur qui multipliait les modules"
      ],
      motivations: [
        "Ambition croissance : passer de 4 à 7 commerciaux nécessite structuration",
        "Reconnaissance professionnelle : être l'ESN la mieux organisée de Lille",
        "Performance financière : améliorer marge en optimisant temps commercial"
      ],
      experience: "12 ans total : 4 ans consultant senior chez Accenture (finance/industrie), 8 ans entrepreneur (3 ans création TechServices, 5 ans développement). Formation : Master Management Lille, certifié PMP. Connaît bien les enjeux tech mais privilégie business value."
    },
    product: {
      name: "SalesFlow CRM",
      description: "CRM nouvelle génération spécialement conçu pour les PME de services avec workflows automatisés et interface mobile-first. Développé par une équipe française ex-Salesforce. +2000 PME clientes, note 4.8/5 sur Capterra.",
      pricing: {
        starter: "29€/mois/utilisateur (pipeline + contacts, 1000 contacts max)",
        professional: "49€/mois/utilisateur (automation + reporting, contacts illimités, mobile)",
        enterprise: "89€/mois/utilisateur (API + intégrations avancées + support prioritaire)"
      },
      keyFeatures: [
        "Pipeline visuel drag & drop inspiré de Trello",
        "Mobile-first : 90% des actions faisables depuis smartphone",
        "Automation marketing : sequences emails, relances automatiques, scoring leads",
        "Reporting temps réel avec 25+ métriques commerciales et forecasting",
        "Intégration native Office 365, Google Workspace, comptabilité (Sage, Cegid)",
        "Import automatique emails et calendrier sans configuration",
        "Templates sectoriels pré-configurés pour ESN/conseil",
        "Notifications intelligentes : alertes opportunités chaudes, relances oubliées",
        "Tableau de bord manager : performance équipe, répartition prospects",
        "Gestion devis/factures intégrée avec signature électronique"
      ],
      competitiveAdvantages: [
        "Interface 3x plus simple que Salesforce, formation 2h vs 2 jours",
        "Migration assistée gratuite avec préservation historique Excel",
        "Support téléphonique français (Nantes) vs chatbot international",
        "Prix 40% inférieur à HubSpot pour fonctionnalités équivalentes",
        "Spécialisation PME services : templates et workflows sectoriels"
      ],
      roi: "Clients moyens : +35% taux conversion, -50% temps admin commercial, +25% CA/commercial en 6 mois. ROI 280% première année.",
      implementationTime: "3 jours configuration + 1 semaine formation équipe + migration données"
    },
    objectives: ["Démontrer la simplicité d'usage", "Calculer le gain de productivité"],
    salesGoal: "Contrat Pro pour 10 utilisateurs (12 mois)",
    expectedRevenue: "5,880€",
    swot: {
      strengths: [
        "Interface ultra-intuitive : adoption 90% vs 60% marché (impact: 8/10, probabilité: 9/10)",
        "Support français avec hotline directe (impact: 7/10, probabilité: 10/10)",
        "Prix 40% inférieur à HubSpot/Salesforce (impact: 8/10, probabilité: 10/10)",
        "Migration gratuite avec conservation historique (impact: 9/10, probabilité: 10/10)",
        "Spécialisation PME services avec templates sectoriels (impact: 7/10, probabilité: 8/10)",
        "Mobile-first : 90% fonctionnalités disponibles sur smartphone (impact: 6/10, probabilité: 9/10)",
        "ROI prouvé : +35% taux conversion moyen clients (impact: 9/10, probabilité: 8/10)"
      ],
      weaknesses: [
        "Jeune société (5 ans) vs Salesforce/Microsoft établis (impact: 5/10, probabilité: 7/10)",
        "Fonctionnalités enterprise limitées vs solutions haut de gamme (impact: 4/10, probabilité: 6/10)",
        "Équipe R&D de 15 personnes vs 1000+ chez Salesforce (impact: 4/10, probabilité: 7/10)",
        "Pas encore de certifications sectorielles (ISO 27001 en cours) (impact: 3/10, probabilité: 5/10)"
      ],
      opportunities: [
        "Marché CRM PME croît de 15% par an en France (impact: 8/10, probabilité: 9/10)",
        "Post-COVID accélère digitalisation commerciale (impact: 7/10, probabilité: 8/10)",
        "TechServices prévoit croissance : besoin urgent structuration (impact: 9/10, probabilité: 8/10)",
        "Frustration avec solutions complexes ouvre marché simplicité (impact: 7/10, probabilité: 7/10)",
        "Télétravail nécessite outils collaboratifs mobiles (impact: 6/10, probabilité: 9/10)"
      ],
      threats: [
        "Microsoft/Google offrent CRM dans leurs suites Office (impact: 6/10, probabilité: 8/10)",
        "HubSpot améliore son offering PME (impact: 5/10, probabilité: 7/10)",
        "Solutions open-source comme SuiteCRM gagnent maturité (impact: 4/10, probabilité: 6/10)",
        "Récession économique réduit budgets digitalisation (impact: 7/10, probabilité: 3/10)"
      ]
    },
    competitorSwot: {
      strengths: [
        "Excel maîtrisé par 100% équipe commerciale (impact: 6/10, probabilité: 10/10)",
        "Coût zéro et contrôle total des données (impact: 7/10, probabilité: 10/10)",
        "Flexibilité totale : chacun adapte sa méthode (impact: 5/10, probabilité: 9/10)",
        "Pas de dépendance externe ou de formation requise (impact: 5/10, probabilité: 10/10)"
      ],
      weaknesses: [
        "Aucune centralisation : 4 sources de vérité différentes (impact: 9/10, probabilité: 10/10)",
        "Pas de suivi automatique des relances (impact: 7/10, probabilité: 10/10)",
        "Reporting consolidé prend 8h/semaine à Marc (impact: 6/10, probabilité: 10/10)",
        "Perte historique client quand commercial part (impact: 8/10, probabilité: 8/10)",
        "Impossible de forecaster pipeline de manière fiable (impact: 8/10, probabilité: 9/10)",
        "Erreurs de saisie et doublons fréquents (impact: 6/10, probabilité: 8/10)"
      ],
      opportunities: [
        "Économies immédiates sans investissement (impact: 6/10, probabilité: 10/10)",
        "Chaque commercial garde ses habitudes (impact: 4/10, probabilité: 9/10)",
        "Pas de risque technique ou de panne (impact: 3/10, probabilité: 8/10)"
      ],
      threats: [
        "Concurrents ESN plus organisés gagnent appels d'offres (impact: 8/10, probabilité: 7/10)",
        "Croissance impossible à gérer sans structuration (impact: 9/10, probabilité: 8/10)",
        "Turnover commercial fait perdre relations clients (impact: 8/10, probabilité: 6/10)",
        "Manque de visibilité nuit à la trésorerie prévisionnelle (impact: 7/10, probabilité: 9/10)"
      ]
    },
    probableObjections: ["On s'en sort bien avec Excel", "C'est compliqué à mettre en place"],
    successCriteria: ["Démonstration pipeline visuel", "Calcul gain productivité"],
    tools: ["demo_crm", "calc_productivite"]
  },
  {
    id: "marketplace-b2b",
    title: "Marketplace B2B Industrie",
    description: "Convaincre un industriel d'adopter une marketplace B2B pour ses achats",
    difficulty: "Difficile",
    probability: 45,
    company: {
      name: "MétalPro Industries",
      sector: "Métallurgie",
      size: "150 employés",
      revenue: "25M€/an",
      location: "Saint-Étienne, France",
      description: "Fabricant de pièces métalliques de précision fondé en 1987 par la famille Moreau. Leader régional usinage/découpe laser pour Renault, PSA, Safran, Thales. Certification ISO 9001, TS 16949 automobile, EN 9100 aéronautique. 3 sites : Saint-Étienne (siège + R&D), Firminy (production série), Roanne (prototypage). 150 employés : 80 production, 25 bureau d'études, 20 qualité/méthodes, 15 support, 10 commercial. CA stable malgré crise auto. Enjeu : diversification vers médical et énergie pour réduire dépendance automobile.",
      painPoints: [
        "Approvisionnement de 1200+ références auprès de 80 fournisseurs sans visibilité globale",
        "Négociations manuelles chronophages : 6 semaines moyenne pour nouvelle référence",
        "Manque transparence prix marché : découvre tarifs plus bas chez concurrents a posteriori",
        "Ruptures stock imprévisibles : 15% retards livraison clients par défaut fournisseur",
        "Process achats non digitalisé : catalogues papier, bons de commande fax",
        "Audit fournisseurs insuffisant : 2 incidents qualité coûteux en 2023",
        "Pas de sourcing alternatif systématique sur pièces critiques"
      ],
      currentSolution: "ERP Sage X3 + Excel pour comparatifs + téléphone/email fournisseurs + catalogues papier + réseau relationnel Catherine",
      budget: "50-100k€/an (0,3% CA mais direction pousse économies achats post-crise)",
      timeline: "Q3-Q4 2024 - budget voté, pression actionnaires familiaux pour optimiser coûts"
    },
    interlocutor: {
      name: "Catherine Moreau",
      role: "Directrice Achats & Supply Chain",
      personality: "Perfectionniste méthodique, fille du fondateur habituée aux process rigoureux. Conservatrice par nature mais consciente des enjeux de modernisation. Très respectée en interne pour son expertise technique. Redoute les changements brusques mais ouverte si ROI démontré.",
      communicationStyle: "Formelle et structurée. Aime les présentations détaillées avec chiffres et références. Pose des questions techniques précises. Vérifie toujours les sources. Préfère les réunions en présentiel avec supports papier. Méfiance initiale puis confiance durable.",
      decisionPower: "Influence très forte auprès de son frère Jean-Marc (PDG). Décisionnaire jusqu'à 75k€, validation CA au-delà. Son avis technique fait autorité en interne.",
      priorities: [
        "Réduction coûts achats de 8% demandée par actionnaires familiaux",
        "Sécurisation approvisionnement pièces critiques (zéro rupture client)",
        "Diversification sourcing pour réduire dépendance fournisseurs locaux",
        "Amélioration délais négociation : objectif 3 semaines vs 6 actuelles",
        "Traçabilité complète pour audits clients aéronautique"
      ],
      concerns: [
        "Fiabilité plateforme : ne peut pas se permettre bug sur commandes critiques",
        "Résistance équipe achats (moyenne d'âge 48 ans, peu digitalisée)",
        "Dépendance technologique : peur de perdre autonomie et relations fournisseurs",
        "Sécurité données : plans industriels et prix négociés confidentiels",
        "Formation équipe : 6 acheteurs avec niveaux informatiques hétérogènes"
      ],
      motivations: [
        "Reconnaissance professionnelle : prouver la valeur des achats dans la famille",
        "Performance financière : bonus indexé sur économies réalisées",
        "Modernisation : ne pas être en retard vs concurrents qui digitalisent"
      ],
      experience: "18 ans total : formation ingénieur EMSE Saint-Étienne, 3 ans acheteur chez Michelin, 15 ans MétalPro (évolution interne). Spécialiste métallurgie, certification achats CDAF. Connaissance approfondie supply chain automobile/aéro."
    },
    product: {
      name: "IndustryConnect",
      description: "Marketplace B2B spécialisée pour l'industrie avec outils de négociation avancés",
      pricing: {
        starter: "999€/mois",
        professional: "2500€/mois",
        enterprise: "5000€/mois"
      },
      keyFeatures: ["Catalogue 50k+ fournisseurs", "Négociation automatisée", "Analytics achats"],
      competitiveAdvantages: ["Spécialisation industrie", "Garantie approvisionnement"],
      roi: "15% réduction coûts achats",
      implementationTime: "3 mois"
    },
    objectives: ["Prouver les économies réalisables", "Rassurer sur la fiabilité"],
    salesGoal: "Contrat Enterprise (24 mois)",
    expectedRevenue: "120,000€",
    swot: {
      strengths: ["Spécialisation industrie", "Large réseau fournisseurs"],
      weaknesses: ["Prix élevé", "Complexité déploiement"],
      opportunities: ["Digitalisation achats", "Pression coûts"],
      threats: ["Concurrents généralistes", "Résistance changement"]
    },
    competitorSwot: {
      strengths: ["Relations établies", "Processus maîtrisés"],
      weaknesses: ["Manque de transparence", "Coûts cachés"],
      opportunities: ["Négociation directe", "Flexibilité"],
      threats: ["Dépendance fournisseurs", "Manque d'optimisation"]
    },
    probableObjections: ["Nos fournisseurs actuels nous conviennent", "C'est trop cher pour nous"],
    successCriteria: ["Audit coûts actuels", "Démonstration ROI 15%"],
    tools: ["audit_achats", "calc_economies"]
  },
  {
    id: "formation-digitale",
    title: "Plateforme Formation Digitale",
    description: "Vendre une solution de formation en ligne à une grande entreprise",
    difficulty: "Moyen",
    probability: 65,
    company: {
      name: "GlobalCorp",
      sector: "Services Financiers",
      size: "800 employés",
      revenue: "120M€/an",
      location: "La Défense, France",
      description: "Groupe financier proposant des solutions d'investissement aux entreprises",
      painPoints: ["Formation présentielle coûteuse", "Montée en compétences lente", "Suivi formation difficile"],
      currentSolution: "Formations présentielles + organismes externes",
      budget: "100-200k€/an",
      timeline: "Q1 2024"
    },
    interlocutor: {
      name: "Julien Rousseau",
      role: "DRH",
      personality: "Innovant et orienté performance",
      communicationStyle: "Stratégique, cherche l'impact business",
      decisionPower: "Décisionnaire avec validation COMEX",
      priorities: ["ROI formation", "Engagement collaborateurs"],
      concerns: ["Adoption utilisateurs", "Mesure efficacité"],
      motivations: ["Innovation RH", "Performance équipes"],
      experience: "10 ans en RH et transformation"
    },
    product: {
      name: "LearnHub Enterprise",
      description: "Plateforme de formation digitale avec IA adaptive et analytics avancés",
      pricing: {
        starter: "15€/mois/utilisateur",
        professional: "25€/mois/utilisateur",
        enterprise: "40€/mois/utilisateur"
      },
      keyFeatures: ["IA adaptive", "Catalogue 5000+ formations", "Analytics détaillés"],
      competitiveAdvantages: ["Personnalisation IA", "Intégration SIRH"],
      roi: "40% réduction coûts formation",
      implementationTime: "6 semaines"
    },
    objectives: ["Démontrer l'économie vs présentiel", "Prouver l'engagement utilisateur"],
    salesGoal: "Contrat Enterprise 500 utilisateurs (24 mois)",
    expectedRevenue: "480,000€",
    swot: {
      strengths: ["IA propriétaire", "Large catalogue"],
      weaknesses: ["Prix premium", "Complexité technique"],
      opportunities: ["Digitalisation formation", "Réduction coûts"],
      threats: ["Concurrents établis", "Résistance changement"]
    },
    competitorSwot: {
      strengths: ["Formation reconnue", "Interaction humaine"],
      weaknesses: ["Coûts élevés", "Pas de flexibilité"],
      opportunities: ["Qualité pédagogique", "Réseautage"],
      threats: ["Coûts croissants", "Indisponibilité"]
    },
    probableObjections: ["La formation présentielle est plus efficace", "C'est trop cher par utilisateur"],
    successCriteria: ["Calcul économies vs présentiel", "Démonstration engagement"],
    tools: ["calc_formation", "demo_ia"]
  },
  {
    id: "cybersecurite-pme",
    title: "Solution Cybersécurité PME",
    description: "Convaincre une PME d'investir dans une solution de cybersécurité complète",
    difficulty: "Difficile",
    probability: 55,
    company: {
      name: "InnoTech Solutions",
      sector: "Ingénierie",
      size: "75 employés",
      revenue: "12M€/an",
      location: "Grenoble, France",
      description: "Bureau d'études spécialisé en solutions techniques pour l'industrie",
      painPoints: ["Données sensibles exposées", "Attaques phishing fréquentes", "Pas de politique sécurité"],
      currentSolution: "Antivirus basique + firewall",
      budget: "20-40k€/an",
      timeline: "Q2 2024"
    },
    interlocutor: {
      name: "Pierre Lacroix",
      role: "Directeur Technique",
      personality: "Technique et sceptique",
      communicationStyle: "Précis, aime les détails techniques",
      decisionPower: "Décisionnaire technique, validation PDG",
      priorities: ["Protection données", "Continuité activité"],
      concerns: ["Complexité", "Impact performance"],
      motivations: ["Sécurité", "Conformité réglementaire"],
      experience: "12 ans en direction technique"
    },
    product: {
      name: "SecureShield Pro",
      description: "Suite cybersécurité complète avec monitoring 24/7 et formation utilisateurs",
      pricing: {
        starter: "199€/mois",
        professional: "499€/mois",
        enterprise: "999€/mois"
      },
      keyFeatures: ["Monitoring 24/7", "Formation utilisateurs", "Sauvegarde cloud"],
      competitiveAdvantages: ["Support français", "Conformité RGPD"],
      roi: "Évite 1 incident = 500% ROI",
      implementationTime: "4 semaines"
    },
    objectives: ["Évaluer les risques actuels", "Démontrer le coût d'un incident"],
    salesGoal: "Contrat Professional (24 mois)",
    expectedRevenue: "23,952€",
    swot: {
      strengths: ["Solution complète", "Support local"],
      weaknesses: ["Prix vs antivirus simple", "Complexité perçue"],
      opportunities: ["Menaces croissantes", "Réglementation"],
      threats: ["Solutions gratuites", "Déni du risque"]
    },
    competitorSwot: {
      strengths: ["Coût faible", "Simplicité"],
      weaknesses: ["Protection limitée", "Pas de support"],
      opportunities: ["Économies immédiates", "Facilité"],
      threats: ["Vulnérabilités", "Non-conformité"]
    },
    probableObjections: ["On n'a jamais eu de problème", "C'est trop cher pour notre taille"],
    successCriteria: ["Audit sécurité", "Calcul coût incident"],
    tools: ["audit_securite", "calc_risque"]
  },
  {
    id: "erp-manufacturing",
    title: "ERP Manufacturier",
    description: "Vendre un ERP spécialisé à un industriel en transformation digitale",
    difficulty: "Difficile",
    probability: 40,
    company: {
      name: "PlastiForm Industries",
      sector: "Plasturgie",
      size: "200 employés",
      revenue: "35M€/an",
      location: "Oyonnax, France",
      description: "Fabricant de pièces plastiques techniques pour l'automobile et l'électronique",
      painPoints: ["Systèmes non intégrés", "Visibilité production limitée", "Planification manuelle"],
      currentSolution: "ERP legacy + Excel",
      budget: "200-500k€",
      timeline: "Q4 2024 - Q1 2025"
    },
    interlocutor: {
      name: "Alain Bertrand",
      role: "Directeur Industriel",
      personality: "Pragmatique et exigeant",
      communicationStyle: "Direct, orienté terrain",
      decisionPower: "Influence forte, validation CA",
      priorities: ["Performance production", "ROI mesurable"],
      concerns: ["Disruption production", "Complexité migration"],
      motivations: ["Modernisation", "Compétitivité"],
      experience: "20 ans dans l'industrie"
    },
    product: {
      name: "ManufactureOne",
      description: "ERP manufacturier avec MES intégré et analytics temps réel",
      pricing: {
        starter: "5000€/mois",
        professional: "12000€/mois",
        enterprise: "25000€/mois"
      },
      keyFeatures: ["MES intégré", "Analytics temps réel", "Planification IA"],
      competitiveAdvantages: ["Spécialisation industrie", "Déploiement modulaire"],
      roi: "20% gain productivité",
      implementationTime: "12 mois"
    },
    objectives: ["Auditer les inefficacités actuelles", "Projeter les gains productivité"],
    salesGoal: "Contrat Professional (36 mois)",
    expectedRevenue: "432,000€",
    swot: {
      strengths: ["Spécialisation industrie", "Expertise métier"],
      weaknesses: ["Prix élevé", "Complexité déploiement"],
      opportunities: ["Transformation digitale", "Industrie 4.0"],
      threats: ["ERP généralistes", "Solutions maison"]
    },
    competitorSwot: {
      strengths: ["Solution connue", "Investissement amorti"],
      weaknesses: ["Obsolescence", "Silos données"],
      opportunities: ["Pas de disruption", "Équipes formées"],
      threats: ["Perte compétitivité", "Maintenance coûteuse"]
    },
    probableObjections: ["Notre ERP actuel fonctionne encore", "L'investissement est trop important"],
    successCriteria: ["Audit performance actuelle", "Business case ROI 20%"],
    tools: ["audit_erp", "calc_productivite"]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};