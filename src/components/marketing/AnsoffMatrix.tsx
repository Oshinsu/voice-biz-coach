import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useScenarios } from '@/hooks/useScenarios';
import { 
  Target, TrendingUp, Zap, Rocket,
  CheckCircle, AlertCircle, Clock, DollarSign
} from 'lucide-react';

interface AnsoffStrategy {
  title: string;
  description: string;
  risk: 'Faible' | 'Moyen' | 'Élevé';
  potential: number;
  timeframe: string;
  investment: string;
  examples: string[];
  kpis: string[];
}

interface AnsoffMatrixProps {
  scenarioId: string;
}

const getAnsoffData = (scenarioId: string, scenario: any) => {
  // Check if scenario has growth strategies data
  if (scenario?.salesStrategy?.growthStrategies) {
    return {
      company: scenario.company.name,
      strategies: scenario.salesStrategy.growthStrategies
    };
  }

  // Generate default Ansoff strategies based on scenario context
  const company = scenario?.company?.name || 'Entreprise';
  const sector = scenario?.company?.sector || 'secteur';
  
  const defaultStrategies = {
    company,
    strategies: {
      penetration: {
        title: 'Pénétration de marché',
        description: `Augmenter la part de marché ${sector} avec l'offre actuelle`,
        risk: 'Faible' as const,
        potential: 80,
        timeframe: '3-6 mois',
        investment: '50K-150K€',
        examples: [
          'Optimisation stratégie commerciale existante',
          'Amélioration taux conversion prospects',
          'Programme fidélisation clients actuels',
          'Expansion géographique ciblée'
        ],
        kpis: [
          'Croissance CA clients existants',
          'Taux conversion lead-to-customer',
          'Part de marché relative',
          'Satisfaction client (NPS)'
        ]
      },
      productDev: {
        title: 'Développement produits',
        description: 'Nouveaux services pour la base clients actuelle',
        risk: 'Moyen' as const,
        potential: 70,
        timeframe: '6-12 mois',
        investment: '100K-300K€',
        examples: [
          'Extensions fonctionnelles produit principal',
          'Services complémentaires haute valeur',
          'Modules premium personnalisés',
          'Solutions intégrées end-to-end'
        ],
        kpis: [
          'Revenus nouveaux produits/services',
          'Taux adoption base installée',
          'Time-to-market innovations',
          'Cross-sell ratio moyen'
        ]
      },
      marketDev: {
        title: 'Développement marché',
        description: 'Expansion vers nouveaux segments avec offre actuelle',
        risk: 'Moyen' as const,
        potential: 65,
        timeframe: '9-18 mois',
        investment: '200K-500K€',
        examples: [
          'Ciblage nouveaux secteurs d\'activité',
          'Expansion internationale ciblée',
          'Segments clients différents',
          'Nouveaux canaux de distribution'
        ],
        kpis: [
          'Pénétration nouveaux segments',
          'Coût acquisition nouveaux marchés',
          'ROI expansion géographique',
          'Adaptation produit-marché'
        ]
      },
      diversification: {
        title: 'Diversification',
        description: 'Nouveaux produits pour nouveaux marchés',
        risk: 'Élevé' as const,
        potential: 50,
        timeframe: '18-36 mois',
        investment: '500K-1M€',
        examples: [
          'Acquisition sociétés complémentaires',
          'Développement plateformes nouvelles',
          'Partenariats stratégiques majeurs',
          'Innovation technologique disruptive'
        ],
        kpis: [
          'ROI investissements diversification',
          'Synergies activités nouvelles/existantes',
          'Time-to-profitability nouvelles activités',
          'Risque dilution focus métier'
        ]
      }
    }
  };

  return defaultStrategies;
};

export const AnsoffMatrix: React.FC<AnsoffMatrixProps> = ({ scenarioId }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);
  const data = getAnsoffData(scenarioId, scenario);
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Faible': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Élevé': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Faible': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Moyen': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Élevé': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const StrategyCard = ({ strategy, quadrant }: { strategy: AnsoffStrategy; quadrant: string }) => (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 animate-fade-in hover-scale ${getRiskColor(strategy.risk)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {quadrant}
          </Badge>
          <div className="flex items-center gap-1">
            {getRiskIcon(strategy.risk)}
            <span className="text-xs font-medium">{strategy.risk}</span>
          </div>
        </div>
        <CardTitle className="text-lg font-bold">
          {strategy.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {strategy.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Potential & Timeline */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Potentiel de croissance</span>
            <span className="text-xs font-bold">{strategy.potential}%</span>
          </div>
          <Progress value={strategy.potential} className="h-2" />
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{strategy.timeframe}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              <span>{strategy.investment}</span>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div>
          <h5 className="text-xs font-semibold mb-2">Initiatives clés:</h5>
          <ul className="space-y-1">
            {strategy.examples.slice(0, 3).map((example, index) => (
              <li key={index} className="text-xs flex items-start gap-1">
                <span className="text-primary mt-0.5">•</span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* KPIs */}
        <div>
          <h5 className="text-xs font-semibold mb-2">KPIs de suivi:</h5>
          <div className="space-y-1">
            {strategy.kpis.slice(0, 2).map((kpi, index) => (
              <div key={index} className="text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-blue-500" />
                <span>{kpi}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Matrice d'Ansoff - {data.company}</h3>
        <p className="text-muted-foreground">Stratégies de croissance et d'expansion</p>
      </div>

      {/* Matrix Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Row */}
        <div className="space-y-3">
          <div className="text-center bg-blue-50 p-2 rounded-lg">
            <h4 className="font-semibold text-blue-800">Produits Existants</h4>
          </div>
          <StrategyCard 
            strategy={data.strategies.penetration} 
            quadrant="Croissance Intensive"
          />
        </div>
        
        <div className="space-y-3">
          <div className="text-center bg-purple-50 p-2 rounded-lg">
            <h4 className="font-semibold text-purple-800">Nouveaux Produits</h4>
          </div>
          <StrategyCard 
            strategy={data.strategies.productDev} 
            quadrant="Développement Produit"
          />
        </div>

        {/* Bottom Row */}
        <div className="space-y-3">
          <div className="text-center bg-green-50 p-2 rounded-lg">
            <h4 className="font-semibold text-green-800">Marchés Existants</h4>
          </div>
          <StrategyCard 
            strategy={data.strategies.marketDev} 
            quadrant="Développement Marché"
          />
        </div>
        
        <div className="space-y-3">
          <div className="text-center bg-orange-50 p-2 rounded-lg">
            <h4 className="font-semibold text-orange-800">Nouveaux Marchés</h4>
          </div>
          <StrategyCard 
            strategy={data.strategies.diversification} 
            quadrant="Diversification"
          />
        </div>
      </div>

      {/* Strategic Recommendations */}
      <Card className="bg-gradient-to-r from-indigo-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommandations prioritaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-green-700 flex items-center gap-1">
                <Rocket className="h-4 w-4" />
                Court terme (0-6 mois)
              </h5>
              <p className="text-sm">Focus sur pénétration de marché avec optimisation offre actuelle et acquisition clients.</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-blue-700 flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Moyen terme (6-18 mois)
              </h5>
              <p className="text-sm">Développement produits parallèle à expansion vers nouveaux segments de marché.</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-purple-700 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Long terme (18+ mois)
              </h5>
              <p className="text-sm">Évaluation diversification après consolidation position marché actuel.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};