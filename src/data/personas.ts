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
    id: "sophie-hennion-moreau",
    title: "Sophie Hennion-Moreau - EDHEC (4ème Mondiale FT)",
    sector: "Enseignement Supérieur Business Schools",
    companySize: "9,000 étudiants, 350 professeurs",
    budget: "1.2M€/an innovations pédagogiques (80k€ max projet Byss VNS)",
    painPoints: [
      "Enseignement commercial théorique vs pratique terrain (73% étudiants insatisfaits)",
      "Évaluation compétences soft skills impossible objectivement", 
      "Concurrence féroce: maintenir leadership 4ème mondial vs HEC/ESSEC",
      "Scaling impossible formations commerciales (2h→8h pratique souhaité)"
    ],
    priorities: [
      "Innovation pédagogique IA différenciante",
      "ROI mesurable sur learning outcomes",
      "Maintenir leadership 4ème mondial FT 2024",
      "Engagement étudiant +5pts (82%→87%)"
    ],
    decisionProcess: "Analyse pédagogique rigoureuse, validation ROI quantifiable, sponsorship DG >50k€",
    objectionStyle: "Exigeante metrics, focus impact learning outcomes mesurable",
    communicationStyle: "Énergique, vocabulaire EdTech expert, questions précises ROI"
  }
];

export const getPersonaById = (id: string): Persona | undefined => {
  return personas.find(persona => persona.id === id);
};