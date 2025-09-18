import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface TrainingSession {
  id: string;
  scenario_id: string;
  conversation_type: string;
  phase: string;
  score: number;
  duration_seconds: number;
  objectives_completed: string[];
  feedback?: string;
  created_at: string;
}

export const useTrainingStats = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const saveSession = async (sessionData: {
    scenario_id: string;
    conversation_type: string;
    phase: string;
    score: number;
    duration_seconds: number;
    objectives_completed: string[];
    feedback?: string;
    audio_transcript?: string;
    metadata?: any;
  }) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      // Since training_sessions table was removed, return mock success
      console.log('Session would be saved:', sessionData);
      return { error: null };
    } catch (error: any) {
      console.error('Error saving session:', error);
      return { error: error.message };
    }
  };

  const updateUserStats = async () => {
    if (!user) return;
    // Since training_sessions table was removed, this is now a no-op
    console.log('User stats would be updated for user:', user.id);
  };

  const calculateStats = (sessions: TrainingSession[]) => {
    if (sessions.length === 0) {
      return {
        total_sessions: 0,
        average_score: 0,
        total_duration_minutes: 0,
        best_score: 0,
        completed_scenarios: [],
        preferred_scenarios: [],
        improvement_rate: 0,
        last_session_date: null
      };
    }

    const totalSessions = sessions.length;
    const totalScore = sessions.reduce((sum, s) => sum + (s.score || 0), 0);
    const averageScore = totalScore / totalSessions;
    const totalDurationMinutes = Math.floor(sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 60);
    const bestScore = Math.max(...sessions.map(s => s.score || 0));
    
    // Get unique completed scenarios
    const completedScenarios = [...new Set(sessions.map(s => s.scenario_id))];
    
    // Calculate scenario preferences (most practiced)
    const scenarioCounts = sessions.reduce((acc, session) => {
      acc[session.scenario_id] = (acc[session.scenario_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const preferredScenarios = Object.entries(scenarioCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([scenario]) => scenario);

    // Calculate improvement rate (simple: compare first quarter vs last quarter of sessions)
    let improvementRate = 0;
    if (sessions.length >= 4) {
      const sortedSessions = sessions.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      const firstQuarter = sortedSessions.slice(0, Math.floor(sessions.length / 4));
      const lastQuarter = sortedSessions.slice(-Math.floor(sessions.length / 4));
      
      const firstAvg = firstQuarter.reduce((sum, s) => sum + (s.score || 0), 0) / firstQuarter.length;
      const lastAvg = lastQuarter.reduce((sum, s) => sum + (s.score || 0), 0) / lastQuarter.length;
      
      improvementRate = ((lastAvg - firstAvg) / firstAvg) * 100;
    }

    const lastSessionDate = sessions.length > 0 ? 
      Math.max(...sessions.map(s => new Date(s.created_at).getTime())) : null;

    return {
      total_sessions: totalSessions,
      average_score: Math.round(averageScore * 100) / 100,
      total_duration_minutes: totalDurationMinutes,
      best_score: Math.round(bestScore * 100) / 100,
      completed_scenarios: completedScenarios,
      preferred_scenarios: preferredScenarios,
      improvement_rate: Math.round(improvementRate * 100) / 100,
      last_session_date: lastSessionDate ? new Date(lastSessionDate).toISOString() : null
    };
  };

  return {
    loading,
    error,
    saveSession,
    updateUserStats
  };
};