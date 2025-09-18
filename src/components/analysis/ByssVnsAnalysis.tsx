import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, Users, TrendingUp, Target, 
  BookOpen, Brain, Star, Award
} from 'lucide-react';

interface ByssVnsAnalysisProps {
  scenarioId: string;
}

export const ByssVnsAnalysis: React.FC<ByssVnsAnalysisProps> = ({ scenarioId }) => {
  const edhecMetrics = [
    { name: 'Étudiants Total', value: '9,000', target: '9,500', progress: 95 },
    { name: 'Satisfaction Pédagogie', value: '82%', target: '87%', progress: 94 },
    { name: 'Budget Innovation', value: '1.2M€', target: '1.5M€', progress: 80 },
    { name: 'Ranking Mondial', value: '4ème', target: 'Top 3', progress: 85 }
  ];

  const painPoints = [
    {
      title: "Enseignement Théorique vs Pratique",
      severity: "Critique",
      impact: "73% étudiants jugent formations vente 'trop académiques'",
      cost: "Perte attractivité vs concurrence"
    },
    {
      title: "Évaluation Soft Skills Impossible", 
      severity: "Majeur",
      impact: "Assessment centers: 850€/étudiant, 2 fois/an max",
      cost: "ROI formation non mesurable"
    },
    {
      title: "Concurrence HEC/ESSEC",
      severity: "Critique", 
      impact: "Pression maintenir leadership 4ème mondial FT",
      cost: "Risque déclassement si innovation insuffisante"
    },
    {
      title: "Scaling Formations Commerciales",
      severity: "Majeur",
      impact: "1 prof négociation pour 180 étudiants MSc",
      cost: "2h pratique/semestre vs 8h souhaité réellement"
    }
  ];

  const byssVnsBenefits = [
    {
      category: "Innovation Pédagogique",
      benefits: [
        "Premier simulateur IA vocal GPT-4o Realtime",
        "Simulations immersives 24/7 disponibles", 
        "Analytics pédagogiques temps réel",
        "Scenarios personnalisables par professeur"
      ]
    },
    {
      category: "ROI Mesurable", 
      benefits: [
        "Métriques objectives compétences commerciales",
        "Progression trackée individuellement",
        "Reporting automatisé pour accreditations",
        "Coût par étudiant divisé par 8 vs assessment centers"
      ]
    },
    {
      category: "Avantage Concurrentiel",
      benefits: [
        "Différentiation technologique unique",
        "Excellence pédagogique prouvée",
        "Attractivité étudiants Generation Z",
        "Référence innovation business schools"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Analyse EDHEC x Byss VNS - Révolution Pédagogique IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {edhecMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <Badge variant="outline">{metric.value}</Badge>
                </div>
                <Progress value={metric.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Objectif: {metric.target}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pain Points Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-destructive" />
            Défis Critiques EDHEC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {painPoints.map((pain, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{pain.title}</h4>
                  <Badge 
                    variant={pain.severity === "Critique" ? "destructive" : "secondary"}
                  >
                    {pain.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{pain.impact}</p>
                <p className="text-sm font-medium text-orange-600">{pain.cost}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Byss VNS Solution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Solution Byss VNS - Bénéfices Stratégiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {byssVnsBenefits.map((category, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2">
                  {index === 0 && <BookOpen className="h-5 w-5 text-blue-500" />}
                  {index === 1 && <TrendingUp className="h-5 w-5 text-green-500" />}
                  {index === 2 && <Star className="h-5 w-5 text-purple-500" />}
                  <h3 className="font-semibold">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-sm flex items-start gap-2">
                      <Award className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Résumé Investissement & ROI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">80k€</div>
              <div className="text-sm text-muted-foreground">
                Budget Byss VNS Maximum<br />
                (sur 1.2M€ innovations)
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">45k€</div>
              <div className="text-sm text-muted-foreground">
                Économies vs Assessment Centers<br />
                (première année)
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">9,000</div>
              <div className="text-sm text-muted-foreground">
                Étudiants bénéficiaires<br />
                (tous programmes)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};