import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { SophiePsychologicalStateManager } from '@/lib/cognitive/sophie-psychological-state';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';

interface VoiceInterfaceProps {
  conversationType: 'cold-call' | 'rdv';
  onSpeakingChange: (speaking: boolean) => void;
  onStateChange?: (connected: boolean) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  conversationType, 
  onSpeakingChange,
  onStateChange 
}) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const chatRef = useRef<RealtimeChat | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [psychologicalState] = useState(() => SophiePsychologicalStateManager.generateRandomState());

  useEffect(() => {
    if (isConnected && timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    } else if (!isConnected && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isConnected]);

  const handleMessage = (event: any) => {
    console.log('Voice event received:', event.type, event);
    setEvents(prev => [...prev.slice(-10), event]); // Keep last 10 events
    
    // Handle different event types
    switch (event.type) {
      case 'response.audio.delta':
        if (!isSpeaking) {
          setIsSpeaking(true);
          onSpeakingChange(true);
        }
        break;
      case 'response.audio.done':
        setIsSpeaking(false);
        onSpeakingChange(false);
        break;
      case 'response.created':
        console.log('Sophie started responding');
        break;
      case 'response.done':
        console.log('Sophie finished responding');
        break;
      case 'session.created':
        console.log('Session created successfully');
        break;
      case 'session.updated':
        console.log('Session updated');
        break;
      case 'error':
        console.error('Voice session error:', event);
        toast({
          title: "Erreur vocale",
          description: event.error?.message || 'Erreur inconnue',
          variant: "destructive",
        });
        break;
    }
  };

  const startConversation = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setSessionDuration(0);
    
    try {
      console.log('Starting conversation with Sophie Martin...', {
        conversationType,
        psychologicalState: {
          mentalState: psychologicalState.mentalState,
          currentMood: psychologicalState.currentMood,
          patienceLevel: psychologicalState.patienceLevel
        }
      });

      chatRef.current = new RealtimeChat(handleMessage);
      await chatRef.current.init(conversationType, psychologicalState);
      
      setIsConnected(true);
      onStateChange?.(true);
      
      toast({
        title: "Connexion établie",
        description: `Sophie Martin est maintenant en ligne (${conversationType})`,
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : 'Impossible de se connecter',
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const endConversation = () => {
    console.log('Ending conversation...');
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsSpeaking(false);
    setSessionDuration(0);
    setEvents([]);
    onSpeakingChange(false);
    onStateChange?.(false);
    
    toast({
      title: "Appel terminé",
      description: "Conversation avec Sophie Martin terminée",
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <Card className="fixed bottom-8 left-1/2 -translate-x-1/2 p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg">
      <div className="flex flex-col items-center gap-4 min-w-[300px]">
        {/* Status and Controls */}
        <div className="flex items-center gap-4">
          {!isConnected ? (
            <Button 
              onClick={startConversation}
              disabled={isConnecting}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
            >
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Appeler Sophie Martin
                </div>
              )}
            </Button>
          ) : (
            <Button 
              onClick={endConversation}
              variant="destructive"
              className="px-6 py-2"
            >
              <div className="flex items-center gap-2">
                <PhoneOff className="w-4 h-4" />
                Raccrocher
              </div>
            </Button>
          )}
        </div>

        {/* Session Info */}
        {isConnected && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Sophie parle...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  À votre tour
                </div>
              )}
            </div>
            <div>Durée: {formatDuration(sessionDuration)}</div>
          </div>
        )}

        {/* Psychological State Display */}
        {isConnected && (
          <div className="text-xs text-muted-foreground border rounded p-2 bg-muted/50">
            <div className="font-medium mb-1">État psychologique Sophie:</div>
            <div>Mental: {psychologicalState.mentalState}</div>
            <div>Humeur: {psychologicalState.currentMood}</div>
            <div>Patience: {psychologicalState.patienceLevel}/5</div>
          </div>
        )}

        {/* Recent Events */}
        {events.length > 0 && (
          <div className="text-xs text-muted-foreground max-w-sm">
            <div className="font-medium mb-1">Derniers événements:</div>
            <div className="max-h-20 overflow-y-auto space-y-1">
              {events.slice(-3).map((event, i) => (
                <div key={i} className="text-xs opacity-70">
                  {event.type}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceInterface;