import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

const getAnsoffData = (scenarioId: string) => {
  const ansoffDataMap: Record<string, any> = {
    'digital-agency': {
      company: 'Pixel Perfect Agency',
      strategies: {
        penetration: {
          title: 'Pénétration de marché',
          description: 'Augmenter la part de marché avec les services actuels',
          risk: 'Faible' as const,
          potential: 85,
          timeframe: '3-6 mois',
          investment: '50K-100K€',
          examples: [
            'Campagnes acquisition clients existants',
            'Programme referral clients satisfaits',
            'Optimisation pricing et packages',
            'Amélioration process vente'
          ],
          kpis: [
            'Nombre nouveaux clients/mois',
            'Taux conversion prospects',
            'Chiffre affaires par client',
            'NPS et satisfaction client'
          ]
        },
        productDev: {
          title: 'Développement produits',
          description: 'Nouveaux services pour clients actuels',
          risk: 'Moyen' as const,
          potential: 75,
          timeframe: '6-12 mois',
          investment: '150K-300K€',
          examples: [
            'Services IA et automation marketing',
            'Consulting transformation digitale',
            'Formation équipes clients',
            'Solutions e-commerce avancées'
          ],
          kpis: [
            'Revenu par nouveau service',
            'Taux adoption clients existants',
            'Marge services premium',
            'Time-to-market nouveaux services'
          ]
        },
        marketDev: {
          title: 'Développement marché',
          description: 'Services actuels vers nouveaux segments',
          risk: 'Moyen' as const,
          potential: 70,
          timeframe: '9-15 mois',
          investment: '200K-400K€',
          examples: [
            'Expansion secteurs industriels',
            'Marché entreprises internationales',
            'Startups en hypercroissance',
            'Secteur public et collectivités'
          ],
          kpis: [
            'Pénétration nouveaux segments',
            'Coût acquisition nouveau marché',
            'Temps cycle vente segment',
            'Retour investissement expansion'
          ]
        },
        diversification: {
          title: 'Diversification',
          description: 'Nouveaux services pour nouveaux marchés',
          risk: 'Élevé' as const,
          potential: 60,
          timeframe: '18-36 mois',
          investment: '500K-1M€',
          examples: [
            'Plateforme SaaS propriétaire',
            'Acquisition agences complémentaires',
            'Services blockchain/Web3',
            'Consulting cybersécurité'
          ],
          kpis: [
            'ROI nouvelles activités',
            'Synergies cross-selling',
            'Part CA nouvelles activités',
            'Risque cannibalisation'
          ]
        }
      }
    },
    'fintech-startup': {
      company: 'PaySecure AI',
      strategies: {
        penetration: {
          title: 'Pénétration de marché',
          description: 'Croissance dans la détection de fraude FinTech',
          risk: 'Faible' as const,
          potential: 90,
          timeframe: '3-6 mois',
          investment: '200K-500K€',
          examples: [
            'Optimisation algorithmes existants',
            'Amélioration UX platform',
            'Programme partenaires FinTech',
            'Pricing compétitif agressif'
          ],
          kpis: [
            'Nombre transactions traitées',
            'Taux détection fraude',
            'Temps response API',
            'NRR (Net Revenue Retention)'
          ]
        },
        productDev: {
          title: 'Développement produits',
          description: 'Extensions IA pour clients FinTech actuels',
          risk: 'Moyen' as const,
          potential: 85,
          timeframe: '6-9 mois',
          investment: '500K-1M€',
          examples: [
            'Credit scoring intelligent',
            'Prédiction churn clients',
            'Optimisation pricing dynamique',
            'Compliance automation'
          ],
          kpis: [
            'ARR nouveaux produits',
            'Expansion revenue clients',
            'Time-to-value produits',
            'Adoption rate features'
          ]
        },
        marketDev: {
          title: 'Développement marché',
          description: 'IA anti-fraude vers nouveaux secteurs',
          risk: 'Moyen' as const,
          potential: 75,
          timeframe: '12-18 mois',
          investment: '800K-1.5M€',
          examples: [
            'E-commerce et retail',
            'Assurance et insurtech',
            'Gaming et betting',
            'Télécommunications'
          ],
          kpis: [
            'Pénétration nouveaux secteurs',
            'Coût acquisition marché',
            'Customisation par secteur',
            'ROI expansion géographique'
          ]
        },
        diversification: {
          title: 'Diversification',
          description: 'Nouveaux cas usage IA pour nouveaux marchés',
          risk: 'Élevé' as const,
          potential: 65,
          timeframe: '24-36 mois',
          investment: '2M-5M€',
          examples: [
            'IA prédictive supply chain',
            'Solutions IA healthcare',
            'Platform IA no-code',
            'Services consulting IA'
          ],
          kpis: [
            'Diversification revenue',
            'Market share nouveaux segments',
            'Synergies technologiques',
            'Retour investissement R&D'
          ]
        }
      }
    }
  };

  return ansoffDataMap[scenarioId] || ansoffDataMap['digital-agency'];
};

export const AnsoffMatrix: React.FC<AnsoffMatrixProps> = ({ scenarioId }) => {
  const data = getAnsoffData(scenarioId);
  
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