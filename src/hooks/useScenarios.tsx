import { useState, useEffect } from 'react';
import { consolidatedScenarios, Scenario, Interlocutor, Product, Stakeholder } from '@/data/scenarios';

// Re-export types for compatibility
export type { Interlocutor, Product, Stakeholder, Scenario };


export const useScenarios = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScenarios = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading scenarios...', consolidatedScenarios?.length);
        
        // Simulate slight loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Load scenarios from static data
        setScenarios(consolidatedScenarios);
        console.log('Scenarios loaded successfully:', consolidatedScenarios?.length);
      } catch (err) {
        console.error('Error loading scenarios:', err);
        setError(err instanceof Error ? err.message : 'Failed to load scenarios');
        // Set empty array on error so UI can still render
        setScenarios([]);
      } finally {
        setLoading(false);
      }
    };

    loadScenarios();
  }, []);

  const getScenarioById = (id: string): Scenario | undefined => {
    return scenarios.find(scenario => scenario.id === id);
  };

  return {
    scenarios,
    loading,
    error,
    getScenarioById,
  };
};