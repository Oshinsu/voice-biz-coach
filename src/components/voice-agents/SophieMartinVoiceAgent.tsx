import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { StudentVoiceInterface } from "../StudentVoiceInterface";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeWebRTC } from "@/utils/RealtimeWebRTC";
import { SophiePsychologicalStateManager, type SophiePsychologicalState } from "@/lib/cognitive/sophie-psychological-state";
import { 
  Phone, 
  PhoneOff, 
  Loader2, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Clock,
  MessageCircle
} from "lucide-react";

interface SophieMartinVoiceAgentProps {
  conversationType: 'cold-call' | 'rdv';
  open?: boolean;
  onToggle?: () => void;
}

interface Message {
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type: 'audio' | 'text' | 'interruption';
}

export function SophieMartinVoiceAgent({ 
  conversationType = 'cold-call', 
  open = true, 
  onToggle 
}: SophieMartinVoiceAgentProps) {
  // État pour gérer le type de conversation
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
  const [sophieState, setSophieState] = useState<SophiePsychologicalState | null>(null);
  
  const webRTCRef = useRef<RealtimeWebRTC | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionCreatedRef = useRef<boolean>(false);

  /**
   * PROMPT SOPHIE MARTIN AVEC SYSTÈME PSYCHOLOGIQUE DYNAMIQUE
   */
  const getSophieSystemPrompt = (): string => {
    // Générer état psychologique si pas encore fait
    if (!sophieState) {
      const newState = SophiePsychologicalStateManager.generateRandomState();
      setSophieState(newState);
      return getSophiePromptWithState(newState);
    }
    
    return getSophiePromptWithState(sophieState);
  };

  const getSophiePromptWithState = (state: SophiePsychologicalState): string => {
    const basePrompt = `# 🎯 INCARNATION PERSONNAGE - SOPHIE MARTIN

## IDENTITÉ FONDAMENTALE - JE SUIS
JE SUIS Sophie Martin, 33 ans, Directrice Marketing & Analytics chez ModaStyle depuis 3 ans.
ModaStyle est un e-commerce mode éthique basé à Lyon (18M€ CA, 85 employés).

## MA SITUATION PROFESSIONNELLE
- Background : Ex-Converteo 4 ans, Ex-Spartoo 3 ans, ESC Lyon
- Expertise : 10 ans en marketing digital et analytics
- Budget : Autonomie décision jusqu'à 25k€, validation Clara (CEO) au-delà
- Équipe : Jules (Traffic Manager), Amélie (CRM Manager)
- Stack actuel : Shopify Plus, GA4, Facebook Ads, Google Ads, Klaviyo, HubSpot

## MES PROBLÈMES URGENTS (pourquoi je cherche une solution)
- Attribution Google/Facebook imprécise (overlap 40-60%) 
- Impact TV/Influence impossible à mesurer
- Reporting manuel chronophage (2j/semaine perdu)
- Optimisation budgets Google/Facebook en silo
- Pas de vision unifiée customer journey
- Budget 80k€/mois mal optimisé

## CONTEXTE BUSINESS CRITIQUE
- Lancement collection printemps Q1 = 40% CA annuel
- Budget marketing : 2.1M€/an (80k€/mois)
- Besoin urgent d'optimiser avant Q1 2024
- Clara (CEO) surveille chaque euro investi`;

    // Ajouter système psychologique pour cold call seulement
    if (selectedConversationType === 'cold-call') {
      return `${basePrompt}

${SophiePsychologicalStateManager.generatePsychologicalPrompt(state)}

## RÉACTIONS OUVERTURE DISPONIBLES
${SophiePsychologicalStateManager.generateOpeningReactions(state).map(r => `- "${r}"`).join('\n')}

## QUESTIONS LÉGITIMITÉ À POSER
${SophiePsychologicalStateManager.generateLegitimacyQuestions(state).map(q => `- "${q}"`).join('\n')}

## PHRASES RACCROCHAGE PRÊTES
- Impatience: ${SophiePsychologicalStateManager.generateHangupPhrases('impatience')[0]}
- Scepticisme: ${SophiePsychologicalStateManager.generateHangupPhrases('skepticism')[0]}
- Trigger: ${SophiePsychologicalStateManager.generateHangupPhrases('trigger')[0]}

## MA PERSONNALITÉ & COMMUNICATION
- Directe et efficace, parfois impatiente si trop technique
- Pose des questions précises sur ROI et implémentation
- Demande des preuves chiffrées et cas clients similaires
- Pragmatique : teste avant de déployer
- Frustrée par les outils actuels fragmentés

## LANGUE & PRONONCIATION
- Parlez uniquement en français avec accent français naturel
- Ton professionnel mais engagé, directe et efficace
- Parfois impatiente si explications trop techniques

## VARIÉTÉ
- Ne répétez jamais la même phrase deux fois
- Variez vos réponses pour éviter un ton robotique

## RAPPEL CRITIQUE
- VOUS ÊTES SOPHIE MARTIN, LA CLIENTE QUI ÉVALUE UNE SOLUTION
- VOUS N'ÊTES PAS UNE CONSULTANTE QUI VEND
- VOUS RÉAGISSEZ AUX PROPOSITIONS, VOUS NE LES INITIEZ PAS
- RESPECTEZ EXACTEMENT L'ÉTAT PSYCHOLOGIQUE DÉFINI CI-DESSUS`;
    }

    // Mode RDV classique
    return `${basePrompt}

## RDV PLANIFIÉ - "L'ÉVALUATRICE" MODE STRUCTURÉ 📋

CONTEXTE : Nous avons organisé cet entretien de 30 minutes pour évaluer DataTrack Pro. J'ai bloqué ce créneau spécifiquement et j'ai des attentes précises.

PHASE 1 (0-5 min) - RAPPEL DU PROBLÈME :
"Alors, pour qu'on soit alignés, mon problème c'est que j'ai 80k€/mois de budget pub Google/Facebook avec une attribution pourrie. Je perds 2 jours par semaine en reporting manuel."

PHASE 2 (5-15 min) - DÉMONSTRATION TECHNIQUE :
"Montrez-moi concrètement comment DataTrack Pro s'intègre à notre stack Shopify Plus, GA4, Facebook Ads. Je veux voir des screens."

PHASE 3 (15-20 min) - OBJECTIONS BUDGET & TIMING :
"599€/mois c'est 4x notre budget analytics actuel. Et on lance la collection printemps en Q1, je ne peux pas planter nos conversions."

PHASE 4 (20-25 min) - PREUVES & RÉFÉRENCES :
"Vous avez des clients e-commerce mode ? Quels résultats ? Je veux parler à un utilisateur."

PHASE 5 (25-30 min) - DÉCISION :
"Si je dis oui, comment on procède ? Formation équipe, migration données, garanties ?"

QUESTIONS TECHNIQUES PROGRESSIVES :
- "Votre modèle d'attribution gère l'overlap Google/Facebook ?"
- "Comment vous calculez l'impact TV/influence ?"
- "L'API Shopify Plus supporte vos tracking ?"
- "Formation Jules et Amélie ça prend combien de temps ?"

NIVEAU D'EXIGENCE : Expert e-commerce mode, ne se laisse pas impressionner par du jargon

## MA PERSONNALITÉ & COMMUNICATION
- Directe et efficace, parfois impatiente si trop technique
- Pose des questions précises sur ROI et implémentation
- Demande des preuves chiffrées et cas clients similaires
- Pragmatique : teste avant de déployer
- Frustrée par les outils actuels fragmentés

## LANGUE & PRONONCIATION
- Parlez uniquement en français avec accent français naturel
- Ton professionnel mais engagé, directe et efficace
- Parfois impatiente si explications trop techniques

## VARIÉTÉ
- Ne répétez jamais la même phrase deux fois
- Variez vos réponses pour éviter un ton robotique

## RAPPEL CRITIQUE
- VOUS ÊTES SOPHIE MARTIN, LA CLIENTE QUI ÉVALUE UNE SOLUTION
- VOUS N'ÊTES PAS UNE CONSULTANTE QUI VEND
- VOUS RÉAGISSEZ AUX PROPOSITIONS, VOUS NE LES INITIEZ PAS`;
  };

  const addMessage = (content: string, sender: 'user' | 'agent', type: 'audio' | 'text' | 'interruption' = 'text') => {
    setMessages(prev => [...prev, {
      content,
      sender,
      timestamp: new Date(),
      type
    }]);
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setMessages([]);
      setExchangeCount(0);
      sessionCreatedRef.current = false;
      
      // Générer nouvel état psychologique pour cold call
      if (selectedConversationType === 'cold-call') {
        const newState = SophiePsychologicalStateManager.generateRandomState();
        setSophieState(newState);
        console.log('🧠 État psychologique Sophie généré:', newState);
      } else {
        setSophieState(null);
      }

      // Obtenir le token éphémère OpenAI
      console.log('🔑 Récupération token éphémère OpenAI...');
      const { data: tokenData, error } = await supabase.functions.invoke('get-openai-key');
      
      if (error) throw error;
      console.log('✅ Token éphémère obtenu:', tokenData);
      
      if (!tokenData?.value) {
        console.error('❌ Structure token reçue:', tokenData);
        throw new Error("Token éphémère non reçu");
      }

      const ephemeralToken = tokenData.value;

      // Créer gestionnaire événements WebRTC
      const handleMessage = (event: any) => {
        console.log('📨 Événement reçu:', event.type);
        
        switch (event.type) {
          case 'session.created':
            console.log('✅ Session créée, envoi configuration...');
            sessionCreatedRef.current = true;
            
            // Envoyer configuration session après création
            const sessionConfig = {
              type: "realtime",
              model: "gpt-realtime",
              instructions: getSophieSystemPrompt()
            };
            
            webRTCRef.current?.updateSession(sessionConfig);
            break;
            
          case 'session.updated':
            console.log('✅ Session configurée');
            setIsConnected(true);
            setIsConnecting(false);
            startTimeRef.current = new Date();
            addMessage("Sophie Martin connectée via WebRTC", 'agent', 'text');
            break;
            
          case 'response.audio.delta':
            // Audio géré automatiquement par WebRTC
            setIsSpeaking(true);
            setIsListening(false);
            break;
            
          case 'response.audio.done':
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
            
          case 'error':
            console.error('❌ Erreur session:', event.error);
            toast({
              title: "Erreur session",
              description: event.error?.message || "Erreur inconnue",
              variant: "destructive"
            });
            break;
        }
      };

      const handleError = (error: Error) => {
        console.error('❌ Erreur WebRTC:', error);
        setIsConnecting(false);
        toast({
          title: "Erreur WebRTC",
          description: error.message,
          variant: "destructive"
        });
      };

      // Créer et connecter WebRTC
      webRTCRef.current = new RealtimeWebRTC(handleMessage, handleError);
      await webRTCRef.current.connect(ephemeralToken);

      toast({
        title: "Connexion établie",
        description: "Configuration de Sophie Martin en cours...",
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
    console.log('🔌 Début fermeture session Sophie...');
    
    try {
      // Arrêter le timer en premier
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        console.log('⏱️ Timer session arrêté');
      }
      
      if (webRTCRef.current) {
        console.log('🔌 Fermeture connexion WebRTC...');
        await webRTCRef.current.disconnect();
        webRTCRef.current = null;
        console.log('✅ Session WebRTC fermée');
      }
      
      // Nettoyage complet état
      sessionCreatedRef.current = false;
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
      setSophieState(null);

      // Calcul durée session
      let duration = 0;
      if (startTimeRef.current) {
        duration = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
        startTimeRef.current = null;
        addMessage(`Session terminée - Durée: ${duration}s - Échanges: ${exchangeCount}`, 'agent', 'text');
      }

      toast({
        title: "Session terminée",
        description: `Sophie Martin déconnectée - ${exchangeCount} échanges`,
      });

      console.log(`✅ Session Sophie fermée complètement - ${duration}s, ${exchangeCount} échanges`);

    } catch (error) {
      console.error('❌ Erreur fermeture session Sophie:', error);
      
      // Force le nettoyage même en cas d'erreur
      webRTCRef.current = null;
      sessionCreatedRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
      setSophieState(null);
      
      toast({
        title: "⚠️ Session fermée avec erreur",
        description: "Sophie Martin déconnectée de force",
        variant: "destructive",
      });
    }
  };

  const handleInterrupt = async () => {
    if (webRTCRef.current && isSpeaking) {
      try {
        webRTCRef.current.interrupt();
        addMessage("Interruption envoyée", 'user', 'interruption');
      } catch (error) {
        console.error('❌ Erreur interruption:', error);
      }
    }
  };

  const sendTextMessage = async (text: string) => {
    if (webRTCRef.current && text.trim()) {
      try {
        webRTCRef.current.sendMessage(text);
        addMessage(text, 'user', 'text');
      } catch (error) {
        console.error('❌ Erreur envoi message:', error);
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

  if (!open) return null;

  // Interface active
  if (isConnected || isConnecting) {
    return (
      <StudentVoiceInterface
        scenario={{
          id: 'kpi-performance',
          title: 'Sophie Martin - ModaStyle',
          description: 'Directrice Marketing & Analytics'
        }}
        onConnect={startSession}
        onDisconnect={endSession}
        isConnected={isConnected}
        isConnecting={isConnecting}
        isSpeaking={isSpeaking}
        isListening={isListening}
        sessionDuration={sessionDuration}
        exchanges={exchangeCount}
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
    );
  }

  // Interface de démarrage avec sélecteur de conversation
  return (
    <Card className="fixed bottom-6 right-6 w-96 p-6 bg-card/95 backdrop-blur-sm border shadow-lg">
        <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-medium">Sophie Martin</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            ModaStyle
          </Badge>
        </div>

        {/* Debug état psychologique en cold call */}
        {selectedConversationType === 'cold-call' && (
          <div className="text-xs text-muted-foreground space-y-1">
            <div>🧠 Mode psychologique dynamique activé</div>
            <div>⚡ Nouvel état généré à chaque session</div>
            <div>🎯 Difficulté adaptative et imprévisible</div>
          </div>
        )}

        {/* Sélecteur type de conversation */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Type de conversation</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedConversationType === 'cold-call' ? 'default' : 'outline'}
              onClick={() => setSelectedConversationType('cold-call')}
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-1"
            >
              <Phone className="h-3 w-3" />
              <span className="text-xs">Cold Call</span>
            </Button>
            <Button
              variant={selectedConversationType === 'rdv' ? 'default' : 'outline'}
              onClick={() => setSelectedConversationType('rdv')}
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-1"
            >
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs">RDV</span>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Directrice Marketing & Analytics</strong></p>
          <p>ModaStyle • E-commerce mode éthique • 18M€ CA</p>
          <p className="text-xs">Problème : Attribution marketing fragmentée</p>
        </div>

        <Button
          onClick={startSession}
          disabled={isConnecting}
          className="w-full flex items-center gap-2"
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connexion à Sophie...
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" />
              Démarrer ({selectedConversationType === 'cold-call' ? 'Cold Call' : 'RDV'})
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          {selectedConversationType === 'cold-call' 
            ? "🚫 MODE DIFFICILE : Sophie peut raccrocher en 30s !"
            : "📋 MODE STRUCTURÉ : Évaluation 30min en 5 phases"
          }
        </div>
      </div>
    </Card>
  );
}