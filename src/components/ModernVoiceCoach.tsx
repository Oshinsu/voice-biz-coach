import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RealtimeVoiceCoach } from "@/lib/realtime-voice-coach";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  MessageSquare, 
  Minimize2,
  Volume2,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  content: string;
  sender: "user" | "assistant" | "system";
  timestamp: Date;
}

export function ModernVoiceCoach({ scenario, open = true, onToggle }: ModernVoiceCoachProps) {
  const { toast } = useToast();
  
  // États de connexion
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const coachRef = useRef<RealtimeVoiceCoach | null>(null);

  // Générer les instructions selon le scénario
  const generateInstructions = () => {
    const baseInstructions = `
## RÔLE & OBJECTIF
Vous êtes ${scenario?.persona?.name || 'Sophie Martin'} de ${scenario?.company || 'ModaStyle'}.

CONTEXTE DE L'APPEL:
- Type: Appel de prospection à froid
- Entreprise: ${scenario?.company || 'ModaStyle'}
- Secteur: ${scenario?.industry || 'E-commerce mode'}
- Votre rôle: ${scenario?.persona?.role || 'Directrice Marketing & Analytics'}
- Votre personnalité: ${scenario?.persona?.personality || 'Directrice marketing pragmatique avec un profil digital. Apprécie les données mais sans être une data scientist. Orientée résultats, veut comprendre ce qui marche pour l\'optimiser.'}

## INSTRUCTIONS DE JEU DE RÔLE
1. Incarnez fidèlement votre personnage
2. Respectez sa personnalité et ses motivations
3. Soyez naturellement surpris par cet appel non planifié
4. Révélez progressivement les informations selon le niveau de confiance
5. Réagissez de manière réaliste aux arguments commerciaux
6. Posez des questions pertinentes à votre secteur
7. Parlez français naturellement

## GESTION AUDIO PEU CLAIR
Si l'audio n'est pas clair:
- "Excusez-moi, j'ai eu du mal à saisir. Pourriez-vous répéter ?"
- "Je pense avoir perdu une partie de votre explication"
- "La ligne semble un peu coupée, pouvez-vous reformuler ?"

## RÈGLES DE VARIÉTÉ
- JAMAIS de réponses identiques entre sessions
- Variez vos objections et préoccupations
- Alternez entre différents styles de communication
- Adaptez selon le niveau de confiance établi

OBJECTIFS DE LA SIMULATION:
- Créer une expérience de vente réaliste
- Challenger le commercial sur ses techniques
- Permettre un apprentissage progressif
- Maintenir l'engagement conversationnel

Commencez la conversation de manière naturelle selon le contexte.`;

    return baseInstructions;
  };

  // Démarrer la conversation
  const startConversation = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      console.log('🎯 Démarrage de la conversation:', {
        callType: 'cold-call',
        scenario: scenario?.title || 'Optimisation Analytics E-commerce'
      });

      const coach = new RealtimeVoiceCoach({
        instructions: generateInstructions(),
        voice: 'sage',
        model: 'gpt-realtime',
        onSessionReady: () => {
          console.log('✅ Session prête');
          setIsConnected(true);
          setIsConnecting(false);
          
          toast({
            title: "Connexion établie",
            description: "Coach vocal prêt. Vous pouvez commencer à parler.",
          });

          addMessage({ 
            content: "🎯 Simulation démarrée. Présentez votre solution commerciale.", 
            sender: "system", 
            timestamp: new Date() 
          });
        },
        onSpeechStarted: () => {
          console.log('🎤 Utilisateur parle');
          setIsRecording(true);
          addMessage({ content: "🎙️ Vous parlez...", sender: "system", timestamp: new Date() });
        },
        onSpeechStopped: () => {
          console.log('🔇 Utilisateur arrête de parler');
          setIsRecording(false);
        },
        onResponseStarted: () => {
          console.log('🗣️ Assistant répond');
          setIsSpeaking(true);
        },
        onResponseCompleted: (text: string) => {
          console.log('✅ Réponse complète:', text);
          setIsSpeaking(false);
          if (text) {
            addMessage({ content: text, sender: "assistant", timestamp: new Date() });
          }
        },
        onError: (errorMsg: string) => {
          console.error('❌ Erreur coach:', errorMsg);
          setError(errorMsg);
          setIsConnecting(false);
          setIsConnected(false);
        }
      });

      coachRef.current = coach;
      await coach.connect();

    } catch (error: any) {
      console.error('❌ Erreur lors du démarrage:', error);
      setError(error.message || 'Erreur de connexion');
      setIsConnecting(false);
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de se connecter au coach vocal",
        variant: "destructive",
      });
    }
  };

  // Arrêter la conversation
  const endConversation = () => {
    if (coachRef.current) {
      coachRef.current.disconnect();
      coachRef.current = null;
    }
    
    setIsConnected(false);
    setIsSpeaking(false);
    setIsRecording(false);
    setError(null);

    toast({
      title: "Session terminée",
      description: "Coach vocal déconnecté",
    });

    addMessage({ 
      content: "📞 Session terminée. Consultez vos performances.", 
      sender: "system", 
      timestamp: new Date() 
    });
  };

  // Ajouter un message
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      if (coachRef.current) {
        coachRef.current.disconnect();
      }
    };
  }, []);

  if (!open) return null;

  // Vue minimisée
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card 
          className="w-16 h-16 cursor-pointer bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 hover:scale-105 transition-transform" 
          onClick={() => setIsMinimized(false)}
        >
          <CardContent className="p-0 flex items-center justify-center h-full">
            <div className="relative">
              <Phone className="h-6 w-6 text-primary" />
              {isConnected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              )}
              {isSpeaking && (
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 z-50 bg-background border-l shadow-xl">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Phone className="h-5 w-5 text-primary" />
                {isConnected && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
              <CardTitle className="text-lg">Coach Vocal IA</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              {onToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                >
                  ✕
                </Button>
              )}
            </div>
          </div>
          
          {/* Statut de connexion */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              variant={isConnected ? "default" : isConnecting ? "secondary" : "outline"}
              className={cn(
                isConnected && "bg-green-500",
                isConnecting && "bg-yellow-500"
              )}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Connexion...
                </>
              ) : isConnected ? (
                "Connecté"
              ) : (
                "Déconnecté"
              )}
            </Badge>
            
            {isSpeaking && (
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Volume2 className="h-3 w-3 mr-1" />
                Coach parle
              </Badge>
            )}
            
            {isRecording && (
              <Badge variant="outline" className="text-red-600 border-red-200">
                <Mic className="h-3 w-3 mr-1" />
                Écoute
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-muted">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg max-w-[85%] transition-all duration-200",
                  message.sender === "user" && "bg-primary text-primary-foreground ml-auto",
                  message.sender === "assistant" && "bg-muted mr-auto",
                  message.sender === "system" && "bg-accent text-accent-foreground text-center mx-auto text-sm"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          {/* Erreur */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">Erreur</p>
              <p className="text-xs text-destructive/80 mt-1">{error}</p>
            </div>
          )}

          {/* Contrôles */}
          <div className="flex gap-2">
            {!isConnected ? (
              <Button
                onClick={startConversation}
                disabled={isConnecting}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-2" />
                    Démarrer Simulation
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={endConversation}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                Terminer Session
              </Button>
            )}
          </div>

          {/* Info scénario */}
          {scenario && (
            <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
              <strong>Scénario:</strong> {scenario.title || 'Formation Commerciale'}
              <br />
              <strong>Prospect:</strong> {scenario.persona?.name || 'Sophie Martin'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}