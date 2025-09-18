// Adaptation contextuelle des personnalités selon le type d'appel et les données spécifiques

export interface PersonalityProfile {
  basePersonality: string;
  communicationStyle: string;
  trustBaseline: number;
  interruptionFrequency: 'low' | 'medium' | 'high';
  attentionSpan: number; // en secondes
  objectionStyle: string;
  decisionApproach: string;
  specificTraits: string[];
}

export interface ContextualPersonality extends PersonalityProfile {
  conversationType: 'cold-call' | 'rdv';
  sectorAdaptations: string[];
  roleSpecificBehaviors: string[];
  concernBasedReactions: string[];
}

export function createPersonalityProfile(
  interlocutorData: any,
  conversationType: 'cold-call' | 'rdv'
): ContextualPersonality {
  const baseProfile = adaptToConversationType(interlocutorData, conversationType);
  const sectorAdaptations = getSectorSpecificBehaviors(interlocutorData);
  const roleSpecificBehaviors = getRoleSpecificBehaviors(interlocutorData);
  const concernBasedReactions = getConcernBasedReactions(interlocutorData);

  return {
    ...baseProfile,
    conversationType,
    sectorAdaptations,
    roleSpecificBehaviors,
    concernBasedReactions
  };
}

function adaptToConversationType(
  interlocutorData: any,
  conversationType: 'cold-call' | 'rdv'
): PersonalityProfile {
  const baseTrust = conversationType === 'cold-call' ? 10 : 35;
  const basePersonality = interlocutorData.personality || "Professionnel standard";

  if (conversationType === 'cold-call') {
    return {
      basePersonality: `COLD CALL MODE: ${basePersonality} - Très occupé(e), méfiant(e), temps limité`,
      communicationStyle: "Bref, direct, souvent interrompt, demande rapidement le but de l'appel",
      trustBaseline: baseTrust,
      interruptionFrequency: 'high',
      attentionSpan: 30, // 30 secondes max avant interruption
      objectionStyle: "Objections rapides et directes, réflexes défensifs",
      decisionApproach: "Impossible de décider maintenant, au mieux accepter un RDV",
      specificTraits: [
        "Interrompt fréquemment",
        "Pose des questions directes (Qui? Pourquoi? Combien de temps?)",
        "Montre de l'impatience si pas d'intérêt immédiat",
        "Protège son temps jalousement",
        "Réflexe de raccrochage si approche trop commerciale"
      ]
    };
  } else {
    return {
      basePersonality: `RDV MODE: ${basePersonality} - Disponible, attentif(ve), mais prudent(e)`,
      communicationStyle: interlocutorData.communication_style || "Méthodique et réfléchi",
      trustBaseline: baseTrust,
      interruptionFrequency: 'low',
      attentionSpan: 300, // 5 minutes d'attention continue
      objectionStyle: interlocutorData.objection_style || "Objections réfléchies et argumentées",
      decisionApproach: "Peut envisager une décision avec bonnes conditions",
      specificTraits: [
        "Écoute attentivement les présentations",
        "Pose des questions approfondies",
        "Prend des notes mentales",
        "Partage plus facilement ses défis",
        "Accepte les démonstrations détaillées"
      ]
    };
  }
}

function getSectorSpecificBehaviors(interlocutorData: any): string[] {
  const role = interlocutorData.role?.toLowerCase() || '';
  const behaviors = [];

  // Fintech spécifique
  if (role.includes('cto') || role.includes('tech')) {
    behaviors.push(
      "Pose des questions techniques précises sur l'architecture",
      "S'inquiète de la scalabilité et performance",
      "Demande des détails sur la sécurité et conformité",
      "Évalue la stack technique et les intégrations"
    );
  }

  if (role.includes('risk') || role.includes('risque')) {
    behaviors.push(
      "Très préoccupé(e) par la conformité réglementaire",
      "Demande des garanties sur la précision des modèles",
      "Insiste sur les tests et validations",
      "Craint les faux positifs/négatifs"
    );
  }

  if (role.includes('ceo') || role.includes('founder')) {
    behaviors.push(
      "Vision stratégique, pense ROI et croissance",
      "Préoccupé(e) par l'avantage concurrentiel",
      "Évalue l'impact sur le time-to-market",
      "Considère les implications de levée de fonds"
    );
  }

  if (role.includes('data') || role.includes('scientist')) {
    behaviors.push(
      "Expertise scientifique, demande des preuves",
      "S'intéresse aux algorithmes et méthodologies",
      "Questionne la qualité des données",
      "Évalue l'innovation technique"
    );
  }

  return behaviors;
}

function getRoleSpecificBehaviors(interlocutorData: any): string[] {
  const decisionPower = interlocutorData.decision_power || '';
  const behaviors = [];

  if (decisionPower.includes('Décisionnaire') || decisionPower.includes('final')) {
    behaviors.push(
      "Prend des décisions, mais consulte son équipe",
      "Évalue l'impact global sur l'organisation",
      "S'intéresse aux aspects financiers et ROI",
      "Peut accélérer les processus si convaincu(e)"
    );
  }

  if (decisionPower.includes('Validation') || decisionPower.includes('Expertise')) {
    behaviors.push(
      "Influence technique forte mais pas décision finale",
      "Doit valider la faisabilité et conformité",
      "Pose des questions techniques approfondies",
      "Son avis pèse lourd dans la décision"
    );
  }

  return behaviors;
}

function getConcernBasedReactions(interlocutorData: any): string[] {
  const concerns = interlocutorData.concerns || [];
  const reactions = [];

  concerns.forEach((concern: string) => {
    if (concern.toLowerCase().includes('coût') || concern.toLowerCase().includes('budget')) {
      reactions.push("Réagit fortement aux mentions de prix, demande des justifications ROI");
    }
    
    if (concern.toLowerCase().includes('complexité') || concern.toLowerCase().includes('intégration')) {
      reactions.push("Insiste sur la simplicité d'implémentation et l'accompagnement");
    }
    
    if (concern.toLowerCase().includes('performance') || concern.toLowerCase().includes('technique')) {
      reactions.push("Demande des preuves techniques et des références de performance");
    }
    
    if (concern.toLowerCase().includes('régulation') || concern.toLowerCase().includes('conformité')) {
      reactions.push("Très vigilant(e) sur les aspects réglementaires et de compliance");
    }
  });

  return reactions;
}

// Fonction pour obtenir le prompt de personnalité complet
export function generatePersonalityPrompt(
  interlocutorData: any,
  conversationType: 'cold-call' | 'rdv'
): string {
  const personality = createPersonalityProfile(interlocutorData, conversationType);
  
  return `
PERSONNALITÉ CONTEXTUELLE - ${conversationType.toUpperCase()}:

PROFIL DE BASE:
${personality.basePersonality}

STYLE DE COMMUNICATION:
${personality.communicationStyle}

COMPORTEMENTS SPÉCIFIQUES:
${personality.specificTraits.map(trait => `• ${trait}`).join('\n')}

ADAPTATIONS SECTORIELLES:
${personality.sectorAdaptations.map(adaptation => `• ${adaptation}`).join('\n')}

COMPORTEMENTS LIÉS AU RÔLE:
${personality.roleSpecificBehaviors.map(behavior => `• ${behavior}`).join('\n')}

RÉACTIONS AUX PRÉOCCUPATIONS:
${personality.concernBasedReactions.map(reaction => `• ${reaction}`).join('\n')}

INSTRUCTIONS COMPORTEMENTALES:
- Niveau de confiance initial: ${personality.trustBaseline}/100
- Fréquence d'interruption: ${personality.interruptionFrequency}
- Durée d'attention continue: ${personality.attentionSpan} secondes
- Style d'objection: ${personality.objectionStyle}
- Approche décisionnelle: ${personality.decisionApproach}

RAPPEL CRITIQUE: Vous DEVEZ respecter ces traits de personnalité de façon cohérente tout au long de la conversation. Votre comportement doit être authentique et prévisible selon votre profil.
`;
}