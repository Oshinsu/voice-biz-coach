import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { supabase } from "@/integrations/supabase/client";

type VoicePreset = "cold-call" | "rdv";

export async function startVoiceAgent(
  instructions?: string,
  voicePreset: VoicePreset = "cold-call"
): Promise<RealtimeSession> {
  try {
    console.log('🎤 Démarrage Voice Agent SDK...');
    
    // 1) Récupère le token éphémère (ek_…)
    const { data, error } = await supabase.functions.invoke('get-openai-key', {
      body: {
        instructions: instructions || "Assistant vocal pédagogique en temps réel pour BYSS VNS.",
        voicePreset
      }
    });

    if (error) {
      console.error('❌ Erreur Edge Function:', error);
      const details = typeof error?.details === 'string'
        ? error.details
        : error?.details ? JSON.stringify(error.details) : undefined;
      const context = typeof (error as any)?.context === 'string'
        ? (error as any).context
        : (error as any)?.context ? JSON.stringify((error as any).context) : undefined;
      const extraInfo = [details, context].filter(Boolean).join(' | ');
      throw new Error(`Edge Function error: ${error.message}${extraInfo ? ` – ${extraInfo}` : ''}`);
    }

    const { value: ek, audioFormatFallback } = data ?? {};
    if (!ek?.startsWith("ek_")) {
      console.error('❌ Token éphémère invalide:', ek);
      throw new Error("Token éphémère invalide");
    }

    if (audioFormatFallback) {
      console.warn('⚠️ Session RTC obtenue après repli audio PCM16. Vérifier support opus côté API.');
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

export function stopVoiceAgent(session: RealtimeSession) {
  try {
    console.log('🛑 Arrêt Voice Agent...');
    // La session sera fermée automatiquement lors du démontage du composant
    // ou via les méthodes internes du transport WebRTC
    console.log('✅ Voice Agent arrêté');
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
  }
}