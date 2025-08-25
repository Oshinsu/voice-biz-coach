export interface SalesPhase {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  keyQuestions: string[];
  successIndicators: string[];
  commonMistakes: string[];
  nextPhases: string[];
}

export const salesPhases: SalesPhase[] = [
  {
    id: "ouverture",
    title: "Ouverture",
    description: "Établir le contact et créer une première impression positive",
    objectives: [
      "Créer un rapport de confiance",
      "Susciter l'intérêt",
      "Obtenir l'attention",
      "Poser le cadre de l'entretien"
    ],
    keyQuestions: [
      "Quelle est votre situation actuelle ?",
      "Quels sont vos principaux défis ?",
      "Qu'est-ce qui vous amène à réfléchir à une solution ?",
      "Combien de temps avez-vous ?"
    ],
    successIndicators: [
      "Climat de confiance établi",
      "Prospect engagé dans la conversation",
      "Objectifs de l'entretien clarifiés",
      "Timing défini"
    ],
    commonMistakes: [
      "Parler trop de soi/son entreprise",
      "Aller trop vite sur la présentation produit",
      "Ne pas établir de rapport humain",
      "Oublier de qualifier le timing"
    ],
    nextPhases: ["decouverte"]
  },
  {
    id: "decouverte",
    title: "Découverte",
    description: "Comprendre en profondeur les besoins et enjeux du prospect",
    objectives: [
      "Identifier les pain points",
      "Comprendre l'organisation",
      "Qualifier le budget",
      "Identifier les décideurs"
    ],
    keyQuestions: [
      "Comment gérez-vous actuellement... ?",
      "Quels sont les impacts de cette situation ?",
      "Qui est impliqué dans cette décision ?",
      "Quel budget avez-vous prévu ?"
    ],
    successIndicators: [
      "Besoins clairement identifiés",
      "Enjeux business compris",
      "Processus de décision mapé",
      "Budget qualifié"
    ],
    commonMistakes: [
      "Poser des questions fermées",
      "Ne pas creuser assez",
      "Oublier l'aspect émotionnel",
      "Ne pas qualifier le budget"
    ],
    nextPhases: ["reformulation"]
  },
  {
    id: "reformulation",
    title: "Reformulation",
    description: "Reformuler et valider la compréhension des besoins",
    objectives: [
      "Confirmer la compréhension",
      "Hiérarchiser les besoins",
      "Obtenir l'accord sur les enjeux",
      "Préparer la proposition"
    ],
    keyQuestions: [
      "Si je comprends bien... ?",
      "Quel est le point le plus critique ?",
      "Quelles seraient les conséquences de ne rien faire ?",
      "Êtes-vous d'accord avec cette synthèse ?"
    ],
    successIndicators: [
      "Besoins confirmés par le prospect",
      "Priorités établies",
      "Enjeux validés",
      "Prospect en accord"
    ],
    commonMistakes: [
      "Reformuler de manière inexacte",
      "Ne pas faire valider",
      "Aller trop vite",
      "Oublier l'aspect émotionnel"
    ],
    nextPhases: ["proposition-valeur"]
  },
  {
    id: "proposition-valeur",
    title: "Proposition de valeur",
    description: "Présenter la solution en lien avec les besoins identifiés",
    objectives: [
      "Positionner la solution",
      "Créer de la valeur",
      "Différencier vs concurrence",
      "Susciter l'envie"
    ],
    keyQuestions: [
      "Voyez-vous comment cela répond à votre besoin ?",
      "Qu'est-ce qui vous semble le plus intéressant ?",
      "Avez-vous déjà vu quelque chose de similaire ?",
      "Quelles questions avez-vous ?"
    ],
    successIndicators: [
      "Lien clair besoins/solution",
      "Valeur perçue par le prospect",
      "Différenciation comprise",
      "Intérêt manifesté"
    ],
    commonMistakes: [
      "Présentation générique",
      "Trop de fonctionnalités",
      "Pas de lien avec les besoins",
      "Monologue trop long"
    ],
    nextPhases: ["preuves"]
  },
  {
    id: "preuves",
    title: "Preuves",
    description: "Apporter des preuves concrètes de la valeur proposée",
    objectives: [
      "Crédibiliser la proposition",
      "Rassurer le prospect",
      "Quantifier les bénéfices",
      "Éliminer les doutes"
    ],
    keyQuestions: [
      "Souhaitez-vous voir des exemples concrets ?",
      "Voulez-vous parler à d'autres clients ?",
      "Quelles garanties attendez-vous ?",
      "Qu'est-ce qui vous rassurerait ?"
    ],
    successIndicators: [
      "Crédibilité établie",
      "Doutes levés",
      "ROI perçu",
      "Confiance renforcée"
    ],
    commonMistakes: [
      "Preuves non pertinentes",
      "Trop de références",
      "Pas assez spécifique",
      "Oublier le ROI"
    ],
    nextPhases: ["objections", "negociation"]
  },
  {
    id: "objections",
    title: "Objections",
    description: "Traiter les objections et réticences du prospect",
    objectives: [
      "Comprendre les vraies objections",
      "Rassurer le prospect",
      "Lever les freins",
      "Avancer vers la décision"
    ],
    keyQuestions: [
      "Qu'est-ce qui vous pose problème exactement ?",
      "À part cela, y a-t-il autre chose ?",
      "Comment voyez-vous les choses ?",
      "Que faudrait-il pour vous convaincre ?"
    ],
    successIndicators: [
      "Objections comprises",
      "Réponses satisfaisantes",
      "Freins levés",
      "Progression vers décision"
    ],
    commonMistakes: [
      "Répondre trop vite",
      "Ne pas creuser l'objection",
      "Être défensif",
      "Ignorer l'émotion"
    ],
    nextPhases: ["negociation", "closing"]
  },
  {
    id: "negociation",
    title: "Négociation",
    description: "Négocier les conditions commerciales",
    objectives: [
      "Trouver un accord gagnant-gagnant",
      "Préserver la valeur",
      "Finaliser les conditions",
      "Préparer la signature"
    ],
    keyQuestions: [
      "Que proposez-vous ?",
      "Comment pourrait-on s'arranger ?",
      "Qu'est-ce qui est négociable pour vous ?",
      "À quelles conditions pouvez-vous décider ?"
    ],
    successIndicators: [
      "Accord trouvé",
      "Conditions acceptables",
      "Valeur préservée",
      "Engagement mutuel"
    ],
    commonMistakes: [
      "Céder trop facilement",
      "Négocier sans contrepartie",
      "Oublier la valeur",
      "Précipiter l'accord"
    ],
    nextPhases: ["closing"]
  },
  {
    id: "closing",
    title: "Closing",
    description: "Conclure la vente et obtenir l'engagement",
    objectives: [
      "Obtenir la décision",
      "Formaliser l'accord",
      "Rassurer sur le choix",
      "Organiser la suite"
    ],
    keyQuestions: [
      "Êtes-vous prêt à démarrer ?",
      "Quand souhaitez-vous commencer ?",
      "Qu'est-ce qui vous empêche de décider maintenant ?",
      "Comment procède-t-on ?"
    ],
    successIndicators: [
      "Décision prise",
      "Engagement formel",
      "Planning défini",
      "Satisfaction mutuelle"
    ],
    commonMistakes: [
      "Ne pas demander la vente",
      "Continuer à vendre après le oui",
      "Douter de sa proposition",
      "Oublier les next steps"
    ],
    nextPhases: ["next-steps"]
  },
  {
    id: "next-steps",
    title: "Next Steps",
    description: "Organiser la suite et assurer le suivi",
    objectives: [
      "Définir les étapes suivantes",
      "Planifier la mise en œuvre",
      "Organiser le suivi",
      "Maintenir l'engagement"
    ],
    keyQuestions: [
      "Quelles sont les prochaines étapes ?",
      "Qui fait quoi et quand ?",
      "Comment restons-nous en contact ?",
      "Quand nous revoyons-nous ?"
    ],
    successIndicators: [
      "Plan d'action clair",
      "Responsabilités définies",
      "Timeline établie",
      "Suivi organisé"
    ],
    commonMistakes: [
      "Laisser dans le flou",
      "Ne pas planifier de suivi",
      "Oublier les détails pratiques",
      "Perdre le contact"
    ],
    nextPhases: []
  }
];

export const getPhaseById = (id: string): SalesPhase | undefined => {
  return salesPhases.find(phase => phase.id === id);
};

export const getNextPhases = (currentPhaseId: string): SalesPhase[] => {
  const currentPhase = getPhaseById(currentPhaseId);
  if (!currentPhase) return [];
  
  return currentPhase.nextPhases.map(phaseId => getPhaseById(phaseId)).filter(Boolean) as SalesPhase[];
};