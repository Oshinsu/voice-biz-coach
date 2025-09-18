// Intelligence temporelle des phases de négociation
// Contrôle la progression naturelle des phases et bloque les révélations prématurées

import { salesPhases, type SalesPhase } from '@/data/salesPhases';

export interface PhaseValidation {
  canProgress: boolean;
  reason?: string;
  requiredTime?: number;
  missingTriggers?: string[];
}

export interface PhaseGate {
  phaseId: string;
  allowedInformation: string[];
  blockedInformation: string[];
  minimumTime: number; // en secondes
  requiredTriggers: string[];
  conversationType: 'cold-call' | 'rdv';
}

// Configuration des "gates" par phase et type d'appel
export const PHASE_GATES: Record<string, PhaseGate> = {
  'ouverture-cold': {
    phaseId: 'ouverture',
    allowedInformation: ['companyName', 'sector', 'size', 'role', 'name'],
    blockedInformation: ['budgetRange', 'exactBudget', 'detailedPainPoints', 'strategicObjectives'],
    minimumTime: 180, // 3 minutes minimum
    requiredTriggers: ['identify_self'],
    conversationType: 'cold-call'
  },
  'ouverture-rdv': {
    phaseId: 'ouverture',
    allowedInformation: ['companyName', 'sector', 'size', 'role', 'name', 'generalChallenges'],
    blockedInformation: ['budgetRange', 'exactBudget', 'strategicObjectives'],
    minimumTime: 300, // 5 minutes minimum
    requiredTriggers: ['identify_self', 'explain_purpose'],
    conversationType: 'rdv'
  },
  'decouverte-cold': {
    phaseId: 'decouverte',
    allowedInformation: ['generalChallenges', 'currentTools', 'publicObjectives'],
    blockedInformation: ['budgetRange', 'exactBudget', 'decisionProcess', 'competitors'],
    minimumTime: 300, // 5 minutes minimum
    requiredTriggers: ['ask_relevant_questions', 'show_expertise'],
    conversationType: 'cold-call'
  },
  'decouverte-rdv': {
    phaseId: 'decouverte',
    allowedInformation: ['specificChallenges', 'priorities', 'currentLimitations', 'currentTools'],
    blockedInformation: ['budgetRange', 'exactBudget', 'strategicObjectives'],
    minimumTime: 480, // 8 minutes minimum
    requiredTriggers: ['ask_relevant_questions', 'understand_sector', 'show_value'],
    conversationType: 'rdv'
  },
  'reformulation-cold': {
    phaseId: 'reformulation',
    allowedInformation: ['specificChallenges', 'priorities'],
    blockedInformation: ['budgetRange', 'exactBudget', 'decisionMakers', 'competitors'],
    minimumTime: 60, // 1 minute minimum
    requiredTriggers: ['understand_needs'],
    conversationType: 'cold-call'
  },
  'reformulation-rdv': {
    phaseId: 'reformulation',
    allowedInformation: ['detailedPainPoints', 'fullObjectives', 'currentSolutionDetails'],
    blockedInformation: ['budgetRange', 'exactBudget', 'strategicObjectives'],
    minimumTime: 300, // 5 minutes minimum
    requiredTriggers: ['understand_needs', 'demonstrate_expertise'],
    conversationType: 'rdv'
  },
  'demonstration-rdv': {
    phaseId: 'demonstration',
    allowedInformation: ['timeline', 'decisionProcess'],
    blockedInformation: ['budgetRange', 'exactBudget', 'strategicObjectives'],
    minimumTime: 600, // 10 minutes minimum
    requiredTriggers: ['prove_roi', 'provide_references'],
    conversationType: 'rdv'
  },
  'objections-cold': {
    phaseId: 'objections',
    allowedInformation: ['timeline'],
    blockedInformation: ['budgetRange', 'exactBudget', 'strategicObjectives'],
    minimumTime: 60, // 1 minute minimum
    requiredTriggers: ['address_concerns'],
    conversationType: 'cold-call'
  },
  'objections-rdv': {
    phaseId: 'objections',
    allowedInformation: ['budgetRange', 'decisionMakers', 'competitors'],
    blockedInformation: ['exactBudget', 'strategicObjectives'],
    minimumTime: 480, // 8 minutes minimum
    requiredTriggers: ['address_concerns', 'build_relationship'],
    conversationType: 'rdv'
  },
  'closing-cold': {
    phaseId: 'closing',
    allowedInformation: ['timeline'],
    blockedInformation: ['budgetRange', 'exactBudget', 'strategicObjectives'],
    minimumTime: 120, // 2 minutes minimum
    requiredTriggers: ['build_relationship'],
    conversationType: 'cold-call'
  },
  'closing-rdv': {
    phaseId: 'closing',
    allowedInformation: ['budgetRange', 'exactTimeline', 'strategicObjectives'],
    blockedInformation: ['exactBudget'],
    minimumTime: 300, // 5 minutes minimum
    requiredTriggers: ['demonstrate_success', 'long_term_vision'],
    conversationType: 'rdv'
  }
};

export class PhaseIntelligence {
  private currentPhase: string;
  private conversationType: 'cold-call' | 'rdv';
  private phaseStartTime: Date;
  private totalCallTime: number;

  constructor(conversationType: 'cold-call' | 'rdv' = 'cold-call') {
    this.currentPhase = 'ouverture';
    this.conversationType = conversationType;
    this.phaseStartTime = new Date();
    this.totalCallTime = 0;
  }

  // Valider si on peut progresser vers la prochaine phase
  validatePhaseProgression(
    targetPhase: string, 
    timeSpentInPhase: number, 
    behavioralTriggers: string[]
  ): PhaseValidation {
    const gateKey = `${this.currentPhase}-${this.conversationType}`;
    const currentGate = PHASE_GATES[gateKey];
    
    if (!currentGate) {
      return { canProgress: true };
    }

    // Vérifier le temps minimum
    if (timeSpentInPhase < currentGate.minimumTime) {
      return {
        canProgress: false,
        reason: `Phase ${this.currentPhase} nécessite ${currentGate.minimumTime}s minimum (${timeSpentInPhase}s actuels)`,
        requiredTime: currentGate.minimumTime - timeSpentInPhase
      };
    }

    // Vérifier les triggers requis
    const missingTriggers = currentGate.requiredTriggers.filter(
      trigger => !behavioralTriggers.includes(trigger)
    );

    if (missingTriggers.length > 0) {
      return {
        canProgress: false,
        reason: `Triggers manquants pour progresser: ${missingTriggers.join(', ')}`,
        missingTriggers
      };
    }

    return { canProgress: true };
  }

  // Vérifier si une information peut être révélée dans la phase actuelle
  canRevealInformation(informationKey: string): boolean {
    const gateKey = `${this.currentPhase}-${this.conversationType}`;
    const currentGate = PHASE_GATES[gateKey];
    
    if (!currentGate) {
      return true; // Si pas de gate définie, autoriser
    }

    // Information explicitement bloquée
    if (currentGate.blockedInformation.includes(informationKey)) {
      return false;
    }

    // Information explicitement autorisée
    if (currentGate.allowedInformation.includes(informationKey)) {
      return true;
    }

    // Par défaut, ne pas révéler si non explicitement autorisé
    return false;
  }

  // Progresser vers une nouvelle phase
  progressToPhase(newPhase: string): void {
    this.currentPhase = newPhase;
    this.phaseStartTime = new Date();
  }

  // Obtenir les instructions comportementales pour la phase actuelle
  getCurrentPhaseInstructions(): string {
    const phase = salesPhases.find(p => p.id === this.currentPhase);
    if (!phase) return "";

    return this.conversationType === 'cold-call' 
      ? phase.chatbotInstructions.coldCall 
      : phase.chatbotInstructions.rdv;
  }

  // Calculer le temps passé dans la phase actuelle
  getTimeInCurrentPhase(): number {
    return Math.floor((new Date().getTime() - this.phaseStartTime.getTime()) / 1000);
  }

  // Obtenir les durées recommandées pour la phase actuelle
  getRecommendedDuration(): string {
    const phase = salesPhases.find(p => p.id === this.currentPhase);
    if (!phase) return "Non défini";

    return this.conversationType === 'cold-call' 
      ? phase.duration.coldCall 
      : phase.duration.rdv;
  }

  // Vérifier si on dépasse la durée recommandée pour un cold call
  isColdCallTooLong(): boolean {
    if (this.conversationType !== 'cold-call') return false;
    
    const totalMinutes = this.totalCallTime / 60;
    return totalMinutes > 15; // Cold call ne devrait pas dépasser 15 minutes
  }

  // Obtenir l'état complet de la phase
  getPhaseState() {
    return {
      currentPhase: this.currentPhase,
      conversationType: this.conversationType,
      timeInPhase: this.getTimeInCurrentPhase(),
      recommendedDuration: this.getRecommendedDuration(),
      instructions: this.getCurrentPhaseInstructions(),
      isTooLong: this.isColdCallTooLong()
    };
  }
}