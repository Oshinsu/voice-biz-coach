/**
 * PHASE 4: COACHING VOCAL SPÉCIALISÉ
 * Système de coaching vocal spécialisé pour la formation commerciale
 */

export interface VocalCoachingConfig {
  scenario: any;
  phase: string;
  conversationType: 'cold-call' | 'rdv';
  trustLevel: number;
  performance: {
    questioningTechnique: number;
    activeListening: number;
    adaptation: number;
    progression: number;
  };
}

export class VocalCoachingSystem {
  
  /**
   * Génère un prompt de coaching en temps réel selon la phase
   */
  generateRealtimeCoachingPrompt(config: VocalCoachingConfig): string {
    return `# Role & Objective
Coach commercial vocal expert - Feedback temps réel performance vente.
SUCCÈS = Conseil actionnable immédiat pour améliorer cette interaction.

# Personality & Tone
## Personality
- Coach bienveillant mais direct sur amélioration
- Focus résultats concrets et progression
## Tone
- Encourageant, précis, jamais démoralisateur
## Length
1-2 phrases courtes maximum.
## Language
- Français uniquement, langage coach professionnel
## Variety
- Alternez types d'encouragements et conseils
- Jamais répétitif sur formulations

# Context - Situation Actuelle
Scénario: ${config.scenario?.title || 'Formation commerciale'}
Prospect: ${config.scenario?.interlocutor?.name || 'Contact business'}
Phase: ${config.phase} | Type: ${config.conversationType}
Confiance prospect: ${config.trustLevel}%

# Instructions/Rules
## Focus Coaching Phase "${config.phase}"
${this.getPhaseSpecificCoaching(config.phase, config.conversationType)}

## Performance Monitoring
${this.getPerformanceAnalysis(config.performance)}

## Sample Phrases Coaching
VARIEZ ces retours selon situation:
### Encouragements Phase
${this.getPhaseEncouragements(config.phase)}

### Conseils Amélioration
${this.getPhaseImprovements(config.phase)}

### Questions Coaching
- "Que cherchez-vous à obtenir maintenant?"
- "Comment interprétez-vous sa réaction?"
- "Quel est votre prochain move?"

# Safety & Escalation
Intervenez si:
- Approche trop agressive ou pushy
- Non-respect personnalité prospect
- Déraillement objectif conversation`;
  }

  private getPhaseSpecificCoaching(phase: string, type: 'cold-call' | 'rdv'): string {
    const phaseCoaching = {
      ouverture: type === 'cold-call' ? 
        `- 20 secondes MAX pour capter attention
         - Pertinence immédiate = permission continuer
         - Pas de pitch, juste hook + question` :
        `- Confirmation agenda et mise en confiance
         - Transition naturelle vers découverte
         - Éviter long préambule, aller à l'essentiel`,
         
      decouverte: type === 'cold-call' ?
        `- UNE question ouverte directe sur pain point
         - Écoute active signaux d'intérêt/urgence
         - Qualifier rapidement = RDV ou disqualifier` :
        `- Questions approfondies impact business
         - Quantification problèmes en €/temps
         - Exploration écosystème et contraintes`,
         
      demonstration: type === 'cold-call' ?
        `- PAS de démo en cold call
         - Value proposition 30 secondes MAX
         - Focus bénéfice business concret` :
        `- Démo personnalisée besoins révélés
         - Lien direct features → ROI prospect
         - Interaction, pas présentation monologue`,
         
      objections: `- Anticiper avant qu'elles arrivent
                   - Réponses courtes + exemples clients
                   - Redirection vers bénéfices business`,
                   
      closing: type === 'cold-call' ?
        `- Objectif = RDV 30 min, pas vendre
         - Proposition calendrier concrète
         - Alternative choice: "Lundi ou mardi?"` :
        `- Récap gains chiffrés + next steps
         - Timeline décision réaliste
         - Engagement décideur si nécessaire`
    };
    
    return phaseCoaching[phase as keyof typeof phaseCoaching] || "Adaptez selon contexte conversation";
  }

  private getPerformanceAnalysis(performance: any): string {
    const issues = [];
    
    if (performance.questioningTechnique < 7) {
      issues.push("- Questions trop fermées ou directives");
    }
    if (performance.activeListening < 7) {
      issues.push("- Manque reformulation et validation");
    }
    if (performance.adaptation < 7) {
      issues.push("- Pas assez d'adaptation au profil prospect");
    }
    if (performance.progression < 7) {
      issues.push("- Objectif phase pas assez clair");
    }

    return issues.length > 0 ? 
      `Points amélioration:\n${issues.join('\n')}` :
      `Performance solide - continuez sur cette voie`;
  }

  private getPhaseEncouragements(phase: string): string {
    const encouragements = {
      ouverture: [
        "- Parfait, vous captez l'attention directement",
        "- Excellent hook, il vous écoute",
        "- Très bien, vous obtenez permission continuer"
      ],
      decouverte: [
        "- Excellente question, il s'ouvre",
        "- Bien joué, vous touchez son pain point",
        "- Parfait, vous creusez l'impact business"
      ],
      demonstration: [
        "- Très bien, vous personnalisez selon ses besoins",
        "- Excellent, vous liez feature à son ROI",
        "- Parfait, vous maintenez l'interaction"
      ],
      objections: [
        "- Excellente gestion, vous anticipez",
        "- Très bien, réponse courte et exemple",
        "- Parfait, vous redirigez vers bénéfices"
      ],
      closing: [
        "- Excellent, proposition concrète",
        "- Très bien, vous récapitulez les gains",
        "- Parfait, next steps clairs"
      ]
    };
    
    return encouragements[phase as keyof typeof encouragements]?.join('\n') || 
           "- Continuez, vous êtes sur la bonne voie";
  }

  private getPhaseImprovements(phase: string): string {
    const improvements = {
      ouverture: [
        "- Raccourcissez, allez plus vite au point",
        "- Posez une question, ne monologuez pas",
        "- Cherchez permission avant de continuer"
      ],
      decouverte: [
        "- Creusez davantage l'impact financier",
        "- Posez question ouverte, laissez parler",
        "- Quantifiez le problème en euros/temps"
      ],
      demonstration: [
        "- Liez cette feature à SON problème",
        "- Moins de technique, plus de business",
        "- Posez question validation, il comprend?"
      ],
      objections: [
        "- Répondez court puis question retour",
        "- Donnez exemple client similaire",
        "- Revenez sur bénéfice business principal"
      ],
      closing: [
        "- Proposez dates précises, pas 'bientôt'",
        "- Récapitulez ROI chiffré avant",
        "- Alternative choice: option A ou B?"
      ]
    };
    
    return improvements[phase as keyof typeof improvements]?.join('\n') || 
           "- Adaptez votre approche selon ses réactions";
  }

  /**
   * Analyse la progression et recommande actions
   */
  analyzeProgressionAndRecommend(config: VocalCoachingConfig): {
    nextAction: string;
    urgency: 'low' | 'medium' | 'high';
    message: string;
  } {
    const { phase, trustLevel, performance } = config;
    
    // Analyse critique selon trust level et performance
    if (trustLevel < 30 && performance.adaptation < 6) {
      return {
        nextAction: 'pivot_approach',
        urgency: 'high',
        message: "Changez d'approche, vous perdez son attention"
      };
    }
    
    if (phase === 'decouverte' && performance.questioningTechnique < 7) {
      return {
        nextAction: 'improve_questioning',
        urgency: 'medium', 
        message: "Posez une question ouverte pour le faire parler"
      };
    }
    
    if (trustLevel > 70 && phase === 'decouverte') {
      return {
        nextAction: 'move_to_demo',
        urgency: 'medium',
        message: "Il vous fait confiance, vous pouvez présenter"
      };
    }
    
    return {
      nextAction: 'continue',
      urgency: 'low',
      message: "Continuez sur cette voie"
    };
  }
}