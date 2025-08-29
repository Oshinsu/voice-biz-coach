import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  MessageSquare, 
  User,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UnifiedVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  content: string;
  sender: "user" | "assistant" | "system";
  timestamp: Date;
}

// Configuration WebRTC pour l'API Realtime d'OpenAI
const WEBRTC_CONFIG = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const SUPPORTED_VOICES = ['alloy', 'ash', 'ballad', 'coral', 'echo', 'sage', 'shimmer', 'verse'];

export function UnifiedVoiceCoach({ scenario, open = true, onToggle }: UnifiedVoiceCoachProps) {
  const { toast } = useToast();
  
  // États de connexion et d'interface
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // États de conversation
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPhase, setCurrentPhase] = useState("ouverture");
  const [trustLevel, setTrustLevel] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState<string>('sage');
  const [conversationType, setConversationType] = useState<'cold-call' | 'rdv' | null>(null);
  const [showCallTypeSelector, setShowCallTypeSelector] = useState(true);
  
  // Refs WebRTC
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Fonction utilitaire pour ajouter des messages
  const addMessage = useCallback((content: string, sender: "user" | "assistant" | "system") => {
    const newMessage: Message = {
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Fonction principale pour démarrer la conversation
  const startConversation = useCallback(async (callType: 'cold-call' | 'rdv') => {
    try {
      setError(null);
      setIsConnecting(true);
      setConversationType(callType);
      setShowCallTypeSelector(false);

      console.log("🎯 Démarrage de la conversation:", { callType, scenario: scenario?.title });

      // 1. Créer une session éphémère via notre Edge Function
      console.log("📡 Création de la session éphémère...");
      
      const instructions = generateInstructions(scenario, callType);
      
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke('openai-realtime', {
        body: {
          instructions,
          voice: selectedVoice,
          model: 'gpt-realtime'
        }
      });

      if (sessionError || !sessionData) {
        console.error("❌ Erreur lors de la création de session:", sessionError);
        throw new Error(`Erreur de session: ${sessionError?.message || 'Session non créée'}`);
      }

      console.log("✅ Session créée:", sessionData);

      // 2. Demander l'accès au microphone
      console.log("🎤 Demande d'accès au microphone...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;

      // 3. Créer la connexion WebRTC
      console.log("🔗 Création de la connexion WebRTC...");
      const pc = new RTCPeerConnection(WEBRTC_CONFIG);
      peerConnectionRef.current = pc;

      // Configuration de l'audio de sortie
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElementRef.current = audioEl;
      
      pc.ontrack = (e) => {
        console.log("📻 Piste audio reçue");
        audioEl.srcObject = e.streams[0];
        setIsSpeaking(true);
      };

      // Ajouter la piste audio locale
      const audioTrack = stream.getTracks()[0];
      pc.addTrack(audioTrack, stream);
      
      // Configuration du canal de données
      const dc = pc.createDataChannel("oai-events", {
        ordered: true
      });
      dataChannelRef.current = dc;

      // Gestionnaires d'événements du canal de données
      dc.onopen = () => {
        console.log("✅ Canal de données ouvert");
        addMessage("Connexion établie avec le coach vocal", "system");
        
        // Envoyer la configuration de session
        const sessionUpdate = {
          type: "session.update",
          session: {
            modalities: ["text", "audio"],
            instructions: instructions,
            voice: selectedVoice,
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
            temperature: 0.8,
            max_response_output_tokens: "inf"
          }
        };
        
        dc.send(JSON.stringify(sessionUpdate));
        console.log("📤 Configuration de session envoyée");
      };

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);
          handleRealtimeEvent(event);
        } catch (error) {
          console.error("❌ Erreur parsing événement:", error);
        }
      };

      dc.onerror = (error) => {
        console.error("❌ Erreur canal de données:", error);
        setError("Erreur de communication");
      };

      // Créer l'offre SDP
      console.log("📋 Création de l'offre SDP...");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Envoyer l'offre à OpenAI
      console.log("📡 Envoi de l'offre à OpenAI...");
      const response = await fetch(
        `https://api.openai.com/v1/realtime/calls?model=gpt-realtime`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            "Authorization": `Bearer ${sessionData.client_secret.value}`,
            "Content-Type": "application/sdp",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur WebRTC: ${response.status} - ${errorText}`);
      }

      const answer = {
        type: "answer" as const,
        sdp: await response.text(),
      };

      await pc.setRemoteDescription(answer);
      
      setIsConnected(true);
      setIsRecording(true);
      addMessage(`Conversation ${callType === 'cold-call' ? 'cold call' : 'RDV'} commencée`, "system");

      toast({
        title: "✅ Connexion établie",
        description: "Vous êtes maintenant en conversation avec votre contact",
      });

    } catch (error) {
      console.error("❌ Erreur lors du démarrage:", error);
      setError(error instanceof Error ? error.message : "Erreur de connexion");
      toast({
        title: "❌ Erreur de connexion",
        description: error instanceof Error ? error.message : "Impossible de se connecter",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [scenario, selectedVoice, toast, addMessage]);

  // Fonction pour terminer la conversation
  const endConversation = useCallback(() => {
    console.log("🔚 Fermeture de la conversation");
    
    // Fermer la connexion WebRTC
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    // Fermer le canal de données
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    
    // Arrêter l'audio
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    
    // Arrêter le stream média
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    // Réinitialiser les états
    setIsConnected(false);
    setIsConnecting(false);
    setIsRecording(false);
    setIsSpeaking(false);
    setIsMuted(false);
    setError(null);
    setConversationType(null);
    setShowCallTypeSelector(true);
    
    addMessage("Conversation terminée", "system");
    
    toast({
      title: "📞 Session terminée",
      description: "La conversation a été fermée",
    });
  }, [toast, addMessage]);

  // Fonction pour basculer le mute
  const toggleMute = useCallback(() => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
        
        toast({
          title: audioTrack.enabled ? "🎤 Micro activé" : "🔇 Micro coupé",
          description: audioTrack.enabled ? "Vous pouvez parler" : "Micro désactivé",
        });
      }
    }
  }, [toast]);

  // Gestionnaire d'événements Realtime
  const handleRealtimeEvent = useCallback((event: any) => {
    console.log("📨 Événement reçu:", event.type, event);
    
    switch (event.type) {
      case "session.created":
        console.log("✅ Session créée avec succès");
        break;
        
      case "session.updated":
        console.log("🔄 Session mise à jour");
        break;
        
      case "input_audio_buffer.speech_started":
        console.log("🎤 Début de parole utilisateur");
        setIsRecording(true);
        break;
        
      case "input_audio_buffer.speech_stopped":
        console.log("🤐 Fin de parole utilisateur");
        setIsRecording(false);
        break;
        
      case "response.audio.delta":
        setIsSpeaking(true);
        break;
        
      case "response.audio.done":
        setIsSpeaking(false);
        break;
        
      case "response.audio_transcript.delta":
        if (event.delta && event.delta.trim()) {
          // Mise à jour du message en cours ou création d'un nouveau
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.sender === "assistant" && 
                Date.now() - lastMessage.timestamp.getTime() < 2000) {
              // Mettre à jour le dernier message
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: lastMessage.content + event.delta }
              ];
            } else {
              // Créer un nouveau message
              return [...prev, {
                content: event.delta,
                sender: "assistant" as const,
                timestamp: new Date()
              }];
            }
          });
        }
        break;
        
      case "response.audio_transcript.done":
        console.log("✅ Transcription terminée");
        break;
        
      case "error":
        console.error("❌ Erreur Realtime:", event.error);
        setError(event.error?.message || "Erreur inconnue");
        toast({
          title: "❌ Erreur",
          description: event.error?.message || "Une erreur est survenue",
          variant: "destructive",
        });
        break;
        
      default:
        console.log("📋 Événement non géré:", event.type);
    }
  }, [toast]);

  // Fonction pour générer les instructions optimisées
  const generateInstructions = (scenario: any, callType: string) => {
    const baseInstructions = `# ROLE & OBJECTIVE
Tu es ${scenario?.interlocutor?.name || 'le contact'} de ${scenario?.company?.name || 'l\'entreprise'}.
${callType === 'cold-call' ? 'CONTEXTE: Appel commercial non sollicité pendant vos heures de travail.' : 'CONTEXTE: RDV planifié que vous avez accepté.'}
SUCCÈS = Conversation réaliste qui challenge les techniques commerciales du vendeur.

# PERSONALITY & TONE
- Persona: ${scenario?.interlocutor?.personality || 'Professionnel expérimenté'}
- Rôle: ${scenario?.interlocutor?.role || 'Contact commercial'}
- Entreprise: ${scenario?.company?.name} (${scenario?.company?.industry})
- Langue: UNIQUEMENT français
- Longueur: 1-2 phrases maximum par réponse
- Ton: ${callType === 'cold-call' ? 'Sceptique mais professionnel' : 'Ouvert mais exigeant'}

# GESTION AUDIO UNCLEAR
- Audio flou: "Désolé, je n'ai pas bien saisi, vous pouvez répéter ?"
- Silence >3sec: "Une question particulière ?"
- Interruption: Laisser finir puis continuer naturellement

# VARIETY
- Ne répétez JAMAIS les mêmes phrases deux fois
- Variez vos réponses pour éviter le langage robotique
- Expressions naturelles selon votre personnalité

# CONVERSATION FLOW
${callType === 'cold-call' ? 
  'Qualification rapide → Test expertise → Évaluation pertinence → Décision (RDV ou refus)' :
  'Recadrage objectifs → Discussion technique → Évaluation solution → Next steps'}

# INSTRUCTIONS TEMPS RÉEL
- Répondez en français seulement
- Restez dans votre rôle en permanence
- Challengez le commercial avec des questions pertinentes
- Révélez progressivement les informations selon la confiance
- Maintenez un rythme conversationnel naturel

Commencez la conversation de manière naturelle selon le contexte.`;

    return baseInstructions;
  };

  // Effet de nettoyage
  useEffect(() => {
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Rendu conditionnel - Interface minimisée
  if (!open) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggle}
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64 shadow-xl border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isConnected ? 'bg-success animate-pulse' : 'bg-muted'
                )} />
                <span className="text-sm font-medium">
                  {isConnected ? "En ligne" : "Hors ligne"}
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setIsMinimized(false)}>
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onToggle}>
                  ×
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-muted-foreground">
              {scenario?.company?.name || 'Contact'} - Coach Vocal
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Interface principale
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 max-h-[80vh] shadow-xl border-primary/20 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? 'bg-success animate-pulse' : 'bg-muted'
              )} />
              <CardTitle className="text-lg">
                Coach Commercial Vocal
              </CardTitle>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)}>
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                ×
              </Button>
            </div>
          </div>
          {scenario && (
            <div className="text-sm text-muted-foreground">
              {scenario.company?.name} - {scenario.interlocutor?.name}
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 min-h-0">
          {/* Statut et métriques */}
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">
                📊 Statut de la conversation
              </h4>
              <Badge variant={isConnected ? "default" : "outline"}>
                {isConnected ? "Connecté" : "Déconnecté"}
              </Badge>
            </div>
            
            {isConnected && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Confiance client:</span>
                  <span>{trustLevel}%</span>
                </div>
                <Progress value={trustLevel} className="h-1" />
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Phase: {currentPhase}
                  </Badge>
                  {conversationType && (
                    <Badge variant="outline" className="text-xs">
                      {conversationType === 'cold-call' ? 'Cold Call' : 'RDV'}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 min-h-0 max-h-48">
            {messages.map((message, index) => (
              <div key={index} className={cn(
                "p-2 rounded text-sm max-w-[85%]",
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : message.sender === 'system'
                  ? 'bg-muted text-muted-foreground text-center text-xs mx-auto'
                  : 'bg-muted'
              )}>
                <div>{message.content}</div>
                <div className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          {/* Sélecteur de type d'appel */}
          {showCallTypeSelector && !isConnected && (
            <div className="mb-4 p-3 border rounded-lg">
              <h4 className="text-sm font-medium mb-2">Type de conversation:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => startConversation('cold-call')}
                  disabled={isConnecting || !scenario}
                  className="text-xs h-8"
                >
                  📞 Cold Call
                </Button>
                <Button
                  variant="outline"
                  onClick={() => startConversation('rdv')}
                  disabled={isConnecting || !scenario}
                  className="text-xs h-8"
                >
                  📅 RDV Commercial
                </Button>
              </div>
            </div>
          )}

          {/* Sélecteur de voix */}
          {!isConnected && (
            <div className="mb-4">
              <label className="text-xs font-medium mb-1 block">Voix du contact:</label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full text-xs p-1 border rounded"
              >
                {SUPPORTED_VOICES.map(voice => (
                  <option key={voice} value={voice}>
                    {voice.charAt(0).toUpperCase() + voice.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="mb-4 p-2 bg-destructive/10 text-destructive text-xs rounded border border-destructive/20">
              {error}
            </div>
          )}

          {/* Contrôles principaux */}
          <div className="flex-shrink-0 space-y-3">
            {/* Indicateurs d'état */}
            {isConnected && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {isRecording && (
                    <Badge className="bg-red-100 text-red-800 animate-pulse">
                      🎤 Vous parlez
                    </Badge>
                  )}
                  {isSpeaking && (
                    <Badge className="bg-blue-100 text-blue-800 animate-pulse">
                      💬 Contact parle
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Boutons de contrôle */}
            <div className="flex gap-2">
              {!isConnected ? (
                <Button
                  onClick={() => {
                    if (conversationType) {
                      startConversation(conversationType);
                    } else {
                      setShowCallTypeSelector(true);
                    }
                  }}
                  disabled={isConnecting || !scenario}
                  className="flex-1"
                  size="sm"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
                      Connexion...
                    </>
                  ) : (
                    <>
                      <Phone className="w-3 h-3 mr-1" />
                      Démarrer
                    </>
                  )}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={endConversation}
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                  >
                    <PhoneOff className="w-3 h-3 mr-1" />
                    Raccrocher
                  </Button>
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    size="sm"
                  >
                    {isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}