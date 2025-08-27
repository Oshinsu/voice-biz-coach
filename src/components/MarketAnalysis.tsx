import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, Globe, Users, DollarSign, BarChart3,
  Target, Zap, Shield, AlertTriangle, CheckCircle,
  Building, Award, Lightbulb, ArrowUp, ArrowDown
} from 'lucide-react';
import { SwotAnalysis } from '@/hooks/useScenarios';

interface MarketAnalysisProps {
  swotAnalyses?: SwotAnalysis[];
}

export const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ swotAnalyses = [] }) => {
  // For now keeping static data until SWOT analyses have the market_data and porter_analysis fields
  // const marketData = swotAnalyses.find(s => s.analysis_type === 'market')?.market_data;
  // const porterData = swotAnalyses.find(s => s.analysis_type === 'market')?.porter_analysis;
  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Vue d'ensemble du marché
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Marché mondial 2024</p>
              <p className="text-2xl font-bold">$142Md</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="text-sm text-muted-foreground">Croissance annuelle</p>
              <p className="text-2xl font-bold">18.3%</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <Building className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm text-muted-foreground">Institutions France</p>
              <p className="text-2xl font-bold">3,500+</p>
            </div>
            <div className="text-center p-4 bg-muted/5 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Étudiants impactés</p>
              <p className="text-2xl font-bold">2.8M</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Segments de marché EdTech</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>LMS & Plateformes</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>IA & Simulations</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>VR/AR Éducation</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Analytics & Assessment</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Tendances clés 2024-2026</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Adoption IA générative +120%</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Simulations immersives +95%</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Apprentissage adaptatif +75%</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Solutions legacy -45%</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Budget EdTech écoles +65%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Opportunity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Opportunité de marché
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Marché Addressable</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-900">€1.2Md</p>
                <p className="text-sm text-blue-700">Marché total (TAM)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">€200M</p>
                <p className="text-sm text-blue-700">Marché serviceable (SAM)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">€50M</p>
                <p className="text-sm text-blue-700">Marché obtainable (SOM)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Drivers de croissance</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Digitalisation accélérée post-COVID</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Demande entreprises compétences vente</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Pression concurrentielle écoles</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">ROI mesurable solutions EdTech</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Maturité technologique IA</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Barrières et défis</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Résistance changement corps professoral</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Budgets contraints institutions publiques</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Cycles décision longs (12-18 mois)</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Complexité intégration SI existants</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Preuves ROI pédagogique requises</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Landscape */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Paysage concurrentiel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Direct Competitors */}
            <div className="p-4 border-2 border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Concurrents directs
              </h4>
              <div className="space-y-3">
                <div className="p-2 bg-red-50 rounded">
                  <p className="font-medium text-sm">VitalSource Sales Sim</p>
                  <p className="text-xs text-red-700">Leader marché US, interface basique</p>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Part marché:</span>
                    <span className="font-medium">35%</span>
                  </div>
                </div>
                <div className="p-2 bg-red-50 rounded">
                  <p className="font-medium text-sm">McGraw Hill Connect</p>
                  <p className="text-xs text-red-700">Intégré éditeur, fonctions limitées</p>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Part marché:</span>
                    <span className="font-medium">28%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Indirect Competitors */}
            <div className="p-4 border-2 border-orange-200 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Concurrents indirects
              </h4>
              <div className="space-y-3">
                <div className="p-2 bg-orange-50 rounded">
                  <p className="font-medium text-sm">Gong/Chorus (pro)</p>
                  <p className="text-xs text-orange-700">B2B, pas adapté formation</p>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <p className="font-medium text-sm">Solutions maison</p>
                  <p className="text-xs text-orange-700">Jeux de rôle traditionnels</p>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <p className="font-medium text-sm">Plateformes LMS</p>
                  <p className="text-xs text-orange-700">Moodle, Canvas avec modules</p>
                </div>
              </div>
            </div>

            {/* Notre Position */}
            <div className="p-4 border-2 border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Notre position
              </h4>
              <div className="space-y-3">
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium text-sm">Innovation produit</p>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Score:</span>
                    <span className="font-medium">8.5/10</span>
                  </div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium text-sm">Expérience utilisateur</p>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Score:</span>
                    <span className="font-medium">8.2/10</span>
                  </div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium text-sm">Part de marché</p>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Actuelle:</span>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Competitive Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Nos avantages compétitifs</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Technologie de pointe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Interface utilisateur moderne</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Analytics avancés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Intégrations flexibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Support client réactif</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Solution personnalisable</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Gaps concurrentiels à exploiter</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Solutions existantes outdated (technologie 2018-2020)</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Manque d'innovation interface utilisateur</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Analytics basiques, pas d'insights comportementaux</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Support client standardisé, peu personnalisé</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Pas d'adaptation locale/culturelle</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends & Future */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Tendances et prévisions marché
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Évolutions technologiques</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-1">IA Générative (2024-2025)</h5>
                  <p className="text-xs text-muted-foreground">
                    Personnalisation extrême des scénarios, génération automatique de contenu pédagogique
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Métaverse Éducatif (2025-2027)</h5>
                  <p className="text-xs text-muted-foreground">
                    Immersion VR/AR, simulations ultra-réalistes, interactions sociales virtuelles
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Analytics Prédictifs (2024-2026)</h5>
                  <p className="text-xs text-muted-foreground">
                    Prédiction performance étudiants, recommandations pédagogiques personnalisées
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Changements comportementaux</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Génération Z étudiants</h5>
                  <p className="text-xs text-muted-foreground">
                    Attentes digital-native, apprentissage interactif, feedback instantané
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Professeurs millennials</h5>
                  <p className="text-xs text-muted-foreground">
                    Plus ouverts technologie, recherche efficacité pédagogique, mesure impact
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm mb-1">Employeurs exigeants</h5>
                  <p className="text-xs text-muted-foreground">
                    Compétences pratiques requises, soft skills valorisées, adaptabilité clé
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Opportunité stratégique 2024-2026</h4>
            <p className="text-sm text-blue-700">
              Fenêtre de 24 mois pour s'imposer comme leader technologique avant l'arrivée 
              des GAFAM sur le segment. Les institutions qui n'adopteront pas de solutions 
              innovantes risquent un décrochage concurrentiel irréversible.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Market Entry Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Stratégie de pénétration marché ESCAP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Phase 1: Démonstration</h4>
              <div className="space-y-2 text-sm">
                <p>• Audit pédagogique gratuit</p>
                <p>• Benchmark vs concurrents</p>
                <p>• ROI calculator personnalisé</p>
                <p>• Témoignages clients similaires</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Phase 2: Pilote</h4>
              <div className="space-y-2 text-sm">
                <p>• Département test (6 mois)</p>
                <p>• Formation équipe dédiée</p>
                <p>• Mesure impact étudiant</p>
                <p>• Ajustements sur-mesure</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Phase 3: Déploiement</h4>
              <div className="space-y-2 text-sm">
                <p>• Extension autres départements</p>
                <p>• Intégration LMS complète</p>
                <p>• Formation professeurs masse</p>
                <p>• Partenariat stratégique</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};