// Configuration WebRTC pour l'API Realtime d'OpenAI (Version 2025)
export const WEBRTC_CONFIG = {
  model: "gpt-realtime-2025-08-28", // Modèle le plus récent
  voice: "sage", // Voix professionnelle par défaut
  baseUrl: "https://api.openai.com/v1/realtime",
  sessionUrl: "https://api.openai.com/v1/realtime/sessions",
  supportedVoices: ['alloy', 'ash', 'ballad', 'coral', 'echo', 'sage', 'shimmer', 'verse']
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
  tools?: any[];
  tool_choice?: string;
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

  // Créer une session éphémère via Supabase Edge Function avec voix sélectionnée
  async createEphemeralSession(instructions?: string, voice?: string): Promise<string> {
    try {
      const selectedVoice = voice && WEBRTC_CONFIG.supportedVoices.includes(voice) ? voice : WEBRTC_CONFIG.voice;
      
      console.log('🎯 Création session éphémère avec:', { instructions: instructions?.substring(0, 100), voice: selectedVoice });
      
      const { data, error } = await import('@/integrations/supabase/client').then(m => m.supabase.functions.invoke('openai-realtime', {
        body: { 
          instructions,
          voice: selectedVoice,
          model: WEBRTC_CONFIG.model
        }
      }));

      console.log('📡 Réponse Supabase:', data);

      if (error) {
        console.error("❌ Erreur Supabase Edge Function:", error);
        throw new Error(`Erreur lors de la création de la session: ${error.message}`);
      }

      if (!data?.client_secret?.value) {
        console.error('❌ Pas de client_secret dans la réponse:', data);
        throw new Error("Réponse invalide de la session OpenAI - pas de token");
      }

      this.ephemeralKey = data.client_secret.value;
      console.log("✅ Session éphémère créée avec succès:", {
        voice: selectedVoice,
        model: WEBRTC_CONFIG.model,
        expires: data.expires_at
      });
      return this.ephemeralKey;
    } catch (error) {
      console.error("💥 Erreur création session éphémère:", error);
      throw error;
    }
  }

  // Connexion WebRTC avec l'API Realtime (Version 2025)
  async connect(instructions?: string, voice?: string): Promise<void> {
    try {
      console.log('🚀 Démarrage connexion WebRTC...');
      
      if (this.peerConnection) {
        console.log('🔄 Nettoyage connexion existante');
        this.disconnect();
      }

      console.log('📞 Création session éphémère...');
      await this.createEphemeralSession(instructions, voice);
      
      if (!this.ephemeralKey) {
        throw new Error("Impossible de créer une session éphémère");
      }

      console.log('🔑 Token éphémère reçu');

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

  // Initialiser la session avec paramètres 2025 et Discovery Mode avancé
  private initializeSession(instructions?: string): void {
    if (!this.dataChannel) return;

    const sessionConfig: SessionConfig = {
      model: WEBRTC_CONFIG.model,
      voice: WEBRTC_CONFIG.voice,
      modalities: ["text", "audio"],
      instructions: instructions || DEFAULT_SALES_PROMPT,
      // Note: temperature n'est plus supporté dans les nouveaux modèles GPT-4o Realtime 2025
      turn_detection: {
        type: "server_vad",
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 1000, // Augmenté pour éviter les coupures
      },
      tools: [
        {
          type: "function",
          name: "askColleague",
          description: "Consulter un collègue pour obtenir des informations spécifiques sur votre entreprise.",
          parameters: {
            type: "object",
            properties: {
              question: { 
                type: "string", 
                description: "Question précise à poser au collègue" 
              },
              topic: { 
                type: "string", 
                description: "Domaine concerné",
                enum: ["budget", "technique", "timeline", "processus", "ressources", "direction"]
              }
            },
            required: ["question", "topic"]
          }
        },
        {
          type: "function", 
          name: "checkBudget",
          description: "Vérifier les informations budgétaires disponibles dans votre organisation.",
          parameters: {
            type: "object", 
            properties: {
              requestType: { 
                type: "string", 
                description: "Type de vérification budgétaire",
                enum: ["range", "exact", "approval", "available"]
              },
              context: { 
                type: "string", 
                description: "Contexte de la demande budgétaire" 
              }
            },
            required: ["requestType", "context"]
          }
        },
        {
          type: "function",
          name: "consultDecisionMaker",
          description: "Consulter les décideurs de votre entreprise pour une validation ou information importante.",
          parameters: {
            type: "object",
            properties: {
              topic: { 
                type: "string", 
                description: "Sujet à discuter avec la direction" 
              },
              urgency: { 
                type: "string", 
                description: "Niveau d'urgence de la consultation",
                enum: ["low", "medium", "high"]
              }
            },
            required: ["topic", "urgency"]
          }
        },
        {
          type: "function",
          name: "reviewInternalOptions",
          description: "Examiner les options et outils internes disponibles dans votre organisation.",
          parameters: {
            type: "object",
            properties: {
              area: { 
                type: "string", 
                description: "Domaine à examiner",
                enum: ["tools", "processes", "resources", "systems", "providers"]
              },
              comparison: { 
                type: "string", 
                description: "Solution proposée à comparer" 
              }
            },
            required: ["area", "comparison"]
          }
        }
      ],
      tool_choice: "auto"
    };

    // Envoyer la configuration de session avec validation
    console.log("Configuration session WebRTC:", sessionConfig);
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

  // Gérer les événements du serveur avec support des fonctions Discovery
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

      case "response.function_call_arguments.done":
        console.log("Appel de fonction terminé:", event);
        this.handleFunctionCall(event);
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

  // Gestion des appels de fonctions Discovery
  private handleFunctionCall(event: any): void {
    const { call_id, name, arguments: args } = event;
    console.log(`Fonction Discovery appelée: ${name}`, args);
    
    let result = "";
    const parsedArgs = JSON.parse(args);
    
    switch (name) {
      case "askColleague":
        result = this.simulateAskColleague(parsedArgs.question, parsedArgs.topic);
        break;
      case "checkBudget":
        result = this.simulateCheckBudget(parsedArgs.requestType, parsedArgs.context);
        break;
      case "consultDecisionMaker":
        result = this.simulateConsultDecisionMaker(parsedArgs.topic, parsedArgs.urgency);
        break;
      case "reviewInternalOptions":
        result = this.simulateReviewOptions(parsedArgs.area, parsedArgs.comparison);
        break;
      default:
        result = "Je dois vérifier cette information et revenir vers vous.";
    }

    // Envoyer le résultat de la fonction
    this.sendEvent({
      type: "conversation.item.create",
      item: {
        type: "function_call_output",
        call_id: call_id,
        output: result
      }
    });
  }

  // Simulations des fonctions Discovery
  private simulateAskColleague(question: string, topic: string): string {
    const responses = {
      budget: "D'après mon collègue financier, nous avons effectivement un budget alloué pour ce type de projet cette année.",
      technique: "Mon équipe technique confirme que nous rencontrons quelques limitations avec nos outils actuels.",
      timeline: "Côté planning, nous pourrions envisager une mise en œuvre au prochain trimestre selon mon responsable projet.",
      processus: "Le processus habituel nécessite une validation par la direction technique et financière."
    };
    return responses[topic as keyof typeof responses] || "Je vais me renseigner et vous tenir informé.";
  }

  private simulateCheckBudget(requestType: string, context: string): string {
    if (requestType === "range") {
      return "Après vérification, nous avons effectivement un budget dans cette gamme de prix.";
    } else if (requestType === "exact") {
      return "Je dois faire une demande formelle pour obtenir le montant exact disponible.";
    }
    return "Budget en cours de validation par notre service financier.";
  }

  private simulateConsultDecisionMaker(topic: string, urgency: string): string {
    if (urgency === "high") {
      return "Ma direction est intéressée et souhaite plus de détails sur cette proposition.";
    }
    return "Je vais présenter votre proposition lors de notre prochaine réunion de direction.";
  }

  private simulateReviewOptions(area: string, comparison: string): string {
    return `Après examen de nos ${area} actuels, votre solution semble apporter des améliorations intéressantes par rapport à ce que nous utilisons.`;
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

// Configuration du prompt système par défaut (sera remplacé par des prompts contextuels)
export const DEFAULT_SALES_PROMPT = `Tu es un assistant commercial qui aide à la formation commerciale. Adapte-toi au contexte de la conversation.`;

// Fonction utilitaire pour gérer les erreurs WebRTC
export function handleWebRTCError(error: any): string {
  console.error("Erreur WebRTC Realtime API:", error);
  
  // Conversion sécurisée de l'erreur en string
  const errorString = error?.message || error?.toString() || String(error);
  const errorStringLower = errorString.toLowerCase();
  
  if (errorStringLower.includes("authentication") || errorStringLower.includes("401")) {
    return "Erreur d'authentification. Vérifiez votre clé API OpenAI.";
  } else if (errorStringLower.includes("rate_limit") || errorStringLower.includes("429")) {
    return "Limite de débit atteinte. Veuillez réessayer plus tard.";
  } else if (errorStringLower.includes("network") || errorStringLower.includes("connection")) {
    return "Erreur de connexion. Vérifiez votre connexion internet.";
  } else if (errorStringLower.includes("microphone") || errorStringLower.includes("getusermedia")) {
    return "Erreur d'accès au microphone. Vérifiez les permissions.";
  } else if (errorStringLower.includes("websocket") || errorStringLower.includes("webrtc")) {
    return "Erreur de connexion WebRTC. Réessayez dans quelques secondes.";
  } else {
    return `Erreur: ${errorString}`;
  }
}