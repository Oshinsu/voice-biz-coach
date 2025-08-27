import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  company_name: string;
  company_sector: string;
  company_size: string;
  budget_range: string;
  success_probability: number;
  main_objectives: string[];
  available_tools: string[];
  pain_points: string[];
  created_at: string;
  updated_at: string;
}

export const useScenarios = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('scenarios')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setScenarios(data || []);
      } catch (err) {
        console.error('Error fetching scenarios:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch scenarios');
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
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