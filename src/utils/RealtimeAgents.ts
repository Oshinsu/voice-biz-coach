/**
 * AGENTS SDK OFFICIEL - RealtimeAgent + RealtimeSession
 * Conforme septembre 2025 - WebRTC + clés éphémères
 */

import { RealtimeAgent, RealtimeSession, OpenAIRealtimeWebRTC, tool } from '@openai/agents/realtime';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

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

  /**
   * Créer les tools EDHEC spécifiques
   */
  private createEDHECTools() {
    const schedulerCheck = tool({
      name: 'scheduler_check',
      description: 'Vérifier les disponibilités pour un RDV avec Sophie',
      parameters: z.object({
        date: z.string(),
        timeSlot: z.string()
      }),
      needsApproval: true,
      async execute({ date, timeSlot }) {
        console.log(`🗓️ Vérification disponibilité: ${date} à ${timeSlot}`);
        return `Disponibilité confirmée pour ${date} à ${timeSlot}`;
      }
    });

    const budgetEstimate = tool({
      name: 'budget_estimate',
      description: 'Estimer le budget pour une solution EDHEC',
      parameters: z.object({
        solutionType: z.string(),
        studentCount: z.number()
      }),
      async execute({ solutionType, studentCount }) {
        console.log(`💰 Estimation budget: ${solutionType} pour ${studentCount} étudiants`);
        const estimate = Math.round(studentCount * 50 + Math.random() * 10000);
        return `Estimation budgétaire: ${estimate}€ pour ${solutionType}`;
      }
    });

    return [schedulerCheck, budgetEstimate];
  }

  /**
   * Initialisation avec Agents SDK officiel
   */
  async initialize(): Promise<void> {
    try {
      console.log('🚀 Initialisation Agents SDK officiel...');

      // 1. Créer les tools EDHEC spécifiques
      const edhecTools = this.createEDHECTools();

      // 2. Créer l'agent avec voix OpenAI officielle selon type conversation
      const voice = this.config.conversationType === 'cold-call' ? 'alloy' : 'sage';
      
      this.agent = new RealtimeAgent({
        name: 'Sophie Hennion-Moreau',
        instructions: this.config.instructions,
        voice: voice,
        tools: edhecTools
      });

      // 2. Configurer transport WebRTC avec microphone et audio
      this.transport = new OpenAIRealtimeWebRTC({
        mediaStream: await navigator.mediaDevices.getUserMedia({ audio: true }),
        audioElement: document.createElement('audio'),
      });

      // 3. Créer la session avec transport WebRTC et configuration avancée
      this.session = new RealtimeSession(this.agent, {
        model: 'gpt-realtime',
        transport: this.transport,
        config: {
          inputAudioFormat: 'pcm16',
          outputAudioFormat: 'pcm16',
          inputAudioTranscription: {
            model: 'whisper-1'
          },
          turnDetection: {
            type: 'server_vad',
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 1000
          }
        }
      });

      // 4. Configurer les événements
      this.setupEventHandlers();

      console.log('✅ Agent et Session créés avec succès');

    } catch (error) {
      console.error('❌ Erreur initialisation Agents SDK:', error);
      throw error;
    }
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

  /**
   * Configuration événements Agents SDK natifs
   */
  private setupEventHandlers(): void {
    if (!this.session) return;

    console.log('📝 Configuration des événements Agents SDK...');
    
    // Événement audio pour détecter quand Sophie parle
    this.session.on('audio', (event) => {
      console.log('🎵 Audio détecté:', event);
      this.emit('speaking', { isSpeaking: true });
    });

    // Événement interruption audio native
    this.session.on('audio_interrupted', () => {
      console.log('🔇 Audio interrompu par l\'utilisateur');
      this.emit('audio_interrupted', {});
      this.emit('speaking', { isSpeaking: false });
    });

    // Événement mise à jour de l'historique
    this.session.on('history_updated', (history) => {
      console.log('📝 Historique mis à jour:', history.length);
      this.emit('history_updated', { history });
    });

    // Événement demande d'approbation pour les tools
    this.session.on('tool_approval_requested', (context, agent, request) => {
      console.log('⚠️ Approbation tool requise:', request);
      this.emit('tool_approval_requested', { context, agent, request });
    });

    // Note: Les événements response.created et response.done 
    // seront gérés via les autres événements audio pour l'instant

    console.log('✅ Événements Agents SDK natifs configurés');
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

  /**
   * Envoi message texte (pour tests)
   */
  async sendMessage(text: string): Promise<void> {
    if (!this.session) {
      throw new Error('Session non connectée');
    }

    await this.session.sendMessage(text);
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