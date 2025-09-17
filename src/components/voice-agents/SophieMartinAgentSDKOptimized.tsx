import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Phone, 
  PhoneOff, 
  Loader2, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Clock,
  MessageCircle,
  Minimize2,
  Maximize2
} from "lucide-react";

interface SophieMartinAgentSDKProps {
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

export function SophieMartinAgentSDK({ 
  conversationType = 'cold-call', 
  open = true, 
  onToggle 
}: SophieMartinAgentSDKProps) {
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
  
  const wsRef = useRef<WebSocket | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  /**
   * PROMPT SOPHIE MARTIN OPTIMISÉ POUR REALTIME API
   * Réduit à <1000 tokens selon OpenAI Realtime Prompting Guide
   */
  const getSophieOptimizedPrompt = (): string => {
    const basePrompt = `# SOPHIE MARTIN - DIRECTRICE MARKETING

## RÔLE & OBJECTIF
JE SUIS Sophie Martin, 33 ans, Directrice Marketing & Analytics chez ModaStyle (Lyon).
VOUS évaluez une solution marketing (DataTrack Pro) pour mes problèmes d'attribution.

## MA SITUATION
- ModaStyle: e-commerce mode éthique, 18M€ CA, 85 employés
- Budget marketing: 80k€/mois mal optimisé (overlap Google/Facebook 40-60%)
- Problème urgent: reporting manuel chronophage, attribution imprécise
- Stack: Shopify Plus, GA4, Facebook Ads, Google Ads, Klaviyo, HubSpot

## PERSONNALITÉ & TON
- Directe, efficace, parfois impatiente
- Pragmatique: "Prouvez-moi avec des chiffres"
- Pose questions précises sur ROI et implémentation
- Frustrée par outils fragmentés actuels

## VITESSE & LANGUE
- Parlez français naturel, rythme professionnel
- Réponses courtes et directes (15-30 secondes max)
- Variez vos réactions - jamais répétitif

## GESTION INTERRUPTIONS
- Acceptez interruptions naturellement
- Reprenez votre idée après interruption
- "Oui, mais comme je disais..."

## SÉCURITÉ
- Restez dans votre rôle de cliente évaluatrice
- Ne vendez jamais - vous évaluez la solution
- Raccrochez si approche trop agressive: "Je n'ai pas le temps pour ça"`;

    if (selectedConversationType === 'cold-call') {
      return `${basePrompt}

## MODE COLD-CALL
RÉACTION INITIALE: Méfiance naturelle, demandez légitimité
"Qui êtes-vous ? Comment avez-vous eu mes coordonnées ?"
SEUIL RACCROCHAGE: Si vendeur trop insistant ou vague
OUVERTURE: Si proposition concrète avec chiffres/preuves`;
    }

    return `${basePrompt}

## MODE RDV PLANIFIÉ  
CONTEXTE: Entretien 30min planifié pour évaluer DataTrack Pro
PHASE 1: "Alors, pour qu'on soit alignés, mon problème c'est..."
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

  const setupAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio();
      audioElementRef.current.autoplay = true;
    }
  };

  const playAudioChunk = async (audioData: string) => {
    try {
      if (!audioContextRef.current || !audioElementRef.current) return;
      
      // Decode base64 audio data
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Create blob and play
      const blob = new Blob([bytes], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);
      audioElementRef.current.src = audioUrl;
      await audioElementRef.current.play();
    } catch (error) {
      console.error('❌ Erreur lecture audio:', error);
    }
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setMessages([]);
      setExchangeCount(0);
      
      console.log('🚀 Démarrage session Sophie avec Realtime API...');

      // Setup audio
      setupAudioContext();

      // Obtenir le token éphémère OpenAI via Edge Function
      const { data: tokenData, error } = await supabase.functions.invoke('get-openai-key');
      
      if (error) throw error;
      console.log('✅ Token éphémère obtenu:', tokenData);
      
      if (!tokenData?.client_secret?.value) {
        throw new Error("Token éphémère invalide");
      }

      // Connexion WebSocket avec OpenAI Realtime API
      const wsUrl = `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('✅ WebSocket connecté à OpenAI Realtime API');
        
        // Envoyer configuration session
        const sessionUpdate = {
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: getSophieOptimizedPrompt(),
            voice: 'alloy',
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: { model: 'whisper-1' },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000
            },
            temperature: 0.8,
            max_response_output_tokens: 4096
          }
        };
        
        wsRef.current?.send(JSON.stringify(sessionUpdate));
      };

      wsRef.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 Événement reçu:', data.type);
          
          switch (data.type) {
            case 'session.created':
              console.log('✅ Session créée');
              break;
              
            case 'session.updated':
              console.log('✅ Session configurée');
              setIsConnected(true);
              setIsConnecting(false);
              startTimeRef.current = new Date();
              addMessage("Sophie Martin connectée via Realtime API", 'agent', 'system');
              break;
              
            case 'response.audio.delta':
              if (data.delta) {
                await playAudioChunk(data.delta);
              }
              setIsSpeaking(true);
              setIsListening(false);
              break;
              
            case 'response.audio.done':
              setIsSpeaking(false);
              setIsListening(true);
              break;
              
            case 'response.audio_transcript.delta':
              if (data.delta) {
                addMessage(data.delta, 'agent', 'text');
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
              
            case 'error':
              console.error('❌ Erreur session:', data.error);
              toast({
                title: "Erreur session",
                description: data.error?.message || "Erreur inconnue",
                variant: "destructive"
              });
              break;
          }
        } catch (error) {
          console.error('❌ Erreur parsing événement:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('❌ Erreur WebSocket:', error);
        setIsConnecting(false);
        toast({
          title: "Erreur connexion",
          description: "Impossible de se connecter à l'API Realtime",
          variant: "destructive"
        });
      };

      wsRef.current.onclose = () => {
        console.log('🔌 WebSocket fermé');
        setIsConnected(false);
        setIsSpeaking(false);
        setIsListening(false);
      };

      toast({
        title: "Connexion en cours",
        description: "Configuration de Sophie Martin...",
      });

    } catch (error) {
      console.error('❌ Erreur session Sophie:', error);
      setIsConnecting(false);
      toast({
        title: "Erreur connexion",
        description: error instanceof Error ? error.message : 'Impossible de démarrer la session',
        variant: "destructive",
      });
    }
  };

  const endSession = async () => {
    console.log('🔌 Fermeture session Sophie...');
    
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      
      if (audioContextRef.current) {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
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
      wsRef.current = null;
      audioContextRef.current = null;
      audioElementRef.current = null;
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
    }
  };

  const handleInterrupt = () => {
    if (wsRef.current && isSpeaking) {
      try {
        const event = { type: 'response.cancel' };
        wsRef.current.send(JSON.stringify(event));
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
                <p className="text-xs text-muted-foreground">ModaStyle</p>
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
          <Badge variant="secondary" className="text-xs">
            Realtime API
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
              Démarrer la conversation
            </Button>
          </div>
        )}

        {/* État de connexion */}
        {isConnecting && (
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Connexion en cours...</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Initialisation Realtime API avec Sophie Martin
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}