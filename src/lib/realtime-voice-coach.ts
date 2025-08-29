import { supabase } from "@/integrations/supabase/client";

export interface RealtimeConfig {
  instructions: string;
  voice?: string;
  model?: string;
  onSessionReady?: () => void;
  onSpeechStarted?: () => void;
  onSpeechStopped?: () => void;
  onResponseStarted?: () => void;
  onResponseCompleted?: (text: string) => void;
  onError?: (error: string) => void;
  onAudioData?: (audioData: Uint8Array) => void;
}

export class RealtimeVoiceCoach {
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private audioQueue: AudioBuffer[] = [];
  private isPlaying = false;
  private config: RealtimeConfig;
  private sessionId: string | null = null;
  
  constructor(config: RealtimeConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      console.log('🎯 Démarrage de la session Realtime...');
      
      // 1. Créer une session éphémère via Supabase
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke('openai-realtime', {
        body: {
          instructions: this.config.instructions,
          voice: this.config.voice || 'sage',
          model: this.config.model || 'gpt-realtime'
        }
      });

      if (sessionError) {
        throw new Error(`Session error: ${sessionError.message}`);
      }

      if (!sessionData?.client_secret?.value) {
        throw new Error('No session token received');
      }

      this.sessionId = sessionData.id;
      const ephemeralKey = sessionData.client_secret.value;
      
      console.log('✅ Session token received');

      // 2. Initialiser le contexte audio
      this.audioContext = new AudioContext({ sampleRate: 24000 });
      await this.audioContext.resume();

      // 3. Se connecter au WebSocket OpenAI Realtime
      const wsUrl = `wss://api.openai.com/v1/realtime?model=${this.config.model || 'gpt-realtime'}`;
      this.ws = new WebSocket(wsUrl);
      
      // Note: Les headers d'authentification sont gérés côté serveur via le token éphémère

      this.ws.onopen = () => {
        console.log('🔗 WebSocket connecté');
        this.config.onSessionReady?.();
        this.setupAudioCapture();
      };

      this.ws.onmessage = (event) => {
        this.handleServerEvent(JSON.parse(event.data));
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.config.onError?.('WebSocket connection failed');
      };

      this.ws.onclose = () => {
        console.log('📞 WebSocket fermé');
        this.cleanup();
      };

    } catch (error: any) {
      console.error('❌ Erreur de connexion:', error);
      this.config.onError?.(error.message || 'Connection failed');
      throw error;
    }
  }

  private async setupAudioCapture(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      if (!this.audioContext) return;

      const source = this.audioContext.createMediaStreamSource(stream);
      const processor = this.audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        this.sendAudioData(inputData);
      };

      source.connect(processor);
      processor.connect(this.audioContext.destination);

      console.log('🎤 Capture audio configurée');

    } catch (error) {
      console.error('❌ Erreur capture audio:', error);
      this.config.onError?.('Microphone access denied');
    }
  }

  private sendAudioData(audioData: Float32Array): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    // Convertir Float32Array vers PCM16
    const pcm16 = new Int16Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      const s = Math.max(-1, Math.min(1, audioData[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }

    // Encoder en base64
    const uint8Array = new Uint8Array(pcm16.buffer);
    let binary = '';
    const chunkSize = 0x8000;
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    const base64Audio = btoa(binary);

    // Envoyer à OpenAI
    this.ws.send(JSON.stringify({
      type: 'input_audio_buffer.append',
      audio: base64Audio
    }));
  }

  private handleServerEvent(event: any): void {
    console.log('📨 Event reçu:', event.type);

    switch (event.type) {
      case 'session.created':
        console.log('✅ Session créée');
        break;

      case 'input_audio_buffer.speech_started':
        this.config.onSpeechStarted?.();
        break;

      case 'input_audio_buffer.speech_stopped':
        this.config.onSpeechStopped?.();
        break;

      case 'response.created':
        this.config.onResponseStarted?.();
        break;

      case 'response.audio.delta':
        this.handleAudioDelta(event.delta);
        break;

      case 'response.audio_transcript.delta':
        // Accumulation du texte de transcription
        break;

      case 'response.audio_transcript.done':
        this.config.onResponseCompleted?.(event.transcript || '');
        break;

      case 'response.done':
        console.log('✅ Réponse terminée');
        break;

      case 'error':
        console.error('❌ Erreur serveur:', event);
        this.config.onError?.(event.error?.message || 'Server error');
        break;
    }
  }

  private async handleAudioDelta(deltaBase64: string): Promise<void> {
    try {
      if (!this.audioContext) return;

      // Décoder base64 vers PCM16
      const binaryString = atob(deltaBase64);
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      // Convertir vers AudioBuffer
      const int16Array = new Int16Array(uint8Array.buffer);
      const audioBuffer = this.audioContext.createBuffer(1, int16Array.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      
      for (let i = 0; i < int16Array.length; i++) {
        channelData[i] = int16Array[i] / 32768.0;
      }

      // Ajouter à la queue de lecture
      this.audioQueue.push(audioBuffer);
      
      if (!this.isPlaying) {
        this.playNextAudio();
      }

    } catch (error) {
      console.error('❌ Erreur audio delta:', error);
    }
  }

  private async playNextAudio(): Promise<void> {
    if (this.audioQueue.length === 0) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const audioBuffer = this.audioQueue.shift()!;

    try {
      if (!this.audioContext) return;

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      source.onended = () => {
        this.playNextAudio();
      };
      
      source.start(0);

    } catch (error) {
      console.error('❌ Erreur lecture audio:', error);
      this.playNextAudio(); // Continuer avec le suivant
    }
  }

  sendTextMessage(text: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    this.ws.send(JSON.stringify({
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
    }));

    this.ws.send(JSON.stringify({
      type: 'response.create'
    }));
  }

  disconnect(): void {
    console.log('🔌 Déconnexion...');
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.cleanup();
  }

  private cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.audioQueue = [];
    this.isPlaying = false;
    this.sessionId = null;
  }
}