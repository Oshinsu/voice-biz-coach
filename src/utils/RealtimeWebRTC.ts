/**
 * Classe pour gérer la connexion WebRTC avec l'API Realtime d'OpenAI
 * Basée sur la documentation officielle WebRTC
 */
export class RealtimeWebRTC {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private localStream: MediaStream | null = null;
  private onMessage: (event: any) => void;
  private onError: (error: Error) => void;

  constructor(
    onMessage: (event: any) => void,
    onError: (error: Error) => void = console.error
  ) {
    this.onMessage = onMessage;
    this.onError = onError;
  }

  async connect(ephemeralToken: string): Promise<void> {
    try {
      console.log('🚀 Initialisation connexion WebRTC...');

      // Créer une peer connection
      this.pc = new RTCPeerConnection();

      // Configurer l'audio pour entendre le modèle
      this.audioElement = document.createElement("audio");
      this.audioElement.autoplay = true;
      this.pc.ontrack = (e) => {
        if (this.audioElement) {
          this.audioElement.srcObject = e.streams[0];
        }
      };

      // Ajouter l'audio local du microphone
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      this.pc.addTrack(this.localStream.getTracks()[0]);

      // Configurer le data channel pour les événements
      this.dc = this.pc.createDataChannel("oai-events");
      
      // Écouter les événements serveur
      this.dc.addEventListener("message", (e) => {
        try {
          const event = JSON.parse(e.data);
          console.log('📨 Événement reçu:', event.type);
          this.onMessage(event);
        } catch (error) {
          console.error('❌ Erreur parsing événement:', error);
        }
      });

      // Créer et configurer l'offre SDP
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      // Se connecter à l'API Realtime d'OpenAI
      const baseUrl = "https://api.openai.com/v1/realtime/calls";
      const model = "gpt-realtime";
      
      console.log('🔗 Connexion à OpenAI Realtime API...');
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralToken}`,
          "Content-Type": "application/sdp",
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(`Erreur connexion OpenAI: ${sdpResponse.status}`);
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      await this.pc.setRemoteDescription(answer);
      console.log('✅ Connexion WebRTC établie avec OpenAI');

    } catch (error) {
      console.error('❌ Erreur connexion WebRTC:', error);
      this.onError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  sendEvent(event: any): void {
    if (this.dc && this.dc.readyState === 'open') {
      try {
        this.dc.send(JSON.stringify(event));
        console.log('📤 Événement envoyé:', event.type);
      } catch (error) {
        console.error('❌ Erreur envoi événement:', error);
      }
    } else {
      console.warn('⚠️ Data channel non disponible');
    }
  }

  sendMessage(text: string): void {
    const event = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: text,
          },
        ],
      },
    };
    
    this.sendEvent(event);
    this.sendEvent({ type: "response.create" });
  }

  updateSession(sessionConfig: any): void {
    const event = {
      type: "session.update",
      session: sessionConfig
    };
    this.sendEvent(event);
  }

  interrupt(): void {
    const event = {
      type: "response.cancel"
    };
    this.sendEvent(event);
  }

  async disconnect(): Promise<void> {
    try {
      console.log('🔌 Fermeture connexion WebRTC...');

      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
        this.localStream = null;
      }

      if (this.dc) {
        this.dc.close();
        this.dc = null;
      }

      if (this.pc) {
        this.pc.close();
        this.pc = null;
      }

      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.srcObject = null;
        this.audioElement = null;
      }

      console.log('✅ Connexion WebRTC fermée');
    } catch (error) {
      console.error('❌ Erreur fermeture WebRTC:', error);
    }
  }

  isConnected(): boolean {
    return this.pc?.connectionState === 'connected' && this.dc?.readyState === 'open';
  }
}