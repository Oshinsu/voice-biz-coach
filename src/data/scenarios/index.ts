// Export all types
export * from './types';

// Import all scenarios
import { kpiPerformanceScenario } from './kpi-performance';
import { fintechStartupScenario } from './fintech-startup';
import { retailPersonalizationScenario } from './retail-personalization';
import { digitalAgencyScenario } from './digital-agency';
import { cybersecurityConsultingScenario } from './cybersecurity-consulting';
import { saasHrToolScenario } from './saas-hr-tool';
import { manufacturingIotScenario } from './manufacturing-iot';
import { industrialMarketplaceScenario } from './industrial-marketplace';
import { byssVnsSchoolScenario } from './byss-vns-school';
import { websiteSalesScenario } from './website-sales';

// Export consolidated scenarios array
export const consolidatedScenarios = [
  kpiPerformanceScenario,
  fintechStartupScenario,
  retailPersonalizationScenario,
  digitalAgencyScenario,
  cybersecurityConsultingScenario,
  saasHrToolScenario,
  manufacturingIotScenario,
  industrialMarketplaceScenario,
  byssVnsSchoolScenario,
  websiteSalesScenario
];

// Utility function to get a scenario by ID
export const getScenarioById = (id: string) => {
  return consolidatedScenarios.find(scenario => scenario.id === id);
};

// Export for compatibility
export const scenarios = consolidatedScenarios;