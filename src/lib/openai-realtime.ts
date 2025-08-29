// Configuration optimisée pour l'API Realtime d'OpenAI selon guide prompting
export const REALTIME_CONFIG = {
  model: "gpt-realtime-2025-08-28",
  voice: "sage", // Voix professionnelle et claire pour contexte business
  baseUrl: "https://api.openai.com/v1/realtime",
  wsUrl: "wss://api.openai.com/v1/realtime",
  
  // Configuration session optimisée selon OpenAI Realtime Guide
  sessionConfig: {
    modalities: ["text", "audio"],
    input_audio_format: "pcm16",
    output_audio_format: "pcm16",
    input_audio_transcription: {
      model: "whisper-1"
    },
    turn_detection: {
      type: "server_vad", // TOUJOURS utiliser server_vad
      threshold: 0.5, // Ajusté selon contexte conversation
      prefix_padding_ms: 300,
      silence_duration_ms: 1000 // Ajusté selon type conversation
    },
    temperature: 0.7, // Équilibre créativité/consistance pour vocal
    max_response_output_tokens: "inf"
  }
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
  private optimizedAudioQueue: any = null;
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

  // PHASE 2: Configuration Session Optimisée - Session.update APRÈS session.created
  private sessionInstructions: string | null = null;
  private sessionReady = false;

  private initializeSession(instructions?: string): void {
    this.sessionInstructions = instructions || SALES_COACH_PROMPT;
    // Attendre session.created avant d'envoyer session.update
  }

  private sendSessionUpdate(): void {
    if (!this.ws || !this.sessionInstructions) return;

    console.log("📡 Envoi session.update après session.created");
    
    const sessionConfig = {
      modalities: ["text", "audio"],
      instructions: this.sessionInstructions,
      input_audio_format: "pcm16",
      output_audio_format: "pcm16", 
      input_audio_transcription: {
        model: "whisper-1"
      },
      turn_detection: {
        type: "server_vad",
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 1000  // Augmenté pour éviter coupures
      },
      temperature: 0.7,
      max_response_output_tokens: "inf"
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
        console.log("✅ Session créée avec succès");
        this.sessionReady = true;
        // CRITIQUE: Envoyer session.update APRÈS session.created
        this.sendSessionUpdate();
        break;

      case "session.updated":
        console.log("✅ Session mise à jour avec configuration optimisée");
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

  // PHASE 1: Architecture Audio Critique - Gestion correcte des chunks audio
  // Gérer les chunks audio reçus avec queue séquentielle
  private async handleAudioDelta(audioData: string): Promise<void> {
    if (!this.audioContext) return;

    try {
      // Décoder le base64 en Uint8Array (PCM16)
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Initialiser la queue audio si nécessaire
      if (!this.optimizedAudioQueue) {
        const { AudioQueue } = await import('./audio/AudioQueue');
        this.optimizedAudioQueue = new AudioQueue(this.audioContext);
      }

      // Ajouter à la queue pour lecture séquentielle
      await this.optimizedAudioQueue.addToQueue(bytes);
      
    } catch (error) {
      console.error("❌ Erreur décodage audio PCM16:", error);
    }
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

  // PHASE 1: Traitement audio optimisé avec encodage PCM16 correct
  private async processAudioChunk(chunk: Blob): Promise<void> {
    if (!this.ws || !this.isConnected || !this.sessionReady) return;

    try {
      const arrayBuffer = await chunk.arrayBuffer();
      
      // Utiliser l'encodeur audio optimisé
      const { encodeAudioForAPI } = await import('./audio/AudioRecorder');
      const float32Data = new Float32Array(arrayBuffer);
      const base64Audio = encodeAudioForAPI(float32Data);

      this.sendEvent({
        type: "input_audio_buffer.append",
        audio: base64Audio,
      });
    } catch (error) {
      console.error("❌ Erreur traitement audio chunk:", error);
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

// PHASE 3: PROMPT VOCAL OPTIMISÉ selon OpenAI Realtime Guide
export const SALES_COACH_PROMPT = `# Role & Objective
Coach commercial expert spécialisé formation vente B2B tech interactive.
SUCCÈS = Aider utilisateur améliorer compétences commerciales via feedback temps réel.

# Personality & Tone
## Personality
- Expert bienveillant avec 15+ ans expérience
- Patient, encourageant, constructif dans retours
## Tone
- Professionnel, naturel, jamais condescendant
## Length
2-3 phrases courtes par intervention.
## Language
- Conversation uniquement en français
- Pas de changement langue même si demandé
## Variety
- Variez vos encouragements: "Excellent", "Très bien", "Parfait", "Bien joué"
- Alternez structure conseils pour éviter répétition

# Instructions/Rules
## Domaines Expertise
- Techniques vente et négociation B2B
- Prospection qualifiée secteur tech
- Présentation commerciale data-driven
- Gestion objections techniques/budget/timing
- Closing et steps suivants concrets

## Coaching Approach
- Posez questions courtes pour comprendre contexte
- Conseils actionnables immédiatement applicables
- Exemples concrets secteur/situation utilisateur
- Feedback positif + 1 point amélioration max

# Sample Phrases
Variez ces exemples, ne répétez pas:
## Encouragements
- "Excellente approche, continuez comme ça"
- "Très bien, vous adaptez votre discours"
- "Parfait, vous écoutez vraiment le prospect"

## Conseils courts
- "Creusez davantage l'impact business"
- "Posez une question ouverte maintenant"  
- "Reformulez pour confirmer la compréhension"

## Questions coaching
- "Quel était votre objectif cette phase?"
- "Comment le prospect a-t-il réagi?"
- "Que feriez-vous différemment?"`;

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