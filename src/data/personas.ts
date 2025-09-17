// Minimal personas data for VNS system
export interface Persona {
  id: string;
  title: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  companySize: string;
  budget: string;
  communicationStyle: string;
  experience: string;
  decisionPower: string;
  priorities: string[];
  concerns: string[];
  personality: string;
}

export const personas: Persona[] = [
  {
    id: "sophie-martin",
    title: "Sophie Martin - Dir. Marketing",
    name: "Sophie Martin",
    role: "Directrice Marketing & Analytics",
    company: "ModaStyle",
    sector: "E-commerce Mode",
    companySize: "50-200 employés",
    budget: "80k€/mois",
    communicationStyle: "Directe, analytique, demande des preuves chiffrées",
    experience: "Expert",
    decisionPower: "Decision-maker",
    priorities: ["Attribution marketing", "ROI mesurable", "Efficacité opérationnelle"],
    concerns: ["Complexité d'intégration", "Formation équipe", "Budget justifié"],
    personality: "Pragmatique, impatiente avec le blabla commercial, focus résultats"
  }
];