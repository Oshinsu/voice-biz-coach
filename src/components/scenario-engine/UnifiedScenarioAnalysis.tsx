import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TestButton } from '@/components/ui/test-button';
import { MagicSpotlight } from '@/components/ui/magic-spotlight';
import {
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Building2,
  Zap,
  BarChart3,
  Star,
  Trophy,
  Globe,
  Brain,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { Scenario } from '@/data/scenarios/types';

interface UnifiedScenarioAnalysisProps {
  scenario: Scenario;
  analysisType: 'market' | 'product' | 'marketing' | 'comprehensive';
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

export const UnifiedScenarioAnalysis: React.FC<UnifiedScenarioAnalysisProps> = ({
  scenario,
  analysisType = 'comprehensive'
}) => {
  
  // Données EDHEC réalistes consolidées
  const edhecMetrics = {
    ranking: "4ème mondial Financial Times 2024",
    students: "9,000 étudiants",
    budget: "1.2M€/an innovation",
    projectBudget: "50-80k€ max",
    satisfaction: 82,
    targetSatisfaction: 87,
    roi: 15,
    savings: "240k€/3ans"
  };

  const painPoints = [
    {
      title: "Enseignement théorique vs pratique",
      impact: "Critique",
      cost: "180k€/an",
      description: "73% étudiants insatisfaits du gap théorie/terrain",
      severity: "high"
    },
    {
      title: "Évaluation soft skills impossible",
      impact: "Élevé", 
      cost: "120k€/an",
      description: "Pas d'outils objectifs pour mesurer compétences commerciales",
      severity: "high"
    },
    {
      title: "Concurrence HEC/ESSEC",
      impact: "Stratégique",
      cost: "300k€/an",
      description: "Pression pour maintenir leadership 4ème mondial",
      severity: "medium"
    },
    {
      title: "Scaling formations impossibles",
      impact: "Opérationnel",
      cost: "90k€/an", 
      description: "2h pratique actuel → 8h souhaité impossible",
      severity: "medium"
    }
  ];

  const byssVnsSolution = [
    {
      category: "Innovation Pédagogique",
      benefits: [
        "Simulateur vocal IA réaliste",
        "Évaluation objective soft skills",
        "Personnalisation parcours étudiant",
        "Données learning analytics"
      ],
      impact: 95,
      icon: <Brain className="w-5 h-5" />
    },
    {
      category: "ROI Mesurable", 
      benefits: [
        "+5pts satisfaction (82%→87%)",
        "240k€ économies sur 3 ans",
        "Réduction 60% coût formation pratique",
        "Scaling illimité sans formateurs"
      ],
      impact: 88,
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      category: "Avantage Concurrentiel",
      benefits: [
        "Leadership IA éducation en France",
        "Différenciation vs HEC/ESSEC",
        "Technology showcase mondial",
        "Attraction meilleurs étudiants"
      ],
      impact: 92,
      icon: <Trophy className="w-5 h-5" />
    }
  ];

  const marketSegments = [
    {
      name: "Business Schools Elite",
      size: "€2.1B",
      growth: "+12%",
      priority: "Primaire",
      characteristics: "HEC, ESSEC, EDHEC - Innovation required"
    },
    {
      name: "EdTech Corporate",
      size: "€850M", 
      growth: "+18%",
      priority: "Secondaire",
      characteristics: "Grandes entreprises formation commerciale"
    }
  ];

  const renderMarketAnalysis = () => (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* EDHEC Metrics */}
      <motion.div variants={fadeInUp}>
        <MagicSpotlight>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                EDHEC Business School - Métriques Clés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{edhecMetrics.ranking}</p>
                  <p className="text-xs text-muted-foreground">Classement</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm font-medium">{edhecMetrics.students}</p>
                  <p className="text-xs text-muted-foreground">Étudiants</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <p className="text-sm font-medium">{edhecMetrics.budget}</p>
                  <p className="text-xs text-muted-foreground">Budget Innovation</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg">
                  <Target className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-sm font-medium">{edhecMetrics.projectBudget}</p>
                  <p className="text-xs text-muted-foreground">Budget Byss VNS</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Satisfaction Étudiants</span>
                    <span>{edhecMetrics.satisfaction}% / {edhecMetrics.targetSatisfaction}%</span>
                  </div>
                  <Progress value={edhecMetrics.satisfaction} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>ROI Projet Byss VNS</span>
                    <span>{edhecMetrics.roi}% annuel</span>
                  </div>
                  <Progress value={edhecMetrics.roi * 5} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>

      {/* Pain Points */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Points de Douleur Critiques EDHEC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {painPoints.map((pain, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`p-4 rounded-lg border-l-4 ${
                    pain.severity === 'high' 
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                      : 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{pain.title}</h4>
                    <div className="flex gap-2">
                      <Badge 
                        variant={pain.severity === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {pain.impact}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {pain.cost}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{pain.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderProductAnalysis = () => (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* Solution Byss VNS */}
      <motion.div variants={fadeInUp}>
        <MagicSpotlight>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Byss VNS - Solution Révolutionnaire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {byssVnsSolution.map((category, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{category.category}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={category.impact} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{category.impact}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-11">
                      {category.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>

      {/* Investment Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Résumé Investissement & ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold text-green-600">80k€</p>
                <p className="text-sm text-muted-foreground">Investment Max</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold text-blue-600">240k€</p>
                <p className="text-sm text-muted-foreground">Économies 3 ans</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-primary">9,000</p>
                <p className="text-sm text-muted-foreground">Étudiants bénéficiaires</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderMarketingAnalysis = () => (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* Market Segments */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Segments de Marché EdTech
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketSegments.map((segment, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{segment.name}</h4>
                    <Badge 
                      variant={segment.priority === 'Primaire' ? 'default' : 'secondary'}
                    >
                      {segment.priority}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Taille: </span>
                      <span className="font-medium">{segment.size}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Croissance: </span>
                      <span className="font-medium text-green-600">{segment.growth}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{segment.characteristics}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {(analysisType === 'market' || analysisType === 'comprehensive') && renderMarketAnalysis()}
      {(analysisType === 'product' || analysisType === 'comprehensive') && renderProductAnalysis()}
      {(analysisType === 'marketing' || analysisType === 'comprehensive') && renderMarketingAnalysis()}
      
      {/* CTA Section */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mt-8"
      >
        <MagicSpotlight>
          <Card className="text-center p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Prêt à Révolutionner EDHEC ?</h3>
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                Découvrez comment Byss VNS peut transformer l'enseignement commercial à EDHEC 
                avec un ROI de 15% et 240k€ d'économies sur 3 ans.
              </p>
              <TestButton variant="magic" size="lg" className="mt-4">
                Démarrer Démonstration Live
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </TestButton>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>
    </div>
  );
};