import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TestButton } from "@/components/ui/test-button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Phone, PhoneOff, Loader2, Mic, MicOff, Volume2,
  Minimize2, Maximize2, Zap
} from "lucide-react";

import {
  RealtimeAgent,
  RealtimeSession,
  type RealtimeItem,
  type TransportLayerTranscriptDelta,
} from "@openai/agents/realtime";

import { buildEDHECInstructions } from "@/lib/edhec-prompts";

type ConvKind = "cold-call" | "rdv";

interface Props {
  conversationType?: ConvKind;
  open?: boolean;
  onToggle?: () => void;
}

export function SophieVoiceAgent({
  conversationType = "cold-call",
  open = true,
  onToggle,
}: Props) {
  const { toast } = useToast();

  // ---- UI state -----------------------------------------------------------
  const [isMinimized, setIsMinimized] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [selectedType, setSelectedType] = useState<ConvKind>(conversationType);
  const [textInput, setTextInput] = useState("");
  const [nativeTranscripts, setNativeTranscripts] = useState("");

  // history fourni par le SDK (source de vérité)
  const [history, setHistory] = useState<RealtimeItem[]>([]);
  const [toolApproval, setToolApproval] = useState<any | null>(null);

  // métriques simples
  const [duration, setDuration] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);

  // refs
  const sessionRef = useRef<RealtimeSession | null>(null);
  const startAtRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);

  // ---- helpers ------------------------------------------------------------
  const instructions = useMemo(
    () => buildEDHECInstructions(selectedType),
    [selectedType]
  );

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const computeExchanges = (hist: RealtimeItem[]) => {
    // estimation simple: nb de messages / 2
    const msgs = hist.filter((i) => i.type === "message");
    return Math.ceil(msgs.length / 2);
  };

  async function fetchEphemeralKey(): Promise<string> {
    // Implémentez côté serveur: POST /api/realtime/client-secret
    // qui fait un POST https://api.openai.com/v1/realtime/client_secrets
    // puis renvoie { value: "ek_..." }
    const res = await fetch("/api/realtime/client-secret", { method: "POST" });
    if (!res.ok) throw new Error("Impossible d'obtenir un client secret Realtime");
    const data = await res.json();
    if (!data?.value) throw new Error("Client secret invalide");
    return data.value as string;
  }

  // ---- session lifecycle --------------------------------------------------
  async function startSession() {
    if (isConnecting) return;
    // si une session existe, on la ferme proprement d'abord
    if (sessionRef.current) await endSession();

    try {
      setIsConnecting(true);
      setNativeTranscripts("");
      setHistory([]);
      setExchangeCount(0);

      const agent = new RealtimeAgent({
        name: "Sophie Hennion-Moreau",
        instructions, // prompt dynamique
      });

      const session = new RealtimeSession(agent, {
        model: "gpt-realtime",
        // Réglages conformes doc (texte + audio + VAD sémantique)
        config: {
          inputAudioFormat: "pcm16",
          outputAudioFormat: "pcm16",
          inputAudioTranscription: { model: "gpt-4o-mini-transcribe" },
          turnDetection: {
            type: "semantic_vad",
            eagerness: "medium",
            createResponse: true,
            interruptResponse: true,
          },
        },
      });

      // -- événements majeurs
      session.on("history_updated", (hist: RealtimeItem[]) => {
        if (!mountedRef.current) return;
        setHistory(hist);
        setExchangeCount(computeExchanges(hist));
        // Heuristique d'état "parle/écoute" : si dernier item assistant non terminé → speaking
        const last = [...hist].reverse().find((i) => i.type === "message");
        if (last?.type === "message" && (last as any).role === "assistant") {
          setIsSpeaking(true);
          setIsListening(false);
        } else {
          setIsListening(true);
          setIsSpeaking(false);
        }
      });

      // Transport-level events for transcripts
      if ((session as any).transport) {
        (session as any).transport.on("transcript_delta", (evt: any) => {
          setNativeTranscripts((prev) => prev + (evt?.delta ?? ""));
        });
      }

      session.on("audio_interrupted", () => {
        setIsSpeaking(false);
        setIsListening(true);
      });

      session.on("tool_approval_requested", (_ctx, _agent, request: any) => {
        setToolApproval(request); // request.approvalItem / request.rawItem dispo
      });

      session.on("error", (err: any) => {
        toast({
          title: "Erreur Realtime",
          description: String(err?.message || err || "Erreur inconnue"),
          variant: "destructive",
        });
      });

      // Connexion WebRTC avec client secret éphémère
      const ek = await fetchEphemeralKey();
      await session.connect({ apiKey: ek });

      // Démarrage timers/états
      sessionRef.current = session;
      startAtRef.current = Date.now();
      setIsConnected(true);
      setIsListening(true);
      setIsSpeaking(false);

      timerRef.current = setInterval(() => {
        if (startAtRef.current) {
          setDuration(Math.floor((Date.now() - startAtRef.current) / 1000));
        }
      }, 1000);

      toast({
        title: "✅ Connecté",
        description: `Sophie EDHEC prête (${selectedType})`,
      });
    } catch (e: any) {
      toast({
        title: "Connexion échouée",
        description: String(e?.message || e),
        variant: "destructive",
      });
    } finally {
      if (mountedRef.current) setIsConnecting(false);
    }
  }

  async function endSession() {
    try {
      const s = sessionRef.current;
      sessionRef.current = null;

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Déconnexion propre (SDK expose close/disconnect)
      if (s) {
        try {
          if (typeof (s as any).disconnect === 'function') {
            await (s as any).disconnect();
          } else if (typeof (s as any).close === 'function') {
            await (s as any).close();
          }
        } catch {
          // fallback: fermer le transport si nécessaire
          try {
            (s as any)?.transport?.close?.();
          } catch {}
        }
      }
    } finally {
      // reset UI
      setIsConnected(false);
      setIsListening(false);
      setIsSpeaking(false);
      setNativeTranscripts("");
      setToolApproval(null);
      setDuration(0);
      setExchangeCount(0);
    }
  }

  async function handleInterrupt() {
    const s = sessionRef.current;
    if (!s || !isConnected) return;
    try {
      await s.interrupt();
      toast({ title: "Interruption", description: "Réponse coupée." });
    } catch (e) {
      toast({
        title: "Erreur interruption",
        description: "Impossible d'interrompre",
        variant: "destructive",
      });
    }
  }

  async function handleSendText() {
    const s = sessionRef.current;
    const msg = textInput.trim();
    if (!s || !isConnected || !msg) return;
    try {
      await s.sendMessage(msg);
      setTextInput("");
    } catch (e) {
      toast({
        title: "Erreur envoi",
        description: "Message non envoyé",
        variant: "destructive",
      });
    }
  }

  async function handleApproveTool(approve: boolean) {
    const s = sessionRef.current;
    if (!s || !toolApproval) return;
    try {
      if (approve) {
        await s.approve(toolApproval.approvalItem);
      } else {
        await s.reject(toolApproval.rawItem);
      }
      setToolApproval(null);
    } catch (e) {
      toast({
        title: "Erreur approbation",
        description: String((e as any)?.message || e),
        variant: "destructive",
      });
    }
  }

  // timers / cleanup
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      void endSession();
    };
  }, []);

  useEffect(() => {
    if (!isConnected && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [isConnected]);

  // ---- UI -----------------------------------------------------------------
  if (!open) return null;

  const Mini = (
    <Card className="fixed bottom-4 right-4 w-60 shadow-xl border-2 z-50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                isConnected
                  ? isSpeaking
                    ? "bg-blue-100 animate-pulse"
                    : isListening
                    ? "bg-green-100"
                    : "bg-blue-50"
                  : "bg-muted"
              }`}
            >
              👩‍💼
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs truncate">Sophie</p>
              {isConnected && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatTime(duration)}</span>
                  <span>•</span>
                  <span>{exchangeCount}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <TestButton
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(false)}
              className="h-6 w-6 p-0"
            >
              <Maximize2 className="w-3 h-3" />
            </TestButton>
            {isConnected ? (
              <TestButton
                size="sm"
                variant="ghost"
                onClick={endSession}
                className="h-6 w-6 p-0 text-destructive"
              >
                <PhoneOff className="w-3 h-3" />
              </TestButton>
            ) : (
              <TestButton
                size="sm"
                variant="ghost"
                onClick={onToggle}
                className="h-6 w-6 p-0"
              >
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
              <Badge
                variant="default"
                className="bg-blue-600 animate-pulse text-xs h-5"
              >
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

  if (isMinimized) return Mini;

  return (
    <Card className="fixed bottom-6 right-6 w-96 p-6 bg-card/95 backdrop-blur-sm border shadow-lg z-50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                isConnected ? (isSpeaking ? "bg-blue-100 animate-pulse" : "bg-blue-50") : "bg-muted"
              }`}
            >
              👩‍💼
            </div>
            <div>
              <span className="font-medium">Sophie Hennion-Moreau</span>
              <p className="text-xs text-muted-foreground">
                Dir. Innovation Pédagogique • EDHEC
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Agents SDK
          </Badge>
        </div>

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
            <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
              <span>Durée: {formatTime(duration)}</span>
              <span>Échanges: {exchangeCount}</span>
              <span>Tools: {history.filter((i) => i.type === "tool_call").length}</span>
              <span>Tokens: N/A</span>
            </div>

            {toolApproval && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded space-y-2">
                <div className="text-sm font-medium">Approbation requise</div>
                <div className="text-xs text-muted-foreground">Tool en attente…</div>
                <div className="flex gap-2">
                  <TestButton size="sm" onClick={() => handleApproveTool(true)}>
                    Approuver
                  </TestButton>
                  <TestButton
                    size="sm"
                    variant="outline"
                    onClick={() => handleApproveTool(false)}
                  >
                    Rejeter
                  </TestButton>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendText()}
                  placeholder="Message texte…"
                  className="flex-1 px-2 py-1 border rounded text-sm"
                />
                <TestButton size="sm" onClick={handleSendText} disabled={!textInput.trim()}>
                  Envoyer
                </TestButton>
              </div>
            </div>

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

            <div className="flex gap-2">
              {isSpeaking && (
                <TestButton size="sm" variant="outline" onClick={handleInterrupt}>
                  Interrompre
                </TestButton>
              )}
              <TestButton onClick={endSession} variant="destructive" className="flex-1">
                <PhoneOff className="w-4 h-4 mr-1" />
                Terminer
              </TestButton>
            </div>

            {!!nativeTranscripts && (
              <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                {nativeTranscripts}
              </div>
            )}
          </div>
        )}

        {isConnecting && (
          <div className="text-center py-4">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Connexion à Sophie Hennion-Moreau…
            </p>
            <p className="text-xs text-muted-foreground mt-1">VNS EDHEC + Agents SDK</p>
          </div>
        )}

        {!isConnected && !isConnecting && (
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Type de conversation</h4>
              <div className="grid grid-cols-2 gap-2">
                <TestButton
                  variant={selectedType === "cold-call" ? "default" : "outline"}
                  onClick={() => setSelectedType("cold-call")}
                  size="sm"
                >
                  Cold Call
                </TestButton>
                <TestButton
                  variant={selectedType === "rdv" ? "default" : "outline"}
                  onClick={() => setSelectedType("rdv")}
                  size="sm"
                >
                  RDV Planifié
                </TestButton>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              {selectedType === "cold-call" ? (
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

            <TestButton onClick={startSession} className="w-full" disabled={isConnecting}>
              <Phone className="w-4 h-4 mr-2" />
              Commencer la conversation
            </TestButton>
          </div>
        )}
      </div>
    </Card>
  );
}