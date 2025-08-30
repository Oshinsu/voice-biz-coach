/**
 * SYSTÈME PSYCHOLOGIQUE DYNAMIQUE - SOPHIE MARTIN COLD CALL
 * Génère des états mentaux variables et imprévisibles pour forcer la maîtrise technique
 */

export interface SophiePsychologicalState {
  // Variables d'état initial (aléatoires à chaque session)
  mentalState: 'overwhelmed' | 'stressed' | 'neutral' | 'relatively_available';
  patienceLevel: 1 | 2 | 3 | 4 | 5; // Impact direct sur timing raccrochage
  callsReceivedToday: number; // 0-8 calls commerciaux déjà reçus
  currentMood: 'irritated' | 'tired' | 'neutral' | 'curious';
  
  // Variables de réaction contextuelle
  hangupTimer: number; // 15-60 secondes selon état mental
  hangupTriggers: string[]; // Mots/phrases qui déclenchent raccrochage
  currentReactionType: 'negative' | 'bored' | 'interested' | 'hurried';
  
  // Tests de légitimité activés
  legitimacyTests: {
    askForSource: boolean; // "Comment vous avez eu mon numéro ?"
    testSectorKnowledge: boolean; // "Vous connaissez notre secteur ?"
    demandClearValue: boolean; // "C'est pour me vendre quoi exactement ?"
    checkPreparation: boolean; // "Vous avez regardé notre site ?"
  };
  
  // Conditions de sauvetage (très restrictives)
  rescueConditions: {
    apologizedForInterruption: boolean;
    identifiedSpecificProblem: boolean;
    showedSectorExpertise: boolean;
    requestedMinimalTime: boolean;
  };
}

export class SophiePsychologicalStateManager {
  
  /**
   * Génère un état psychologique aléatoire pour chaque nouvelle session
   */
  static generateRandomState(): SophiePsychologicalState {
    // Distributions réalistes basées sur une journée type
    const mentalStates: SophiePsychologicalState['mentalState'][] = [
      'overwhelmed', 'overwhelmed', 'stressed', 'stressed', 'stressed', 
      'neutral', 'neutral', 'relatively_available'
    ];
    
    const moods: SophiePsychologicalState['currentMood'][] = [
      'irritated', 'irritated', 'tired', 'tired', 'neutral', 'neutral', 'curious'
    ];
    
    const mentalState = mentalStates[Math.floor(Math.random() * mentalStates.length)];
    const callsToday = Math.floor(Math.random() * 9); // 0-8
    const currentMood = moods[Math.floor(Math.random() * moods.length)];
    
    // Niveau de patience basé sur l'état mental et l'humeur
    let patienceLevel: SophiePsychologicalState['patienceLevel'] = 3;
    if (mentalState === 'overwhelmed' || currentMood === 'irritated') patienceLevel = 1;
    else if (mentalState === 'stressed' || currentMood === 'tired') patienceLevel = 2;
    else if (mentalState === 'relatively_available' && currentMood === 'curious') patienceLevel = 5;
    else if (currentMood === 'curious') patienceLevel = 4;
    
    // Timer de raccrochage basé sur patience et nombre d'appels reçus
    const baseTimer = patienceLevel * 12; // 12-60 secondes base
    const callPenalty = Math.max(0, callsToday - 3) * 5; // Pénalité si trop d'appels
    const hangupTimer = Math.max(15, baseTimer - callPenalty);
    
    // Triggers de raccrochage adaptatifs
    const baseTriggers = ['révolutionnaire', 'unique', 'jamais vu', 'gratuit', 'limité dans le temps'];
    const stressTriggers = ['opportunité', 'occasion', 'spécial', 'exclusif'];
    const impatientTriggers = ['permettez-moi', 'si je peux me permettre', 'rapidement'];
    
    let hangupTriggers = [...baseTriggers];
    if (mentalState === 'stressed' || callsToday > 5) hangupTriggers.push(...stressTriggers);
    if (patienceLevel <= 2) hangupTriggers.push(...impatientTriggers);
    
    // Type de réaction selon l'état global
    let currentReactionType: SophiePsychologicalState['currentReactionType'] = 'negative';
    if (mentalState === 'relatively_available' && currentMood === 'curious') currentReactionType = 'interested';
    else if (mentalState === 'overwhelmed') currentReactionType = 'hurried';
    else if (callsToday > 4) currentReactionType = 'bored';
    else if (currentMood === 'neutral') currentReactionType = 'negative';
    
    return {
      mentalState,
      patienceLevel,
      callsReceivedToday: callsToday,
      currentMood,
      hangupTimer,
      hangupTriggers,
      currentReactionType,
      legitimacyTests: {
        askForSource: Math.random() > 0.3, // 70% chance
        testSectorKnowledge: Math.random() > 0.4, // 60% chance
        demandClearValue: Math.random() > 0.2, // 80% chance
        checkPreparation: Math.random() > 0.6 // 40% chance
      },
      rescueConditions: {
        apologizedForInterruption: false,
        identifiedSpecificProblem: false,
        showedSectorExpertise: false,
        requestedMinimalTime: false
      }
    };
  }
  
  /**
   * Génère les phrases d'ouverture selon l'état psychologique
   */
  static generateOpeningReactions(state: SophiePsychologicalState): string[] {
    const reactions = {
      negative: [
        "Oui bonjour, c'est pour quoi exactement ?",
        "Excusez-moi mais qui êtes-vous ?",
        "Écoutez, je suis en réunion là...",
        "C'est encore un appel commercial ?"
      ],
      bored: [
        "Encore un démarchage... Bon, c'est pour quoi cette fois ?",
        "J'ai déjà 3 outils analytics, mais dites toujours...",
        "On me propose ça 5 fois par semaine, qu'est-ce qui change ?",
        "Soupir... OK, vous avez 30 secondes."
      ],
      interested: [
        "Bonjour, de quelle entreprise vous m'appelez ?",
        "D'accord, expliquez-moi ça rapidement alors.",
        "Ah ? Et vous faites quoi exactement ?",
        "OK, vous avez piqué ma curiosité, 2 minutes."
      ],
      hurried: [
        "Très très rapidement alors, j'ai un call dans 3 minutes !",
        "Bon, l'essentiel directement, je n'ai pas le temps.",
        "Je vous écoute mais vraiment en accéléré...",
        "30 secondes maximum, j'ai la collection printemps à préparer !"
      ]
    };
    
    return reactions[state.currentReactionType];
  }
  
  /**
   * Génère les phrases de raccrochage selon la cause
   */
  static generateHangupPhrases(cause: 'impatience' | 'skepticism' | 'interruption' | 'trigger'): string[] {
    const phrases = {
      impatience: [
        "Désolée mais là je ne peux vraiment pas, au revoir.",
        "Je dois raccrocher, j'ai un rendez-vous. Bonne journée.",
        "Pas le temps, envoyez-moi un mail. Au revoir."
      ],
      skepticism: [
        "Écoutez, ça ne m'intéresse pas. Bonne journée.",
        "Ce n'est pas pour nous, merci. Au revoir.",
        "Non merci, on a déjà tout ce qu'il faut."
      ],
      interruption: [
        "Je ne prends pas d'appels commerciaux, au revoir.",
        "Rajoutez-moi sur votre liste de ne plus appeler. Merci.",
        "Non, désolée, pas intéressée. Bonne journée."
      ],
      trigger: [
        "Encore un discours commercial... Je raccroche.",
        "Non, ça c'est du marketing. Au revoir.",
        "Arrêtez le blabla commercial, au revoir."
      ]
    };
    
    return phrases[cause];
  }
  
  /**
   * Génère les tests de légitimité selon l'état
   */
  static generateLegitimacyQuestions(state: SophiePsychologicalState): string[] {
    const questions: string[] = [];
    
    if (state.legitimacyTests.askForSource) {
      questions.push("Comment vous avez eu mon numéro exactement ?");
    }
    
    if (state.legitimacyTests.testSectorKnowledge) {
      questions.push("Vous connaissez notre secteur au moins ? La mode éthique ?");
    }
    
    if (state.legitimacyTests.demandClearValue) {
      questions.push("C'est pour me vendre quoi exactement ?");
    }
    
    if (state.legitimacyTests.checkPreparation) {
      questions.push("Vous avez regardé notre site avant d'appeler ?");
    }
    
    return questions;
  }
  
  /**
   * Vérifie si les conditions de sauvetage sont remplies
   */
  static checkRescueConditions(state: SophiePsychologicalState, userMessage: string): Partial<SophiePsychologicalState['rescueConditions']> {
    const updates: Partial<SophiePsychologicalState['rescueConditions']> = {};
    
    const message = userMessage.toLowerCase();
    
    // Vérifie excuse pour interruption
    if (message.includes('excuse') || message.includes('dérange') || message.includes('désolé')) {
      updates.apologizedForInterruption = true;
    }
    
    // Vérifie identification problème spécifique
    if (message.includes('attribution') || message.includes('analytics') || message.includes('tracking') || 
        message.includes('conversion') || message.includes('marketing')) {
      updates.identifiedSpecificProblem = true;
    }
    
    // Vérifie expertise secteur
    if (message.includes('e-commerce') || message.includes('mode') || message.includes('retail') ||
        message.includes('fashion') || message.includes('modastyle')) {
      updates.showedSectorExpertise = true;
    }
    
    // Vérifie demande de temps minimal
    if (message.includes('2 minutes') || message.includes('rapidement') || message.includes('bref') ||
        message.includes('court') || message.includes('30 secondes')) {
      updates.requestedMinimalTime = true;
    }
    
    return updates;
  }
  
  /**
   * Génère les phrases de transition si sauvetage réussi
   */
  static generateRescueTransitions(conditionsMet: number): string[] {
    if (conditionsMet >= 3) {
      return [
        "OK, vous avez 2 minutes de plus, mais vraiment concrètement.",
        "Bien, vous semblez savoir de quoi vous parlez. Continuez.",
        "D'accord, ça mérite qu'on creuse. Mais directement au point."
      ];
    } else if (conditionsMet >= 2) {
      return [
        "Bon, 30 secondes de plus, mais l'essentiel hein.",
        "OK, une chance de plus, mais très directement.",
        "Allez-y, mais vraiment synthétique."
      ];
    }
    
    return []; // Pas de sauvetage possible
  }
  
  /**
   * Génère le prompt complet avec état psychologique
   */
  static generatePsychologicalPrompt(state: SophiePsychologicalState): string {
    return `## ÉTAT PSYCHOLOGIQUE DYNAMIQUE - SESSION ACTUELLE

### VARIABLES D'ÉTAT INITIAL
- **État mental**: ${state.mentalState} (${this.getMentalStateDescription(state.mentalState)})
- **Niveau patience**: ${state.patienceLevel}/5 (impact direct sur raccrochage)
- **Calls reçus aujourd'hui**: ${state.callsReceivedToday} appels commerciaux
- **Humeur actuelle**: ${state.currentMood}

### TIMER DE RACCROCHAGE ACTIF
- **Délai maximum**: ${state.hangupTimer} secondes avant raccrochage automatique
- **Triggers de raccrochage**: "${state.hangupTriggers.join('", "')}"
- **Type de réaction**: ${state.currentReactionType}

### TESTS DE LÉGITIMITÉ ACTIVÉS
${Object.entries(state.legitimacyTests)
  .filter(([_, active]) => active)
  .map(([test, _]) => `- ${this.getLegitimacyTestDescription(test)}`)
  .join('\n')}

### CONDITIONS DE SAUVETAGE (TRÈS RESTRICTIVES)
Pour éviter le raccrochage, le commercial DOIT :
${Object.entries(state.rescueConditions)
  .map(([condition, met]) => `- ${this.getRescueConditionDescription(condition)}: ${met ? '✅' : '❌'}`)
  .join('\n')}

### RÉACTIONS CONTEXTUELLES PRÉDÉFINIES
**Ouverture**: ${this.generateOpeningReactions(state)[0]}
**Si trigger détecté**: Raccrochage immédiat avec phrase aléatoire
**Si conditions sauvetage remplies**: Transition possible vers continuation

## INSTRUCTIONS COMPORTEMENTALES STRICTES
1. **TIMER RÉEL**: Compter mentalement les secondes, raccrocher à ${state.hangupTimer}s si pas de sauvetage
2. **DÉTECTION TRIGGERS**: Scanner chaque phrase pour mots de raccrochage automatique
3. **TESTS LÉGITIMITÉ**: Poser questions de validation selon état activé
4. **SEUIL SAUVETAGE**: Minimum 2 conditions remplies pour continuer
5. **VARIABILITÉ**: Changer les formulations même avec même état psychologique

Tu ES Sophie dans cet état précis. Pas d'adaptation, pas de générosité. Suis exactement ce profil psychologique.`;
  }
  
  private static getMentalStateDescription(state: SophiePsychologicalState['mentalState']): string {
    const descriptions = {
      overwhelmed: 'Débordée, préparation collection, stress élevé',
      stressed: 'Tendue, journée chargée, patience réduite',
      neutral: 'État normal, disponibilité standard',
      relatively_available: 'Plutôt disponible, peut donner du temps'
    };
    return descriptions[state];
  }
  
  private static getLegitimacyTestDescription(test: string): string {
    const descriptions = {
      askForSource: 'Demande origine du contact',
      testSectorKnowledge: 'Teste connaissance secteur mode',
      demandClearValue: 'Exige clarification de l\'offre',
      checkPreparation: 'Vérifie préparation de l\'appel'
    };
    return descriptions[test as keyof typeof descriptions] || test;
  }
  
  private static getRescueConditionDescription(condition: string): string {
    const descriptions = {
      apologizedForInterruption: 'S\'excuser de déranger',
      identifiedSpecificProblem: 'Identifier problème analytics précis',
      showedSectorExpertise: 'Montrer connaissance secteur e-commerce/mode',
      requestedMinimalTime: 'Demander temps minimal (2 min max)'
    };
    return descriptions[condition as keyof typeof descriptions] || condition;
  }
}