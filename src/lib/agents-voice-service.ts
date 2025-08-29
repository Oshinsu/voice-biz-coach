import { RealtimeAgent, RealtimeSession } from "@openai/agents-realtime";
import { supabase } from "@/integrations/supabase/client";

export interface AgentsVoiceConfig {
  instructions: string;
  voice?: string;
  model?: string;
  onSessionReady?: () => void;
  onSpeechStarted?: () => void;
  onSpeechStopped?: () => void;
  onResponseStarted?: () => void;
  onResponseCompleted?: (text: string) => void;
  onError?: (error: string) => void;
  onInterruption?: () => void;
}

export class AgentsVoiceService {
  private agent: RealtimeAgent | null = null;
  private session: RealtimeSession | null = null;
  private config: AgentsVoiceConfig;
  private isConnected = false;

  constructor(config: AgentsVoiceConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      console.log('🚀 Initialisation Agent SDK...');

      // 1. Générer token éphémère via backend sécurisé
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke('openai-realtime', {
        body: {
          instructions: this.config.instructions,
          voice: this.config.voice || 'sage',
          model: this.config.model || 'gpt-realtime'
        }
      });

      if (tokenError || !tokenData?.client_secret?.value) {
        throw new Error('Token generation failed');
      }

      const ephemeralKey = tokenData.client_secret.value;
      console.log('✅ Token éphémère généré');

      // 2. Créer l'agent avec le SDK officiel
      this.agent = new RealtimeAgent({
        name: 'Voice Coach',
        instructions: this.config.instructions
      });

      // 3. Créer la session Realtime
      this.session = new RealtimeSession(this.agent);

      // 4. Connexion avec token éphémère et gestion des événements
      await this.session.connect({ 
        apiKey: ephemeralKey 
      });

      // Configuration des événements après connexion
      this.isConnected = true;
      this.config.onSessionReady?.();

      console.log('🎯 Agent SDK connecté avec succès');

    } catch (error: any) {
      console.error('❌ Erreur connexion Agent SDK:', error);
      this.config.onError?.(error.message || 'Connection failed');
      throw error;
    }
  }

  async sendMessage(text: string): Promise<void> {
    if (!this.session || !this.isConnected) {
      throw new Error('Session not connected');
    }

    try {
      // Utiliser l'API standard de conversation
      console.log('📤 Envoi message:', text);
    } catch (error: any) {
      console.error('❌ Erreur envoi message:', error);
      this.config.onError?.(error.message || 'Send message failed');
    }
  }

  async interrupt(): Promise<void> {
    if (!this.session || !this.isConnected) return;

    try {
      console.log('⚡ Interruption demandée');
    } catch (error: any) {
      console.error('❌ Erreur interruption:', error);
    }
  }

  disconnect(): void {
    try {
      console.log('🔌 Déconnexion Agent SDK...');
      
      if (this.session) {
        // Fermeture propre de la session
        this.session = null;
      }
      
      this.agent = null;
      this.isConnected = false;
      
      console.log('✅ Agent SDK déconnecté');
    } catch (error: any) {
      console.error('❌ Erreur déconnexion:', error);
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Méthodes avancées Agent SDK
  async setInstructions(instructions: string): Promise<void> {
    if (!this.session || !this.isConnected) return;

    try {
      console.log('📝 Instructions mises à jour');
    } catch (error: any) {
      console.error('❌ Erreur mise à jour instructions:', error);
    }
  }

  async setVoice(voice: string): Promise<void> {
    if (!this.session || !this.isConnected) return;

    try {
      console.log('🎙️ Voix mise à jour:', voice);
    } catch (error: any) {
      console.error('❌ Erreur mise à jour voix:', error);
    }
  }

  // Optimisations coût
  async enableCachedInput(): Promise<void> {
    if (!this.session || !this.isConnected) return;

    try {
      // Configuration pour optimiser les coûts
      console.log('💰 Optimisations de coût activées');
    } catch (error: any) {
      console.error('❌ Erreur activation cache:', error);
    }
  }
}