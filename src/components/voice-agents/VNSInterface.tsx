import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Mic, MicOff, Phone, PhoneOff, Brain, Clock, Target } from 'lucide-react';
import { TrustEngine, TrustState } from '@/lib/trust-engine';
import { buildSophiePrompt, DEFAULT_CONFIGS, VNSConfig } from '@/lib/prompts/vns-template';
import { VNSReport } from '@/lib/tools/vns-tools';

interface VNSInterfaceProps {
  scenarioId: string;
  onSessionEnd?: (report: VNSReport) => void;
}

export const VNSInterface: React.FC<VNSInterfaceProps> = ({ scenarioId, onSessionEnd }) => {
  const { toast } = useToast();
  const [sessionType, setSessionType] = useState<"cold" | "rdv">("cold");
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSophieSpeaking, setIsSophieSpeaking] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);
  
  // Trust & Coaching
  const [trustState, setTrustState] = useState<TrustState>({ level: 0, phase: "ouverture", lastChange: Date.now(), evidence: [] });
  const [currentScores, setCurrentScores] = useState({
    ouverture: 0, ecoute_active: 0, decouverte: 0, objections: 0, next_step: 0
  });
  const [debugMode, setDebugMode] = useState(false);
  const [trustChanges, setTrustChanges] = useState<string[]>([]);
  
  const trustEngineRef = useRef<TrustEngine | null>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize trust engine
    trustEngineRef.current = new TrustEngine(sessionType, (state) => {
      setTrustState(state);
      if (debugMode) {
        setTrustChanges(prev => [...prev.slice(-4), `Trust ${state.level} (${state.evidence[state.evidence.length - 1] || ""})`]);
      }
    });
  }, [sessionType, debugMode]);

  const startSession = async () => {
    try {
      const config = sessionType === "cold" ? DEFAULT_CONFIGS.cold : DEFAULT_CONFIGS.rdv;
      const prompt = buildSophiePrompt(config);
      
      // Simuler connexion WebSocket pour VNS
      setIsConnected(true);
      setSessionDuration(0);
      setExchangeCount(0);
      
      // Démarrer timer
      sessionTimerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Session VNS démarrée",
        description: `Mode: ${sessionType.toUpperCase()} - Sophie est prête`,
      });
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer la session",
        variant: "destructive",
      });
    }
  };

  const endSession = () => {
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
    }
    
    // Générer rapport final
    const report: VNSReport = {
      scenario: sessionType === "cold" ? "cold_call" : "rdv",
      scores: {
        ...currentScores,
        overall: Object.values(currentScores).reduce((a, b) => a + b, 0) / 5
      },
      moments_cles: [
        { t: 30, phase: "ouverture", note: "Premier contact établi" },
        { t: 120, phase: "decouverte", note: "Questions de découverte" },
        { t: 300, phase: "closing", note: "Proposition next step" }
      ],
      recap_1_phrase: "Session avec approche structurée, progression trust correcte",
      actions_3: [
        "Améliorer reformulations avant nouvelles questions",
        "Creuser davantage l'impact business",
        "Structurer le closing avec bénéfices clairs"
      ]
    };
    
    setIsConnected(false);
    setIsListening(false);
    setIsSophieSpeaking(false);
    onSessionEnd?.(report);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simuler analyse trust sur message utilisateur
      const mockMessage = "Bonjour Sophie, j'aimerais comprendre comment vous gérez actuellement l'attribution marketing";
      const result = trustEngineRef.current?.analyzeUserMessage(mockMessage);
      
      if (result && debugMode) {
        toast({
          title: "Trust Analysis",
          description: `${result.trustChange > 0 ? "+" : ""}${result.trustChange}: ${result.reason}`,
        });
      }
      
      setExchangeCount(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTrustColor = (level: number) => {
    if (level <= 1) return "bg-red-500";
    if (level <= 2) return "bg-orange-500";
    if (level <= 3) return "bg-yellow-500";
    if (level <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getTrustLabel = (level: number) => {
    const labels = ["Méfiant", "Curieux", "Intéressé", "Engagé", "Convaincu", "Validé"];
    return labels[level] || "Inconnu";
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            VNS - Voice Navigation System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Type de session</label>
            <Select value={sessionType} onValueChange={(value: "cold" | "rdv") => setSessionType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cold">Cold Call (Trust 0→5)</SelectItem>
                <SelectItem value="rdv">RDV Planifié (Trust 2→5)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="debug"
              checked={debugMode}
              onChange={(e) => setDebugMode(e.target.checked)}
            />
            <label htmlFor="debug" className="text-sm">Mode debug (voir changements trust)</label>
          </div>

          <Button onClick={startSession} className="w-full" size="lg">
            <Phone className="h-4 w-4 mr-2" />
            Démarrer session VNS
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Status Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant={sessionType === "cold" ? "destructive" : "default"}>
                {sessionType === "cold" ? "COLD CALL" : "RDV PLANIFIÉ"}
              </Badge>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatTime(sessionDuration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>{exchangeCount} échanges</span>
              </div>
            </div>
            <Button onClick={endSession} variant="outline" size="sm">
              <PhoneOff className="h-4 w-4 mr-2" />
              Terminer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trust & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Niveau de confiance Sophie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{trustState.level}/5</span>
                <Badge className={getTrustColor(trustState.level)}>
                  {getTrustLabel(trustState.level)}
                </Badge>
              </div>
              <Progress value={(trustState.level / 5) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Phase: {trustState.phase}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Score temps réel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Ouverture: {currentScores.ouverture}/5</div>
              <div>Écoute: {currentScores.ecoute_active}/5</div>
              <div>Découverte: {currentScores.decouverte}/5</div>
              <div>Objections: {currentScores.objections}/5</div>
              <div className="col-span-2 text-center font-semibold">
                Next Step: {currentScores.next_step}/5
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-4">
              {isSophieSpeaking && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm">Sophie parle...</span>
                </div>
              )}
              
              {isListening && (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                  <span className="text-sm">Vous parlez...</span>
                </div>
              )}
            </div>

            <Button
              onClick={toggleListening}
              size="lg"
              className={`w-16 h-16 rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              {isListening ? "Cliquez pour arrêter l'enregistrement" : "Cliquez pour commencer à parler"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Debug Panel */}
      {debugMode && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Debug - Changements Trust</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {trustChanges.map((change, i) => (
                <p key={i} className="text-xs font-mono">{change}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};