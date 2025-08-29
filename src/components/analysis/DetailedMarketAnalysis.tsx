import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, Building2, Users, DollarSign, Target, 
  Globe, Zap, Award, AlertTriangle, CheckCircle, ShoppingCart, Calendar
} from 'lucide-react';

interface DetailedMarketAnalysisProps {
  scenarioId: string;
}

const getMarketData = (scenarioId: string) => {
  const marketDataMap: Record<string, any> = {
    'kpi-performance': {
      sector: 'E-commerce Mode Éthique',
      totalMarketSize: '€2.8Md',
      growth: '+12%',
      playerCount: '8,500+',
      averageSize: '45 employés',
      segmentation: [
        { name: 'Mode Éthique', value: 22, revenue: '€616M' },
        { name: 'E-commerce Mode', value: 58, revenue: '€1.62Md' },
        { name: 'Retail Mode', value: 20, revenue: '€560M' }
      ],
      growthTrends: [
        { year: '2022', market: 2100, digital: 1800 },
        { year: '2023', market: 2400, digital: 2100 },
        { year: '2024', market: 2800, digital: 2500 },
        { year: '2025', market: 3200, digital: 2900 },
        { year: '2026', market: 3600, digital: 3400 }
      ],
      painPoints: [
        { 
          issue: 'Attribution multi-touch complexe', 
          impact: 85, 
          cost: '€22k/an',
          description: 'Overlap 45% entre Facebook/Google Ads impossible à résoudre. Budget 80k€/mois mal réparti. Décisions d\'optimisation biaisées par attribution last-click.'
        },
        { 
          issue: 'Gaspillage budget publicitaire', 
          impact: 80, 
          cost: '€18k/an',
          description: 'Cannibalisation non détectée entre canaux. 12-15% budget gaspillé en doublon attribution. ROAS surévalué de 25% vs réalité.'
        },
        { 
          issue: 'Données silos Facebook/Google', 
          impact: 75, 
          cost: '€15k/an',
          description: 'Reporting manuel 16h/semaine Sophie. Tableaux Excel fragmentés. Impossibilité vision 360° customer journey cross-canal.'
        },
        { 
          issue: 'ROI imprécis campagnes', 
          impact: 70, 
          cost: '€12k/an',
          description: 'Campagnes TV 15k€/mois et influenceurs 8k€/mois sans tracking. ROI offline inconnu. Arbitrages budgétaires à l\'aveugle.'
        },
        { 
          issue: 'Saisonnalité imprévisible', 
          impact: 65, 
          cost: '€25k/an',
          description: 'Prévisions mode basées sur historique GA4 incomplet. Ruptures stock collections populaires. Surstock invendus 18% vs 12% objectif.'
        }
      ],
      tools: [
        { category: 'Google Analytics', adoption: 92, satisfaction: 68 },
        { category: 'Facebook Analytics', adoption: 88, satisfaction: 62 },
        { category: 'Shopify Analytics', adoption: 85, satisfaction: 71 },
        { category: 'Solutions Attribution', adoption: 18, satisfaction: 52 },
        { category: 'DataTrack Pro', adoption: 3, satisfaction: 89 }
      ],
      financialMetrics: [
        { metric: 'ROI Marketing', value: '312%', target: '400%', gap: -88 },
        { metric: 'ROAS Moyen', value: '3.2', target: '4.5', gap: -1.3 },
        { metric: 'CAC', value: '€47', target: '€35', gap: 12 },
        { metric: 'Panier Moyen', value: '€52', target: '€60', gap: -8 },
        { metric: 'Conversion Mobile', value: '1.9%', target: '2.8%', gap: -0.9 },
        { metric: 'Gaspillage Budget', value: '30%', target: '15%', gap: 15 }
      ]
    },
    'fintech-startup': {
      sector: 'Fintech - Crédit PME',
      totalMarketSize: '€15.2Md',
      growth: '+22%',
      playerCount: '2,500+',
      averageSize: '25 employés',
      segmentation: [
        { name: 'Crédit PME', value: 42, revenue: '€6.4Md' },
        { name: 'Néobanques B2B', value: 35, revenue: '€5.3Md' },
        { name: 'Solutions Scoring', value: 23, revenue: '€3.5Md' }
      ],
      growthTrends: [
        { year: '2022', market: 9500, digital: 8200 },
        { year: '2023', market: 11800, digital: 10600 },
        { year: '2024', market: 15200, digital: 14200 },
        { year: '2025', market: 19100, digital: 18400 },
        { year: '2026', market: 24500, digital: 23800 }
      ],
      painPoints: [
        { 
          issue: 'Évaluation crédit manuelle chronophage', 
          impact: 85, 
          cost: '€120k/an',
          description: 'Processus d\'analyse 100% manuel prenant 3-5 jours par dossier. Risk managers surchargés : 50 dossiers/mois vs 200+ possibles avec IA.'
        },
        { 
          issue: 'Taux défaut supérieur objectifs réglementaires', 
          impact: 80, 
          cost: '€180k/an',
          description: 'Taux actuel 4.2% vs seuil ACPR 3.5%. Risque sanctions Banque de France et hausse provisions obligatoires de 15%.'
        },
        { 
          issue: 'Capacité analyse limitée vs demande', 
          impact: 75, 
          cost: '€95k/an',
          description: 'Plafond 200 dossiers/mois limite croissance. 40% demandes rejetées par manque capacité, non par risque réel.'
        },
        { 
          issue: 'Concurrence néobanques automatisées', 
          impact: 70, 
          cost: '€85k/an',
          description: 'Délai 5 jours vs 24h concurrents. 25% perte prospects impatients. Qonto/Shine captent 35% parts marché PME.'
        },
        { 
          issue: 'Validation réglementaire complexe', 
          impact: 65, 
          cost: '€65k/an',
          description: 'Modèles scoring doivent être validés ACPR. Reporting trimestriel obligatoire + audit annuel compliance coûteux.'
        }
      ],
      tools: [
        { category: 'Credit Scoring Manuel', adoption: 85, satisfaction: 60 },
        { category: 'Solutions IA Basiques', adoption: 35, satisfaction: 55 },
        { category: 'APIs Banque de France', adoption: 95, satisfaction: 70 },
        { category: 'Platforms Analytics', adoption: 45, satisfaction: 65 },
        { category: 'CreditAI Engine', adoption: 8, satisfaction: 90 }
      ],
      financialMetrics: [
        { metric: 'Taux de Défaut', value: '3.2%', target: '2%', gap: 1.2 },
        { metric: 'Temps Analyse', value: '4h', target: '30min', gap: -90 },
        { metric: 'Capacité Hebdo', value: '50', target: '100', gap: -50 },
        { metric: 'Ticket Moyen', value: '45k€', target: '50k€', gap: -5 },
        { metric: 'Coût par Analyse', value: '€180', target: '€45', gap: 135 },
        { metric: 'ROI Investment', value: '12%', target: '35%', gap: -23 }
      ]
    },
    'byss-vns-school': {
      sector: 'EdTech - Enseignement Supérieur',
      totalMarketSize: '€15.2Md',
      growth: '+18.5%',
      playerCount: '3,400+',
      averageSize: '250 étudiants',
      segmentation: [
        { name: 'Business Schools', value: 28, revenue: '€4.3Md' },
        { name: 'Universités', value: 45, revenue: '€6.8Md' },
        { name: 'Formations Professionnelles', value: 27, revenue: '€4.1Md' }
      ],
      growthTrends: [
        { year: '2022', market: 11500, digital: 8200 },
        { year: '2023', market: 13200, digital: 10100 },
        { year: '2024', market: 15200, digital: 12800 },
        { year: '2025', market: 18000, digital: 16200 },
        { year: '2026', market: 21500, digital: 20100 }
      ],
      painPoints: [
        { issue: 'Enseignement pratique commercial', impact: 92, cost: '€85k/an' },
        { issue: 'Évaluation soft skills', impact: 88, cost: '€65k/an' },
        { issue: 'Engagement étudiants', impact: 75, cost: '€45k/an' },
        { issue: 'ROI formation mesurable', impact: 82, cost: '€55k/an' },
        { issue: 'Scaling formations qualitatives', impact: 89, cost: '€95k/an' }
      ],
      tools: [
        { category: 'LMS', adoption: 95, satisfaction: 68 },
        { category: 'Simulations Business', adoption: 45, satisfaction: 55 },
        { category: 'Analytics Pédagogiques', adoption: 35, satisfaction: 60 },
        { category: 'IA Conversationnelle', adoption: 15, satisfaction: 85 },
        { category: 'Assessment Tools', adoption: 78, satisfaction: 52 }
      ],
      financialMetrics: [
        { metric: 'Satisfaction étudiants', value: '73%', target: '90%', gap: -17 },
        { metric: 'Employabilité 6 mois', value: '84%', target: '95%', gap: -11 },
        { metric: 'ROI innovation péda', value: '12%', target: '25%', gap: -13 },
        { metric: 'Engagement cours', value: '68%', target: '85%', gap: -17 }
      ]
    },
    'digital-agency': {
      sector: 'Agences Digitales',
      totalMarketSize: '€4.2Md',
      growth: '+12.3%',
      playerCount: '25,000+',
      averageSize: '15 employés',
      segmentation: [
        { name: 'Agences Réseau', value: 35, revenue: '€1.47Md' },
        { name: 'Agences Indépendantes', value: 45, revenue: '€1.89Md' },
        { name: 'Freelances Collectifs', value: 20, revenue: '€0.84Md' }
      ],
      growthTrends: [
        { year: '2022', market: 3200, digital: 2800 },
        { year: '2023', market: 3600, digital: 3300 },
        { year: '2024', market: 4200, digital: 3900 },
        { year: '2025', market: 4800, digital: 4600 },
        { year: '2026', market: 5500, digital: 5400 }
      ],
      painPoints: [
        { issue: 'Gestion temps projet', impact: 85, cost: '€15k/an' },
        { issue: 'Facturation retardée', impact: 78, cost: '€12k/an' },
        { issue: 'Communication client', impact: 72, cost: '€8k/an' },
        { issue: 'Reporting ROI', impact: 68, cost: '€10k/an' },
        { issue: 'Collaboration équipe', impact: 65, cost: '€7k/an' }
      ],
      tools: [
        { category: 'Gestion projet', adoption: 75, satisfaction: 65 },
        { category: 'CRM', adoption: 68, satisfaction: 70 },
        { category: 'Facturation', adoption: 85, satisfaction: 60 },
        { category: 'Analytics', adoption: 45, satisfaction: 55 },
        { category: 'Collaboration', adoption: 90, satisfaction: 75 }
      ],
      financialMetrics: [
        { metric: 'Marge moyenne', value: '22%', target: '30%', gap: -8 },
        { metric: 'Taux utilisation', value: '68%', target: '80%', gap: -12 },
        { metric: 'Délai paiement', value: '45j', target: '30j', gap: 15 },
        { metric: 'Coût acquisition', value: '€2,800', target: '€2,000', gap: 800 }
      ]
    },
    'cybersecurity-consulting': {
      sector: 'Cybersécurité',
      totalMarketSize: '€12.8Md',
      growth: '+22.1%',
      playerCount: '4,200+',
      averageSize: '85 employés',
      segmentation: [
        { name: 'Consulting', value: 42, revenue: '€5.4Md' },
        { name: 'Solutions techniques', value: 35, revenue: '€4.5Md' },
        { name: 'Formation & Audit', value: 23, revenue: '€2.9Md' }
      ],
      growthTrends: [
        { year: '2022', market: 8500, digital: 7200 },
        { year: '2023', market: 10200, digital: 9100 },
        { year: '2024', market: 12800, digital: 11800 },
        { year: '2025', market: 15600, digital: 14900 },
        { year: '2026', market: 19100, digital: 18400 }
      ],
      painPoints: [
        { issue: 'Pénurie experts cybersécurité', impact: 95, cost: '€150k/an' },
        { issue: 'Évolution menaces constante', impact: 88, cost: '€85k/an' },
        { issue: 'Conformité réglementaire', impact: 82, cost: '€120k/an' },
        { issue: 'Formation équipes', impact: 75, cost: '€65k/an' },
        { issue: 'ROI sécurité difficile', impact: 70, cost: '€45k/an' }
      ],
      tools: [
        { category: 'SIEM/SOC', adoption: 85, satisfaction: 72 },
        { category: 'Pentest Tools', adoption: 78, satisfaction: 80 },
        { category: 'Compliance', adoption: 92, satisfaction: 65 },
        { category: 'Formation', adoption: 45, satisfaction: 58 },
        { category: 'Risk Assessment', adoption: 68, satisfaction: 70 }
      ],
      financialMetrics: [
        { metric: 'Taux utilisation experts', value: '92%', target: '85%', gap: 7 },
        { metric: 'Marge consulting', value: '35%', target: '40%', gap: -5 },
        { metric: 'Délai intervention', value: '24h', target: '12h', gap: 12 },
        { metric: 'Satisfaction client', value: '88%', target: '95%', gap: -7 }
      ]
    },
    'retail-personalization': {
      sector: 'Retail Mode & Accessoires',
      totalMarketSize: '€12.1Md',
      growth: '+11%',
      playerCount: '15,000+',
      averageSize: '150 employés',
      segmentation: [
        { name: 'E-commerce Mode', value: 38, revenue: '€4.6Md' },
        { name: 'Retail Physique+Digital', value: 45, revenue: '€5.4Md' },
        { name: 'Pure Players', value: 17, revenue: '€2.1Md' }
      ],
      growthTrends: [
        { year: '2022', market: 9200, digital: 3100 },
        { year: '2023', market: 10500, digital: 3800 },
        { year: '2024', market: 12100, digital: 4600 },
        { year: '2025', market: 13800, digital: 5700 },
        { year: '2026', market: 15900, digital: 7200 }
      ],
      painPoints: [
        { 
          issue: 'Conversion e-commerce faible vs marché', 
          impact: 92, 
          cost: '€180k/an',
          description: 'Taux conversion 1.2% vs 2.8% marché. Perte 65% revenus potentiels quotidiens. Personnalisation rudimentaire (âge/géo) vs IA comportementale pure-players.'
        },
        { 
          issue: 'Expérience omnicanal déconnectée', 
          impact: 85, 
          cost: '€120k/an',
          description: 'Rupture parcours client magasin/online. 67% clients multi-device, expérience fragmentée. Données clients non unifiées CRM/e-commerce.'
        },
        { 
          issue: 'Stocks invendus au-dessus objectif', 
          impact: 78, 
          cost: '€350k/an',
          description: 'Invendus 18% vs 12% objectif. Manque prédictive analytics. Fast-fashion 6 semaines = gestion stock complexe.'
        },
        { 
          issue: 'Concurrence IA pure-players', 
          impact: 88, 
          cost: '€200k/an',
          description: 'Zalando, Asos, Amazon : recommandations IA avancées. StyleChain : recommandations basiques Shopify. Perte parts marché Gen Z (73% expect personnalisation).'
        },
        { 
          issue: 'ROI digital transformation incertain', 
          impact: 70, 
          cost: '€85k/an',
          description: 'Budget 80-150k€ sans KPIs clairs. Difficulté mesure ROI omnicanal. Adoption équipes magasins (42 ans moyenne) résistante au changement.'
        }
      ],
      tools: [
        { category: 'E-commerce Platform (Shopify Plus)', adoption: 100, satisfaction: 75 },
        { category: 'Email Marketing (Klaviyo)', adoption: 85, satisfaction: 68 },
        { category: 'CRM (Salesforce)', adoption: 90, satisfaction: 72 },
        { category: 'Analytics Web', adoption: 70, satisfaction: 60 },
        { category: 'Personnalisation IA', adoption: 15, satisfaction: 45 }
      ],
      financialMetrics: [
        { metric: 'Conversion E-commerce', value: '1.2%', target: '2.8%', gap: -1.6 },
        { metric: 'Panier Moyen', value: '€67', target: '€95', gap: -28 },
        { metric: 'Taux Invendus', value: '18%', target: '12%', gap: 6 },
        { metric: 'ROI Marketing Digital', value: '2.3x', target: '4.5x', gap: -2.2 },
        { metric: 'Customer Lifetime Value', value: '€245', target: '€380', gap: -135 },
        { metric: 'Taux Rétention', value: '32%', target: '45%', gap: -13 }
      ]
    },
    'manufacturing-iot': {
      sector: 'IoT Industriel',
      totalMarketSize: '€45.6Md',
      growth: '+16.8%',
      playerCount: '12,000+',
      averageSize: '320 employés',
      segmentation: [
        { name: 'Automotive', value: 38, revenue: '€17.3Md' },
        { name: 'Process Manufacturing', value: 34, revenue: '€15.5Md' },
        { name: 'Énergie & Utilities', value: 28, revenue: '€12.8Md' }
      ],
      growthTrends: [
        { year: '2022', market: 32000, digital: 28500 },
        { year: '2023', market: 38200, digital: 35100 },
        { year: '2024', market: 45600, digital: 42800 },
        { year: '2025', market: 54200, digital: 51900 },
        { year: '2026', market: 64800, digital: 62300 }
      ],
      painPoints: [
        { issue: 'Intégration systèmes legacy', impact: 89, cost: '€180k/an' },
        { issue: 'Sécurité IoT', impact: 85, cost: '€145k/an' },
        { issue: 'Maintenance prédictive', impact: 78, cost: '€95k/an' },
        { issue: 'Interopérabilité', impact: 82, cost: '€125k/an' },
        { issue: 'ROI transformation', impact: 75, cost: '€85k/an' }
      ],
      tools: [
        { category: 'Plateformes IoT', adoption: 68, satisfaction: 65 },
        { category: 'Analytics', adoption: 72, satisfaction: 70 },
        { category: 'Cybersécurité', adoption: 85, satisfaction: 68 },
        { category: 'Edge Computing', adoption: 45, satisfaction: 75 },
        { category: 'Digital Twin', adoption: 35, satisfaction: 80 }
      ],
      financialMetrics: [
        { metric: 'ROI projets IoT', value: '18%', target: '30%', gap: -12 },
        { metric: 'Temps déploiement', value: '14 mois', target: '8 mois', gap: 6 },
        { metric: 'Taux adoption', value: '65%', target: '85%', gap: -20 },
        { metric: 'Économies opérationnelles', value: '12%', target: '20%', gap: -8 }
      ]
    }
  };

  return marketDataMap[scenarioId] || marketDataMap['digital-agency'];
};

export const DetailedMarketAnalysis: React.FC<DetailedMarketAnalysisProps> = ({ 
  scenarioId 
}) => {
  const data = getMarketData(scenarioId);
  
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-8">
      {/* Market Overview Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Analyse de marché détaillée - {data.sector}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border">
              <DollarSign className="h-10 w-10 mx-auto mb-3 text-primary" />
              <p className="text-3xl font-bold text-primary">{data.totalMarketSize}</p>
              <p className="text-sm text-muted-foreground">Taille du marché</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-green-600" />
              <p className="text-3xl font-bold text-green-700">{data.growth}</p>
              <p className="text-sm text-muted-foreground">Croissance annuelle</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border">
              <Building2 className="h-10 w-10 mx-auto mb-3 text-blue-600" />
              <p className="text-3xl font-bold text-blue-700">{data.playerCount}</p>
              <p className="text-sm text-muted-foreground">Entreprises actives</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border">
              <Users className="h-10 w-10 mx-auto mb-3 text-purple-600" />
              <p className="text-3xl font-bold text-purple-700">{data.averageSize}</p>
              <p className="text-sm text-muted-foreground">Taille moyenne</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Segmentation & Growth Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Segmentation du marché</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Part de marché",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Chiffre d'affaires",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.segmentation}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {data.segmentation.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-1 gap-3 mt-4">
              {data.segmentation.map((segment: any, index: number) => (
                <div key={segment.name} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{segment.revenue}</p>
                    <p className="text-sm text-muted-foreground">{segment.value}% du marché</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Évolution du marché 2022-2026</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                market: {
                  label: "Marché total (M€)",
                  color: "hsl(var(--primary))",
                },
                digital: {
                  label: "Digital (M€)",
                  color: "hsl(var(--secondary))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.growthTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="market" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Marché total (M€)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="digital" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    name="Digital (M€)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pain Points Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Points de douleur du secteur & impact financier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.painPoints.map((pain: any, index: number) => (
              <div key={pain.issue} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{pain.issue}</h4>
                    {pain.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {pain.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <Badge variant="destructive" className="text-xs">
                      Impact: {pain.impact}%
                    </Badge>
                    <p className="text-sm font-bold text-red-600 mt-1">{pain.cost}</p>
                  </div>
                </div>
                <Progress value={pain.impact} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tools Adoption & Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Adoption outils vs Satisfaction utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              adoption: {
                label: "Adoption %",
                color: "hsl(var(--primary))",
              },
              satisfaction: {
                label: "Satisfaction %",
                color: "hsl(var(--secondary))",
              },
            }}
            className="h-80 mb-6"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.tools}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="adoption" fill="hsl(var(--primary))" name="Adoption %" />
                <Bar dataKey="satisfaction" fill="hsl(var(--secondary))" name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-700">✓ Opportunités identifiées</h4>
              <div className="space-y-2">
                {data.tools
                  .filter((tool: any) => tool.adoption > 70 && tool.satisfaction < 70)
                  .map((tool: any) => (
                    <div key={tool.category} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-medium text-green-800">{tool.category}</p>
                      <p className="text-sm text-green-600">
                        Forte adoption ({tool.adoption}%) mais satisfaction limitée ({tool.satisfaction}%)
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-orange-700">⚠ Gaps à combler</h4>
              <div className="space-y-2">
                {data.tools
                  .filter((tool: any) => tool.adoption < 70)
                  .map((tool: any) => (
                    <div key={tool.category} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="font-medium text-orange-800">{tool.category}</p>
                      <p className="text-sm text-orange-600">
                        Adoption limitée ({tool.adoption}%) - Potentiel de croissance
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {scenarioId === 'kpi-performance' ? 'Performance ModaStyle vs Objectifs' : 
             scenarioId === 'fintech-startup' ? 'Performance FlexCredit vs Objectifs Réglementaires' : 
             'Performance financière du secteur'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scenarioId === 'kpi-performance' && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 text-amber-800 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">Analyse critique ModaStyle</span>
              </div>
              <p className="text-sm text-amber-700">
                30% du budget marketing (630K€/an sur 2.1M€) est gaspillé à cause de l'attribution imprécise. 
                Le pic de saisonnalité de 40% au printemps n'est pas optimisé.
              </p>
            </div>
          )}

          {scenarioId === 'fintech-startup' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">Urgence Réglementaire FlexCredit</span>
              </div>
              <p className="text-sm text-red-700">
                Taux de défaut 3.2% dépasse l'objectif réglementaire 2% de la Banque de France. 
                Risque de sanctions si non-conformité maintenue. Analyse manuelle 4h/dossier bride la croissance.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.financialMetrics.map((metric: any, index: number) => (
              <div key={metric.metric} className="p-6 border rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-sm">{metric.metric}</h4>
                  <Badge variant={metric.gap > 0 ? "destructive" : "default"} className="text-xs">
                    {metric.gap > 0 ? `+${metric.gap}` : metric.gap}
                    {metric.metric === 'Gaspillage Budget' && scenarioId === 'kpi-performance' ? '%' : ''}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Actuel</span>
                    <span className="font-bold text-red-600">{metric.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Objectif</span>
                    <span className="font-bold text-green-600">{metric.target}</span>
                  </div>
                  
                  <div className="pt-2">
                    {metric.gap !== 0 && (
                      <div className={`flex items-center gap-2 text-sm ${
                        metric.gap > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {metric.gap > 0 ? (
                          <>
                            <AlertTriangle className="h-4 w-4" />
                            Écart critique
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Objectif dépassé
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ModaStyle specific insights */}
          {scenarioId === 'kpi-performance' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Impact Saisonnalité Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Pic Printemps</span>
                      <span className="font-bold text-green-600">+40% CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Été/Automne</span>
                      <span className="font-bold text-orange-600">-25% CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hiver</span>
                      <span className="font-bold text-blue-600">-15% CA</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Opportunité : Optimiser l'attribution pour maximiser le ROI pendant les pics
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Benchmark E-commerce Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>ROI Secteur Moyen</span>
                      <span className="font-bold">280%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ModaStyle Actuel</span>
                      <span className="font-bold text-primary">312%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top Performers</span>
                      <span className="font-bold text-green-600">450%+</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      ModaStyle surperforme le secteur mais reste sous le potentiel optimal
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {scenarioId === 'retail-personalization' && (
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Urgence Black Friday 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>CA Black Friday</span>
                      <span className="font-bold text-green-600">35% CA annuel</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion avec IA</span>
                      <span className="font-bold text-blue-600">+65% potentiel</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Délai implémentation</span>
                      <span className="font-bold text-orange-600">15 jours max</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Opportunité critique : Chaque jour de retard = €8k de CA perdu
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Benchmark Concurrence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Zalando (Conversion)</span>
                      <span className="font-bold text-green-600">4.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>StyleChain Actuel</span>
                      <span className="font-bold text-red-600">1.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gap de Performance</span>
                      <span className="font-bold text-orange-600">-71%</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Retard critique face aux pure-players avec IA avancée
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* FlexCredit specific insights */}
          {scenarioId === 'fintech-startup' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Conformité Réglementaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Taux Défaut Actuel</span>
                      <span className="font-bold text-red-600">3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Objectif Banque de France</span>
                      <span className="font-bold text-green-600">2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risque Sanctions</span>
                      <span className="font-bold text-red-600">ÉLEVÉ</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Urgence: Réduire le défaut sous 2% avant contrôle Q2 2024
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Capacité vs Concurrence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>FlexCredit Actuel</span>
                      <span className="font-bold text-red-600">50 dossiers/sem</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Objectif Croissance</span>
                      <span className="font-bold text-blue-600">100 dossiers/sem</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Néobanques IA</span>
                      <span className="font-bold text-green-600">200+ dossiers/sem</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Analyse IA nécessaire pour rester compétitif face à Qonto/Pennylane
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};