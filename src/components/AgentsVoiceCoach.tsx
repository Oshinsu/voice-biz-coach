import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AgentsVoiceCoachProps {
  scenario?: any;
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  content: string;
  sender: "user" | "assistant" | "system";
  timestamp: Date;
}

export function AgentsVoiceCoach({ scenario, open = true, onToggle }: AgentsVoiceCoachProps) {
  const { toast } = useToast();
  
  // États de base
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Démarrer une conversation simplifiée
  const startConversation = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Pour l'instant, simuler une connexion réussie
      // En attendant l'implémentation complète des Agents SDK
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsConnected(true);
      setIsConnecting(false);

      toast({
        title: "Mode Simulation",
        description: "Migration vers Agents SDK en cours...",
      });

      addMessage({ 
        content: "🚧 Migration vers OpenAI Agents SDK en cours. Interface temporaire active.", 
        sender: "system", 
        timestamp: new Date() 
      });

    } catch (error: any) {
      console.error('Erreur:', error);
      setError(error.message || 'Erreur de connexion');
      setIsConnecting(false);
      
      toast({
        title: "Erreur",
        description: "Migration en cours - fonctionnalité temporairement indisponible",
        variant: "destructive",
      });
    }
  };

  // Arrêter la conversation
  const endConversation = () => {
    setIsConnected(false);
    setError(null);

    toast({
      title: "Session terminée",
      description: "Interface déconnectée",
    });

    addMessage({ 
      content: "📞 Session terminée.", 
      sender: "system", 
      timestamp: new Date() 
    });
  };

  // Ajouter un message
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 z-50 bg-background border-l shadow-lg">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b bg-muted/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Coach Vocal (Migration)</CardTitle>
            {onToggle && (
              <Button variant="ghost" size="sm" onClick={onToggle}>
                ✕
              </Button>
            )}
          </div>
          
          <Badge variant={isConnected ? "default" : "secondary"}>
            {isConnecting ? "Connexion..." : isConnected ? "Simulation Active" : "Déconnecté"}
          </Badge>
        </CardHeader>

        <CardContent className="p-4 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[85%] ${
                  message.sender === "system" 
                    ? "bg-accent text-accent-foreground text-center mx-auto text-sm" 
                    : "bg-muted"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          {/* Erreur */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Contrôles */}
          <div className="flex gap-2">
            {!isConnected ? (
              <Button
                onClick={startConversation}
                disabled={isConnecting}
                className="flex-1"
              >
                {isConnecting ? "Migration..." : "Test Migration"}
              </Button>
            ) : (
              <Button
                onClick={endConversation}
                variant="outline"
                className="flex-1"
              >
                Terminer Test
              </Button>
            )}
          </div>

          {/* Info migration */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              🚧 Migration vers OpenAI Agents SDK en cours. Cette interface est temporaire 
              en attendant l'implémentation complète du nouveau système.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}