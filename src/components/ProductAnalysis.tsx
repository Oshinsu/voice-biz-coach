import React from 'react';
import { Package } from 'lucide-react';
import { Product } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { MarketingToolsDashboard } from './marketing/MarketingToolsDashboard';

interface ProductAnalysisProps {
  products?: Product[];
  scenarioId?: string;
  productSwot?: any;
}

export const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ 
  products = [], 
  scenarioId = 'byss-vns-school',
  productSwot 
}) => {
  const mainProduct = products[0];
  
  if (!mainProduct) {
    return (
      <div className="space-y-6">
        <MarketingToolsDashboard scenarioId={scenarioId} productSwot={productSwot} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Overview unifié */}
      <AnalysisSection
        title={`${mainProduct.name} - Vue d'ensemble`}
        icon={Package}
      >
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            Les informations produit détaillées sont maintenant intégrées dans l'onglet "Vue d'ensemble".
          </p>
        </div>
      </AnalysisSection>

      {/* Marketing Tools Dashboard */}
      <MarketingToolsDashboard scenarioId={scenarioId} productSwot={productSwot} />
    </div>
  );
};