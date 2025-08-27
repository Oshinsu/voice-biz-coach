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
  employees?: string;
  website?: string;
  linkedin?: string;
  foundedYear?: number;
  keyPeople?: string[];
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
}

export interface Product {
  name: string;
  description: string;
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
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
}