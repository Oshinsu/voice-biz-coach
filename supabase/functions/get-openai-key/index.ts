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

    const { instructions } = await req.json().catch(() => ({}));
    console.log('🔑 Génération token éphémère OpenAI WebRTC (septembre 2025)...');
    
    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "alloy",
          modalities: ["text", "audio"],
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          turn_detection: { type: "semantic_vad" },
          instructions: instructions || "Assistant vocal pédagogique en temps réel pour BYSS VNS."
        }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ OpenAI error:', response.status, text);
      return new Response(JSON.stringify({ error: "openai_error", status: response.status, body: text }), { 
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('✅ Réponse OpenAI:', data);
    
    // Extraire ek de la réponse
    const ek = (data?.client_secret?.value || data?.value);
    if (typeof ek !== "string" || !ek.startsWith("ek_")) {
      console.error('❌ Invalid ek:', ek, 'data:', data);
      return new Response(JSON.stringify({ error: "invalid_ek", body: data }), { 
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('✅ Token éphémère généré:', ek);
    return new Response(JSON.stringify({ value: ek }), { 
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