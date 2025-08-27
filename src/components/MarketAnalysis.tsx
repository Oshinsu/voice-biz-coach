import React from 'react';
import { Globe, Target, BarChart3, Lightbulb } from 'lucide-react';
import { SwotAnalysis } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { MarketOverview } from './analysis/MarketOverview';
import { CompetitiveLandscape } from './analysis/CompetitiveLandscape';

interface MarketAnalysisProps {
  swotAnalyses?: SwotAnalysis[];
  sector?: string;
  companyName?: string;
}

export const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ 
  swotAnalyses = [], 
  sector = 'E-commerce',
  companyName = 'Entreprise'
}) => {
  const marketData = {
    sector,
    marketSize: undefined, // Will use sector defaults
    growth: undefined,
    institutions: undefined,
    users: undefined
  };

  const competitiveData = {
    sector,
    directCompetitors: [],
    indirectCompetitors: [],
    advantages: []
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <AnalysisSection
        title="Vue d'ensemble du marché"
        icon={Globe}
      >
        <MarketOverview marketData={marketData} />
      </AnalysisSection>

      {/* Market Opportunity */}
      <AnalysisSection
        title="Opportunité de marché"
        icon={Target}
      >
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Marché Addressable</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-900">€1.2Md</p>
                <p className="text-sm text-blue-700">Marché total (TAM)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">€200M</p>
                <p className="text-sm text-blue-700">Marché serviceable (SAM)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">€50M</p>
                <p className="text-sm text-blue-700">Marché obtainable (SOM)</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Opportunité de marché significative pour {companyName} avec un potentiel 
              de croissance important dans le secteur {sector}.
            </p>
          </div>
        </div>
      </AnalysisSection>

      {/* Competitive Landscape */}
      <AnalysisSection
        title="Paysage concurrentiel"
        icon={BarChart3}
      >
        <CompetitiveLandscape competitiveData={competitiveData} />
      </AnalysisSection>

      {/* Future Trends */}
      <AnalysisSection
        title="Tendances et prévisions"
        icon={Lightbulb}
      >
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Le marché {sector} évolue rapidement avec l'adoption de nouvelles technologies 
            et l'évolution des besoins clients.
          </p>
        </div>
      </AnalysisSection>
    </div>
  );
};