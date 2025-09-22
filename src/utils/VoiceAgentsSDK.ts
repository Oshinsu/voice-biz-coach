// @ts-ignore - SDK Voice Agents types
import { RealtimeAgent, RealtimeSession } from "@openai/agents";
// @ts-ignore - SDK Voice Agents types  
import { OpenAIRealtimeWebRTC } from "@openai/agents/realtime";
import { supabase } from "@/integrations/supabase/client";

export async function startVoiceAgent(instructions?: string): Promise<RealtimeSession> {
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

    // 2) Agent + transport + session
    const agent = new RealtimeAgent({
      name: "BYSS VNS Assistant",
      instructions: instructions || "Tu es un assistant vocal pédagogique spécialisé dans les scénarios BYSS VNS. Tu aides les étudiants à s'entraîner à la vente en situation réelle."
    });
    
    const transport = new OpenAIRealtimeWebRTC();
    
    const session = new RealtimeSession(agent, transport, {
      // outputGuardrails, tools si besoin
    });

    // 3) Connexion WebRTC (SDK)
    console.log('🔗 Connexion WebRTC...');
    await session.connect({
      apiKey: ek,
      initialSessionConfig: {
        voice: "alloy",
        modalities: ["text", "audio"],
        inputAudioFormat: "pcm16",
        outputAudioFormat: "pcm16",
        turn_detection: { type: "semantic_vad" }
      }
    });

    // 4) Events utiles
    session.on("agent_start", () => {
      console.log('🤖 Agent démarré');
    });
    
    session.on("agent_stop", () => {
      console.log('🤖 Agent arrêté');
    });
    
    session.on("error", (error) => {
      console.error('❌ Erreur session:', error);
    });

    session.on("connection_state_changed", (state) => {
      console.log('🔗 État connexion:', state);
    });

    console.log('✅ Voice Agent connecté avec succès');
    return session;

  } catch (error) {
    console.error('❌ Erreur startVoiceAgent:', error);
    throw error;
  }
}

export function stopVoiceAgent(session: RealtimeSession) {
  try {
    console.log('🛑 Arrêt Voice Agent...');
    session.close();
    console.log('✅ Voice Agent arrêté');
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
  }
}