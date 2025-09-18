import React from 'react';
import { Scenario } from '@/data/scenarios/types';
import { ScenarioFactory } from './ScenarioFactory';

interface ScenarioEngineProps {
  scenario: Scenario;
  componentType: 'analysis' | 'details' | 'selector' | 'overview';
  variant?: 'market' | 'product' | 'marketing' | 'comprehensive';
  onStartSession?: () => void;
}

/**
 * @deprecated Use ScenarioFactory instead
 * Wrapper pour compatibilité descendante
 */
export const ScenarioEngine: React.FC<ScenarioEngineProps> = ({
  scenario,
  componentType,
  variant = 'comprehensive',
  onStartSession
}) => {
  
  return (
    <ScenarioFactory
      scenario={scenario}
      componentType={componentType === 'analysis' ? 'layout' : componentType}
      variant={variant}
      onStartSession={onStartSession}
    />
  );
};

// Factory helper pour créer des composants scénario
export const createScenarioComponent = (
  scenario: Scenario,
  type: 'analysis' | 'details' | 'selector' | 'overview',
  variant?: string
) => {
  return (
    <ScenarioEngine 
      scenario={scenario}
      componentType={type}
      variant={variant as any}
    />
  );
};