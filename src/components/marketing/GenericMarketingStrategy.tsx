import React from 'react';
import { Target, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useScenarios } from '@/hooks/useScenarios';

interface GenericMarketingStrategyProps {
  scenarioId: string;
  productSwot?: any;
}

export const GenericMarketingStrategy: React.FC<GenericMarketingStrategyProps> = ({ 
  scenarioId, 
  productSwot 
}) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);

  if (!scenario) {
    return <div>Scénario non trouvé</div>;
  }

  // Market data from scenario or defaults
  const getMarketData = () => {
    if (scenario.marketData?.marketOverview) {
      return scenario.marketData.marketOverview;
    }

    // Default market data based on scenario type
    switch (scenarioId) {
      case 'fintech-startup':
        return {
          marketSize: "15.2B$ global fintech, 890M€ France",
          growthRate: "+22% CAGR global, +31% CAGR France",
          budgetRange: "2M-5M€ R&D (30-40% sécurité/compliance)",
          expectedROI: "35% an 1, 180% cumulé 3 ans",
          keyPlayers: ["Stripe", "Adyen", "Checkout.com", "Klarna"]
        };
      case 'digital-agency':
        return {
          marketSize: "2.3B€ marché agences digitales France",
          growthRate: "+18% CAGR agences, +22% outils productivity",
          budgetRange: "8K-25K€/an tools management",
          expectedROI: "+40% marge opérationnelle",
          keyPlayers: ["Monday.com", "Asana", "Notion", "ClickUp"]
        };
      case 'kpi-performance':
        return {
          marketSize: "8.2B$ analytics e-commerce global",
          growthRate: "+25% CAGR attribution marketing",
          budgetRange: "15K-50K€/an analytics tools",
          expectedROI: "+35% ROAS, -28% CAC",
          keyPlayers: ["Google Analytics", "Northbeam", "Triple Whale"]
        };
      default:
        return {
          marketSize: "Marché en forte croissance",
          growthRate: "+20% CAGR moyen",
          budgetRange: "10K-30K€/an solutions tech",
          expectedROI: "+25% efficacité opérationnelle",
          keyPlayers: ["Leader 1", "Leader 2", "Leader 3"]
        };
    }
  };

  // Target segments based on scenario
  const getTargetSegments = () => {
    switch (scenarioId) {
      case 'fintech-startup':
        return [
          { name: 'Fintech Credit PME', size: '45%', growth: '+31%' },
          { name: 'Néobanques', size: '30%', growth: '+28%' },
          { name: 'Lending Platforms', size: '25%', growth: '+35%' }
        ];
      case 'digital-agency':
        return [
          { name: 'Agences 5-15 employés', size: '50%', growth: '+25%' },
          { name: 'Freelances & Studios', size: '35%', growth: '+18%' },
          { name: 'Agences Enterprise', size: '15%', growth: '+12%' }
        ];
      case 'kpi-performance':
        return [
          { name: 'E-commerce Mode', size: '40%', growth: '+45%' },
          { name: 'Retail Omnicanal', size: '35%', growth: '+22%' },
          { name: 'DTC Brands', size: '25%', growth: '+38%' }
        ];
      default:
        return [
          { name: 'PME Innovantes', size: '45%', growth: '+20%' },
          { name: 'Scale-ups Tech', size: '35%', growth: '+35%' },
          { name: 'Entreprises Mid-Market', size: '20%', growth: '+15%' }
        ];
    }
  };

  // Strategic positioning based on scenario
  const getPositioning = () => {
    switch (scenarioId) {
      case 'fintech-startup':
        return {
          primary: 'Expertise réglementaire française',
          secondary: 'IA explicable et conforme',
          differentiation: 'Spécialisation PME vs généralistes'
        };
      case 'digital-agency':
        return {
          primary: 'Simplicité pour agences créatives',
          secondary: 'ROI immédiat productivité',
          differentiation: 'Templates métier vs outils génériques'
        };
      case 'kpi-performance':
        return {
          primary: 'Attribution précise cross-canal',
          secondary: 'Setup 24h vs semaines',
          differentiation: 'Spécialisation e-commerce vs généralistes'
        };
      default:
        return {
          primary: 'Innovation technologique',
          secondary: 'Support expert français',
          differentiation: 'Approche métier spécialisée'
        };
    }
  };

  // Go-to-market strategy based on scenario
  const getGTMStrategy = () => {
    switch (scenarioId) {
      case 'fintech-startup':
        return [
          'Événements fintech spécialisés (Fintech R:Evolution, Paris Fintech Forum)',
          'Partenariats incubateurs (Station F, TheFamily, 50 Partners)',
          'Content marketing réglementaire (conformité Banque de France)',
          'Réseau alumni grandes écoles et banques traditionnelles'
        ];
      case 'digital-agency':
        return [
          'Salons agences (E-marketing Paris, Digital Marketing Show)',
          'Partenariats Shopify Plus, WordPress VIP',
          'Community building (Slack des directeurs agence)',
          'Webinars productivité et ROI opérationnel'
        ];
      case 'kpi-performance':
        return [
          'E-commerce events (FEVAD, E-commerce Paris)',
          'Partenariats Shopify, Meta Business, Google Premier',
          'Content attribution & iOS 14.5+ challenges',
          'Communauté growth marketers e-commerce'
        ];
      default:
        return [
          'Événements sectoriels spécialisés',
          'Partenariats technologiques stratégiques',
          'Marketing de contenu expert',
          'Réseau professionnel ciblé'
        ];
    }
  };

  const marketData = getMarketData();
  const targetSegments = getTargetSegments();
  const positioning = getPositioning();
  const gtmStrategy = getGTMStrategy();

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Vue d'ensemble du marché
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Données clés</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taille du marché</span>
                  <span className="font-medium">{marketData.marketSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Croissance</span>
                  <span className="font-medium text-green-600">{marketData.growthRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget moyen</span>
                  <span className="font-medium">{marketData.budgetRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ROI attendu</span>
                  <span className="font-medium text-primary">{marketData.expectedROI}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Acteurs principaux</h4>
              <div className="space-y-2">
                {marketData.keyPlayers?.map((player, index) => (
                  <Badge key={index} variant="outline" className="mr-2">
                    {player}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Segments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Segments Cibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {targetSegments.map((segment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">{segment.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Part de marché</span>
                    <span className="font-medium">{segment.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Croissance</span>
                    <span className="font-medium text-green-600">{segment.growth}</span>
                  </div>
                  <Progress value={parseInt(segment.size.replace('%', ''))} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Positioning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Positionnement Stratégique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Position Principale</h4>
              <p className="text-sm">{positioning.primary}</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <h4 className="font-semibold text-secondary-foreground mb-2">Bénéfice Clé</h4>
              <p className="text-sm">{positioning.secondary}</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <h4 className="font-semibold text-accent-foreground mb-2">Différenciation</h4>
              <p className="text-sm">{positioning.differentiation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Go-to-Market Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Stratégie Go-to-Market
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gtmStrategy.map((strategy, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-sm">{strategy}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      {scenario.swot && (
        <Card>
          <CardHeader>
            <CardTitle>Analyse SWOT Produit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">Forces</h4>
                <div className="space-y-2">
                  {scenario.swot.strengths?.slice(0, 3).map((strength, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2" />
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 mb-3">Opportunités</h4>
                <div className="space-y-2">
                  {scenario.swot.opportunities?.slice(0, 3).map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};