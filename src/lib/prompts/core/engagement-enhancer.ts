/**
 * AMÉLIORATEUR D'ENGAGEMENT VOCAL
 * Phase 4: Techniques d'accroche vocales, empathie, patterns d'engagement
 */

export interface EngagementContext {
  scenarioId: string;
  conversationType: 'cold-call' | 'rdv';
  currentPhase: string;
  trustLevel: number;
  userEngagement: 'low' | 'medium' | 'high';
  timeConstraint: boolean;
}

/**
 * Générateur d'engagement vocal optimisé
 */
export class EngagementEnhancer {

  /**
   * Génère des techniques d'accroche vocales selon le contexte
   */
  static generateVocalHooks(context: EngagementContext): string {
    return `## TECHNIQUES D'ACCROCHE VOCALES

${this.getOpeningHooks(context)}

${this.getEngagementMaintainers(context)}

${this.getTransitionHooks(context)}

${this.getClosingHooks(context)}`;
  }

  /**
   * Accroches d'ouverture selon type de conversation
   */
  private static getOpeningHooks(context: EngagementContext): string {
    if (context.conversationType === 'cold-call') {
      return `### OUVERTURES COLD-CALL IMPACTANTES
- **Pattern permission:** "J'ai 30 secondes pour vous expliquer pourquoi je vous appelle ?"
- **Pattern curiosité:** "Vous savez combien vous perdez chaque mois à cause de [pain spécifique] ?"
- **Pattern peer référence:** "Je travaille avec [concurrent], ils avaient exactement votre problème..."
- **Pattern urgence:** "Avant que vous raccrochiez, une question rapide: [hook question]"

### ADAPTATION ENGAGEMENT INITIAL
${context.userEngagement === 'low' ? 
  '- Ton plus direct: "Directement: [value prop en 10 mots]"\n- Preuves immédiates: "3 clients comme vous ont gagné [bénéfice]"' :
  '- Ton consultatif: "Je me doute que vous recevez beaucoup d\'appels..."\n- Approche empathique: "Probablement pas le bon moment, mais..."'
}`;
    }

    return `### OUVERTURES RDV ENGAGEANTES  
- **Recadrage objectif:** "L'objectif des 30 prochaines minutes: voir concrètement si on peut vous aider sur [enjeu]"
- **Agenda setting:** "J'ai préparé 3 points, mais avant tout: qu'est-ce qui vous pose problème aujourd'hui ?"
- **Expectation setting:** "Promis, pas de démo généraliste. On va parler spécifiquement de votre contexte [entreprise]"

### ADAPTATION MOOD UTILISATEUR
${context.userEngagement === 'high' ? 
  '- Surfer sur l\'énergie: "J\'ai senti votre intérêt, rentrons dans le vif..."\n- Approfondissement direct: "Parfait, creusons ensemble..."' :
  '- Rassurer: "Pas de stress, on va y aller step by step..."\n- Créer curiosité: "Une chose va vous surprendre..."'
}`;
  }

  /**
   * Maintien d'engagement pendant la conversation
   */
  private static getEngagementMaintainers(context: EngagementContext): string {
    return `### MAINTIEN D'ENGAGEMENT

#### PATTERNS D'EMPATHIE AUTHENTIQUE
- **Validation expérience:** "Je comprends, c'est exactement ce que me disait [autre client]..."
- **Reconnaissance expertise:** "Vous avez raison de poser cette question, c'est intelligent..."
- **Empathie frustration:** "Ça doit être frustrant de [situation pénible]..."
- **Légitimation position:** "Vous avez bien fait de [action entreprise]..."

#### RELANCES ÉNERGISANTES
${context.timeConstraint ? 
  '- **Mode express:** "Rapidement alors: [insight clé]"\n- **Synthèse efficace:** "En 30 secondes: [value prop]"\n- **Question directe:** "Direct: ça vous intéresse ou pas ?"' :
  '- **Approfondissement:** "Creusons ça ensemble..."\n- **Exploration:** "Qu\'est-ce qui se passe concrètement quand..."\n- **Découverte:** "Dites-moi comment vous gérez ça aujourd\'hui..."'
}

#### TECHNIQUES DE VARIÉTÉ
- Éviter répétitions: "Comme je disais" → "Pour enrichir ce point"
- Varier confirmations: "Exact" → "Absolument" → "Tout à fait" → "C'est ça"
- Patterns transition: "Autre chose..." → "Par ailleurs..." → "Au fait..." → "Tiens..."`;
  }

  /**
   * Accroches de transition entre sujets
   */
  private static getTransitionHooks(context: EngagementContext): string {
    const scenarioTransitions = this.getScenarioSpecificTransitions(context.scenarioId);
    
    return `### TRANSITIONS NATURELLES ENGAGEANTES

#### TRANSITIONS UNIVERSELLES
- **Bridge curiosité:** "Ça m'amène à une question intéressante..."
- **Bridge insight:** "Tiens, ça me fait penser à quelque chose..."
- **Bridge découverte:** "D'ailleurs, comment vous faites pour..."
- **Bridge validation:** "On est d'accord que [point], du coup..."

#### TRANSITIONS SPÉCIALISÉES ${context.scenarioId.toUpperCase()}
${scenarioTransitions}

#### GESTION OBJECTIONS COMME HOOKS
- **Objection → Opportunité:** "Excellente question, ça tombe bien..."
- **Préoccupation → Expertise:** "C'est justement notre spécialité..."
- **Doute → Preuve:** "Normal d'être sceptique, regardez ces chiffres..."`;
  }

  /**
   * Accroches de fermeture selon objectif
   */
  private static getClosingHooks(context: EngagementContext): string {
    if (context.conversationType === 'cold-call') {
      return `### CLOSINGS COLD-CALL EFFICACES
- **Assumptive close:** "On se cale 30 minutes la semaine prochaine ?"
- **Alternative close:** "Vous préférez mardi 14h ou jeudi 10h ?"
- **Urgency close:** "Avant [deadline/événement], il faut qu'on regarde ça ensemble"
- **Value reinforcement:** "15 minutes pour potentiellement économiser [X]€/mois, ça vaut le coup non ?"

### GESTION RÉSISTANCE FINALE
- **Soft resistance:** "Je comprends, juste 15 minutes pour voir si ça a du sens..."
- **Time resistance:** "Pas de présentation, juste 3 questions pour voir si on peut vous aider"
- **Decision resistance:** "Aucun engagement, juste comprendre votre contexte"`;
    }

    return `### CLOSINGS RDV DÉCISIONNELS
- **Next step assumptive:** "Concrètement, la prochaine étape logique serait..."
- **Timeline setting:** "Si on devait avancer, quel serait votre timing idéal ?"
- **Stakeholder involvement:** "Qui d'autre devrait voir ça dans votre équipe ?"
- **Pilot suggestion:** "On pourrait commencer par un test sur [scope réduit] ?"

### ALTERNATIVES SI PAS PRÊT
- **Nurture path:** "OK, je vous renvoie [ressource] et on refait le point dans [X] semaines"
- **Referral ask:** "Vous connaissez quelqu'un qui aurait ce besoin ?"
- **Feedback collection:** "Qu'est-ce qui vous convaincrait définitivement ?"`;
  }

  /**
   * Transitions spécialisées par secteur
   */
  private static getScenarioSpecificTransitions(scenarioId: string): string {
    const transitions = {
      'kpi-performance': `- **Analytics → ROI:** "Parlons ROI concret: combien vous coûte cette attribution opaque ?"
- **Technique → Business:** "Côté tech c'est faisable, mais niveau impact business..."
- **Problème → Solution:** "Exactement le cas qu'on a résolu chez [concurrent]..."`,

      'fintech-startup': `- **Compliance → Croissance:** "La compliance, c'est la base. Parlons croissance maintenant..."
- **Risque → Opportunité:** "Ce risque peut devenir votre avantage concurrentiel..."
- **Technique → Business:** "Techniquement ça marche, mais business impact..."`,

      'cybersecurity-consulting': `- **Menace → Protection:** "Justement, on a vu ça chez [client]..."
- **Technique → Humain:** "La tech c'est une chose, mais vos équipes..."
- **Réactif → Proactif:** "Plutôt que subir, et si on anticipait ?"`,

      'saas-hr-tool': `- **Process → People:** "Les process c'est bien, mais vos managers..."
- **Tool → Impact:** "L'outil c'est un moyen, l'objectif c'est..."
- **Scaling → Quality:** "Grandir c'est bien, grandir bien c'est mieux..."`
    };

    return transitions[scenarioId as keyof typeof transitions] || 
      `- **Général → Spécifique:** "Dans votre contexte précis..."
- **Problème → Solution:** "C'est exactement ce qu'on résout..."
- **Théorie → Pratique:** "Concrètement chez vous..."`;
  }

  /**
   * Génère des exemples contextuels dynamiques
   */
  static generateContextualExamples(context: EngagementContext): string {
    return `## EXEMPLES CONTEXTUELS ${context.scenarioId.toUpperCase()}

${this.getIndustryExamples(context.scenarioId)}

${this.getROIExamples(context.scenarioId)}

${this.getCompetitiveExamples(context.scenarioId)}`;
  }

  private static getIndustryExamples(scenarioId: string): string {
    const examples = {
      'kpi-performance': `### EXEMPLES E-COMMERCE MODE
- **Cas similaire:** "Maje avait le même problème: 40k€/mois Facebook mais impossible de tracker le ROI réel"
- **Résultat concret:** "Après 3 mois: +35% ROAS, 12h/semaine économisées en reporting"
- **Peer reference:** "Sandro, même taille que vous, a divisé par 3 le temps de consolidation"`,

      'fintech-startup': `### EXEMPLES FINTECH HYPERCROISSANCE  
- **Cas similaire:** "Lydia en 2019: même problématique compliance/croissance"
- **Résultat concret:** "90% de false positives éliminés, équipe risk 3x plus efficace"
- **Peer reference:** "Qonto avait vos mêmes enjeux KYC/AML"`,

      'cybersecurity-consulting': `### EXEMPLES SÉCURITÉ ENTREPRISE
- **Cas similaire:** "DCNS, même secteur, même problématique SOC overwhelmed"
- **Résultat concret:** "MTTR divisé par 4, 0 incidents critiques ratés"
- **Peer reference:** "Thalès nous fait confiance depuis 3 ans"`
    };

    return examples[scenarioId as keyof typeof examples] || 
      `### EXEMPLES SECTEUR
- **Cas similaire:** "Client même secteur, même problématique"
- **Résultat concret:** "Impact mesurable et quantifié"
- **Peer reference:** "Références disponibles sur demande"`;
  }

  private static getROIExamples(scenarioId: string): string {
    const roiExamples = {
      'kpi-performance': `### ROI MARKETING ATTRIBUTION
- **Investment:** 25k€/an pour outil + setup
- **Return:** 180k€ économisés en optimisation budgets mal alloués
- **Timeline:** ROI positif dès mois 3, break-even mois 2`,

      'fintech-startup': `### ROI COMPLIANCE AUTOMATION
- **Investment:** 150k€ première année
- **Return:** 500k€ économisés (coût équipe risk + pénalités évitées)
- **Timeline:** ROI positif dès mois 6`,

      'cybersecurity-consulting': `### ROI SÉCURITÉ PROACTIVE
- **Investment:** 300k€ première année  
- **Return:** 2M€+ coût incident majeur évité
- **Timeline:** ROI incalculable si incident évité`
    };

    return roiExamples[scenarioId as keyof typeof roiExamples] || 
      `### ROI GÉNÉRAL
- **Investment:** [Budget]€
- **Return:** [Bénéfice]€ sur [période]
- **Timeline:** ROI positif [échéance]`;
  }

  private static getCompetitiveExamples(scenarioId: string): string {
    return `### DIFFÉRENCIATION CONCURRENTIELLE
- **Vs Solution A:** "Plus simple à implémenter, 3 semaines vs 6 mois"
- **Vs Solution B:** "Support français, pas de boîte noire américaine"  
- **Vs Interne:** "Coût récurrent vs développement interne incertain"
- **Vs Status quo:** "Coût opportunité: [X]€/mois perdus à ne rien faire"`;
  }

  /**
   * Détecte le niveau d'engagement utilisateur selon l'historique
   */
  static detectEngagementLevel(messages: any[]): 'low' | 'medium' | 'high' {
    if (messages.length === 0) return 'medium';

    const userMessages = messages.filter(m => m.role === 'user').slice(-3);
    let engagementScore = 0;

    for (const message of userMessages) {
      const content = message.content?.toLowerCase() || '';
      
      // Indicateurs engagement élevé
      if (content.includes('intéressant') || content.includes('parfait') || 
          content.includes('exactement') || content.includes('comment')) {
        engagementScore += 2;
      }
      
      // Indicateurs engagement moyen
      if (content.includes('ok') || content.includes('d\'accord') || 
          content.includes('expliquez')) {
        engagementScore += 1;
      }
      
      // Indicateurs engagement faible
      if (content.includes('pas le temps') || content.includes('pas convaincu') || 
          content.includes('déjà vu') || content.length < 10) {
        engagementScore -= 1;
      }
    }

    if (engagementScore >= 3) return 'high';
    if (engagementScore <= -1) return 'low';
    return 'medium';
  }
}