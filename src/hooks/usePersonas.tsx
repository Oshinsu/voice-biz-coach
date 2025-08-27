import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Persona {
  id: string;
  title: string;
  sector: string;
  company_size: string;
  budget: string;
  pain_points: string[];
  priorities: string[];
  decision_process: string;
  objection_style: string;
  communication_style: string;
  created_at: string;
  updated_at: string;
}

export const usePersonas = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('personas')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPersonas(data || []);
      } catch (err) {
        console.error('Error fetching personas:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch personas');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  const getPersonaById = (id: string): Persona | undefined => {
    return personas.find(persona => persona.id === id);
  };

  return {
    personas,
    loading,
    error,
    getPersonaById,
  };
};