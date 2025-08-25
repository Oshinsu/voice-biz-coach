import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Target, Users, DollarSign, TrendingUp, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getScenarioById } from "@/data/scenarios";
import { VoiceCoach } from "@/components/VoiceCoach";
import { useSalesStore } from "@/store/salesStore";
import { useEffect } from "react";

export default function ScenarioPage() {
  const { id } = useParams();
  const scenario = id ? getScenarioById(id) : null;
  const { setScenario, setMode } = useSalesStore();

  useEffect(() => {
    if (scenario) {
      setScenario(scenario);
      setMode('roleplay');
    }
  }, [scenario, setScenario, setMode]);

  if (!scenario) {
    return <Navigate to="/" replace />;
  }

  const getScenarioIcon = (scenarioId: string) => {
    const icons = {
      "kpi-performance": TrendingUp,
      "ca-benefice": DollarSign,
      "etude-marche": Target,
      "swot-analysis": Shield,
      "pestel-analysis": Zap,
      "usp-positioning": Users,
    };
    return icons[scenarioId as keyof typeof icons] || Target;
  };

  const Icon = getScenarioIcon(scenario.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux scénarios
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{scenario.title}</h1>
                <p className="text-muted-foreground">{scenario.description}</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            {scenario.expectedRevenue} de CA visé
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Context */}
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="company" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="company">Entreprise</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="product">Produit</TabsTrigger>
              </TabsList>

              <TabsContent value="company" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {scenario.company.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>Secteur:</strong> {scenario.company.sector}</div>
                      <div><strong>Taille:</strong> {scenario.company.size}</div>
                      <div><strong>CA:</strong> {scenario.company.revenue}</div>
                      <div><strong>Lieu:</strong> {scenario.company.location}</div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm mb-2"><strong>Description:</strong></p>
                      <p className="text-sm text-muted-foreground">{scenario.company.description}</p>
                    </div>
                    <div>
                      <p className="text-sm mb-2"><strong>Pain Points:</strong></p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {scenario.company.painPoints.map((pain, index) => (
                          <li key={index}>• {pain}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div><strong>Solution actuelle:</strong> {scenario.company.currentSolution}</div>
                      <div><strong>Budget:</strong> {scenario.company.budget}</div>
                      <div><strong>Timeline:</strong> {scenario.company.timeline}</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {scenario.interlocutor.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <Badge variant="outline">{scenario.interlocutor.role}</Badge>
                    </div>
                    <div>
                      <p className="text-sm mb-1"><strong>Personnalité:</strong></p>
                      <p className="text-sm text-muted-foreground">{scenario.interlocutor.personality}</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1"><strong>Style de communication:</strong></p>
                      <p className="text-sm text-muted-foreground">{scenario.interlocutor.communicationStyle}</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1"><strong>Pouvoir de décision:</strong></p>
                      <p className="text-sm text-muted-foreground">{scenario.interlocutor.decisionPower}</p>
                    </div>
                    <div>
                      <p className="text-sm mb-2"><strong>Priorités:</strong></p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {scenario.interlocutor.priorities.map((priority, index) => (
                          <li key={index}>• {priority}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm mb-2"><strong>Préoccupations:</strong></p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {scenario.interlocutor.concerns.map((concern, index) => (
                          <li key={index}>• {concern}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="product" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      {scenario.product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{scenario.product.description}</p>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Pricing:</p>
                      <div className="grid grid-cols-1 gap-1 text-sm">
                        <div>Starter: {scenario.product.pricing.starter}</div>
                        <div>Professional: {scenario.product.pricing.professional}</div>
                        <div>Enterprise: {scenario.product.pricing.enterprise}</div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Fonctionnalités clés:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {scenario.product.keyFeatures.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Avantages concurrentiels:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {scenario.product.competitiveAdvantages.map((advantage, index) => (
                          <li key={index}>• {advantage}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div><strong>ROI:</strong> {scenario.product.roi}</div>
                      <div><strong>Implémentation:</strong> {scenario.product.implementationTime}</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Middle Panel - Voice Coach */}
          <div className="lg:col-span-1">
            <VoiceCoach />
          </div>

          {/* Right Panel - Analysis & Objectives */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Objectifs de vente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Objectif de vente</p>
                    <p className="font-bold text-lg">{scenario.salesGoal}</p>
                  </div>
                  <ul className="space-y-2">
                    {scenario.objectives.map((objective, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  SWOT Analyses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="our-product" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="our-product">Notre produit</TabsTrigger>
                    <TabsTrigger value="their-situation">Leur situation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="our-product" className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Forces:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.swot.strengths.map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-600 mb-1">Faiblesses:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.swot.weaknesses.map((weakness, index) => (
                          <li key={index}>• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">Opportunités:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.swot.opportunities.map((opportunity, index) => (
                          <li key={index}>• {opportunity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-600 mb-1">Menaces:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.swot.threats.map((threat, index) => (
                          <li key={index}>• {threat}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="their-situation" className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Forces actuelles:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.competitorSwot.strengths.map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-600 mb-1">Faiblesses:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.competitorSwot.weaknesses.map((weakness, index) => (
                          <li key={index}>• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">Opportunités:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.competitorSwot.opportunities.map((opportunity, index) => (
                          <li key={index}>• {opportunity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-600 mb-1">Menaces:</p>
                      <ul className="text-xs space-y-1">
                        {scenario.competitorSwot.threats.map((threat, index) => (
                          <li key={index}>• {threat}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Objections probables</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scenario.probableObjections.map((objection, index) => (
                    <li key={index} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      "{objection}"
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}