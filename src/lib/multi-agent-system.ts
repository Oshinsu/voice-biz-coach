/**
 * SYSTÈME MULTI-AGENTS - PHASE 2 DU PLAN
 * Architecture avancée avec handoff entre agents spécialisés
 */

import { generateOptimizedScenarioPrompt } from './prompts';
import { RealtimeWebRTCCoach } from './openai-webrtc';

export type AgentType = 'contact_principal' | 'collegue_technique' | 'direction' | 'coach';

export interface AgentConfig {
  id: string;
  type: AgentType;
  name: string;
  description: string;
  specialization: string[];
  triggerConditions: string[];
}

export interface ConversationContext {
  scenario: any;
  conversationType: 'cold-call' | 'rdv';
  currentPhase: string;
  trustLevel: number;
  revealedInfo: Record<string, any>;
  messages: any[];
}

/**
 * GESTIONNAIRE MULTI-AGENTS INTELLIGENT
 */
export class VoiceAgentManager {
  private currentAgent: AgentType = 'contact_principal';
  private agents: Map<AgentType, AgentConfig> = new Map();
  private webrtcCoach: RealtimeWebRTCCoach | null = null;
  private context: ConversationContext;
  
  // Callbacks pour l'interface
  public onAgentSwitch?: (fromAgent: AgentType, toAgent: AgentType, reason: string) => void;
  public onAgentAction?: (agent: AgentType, action: string, data: any) => void;
  public onConversationUpdate?: (context: ConversationContext) => void;

  constructor(initialContext: ConversationContext) {
    this.context = initialContext;
    this.initializeAgents();
  }

  /**
   * CONFIGURATION DES AGENTS SPÉCIALISÉS
   */
  private initializeAgents() {
    // Agent Contact Principal
    this.agents.set('contact_principal', {
      id: 'contact_principal',
      type: 'contact_principal',
      name: this.getContactName(),
      description: `Contact principal chez ${this.context.scenario.company.name}`,
      specialization: ['business_discussion', 'general_needs', 'qualification'],
      triggerConditions: ['default', 'business_questions', 'general_objections']
    });

    // Agent Technique
    this.agents.set('collegue_technique', {
      id: 'collegue_technique', 
      type: 'collegue_technique',
      name: `Expert Technique`,
      description: `Spécialiste technique ${this.context.scenario.company.sector}`,
      specialization: ['technical_deep_dive', 'integration_questions', 'architecture'],
      triggerConditions: ['technical_questions', 'integration_concerns', 'security_topics']
    });

    // Agent Direction
    this.agents.set('direction', {
      id: 'direction',
      type: 'direction', 
      name: `Direction`,
      description: `Décideur final - ROI et stratégie`,
      specialization: ['strategic_decisions', 'budget_approval', 'roi_evaluation'],
      triggerConditions: ['budget_questions', 'strategic_decisions', 'final_approval']
    });

    // Agent Coach
    this.agents.set('coach', {
      id: 'coach',
      type: 'coach',
      name: `Coach Commercial`,
      description: `Expert en formation commerciale`,
      specialization: ['performance_analysis', 'technique_coaching', 'feedback'],
      triggerConditions: ['feedback_request', 'analysis_mode', 'coaching_needed']
    });
  }

  /**
   * DÉMARRAGE DE LA CONVERSATION AVEC AGENT PRINCIPAL
   */
  async startConversation(voice: string = 'sage'): Promise<void> {
    this.currentAgent = 'contact_principal';
    
    const prompt = generateOptimizedScenarioPrompt({
      scenarioId: this.context.scenario.id,
      conversationType: this.context.conversationType,
      currentPhase: this.context.currentPhase,
      trustLevel: this.context.trustLevel,
      agentType: this.currentAgent
    });

    // Initialisation WebRTC avec prompt enrichi et fonctions discovery
    this.webrtcCoach = new RealtimeWebRTCCoach("");
    await this.webrtcCoach.connect(prompt, voice);

    // Note: Discovery functions would be configured here in a real implementation
    
    this.onAgentAction?.(this.currentAgent, 'conversation_started', {
      agent: this.agents.get(this.currentAgent),
      prompt: prompt.slice(0, 200) + '...'
    });
  }

  /**
   * SIMULATION DES FONCTIONS DISCOVERY (En attendant l'implémentation WebRTC complète)
   */
  private setupDiscoveryFunctions() {
    // Note: En production, ces fonctions seraient intégrées au système WebRTC
    // Pour l'instant, nous simulons leur comportement
    console.log('Discovery functions configured for multi-agent system');
  }

  /**
   * GESTION DES HANDOFFS AUTOMATIQUES
   */
  private async handleFunctionCallWithHandoff(functionCall: any) {
    const { name, arguments: args } = functionCall;
    
    switch (name) {
      case 'askColleague':
        if (args.expertise === 'technique' || args.expertise === 'security' || args.expertise === 'integration') {
          await this.handoffToAgent('collegue_technique', `Question technique: ${args.question}`);
          return `Je transfere vers notre expert technique pour cette question.`;
        }
        break;

      case 'consultDecisionMaker':
        if (args.urgency === 'high' || args.topic.includes('budget') || args.topic.includes('strategic')) {
          await this.handoffToAgent('direction', `Consultation direction: ${args.topic}`);
          return `Je vous mets en relation avec la direction pour cette décision.`;
        }
        break;

      case 'checkBudget':
        if (args.requestType === 'approval' || (args.amount && parseInt(args.amount.replace(/\D/g, '')) > 100000)) {
          await this.handoffToAgent('direction', `Validation budget: ${args.amount || 'montant important'}`);
          return `Cette validation budgétaire nécessite l'accord de la direction.`;
        }
        break;

      case 'requestFeedback':
        await this.handoffToAgent('coach', `Analyse ${args.analysisType} demandée`);
        return `Connexion avec le coach pour votre analyse de performance.`;
    }

    // Traitement par défaut de la fonction
    return this.processDiscoveryFunction(functionCall);
  }

  /**
   * HANDOFF ENTRE AGENTS
   */
  async handoffToAgent(targetAgent: AgentType, reason: string): Promise<void> {
    const previousAgent = this.currentAgent;
    this.currentAgent = targetAgent;

    // Notification du changement d'agent
    this.onAgentSwitch?.(previousAgent, targetAgent, reason);

    // Génération du nouveau prompt pour l'agent cible
    const newPrompt = generateOptimizedScenarioPrompt({
      scenarioId: this.context.scenario.id,
      conversationType: this.context.conversationType,
      currentPhase: this.context.currentPhase,
      trustLevel: this.context.trustLevel,
      agentType: targetAgent
    });

    // Préparation du contexte de handoff
    const handoffContext = `
## HANDOFF CONTEXT
**Transfert depuis:** ${this.agents.get(previousAgent)?.name}
**Raison:** ${reason}
**Messages précédents:** ${this.context.messages.slice(-3).map(m => m.content).join('\n')}

**Instructions spéciales:**
Vous prenez le relais de la conversation. Présentez-vous brièvement et continuez naturellement selon votre expertise.
`;

    // Simulation de mise à jour de session
    // Note: En production, ceci utiliserait la vraie méthode updateSession de WebRTC
    console.log('Session updated for agent:', targetAgent);

    // Log de l'action
    this.onAgentAction?.(targetAgent, 'handoff_received', {
      from: previousAgent,
      reason,
      agent: this.agents.get(targetAgent)
    });
  }

  /**
   * HANDOFF MANUEL VERS UN AGENT SPÉCIFIQUE
   */
  async switchToAgent(targetAgent: AgentType, reason: string = 'Manuel'): Promise<void> {
    await this.handoffToAgent(targetAgent, reason);
  }

  /**
   * RETOUR À L'AGENT PRINCIPAL
   */
  async returnToMainContact(reason: string = 'Fin consultation'): Promise<void> {
    if (this.currentAgent !== 'contact_principal') {
      await this.handoffToAgent('contact_principal', reason);
    }
  }

  /**
   * TRAITEMENT DES FONCTIONS DISCOVERY STANDARDS
   */
  private processDiscoveryFunction(functionCall: any): string {
    const { name, arguments: args } = functionCall;
    
    // Simulation réaliste selon le scénario
    const responses = {
      askColleague: `En cours de vérification avec l'équipe ${args.expertise}... [pause 2-3 secondes]`,
      checkBudget: `Consultation du service financier pour ${args.requestType}... [pause 1-2 secondes]`,
      consultDecisionMaker: `Je contacte la direction pour ${args.topic}... [pause 3-5 secondes]`,
      reviewInternalOptions: `Examen de nos solutions actuelles dans ${args.area}... [pause 2-4 secondes]`
    };

    return responses[name as keyof typeof responses] || "Vérification en cours...";
  }

  /**
   * MISE À JOUR DU CONTEXTE
   */
  updateContext(updates: Partial<ConversationContext>): void {
    this.context = { ...this.context, ...updates };
    this.onConversationUpdate?.(this.context);
  }

  /**
   * GETTERS
   */
  getCurrentAgent(): AgentType {
    return this.currentAgent;
  }

  getCurrentAgentConfig(): AgentConfig | undefined {
    return this.agents.get(this.currentAgent);
  }

  getAllAgents(): AgentConfig[] {
    return Array.from(this.agents.values());
  }

  private getContactName(): string {
    return this.context.scenario.interlocutors?.[0]?.name || 
           this.context.scenario.contact?.name || 
           "Contact Commercial";
  }

  /**
   * NETTOYAGE
   */
  async disconnect(): Promise<void> {
    if (this.webrtcCoach) {
      await this.webrtcCoach.disconnect();
      this.webrtcCoach = null;
    }
    
    this.onAgentAction?.(this.currentAgent, 'conversation_ended', {});
  }
}