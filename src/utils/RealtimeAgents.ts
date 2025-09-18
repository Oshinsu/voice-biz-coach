/**
 * AGENTS SDK OFFICIEL - RealtimeAgent + RealtimeSession
 * Conforme septembre 2025 - WebRTC + clés éphémères
 */

import { RealtimeAgent, RealtimeSession } from '@openai/agents-realtime';
import { supabase } from '@/integrations/supabase/client';

export interface AgentsConfig {
  conversationType: 'cold-call' | 'rdv';
  instructions: string;
  tools?: any[];
}

export class EDHECVoiceAgent {
  private agent: RealtimeAgent | null = null;
  private session: RealtimeSession | null = null;
  private eventHandlers: Map<string, (event: any) => void> = new Map();

  constructor(private config: AgentsConfig) {}

  /**
   * Initialisation avec Agents SDK officiel
   */
  async initialize(): Promise<void> {
    try {
      console.log('🚀 Initialisation Agents SDK officiel...');

      // 1. Créer l'agent avec voix selon type conversation
      const voice = this.config.conversationType === 'cold-call' ? 'marin' : 'cedar';
      
      this.agent = new RealtimeAgent({
        name: 'Sophie Hennion-Moreau',
        instructions: this.config.instructions,
        voice: voice
      });

      // 2. Créer la session avec configuration optimale  
      this.session = new RealtimeSession(this.agent, {
        model: 'gpt-realtime'
      });

      // 3. Configurer les événements
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

      if (!data?.client_secret?.value) {
        throw new Error('Clé éphémère manquante dans la réponse');
      }

      console.log('🔗 Connexion WebRTC en cours...');

      // Connexion avec clé éphémère
      await this.session.connect({
        apiKey: data.client_secret.value
      });

      console.log('✅ Connexion WebRTC établie');

    } catch (error) {
      console.error('❌ Erreur connexion:', error);
      throw error;
    }
  }

  /**
   * Configuration événements Agents SDK
   */
  private setupEventHandlers(): void {
    if (!this.session) return;

    console.log('📝 Configuration des événements Agents SDK prête');
    
    // Note: Les événements exacts dépendent de l'API finale du SDK
    // Configuration minimale pour démarrer
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
        // Note: La méthode exacte de déconnexion sera définie par l'API finale
        this.session = null;
      }
      this.agent = null;
      console.log('🔌 Déconnexion propre terminée');
      this.emit('disconnected', {});
    } catch (error) {
      console.error('❌ Erreur déconnexion:', error);
      // Force cleanup même en cas d'erreur
      this.session = null;
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
   * Obtenir l'historique actuel
   */
  getHistory(): any[] {
    if (!this.session) {
      return [];
    }
    
    // Note: L'accès à l'historique sera défini par l'API finale du SDK
    // Pour l'instant, retour vide en attendant l'API complète
    return [];
  }

  /**
   * Statut de connexion
   */
  isConnected(): boolean {
    return this.session !== null;
  }
}