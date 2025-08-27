// Architecture cognitive de découverte progressive d'informations
// Remplace le système "God Mode" par un système "Discovery Mode"

export interface InformationLayer {
  level: number;
  name: string;
  description: string;
  unlockConditions: string[];
  informationType: 'public' | 'general' | 'specific' | 'sensitive' | 'confidential';
  content: Record<string, any>;
}

export interface TrustLevel {
  level: number;
  name: string;
  description: string;
  requiredActions: string[];
  threshold: number;
}

export interface CognitiveState {
  trustLevel: number;
  acquiredInformation: Record<string, any>;
  conversationMemory: string[];
  revealedLayers: number[];
  behavioralTriggers: string[];
  lastInteraction: Date;
  currentPhase: string;
  conversationType: 'cold-call' | 'rdv';
  timeSpentInPhase: number;
  phaseStartTime: Date;
}

// Système de niveaux de confiance
export const TRUST_LEVELS: TrustLevel[] = [
  {
    level: 0,
    name: "INCONNU",
    description: "Contact initial, aucune confiance établie",
    requiredActions: [],
    threshold: 0
  },
  {
    level: 1,
    name: "CONTACT_ETABLI",
    description: "Présentation crédible, identité vérifiée",
    requiredActions: ["identify_self", "explain_purpose", "show_expertise"],
    threshold: 20
  },
  {
    level: 2,
    name: "INTEREST_MANIFESTE",
    description: "Questions pertinentes, compréhension du secteur",
    requiredActions: ["ask_relevant_questions", "understand_sector", "show_value"],
    threshold: 40
  },
  {
    level: 3,
    name: "CONFIANCE_PARTIELLE",
    description: "Crédibilité démontrée, solutions potentiellement intéressantes",
    requiredActions: ["demonstrate_expertise", "provide_references", "understand_needs"],
    threshold: 60
  },
  {
    level: 4,
    name: "CONFIANCE_ETABLIE",
    description: "Partenaire potentiel sérieux, discussions approfondies",
    requiredActions: ["prove_roi", "address_concerns", "build_relationship"],
    threshold: 80
  },
  {
    level: 5,
    name: "CONFIANCE_TOTALE",
    description: "Partenaire de confiance, transparence complète",
    requiredActions: ["demonstrate_success", "guarantee_results", "long_term_vision"],
    threshold: 100
  }
];

// Couches d'information par niveau de confiance avec adaptation aux types d'appel
export function createInformationLayers(scenarioData: any, interlocutorData: any, conversationType: 'cold-call' | 'rdv' = 'cold-call'): InformationLayer[] {
  const trustMultiplier = conversationType === 'cold-call' ? 1.4 : 1.0; // Cold call = 40% plus exigeant
  return [
    {
      level: 0,
      name: "INFORMATION_PUBLIQUE",
      description: "Informations accessibles publiquement",
      unlockConditions: ["always_available"],
      informationType: 'public',
      content: {
        companyName: scenarioData.company_name,
        sector: scenarioData.company_sector,
        size: scenarioData.company_size,
        role: interlocutorData?.role || "responsable des achats",
        name: interlocutorData?.name || "Contact Commercial"
      }
    },
    {
      level: 1,
      name: "CONTEXTE_GENERAL",
      description: "Informations générales après établissement du contact",
      unlockConditions: ["trust_level_1", "legitimate_interest"],
      informationType: 'general',
      content: {
        generalChallenges: [
          "Nous cherchons toujours à optimiser nos processus",
          "L'efficacité est importante pour nous",
          "Nous évaluons régulièrement nos outils"
        ],
        currentTools: scenarioData.available_tools?.slice(0, 2) || [],
        publicObjectives: ["Amélioration continue", "Optimisation des coûts"]
      }
    },
    {
      level: 2,
      name: "DEFIS_SPECIFIQUES",
      description: "Défis et problématiques spécifiques",
      unlockConditions: ["trust_level_2", "relevant_questions", "sector_understanding"],
      informationType: 'specific',
      content: {
        specificChallenges: scenarioData.pain_points?.slice(0, 2) || [],
        priorities: interlocutorData?.priorities?.slice(0, 2) || scenarioData.main_objectives?.slice(0, 2) || [],
        currentLimitations: [
          "Nos outils actuels ont leurs limites",
          "Nous cherchons à faire mieux"
        ]
      }
    },
    {
      level: 3,
      name: "INFORMATIONS_OPERATIONNELLES",
      description: "Détails opérationnels et processus internes",
      unlockConditions: ["trust_level_3", "demonstrate_value", "address_concerns"],
      informationType: 'sensitive',
      content: {
        detailedPainPoints: scenarioData.pain_points || [],
        fullObjectives: scenarioData.main_objectives || [],
        currentSolutionDetails: scenarioData.current_solution || "Non spécifié",
        timeline: scenarioData.timeline_description || "Non défini",
        decisionProcess: interlocutorData?.decision_process || "Processus standard d'évaluation"
      }
    },
    {
      level: 4,
      name: "INFORMATIONS_STRATEGIQUES",
      description: "Budget, timeline précis, processus décisionnel",
      unlockConditions: ["trust_level_4", "proven_roi", "strong_relationship"],
      informationType: 'confidential',
      content: {
        budgetRange: scenarioData.budget_range || "Non déterminé",
        exactTimeline: scenarioData.timeline_description || "À définir",
        decisionMakers: "Direction + équipe technique",
        competitors: "Nous évaluons plusieurs solutions",
        internalChallenges: interlocutorData?.concerns || []
      }
    },
    {
      level: 5,
      name: "INFORMATIONS_CONFIDENTIELLES",
      description: "Détails financiers précis, stratégie interne",
      unlockConditions: ["trust_level_5", "partnership_intent", "mutual_commitment"],
      informationType: 'confidential',
      content: {
        exactBudget: `Budget précis disponible dans la gamme ${scenarioData.budget_range}`,
        strategicObjectives: "Objectifs stratégiques internes",
        competitivePosition: "Notre position concurrentielle",
        futureProjects: "Projets futurs envisagés"
      }
    }
  ];
}

// Fonctions de découverte d'information
export const DISCOVERY_FUNCTIONS = [
  {
    name: "askColleague",
    description: "Consulter un collègue pour obtenir des informations spécifiques",
    parameters: {
      type: "object",
      properties: {
        question: { type: "string", description: "Question à poser au collègue" },
        topic: { type: "string", description: "Sujet de la question (budget, technique, timeline, etc.)" }
      },
      required: ["question", "topic"]
    }
  },
  {
    name: "checkBudget",
    description: "Vérifier les informations budgétaires disponibles",
    parameters: {
      type: "object", 
      properties: {
        requestType: { type: "string", description: "Type de vérification (range, exact, approval)" },
        context: { type: "string", description: "Contexte de la demande budgétaire" }
      },
      required: ["requestType", "context"]
    }
  },
  {
    name: "consultDecisionMaker",
    description: "Consulter les décideurs pour une information importante",
    parameters: {
      type: "object",
      properties: {
        topic: { type: "string", description: "Sujet à discuter avec les décideurs" },
        urgency: { type: "string", description: "Niveau d'urgence (low, medium, high)" }
      },
      required: ["topic", "urgency"]
    }
  },
  {
    name: "reviewInternalOptions",
    description: "Examiner les options internes disponibles",
    parameters: {
      type: "object",
      properties: {
        area: { type: "string", description: "Domaine à examiner (tools, processes, resources)" },
        comparison: { type: "string", description: "Élément de comparaison proposé" }
      },
      required: ["area", "comparison"]
    }
  }
];

// Évaluation de la confiance basée sur les actions
export function evaluateTrustLevel(actions: string[], currentLevel: number): number {
  const trustPoints = {
    identify_self: 5,
    explain_purpose: 5,
    show_expertise: 10,
    ask_relevant_questions: 8,
    understand_sector: 12,
    show_value: 15,
    demonstrate_expertise: 18,
    provide_references: 12,
    understand_needs: 20,
    prove_roi: 25,
    address_concerns: 20,
    build_relationship: 15,
    demonstrate_success: 30,
    guarantee_results: 25,
    long_term_vision: 20
  };

  const totalPoints = actions.reduce((sum, action) => {
    return sum + (trustPoints[action as keyof typeof trustPoints] || 0);
  }, 0);

  return Math.min(currentLevel + totalPoints, 100);
}

// Vérification des conditions de déverrouillage
export function checkUnlockConditions(
  conditions: string[], 
  trustLevel: number, 
  behavioralTriggers: string[]
): boolean {
  return conditions.every(condition => {
    if (condition === "always_available") return true;
    if (condition.startsWith("trust_level_")) {
      const requiredLevel = parseInt(condition.split("_")[2]);
      const requiredThreshold = TRUST_LEVELS[requiredLevel]?.threshold || 0;
      return trustLevel >= requiredThreshold;
    }
    return behavioralTriggers.includes(condition);
  });
}

// Gestionnaire de l'état cognitif
export class CognitiveStateManager {
  private state: CognitiveState;
  private informationLayers: InformationLayer[];

  constructor(scenarioData: any, interlocutorData: any, conversationType: 'cold-call' | 'rdv' = 'cold-call') {
    this.state = {
      trustLevel: 0,
      acquiredInformation: {},
      conversationMemory: [],
      revealedLayers: [0], // Toujours révéler le niveau public
      behavioralTriggers: [],
      lastInteraction: new Date(),
      currentPhase: 'ouverture',
      conversationType,
      timeSpentInPhase: 0,
      phaseStartTime: new Date()
    };
    this.informationLayers = createInformationLayers(scenarioData, interlocutorData, conversationType);
  }

  // Ajouter un déclencheur comportemental
  addBehavioralTrigger(trigger: string): void {
    if (!this.state.behavioralTriggers.includes(trigger)) {
      this.state.behavioralTriggers.push(trigger);
      this.updateTrustLevel();
      this.checkNewLayerUnlocks();
    }
  }

  // Mettre à jour le niveau de confiance
  private updateTrustLevel(): void {
    this.state.trustLevel = evaluateTrustLevel(
      this.state.behavioralTriggers, 
      this.state.trustLevel
    );
  }

  // Vérifier les nouveaux déverrouillages
  private checkNewLayerUnlocks(): void {
    this.informationLayers.forEach((layer, index) => {
      if (!this.state.revealedLayers.includes(index)) {
        if (checkUnlockConditions(
          layer.unlockConditions, 
          this.state.trustLevel, 
          this.state.behavioralTriggers
        )) {
          this.state.revealedLayers.push(index);
          Object.assign(this.state.acquiredInformation, layer.content);
        }
      }
    });
  }

  // Obtenir les informations disponibles
  getAvailableInformation(): Record<string, any> {
    return { ...this.state.acquiredInformation };
  }

  // Obtenir le niveau de confiance actuel
  getTrustLevel(): number {
    return this.state.trustLevel;
  }

  // Obtenir les couches révélées
  getRevealedLayers(): InformationLayer[] {
    return this.informationLayers.filter((_, index) => 
      this.state.revealedLayers.includes(index)
    );
  }

  // Ajouter à la mémoire conversationnelle
  addToMemory(entry: string): void {
    this.state.conversationMemory.push(entry);
    this.state.lastInteraction = new Date();
  }

  // Obtenir l'état complet
  getState(): CognitiveState {
    return { ...this.state };
  }
}