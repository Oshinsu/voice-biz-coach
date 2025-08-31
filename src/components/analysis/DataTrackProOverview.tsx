import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, Activity, TrendingUp, Eye, 
  CheckCircle, Shield, Zap, Target,
  Database, Cpu, Globe, Lock, Users,
  Star, Award, PlayCircle, Calculator,
  HelpCircle, Calendar, ChevronRight,
  Smartphone, Monitor, Tablet, Clock,
  ArrowUp, ArrowDown, Minus, TrendingDown
} from 'lucide-react';
import { Product } from '@/hooks/useScenarios';

interface DataTrackProOverviewProps {
  product: Product;
}

export const DataTrackProOverview: React.FC<DataTrackProOverviewProps> = ({ product }) => {
  // ROI Breakdown calculation for ModaStyle - RÉALISTE
  const getRoiBreakdown = () => {
    const monthlyRevenue = 1500000; // 18M€ annual / 12 (CA réel ModaStyle)
    const monthlyAdSpend = monthlyRevenue * 0.12; // 12% CA en pub = 180k€/mois (réaliste e-commerce)
    
    // Gains RÉALISTES avec DataTrack Pro :
    const betterAttribution = monthlyAdSpend * 0.08; // 8% budget mieux attribué = 14.4k€/mois
    const reducedWaste = monthlyAdSpend * 0.05; // 5% moins de gaspillage pub = 9k€/mois  
    const churnPrevention = monthlyRevenue * 0.015; // 1.5% churn évité = 22.5k€/mois
    const timesSaved = 2 * 8 * 4 * 50; // 2 jours/semaine * 8h * 4 semaines * 50€/h = 3.2k€/mois
    
    const monthlyGain = betterAttribution + reducedWaste + churnPrevention + timesSaved;
    const annualGain = monthlyGain * 12;
    const toolCost = 599 * 12 + 899; // Coût annuel + setup = 8,087€
    const netGain = annualGain - toolCost;
    const roi = ((netGain / toolCost) * 100);
    
    return {
      monthlyGain: Math.round(monthlyGain),
      annualGain: Math.round(annualGain),
      toolCost,
      netGain: Math.round(netGain),
      roi: Math.round(roi),
      details: {
        betterAttribution: Math.round(betterAttribution),
        reducedWaste: Math.round(reducedWaste),
        churnPrevention: Math.round(churnPrevention),
        timesSaved: Math.round(timesSaved)
      }
    };
  };

  const roiData = getRoiBreakdown();

  // Real DataTrack Pro specifications for ModaStyle
  const getDataTrackSpecs = () => ({
    type: 'Marketing Analytics Platform',
    targetSegment: 'E-commerce Mode & Lifestyle',
    estimatedROI: `${roiData.roi}%`,
    paybackPeriod: '8,2 mois',
    monthlyValue: '€4,800',
    features: [
      'Attribution multi-touch 360° (first-click, last-click, data-driven, custom)',
      'Prédiction churn IA avec scoring risque et triggers automatiques',
      'Dashboard temps réel conversion avec alertes personnalisables',
      'Segmentation comportementale IA basée 200+ signaux utilisateur',
      'Analytics cross-canal unifié Facebook/Google/TikTok/Email/TV',
      'Modélisation Marketing Mix pour optimisation budget cross-média',
      'Cohort analysis et LTV prédictive par segment client',
      'A/B testing attribution pour validation performance modèles'
    ],
    technicalSpecs: [
      { key: 'Intégrations natives', value: 'Shopify Plus, Facebook Ads, Google Ads, TikTok Ads, Klaviyo, Pinterest' },
      { key: 'API & Webhooks', value: 'REST API v2.0, GraphQL, Webhooks temps réel, SDK JavaScript' },
      { key: 'Sécurité & Conformité', value: 'RGPD, SOC2 Type II, ISO 27001, chiffrement AES-256, audit annuel' },
      { key: 'Performance & SLA', value: 'SLA 99.9%, latence <150ms, backup 6x/jour, CDN multi-région' },
      { key: 'Architecture', value: 'Cloud AWS multi-AZ, auto-scaling, monitoring 24/7, logs détaillés' },
      { key: 'Analytics Engine', value: 'IA propriétaire, ML attribution, modèles prédictifs, calcul temps réel' }
    ],
    competitiveAdvantages: [
      'Spécialisé e-commerce mode vs généralistes',
      'Attribution multi-touch vs last-click',
      'IA prédictive native vs modules externes',
      'Support français dédié mode & lifestyle'
    ]
  });

  const specs = getDataTrackSpecs();

  const [selectedDemo, setSelectedDemo] = useState('overview');

  // Customer testimonials
  const testimonials = [
    {
      company: "Bella Mode Paris",
      author: "Marie Dubois, CMO",
      text: "DataTrack Pro nous a fait économiser 15h/semaine en reporting et augmenté notre ROAS de 180% à 220%.",
      metrics: "+22% ROAS, -75% temps reporting"
    },
    {
      company: "Urban Style",
      author: "Thomas Laurent, CEO",
      text: "L'attribution multi-touch nous a révélé que TikTok générait 40% plus de conversions qu'on pensait.",
      metrics: "+40% attribution TikTok découverte"
    },
    {
      company: "Eco Fashion Hub",
      author: "Sophie Martin, Dir. Marketing",
      text: "Grâce à la prédiction churn, on a réduit l'attrition de 12% à 7% en ciblant les clients à risque.",
      metrics: "-42% churn, +€180k CA récupéré"
    }
  ];

  // Use cases
  const useCases = [
    {
      title: "Lancement Collection Printemps",
      description: "Optimisation budget 80k€ sur Google/Facebook/TikTok avec attribution temps réel",
      metrics: ["ROI: +35%", "CPA: -22%", "Reach: +150k"],
      icon: TrendingUp
    },
    {
      title: "Black Friday Campaign",
      description: "Prédiction churn + segmentation IA pour cibler 25k clients à haut potentiel",
      metrics: ["Conversion: +67%", "AOV: +45€", "Retention: +28%"],
      icon: Target
    },
    {
      title: "Influence Marketing ROI",
      description: "Tracking précis impact influenceurs vs canaux payants sur 3 mois",
      metrics: ["Attribution: +40%", "Cost/Acq: -15%", "LTV: +22%"],
      icon: Users
    }
  ];

  // Competitive comparison
  const competitorComparison = [
    { feature: "Attribution Multi-touch", datatrack: true, northbeam: true, triplewale: false },
    { feature: "IA Prédiction Churn", datatrack: true, northbeam: false, triplewale: false },
    { feature: "Mode Spécialisé", datatrack: true, northbeam: false, triplewale: false },
    { feature: "Support Français", datatrack: true, northbeam: false, triplewale: false },
    { feature: "Setup < 48h", datatrack: true, northbeam: false, triplewale: true },
    { feature: "Prix < €600/mois", datatrack: true, northbeam: false, triplewale: true }
  ];

  // ROI Calculator states
  const [monthlyRevenue, setMonthlyRevenue] = useState(1500000);
  const [currentROAS, setCurrentROAS] = useState(180);
  
  const calculateROI = () => {
    const monthlyAdSpend = monthlyRevenue * 0.12; // 12% CA en pub
    const betterAttribution = monthlyAdSpend * 0.08; // 8% budget mieux attribué
    const reducedWaste = monthlyAdSpend * 0.05; // 5% moins de gaspillage
    const churnPrevention = monthlyRevenue * 0.015; // 1.5% churn évité
    const timesSaved = 2 * 8 * 4 * 50; // temps économisé
    const monthlyGain = betterAttribution + reducedWaste + churnPrevention + timesSaved;
    const annualGain = monthlyGain * 12;
    const toolCost = 599 * 12 + 899; // coût + setup
    const roi = ((annualGain - toolCost) / toolCost * 100);
    return { monthlyGain, annualGain, toolCost, roi };
  };

  const calculatedROI = calculateROI();

  // Porter's 5 Forces for DataTrack Pro
  const porterForces = {
    threat_new_entrants: {
      level: "Moyen",
      score: 3,
      factors: [
        "Barrières techniques élevées (IA, ML)",
        "Investissement R&D important",
        "Intégrations API complexes",
        "Marché en croissance attire nouveaux entrants"
      ]
    },
    bargaining_power_suppliers: {
      level: "Faible", 
      score: 2,
      factors: [
        "Fournisseurs cloud (AWS, GCP) standardisés",
        "APIs publiques (Google, Facebook) disponibles",
        "Talents tech disponibles",
        "Peu de dépendance fournisseurs uniques"
      ]
    },
    bargaining_power_buyers: {
      level: "Élevé",
      score: 4,
      factors: [
        "Clients e-commerce exigeants sur ROI",
        "Alternatives nombreuses (Northbeam, Triple Whale)",
        "Switching costs modérés",
        "Négociation prix selon volume"
      ]
    },
    threat_substitutes: {
      level: "Élevé",
      score: 4,
      factors: [
        "Google Analytics 4 gratuit",
        "Solutions intégrées Shopify Plus",
        "Outils généralistes (Mixpanel, Amplitude)",
        "Développement interne équipes tech"
      ]
    },
    competitive_rivalry: {
      level: "Très Élevé",
      score: 5,
      factors: [
        "Northbeam (leader), Triple Whale agressifs",
        "Innovation rapide (IA, attribution)",
        "Guerre des prix",
        "Différenciation technique difficile"
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Plateforme</p>
            <p className="text-lg font-bold">{specs.type}</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-secondary/5 border-secondary/20">
          <CardContent className="p-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <p className="text-sm text-muted-foreground">Segment</p>
            <p className="text-lg font-bold">{specs.targetSegment}</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-accent/5 border-accent/20">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
            <p className="text-sm text-muted-foreground">ROI ModaStyle</p>
            <p className="text-lg font-bold text-green-600">{specs.estimatedROI}</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <CardContent className="p-4">
            <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-muted-foreground">Retour investissement</p>
            <p className="text-lg font-bold text-green-600">{specs.paybackPeriod}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="demo">Démo</TabsTrigger>
          <TabsTrigger value="usecases">Cas d'usage</TabsTrigger>
          <TabsTrigger value="technical">Technique</TabsTrigger>
          <TabsTrigger value="pricing">Tarifs</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
          <TabsTrigger value="porter">Porter</TabsTrigger>
          <TabsTrigger value="compare">Comparaison</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* ROI Projection */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Projection ROI ModaStyle (18M€ CA annuel)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="font-medium text-green-700 mb-2">Gains mensuels détaillés:</p>
                  <ul className="space-y-1 text-sm text-green-600">
                    <li className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      Meilleure attribution: +€{roiData.details.betterAttribution.toLocaleString()}
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      Moins gaspillage pub: +€{roiData.details.reducedWaste.toLocaleString()}
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      Churn évité: +€{roiData.details.churnPrevention.toLocaleString()}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Temps économisé: +€{roiData.details.timesSaved.toLocaleString()}
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-700 mb-2">Bilan financier annuel:</p>
                  <ul className="space-y-1 text-sm text-blue-600">
                    <li>Gains bruts: €{roiData.annualGain.toLocaleString()}</li>
                    <li>Coût total: €{roiData.toolCost.toLocaleString()}</li>
                    <li>Gain net: €{roiData.netGain.toLocaleString()}</li>
                    <li><strong className="text-lg">ROI: {roiData.roi}%</strong></li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <p className="text-2xl font-bold text-green-600">8,2 mois</p>
                    <p className="text-sm text-muted-foreground">Retour sur investissement</p>
                    <p className="text-xs text-muted-foreground mt-1">Gain mensuel: €{roiData.monthlyGain.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Fonctionnalités IA Avancées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {specs.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Intégrations & Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {specs.features.slice(4, 8).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5" />
                Démonstration Interactive DataTrack Pro
              </CardTitle>
              <CardDescription>
                Explorez les fonctionnalités clés avec des données ModaStyle simulées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button 
                  variant={selectedDemo === 'overview' ? 'default' : 'outline'}
                  onClick={() => setSelectedDemo('overview')}
                  className="justify-start"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Dashboard Principal
                </Button>
                <Button 
                  variant={selectedDemo === 'attribution' ? 'default' : 'outline'}
                  onClick={() => setSelectedDemo('attribution')}
                  className="justify-start"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Attribution Multi-touch
                </Button>
                <Button 
                  variant={selectedDemo === 'churn' ? 'default' : 'outline'}
                  onClick={() => setSelectedDemo('churn')}
                  className="justify-start"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Prédiction Churn
                </Button>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg border-2 border-dashed">
                {selectedDemo === 'overview' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Dashboard ModaStyle - Vue Temps Réel</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded border text-center">
                        <p className="text-2xl font-bold text-green-600">€47,250</p>
                        <p className="text-xs text-muted-foreground">CA aujourd'hui</p>
                      </div>
                      <div className="bg-white p-3 rounded border text-center">
                        <p className="text-2xl font-bold text-blue-600">285%</p>
                        <p className="text-xs text-muted-foreground">ROAS Google</p>
                      </div>
                      <div className="bg-white p-3 rounded border text-center">
                        <p className="text-2xl font-bold text-purple-600">180%</p>
                        <p className="text-xs text-muted-foreground">ROAS Facebook</p>
                      </div>
                      <div className="bg-white p-3 rounded border text-center">
                        <p className="text-2xl font-bold text-orange-600">245%</p>
                        <p className="text-xs text-muted-foreground">ROAS TikTok</p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedDemo === 'attribution' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Attribution Multi-touch - Dernière Commande €250</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">Google Search "robe été"</span>
                        <Badge variant="secondary">First Touch - 35%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">Instagram Influence @modestyle</span>
                        <Badge variant="secondary">Mid Touch - 25%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <span className="text-sm">Facebook Retargeting</span>
                        <Badge variant="secondary">Last Touch - 40%</Badge>
                      </div>
                    </div>
                  </div>
                )}
                {selectedDemo === 'churn' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Prédiction Churn - Clients à Risque</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Marie L. - Dernière commande -45j</span>
                        <Badge variant="destructive">Risque: 89%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <span className="text-sm">Thomas D. - Engagement -60%</span>
                        <Badge variant="secondary">Risque: 67%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Sophie M. - Panier abandonné</span>
                        <Badge variant="outline">Risque: 45%</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Use Cases Tab */}
        <TabsContent value="usecases" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <useCase.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                  <div className="space-y-2">
                    {useCase.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Technical Tab */}
        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Architecture & Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {specs.technicalSpecs.map((spec, index) => (
                    <div key={index} className="border-b border-muted last:border-0 pb-2 last:pb-0">
                      <p className="font-medium text-sm">{spec.key}</p>
                      <p className="text-sm text-muted-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  FAQ Technique ModaStyle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Setup Shopify Plus ?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Integration native en 48h, webhooks automatiques, backup quotidien
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Formation équipe ?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 jours sur site, certification, support 30j post-formation
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Migration données ?
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Historique 24 mois importé automatiquement, validation qualité
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Starter</CardTitle>
                <div className="text-center">
                  <p className="text-3xl font-bold">€199</p>
                  <p className="text-sm text-muted-foreground">par mois</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Analytics de base
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    3 intégrations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Support email
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Rapports mensuels
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Essai gratuit 14j
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
                Recommandé ModaStyle
              </Badge>
              <CardHeader>
                <CardTitle className="text-center">Professional</CardTitle>
                <div className="text-center">
                  <p className="text-3xl font-bold">€599</p>
                  <p className="text-sm text-muted-foreground">par mois</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Attribution multi-touch
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Prédiction churn IA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Intégrations illimitées
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Support prioritaire
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Dashboards temps réel
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  Démarrer maintenant
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Enterprise</CardTitle>
                <div className="text-center">
                  <p className="text-3xl font-bold">Sur mesure</p>
                  <p className="text-sm text-muted-foreground">à partir de €1,200</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Solution personnalisée
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Onboarding dédié
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    SLA garantis 99.9%
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Support 24/7
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ROI Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculateur ROI Personnalisé
              </CardTitle>
              <CardDescription>
                Calculez votre retour sur investissement selon vos métriques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">CA Mensuel (€)</label>
                    <input 
                      type="number" 
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">ROAS Actuel (%)</label>
                    <input 
                      type="number" 
                      value={currentROAS}
                      onChange={(e) => setCurrentROAS(Number(e.target.value))}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Votre ROI DataTrack Pro:</h4>
                  <div className="space-y-1 text-sm">
                    <p>Gain mensuel estimé: <strong>€{Math.round(calculatedROI.monthlyGain).toLocaleString()}</strong></p>
                    <p>Gain annuel: <strong>€{Math.round(calculatedROI.annualGain).toLocaleString()}</strong></p>
                    <p>Coût annuel: €{Math.round(calculatedROI.toolCost).toLocaleString()}</p>
                    <p className="text-lg font-bold text-green-600">ROI: {Math.round(calculatedROI.roi)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Porter's 5 Forces Tab */}
        <TabsContent value="porter" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Analyse Porter - Marché Analytics E-commerce
              </CardTitle>
              <CardDescription>
                Analyse des 5 forces concurrentielles pour DataTrack Pro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Threat of New Entrants */}
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-orange-800">Menace Nouveaux Entrants</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < porterForces.threat_new_entrants.score ? 'bg-orange-500' : 'bg-orange-200'}`} />
                        ))}
                      </div>
                      <Badge variant="secondary">{porterForces.threat_new_entrants.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="text-xs space-y-1 text-orange-700">
                      {porterForces.threat_new_entrants.factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Supplier Power */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-800">Pouvoir Fournisseurs</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < porterForces.bargaining_power_suppliers.score ? 'bg-green-500' : 'bg-green-200'}`} />
                        ))}
                      </div>
                      <Badge variant="secondary">{porterForces.bargaining_power_suppliers.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="text-xs space-y-1 text-green-700">
                      {porterForces.bargaining_power_suppliers.factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Buyer Power */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-800">Pouvoir Clients</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < porterForces.bargaining_power_buyers.score ? 'bg-blue-500' : 'bg-blue-200'}`} />
                        ))}
                      </div>
                      <Badge variant="secondary">{porterForces.bargaining_power_buyers.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="text-xs space-y-1 text-blue-700">
                      {porterForces.bargaining_power_buyers.factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Threat of Substitutes */}
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-800">Menace Substituts</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < porterForces.threat_substitutes.score ? 'bg-purple-500' : 'bg-purple-200'}`} />
                        ))}
                      </div>
                      <Badge variant="secondary">{porterForces.threat_substitutes.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="text-xs space-y-1 text-purple-700">
                      {porterForces.threat_substitutes.factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Competitive Rivalry */}
                <Card className="border-red-200 bg-red-50 md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-red-800">Intensité Concurrentielle</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < porterForces.competitive_rivalry.score ? 'bg-red-500' : 'bg-red-200'}`} />
                        ))}
                      </div>
                      <Badge variant="destructive">{porterForces.competitive_rivalry.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="text-xs space-y-1 text-red-700">
                      {porterForces.competitive_rivalry.factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

              </div>

              {/* Strategic Implications */}
              <Card className="mt-6 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-base">Implications Stratégiques DataTrack Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-green-700 mb-2">Opportunités :</p>
                      <ul className="space-y-1 text-green-600">
                        <li>• Spécialisation mode vs généralistes</li>
                        <li>• Innovation IA prédictive</li>
                        <li>• Support français premium</li>
                        <li>• Intégrations natives Shopify Plus</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-700 mb-2">Menaces :</p>
                      <ul className="space-y-1 text-red-600">
                        <li>• Guerre des prix avec leaders</li>
                        <li>• GA4 gratuit comme substitut</li>
                        <li>• Clients exigeants sur ROI</li>
                        <li>• Innovation rapide nécessaire</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge variant="secondary">{testimonial.metrics}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-sm">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Implémentation ModaStyle - Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium">Setup Initial (48h)</p>
                    <p className="text-sm text-muted-foreground">Connexion Shopify Plus, import historique, configuration dashboards</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium">Formation Équipe (J+14)</p>
                    <p className="text-sm text-muted-foreground">Formation 2 jours sur site, certification Jules & Amélie</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium">Optimisation (J+30)</p>
                    <p className="text-sm text-muted-foreground">Fine-tuning attribution, calibrage IA churn, premiers rapports</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <div>
                    <p className="font-medium">ROI Complet (J+60)</p>
                    <p className="text-sm text-muted-foreground">Attribution précise, prédiction churn active, retour investissement visible</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="compare" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Comparaison Concurrentielle
              </CardTitle>
              <CardDescription>
                DataTrack Pro vs Northbeam vs Triple Whale pour ModaStyle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Fonctionnalité</th>
                      <th className="text-center p-2">DataTrack Pro</th>
                      <th className="text-center p-2">Northbeam</th>
                      <th className="text-center p-2">Triple Whale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{row.feature}</td>
                        <td className="text-center p-2">
                          {row.datatrack ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-2">
                          {row.northbeam ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-2">
                          {row.triplewale ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Competitive Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Avantages DataTrack Pro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  {specs.competitiveAdvantages.map((advantage, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Spécificités E-commerce Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Métriques mode: LTV, saisonnalité, collections
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Intégration native influenceurs/UGC
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Analytics cross-génération (Gen Z, Millennials)
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Benchmark secteur mode éthique
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};