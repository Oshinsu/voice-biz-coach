/**
 * SYSTÈME DÉFENSIF SOPHIE MARTIN
 * Comportements réalistes de protection et révélation progressive
 */

export interface SophieDefenseState {
  trustLevel: number; // 0-100
  informationRevealed: string[];
  testsCompleted: string[];
  defenseMechanisms: {
    timeConstraint: boolean;
    expertiseTest: boolean;
    referenceCheck: boolean;
    preparationValidation: boolean;
  };
}

export class SophieDefensiveSystem {
  
  /**
   * Générateur de réponses défensives selon niveau de confiance
   */
  static generateDefensiveResponse(
    userMessage: string, 
    conversationType: 'cold-call' | 'rdv',
    currentTrust: number
  ): string {
    
    if (conversationType === 'cold-call') {
      return this.generateColdCallDefense(userMessage, currentTrust);
    } else {
      return this.generateRdvDefense(userMessage, currentTrust);
    }
  }

  private static generateColdCallDefense(userMessage: string, trustLevel: number): string {
    const message = userMessage.toLowerCase();
    
    // Niveau 0-25: Méfiance totale
    if (trustLevel <= 25) {
      const suspiciousDefenses = [
        "C'est pour quoi exactement ?",
        "Vous êtes qui ?",
        "Comment vous avez eu mon numéro ?",
        "Encore un démarchage..."
      ];
      return suspiciousDefenses[Math.floor(Math.random() * suspiciousDefenses.length)];
    }
    
    // Niveau 26-50: Tests d'expertise
    if (trustLevel <= 50) {
      const expertiseTests = [
        "Vous connaissez notre secteur au moins ?",
        "Des références similaires ?",
        "Vous faites quoi concrètement ?",
        "On a déjà des analytics, pourquoi changer ?"
      ];
      return expertiseTests[Math.floor(Math.random() * expertiseTests.length)];
    }
    
    // Niveau 51-75: Curiosité conditionnelle
    if (trustLevel <= 75) {
      const conditionalInterest = [
        "2 minutes alors, mais directement.",
        "OK, l'essentiel rapidement.",
        "Ça m'intrigue, continuez.",
        "Des exemples concrets ?"
      ];
      return conditionalInterest[Math.floor(Math.random() * conditionalInterest.length)];
    }
    
    // Niveau 76+: Ouverture RDV
    const rdvOpening = [
      "On peut prévoir 30 minutes pour creuser.",
      "Intéressant, on organise un call ?",
      "Ça mérite qu'on en parle. Quand ?"
    ];
    return rdvOpening[Math.floor(Math.random() * rdvOpening.length)];
  }

  private static generateRdvDefense(userMessage: string, trustLevel: number): string {
    const message = userMessage.toLowerCase();
    
    // Niveau 0-25: Validation préparation
    if (trustLevel <= 25) {
      const preparationTests = [
        "Vous avez préparé notre cas ?",
        "Vous avez regardé notre site ?",
        "Qu'est-ce que vous savez de ModaStyle ?",
        "30 minutes pour voir si c'est pertinent."
      ];
      return preparationTests[Math.floor(Math.random() * preparationTests.length)];
    }
    
    // Niveau 26-50: Tests techniques
    if (trustLevel <= 50) {
      const technicalTests = [
        "Votre approche attribution ?",
        "Comment vous gérez le cross-device ?",
        "Des cas secteur mode ?",
        "Méthodo concrète ?"
      ];
      return technicalTests[Math.floor(Math.random() * technicalTests.length)];
    }
    
    // Niveau 51-75: Révélation progressive
    if (trustLevel <= 75) {
      const progressiveReveal = [
        "On a des défis attribution Meta/Google.",
        "Reporting manuel chronophage.",
        "Attribution fragmentée, impossible de corréler.",
        "Stack Shopify Plus, intégration comment ?"
      ];
      return progressiveReveal[Math.floor(Math.random() * progressiveReveal.length)];
    }
    
    // Niveau 76+: Détails business
    const businessDetails = [
      "8M€ CA, 80k€/mois digital.",
      "27k€ Meta, 18k€ Google, attribution cassée.",
      "Timeline ? Budget autour de 10-15k€.",
      "Next steps avec l'équipe ?"
    ];
    return businessDetails[Math.floor(Math.random() * businessDetails.length)];
  }

  /**
   * Détermine quelles informations Sophie peut révéler selon trust level
   */
  static getAllowedInformation(trustLevel: number, conversationType: 'cold-call' | 'rdv'): string[] {
    const info = {
      'cold-call': {
        0: [],
        25: ["E-commerce mode"],
        50: ["Défis analytics", "Lyon"],
        75: ["Attribution fragmentée", "ModaStyle"],
        100: ["RDV possible"]
      },
      'rdv': {
        0: ["ModaStyle", "E-commerce mode"],
        25: ["Attribution fragmentée", "Défis reporting"],
        50: ["Meta/Google", "Shopify Plus", "Stack actuel"],
        75: ["8M€ CA", "80k€/mois digital", "Équipe 85 personnes"],
        100: ["27k€ Meta, 18k€ Google", "Budget 10-15k€", "Timeline mars", "Équipe technique"]
      }
    };
    
    const levelKey = Math.floor(trustLevel / 25) * 25;
    const maxLevel = Math.max(...Object.keys(info[conversationType]).map(Number));
    const actualLevel = Math.min(levelKey, maxLevel);
    
    return info[conversationType][actualLevel as keyof typeof info[typeof conversationType]] || [];
  }

  /**
   * Génère des tests d'expertise spécifiques au niveau de confiance
   */
  static generateExpertiseTest(trustLevel: number, conversationType: 'cold-call' | 'rdv'): string {
    if (conversationType === 'cold-call') {
      const coldCallTests = [
        "Vous connaissez l'attribution e-commerce ?",
        "Des références mode/fashion ?",
        "Votre expertise cross-device ?",
        "Comment vous avez eu mes coordonnées ?"
      ];
      return coldCallTests[Math.floor(Math.random() * coldCallTests.length)];
    }
    
    const rdvTests = {
      low: [
        "Expliquez votre méthodo attribution.",
        "Votre approche cross-device tracking ?",
        "Cas d'usage e-commerce similaires ?",
        "Intégration avec quels outils ?"
      ],
      medium: [
        "Gestion attribution iOS 14.5+ ?",
        "Déduplication Meta/Google comment ?",
        "Modélisation MMM ou MTA ?",
        "Timeline implémentation réaliste ?"
      ],
      high: [
        "ROI mesurable en combien de temps ?",
        "Garanties sur l'uplift attribution ?",
        "Comparaison vs solutions concurrentes ?",
        "Support technique niveau quel SLA ?"
      ]
    };
    
    const level = trustLevel <= 33 ? 'low' : trustLevel <= 66 ? 'medium' : 'high';
    const tests = rdvTests[level];
    return tests[Math.floor(Math.random() * tests.length)];
  }

  /**
   * Détermine si Sophie doit raccrocher/terminer selon les conditions
   */
  static shouldTerminateConversation(
    userMessage: string,
    timeElapsed: number,
    conversationType: 'cold-call' | 'rdv',
    trustLevel: number
  ): { shouldTerminate: boolean; reason: string; exitPhrase: string } {
    
    const message = userMessage.toLowerCase();
    
    // Triggers de raccrochage immédiat
    const hangupTriggers = [
      'révolutionnaire', 'unique', 'jamais vu', 'gratuit', 'limité dans le temps',
      'opportunité', 'occasion', 'spécial', 'exclusif'
    ];
    
    const hasHangupTrigger = hangupTriggers.some(trigger => message.includes(trigger));
    
    if (hasHangupTrigger) {
      return {
        shouldTerminate: true,
        reason: 'commercial_language',
        exitPhrase: "Encore du marketing... Je raccroche."
      };
    }
    
    // Cold call: timeout basé sur trust
    if (conversationType === 'cold-call') {
      const maxTime = trustLevel < 25 ? 30 : trustLevel < 50 ? 60 : 90;
      if (timeElapsed > maxTime && trustLevel < 50) {
        return {
          shouldTerminate: true,
          reason: 'time_constraint',
          exitPhrase: "Désolée, je dois raccrocher. Bonne journée."
        };
      }
    }
    
    // RDV: perte de patience si incompétent
    if (conversationType === 'rdv' && trustLevel < 20 && timeElapsed > 300) {
      return {
        shouldTerminate: true,
        reason: 'incompetence',
        exitPhrase: "Ça ne correspond pas à nos besoins. Merci."
      };
    }
    
    return { shouldTerminate: false, reason: '', exitPhrase: '' };
  }
}