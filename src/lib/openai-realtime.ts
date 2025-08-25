// Configuration pour l'API Realtime d'OpenAI (nouvelle version 2025)
export const REALTIME_CONFIG = {
  model: "gpt-4o-realtime-preview-2025-06-03",
  voice: "sage", // Voix professionnelle et claire
  baseUrl: "https://api.openai.com/v1/realtime",
  wsUrl: "wss://api.openai.com/v1/realtime",
};

// Types pour les événements Realtime
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

// Classe pour gérer la connexion Realtime API
export class RealtimeVoiceCoach {
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioQueue: AudioBuffer[] = [];
  private isConnected = false;
  private isRecording = false;

  constructor(private apiKey: string) {}

  // Créer une session éphémère pour les connexions client
  async createEphemeralSession(): Promise<any> {
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: REALTIME_CONFIG.model,
        voice: REALTIME_CONFIG.voice,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la création de la session: ${response.status}`);
    }

    return response.json();
  }

  // Connexion WebSocket avec l'API Realtime
  async connect(instructions?: string): Promise<void> {
    try {
      const url = `${REALTIME_CONFIG.wsUrl}?model=${REALTIME_CONFIG.model}`;
      
      this.ws = new WebSocket(url, [
        "realtime",
        `openai-insecure-api-key.${this.apiKey}`,
        "openai-beta.realtime-v1"
      ]);

      this.ws.onopen = () => {
        console.log("Connexion WebSocket établie");
        this.isConnected = true;
        this.initializeSession(instructions);
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleServerEvent(data);
      };

      this.ws.onerror = (error) => {
        console.error("Erreur WebSocket:", error);
        this.isConnected = false;
      };

      this.ws.onclose = () => {
        console.log("Connexion WebSocket fermée");
        this.isConnected = false;
      };

      // Initialiser le contexte audio
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  }

  // Initialiser la session avec les paramètres
  private initializeSession(instructions?: string): void {
    if (!this.ws) return;

    const sessionConfig: SessionConfig = {
      model: REALTIME_CONFIG.model,
      voice: REALTIME_CONFIG.voice,
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

  // Envoyer un événement au serveur
  private sendEvent(event: RealtimeEvent): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(event));
    }
  }

  // Gérer les événements du serveur
  private handleServerEvent(event: RealtimeEvent): void {
    console.log("Événement reçu:", event.type, event);

    switch (event.type) {
      case "session.created":
        console.log("Session créée avec succès");
        break;

      case "session.updated":
        console.log("Session mise à jour");
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

      case "response.audio.delta":
        this.handleAudioDelta(event.delta);
        break;

      case "response.audio_transcript.delta":
        this.onTranscriptDelta?.(event.delta);
        break;

      case "response.done":
        console.log("Réponse terminée");
        this.onResponseCompleted?.(event.response);
        break;

      case "error":
        console.error("Erreur serveur:", event.error);
        this.onError?.(event.error);
        break;
    }
  }

  // Gérer les chunks audio reçus
  private async handleAudioDelta(audioData: string): Promise<void> {
    if (!this.audioContext) return;

    try {
      // Décoder le base64 en ArrayBuffer
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Décoder l'audio PCM16
      const audioBuffer = await this.audioContext.decodeAudioData(bytes.buffer);
      this.playAudio(audioBuffer);
    } catch (error) {
      console.error("Erreur décodage audio:", error);
    }
  }

  // Jouer l'audio reçu
  private playAudio(audioBuffer: AudioBuffer): void {
    if (!this.audioContext) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    source.start();
  }

  // Démarrer l'enregistrement audio
  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 24000,
        }
      });

      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      const audioChunks: BlobPart[] = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
          this.processAudioChunk(event.data);
        }
      };

      this.mediaRecorder.start(100); // Chunks de 100ms
      this.isRecording = true;
      console.log("Enregistrement démarré");

    } catch (error) {
      console.error("Erreur démarrage enregistrement:", error);
      throw error;
    }
  }

  // Traiter les chunks audio pour envoi
  private async processAudioChunk(chunk: Blob): Promise<void> {
    if (!this.ws || !this.isConnected) return;

    try {
      const arrayBuffer = await chunk.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      this.sendEvent({
        type: "input_audio_buffer.append",
        audio: base64Audio,
      });
    } catch (error) {
      console.error("Erreur traitement audio:", error);
    }
  }

  // Arrêter l'enregistrement
  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      console.log("Enregistrement arrêté");

      // Valider le buffer audio
      this.sendEvent({
        type: "input_audio_buffer.commit",
      });
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

  // Déconnecter
  disconnect(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.isConnected = false;
    this.isRecording = false;
  }

  // Callbacks pour les événements
  onSpeechStarted?: () => void;
  onSpeechStopped?: () => void;
  onResponseStarted?: () => void;
  onResponseCompleted?: (response: any) => void;
  onTranscriptDelta?: (delta: string) => void;
  onError?: (error: any) => void;
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

// Fonction utilitaire pour gérer les erreurs
export function handleRealtimeError(error: any): string {
  console.error("Erreur Realtime API:", error);
  
  if (error.type === "authentication_error") {
    return "Erreur d'authentification. Vérifiez votre clé API.";
  } else if (error.type === "rate_limit_error") {
    return "Limite de débit atteinte. Veuillez réessayer plus tard.";
  } else if (error.type === "connection_error") {
    return "Erreur de connexion. Vérifiez votre connexion internet.";
  } else {
    return "Une erreur inattendue s'est produite. Veuillez réessayer.";
  }
}