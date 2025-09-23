import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TestButton } from "@/components/ui/test-button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { startVoiceAgent, stopVoiceAgent } from "@/utils/VoiceAgentsSDK";
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

interface ConversationMetrics {
  totalMessages: number;
  userMessages: number;
  assistantMessages: number;
  toolCalls: number;
  tokens?: number;
  duration: number;
  lastUpdate: number;
}

interface ToolApprovalRequest {
  toolName: string;
  parameters: any;
  approvalItem: any;
  request: any;
  timestamp: number;
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
  const [conversationMetrics, setConversationMetrics] = useState<ConversationMetrics>({
    totalMessages: 0,
    userMessages: 0,
    assistantMessages: 0,
    toolCalls: 0,
    duration: 0,
    lastUpdate: Date.now()
  });
  const [pendingApproval, setPendingApproval] = useState<ToolApprovalRequest | null>(null);
  const [textInput, setTextInput] = useState('');
  const [guardrailAlerts, setGuardrailAlerts] = useState<any[]>([]);
  const [nativeTranscripts, setNativeTranscripts] = useState<string>('');

  const sessionRef = useRef<any | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const eventHandlersRef = useRef<{ event: string; handler: (...args: any[]) => void }[]>([]);

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

  const registerSessionEvent = (session: any, event: string, handler: (...args: any[]) => void) => {
    if (!session || typeof session.on !== 'function') return;
    session.on(event, handler);
    eventHandlersRef.current.push({ event, handler });
  };

  const clearSessionEvents = (session: any) => {
    if (!session) return;
    eventHandlersRef.current.forEach(({ event, handler }) => {
      if (typeof session.off === 'function') {
        session.off(event, handler);
      } else if (typeof session.removeEventListener === 'function') {
        session.removeEventListener(event, handler as EventListener);
      }
    });
    eventHandlersRef.current = [];
  };

  const setupEventHandlers = (session: any) => {
    clearSessionEvents(session);

    // Connection events with metrics
    registerSessionEvent(session, 'agent_start', () => {
      console.log('✅ Agent démarré (Voice SDK)');
      setIsConnected(true);
      setIsConnecting(false);
      startTimeRef.current = new Date();
      addToHistory('system', 'Sophie Hennion-Moreau connectée (Voice Agents SDK)', 'system');
    });

    registerSessionEvent(session, 'agent_stop', () => {
      console.log('🔌 Agent arrêté (Voice SDK)');
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
    });

    registerSessionEvent(session, 'connection_state_changed', (state: any) => {
      console.log('🔗 État connexion:', state);
      if (state === 'connected') {
        setIsConnected(true);
        setIsConnecting(false);
        setIsListening(true);
      }
    });

    registerSessionEvent(session, 'error', (error: any) => {
      console.error('❌ Erreur session Voice SDK:', error);
      setIsConnected(false);
      setIsConnecting(false);
      toast({
        title: "Erreur session",
        description: error?.message || "Erreur de connexion",
        variant: "destructive"
      });
    });

    registerSessionEvent(session, 'conversation.transcript.delta', (event: any) => {
      const role = event?.delta?.role || event?.role || event?.speaker;
      let textDelta = '';
      if (typeof event?.delta === 'string') {
        textDelta = event.delta;
      } else if (typeof event?.delta?.text === 'string') {
        textDelta = event.delta.text;
      } else if (Array.isArray(event?.delta?.content)) {
        textDelta = event.delta.content
          .map((part: any) => part?.text || part?.transcript || '')
          .filter(Boolean)
          .join('\n');
      }

      if (textDelta) {
        setNativeTranscripts(prev => `${prev}${textDelta}`);
      }

      if (role === 'assistant') {
        setIsSpeaking(true);
        setIsListening(false);
      } else if (role === 'user') {
        setIsListening(true);
        setIsSpeaking(false);
      }
    });

    registerSessionEvent(session, 'conversation.updated', (event: any) => {
      const conversation = event?.conversation;
      const items: any[] = conversation?.items ?? [];

      const historyItems: HistoryItem[] = [];
      let userMessages = 0;
      let assistantMessages = 0;
      let toolCalls = 0;
      const guardrailItems: any[] = [];
      let pending: ToolApprovalRequest | null = null;

      const getItemTimestamp = (item: any) => {
        if (item?.created_at) {
          // created_at peut être en secondes ou millisecondes selon le SDK
          const value = typeof item.created_at === 'number'
            ? (item.created_at > 1e12 ? item.created_at : item.created_at * 1000)
            : Date.parse(item.created_at);
          if (!Number.isNaN(value)) {
            return new Date(value);
          }
        }
        return new Date();
      };

      items.forEach((item: any) => {
        if (item?.type === 'message') {
          const role: HistoryItem['role'] = item.role === 'assistant'
            ? 'assistant'
            : item.role === 'user'
              ? 'user'
              : 'system';

          const content = Array.isArray(item?.content)
            ? item.content
                .map((part: any) => part?.text || part?.transcript || part?.formatted?.text || '')
                .filter(Boolean)
                .join('\n')
            : item?.content?.text || item?.content?.transcript || '';

          if (content) {
            historyItems.push({
              role,
              content,
              timestamp: getItemTimestamp(item),
              type: role === 'system' ? 'system' : 'transcript'
            });
          }

          if (role === 'user') {
            userMessages += 1;
          }

          if (role === 'assistant') {
            assistantMessages += 1;
          }
        }

        if (item?.type === 'tool-call' || item?.type === 'function_call') {
          toolCalls += 1;
          const requiresApproval = item?.status === 'requires_action' || item?.requires_approval;
          if (requiresApproval && !pending) {
            pending = {
              toolName: item?.name || item?.tool_name || 'Tool',
              parameters: item?.arguments || item?.parameters || item?.input || {},
              approvalItem: item,
              request: item,
              timestamp: Date.now(),
            };
          }
        }

        if (item?.type === 'guardrail' || item?.category === 'guardrail') {
          guardrailItems.push(item);
        }
      });

      historyItems.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      setHistory(historyItems);

      const totalMessages = userMessages + assistantMessages;
      const exchangeEstimate = Math.ceil(totalMessages / 2);
      setExchangeCount(exchangeEstimate);

      setConversationMetrics(prev => ({
        totalMessages,
        userMessages,
        assistantMessages,
        toolCalls,
        tokens: conversation?.metrics?.tokens ?? prev.tokens,
        duration: startTimeRef.current
          ? Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000)
          : prev.duration,
        lastUpdate: Date.now(),
      }));

      const assistantSpeaking = items.some(item => item?.role === 'assistant' && item?.status !== 'completed');
      const userSpeaking = items.some(item => item?.role === 'user' && item?.status !== 'completed');

      setIsSpeaking(assistantSpeaking);
      setIsListening(!assistantSpeaking || userSpeaking);

      setGuardrailAlerts(guardrailItems);
      setPendingApproval(pending);
    });

    registerSessionEvent(session, 'conversation.interruption', () => {
      setIsSpeaking(false);
      setIsListening(true);
    });

    registerSessionEvent(session, 'response.completed', () => {
      setIsSpeaking(false);
      setIsListening(true);
    });
  };

  /**
   * Démarrage session Voice Agents SDK (septembre 2025)
   */
  const startSession = async () => {
    try {
      setIsConnecting(true);
      setHistory([]);
      setExchangeCount(0);
      
      console.log('🚀 Démarrage Sophie EDHEC avec Voice Agents SDK...');

      // Obtenir les instructions EDHEC authentiques
      const instructions = buildEDHECInstructions(selectedConversationType);
      console.log('📝 Instructions EDHEC générées:', instructions.substring(0, 200) + '...');

      // Démarrer la session WebRTC via SDK simplifié
      sessionRef.current = await startVoiceAgent(instructions);

      // Configurer les événements
      setupEventHandlers(sessionRef.current);

      setNativeTranscripts('');
      setGuardrailAlerts([]);
      setPendingApproval(null);
      setConversationMetrics({
        totalMessages: 0,
        userMessages: 0,
        assistantMessages: 0,
        toolCalls: 0,
        duration: 0,
        lastUpdate: Date.now(),
      });

      toast({
        title: "✅ Connexion établie",
        description: `Sophie EDHEC prête (${selectedConversationType})`,
      });

    } catch (error) {
      console.error('❌ Erreur session Voice Agents SDK:', error);
      setIsConnecting(false);
      toast({
        title: "Erreur connexion",
        description: error instanceof Error ? error.message : 'Impossible de démarrer la session',
        variant: "destructive",
      });
    }
  };

  /**
   * Fermeture session Voice Agents SDK
   */
  const endSession = async () => {
    console.log('🔌 Fermeture session Voice Agents SDK...');
    
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (sessionRef.current) {
        clearSessionEvents(sessionRef.current);
        stopVoiceAgent(sessionRef.current);
        sessionRef.current = null;
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
      sessionRef.current = null;
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
    }
  };

  const handleInterrupt = async () => {
    if (sessionRef.current && isConnected) {
      try {
        // Utiliser l'interruption native du SDK Voice Agents
        await sessionRef.current.interrupt();
        addToHistory('system', '🔇 Interruption réussie (Voice SDK)', 'system');
        setIsSpeaking(false);
        setIsListening(true);
        
        toast({
          title: "Interruption réussie",
          description: "Sophie interrompue",
        });
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

  // Support text input hybride (Voice SDK)
  const handleTextMessage = async () => {
    if (sessionRef.current && isConnected && textInput.trim()) {
      try {
        // Utiliser sendMessage du SDK Voice Agents
        await sessionRef.current.sendMessage(textInput.trim());
        console.log('📤 Message texte envoyé (Voice SDK):', textInput);
        setTextInput('');
        
        // Add to local history
        addToHistory('user', textInput.trim(), 'transcript');
      } catch (error) {
        console.error('❌ Erreur envoi message texte:', error);
        toast({
          title: "Erreur envoi",
          description: "Impossible d'envoyer le message",
          variant: "destructive"
        });
      }
    }
  };

  // Tool approval workflow (Voice SDK)
  const handleToolApproval = async (approve: boolean) => {
    if (!pendingApproval || !sessionRef.current) return;

    try {
      if (approve) {
        // Utiliser les méthodes d'approval du Voice SDK
        console.log('✅ Tool approuvé (Voice SDK):', pendingApproval.toolName);
        // sessionRef.current.approveTool(pendingApproval.approvalItem); // When available
      } else {
        console.log('❌ Tool rejeté (Voice SDK):', pendingApproval.toolName);
        // sessionRef.current.rejectTool(pendingApproval.request); // When available
      }
      setPendingApproval(null);
      
      toast({
        title: approve ? "Tool approuvé" : "Tool rejeté",
        description: `${pendingApproval.toolName} ${approve ? 'approuvé' : 'rejeté'}`,
      });
    } catch (error) {
      console.error('❌ Erreur approval tool:', error);
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
              <TestButton size="sm" variant="ghost" onClick={() => setIsMinimized(false)} className="h-6 w-6 p-0">
                <Maximize2 className="w-3 h-3" />
              </TestButton>
              {isConnected ? (
                <TestButton size="sm" variant="ghost" onClick={endSession} className="h-6 w-6 p-0 text-destructive">
                  <PhoneOff className="w-3 h-3" />
                </TestButton>
              ) : (
                <TestButton size="sm" variant="ghost" onClick={onToggle} className="h-6 w-6 p-0">
                  <PhoneOff className="w-3 h-3" />
                </TestButton>
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
          <TestButton size="sm" variant="ghost" onClick={() => setIsMinimized(true)}>
            <Minimize2 className="w-4 h-4 mr-1" />
            Réduire
          </TestButton>
          {onToggle && (
            <TestButton size="sm" variant="ghost" onClick={onToggle}>
              <PhoneOff className="w-4 h-4 mr-1" />
              Fermer
            </TestButton>
          )}
        </div>

        {isConnected && (
          <div className="space-y-3">
            {/* Métriques enrichies */}
            <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
              <span>Durée: {formatTime(sessionDuration)}</span>
              <span>Échanges: {conversationMetrics.totalMessages}</span>
              <span>Tools: {conversationMetrics.toolCalls}</span>
              <span>Tokens: {conversationMetrics.tokens || 'N/A'}</span>
            </div>

            {/* Guardrail alerts */}
            {guardrailAlerts.map(alert => (
              <div key={alert.id} className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
                🚨 Contenu filtré par guardrail
              </div>
            ))}

            {/* Tool approval UI */}
            {pendingApproval && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded space-y-2">
                <div className="text-sm font-medium">Approbation requise</div>
                <div className="text-xs text-muted-foreground">
                  Tool: {pendingApproval.toolName}
                </div>
                <div className="flex gap-2">
                  <TestButton size="sm" onClick={() => handleToolApproval(true)}>
                    Approuver
                  </TestButton>
                  <TestButton size="sm" variant="outline" onClick={() => handleToolApproval(false)}>
                    Rejeter
                  </TestButton>
                </div>
              </div>
            )}

            {/* Text input hybride */}
            {isConnected && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTextMessage()}
                    placeholder="Message texte..."
                    className="flex-1 px-2 py-1 border rounded text-sm"
                  />
                  <TestButton size="sm" onClick={handleTextMessage} disabled={!textInput.trim()}>
                    Envoyer
                  </TestButton>
                </div>
              </div>
            )}

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

            <div className="flex gap-2">
              {isSpeaking && (
                <TestButton size="sm" variant="outline" onClick={handleInterrupt}>
                  Interrompre
                </TestButton>
              )}
              <TestButton 
                onClick={endSession}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="w-4 h-4 mr-1" />
                Terminer
              </TestButton>
            </div>

            {/* Transcription temps réel */}
            {nativeTranscripts && (
              <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                {nativeTranscripts}
              </div>
            )}
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
                <TestButton
                  variant={selectedConversationType === 'cold-call' ? 'default' : 'outline'}
                  onClick={() => setSelectedConversationType('cold-call')}
                  size="sm"
                >
                  Cold Call
                </TestButton>
                <TestButton
                  variant={selectedConversationType === 'rdv' ? 'default' : 'outline'}
                  onClick={() => setSelectedConversationType('rdv')}
                  size="sm"
                >
                  RDV Planifié
                </TestButton>
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
                  <div>💰 Négociation budget 80k€ + délais</div>
                </>
              )}
            </div>

            <TestButton 
              onClick={startSession}
              className="w-full"
              disabled={isConnecting}
            >
              <Phone className="w-4 h-4 mr-2" />
              Commencer la conversation
            </TestButton>
          </div>
        )}
      </div>
    </Card>
  );
}