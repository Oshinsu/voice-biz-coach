import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, Megaphone, Users, Zap, DollarSign, 
  TrendingUp, Calendar, CheckCircle, ArrowRight,
  BarChart3, MessageSquare, Globe, Smartphone,
  ShoppingBag, Instagram, Mail, Brain
} from 'lucide-react';

interface ModaStyleMarketingStrategyProps {
  scenarioId: string;
}

export const ModaStyleMarketingStrategy: React.FC<ModaStyleMarketingStrategyProps> = ({ scenarioId }) => {
  // Marketing strategy specifically for ModaStyle e-commerce mode éthique
  const modaStyleStrategy = {
    company: "ModaStyle",
    positioning: {
      value_proposition: "DataTrack Pro - La seule solution d'analytics qui comprend vraiment la mode éthique",
      target_persona: "Directeurs Marketing e-commerce mode (5-50M€ CA)",
      differentiation: [
        "Métriques spécialisées mode : LTV, saisonnalité, collections",
        "Attribution influenceurs/UGC native vs généraliste",
        "Benchmarks secteur mode éthique vs all-market",
        "Support français dédié lifestyle vs offshore",
        "Setup 48h vs 6 semaines concurrence"
      ],
      competitive_advantage: "La seule plateforme qui track l'influence Gen Z et la saisonnalité mode avec attribution prédictive"
    },
    communication_strategy: {
      brand_voice: "Expert mode éthique, data-driven, proche communauté",
      key_messages: [
        "Enfin des analytics qui parlent mode éthique",
        "Récupérez 18% de revenue perdu en attribution",
        "Prédisez le churn de vos clients premium",
        "L'attribution qui comprend votre customer journey mode"
      ],
      content_pillars: [
        "Success stories mode éthique (Grain de Malice, Spartoo)",
        "Insights secteur : saisonnalité, Gen Z, influence",
        "Guides : attribution multi-touch, prédiction churn",
        "Benchmarks e-commerce mode français"
      ]
    },
    acquisition_channels: [
      {
        channel: "LinkedIn Ads B2B Mode",
        budget: "3,500€/mois",
        roi: "4.2x",
        volume: "45 leads/mois",
        strategy: "Ciblage directeurs marketing e-commerce mode 5-50M€ CA",
        cac: "1,890€",
        quality: "Premium"
      },
      {
        channel: "SEO/Content Secteur Mode",
        budget: "2,800€/mois", 
        roi: "6.8x",
        volume: "35 leads/mois",
        strategy: "Content hub analytics mode, guest posts influenceurs",
        cac: "1,240€",
        quality: "Élevée"
      },
      {
        channel: "Events E-commerce Mode",
        budget: "4,200€/mois",
        roi: "3.1x",
        volume: "25 leads/mois",
        strategy: "Sponsoring eFashion Days, Paris Retail Week, webinars",
        cac: "2,680€",
        quality: "Premium"
      },
      {
        channel: "Partenariats Agences",
        budget: "1,500€/mois",
        roi: "5.4x", 
        volume: "18 leads/mois",
        strategy: "Program partenaires agences spécialisées mode/lifestyle",
        cac: "1,350€",
        quality: "Qualifiée"
      },
      {
        channel: "Referral Clients Mode",
        budget: "800€/mois",
        roi: "8.9x",
        volume: "12 leads/mois",
        strategy: "Programme referral clients satisfaits, témoignages",
        cac: "890€",
        quality: "Excellente"
      }
    ],
    retention_strategy: {
      onboarding: "Onboarding ModaStyle : Formation spécialisée mode + import historique 24 mois + setup Shopify Plus 48h",
      engagement: [
        "Account manager français expert mode/lifestyle",
        "Webinars mensuels 'Analytics Mode Insights'",
        "Communauté privée clients e-commerce mode",
        "Rapports sectoriels trimestriels mode éthique"
      ],
      expansion: [
        "Module IA prédictive (churn, LTV, tendances)",
        "Social Commerce tracking (TikTok Shop, Insta)",
        "ESG Analytics (impact environnemental)",
        "Omnicanal (magasins physiques + online)"
      ]
    },
    kpis: {
      acquisition: [
        { name: "CAC ModaStyle", current: "2,200€", target: "1,800€", trend: "down", benchmark: "2,100€ secteur" },
        { name: "LTV Mode Premium", current: "15,800€", target: "18,500€", trend: "up", benchmark: "14,200€ secteur" },
        { name: "Conversion MQL>SQL", current: "24%", target: "32%", trend: "up", benchmark: "18% secteur" },
        { name: "Cycle de vente Mode", current: "38 jours", target: "28 jours", trend: "down", benchmark: "45 jours secteur" }
      ],
      retention: [
        { name: "NRR E-commerce Mode", current: "112%", target: "125%", trend: "up", benchmark: "108% secteur" },
        { name: "Churn Annuel", current: "12%", target: "8%", trend: "down", benchmark: "15% secteur" },
        { name: "NPS Clients Mode", current: "72", target: "80", trend: "up", benchmark: "58 secteur" },
        { name: "Usage Analytics", current: "4.2x/semaine", target: "6x/semaine", trend: "up", benchmark: "2.8x secteur" }
      ]
    },
    competitive_positioning: {
      vs_google_analytics: {
        differentiation: "Attribution multi-touch mode vs last-click généraliste",
        advantage: "Tracking customer journey mode complexe (influence, saisonnalité)",
        pricing: "€599 vs Gratuit - ROI 220% justifié récupération attribution"
      },
      vs_triple_whale: {
        differentiation: "Spécialisation mode vs généraliste e-commerce",
        advantage: "Support français vs offshore + métriques mode natives",
        pricing: "€599 vs €1,199 - 50% moins cher, setup 48h vs 3 semaines"
      },
      vs_northbeam: {
        differentiation: "Market français mode vs US-centric",
        advantage: "Benchmarks mode français vs generic, compliance RGPD native",
        pricing: "€599 vs €1,800 - 66% moins cher, onboarding dédié mode"
      }
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
  };

  const getChannelIcon = (channel: string) => {
    if (channel.includes('LinkedIn')) return <Users className="h-4 w-4" />;
    if (channel.includes('SEO')) return <Globe className="h-4 w-4" />;
    if (channel.includes('Events')) return <Calendar className="h-4 w-4" />;
    if (channel.includes('Partenariats')) return <Zap className="h-4 w-4" />;
    if (channel.includes('Referral')) return <MessageSquare className="h-4 w-4" />;
    return <Target className="h-4 w-4" />;
  };

  const ChannelCard = ({ channel }: any) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getChannelIcon(channel.channel)}
            <h4 className="font-semibold text-sm">{channel.channel}</h4>
          </div>
          <Badge variant="outline" className="text-xs">
            ROI {channel.roi}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-green-600" />
            <span>{channel.budget}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-blue-600" />
            <span>{channel.volume}</span>
          </div>
          <div className="text-orange-600">
            CAC: {channel.cac}
          </div>
          <div className="text-purple-600">
            Qualité: {channel.quality}
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
          <span className="text-muted-foreground">ModaStyle</span>
          <span className="font-bold">{kpi.current}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Objectif</span>
          <span className="font-bold text-green-600">{kpi.target}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Benchmark</span>
          <span className="text-gray-500">{kpi.benchmark}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Stratégie Marketing DataTrack Pro - ModaStyle</h3>
        <p className="text-muted-foreground">Positionnement spécialisé e-commerce mode éthique</p>
      </div>

      <Tabs defaultValue="positioning" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="positioning" className="text-xs">Positionnement</TabsTrigger>
          <TabsTrigger value="communication" className="text-xs">Communication</TabsTrigger>
          <TabsTrigger value="acquisition" className="text-xs">Acquisition</TabsTrigger>
          <TabsTrigger value="retention" className="text-xs">Rétention</TabsTrigger>
          <TabsTrigger value="kpis" className="text-xs">KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="positioning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Positionnement DataTrack Pro pour ModaStyle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Proposition de valeur unique</h4>
                    <p className="text-sm p-3 bg-primary/5 rounded-lg italic">
                      "{modaStyleStrategy.positioning.value_proposition}"
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Persona ModaStyle</h4>
                    <p className="text-sm p-3 bg-secondary/5 rounded-lg">
                      {modaStyleStrategy.positioning.target_persona}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Différenciation vs concurrence</h4>
                    <ul className="space-y-2">
                      {modaStyleStrategy.positioning.differentiation.map((factor: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Competitive positioning */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">vs Google Analytics</h5>
                  <p className="text-xs text-red-700 mb-1">{modaStyleStrategy.competitive_positioning.vs_google_analytics.differentiation}</p>
                  <p className="text-xs text-red-600">{modaStyleStrategy.competitive_positioning.vs_google_analytics.pricing}</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">vs Triple Whale</h5>
                  <p className="text-xs text-blue-700 mb-1">{modaStyleStrategy.competitive_positioning.vs_triple_whale.differentiation}</p>
                  <p className="text-xs text-blue-600">{modaStyleStrategy.competitive_positioning.vs_triple_whale.pricing}</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">vs Northbeam</h5>
                  <p className="text-xs text-green-700 mb-1">{modaStyleStrategy.competitive_positioning.vs_northbeam.differentiation}</p>
                  <p className="text-xs text-green-600">{modaStyleStrategy.competitive_positioning.vs_northbeam.pricing}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Avantage concurrentiel ModaStyle
                </h4>
                <p className="text-sm font-medium text-blue-800">
                  {modaStyleStrategy.positioning.competitive_advantage}
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
                Communication spécialisée mode éthique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tonalité ModaStyle</h4>
                    <Badge variant="outline" className="text-sm">
                      {modaStyleStrategy.communication_strategy.brand_voice}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Messages clés pour mode éthique</h4>
                    <div className="space-y-2">
                      {modaStyleStrategy.communication_strategy.key_messages.map((message: string, index: number) => (
                        <div key={index} className="p-2 bg-muted/50 rounded text-sm">
                          <MessageSquare className="h-3 w-3 inline mr-2" />
                          {message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Piliers de contenu secteur mode</h4>
                  <div className="space-y-3">
                    {modaStyleStrategy.communication_strategy.content_pillars.map((pillar: string, index: number) => (
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
                <ShoppingBag className="h-5 w-5" />
                Mix d'acquisition spécialisé e-commerce mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modaStyleStrategy.acquisition_channels.map((channel: any, index: number) => (
                  <ChannelCard key={index} channel={channel} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Performance mix acquisition ModaStyle</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">12.8K€</p>
                    <p className="text-green-600">Budget mensuel total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">135</p>
                    <p className="text-green-600">Leads qualifiés/mois</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">5.1x</p>
                    <p className="text-green-600">ROI moyen pondéré</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-700">1,580€</p>
                    <p className="text-green-600">CAC moyen blended</p>
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
                Rétention & expansion clients mode éthique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Onboarding ModaStyle
                  </h4>
                  <p className="text-sm p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    {modaStyleStrategy.retention_strategy.onboarding}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Engagement mode</h4>
                  <ul className="space-y-2">
                    {modaStyleStrategy.retention_strategy.engagement.map((item: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <ArrowRight className="h-3 w-3 mt-1 text-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Expansion revenue</h4>
                  <ul className="space-y-2">
                    {modaStyleStrategy.retention_strategy.expansion.map((item: string, index: number) => (
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
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  KPIs Acquisition ModaStyle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modaStyleStrategy.kpis.acquisition.map((kpi: any, index: number) => (
                    <KPICard key={index} kpi={kpi} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  KPIs Rétention ModaStyle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modaStyleStrategy.kpis.retention.map((kpi: any, index: number) => (
                    <KPICard key={index} kpi={kpi} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Benchmark performance vs secteur e-commerce mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <h4 className="font-semibold text-green-800">Performance ModaStyle</h4>
                  <p className="text-sm text-green-700 mt-2">
                    CAC 21% inférieur secteur<br/>
                    LTV 30% supérieur benchmark<br/>
                    Conversion 33% au-dessus moyenne
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <h4 className="font-semibold text-blue-800">Opportunités DataTrack Pro</h4>
                  <p className="text-sm text-blue-700 mt-2">
                    Réduction CAC -15% avec attribution<br/>
                    Augmentation LTV +19% prédiction churn<br/>
                    Cycle vente -38% avec intelligence IA
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <h4 className="font-semibold text-purple-800">ROI projeté an 1</h4>
                  <p className="text-sm text-purple-700 mt-2">
                    Gain attribution: +€87K/mois<br/>
                    Réduction churn: +€55K/mois<br/>
                    <strong>ROI total: 312%</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};