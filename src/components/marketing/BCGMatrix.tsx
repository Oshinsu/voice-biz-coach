import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScenarios } from '@/hooks/useScenarios';
import { 
  Star, DollarSign, HelpCircle, Minus,
  TrendingUp, TrendingDown, ArrowRight
} from 'lucide-react';

interface BCGProduct {
  name: string;
  marketShare: number;
  marketGrowth: number;
  revenue: string;
  description: string;
  strategy: string;
  quadrant: 'Star' | 'Cash Cow' | 'Question Mark' | 'Dog';
}

interface BCGMatrixProps {
  scenarioId: string;
}

const getBCGData = (scenarioId: string, scenario: any) => {
  // Check if scenario has product portfolio data
  if (scenario?.marketData?.productPortfolio) {
    return {
      company: scenario.company.name,
      products: scenario.marketData.productPortfolio
    };
  }

  // Generate default BCG portfolio based on product information
  const company = scenario?.company?.name || 'Entreprise';
  const productName = scenario?.product?.name || 'Solution principale';
  const productDesc = scenario?.product?.description || 'Produit/service principal de l\'entreprise';
  
  const defaultProducts = [
    {
      name: productName,
      marketShare: 12,
      marketGrowth: 35,
      revenue: scenario?.expectedRevenue || '500K€',
      description: productDesc,
      strategy: 'Investir pour transformer en leader de marché',
      quadrant: 'Star' as const
    },
    {
      name: 'Offre traditionnelle',
      marketShare: 25,
      marketGrowth: 8,
      revenue: '800K€',
      description: 'Services/produits établis et matures',
      strategy: 'Exploiter pour financer innovation',
      quadrant: 'Cash Cow' as const
    },
    {
      name: 'Innovation émergente',
      marketShare: 5,
      marketGrowth: 45,
      revenue: '200K€',
      description: 'Nouveaux segments et opportunités',
      strategy: 'Évaluer potentiel avant investissement massif',
      quadrant: 'Question Mark' as const
    },
    {
      name: 'Legacy',
      marketShare: 30,
      marketGrowth: -5,
      revenue: '300K€',
      description: 'Produits/services en déclin',
      strategy: 'Maintenir minimum ou abandonner progressivement',
      quadrant: 'Dog' as const
    }
  ];

  return {
    company,
    products: defaultProducts
  };
};

export const BCGMatrix: React.FC<BCGMatrixProps> = ({ scenarioId }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);
  const data = getBCGData(scenarioId, scenario);
  
  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'Star': return <Star className="h-5 w-5 text-yellow-500" />;
      case 'Cash Cow': return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'Question Mark': return <HelpCircle className="h-5 w-5 text-blue-500" />;
      case 'Dog': return <Minus className="h-5 w-5 text-gray-500" />;
      default: return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'Star': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'Cash Cow': return 'bg-green-50 border-green-200 text-green-800';
      case 'Question Mark': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Dog': return 'bg-gray-50 border-gray-200 text-gray-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const ProductBubble = ({ product }: { product: BCGProduct }) => {
    const baseSize = parseFloat(product.revenue.replace(/[^\d]/g, '')) || 500;
    const size = Math.max(50, Math.min(100, (baseSize / 10)));
    
    // Normalize positions to fit within matrix bounds
    const leftPosition = Math.min(85, Math.max(5, product.marketShare * 2.5));
    const bottomPosition = Math.min(85, Math.max(5, Math.abs(product.marketGrowth) * 1.8));
    
    return (
      <div
        className={`absolute flex flex-col items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer ${getQuadrantColor(product.quadrant)}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${leftPosition}%`,
          bottom: `${bottomPosition}%`,
          transform: 'translate(-50%, 50%)'
        }}
      >
        <div className="text-center p-1">
          {getQuadrantIcon(product.quadrant)}
          <p className="text-xs font-bold mt-1 leading-tight">{product.name}</p>
          <p className="text-xs leading-tight">{product.revenue}</p>
        </div>
      </div>
    );
  };

  const QuadrantCard = ({ quadrant, products, description, strategy }: any) => (
    <Card className={`${getQuadrantColor(quadrant)} hover:shadow-md transition-all duration-300`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {getQuadrantIcon(quadrant)}
          {quadrant}
        </CardTitle>
        <p className="text-sm opacity-80">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {products.map((product: BCGProduct, index: number) => (
            <div key={index} className="p-3 bg-white/50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-sm">{product.name}</h5>
                <Badge variant="outline" className="text-xs">
                  {product.revenue}
                </Badge>
              </div>
              <p className="text-xs opacity-75 mb-2">{product.description}</p>
              <div className="flex items-center gap-4 text-xs">
                <span>PDM: {product.marketShare}%</span>
                <span className="flex items-center gap-1">
                  {product.marketGrowth > 0 ? 
                    <TrendingUp className="h-3 w-3" /> : 
                    <TrendingDown className="h-3 w-3" />
                  }
                  {Math.abs(product.marketGrowth)}%
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-black/10">
                <p className="text-xs font-medium">Stratégie:</p>
                <p className="text-xs italic">{product.strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Matrice BCG - {data.company}</h3>
        <p className="text-muted-foreground">Analyse du portefeuille d'activités</p>
      </div>

      {/* BCG Matrix Visualization */}
      <Card className="p-6">
        <div className="relative h-96 border-2 border-gray-300 bg-gradient-to-tr from-gray-50 to-white">
          {/* Axes Labels */}
          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 -rotate-90">
            <span className="text-sm font-medium text-gray-600">Croissance du marché (%)</span>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <span className="text-sm font-medium text-gray-600">Part de marché relative (%)</span>
          </div>
          
          {/* Quadrant Lines */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300"></div>
          </div>
          
          {/* Quadrant Labels */}
          <div className="absolute top-4 left-4 text-yellow-600 font-semibold">Stars</div>
          <div className="absolute top-4 right-4 text-blue-600 font-semibold">Question Marks</div>
          <div className="absolute bottom-4 left-4 text-green-600 font-semibold">Cash Cows</div>
          <div className="absolute bottom-4 right-4 text-gray-600 font-semibold">Dogs</div>
          
          {/* Product Bubbles */}
          {data.products.map((product: BCGProduct, index: number) => (
            <ProductBubble key={index} product={product} />
          ))}
        </div>
      </Card>

      {/* Detailed Quadrant Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuadrantCard
          quadrant="Star"
          products={data.products.filter((p: BCGProduct) => p.quadrant === 'Star')}
          description="Forte croissance, forte part de marché"
          strategy="Investir pour maintenir position dominante"
        />
        <QuadrantCard
          quadrant="Question Mark"
          products={data.products.filter((p: BCGProduct) => p.quadrant === 'Question Mark')}
          description="Forte croissance, faible part de marché"
          strategy="Analyser et investir sélectivement"
        />
        <QuadrantCard
          quadrant="Cash Cow"
          products={data.products.filter((p: BCGProduct) => p.quadrant === 'Cash Cow')}
          description="Faible croissance, forte part de marché"
          strategy="Exploiter pour financer autres activités"
        />
        <QuadrantCard
          quadrant="Dog"
          products={data.products.filter((p: BCGProduct) => p.quadrant === 'Dog')}
          description="Faible croissance, faible part de marché"
          strategy="Désinvestir ou abandonner"
        />
      </div>

      {/* Strategic Recommendations */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Plan d'action stratégique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-purple-700">Actions immédiates</h5>
              <ul className="space-y-1 text-sm">
                <li>• Sécuriser position Stars avec investissement R&D</li>
                <li>• Optimiser Cash Cows pour maximiser profit</li>
                <li>• Analyser ROI potentiel Question Marks</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-blue-700">Développement portfolio</h5>
              <ul className="space-y-1 text-sm">
                <li>• Transformer Question Marks prometteurs en Stars</li>
                <li>• Utiliser cash-flow Cash Cows pour innovation</li>
                <li>• Planifier exit strategy pour Dogs</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-green-700">Équilibrage ressources</h5>
              <ul className="space-y-1 text-sm">
                <li>• 60% investissement sur Stars</li>
                <li>• 25% test Question Marks sélectionnés</li>
                <li>• 15% maintenance minimale Dogs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};