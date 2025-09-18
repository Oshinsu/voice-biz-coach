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
    id: "sophie-martin",
    title: "Sophie Hennion-Moreau - EDHEC",
    sector: "Enseignement Supérieur",
    companySize: "2800 étudiants, 180 professeurs",
    budget: "12M€/an innovations pédagogiques",
    painPoints: [
      "Enseignement commercial théorique vs pratique terrain",
      "Évaluation compétences soft skills impossible",
      "Concurrence féroce écoles business (HEC, ESSEC)",
      "Scaling impossible formations commerciales"
    ],
    priorities: [
      "Innovation pédagogique IA",
      "ROI mesurable",
      "Différentiation concurrentielle",
      "Engagement étudiant +25%"
    ],
    decisionProcess: "Analyse pédagogique poussée, validation ROI",
    objectionStyle: "Exigeante, focus impact learning outcomes",
    communicationStyle: "Énergique, vocabulaire EdTech, questions précises"
  }
];

export const getPersonaById = (id: string): Persona | undefined => {
  return personas.find(persona => persona.id === id);
};