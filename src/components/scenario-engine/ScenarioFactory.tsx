import React, { lazy, Suspense, memo } from 'react';
import { Scenario } from '@/data/scenarios/types';

// Configuration-driven scenario rendering
interface ScenarioConfig {
  theme: string;
  primaryColor: string;
  features: string[];
  uiVariant: 'standard' | 'premium' | 'education';
}

// Lazy load pour optimiser le bundle
const UnifiedScenarioLayout = lazy(() => 
  import('./UnifiedScenarioLayout').then(module => ({ default: module.UnifiedScenarioLayout }))
);

const PremiumScenarioLayout = lazy(() => 
  import('./PremiumScenarioLayout').then(module => ({ default: module.PremiumScenarioLayout }))
);

// Factory pour déterminer la configuration par scénario
const getScenarioConfig = (scenarioId: string): ScenarioConfig => {
  switch (scenarioId) {
    case 'byss-vns-school':
      return {
        theme: 'education',
        primaryColor: 'blue',
        features: ['voice-ai', 'realtime', 'analytics'],
        uiVariant: 'premium'
      };
    
    case 'tech-startup':
      return {
        theme: 'startup',
        primaryColor: 'purple',
        features: ['growth', 'innovation'],
        uiVariant: 'standard'
      };
    
    default:
      return {
        theme: 'default',
        primaryColor: 'primary',
        features: [],
        uiVariant: 'standard'
      };
  }
};

interface ScenarioFactoryProps {
  scenario: Scenario;
  componentType: 'layout' | 'analysis' | 'details' | 'selector' | 'overview';
  variant?: 'market' | 'product' | 'marketing' | 'comprehensive';
  onStartSession?: () => void;
}

/**
 * Factory Pattern optimisé pour composants scénario-spécifiques
 * Utilise configuration-driven rendering et lazy loading
 */
export const ScenarioFactory: React.FC<ScenarioFactoryProps> = memo(({
  scenario,
  componentType,
  variant = 'comprehensive',
  onStartSession
}) => {
  const config = getScenarioConfig(scenario.id);
  
  const renderComponent = () => {
    switch (componentType) {
      case 'layout':
        if (config.uiVariant === 'premium') {
          return (
            <Suspense fallback={<div>Chargement premium...</div>}>
              <PremiumScenarioLayout 
                scenario={scenario}
                onStartSession={onStartSession}
                config={config}
              />
            </Suspense>
          );
        }
        
        return (
          <Suspense fallback={<div>Chargement...</div>}>
            <UnifiedScenarioLayout 
              scenario={scenario}
              onStartSession={onStartSession}
            />
          </Suspense>
        );
      
      case 'analysis':
      case 'details':
      case 'selector':
      case 'overview':
      default:
        return (
          <Suspense fallback={<div>Chargement...</div>}>
            <UnifiedScenarioLayout 
              scenario={scenario}
              onStartSession={onStartSession}
            />
          </Suspense>
        );
    }
  };

  return (
    <div className={`scenario-factory theme-${config.theme}`} data-variant={config.uiVariant}>
      {renderComponent()}
    </div>
  );
});

// Helper pour créer des composants scénario optimisés
export const createScenarioComponent = (
  scenario: Scenario,
  type: 'layout' | 'analysis' | 'details' | 'selector' | 'overview',
  options?: {
    variant?: string;
    onStartSession?: () => void;
  }
) => {
  return (
    <ScenarioFactory 
      scenario={scenario}
      componentType={type}
      variant={options?.variant as any}
      onStartSession={options?.onStartSession}
    />
  );
};

ScenarioFactory.displayName = 'ScenarioFactory';