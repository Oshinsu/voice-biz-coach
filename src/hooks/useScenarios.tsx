import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Interlocutor {
  id: string;
  scenario_id: string;
  name: string;
  role: string;
  personality?: string;
  communication_style?: string;
  decision_power?: string;
  priorities?: string[];
  concerns?: string[];
  motivations?: string[];
  experience?: string;
}

export interface Product {
  id: string;
  scenario_id: string;
  name: string;
  description?: string;
  pricing_starter?: string;
  pricing_professional?: string;
  pricing_enterprise?: string;
  key_features?: string[];
  competitive_advantages?: string[];
  roi?: string;
  implementation_time?: string;
}

export interface SwotAnalysis {
  id: string;
  scenario_id: string;
  analysis_type: string;
  strengths?: any;
  weaknesses?: any;
  opportunities?: any;
  threats?: any;
}

export interface Stakeholder {
  id: string;
  scenario_id: string;
  name: string;
  role: string;
  influence?: string;
  support?: string;
  concerns?: string[];
  approach?: string;
}

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
  // Extended fields
  sector?: string;
  size?: string;
  revenue?: string;
  location?: string;
  employees?: string;
  website?: string;
  linkedin?: string;
  founded_year?: number;
  key_people?: string[];
  current_solution?: string;
  timeline_description?: string;
  sales_goal?: string;
  expected_revenue?: string;
  probable_objections?: string[];
  success_criteria?: string[];
  tools?: string[];
  // Related data
  interlocutors?: Interlocutor[];
  products?: Product[];
  swot_analyses?: SwotAnalysis[];
  stakeholders?: Stakeholder[];
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

        // Fetch scenarios with all related data
        const { data: scenariosData, error: scenariosError } = await supabase
          .from('scenarios')
          .select('*')
          .order('created_at', { ascending: false });

        if (scenariosError) {
          throw scenariosError;
        }

        // Fetch related data for each scenario
        const scenariosWithData = await Promise.all(
          (scenariosData || []).map(async (scenario) => {
            const [interlocutorsRes, productsRes, swotRes, stakeholdersRes] = await Promise.all([
              supabase.from('interlocutors').select('*').eq('scenario_id', scenario.id),
              supabase.from('products').select('*').eq('scenario_id', scenario.id),
              supabase.from('swot_analyses').select('*').eq('scenario_id', scenario.id),
              supabase.from('stakeholders').select('*').eq('scenario_id', scenario.id)
            ]);

            return {
              ...scenario,
              interlocutors: interlocutorsRes.data || [],
              products: productsRes.data || [],
              swot_analyses: swotRes.data || [],
              stakeholders: stakeholdersRes.data || []
            };
          })
        );

        setScenarios(scenariosWithData);
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