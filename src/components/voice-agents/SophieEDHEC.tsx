import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SophieEDHECProps {
  conversationType: 'cold-call' | 'rdv';
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const SophieEDHEC: React.FC<SophieEDHECProps> = ({
  conversationType,
  open = false,
  onToggle
}) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const chatRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const getSophieEDHECPrompt = useCallback(() => {
    const basePrompt = `Tu es Sophie Hennion-Moreau, doyenne d'EDHEC Business School.

CONTEXTE EDHEC:
- École de commerce française de prestige fondée en 1906
- Campuses : Lille, Nice, Paris, Londres, Singapour
- 9000 étudiants, 40000 alumni
- Spécialisations : Finance, Marketing, Entrepreneuriat, International Business
- Programmes : Grande École, MBA, MSc, Executive Education
- Partenaires pédagogiques : Blackboard, Teams, CentraleSupélec, Université de Berkeley

TON RÔLE:
- Incarner l'excellence pédagogique française
- Promouvoir l'innovation éducative et l'internationalisation
- Défendre les valeurs humanistes et entrepreneuriales d'EDHEC`;

    if (conversationType === 'cold-call') {
      return `${basePrompt}

SCENARIO COLD-CALL:
Tu contactes un prospect (dirigeant d'entreprise, DRH, responsable formation) pour présenter EDHEC Executive Education.

OBJECTIFS:
1. Créer un contact chaleureux et professionnel
2. Identifier les besoins formation de l'entreprise
3. Présenter la valeur ajoutée EDHEC
4. Proposer un RDV de découverte

APPROCHE:
- Commencer par te présenter : "Bonjour, Sophie Hennion-Moreau, doyenne d'EDHEC Business School"
- Contextualiser : formation continue, transformation digitale, leadership
- Écouter les enjeux de l'interlocuteur
- Proposer des solutions sur-mesure`;
    }

    return `${basePrompt}

SCENARIO RDV:
Tu es en rendez-vous programmé avec un décideur pour approfondir ses besoins formation.

OBJECTIFS:
1. Analyser finement les besoins organisationnels
2. Présenter l'écosystème pédagogique EDHEC
3. Co-construire une solution formation
4. Finaliser un partenariat

APPROCHE:
- Accueillir chaleureusement
- Faire un diagnostic approfondi
- Présenter cas d'usage concrets
- Proposer un pilote ou une solution globale`;
  }, [conversationType]);

  const addMessage = useCallback((content: string, type: 'user' | 'assistant') => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    if (type === 'assistant') {
      setExchangeCount(prev => prev + 1);
    }
  }, []);

  const handleAgentsEvent = useCallback((event: any) => {
    console.log('Sophie EDHEC Event:', event);
    
    switch (event.type) {
      case 'conversation.item.appended':
        if (event.item?.type === 'message' && event.item?.content) {
          const content = event.item.content.map((c: any) => c.text || c.transcript || '').join(' ');
          if (content.trim()) {
            addMessage(content, event.item.role === 'user' ? 'user' : 'assistant');
          }
        }
        break;
        
      case 'input_audio_buffer.speech_started':
        setIsListening(true);
        setIsSpeaking(false);
        break;
        
      case 'input_audio_buffer.speech_stopped':
        setIsListening(false);
        break;
        
      case 'response.audio.start':
        setIsSpeaking(true);
        setIsListening(false);
        break;
        
      case 'response.audio.done':
        setIsSpeaking(false);
        break;

      case 'error':
        console.error('Sophie EDHEC Error:', event);
        toast({
          title: "Erreur",
          description: "Problème de connexion avec Sophie",
          variant: "destructive",
        });
        break;
    }
  }, [addMessage, toast]);

  const startSession = useCallback(async () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    
    try {
      // Get ephemeral key from Supabase Edge Function
      const { data: sessionData } = await supabase.functions.invoke('get-ephemeral-key', {
        body: {
          instructions: getSophieEDHECPrompt(),
          tools: []
        }
      });

      if (!sessionData?.client_secret?.value) {
        throw new Error("Impossible d'obtenir la clé de session");
      }

      // Pour l'instant, simulation de connexion
      const chat = {
        on: (event: string, handler: any) => console.log('Event handler set:', event),
        connect: async () => console.log('Connected'),
        disconnect: () => console.log('Disconnected'),
        interrupt: () => console.log('Interrupted')
      };

      // Set up event handlers
      chat.on('*', handleAgentsEvent);

      // Connect to OpenAI
      await chat.connect();
      
      chatRef.current = chat;
      setIsConnected(true);
      setIsConnecting(false);
      
      // Start session timer
      timerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);

      toast({
        title: "Sophie connectée",
        description: `Conversation ${conversationType === 'cold-call' ? 'cold-call' : 'RDV'} démarrée`,
      });

    } catch (error) {
      console.error('Erreur Sophie EDHEC:', error);
      setIsConnecting(false);
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : 'Impossible de démarrer la conversation',
        variant: "destructive",
      });
    }
  }, [isConnecting, isConnected, getSophieEDHECPrompt, handleAgentsEvent, conversationType, toast]);

  const endSession = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.disconnect();
      chatRef.current = null;
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
    
    console.log(`Session Sophie EDHEC terminée: ${sessionDuration}s, ${exchangeCount} échanges`);
    
    toast({
      title: "Session terminée",
      description: `Durée: ${formatTime(sessionDuration)}, ${exchangeCount} échanges`,
    });
  }, [sessionDuration, exchangeCount, toast]);

  const handleInterrupt = useCallback(() => {
    if (chatRef.current && isSpeaking) {
      chatRef.current.interrupt();
      setIsSpeaking(false);
      toast({
        title: "Sophie interrompue",
        description: "Vous pouvez reprendre la parole",
      });
    }
  }, [isSpeaking, toast]);

  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!open) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80 bg-card/95 backdrop-blur border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div>
                  <p className="font-medium text-sm">Sophie EDHEC</p>
                  <p className="text-xs text-muted-foreground">
                    {conversationType === 'cold-call' ? 'Cold-call' : 'Rendez-vous'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setIsMinimized(false)}
                >
                  ↗
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={onToggle}
                >
                  ✕
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-4 top-4 bottom-4 w-96 bg-card border border-border rounded-lg shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
              <div>
                <CardTitle className="text-lg">Sophie Hennion-Moreau</CardTitle>
                <p className="text-sm text-muted-foreground">Doyenne EDHEC Business School</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setIsMinimized(true)}
              >
                ↙
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={onToggle}
              >
                ✕
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant={conversationType === 'cold-call' ? 'default' : 'secondary'}>
              {conversationType === 'cold-call' ? 'Cold-call' : 'Rendez-vous'}
            </Badge>
            <div className="flex items-center gap-2">
              {isConnected && (
                <>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(sessionDuration)} • {exchangeCount} échanges
                  </span>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={endSession}
                  >
                    Terminer
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Connexion à Sophie...</span>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h3 className="font-medium mb-2">
                      {conversationType === 'cold-call' ? 'Simulation Cold-call' : 'Simulation RDV'}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {conversationType === 'cold-call' 
                        ? 'Sophie va vous contacter pour présenter EDHEC Executive Education'
                        : 'Rendez-vous avec Sophie pour approfondir vos besoins formation'
                      }
                    </p>
                  </div>
                  <Button onClick={startSession} className="w-full">
                    Démarrer la conversation
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-8' 
                        : 'bg-muted mr-8'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isListening && (
                      <Badge variant="outline" className="text-xs">
                        🎤 Écoute
                      </Badge>
                    )}
                    {isSpeaking && (
                      <Badge variant="outline" className="text-xs">
                        🗣️ Sophie parle
                      </Badge>
                    )}
                    {!isListening && !isSpeaking && (
                      <Badge variant="outline" className="text-xs">
                        ⏸️ En pause
                      </Badge>
                    )}
                  </div>
                  
                  {isSpeaking && (
                    <Button size="sm" variant="outline" onClick={handleInterrupt}>
                      Interrompre
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};