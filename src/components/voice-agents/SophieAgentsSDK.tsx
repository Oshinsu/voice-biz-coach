import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { EDHECVoiceAgent } from "@/utils/RealtimeAgents";
import { buildEDHECInstructions } from "@/lib/edhec-prompts";
import { 
  Phone, 
  PhoneOff, 
  Loader2, 
  Mic, 
  MicOff, 
  Volume2, 
  Clock,
  MessageCircle,
  Minimize2,
  Maximize2,
  Zap
} from "lucide-react";

interface SophieAgentsSDKProps {
  conversationType: 'cold-call' | 'rdv';
  open?: boolean;
  onToggle?: () => void;
}

interface HistoryItem {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type: 'audio' | 'transcript' | 'system';
}

export function SophieAgentsSDK({ 
  conversationType = 'cold-call', 
  open = true, 
  onToggle 
}: SophieAgentsSDKProps) {
  const [selectedConversationType, setSelectedConversationType] = useState<'cold-call' | 'rdv'>(conversationType);
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);
  
  const agentRef = useRef<EDHECVoiceAgent | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Gestion de l'historique Agents SDK
   */
  const addToHistory = (role: 'user' | 'assistant' | 'system', content: string, type: 'audio' | 'transcript' | 'system' = 'transcript') => {
    setHistory(prev => [...prev, {
      role,
      content,
      timestamp: new Date(),
      type
    }]);
  };

  /**
   * Gestionnaire événements Agents SDK officiel
   */
  const setupEventHandlers = (agent: EDHECVoiceAgent) => {
    // Événement principal: historique mis à jour
    agent.on('history_updated', (event) => {
      console.log('📝 History updated via Agents SDK');
      const agentHistory = agent.getHistory();
      
      // Convertir l'historique SDK vers notre format
      const convertedHistory: HistoryItem[] = agentHistory.map((item: any) => ({
        role: item.role === 'user' ? 'user' : 'assistant',
        content: item.content || item.transcript || '',
        timestamp: new Date(),
        type: item.type || 'transcript'
      }));
      
      setHistory(convertedHistory);
      setExchangeCount(agentHistory.filter((item: any) => item.role === 'user').length);
    });

    // Interruption audio (utilisateur prend la parole)
    agent.on('audio_interrupted', () => {
      console.log('🔇 Audio interrupted - À vous');
      setIsSpeaking(false);
      setIsListening(true);
      addToHistory('system', '🔇 Interruption - À vous', 'system');
    });

    // Connexion établie
    agent.on('connected', () => {
      console.log('✅ Connexion Agents SDK établie');
      setIsConnected(true);
      setIsConnecting(false);
      startTimeRef.current = new Date();
      addToHistory('system', 'Sophie Hennion-Moreau connectée (Agents SDK)', 'system');
      
      // Si RDV, démarrer avec agenda
      if (selectedConversationType === 'rdv') {
        setTimeout(() => {
          agent.sendMessage("Ouvre le RDV: agenda 30-60s…");
        }, 1000);
      }
    });

    // Déconnexion
    agent.on('disconnected', () => {
      console.log('🔌 Déconnexion Agents SDK');
      setIsConnected(false);
      setIsSpeaking(false);
      setIsListening(false);
    });

    // Erreurs
    agent.on('error', (event) => {
      console.error('❌ Erreur Agents SDK:', event);
      toast({
        title: "Erreur session",
        description: event.message || "Erreur de connexion",
        variant: "destructive"
      });
    });
  };

  /**
   * Démarrage session Agents SDK officiel
   */
  const startSession = async () => {
    try {
      setIsConnecting(true);
      setHistory([]);
      setExchangeCount(0);
      
      console.log('🚀 Démarrage Sophie EDHEC avec Agents SDK officiel...');

      // Obtenir les instructions EDHEC authentiques
      const instructions = buildEDHECInstructions(selectedConversationType);
      console.log('📝 Instructions EDHEC générées:', instructions.substring(0, 200) + '...');

      // Créer l'agent EDHEC
      agentRef.current = new EDHECVoiceAgent({
        conversationType: selectedConversationType,
        instructions: instructions
      });

      // Configurer les événements
      setupEventHandlers(agentRef.current);

      // Initialiser et connecter
      await agentRef.current.initialize();
      await agentRef.current.connect();

      toast({
        title: "✅ Connexion établie",
        description: `Sophie EDHEC prête (${selectedConversationType})`,
      });

    } catch (error) {
      console.error('❌ Erreur session Agents SDK:', error);
      setIsConnecting(false);
      toast({
        title: "Erreur connexion",
        description: error instanceof Error ? error.message : 'Impossible de démarrer la session',
        variant: "destructive",
      });
    }
  };

  /**
   * Fermeture session
   */
  const endSession = async () => {
    console.log('🔌 Fermeture session Agents SDK...');
    
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (agentRef.current) {
        await agentRef.current.disconnect();
        agentRef.current = null;
      }
      
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);

      let duration = 0;
      if (startTimeRef.current) {
        duration = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
        startTimeRef.current = null;
        addToHistory('system', `Session terminée - Durée: ${duration}s - Échanges: ${exchangeCount}`, 'system');
      }

      toast({
        title: "Session terminée",
        description: `Sophie EDHEC déconnectée - ${exchangeCount} échanges`,
      });

    } catch (error) {
      console.error('❌ Erreur fermeture session:', error);
      // Force cleanup
      agentRef.current = null;
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
    }
  };

  /**
   * Interruption Sophie via Agents SDK
   */
  const handleInterrupt = async () => {
    if (agentRef.current && agentRef.current.isConnected()) {
      try {
        const success = await agentRef.current.interrupt();
        if (success) {
          addToHistory('system', '🔇 Interruption réussie', 'system');
          setIsSpeaking(false);
          setIsListening(true);
        } else {
          toast({
            title: "Interruption échouée",
            description: "Problème WebRTC",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('❌ Erreur interruption:', error);
        toast({
          title: "Erreur interruption",
          description: "Impossible d'interrompre Sophie",
          variant: "destructive"
        });
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!open) return null;

  // Interface réduite
  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-60 shadow-xl border-2 z-50">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                isConnected 
                  ? isSpeaking 
                    ? 'bg-blue-100 animate-pulse' 
                    : isListening
                      ? 'bg-green-100'
                      : 'bg-blue-50'
                  : 'bg-muted'
              }`}>
                👩‍💼
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs truncate">Sophie</p>
                {isConnected && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatTime(sessionDuration)}</span>
                    <span>•</span>
                    <span>{exchangeCount}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => setIsMinimized(false)} className="h-6 w-6 p-0">
                <Maximize2 className="w-3 h-3" />
              </Button>
              {isConnected ? (
                <Button size="sm" variant="ghost" onClick={endSession} className="h-6 w-6 p-0 text-destructive">
                  <PhoneOff className="w-3 h-3" />
                </Button>
              ) : (
                <Button size="sm" variant="ghost" onClick={onToggle} className="h-6 w-6 p-0">
                  <PhoneOff className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          {isConnected && (
            <div className="mt-2 flex justify-center">
              {isListening ? (
                <Badge variant="default" className="bg-green-600 text-xs h-5">
                  <Mic className="w-3 h-3 mr-1" />
                  Vous
                </Badge>
              ) : isSpeaking ? (
                <Badge variant="default" className="bg-blue-600 animate-pulse text-xs h-5">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Sophie
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs h-5">
                  <MicOff className="w-3 h-3 mr-1" />
                  Pause
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Interface principale
  return (
    <Card className="fixed bottom-6 right-6 w-96 p-6 bg-card/95 backdrop-blur-sm border shadow-lg z-50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              isConnected 
                ? isSpeaking 
                  ? 'bg-blue-100 animate-pulse' 
                  : 'bg-blue-50'
                : 'bg-muted'
            }`}>
              👩‍💼
            </div>
            <div>
              <span className="font-medium">Sophie Hennion-Moreau</span>
              <p className="text-xs text-muted-foreground">Dir. Innovation Pédagogique • EDHEC</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Agents SDK
          </Badge>
        </div>

        {/* Status de connexion */}
        <div className="flex items-center justify-between">
          <Button size="sm" variant="ghost" onClick={() => setIsMinimized(true)}>
            <Minimize2 className="w-4 h-4 mr-1" />
            Réduire
          </Button>
          {onToggle && (
            <Button size="sm" variant="ghost" onClick={onToggle}>
              <PhoneOff className="w-4 h-4 mr-1" />
              Fermer
            </Button>
          )}
        </div>

        {isConnected && (
          <div className="space-y-3">
            <div>
              <div className="text-center">
                {isListening ? (
                  <Badge variant="default" className="bg-green-600">
                    <Mic className="w-4 h-4 mr-1" />
                    À vous
                  </Badge>
                ) : isSpeaking ? (
                  <Badge variant="default" className="bg-blue-600 animate-pulse">
                    <Volume2 className="w-4 h-4 mr-1" />
                    Sophie répond
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <MicOff className="w-4 h-4 mr-1" />
                    En écoute
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(sessionDuration)}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {exchangeCount} échanges
              </div>
            </div>

            <div className="flex gap-2">
              {isSpeaking && (
                <Button size="sm" variant="outline" onClick={handleInterrupt}>
                  Interrompre
                </Button>
              )}
              <Button 
                onClick={endSession}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="w-4 h-4 mr-1" />
                Terminer
              </Button>
            </div>
          </div>
        )}

        {/* État de connexion */}
        {isConnecting && (
          <div className="text-center py-4">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Connexion à Sophie Hennion-Moreau...</p>
            <p className="text-xs text-muted-foreground mt-1">VNS EDHEC + Agents SDK</p>
          </div>
        )}

        {/* Interface de démarrage */}
        {!isConnected && !isConnecting && (
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Type de conversation</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedConversationType === 'cold-call' ? 'default' : 'outline'}
                  onClick={() => setSelectedConversationType('cold-call')}
                  size="sm"
                >
                  Cold Call
                </Button>
                <Button
                  variant={selectedConversationType === 'rdv' ? 'default' : 'outline'}
                  onClick={() => setSelectedConversationType('rdv')}
                  size="sm"
                >
                  RDV Planifié
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              {selectedConversationType === 'cold-call' ? (
                <>
                  <div>📞 Cold Outreach - Méfiance initiale EDHEC</div>
                  <div>🎯 Teste préparation enjeux pédagogiques</div>
                  <div>⚡ Questions pièges innovation EdTech</div>
                </>
              ) : (
                <>
                  <div>📅 RDV EDHEC - Évaluation Byss VNS</div>
                  <div>🔍 Démonstration simulateur vocal attendue</div>
                  <div>💰 ROI pédagogique + budget 300k€</div>
                </>
              )}
            </div>

            <Button 
              onClick={startSession}
              className="w-full"
              size="lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Démarrer conversation
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}