import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Shield } from 'lucide-react';

interface SwotAnalysisProps {
  scenarioId: string;
}

export const SwotAnalysis: React.FC<SwotAnalysisProps> = ({ scenarioId }) => {
  // Sample SWOT data for the Byss VNS scenario
  const swotData = {
    strengths: [
      "Solution complète et innovante",
      "Équipe technique experte",
      "ROI démontré dans le secteur éducatif",
      "Interface utilisateur intuitive"
    ],
    weaknesses: [
      "Marque encore peu connue",
      "Investissement initial important",
      "Courbe d'apprentissage pour les équipes",
      "Dépendance technologique"
    ],
    opportunities: [
      "Transformation digitale accélérée",
      "Demande croissante pour l'IA",
      "Partenariats avec institutions éducatives",
      "Expansion internationale"
    ],
    threats: [
      "Concurrence des géants tech",
      "Évolutions réglementaires",
      "Résistance au changement",
      "Cycles budgétaires longs"
    ]
  };

  const sections = [
    {
      title: "Forces",
      icon: TrendingUp,
      items: swotData.strengths,
      variant: "default" as const,
      color: "text-green-600"
    },
    {
      title: "Faiblesses", 
      icon: TrendingDown,
      items: swotData.weaknesses,
      variant: "destructive" as const,
      color: "text-red-600"
    },
    {
      title: "Opportunités",
      icon: Target,
      items: swotData.opportunities,
      variant: "secondary" as const,
      color: "text-blue-600"
    },
    {
      title: "Menaces",
      icon: Shield,
      items: swotData.threats,
      variant: "outline" as const,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Card key={section.title} className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IconComponent className={`h-5 w-5 ${section.color}`} />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full mt-2.5 flex-shrink-0 opacity-60" />
                      <Badge variant={section.variant} className="text-xs font-normal">
                        {item}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};