/**
 * FACTORY PATTERN POUR PROMPTS MODULAIRES
 * Architecture optimisée: un fichier par scénario
 */

import { 
  buildOptimizedPrompt, 
  OptimizedPromptConfig,
  ScenarioPromptGenerator 
} from './core/base-prompt-generator';
import { generateContextualLayers } from './core/contextual-layers';
import { generateDiscoverySystem } from './core/discovery-system';

// Import des générateurs de prompts par scénario
import { KpiPerformancePromptGenerator } from './scenarios/kpi-performance';
import { FintechStartupPromptGenerator } from './scenarios/fintech-startup';
import { CybersecurityConsultingPromptGenerator } from './scenarios/cybersecurity-consulting';
import { SaasHrToolPromptGenerator } from './scenarios/saas-hr-tool';
import { DigitalAgencyPromptGenerator } from './scenarios/digital-agency';
import { RetailPersonalizationPromptGenerator } from './scenarios/retail-personalization';
import { IndustrialMarketplacePromptGenerator } from './scenarios/industrial-marketplace';
import { ManufacturingIotPromptGenerator } from './scenarios/manufacturing-iot';

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
  'manufacturing-iot': new ManufacturingIotPromptGenerator()
};

/**
 * POINT D'ENTRÉE PRINCIPAL - API UNIFIÉE
 * Génère un prompt complet optimisé par scénario
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
  
  // 2. Générer le prompt core spécialisé (400-500 tokens)
  const corePrompt = generator.generatePrompt(agentType, conversationType);
  
  // 3. Ajouter les couches contextuelles (200-300 tokens)
  const contextualLayers = generateContextualLayers(scenarioId, currentPhase, trustLevel);
  
  // 4. Intégrer le système discovery (200-300 tokens)
  const discoverySystem = generateDiscoverySystem(scenarioId, trustLevel);
  
  // 5. Assembler le prompt final optimisé
  return buildOptimizedPrompt(corePrompt, contextualLayers, discoverySystem);
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
 * RE-EXPORT des types pour compatibilité
 */
export type { OptimizedPromptConfig, ScenarioPromptGenerator };