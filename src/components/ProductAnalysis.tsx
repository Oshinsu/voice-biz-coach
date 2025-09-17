import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductAnalysisProps {
  scenarioId?: string;
}

export const ProductAnalysis: React.FC<ProductAnalysisProps> = ({
  scenarioId = 'kpi-performance'
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyse Produit - DataTrack Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Produit</h4>
              <p className="text-muted-foreground">
                DataTrack Pro - Solution d'attribution marketing et analytics prédictive
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Avantages clés</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Attribution cross-device unifiée</li>
                <li>• Analytics prédictive IA</li>
                <li>• ROI 312% première année</li>
                <li>• Intégration native Shopify Plus</li>
              </ul>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Analyse spécifique au scénario : {scenarioId}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};