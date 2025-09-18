export interface Company {
  name: string;
  sector: string;
  size: string;
  revenue: string;
  location: string;
  description: string;
  painPoints: string[] | Array<{
    issue: string;
    description: string;
    cost: string;
    impact: string;
  }>;
  currentSolution: string;
  budget: string;
  timeline: string;
  employees?: string;
  website?: string;
  linkedin?: string;
  foundedYear?: number;
  keyPeople?: string[];
  // Enriched data fields
  metrics?: any;
  companyHistory?: any;
  ecosystemeTechnologique?: any;
  detailedFinancials?: any;
  orgChart?: any;
  technicalStack?: any;
  marketPosition?: any;
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
  background?: string;
  psychologyProfile?: any;
  linkedinProfile?: any;
  decisionProcess?: string;
  // Enriched data fields
  workingStyle?: any;
  personalityProfile?: any;
  professionalNetwork?: any;
  careerHistory?: any;
  dailyRoutine?: any;
  communicationPreferences?: any;
}

export interface Product {
  name: string;
  description: string;
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
    enterprise_plus?: string;
    pricingModel?: string;
    setupFees?: string;
    contractTerms?: string;
    overage?: string;
    migration?: string;
    cancelPolicy?: string;
  };
  pricing_starter?: string;
  pricing_professional?: string;
  pricing_enterprise?: string;
  key_features?: string[];
  competitive_advantages?: string[];
  implementation_time?: string;
  target_segments?: string[];
  technical_specs?: any;
  keyFeatures: string[];
  competitiveAdvantages: string[];
  roi: string;
  implementationTime: string;
  technicalSpecs?: any;
  marketPositioning?: any;
  targetSegments?: string[];
  // Enriched product data
  vendor?: any;
  marketingPositioning?: any;
  battleCards?: any;
  competitiveMatrix?: any;
  customerSegments?: any;
  useCases?: any;
  integrations?: any;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Stakeholder {
  name: string;
  role: string;
  influence: string;
  support: string;
  concerns: string[];
  approach: string;
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
  stakeholders?: Stakeholder[];
  // Additional fields for complete data  
  main_objectives?: string[];
  available_tools?: string[];
  pain_points?: string[];
  company_name?: string;
  company_sector?: string;
  company_size?: string;
  budget_range?: string;
  success_probability?: number;
  expected_revenue?: string;
  
  // Nouvelles propriétés intégrées
  salesStrategy?: {
    approach: {
      title: string;
      description: string;
    };
    evidence: {
      title: string;
      description: string;
    };
    pilot: {
      title: string;
      description: string;
    };
    sequence: string[];
    leveragePoints: string[];
  };
  
  marketData?: {
    marketOverview: {
      marketSize: string;
      growthRate: string;
      budgetRange?: string;
      expectedROI?: string;
      timeline?: string;
      keyPlayers?: string[];
      [key: string]: any;
    };
    technicalChallenges?: string[];
  };
  
  specificObjectives?: {
    coldCall: {
      primary: string;
      secondary: string;
      successMetrics: string;
    };
    rdv: {
      primary: string;
      secondary: string;
      successMetrics: string;
    };
  };
  
  performanceMetrics?: {
    kpis: Array<{
      name: string;
      current: string;
      target: string;
      category: string;
    }>;
    industrySpecific: { [key: string]: any };
  };
  
  tacticalAdvice?: {
    coldCall: string[];
    rdv: string[];
    industrySpecific: string[];
  };
  
  closingTechniques?: {
    buyingSignals: string[];
    scripts: string[];
    postSaleStrategy: string[];
    industryAdapted: boolean;
  };
  
  detailedObjections?: Array<{
    category: string;
    objection: string;
    frequency: 'Très fréquente' | 'Fréquente' | 'Occasionnelle';
    responses: string[];
    evidence: string;
    nextStep: string;
    persona_adaptation?: string;
  }>;
}