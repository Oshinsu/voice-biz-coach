import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useScenarios } from '@/hooks/useScenarios';
import { 
  Target, Megaphone, Users, Zap, DollarSign, 
  TrendingUp, Calendar, CheckCircle, ArrowRight,
  BarChart3, MessageSquare, Globe, Smartphone
} from 'lucide-react';

interface MarketingStrategyProps {
  scenarioId: string;
}

const getMarketingStrategy = (scenarioId: string, scenario: any) => {
  // Check if scenario has marketing mix data
  if (scenario?.salesStrategy?.marketingMix) {
    return {
      company: scenario.company.name,
      ...scenario.salesStrategy.marketingMix
    };
  }

  // Generate default marketing strategy based on scenario context
  const company = scenario?.company?.name || 'Entreprise';
  const productName = scenario?.product?.name || 'Solution';
  const sector = scenario?.company?.sector || 'marché';
  const productDesc = scenario?.product?.description || 'Notre solution innovante';

  const defaultStrategy = {
    company,
    positioning: {
      value_proposition: `${productName} - la solution qui transforme votre ${sector}`,
      target_persona: scenario?.interlocutor?.role || 'Décideurs métier et technique',
      differentiation: scenario?.product?.competitiveAdvantages || [
        'Innovation technologique avancée',
        'Expertise sectorielle approfondie',
        'ROI mesurable et prouvé',
        'Support client premium'
      ],
      competitive_advantage: `La seule solution ${sector} combinant performance et simplicité d'usage`
    },
    communication_strategy: {
      brand_voice: 'Expert, fiable, orienté résultats',
      key_messages: [
        `${productName} révolutionne votre ${sector}`,
        'Performance mesurable, résultats garantis',
        'L\'expertise qui fait la différence',
        'Votre partenaire de transformation'
      ],
      content_pillars: [
        'Success stories et études de cas',
        'Insights sectoriels et bonnes pratiques',
        'Guides techniques et formations',
        'Vision et innovation produit'
      ]
    },
    acquisition_channels: [
      {
        channel: 'Digital Marketing',
        budget: '10K€/mois',
        roi: '4.5x',
        volume: '100 leads/mois',
        strategy: 'SEO/SEA ciblé + content marketing'
      },
      {
        channel: 'Events & Networking',
        budget: '8K€/mois',
        roi: '3.2x',
        volume: '50 leads/mois',
        strategy: 'Conférences sectorielles + webinars'
      },
      {
        channel: 'Partenariats',
        budget: '5K€/mois',
        roi: '6.8x',
        volume: '30 leads/mois',
        strategy: 'Réseau partenaires et referrals'
      },
      {
        channel: 'Sales Direct',
        budget: '12K€/mois',
        roi: '5.1x',
        volume: '80 leads/mois',
        strategy: 'Prospection directe et account-based marketing'
      }
    ],
    retention_strategy: {
      onboarding: 'Accompagnement dédié 60 jours + formation équipe',
      engagement: [
        'Support client réactif et expert',
        'Updates produit réguliers',
        'Webinars techniques mensuels',
        'Communauté utilisateurs'
      ],
      expansion: [
        'Analyse besoins évolutifs',
        'Modules complémentaires',
        'Services professionnels',
        'Montée en gamme progressive'
      ]
    },
    kpis: {
      acquisition: [
        { name: 'CAC', current: '2,500€', target: '2,000€', trend: 'down' },
        { name: 'LTV', current: '12,000€', target: '15,000€', trend: 'up' },
        { name: 'Conversion Rate', current: '2.8%', target: '4.0%', trend: 'up' },
        { name: 'Pipeline Velocity', current: '60 jours', target: '45 jours', trend: 'down' }
      ],
      retention: [
        { name: 'NRR', current: '110%', target: '125%', trend: 'up' },
        { name: 'Churn Rate', current: '12%', target: '8%', trend: 'down' },
        { name: 'NPS Score', current: '65', target: '75', trend: 'up' },
        { name: 'Support CSAT', current: '4.2/5', target: '4.6/5', trend: 'up' }
      ]
    }
  };

  return defaultStrategy;
};

export const MarketingStrategy: React.FC<MarketingStrategyProps> = ({ scenarioId }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);
  const strategy = getMarketingStrategy(scenarioId, scenario);
  
  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
  };

  const ChannelCard = ({ channel }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold">{channel.channel}</h4>
          <Badge variant="outline" className="text-xs">
            ROI {channel.roi}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>{channel.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{channel.volume}</span>
          </div>
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">{channel.strategy}</p>
        </div>
      </CardContent>
    </Card>
  );

  const KPICard = ({ kpi }: any) => (
    <div className="p-3 bg-white border rounded-lg hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-medium text-sm">{kpi.name}</h5>
        {getTrendIcon(kpi.trend)}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Actuel</span>
          <span className="font-bold">{kpi.current}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Objectif</span>
          <span className="font-bold text-green-600">{kpi.target}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Stratégie Marketing - {strategy.company}</h3>
        <p className="text-muted-foreground">Positionnement, communication et acquisition</p>
      </div>

      <Tabs defaultValue="positioning" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="positioning">Positionnement</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          <TabsTrigger value="retention">Rétention</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="positioning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Positionnement stratégique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Proposition de valeur</h4>
                    <p className="text-sm p-3 bg-primary/5 rounded-lg italic">
                      "{strategy.positioning.value_proposition}"
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Persona cible</h4>
                    <p className="text-sm p-3 bg-secondary/5 rounded-lg">
                      {strategy.positioning.target_persona}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Facteurs de différenciation</h4>
                    <ul className="space-y-2">
                      {strategy.positioning.differentiation.map((factor: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Avantage concurrentiel unique
                </h4>
                <p className="text-sm font-medium text-blue-800">
                  {strategy.positioning.competitive_advantage}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Stratégie de communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tonalité de marque</h4>
                    <Badge variant="outline" className="text-sm">
                      {strategy.communication_strategy.brand_voice}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Messages clés</h4>
                    <div className="space-y-2">
                      {strategy.communication_strategy.key_messages.map((message: string, index: number) => (
                        <div key={index} className="p-2 bg-muted/50 rounded text-sm">
                          <MessageSquare className="h-3 w-3 inline mr-2" />
                          {message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Piliers de contenu</h4>
                  <div className="space-y-3">
                    {strategy.communication_strategy.content_pillars.map((pillar: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Canaux d'acquisition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strategy.acquisition_channels.map((channel: any, index: number) => (
                  <ChannelCard key={index} channel={channel} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Mix d'acquisition optimal</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">46K€</p>
                    <p className="text-green-600">Budget mensuel total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">610</p>
                    <p className="text-green-600">Leads/mois prévus</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">5.2x</p>
                    <p className="text-green-600">ROI moyen pondéré</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stratégie de rétention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Onboarding
                  </h4>
                  <p className="text-sm p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    {strategy.retention_strategy.onboarding}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Engagement</h4>
                  <ul className="space-y-2">
                    {strategy.retention_strategy.engagement.map((item: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <ArrowRight className="h-3 w-3 mt-1 text-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Expansion</h4>
                  <ul className="space-y-2">
                    {strategy.retention_strategy.expansion.map((item: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <TrendingUp className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">KPIs Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strategy.kpis.acquisition.map((kpi: any, index: number) => (
                    <KPICard key={index} kpi={kpi} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">KPIs Rétention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strategy.kpis.retention.map((kpi: any, index: number) => (
                    <KPICard key={index} kpi={kpi} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};