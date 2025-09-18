import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Mic, BarChart3, Users, Shield, 
  Zap, Target, Clock, Award
} from 'lucide-react';

interface ByssVnsProductOverviewProps {
  scenarioId: string;
}

export const ByssVnsProductOverview: React.FC<ByssVnsProductOverviewProps> = ({ scenarioId }) => {
  const productFeatures = [
    {
      category: "IA Conversationnelle",
      icon: Brain,
      features: [
        "OpenAI GPT-4o Realtime API",
        "Reconnaissance émotions et tonalité", 
        "Feedback temps réel",
        "Personas clients diversifiés"
      ],
      maturity: 95
    },
    {
      category: "Interface Vocal",
      icon: Mic, 
      features: [
        "Conversations naturelles fluides",
        "Latence ultra-faible (<200ms)",
        "Multilingue (FR/EN)",
        "Adaptation accent/débit"
      ],
      maturity: 90
    },
    {
      category: "Analytics Pédagogiques",
      icon: BarChart3,
      features: [
        "Progression compétences trackée",
        "Métriques soft skills objectives",
        "Reporting professeurs automatisé",
        "Dashboard learning outcomes"
      ],
      maturity: 85
    },
    {
      category: "Gestion Utilisateurs",
      icon: Users,
      features: [
        "Interface no-code professeurs",
        "Scenarios personnalisables",
        "Gestion classes/cohortes",
        "Intégration LMS native"
      ],
      maturity: 80
    }
  ];

  const technicalSpecs = [
    { name: "Latence Vocal", value: "<200ms", benchmark: "Standard: 500ms", status: "Excellent" },
    { name: "Disponibilité", value: "99.9%", benchmark: "Standard: 99.5%", status: "Excellent" },
    { name: "Concurrent Users", value: "500+", benchmark: "Besoin EDHEC: 300", status: "Suffisant" },
    { name: "RGPD Compliance", value: "100%", benchmark: "Requis: 100%", status: "Conforme" },
    { name: "Setup Time", value: "24h", benchmark: "Concurrence: 6 mois", status: "Excellent" },
    { name: "Support", value: "FR 24/7", benchmark: "Standard: Offshore", status: "Premium" }
  ];

  const competitiveAdvantages = [
    {
      title: "Technologie Unique",
      description: "Seule solution IA vocale GPT-4o Realtime pour éducation business",
      impact: "Différentiation absolue vs concurrence"
    },
    {
      title: "Expertise Pédagogique", 
      description: "Analytics spécialisés business education et soft skills",
      impact: "ROI mesurable vs solutions généralistes"
    },
    {
      title: "Rapidité Déploiement",
      description: "Setup 24h vs 6 mois solutions enterprise",
      impact: "Time-to-value immédiat"
    },
    {
      title: "Support Français",
      description: "Équipe pédagogique dédiée vs offshore standard",
      impact: "Adoption professeurs facilitée"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Product Overview Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Byss VNS - Simulateur Vocal IA Révolutionnaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">GPT-4o</div>
              <div className="text-sm text-muted-foreground">Realtime API</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">&lt;200ms</div>
              <div className="text-sm text-muted-foreground">Latence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24h</div>
              <div className="text-sm text-muted-foreground">Setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">RGPD</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Fonctionnalités Clés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productFeatures.map((category, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{category.category}</h3>
                  </div>
                  <Badge variant="outline">{category.maturity}% mature</Badge>
                </div>
                <Progress value={category.maturity} className="h-2" />
                <ul className="space-y-1">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm flex items-center gap-2">
                      <Award className="h-3 w-3 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Spécifications Techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{spec.name}</span>
                  <Badge 
                    variant={
                      spec.status === "Excellent" ? "default" : 
                      spec.status === "Premium" ? "secondary" : "outline"
                    }
                  >
                    {spec.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-primary">{spec.value}</div>
                <div className="text-xs text-muted-foreground">{spec.benchmark}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Avantages Concurrentiels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitiveAdvantages.map((advantage, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-primary">{advantage.title}</h4>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{advantage.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};