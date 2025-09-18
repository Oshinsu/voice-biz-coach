import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";
import { SwotAnalysis } from '@/data/scenarios';
import { useScenarios } from '@/hooks/useScenarios';

interface SwotMatrixProps {
  scenarioId: string;
  variant?: "default" | "competitive";
}

export function SwotMatrix({ scenarioId, variant = "default" }: SwotMatrixProps) {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);

  if (!scenario) {
    return <div>Scénario non trouvé</div>;
  }

  const swot = variant === "competitive" ? scenario.competitorSwot : scenario.swot;
  const title = variant === "competitive" 
    ? `Analyse SWOT Concurrentiel - ${scenario.company?.name}` 
    : `Analyse SWOT - ${scenario.product?.name}`;

  if (!swot) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          Analyse SWOT en cours de développement pour ce scénario...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="border-success/20 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <TrendingUp className="h-5 w-5" />
              Forces
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {swot.strengths.map((strength, index) => (
              <div key={index} className="text-sm">
                • {strength}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <TrendingDown className="h-5 w-5" />
              Faiblesses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {swot.weaknesses.map((weakness, index) => (
              <div key={index} className="text-sm">
                • {weakness}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Target className="h-5 w-5" />
              Opportunités
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {swot.opportunities.map((opportunity, index) => (
              <div key={index} className="text-sm">
                • {opportunity}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Threats */}
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Menaces
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {swot.threats.map((threat, index) => (
              <div key={index} className="text-sm">
                • {threat}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}