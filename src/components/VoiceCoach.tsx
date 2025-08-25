import { useState, useCallback } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Phone, PhoneOff, MessageSquare, BookOpen, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/coach-hero.jpg";

export const VoiceCoach = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connecté au coach vocal");
      toast({
        title: "Connexion établie",
        description: "Votre coach commercial vocal est prêt à vous aider !",
        variant: "default",
      });
    },
    onDisconnect: () => {
      console.log("Déconnecté du coach vocal");
      toast({
        title: "Session terminée",
        description: "Votre session avec le coach vocal est terminée.",
      });
    },
    onError: (error) => {
      console.error("Erreur:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au coach vocal. Vérifiez votre connexion.",
        variant: "destructive",
      });
    },
    overrides: {
      agent: {
        prompt: {
          prompt: `Tu es un coach commercial expert et bienveillant. Ton rôle est d'aider les utilisateurs à améliorer leurs compétences commerciales à travers des conversations vocales interactives.

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
        },
        firstMessage: "Bonjour ! Je suis votre coach commercial vocal. Je suis là pour vous aider à développer vos compétences en vente et améliorer vos performances commerciales. Quel aspect commercial souhaiteriez-vous travailler aujourd'hui ? Par exemple : la prospection, la négociation, la gestion des objections, ou autre chose ?",
        language: "fr",
      },
    },
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Demander l'accès au microphone avant de commencer
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Pour la démo, nous utiliserons une simulation de session
      // En production, vous devriez avoir un backend qui gère les clés API
      toast({
        title: "Mode démo",
        description: "Cette version de démonstration simule une conversation vocale. Connectez votre clé API OpenAI pour une utilisation complète.",
        variant: "default",
      });
      
      // Simulation d'une session démarrée
      setTimeout(() => {
        toast({
          title: "Session simulée démarrée",
          description: "Vous pouvez maintenant interagir avec l'interface. Implémentez l'API Realtime pour une fonctionnalité complète.",
        });
      }, 1500);
      
    } catch (error) {
      console.error("Erreur lors du démarrage:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'accéder au microphone. Vérifiez les permissions de votre navigateur.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [toast]);

  const endConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setCurrentTopic("");
    } catch (error) {
      console.error("Erreur lors de l'arrêt:", error);
    }
  }, [conversation]);

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
                conversation.status === "connected" ? "bg-success animate-pulse" : "bg-muted"
              )} />
              <span className="text-sm font-medium">
                {conversation.status === "connected" ? "Connecté" : 
                 conversation.status === "connecting" ? "Connexion..." : "Déconnecté"}
              </span>
              {conversation.isSpeaking && (
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-primary rounded animate-pulse" />
                  <div className="w-1 h-4 bg-primary rounded animate-pulse delay-100" />
                  <div className="w-1 h-4 bg-primary rounded animate-pulse delay-200" />
                </div>
              )}
            </div>

            {/* Main Controls */}
            <div className="flex space-x-4">
              {conversation.status !== "connected" ? (
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
            {conversation.status === "connected" && (
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
                  if (conversation.status === "connected") {
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