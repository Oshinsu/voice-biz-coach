import React from 'react';
import { Package } from 'lucide-react';
import { Product } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { GenericProductOverview } from './analysis/GenericProductOverview';
import { DataTrackProOverview } from './analysis/DataTrackProOverview';
import { MarketingToolsDashboard } from './marketing/MarketingToolsDashboard';

interface ProductAnalysisProps {
  products?: Product[];
  scenarioId?: string;
  productSwot?: any;
}

export const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ 
  products = [], 
  scenarioId = 'digital-agency',
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
      {/* Product Overview */}
      <AnalysisSection
        title={`${mainProduct.name} - Vue d'ensemble`}
        icon={Package}
      >
        {scenarioId === 'kpi-performance' ? (
          <DataTrackProOverview product={mainProduct} />
        ) : (
          <GenericProductOverview product={mainProduct} scenarioId={scenarioId} />
        )}
      </AnalysisSection>

      {/* Marketing Tools Dashboard */}
      <MarketingToolsDashboard scenarioId={scenarioId} productSwot={productSwot} />
    </div>
  );
};