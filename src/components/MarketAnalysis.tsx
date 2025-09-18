import React from 'react';
import { SwotAnalysis } from '@/hooks/useScenarios';
import { ByssVnsOverview } from './ByssVnsOverview';
import { useScenarios } from '@/hooks/useScenarios';

interface MarketAnalysisProps {
  swotAnalyses?: SwotAnalysis[];
  sector?: string;
  companyName?: string;
  scenarioId?: string;
}

export const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ 
  swotAnalyses = [], 
  sector = 'Enseignement Supérieur',
  companyName = 'EDHEC Business School',
  scenarioId = 'byss-vns-school'
}) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);
  
  // Handle case where scenario doesn't have market data yet
  if (!scenario?.marketData?.marketOverview) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          Analyse de marché en cours de développement pour ce scénario...
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Scénario: {scenarioId}
        </p>
      </div>
    );
  }

  const marketData = scenario.marketData;

  return (
    <div className="space-y-6">
      {/* Analyse complète avec nouveau composant unifié */}
      <ByssVnsOverview scenarioId={scenarioId} />
    </div>
  );
};