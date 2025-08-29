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

    const { voice = "alloy" } = await req.json();

    console.log('🔑 Generating ephemeral token for WebRTC...');

    // Structure correcte selon doc OpenAI WebRTC - PAS d'instructions dans sessionConfig
    const sessionConfig = {
      session: {
        type: "realtime",
        model: "gpt-realtime",
        audio: {
          output: {
            voice: voice
          }
        }
      }
    };

    // Request an ephemeral token from OpenAI (endpoint correct selon doc)
    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionConfig),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ OpenAI API Error:', data);
      throw new Error(`OpenAI API Error: ${data.error?.message || 'Unknown error'}`);
    }

    console.log('✅ Ephemeral token generated successfully');
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("❌ Error in realtime-token function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});