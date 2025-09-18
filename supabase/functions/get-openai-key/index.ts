import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    // Parse request body to get instructions and tools
    const { instructions, tools } = await req.json();
    if (!instructions) {
      throw new Error('Instructions are required');
    }

    console.log('🔑 Génération token éphémère OpenAI pour Agents SDK WebRTC...');

    // Appel correct selon la documentation officielle Agents SDK + WebRTC
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: Math.random() > 0.5 ? "marin" : "cedar", // 🎯 Nouvelles voix 2025 naturelles
          instructions: instructions,
          tools: tools || [],
          turn_detection: {
            type: "server_vad", // ✅ VAD stable (semantic_vad = instable)
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 800 // ⚡ Optimisé pour interruptions rapides
          },
          input_audio_transcription: {
            model: "whisper-1"
          },
          temperature: 0.8,
          max_response_output_tokens: 500 // 🎯 Réponses courtes Sophie
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Token éphémère généré avec succès pour Agents SDK');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("❌ Erreur génération token éphémère:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});