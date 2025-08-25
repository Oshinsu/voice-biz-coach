// Enhanced scenario data with detailed biographies, complete SWOT, and product deep-dives

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
  foundedYear: number;
  keyFigures: { name: string; role: string; background: string }[];
  financialHealth: "Excellent" | "Bon" | "Moyen" | "Préoccupant";
  growthRate: string;
  marketPosition: string;
  mainCompetitors: string[];
  technologyStack: string[];
  challenges: string[];
  strategicPriorities: string[];
  decisionProcess: string;
  organizationChart: {
    department: string;
    head: string;
    teamSize: number;
    influence: "Haute" | "Moyenne" | "Faible";
  }[];
}

export interface EnhancedInterlocutor {
  name: string;
  role: string;
  personality: string;
  communicationStyle: string;
  decisionPower: string;
  priorities: string[];
  concerns: string[];
  motivations: string[];
  experience: string;
  // Enhanced fields
  age: number;
  education: string;
  careerPath: string[];
  personalGoals: string[];
  workStyle: string;
  preferredChannels: string[];
  influencers: string[];
  previousExperiences: string[];
  successMetrics: string[];
  failureFears: string[];
  negotiationStyle: string;
  budgetAuthority: string;
  reportingLine: string[];
}

export interface EnhancedProduct {
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
  // Enhanced fields
  technicalSpecs: {
    architecture: string;
    security: string[];
    integrations: string[];
    scalability: string;
    performance: string;
  };
  businessMetrics: {
    customerSatisfaction: string;
    adoptionRate: string;
    timeToValue: string;
    supportResponse: string;
  };
  competitiveAnalysis: {
    competitor: string;
    ourAdvantage: string;
    theirStrength: string;
    marketShare: string;
  }[];
  casesStudies: {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
  }[];
  roadmap: {
    quarter: string;
    features: string[];
    businessImpact: string;
  }[];
}

export interface DetailedSwotAnalysis {
  strengths: {
    point: string;
    impact: "High" | "Medium" | "Low";
    evidence: string;
    score: number;
  }[];
  weaknesses: {
    point: string;
    impact: "High" | "Medium" | "Low";
    mitigation: string;
    score: number;
  }[];
  opportunities: {
    point: string;
    probability: "High" | "Medium" | "Low";
    timeframe: string;
    score: number;
  }[];
  threats: {
    point: string;
    likelihood: "High" | "Medium" | "Low";
    impact: string;
    score: number;
  }[];
}

export interface EnhancedScenario {
  id: string;
  title: string;
  description: string;
  company: EnhancedCompany;
  interlocutor: EnhancedInterlocutor;
  product: EnhancedProduct;
  objectives: string[];
  salesGoal: string;
  expectedRevenue: string;
  swot: DetailedSwotAnalysis;
  competitorSwot: DetailedSwotAnalysis;
  probableObjections: {
    objection: string;
    type: "Price" | "Technical" | "Strategic" | "Personal";
    likelihood: "High" | "Medium" | "Low";
    suggestedResponse: string;
    supportingData: string[];
  }[];
  successCriteria: string[];
  tools: string[];
  difficulty: "Facile" | "Moyen" | "Difficile";
  probability: number;
  // Enhanced fields
  salesPhases: {
    phase: string;
    status: "Not Started" | "In Progress" | "Completed";
    keyActivities: string[];
    successCriteria: string[];
    documents: string[];
  }[];
  competitiveLandscape: {
    directCompetitors: string[];
    indirectCompetitors: string[];
    substitutes: string[];
    entryBarriers: string[];
  };
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
      keyFigures: [
        { name: "Émilie Durand", role: "CEO & Fondatrice", background: "Ex-McKinsey, MBA HEC" },
        { name: "Thomas Chen", role: "CTO", background: "Ex-Shopify, ingénieur fullstack" },
        { name: "Sophie Martin", role: "CMO", background: "Ex-L'Oréal, marketing digital" }
      ],
      financialHealth: "Bon",
      growthRate: "+45% année/année",
      marketPosition: "Leader niche mode éthique",
      mainCompetitors: ["Veja", "Patagonia", "Eileen Fisher"],
      technologyStack: ["Shopify Plus", "Klaviyo", "Google Analytics", "Facebook Ads"],
      challenges: ["Attribution marketing complexe", "Customer lifetime value en baisse", "Acquisition coûteuse"],
      strategicPriorities: ["Expansion internationale", "Diversification produits", "Optimisation rentabilité"],
      decisionProcess: "Décision collégiale équipe direction (CEO, CTO, CMO)",
      organizationChart: [
        { department: "Marketing", head: "Sophie Martin", teamSize: 8, influence: "Haute" },
        { department: "Tech", head: "Thomas Chen", teamSize: 12, influence: "Moyenne" },
        { department: "Operations", head: "Julien Roy", teamSize: 15, influence: "Moyenne" },
        { department: "Finance", head: "Marie Blanc", teamSize: 3, influence: "Haute" }
      ]
    },
    interlocutor: {
      name: "Sophie Martin",
      role: "Directrice Marketing",
      personality: "Analytique et perfectionniste, orientée data-driven",
      communicationStyle: "Directe, aime les chiffres concrets et les preuves",
      decisionPower: "Décisionnaire avec validation CEO",
      priorities: ["ROI mesurable", "Facilité d'usage", "Scalabilité internationale"],
      concerns: ["Coût vs ROI", "Complexité technique", "Formation équipe"],
      motivations: ["Performance marketing", "Croissance durable", "Innovation"],
      experience: "5 ans en marketing digital",
      age: 32,
      education: "Master Marketing Digital ESCP",
      careerPath: ["Stagiaire L'Oréal", "Chef de produit digital", "CMO ModaStyle"],
      personalGoals: ["Devenir reconnue dans l'e-commerce", "Contribuer au développement durable"],
      workStyle: "Collaborative mais exigeante, fan des métriques",
      preferredChannels: ["Email", "Démonstrations en ligne", "Rapports détaillés"],
      influencers: ["Émilie Durand (CEO)", "Thomas Chen (CTO)", "Communauté e-commerce"],
      previousExperiences: ["Échec outil BI complexe", "Succès migration Klaviyo"],
      successMetrics: ["ROAS", "Customer LTV", "Taux de conversion"],
      failureFears: ["Investir dans un outil non utilisé", "Perdre en agilité"],
      negotiationStyle: "Analytique, cherche le win-win",
      budgetAuthority: "Jusqu'à 30k€ avec validation CEO",
      reportingLine: ["Émilie Durand (CEO)", "Comité de direction"]
    },
    product: {
      name: "DataTrack Pro",
      description: "Plateforme analytics tout-en-un pour e-commerce avec IA prédictive et attribution multi-canal",
      pricing: {
        starter: "299€/mois",
        professional: "599€/mois",
        enterprise: "1200€/mois"
      },
      keyFeatures: ["Attribution multi-canal", "Prédictions IA", "Dashboards temps réel", "Segmentation avancée"],
      competitiveAdvantages: ["Setup en 24h vs 2 semaines", "IA propriétaire 30% plus précise", "Support français"],
      roi: "300% ROI en 6 mois",
      implementationTime: "2 semaines",
      technicalSpecs: {
        architecture: "Cloud-native, API-first",
        security: ["SOC2", "GDPR compliant", "Encryption at rest"],
        integrations: ["Shopify", "WooCommerce", "Facebook", "Google", "Klaviyo", "50+ connecteurs"],
        scalability: "Auto-scaling, 99.9% uptime",
        performance: "< 2sec dashboard loading, temps réel"
      },
      businessMetrics: {
        customerSatisfaction: "4.8/5 (250+ avis)",
        adoptionRate: "95% après 30 jours",
        timeToValue: "7 jours en moyenne",
        supportResponse: "< 2h en business hours"
      },
      competitiveAnalysis: [
        { competitor: "Google Analytics 4", ourAdvantage: "Attribution multicanal native", theirStrength: "Gratuit", marketShare: "85%" },
        { competitor: "Triple Whale", ourAdvantage: "IA plus précise", theirStrength: "Marketing fort", marketShare: "5%" },
        { competitor: "Northbeam", ourAdvantage: "Prix accessible", theirStrength: "Enterprise features", marketShare: "3%" }
      ],
      casesStudies: [
        {
          client: "EcoFashion (mode durable)",
          industry: "E-commerce mode",
          challenge: "Attribution Facebook/Google imprécise",
          solution: "Implémentation DataTrack Pro avec attribution IA",
          results: ["ROAS +40%", "Coût acquisition -25%", "Attribution précise 90%"]
        }
      ],
      roadmap: [
        { quarter: "Q2 2024", features: ["Predictive LTV", "Advanced cohorts"], businessImpact: "Rétention +15%" },
        { quarter: "Q3 2024", features: ["Attribution mobile app", "TikTok tracking"], businessImpact: "Couverture +30%" }
      ]
    },
    objectives: ["Démontrer la valeur du tracking unifié", "Quantifier les pertes actuelles", "Prouver le ROI 300%"],
    salesGoal: "Contrat Professional à 599€/mois (12 mois)",
    expectedRevenue: "7,188€",
    swot: {
      strengths: [
        { point: "IA propriétaire avancée", impact: "High", evidence: "30% plus précise que concurrents", score: 9 },
        { point: "Setup ultra-rapide", impact: "High", evidence: "24h vs 2 semaines concurrence", score: 8 },
        { point: "Support français expert", impact: "Medium", evidence: "Équipe e-commerce dédiée", score: 7 }
      ],
      weaknesses: [
        { point: "Prix premium vs GA4", impact: "High", mitigation: "Démonstration ROI concret", score: 6 },
        { point: "Jeune sur le marché", impact: "Medium", mitigation: "Cases studies + témoignages", score: 5 }
      ],
      opportunities: [
        { point: "iOS 14.5 complique attribution", probability: "High", timeframe: "Immédiat", score: 9 },
        { point: "Croissance e-commerce +45%", probability: "High", timeframe: "12 mois", score: 8 }
      ],
      threats: [
        { point: "Google améliore GA4", likelihood: "Medium", impact: "Fonctionnalités gratuites", score: 6 },
        { point: "Concurrents baissent prix", likelihood: "Medium", impact: "Guerre des prix", score: 5 }
      ]
    },
    competitorSwot: {
      strengths: [
        { point: "Google Analytics gratuit", impact: "High", evidence: "Budget zéro", score: 9 },
        { point: "Équipe habituée", impact: "Medium", evidence: "Pas de formation", score: 7 }
      ],
      weaknesses: [
        { point: "Attribution imprécise", impact: "High", evidence: "Post-iOS 14.5", score: 8 },
        { point: "Silos de données", impact: "High", evidence: "Excel + GA + Klaviyo", score: 7 }
      ],
      opportunities: [
        { point: "Économies immédiates", probability: "High", timeframe: "Immédiat", score: 8 }
      ],
      threats: [
        { point: "Décisions marketing inefficaces", likelihood: "High", impact: "Perte revenus", score: 9 },
        { point: "Concurrents plus agiles", likelihood: "Medium", impact: "Parts de marché", score: 7 }
      ]
    },
    probableObjections: [
      {
        objection: "C'est trop cher pour nous",
        type: "Price",
        likelihood: "High",
        suggestedResponse: "Le coût de ne pas avoir de données précises vous coûte déjà plus cher",
        supportingData: ["ROI 300% en 6 mois", "Économies sur Facebook Ads mal optimisées", "Case study EcoFashion"]
      },
      {
        objection: "Google Analytics suffit",
        type: "Technical",
        likelihood: "High",
        suggestedResponse: "GA4 ne peut pas vous dire quel canal génère vraiment vos ventes depuis iOS 14.5",
        supportingData: ["Attribution multi-canal", "Étude impact iOS 14.5", "Démo attribution avancée"]
      }
    ],
    successCriteria: ["Démonstration des pertes actuelles", "ROI chiffré présenté", "Pilot test accepté"],
    tools: ["calc_kpi", "score_phase", "demo_attribution"],
    salesPhases: [
      {
        phase: "Découverte",
        status: "Completed",
        keyActivities: ["Audit GA4 actuel", "Analyse stack marketing", "Identification pain points"],
        successCriteria: ["Pain points validés", "Budget confirmé", "Timeline alignée"],
        documents: ["Audit GA4", "Stack analysis", "ROI calculator"]
      },
      {
        phase: "Démonstration",
        status: "In Progress",
        keyActivities: ["Demo attribution", "Case study presentation", "ROI calculation"],
        successCriteria: ["Demo positive", "ROI validé", "Questions techniques répondues"],
        documents: ["Demo script", "EcoFashion case study", "Technical FAQ"]
      }
    ],
    competitiveLandscape: {
      directCompetitors: ["Triple Whale", "Northbeam", "Attributer"],
      indirectCompetitors: ["Google Analytics 4", "Facebook Analytics"],
      substitutes: ["Solutions maison", "Agences spécialisées"],
      entryBarriers: ["Coût changement", "Formation équipe", "Intégrations techniques"]
    },
    financialModel: {
      initialInvestment: "7,188€ (première année)",
      monthlyRecurring: "599€/mois",
      paybackPeriod: "3 mois",
      lifetime: "24+ mois estimé",
      expansionPotential: "Upgrade Enterprise si croissance"
    }
  },
  // Add more enhanced scenarios here...
];

export const getEnhancedScenarioById = (id: string): EnhancedScenario | undefined => {
  return enhancedScenarios.find(scenario => scenario.id === id);
};