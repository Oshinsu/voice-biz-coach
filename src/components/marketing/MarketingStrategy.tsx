import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, Megaphone, Users, Zap, DollarSign, 
  TrendingUp, Calendar, CheckCircle, ArrowRight,
  BarChart3, MessageSquare, Globe, Smartphone
} from 'lucide-react';

interface MarketingStrategyProps {
  scenarioId: string;
}

const getMarketingStrategy = (scenarioId: string) => {
  const strategyMap: Record<string, any> = {
    'digital-agency': {
      company: 'Pixel Perfect Agency',
      positioning: {
        value_proposition: "L'agence digitale qui transforme vos ambitions business en croissance mesurable",
        target_persona: "Dirigeants PME/ETI ambitieux cherchant croissance digitale rentable",
        differentiation: [
          "ROI client garanti avec indicateurs précis",
          "Approche data-driven unique sur le marché",
          "Équipe senior avec 8+ ans d'expérience",
          "Process propriétaires éprouvés"
        ],
        competitive_advantage: "Seule agence garantissant +25% croissance CA digital ou remboursement"
      },
      communication_strategy: {
        brand_voice: "Expert, rassurant, orienté résultats",
        key_messages: [
          "Croissance digitale garantie et mesurable",
          "L'expertise qui transforme les visiteurs en clients",
          "Votre partenaire de croissance digitale durable",
          "ROI transparent, résultats prouvés"
        ],
        content_pillars: [
          "Success stories clients avec chiffres",
          "Insights sectoriels et benchmarks",
          "Guides pratiques marketing digital",
          "Behind-the-scenes expertise équipe"
        ]
      },
      acquisition_channels: [
        {
          channel: 'LinkedIn Ads B2B',
          budget: '15K€/mois',
          roi: '4.2x',
          volume: '120 leads/mois',
          strategy: 'Ciblage dirigeants PME avec content à forte valeur'
        },
        {
          channel: 'Google Ads',
          budget: '12K€/mois',
          roi: '3.8x',
          volume: '90 leads/mois',
          strategy: 'Mots-clés Intent commercial + extensions avis clients'
        },
        {
          channel: 'Content Marketing',
          budget: '8K€/mois',
          roi: '5.1x',
          volume: '200 leads/mois',
          strategy: 'Études de cas détaillées + SEO technique'
        },
        {
          channel: 'Referral Program',
          budget: '5K€/mois',
          roi: '8.2x',
          volume: '40 leads/mois',
          strategy: 'Commission 15% clients satisfaits + dashboard suivi'
        },
        {
          channel: 'Events & Webinars',
          budget: '6K€/mois',
          roi: '3.5x',
          volume: '60 leads/mois',
          strategy: 'Workshops gratuits + networking ciblé dirigeants'
        }
      ],
      retention_strategy: {
        onboarding: "Kick-off 48h + roadmap 90 jours + KPIs définis",
        engagement: [
          "Reporting mensuel avec benchmarks secteur",
          "Sessions stratégie trimestrielles",
          "Accès exclusif insights marché",
          "Programme formation équipes internes"
        ],
        expansion: [
          "Audit opportunités complémentaires",
          "Upsell services premium basé performance",
          "Cross-sell autres départements",
          "Partenariats long terme"
        ]
      },
      kpis: {
        acquisition: [
          { name: 'CAC', current: '2,800€', target: '2,200€', trend: 'down' },
          { name: 'LTV', current: '15,400€', target: '18,000€', trend: 'up' },
          { name: 'Conversion Rate', current: '3.2%', target: '4.5%', trend: 'up' },
          { name: 'Pipeline Velocity', current: '45 jours', target: '35 jours', trend: 'down' }
        ],
        retention: [
          { name: 'NRR', current: '118%', target: '130%', trend: 'up' },
          { name: 'Churn Rate', current: '8%', target: '5%', trend: 'down' },
          { name: 'NPS Score', current: '67', target: '75', trend: 'up' },
          { name: 'Expansion Revenue %', current: '35%', target: '45%', trend: 'up' }
        ]
      }
    },
    'fintech-startup': {
      company: 'PaySecure AI',
      positioning: {
        value_proposition: "L'IA anti-fraude qui protège votre croissance FinTech",
        target_persona: "CTOs et Risk Managers FinTech en hypercroissance",
        differentiation: [
          "99.94% précision vs 96-98% concurrence",
          "50ms latence vs 200-500ms marché",
          "12 modèles ML spécialisés vs modèle unique",
          "API-first avec intégration 24h"
        ],
        competitive_advantage: "Seule solution combinant vitesse et précision pour scale FinTech"
      },
      communication_strategy: {
        brand_voice: "Technique, innovant, fiable",
        key_messages: [
          "L'IA qui apprend plus vite que les fraudeurs",
          "Scale your FinTech, secure your growth",
          "Real-time protection, real business impact",
          "Built by FinTech, for FinTech"
        ],
        content_pillars: [
          "Technical deep-dives et benchmarks",
          "Fraud trends et threat intelligence",
          "Integration guides et documentation",
          "Customer success stories avec métriques"
        ]
      },
      acquisition_channels: [
        {
          channel: 'FinTech Events',
          budget: '25K€/mois',
          roi: '6.5x',
          volume: '80 leads/mois',
          strategy: 'Sponsoring + speaking + demos live produit'
        },
        {
          channel: 'Developer Marketing',
          budget: '18K€/mois',
          roi: '5.8x',
          volume: '150 leads/mois',
          strategy: 'Open source tools + API documentation + hackathons'
        },
        {
          channel: 'Partnerships',
          budget: '20K€/mois',
          roi: '7.2x',
          volume: '60 leads/mois',
          strategy: 'Intégrations natives + co-marketing + referrals'
        },
        {
          channel: 'LinkedIn Targeted',
          budget: '12K€/mois',
          roi: '4.1x',
          volume: '100 leads/mois',
          strategy: 'Account-based marketing CTOs FinTech scale-ups'
        },
        {
          channel: 'Content SEO',
          budget: '10K€/mois',
          roi: '8.9x',
          volume: '220 leads/mois',
          strategy: 'Technical content + fraud prevention guides'
        }
      ],
      retention_strategy: {
        onboarding: "Technical integration en 24h + training équipe + monitoring setup",
        engagement: [
          "Threat intelligence weekly reports",
          "Performance dashboards temps réel",
          "Quarterly business reviews avec ROI",
          "Accès prioritaire nouvelles features"
        ],
        expansion: [
          "Additional use cases (KYC, credit scoring)",
          "Multi-region deployment",
          "Custom model training",
          "Dedicated support tier"
        ]
      },
      kpis: {
        acquisition: [
          { name: 'CAC', current: '8,500€', target: '6,000€', trend: 'down' },
          { name: 'LTV', current: '125,000€', target: '180,000€', trend: 'up' },
          { name: 'Time to Value', current: '3 days', target: '1 day', trend: 'down' },
          { name: 'Trial to Paid', current: '28%', target: '40%', trend: 'up' }
        ],
        retention: [
          { name: 'NRR', current: '145%', target: '160%', trend: 'up' },
          { name: 'Logo Churn', current: '2%', target: '1%', trend: 'down' },
          { name: 'API Adoption', current: '85%', target: '95%', trend: 'up' },
          { name: 'Support CSAT', current: '4.6/5', target: '4.8/5', trend: 'up' }
        ]
      }
    }
  };

  return strategyMap[scenarioId] || strategyMap['digital-agency'];
};

export const MarketingStrategy: React.FC<MarketingStrategyProps> = ({ scenarioId }) => {
  const strategy = getMarketingStrategy(scenarioId);
  
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