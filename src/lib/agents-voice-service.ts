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
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private stream: MediaStream | null = null;
  private config: AgentsVoiceConfig;
  private isConnected = false;
  private isRecording = false;

  constructor(config: AgentsVoiceConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      console.log('🚀 Initialisation Agent SDK WebRTC Direct...');

      // 1. Générer token éphémère via OpenAI directement (plus besoin d'Edge Function)
      let OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      
      // Fallback vers localStorage si pas dans .env
      if (!OPENAI_API_KEY || OPENAI_API_KEY === '' || OPENAI_API_KEY === 'sk-...') {
        OPENAI_API_KEY = localStorage.getItem('openai_api_key');
      }
      
      if (!OPENAI_API_KEY || !OPENAI_API_KEY.startsWith('sk-')) {
        throw new Error('VITE_OPENAI_API_KEY requis pour Agent SDK');
      }

      const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: this.config.model || "gpt-realtime",
            voice: this.config.voice || "sage",
            instructions: this.config.instructions,
            modalities: ["text", "audio"],
            input_audio_format: "pcm16",
            output_audio_format: "pcm16",
            input_audio_transcription: {
              model: "whisper-1"
            },
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000
            },
            temperature: 0.8
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token generation failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const ephemeralKey = data.client_secret.value;
      console.log('✅ Token éphémère généré');

      // 2. Configuration WebRTC
      this.pc = new RTCPeerConnection();
      this.audioEl = document.createElement("audio");
      this.audioEl.autoplay = true;

      // 3. Gestion audio distant (réponses IA)
      this.pc.ontrack = (e) => {
        if (this.audioEl) {
          this.audioEl.srcObject = e.streams[0];
          console.log('🔊 Audio IA connecté');
        }
      };

      // 4. Capture microphone utilisateur
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.pc.addTrack(this.stream.getTracks()[0]);
      console.log('🎤 Microphone connecté');

      // 5. Data Channel pour événements
      this.dc = this.pc.createDataChannel("oai-events");
      this.setupDataChannelHandlers();

      // 6. Négociation WebRTC
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // 7. Connexion à OpenAI Realtime API
      const baseUrl = "https://api.openai.com/v1/realtime";
      const modelParam = this.config.model || "gpt-realtime";
      
      const sdpResponse = await fetch(`${baseUrl}?model=${modelParam}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(`WebRTC negotiation failed: ${sdpResponse.status}`);
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      await this.pc.setRemoteDescription(answer);

      this.isConnected = true;
      console.log('🎯 Agent SDK WebRTC connecté avec succès');
      this.config.onSessionReady?.();

    } catch (error: any) {
      console.error('❌ Erreur connexion Agent SDK:', error);
      this.config.onError?.(error.message || 'Connection failed');
      throw error;
    }
  }

  private setupDataChannelHandlers(): void {
    if (!this.dc) return;

    this.dc.addEventListener("open", () => {
      console.log('📡 Data channel ouvert');
    });

    this.dc.addEventListener("message", (e) => {
      try {
        const event = JSON.parse(e.data);
        this.handleRealtimeEvent(event);
      } catch (error) {
        console.error('❌ Erreur parsing événement:', error);
      }
    });

    this.dc.addEventListener("error", (error) => {
      console.error('❌ Erreur data channel:', error);
      this.config.onError?.('Data channel error');
    });
  }

  private handleRealtimeEvent(event: any): void {
    console.log('📨 Événement reçu:', event.type);

    switch (event.type) {
      case 'input_audio_buffer.speech_started':
        this.config.onSpeechStarted?.();
        break;
      
      case 'input_audio_buffer.speech_stopped':
        this.config.onSpeechStopped?.();
        break;
      
      case 'response.audio.delta':
        this.config.onResponseStarted?.();
        break;
      
      case 'response.audio.done':
        this.config.onResponseCompleted?.('Response completed');
        break;
      
      case 'response.audio_transcript.delta':
        if (event.delta) {
          console.log('📝 Transcription:', event.delta);
        }
        break;
      
      case 'response.audio_transcript.done':
        if (event.transcript) {
          console.log('📄 Transcription complète:', event.transcript);
          this.config.onResponseCompleted?.(event.transcript);
        }
        break;
      
      case 'conversation.item.input_audio_transcription.completed':
        console.log('👤 Utilisateur:', event.transcript);
        break;
      
      case 'error':
        console.error('❌ Erreur événement:', event);
        this.config.onError?.(event.error?.message || 'Event error');
        break;
      
      default:
        console.log('📦 Événement non géré:', event.type);
    }
  }

  async sendMessage(text: string): Promise<void> {
    if (!this.dc || this.dc.readyState !== 'open') {
      throw new Error('Data channel not ready');
    }

    try {
      console.log('📤 Envoi message:', text);
      
      const event = {
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [
            {
              type: 'input_text',
              text
            }
          ]
        }
      };

      this.dc.send(JSON.stringify(event));
      this.dc.send(JSON.stringify({type: 'response.create'}));
      
    } catch (error: any) {
      console.error('❌ Erreur envoi message:', error);
      this.config.onError?.(error.message || 'Send message failed');
    }
  }

  async interrupt(): Promise<void> {
    if (!this.dc || this.dc.readyState !== 'open') return;

    try {
      console.log('⚡ Interruption demandée');
      
      const event = {
        type: 'response.cancel'
      };

      this.dc.send(JSON.stringify(event));
      this.config.onInterruption?.();
      
    } catch (error: any) {
      console.error('❌ Erreur interruption:', error);
    }
  }

  disconnect(): void {
    try {
      console.log('🔌 Déconnexion Agent SDK...');
      
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      
      if (this.dc) {
        this.dc.close();
        this.dc = null;
      }
      
      if (this.pc) {
        this.pc.close();
        this.pc = null;
      }
      
      if (this.audioEl) {
        this.audioEl.srcObject = null;
        this.audioEl = null;
      }
      
      this.isConnected = false;
      console.log('✅ Agent SDK déconnecté');
    } catch (error: any) {
      console.error('❌ Erreur déconnexion:', error);
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Méthodes avancées
  async setInstructions(instructions: string): Promise<void> {
    if (!this.dc || this.dc.readyState !== 'open') return;

    try {
      console.log('📝 Instructions mises à jour');
      
      const event = {
        type: 'session.update',
        session: {
          instructions: instructions
        }
      };

      this.dc.send(JSON.stringify(event));
    } catch (error: any) {
      console.error('❌ Erreur mise à jour instructions:', error);
    }
  }

  async setVoice(voice: string): Promise<void> {
    if (!this.dc || this.dc.readyState !== 'open') return;

    try {
      console.log('🎙️ Voix mise à jour:', voice);
      
      const event = {
        type: 'session.update',
        session: {
          voice: voice
        }
      };

      this.dc.send(JSON.stringify(event));
    } catch (error: any) {
      console.error('❌ Erreur mise à jour voix:', error);
    }
  }

  // Optimisations coût GA
  async enableCachedInput(): Promise<void> {
    if (!this.dc || this.dc.readyState !== 'open') return;

    try {
      console.log('💰 Optimisations de coût activées');
      
      const event = {
        type: 'session.update',
        session: {
          max_response_output_tokens: 4000,
          temperature: 0.8,
        }
      };

      this.dc.send(JSON.stringify(event));
    } catch (error: any) {
      console.error('❌ Erreur activation cache:', error);
    }
  }

  // Nouvelles fonctionnalités GA
  async enableAdvancedFeatures(): Promise<void> {
    if (!this.dc || this.dc.readyState !== 'open') return;

    try {
      console.log('🔥 Fonctionnalités avancées GA activées');
      
      const event = {
        type: 'session.update',
        session: {
          turn_detection: {
            type: 'server_vad',
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 1000
          },
          input_audio_transcription: {
            model: 'whisper-1'
          }
        }
      };

      this.dc.send(JSON.stringify(event));
    } catch (error: any) {
      console.error('❌ Erreur fonctionnalités avancées:', error);
    }
  }
}