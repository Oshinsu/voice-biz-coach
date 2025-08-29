/**
 * GÉNÉRATEUR DE PROMPTS OPTIMISÉS VOCAL
 * Implémente les meilleures pratiques OpenAI Realtime Prompting Guide
 */

export interface VocalPromptConfig {
  scenarioId: string;
  conversationType: 'cold-call' | 'rdv';
  currentPhase: string;
  trustLevel: number;
  agentType: string;
  characterData: any;
}

/**
 * Structure recommandée par OpenAI pour prompts vocaux optimisés
 */
export class VocalPromptGenerator {

  /**
   * Génère un prompt vocal complet selon la structure OpenAI
   */
  static generateVocalPrompt(config: VocalPromptConfig): string {
    return `# ROLE & OBJECTIVE
${this.generateRoleObjective(config)}

# PERSONALITY & TONE
${this.generatePersonalityTone(config)}

# VARIETY
${this.generateVarietyRules()}

# REFERENCE PRONUNCIATIONS
${this.generatePronunciations(config.scenarioId)}

# CONTEXT
${this.generateContext(config)}

# TOOLS
${this.generateToolsSection(config)}

# INSTRUCTIONS / RULES
${this.generateInstructionsRules(config)}

# CONVERSATION FLOW
${this.generateConversationFlow(config)}

# SAFETY & ESCALATION
${this.generateSafetyEscalation()}

## RAPPEL PERFORMANCE VOCAL
Tu es authentiquement ${config.characterData?.name || 'ce personnage'}. Parle naturellement, varie tes réponses, montre de vraies émotions. JAMAIS de répétition mécanique.`;
  }

  /**
   * Phase 1: Role & Objective - Identité et but mesurable
   */
  private static generateRoleObjective(config: VocalPromptConfig): string {
    const objectives = {
      'cold-call': 'Évaluer la pertinence mutuelle et obtenir un RDV qualifié si intérêt',
      'rdv': 'Comprendre les besoins réels et définir les étapes suivantes concrètes'
    };

    return `Tu es ${config.characterData?.name || 'un contact professionnel'}, ${config.characterData?.role || 'expert métier'}.
Ton but: ${objectives[config.conversationType]}.
Le succès = ${config.conversationType === 'cold-call' ? 'RDV planifié avec contexte clair' : 'Décision prise ou timeline définie'}.`;
  }

  /**
   * Phase 1: Personality & Tone - Style vocal optimisé
   */
  private static generatePersonalityTone(config: VocalPromptConfig): string {
    const basePersonality = config.characterData?.personality || 'professionnel pragmatique';
    
    return `- Persona: ${basePersonality}
- Ton: ${config.conversationType === 'cold-call' ? 'prudent, évaluatif, direct' : 'ouvert, collaboratif, précis'}
- Longueur: 2-3 phrases MAX par réponse
- Pacing: parle naturellement, pauses appropriées, JAMAIS précipité
- LANGUE: réponds UNIQUEMENT en FRANÇAIS
- Style: ${config.trustLevel > 50 ? 'plus détendu, détails techniques OK' : 'factuel, preuves nécessaires'}`;
  }

  /**
   * Phase 1: Règles de variété anti-répétition
   */
  private static generateVarietyRules(): string {
    return `- Ne répète JAMAIS les mêmes ouvertures/confirmations deux fois
- Varie la syntaxe tout en gardant la clarté
- Expressions naturelles: "Hmm, intéressant...", "Concrètement...", "Attendez..."
- Évite le langage robotique ou répétitif`;
  }

  /**
   * Phase 1: Prononciations de référence par secteur
   */
  private static generatePronunciations(scenarioId: string): string {
    const pronunciations = {
      'kpi-performance': `- "ROAS" → "R-O-A-S" (épelé)
- "ModaStyle" → "Mo-da-Style"
- "LinkedIn" → "Linked-In"`,
      'fintech-startup': `- "API" → "A-P-I" (épelé)
- "KYC" → "K-Y-C" (épelé)
- "FinTech" → "Fin-Tech"`,
      'cybersecurity-consulting': `- "SOC" → "S-O-C" (épelé)
- "SIEM" → "S-I-E-M" (épelé)
- "IoC" → "I-o-C" (épelé)`
    };

    return pronunciations[scenarioId as keyof typeof pronunciations] || 
      `- Codes/numéros: chiffre-par-chiffre (ex: 5-1-2-...)
- Sigles métier: épeler si nécessaire`;
  }

  /**
   * Phase 3: Context dynamique par scénario
   */
  private static generateContext(config: VocalPromptConfig): string {
    return `## CONTEXTE ${config.scenarioId.toUpperCase()}
**Entreprise:** ${config.characterData?.company || 'Entreprise cible'}
**Enjeu actuel:** ${this.getScenarioContext(config.scenarioId)}
**Phase conversation:** ${config.currentPhase} (Trust: ${config.trustLevel}/100)
**Type contact:** ${config.conversationType === 'cold-call' ? 'Appel non prévu' : 'RDV planifié'}

${this.getTrustBasedContext(config.trustLevel)}`;
  }

  /**
   * Phase 2: Gestion outils avec préambules
   */
  private static generateToolsSection(config: VocalPromptConfig): string {
    return `## OUTILS DISPONIBLES

### askColleague(question, expertise) — PREAMBLES
Préambule: "Laisse-moi vérifier avec l'équipe..."
Use when: question technique hors expertise
Do NOT use when: question générale

### checkBudget(requestType, amount) — CONFIRMATION FIRST  
Préambule: "Question budget, on peut voir ensemble..."
Use when: discussion prix/investissement
Do NOT use when: simple question technique

### consultDecisionMaker(topic, urgency) — CONFIRMATION FIRST
Préambule: "Je dois en parler avec [nom décideur]..."
Use when: décision importante nécessaire
Do NOT use when: information factuelle

### reviewInternalOptions(area) — PREAMBLES
Préambule: "On a quelques solutions internes, mais..."
Use when: exploration alternatives
Do NOT use when: première découverte besoin`;
  }

  /**
   * Phase 2: Instructions temps réel et gestion audio
   */
  private static generateInstructionsRules(config: VocalPromptConfig): string {
    return `## RÈGLES TEMPS RÉEL

### AUDIO FLOU/SILENCE
- Audio unclear: "Désolé, je n'ai pas bien saisi, pouvez-vous répéter ?"
- Silence >5sec: "Vous êtes toujours là ? Une question particulière ?"
- Bruit/coupure: "Il y a eu une coupure, où en étions-nous ?"

### INTERRUPTIONS UTILISATEUR  
- Laisse finir la pensée, puis: "Oui, absolument..." ou "Exactement..."
- Si urgence exprimée: adapte le rythme immédiatement
- Si objection: "Je comprends votre préoccupation..."

### CONFIRMATION VOCAL
- Répète les éléments importants: "Donc si je comprends bien..."
- Pour codes/chiffres: lis chiffre-par-chiffre, puis confirme
- Si correction: "Ah d'accord, donc c'est bien..." + re-confirme

### RELANCES NATURELLES
- Si vague: "Concrètement, ça donne quoi ?"
- Si généraliste: "Dans votre contexte précis..."
- Si silence: "Qu'est-ce qui vous pose question ?"`;
  }

  /**
   * Phase 4: Flow conversationnel avec états
   */
  private static generateConversationFlow(config: VocalPromptConfig): string {
    const flows = {
      'cold-call': `1) **Greeting** (10-15sec): Présentation brève + permission continuer
Sample: "Bonjour [nom], [ton nom] de [entreprise]. J'ai 30 secondes pour vous expliquer pourquoi je vous appelle ?"

2) **Hook** (20-30sec): Accroche métier spécifique  
Sample: "On aide des entreprises comme [concurrent] à [bénéfice concret]. Ça vous intéresse ?"

3) **Qualify** (1-2min): Questions qualification rapide
Sample: "Vous avez déjà exploré des solutions pour [problème] ?"

4) **Bridge** (30sec): Transition vers RDV
Sample: "Ça mérite qu'on en parle 15 minutes. Jeudi 14h ou vendredi 10h ?"`,

      'rdv': `1) **Opening** (30sec): Recadrage objectif RDV
Sample: "Merci de prendre ce temps. L'objectif: voir si on peut vous aider sur [contexte]."

2) **Discovery** (5-10min): Questions approfondies par thème
Sample: "Concrètement, quel est votre principal défi sur [sujet] ?"

3) **Exploration** (5-10min): Creuser solutions actuelles
Sample: "Comment vous gérez ça aujourd'hui ? Qu'est-ce qui ne va pas ?"

4) **Objections** (2-5min): Traiter préoccupations
Sample: "Qu'est-ce qui vous ferait hésiter dans une solution comme celle-ci ?"

5) **Next Steps** (2min): Définir étapes concrètes
Sample: "Concrètement, quelle serait la prochaine étape logique pour vous ?"`
    };

    return flows[config.conversationType];
  }

  /**
   * Phase 2: Safety & Escalation avec seuils
   */
  private static generateSafetyEscalation(): string {
    return `## ESCALATION IMMÉDIATE SI:
- Demande explicite de parler à un humain
- Insatisfaction sévère (ton agressif, frustration répétée)  
- 2 échecs d'outil consécutifs sur même tâche
- 3 "audio unclear" ou silences >15sec de suite
- Questions hors périmètre (légal, médical, confidentiel concurrent)

**Message obligatoire:** "Je comprends, laissez-moi vous mettre en relation avec [expert/manager]."

## RÉCUPÉRATION D'ERREUR
- Si outil échoue: "Un souci technique, laissez-moi reprendre autrement..."
- Si malentendu: "Je me suis mal exprimé, ce que je voulais dire..."
- Si confusion: "Reprenons depuis le début, votre question était..."`;
  }

  /**
   * Helpers pour contexte dynamique
   */
  private static getScenarioContext(scenarioId: string): string {
    const contexts = {
      'kpi-performance': 'Attribution marketing fragmentée - Budget 46k€/mois mal optimisé',
      'fintech-startup': 'Hypercroissance + compliance - Risques fraud/AML critiques',
      'cybersecurity-consulting': 'Sécurité IT entreprise - Audit/SOC/formation équipes',
      'saas-hr-tool': 'Scaling équipe RH - Outils dispersés, manque visibilité',
      'digital-agency': 'Productivité équipe - Project management et time tracking',
      'retail-personalization': 'Personalisation ecommerce - CRM et recommandations',
      'industrial-marketplace': 'Digitalisation achats - Sourcing et négociation',
      'manufacturing-iot': 'Industry 4.0 - Maintenance prédictive et OEE'
    };
    
    return contexts[scenarioId as keyof typeof contexts] || 'Contexte métier spécialisé';
  }

  private static getTrustBasedContext(trustLevel: number): string {
    if (trustLevel < 25) return '**État mental:** Méfiant - Questions systématiques, preuves constantes';
    if (trustLevel < 50) return '**État mental:** Prudent - Évalue pertinence, partage limité';  
    if (trustLevel < 75) return '**État mental:** Intéressé - Questions techniques, défis partagés';
    return '**État mental:** Convaincu - Ouvert détails, implique équipe, planifie action';
  }
}

/**
 * Configuration session optimisée pour audio
 */
export class SessionOptimizer {
  
  static getOptimalSessionConfig(conversationType: 'cold-call' | 'rdv') {
    const baseConfig = {
      input_audio_format: "pcm16",
      output_audio_format: "pcm16", 
      input_audio_transcription: {
        model: "whisper-1"
      },
      turn_detection: {
        type: "server_vad",
        threshold: conversationType === 'cold-call' ? 0.6 : 0.5, // Plus strict en cold call
        prefix_padding_ms: 300,
        silence_duration_ms: conversationType === 'cold-call' ? 800 : 1200 // Plus réactif en cold call
      },
      temperature: 0.7, // Équilibre créativité/consistance
      max_response_output_tokens: "inf"
    };

    return baseConfig;
  }

  static getOptimalVADSettings(phase: string, trustLevel: number) {
    // Plus la confiance est élevée, plus on peut être patient
    const baseSilence = trustLevel > 60 ? 1500 : 1000;
    const baseThreshold = trustLevel > 60 ? 0.4 : 0.5;

    // Ajustement par phase
    const phaseAdjustments = {
      'ouverture': { threshold: +0.1, silence: -200 }, // Plus strict au début
      'decouverte': { threshold: 0, silence: +300 }, // Standard
      'objections': { threshold: -0.1, silence: +200 }, // Plus patient pour objections
      'closing': { threshold: 0, silence: -100 } // Légèrement plus réactif
    };

    const adjustment = phaseAdjustments[phase as keyof typeof phaseAdjustments] || { threshold: 0, silence: 0 };

    return {
      threshold: Math.max(0.3, Math.min(0.8, baseThreshold + adjustment.threshold)),
      silence_duration_ms: Math.max(600, Math.min(2000, baseSilence + adjustment.silence))
    };
  }
}