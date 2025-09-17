import React from 'react';
import { Star, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScenarios } from '@/hooks/useScenarios';

interface GenericBCGMatrixProps {
  scenarioId: string;
}

export const GenericBCGMatrix: React.FC<GenericBCGMatrixProps> = ({ scenarioId }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);

  if (!scenario) {
    return <div>Scénario non trouvé</div>;
  }

  // Get portfolio products based on scenario
  const getPortfolioProducts = () => {
    switch (scenarioId) {
      case 'fintech-startup':
        return {
          stars: {
            name: 'CreditAI Engine Professional',
            description: 'Solution IA scoring crédit avec explicabilité réglementaire',
            marketGrowth: 31,
            marketShare: 12,
            investment: 'Investissement R&D continu',
            revenue: '60% du CA'
          },
          cashCows: {
            name: 'CreditAI Basic',
            description: 'Version starter pour petites fintech',
            marketGrowth: 8,
            marketShare: 25,
            investment: 'Maintenance optimisée',
            revenue: '25% du CA'
          },
          questionMarks: {
            name: 'CreditAI Enterprise',
            description: 'Solution banques traditionnelles',
            marketGrowth: 45,
            marketShare: 3,
            investment: 'Tests pilotes intensifs',
            revenue: '10% du CA'
          },
          dogs: {
            name: 'Consulting Compliance',
            description: 'Services conseil réglementaire',
            marketGrowth: 5,
            marketShare: 8,
            investment: 'Désinvestissement progressif',
            revenue: '5% du CA'
          }
        };
      case 'digital-agency':
        return {
          stars: {
            name: 'AgencyFlow Professional',
            description: 'Plateforme complète gestion agence',
            marketGrowth: 25,
            marketShare: 18,
            investment: 'Développement fonctionnalités',
            revenue: '70% du CA'
          },
          cashCows: {
            name: 'AgencyFlow Starter',
            description: 'Version basique freelances',
            marketGrowth: 12,
            marketShare: 30,
            investment: 'Support optimisé',
            revenue: '20% du CA'
          },
          questionMarks: {
            name: 'AgencyFlow Enterprise',
            description: 'Solution grandes agences réseau',
            marketGrowth: 35,
            marketShare: 5,
            investment: 'Prospection active',
            revenue: '8% du CA'
          },
          dogs: {
            name: 'Templates Marketplace',
            description: 'Vente templates isolés',
            marketGrowth: 3,
            marketShare: 12,
            investment: 'Maintenance minimale',
            revenue: '2% du CA'
          }
        };
      case 'kpi-performance':
        return {
          stars: {
            name: 'DataTrack Pro E-commerce',
            description: 'Attribution marketing avancée',
            marketGrowth: 28,
            marketShare: 15,
            investment: 'Innovation IA attribution',
            revenue: '65% du CA'
          },
          cashCows: {
            name: 'DataTrack Analytics',
            description: 'Dashboard basique e-commerce',
            marketGrowth: 10,
            marketShare: 22,
            investment: 'Optimisation coûts',
            revenue: '25% du CA'
          },
          questionMarks: {
            name: 'DataTrack Retail',
            description: 'Solution omnicanal physique',
            marketGrowth: 40,
            marketShare: 4,
            investment: 'R&D partenariats',
            revenue: '7% du CA'
          },
          dogs: {
            name: 'Rapports Custom',
            description: 'Services reporting manuel',
            marketGrowth: 2,
            marketShare: 6,
            investment: 'Phase out',
            revenue: '3% du CA'
          }
        };
      default:
        return {
          stars: {
            name: 'Solution Core',
            description: 'Produit principal en forte croissance',
            marketGrowth: 25,
            marketShare: 15,
            investment: 'Investissement majeur',
            revenue: '60% du CA'
          },
          cashCows: {
            name: 'Solution Établie',
            description: 'Produit mature générateur de cash',
            marketGrowth: 8,
            marketShare: 25,
            investment: 'Maintenance',
            revenue: '30% du CA'
          },
          questionMarks: {
            name: 'Solution Émergente',
            description: 'Nouveau marché à développer',
            marketGrowth: 35,
            marketShare: 5,
            investment: 'Tests marché',
            revenue: '8% du CA'
          },
          dogs: {
            name: 'Solution Legacy',
            description: 'Produit en déclin',
            marketGrowth: 3,
            marketShare: 10,
            investment: 'Désinvestissement',
            revenue: '2% du CA'
          }
        };
    }
  };

  const getQuadrantStyle = (quadrant: string) => {
    switch (quadrant) {
      case 'stars':
        return 'border-yellow-200 bg-yellow-50';
      case 'questionMarks':
        return 'border-red-200 bg-red-50';
      case 'cashCows':
        return 'border-green-200 bg-green-50';
      case 'dogs':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'stars':
        return <Star className="h-5 w-5 text-yellow-600" />;
      case 'questionMarks':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'cashCows':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'dogs':
        return <TrendingUp className="h-5 w-5 text-gray-600 transform rotate-180" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const portfolioProducts = getPortfolioProducts();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Matrice BCG - Portefeuille Produits</CardTitle>
          <CardDescription>
            Analyse du portefeuille produits selon la croissance du marché et la part de marché relative
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stars */}
        <Card className={getQuadrantStyle('stars')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('stars')}
              Stars - Étoiles
            </CardTitle>
            <CardDescription>
              Forte croissance, forte part de marché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{portfolioProducts.stars.name}</h4>
                <p className="text-sm text-muted-foreground">{portfolioProducts.stars.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Croissance marché:</span>
                  <p className="font-medium">+{portfolioProducts.stars.marketGrowth}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Part de marché:</span>
                  <p className="font-medium">{portfolioProducts.stars.marketShare}%</p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Stratégie d'investissement:</span>
                <p className="font-medium">{portfolioProducts.stars.investment}</p>
              </div>
              <Badge variant="outline">{portfolioProducts.stars.revenue}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Question Marks */}
        <Card className={getQuadrantStyle('questionMarks')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('questionMarks')}
              Question Marks - Dilemmes
            </CardTitle>
            <CardDescription>
              Forte croissance, faible part de marché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{portfolioProducts.questionMarks.name}</h4>
                <p className="text-sm text-muted-foreground">{portfolioProducts.questionMarks.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Croissance marché:</span>
                  <p className="font-medium">+{portfolioProducts.questionMarks.marketGrowth}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Part de marché:</span>
                  <p className="font-medium">{portfolioProducts.questionMarks.marketShare}%</p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Stratégie d'investissement:</span>
                <p className="font-medium">{portfolioProducts.questionMarks.investment}</p>
              </div>
              <Badge variant="outline">{portfolioProducts.questionMarks.revenue}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Cash Cows */}
        <Card className={getQuadrantStyle('cashCows')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('cashCows')}
              Cash Cows - Vaches à Lait
            </CardTitle>
            <CardDescription>
              Faible croissance, forte part de marché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{portfolioProducts.cashCows.name}</h4>
                <p className="text-sm text-muted-foreground">{portfolioProducts.cashCows.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Croissance marché:</span>
                  <p className="font-medium">+{portfolioProducts.cashCows.marketGrowth}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Part de marché:</span>
                  <p className="font-medium">{portfolioProducts.cashCows.marketShare}%</p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Stratégie d'investissement:</span>
                <p className="font-medium">{portfolioProducts.cashCows.investment}</p>
              </div>
              <Badge variant="outline">{portfolioProducts.cashCows.revenue}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Dogs */}
        <Card className={getQuadrantStyle('dogs')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('dogs')}
              Dogs - Poids Morts
            </CardTitle>
            <CardDescription>
              Faible croissance, faible part de marché
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{portfolioProducts.dogs.name}</h4>
                <p className="text-sm text-muted-foreground">{portfolioProducts.dogs.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Croissance marché:</span>
                  <p className="font-medium">+{portfolioProducts.dogs.marketGrowth}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Part de marché:</span>
                  <p className="font-medium">{portfolioProducts.dogs.marketShare}%</p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Stratégie d'investissement:</span>
                <p className="font-medium">{portfolioProducts.dogs.investment}</p>
              </div>
              <Badge variant="outline">{portfolioProducts.dogs.revenue}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations Stratégiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Priorités d'investissement</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Maximiser investissement dans les Stars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Optimiser rentabilité des Cash Cows</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Évaluer potentiel Question Marks</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Actions recommandées</h4>
              <div className="space-y-3">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm font-medium">Court terme (6 mois)</p>
                  <p className="text-sm text-muted-foreground">Renforcer position des Stars, optimiser Dogs</p>
                </div>
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-sm font-medium">Moyen terme (1-2 ans)</p>
                  <p className="text-sm text-muted-foreground">Développer Question Marks prometteuses</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};