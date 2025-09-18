import React from 'react';
import { Package } from 'lucide-react';
import { Product } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { UnifiedScenarioAnalysis } from './scenario-engine/UnifiedScenarioAnalysis';
// import { MarketingToolsDashboard } from './marketing/MarketingToolsDashboard'; // Consolidated

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
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            Analyse produit consolidée dans le nouveau système unifié
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Overview */}
      <AnalysisSection
        title={`${mainProduct.name} - Vue d'ensemble`}
        icon={Package}
      >
        <div className="text-center text-muted-foreground">
          Analyse produit intégrée dans le nouveau système unifié
        </div>
      </AnalysisSection>

      {/* Marketing Tools Dashboard - Consolidated */}
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          Outils marketing consolidés dans le nouveau système unifié
        </p>
      </div>
    </div>
  );
};