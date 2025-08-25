export interface SalesPhase {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  keyQuestions: string[];
  successIndicators: string[];
  commonMistakes: string[];
  nextPhases: string[];
  chatbotInstructions: {
    coldCall: string;
    rdv: string;
  };
  duration: {
    coldCall: string;
    rdv: string;
  };
}

export const salesPhases: SalesPhase[] = [
  {
    id: "ouverture",
    title: "Ouverture/Accroche",
    description: "Établir le contact, créer l'intérêt initial et obtenir l'attention du prospect",
    objectives: [
      "Créer un rapport de confiance immédiat",
      "Susciter l'intérêt et la curiosité",
      "Obtenir l'attention totale du prospect",
      "Poser le cadre de l'entretien",
      "Qualifier la disponibilité"
    ],
    keyQuestions: [
      "Ai-je bien [Nom] au téléphone ?",
      "Avez-vous 2 minutes pour que je vous explique pourquoi je vous appelle ?",
      "Êtes-vous la personne en charge de [domaine] chez [entreprise] ?",
      "Puis-je vous présenter rapidement notre solution ?"
    ],
    successIndicators: [
      "Prospect engagé dans la conversation",
      "Attention obtenue et maintenue",
      "Timing de l'appel validé",
      "Contexte professionnel confirmé"
    ],
    commonMistakes: [
      "Présentation trop longue de soi/entreprise",
      "Ne pas vérifier la disponibilité",
      "Aller directement au produit",
      "Ton trop commercial dès le début"
    ],
    nextPhases: ["decouverte"],
    chatbotInstructions: {
      coldCall: "Soyez très occupé(e) et pressé(e). Accordez maximum 30 secondes d'attention initiale. Interrompez si ça ne vous intéresse pas immédiatement. Demandez qui appelle et pourquoi très rapidement.",
      rdv: "Soyez courtois(e) mais professionnel(le). Vous avez du temps mais restez sur vos gardes. Écoutez la présentation de l'interlocuteur avec attention modérée."
    },
    duration: {
      coldCall: "3-5 minutes minimum",
      rdv: "5-8 minutes"
    }
  },
  {
    id: "decouverte",
    title: "Découverte",
    description: "Identifier les besoins, pain points et enjeux business du prospect",
    objectives: [
      "Identifier les problèmes actuels",
      "Comprendre l'impact business",
      "Qualifier le budget disponible",
      "Mapper le processus de décision",
      "Identifier les décideurs clés"
    ],
    keyQuestions: [
      "Comment gérez-vous actuellement [problématique] ?",
      "Quels sont les principaux défis que vous rencontrez ?",
      "Quel impact cela a-t-il sur votre activité ?",
      "Qui est impliqué dans ce type de décision ?",
      "Avez-vous déjà budgété pour ce type de solution ?"
    ],
    successIndicators: [
      "Pain points clairement identifiés",
      "Impact business quantifié",
      "Budget range qualifié",
      "Décideurs identifiés",
      "Urgence évaluée"
    ],
    commonMistakes: [
      "Questions trop fermées",
      "Ne pas creuser assez profond",
      "Oublier l'aspect émotionnel",
      "Passer trop vite aux solutions"
    ],
    nextPhases: ["reformulation"],
    chatbotInstructions: {
      coldCall: "Répondez de façon très succincte. Mentionnez vos défis principaux mais sans rentrer dans les détails. Montrez-vous de plus en plus intéressé(e) si les questions sont pertinentes.",
      rdv: "Partagez vos défis en détail. Expliquez le contexte et l'impact. Soyez transparent(e) sur votre situation actuelle et vos besoins."
    },
    duration: {
      coldCall: "5-8 minutes",
      rdv: "8-12 minutes"
    }
  },
  {
    id: "reformulation",
    title: "Reformulation/Proposition",
    description: "Synthétiser les besoins et proposer la solution adaptée",
    objectives: [
      "Confirmer la compréhension des besoins",
      "Hiérarchiser les priorités",
      "Proposer une solution personnalisée",
      "Créer le lien besoins-solution",
      "Obtenir l'accord sur la synthèse"
    ],
    keyQuestions: [
      "Si je comprends bien, votre principal défi est... ?",
      "Quelle serait votre priorité absolue ?",
      "Voyez-vous comment notre solution pourrait vous aider ?",
      "Est-ce que cette synthèse vous correspond ?",
      "Qu'est-ce qui vous semble le plus intéressant ?"
    ],
    successIndicators: [
      "Besoins confirmés par le prospect",
      "Priorités clairement établies",
      "Solution adaptée présentée",
      "Lien de valeur établi",
      "Intérêt manifesté"
    ],
    commonMistakes: [
      "Reformulation inexacte",
      "Proposition trop générique",
      "Ne pas faire valider",
      "Trop de fonctionnalités d'un coup"
    ],
    nextPhases: ["demonstration"],
    chatbotInstructions: {
      coldCall: "Confirmez rapidement si la synthèse est correcte. Si la solution semble intéressante, acceptez un RDV pour en discuter plus en détail.",
      rdv: "Validez ou corrigez la synthèse. Posez des questions sur la solution proposée. Montrez votre intérêt pour les aspects qui vous concernent."
    },
    duration: {
      coldCall: "1-2 minutes",
      rdv: "5-8 minutes"
    }
  },
  {
    id: "demonstration",
    title: "Démonstration/Preuves",
    description: "Présenter concrètement la valeur et apporter des preuves tangibles",
    objectives: [
      "Démontrer la valeur concrète",
      "Apporter des preuves crédibles",
      "Quantifier les bénéfices attendus",
      "Rassurer avec des références",
      "Éliminer les doutes techniques"
    ],
    keyQuestions: [
      "Souhaitez-vous voir comment cela fonctionne concrètement ?",
      "Voulez-vous parler à d'autres clients similaires ?",
      "Quel ROI attendez-vous de ce type d'investissement ?",
      "Qu'est-ce qui vous rassurerait le plus ?",
      "Avez-vous des questions techniques spécifiques ?"
    ],
    successIndicators: [
      "Valeur concrète démontrée",
      "ROI perçu et accepté",
      "Références crédibles fournies",
      "Doutes techniques levés",
      "Confiance établie"
    ],
    commonMistakes: [
      "Démonstration trop technique",
      "Références non pertinentes",
      "ROI non quantifié",
      "Trop long sur les fonctionnalités"
    ],
    nextPhases: ["objections"],
    chatbotInstructions: {
      coldCall: "Phase généralement non atteinte en cold call. Si mentionnée, demandez un RDV pour voir la démonstration complète.",
      rdv: "Écoutez attentivement la démonstration. Posez des questions précises. Demandez des références dans votre secteur. Questionnez le ROI."
    },
    duration: {
      coldCall: "Non applicable",
      rdv: "10-15 minutes"
    }
  },
  {
    id: "objections",
    title: "Objections/Négociation",
    description: "Traiter les objections et négocier les conditions d'accord",
    objectives: [
      "Comprendre les vraies objections",
      "Rassurer et lever les freins",
      "Négocier les conditions acceptables",
      "Trouver un terrain d'entente",
      "Avancer vers la décision"
    ],
    keyQuestions: [
      "Qu'est-ce qui vous pose problème exactement ?",
      "À part cela, y a-t-il autre chose qui vous préoccupe ?",
      "Que faudrait-il pour vous convaincre ?",
      "Comment pourrions-nous nous arranger ?",
      "Quelles garanties attendez-vous ?"
    ],
    successIndicators: [
      "Objections comprises et traitées",
      "Conditions négociées acceptables",
      "Freins principaux levés",
      "Progression vers engagement",
      "Accord de principe obtenu"
    ],
    commonMistakes: [
      "Répondre trop défensivement",
      "Ne pas creuser la vraie objection",
      "Céder trop facilement sur le prix",
      "Ignorer l'aspect émotionnel"
    ],
    nextPhases: ["closing"],
    chatbotInstructions: {
      coldCall: "Exprimez vos principales préoccupations (budget, timing, besoin de réflexion). Si bien traité, acceptez un RDV pour approfondir.",
      rdv: "Soulevez vos objections réelles. Négociez si possible. Demandez des garanties. Exprimez vos contraintes organisationnelles."
    },
    duration: {
      coldCall: "1-3 minutes",
      rdv: "8-12 minutes"
    }
  },
  {
    id: "closing",
    title: "Closing/Next Steps",
    description: "Conclure et organiser les prochaines étapes concrètes",
    objectives: [
      "Obtenir un engagement clair",
      "Définir les prochaines étapes",
      "Planifier la mise en œuvre",
      "Organiser le suivi",
      "Sécuriser la décision"
    ],
    keyQuestions: [
      "Êtes-vous prêt(e) à aller plus loin ensemble ?",
      "Quand pourrions-nous nous revoir ?",
      "Qu'est-ce qui vous empêche de décider maintenant ?",
      "Comment procédons-nous pour la suite ?",
      "Qui d'autre doit être impliqué dans la décision ?"
    ],
    successIndicators: [
      "Engagement clair obtenu",
      "Prochaines étapes définies",
      "Timeline établie",
      "Responsabilités clarifiées",
      "Suivi organisé"
    ],
    commonMistakes: [
      "Ne pas demander l'engagement",
      "Laisser dans le vague",
      "Oublier de planifier le suivi",
      "Ne pas impliquer les décideurs"
    ],
    nextPhases: [],
    chatbotInstructions: {
      coldCall: "OBJECTIF: Accepter un RDV pour approfondir. Si convaincu(e), proposez des créneaux. Sinon, demandez du temps de réflexion avec un rappel planifié.",
      rdv: "Prenez une décision ou demandez du temps. Si intéressé(e), définissez les next steps concrets. Impliquez votre équipe si nécessaire."
    },
    duration: {
      coldCall: "2-4 minutes",
      rdv: "5-8 minutes"
    }
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