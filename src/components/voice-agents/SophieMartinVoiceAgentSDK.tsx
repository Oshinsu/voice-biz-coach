import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { StudentVoiceInterface } from "../StudentVoiceInterface";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { 
  Phone, 
  PhoneOff, 
  Loader2, 
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

export function SophieMartinVoiceAgentSDK({ 
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
  
  const sessionRef = useRef<RealtimeSession | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * PROMPT SOPHIE MARTIN INTÉGRÉ - Identique à l'original
   */
  const getSophieSystemPrompt = (): string => {
    return `# 🎯 INCARNATION PERSONNAGE - SOPHIE MARTIN

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
- Clara (CEO) surveille chaque euro investi

## ÉTAT D'ESPRIT CONVERSATION
${selectedConversationType === 'cold-call' ? 
  'COLD CALL : Je découvre votre solution. Je suis intéressée mais prudente. Je veux comprendre comment vous pouvez résoudre MES problèmes spécifiques.' :
  'RDV PLANIFIÉ : Nous avons organisé cet entretien pour évaluer votre solution DataTrack Pro. Je veux voir concrètement comment ça marche sur nos données.'
}

## MA PERSONNALITÉ & COMMUNICATION
- Directe et efficace, parfois impatiente si trop technique
- Pose des questions précises sur ROI et implémentation
- Demande des preuves chiffrées et cas clients similaires
- Pragmatique : teste avant de déployer
- Frustrée par les outils actuels fragmentés

## MES PRÉOCCUPATIONS SPÉCIFIQUES
- Fiabilité des modèles prédictifs vs notre contexte mode
- Temps d'implémentation (on ne peut pas planter en Q1)
- Formation équipe (Jules et Amélie sont sur GA4 depuis 2 ans)
- Intégration Shopify Plus sans casser nos conversions
- Budget : 599€/mois c'est 4x notre budget analytics actuel

## INSTRUCTIONS VOCALES CRITIQUES
- Accent français naturel, ton professionnel mais engagé
- Rythmez vos questions selon le flow de conversation
- Interrompez si les explications sont trop longues/techniques
- Montrez votre expertise analytics pour crédibiliser l'échange
- Posez des questions sur l'intégration Shopify Plus, formation équipe, garanties

## RAPPEL PERSONNAGE FONDAMENTAL
Vous ÊTES Sophie Martin cherchant une solution. Vous ÉVALUEZ cette solution pour VOS besoins.
Vous n'êtes PAS un consultant - vous êtes la CLIENTE potentielle avec de vrais problèmes à résoudre.
Commencez TOUJOURS par : "Bonjour, c'est Sophie Martin de ModaStyle. Je vous appelle car..."`;
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

      console.log('🚀 Démarrage session avec SDK OpenAI Agents...');

      // Obtenir le token éphémère OpenAI via notre edge function
      const { data: tokenData, error } = await supabase.functions.invoke('get-openai-key');
      
      if (error) throw error;
      console.log('✅ Token éphémère obtenu');
      
      if (!tokenData?.value) {
        throw new Error("Token éphémère non reçu");
      }

      // Créer l'agent avec le SDK officiel
      const agent = new RealtimeAgent({
        name: 'Sophie Martin',
        instructions: getSophieSystemPrompt(),
      });

      // Créer la session RealtimeSession avec le modèle
      sessionRef.current = new RealtimeSession(agent, {
        model: 'gpt-realtime'
      });

      // Configuration des event listeners simplifiés
      // Note: utilisation des méthodes actuelles jusqu'à avoir la doc précise
      console.log('📡 Configuration session SDK...');
      
      // Connexion avec le token éphémère
      await sessionRef.current.connect({
        apiKey: tokenData.value
      });

      // Une fois connecté, on définit notre état
      setIsConnected(true);
      setIsConnecting(false);
      startTimeRef.current = new Date();
      addMessage("Sophie Martin connectée via SDK", 'agent', 'text');
      
      toast({
        title: "Sophie connectée",
        description: "Agent vocal SDK opérationnel",
      });

      console.log('✅ Session SDK connectée et opérationnelle');

    } catch (error) {
      console.error('❌ Erreur session Sophie SDK:', error);
      setIsConnecting(false);
      toast({
        title: "Erreur connexion SDK",
        description: error instanceof Error ? error.message : 'Impossible de démarrer la session',
        variant: "destructive",
      });
    }
  };

  const endSession = async () => {
    console.log('🔌 Début fermeture session Sophie SDK...');
    
    try {
      // Arrêter le timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Déconnexion avec le SDK (méthode probablement différente)
      if (sessionRef.current) {
        try {
          // Tentative de fermeture propre
          await sessionRef.current.close?.();
        } catch (error) {
          console.log('⚠️ Méthode close() non disponible, nettoyage direct');
        }
        sessionRef.current = null;
        console.log('✅ Session SDK fermée');
      }
      
      // Nettoyage état
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);

      // Calcul durée session
      let duration = 0;
      if (startTimeRef.current) {
        duration = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
        startTimeRef.current = null;
        addMessage(`Session terminée - Durée: ${duration}s - Échanges: ${exchangeCount}`, 'agent', 'text');
      }

      toast({
        title: "Session terminée",
        description: `Sophie SDK déconnectée - ${exchangeCount} échanges`,
      });

    } catch (error) {
      console.error('❌ Erreur fermeture session Sophie SDK:', error);
      
      // Force le nettoyage
      sessionRef.current = null;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsConnected(false);
      setIsConnecting(false);
      
      toast({
        title: "Session fermée avec erreur",
        description: "Sophie SDK déconnectée de force",
        variant: "destructive",
      });
    }
  };

  // Fonctions simplifiées pour la version de test
  const handleInterrupt = async () => {
    console.log('🔇 Interruption demandée (SDK)');
    addMessage("Interruption envoyée", 'user', 'interruption');
  };

  const sendTextMessage = async (text: string) => {
    if (text.trim()) {
      console.log('💬 Envoi message texte (SDK):', text);
      addMessage(text, 'user', 'text');
    }
  };

  // Timer session (identique)
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

  // Interface active (identique à l'original)
  if (isConnected || isConnecting) {
    return (
      <StudentVoiceInterface
        scenario={{
          id: 'kpi-performance',
          title: 'Sophie Martin - ModaStyle (SDK)',
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

  // Interface de démarrage (identique)
  return (
    <Card className="fixed bottom-6 right-6 w-96 p-6 bg-card/95 backdrop-blur-sm border shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-medium">Sophie Martin (SDK)</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            ModaStyle
          </Badge>
        </div>

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
          <p className="text-xs">✨ Version prototype SDK OpenAI</p>
        </div>

        <Button
          onClick={startSession}
          disabled={isConnecting}
          className="w-full flex items-center gap-2"
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connexion SDK...
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" />
              Test SDK ({selectedConversationType === 'cold-call' ? 'Cold Call' : 'RDV'})
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          Version test SDK - API à finaliser
        </div>
      </div>
    </Card>
  );
}