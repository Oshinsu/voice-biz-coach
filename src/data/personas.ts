export interface Persona {
  id: string;
  title: string;
  sector: string;
  companySize: string;
  budget: string;
  painPoints: string[];
  priorities: string[];
  decisionProcess: string;
  objectionStyle: string;
  communicationStyle: string;
}

export const personas: Persona[] = [
  {
    id: "dg-pme-retail",
    title: "DG PME Retail",
    sector: "Commerce de détail",
    companySize: "10-50 employés",
    budget: "Budget serré",
    painPoints: [
      "Marges sous pression",
      "Concurrence digitale",
      "Gestion des stocks",
      "Fidélisation client"
    ],
    priorities: [
      "ROI immédiat",
      "Solutions simples",
      "Coût maîtrisé",
      "Rapidité de mise en œuvre"
    ],
    decisionProcess: "Décision rapide, pragmatique",
    objectionStyle: "Direct, focus sur le prix et ROI",
    communicationStyle: "Concret, chiffres, exemples secteur"
  },
  {
    id: "cmo-scaleup-saas",
    title: "CMO Scale-up SaaS",
    sector: "SaaS B2B",
    companySize: "50-200 employés",
    budget: "Budget confortable",
    painPoints: [
      "Acquisition coûteuse",
      "Cycles de vente longs",
      "Churn élevé",
      "Attribution marketing"
    ],
    priorities: [
      "Croissance scalable",
      "Data-driven",
      "Optimisation continue",
      "Innovation"
    ],
    decisionProcess: "Analyse poussée, validation équipe",
    objectionStyle: "Analytique, veut des preuves",
    communicationStyle: "Métrique, comparaisons, case studies"
  },
  {
    id: "resp-achat-public",
    title: "Responsable Achat Secteur Public",
    sector: "Administration publique",
    companySize: "100+ employés",
    budget: "Budget contraint et réglementé",
    painPoints: [
      "Contraintes réglementaires",
      "Processus longs",
      "Transparence exigée",
      "Contrôle budgétaire"
    ],
    priorities: [
      "Conformité",
      "Transparence",
      "Optimisation coûts",
      "Service public"
    ],
    decisionProcess: "Processus formalisé, commission",
    objectionStyle: "Prudent, demande garanties",
    communicationStyle: "Formel, références, certifications"
  },
  {
    id: "dir-ecom-dtc",
    title: "Directeur E-commerce DTC",
    sector: "E-commerce",
    companySize: "20-100 employés",
    budget: "Budget orienté performance",
    painPoints: [
      "ROAS en baisse",
      "CAC croissant",
      "Concurrence publicitaire",
      "Retention client"
    ],
    priorities: [
      "Performance publicitaire",
      "LTV optimization",
      "Conversion rate",
      "Automatisation"
    ],
    decisionProcess: "Test & learn, validation rapide",
    objectionStyle: "Orienté résultats, sceptique",
    communicationStyle: "KPIs, tests A/B, données"
  },
  {
    id: "fondateur-artisan",
    title: "Fondateur Artisan/Local",
    sector: "Artisanat/Commerce local",
    companySize: "1-10 employés",
    budget: "Budget très limité",
    painPoints: [
      "Visibilité limitée",
      "Concurrence grandes enseignes",
      "Digitalisation difficile",
      "Temps limité"
    ],
    priorities: [
      "Simplicité",
      "Coût minimal",
      "Résultats visibles",
      "Support inclus"
    ],
    decisionProcess: "Décision personnelle, émotionnelle",
    objectionStyle: "Réticent au changement, besoin de réassurance",
    communicationStyle: "Humain, exemples concrets, témoignages"
  }
];

export const getPersonaById = (id: string): Persona | undefined => {
  return personas.find(persona => persona.id === id);
};