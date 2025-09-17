// Export all types
export * from './types';

// Import seul scénario restant
import { kpiPerformanceScenario } from './kpi-performance';

// Export consolidated scenarios array (un seul scénario maintenant)
export const consolidatedScenarios = [
  kpiPerformanceScenario
];

// Utility function to get a scenario by ID
export const getScenarioById = (id: string) => {
  return consolidatedScenarios.find(scenario => scenario.id === id);
};

// Export for compatibility
export const scenarios = consolidatedScenarios;