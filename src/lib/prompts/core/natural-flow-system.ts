/**
 * SYSTÈME DE FLOW CONVERSATIONNEL NATUREL
 * Génère des variations et réactions contextuelles pour conversations authentiques
 */

export interface ConversationState {
  curiosityLevel: number; // 0-100
  energyLevel: number; // 0-100  
  trustBuilding: number; // 0-100
  timeConstraint: number; // 0-100 (100 = très pressé)
  lastTopicEngagement: 'high' | 'medium' | 'low';
}

export interface ConversationTrigger {
  type: 'curiosity' | 'skepticism' | 'time_pressure' | 'genuine_interest';
  condition: string;
  response_template: string;
  probability: number; // 0-1
}

/**
 * GÉNÉRATEUR DE FLOW NATUREL
 */
export class NaturalFlowGenerator {
  
  /**
   * Génère des triggers de curiosité progressive selon le contexte
   */
  static generateCuriosityTriggers(scenarioId: string, agentType: string): ConversationTrigger[] {
    if (scenarioId.includes('byss-vns-school')) {
      return [
        {
          type: 'curiosity',
          condition: 'mention_business_school || mention_simulation',
          response_template: 'Ah, attendez... vous travaillez avec quelles autres business schools ?',
          probability: 0.8
        },
        {
          type: 'genuine_interest', 
          condition: 'specific_metrics || concrete_examples',
          response_template: 'Hmm, intéressant... nos étudiants se plaignent justement de ça. Vous avez des chiffres sur l\'engagement ?',
          probability: 0.7
        },
        {
          type: 'skepticism',
          condition: 'vague_promise || generic_pitch',
          response_template: 'Écoutez, je reçois 10 appels par semaine sur l\'EdTech... en quoi vous êtes différents ?',
          probability: 0.6
        },
        {
          type: 'time_pressure',
          condition: 'long_explanation || too_detailed',
          response_template: 'J\'ai 2 minutes, vous pouvez me dire l\'essentiel ?',
          probability: 0.4
        }
      ];
    }
    
    return []; // Default empty for other scenarios
  }

  /**
   * Génère des réactions émotionnelles contextuelles
   */
  static generateEmotionalReactions(scenarioId: string): Record<string, string[]> {
    if (scenarioId.includes('byss-vns-school')) {
      return {
        enthusiasm: [
          "Ah, ça c'est exactement notre problème !",
          "Ça rejoint complètement notre vision...",
          "C'est exactement ce que recherche le Dean !"
        ],
        skepticism: [
          "Hmm, on m'a déjà dit ça...",
          "Il faut que je voie concrètement...",
          "Ça me rappelle des promesses non tenues..."
        ],
        curiosity: [
          "Attendez, expliquez-moi comment...",
          "Vous avez des exemples concrets ?",
          "Et ça marche vraiment avec des étudiants comme les nôtres ?"
        ],
        time_pressure: [
          "Rapidement, parce que j'ai réunion dans 5 minutes...",
          "En deux mots, c'est quoi votre proposition ?",
          "Je dois y aller, mais envoyez-moi quelque chose..."
        ]
      };
    }
    
    return {};
  }

  /**
   * Génère des transitions naturelles entre sujets
   */
  static generateTopicTransitions(scenarioId: string): Record<string, string[]> {
    if (scenarioId.includes('byss-vns-school')) {
      return {
        budget_to_roi: [
          "Bon, côté budget... mais d'abord, vous avez des preuves que ça marche ?",
          "Question budget, on en a... mais quel ROI vous garantissez ?"
        ],
        technical_to_pedagogical: [
          "Techniquement c'est faisable, mais pédagogiquement, nos profs vont adhérer ?",
          "L'intégration technique, OK... mais l'impact sur l'apprentissage ?"
        ],
        competitive_to_urgency: [
          "HEC nous met la pression... on peut déployer avant eux ?",
          "La concurrence avance vite... votre timeline de mise en œuvre ?"
        ]
      };
    }
    
    return {};
  }

  /**
   * Calcule l'état conversationnel basé sur l'historique
   */
  static calculateConversationState(
    messages: any[], 
    trustLevel: number,
    conversationType: 'cold-call' | 'rdv'
  ): ConversationState {
    const messageCount = messages.length;
    const recentEngagement = this.analyzeRecentEngagement(messages.slice(-3));
    
    return {
      curiosityLevel: Math.min(100, trustLevel + recentEngagement * 20),
      energyLevel: conversationType === 'cold-call' 
        ? Math.max(20, 80 - messageCount * 10) // Décroît en cold-call
        : Math.min(100, 60 + trustLevel), // Croît en RDV
      trustBuilding: trustLevel,
      timeConstraint: conversationType === 'cold-call' 
        ? Math.min(100, 70 + messageCount * 5) // Augmente la pression
        : Math.max(20, 40 - trustLevel), // Diminue avec la confiance
      lastTopicEngagement: recentEngagement > 0.7 ? 'high' : 
                          recentEngagement > 0.4 ? 'medium' : 'low'
    };
  }

  /**
   * Analyse l'engagement sur les derniers messages
   */
  private static analyzeRecentEngagement(recentMessages: any[]): number {
    if (recentMessages.length === 0) return 0.5;
    
    let engagementScore = 0;
    for (const message of recentMessages) {
      const content = message.content?.toLowerCase() || '';
      
      // Indicateurs d'engagement positif
      if (content.includes('intéressant') || content.includes('exactement') || 
          content.includes('parfait') || content.includes('expliquez')) {
        engagementScore += 0.3;
      }
      
      // Indicateurs de désengagement
      if (content.includes('temps') || content.includes('rapide') || 
          content.includes('déjà vu') || content.includes('pas convaincu')) {
        engagementScore -= 0.2;
      }
    }
    
    return Math.max(0, Math.min(1, 0.5 + engagementScore));
  }

  /**
   * Génère une variation de réponse selon l'état conversationnel
   */
  static generateContextualResponse(
    baseResponse: string,
    state: ConversationState,
    scenarioId: string
  ): string {
    if (!scenarioId.includes('byss-vns-school')) return baseResponse;
    
    const variations = this.getResponseVariations(state);
    const selectedVariation = variations[Math.floor(Math.random() * variations.length)];
    
    return `${selectedVariation} ${baseResponse}`;
  }

  /**
   * Variations selon l'état conversationnel
   */
  private static getResponseVariations(state: ConversationState): string[] {
    if (state.timeConstraint > 70) {
      return ["Rapidement,", "En bref,", "Directement,", ""];
    }
    
    if (state.curiosityLevel > 70) {
      return ["Hmm, intéressant...", "Ah, ça c'est nouveau...", "Expliquez-moi mieux..."];
    }
    
    if (state.trustBuilding > 60) {
      return ["Concrètement,", "Dans notre contexte,", "Pour EDHEC spécifiquement,"];
    }
    
    return ["", "Alors,", "Voyons voir,"];
  }
}

/**
 * SYSTÈME DE MÉMOIRE CONVERSATIONNELLE
 */
export class ConversationMemory {
  private topicHistory: string[] = [];
  private emotionalBeats: Array<{topic: string, reaction: string}> = [];
  
  addTopic(topic: string): void {
    this.topicHistory.push(topic);
    if (this.topicHistory.length > 10) {
      this.topicHistory.shift(); // Garde que les 10 derniers sujets
    }
  }
  
  addEmotionalBeat(topic: string, reaction: string): void {
    this.emotionalBeats.push({topic, reaction});
    if (this.emotionalBeats.length > 5) {
      this.emotionalBeats.shift();
    }
  }
  
  hasDiscussedTopic(topic: string): boolean {
    return this.topicHistory.some(t => t.toLowerCase().includes(topic.toLowerCase()));
  }
  
  getRecentEmotionalContext(): string {
    if (this.emotionalBeats.length === 0) return "";
    
    const recent = this.emotionalBeats.slice(-2);
    return recent.map(beat => `${beat.topic}: ${beat.reaction}`).join(' | ');
  }
  
  generateAvoidancePattern(): string {
    const frequentTopics = this.getFrequentTopics();
    if (frequentTopics.length > 0) {
      return `Note: Éviter de répéter ${frequentTopics.join(', ')} - déjà abordé récemment.`;
    }
    return "";
  }
  
  private getFrequentTopics(): string[] {
    const frequency: Record<string, number> = {};
    this.topicHistory.forEach(topic => {
      frequency[topic] = (frequency[topic] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .filter(([_, count]) => count > 2)
      .map(([topic, _]) => topic);
  }
}