import { supabase } from "@/integrations/supabase/client";
 /**
 * Utilisation officielle selon la documentation OpenAI Realtime API
 */

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  constructor(private onAudioData: (audioData: Float32Array) => void) {}

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      this.audioContext = new AudioContext({
        sampleRate: 24000,
      });
      
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        this.onAudioData(new Float32Array(inputData));
      };
      
      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  stop() {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

/**
 * VRAIE IMPLEMENTATION AGENTS SDK + WebRTC
 * Selon documentation officielle OpenAI
 */
export class RealtimeChat {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement;
  private recorder: AudioRecorder | null = null;

  constructor(private onMessage: (message: any) => void) {
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
  }

  async init(instructions: string, tools?: any[]) {
    try {
      console.log('🚀 Initialisation Agents SDK + WebRTC...');

      // 1. Obtenir token éphémère avec instructions + tools via Supabase SDK
      const { data, error } = await supabase.functions.invoke('get-openai-key', {
        body: { 
          instructions,
          tools: tools || []
        }
      });

      if (error) {
        throw new Error(`Supabase Function error: ${error.message}`);
      }

      if (!data?.client_secret?.value) {
        throw new Error("Failed to get ephemeral token");
      }

      const EPHEMERAL_KEY = data.client_secret.value;
      console.log('✅ Token éphémère obtenu');

      // 2. Créer RTCPeerConnection
      this.pc = new RTCPeerConnection();

      // 3. Configurer l'audio pour entendre Sophie
      this.pc.ontrack = e => {
        console.log('🔊 Audio track reçu de Sophie');
        this.audioEl.srcObject = e.streams[0];
      };

      // 4. Ajouter piste audio locale (microphone)
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      this.pc.addTrack(mediaStream.getTracks()[0]);
      console.log('🎤 Microphone connecté');

      // 5. Configurer data channel pour événements (optimisé)
      this.dc = this.pc.createDataChannel("oai-events");
      this.dc.addEventListener("message", (e) => {
        try {
          const event = JSON.parse(e.data);
          console.log("📨 Événement Agents SDK reçu:", event.type);
          this.onMessage(event);
        } catch (error) {
          console.error('❌ Erreur parsing événement:', error);
          // 🔄 Pas de disruption de session sur erreur parsing
        }
      });

      // 🔧 Gestion état de connexion WebRTC optimisée
      this.pc.addEventListener('connectionstatechange', () => {
        console.log('📡 État WebRTC:', this.pc?.connectionState);
        if (this.pc?.connectionState === 'failed') {
          console.warn('⚠️ WebRTC connexion échouée - tentative reconnexion');
          // Auto-récupération possible ici
        }
      });

      // 6. Créer offre SDP
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // 7. Se connecter à OpenAI Realtime API via WebRTC
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      
      console.log('🔗 Connexion à OpenAI Realtime API...');
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(`Erreur OpenAI SDP: ${sdpResponse.status}`);
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      await this.pc.setRemoteDescription(answer);
      console.log('✅ Connexion WebRTC établie avec OpenAI');

      // 8. Démarrer enregistrement audio
      this.recorder = new AudioRecorder((audioData) => {
        if (this.dc?.readyState === 'open') {
          this.dc.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: this.encodeAudioData(audioData)
          }));
        }
      });
      await this.recorder.start();
      console.log('🎤 Enregistrement démarré');

    } catch (error) {
      console.error("❌ Erreur initialisation Agents SDK:", error);
      throw error;
    }
  }

  /**
   * Encode Float32Array vers base64 PCM16 pour OpenAI
   */
  private encodeAudioData(float32Array: Float32Array): string {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    const uint8Array = new Uint8Array(int16Array.buffer);
    let binary = '';
    const chunkSize = 0x8000;
    
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(binary);
  }

  /**
   * Envoyer message texte via Agents SDK
   */
  async sendMessage(text: string) {
    if (!this.dc || this.dc.readyState !== 'open') {
      throw new Error('Data channel not ready');
    }

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
    console.log('📤 Message envoyé:', text);
  }

  /**
   * Interrompre Sophie (optimisé)
   */
  interrupt() {
    if (this.dc?.readyState === 'open') {
      try {
        this.dc.send(JSON.stringify({ type: 'response.cancel' }));
        console.log('⏹️ Interruption envoyée');
        return true;
      } catch (error) {
        console.error('❌ Erreur interruption:', error);
        return false;
      }
    }
    console.warn('⚠️ Data channel non disponible pour interruption');
    return false;
  }

  /**
   * Fermeture propre de la session
   */
  disconnect() {
    console.log('🔌 Fermeture session Agents SDK...');
    
    this.recorder?.stop();
    this.dc?.close();
    this.pc?.close();
    
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.srcObject = null;
    }
    
    console.log('✅ Session fermée');
  }

  /**
   * État de connexion (optimisé avec détails)
   */
  isConnected(): boolean {
    return this.pc?.connectionState === 'connected' && this.dc?.readyState === 'open';
  }

  /**
   * Diagnostics WebRTC pour debugging
   */
  getConnectionStats() {
    return {
      peerConnectionState: this.pc?.connectionState || 'unknown',
      dataChannelState: this.dc?.readyState || 'unknown',
      iceConnectionState: this.pc?.iceConnectionState || 'unknown',
      isFullyConnected: this.isConnected()
    };
  }

  /**
   * Qualité audio en temps réel (métrique basique)
   */
  getAudioQuality() {
    // Heuristique simple basée sur les états WebRTC
    const stats = this.getConnectionStats();
    if (stats.iceConnectionState === 'connected' && stats.peerConnectionState === 'connected') {
      return 'excellent';
    } else if (stats.peerConnectionState === 'connecting') {
      return 'connecting';
    } else {
      return 'poor';
    }
  }
}