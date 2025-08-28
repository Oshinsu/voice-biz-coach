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
  const { marketData } = scenarioData;

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
                {marketData.marketOverview.size}
              </p>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{marketData.marketOverview.growth}</span>
              </div>
            </div>

            <div className="p-4 bg-secondary/5 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Acteurs clés du marché
              </h4>
              <div className="space-y-2">
                {marketData.marketOverview.keyPlayers.map((player, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {player}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Tendances majeures du secteur</h4>
            <div className="grid gap-3">
              {marketData.marketOverview.trends.map((trend, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{trend}</span>
                </div>
              ))}
            </div>
          </div>

          {marketData.marketOverview.regulations && (
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

      {/* Market Opportunity */}
      <AnalysisSection
        title="Opportunité de marché"
        icon={Target}
      >
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-4">Marché Addressable</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-900">{marketData.opportunity.tam}</p>
                <p className="text-sm text-blue-700">Marché total (TAM)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{marketData.opportunity.sam}</p>
                <p className="text-sm text-blue-700">Marché serviceable (SAM)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{marketData.opportunity.som}</p>
                <p className="text-sm text-blue-700">Marché obtainable (SOM)</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Segments de marché prioritaires</h4>
            <div className="space-y-3">
              {marketData.opportunity.marketSegments.map((segment, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{segment.name}</span>
                    <Badge variant="outline">{segment.growth}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Taille: {segment.size}</span>
                    <Progress value={parseInt(segment.growth)} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Moteurs de croissance</h4>
            <div className="grid gap-2">
              {marketData.opportunity.growthDrivers.map((driver, index) => (
                <div key={index} className="flex items-start gap-3 p-2 text-sm">
                  <TrendingUp className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>{driver}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnalysisSection>

      {/* Competitive Landscape */}
      <AnalysisSection
        title="Paysage concurrentiel"
        icon={BarChart3}
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4">Concurrents directs</h4>
            <div className="grid gap-4">
              {marketData.competitiveLandscape.directCompetitors.map((competitor, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-medium">{competitor.name}</h5>
                    <Badge variant="outline">{competitor.marketShare}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-sm font-medium text-green-700 mb-2">Forces</h6>
                      <ul className="text-xs space-y-1">
                        {competitor.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-green-500">+</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-sm font-medium text-red-700 mb-2">Faiblesses</h6>
                      <ul className="text-xs space-y-1">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-red-500">-</span>
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Nos avantages concurrentiels</h4>
              <div className="space-y-2">
                {marketData.competitiveLandscape.competitiveAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Gaps du marché exploitables</h4>
              <div className="space-y-2">
                {marketData.competitiveLandscape.marketGaps.map((gap, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnalysisSection>

      {/* Future Trends */}
      <AnalysisSection
        title="Tendances et prévisions"
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