import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mic, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  Minimize2, 
  Maximize2,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSalesStore } from "@/store/salesStore";

export const VoiceCoachWidget = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const { selectedScenario } = useSalesStore();

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Simuler une connexion (remplacer par vraie logique)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      
      const welcomeMessage = selectedScenario 
        ? `Bonjour ! Je suis votre coach commercial pour le scénario "${selectedScenario.title}". Comment puis-je vous aider aujourd'hui ?`
        : "Bonjour ! Je suis votre coach commercial. Sélectionnez un scénario pour commencer.";
      
      setTranscript([welcomeMessage]);
      
      toast({
        title: "Connexion établie",
        description: "Votre coach vocal est prêt à vous accompagner",
      });

    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au coach vocal",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [toast, selectedScenario]);

  const endConversation = useCallback(() => {
    setIsConnected(false);
    setIsSpeaking(false);
    setTranscript([]);
    
    toast({
      title: "Session terminée",
      description: "Votre session de coaching est terminée",
    });
  }, [toast]);

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className={cn(
            "rounded-full h-16 w-16 shadow-lg",
            isConnected 
              ? "bg-success hover:bg-success/90 animate-pulse" 
              : "bg-primary hover:bg-primary/90"
          )}
        >
          {isConnected ? (
            <Mic className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80">
      <Card className="shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                isConnected ? "bg-success animate-pulse" : "bg-muted"
              )} />
              Coach Vocal
            </CardTitle>
            <div className="flex gap-1">
              {isConnected && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="h-8 w-8 p-0"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Status */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isConnected ? "Connecté - Parlez naturellement" : 
               isConnecting ? "Connexion en cours..." : "Déconnecté"}
            </p>
            {isSpeaking && (
              <div className="flex justify-center space-x-1 mt-2">
                <div className="w-1 h-4 bg-primary rounded animate-pulse" />
                <div className="w-1 h-4 bg-primary rounded animate-pulse delay-100" />
                <div className="w-1 h-4 bg-primary rounded animate-pulse delay-200" />
              </div>
            )}
          </div>

          {/* Transcript */}
          {transcript.length > 0 && (
            <div className="max-h-32 overflow-y-auto bg-muted/30 rounded-lg p-3 space-y-2">
              {transcript.slice(-3).map((message, index) => (
                <p key={index} className="text-sm">
                  <span className="font-medium text-primary">Coach:</span> {message}
                </p>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center space-x-2">
            {!isConnected ? (
              <Button
                onClick={startConversation}
                disabled={isConnecting}
                className="flex-1"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 mr-2" />
                    Démarrer
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={endConversation}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                Terminer
              </Button>
            )}
          </div>

          {/* Current Scenario */}
          {selectedScenario && (
            <div className="text-xs text-center text-muted-foreground bg-primary/5 rounded-lg p-2">
              <p className="font-medium">Scénario actuel:</p>
              <p>{selectedScenario.title}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};