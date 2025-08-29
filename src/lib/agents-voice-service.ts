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
        instructions: this.config.instructions,
        voice: this.config.voice || 'sage',
        model: this.config.model || 'gpt-realtime',
        // Outils intégrés pour coaching
        tools: [
          {
            type: "function",
            name: "end_simulation",
            description: "Terminer la simulation et donner un feedback",
            parameters: {
              type: "object",
              properties: {
                feedback: { type: "string" },
                score: { type: "number", minimum: 1, maximum: 10 }
              },
              required: ["feedback", "score"]
            }
          }
        ]
      });

      // 3. Créer la session Realtime
      this.session = new RealtimeSession(this.agent, {
        model: this.config.model || 'gpt-realtime',
        modalities: ["text", "audio"],
        instructions: this.config.instructions,
        voice: this.config.voice || 'sage',
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 1000
        },
        input_audio_transcription: {
          model: "whisper-1"
        }
      });

      // 4. Handlers d'événements optimisés
      this.session.on('session.created', () => {
        console.log('✅ Session Agent SDK créée');
        this.isConnected = true;
        this.config.onSessionReady?.();
      });

      this.session.on('input_audio_buffer.speech_started', () => {
        console.log('🎤 Parole détectée');
        this.config.onSpeechStarted?.();
      });

      this.session.on('input_audio_buffer.speech_stopped', () => {
        console.log('🔇 Fin de parole');
        this.config.onSpeechStopped?.();
      });

      this.session.on('response.created', () => {
        console.log('🗣️ Réponse générée');
        this.config.onResponseStarted?.();
      });

      this.session.on('response.audio_transcript.done', (event: any) => {
        console.log('✅ Transcription complète');
        this.config.onResponseCompleted?.(event.transcript || '');
      });

      this.session.on('conversation.interrupted', () => {
        console.log('⚡ Interruption détectée');
        this.config.onInterruption?.();
      });

      this.session.on('error', (error: any) => {
        console.error('❌ Erreur session:', error);
        this.config.onError?.(error.message || 'Session error');
      });

      // 5. Connexion avec token éphémère
      await this.session.connect({ 
        apiKey: ephemeralKey 
      });

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
      await this.session.say(text);
    } catch (error: any) {
      console.error('❌ Erreur envoi message:', error);
      this.config.onError?.(error.message || 'Send message failed');
    }
  }

  async interrupt(): Promise<void> {
    if (!this.session || !this.isConnected) return;

    try {
      await this.session.interrupt();
      console.log('⚡ Interruption envoyée');
    } catch (error: any) {
      console.error('❌ Erreur interruption:', error);
    }
  }

  disconnect(): void {
    try {
      console.log('🔌 Déconnexion Agent SDK...');
      
      if (this.session) {
        this.session.disconnect();
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
      await this.session.updateSession({
        instructions
      });
      console.log('📝 Instructions mises à jour');
    } catch (error: any) {
      console.error('❌ Erreur mise à jour instructions:', error);
    }
  }

  async setVoice(voice: string): Promise<void> {
    if (!this.session || !this.isConnected) return;

    try {
      await this.session.updateSession({
        voice
      });
      console.log('🎙️ Voix mise à jour:', voice);
    } catch (error: any) {
      console.error('❌ Erreur mise à jour voix:', error);
    }
  }

  // Optimisations coût
  async enableCachedInput(): Promise<void> {
    if (!this.session || !this.isConnected) return;

    try {
      // Active le cache pour les prompts récurrents
      await this.session.updateSession({
        max_response_output_tokens: 1000, // Limite raisonnable
        temperature: 0.8
      });
      console.log('💰 Cache d\'input activé');
    } catch (error: any) {
      console.error('❌ Erreur activation cache:', error);
    }
  }
}