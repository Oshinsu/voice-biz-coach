import React from 'react';
import { Scenario } from '@/data/scenarios/types';
import { UnifiedScenarioAnalysis } from './UnifiedScenarioAnalysis';

interface ScenarioEngineProps {
  scenario: Scenario;
  componentType: 'analysis' | 'details' | 'selector' | 'overview';
  variant?: 'market' | 'product' | 'marketing' | 'comprehensive';
}

/**
 * Factory Pattern pour composants scénario-spécifiques
 * Centralise la logique de rendu des différents types de composants
 */
export const ScenarioEngine: React.FC<ScenarioEngineProps> = ({
  scenario,
  componentType,
  variant = 'comprehensive'
}) => {
  
  const renderComponent = () => {
    switch (componentType) {
      case 'analysis':
        return (
          <UnifiedScenarioAnalysis 
            scenario={scenario}
            analysisType={variant as 'market' | 'product' | 'marketing' | 'comprehensive'}
          />
        );
      
      case 'details':
        // Future: ScenarioDetailsModern component
        return <div>Détails du scénario (à implémenter)</div>;
      
      case 'selector':
        // Future: ScenarioSelectorModern component  
        return <div>Sélecteur de scénario (à implémenter)</div>;
      
      case 'overview':
        // Future: ScenarioOverview component
        return <div>Vue d'ensemble (à implémenter)</div>;
      
      default:
        return <div>Type de composant non supporté</div>;
    }
  };

  // Configuration spécifique par scénario
  const getScenarioConfig = (scenarioId: string) => {
    switch (scenarioId) {
      case 'byss-vns-school':
        return {
          theme: 'education',
          primaryColor: 'blue',
          features: ['voice-ai', 'realtime', 'analytics']
        };
      
      default:
        return {
          theme: 'default',
          primaryColor: 'primary',
          features: []
        };
    }
  };

  const config = getScenarioConfig(scenario.id);

  return (
    <div className={`scenario-engine theme-${config.theme}`}>
      {renderComponent()}
    </div>
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