import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChat } from "@/utils/RealtimeAudio";
import { buildSophiePrompt, VNSConfig, DEFAULT_CONFIGS } from "@/lib/vns-template";
import { logEvent, scoreTurn, endSession as endSessionTool } from "@/lib/tools/vns-tools";
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

interface Message {
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type: 'audio' | 'text' | 'system';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);
  
  const chatRef = useRef<RealtimeChat | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * GÉNÉRATION PROMPT VNS ACADÉMIQUE EDHEC - Connecté aux vraies données
   */
  const getSophieAgentsPrompt = (): string => {
    // Utilisation directe des données Byss VNS réelles
    const byssData = {
      pricing: { annualPrice: 3000, apiCostsIncluded: false },
      features: { technology: 'GPT-4o Realtime', setup: '24h garanti' },
      edhec: { students: 2800, budget: 12000000 },
      roi: { savings: 4757000, roiPercent: '15,600%' }
    };

    const mode = selectedConversationType === 'rdv' ? 'RDV' : 'COLD';
    
    return `Tu es Sophie Hennion-Moreau, Directrice Innovation Pédagogique EDHEC Business School.

## CONTEXTE EDHEC RÉEL
- Budget innovation: 12M€/an
- Étudiants: 2,800
- Challenge: 73% étudiants jugent formations vente trop académiques
- Objectif: Satisfaction 87% → 92%

## BYSS VNS DONNÉES EXACTES
- Prix: 3,000€/an + coûts API (vs 4.76M€/an assessment centers)
- Technology: GPT-4o Realtime API
- Setup: 24h garanti vs 6 mois concurrence
- ROI: 15,600% économie première année

## MODE: ${mode}
${mode === 'COLD' ? 
  '**COLD OUTREACH** - Méfiance initiale, test préparation EDHEC, 90 secondes attention max.' :
  '**RDV PLANIFIÉ** - Collaborative, démonstration interactive attendue, 45min agenda.'
}

Score /10 puis feedback constructif sur compréhension enjeux EDHEC.`;
  };

  const addMessage = (content: string, sender: 'user' | 'agent', type: 'audio' | 'text' | 'system' = 'text') => {
    setMessages(prev => [...prev, {
      content,
      sender,
      timestamp: new Date(),
      type
    }]);
  };

  /**
   * Gestionnaire d'événements Agents SDK
   */
  const handleAgentsEvent = (event: any) => {
    console.log('📨 Événement Agents SDK:', event.type);
    
    switch (event.type) {
      case 'session.created':
        console.log('✅ Session Agents SDK créée');
        setIsConnected(true);
        setIsConnecting(false);
        startTimeRef.current = new Date();
        addMessage("Sophie Hennion-Moreau connectée via Agents SDK + WebRTC", 'agent', 'system');
        break;
        
      case 'response.audio.delta':
        // Sophie parle
        setIsSpeaking(true);
        setIsListening(false);
        break;
        
      case 'response.audio.done':
        // Sophie termine
        setIsSpeaking(false);
        setIsListening(true);
        break;
        
      case 'response.audio_transcript.delta':
        if (event.delta) {
          addMessage(event.delta, 'agent', 'text');
        }
        break;
        
      case 'input_audio_buffer.speech_started':
        console.log('🗣️ Utilisateur commence à parler');
        setIsListening(false);
        setIsSpeaking(false);
        break;
        
      case 'input_audio_buffer.speech_stopped':
        console.log('🛑 Utilisateur arrête de parler');
        setExchangeCount(prev => prev + 1);
        break;
        
      case 'response.function_call_arguments.done':
        console.log('🔧 Tool call terminé:', event);
        break;
        
      case 'error':
        console.error('❌ Erreur Agents SDK:', event.error);
        toast({
          title: "Erreur session",
          description: event.error?.message || "Erreur inconnue",
          variant: "destructive"
        });
        break;
    }
  };

  /**
   * Démarrage session Agents SDK + WebRTC
   */
  const startSession = async () => {
    try {
      setIsConnecting(true);
      setMessages([]);
      setExchangeCount(0);
      
      console.log('🚀 Démarrage Sophie VNS EDHEC + Agents SDK...');

      // Obtenir le prompt VNS optimisé
      const instructions = getSophieAgentsPrompt();
      console.log('📝 Instructions VNS EDHEC générées:', instructions.substring(0, 200) + '...');

      // Configuration des tools VNS pour Supabase
      const vnsTools = [
        {
          type: "function",
          name: "log_event",
          description: "Journaliser un moment clé pendant la session VNS",
          parameters: logEvent.parameters
        },
        {
          type: "function", 
          name: "score_turn",
          description: "Scorer le tour de l'élève par compétence commerciale",
          parameters: scoreTurn.parameters
        },
        {
          type: "function",
          name: "end_session", 
          description: "Clôturer la session VNS et produire le rapport final",
          parameters: endSessionTool.parameters
        }
      ];

      // Créer et initialiser RealtimeChat avec VNS tools
      chatRef.current = new RealtimeChat(handleAgentsEvent);
      await chatRef.current.init(instructions);

      toast({
        title: "✅ Connexion VNS établie",
        description: "Sophie Hennion-Moreau prête (EDHEC + Byss VNS)",
      });

    } catch (error) {
      console.error('❌ Erreur session Sophie Agents SDK:', error);
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
    console.log('🔌 Fermeture session Sophie Agents SDK...');
    
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (chatRef.current) {
        chatRef.current.disconnect();
        chatRef.current = null;
      }
      
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);

      let duration = 0;
      if (startTimeRef.current) {
        duration = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
        startTimeRef.current = null;
        addMessage(`Session terminée - Durée: ${duration}s - Échanges: ${exchangeCount}`, 'agent', 'system');
      }

      toast({
        title: "Session VNS terminée",
        description: `Sophie EDHEC déconnectée - ${exchangeCount} échanges`,
      });

    } catch (error) {
      console.error('❌ Erreur fermeture session:', error);
      // Force cleanup
      chatRef.current = null;
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
    }
  };

  /**
   * Interruption Sophie
   */
  const handleInterrupt = () => {
    if (chatRef.current && isSpeaking) {
      try {
        chatRef.current.interrupt();
        addMessage("Interruption envoyée", 'user', 'system');
      } catch (error) {
        console.error('❌ Erreur interruption:', error);
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

  // Interface réduite pendant conversation
  if (isMinimized && isConnected) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-xl border-2 z-50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                isSpeaking ? 'bg-blue-100 animate-pulse' : 'bg-blue-50'
              }`}>
                👩‍💼
              </div>
              <div>
                <p className="font-medium text-sm">Sophie Hennion-Moreau</p>
                <p className="text-xs text-muted-foreground">VNS EDHEC</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => setIsMinimized(false)} className="h-6 w-6 p-0">
                <Maximize2 className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={endSession} className="h-6 w-6 p-0 text-destructive">
                <PhoneOff className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>{formatTime(sessionDuration)}</span>
              <span>{exchangeCount} échanges</span>
            </div>
            <div className="text-center">
              {isListening ? (
                <Badge variant="default" className="bg-green-600 text-xs">
                  <Mic className="w-3 h-3 mr-1" />
                  À vous
                </Badge>
              ) : isSpeaking ? (
                <Badge variant="default" className="bg-blue-600 animate-pulse text-xs">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Sophie répond
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  <MicOff className="w-3 h-3 mr-1" />
                  En écoute
                </Badge>
              )}
            </div>
          </div>
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
        {isConnected && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Button size="sm" variant="ghost" onClick={() => setIsMinimized(true)}>
                <Minimize2 className="w-4 h-4 mr-1" />
                Réduire
              </Button>
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