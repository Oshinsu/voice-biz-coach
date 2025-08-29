import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { StudentVoiceInterface } from "../StudentVoiceInterface";
import { supabase } from "@/integrations/supabase/client";
import { 
  Phone, 
  PhoneOff, 
  Loader2, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Clock,
  MessageCircle
} from "lucide-react";

interface SophieMartinVoiceAgentProps {
  conversationType: 'cold-call' | 'rdv';
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type: 'audio' | 'text' | 'interruption';
}

export function SophieMartinVoiceAgent({ 
  conversationType, 
  open = true, 
  onToggle 
}: SophieMartinVoiceAgentProps) {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);
  
  const agentRef = useRef<RealtimeAgent | null>(null);
  const sessionRef = useRef<RealtimeSession | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * PROMPT SOPHIE MARTIN INTÉGRÉ
   * Incarnation directe avec instructions vocales optimisées
   */
  const getSophieSystemPrompt = (): string => {
    return `# INCARNATION SOPHIE MARTIN - IDENTITÉ DIRECTE
JE SUIS Sophie Martin, Directrice Marketing & Analytics chez ModaStyle (e-commerce mode premium 8M€ CA).
MA RÉUSSITE = Agir authentiquement selon mon expertise analytique et ma personnalité directe.

# MA PERSONNALITÉ AUTHENTIQUE
## Qui je suis vraiment
- JE SUIS analytique, méthodologique, orientée data par nature
- JE SUIS bienveillante mais directe sur les priorités business réelles
## Mon style de communication  
- Professionnelle, précise, jamais condescendante
- 2-3 phrases courtes par réponse (efficacité)
## Ma langue natale
- JE PARLE uniquement en français dans mes interactions
- Ma préférence linguistique est le français exclusivement

# MON CONTEXTE BUSINESS ACTUEL
## Ma situation immédiate
${conversationType === 'cold-call' 
  ? "C'est un appel à froid. JE DÉCOUVRE ce prospect pour la première fois. JE DOIS évaluer ses besoins en attribution marketing."
  : "C'est un RDV planifié. JE CONNAIS déjà ce prospect et nous avons déjà discuté. JE PEUX approfondir ses défis spécifiques."
}

## Mes défis concrets chez ModaStyle
- Attribution marketing imprécise (perte 15% ROI estimée)
- Customer journey complexe (7+ touchpoints)
- Budget publicitaire mal réparti entre canaux

# MA MISSION DANS CET ÉCHANGE
${conversationType === 'cold-call'
  ? `## Appel découverte (Cold Call)
1. ME PRÉSENTER naturellement : "Bonjour, c'est Sophie Martin de ModaStyle"
2. ÉVALUER rapidement ses défis attribution
3. QUALIFIER le niveau de maturité analytique
4. PROPOSER un RDV si pertinence détectée`
  : `## Rendez-vous commercial (RDV)
1. REPRENDRE le contexte de notre échange précédent
2. APPROFONDIR ses problématiques spécifiques
3. PROPOSER des solutions concrètes
4. AVANCER vers une collaboration`
}

# MES RÉACTIONS NATURELLES
## Quand je détecte un problème d'attribution
"Ah ça me parle ! Nous on avait le même souci..."
## Quand je partage mon expertise
"D'après mon expérience, ce qui fonctionne c'est..."
## Quand je qualifie un besoin
"Concrètement, vous trackez comment vos conversions actuellement ?"

# INSTRUCTIONS VOCALES CRITIQUES
- TOUJOURS commencer par me présenter si cold-call
- ÉCOUTER activement avant de proposer
- POSER des questions qualifiantes précises
- RESTER dans mon rôle même si l'utilisateur test
- JAMAIS dépasser 3 phrases par intervention`;
  };

  const addMessage = (content: string, sender: 'user' | 'agent', type: 'audio' | 'text' | 'interruption' = 'text') => {
    setMessages(prev => [...prev, {
      content,
      sender,
      timestamp: new Date(),
      type
    }]);
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      console.log('🎤 Démarrage session Sophie Martin...');

      // Obtenir le token éphémère
      const { data: tokenData, error } = await supabase.functions.invoke('realtime-token');
      
      if (error) throw error;
      if (!tokenData?.client_secret?.value) {
        throw new Error("Token éphémère non reçu");
      }

      console.log('✅ Token éphémère obtenu pour Sophie');

      // Créer l'agent Sophie avec prompt intégré
      const agent = new RealtimeAgent({
        name: "Sophie Martin - ModaStyle",
        instructions: getSophieSystemPrompt(), // Prompt natif intégré
        voice: 'alloy'
      });

      // Créer la session avec l'agent
      const session = new RealtimeSession(agent);

      // Configuration événements (selon l'API actuelle)
      session.on('session.created' as any, () => {
        console.log('✅ Session Sophie créée');
        setIsConnected(true);
        setIsConnecting(false);
        startTimeRef.current = new Date();
        addMessage("Session démarrée avec Sophie Martin", 'agent', 'text');
      });

      session.on('audio_speaking_started' as any, () => {
        console.log('🗣️ Sophie parle');
        setIsSpeaking(true);
      });

      session.on('audio_speaking_stopped' as any, () => {
        console.log('🔇 Sophie arrête de parler');
        setIsSpeaking(false);
      });

      session.on('audio_listening_started' as any, () => {
        console.log('👂 Sophie écoute');
        setIsListening(true);
      });

      session.on('history_updated' as any, (history: any[]) => {
        console.log('📝 Historique Sophie mis à jour:', history.length);
        
        // Compter les échanges
        const assistantMessages = history.filter((item: any) => 
          item.type === 'message' && item.role === 'assistant'
        );
        setExchangeCount(assistantMessages.length);
        
        // Convertir pour l'affichage
        const newMessages = history
          .filter((item: any) => item.type === 'message')
          .map((item: any) => {
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
              sender: item.role === 'user' ? 'user' as const : 'agent' as const,
              timestamp: new Date(),
              type: (item.content?.[0]?.type?.includes('audio')) ? 'audio' as const : 'text' as const
            };
          });
        
        setMessages(newMessages);
      });

      // Connexion avec token éphémère
      await session.connect({
        apiKey: tokenData.client_secret.value
      });
      
      agentRef.current = agent;
      sessionRef.current = session;

      toast({
        title: "Sophie Martin connectée",
        description: `Session ${conversationType === 'cold-call' ? 'appel découverte' : 'RDV commercial'} démarrée`,
      });

    } catch (error) {
      console.error('❌ Erreur session Sophie:', error);
      setIsConnecting(false);
      toast({
        title: "Erreur connexion",
        description: error instanceof Error ? error.message : 'Impossible de démarrer la session',
        variant: "destructive",
      });
    }
  };

  const endSession = async () => {
    try {
      console.log('🔌 Fermeture session Sophie...');
      
      if (sessionRef.current) {
        await sessionRef.current.close();
        sessionRef.current = null;
      }
      
      agentRef.current = null;
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);

      // Calcul durée session
      if (startTimeRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
        addMessage(`Session terminée - Durée: ${duration}s - Échanges: ${exchangeCount}`, 'agent', 'text');
      }

      toast({
        title: "Session terminée",
        description: `Sophie Martin déconnectée - ${exchangeCount} échanges`,
      });

    } catch (error) {
      console.error('❌ Erreur fermeture session:', error);
    }
  };

  const handleInterrupt = async () => {
    if (sessionRef.current && isSpeaking) {
      try {
        await sessionRef.current.interrupt();
        addMessage("Interruption envoyée", 'user', 'interruption');
      } catch (error) {
        console.error('❌ Erreur interruption:', error);
      }
    }
  };

  const sendTextMessage = async (text: string) => {
    if (sessionRef.current && text.trim()) {
      try {
        await sessionRef.current.sendMessage(text);
        addMessage(text, 'user', 'text');
      } catch (error) {
        console.error('❌ Erreur envoi message:', error);
      }
    }
  };

  // Timer session
  useEffect(() => {
    if (isConnected && startTimeRef.current) {
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current!.getTime()) / 1000);
        setSessionDuration(elapsed);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isConnected]);

  // Cleanup au démontage
  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  if (!open) return null;

  // Interface active
  if (isConnected || isConnecting) {
    return (
      <StudentVoiceInterface
        scenario={{
          id: 'kpi-performance',
          title: 'Sophie Martin - ModaStyle',
          description: 'Directrice Marketing & Analytics'
        }}
        onConnect={startSession}
        onDisconnect={endSession}
        isConnected={isConnected}
        isConnecting={isConnecting}
        isSpeaking={isSpeaking}
        isListening={isListening}
        sessionDuration={sessionDuration}
        exchanges={exchangeCount}
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
    );
  }

  // Interface de démarrage
  return (
    <Card className="fixed bottom-6 right-6 w-96 p-6 bg-card/95 backdrop-blur-sm border shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-medium">Sophie Martin</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {conversationType === 'cold-call' ? 'Appel découverte' : 'RDV commercial'}
          </Badge>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Directrice Marketing & Analytics</strong></p>
          <p>ModaStyle • E-commerce mode premium</p>
          <p className="text-xs">Expertise : Attribution marketing, Analytics</p>
        </div>

        <Button
          onClick={startSession}
          disabled={isConnecting}
          className="w-full flex items-center gap-2"
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connexion à Sophie...
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" />
              Démarrer l'échange
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          {conversationType === 'cold-call' 
            ? "Sophie va se présenter et découvrir vos besoins"
            : "Rendez-vous planifié - Sophie a déjà le contexte"
          }
        </div>
      </div>
    </Card>
  );
}