import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AgentsVoiceService } from "@/lib/agents-voice-service";
import { generateOptimizedScenarioPrompt } from "@/lib/prompts";
import { StudentVoiceInterface } from "./StudentVoiceInterface";
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

  // Génération des instructions basée sur le scénario
  const generateScenarioInstructions = (scenario: any): string => {
    if (!scenario) {
      return `# AGENT COMMERCIAL GÉNÉRIQUE
Vous êtes un expert commercial pour simulation d'entraînement.
Personnalité professionnelle, empathique, orientée solutions.
Adaptez vos réponses selon la phase de vente.`;
    }

    return generateOptimizedScenarioPrompt({
      scenarioId: scenario.id,
      conversationType: 'rdv',
      currentPhase: 'ouverture', 
      trustLevel: 50,
      agentType: 'contact_principal'
    });
  };

  // Démarrer la session Agent SDK
  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      sessionStartRef.current = new Date();

      console.log('🚀 Démarrage session Agent SDK via Edge Function WebRTC');

      const service = new AgentsVoiceService({
        instructions: generateScenarioInstructions(scenario),
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

  // Use student interface for connected state
  if (isConnected || isConnecting) {
    return (
      <StudentVoiceInterface
        scenario={scenario}
        onConnect={startSession}
        onDisconnect={endSession}
        isConnected={isConnected}
        isConnecting={isConnecting}
        isSpeaking={isSpeaking}
        isListening={isListening}
        sessionDuration={sessionStats.duration}
        exchanges={sessionStats.exchanges}
      />
    );
  }

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
            </div>
            <span className="text-xs font-medium text-primary">Coach</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-xl border-2 z-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Coach Vocal IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Button
            onClick={startSession}
            disabled={isConnecting}
            className="w-full"
            size="lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            {isConnecting ? "Connexion..." : "Démarrer l'Entraînement"}
          </Button>
        </div>
        
        {scenario && (
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <h3 className="font-medium text-sm">{scenario.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Entraînement vocal avec IA
            </p>
          </div>
        )}
        
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 p-0"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0"
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}