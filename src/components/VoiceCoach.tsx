import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Phone, PhoneOff, MessageSquare, BookOpen, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/coach-hero.jpg";

// Configuration API OpenAI - remplacez par votre clé API
const OPENAI_API_KEY = "sk-proj-wHf8Oi7UVt3YJr23QUOzF4aWdv7Hp4C8pJu2EgS9OwF5RGt5_NB1Hs4LAFT3BlbkFJx7QHg5Fj2EtFPsHPG8NJmK";

export const VoiceCoach = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Étape 1: Créer une session éphémère avec OpenAI
      console.log("Création de la session éphémère...");
      const sessionResponse = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "realtime=v1"
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "sage"
        })
      });

      if (!sessionResponse.ok) {
        const errorText = await sessionResponse.text();
        console.error("Erreur session:", sessionResponse.status, errorText);
        throw new Error(`Erreur lors de la création de la session: ${sessionResponse.status} - ${errorText}`);
      }

      const sessionData = await sessionResponse.json();
      console.log("Session créée:", sessionData);

      // Étape 2: Demander l'accès au microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Étape 3: Créer une connexion WebRTC
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
      
      dc.addEventListener("open", () => {
        console.log("Canal de données ouvert");
        // Configurer la session avec les instructions du coach
        const sessionUpdate = {
          type: "session.update",
          session: {
            instructions: `Tu es un coach commercial expert et bienveillant. Ton rôle est d'aider les utilisateurs à améliorer leurs compétences commerciales à travers des conversations vocales interactives.

CONTEXTE ET PERSONNALITÉ :
- Tu es un coach commercial expérimenté avec plus de 15 ans d'expérience
- Tu parles français de manière naturelle et professionnelle
- Tu es patient, encourageant et constructif dans tes retours
- Tu utilises des exemples concrets et des situations réelles

DOMAINES D'EXPERTISE :
1. Techniques de vente et négociation
2. Prospection et génération de leads
3. Présentation commerciale et storytelling
4. Gestion des objections
5. Closing et finalisation des ventes
6. Relation client et fidélisation
7. Marketing commercial et personal branding
8. Motivation et mindset commercial

MÉTHODE D'ENSEIGNEMENT :
- Pose des questions pour comprendre le niveau et les besoins
- Propose des exercices pratiques et des jeux de rôles
- Donne des conseils actionnables et spécifiques
- Encourage la pratique et l'amélioration continue
- Adapte ton approche selon le profil de l'utilisateur

STRUCTURE DES CONVERSATIONS :
1. Accueil chaleureux et identification des besoins
2. Évaluation du niveau actuel
3. Définition d'objectifs d'apprentissage
4. Exercices pratiques et conseils
5. Récapitulatif et prochaines étapes

Commence toujours par te présenter brièvement et demander à l'utilisateur quel aspect commercial il souhaite travailler aujourd'hui.`,
            voice: "sage",
            input_audio_format: "pcm16",
            output_audio_format: "pcm16",
            modalities: ["text", "audio"],
            temperature: 0.8,
          },
        };
        dc.send(JSON.stringify(sessionUpdate));
      });
      
      dc.addEventListener("message", (e) => {
        const event = JSON.parse(e.data);
        console.log("Événement reçu:", event);
        
        switch (event.type) {
          case "session.created":
            console.log("Session créée avec succès");
            break;
          case "session.updated":
            console.log("Session mise à jour");
            break;
          case "input_audio_buffer.speech_started":
            console.log("Détection de parole utilisateur");
            break;
          case "input_audio_buffer.speech_stopped":
            console.log("Fin de parole utilisateur");
            break;
          case "response.audio.delta":
            setIsSpeaking(true);
            break;
          case "response.done":
            setIsSpeaking(false);
            break;
          case "error":
            console.error("Erreur:", event);
            toast({
              title: "Erreur de session",
              description: event.error?.message || "Une erreur est survenue",
              variant: "destructive",
            });
            break;
        }
      });

      // Créer l'offre SDP
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Étape 4: Envoyer l'offre SDP à OpenAI avec la session éphémère
      const response = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            "Authorization": `Bearer ${sessionData.client_secret.value}`,
            "Content-Type": "application/sdp",
            "OpenAI-Beta": "realtime=v1"
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

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
        description: error instanceof Error ? error.message : "Impossible de se connecter au coach vocal",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [toast]);

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
    
    setIsConnected(false);
    setIsSpeaking(false);
    setCurrentTopic("");

    toast({
      title: "Session terminée",
      description: "Votre session de coaching est terminée",
    });
  }, [toast]);

  const selectTopic = useCallback((topic: string) => {
    setCurrentTopic(topic);
    if (isConnected && dataChannelRef.current) {
      // Envoyer un message au coach sur le sujet sélectionné
      const topicMessage = {
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Je souhaiterais travailler sur le sujet suivant : ${topic}. Peux-tu me proposer un exercice ou des conseils pratiques pour ce domaine ?`,
            },
          ],
        },
      };
      dataChannelRef.current.send(JSON.stringify(topicMessage));
      
      // Déclencher une réponse
      const responseCreate = {
        type: "response.create",
      };
      dataChannelRef.current.send(JSON.stringify(responseCreate));
      
      toast({
        title: `Sujet sélectionné: ${topic}`,
        description: "Le coach va vous proposer des exercices pour ce domaine",
      });
    }
  }, [isConnected, toast]);

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
                 isConnecting ? "Connexion..." : "Déconnecté"}
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
                  disabled={isConnecting}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                >
                  {isConnecting ? (
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
                className={cn(
                  "p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gradient-to-br from-card to-secondary/30",
                  currentTopic === topic.title && "ring-2 ring-primary"
                )}
                onClick={() => selectTopic(topic.title)}
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

        {/* API Key Notice */}
      </div>
    </div>
  );
};