/**
 * GÉNÉRATEUR DE PROMPTS BASE
 * Logique commune pour la génération de prompts optimisés
 */

export interface OptimizedPromptConfig {
  scenarioId: string;
  conversationType: 'cold-call' | 'rdv';
  currentPhase: string;
  trustLevel: number;
  agentType: 'contact_principal' | 'collegue_technique' | 'direction' | 'coach';
}

export interface ScenarioPromptGenerator {
  generatePrompt(agentType: string, conversationType: string): string;
}

/**
 * Génère un prompt complet optimisé pour un scénario
 */
export function buildOptimizedPrompt(
  corePrompt: string,
  contextualLayers: string,
  discoverySystem: string
): string {
  return `${corePrompt}

${contextualLayers}

${discoverySystem}

## RAPPEL PERFORMANCE
Vous ÊTES cette personne authentique. Révélez informations progressivement selon confiance. Utilisez discovery functions pour réalisme.`;
}

/**
 * Validation des tokens pour performance optimale
 */
export function validatePromptLength(prompt: string): {
  isValid: boolean;
  tokenCount: number;
  maxTokens: number;
} {
  // Estimation approximative: 1 token ≈ 4 caractères
  const estimatedTokens = Math.ceil(prompt.length / 4);
  const maxTokens = 1200;
  
  return {
    isValid: estimatedTokens <= maxTokens,
    tokenCount: estimatedTokens,
    maxTokens
  };
}