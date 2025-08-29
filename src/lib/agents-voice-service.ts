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
      console.log('🚀 Initialisation Agent SDK WebRTC via Supabase...');

      // Import supabase client dynamically to avoid build issues
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Generate ephemeral token via Supabase Edge Function
      const tokenResponse = await supabase.functions.invoke('realtime-token', {
        body: {
          voice: this.config.voice || "alloy"
        }
      });

      if (tokenResponse.error) {
        throw new Error(`Token generation failed: ${tokenResponse.error.message}`);
      }
      
      const tokenData = tokenResponse.data;
      
      // Récupération token selon doc OpenAI WebRTC
      if (!tokenData.value) {
        throw new Error("Failed to get ephemeral token - no value in response");
      }

      const ephemeralKey = tokenData.value;
      console.log('✅ Token éphémère généré via Supabase');

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

      // 6. Négociation WebRTC selon doc OpenAI officielle
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // 7. Connexion WebRTC selon doc OpenAI (format exact)
      const baseUrl = "https://api.openai.com/v1/realtime/calls";
      const model = this.config.model || "gpt-realtime";
      
      console.log(`🔗 Connexion WebRTC: ${baseUrl}?model=${model}`);
      
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
      });

      console.log(`📡 WebRTC Response Status: ${sdpResponse.status}`);
      
      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        console.error(`❌ WebRTC Response Error: ${errorText}`);
        throw new Error(`WebRTC negotiation failed: ${sdpResponse.status} - ${errorText}`);
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
      
      // Send session.update with instructions via DataChannel AFTER connection
      if (this.config.instructions) {
        console.log('📤 Sending session.update with instructions via DataChannel');
        const sessionUpdate = {
          type: 'session.update',
          session: {
            instructions: this.config.instructions,
            modalities: ['text', 'audio'],
            voice: this.config.voice || 'alloy',
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000
            },
            temperature: 0.8
          }
        };
        this.dc.send(JSON.stringify(sessionUpdate));
      }
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
    console.log('📨 Événement WebRTC reçu:', event.type, event);

    switch (event.type) {
      // === ÉVÉNEMENTS UTILISATEUR ===
      case 'input_audio_buffer.speech_started':
        console.log('🎤 Utilisateur commence à parler');
        this.isRecording = true;
        this.config.onSpeechStarted?.();
        break;
      
      case 'input_audio_buffer.speech_stopped':
        console.log('🔇 Utilisateur arrête de parler');
        this.isRecording = false;
        this.config.onSpeechStopped?.();
        break;
      
      case 'conversation.item.input_audio_transcription.completed':
        console.log('👤 Transcription utilisateur:', event.transcript);
        break;

      // === ÉVÉNEMENTS IA RESPONSE ===
      case 'response.created':
        console.log('🚀 IA commence sa réponse');
        this.config.onResponseStarted?.();
        break;
      
      case 'response.audio.delta':
        // IA génère de l'audio (ne pas appeler onResponseStarted à chaque delta)
        break;
      
      case 'response.audio.done':
        console.log('🔊 Audio IA terminé');
        this.config.onResponseCompleted?.('Audio response completed');
        break;
      
      case 'response.audio_transcript.delta':
        if (event.delta) {
          console.log('📝 IA parle (delta):', event.delta);
        }
        break;
      
      case 'response.audio_transcript.done':
        if (event.transcript) {
          console.log('📄 IA transcription complète:', event.transcript);
          this.config.onResponseCompleted?.(event.transcript);
        }
        break;

      case 'response.done':
        console.log('✅ Réponse IA complètement terminée');
        break;

      // === ÉVÉNEMENTS SESSION ===
      case 'session.created':
        console.log('🎯 Session WebRTC créée');
        break;
      
      case 'session.updated':
        console.log('🔄 Session WebRTC mise à jour');
        break;

      // === GESTION ERREURS ===
      case 'error':
        console.error('❌ Erreur WebRTC:', event.error);
        this.config.onError?.(event.error?.message || 'WebRTC error');
        break;
      
      // === ÉVÉNEMENTS NON GÉRÉS ===
      default:
        console.log('📦 Événement WebRTC non géré:', event.type, event);
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