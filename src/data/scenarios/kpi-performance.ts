import { Scenario } from './types';

export const kpiPerformanceScenario: Scenario = {
  id: "kpi-performance",
  title: "Optimisation Analytics E-commerce",
  description: "Vendre DataTrack Pro de MarketingTech Solutions à ModaStyle pour révolutionner leur attribution marketing et analytics prédictive avec un ROI de 312% première année",
  difficulty: "Moyen",
  probability: 75,
  company: {
    name: "ModaStyle",
    sector: "E-commerce Mode Éthique",
    size: "85 employés",
    revenue: "18M€ CA annuel",
    location: "Lyon, France - Siège social Presqu'île, entrepôt Rillieux-la-Pape",
    
    metrics: {
      monthlyVisitors: "1,050K visiteurs uniques/mois",
      conversionRate: "2.3%",
      averageOrderValue: "62€",
      customerLifetimeValue: "186-248€",
      monthlyOrders: "24,200",
      marketingBudget: "2.1M€/an (11.7% du CA)",
      paidMediaSpend: "103K€/mois (80K€ digital + 15K€ TV + 8K€ influence)",
      digitalBreakdown: "Google Ads 50K€, Meta 30K€, TikTok 8K€/mois"
    },
    
    description: "Créée en 2015, ModaStyle s'est développée rapidement sur le segment mode accessible. Croissance de 15% par an depuis 2020.",
    
    technicalStack: {
      ecommerce: "Shopify Plus",
      analytics: "Google Analytics 4, Facebook Pixel",
      advertising: "Google Ads (60% budget), Facebook Ads (30%), TikTok Ads (10%)",
      email: "Klaviyo",
      crm: "HubSpot Starter"
    },
    painPoints: [
      {
        issue: "Attribution Google/Facebook imprécise (overlap estimé 40-60%)",
        description: "Impossible de distinguer les conversions Facebook des conversions Google Ads. 45% des commandes attribuées aux deux canaux simultanément. Budget 80k€/mois mal réparti entre plateformes.",
        cost: "€22k/an",
        impact: "Budget publicitaire mal optimisé, cannibalisation non détectée"
      },
      {
        issue: "Impact campagnes TV/Influence difficile à mesurer",
        description: "Campagnes TV (15k€/mois) et collaborations influenceurs (8k€/mois) sans tracking précis. Impossibilité de mesurer l'impact sur la notoriété et les ventes indirectes.",
        cost: "€18k/an",
        impact: "ROI média offline inconnu, budget alloué à l'aveugle"
      },
      {
        issue: "Optimisation budgets Google/Facebook en silo",
        description: "Gestion séparée des campagnes Google Ads (50k€/mois) et Facebook Ads (30k€/mois). Pas de vision cross-canal pour optimiser l'allocation budgétaire globale.",
        cost: "€15k/an",
        impact: "Perte d'efficacité budgétaire, arbitrages non data-driven"
      },
      {
        issue: "Reporting manuel chronophage (2j/semaine)",
        description: "Sophie et Jules passent 16h/semaine à consolider manuellement les données GA4, Facebook, Google Ads dans Excel. Risque d'erreurs humaines.",
        cost: "€12k/an",
        impact: "Temps équipe perdu, décisions retardées, erreurs reporting"
      },
      {
        issue: "Pas de vision unifiée customer journey",
        description: "Impossible de suivre le parcours complet client depuis la découverte jusqu'à la fidélisation. Données fragmentées entre outils sans réconciliation.",
        cost: "€25k/an",
        impact: "Optimisation impossible du funnel, opportunités de rétention manquées"
      }
    ],
    
    currentSolution: "Google Analytics 4 + exports Excel + dashboard Tableau basique",
    
    budget: "Budget outils marketing: 25K€/an - Budget nouveaux projets: 20K€/an",
    
    timeline: "Test avant fin Q1, déploiement Q2 si concluant",
    
    foundedYear: 2015,
    keyPeople: [
      "Clara Dubois - CEO & Fondatrice, 34 ans (Ex-acheteuse senior Zara 6 ans, ESSEC). Visionnaire mode éthique européenne, leadership inspirant équipe, obsédée customer experience. Network influent mode/retail",
      "Sophie Martin - Directrice Marketing & Analytics, 33 ans (Ex-Converteo 4 ans, Ex-Spartoo 3 ans, Ex-Agence digitale Lyon 2 ans, ESC Lyon marketing digital). 10 ans expertise analytics, frustrée limitations tools actuels, recherche efficacité",
      "Jules Moreau - Traffic Manager, 26 ans (Ex-freelance Meta Ads, spécialiste acquisition). Expert growth hacking, maîtrise budgets publicitaires, créatif campagnes visuelles mode",
      "Amélie Durant - CRM Manager, 31 ans (Ex-Sephora email marketing, spécialiste retention). Experte lifecycle marketing, personnalisation email, customer journey mapping",
      "Thomas Dubois - CTO, 32 ans (frère Clara, Ex-dev lead Criteo, Polytechnique). Architecture Shopify Plus, optimisation performance, innovation tech retail",
      "Marc Lecomte - COO, 38 ans (Ex-directeur ops Showroomprivé, supply chain expert). Gestion croissance opérationnelle, logistique, recrutement équipe"
    ],
    
    // Informations stakeholders incluses dans keyPeople above
    detailedFinancials: {
      quarters: [
        { period: "Q1 2023", revenue: 4.2, marketingSpend: 0.48, roas: 8.8 },
        { period: "Q2 2023", revenue: 4.1, marketingSpend: 0.51, roas: 8.0 },
        { period: "Q3 2023", revenue: 4.6, marketingSpend: 0.58, roas: 7.9 },
        { period: "Q4 2023", revenue: 5.1, marketingSpend: 0.62, roas: 8.2 }
      ]
    }
  },
  interlocutor: {
    name: "Sophie Martin",
    role: "Directrice Marketing & Analytics",
    
    // Profil psychologique approfondi
    personality: "Directrice marketing pragmatique avec un profil digital. Apprécie les données mais sans être une data scientist. Orientée résultats, veut comprendre ce qui marche pour l'optimiser. Parfois fatiguée par la fragmentation des outils actuels. Communication directe et efficace. Cherche des solutions simples qui font gagner du temps à son équipe.",
    
    linkedinProfile: {
      experience: "9 ans en marketing digital et analytics",
      education: "Master Marketing Digital - ESSEC Business School (2016), Certification Google Analytics 4 (2023), Formation Marketing Mix Modeling - Google (2022)",
      currentCompany: "ModaStyle (depuis 2021)",
      previousCompanies: ["Sephora (2018-2021 - Senior Marketing Analyst)", "BonPrix (2016-2018 - Marketing Data Analyst)", "Stage L'Oréal (2015 - Marketing Analytics Intern)"],
      skills: ["Marketing Analytics", "Attribution Modeling", "Customer Journey Analysis", "ROI Optimization", "GA4", "Facebook Ads Manager", "Google Ads", "Tableau", "Excel avancé"],
      recommendations: 8,
      connections: "350+"
    },
    
    // Habitudes et préférences détaillées  
    workingStyle: "Méthodique mais pragmatique, teste en petit avant de déployer",
    
    communicationStyle: "Directe, pose des questions techniques précises, demande des preuves chiffrées",
    
    decisionPower: "Décision autonome jusqu'à 25k€, validation Direction au-delà",
    
    priorities: ["Améliorer l'attribution des campagnes Facebook/Google", "Réduire la cannibalisation entre canaux", "Mesurer l'impact des campagnes TV"],
    
    concerns: ["Fiabilité des modèles prédictifs", "Temps d'implémentation", "Adoption par l'équipe"],
    
    motivations: ["Prouver l'efficacité de ses campagnes", "Optimiser le budget serré", "Montrer sa valeur ajoutée"],
    
    experience: "9 ans en marketing digital et analytics",
    careerHistory: {
      totalYears: 9,
      currentRole: "Directrice Marketing & Analytics chez ModaStyle (3 ans)",
      keyAchievements: [
        "Mise en place GA4 et Facebook CAPI (2023)",
        "Amélioration de 18% du ROAS moyen sur Google Ads",
        "Création dashboard executive pour la Direction"
      ],
      expertise: ["Google Analytics 4", "Facebook Business Manager", "Attribution last-click vs multi-touch", "Tableaux de bord Tableau"]
    }
  },
  product: {
    name: "DataTrack Pro",
    
    // Identité et positionnement de notre entreprise
    vendor: {
      companyName: "MarketingTech Solutions",
      founded: 2021,
      headquarters: "Paris La Défense, France",
      employees: 45,
      revenue: "8M€ ARR (2023)",
      mission: "Démocratiser l'attribution marketing IA pour les e-commerces européens 1M-50M€ CA",
      vision: "Devenir la référence attribution marketing Europe d'ici 2027",
      values: ["Excellence technique", "Transparence ROI", "Support client français", "Innovation responsable"],
      leadership: [
        "Marie Dubois - CEO (Ex-VP Analytics Criteo, Polytechnique)",
        "Thomas Chen - CTO (Ex-Principal Engineer Facebook, Stanford PhD)",
        "Sarah Martin - VP Sales (Ex-Director EMEA Mixpanel)"
      ],
      funding: "Série A 12M€ (2023) - Partech Partners lead, BPI France",
      certifications: ["ISO 27001", "SOC 2 Type II", "RGPD compliant", "Shopify Plus Partner"],
      awards: ["Best Analytics Startup 2023 (La French Tech)", "Innovation Award E-commerce Paris 2023"]
    },
    
    description: "Solution d'attribution marketing et d'analytics prédictifs pour e-commerce",
    
    marketingPositioning: "Attribution marketing précise pour optimiser vos campagnes cross-canal",
    
    pricing: {
      starter: "199€",
      professional: "599€", 
      enterprise: "Sur mesure",
      setupFees: "899€ implémentation + formation 2 jours",
      contractTerms: "12 mois minimum",
      migration: "Historique 24 mois inclus"
    },
    keyFeatures: [
      "Attribution multi-touch (first-click, last-click, data-driven)",
      "Connecteurs Google Ads, Facebook Ads, GA4 natifs",
      "Modélisation Marketing Mix simple",
      "Dashboards préconstruits pour e-commerce",
      "Alertes automatiques sur anomalies de performance",
      "Export CSV/Excel des rapports"
    ],
    competitiveAdvantages: [
      "Spécialisé e-commerce fashion (vs. généraliste)",
      "Interface française et support local",
      "Implémentation rapide (4-6 semaines vs 3-4 mois)",
      "Pricing transparent sans surprise",
      "Cas clients similaires (Grain de Malice, Spartoo)"
    ],
    roi: "220%",
    implementationTime: "4-6 semaines setup complet avec formation équipe"
  },
  // Objectifs pédagogiques selon type d'appel
  objectives: [
    // Cold Call - Phase Découverte & Qualification
    "DÉCOUVRIR les frustrations analytics actuelles: identifier douleurs précises Sophie (reporting manuel, attribution fragmentée, décisions retardées)",
    "QUALIFIER budget/timeline: confirmer urgence Q1 2024, budget 15-25k€ disponible, pouvoir décision Sophie jusqu'à 30k€",
    "DIAGNOSTIQUER architecture analytics: mapper outils actuels (GA4/Meta/Google/Klaviyo/Excel), identifier gaps critiques ROI tracking",
    "CRÉER urgence business: quantifier coût inaction (budgets 80k€/mois mal optimisés, opportunités manquées croissance 45%)",
    "SÉCURISER rendez-vous découverte: obtenir 45min agenda Sophie + accès datasets ModaStyle pour audit gratuit personnalisé",
    
    // RDV Découverte - Analyse Besoins & Démonstration Valeur  
    "AUDITER performance marketing actuelle: révéler attribution errors, budget waste, churn signals non-détectés via analyse data réelle",
    "DÉMONTRER ROI potentiel chiffré: calculer gains attribution précise (15-25% budget optimization), churn prédiction (retention +30%)",
    "PROUVER différenciation technique: comparaison live GA4 vs DataTrack Pro sur données ModaStyle, showcase IA attribution avancée",
    "RASSURER sur implémentation: présenter roadmap 24h setup, formation incluse, migration garantie sans perte data historique",
    "VALIDER fit solution/besoins: confirmer adéquation fonctionnalités priorités Sophie, addressing concerns techniques spécifiques",
    
    // RDV Démonstration - Proof of Concept & Closing  
    "PRÉSENTER POC personnalisé: démonstration live sur vraies données ModaStyle, simulations optimisation budgets, prédictions churn",
    "QUANTIFIER business case précis: ROI 312% première année, réduction CAC 47€→35€, optimisation ROAS +40%, gains temps 16h/semaine",
    "GÉRER objections techniques: réponses préparées intégration Shopify, formation équipe, fiabilité prédictions, sécurité données",
    "NÉGOCIER accord pilote: proposer test 3 mois Professional plan avec garantie performance, migration data incluse, formation équipe",
    "FERMER signature contrat: présenter contrat 12 mois avec ROI garanti, escalade CEO Clara si nécessaire validation >30k€"
  ],
  salesGoal: "Contrat Professional à 599€/mois (12 mois)",
  expectedRevenue: "7,188€ première année",
  swot: {
    strengths: [
      "Spécialisation e-commerce mode/lifestyle avec use cases sectoriels",
      "Attribution multi-touch propriétaire vs last-click basique GA4",
      "Setup 4-6 semaines vs 3-4 mois concurrence enterprise",
      "Support client français avec CSM dédiés mode & lifestyle",
      "Prix 40% inférieur à Northbeam/Triple Whale (599€ vs 1000€+)",
      "Connecteurs natifs Shopify Plus/Meta/Google sans développement",
      "Prédiction churn basée sur données comportementales e-commerce"
    ],
    weaknesses: [
      "Startup 3 ans vs géants tech Google/Facebook établis",
      "Prix premium 599€/mois vs Google Analytics gratuit",
      "Dépendance APIs tierces Facebook/Google pour data ingestion",
      "Courbe apprentissage nouvelles métriques pour équipe Sophie",
      "Historique données limitée 24 mois migration vs années GA4"
    ],
    opportunities: [
      "iOS 14.5+ complique attribution Facebook/Google (impact majeur ModaStyle)",
      "Croissance e-commerce mode éthique +22% nécessite meilleurs outils",
      "Inflation coûts publicitaires +18% oblige optimisation budgets",
      "Budget ModaStyle 2.1M€ marketing justifie investissement analytics",
      "RGPD renforce besoin first-party data vs cookies tiers"
    ],
    threats: [
      "Google améliore GA4 attribution (Enhanced Conversions déployé)",
      "Northbeam baisse prix pour concurrencer (guerre des prix)",
      "Récession potentielle réduit budgets innovation marketing",
      "Apple/Meta modifient APIs (risque disruption tracking)",
      "ModaStyle développe solution interne avec équipe Thomas"
    ]
  },
  competitorSwot: {
    strengths: [
      "Google Analytics 4 : Gratuit, intégration native Google Ads, familiarité équipe",
      "Triple Whale : Interface simple, marketing viral, communauté e-commerce",
      "Northbeam : Références Shopify, attribution avancée, levée de fonds importante"
    ],
    weaknesses: [
      "GA4 : Attribution limitée, interface complexe, silos avec autres outils",
      "Northbeam : Prix 3x supérieur, support offshore, complexité setup 6 semaines",
      "Triple Whale : Attribution basique, pas de prédictif, coût 2x supérieur"
    ],
    opportunities: [
      "Budget marketing ModaStyle en croissance (+25% prévu 2024)",
      "Besoin urgent attribution cross-canal pour collection printemps"
    ],
    threats: [
      "DataTrack Pro offre meilleur rapport qualité/prix/setup",
      "Spécialisation mode éthique avantage concurrentiel majeur",
      "Support français vs offshore valorisé par Sophie Martin"
    ]
  },
  probableObjections: [
    "599€/mois c'est 4x plus cher que notre budget analytics actuel ! Comment justifier cette dépense face à Clara qui surveille chaque euro ?",
    "Google Analytics est gratuit et on le maîtrise déjà. Pourquoi compliquer avec un nouvel outil quand on peut optimiser notre usage actuel ?",
    "Vos 47% d'amélioration ROAS, c'est calculé sur quoi ? On a déjà testé 3 outils qui promettaient des miracles et ça n'a rien donné.",
    "24h de setup ça paraît trop beau pour être vrai. Et si ça plante pendant le lancement de notre collection printemps ? On ne peut pas se permettre de perdre de la data.",
    "Comment être sûr que vos prédictions churn sont fiables ? Notre dernier outil prédictif avait 30% de faux positifs et on a harcelé des bons clients.",
    "Mon équipe Jules et Amélie vont encore râler s'il faut apprendre un nouvel outil. Combien d'heures de formation faut-il vraiment ?",
    "Nos données clients sont sensibles, comment garantir la sécurité ? Où sont hébergées les données ? Êtes-vous conformes RGPD ?",
    "Et si vous fermez dans 2 ans ? Une startup contre Google c'est David contre Goliath. Comment assurer la continuité de nos analytics ?",
    "L'intégration avec Shopify Plus ne va pas casser nos conversions actuelles ? On fait 8M€/an, on ne peut pas se permettre le moindre bug.",
    "Vos concurrents Northbeam et Triple Whale sont plus connus, pourquoi choisir DataTrack Pro ? Qu'est-ce qui vous différencie vraiment ?"
  ],
  successCriteria: [
    "Démonstration live attribution sur données ModaStyle réelles",
    "Audit gratuit révélant 15-25% d'optimisation possible",
    "Validation technique intégration Shopify Plus sans risque",
    "Témoignage client e-commerce mode similaire (CA 5-15M€)",
    "Négociation pilote 3 mois avec garantie satisfait/remboursé",
    "Formation équipe incluse avec certification"
  ],
  tools: [
    "Audit attribution actuel révélant pertes cachées",
    "Calculateur ROI personnalisé ModaStyle",
    "Comparateur coût/bénéfice vs GA4 + outils actuels",
    "Simulateur impact sur CAC et ROAS",
    "Planning implémentation sans risque business"
  ],
  stakeholders: [
    {
      name: "Sophie Martin",
      role: "Décisionnaire Principal - Directrice Marketing",
      influence: "Très élevée",
      support: "Neutre-Positif (frustrée situation actuelle)",
      concerns: ["ROI réel", "Formation équipe", "Complexité technique", "Temps implémentation"],
      approach: "Démonstration ROI chiffré + audit gratuit + formation incluse"
    },
    {
      name: "Clara Dubois",
      role: "Validation Budget Final - CEO",
      influence: "Décisive au-delà 25k€",
      support: "Neutre (focus croissance rentable)",
      concerns: ["Impact P&L", "ROI business", "Risque opérationnel"],
      approach: "Présentation business case + impact croissance"
    },
    {
      name: "Jules Moreau",
      role: "Utilisateur Final - Traffic Manager",
      influence: "Moyenne (adoption outil)",
      support: "Résistant (confortable GA4)",
      concerns: ["Courbe apprentissage", "Efficacité quotidienne"],
      approach: "Formation hands-on + bénéfices concrets quotidiens"
    }
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'Audit attribution marketing expert',
      description: 'Analyse complète fragmentation data et optimisation budgets publicitaires'
    },
    evidence: {
      title: 'Clients e-commerce similaires',
      description: 'TheKooples, Sézane, Maisons du Monde : +35% ROAS, -28% CAC'
    },
    pilot: {
      title: 'Pilote attribution 90 jours',
      description: 'Test sur 30% budget publicitaire avec garantie performance'
    },
    sequence: [
      'Audit attribution 360° : analyse stack actuel (GA4/Meta/Google/Klaviyo)',
      'Mapping customer journey : identification touchpoints non trackés',
      'Benchmark e-commerce mode : performance attribution vs 15 concurrents',
      'Démonstration live : dashboard attribution temps réel sur vos campagnes',
      'Business case personnalisé : ROI optimisation sur budget 80k€/mois',
      'Pilote 90 jours : tracking multi-touch attribution sur segments tests',
      'Mesure impact : gain ROAS et économies budget publicitaire',
      'Scaling plan : déploiement attribution complète + formation équipe'
    ],
    leveragePoints: [
      'Urgence Q1 2024 : lancement collection printemps = 40% CA annuel',
      'Budget gaspillé : 25-35% du budget publicitaire mal attribué',
      'Concurrence aggressive : autres marques mode optimisent déjà attribution',
      'Pression croissance : objectif 12M€ CA vs 8M€ actuel nécessite ROAS optimisé',
      'ROI immédiat : gains visibles dès 30 jours, payback 4-6 mois'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "4.8B€ Marketing Attribution France, 21B$ mondial",
      growthRate: "+28% CAGR France, +31% mondial",
      budgetRange: "15K-40K€/an PME, jusqu'à 200K€ enterprise",
      expectedROI: "35% gain ROAS moyenne, 28% réduction CAC",
      timeline: "Urgence Q1 2024 pour campagnes printemps",
      keyPlayers: ["Triple Whale", "Northbeam", "Mixpanel", "Segment", "Google Analytics"],
      marketPenetration: "23% e-commerce équipés attribution avancée",
      budgetWaste: "30-35% budget publicitaire mal attribué",
      roas: "ROAS moyen 3.5x vs 4.8x avec attribution optimisée"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Décrocher audit attribution 45min avec Sophie Martin sous 15 jours",
      secondary: "Cartographier ecosystem marketing ModaStyle + identifier pain points attribution",
      successMetrics: "RDV confirmé + access pain points + budget range validé"
    },
    rdv: {
      primary: "Convaincre lancer pilote attribution 90 jours sur 30% budget (25k€)",
      secondary: "Obtenir buy-in CEO Clara + mapping décision process + timeline validation",
      successMetrics: "Pilote validé + budget alloué + timeline signée + sponsorship exec"
    }
  },
  
  // Métriques de performance spécifiques e-commerce
  performanceMetrics: {
    kpis: [
      { name: "Taux attribution précise", current: "45%", target: "85%", category: "Attribution" },
      { name: "ROAS Google Ads", current: "3.2", target: "4.5", category: "Performance" },
      { name: "ROAS Facebook Ads", current: "2.8", target: "4.0", category: "Performance" },
      { name: "Temps reporting", current: "16h/semaine", target: "4h/semaine", category: "Productivité" },
      { name: "CAC moyen", current: "47€", target: "35€", category: "Acquisition" },
      { name: "LTV/CAC ratio", current: "3.3", target: "4.5", category: "Rentabilité" },
      { name: "Budget waste", current: "25-35%", target: "<10%", category: "Optimisation" },
      { name: "Conversion multi-touch", current: "Non mesurée", target: "Trackée", category: "Attribution" }
    ],
    industrySpecific: {
      seasonality: "40% CA collection printemps (mars-mai)",
      averageOrderValue: "52€ vs 48€ marché mode",
      customerRetention: "24% vs 19% benchmark e-commerce",
      mobileConversion: "2.1% vs 1.8% secteur",
      influencerImpact: "Non mesurable actuellement"
    }
  },
  
  // Conseils tactiques spécifiques
  tacticalAdvice: {
    coldCall: [
      "Commencer par douleur reporting manuel (16h/semaine Sophie)",
      "Quantifier budget gaspillé (25-35% sur 80k€/mois)",
      "Créer urgence collection printemps (40% CA annuel)",
      "Mentionner concurrents Grain de Malice success story",
      "Proposer audit gratuit attribution actuelle"
    ],
    rdv: [
      "Faire démo live sur vraies données ModaStyle",
      "Comparer GA4 vs DataTrack Pro side-by-side", 
      "Calculer ROI personnalisé sur budget 2.1M€/an",
      "Présenter roadmap 24h sans interruption business",
      "Négocier pilote sur 30% budget test collection"
    ],
    industrySpecific: [
      "Adapter au secteur mode éthique (valeurs, storytelling)",
      "Mentionner saisonnalité forte (urgence timing)",
      "Valoriser attribution TV/Influence (enjeu mode)",
      "Parler customer journey long (consideration mode)",
      "Évoquer concurrence Zalando/ASOS (pression marché)"
    ]
  },
  
  // Techniques de closing adaptées
  closingTechniques: {
    buyingSignals: [
      "Sophie demande détails techniques intégration Shopify",
      "Questions sur formation équipe Jules/Amélie",
      "Évocation timing collection printemps",
      "Demande références clients e-commerce similaires",
      "Questions prix Professional vs Enterprise",
      "Interrogation escalade validation Clara (CEO)"
    ],
    scripts: [
      "Sophie, vu l'urgence collection printemps qui représente 40% de votre CA annuel, et les 80k€/mois de budget actuellement mal optimisés, quand souhaitez-vous démarrer le pilote ?",
      "Vous avez vu l'impact sur les données de Grain de Malice (+35% ROAS). Avec votre budget 2.1M€/an, le ROI de 312% première année semble-t-il réaliste pour ModaStyle ?",
      "Pour sécuriser votre collection printemps, je propose un pilote 3 mois sur 30% du budget avec garantie performance. Qu'est-ce qui vous empêcherait de valider aujourd'hui ?"
    ],
    postSaleStrategy: [
      "Onboarding 24h avec Sophie + équipe Jules/Amélie",
      "Formation certifiante 2 jours DataTrack Pro",
      "Suivi hebdomadaire performance première collection",
      "Optimisation continue modèles attribution",
      "Expansion attribution TV/Influence post-pilote",
      "Upsell Enterprise après validation ROI"
    ],
    industryAdapted: true
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Budget",
      objection: "25k€ c'est trop cher pour un outil analytics, on a déjà Google Analytics gratuit",
      frequency: "Très fréquente" as const,
      responses: [
        "Votre budget publicitaire est de 80k€/mois. Si DataTrack vous fait économiser ne serait-ce que 10% grâce à une meilleure attribution, cela représente 8k€/mois soit 96k€/an d'économies",
        "Google Analytics vous coûte en réalité 16h/semaine de temps équipe soit 35k€/an en coût caché",
        "TheKooples a économisé 180k€ la première année avec notre solution"
      ],
      evidence: "ROI client TheKooples : -28% CAC, +35% ROAS = 180k€ économies an 1",
      nextStep: "Audit gratuit pour quantifier votre potentiel d'économies exact"
    },
    {
      category: "Timing",
      objection: "On n'a pas le temps de changer d'outil maintenant, on lance la collection printemps",
      frequency: "Très fréquente" as const,
      responses: [
        "C'est exactement pour ça qu'il faut agir maintenant. Cette collection représente 40% de votre CA annuel, vous ne pouvez pas vous permettre une attribution approximative",
        "Notre setup prend 24h vs 6 semaines pour la concurrence. On peut être opérationnels avant votre campagne de lancement",
        "Sézane a déployé DataTrack 3 semaines avant leur collection été : +42% performance campagne vs N-1"
      ],
      evidence: "Case study Sézane : déploiement 3 semaines avant collection = +42% performance",
      nextStep: "Planning détaillé déploiement 3 semaines compatible avec votre calendrier"
    },
    {
      category: "Technique",
      objection: "Notre setup Shopify/GA4 est complexe, on a peur de casser quelque chose",
      frequency: "Fréquente" as const,
      responses: [
        "Notre connecteur Shopify Plus est certifié et utilisé par 200+ e-commerces sans incident",
        "Le déploiement se fait en parallèle de votre setup actuel, sans interruption",
        "On propose un rollback automatique si problème détecté"
      ],
      evidence: "200+ déploiements Shopify sans incident, certification Shopify Plus Partner",
      nextStep: "Demo technique avec votre CTO Thomas pour valider l'intégration"
    },
    {
      category: "Équipe",
      objection: "Mon équipe n'aura pas le temps d'apprendre un nouvel outil",
      frequency: "Fréquente" as const,
      responses: [
        "L'interface est intuitive, nos clients e-commerce sont opérationnels en 2h de formation",
        "On inclut 8h de formation personnalisée + 3 mois de support priority",
        "Amélie chez Sézane : 'Plus simple que GA4, enfin des insights actionnables'"
      ],
      evidence: "Testimonial Sézane : 'Formation 2h, équipe autonome J+1'",
      nextStep: "Session découverte interface 30min avec Jules et Amélie"
    },
    {
      category: "Concurrence",
      objection: "On regarde aussi Triple Whale / Northbeam, ils sont moins chers",
      frequency: "Occasionnelle" as const,
      responses: [
        "Triple Whale : setup 6 semaines, support offshore, pricing US non transparent. Nous : 24h setup, support français, prix fixe",
        "Northbeam cible les gros US retailers, interface complexe. Nous sommes spécialisés e-commerce français 1-50M€",
        "Notre IA est entraînée sur 500M sessions e-commerce européennes vs data US généraliste"
      ],
      evidence: "Benchmark : nous 94% précision vs 82% Triple Whale selon étude Ecommerce Mag",
      nextStep: "Tableau comparatif détaillé + pilot head-to-head sur vos données"
    }
  ]
};