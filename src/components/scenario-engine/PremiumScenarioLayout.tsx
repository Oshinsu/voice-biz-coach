import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestButton } from '@/components/ui/test-button';
import { MagicSpotlight } from '@/components/ui/magic-spotlight';
import { 
  Building2, TrendingUp, DollarSign, Users, Target, Phone, Calendar,
  CheckCircle, BarChart3, Zap, Shield, AlertCircle, Star, Sparkles, Crown
} from 'lucide-react';
import { Scenario } from '@/data/scenarios/types';
import { UnifiedScenarioAnalysis } from './UnifiedScenarioAnalysis';

interface PremiumScenarioLayoutProps {
  scenario: Scenario;
  config: any;
  onStartSession?: () => void;
}

// Animations premium avec glassmorphism avancé
const premiumFadeIn = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1
  },
  transition: {
    duration: 0.5
  }
};

const premiumStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Header Premium avec effets visuels avancés
const PremiumHeader = memo(({ scenario }: { scenario: Scenario }) => {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'facile': return 'secondary';
      case 'moyen': return 'default';
      case 'difficile': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <motion.div 
      initial={premiumFadeIn.initial}
      animate={premiumFadeIn.animate}
      transition={premiumFadeIn.transition}
    >
      <MagicSpotlight>
        <Card className="relative overflow-hidden bg-gradient-to-br from-background/95 via-background/90 to-primary/5 backdrop-blur-xl border-primary/20 shadow-2xl">
          {/* Overlay premium */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {scenario.company.name}
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Premium
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scénario de vente avancé avec IA conversationnelle
                  </p>
                </div>
              </div>
              <Badge variant={getDifficultyVariant(scenario.difficulty)} className="shadow-lg">
                {scenario.difficulty}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="relative space-y-6">
            <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
              <p className="text-foreground/80 leading-relaxed">{scenario.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MagicSpotlight>
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                  <Building2 className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Secteur</p>
                  <p className="text-sm font-bold text-foreground">{scenario.company.sector}</p>
                </div>
              </MagicSpotlight>
              
              <MagicSpotlight>
                <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20">
                  <DollarSign className="h-8 w-8 mx-auto mb-3 text-accent" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Budget</p>
                  <p className="text-sm font-bold text-foreground">{scenario.company.budget}</p>
                </div>
              </MagicSpotlight>
              
              <MagicSpotlight>
                <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border border-secondary/20">
                  <Users className="h-8 w-8 mx-auto mb-3 text-secondary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Taille</p>
                  <p className="text-sm font-bold text-foreground">{scenario.company.size}</p>
                </div>
              </MagicSpotlight>
              
              <MagicSpotlight>
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20">
                  <Star className="h-8 w-8 mx-auto mb-3 text-success" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Probabilité</p>
                  <p className="text-sm font-bold text-foreground">{scenario.probability}%</p>
                </div>
              </MagicSpotlight>
            </div>
          </CardContent>
        </Card>
      </MagicSpotlight>
    </motion.div>
  );
});

// Section Objectifs Premium
const PremiumObjectives = memo(({ scenario }: { scenario: Scenario }) => {
  const objectives = scenario.specificObjectives;
  
  if (!objectives) return null;

  return (
    <motion.div 
      initial={premiumFadeIn.initial}
      animate={premiumFadeIn.animate}
      transition={premiumFadeIn.transition}
    >
      <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Objectifs Commerciaux par Approche
            <Sparkles className="h-4 w-4 text-accent" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cold Call Premium */}
            <MagicSpotlight>
              <Card className="bg-gradient-to-br from-orange-50/80 to-orange-100/50 border-orange-200/50 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-500/10 rounded-full">
                      <Phone className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-orange-800">Cold Call</h3>
                    <Badge className="bg-orange-500/10 text-orange-700 border-orange-300">
                      Appel à froid
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white/60 rounded-lg border border-orange-200/50">
                    <h4 className="font-semibold text-orange-700 mb-2">🎯 Objectif Principal</h4>
                    <p className="text-sm text-gray-700">{objectives.coldCall.primary}</p>
                  </div>
                  
                  <div className="p-4 bg-white/60 rounded-lg border border-orange-200/50">
                    <h4 className="font-semibold text-orange-700 mb-2">🎲 Objectif Secondaire</h4>
                    <p className="text-sm text-gray-700">{objectives.coldCall.secondary}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50/80 rounded-lg border border-green-200/50">
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Critères de Succès
                    </h4>
                    <p className="text-sm text-green-700">{objectives.coldCall.successMetrics}</p>
                  </div>
                </CardContent>
              </Card>
            </MagicSpotlight>

            {/* RDV Premium */}
            <MagicSpotlight>
              <Card className="bg-gradient-to-br from-green-50/80 to-green-100/50 border-green-200/50 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-500/10 rounded-full">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-green-800">RDV Planifié</h3>
                    <Badge className="bg-green-500/10 text-green-700 border-green-300">
                      Rendez-vous
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white/60 rounded-lg border border-green-200/50">
                    <h4 className="font-semibold text-green-700 mb-2">🎯 Objectif Principal</h4>
                    <p className="text-sm text-gray-700">{objectives.rdv.primary}</p>
                  </div>
                  
                  <div className="p-4 bg-white/60 rounded-lg border border-green-200/50">
                    <h4 className="font-semibold text-green-700 mb-2">🎲 Objectif Secondaire</h4>
                    <p className="text-sm text-gray-700">{objectives.rdv.secondary}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-200/50">
                    <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Critères de Succès
                    </h4>
                    <p className="text-sm text-blue-700">{objectives.rdv.successMetrics}</p>
                  </div>
                </CardContent>
              </Card>
            </MagicSpotlight>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// CTA Premium avec animations
const PremiumCTA = memo(({ onStartSession }: { onStartSession?: () => void }) => {
  return (
    <motion.div 
      initial={premiumFadeIn.initial}
      animate={premiumFadeIn.animate}
      transition={premiumFadeIn.transition}
    >
      <MagicSpotlight>
        <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          
          <CardContent className="relative text-center py-12">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">IA Conversationnelle Premium</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Prêt pour l'expérience ultime ?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Testez vos compétences avec notre simulateur vocal IA de dernière génération, 
                propulsé par GPT-4o Realtime.
              </p>
            </div>
            
            <TestButton 
              variant="magic" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={onStartSession}
            >
              <Zap className="h-5 w-5 mr-2" />
              Démarrer la Session Premium
              <Crown className="h-5 w-5 ml-2" />
            </TestButton>
          </CardContent>
        </Card>
      </MagicSpotlight>
    </motion.div>
  );
});

// Layout principal Premium
export const PremiumScenarioLayout: React.FC<PremiumScenarioLayoutProps> = memo(({ 
  scenario, 
  config,
  onStartSession 
}) => {
  return (
    <motion.div 
      className="space-y-8"
      variants={premiumStagger}
      initial="initial"
      animate="animate"
    >
      {/* Header Premium */}
      <PremiumHeader scenario={scenario} />

      {/* Objectifs Premium */}
      <PremiumObjectives scenario={scenario} />

      {/* Tabs Premium */}
      <motion.div 
        initial={premiumFadeIn.initial}
        animate={premiumFadeIn.animate}
        transition={premiumFadeIn.transition}
      >
        <Card className="bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-sm border-border/50">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:bg-primary/10">Analyse Marché</TabsTrigger>
              <TabsTrigger value="product" className="data-[state=active]:bg-primary/10">Solution & Prix</TabsTrigger>
              <TabsTrigger value="marketing" className="data-[state=active]:bg-primary/10">Stratégie</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="p-6 text-center">
                <Crown className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-lg font-semibold mb-2">Vue d'ensemble Premium</h4>
                <p className="text-muted-foreground">
                  Interface premium avec analytics avancés en cours de développement
                </p>
              </div>
            </TabsContent>

            <TabsContent value="market" className="mt-6">
              <UnifiedScenarioAnalysis scenario={scenario} analysisType="market" />
            </TabsContent>

            <TabsContent value="product" className="mt-6">
              <UnifiedScenarioAnalysis scenario={scenario} analysisType="product" />
            </TabsContent>

            <TabsContent value="marketing" className="mt-6">
              <UnifiedScenarioAnalysis scenario={scenario} analysisType="marketing" />
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>

      {/* CTA Premium */}
      <PremiumCTA onStartSession={onStartSession} />
    </motion.div>
  );
});

PremiumScenarioLayout.displayName = 'PremiumScenarioLayout';