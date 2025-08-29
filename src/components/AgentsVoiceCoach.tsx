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

  // Démarrer la session Agents SDK avec événements complets
  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      sessionStartRef.current = new Date();

      console.log('🚀 Démarrage session Agents SDK avec token éphémère...');

      // Générer les instructions du scénario
      const instructions = generateScenarioInstructions(scenario);

      // Obtenir un token éphémère depuis notre Edge Function
      const { data: tokenData, error } = await supabase.functions.invoke('realtime-token');

      if (error || !tokenData?.value) {
        console.error('❌ Erreur token éphémère:', error);
        throw new Error('Impossible d\'obtenir le token éphémère OpenAI');
      }

      console.log('✅ Token éphémère obtenu');

      // Créer l'agent avec les instructions
      const agent = new RealtimeAgent({
        name: "Coach StyleChain",
        instructions: instructions + " Tu DOIS toujours répondre en français uniquement.",
        voice: 'alloy'
      });

      // Créer la session avec configuration optimale
      const session = new RealtimeSession(agent, {
        model: 'gpt-realtime',
        config: {
          inputAudioFormat: 'pcm16',
          outputAudioFormat: 'pcm16',
          inputAudioTranscription: {
            model: 'whisper-1'
          },
          turnDetection: {
            type: 'server_vad',
            threshold: 0.5,
            prefixPaddingMs: 300,
            silenceDurationMs: 1000
          },
          voice: 'alloy'
        }
      });
      
      sessionRef.current = session;

      // ✅ ÉVÉNEMENTS AUDIO ESSENTIELS (audio automatiquement géré par WebRTC)
      session.on('audio', (audioEvent: any) => {
        console.log('🔊 Audio reçu:', audioEvent);
        // Audio automatiquement géré par WebRTC dans le SDK
      });

      // ✅ ÉVÉNEMENTS D'ÉTAT DE PAROLE
      session.on('speaking_started' as any, () => {
        console.log('🗣️ IA commence à parler');
        setIsSpeaking(true);
        setIsListening(false);
      });

      session.on('speaking_stopped' as any, () => {
        console.log('⏸️ IA arrête de parler');
        setIsSpeaking(false);
        setIsListening(true);
        setSessionStats(prev => ({ ...prev, exchanges: prev.exchanges + 1 }));
      });

      // ✅ ÉVÉNEMENT INTERRUPTION
      session.on('audio_interrupted' as any, () => {
        console.log('⚡ Interruption détectée');
        setIsSpeaking(false);
        setIsListening(true);
        setSessionStats(prev => ({ ...prev, interruptions: prev.interruptions + 1 }));
        
        addMessage({
          content: "⚡ Interruption détectée",
          sender: "system",
          timestamp: new Date(),
          type: "interruption"
        });
      });

      // ✅ ÉVÉNEMENT HISTORIQUE
      session.on('history_updated' as any, (history: any[]) => {
        console.log('📝 Historique mis à jour:', history.length, 'éléments');
        
        // Convertir l'historique en messages pour l'UI
        const newMessages = history
          .filter((item: any) => item.type === 'message')
          .map((item: any) => {
            // Gestion sécurisée du contenu selon les types
            let content = 'Message audio';
            if (item.content?.[0]) {
              const contentItem = item.content[0];
              if (contentItem.type === 'input_text' || contentItem.type === 'output_text') {
                content = contentItem.text || 'Texte vide';
              } else if (contentItem.type === 'input_audio') {
                content = contentItem.transcript || 'Audio sans transcription';
              } else if (contentItem.type === 'output_audio') {
                content = contentItem.transcript || 'Réponse audio';
              }
            }
            
            return {
              content,
              sender: item.role === 'user' ? 'user' as const : 'assistant' as const,
              timestamp: new Date(),
              type: (item.content?.[0]?.type?.includes('audio')) ? 'audio' as const : 'text' as const
            };
          });
        
        setMessages(newMessages);
      });

      // ✅ ÉVÉNEMENTS DE CONNEXION
      session.on('session.created' as any, () => {
        console.log('🎯 Session créée avec succès');
      });

      session.on('session.updated' as any, () => {
        console.log('🔄 Session mise à jour');
      });

      // Connexion avec token éphémère (recommandé par OpenAI)
      await session.connect({
        apiKey: tokenData.value
      });

      console.log('✅ Session Agents SDK connectée avec tous les événements');
      setIsConnected(true);
      setIsConnecting(false);
      setIsListening(true);
      
      toast({
        title: "🎯 Coach IA Connecté",
        description: "Parlez maintenant, l'IA vous écoute et répondra.",
      });

      addMessage({ 
        content: "🚀 Coach vocal prêt. Commencez votre présentation commerciale.", 
        sender: "system", 
        timestamp: new Date(),
        type: "text"
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

  // Terminer la session avec nettoyage complet
  const endSession = async () => {
    if (sessionRef.current) {
      console.log('🧹 Déconnexion session Agents SDK');
      
      try {
        await (sessionRef.current as any).disconnect();
        console.log('✅ Session déconnectée proprement');
      } catch (error) {
        console.error('❌ Erreur lors de la déconnexion:', error);
      }
      
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
    if (sessionRef.current && (sessionRef.current as any).interrupt) {
      console.log('⚡ Interruption manuelle déclenchée');
      await (sessionRef.current as any).interrupt();
      
      toast({
        title: "⚡ Interruption",
        description: "Réponse de l'IA interrompue",
      });
    }
  };

  // Envoyer un message texte
  const sendTextMessage = async (text: string) => {
    if (sessionRef.current && (sessionRef.current as any).sendMessage) {
      console.log('📝 Envoi message texte:', text);
      await (sessionRef.current as any).sendMessage(text);
      
      addMessage({
        content: text,
        sender: "user",
        timestamp: new Date(),
        type: "text"
      });
    }
  };

  // Ajouter un message
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  // Nettoyage complet des événements
  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        // Nettoyage correct de tous les listeners
        (sessionRef.current as any).removeAllListeners?.();
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