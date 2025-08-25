// Configuration WebRTC pour l'API Realtime d'OpenAI
export const WEBRTC_CONFIG = {
  model: "gpt-4o-realtime-preview-2024-12-17",
  voice: "sage",
  baseUrl: "https://api.openai.com/v1/realtime",
  sessionUrl: "https://api.openai.com/v1/realtime/sessions",
};

// Types pour les événements WebRTC Realtime
export interface RealtimeEvent {
  type: string;
  [key: string]: any;
}

export interface SessionConfig {
  model: string;
  voice: string;
  instructions?: string;
  modalities?: string[];
  temperature?: number;
  turn_detection?: {
    type: string;
    threshold?: number;
    prefix_padding_ms?: number;
    silence_duration_ms?: number;
  } | null;
}

// Classe WebRTC pour la Realtime API
export class RealtimeWebRTCCoach {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private localStream: MediaStream | null = null;
  private isConnected = false;
  private ephemeralKey: string | null = null;

  constructor(private apiKey: string) {
    this.audioElement = document.createElement("audio");
    this.audioElement.autoplay = true;
  }

  // Créer une session éphémère
  async createEphemeralSession(): Promise<string> {
    try {
      const response = await fetch(WEBRTC_CONFIG.sessionUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: WEBRTC_CONFIG.model,
          voice: WEBRTC_CONFIG.voice,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la création de la session: ${response.status}`);
      }

      const data = await response.json();
      this.ephemeralKey = data.client_secret.value;
      return this.ephemeralKey;
    } catch (error) {
      console.error("Erreur création session éphémère:", error);
      throw error;
    }
  }

  // Connexion WebRTC avec l'API Realtime
  async connect(instructions?: string): Promise<void> {
    try {
      // Créer une session éphémère
      await this.createEphemeralSession();
      
      if (!this.ephemeralKey) {
        throw new Error("Impossible de créer une session éphémère");
      }

      // Configuration RTCPeerConnection
      this.peerConnection = new RTCPeerConnection();

      // Configurer la lecture audio distante
      this.peerConnection.ontrack = (event) => {
        console.log("Stream audio reçu");
        if (this.audioElement) {
          this.audioElement.srcObject = event.streams[0];
        }
      };

      // Obtenir l'audio local du microphone
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 24000,
        }
      });

      // Ajouter le track audio local
      this.localStream.getTracks().forEach(track => {
        if (this.peerConnection && this.localStream) {
          this.peerConnection.addTrack(track, this.localStream);
        }
      });

      // Configurer le canal de données pour les événements
      this.dataChannel = this.peerConnection.createDataChannel("oai-events");
      
      this.dataChannel.addEventListener("open", () => {
        console.log("Canal de données ouvert");
        this.isConnected = true;
        this.initializeSession(instructions);
      });

      this.dataChannel.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        this.handleServerEvent(data);
      });

      this.dataChannel.addEventListener("error", (error) => {
        console.error("Erreur canal de données:", error);
        this.onError?.("Erreur de communication");
      });

      this.dataChannel.addEventListener("close", () => {
        console.log("Canal de données fermé");
        this.isConnected = false;
      });

      // Créer et définir l'offre SDP
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      // Envoyer l'offre SDP au serveur
      const sdpResponse = await fetch(`${WEBRTC_CONFIG.baseUrl}?model=${WEBRTC_CONFIG.model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${this.ephemeralKey}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(`Erreur SDP: ${sdpResponse.status}`);
      }

      // Définir la réponse SDP distante
      const answerSdp = await sdpResponse.text();
      await this.peerConnection.setRemoteDescription({
        type: "answer",
        sdp: answerSdp,
      });

      console.log("Connexion WebRTC établie avec succès");

    } catch (error) {
      console.error("Erreur de connexion WebRTC:", error);
      this.cleanup();
      throw error;
    }
  }

  // Initialiser la session avec les paramètres
  private initializeSession(instructions?: string): void {
    if (!this.dataChannel) return;

    const sessionConfig: SessionConfig = {
      model: WEBRTC_CONFIG.model,
      voice: WEBRTC_CONFIG.voice,
      modalities: ["text", "audio"],
      instructions: instructions || SALES_COACH_PROMPT,
      temperature: 0.8,
      turn_detection: {
        type: "server_vad",
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 500,
      },
    };

    this.sendEvent({
      type: "session.update",
      session: sessionConfig,
    });
  }

  // Envoyer un événement via le canal de données
  private sendEvent(event: RealtimeEvent): void {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      this.dataChannel.send(JSON.stringify(event));
    }
  }

  // Gérer les événements du serveur
  private handleServerEvent(event: RealtimeEvent): void {
    console.log("Événement WebRTC reçu:", event.type);

    switch (event.type) {
      case "session.created":
        console.log("Session WebRTC créée avec succès");
        this.onSessionReady?.();
        break;

      case "session.updated":
        console.log("Session WebRTC mise à jour");
        break;

      case "input_audio_buffer.speech_started":
        console.log("Détection de parole utilisateur");
        this.onSpeechStarted?.();
        break;

      case "input_audio_buffer.speech_stopped":
        console.log("Fin de parole utilisateur");
        this.onSpeechStopped?.();
        break;

      case "response.created":
        console.log("Réponse en cours de génération");
        this.onResponseStarted?.();
        break;

      case "response.audio_transcript.delta":
        this.onTranscriptDelta?.(event.delta);
        break;

      case "response.done":
        console.log("Réponse WebRTC terminée");
        this.onResponseCompleted?.(event.response);
        break;

      case "error":
        console.error("Erreur serveur WebRTC:", event.error);
        this.onError?.(event.error.message || "Erreur inconnue");
        break;
    }
  }

  // Envoyer un message texte
  sendTextMessage(text: string): void {
    this.sendEvent({
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
    });

    // Créer une réponse
    this.sendEvent({
      type: "response.create",
    });
  }

  // Interrompre la réponse en cours
  cancelResponse(): void {
    this.sendEvent({
      type: "response.cancel",
    });
  }

  // Mettre en sourdine/réactiver le microphone
  toggleMute(): boolean {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return !audioTrack.enabled; // retourne true si muté
      }
    }
    return false;
  }

  // Nettoyer les ressources
  private cleanup(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.audioElement) {
      this.audioElement.srcObject = null;
    }

    this.isConnected = false;
    this.ephemeralKey = null;
  }

  // Déconnecter
  disconnect(): void {
    console.log("Déconnexion WebRTC");
    this.cleanup();
  }

  // Getters
  get connected(): boolean {
    return this.isConnected;
  }

  // Callbacks pour les événements
  onSessionReady?: () => void;
  onSpeechStarted?: () => void;
  onSpeechStopped?: () => void;
  onResponseStarted?: () => void;
  onResponseCompleted?: (response: any) => void;
  onTranscriptDelta?: (delta: string) => void;
  onError?: (error: string) => void;
}

// Configuration du prompt système pour le coach commercial
export const SALES_COACH_PROMPT = `Tu es un coach commercial expert et bienveillant spécialisé dans la formation commerciale interactive. Ton rôle est d'aider les utilisateurs à améliorer leurs compétences commerciales.

CONTEXTE ET PERSONNALITÉ :
- Tu es un coach commercial expérimenté avec plus de 15 ans d'expérience
- Tu parles français de manière naturelle et professionnelle
- Tu es patient, encourageant et constructif dans tes retours
- Tu utilises des exemples concrets et des situations réelles
- Tu t'adaptes au niveau de l'utilisateur et au scénario de vente

DOMAINES D'EXPERTISE :
1. Techniques de vente et négociation
2. Prospection et génération de leads
3. Présentation commerciale et storytelling
4. Gestion des objections
5. Closing et finalisation des ventes
6. Relation client et fidélisation

APPROCHE PÉDAGOGIQUE :
- Pose des questions pour comprendre le contexte
- Propose des conseils actionnables et spécifiques
- Encourage la pratique et l'amélioration continue
- Donne des exemples concrets adaptés au secteur
- Reste toujours bienveillant et motivant

Commence par te présenter brièvement et demander à l'utilisateur sur quel aspect commercial il souhaite travailler.`;

// Fonction utilitaire pour gérer les erreurs WebRTC
export function handleWebRTCError(error: any): string {
  console.error("Erreur WebRTC Realtime API:", error);
  
  if (error.includes("authentication") || error.includes("401")) {
    return "Erreur d'authentification. Vérifiez votre clé API.";
  } else if (error.includes("rate_limit") || error.includes("429")) {
    return "Limite de débit atteinte. Veuillez réessayer plus tard.";
  } else if (error.includes("network") || error.includes("connection")) {
    return "Erreur de connexion. Vérifiez votre connexion internet.";
  } else if (error.includes("microphone") || error.includes("getUserMedia")) {
    return "Erreur d'accès au microphone. Vérifiez les permissions.";
  } else {
    return "Une erreur inattendue s'est produite. Veuillez réessayer.";
  }
}