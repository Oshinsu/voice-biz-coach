import React from 'react';
import { Package } from 'lucide-react';
import { Product } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { ByssVnsOverview } from './ByssVnsOverview';
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
        <ByssVnsOverview scenarioId={scenarioId} />
      </AnalysisSection>

      {/* Marketing Tools Dashboard */}
      <MarketingToolsDashboard scenarioId={scenarioId} productSwot={productSwot} />
    </div>
  );
};