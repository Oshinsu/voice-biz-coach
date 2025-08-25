import React, { useState, useEffect } from 'react';
import { Mic, MicOff, MessageCircle, X, Minimize2, Maximize2, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { EnhancedScenario } from '@/data/enrichedScenarios';

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
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPhase, setCurrentPhase] = useState("Découverte");

  // Get contextual coaching based on scenario
  const getContextualCoaching = () => {
    if (!scenario) return "Sélectionnez un scénario pour commencer";
    
    return {
      "Découverte": `Objectif: Comprendre ${scenario.company.name}. Questions clés: ${scenario.interlocutor.priorities.slice(0, 2).join(", ")}`,
      "Démonstration": `Focus: Montrer la valeur de ${scenario.product.name}. Mettre en avant: ${scenario.product.competitiveAdvantages.slice(0, 2).join(", ")}`,
      "Objections": `Préparez-vous aux objections probables: ${scenario.probableObjections.slice(0, 2).map(obj => obj.objection).join(", ")}`,
      "Closing": `Objectif: ${scenario.salesGoal}. Arguments clés: ${scenario.product.roi}`
    }[currentPhase] || "Concentrez-vous sur l'écoute active";
  };

  const startCoversation = () => {
    setIsConnecting(true);
    
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: scenario 
          ? `Bonjour ! Je suis votre coach pour le scénario ${scenario.title}. Vous allez interagir avec ${scenario.interlocutor.name}, ${scenario.interlocutor.role} chez ${scenario.company.name}. Votre objectif : ${scenario.salesGoal}. Prêt à commencer ?`
          : "Bonjour ! Je suis votre coach vocal. Commençons par sélectionner un scénario.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages([welcomeMessage]);
    }, 2000);
  };

  const endConversation = () => {
    setIsConnected(false);
    setIsSpeaking(false);
    setMessages([]);
  };

  // Simulate coaching feedback based on scenario
  useEffect(() => {
    if (isConnected && scenario) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of coaching tip
          const tips = [
            `N'oubliez pas que ${scenario.interlocutor.name} est ${scenario.interlocutor.personality}. Adaptez votre approche.`,
            `Point clé à mentionner : ${scenario.product.roi}`,
            `Attention à l'objection probable : "${scenario.probableObjections[0]?.objection}"`,
            `Votre interlocuteur valorise : ${scenario.interlocutor.priorities[0]}`
          ];
          
          const tip: Message = {
            id: Date.now().toString(),
            content: tips[Math.floor(Math.random() * tips.length)],
            isUser: false,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, tip]);
        }
      }, 15000);
      
      return () => clearInterval(interval);
    }
  }, [isConnected, scenario]);

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
                onClick={startCoversation} 
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
                onClick={startCoversation} 
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