import React, { memo, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestButton } from '@/components/ui/test-button';
import { MagicSpotlight } from '@/components/ui/magic-spotlight';
import { 
  Building2, TrendingUp, DollarSign, Users, Target, Phone, Calendar,
  CheckCircle, BarChart3, Zap, Shield, AlertCircle, Star
} from 'lucide-react';
import { Scenario } from '@/data/scenarios/types';
import { UnifiedScenarioAnalysis } from './UnifiedScenarioAnalysis';

interface UnifiedScenarioLayoutProps {
  scenario: Scenario;
  onStartSession?: () => void;
}

// Animations optimisées
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Composant Header optimisé avec glassmorphism
const ScenarioHeader = memo(({ scenario }: { scenario: Scenario }) => {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'facile': return 'secondary';
      case 'moyen': return 'default';
      case 'difficile': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <motion.div {...fadeInUp}>
      <MagicSpotlight>
        <Card className="bg-background/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {scenario.company.name}
              </CardTitle>
              <Badge variant={getDifficultyVariant(scenario.difficulty)}>
                {scenario.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{scenario.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Secteur</p>
                <p className="text-sm font-medium">{scenario.company.sector}</p>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-accent" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Budget</p>
                <p className="text-sm font-medium">{scenario.company.budget}</p>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Taille</p>
                <p className="text-sm font-medium">{scenario.company.size}</p>
              </div>
              <div className="text-center p-4 bg-success/5 rounded-lg">
                <Star className="h-6 w-6 mx-auto mb-2 text-success" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Probabilité</p>
                <p className="text-sm font-medium">{scenario.probability}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </MagicSpotlight>
    </motion.div>
  );
});

// Composant Objectifs consolidé
const ObjectivesSection = memo(({ scenario }: { scenario: Scenario }) => {
  const objectives = scenario.specificObjectives;
  
  if (!objectives) return null;

  return (
    <motion.div {...fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Objectifs par Type d'Approche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cold Call */}
            <MagicSpotlight>
              <div className="p-6 border rounded-lg bg-orange-50/50">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-800">Cold Call</h3>
                  <Badge variant="destructive" className="bg-orange-100 text-orange-700">
                    Appel à froid
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Objectif Principal</h4>
                    <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                      {objectives.coldCall.primary}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Objectif Secondaire</h4>
                    <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                      {objectives.coldCall.secondary}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Critère de Succès</h4>
                    <div className="flex items-start gap-2 bg-green-50 p-3 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-700">
                        {objectives.coldCall.successMetrics}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MagicSpotlight>

            {/* RDV */}
            <MagicSpotlight>
              <div className="p-6 border rounded-lg bg-green-50/50">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">RDV Planifié</h3>
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    Rendez-vous
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Objectif Principal</h4>
                    <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                      {objectives.rdv.primary}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Objectif Secondaire</h4>
                    <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                      {objectives.rdv.secondary}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Critère de Succès</h4>
                    <div className="flex items-start gap-2 bg-blue-50 p-3 rounded">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        {objectives.rdv.successMetrics}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MagicSpotlight>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// Composant Métriques contextuelles
const MarketMetrics = memo(({ scenario }: { scenario: Scenario }) => {
  const marketData = scenario.marketData?.marketOverview;
  
  if (!marketData) return null;

  return (
    <motion.div {...fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Contexte Marché - {scenario.company?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Taille marché</p>
              <p className="font-semibold">{marketData.marketSize}</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-muted-foreground">Croissance</p>
              <p className="font-semibold text-green-700">{marketData.growthRate}</p>
            </div>
            
            {marketData.budgetRange && (
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-muted-foreground">Budget type</p>
                <p className="font-semibold text-blue-700">{marketData.budgetRange}</p>
              </div>
            )}
            
            {marketData.expectedROI && (
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-muted-foreground">ROI attendu</p>
                <p className="font-semibold text-purple-700">{marketData.expectedROI}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// Composant Pain Points
const PainPointsSection = memo(({ scenario }: { scenario: Scenario }) => {
  return (
    <motion.div {...fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Points de Douleur Critiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.isArray(scenario.company.painPoints) && 
             scenario.company.painPoints.slice(0, 4).map((pain: any, index: number) => (
              <MagicSpotlight key={index}>
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {typeof pain === 'string' ? pain : pain.issue || pain.description}
                  </p>
                </div>
              </MagicSpotlight>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// Composant CTA optimisé
const CallToAction = memo(({ onStartSession }: { onStartSession?: () => void }) => {
  return (
    <motion.div {...fadeInUp}>
      <MagicSpotlight>
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Prêt à commencer la simulation ?</h3>
            <p className="text-muted-foreground mb-6">
              Testez vos compétences commerciales avec notre IA conversationnelle avancée
            </p>
            <TestButton 
              variant="magic" 
              size="lg" 
              className="mt-4"
              onClick={onStartSession}
            >
              <Zap className="h-4 w-4 mr-2" />
              Démarrer la Session IA
            </TestButton>
          </CardContent>
        </Card>
      </MagicSpotlight>
    </motion.div>
  );
});

// Composant principal optimisé avec lazy loading
export const UnifiedScenarioLayout: React.FC<UnifiedScenarioLayoutProps> = memo(({ 
  scenario, 
  onStartSession 
}) => {
  // Optimisation avec useMemo pour éviter les re-renders
  const tabsData = useMemo(() => [
    { value: 'overview', label: 'Vue d\'ensemble' },
    { value: 'market', label: 'Analyse Marché' },
    { value: 'product', label: 'Solution & Prix' },
    { value: 'marketing', label: 'Stratégie' }
  ], []);

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <ScenarioHeader scenario={scenario} />

      {/* Métriques contextuelles */}
      <MarketMetrics scenario={scenario} />

      {/* Points de douleur */}
      <PainPointsSection scenario={scenario} />

      {/* Onglets d'analyse */}
      <motion.div {...fadeInUp}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {tabsData.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ObjectivesSection scenario={scenario} />
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Suspense fallback={<div>Chargement analyse marché...</div>}>
              <UnifiedScenarioAnalysis scenario={scenario} analysisType="market" />
            </Suspense>
          </TabsContent>

          <TabsContent value="product" className="space-y-6">
            <Suspense fallback={<div>Chargement analyse produit...</div>}>
              <UnifiedScenarioAnalysis scenario={scenario} analysisType="product" />
            </Suspense>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <Suspense fallback={<div>Chargement stratégie marketing...</div>}>
              <UnifiedScenarioAnalysis scenario={scenario} analysisType="marketing" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Call to Action */}
      <CallToAction onStartSession={onStartSession} />
    </motion.div>
  );
});

UnifiedScenarioLayout.displayName = 'UnifiedScenarioLayout';