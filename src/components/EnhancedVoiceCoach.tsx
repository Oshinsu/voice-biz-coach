import { RealtimeWebRTCCoach, handleWebRTCError, WEBRTC_CONFIG } from "@/lib/openai-webrtc";
import { VoiceAgentManager, AgentType } from "@/lib/multi-agent-system";
import { ContextualDiscoveryManager } from "@/lib/contextual-discovery";
import { generateOptimizedScenarioPrompt } from "@/lib/prompts";
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
  const [conversationType, setConversationType] = useState<'cold-call' | 'rdv' | null>(null);
  const [showCallTypeSelector, setShowCallTypeSelector] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<string>('sage');
  const [trustLevel, setTrustLevel] = useState(0);
  const [availableInformation, setAvailableInformation] = useState<Record<string, any>>({});
  const [revealedLayers, setRevealedLayers] = useState<any[]>([]);
  
  // Nouveau système multi-agents
  const [agentManager, setAgentManager] = useState<VoiceAgentManager | null>(null);
  const [currentAgent, setCurrentAgent] = useState<AgentType>('contact_principal');
  const [discoveryManager, setDiscoveryManager] = useState<ContextualDiscoveryManager | null>(null);
  const [agentHistory, setAgentHistory] = useState<Array<{agent: AgentType, action: string, timestamp: Date}>>([]);
  
  const voiceCoachRef = useRef<RealtimeWebRTCCoach | null>(null);

  const startConversation = async (callType: 'cold-call' | 'rdv') => {
    try {
      setError(null);
      
      if (!scenario) {
        setError("Aucun scénario sélectionné");
        return;
      }

      setConversationType(callType);
      setShowCallTypeSelector(false);

      // Initialisation du système multi-agents enrichi
      const conversationContext = {
        scenario,
        conversationType: callType,
        currentPhase: 'ouverture',
        trustLevel: 0,
        revealedInfo: {},
        messages: []
      };

      // Création du gestionnaire multi-agents
      const manager = new VoiceAgentManager(conversationContext);
      setAgentManager(manager);

      // Configuration des callbacks pour l'interface
      manager.onAgentSwitch = (fromAgent, toAgent, reason) => {
        setCurrentAgent(toAgent);
        addMessage(`🔄 Transfert vers ${getAgentDisplayName(toAgent)} - ${reason}`, "system");
        setAgentHistory(prev => [...prev, {
          agent: toAgent,
          action: `Handoff from ${fromAgent}`,
          timestamp: new Date()
        }]);
      };

      manager.onAgentAction = (agent, action, data) => {
        console.log(`Agent ${agent} - Action: ${action}`, data);
        setAgentHistory(prev => [...prev, {
          agent,
          action,
          timestamp: new Date()
        }]);
      };

      manager.onConversationUpdate = (context) => {
        setTrustLevel(context.trustLevel);
        setCurrentPhase(context.currentPhase);
      };

      // Initialisation du discovery manager contextuel
      const discoveryMgr = new ContextualDiscoveryManager(scenario, 0);
      setDiscoveryManager(discoveryMgr);

      // Vérifier et demander l'autorisation du microphone d'abord
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micError) {
        if (micError.name === 'NotAllowedError') {
          setError("Veuillez autoriser l'accès au microphone pour utiliser la fonction vocale. Cliquez sur l'icône du microphone dans la barre d'adresse de votre navigateur.");
          setIsConnecting(false);
          return;
        }
        throw micError;
      }

      setIsConnecting(true);
      
      // Démarrage de la conversation avec le système multi-agents
      await manager.startConversation(selectedVoice);
      
      setIsConnected(true);
      setIsConnecting(false);
      setIsInFeedbackMode(false);
      addMessage(`${getAgentDisplayName(currentAgent)} est maintenant en ligne`, "system");

    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(handleWebRTCError(error));
      setIsConnecting(false);
    }
  };

  const endConversation = async () => {
    if (agentManager) {
      await agentManager.disconnect();
      setAgentManager(null);
    }
    
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
    setConversationType(null);
    setShowCallTypeSelector(true);
    setCurrentAgent('contact_principal');
    setAgentHistory([]);
    addMessage("Conversation terminée", "system");
  };

  const startFeedbackMode = async () => {
    if (!agentManager || !scenario) return;
    
    setIsInFeedbackMode(true);
    
    try {
      await agentManager.switchToAgent('coach', 'Demande d\'analyse de performance');
      addMessage("🎯 Coach commercial prêt pour l'analyse de performance", "system");
    } catch (error) {
      console.error("Erreur lors du basculement en mode feedback:", error);
      setError("Impossible de basculer en mode feedback");
    }
  };

  // Nouvelles fonctions pour la gestion multi-agents
  const switchToAgent = async (targetAgent: AgentType) => {
    if (!agentManager) return;
    
    try {
      await agentManager.switchToAgent(targetAgent, 'Sélection manuelle');
    } catch (error) {
      console.error("Erreur lors du changement d'agent:", error);
      setError(`Impossible de basculer vers ${getAgentDisplayName(targetAgent)}`);
    }
  };

  const returnToMainContact = async () => {
    if (!agentManager) return;
    
    try {
      await agentManager.returnToMainContact('Retour au contact principal');
      setIsInFeedbackMode(false);
    } catch (error) {
      console.error("Erreur lors du retour au contact principal:", error);
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
    
    const agentDisplayName = getAgentDisplayName(currentAgent);
    
    if (currentAgent === 'coach') {
      return `💬 Mode analyse activé - Le coach évalue votre performance sur le scénario ${scenario.title}`;
    }
    
    // Coaching contextuel intelligent selon l'agent actuel et la phase
    const agentAdvice = {
      contact_principal: `🎙️ Contact principal: ${agentDisplayName} - ${getPhaseAdvice()}`,
      collegue_technique: `🔧 Expert technique impliqué - Préparez vos questions techniques sur l'architecture et l'intégration`,
      direction: `👔 Direction en ligne - Focus ROI, budget et décision stratégique`,
      coach: `🎯 Coach actif - Analyse de performance en cours`
    };

    const currentAdvice = agentAdvice[currentAgent];
    const trustInfo = `Confiance: ${trustLevel}% | Informations révélées: ${revealedLayers.length}`;
    
    return `${currentAdvice}\n📊 ${trustInfo}`;
  };

  const getPhaseAdvice = () => {
    const phaseAdviceEnhanced = {
      ouverture: conversationType === 'cold-call' ? 
        `Captez l'attention en 30 secondes maximum` :
        `Établissez le cadre et confirmez les attentes`,
      decouverte: conversationType === 'cold-call' ?
        `Une question directe pour identifier LE pain point principal` :
        `Explorez en profondeur les besoins spécifiques`,
      demonstration: conversationType === 'cold-call' ?
        `Pas de démo - focalisez sur la value proposition` :
        `Démonstration personnalisée selon les besoins révélés`,
      objections: conversationType === 'cold-call' ?
        `Objectif = obtenir un RDV, pas convaincre totalement` :
        `Levez tous les freins pour avancer vers la décision`,
      closing: conversationType === 'cold-call' ?
        `"Pouvons-nous prévoir 30 minutes la semaine prochaine?"` :
        `Définissez les étapes suivantes concrètes avec timeline`
    };

    return phaseAdviceEnhanced[currentPhase as keyof typeof phaseAdviceEnhanced] || 
           `Adaptez selon l'évolution de la conversation`;
  };

  const getAgentDisplayName = (agent: AgentType): string => {
    const names = {
      contact_principal: scenario?.interlocutor?.name || 'Contact Principal',
      collegue_technique: 'Expert Technique',
      direction: 'Direction',
      coach: 'Coach Commercial'
    };
    return names[agent];
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
              {isConnected ? `${scenario?.company?.name || 'Entreprise'} - En ligne` : "Hors ligne"}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 max-h-[80vh] shadow-xl border-primary/20 flex flex-col">
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
              {scenario.company?.name ? `Contact commercial chez ${scenario.company.name}` : "Contact commercial"}
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 min-h-0">
          {/* Interface Multi-Agents Enrichie */}
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium">
                🎙️ Agent Actuel: {getAgentDisplayName(currentAgent)}
              </h4>
              <div className="text-xs text-muted-foreground">
                Confiance: {trustLevel}%
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {getContextualCoaching()}
            </p>
            
            {/* Sélecteur d'agents */}
            {isConnected && (
              <div className="mb-3">
                <div className="text-xs font-medium mb-2">Agents disponibles:</div>
                <div className="flex flex-wrap gap-1">
                  {(['contact_principal', 'collegue_technique', 'direction', 'coach'] as AgentType[]).map(agent => (
                    <Button
                      key={agent}
                      variant={currentAgent === agent ? "default" : "outline"}
                      size="sm"
                      className="text-xs h-6 px-2"
                      onClick={() => agent !== currentAgent && switchToAgent(agent)}
                      disabled={agent === currentAgent}
                    >
                      {getAgentDisplayName(agent)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                Phase: {currentPhase}
              </Badge>
              {scenario && (
                <Badge variant="outline" className="text-xs">
                  {scenario.difficulty}
                </Badge>
              )}
              {conversationType && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                  {conversationType === 'cold-call' ? 'Cold Call' : 'RDV'}
                </Badge>
              )}
              {currentAgent !== 'contact_principal' && (
                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                  Agent Spécialisé
                </Badge>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 min-h-0">
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
          <div className="border-t pt-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Badge className="bg-green-100 text-green-800">
                    {getAgentDisplayName(currentAgent)} en ligne
                  </Badge>
                ) : (
                  <Badge variant="outline">Déconnecté</Badge>
                )}
                {isRecording && (
                  <Badge className="bg-red-100 text-red-800">Vous parlez</Badge>
                )}
                {isSpeaking && (
                  <Badge className="bg-blue-100 text-blue-800">
                    {getAgentDisplayName(currentAgent)} parle
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {!isConnected ? (
                showCallTypeSelector ? (
                  <div className="flex flex-col gap-3 w-full">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Type d'appel :</p>
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          onClick={() => startConversation('cold-call')} 
                          disabled={isConnecting}
                          className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          <Phone className="h-4 w-4" />
                          Cold Call (Prospect froid)
                        </Button>
                        <Button 
                          onClick={() => startConversation('rdv')} 
                          disabled={isConnecting}
                          className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <PhoneCall className="h-4 w-4" />
                          RDV (Entretien planifié)
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Voix du contact :</p>
                      <select 
                        value={selectedVoice} 
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        className="w-full p-2 text-xs border rounded bg-background"
                      >
                        {WEBRTC_CONFIG.supportedVoices.map(voice => (
                          <option key={voice} value={voice}>
                            {voice.charAt(0).toUpperCase() + voice.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setShowCallTypeSelector(true)} 
                    disabled={isConnecting}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Choisir type d'appel
                  </Button>
                )
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