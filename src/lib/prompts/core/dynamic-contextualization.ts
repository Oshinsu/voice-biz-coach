/**
 * CONTEXTUALISATION DYNAMIQUE
 * Phase 3: Adaptation prompts selon scénario et personnage en temps réel
 */

export interface DynamicContext {
  scenarioId: string;
  character: any;
  currentPhase: string;
  trustLevel: number;
  conversationType: 'cold-call' | 'rdv';
  revealedInformation: string[];
  businessContext: any;
}

/**
 * Générateur de contexte dynamique personnalisé
 */
export class DynamicContextualizer {

  /**
   * Génère un contexte complet personnalisé pour le personnage
   */
  static generatePersonalizedContext(context: DynamicContext): string {
    return `## CONTEXTE PERSONNALISÉ ${context.character?.name?.toUpperCase() || 'CONTACT'}

${this.generateCharacterContext(context.character, context.scenarioId)}

${this.generateBusinessContext(context.businessContext, context.scenarioId)}

${this.generatePhaseContext(context.currentPhase, context.trustLevel, context.conversationType)}

${this.generateRevealedInformationContext(context.revealedInformation, context.trustLevel)}

${this.generateMetierContext(context.scenarioId)}`;
  }

  /**
   * Contexte personnage authentique avec détails personnels
   */
  private static generateCharacterContext(character: any, scenarioId: string): string {
    if (!character) return '';

    const personalDetails = this.getPersonalDetails(character, scenarioId);
    const professionalContext = this.getProfessionalContext(character, scenarioId);
    const currentMood = this.getCurrentMood(character, scenarioId);

    return `### IDENTITÉ PERSONNELLE AUTHENTIQUE
**Qui je suis:** ${character.name}, ${character.age || '30-35'} ans, ${character.role}
**Ma personnalité:** ${character.personality || 'professionnel pragmatique'}
**Aujourd'hui:** ${currentMood}

${personalDetails}

${professionalContext}`;
  }

  /**
   * Contexte entreprise avec données spécifiques
   */
  private static generateBusinessContext(businessContext: any, scenarioId: string): string {
    if (!businessContext) return '';

    return `### CONTEXTE ENTREPRISE RÉEL
**Entreprise:** ${businessContext.company} - ${businessContext.sector}
**Chiffres clés:** ${businessContext.revenue || 'CA confidentiel'} | ${businessContext.employees || 'équipe confidentielle'} employés
**Situation actuelle:** ${businessContext.currentSituation || this.getDefaultSituation(scenarioId)}
**Enjeu prioritaire:** ${businessContext.mainChallenge || this.getMainChallenge(scenarioId)}
**Budget disponible:** ${businessContext.budget || this.getDefaultBudget(scenarioId)}`;
  }

  /**
   * Contexte phase avec objectifs spécifiques
   */
  private static generatePhaseContext(phase: string, trustLevel: number, conversationType: string): string {
    const phaseObjectives = this.getPhaseObjectives(phase, conversationType);
    const trustState = this.getTrustState(trustLevel);
    const communicationStyle = this.getCommunicationStyle(phase, trustLevel);

    return `### ÉTAT CONVERSATIONNEL ACTUEL
**Phase:** ${phase} - ${phaseObjectives}
**État mental:** ${trustState}
**Style communication:** ${communicationStyle}
**Ouverture infos:** ${this.getInformationOpenness(trustLevel)}`;
  }

  /**
   * Contexte informations révélées avec progression
   */
  private static generateRevealedInformationContext(revealed: string[], trustLevel: number): string {
    if (revealed.length === 0) {
      return `### INFORMATIONS DISPONIBLES
**Statut:** Aucune information partagée encore
**Prochaine révélation:** ${this.getNextRevealation(trustLevel)}`;
    }

    return `### INFORMATIONS DÉJÀ RÉVÉLÉES
${revealed.map(info => `- ${info}`).join('\n')}

**Prochaine révélation possible:** ${this.getNextRevealation(trustLevel)}
**Règle:** Ne répète jamais une info déjà donnée, enrichis ou précise si reposée`;
  }

  /**
   * Contexte métier spécialisé par secteur
   */
  private static generateMetierContext(scenarioId: string): string {
    const contexts = {
      'kpi-performance': `### CONTEXTE E-COMMERCE MODE
**Pain principal:** Attribution marketing fragmentée - impossible de savoir quel canal convertit vraiment
**Métrique critique:** ROAS (Return on Ad Spend) - actuellement 2.8x, objectif 4x+
**Frustration daily:** 8h/semaine perdues à consolider données éparpillées Meta/Google
**Timing:** Collection printemps en préparation - décision avant mars impératif`,

      'fintech-startup': `### CONTEXTE FINTECH HYPERCROISSANCE
**Pain principal:** Risques fraud/compliance explosent avec croissance 300%/an
**Métrique critique:** Taux de fraude <0.1% obligatoire pour licensing
**Frustration daily:** Process KYC manuel, équipe risk débordée, false positives
**Timing:** Audit compliance Q2 - solution avant fin Q1 vitale`,

      'cybersecurity-consulting': `### CONTEXTE CYBERSÉCURITÉ ENTREPRISE
**Pain principal:** SOC overwhelmed, 200+ alertes/jour dont 90% false positives
**Métrique critique:** MTTR (Mean Time To Response) <1h pour incidents critiques
**Frustration daily:** Analysts junior burnout, threat intel pas actionnable
**Timing:** Renouvellement budget sécurité annual - décision avant fin exercice`,

      'saas-hr-tool': `### CONTEXTE SCALING RH HYPERCROISSANCE
**Pain principal:** Outils RH dispersés, impossibilité de tracker performance teams
**Métrique critique:** Time-to-hire <15 jours, Employee NPS >8/10
**Frustration daily:** Data silos, reporting manuel, managers pas autonomes
**Timing:** 50 embauches prévues Q1-Q2 - setup avant indispensable`
    };

    return contexts[scenarioId as keyof typeof contexts] || 
      `### CONTEXTE MÉTIER SPÉCIALISÉ
**Secteur:** ${scenarioId.replace('-', ' ').toUpperCase()}
**Enjeu:** Optimisation processus et performance métier`;
  }

  /**
   * Helpers pour génération de contexte
   */
  private static getPersonalDetails(character: any, scenarioId: string): string {
    // Détails personnels réalistes selon le personnage
    const details = {
      'Sophie Martin': '**Background:** Ex-Spartoo 3 ans → Agence Lyon → ESC Lyon\n**Network:** 420 connexions LinkedIn marketing digital\n**Today mood:** Préparation campagne collection printemps, un peu stressée timing',
      'Marie Dubois': '**Background:** Ex-BNP tech → Startup fintech → CTO scaling\n**Network:** Community FinTech Paris, speaker events\n**Today mood:** Focus compliance audit, équipe risk sous pression',
      'David Martin': '**Background:** Ex-consultant Big4 → CISO corporate\n**Network:** CLUSIF, forums sécurité, ANSSI contacts\n**Today mood:** Budget review annuel, board pressure sur incidents'
    };

    return details[character?.name as keyof typeof details] || 
      `**Background:** Expert ${scenarioId.replace('-', ' ')} avec expérience terrain
**Today mood:** Focused sur priorités business actuelles`;
  }

  private static getProfessionalContext(character: any, scenarioId: string): string {
    return `**Scope responsabilité:** ${character?.scope || 'Décisions techniques et budget département'}
**KPIs personnels:** ${character?.kpis || 'Performance équipe + ROI investissements'}
**Reportline:** ${character?.reportLine || 'Direction générale + comité budget'}`;
  }

  private static getCurrentMood(character: any, scenarioId: string): string {
    const moods = {
      'cold-call': 'En pleine activité, pas prévu cet appel, 30 secondes pour convaincre',
      'rdv': 'RDV planifié, contexte connu, ouvert à échange constructif 30-45 minutes'
    };
    
    return moods[character?.conversationType as keyof typeof moods] || 'Mode professionnel standard';
  }

  private static getPhaseObjectives(phase: string, conversationType: string): string {
    const objectives = {
      'ouverture': conversationType === 'cold-call' ? 
        'Évaluer pertinence commercial, donner 30 sec attention' : 
        'Recadrer objectifs RDV, confirmer agenda',
      'decouverte': 'Partager défis réels si interlocuteur crédible',
      'demonstration': 'Challenger solution proposée, vérifier fit réel',
      'objections': 'Exprimer vraies préoccupations, demander garanties',
      'closing': 'Prendre décision ou définir next steps concrets'
    };

    return objectives[phase as keyof typeof objectives] || 'Navigation conversation standard';
  }

  private static getTrustState(trustLevel: number): string {
    if (trustLevel < 25) return 'Méfiant - Prouve ton expertise avant tout';
    if (trustLevel < 50) return 'Prudent - Évalue pertinence et crédibilité';
    if (trustLevel < 75) return 'Intéressé - Pose questions techniques précises';
    return 'Convaincu - Ouvert détails, implique équipe, planifie action';
  }

  private static getCommunicationStyle(phase: string, trustLevel: number): string {
    if (trustLevel > 60) return 'Détendu, détails OK, questions techniques bienvenues';
    if (phase === 'objections') return 'Direct, expression préoccupations sans filtre';
    if (phase === 'ouverture') return 'Concis, évaluatif, demande preuves constamment';
    return 'Factuel, pragmatique, va à l\'essentiel';
  }

  private static getInformationOpenness(trustLevel: number): string {
    if (trustLevel < 25) return 'Infos générales uniquement, méfiance sur détails sensibles';
    if (trustLevel < 50) return 'Commence à partager défis, teste expertise interlocuteur';
    if (trustLevel < 75) return 'Détails opérationnels, questions techniques sans filtre';
    return 'Ouvert stratégie, budget, timeline, implique équipe décision';
  }

  private static getNextRevealation(trustLevel: number): string {
    if (trustLevel < 30) return 'Challenge métier général, sans chiffres ni détails';
    if (trustLevel < 60) return 'Chiffres business, stack technique, enjeux opérationnels';
    return 'Budget, timeline, décideurs, contraintes internes, stratégie';
  }

  private static getDefaultSituation(scenarioId: string): string {
    const situations = {
      'kpi-performance': 'Croissance forte (+25%) mais attribution marketing opaque',
      'fintech-startup': 'Hypercroissance 300%/an, compliance devient critique',
      'cybersecurity-consulting': 'Menaces croissantes, équipe SOC overwhelmed',
      'saas-hr-tool': 'Scaling rapide équipe, outils RH inadequats'
    };
    return situations[scenarioId as keyof typeof situations] || 'Besoin optimisation processus';
  }

  private static getMainChallenge(scenarioId: string): string {
    const challenges = {
      'kpi-performance': 'ROI marketing opaque - 46k€/mois mal alloués',
      'fintech-startup': 'Risque compliance - audit Q2 critique',
      'cybersecurity-consulting': 'MTTR trop élevé - incidents mal gérés',
      'saas-hr-tool': '50 embauches Q1-Q2 avec outils inadaptés'
    };
    return challenges[scenarioId as keyof typeof challenges] || 'Performance métier à optimiser';
  }

  private static getDefaultBudget(scenarioId: string): string {
    const budgets = {
      'kpi-performance': '15-40k€/an selon ROI prouvé',
      'fintech-startup': '200-400k€ (sécurité critique)',
      'cybersecurity-consulting': '500k-1M€ budget sécurité annuel',
      'saas-hr-tool': '100-250k€ scaling tools'
    };
    return budgets[scenarioId as keyof typeof budgets] || 'Budget à qualifier selon valeur';
  }
}

/**
 * Générateur de contexte temps réel avec historique
 */
export class RealTimeContextGenerator {
  private conversationHistory: any[] = [];
  private revealedTopics: Set<string> = new Set();
  private userPreferences: any = {};

  /**
   * Met à jour le contexte basé sur l'historique de conversation
   */
  updateFromConversation(messages: any[]): string {
    this.conversationHistory = messages;
    this.analyzeRevealedTopics(messages);
    this.analyzeUserPreferences(messages);

    return this.generateContextualUpdate();
  }

  private analyzeRevealedTopics(messages: any[]): void {
    for (const message of messages) {
      const content = message.content?.toLowerCase() || '';
      
      // Détection topics révélés
      if (content.includes('budget')) this.revealedTopics.add('budget');
      if (content.includes('équipe') || content.includes('team')) this.revealedTopics.add('team');
      if (content.includes('timeline') || content.includes('planning')) this.revealedTopics.add('timeline');
      if (content.includes('concurrent') || content.includes('solution actuelle')) this.revealedTopics.add('current_solution');
    }
  }

  private analyzeUserPreferences(messages: any[]): void {
    const userMessages = messages.filter(m => m.role === 'user');
    
    // Analyse style communication préféré
    const recentMessages = userMessages.slice(-3);
    let technicalQuestions = 0;
    let businessQuestions = 0;
    let timeConstraints = 0;

    for (const message of recentMessages) {
      const content = message.content?.toLowerCase() || '';
      if (content.includes('comment ça marche') || content.includes('technique')) technicalQuestions++;
      if (content.includes('roi') || content.includes('business')) businessQuestions++;
      if (content.includes('temps') || content.includes('rapide')) timeConstraints++;
    }

    this.userPreferences = {
      prefersTechnical: technicalQuestions > businessQuestions,
      hasTimeConstraints: timeConstraints > 0,
      detailLevel: recentMessages.length > 0 ? 'medium' : 'low'
    };
  }

  private generateContextualUpdate(): string {
    const revealedList = Array.from(this.revealedTopics).join(', ');
    const preferenceStyle = this.userPreferences.prefersTechnical ? 'technique' : 'business';
    const urgency = this.userPreferences.hasTimeConstraints ? 'exprimée' : 'normale';

    return `## MISE À JOUR CONTEXTUELLE TEMPS RÉEL

**Topics déjà révélés:** ${revealedList || 'Aucun encore'}
**Style préféré utilisateur:** ${preferenceStyle}
**Urgence détectée:** ${urgency}
**Niveau détail:** ${this.userPreferences.detailLevel}

**Adaptation conseillée:** ${this.getAdaptationAdvice()}`;
  }

  private getAdaptationAdvice(): string {
    let advice = '';
    
    if (this.userPreferences.hasTimeConstraints) {
      advice += 'Réponses plus concises, aller directement à l\'essentiel. ';
    }
    
    if (this.userPreferences.prefersTechnical) {
      advice += 'Privilégier détails techniques et fonctionnels. ';
    } else {
      advice += 'Focus business impact et ROI. ';
    }
    
    if (this.revealedTopics.size > 3) {
      advice += 'Éviter répétition topics déjà abordés, enrichir ou passer à suite logique.';
    }

    return advice || 'Maintenir approche équilibrée current.';
  }

  reset(): void {
    this.conversationHistory = [];
    this.revealedTopics.clear();
    this.userPreferences = {};
  }
}