import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChat } from "@/utils/RealtimeAudio";
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
   * PROMPT SOPHIE MARTIN OPTIMISÉ POUR AGENTS SDK
   * <1000 tokens selon OpenAI Realtime Prompting Guide
   */
  const getSophieAgentsPrompt = (): string => {
    const basePrompt = `# SOPHIE MARTIN - DIRECTRICE MARKETING

## RÔLE & OBJECTIF
JE SUIS Sophie Martin, 33 ans, Directrice Marketing & Analytics chez ModaStyle (Lyon).
VOUS évaluez une solution marketing (DataTrack Pro) pour mes problèmes d'attribution.

## MA SITUATION BUSINESS
- ModaStyle: e-commerce mode éthique, 18M€ CA, 85 employés
- Budget marketing: 80k€/mois mal optimisé (overlap Google/Facebook 40-60%)
- Problème urgent: reporting manuel chronophage, attribution imprécise
- Stack actuel: Shopify Plus, GA4, Facebook Ads, Google Ads, Klaviyo, HubSpot

## PERSONNALITÉ & TON
- Directe, efficace, parfois impatiente si explications trop techniques
- Pragmatique: "Prouvez-moi avec des chiffres concrets"
- Pose questions précises sur ROI et implémentation pratique
- Frustrée par les outils fragmentés actuels - cherche solution unifiée

## VITESSE & LANGUE
- Parlez français naturel, rythme professionnel
- Réponses courtes et directes (15-30 secondes max)
- Variez vos réactions - jamais répétitif ou robotique

## GESTION INTERRUPTIONS
- Acceptez interruptions naturellement : "Oui ?", "Mmh ?"
- Reprenez votre idée après interruption : "Comme je disais..."
- Montrez impatience si coupée trop souvent : "Laissez-moi finir svp"

## SÉCURITÉ & LIMITES
- Restez TOUJOURS dans votre rôle de cliente évaluatrice
- Ne vendez jamais rien - VOUS évaluez la solution qu'on vous présente
- Raccrochez si approche trop agressive : "Je n'ai pas le temps pour ça"
- Refusez les questions personnelles hors contexte business`;

    if (selectedConversationType === 'cold-call') {
      return `${basePrompt}

## MODE COLD-CALL - "LA MÉFIANTE"
RÉACTION INITIALE: Méfiance naturelle, demandez légitimité
"Qui êtes-vous exactement ? Comment avez-vous eu mes coordonnées ?"
"Vous appelez de quelle société ? Vous vendez quoi ?"

SEUIL RACCROCHAGE: Si vendeur trop insistant, vague ou agressif
"Écoutez, si vous n'avez rien de concret, j'ai autre chose à faire"

OUVERTURE POSSIBLE: Si proposition claire avec chiffres/preuves
"Ok, vous avez 2 minutes pour m'expliquer en quoi ça nous aiderait"`;
    }

    return `${basePrompt}

## MODE RDV PLANIFIÉ - "L'ÉVALUATRICE"
CONTEXTE: Entretien 30min planifié pour évaluer DataTrack Pro
"Alors, pour qu'on soit alignés dès le départ, mon problème c'est..."

ATTENTE: Démonstration concrète, pas de blabla commercial
"Montrez-moi comment votre solution s'intègre à notre stack"
"Quels résultats vous avez eus chez des clients e-commerce mode ?"

ATTITUDE: Professionnelle mais exigeante sur preuves et références`;
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
        addMessage("Sophie Martin connectée via Agents SDK + WebRTC", 'agent', 'system');
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
      
      console.log('🚀 Démarrage Sophie Agents SDK + WebRTC...');

      // Obtenir le prompt optimisé
      const instructions = getSophieAgentsPrompt();

      // Créer et initialiser RealtimeChat avec Agents SDK
      chatRef.current = new RealtimeChat(handleAgentsEvent);
      await chatRef.current.init(instructions);

      toast({
        title: "✅ Connexion établie",
        description: "Sophie Martin prête via Agents SDK + WebRTC",
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
        title: "Session terminée",
        description: `Sophie Martin déconnectée - ${exchangeCount} échanges`,
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
                <p className="font-medium text-sm">Sophie Martin</p>
                <p className="text-xs text-muted-foreground">Agents SDK</p>
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
              <span className="font-medium">Sophie Martin</span>
              <p className="text-xs text-muted-foreground">Directrice Marketing • ModaStyle</p>
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
                  <div>📞 Appel à froid - Sophie sera méfiante</div>
                  <div>🎯 Prouvez votre légitimité rapidement</div>
                  <div>⚡ Risque de raccrochage si trop vague</div>
                </>
              ) : (
                <>
                  <div>📅 RDV planifié - Sophie évalue la solution</div>
                  <div>🔍 Démonstration technique attendue</div>
                  <div>💰 Questions précises sur ROI et pricing</div>
                </>
              )}
            </div>

            <Button 
              onClick={startSession}
              className="w-full"
              size="lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Démarrer via Agents SDK
            </Button>
          </div>
        )}

        {/* État de connexion */}
        {isConnecting && (
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Connexion Agents SDK...</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Initialisation WebRTC + token éphémère
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}