import { useState, useEffect } from 'react';

// Données centralisées Byss VNS - Single Source of Truth
export interface ByssVnsData {
  // Pricing & Business
  pricing: {
    monthlyPrice: number;
    annualPrice: number;
    currency: string;
    apiCostsIncluded: boolean;
    setup: string;
  };
  
  // Product Features
  features: {
    technology: string;
    latency: string;
    availability: string;
    setup: string;
    rgpdCompliant: boolean;
    languages: string[];
    support: string;
  };
  
  // Company Info
  company: {
    name: string;
    founded: number;
    employees: number;
    revenue: string;
    stage: string;
  };
  
  // Competitive Advantages
  advantages: string[];
  
  // EDHEC Context
  edhec: {
    budget: number;
    students: number;
    painPoints: string[];
    objectives: string[];
  };
  
  // Sophie Profile
  sophie: {
    name: string;
    role: string;
    trustLevel: number;
    mode: 'cold' | 'rdv';
    priorities: string[];
  };
}

export const BYSS_VNS_DATA: ByssVnsData = {
  pricing: {
    monthlyPrice: 250,  // 3000€/12 = 250€/mois
    annualPrice: 3000,  // Prix corrigé par l'utilisateur
    currency: '€',
    apiCostsIncluded: false,
    setup: '24h garanti'
  },
  
  features: {
    technology: 'GPT-4o Realtime',
    latency: '<200ms',
    availability: '99.9%',
    setup: '24h garanti',
    rgpdCompliant: true,
    languages: ['Français', 'Anglais'],
    support: 'FR 24/7'
  },
  
  company: {
    name: 'Byss',
    founded: 2021,
    employees: 3,
    revenue: '0€ ARR (Pre-revenue)',
    stage: 'Startup Early Stage'
  },
  
  advantages: [
    'Seule solution IA vocale GPT-4o Realtime pour éducation',
    'Analytics pédagogiques spécialisés business education', 
    'Setup 24h vs 6 mois solutions enterprise',
    'Support français vs offshore standard',
    'Prix transparent éducation vs licensing complexe'
  ],
  
  edhec: {
    budget: 12000000, // 12M€
    students: 2800,
    painPoints: [
      '73% étudiants jugent formations vente trop académiques',
      'Assessment centers 850€/étudiant, 2 fois/an max',
      'HEC lance IA Campus février 2024',
      '1 prof négociation pour 180 étudiants MSc'
    ],
    objectives: [
      'Satisfaction étudiants 87% → 92%',
      'Différentiation vs HEC/ESSEC',
      'ROI innovations mesurable',
      'Accreditations 2025 renouvelées'
    ]
  },
  
  sophie: {
    name: 'Sophie Hennion-Moreau',
    role: 'Directrice Innovation Pédagogique EDHEC',
    trustLevel: 45, // RDV mode par défaut
    mode: 'rdv',
    priorities: [
      'Impact learning outcomes mesurable',
      'Différentiation concurrentielle urgente',
      'Budget innovation 850k€ justifié',
      'Timeline accreditations respecté'
    ]
  }
};

export const useByssVnsData = () => {
  const [data, setData] = useState<ByssVnsData>(BYSS_VNS_DATA);
  const [loading, setLoading] = useState(false);

  // Calculer le ROI vs solutions actuelles
  const calculateROI = () => {
    const currentAssessmentCost = 850 * data.edhec.students * 2; // 850€ x 2800 étudiants x 2 fois/an
    const byssVnsCost = data.pricing.annualPrice;
    const savings = currentAssessmentCost - byssVnsCost;
    const roiPercent = ((savings / byssVnsCost) * 100).toFixed(0);
    
    return {
      currentCost: currentAssessmentCost,
      byssVnsCost,
      savings,
      roiPercent: `${roiPercent}%`,
      paybackMonths: Math.ceil(byssVnsCost / (savings / 12))
    };
  };

  // Générer prompt Sophie avec vraies données
  const getSophiePrompt = (mode: 'cold' | 'rdv' = data.sophie.mode) => {
    const roi = calculateROI();
    
    return `Tu es Sophie Hennion-Moreau, Directrice Innovation Pédagogique EDHEC Business School.

## CONTEXTE EDHEC RÉEL
- Budget innovation: ${(data.edhec.budget / 1000000).toFixed(0)}M€/an
- Étudiants: ${data.edhec.students}
- Challenge critique: ${data.edhec.painPoints[0]}
- Objectif: ${data.edhec.objectives[0]}

## BYSS VNS DONNÉES EXACTES
- Prix: ${data.pricing.annualPrice}€/an + coûts API
- Technology: ${data.features.technology}
- Setup: ${data.features.setup}
- ROI vs assessment centers: ${roi.roiPercent} (économie ${roi.savings.toLocaleString()}€/an)

## INTERACTION MODE: ${mode.toUpperCase()}
${mode === 'cold' ? 
  '**COLD OUTREACH** - Méfiance initiale, test préparation, 90 secondes attention.' :
  '**RDV PLANIFIÉ** - Collaborative, démonstration attendue, 45min agenda.'
}

Utilise CES DONNÉES EXACTES dans tes réponses. Score final /10 puis feedback constructif.`;
  };

  // Métriques pour l'UI
  const getDisplayMetrics = () => ({
    scenarios: '3 développés',
    technology: data.features.technology,
    setup: data.features.setup,
    compliance: data.features.rgpdCompliant ? 'RGPD' : 'Non-conforme',
    pricing: `${data.pricing.annualPrice}€/an`,
    roi: calculateROI()
  });

  return {
    data,
    loading,
    calculateROI,
    getSophiePrompt,
    getDisplayMetrics,
    setData
  };
};