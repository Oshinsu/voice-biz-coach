import React from 'react';
import { Globe, Target, BarChart3, Lightbulb, TrendingUp, Users, Building } from 'lucide-react';
import { SwotAnalysis } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { MarketOverview } from './analysis/MarketOverview';
import { CompetitiveLandscape } from './analysis/CompetitiveLandscape';
import { DetailedMarketAnalysis } from './analysis/DetailedMarketAnalysis';
import { useScenarios } from '@/hooks/useScenarios';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MarketAnalysisProps {
  swotAnalyses?: SwotAnalysis[];
  sector?: string;
  companyName?: string;
  scenarioId?: string;
}

export const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ 
  swotAnalyses = [], 
  sector = 'E-commerce',
  companyName = 'Entreprise',
  scenarioId = 'kpi-performance'
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
      {/* Detailed Market Analysis with Charts and Data */}
      <DetailedMarketAnalysis scenarioId={scenarioId} />
    </div>
  );
};