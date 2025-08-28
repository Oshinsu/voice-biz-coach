import React from 'react';
import { Globe, Target, BarChart3, Lightbulb, TrendingUp, Users, Building } from 'lucide-react';
import { SwotAnalysis } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { MarketOverview } from './analysis/MarketOverview';
import { CompetitiveLandscape } from './analysis/CompetitiveLandscape';
import { getScenarioData } from '@/data/scenarioSpecificData';
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
  const scenarioData = getScenarioData(scenarioId);
  
  // Handle case where scenario doesn't have market data yet
  if (!scenarioData?.marketOverview) {
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

  const marketData = scenarioData; // Direct access since the structure is flat now

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <AnalysisSection
        title="Vue d'ensemble du marché"
        icon={Globe}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Taille du marché
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                {marketData.marketOverview?.marketSize || 'Données en cours de développement'}
              </p>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{marketData.marketOverview?.growthRate || '+15% CAGR'}</span>
              </div>
            </div>

            <div className="p-4 bg-secondary/5 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Acteurs clés du marché
              </h4>
              <div className="space-y-2">
                {marketData.marketOverview?.keyPlayers?.map((player, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {player}
                  </Badge>
                )) || (
                  <p className="text-xs text-muted-foreground">Acteurs clés en cours d'identification</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Tendances majeures du secteur</h4>
            <div className="grid gap-3">
              {marketData.marketOverview?.trends?.map((trend, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{trend}</span>
                </div>
              )) || (
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Analyse des tendances en cours de développement</span>
                </div>
              )}
            </div>
          </div>

          {marketData.marketOverview?.regulations && (
            <div>
              <h4 className="font-semibold mb-3">Cadre réglementaire</h4>
              <div className="grid gap-2">
                {marketData.marketOverview.regulations.map((regulation, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 text-sm text-muted-foreground">
                    <span className="font-medium">•</span>
                    <span>{regulation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnalysisSection>

      {/* Market Overview Only - Other sections temporarily disabled */}
      {marketData.marketOverview && (
        <AnalysisSection
          title="Métriques clés du marché"
          icon={Target}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketData.marketOverview.budgetRange && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-lg font-bold text-green-800">{marketData.marketOverview.budgetRange}</p>
                  <p className="text-sm text-green-700">Budget moyen</p>
                </div>
              )}
              {marketData.marketOverview.expectedROI && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-lg font-bold text-blue-800">{marketData.marketOverview.expectedROI}</p>
                  <p className="text-sm text-blue-700">ROI attendu</p>
                </div>
              )}
              {marketData.marketOverview.timeline && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <p className="text-lg font-bold text-purple-800">{marketData.marketOverview.timeline}</p>
                  <p className="text-sm text-purple-700">Timeline projet</p>
                </div>
              )}
            </div>
          </div>
        </AnalysisSection>
      )}

      {/* Future Trends Section */}
      <AnalysisSection
        title="Vision du secteur"
        icon={Lightbulb}
      >
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h4 className="font-semibold mb-3">Vision 2025-2027 du secteur</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Le marché de l'EdTech dans l'enseignement supérieur connaît une transformation profonde 
            avec l'émergence de l'IA conversationnelle et des nouvelles attentes générationnelles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white rounded-lg">
              <p className="text-lg font-bold text-blue-600">+47%</p>
              <p className="text-xs text-muted-foreground">Adoption IA pédagogique</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-lg font-bold text-purple-600">€12.8Md</p>
              <p className="text-xs text-muted-foreground">Marché 2027 prévu</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-lg font-bold text-green-600">68%</p>
              <p className="text-xs text-muted-foreground">Écoles équipées IA</p>
            </div>
          </div>
        </div>
      </AnalysisSection>
    </div>
  );
};