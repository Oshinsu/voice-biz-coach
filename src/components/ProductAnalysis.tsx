import React from 'react';
import { Package, BarChart3, Target, Users } from 'lucide-react';
import { Product } from '@/hooks/useScenarios';
import { AnalysisSection } from './analysis/AnalysisSection';
import { ProductOverview } from './analysis/ProductOverview';

interface ProductAnalysisProps {
  products?: Product[];
}

export const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ products = [] }) => {
  const mainProduct = products[0];
  
  if (!mainProduct) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucune information produit disponible.</p>
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
        <ProductOverview product={mainProduct} />
      </AnalysisSection>

      {/* Product SWOT */}
      <AnalysisSection
        title="Analyse SWOT du produit"
        icon={BarChart3}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Forces</h4>
              <ul className="text-sm text-green-700 space-y-1">
                {mainProduct.competitive_advantages?.map((advantage, index) => (
                  <li key={index}>• {advantage}</li>
                )) || (
                  <>
                    <li>• Interface utilisateur intuitive</li>
                    <li>• Technologie robuste</li>
                    <li>• Support client réactif</li>
                    <li>• Évolutivité du produit</li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Opportunités</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Marché en expansion</li>
                <li>• Digitalisation accélérée</li>
                <li>• Nouveaux partenariats</li>
                <li>• Innovation continue</li>
                <li>• Expansion géographique</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Faiblesses</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Positionnement premium</li>
                <li>• Courbe d'apprentissage</li>
                <li>• Dépendance technologique</li>
                <li>• Concurrence établie</li>
                <li>• Besoin de validation marché</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Menaces</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Évolution rapide du marché</li>
                <li>• Nouveaux entrants</li>
                <li>• Changements réglementaires</li>
                <li>• Contraintes budgétaires clients</li>
                <li>• Obsolescence technologique</li>
              </ul>
            </div>
          </div>
        </div>
      </AnalysisSection>

      {/* Target Audience */}
      <AnalysisSection
        title="Cibles et personas"
        icon={Users}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mainProduct.target_segments?.map((segment, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">{segment}</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Segment cible principal du produit
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-medium">Besoins:</span> Solutions efficaces</p>
                <p><span className="font-medium">Bénéfices:</span> ROI mesuré</p>
                <p><span className="font-medium">Décision:</span> Validation métier</p>
              </div>
            </div>
          )) || (
            <>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Entreprises</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Organisations cherchant l'efficacité
                </p>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Pain:</span> Processus manuels</p>
                  <p><span className="font-medium">Gain:</span> Automatisation</p>
                  <p><span className="font-medium">Decision:</span> Direction métier</p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Équipes techniques</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Développeurs et ingénieurs
                </p>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Pain:</span> Outils fragmentés</p>
                  <p><span className="font-medium">Gain:</span> Plateforme unifiée</p>
                  <p><span className="font-medium">Decision:</span> Validation technique</p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Décideurs</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Management et direction
                </p>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Pain:</span> Manque de visibilité</p>
                  <p><span className="font-medium">Gain:</span> Analytics précis</p>
                  <p><span className="font-medium">Decision:</span> Approbation budgétaire</p>
                </div>
              </div>
            </>
          )}
        </div>
      </AnalysisSection>
    </div>
  );
};