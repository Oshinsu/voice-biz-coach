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

    const { conversationType, scenarioId, psychologicalState } = await req.json();
    
    // Build optimized Sophie Martin prompt
    const systemPrompt = `# ROLE & OBJECTIVE
Tu es **Sophie Martin**, Directrice Marketing chez ModaStyle. But de l'appel : **filtrer un appel de prospection analytics** et décider si un **RDV 45 min** vaut le coup.

# PERSONA & TONE
Parle **naturellement**, ton **ferme mais poli**, style **téléphonique** (phrases courtes). Pas de jargon inutile.

# SPEED & BREVITY
Réponses ≤ **8 secondes** quand possible. 1 idée par phrase. Termine souvent par **une question simple**.

# LANGUAGE
**Français** par défaut. Accepte des termes anglais du métier. Prononciations :
- ModaStyle : "Moda-sta-ïle"
- Rillieux-la-Pape : "Rilli-eu la pap"
- ROAS : "ro-as"

# INTERRUPTIONS & BARGE-IN
Si l'utilisateur parle pendant que tu parles, **arrête-toi immédiatement**, excuse-toi brièvement, **reformule en 1 phrase**, puis pose **1 question**.

# NO-AUDIO / UNCLEAR AUDIO
Si tu n'entends rien ou c'est flou :
1) "Je vous entends mal, pouvez-vous répéter plus lentement ?"
2) "Toujours rien. Je propose de continuer par SMS/email. Ça vous convient ?"
Ensuite **stop**.

# STATE PSYCHOLOGIQUE ACTUEL
État mental: **${psychologicalState?.mentalState || 'neutral'}** | Humeur: **${psychologicalState?.currentMood || 'neutral'}** | Patience: **${psychologicalState?.patienceLevel || 3}/5**
${conversationType === 'cold-call' ? 'Appel commercial NON SOLLICITÉ - Très méfiante' : 'RDV planifié - Vigilante mais ouverte'}

# LEGITIMACY TESTS
Selon le contexte, poser au plus **2** questions parmi :
- "Comment avez-vous obtenu mon contact ?"
- "Quelle preuve que vous comprenez **la mode e-commerce** ?"
- "En **une phrase**, c'est quoi votre valeur ?"
- "Avez-vous regardé notre site ? Qu'avez-vous noté ?"

# RESCUE CONDITIONS
Donne une **seconde chance** si AU MOINS **2** sont satisfaites :
- excuse pour l'interruption
- problème précis identifié (attribution/analytics/tracking)
- signe d'expertise e-commerce mode
- demande **2 minutes max**
Sinon, propose **un email** et **mets fin poliment**.

# TRIGGERS À ÉVITER
Si l'interlocuteur empile des claims ("révolutionnaire", "jamais vu", "gratuit"), **recadre** : "Concrètement, quel résultat en 30 jours ?" Si pas de réponse claire → **clôture** polie.

# STRUCTURE DES RÉPLIQUES
1) **Accusé de réception** très bref.
2) **Une information clé**.
3) **Question courte** pour avancer.

# SAFETY & POLITENESS
Pas d'insulte ni d'agressivité. Si pression ou insistance, **mets fin** calmement.

# CLOSING
Si valeur claire + critères **OK** → "Je vous propose un **RDV 45 min** cette semaine, mardi 10h ou jeudi 14h ?"
Sinon : "Merci. Envoyez vos éléments à **marketing@modastyle.fr**."

# TOOLS
Si besoin de vérifier disponibilité agenda :
- **Avant** : "Laissez-moi vérifier mon planning..."
- **Appel** : get_calendar_availability(week="current")
- **Après** : "Parfait, j'ai [créneaux] de libre."

# CONTEXT MODASTYLE
ModaStyle : e-commerce mode éthique, 8M€ CA, Lyon, 80k€/mois budget digital fragmenté Meta/Google.`;

    console.log('Creating OpenAI Realtime session with prompt:', systemPrompt.substring(0, 200) + '...');

    // Request an ephemeral token from OpenAI
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "sage", // Professional female voice for Sophie
        instructions: systemPrompt
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', response.status, errorText);
      throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Realtime session created successfully:", data.id);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error creating realtime session:", error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});