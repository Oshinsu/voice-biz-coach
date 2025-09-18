import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestButton } from '@/components/ui/test-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MagicSpotlight } from '@/components/ui/magic-spotlight';
import { SophieAgentsSDK } from '@/components/voice-agents';
import { 
  Building2, 
  TrendingUp, 
  Target, 
  Users, 
  Zap, 
  Phone,
  Trophy,
  Euro,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useScenarios } from '@/hooks/useScenarios';

interface ByssVnsScenarioProps {
  onStartSession?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const ByssVnsScenario: React.FC<ByssVnsScenarioProps> = ({ onStartSession }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById('byss-vns-school');
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);

  if (!scenario) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Scénario EDHEC non trouvé</p>
      </div>
    );
  }

  const handleStartSession = () => {
    setShowVoiceAgent(true);
    onStartSession?.();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Section 1: Vue d'ensemble EDHEC */}
      <motion.div variants={itemVariants}>
        <MagicSpotlight className="relative overflow-hidden">
          <Card className="border-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {scenario.company.name}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    {scenario.description}
                  </p>
                </div>
                <Badge variant="destructive" className="text-sm">
                  {scenario.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">Ranking</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {scenario.company.metrics.rankingFT}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Étudiants</span>
                  </div>
                  <p className="text-sm text-muted-foreground">9,000 étudiants</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Euro className="w-5 h-5" />
                    <span className="font-medium">Budget Innovation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">1,2M€/an</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Target className="w-5 h-5" />
                    <span className="font-medium">Probabilité</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{scenario.probability}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>

      {/* Section 2-4: Analyse détaillée en onglets */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="market" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analyse Marché
            </TabsTrigger>
            <TabsTrigger value="solution" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Solution & ROI
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Stratégie
            </TabsTrigger>
          </TabsList>

          {/* Section 2: Analyse Marché */}
          <TabsContent value="market" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Pain Points Critiques EDHEC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {scenario.company.painPoints.slice(0, 4).map((pain, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{pain}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Métriques Business
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Chiffre d'affaires</span>
                      <span className="font-medium">160M€/an</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Corporate Training</span>
                      <span className="font-medium">15M€/an</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Satisfaction Étudiants</span>
                      <span className="font-medium">82% → 87%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Budget IT</span>
                      <span className="font-medium">500k€/an</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Employabilité</span>
                      <span className="font-medium">94% placement</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Étudiants Internationaux</span>
                      <span className="font-medium">35%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 3: Solution & ROI */}
          <TabsContent value="solution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Byss VNS - Simulateur Vocal IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Révolution Pédagogique</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {scenario.product.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-primary/20">
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Euro className="w-4 h-4 text-primary" />
                        Investissement EDHEC
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Licence annuelle</span>
                          <span className="font-medium">15,000€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Setup & Formation</span>
                          <span className="font-medium">Inclus</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-sm font-medium">Total Annuel</span>
                          <span className="font-bold text-primary">15,000€</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="pt-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Valeur Innovation
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Leadership Tech 18 mois</span>
                          <span className="font-medium">Différentiation</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Scalabilité x10 étudiants</span>
                          <span className="font-medium">Impact Massif</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-sm font-medium">ROI Stratégique</span>
                          <span className="font-bold text-primary">Premium Positioning</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {['IA GPT-4o Realtime', 'Analytics Pédagogiques', 'Intégration LMS'].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 4: Stratégie */}
          <TabsContent value="strategy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Approche Commerciale EDHEC
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Objectifs Cold Call</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        Créer curiosité innovation pédagogique
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        Identifier pain points formations commerciales
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        Obtenir RDV démonstration Byss VNS
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Objectifs RDV Planifié</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        Démonstration live simulateur vocal
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        Présenter valeur innovation pédagogique
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        Sécuriser pilot program janvier 2024
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-secondary/5 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Décideurs Clés</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sophie Hennion-Moreau</span>
                      <Badge variant="default">Sponsor Principal</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emmanuel Métais (DG)</span>
                      <Badge variant="secondary">Validation &gt;15k€</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frédéric Fréry (Prof)</span>
                      <Badge variant="outline">Influence Usage</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* CTA Principal avec MagicSpotlight */}
      <motion.div variants={itemVariants}>
        <MagicSpotlight className="relative">
          <Card className="border-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Démarrer la Session IA Sophie Hennion-Moreau</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Testez vos compétences commerciales face à la Directrice Innovation EDHEC. 
                  IA conversationnelle ultra-réaliste avec Agents SDK OpenAI.
                </p>
                <TestButton 
                  onClick={handleStartSession}
                  size="lg"
                  variant="magic"
                  className="px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Démarrer Session IA
                </TestButton>
              </div>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>

      {/* Voice Agent Modal */}
      {showVoiceAgent && (
        <SophieAgentsSDK 
          conversationType="rdv"
          open={showVoiceAgent}
          onToggle={() => setShowVoiceAgent(false)}
        />
      )}
    </motion.div>
  );
};