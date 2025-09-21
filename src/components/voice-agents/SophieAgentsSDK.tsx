import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TestButton } from "@/components/ui/test-button";
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

  const setupEventHandlers = (agent: EDHECVoiceAgent) => {
    // Connection events with metrics
    agent.on('connected', (data: any) => {
      console.log('✅ Agent connecté (natif):', data);
      setIsConnected(true);
      setIsConnecting(false);
      startTimeRef.current = new Date();
      addToHistory('system', 'Sophie Hennion-Moreau connectée (Agents SDK)', 'system');
    });

    agent.on('disconnected', (data: any) => {
      console.log('🔌 Agent déconnecté (natif):', data);
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
    });

    // Audio natif avancé
    agent.on('audio_output', (data: any) => {
      console.log('🔊 Audio natif détecté:', data);
      setIsSpeaking(true);
      setIsListening(false);
    });

    agent.on('audio_interrupted', (data: any) => {
      console.log('⚡ Audio interrompu (natif):', data);
      setIsSpeaking(false);
      setIsListening(true);
      addToHistory('system', '🔇 Interruption - À vous', 'system');
    });

    // Événements response natifs avec métriques
    agent.on('response_created', (data: any) => {
      console.log('🎬 Response créée (natif):', data);
      setIsSpeaking(true);
      setIsListening(false);
      setConversationMetrics(prev => ({
        ...prev,
        responsesStarted: (prev as any).responsesStarted + 1 || 1
      }));
    });

    agent.on('response_done', (data: any) => {
      console.log('🎬 Response terminée (natif):', data);
      setIsSpeaking(false);
      setIsListening(true);
      
      // Mise à jour métriques enrichies
      setConversationMetrics(prev => ({
        ...prev,
        responsesCompleted: (prev as any).responsesCompleted + 1 || 1,
        tokens: (data.usage?.total_tokens || 0) + (prev.tokens || 0),
        duration: data.metrics?.duration || prev.duration,
        lastUpdate: Date.now()
      }));
    });

    agent.on('native_transcription', (data: any) => {
      console.log('📝 Native transcription:', data.transcript);
      // Mettre à jour l'historique avec la transcription native
      setHistory(prev => prev.map(item => 
        (item as any).id === data.item_id 
          ? { ...item, content: data.transcript }
          : item
      ));
    });

    // Transcription temps réel native
    agent.on('transcript_updated', (data: any) => {
      console.log('📝 Transcription native:', data);
      if (data.transcript) {
        setNativeTranscripts(prev => prev + ' ' + data.transcript);
      }
    });

    // History native avec métriques enrichies
    agent.on('history_updated', (data: any) => {
      console.log('📚 Historique natif:', data);
      
      if (data.history) {
        // Convert SDK history to our format
        const convertedHistory: HistoryItem[] = data.history.map((item: any) => ({
          role: item.role || 'assistant',
          content: item.content?.find((c: any) => c.type === 'text')?.text || 'Audio message',
          timestamp: new Date(item.timestamp || Date.now()),
          type: item.type || 'audio'
        }));
        setHistory(convertedHistory);
        setExchangeCount(convertedHistory.length);
        
        // Mise à jour métriques de conversation
        if (data.metrics) {
          setConversationMetrics(prev => ({
            ...prev,
            ...data.metrics
          }));
        }
      }
    });

    // Tool approval avec UI améliorée
    agent.on('tool_approval_requested', (data: any) => {
      console.log('🔧 Approbation tool requise (natif):', data);
      setPendingApproval({
        toolName: data.toolName || 'Unknown Tool',
        parameters: data.parameters || {},
        approvalItem: data.approvalItem,
        request: data.request,
        timestamp: data.timestamp || Date.now()
      });
    });

    // Guardrails events
    agent.on('guardrail_tripped', (data: any) => {
      console.log('🚨 Guardrail déclenché:', data);
      setGuardrailAlerts(prev => [...prev, {
        ...data,
        id: Date.now()
      }]);
      
      // Auto-remove alert after 5 seconds
      setTimeout(() => {
        setGuardrailAlerts(prev => prev.filter(alert => alert.id !== data.timestamp));
      }, 5000);
    });

    // Error events enrichis
    agent.on('error', (data: any) => {
      console.error('❌ Erreur agent natif:', data);
      setIsConnected(false);
      setIsConnecting(false);
      toast({
        title: "Erreur session",
        description: data.error?.message || "Erreur de connexion",
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

  // Support text input hybride
  const handleTextMessage = async () => {
    if (agentRef.current && isConnected && textInput.trim()) {
      try {
        await agentRef.current.sendMessage(textInput.trim());
        console.log('📤 Message texte envoyé:', textInput);
        setTextInput('');
        
        // Add to local history
        addToHistory('user', textInput.trim(), 'transcript');
      } catch (error) {
        console.error('❌ Erreur envoi message texte:', error);
      }
    }
  };

  // Tool approval workflow
  const handleToolApproval = async (approve: boolean) => {
    if (!pendingApproval || !agentRef.current) return;

    try {
      if (approve) {
        await agentRef.current.approveTool(pendingApproval.approvalItem);
        console.log('✅ Tool approuvé:', pendingApproval.toolName);
      } else {
        await agentRef.current.rejectTool(pendingApproval.request);
        console.log('❌ Tool rejeté:', pendingApproval.toolName);
      }
      setPendingApproval(null);
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