import { RealtimeWebRTCCoach, handleWebRTCError } from "@/lib/openai-webrtc";
import { generateContactPrompt, generateFeedbackPrompt } from "@/lib/scenario-prompts";
import { useSalesStore } from "@/store/salesStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneCall, Mic, MicOff, MessageSquare, Minimize2, Maximize2, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface EnhancedVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  content: string;
  sender: "user" | "assistant" | "system" | "contact" | "coach";
  timestamp: Date;
}

export function EnhancedVoiceCoach({ scenario, open = true, onToggle }: EnhancedVoiceCoachProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState("ouverture");
  const [isInFeedbackMode, setIsInFeedbackMode] = useState(false);
  const voiceCoachRef = useRef<RealtimeWebRTCCoach | null>(null);

  const startConversation = async () => {
    try {
      setError(null);
      
      if (!scenario) {
        setError("Aucun scénario sélectionné");
        return;
      }

      const apiKey = prompt("Entrez votre clé API OpenAI:");
      if (!apiKey) {
        setError("Clé API requise");
        return;
      }

      voiceCoachRef.current = new RealtimeWebRTCCoach(apiKey);
      
      const coach = voiceCoachRef.current;
      
      // Configuration des callbacks
      coach.onSessionReady = () => {
        setIsConnected(true);
        setIsConnecting(false);
        setIsInFeedbackMode(false);
        addMessage(`Contact est maintenant en ligne`, "system");
      };

      coach.onSpeechStarted = () => {
        setIsRecording(true);
      };

      coach.onSpeechStopped = () => {
        setIsRecording(false);
      };

      coach.onResponseStarted = () => {
        setIsSpeaking(true);
      };

      coach.onResponseCompleted = (response) => {
        setIsSpeaking(false);
        if (response?.output?.[0]?.content?.[0]?.text) {
          const sender = isInFeedbackMode ? "coach" : "contact";
          addMessage(response.output[0].content[0].text, sender);
        }
      };

      coach.onTranscriptDelta = (delta) => {
        // Optionnel : afficher la transcription en temps réel
      };

      coach.onError = (error) => {
        setError(error);
        setIsConnected(false);
        setIsConnecting(false);
      };

      setIsConnecting(true);
      
      // Instructions contextuelles - le coach joue le rôle du contact
      const contactPrompt = generateContactPrompt(scenario, currentPhase);
      await coach.connect(contactPrompt);

    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(handleWebRTCError(error));
      setIsConnecting(false);
    }
  };

  const endConversation = () => {
    if (voiceCoachRef.current) {
      voiceCoachRef.current.disconnect();
      voiceCoachRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
    setIsRecording(false);
    setIsSpeaking(false);
    setIsMuted(false);
    setIsInFeedbackMode(false);
    addMessage("Conversation terminée", "system");
  };

  const startFeedbackMode = async () => {
    if (!voiceCoachRef.current || !scenario) return;
    
    setIsInFeedbackMode(true);
    const feedbackPrompt = generateFeedbackPrompt(scenario);
    
    // Créer une nouvelle session avec le prompt de feedback
    try {
      await voiceCoachRef.current.disconnect();
      const apiKey = prompt("Clé API pour le feedback (même que précédemment):");
      if (!apiKey) return;
      
      voiceCoachRef.current = new RealtimeWebRTCCoach(apiKey);
      const coach = voiceCoachRef.current;
      
      // Reconfigurer les callbacks
      coach.onSessionReady = () => {
        addMessage("Coach prêt pour le débrief", "system");
      };
      
      coach.onResponseCompleted = (response) => {
        setIsSpeaking(false);
        if (response?.output?.[0]?.content?.[0]?.text) {
          addMessage(response.output[0].content[0].text, "coach");
        }
      };
      
      await coach.connect(feedbackPrompt);
    } catch (error) {
      console.error("Erreur lors du basculement en mode feedback:", error);
      setError("Impossible de basculer en mode feedback");
    }
  };

  const toggleMute = () => {
    if (voiceCoachRef.current) {
      const isMutedNow = voiceCoachRef.current.toggleMute();
      setIsMuted(isMutedNow);
    }
  };

  const addMessage = (content: string, sender: "user" | "assistant" | "system" | "contact" | "coach") => {
    const newMessage: Message = {
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getContextualCoaching = () => {
    if (!scenario) return "Aucun scénario sélectionné";
    
    if (isInFeedbackMode) {
      return "💬 Mode débrief activé - Analysez votre performance avec le coach";
    }
    
    const phaseAdvice = {
      ouverture: `🎯 Vous parlez à un contact. Créez du rapport et obtenez quelques minutes d'attention`,
      decouverte: `🔍 Découvrez les vrais besoins de votre contact. Focus sur: ${scenario.pain_points?.slice(0,2).join(", ") || "les problématiques identifiées"}`,
      demonstration: `💡 Montrez comment votre solution résout les problèmes de ${scenario.company_name}`, 
      objections: `⚡ Votre contact peut objecter sur: ${scenario.pain_points?.slice(0,2).join(", ") || "les points de blocage"}`,
      closing: `🎪 Proposez une prochaine étape concrète à votre contact`
    };

    return phaseAdvice[currentPhase as keyof typeof phaseAdvice] || "Continuez la conversation";
  };

  useEffect(() => {
    return () => {
      if (voiceCoachRef.current) {
        voiceCoachRef.current.disconnect();
      }
    };
  }, []);

  // Rendu conditionnel selon l'état
  if (!open) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggle}
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64 shadow-xl border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium">
                  Contact
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setIsMinimized(false)}>
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onToggle}>
                  ×
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-muted-foreground">
              {isConnected ? `${scenario?.company_name} - En ligne` : "Hors ligne"}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 h-[600px] shadow-xl border-primary/20 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
              <CardTitle className="text-lg">
                {isInFeedbackMode ? "Coach Commercial" : "Contact"}
              </CardTitle>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)}>
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onToggle?.()}>
                ×
              </Button>
            </div>
          </div>
          {scenario && !isInFeedbackMode && (
            <div className="text-sm text-muted-foreground">
              Contact commercial chez {scenario.company_name}
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4">
          {/* Coaching contextuel */}
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <h4 className="text-sm font-medium mb-2">
              {isInFeedbackMode ? "Analyse de performance" : "Votre contact"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {getContextualCoaching()}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {isInFeedbackMode ? "Mode Débrief" : `Phase: ${currentPhase}`}
              </Badge>
              {scenario && (
                <Badge variant="outline" className="text-xs">
                  {scenario.difficulty}
                </Badge>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 p-2 rounded max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : message.sender === 'system'
                  ? 'bg-muted text-muted-foreground text-center text-xs'
                  : message.sender === 'contact'
                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                  : message.sender === 'coach'
                  ? 'bg-green-100 text-green-900 border border-green-200'
                  : 'bg-muted'
              }`}>
                {message.sender === 'contact' && (
                  <div className="text-xs font-medium text-blue-700 mb-1">
                    Contact
                  </div>
                )}
                {message.sender === 'coach' && (
                  <div className="text-xs font-medium text-green-700 mb-1">
                    Coach Commercial
                  </div>
                )}
                <div className="text-sm">{message.content}</div>
                <div className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          {/* Contrôles */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Badge className="bg-green-100 text-green-800">
                    {isInFeedbackMode ? "Coach connecté" : "Contact en ligne"}
                  </Badge>
                ) : (
                  <Badge variant="outline">Déconnecté</Badge>
                )}
                {isRecording && (
                  <Badge className="bg-red-100 text-red-800">Vous parlez</Badge>
                )}
                {isSpeaking && (
                  <Badge className="bg-blue-100 text-blue-800">
                    {isInFeedbackMode ? "Coach parle" : "Contact parle"}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {!isConnected ? (
                <Button 
                  onClick={startConversation} 
                  disabled={isConnecting}
                  className="flex-1 gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {isConnecting ? "Connexion..." : "Appeler le contact"}
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={endConversation}
                    variant="destructive"
                    className="flex-1 gap-2"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Raccrocher
                  </Button>
                  {!isInFeedbackMode && (
                    <Button
                      onClick={startFeedbackMode}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Débrief
                    </Button>
                  )}
                  <Button
                    onClick={toggleMute}
                    variant={isMuted ? "destructive" : "secondary"}
                    size="sm"
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </>
              )}
            </div>

            {error && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs text-destructive">
                {error}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}