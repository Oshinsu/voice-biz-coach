// Enhanced scenario data with detailed biographies, complete SWOT, and product deep-dives

export interface DetailedSwotAnalysis {
  strengths: { item: string; impact: string; probability: string; score: number }[];
  weaknesses: { item: string; impact: string; probability: string; score: number }[];
  opportunities: { item: string; impact: string; probability: string; score: number }[];
  threats: { item: string; impact: string; probability: string; score: number }[];
}

export interface EnhancedCompany {
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
  // Enhanced fields
  employees?: string;
  website?: string;
  linkedin?: string;
  foundedYear: number;
  keyPeople: string[];
}

export interface EnhancedScenario {
  id: string;
  title: string;
  description: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  probability: number;
  company: EnhancedCompany;
  objectives: string[];
  salesGoal: string;
  expectedRevenue: string;
  ourProduct: {
    strengths: { item: string; impact: string; probability: string; score: number }[];
    weaknesses: { item: string; impact: string; probability: string; score: number }[];
    opportunities: { item: string; impact: string; probability: string; score: number }[];
    threats: { item: string; impact: string; probability: string; score: number }[];
  };
  theirSituation: {
    strengths: { item: string; impact: string; probability: string; score: number }[];
    weaknesses: { item: string; impact: string; probability: string; score: number }[];
    opportunities: { item: string; impact: string; probability: string; score: number }[];
    threats: { item: string; impact: string; probability: string; score: number }[];
  };
  timeline: {
    discovery: string;
    negotiation: string;
    decision: string;
    implementation: string;
    deployment: string;
    expansion: string;
  };
  competitiveAnalysis: any;
  stakeholders: any[];
  riskFactors: any[];
  successFactors: string[];
  financialModel: {
    initialInvestment: string;
    monthlyRecurring: string;
    paybackPeriod: string;
    lifetime: string;
    expansionPotential: string;
  };
}

export const enhancedScenarios: EnhancedScenario[] = [
  {
    id: "byss-vns-school",
    title: "Byss VNS pour École Commerce",
    description: "Vendre Byss VNS à l'École Supérieure de Commerce d'Aix-en-Provence pour moderniser l'enseignement commercial",
    difficulty: "Moyen",
    probability: 68,
    objectives: [
      "Démontrer l'impact pédagogique supérieur de Byss VNS vs méthodes traditionnelles",
      "Prouver l'facilité d'adoption par les professeurs",
      "Présenter un ROI clair en termes d'employabilité étudiante",
      "Rassurer sur le support technique et pédagogique",
      "Obtenir un accord pour un pilote département avant déploiement complet"
    ],
    salesGoal: "Contrat licence École (500+ étudiants) sur 3 ans = 180 000€ TTC",
    expectedRevenue: "180 000€ sur 3 ans (60k€/an)",
    company: {
      name: "ESCAP - École Supérieure de Commerce d'Aix-en-Provence",
      sector: "Enseignement Supérieur - Commerce",
      size: "Institution de taille moyenne (2500 étudiants, 150 professeurs)",
      revenue: "Budget formation annuel : 3,2M€",
      location: "Aix-en-Provence, France",
      description: "École de commerce reconnue fondée en 1985, spécialisée dans les formations commerciales et marketing. Réputée pour ses programmes Master Commerce et ses partenariats entreprises.",
      painPoints: [
        "Méthodes d'enseignement commercial traditionnelles dépassées",
        "Manque d'engagement des étudiants en cours de vente",
        "Difficulté à évaluer les compétences pratiques de négociation"
      ],
      currentSolution: "Jeux de rôles traditionnels, cas d'étude papier, simulations basiques",
      budget: "150 000€ - 300 000€ pour solutions pédagogiques innovantes",
      timeline: "Déploiement souhaité pour la rentrée de septembre (6 mois)",
      employees: "150 professeurs + 80 staff administratif",
      website: "www.escap-commerce.fr",
      linkedin: "ESCAP École Supérieure Commerce",
      foundedYear: 1985,
      keyPeople: [
        "Michel Dubois - Directeur Général (12 ans d'ancienneté)",
        "Dr. Marie Rousseau - Directrice Pédagogique Master Commerce",
        "Thomas Martin - DSI (Systèmes d'Information)",
        "Sophie Leclerc - Directrice Relations Entreprises"
      ]
    },
    ourProduct: {
      strengths: [
        { item: "IA conversationnelle unique marché éducation", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Adaptation française méthodes vente locales", impact: "Moyen", probability: "Élevée", score: 8 },
        { item: "Équipe fondatrice expérience EdTech + Commercial", impact: "Moyen", probability: "Élevée", score: 7 },
        { item: "Prix compétitif vs solutions internationales", impact: "Fort", probability: "Élevée", score: 8 },
        { item: "Évolutivité scenarios selon besoins pédagogiques", impact: "Fort", probability: "Élevée", score: 8 }
      ],
      weaknesses: [
        { item: "Startup jeune avec références limitées éducation", impact: "Fort", probability: "Élevée", score: 7 },
        { item: "Technologie complexe nécessitant accompagnement", impact: "Moyen", probability: "Élevée", score: 6 },
        { item: "Dépendance qualité connexion internet", impact: "Faible", probability: "Moyenne", score: 4 },
        { item: "Courbe apprentissage professeurs moins tech-savvy", impact: "Moyen", probability: "Moyenne", score: 5 }
      ],
      opportunities: [
        { item: "Digitalisation accélérée enseignement post-COVID", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Demande croissante soft skills recrutement", impact: "Fort", probability: "Élevée", score: 8 },
        { item: "Budgets européens transformation numérique éducation", impact: "Moyen", probability: "Moyenne", score: 6 },
        { item: "Partenariats potentiels autres écoles du réseau", impact: "Fort", probability: "Moyenne", score: 7 }
      ],
      threats: [
        { item: "Arrivée géants tech sur marché EdTech", impact: "Fort", probability: "Moyenne", score: 6 },
        { item: "Résistance structurelle changement enseignement", impact: "Moyen", probability: "Élevée", score: 6 },
        { item: "Réductions budgets éducation période difficile", impact: "Fort", probability: "Faible", score: 4 },
        { item: "Concurrence solutions gratuites existantes", impact: "Moyen", probability: "Moyenne", score: 5 }
      ]
    },
    theirSituation: {
      strengths: [
        { item: "Réputation solide école commerce région PACA", impact: "Moyen", probability: "Élevée", score: 7 },
        { item: "Corps professoral expérimenté et stable", impact: "Moyen", probability: "Élevée", score: 7 },
        { item: "Partenariats entreprises régionales établis", impact: "Fort", probability: "Élevée", score: 8 },
        { item: "Budget formation disponible pour innovation", impact: "Fort", probability: "Élevée", score: 8 }
      ],
      weaknesses: [
        { item: "Méthodes pédagogiques traditionnelles dépassées", impact: "Fort", probability: "Élevée", score: 8 },
        { item: "Manque engagement étudiants cours vente", impact: "Moyen", probability: "Élevée", score: 7 },
        { item: "Difficulté mesure compétences pratiques", impact: "Moyen", probability: "Élevée", score: 6 },
        { item: "Infrastructure IT datée", impact: "Moyen", probability: "Moyenne", score: 5 }
      ],
      opportunities: [
        { item: "Modernisation pour attractivité étudiants", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Amélioration employabilité diplômés", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Différenciation vs écoles concurrentes", impact: "Fort", probability: "Moyenne", score: 7 },
        { item: "Expansion offre formation continue entreprises", impact: "Moyen", probability: "Moyenne", score: 6 }
      ],
      threats: [
        { item: "Concurrence écoles plus digitalisées", impact: "Fort", probability: "Élevée", score: 8 },
        { item: "Résistance changement corps professoral", impact: "Moyen", probability: "Moyenne", score: 6 },
        { item: "Baisse attractivité formations traditionnelles", impact: "Moyen", probability: "Élevée", score: 7 },
        { item: "Réduction budgets publics enseignement", impact: "Fort", probability: "Faible", score: 4 }
      ]
    },
    timeline: {
      discovery: "Janvier-Février : Identification besoins, audit pédagogique actuel",
      negotiation: "Mars-Avril : Démonstrations, négociation pilote et contrat",
      decision: "Mai : Validation Comité Direction, signature contrat",
      implementation: "Juin-Août : Formation professeurs, configuration scenarios",
      deployment: "Septembre : Lancement rentrée avec classes pilotes",
      expansion: "Année 1 : Extension autres départements si succès pilote"
    },
    competitiveAnalysis: {
      capsim: {
        strengths: ["Marché établi", "Références internationales", "Intégration académique"],
        weaknesses: ["Pas d'IA conversationnelle", "Interface datée", "Support FR limité"],
        pricing: "45€/étudiant/an",
        marketShare: "25% marché simulations business"
      },
      marketplace: {
        strengths: ["Intégration LMS native", "Support multilingue", "Gamification"],
        weaknesses: ["Générique non adapté FR", "Prix élevé", "Pas focus négociation"],
        pricing: "38€/étudiant/an",
        marketShare: "18% marché simulations"
      },
      traditional: {
        strengths: ["Coût zero", "Maîtrise professeurs", "Flexibilité totale"],
        weaknesses: ["Pas mesure objective", "Engagement faible", "Pas évolutif"],
        pricing: "Gratuit",
        marketShare: "50% écoles encore traditionnelles"
      }
    },
    stakeholders: [
      {
        name: "Dr. Marie Rousseau",
        role: "Décisionnaire Principal",
        influence: "Très élevée",
        support: "Neutre-Positif",
        concerns: ["ROI pédagogique", "Adoption professeurs", "Budget"],
        approach: "Démonstration impact étudiant + formation équipe"
      },
      {
        name: "Michel Dubois",
        role: "Validation Budget",
        influence: "Élevée",
        support: "Neutre",
        concerns: ["ROI financier", "Stratégie école", "Innovation"],
        approach: "Positionnement innovation + différenciation concurrence"
      },
      {
        name: "Thomas Martin",
        role: "Validation Technique",
        influence: "Moyenne",
        support: "Neutre",
        concerns: ["Infrastructure", "Sécurité", "Maintenance"],
        approach: "Preuves techniques + support inclus"
      }
    ],
    riskFactors: [
      { risk: "Résistance professeurs changement", probability: "Moyenne", impact: "Fort", mitigation: "Formation accompagnement incluse" },
      { risk: "Budget final inférieur estimé", probability: "Faible", impact: "Moyen", mitigation: "Options modulaires flexibles" },
      { risk: "Concurrent établi contre-attaque", probability: "Moyenne", impact: "Moyen", mitigation: "Différenciation IA conversationnelle" },
      { risk: "Problème technique démonstration", probability: "Faible", impact: "Fort", mitigation: "Préparation environnement test dédié" }
    ],
    successFactors: [
      "Démonstration impact engagement étudiant mesurable",
      "Accompagnement change management professeurs",
      "Pilote limité pour prouver efficacité avant déploiement",
      "ROI clair en employabilité + satisfaction étudiante",
      "Support technique français réactif inclus"
    ],
    financialModel: {
      initialInvestment: "60 000€ première année (500 étudiants)",
      monthlyRecurring: "5 000€/mois (support + évolutions)",
      paybackPeriod: "18 mois (amélioration attractivité école)",
      lifetime: "36+ mois estimé (renouvellement probable)",
      expansionPotential: "Extension autres écoles réseau (200k€ supplémentaires)"
    }
  },
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
      description: "Boutique en ligne spécialisée dans la mode éthique et durable, lancée en 2018 par une ancienne consultante McKinsey passionnée de développement durable",
      painPoints: ["Difficulté à tracker le ROI des campagnes", "Perte de clients sans comprendre pourquoi", "Décisions marketing basées sur l'intuition"],
      currentSolution: "Google Analytics + tableurs Excel + Klaviyo",
      budget: "15-25k€/an",
      timeline: "Q1 2024",
      foundedYear: 2018,
      keyPeople: [
        "Émilie Durand - CEO & Fondatrice (Ex-McKinsey, MBA HEC)",
        "Thomas Chen - CTO (Ex-Shopify, ingénieur fullstack)",
        "Sophie Martin - CMO (Ex-L'Oréal, marketing digital)"
      ]
    },
    objectives: ["Démontrer la valeur du tracking unifié", "Quantifier les pertes actuelles", "Prouver le ROI 300%"],
    salesGoal: "Contrat Professional à 599€/mois (12 mois)",
    expectedRevenue: "7,188€",
    ourProduct: {
      strengths: [
        { item: "IA propriétaire avancée", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Setup ultra-rapide", impact: "Fort", probability: "Élevée", score: 8 },
        { item: "Support français expert", impact: "Moyen", probability: "Élevée", score: 7 }
      ],
      weaknesses: [
        { item: "Prix premium vs GA4", impact: "Fort", probability: "Élevée", score: 6 },
        { item: "Jeune sur le marché", impact: "Moyen", probability: "Moyenne", score: 5 }
      ],
      opportunities: [
        { item: "iOS 14.5 complique attribution", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Croissance e-commerce +45%", impact: "Fort", probability: "Élevée", score: 8 }
      ],
      threats: [
        { item: "Google améliore GA4", impact: "Moyen", probability: "Moyenne", score: 6 },
        { item: "Concurrents baissent prix", impact: "Moyen", probability: "Moyenne", score: 5 }
      ]
    },
    theirSituation: {
      strengths: [
        { item: "Google Analytics gratuit", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Équipe habituée", impact: "Moyen", probability: "Élevée", score: 7 }
      ],
      weaknesses: [
        { item: "Attribution imprécise", impact: "Fort", probability: "Élevée", score: 8 },
        { item: "Silos de données", impact: "Fort", probability: "Élevée", score: 7 }
      ],
      opportunities: [
        { item: "Économies immédiates", impact: "Fort", probability: "Élevée", score: 8 }
      ],
      threats: [
        { item: "Décisions marketing inefficaces", impact: "Fort", probability: "Élevée", score: 9 },
        { item: "Concurrents plus agiles", impact: "Moyen", probability: "Moyenne", score: 7 }
      ]
    },
    timeline: {
      discovery: "Audit GA4 actuel et analyse stack marketing",
      negotiation: "Démonstration attribution et ROI calculation",
      decision: "Validation budget et pilot test",
      implementation: "Setup plateforme et formations",
      deployment: "Go-live avec dashboards personnalisés",
      expansion: "Upgrade Enterprise si croissance"
    },
    competitiveAnalysis: {
      google: {
        strengths: ["Gratuit", "Intégration Google Ads"],
        weaknesses: ["Attribution limitée", "Interface complexe"],
        pricing: "Gratuit",
        marketShare: "85%"
      },
      triplewhale: {
        strengths: ["Marketing fort", "Interface simple"],
        weaknesses: ["Prix élevé", "Support limité"],
        pricing: "1200€/mois",
        marketShare: "5%"
      }
    },
    stakeholders: [
      {
        name: "Sophie Martin",
        role: "Décisionnaire Principal",
        influence: "Très élevée",
        support: "Neutre-Positif",
        concerns: ["ROI", "Formation équipe", "Complexité"],
        approach: "Démonstration ROI concret + formation incluse"
      }
    ],
    riskFactors: [
      { risk: "Budget réduit dernière minute", probability: "Faible", impact: "Fort", mitigation: "Options flexible pricing" }
    ],
    successFactors: ["Démonstration ROI chiffré", "Formation équipe incluse", "Support français"],
    financialModel: {
      initialInvestment: "7,188€ (première année)",
      monthlyRecurring: "599€/mois",
      paybackPeriod: "3 mois",
      lifetime: "24+ mois estimé",
      expansionPotential: "Upgrade Enterprise si croissance"
    }
  }
];

export const getEnhancedScenarioById = (id: string): EnhancedScenario | undefined => {
  return enhancedScenarios.find(scenario => scenario.id === id);
};