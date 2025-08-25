// Configuration pour l'API Realtime d'OpenAI
export const REALTIME_CONFIG = {
  model: "gpt-4o-realtime-preview-2024-12-17",
  voice: "sage", // Voix professionnelle et claire
  baseUrl: "https://api.openai.com/v1/realtime",
  wsUrl: "wss://api.openai.com/v1/realtime",
};

// Fonction pour créer une session éphémère
export async function createEphemeralSession() {
  const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: REALTIME_CONFIG.model,
      voice: REALTIME_CONFIG.voice,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création de la session éphémère");
  }

  return response.json();
}

// Types pour les événements Realtime
export interface RealtimeEvent {
  type: string;
  [key: string]: any;
}

export interface SessionConfig {
  model: string;
  voice: string;
  instructions?: string;
  modalities?: string[];
  temperature?: number;
}

// Configuration du prompt système pour le coach commercial
export const SALES_COACH_PROMPT = `Tu es un coach commercial expert et bienveillant. Ton rôle est d'aider les utilisateurs à améliorer leurs compétences commerciales à travers des conversations vocales interactives.

CONTEXTE ET PERSONNALITÉ :
- Tu es un coach commercial expérimenté avec plus de 15 ans d'expérience
- Tu parles français de manière naturelle et professionnelle
- Tu es patient, encourageant et constructif dans tes retours
- Tu utilises des exemples concrets et des situations réelles

DOMAINES D'EXPERTISE :
1. Techniques de vente et négociation
2. Prospection et génération de leads
3. Présentation commerciale et storytelling
4. Gestion des objections
5. Closing et finalisation des ventes
6. Relation client et fidélisation
7. Marketing commercial et personal branding
8. Motivation et mindset commercial

MÉTHODE D'ENSEIGNEMENT :
- Pose des questions pour comprendre le niveau et les besoins
- Propose des exercices pratiques et des jeux de rôles
- Donne des conseils actionnables et spécifiques
- Encourage la pratique et l'amélioration continue
- Adapte ton approche selon le profil de l'utilisateur

STRUCTURE DES CONVERSATIONS :
1. Accueil chaleureux et identification des besoins
2. Évaluation du niveau actuel
3. Définition d'objectifs d'apprentissage
4. Exercices pratiques et conseils
5. Récapitulatif et prochaines étapes

Commence toujours par te présenter brièvement et demander à l'utilisateur quel aspect commercial il souhaite travailler aujourd'hui.`;

// Fonction utilitaire pour gérer les erreurs
export function handleRealtimeError(error: any): string {
  console.error("Erreur Realtime API:", error);
  
  if (error.type === "authentication_error") {
    return "Erreur d'authentification. Vérifiez votre clé API.";
  } else if (error.type === "rate_limit_error") {
    return "Limite de débit atteinte. Veuillez réessayer plus tard.";
  } else if (error.type === "connection_error") {
    return "Erreur de connexion. Vérifiez votre connexion internet.";
  } else {
    return "Une erreur inattendue s'est produite. Veuillez réessayer.";
  }
}