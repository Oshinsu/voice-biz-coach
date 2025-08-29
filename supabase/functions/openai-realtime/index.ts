import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Liste des voix supportées par la nouvelle API Realtime
const SUPPORTED_VOICES = ['alloy', 'ash', 'ballad', 'coral', 'echo', 'sage', 'shimmer', 'verse'];

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

    const { instructions, voice = 'sage', model = 'gpt-4o-realtime-preview-2024-12-17' } = await req.json();

    // Validation de la voix
    const selectedVoice = SUPPORTED_VOICES.includes(voice) ? voice : 'sage';
    
    console.log('Creating OpenAI Realtime session:', {
      model,
      voice: selectedVoice,
      instructionsLength: instructions?.length || 0
    });

    // Request an ephemeral token from OpenAI with latest API
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        voice: selectedVoice,
        instructions: instructions || "Tu es un assistant commercial professionnel spécialisé dans la formation commerciale interactive. Tu parles français et tu t'adaptes au contexte de vente donné.",
        modalities: ["text", "audio"],
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        input_audio_transcription: {
          model: "whisper-1"
        },
        turn_detection: {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 1000
        },
        temperature: 0.8
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', response.status, errorText);
      throw new Error(`OpenAI API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Ephemeral session created successfully:", {
      sessionId: data.id,
      expires: data.expires_at,
      voice: selectedVoice,
      model: model
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating realtime session:", error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to create OpenAI Realtime session'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});