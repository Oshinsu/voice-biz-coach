import { OpenAIRealtimeWebRTC } from "@openai/agents-realtime";
import { supabase } from "@/integrations/supabase/client";
import { VOICE_AGENT_MODEL } from "../../shared/voiceAgentModel";

export async function startVoiceAgent(instructions?: string): Promise<OpenAIRealtimeWebRTC> {
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

    // 3) Connexion WebRTC
    console.log('🔗 Connexion WebRTC...');
    await webrtcTransport.connect({
      apiKey: ek,
      model: VOICE_AGENT_MODEL
    });

    console.log('✅ Voice Agent connecté avec succès');
    return webrtcTransport;

  } catch (error) {
    console.error('❌ Erreur startVoiceAgent:', error);
    throw error;
  }
}

export async function stopVoiceAgent(transport?: OpenAIRealtimeWebRTC | null) {
  if (!transport) {
    return;
  }

  console.log('🛑 Arrêt Voice Agent...');

  const stopStreamTracks = (stream?: MediaStream | null) => {
    if (!stream) return;
    stream.getTracks().forEach(track => {
      try {
        track.stop();
      } catch (trackError) {
        console.warn('⚠️ Impossible d\'arrêter une piste média:', trackError);
      }
    });
  };

  try {
    const transportAny = transport as unknown as {
      localStream?: MediaStream;
      remoteStream?: MediaStream;
      microphoneStream?: MediaStream;
      speakerStream?: MediaStream;
      remoteStreams?: MediaStream[];
    };

    stopStreamTracks(transportAny.localStream || transportAny.microphoneStream || null);
    stopStreamTracks(transportAny.remoteStream || transportAny.speakerStream || null);

    if (Array.isArray(transportAny.remoteStreams)) {
      transportAny.remoteStreams.forEach(stream => stopStreamTracks(stream));
    }

    if (typeof transport.disconnect === 'function') {
      await transport.disconnect();
    } else if (typeof (transport as any).close === 'function') {
      await (transport as any).close();
    }

    console.log('✅ Voice Agent arrêté');
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
    throw error;
  }
}