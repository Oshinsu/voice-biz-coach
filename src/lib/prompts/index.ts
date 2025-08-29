/**
 * FACTORY PATTERN POUR PROMPTS VOCAUX OPTIMISÉS
 * Architecture optimisée selon OpenAI Realtime Prompting Guide
 */

import { 
  buildOptimizedPrompt, 
  OptimizedPromptConfig,
  ScenarioPromptGenerator 
} from './core/base-prompt-generator';
import { VocalPromptGenerator, SessionOptimizer } from './core/vocal-prompt-generator';
import { RealTimeInteractionManager } from './core/real-time-interaction-manager';
import { DynamicContextualizer } from './core/dynamic-contextualization';
import { generateContextualLayers } from './core/contextual-layers';
import { generateDiscoverySystem } from './core/discovery-system';
import { NaturalFlowGenerator } from './core/natural-flow-system';

// Import des générateurs de prompts par scénario
import { KpiPerformancePromptGenerator } from './scenarios/kpi-performance';
import { FintechStartupPromptGenerator } from './scenarios/fintech-startup';
import { CybersecurityConsultingPromptGenerator } from './scenarios/cybersecurity-consulting';
import { SaasHrToolPromptGenerator } from './scenarios/saas-hr-tool';
import { DigitalAgencyPromptGenerator } from './scenarios/digital-agency';
import { RetailPersonalizationPromptGenerator } from './scenarios/retail-personalization';
import { IndustrialMarketplacePromptGenerator } from './scenarios/industrial-marketplace';
import { ManufacturingIotPromptGenerator } from './scenarios/manufacturing-iot';
import { ByssVnsSchoolPromptGenerator } from './scenarios/byss-vns-school';
import { WebsiteSalesPromptGenerator } from './scenarios/website-sales';

/**
 * FACTORY PATTERN - Mapping scénario → générateur
 */
const scenarioGenerators: Record<string, ScenarioPromptGenerator> = {
  'kpi-performance': new KpiPerformancePromptGenerator(),
  'fintech-startup': new FintechStartupPromptGenerator(),
  'cybersecurity-consulting': new CybersecurityConsultingPromptGenerator(),
  'saas-hr-tool': new SaasHrToolPromptGenerator(),
  'digital-agency': new DigitalAgencyPromptGenerator(),
  'retail-personalization': new RetailPersonalizationPromptGenerator(),
  'industrial-marketplace': new IndustrialMarketplacePromptGenerator(),
  'manufacturing-iot': new ManufacturingIotPromptGenerator(),
  'byss-vns-school': new ByssVnsSchoolPromptGenerator(),
  'website-sales': new WebsiteSalesPromptGenerator()
};

/**
 * POINT D'ENTRÉE PRINCIPAL - API UNIFIÉE VOCAL
 * Génère un prompt vocal optimisé selon OpenAI Realtime Guide
 */
export function generateOptimizedScenarioPrompt({
  scenarioId,
  conversationType,
  currentPhase,
  trustLevel,
  agentType
}: OptimizedPromptConfig): string {
  
  // 1. Récupérer le générateur spécialisé pour ce scénario
  const generator = scenarioGenerators[scenarioId];
  if (!generator) {
    throw new Error(`Générateur de prompt non trouvé pour le scénario: ${scenarioId}`);
  }
  
  // 2. Générer le prompt vocal optimisé (structure OpenAI)
  const corePrompt = generator.generatePrompt(agentType, conversationType);
  
  // 3. Ajouter les instructions temps réel
  const realTimeInstructions = generateRealTimeInstructions(conversationType, currentPhase, trustLevel);
  
  // 4. Ajouter la contextualisation dynamique
  const dynamicContext = generateDynamicContext(scenarioId, agentType, trustLevel);
  
  // 5. Ajouter le système de flow naturel pour scenarios avancés
  const naturalFlowSystem = generateNaturalFlowEnhancement(scenarioId, agentType, conversationType, trustLevel);
  
  // 6. Assembler le prompt final optimisé vocal
  return `${corePrompt}

${realTimeInstructions}

${dynamicContext}

${naturalFlowSystem}`;
}

/**
 * GÉNÉRATION INSTRUCTIONS TEMPS RÉEL
 */
function generateRealTimeInstructions(conversationType: 'cold-call' | 'rdv', phase: string, trustLevel: number): string {
  const interactionInstructions = RealTimeInteractionManager.generateInterruptionInstructions();
  const silenceInstructions = RealTimeInteractionManager.generateSilenceInstructions();
  const audioInstructions = RealTimeInteractionManager.generateAudioTroubleInstructions();
  const confirmationInstructions = RealTimeInteractionManager.generateVocalConfirmationInstructions();
  
  return `## INSTRUCTIONS TEMPS RÉEL OPTIMISÉES

${interactionInstructions}

${silenceInstructions}

${audioInstructions}

${confirmationInstructions}

## PARAMÈTRES VAD RECOMMANDÉS
${JSON.stringify(SessionOptimizer.getOptimalSessionConfig(conversationType), null, 2)}`;
}

/**
 * GÉNÉRATION CONTEXTE DYNAMIQUE
 */
function generateDynamicContext(scenarioId: string, agentType: string, trustLevel: number): string {
  // Pour l'instant, utilisation du système existant + améliorations
  const contextualLayers = generateContextualLayers(scenarioId, 'decouverte', trustLevel);
  const discoverySystem = generateDiscoverySystem(scenarioId, trustLevel);
  
  return `## CONTEXTE DYNAMIQUE ENRICHI

${contextualLayers}

${discoverySystem}

## ADAPTATION TRUST LEVEL ${trustLevel}/100
${getTrustBasedAdaptation(trustLevel)}`;
}

function getTrustBasedAdaptation(trustLevel: number): string {
  if (trustLevel < 25) return '**Mode:** Preuves constantes requises, réponses courtes, questions de vérification systématiques';
  if (trustLevel < 50) return '**Mode:** Évaluation active, partage progressif, test expertise interlocuteur';
  if (trustLevel < 75) return '**Mode:** Engagement constructif, questions techniques précises, détails opérationnels';
  return '**Mode:** Collaboration ouverte, planning action, implication équipe, données sensibles OK';
}

/**
 * UTILITAIRE - Liste des scénarios disponibles
 */
export function getAvailableScenarios(): string[] {
  return Object.keys(scenarioGenerators);
}

/**
 * UTILITAIRE - Validation scénario existant
 */
export function isValidScenario(scenarioId: string): boolean {
  return scenarioId in scenarioGenerators;
}

/**
 * Génère les améliorations de flow naturel
 */
function generateNaturalFlowEnhancement(
  scenarioId: string, 
  agentType: string, 
  conversationType: 'cold-call' | 'rdv',
  trustLevel: number
): string {
  if (!scenarioId.includes('byss-vns-school') || agentType !== 'contact_principal') {
    return '';
  }
  
  const triggers = NaturalFlowGenerator.generateCuriosityTriggers(scenarioId, agentType);
  const reactions = NaturalFlowGenerator.generateEmotionalReactions(scenarioId);
  const transitions = NaturalFlowGenerator.generateTopicTransitions(scenarioId);
  
  return `
## SYSTÈME DE FLOW NATUREL ACTIVÉ

### RÉACTIONS SPONTANÉES DISPONIBLES
${Object.entries(reactions).map(([emotion, responses]) => 
  `**${emotion.toUpperCase()}**: ${responses.slice(0, 2).join(' | ')}`
).join('\n')}

### TRANSITIONS NATURELLES
${Object.entries(transitions).map(([transition, phrases]) =>
  `**${transition.replace('_', ' → ')}**: "${phrases[0]}"`
).join('\n')}

### TRIGGERS DE CURIOSITÉ
- Si mention business school → "Vous travaillez avec quelles autres écoles ?"
- Si métriques concrètes → "Nos étudiants ont exactement ce problème..."
- Si vague/généraliste → "En quoi vous êtes différents ?"

### RÈGLES DE VARIABILITÉ
- Ne jamais répéter exactement la même formulation
- Adapter ton énergie selon le flow de la conversation
- Poser des questions de suivi naturelles
- Réagir émotionnellement aux bonnes surprises

### CALIBRAGE TRUSTLEVEL
- 0-20: Curiosité prudente, questions de vérification
- 21-40: Intérêt croissant, partage d'enjeux généraux  
- 41-60: Confiance établie, détails opérationnels
- 61-80: Collaboration active, informations sensibles
- 81-100: Partenariat, accès complet aux données

**RAPPEL CRITIQUE**: Tu es authentiquement Sophie, pas un script. Varie tes réponses, montre de vraies émotions, pose des questions uniques.`;
}

/**
 * RE-EXPORT des types pour compatibilité
 */
export type { OptimizedPromptConfig, ScenarioPromptGenerator };