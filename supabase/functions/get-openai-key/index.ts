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

    // Appel correct selon doc officielle OpenAI /v1/realtime/client_secrets
    console.log('📝 Instructions envoyées:', instructions);
    
    // Body encapsulé dans "session" selon doc officielle
    const requestBody = {
      session: {
        type: "realtime",
        model: "gpt-realtime",
        voice: "alloy",
        modalities: ["text", "audio"],
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        turn_detection: { type: "semantic_vad" },
        instructions: instructions || "Your system prompt here.",
        ...(tools && { tools })
      }
    };
    
    console.log('📦 Body de la requête:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Token éphémère généré avec succès:', data);

    // Extraire client_secret.value et retourner format compatible
    if (data.client_secret?.value) {
      return new Response(JSON.stringify({ value: data.client_secret.value }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('client_secret.value manquant dans la réponse OpenAI');
    }
  } catch (error) {
    console.error("❌ Erreur génération token éphémère:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});