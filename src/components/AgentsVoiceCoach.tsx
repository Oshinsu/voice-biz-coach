import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AgentsVoiceService } from "@/lib/agents-voice-service";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  MessageSquare, 
  Minimize2,
  Volume2,
  Loader2,
  Zap,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentsVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  content: string;
  sender: "user" | "assistant" | "system";
  timestamp: Date;
  type?: "audio" | "text" | "interruption";
}

export function AgentsVoiceCoach({ scenario, open = true, onToggle }: AgentsVoiceCoachProps) {
  const { toast } = useToast();
  
  // États de connexion optimisés
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState({
    duration: 0,
    exchanges: 0,
    interruptions: 0
  });
  
  // Refs
  const agentsServiceRef = useRef<AgentsVoiceService | null>(null);
  const sessionStartRef = useRef<Date | null>(null);

  // Instructions optimisées pour Agent SDK
  const generateOptimizedInstructions = () => {
    const instructions = `# AGENT VOCAL COMMERCIAL IA - ${scenario?.company || 'ModaStyle'}

## IDENTITÉ & CONTEXTE
Vous êtes **${scenario?.persona?.name || 'Sophie Martin'}**, ${scenario?.persona?.role || 'Directrice Marketing & Analytics'} chez ${scenario?.company || 'ModaStyle'}.

**Personnalité:** ${scenario?.persona?.personality || 'Directrice marketing pragmatique avec un profil digital. Apprécie les données mais sans être une data scientist. Orientée résultats, veut comprendre ce qui marche pour l\'optimiser.'}

**Secteur:** ${scenario?.industry || 'E-commerce mode'}
**Type d'appel:** Prospection commerciale à froid
**Langue:** Français naturel et professionnel

## COMPORTEMENT AUDIO NATIF
- Parlez de manière naturelle avec des intonations authentiques
- Utilisez des pauses réalistes et respirations naturelles  
- Adaptez votre débit selon l'émotion (surprise, intérêt, méfiance)
- Intégrez des interjections naturelles ("hmm", "ah bon", "d'accord")

## RÈGLES DE SIMULATION RÉALISTE
1. **Début d'appel:** Montrez de la surprise (appel non prévu)
2. **Progressive disclosure:** Révélez les infos selon la confiance établie
3. **Objections variées:** Ne répétez jamais les mêmes objections entre sessions
4. **Questions pertinentes:** Posez des questions métier spécifiques
5. **Gestion des interruptions:** Réagissez naturellement aux coupures

## GESTION AUDIO & TECHNIQUE
- Si audio pas clair: "Excusez-moi, pouvez-vous répéter ?"
- En cas d'interruption: Reprenez le fil naturellement
- Durée optimale: 3-5 minutes d'échange
- Conclusion: Proposez un suivi concret ou poliment déclinez

## OBJECTIFS DE FORMATION
- Challenger le commercial sur ses techniques
- Créer des objections réalistes et variées  
- Permettre l'apprentissage par la pratique
- Maintenir l'engagement tout au long

Démarrez par une réaction naturelle de surprise à ce call commercial inattendu.`;

    return instructions;
  };

  // Démarrer la session Agent SDK
  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      sessionStartRef.current = new Date();

      console.log('🚀 Démarrage session Agent SDK');

      const service = new AgentsVoiceService({
        instructions: generateOptimizedInstructions(),
        voice: 'sage', // Optimisé pour le français
        model: 'gpt-realtime',
        
        onSessionReady: () => {
          console.log('✅ Agent SDK prêt');
          setIsConnected(true);
          setIsConnecting(false);
          
          toast({
            title: "🎯 Coach IA Connecté",
            description: "Session Agent SDK active. Commencez votre pitch commercial.",
          });

          addMessage({ 
            content: "🚀 Session Agent SDK démarrée. Présentez votre offre commerciale.", 
            sender: "system", 
            timestamp: new Date(),
            type: "text"
          });
        },

        onSpeechStarted: () => {
          setIsListening(true);
          setSessionStats(prev => ({ ...prev, exchanges: prev.exchanges + 1 }));
        },

        onSpeechStopped: () => {
          setIsListening(false);
        },

        onResponseStarted: () => {
          setIsSpeaking(true);
        },

        onResponseCompleted: (text: string) => {
          setIsSpeaking(false);
          if (text.trim()) {
            addMessage({ 
              content: text, 
              sender: "assistant", 
              timestamp: new Date(),
              type: "audio"
            });
          }
        },

        onInterruption: () => {
          setSessionStats(prev => ({ ...prev, interruptions: prev.interruptions + 1 }));
          addMessage({
            content: "⚡ Interruption détectée - Conversation adaptée",
            sender: "system",
            timestamp: new Date(),
            type: "interruption"
          });
        },

        onError: (errorMsg: string) => {
          console.error('❌ Erreur Agent SDK:', errorMsg);
          setError(errorMsg);
          setIsConnecting(false);
          setIsConnected(false);
          
          toast({
            title: "Erreur Agent SDK",
            description: errorMsg,
            variant: "destructive",
          });
        }
      });

      agentsServiceRef.current = service;
      await service.connect();

      // Optimisations coût
      await service.enableCachedInput();

    } catch (error: any) {
      console.error('❌ Erreur démarrage Agent SDK:', error);
      setError(error.message || 'Erreur de connexion');
      setIsConnecting(false);
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de connecter l'Agent SDK",
        variant: "destructive",
      });
    }
  };

  // Terminer la session
  const endSession = () => {
    if (agentsServiceRef.current) {
      agentsServiceRef.current.disconnect();
      agentsServiceRef.current = null;
    }
    
    // Calcul statistiques
    const duration = sessionStartRef.current 
      ? Math.round((Date.now() - sessionStartRef.current.getTime()) / 1000)
      : 0;
    
    setSessionStats(prev => ({ ...prev, duration }));
    setIsConnected(false);
    setIsSpeaking(false);
    setIsListening(false);
    setError(null);
    sessionStartRef.current = null;

    toast({
      title: "📊 Session terminée",
      description: `Durée: ${duration}s | Échanges: ${sessionStats.exchanges}`,
    });

    addMessage({ 
      content: `📈 Session terminée - Durée: ${duration}s | Échanges: ${sessionStats.exchanges} | Interruptions: ${sessionStats.interruptions}`, 
      sender: "system", 
      timestamp: new Date(),
      type: "text"
    });
  };

  // Interruption manuelle
  const handleInterrupt = async () => {
    if (agentsServiceRef.current) {
      await agentsServiceRef.current.interrupt();
      toast({
        title: "⚡ Interruption",
        description: "Signal d'interruption envoyé",
      });
    }
  };

  // Ajouter un message
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  // Nettoyage
  useEffect(() => {
    return () => {
      if (agentsServiceRef.current) {
        agentsServiceRef.current.disconnect();
      }
    };
  }, []);

  // Timer de session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected && sessionStartRef.current) {
      interval = setInterval(() => {
        const elapsed = Math.round((Date.now() - sessionStartRef.current!.getTime()) / 1000);
        setSessionStats(prev => ({ ...prev, duration: elapsed }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  if (!open) return null;

  // Vue minimisée
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card 
          className="w-20 h-20 cursor-pointer bg-card/95 backdrop-blur hover:scale-105 transition-all duration-200 border-2 border-primary/20" 
          onClick={() => setIsMinimized(false)}
        >
          <CardContent className="p-0 flex flex-col items-center justify-center h-full">
            <div className="relative mb-1">
              <Phone className="h-6 w-6 text-primary" />
              {isConnected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            <span className="text-xs font-medium text-primary">SDK</span>
            {isSpeaking && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse" />
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 z-50 bg-background border-l-2 border-primary/20 shadow-2xl">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b bg-gradient-to-r from-primary/15 to-primary/5 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Phone className="h-5 w-5 text-primary" />
                {isConnected && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  Coach IA Agent SDK
                  <Badge variant="outline" className="text-xs">v2.0</Badge>
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {isConnected && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleInterrupt}
                  title="Interruption"
                >
                  <Zap className="h-4 w-4" />
                </Button>
              )}
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
          
          {/* Status avancé */}
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <Badge 
              variant={isConnected ? "default" : isConnecting ? "secondary" : "outline"}
              className={cn(
                isConnected && "bg-green-500 text-white",
                isConnecting && "bg-yellow-500 text-white"
              )}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Connexion SDK...
                </>
              ) : isConnected ? (
                "Connecté"
              ) : (
                "Déconnecté"
              )}
            </Badge>
            
            {isSpeaking && (
              <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                <Volume2 className="h-3 w-3 mr-1" />
                Coach
              </Badge>
            )}
            
            {isListening && (
              <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                <Mic className="h-3 w-3 mr-1" />
                Écoute
              </Badge>
            )}

            {isConnected && (
              <Badge variant="outline" className="text-primary">
                {sessionStats.duration}s
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 h-[calc(100vh-220px)] flex flex-col">
          {/* Messages optimisés */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-muted">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg max-w-[90%] transition-all duration-300",
                  message.sender === "user" && "bg-primary text-primary-foreground ml-auto",
                  message.sender === "assistant" && "bg-muted mr-auto border-l-4 border-primary/30",
                  message.sender === "system" && "bg-accent text-accent-foreground text-center mx-auto text-sm",
                  message.type === "interruption" && "bg-yellow-50 border border-yellow-200"
                )}
              >
                <div className="flex items-start gap-2">
                  {message.type === "audio" && message.sender === "assistant" && (
                    <Volume2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  )}
                  {message.type === "interruption" && (
                    <Zap className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.type && (
                        <Badge variant="outline" className="text-xs py-0 px-1">
                          {message.type}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Erreur */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">Erreur Agent SDK</p>
              <p className="text-xs text-destructive/80 mt-1">{error}</p>
            </div>
          )}

          {/* Contrôles */}
          <div className="flex gap-2">
            {!isConnected ? (
              <Button
                onClick={startSession}
                disabled={isConnecting}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    SDK...
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-2" />
                    Agent SDK
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={endSession}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                Terminer
              </Button>
            )}
          </div>

          {/* Stats de session */}
          {isConnected && (
            <div className="mt-3 p-2 bg-primary/5 rounded border border-primary/20 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-medium text-primary">{sessionStats.duration}s</div>
                  <div className="text-muted-foreground">Durée</div>
                </div>
                <div>
                  <div className="font-medium text-primary">{sessionStats.exchanges}</div>
                  <div className="text-muted-foreground">Échanges</div>
                </div>
                <div>
                  <div className="font-medium text-primary">{sessionStats.interruptions}</div>
                  <div className="text-muted-foreground">Interruptions</div>
                </div>
              </div>
            </div>
          )}

          {/* Info scénario */}
          {scenario && (
            <div className="mt-2 p-2 bg-muted/30 rounded text-xs border">
              <strong>🎯 Scénario:</strong> {scenario.title || 'Formation Agent SDK'}
              <br />
              <strong>👤 Prospect:</strong> {scenario.persona?.name || 'Sophie Martin'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}