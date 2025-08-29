import React from 'react';
import { AgentsVoiceCoach } from '../AgentsVoiceCoach';

interface GenericVoiceAgentProps {
  scenario: any;
  open?: boolean;
  onToggle?: () => void;
}

/**
 * Agent vocal générique pour les scénarios non encore implémentés
 * Utilise l'ancienne logique AgentsVoiceCoach en attendant leur migration
 */
export function GenericVoiceAgent({ scenario, open = true, onToggle }: GenericVoiceAgentProps) {
  return (
    <AgentsVoiceCoach 
      scenario={scenario} 
      open={open} 
      onToggle={onToggle} 
    />
  );
}