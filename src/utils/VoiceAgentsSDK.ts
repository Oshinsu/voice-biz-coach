import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
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

    // 2) Agent + session (selon documentation officielle)
    const agent = new RealtimeAgent({
      name: "BYSS VNS Assistant",
      instructions: instructions || "Tu es un assistant vocal pédagogique spécialisé dans les scénarios BYSS VNS. Tu aides les étudiants à s'entraîner à la vente en situation réelle."
    });
    
    const session = new RealtimeSession(agent);

    // 3) Connexion WebRTC (SDK) - API simplifiée
    console.log('🔗 Connexion WebRTC...');
    await session.connect({
      apiKey: ek
    });

    // 4) Connexion réussie - les événements seront gérés côté composant
    console.log('🔗 Connexion WebRTC établie');

    console.log('✅ Voice Agent connecté avec succès');
    return session;

  } catch (error) {
    console.error('❌ Erreur startVoiceAgent:', error);
    throw error;
  }
}

export async function stopVoiceAgent(session: RealtimeSession) {
  console.log('🛑 Arrêt Voice Agent...');

  try {
    if (typeof session.disconnect === 'function') {
      await session.disconnect();
    } else if (typeof session.close === 'function') {
      await session.close();
    } else {
      throw new Error("La session ne propose pas de méthode de fermeture compatible");
    }

    console.log('✅ Voice Agent arrêté');
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
    throw error;
  }
}
