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
}

export const scenarios: Scenario[] = [
  {
    id: "kpi-performance",
    title: "Optimisation Analytics E-commerce",
    description: "Vendre une plateforme d'analytics avancée à un e-commerce en croissance",
    company: {
      name: "ModaStyle",
      sector: "E-commerce Mode",
      size: "50 employés",
      revenue: "8M€/an",
      location: "Lyon, France",
      description: "Boutique en ligne spécialisée dans la mode éthique et durable",
      painPoints: ["Difficulté à tracker le ROI des campagnes", "Perte de clients sans comprendre pourquoi"],
      currentSolution: "Google Analytics + tableurs Excel",
      budget: "15-25k€/an",
      timeline: "Q1 2024"
    },
    interlocutor: {
      name: "Sophie Martin",
      role: "Directrice Marketing",
      personality: "Analytique et perfectionniste",
      communicationStyle: "Directe, aime les chiffres concrets",
      decisionPower: "Décisionnaire avec validation CEO",
      priorities: ["ROI mesurable", "Facilité d'usage"],
      concerns: ["Coût", "Complexité"],
      motivations: ["Performance", "Croissance"],
      experience: "5 ans en marketing digital"
    },
    product: {
      name: "DataTrack Pro",
      description: "Plateforme analytics tout-en-un pour e-commerce avec IA prédictive",
      pricing: {
        starter: "299€/mois",
        professional: "599€/mois", 
        enterprise: "1200€/mois"
      },
      keyFeatures: ["Tracking multi-canal unifié", "Prédictions IA de churn"],
      competitiveAdvantages: ["Setup en 24h vs 2 semaines concurrence", "IA propriétaire 30% plus précise"],
      roi: "300% ROI en 6 mois",
      implementationTime: "2 semaines"
    },
    objectives: ["Démontrer la valeur du tracking unifié", "Quantifier les pertes actuelles"],
    salesGoal: "Contrat Pro à 599€/mois (12 mois)",
    expectedRevenue: "7,188€",
    swot: {
      strengths: ["IA propriétaire", "Setup rapide"],
      weaknesses: ["Prix premium", "Jeune entreprise"],
      opportunities: ["Marché en croissance", "Besoin urgent client"],
      threats: ["Concurrents établis", "Solutions open-source"]
    },
    competitorSwot: {
      strengths: ["Outils gratuits existants", "Habitudes établies"],
      weaknesses: ["Données silos", "Pas de prédictif"],
      opportunities: ["Coût zéro", "Connaissance interne"],
      threats: ["Manque de visibilité", "Erreurs décisions"]
    },
    probableObjections: ["C'est trop cher pour nous", "Google Analytics suffit"],
    successCriteria: ["Démonstration des pertes actuelles", "ROI chiffré présenté"],
    tools: ["calc_kpi", "score_phase"]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};