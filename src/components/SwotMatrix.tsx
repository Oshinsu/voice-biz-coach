import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";
import { DetailedSwotAnalysis } from "@/data/enrichedScenarios";

interface SwotMatrixProps {
  title: string;
  swot: DetailedSwotAnalysis;
  variant?: "default" | "competitive";
}

export function SwotMatrix({ title, swot, variant = "default" }: SwotMatrixProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "High": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const averageScore = (items: { score: number }[]) => 
    items.reduce((sum, item) => sum + item.score, 0) / items.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{averageScore(swot.strengths).toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Forces</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{averageScore(swot.weaknesses).toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Faiblesses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{averageScore(swot.opportunities).toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Opportunités</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{averageScore(swot.threats).toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Menaces</div>
          </div>
        </div>
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
          <CardContent className="space-y-4">
            {swot.strengths.map((strength, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium flex-1">{strength.point}</span>
                  <Badge className={getImpactColor(strength.impact)} variant="secondary">
                    {strength.impact}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{strength.evidence}</div>
                <Progress value={strength.score * 10} className="h-2" />
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
          <CardContent className="space-y-4">
            {swot.weaknesses.map((weakness, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium flex-1">{weakness.point}</span>
                  <Badge className={getImpactColor(weakness.impact)} variant="secondary">
                    {weakness.impact}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{weakness.mitigation}</div>
                <Progress value={weakness.score * 10} className="h-2" />
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
          <CardContent className="space-y-4">
            {swot.opportunities.map((opportunity, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium flex-1">{opportunity.point}</span>
                  <Badge className={getProbabilityColor(opportunity.probability)} variant="secondary">
                    {opportunity.probability}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">Échéance: {opportunity.timeframe}</div>
                <Progress value={opportunity.score * 10} className="h-2" />
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
          <CardContent className="space-y-4">
            {swot.threats.map((threat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium flex-1">{threat.point}</span>
                  <Badge className={getImpactColor(threat.likelihood)} variant="secondary">
                    {threat.likelihood}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{threat.impact}</div>
                <Progress value={threat.score * 10} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}