import React from 'react';
import { SwotAnalysis } from '@/hooks/useScenarios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MarketAnalysisProps {
  swotAnalyses?: SwotAnalysis[];
  sector?: string;
  companyName?: string;
  scenarioId?: string;
}

export const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ 
  swotAnalyses = [], 
  sector = 'E-commerce',
  companyName = 'ModaStyle',
  scenarioId = 'kpi-performance'
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyse de Marché - {companyName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Secteur d'activité</h4>
              <p className="text-muted-foreground">{sector}</p>
            </div>
            
            {swotAnalyses.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Analyses SWOT disponibles</h4>
                <div className="grid grid-cols-2 gap-4">
                  {swotAnalyses.map((swot, index) => (
                    <div key={index} className="p-3 border rounded">
                      <h5 className="font-medium text-sm">{swot.strengths?.[0]}</h5>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              Analyse de marché spécifique à Byss VNS - Scénario : {scenarioId}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};