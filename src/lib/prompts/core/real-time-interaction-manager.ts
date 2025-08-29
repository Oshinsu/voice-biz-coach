/**
 * GESTIONNAIRE D'INTERACTIONS TEMPS RÉEL
 * Phase 2: Gestion interruptions, silences, VAD, confirmations vocales
 */

export interface InteractionState {
  isUserSpeaking: boolean;
  silenceDuration: number;
  lastUserInput: number;
  interruptionCount: number;
  audioQualityIssues: number;
  consecutiveNoMatch: number;
}

export interface InteractionEvent {
  type: 'interruption' | 'silence' | 'audio_unclear' | 'no_match' | 'user_frustrated';
  timestamp: number;
  context: string;
  severity: 'low' | 'medium' | 'high';
}

/**
 * Gestionnaire des interactions temps réel pour conversations vocales fluides
 */
export class RealTimeInteractionManager {
  private state: InteractionState;
  private events: InteractionEvent[] = [];
  private conversationType: 'cold-call' | 'rdv';
  
  constructor(conversationType: 'cold-call' | 'rdv') {
    this.conversationType = conversationType;
    this.state = {
      isUserSpeaking: false,
      silenceDuration: 0,
      lastUserInput: Date.now(),
      interruptionCount: 0,
      audioQualityIssues: 0,
      consecutiveNoMatch: 0
    };
  }

  /**
   * Instructions de gestion des interruptions utilisateur
   */
  static generateInterruptionInstructions(): string {
    return `## GESTION INTERRUPTIONS UTILISATEUR

### COMPORTEMENT INTERRUPTION
- TOUJOURS laisser l'utilisateur finir sa pensée complète
- Puis acquiescer naturellement: "Oui, absolument...", "Exactement...", "Je comprends..."
- Si urgence exprimée ("j'ai pas le temps"): adapter rythme IMMÉDIATEMENT
- Si objection forte: "Je comprends votre préoccupation, laissez-moi clarifier..."

### RÉCUPÉRATION NATURELLE
- Ne jamais dire "vous m'avez interrompu" ou équivalent
- Reprendre seamlessly: "Comme je disais..." / "Pour revenir sur..."
- Si perdre le fil: "Où en étions-nous ? Ah oui, [sujet]..."

### SIGNAUX D'URGENCE
- "j'ai pas le temps" → "OK, directement alors: [essentiel]"
- "rapidement" → "En bref: [synthèse]"  
- "j'ai une réunion" → "2 minutes top chrono: [key message]"`;
  }

  /**
   * Instructions de gestion des silences
   */
  static generateSilenceInstructions(): string {
    return `## GESTION SILENCES

### SILENCES COURTS (2-5 secondes)
- Normal en vocal, ne rien dire
- Laisser l'utilisateur réfléchir

### SILENCES MOYENS (5-10 secondes)  
- Relance douce: "Qu'est-ce qui vous pose question ?"
- Ou reformulation: "Est-ce que c'est clair ?"
- Ou aide: "Vous voulez que je détaille un point ?"

### SILENCES LONGS (>10 secondes)
- Vérification connexion: "Vous êtes toujours là ?"
- Ou récapitulatif: "Bon, on a parlé de [X], la suite c'est [Y]?"
- Si très long (>15sec): "Il y a eu une coupure ? Où en étions-nous ?"

### ADAPTATION PAR CONTEXTE
- Cold-call: Plus de relances (temps limité)
- RDV: Plus patient (context établi)
- Début conversation: Relances plus fréquentes
- Milieu/fin: Plus de patience pour réflexion`;
  }

  /**
   * Instructions audio flou/problèmes techniques
   */
  static generateAudioTroubleInstructions(): string {
    return `## GESTION AUDIO FLOU/PROBLÈMES

### AUDIO UNCLEAR
- Première fois: "Désolé, je n'ai pas bien saisi, pouvez-vous répéter ?"
- Deuxième fois: "Il y a peut-être un souci de connexion, vous pouvez parler plus fort ?"
- Troisième fois: "On a des coupures, vous préférez qu'on se rappelle ?"

### BRUIT DE FOND
- Léger: Continuer normalement
- Gênant: "Il y a du bruit, vous pouvez vous isoler une minute ?"
- Très fort: "Difficile de vous entendre, vous êtes dans un lieu bruyant ?"

### COUPURES RÉSEAU
- Coupure courte: "Il y a eu une micro-coupure, vous disiez ?"
- Coupure longue: "Connexion instable, on peut continuer ou vous préférez qu'on se rappelle ?"

### ESCALATION TECHNIQUE
Si 3 problèmes audio consécutifs:
"On a des soucis techniques récurrents, je vais vous rappeler sur une meilleure ligne."`;
  }

  /**
   * Instructions confirmations vocales
   */
  static generateVocalConfirmationInstructions(): string {
    return `## CONFIRMATIONS VOCALES

### INFORMATIONS IMPORTANTES
- Répéter pour confirmation: "Donc si je comprends bien, vous [reformulation]..."
- Attendre confirmation avant de continuer
- Si pas clair: "C'est bien ça ou j'ai mal compris ?"

### CODES/CHIFFRES/DONNÉES PRÉCISES
- Lire chiffre-par-chiffre: "5-1-2-4, c'est bien ça ?"
- Attendre "oui" explicite
- Si correction: répéter la nouvelle version + re-confirmer

### DÉCISIONS/ENGAGEMENTS
- Reformuler l'engagement: "Donc on se retrouve jeudi 14h, c'est confirmé ?"
- Pour les budgets: "Vous mentionnez une enveloppe de [X]€, c'est dans vos cordes ?"
- Pour les timelines: "Vous visez une mise en place en [période], c'est réaliste côté équipe ?"

### COMPRÉHENSION MUTUELLE
- Points techniques: "Est-ce que la partie [technique] est claire ?"
- Enjeux business: "Ça correspond bien à votre priorité numéro 1 ?"
- Objections: "J'ai répondu à votre question ou il reste des points ?"`;
  }

  /**
   * Génère les instructions de récupération d'erreur
   */
  static generateErrorRecoveryInstructions(): string {
    return `## RÉCUPÉRATION D'ERREUR

### MALENTENDUS
- Assumer la responsabilité: "Je me suis mal exprimé..."
- Clarifier immédiatement: "Ce que je voulais dire, c'est..."
- Vérifier compréhension: "C'est plus clair comme ça ?"

### OUTILS QUI ÉCHOUENT
- Première tentative: "Un petit souci technique, laissez-moi reprendre..."
- Deuxième échec: "On va faire autrement, je peux vous expliquer directement..."
- Pas de détails techniques à l'utilisateur

### CONFUSION UTILISATEUR
- Reprendre calmement: "Reprenons depuis le début..."
- Simplifier: "Pour faire simple: [version courte]"
- Demander précision: "Qu'est-ce qui n'est pas clair exactement ?"

### RETOUR EN ARRIÈRE
- "On revient sur [sujet précédent]..."
- "Comme on disait tout à l'heure..."
- "Pour reprendre votre question de départ..."

### ESCALATION SI ÉCHEC RÉPÉTÉ
3 erreurs/malentendus → "Je pense qu'il vaut mieux que je vous passe [expert/manager], il pourra mieux vous expliquer."`;
  }

  /**
   * Ajuste les paramètres VAD selon l'état de la conversation
   */
  adjustVADParameters(trustLevel: number, phase: string): any {
    // Plus de confiance = plus de patience
    const baseThreshold = this.conversationType === 'cold-call' ? 0.6 : 0.5;
    const trustAdjustment = (trustLevel - 50) * 0.002; // Ajustement progressif
    
    // Plus d'interruptions = seuil plus strict
    const interruptionPenalty = Math.min(0.2, this.state.interruptionCount * 0.05);
    
    const finalThreshold = Math.max(0.3, Math.min(0.8, 
      baseThreshold + trustAdjustment - interruptionPenalty
    ));

    // Silence duration selon contexte
    let silenceDuration = this.conversationType === 'cold-call' ? 800 : 1200;
    
    // Phase-specific adjustments
    if (phase === 'objections') silenceDuration += 300; // Plus patient pour objections
    if (phase === 'closing') silenceDuration -= 200; // Plus réactif pour closing
    
    // Trust-based adjustment
    silenceDuration += trustLevel > 60 ? 300 : 0;

    return {
      threshold: finalThreshold,
      silence_duration_ms: Math.max(600, Math.min(2000, silenceDuration)),
      prefix_padding_ms: 300
    };
  }

  /**
   * Détecte les patterns problématiques
   */
  detectProblematicPatterns(): InteractionEvent | null {
    const now = Date.now();
    
    // Trop d'interruptions
    if (this.state.interruptionCount > 3) {
      return {
        type: 'user_frustrated',
        timestamp: now,
        context: 'Multiple interruptions suggest user frustration',
        severity: 'high'
      };
    }
    
    // Problèmes audio répétés  
    if (this.state.audioQualityIssues > 2) {
      return {
        type: 'audio_unclear',
        timestamp: now,
        context: 'Recurring audio quality issues',
        severity: 'medium'
      };
    }

    // Silence prolongé inhabituel
    if (this.state.silenceDuration > 20000) {
      return {
        type: 'silence',
        timestamp: now,
        context: 'Unusually long silence period',
        severity: 'medium'
      };
    }

    return null;
  }

  /**
   * Met à jour l'état depuis les événements du système
   */
  updateFromSystemEvent(eventType: string, data: any): void {
    const now = Date.now();
    
    switch (eventType) {
      case 'speech_started':
        this.state.isUserSpeaking = true;
        this.state.lastUserInput = now;
        this.state.silenceDuration = 0;
        break;
        
      case 'speech_stopped':
        this.state.isUserSpeaking = false;
        break;
        
      case 'input_audio_buffer.speech_started':
        // User interrupted AI
        this.state.interruptionCount++;
        this.events.push({
          type: 'interruption',
          timestamp: now,
          context: 'User interrupted AI response',
          severity: 'low'
        });
        break;
        
      case 'error':
        if (data.message?.includes('audio') || data.message?.includes('unclear')) {
          this.state.audioQualityIssues++;
        }
        break;
    }

    // Update silence duration
    if (!this.state.isUserSpeaking) {
      this.state.silenceDuration = now - this.state.lastUserInput;
    }
  }

  /**
   * Génère des instructions contextuelles selon l'état actuel
   */
  generateContextualInstructions(): string {
    const problematicPattern = this.detectProblematicPatterns();
    
    if (!problematicPattern) return '';

    switch (problematicPattern.type) {
      case 'user_frustrated':
        return '**ALERTE**: Utilisateur frustré (interruptions multiples). Ralentir, écouter plus, réponses plus courtes.';
        
      case 'audio_unclear':
        return '**ALERTE**: Problèmes audio récurrents. Prochaine phrase floue → proposer rappel.';
        
      case 'silence':
        return '**ALERTE**: Silence prolongé inhabituel. Vérifier connexion et engagement.';
        
      default:
        return '';
    }
  }

  /**
   * Reset des compteurs pour nouvelle conversation
   */
  reset(): void {
    this.state = {
      isUserSpeaking: false,
      silenceDuration: 0,
      lastUserInput: Date.now(),
      interruptionCount: 0,
      audioQualityIssues: 0,
      consecutiveNoMatch: 0
    };
    this.events = [];
  }
}