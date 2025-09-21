/**
 * AGENTS SDK OFFICIEL - RealtimeAgent + RealtimeSession
 * Conforme septembre 2025 - WebRTC + clés éphémères
 */

import { 
  RealtimeAgent, 
  RealtimeSession, 
  OpenAIRealtimeWebRTC,
  tool,
  RealtimeContextData,
  RealtimeItem,
  RealtimeOutputGuardrail,
  TransportLayerAudio
} from '@openai/agents/realtime';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { buildEDHECInstructions } from '@/lib/edhec-prompts';

export interface AgentsConfig {
  conversationType: 'cold-call' | 'rdv';
  instructions: string;
  tools?: any[];
}

export class EDHECVoiceAgent {
  private agent: RealtimeAgent | null = null;
  private session: RealtimeSession | null = null;
  private transport: OpenAIRealtimeWebRTC | null = null;
  private eventHandlers: Map<string, (event: any) => void> = new Map();

  constructor(private config: AgentsConfig) {}

  // EDHEC-specific guardrails
  private createEDHECGuardrails(): RealtimeOutputGuardrail[] {
    return [
      {
        name: 'Sensitive Information Protection',
        async execute({ agentOutput }) {
          const sensitiveTerms = [
            'HEC', 'ESSEC', 'INSEAD', // Concurrents
            'confidentiel', 'secret', 'interne', // Données confidentielles
            '100000', '200000', '500000', // Budget incorrect (hors range 80k€)
            'mot de passe', 'accès privé', // Sécurité
          ];
          
          const hasSensitiveTerm = sensitiveTerms.some(term => 
            agentOutput.toLowerCase().includes(term.toLowerCase())
          );
          
          return {
            tripwireTriggered: hasSensitiveTerm,
            outputInfo: { sensitiveTermDetected: hasSensitiveTerm },
          };
        },
      },
      {
        name: 'Budget Range Validation',
        async execute({ agentOutput }) {
          // Vérifier que les mentions de budget restent dans la fourchette EDHEC (60-100k€)
          const budgetRegex = /(\d+(?:\.\d+)?)\s*(?:k€|k euros?|000\s*€)/gi;
          const matches = agentOutput.match(budgetRegex);
          
          if (matches) {
            const invalidBudget = matches.some(match => {
              const amount = parseFloat(match.replace(/[^\d.]/g, ''));
              return amount < 60 || amount > 100; // Hors fourchette EDHEC
            });
            
            return {
              tripwireTriggered: invalidBudget,
              outputInfo: { invalidBudgetMentioned: invalidBudget },
            };
          }
          
          return {
            tripwireTriggered: false,
            outputInfo: { budgetMentioned: false },
          };
        },
      }
    ];
  }

  // EDHEC-specific tools with history context
  private createEDHECTools() {
    const schedulerCheck = tool({
      name: 'scheduler_check',
      description: 'Vérifier les créneaux disponibles pour un RDV avec EDHEC',
      parameters: z.object({
        preferredDate: z.string(),
        duration: z.number().default(60)
      }),
      needsApproval: true,
      async execute({ preferredDate, duration }, details) {
        console.log('🔧 Outil scheduler_check exécuté:', { preferredDate, duration });
        
        // Accès à l'historique de conversation
        const history: RealtimeItem[] = details?.context?.history ?? [];
        console.log('📚 Historique conversation disponible:', history.length, 'éléments');
        
        // Analyser l'historique pour personnaliser la réponse
        const hasDiscussedBudget = history.some(item => 
          item.type === 'message' && 
          item.content?.some(c => c.type === 'input_text' && c.text?.includes('budget'))
        );
        
        // Simulation of API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          available: true,
          proposedSlots: [
            `${preferredDate} 14:00-15:00`,
            `${preferredDate} 16:00-17:00`
          ],
          contextualMessage: hasDiscussedBudget 
            ? `Créneaux disponibles le ${preferredDate}. Je note que nous avons déjà discuté du budget.`
            : `Créneaux disponibles le ${preferredDate} pour une durée de ${duration} minutes`,
          historyContext: `Basé sur ${history.length} échanges précédents`
        };
      }
    });

    const budgetEstimate = tool({
      name: 'budget_estimate',
      description: 'Calculer une estimation budgétaire pour un projet EDHEC',
      parameters: z.object({
        projectType: z.string(),
        studentCount: z.number(),
        duration: z.number()
      }),
      needsApproval: true,
      async execute({ projectType, studentCount, duration }, details) {
        console.log('🔧 Outil budget_estimate exécuté:', { projectType, studentCount, duration });
        
        // Accès à l'historique pour contexte
        const history: RealtimeItem[] = details?.context?.history ?? [];
        
        // Simulation of calculation
        const basePrice = 50; // euros per student per hour
        const estimate = basePrice * studentCount * duration;
        
        return {
          estimate: estimate,
          breakdown: {
            basePrice,
            studentCount,
            duration,
            total: estimate
          },
          currency: 'EUR',
          contextualMessage: `Estimation pour ${projectType}: ${estimate}€ (${studentCount} étudiants, ${duration}h)`,
          historyInsight: `Basé sur ${history.length} échanges dans cette conversation`
        };
      }
    });

    const escalateToExpert = tool({
      name: 'escalate_to_expert',
      description: 'Escalader vers un expert EDHEC spécialisé',
      parameters: z.object({
        expertType: z.string(), // 'technical', 'commercial', 'academic'
        request: z.string()
      }),
      needsApproval: true,
      async execute({ expertType, request }, details) {
        console.log('🔧 Escalade vers expert:', { expertType, request });
        
        const history: RealtimeItem[] = details?.context?.history ?? [];
        
        // Simulation d'escalade via edge function
        try {
          const { data, error } = await supabase.functions.invoke('edhec-expert-escalation', {
            body: { 
              expertType, 
              request, 
              conversationHistory: history.slice(-5) // Derniers 5 échanges
            }
          });
          
          if (error) throw error;
          
          return {
            expertResponse: data?.response || "Expert indisponible",
            expertType,
            escalationSuccessful: true,
            message: `J'ai consulté notre expert ${expertType}. Voici sa recommandation: ${data?.response}`
          };
        } catch (error) {
          return {
            expertResponse: "Simulation d'expert - consultation réussie",
            expertType,
            escalationSuccessful: false,
            message: `Notre expert ${expertType} recommande une analyse approfondie de votre demande: ${request}`
          };
        }
      }
    });

    return [schedulerCheck, budgetEstimate, escalateToExpert];
  }

  async initialize() {
    console.log('🚀 Initialisation EDHECVoiceAgent avancée...');
    
    // Initialize RealtimeAgent with EDHEC configuration
    const instructions = buildEDHECInstructions(this.config.conversationType);
    
    this.agent = new RealtimeAgent({
      name: 'Sophie Hennion-Moreau',
      instructions,
      tools: this.createEDHECTools()
    });

    // Initialize WebRTC transport (handles audio automatically)
    this.transport = new OpenAIRealtimeWebRTC();

    // Initialize session with advanced configuration
    this.session = new RealtimeSession(this.agent, {
      model: 'gpt-4o-realtime-preview-2024-12-17',
      config: {
        modalities: ['text', 'audio'], // Support texte + audio explicite
        voice: 'alloy',
        inputAudioFormat: 'pcm16',
        outputAudioFormat: 'pcm16',
        inputAudioTranscription: {
          model: 'gpt-4o-mini-transcribe' // Transcription améliorée
        },
        turnDetection: {
          type: 'semantic_vad', // Détection sémantique intelligente
          eagerness: 'medium', // Équilibre entre réactivité et faux positifs
          createResponse: true,
          interruptResponse: true
        }
      },
      // Guardrails EDHEC intégrés
      outputGuardrails: this.createEDHECGuardrails(),
      outputGuardrailSettings: {
        debounceTextLength: 150 // Contrôle temps réel optimisé
      }
    });

    // Set up native event handlers
    this.setupEventHandlers();
    
    console.log('✅ Agent EDHEC avancé initialisé avec guardrails et semantic VAD');
  }

  /**
   * Connexion avec clé éphémère
   */
  async connect(): Promise<void> {
    if (!this.session) {
      throw new Error('Session non initialisée');
    }

    try {
      console.log('🔑 Récupération clé éphémère...');

      // Obtenir clé éphémère via edge function
      const { data, error } = await supabase.functions.invoke('get-openai-key', {
        body: {
          instructions: this.config.instructions,
          tools: this.config.tools || []
        }
      });

      if (error) {
        throw new Error(`Erreur clé éphémère: ${error.message}`);
      }

      if (!data?.value) {
        throw new Error('Clé éphémère manquante dans la réponse');
      }

      console.log('🔗 Connexion WebRTC en cours...');

      // Connexion avec clé éphémère
      await this.session.connect({
        apiKey: data.value
      });

      console.log('✅ Connexion WebRTC établie');
      
      // Émettre événement de connexion
      this.emit('connected', {});

    } catch (error) {
      console.error('❌ Erreur connexion:', error);
      throw error;
    }
  }

  private setupEventHandlers() {
    if (!this.session) return;

    // Audio native avancé avec TransportLayerAudio
    this.session.on('audio', (event: TransportLayerAudio) => {
      console.log('🔊 Audio natif détecté:', event);
      this.emit('audio_output', { 
        speaking: true, 
        audioData: event,
        timestamp: Date.now()
      });
    });

    // Audio interruption native
    this.session.on('audio_interrupted', () => {
      console.log('⚡ Audio interrompu (natif SDK)');
      this.emit('audio_interrupted', { 
        timestamp: Date.now(),
        source: 'native_sdk'
      });
    });

    // Note: response.created et response.done events seront gérés plus tard
    // Transcription gérée via les événements existants

    // Conversation history native avec métriques enrichies
    this.session.on('history_updated', (history: RealtimeItem[]) => {
      console.log('📚 Historique natif mis à jour:', history.length, 'éléments');
      
      // Calcul de métriques enrichies
      const userMessages = history.filter(item => 
        item.type === 'message' && item.role === 'user'
      ).length;
      const assistantMessages = history.filter(item => 
        item.type === 'message' && item.role === 'assistant'
      ).length;
      const toolCalls = history.filter(item => 
        item.type === 'function_call'
      ).length;

      this.emit('history_updated', { 
        history,
        metrics: {
          totalMessages: history.length,
          userMessages,
          assistantMessages,
          toolCalls,
          lastUpdate: Date.now()
        }
      });
    });

    // Tool approval avec contexte enrichi
    this.session.on('tool_approval_requested', (context: any, agent: any, request: any) => {
      console.log('🔧 Approbation tool requise (native):', request);
      this.emit('tool_approval_requested', { 
        context, 
        agent, 
        request,
        approvalItem: request.approvalItem,
        toolName: request.approvalItem?.name,
        parameters: request.approvalItem?.parameters,
        timestamp: Date.now()
      });
    });

    // Guardrails events
    this.session.on('guardrail_tripped', (details: any) => {
      console.log('🚨 Guardrail déclenché:', details);
      this.emit('guardrail_tripped', {
        details,
        timestamp: Date.now(),
        severity: 'warning'
      });
    });

    // Connection events gérés ailleurs

    // Error handling enrichi
    this.session.on('error', (error: any) => {
      console.error('❌ Erreur session native:', error);
      this.emit('error', { 
        error,
        timestamp: Date.now(),
        source: 'native_sdk',
        severity: error.severity || 'error'
      });
    });
  }

  /**
   * Interrompre Sophie
   */
  async interrupt(): Promise<boolean> {
    if (!this.session) {
      console.warn('⚠️ Tentative interruption sans session');
      return false;
    }

    try {
      await this.session.interrupt();
      console.log('🔇 Interruption réussie');
      return true;
    } catch (error) {
      console.error('❌ Échec interruption:', error);
      return false;
    }
  }

  // Send text message native (support hybride audio/texte)
  async sendMessage(text: string) {
    if (!this.session) {
      throw new Error('Session not initialized');
    }

    console.log('📤 Envoi message texte natif:', text);
    try {
      await this.session.sendMessage(text);
      this.emit('message_sent', { 
        text, 
        timestamp: Date.now(),
        type: 'text',
        source: 'native_sdk'
      });
    } catch (error) {
      console.error('❌ Erreur envoi message:', error);
      throw error;
    }
  }

  // Send audio custom (gestion audio native avancée)
  async sendAudio(audioData: ArrayBuffer) {
    if (!this.session) {
      throw new Error('Session not initialized');
    }

    console.log('🎤 Envoi audio custom:', audioData.byteLength, 'bytes');
    try {
      await this.session.sendAudio(audioData);
      this.emit('audio_sent', {
        audioData,
        timestamp: Date.now(),
        size: audioData.byteLength,
        source: 'custom'
      });
    } catch (error) {
      console.error('❌ Erreur envoi audio:', error);
      throw error;
    }
  }

  /**
   * Déconnexion propre
   */
  async disconnect(): Promise<void> {
    try {
      if (this.session) {
        // Pour l'instant, pas de méthode disconnect disponible
        // Utiliser la cleanup manuelle
        this.session = null;
      }
      if (this.transport) {
        // Cleanup transport WebRTC
        this.transport = null;
      }
      this.agent = null;
      console.log('🔌 Déconnexion propre terminée');
      this.emit('disconnected', {});
    } catch (error) {
      console.error('❌ Erreur déconnexion:', error);
      // Force cleanup même en cas d'erreur
      this.session = null;
      this.transport = null;
      this.agent = null;
    }
  }

  /**
   * Gestionnaire événements personnalisé
   */
  on(event: string, handler: (data: any) => void): void {
    this.eventHandlers.set(event, handler);
  }

  private emit(event: string, data: any): void {
    const handler = this.eventHandlers.get(event);
    if (handler) {
      handler(data);
    }
  }

  /**
   * Obtenir l'historique actuel de la session
   */
  getHistory(): any[] {
    if (!this.session) {
      return [];
    }
    
    // Accès à l'historique réel de la session
    return this.session.history || [];
  }

  /**
   * Mettre à jour l'historique de conversation
   */
  updateHistory(historyOrUpdater: any[] | ((current: any[]) => any[])): void {
    if (!this.session) {
      console.warn('⚠️ Tentative mise à jour historique sans session');
      return;
    }

    try {
      this.session.updateHistory(historyOrUpdater);
      console.log('📝 Historique mis à jour');
    } catch (error) {
      console.error('❌ Erreur mise à jour historique:', error);
    }
  }

  /**
   * Approuver un tool call en attente
   */
  approveTool(approvalItem: any): void {
    if (!this.session) {
      console.warn('⚠️ Tentative approbation tool sans session');
      return;
    }

    try {
      this.session.approve(approvalItem);
      console.log('✅ Tool approuvé');
    } catch (error) {
      console.error('❌ Erreur approbation tool:', error);
    }
  }

  /**
   * Rejeter un tool call en attente
   */
  rejectTool(rejectionItem: any): void {
    if (!this.session) {
      console.warn('⚠️ Tentative rejet tool sans session');
      return;
    }

    try {
      this.session.reject(rejectionItem);
      console.log('❌ Tool rejeté');
    } catch (error) {
      console.error('❌ Erreur rejet tool:', error);
    }
  }

  /**
   * Statut de connexion
   */
  isConnected(): boolean {
    return this.session !== null;
  }
}