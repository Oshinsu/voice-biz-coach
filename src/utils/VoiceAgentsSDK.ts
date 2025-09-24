import { OpenAIRealtimeWebRTC } from "@openai/agents-realtime";
import { supabase } from "@/integrations/supabase/client";
import { VOICE_AGENT_MODEL } from "../../shared/voiceAgentModel";

export interface VoiceAgentSession {
  transport: OpenAIRealtimeWebRTC;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

function isVoiceAgentSession(value: any): value is VoiceAgentSession {
  return value && typeof value === "object" && "transport" in value;
}

function getLocalStreamFromTransport(transport: OpenAIRealtimeWebRTC): MediaStream | null {
  const possibleStream = (transport as unknown as { localStream?: MediaStream | null }).localStream;
  return possibleStream instanceof MediaStream ? possibleStream : null;
}

function extractRemoteStream(transport: OpenAIRealtimeWebRTC): MediaStream | null {
  const directRemoteStream = (transport as unknown as { remoteStream?: MediaStream | null }).remoteStream;
  if (directRemoteStream instanceof MediaStream) {
    return directRemoteStream;
  }

  const peerConnection =
    (transport as unknown as { pc?: RTCPeerConnection; peerConnection?: RTCPeerConnection }).pc ??
    (transport as unknown as { pc?: RTCPeerConnection; peerConnection?: RTCPeerConnection }).peerConnection;

  if (!peerConnection) {
    return null;
  }

  const aggregatedStream = new MediaStream();
  peerConnection.getReceivers().forEach((receiver) => {
    if (receiver.track) {
      aggregatedStream.addTrack(receiver.track);
    }
  });

  return aggregatedStream.getTracks().length > 0 ? aggregatedStream : null;
}

export function getVoiceAgentRemoteStream(
  value: VoiceAgentSession | OpenAIRealtimeWebRTC | null | undefined,
): MediaStream | null {
  if (!value) {
    return null;
  }

  const transport = isVoiceAgentSession(value) ? value.transport : value;
  return extractRemoteStream(transport);
}

export function stopMediaStream(stream: MediaStream | null | undefined) {
  if (!stream) {
    return;
  }

  stream.getTracks().forEach((track) => {
    try {
      track.stop();
    } catch (error) {
      console.warn("⚠️ Impossible d'arrêter la piste média:", error);
    }
  });
}

export async function startVoiceAgent(instructions?: string): Promise<VoiceAgentSession> {
  try {
    console.log("🎤 Démarrage Voice Agent SDK...");

    const { data, error } = await supabase.functions.invoke("get-openai-key", {
      body: { instructions: instructions || "Assistant vocal pédagogique en temps réel pour BYSS VNS." },
    });

    if (error) {
      console.error("❌ Erreur Edge Function:", error);
      throw new Error(`Edge Function error: ${error.message}`);
    }

    const { value: ek } = data;
    if (!ek?.startsWith("ek_")) {
      console.error("❌ Token éphémère invalide:", ek);
      throw new Error("Token éphémère invalide");
    }

    console.log("✅ Token éphémère obtenu:", ek.substring(0, 10) + "...");

    const webrtcTransport = new OpenAIRealtimeWebRTC({
      apiKey: ek,
    });

    console.log("🎧 Initialisation des médias locaux...");
    const requestedLocalStream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch((mediaError) => {
      console.error("❌ Impossible d'initialiser le micro:", mediaError);
      throw mediaError;
    });

    console.log("🔗 Connexion WebRTC...");
    await webrtcTransport.connect({
      apiKey: ek,
      model: VOICE_AGENT_MODEL,
    });

    console.log("✅ Voice Agent connecté avec succès");

    const remoteStream = getVoiceAgentRemoteStream(webrtcTransport);
    const resolvedLocalStream = (requestedLocalStream as MediaStream | undefined) ?? getLocalStreamFromTransport(webrtcTransport);

    return {
      transport: webrtcTransport,
      localStream: resolvedLocalStream ?? null,
      remoteStream,
    };
  } catch (error) {
    console.error("❌ Erreur startVoiceAgent:", error);
    throw error;
  }
}

export async function stopVoiceAgent(session: VoiceAgentSession | null | undefined) {
  if (!session) {
    return;
  }

  try {
    const { transport, localStream, remoteStream } = session;

    if (transport) {
      try {
        if (typeof (transport as unknown as { disconnect?: () => Promise<void> }).disconnect === "function") {
          await (transport as unknown as { disconnect: () => Promise<void> }).disconnect();
        } else if (typeof (transport as unknown as { close?: () => void }).close === "function") {
          (transport as unknown as { close: () => void }).close();
        }
      } catch (transportError) {
        console.warn("⚠️ Impossible de fermer le transport WebRTC proprement:", transportError);
      }

      if (typeof (transport as unknown as { removeAllListeners?: () => void }).removeAllListeners === "function") {
        (transport as unknown as { removeAllListeners: () => void }).removeAllListeners();
      }
    }

    stopMediaStream(localStream);
    stopMediaStream(remoteStream);

    console.log("✅ Voice Agent arrêté");
  } catch (error) {
    console.error("❌ Erreur lors de l'arrêt du Voice Agent:", error);
    throw error;
  }
}
