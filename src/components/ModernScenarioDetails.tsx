import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestButton } from '@/components/ui/test-button';
import { MagicSpotlight } from '@/components/ui/magic-spotlight';
import { ScenarioEngine } from './scenario-engine/ScenarioEngine';
import { 
  Building2, 
  TrendingUp, 
  Building, 
  DollarSign, 
  Users, 
  Target,
  Zap,
  Star,
  Globe,
  Brain,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { Scenario } from '@/data/scenarios/types';

interface ModernScenarioDetailsProps {
  scenario: Scenario;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const ModernScenarioDetails: React.FC<ModernScenarioDetailsProps> = ({ scenario }) => {
  
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'facile': return 'secondary';
      case 'moyen': return 'default';
      case 'difficile': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial" 
      animate="animate"
      className="space-y-6"
    >
      {/* Header moderne avec glassmorphism */}
      <motion.div variants={fadeInUp}>
        <MagicSpotlight>
          <Card className="border-2 bg-gradient-to-br from-card/80 via-card to-card/90 backdrop-blur-sm">
            <CardHeader className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
              <div className="relative flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">{scenario.company.name}</h1>
                    <p className="text-sm text-muted-foreground font-normal">
                      {scenario.company.sector}
                    </p>
                  </div>
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={getDifficultyVariant(scenario.difficulty)}
                    className="text-sm px-3 py-1"
                  >
                    {scenario.difficulty}
                  </Badge>
                  {scenario.id === 'byss-vns-school' && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Star className="w-3 h-3 mr-1" />
                      4ème Mondial FT
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {scenario.description}
              </p>
              
              {/* Métriques clés avec animations */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div 
                  variants={fadeInUp}
                  className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg border hover:bg-blue-500/10 transition-colors"
                >
                  <Building className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Secteur</p>
                  <p className="text-sm font-semibold">{scenario.company.sector}</p>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg border hover:bg-green-500/10 transition-colors"
                >
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Budget</p>
                  <p className="text-sm font-semibold">{scenario.company.budget}</p>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg border hover:bg-purple-500/10 transition-colors"
                >
                  <Users className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Taille</p>
                  <p className="text-sm font-semibold">{scenario.company.size}</p>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg border hover:bg-orange-500/10 transition-colors"
                >
                  <Target className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Probabilité</p>
                  <p className="text-sm font-semibold">{scenario.probability}%</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>

      {/* Tabs modernes avec animations */}
      <motion.div variants={fadeInUp}>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Globe className="w-4 h-4 mr-2" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger 
              value="analysis"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analyse Marché
            </TabsTrigger>
            <TabsTrigger 
              value="product"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Zap className="w-4 h-4 mr-2" />
              Solution Byss VNS
            </TabsTrigger>
            <TabsTrigger 
              value="strategy"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Brain className="w-4 h-4 mr-2" />
              Stratégie
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <motion.div variants={fadeInUp}>
              <ScenarioEngine 
                scenario={scenario}
                componentType="analysis"
                variant="comprehensive"
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            <motion.div variants={fadeInUp}>
              <ScenarioEngine 
                scenario={scenario}
                componentType="analysis"
                variant="market"
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="product" className="space-y-6 mt-6">
            <motion.div variants={fadeInUp}>
              <ScenarioEngine 
                scenario={scenario}
                componentType="analysis"
                variant="product"
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6 mt-6">
            <motion.div variants={fadeInUp}>
              <ScenarioEngine 
                scenario={scenario}
                componentType="analysis"
                variant="marketing"
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* CTA Footer */}
      <motion.div variants={fadeInUp}>
        <MagicSpotlight>
          <Card className="text-center p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">
                  Prêt à commencer ce scénario ?
                </h3>
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                Configurez votre session et commencez l'entraînement avec Sophie Hennion-Moreau
              </p>
              <TestButton variant="magic" size="lg" className="mt-4">
                Démarrer la Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </TestButton>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>
    </motion.div>
  );
};