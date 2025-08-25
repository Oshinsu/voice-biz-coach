import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, MessageCircle, X, Minimize2, Maximize2, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { RealtimeWebRTCCoach, SALES_COACH_PROMPT, handleWebRTCError } from '@/lib/openai-webrtc';

interface EnhancedVoiceCoachProps {
  scenario?: any; // Accept both Scenario and EnhancedScenario
  isOpen?: boolean;
  onToggle?: () => void;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function EnhancedVoiceCoach({ scenario, isOpen = true, onToggle }: EnhancedVoiceCoachProps) {
  // Fixed typo issue - force cache refresh
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPhase, setCurrentPhase] = useState("Découverte");
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();
  
  const voiceCoachRef = useRef<RealtimeWebRTCCoach | null>(null);

  // Clé API OpenAI pour usage personnel
  const getApiKey = () => {
    return "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";
  };

  // Get contextual coaching based on scenario
  const getContextualCoaching = () => {
    if (!scenario) return "Sélectionnez un scénario pour commencer";
    
    const phaseCoaching = {
      "Découverte": `Objectif: Comprendre ${scenario.company?.name || scenario.title}. Questions clés: découvrir les besoins et pain points`,
      "Démonstration": `Focus: Montrer la valeur de votre solution. Mettre en avant les bénéfices concrets`,
      "Objections": `Préparez-vous aux objections probables. Écoutez et reformulez avant de répondre`,
      "Closing": `Objectif: Finaliser la vente. Proposer les prochaines étapes concrètes`
    };
    
    return phaseCoaching[currentPhase] || "Concentrez-vous sur l'écoute active";
  };

  // Préparer les instructions contextuelles
  const getContextualInstructions = () => {
    if (!scenario) return SALES_COACH_PROMPT;
    
    return `${SALES_COACH_PROMPT}

CONTEXTE DU SCÉNARIO :
- Entreprise : ${scenario.company?.name || "Non spécifié"}
- Secteur : ${scenario.company?.sector || "Non spécifié"}
- Interlocuteur : ${scenario.interlocutor?.name || "Non spécifié"} (${scenario.interlocutor?.role || "Non spécifié"})
- Objectif : ${scenario.salesGoal || scenario.description}
- Phase actuelle : ${currentPhase}

Adapte tes conseils à ce contexte spécifique et aide l'utilisateur à réussir ce scénario de vente.`;
  };

  const startConversation = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      toast({
        title: "Clé API manquante",
        description: "Veuillez configurer votre clé API OpenAI dans les secrets.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      voiceCoachRef.current = new RealtimeWebRTCCoach(apiKey);
      
      // Configurer les callbacks WebRTC
      voiceCoachRef.current.onSessionReady = () => {
        console.log("Session WebRTC prête");
        setIsConnected(true);
        setIsConnecting(false);
        
        toast({
          title: "Coach vocal connecté",
          description: "Vous pouvez maintenant parler avec votre coach commercial.",
        });
      };
      
      voiceCoachRef.current.onSpeechStarted = () => {
        setIsRecording(true);
        setIsSpeaking(false);
      };
      
      voiceCoachRef.current.onSpeechStopped = () => {
        setIsRecording(false);
      };
      
      voiceCoachRef.current.onResponseStarted = () => {
        setIsSpeaking(true);
      };
      
      voiceCoachRef.current.onResponseCompleted = (response) => {
        setIsSpeaking(false);
        if (response.output?.[0]?.content?.[0]?.transcript) {
          const newMessage: Message = {
            id: Date.now().toString(),
            content: response.output[0].content[0].transcript,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, newMessage]);
        }
      };
      
      voiceCoachRef.current.onTranscriptDelta = (delta) => {
        setTranscript(prev => prev + delta);
      };
      
      voiceCoachRef.current.onError = (error) => {
        console.error("Erreur coach vocal WebRTC:", error);
        toast({
          title: "Erreur du coach vocal",
          description: handleWebRTCError(error),
          variant: "destructive",
        });
        setIsConnected(false);
        setIsConnecting(false);
      };

      // Se connecter via WebRTC avec les instructions contextuelles
      await voiceCoachRef.current.connect(getContextualInstructions());
      
    } catch (error) {
      console.error("Erreur connexion:", error);
      setIsConnecting(false);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au coach vocal. Vérifiez votre clé API.",
        variant: "destructive",
      });
    }
  };

  const endConversation = () => {
    if (voiceCoachRef.current) {
      voiceCoachRef.current.disconnect();
      voiceCoachRef.current = null;
    }
    
    setIsConnected(false);
    setIsSpeaking(false);
    setIsRecording(false);
    setMessages([]);
    setTranscript("");
    
    toast({
      title: "Session terminée",
      description: "Votre session de coaching vocal est terminée.",
    });
  };

  const toggleMute = () => {
    if (voiceCoachRef.current) {
      const isMutedNow = voiceCoachRef.current.toggleMute();
      setIsMuted(isMutedNow);
    }
  };

  // Nettoyage à la fermeture du composant
  useEffect(() => {
    return () => {
      if (voiceCoachRef.current) {
        voiceCoachRef.current.disconnect();
      }
    };
  }, []);

  if (!isOpen && !isMinimized) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent-dark shadow-accent z-50"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-80 bg-card/95 backdrop-blur-sm border shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                <CardTitle className="text-sm">Coach Vocal</CardTitle>
                {isConnected && (
                  <Badge variant="secondary" className="text-xs">
                    {currentPhase}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(false)}
                  className="h-6 w-6 p-0"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-xs text-muted-foreground mb-2">
              {getContextualCoaching()}
            </div>
            {!isConnected ? (
              <Button 
                onClick={startConversation}
                disabled={isConnecting}
                size="sm"
                className="w-full bg-accent hover:bg-accent-dark"
              >
                {isConnecting ? (
                  <>
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <Phone className="w-3 h-3 mr-2" />
                    Démarrer
                  </>
                )}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex-1"
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={endConversation}
                  className="flex-1"
                >
                  <PhoneOff className="w-3 h-3 mr-1" />
                  Fin
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] bg-card/95 backdrop-blur-sm border shadow-xl flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-muted'}`} />
              <div>
                <CardTitle className="text-lg">Coach Vocal IA</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {isConnected ? `Connecté • ${currentPhase}` : 'Hors ligne'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 space-y-4">
          {/* Contextual Coaching */}
          {scenario && (
            <div className="p-3 bg-accent/10 rounded-lg">
              <div className="text-xs font-medium text-accent mb-1">Conseil contextualisé:</div>
              <div className="text-xs text-muted-foreground">
                {getContextualCoaching()}
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 h-0">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator />

          {/* Controls */}
          <div className="space-y-2">
            {!isConnected ? (
              <Button 
                onClick={startConversation} 
                disabled={isConnecting}
                className="w-full bg-accent hover:bg-accent-dark"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Connexion au coach...
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 mr-2" />
                    Démarrer la session
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant={isSpeaking ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsSpeaking(!isSpeaking)}
                    className="flex-1"
                  >
                    {isSpeaking ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    {isSpeaking ? 'Parle...' : 'Parler'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={endConversation}
                  className="w-full"
                >
                  <PhoneOff className="w-4 h-4 mr-2" />
                  Terminer la session
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}