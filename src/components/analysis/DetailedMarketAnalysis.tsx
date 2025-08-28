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
  Globe, Zap, Award, AlertTriangle, CheckCircle
} from 'lucide-react';

interface DetailedMarketAnalysisProps {
  scenarioId: string;
}

const getMarketData = (scenarioId: string) => {
  const marketDataMap: Record<string, any> = {
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
    'fintech-startup': {
      sector: 'Fintech',
      totalMarketSize: '€89Md',
      growth: '+15.2%',
      playerCount: '8,500+',
      averageSize: '45 employés',
      segmentation: [
        { name: 'Paiements', value: 32, revenue: '€28.5Md' },
        { name: 'Néobanques', value: 28, revenue: '€24.9Md' },
        { name: 'Investissement', value: 22, revenue: '€19.6Md' },
        { name: 'Assurance', value: 18, revenue: '€16Md' }
      ],
      growthTrends: [
        { year: '2022', market: 65000, digital: 58000 },
        { year: '2023', market: 75000, digital: 69000 },
        { year: '2024', market: 89000, digital: 83000 },
        { year: '2025', market: 105000, digital: 99000 },
        { year: '2026', market: 125000, digital: 120000 }
      ],
      painPoints: [
        { issue: 'Conformité réglementaire', impact: 92, cost: '€85k/an' },
        { issue: 'Sécurité données', impact: 89, cost: '€120k/an' },
        { issue: 'Intégration bancaire', impact: 78, cost: '€65k/an' },
        { issue: 'UX/Onboarding', impact: 75, cost: '€45k/an' },
        { issue: 'Scalabilité tech', impact: 70, cost: '€95k/an' }
      ],
      tools: [
        { category: 'Sécurité', adoption: 95, satisfaction: 78 },
        { category: 'Analytics', adoption: 85, satisfaction: 72 },
        { category: 'API Banking', adoption: 88, satisfaction: 65 },
        { category: 'CRM', adoption: 78, satisfaction: 80 },
        { category: 'Compliance', adoption: 92, satisfaction: 68 }
      ],
      financialMetrics: [
        { metric: 'CAC', value: '€125', target: '€85', gap: 40 },
        { metric: 'LTV/CAC', value: '3.2x', target: '5x', gap: -1.8 },
        { metric: 'Churn mensuel', value: '8%', target: '3%', gap: 5 },
        { metric: 'ARR growth', value: '45%', target: '80%', gap: -35 }
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
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{pain.issue}</h4>
                  <div className="text-right">
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
            Performance financière du secteur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.financialMetrics.map((metric: any, index: number) => (
              <div key={metric.metric} className="p-6 border rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold">{metric.metric}</h4>
                  <Badge variant={metric.gap > 0 ? "destructive" : "default"}>
                    {metric.gap > 0 ? `+${metric.gap}` : metric.gap}
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
                            Écart à combler
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
        </CardContent>
      </Card>
    </div>
  );
};