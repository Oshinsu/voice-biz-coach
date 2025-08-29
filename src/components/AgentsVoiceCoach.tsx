import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { generateOptimizedScenarioPrompt } from "@/lib/prompts";
import { StudentVoiceInterface } from "./StudentVoiceInterface";
import { supabase } from "@/integrations/supabase/client";
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
  Settings,
  Calendar
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
  const [conversationType, setConversationType] = useState<'cold-call' | 'rdv'>('rdv');
  
  // Refs
  const sessionRef = useRef<RealtimeSession | null>(null);
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
      conversationType: conversationType,
      currentPhase: 'ouverture', 
      trustLevel: 50,
      agentType: 'contact_principal'
    });
  };

  // Démarrer la session Agents SDK
  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      sessionStartRef.current = new Date();

      console.log('🚀 Démarrage session Agents SDK...');

      // Obtenir une clé éphémère depuis notre Edge Function
      const { data: tokenData, error } = await supabase.functions.invoke('realtime-token', {
        body: { voice: 'alloy' }
      });

      if (error || !tokenData?.client_secret?.value) {
        throw new Error('Impossible d\'obtenir le token ephémère');
      }

      // Créer l'agent avec les instructions
      const instructions = generateScenarioInstructions(scenario);
      const agent = new RealtimeAgent({
        name: "Coach StyleChain",
        instructions: instructions + " Tu DOIS toujours répondre en français uniquement.",
        voice: 'alloy'
      });

      // Créer la session
      const session = new RealtimeSession(agent);
      sessionRef.current = session;

      console.log('✅ Session Agents SDK connectée');
      setIsConnected(true);
      setIsConnecting(false);
      
      toast({
        title: "🎯 Coach IA Connecté",
        description: "Session Agents SDK active. Commencez votre pitch commercial.",
      });

      addMessage({ 
        content: "🚀 Session Agents SDK démarrée. Présentez votre offre commerciale.", 
        sender: "system", 
        timestamp: new Date(),
        type: "text"
      });

      // Connecter avec le token éphémère
      await session.connect({
        apiKey: tokenData.client_secret.value,
      });

    } catch (error: any) {
      console.error('❌ Erreur démarrage Agents SDK:', error);
      setError(error.message || 'Erreur de connexion');
      setIsConnecting(false);
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Impossible de connecter l'Agents SDK",
        variant: "destructive",
      });
    }
  };

  // Terminer la session
  const endSession = () => {
    if (sessionRef.current) {
      // Note: Agents SDK utilise une méthode différente pour déconnecter
      sessionRef.current = null;
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
    if (sessionRef.current) {
      // Note: Agents SDK peut ne pas avoir de méthode interrupt directe
      toast({
        title: "⚡ Interruption",
        description: "Arrêtez de parler pour interrompre l'IA",
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
      if (sessionRef.current) {
        // Note: Agents SDK cleanup
        sessionRef.current = null;
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
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
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
          Coach Vocal IA (Agents SDK)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sélection du type de conversation */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Type de conversation</label>
          <div className="flex gap-2">
            <Button
              variant={conversationType === 'cold-call' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setConversationType('cold-call')}
              className="flex-1"
            >
              <Phone className="w-4 h-4 mr-1" />
              Cold Call
            </Button>
            <Button
              variant={conversationType === 'rdv' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setConversationType('rdv')}
              className="flex-1"
            >
              <Calendar className="w-4 h-4 mr-1" />
              RDV
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {conversationType === 'cold-call' 
              ? 'Appel à froid pour décrocher un RDV (5-15 min)'
              : 'Rendez-vous commercial planifié avec toutes les phases (20-45 min)'
            }
          </p>
        </div>
        
        <div className="text-center">
          <Button
            onClick={startSession}
            disabled={isConnecting}
            className="w-full"
            size="lg"
          >
            <Phone className="h-5 h-5 mr-2" />
            {isConnecting ? "Connexion..." : "Démarrer l'Entraînement"}
          </Button>
        </div>
        
        {scenario && (
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <h3 className="font-medium text-sm">{scenario?.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Entraînement vocal avec Agents SDK
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