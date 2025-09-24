import { OpenAIRealtimeWebRTC } from "@openai/agents-realtime";
import { supabase } from "@/integrations/supabase/client";
import { VOICE_AGENT_MODEL } from "../../shared/voiceAgentModel";

export interface VoiceAgentSession {
  transport: OpenAIRealtimeWebRTC;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

export async function startVoiceAgent(instructions?: string): Promise<VoiceAgentSession> {
  try {
    console.log('🎤 Démarrage Voice Agent SDK...');
    
    // 1) Récupère le token éphémère (ek_…)
    const { data, error } = await supabase.functions.invoke('get-openai-key', {
      body: { instructions: instructions || "Assistant vocal pédagogique en temps réel pour BYSS VNS." }
    });
    
    if (error) {
      console.error('❌ Erreur Edge Function:', error);
      throw new Error(`Edge Function error: ${error.message}`);
    }
    
    const { value: ek } = data;
    if (!ek?.startsWith("ek_")) {
      console.error('❌ Token éphémère invalide:', ek);
      throw new Error("Token éphémère invalide");
    }
    
    console.log('✅ Token éphémère obtenu:', ek.substring(0, 10) + '...');

    // 2) WebRTC transport avec token éphémère
    const webrtcTransport = new OpenAIRealtimeWebRTC({
      apiKey: ek
    });

    console.log('🎧 Initialisation des médias locaux...');
    const requestedLocalStream = await webrtcTransport.startLocalMedia({ audio: true }).catch(error => {
      console.error('❌ Impossible d\'initialiser le micro:', error);
      throw error;
    });

    // 3) Connexion WebRTC
    console.log('🔗 Connexion WebRTC...');
    await webrtcTransport.connect({
      apiKey: ek,
      model: VOICE_AGENT_MODEL
    });

    console.log('✅ Voice Agent connecté avec succès');
    const remoteStream = getVoiceAgentRemoteStream(webrtcTransport);

    const resolvedLocalStream = (requestedLocalStream as MediaStream | undefined)
      ?? getLocalStreamFromTransport(webrtcTransport);

    return {
      transport: webrtcTransport,
      localStream: resolvedLocalStream ?? null,
      remoteStream
    };

  } catch (error) {
    console.error('❌ Erreur startVoiceAgent:', error);
    throw error;
  }
}

    console.log('✅ Voice Agent arrêté');
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
    throw error;
  }
}

function isVoiceAgentSession(value: any): value is VoiceAgentSession {
  return value && typeof value === 'object' && 'transport' in value;
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

  const peerConnection = (transport as unknown as { pc?: RTCPeerConnection; peerConnection?: RTCPeerConnection }).pc
    ?? (transport as unknown as { pc?: RTCPeerConnection; peerConnection?: RTCPeerConnection }).peerConnection;

  if (!peerConnection) {
    return null;
  }

  const aggregatedStream = new MediaStream();
  peerConnection.getReceivers().forEach(receiver => {
    if (receiver.track) {
      aggregatedStream.addTrack(receiver.track);
    }
  });

  return aggregatedStream.getTracks().length > 0 ? aggregatedStream : null;
}
