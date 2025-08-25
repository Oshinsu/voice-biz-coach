import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SessionData {
  client_secret: {
    value: string;
    expires_at: string;
  };
  expires_at: string;
  id: string;
  model: string;
  object: string;
  voice: string;
}

export const useRealtimeSession = () => {
  const { toast } = useToast();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const createSession = useCallback(async () => {
    setIsCreating(true);
    try {
      // Utiliser la clé API stockée en tant que secret
      const apiKey = process.env.OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Clé API OpenAI non configurée");
      }

      const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "sage",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      setSessionData(data);
      return data;
    } catch (error) {
      console.error("Erreur lors de la création de la session:", error);
      toast({
        title: "Erreur de session",
        description: error instanceof Error ? error.message : "Impossible de créer la session",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsCreating(false);
    }
  }, [toast]);

  const clearSession = useCallback(() => {
    setSessionData(null);
  }, []);

  return {
    sessionData,
    createSession,
    clearSession,
    isCreating,
  };
};

// Configuration pour le développement local
export const REALTIME_CONFIG = {
  model: "gpt-4o-realtime-preview-2024-12-17",
  voice: "sage",
  instructions: `Tu es un coach commercial expert et bienveillant. Ton rôle est d'aider les utilisateurs à améliorer leurs compétences commerciales à travers des conversations vocales interactives.

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

Commence toujours par te présenter brièvement et demander à l'utilisateur quel aspect commercial il souhaite travailler aujourd'hui.`,
};