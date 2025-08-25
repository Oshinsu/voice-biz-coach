import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Phone, PhoneOff, MessageSquare, BookOpen, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/coach-hero.jpg";
import { useRealtimeSession } from "@/components/api/RealtimeSession";

export const VoiceCoach = () => {
  const { toast } = useToast();
  const { sessionData, createSession, clearSession, isCreating } = useRealtimeSession();
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startConversation = useCallback(async () => {
    try {
      // Créer une session OpenAI Realtime
      const session = await createSession();
      
      // Demander l'accès au microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Créer une connexion WebRTC
      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      // Configurer l'audio de sortie
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioRef.current = audioEl;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      // Ajouter la piste audio locale
      pc.addTrack(stream.getTracks()[0]);

      // Configurer le canal de données pour les événements
      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;
      
      dc.addEventListener("message", (e) => {
        const event = JSON.parse(e.data);
        console.log("Événement reçu:", event);
        
        if (event.type === "response.audio.delta") {
          setIsSpeaking(true);
        } else if (event.type === "response.done") {
          setIsSpeaking(false);
        }
      });

      // Créer l'offre SDP
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Envoyer l'offre à OpenAI
      const response = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${session.client_secret.value}`,
            "Content-Type": "application/sdp",
          },
        }
      );

      const answer = {
        type: "answer" as const,
        sdp: await response.text(),
      };
      
      await pc.setRemoteDescription(answer);
      setIsConnected(true);

      toast({
        title: "Connexion établie",
        description: "Vous êtes maintenant connecté à votre coach commercial",
      });

    } catch (error) {
      console.error("Erreur lors du démarrage:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au coach vocal",
        variant: "destructive",
      });
    }
  }, [createSession, toast]);

  const endConversation = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    clearSession();
    setIsConnected(false);
    setIsSpeaking(false);
    setCurrentTopic("");

    toast({
      title: "Session terminée",
      description: "Votre session de coaching est terminée",
    });
  }, [clearSession, toast]);

  const learningTopics = [
    {
      icon: Target,
      title: "Prospection",
      description: "Techniques pour identifier et approcher de nouveaux clients",
      color: "text-accent"
    },
    {
      icon: MessageSquare,
      title: "Négociation",
      description: "Stratégies pour négocier efficacement et conclure des ventes",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "Objections",
      description: "Gestion des objections et transformation en opportunités",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Performance",
      description: "Amélioration des résultats et développement personnel",
      color: "text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
          <img 
            src={heroImage} 
            alt="Coach commercial professionnel avec technologies vocales"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Coach Commercial Vocal
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto px-6">
                Développez vos compétences commerciales avec votre coach personnel alimenté par l'IA vocale
              </p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="p-8 bg-gradient-to-r from-card to-secondary/50 border-border/50">
          <div className="flex flex-col items-center space-y-6">
            {/* Status Indicator */}
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                isConnected ? "bg-success animate-pulse" : "bg-muted"
              )} />
              <span className="text-sm font-medium">
                {isConnected ? "Connecté" : 
                 isCreating ? "Connexion..." : "Déconnecté"}
              </span>
              {isSpeaking && (
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-primary rounded animate-pulse" />
                  <div className="w-1 h-4 bg-primary rounded animate-pulse delay-100" />
                  <div className="w-1 h-4 bg-primary rounded animate-pulse delay-200" />
                </div>
              )}
            </div>

            {/* Main Controls */}
            <div className="flex space-x-4">
              {!isConnected ? (
                <Button
                  onClick={startConversation}
                  disabled={isCreating}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                >
                  {isCreating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Connexion...
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5 mr-2" />
                      Commencer la session
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={endConversation}
                  variant="destructive"
                  size="lg"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  Terminer la session
                </Button>
              )}
            </div>

            {/* Microphone Status */}
            {isConnected && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mic className="w-4 h-4" />
                <span>Microphone actif - Parlez naturellement avec votre coach</span>
              </div>
            )}
          </div>
        </Card>

        {/* Learning Topics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Domaines d'apprentissage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningTopics.map((topic, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gradient-to-br from-card to-secondary/30"
                onClick={() => {
                  setCurrentTopic(topic.title);
                  if (isConnected) {
                    toast({
                      title: `Sujet sélectionné: ${topic.title}`,
                      description: "Vous pouvez maintenant parler de ce sujet avec votre coach",
                    });
                  }
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-300",
                    topic.color
                  )}>
                    <topic.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-primary" />
            Comment utiliser votre coach vocal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>• <strong>Cliquez sur "Commencer la session"</strong> pour vous connecter</p>
              <p>• <strong>Autorisez l'accès au microphone</strong> quand demandé</p>
              <p>• <strong>Parlez naturellement</strong> avec votre coach</p>
            </div>
            <div className="space-y-2">
              <p>• <strong>Sélectionnez un sujet</strong> pour orienter la conversation</p>
              <p>• <strong>Participez aux exercices</strong> proposés par le coach</p>
              <p>• <strong>Posez vos questions</strong> sur les techniques commerciales</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};