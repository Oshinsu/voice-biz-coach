import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { instructions, voicePreset } = await req.json().catch(() => ({}));

    const selectedVoice = voicePreset === "rdv" ? "cedar" : "marin";
    console.log(`🎙️ Préparation session avec voix "${selectedVoice}" pour preset "${voicePreset || 'cold-call'}"`);
    console.log('🔑 Génération token éphémère OpenAI WebRTC (septembre 2025)...');
    
    const baseSession: Record<string, unknown> = {
      type: "realtime",
      model: "gpt-realtime",
      voice: selectedVoice,
      modalities: ["text", "audio"],
      turn_detection: {
        type: "server_vad",
        interrupt_response: true
      },
      instructions: instructions || "Assistant vocal pédagogique en temps réel pour BYSS VNS."
    };

    const modernAudioOverrides: Record<string, unknown> = {
      input_audio_format: {
        type: "pcm16",
        sample_rate: 16000,
        channels: 1
      },
      output_audio_format: {
        type: "opus",
        container: "ogg",
        sample_rate: 48000
      }
    };

    const legacyAudioOverrides: Record<string, unknown> = {
      input_audio_format: "pcm16",
      output_audio_format: "pcm16"
    };

    const createSession = async (overrides: Record<string, unknown>, label: string) => {
      console.log(`🧪 Tentative création session (${label})`);
      const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: {
            ...baseSession,
            ...overrides
          }
        })
      });
      return response;
    };

    let response = await createSession(modernAudioOverrides, "opus/pcm16 recommandé");
    let fallbackAttempted = false;

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ OpenAI error (opus/pcm16):', response.status, text);

      if (response.status >= 400 && response.status < 500) {
        console.warn('⏪ Repli vers configuration PCM16 héritée (API non à jour ?)');
        fallbackAttempted = true;
        response = await createSession(legacyAudioOverrides, "pcm16 héritage");

        if (!response.ok) {
          const legacyText = await response.text();
          console.error('❌ OpenAI error (pcm16 héritage):', response.status, legacyText);
          return new Response(JSON.stringify({ error: "openai_error", status: response.status, body: legacyText }), {
            status: 502,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        return new Response(JSON.stringify({ error: "openai_error", status: response.status, body: text }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const data = await response.json();
    console.log('✅ Réponse OpenAI:', data);

    const warnings = data?.warnings || data?.client_secret?.warnings;
    if (warnings && ((Array.isArray(warnings) && warnings.length > 0) || typeof warnings === "string")) {
      console.warn('⚠️ Avertissement OpenAI (fallback potentiel):', warnings);
    }

    const fallback = data?.client_secret?.metadata?.fallback_model || data?.client_secret?.metadata?.fallback;
    if (fallback) {
      console.warn('⚠️ Modèle de repli OpenAI détecté:', fallback);
    }

    // Extraire ek de la réponse
    const ek = (data?.client_secret?.value || data?.value);
    if (typeof ek !== "string" || !ek.startsWith("ek_")) {
      console.error('❌ Invalid ek:', ek, 'data:', data);
      return new Response(JSON.stringify({ error: "invalid_ek", body: data }), { 
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (fallbackAttempted) {
      console.warn('✅ Token obtenu après repli audio PCM16. Surveiller la mise à jour de l’API.');
    }

    console.log('✅ Token éphémère généré:', ek);
    return new Response(JSON.stringify({ value: ek, audioFormatFallback: fallbackAttempted }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("❌ Erreur:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});