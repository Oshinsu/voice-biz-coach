import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Users, TrendingUp, Zap, 
  GraduationCap, Globe, Award, BarChart3
} from 'lucide-react';

interface ByssVnsMarketingProps {
  scenarioId: string;
}

export const ByssVnsMarketing: React.FC<ByssVnsMarketingProps> = ({ scenarioId }) => {
  const marketSegments = [
    {
      name: "Business Schools Premium",
      size: "42 écoles",
      growth: "+8% CAGR",
      budget: "5-15M€/an",
      priority: "Haute",
      characteristics: ["Innovation pédagogique", "Ranking international", "Accreditations"]
    },
    {
      name: "Universités Commerce",
      size: "180 institutions", 
      growth: "+12% CAGR",
      budget: "1-5M€/an",
      priority: "Moyenne",
      characteristics: ["Transformation digitale", "Employabilité étudiants", "ROI formations"]
    },
    {
      name: "Corporate Universities",
      size: "350+ entreprises",
      growth: "+22% CAGR", 
      budget: "2-8M€/an",
      priority: "Haute",
      characteristics: ["Formation continue", "Soft skills", "Performance commerciale"]
    }
  ];

  const positioningStrategy = {
    primaryMessage: "L'IA vocale qui révolutionne l'enseignement commercial",
    keyDifferentiators: [
      "Première solution IA vocal GPT-4o Realtime éducation",
      "Analytics pédagogiques spécialisés business",
      "Setup 24h vs 6 mois concurrence",
      "Support pédagogique français premium"
    ],
    targetBenefits: [
      "ROI mesurable compétences soft skills",
      "Différentiation concurrentielle unique", 
      "Engagement étudiant +25% prouvé",
      "Réduction coûts formation -60%"
    ]
  };

  const goToMarketStrategy = [
    {
      phase: "Phase 1: Proof of Concept",
      timeline: "Q1 2024",
      targets: ["EDHEC Business School", "2-3 business schools premium"],
      goals: ["Case studies ROI", "Témoignages professeurs", "Métriques étudiants"],
      budget: "50k€ marketing",
      kpis: ["3 pilots signés", "95% satisfaction", "25% engagement boost"]
    },
    {
      phase: "Phase 2: Market Penetration", 
      timeline: "Q2-Q3 2024",
      targets: ["Top 15 business schools France", "Corporate universities"],
      goals: ["Leadership marché", "Références prestigieuses", "Scaling product"],
      budget: "200k€ marketing",
      kpis: ["15 clients signés", "500k€ ARR", "Market leader position"]
    },
    {
      phase: "Phase 3: International Expansion",
      timeline: "Q4 2024 - 2025",
      targets: ["Business schools Europe", "US market entry"],
      goals: ["International scaling", "Strategic partnerships", "Série A funding"],
      budget: "500k€ marketing", 
      kpis: ["50 clients internationaux", "2M€ ARR", "Series A levée"]
    }
  ];

  const marketingChannels = [
    {
      channel: "Content Marketing EdTech",
      investment: "30%",
      roi: "4.5x",
      tactics: ["Blog posts", "Webinars", "White papers", "Études de cas"],
      kpis: ["10k visitors/mois", "500 leads/mois", "15% conversion"]
    },
    {
      channel: "Events & Conferences",
      investment: "25%", 
      roi: "6.2x",
      tactics: ["Conférences EdTech", "Salons éducation", "Demos live", "Speaking slots"],
      kpis: ["50 leads/event", "30% qualification", "Pipeline 200k€"]
    },
    {
      channel: "Partnership & Referrals",
      investment: "20%",
      roi: "8.1x", 
      tactics: ["Consultants EdTech", "Intégrateurs LMS", "Alumni networks", "Word-of-mouth"],
      kpis: ["20 partners", "40% referral sales", "Viral coefficient 1.3"]
    },
    {
      channel: "Direct Sales",
      investment: "25%",
      roi: "3.8x",
      tactics: ["Account-based marketing", "Cold outreach", "LinkedIn", "Email sequences"],
      kpis: ["100 prospects/mois", "25% meeting rate", "12% close rate"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Marché EdTech Business Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketSegments.map((segment, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{segment.name}</h3>
                  <Badge variant={segment.priority === "Haute" ? "default" : "secondary"}>
                    {segment.priority}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Taille:</span>
                    <div className="font-medium">{segment.size}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Croissance:</span>
                    <div className="font-medium text-green-600">{segment.growth}</div>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Budget moyen:</span>
                  <div className="font-medium">{segment.budget}</div>
                </div>
                <ul className="text-xs space-y-1">
                  {segment.characteristics.map((char, charIndex) => (
                    <li key={charIndex} className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-primary" />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Positioning Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Positionnement Stratégique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <h3 className="text-xl font-bold text-primary mb-2">
                {positioningStrategy.primaryMessage}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Différentiation Clé
                </h4>
                <ul className="space-y-2">
                  {positioningStrategy.keyDifferentiators.map((diff, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <Award className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                      {diff}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Bénéfices Clients
                </h4>
                <ul className="space-y-2">
                  {positioningStrategy.targetBenefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <Award className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Go-to-Market Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Stratégie Go-to-Market 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goToMarketStrategy.map((phase, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-primary">{phase.phase}</h3>
                  <Badge variant="outline">{phase.timeline}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Cibles:</span>
                    <ul className="mt-1 space-y-1">
                      {phase.targets.map((target, targetIndex) => (
                        <li key={targetIndex} className="text-muted-foreground">• {target}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="font-medium">Objectifs:</span>
                    <ul className="mt-1 space-y-1">
                      {phase.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="text-muted-foreground">• {goal}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="font-medium">KPIs:</span>
                    <ul className="mt-1 space-y-1">
                      {phase.kpis.map((kpi, kpiIndex) => (
                        <li key={kpiIndex} className="text-green-600">• {kpi}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Budget:</span>
                  <Badge variant="secondary">{phase.budget}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marketing Channels Mix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Mix Canaux Marketing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketingChannels.map((channel, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{channel.channel}</h3>
                  <Badge variant="outline">ROI {channel.roi}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Investment:</span>
                    <span className="font-medium">{channel.investment}</span>
                  </div>
                  <Progress value={parseInt(channel.investment)} className="h-2" />
                </div>
                
                <div className="text-sm">
                  <span className="font-medium mb-2 block">Tactiques:</span>
                  <div className="flex flex-wrap gap-1">
                    {channel.tactics.map((tactic, tacticIndex) => (
                      <Badge key={tacticIndex} variant="secondary" className="text-xs">
                        {tactic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs">
                  <span className="font-medium">KPIs:</span>
                  <ul className="mt-1 space-y-1">
                    {channel.kpis.map((kpi, kpiIndex) => (
                      <li key={kpiIndex} className="text-muted-foreground">• {kpi}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};