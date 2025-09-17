// Export all types
export * from './types';

// Import the single remaining scenario
import { byssVnsSchoolScenario } from './byss-vns-school';

// Export consolidated scenarios array with only Byss VNS
export const consolidatedScenarios = [
  byssVnsSchoolScenario
];

// Utility function to get a scenario by ID
export const getScenarioById = (id: string) => {
  return consolidatedScenarios.find(scenario => scenario.id === id);
};

// Export for compatibility
export const scenarios = consolidatedScenarios;