import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Building2, User, Package, Target, TrendingUp, AlertCircle, Calculator, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useScenarios } from "@/hooks/useScenarios";
import { useSalesStore } from "@/store/salesStore";
import { useEffect, useState } from "react";
import { EnhancedVoiceCoach } from "@/components/EnhancedVoiceCoach";

export default function ScenarioPage() {
  const { id } = useParams();
  const { scenarios, loading, error, getScenarioById } = useScenarios();
  const scenario = id ? getScenarioById(id) : null;
  const { setScenario } = useSalesStore();
  const [activeSection, setActiveSection] = useState("company");

  useEffect(() => {
    if (scenario) {
      setScenario(scenario);
    }
  }, [scenario, setScenario]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement du scénario...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!scenario) {
    return <Navigate to="/scenarios" replace />;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "bg-green-100 text-green-800";
      case "Intermédiaire": return "bg-orange-100 text-orange-800";
      case "Avancé": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const menuItems = [
    { id: "company", label: "Entreprise", icon: Building2 },
    { id: "contact", label: "Contact", icon: User },
    { id: "product", label: "Produit", icon: Package },
    { id: "analysis", label: "Analyses", icon: BarChart3 },
    { id: "objections", label: "Objections", icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header avec métriques */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" asChild>
              <Link to="/scenarios" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour aux scénarios
              </Link>
            </Button>
            <Badge className={getDifficultyColor(scenario.difficulty)}>
              {scenario.difficulty}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{scenario.title}</h1>
            <p className="text-muted-foreground text-lg">{scenario.description}</p>
            
            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Probabilité</p>
                    <p className="text-2xl font-bold text-primary">{scenario.success_probability}%</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-success/10 to-success/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Secteur</p>
                    <p className="text-2xl font-bold text-success">{scenario.company_sector}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Budget Client</p>
                    <p className="text-2xl font-bold text-accent">{scenario.budget_range}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Taille</p>
                    <p className="text-2xl font-bold text-warning">{scenario.company_size}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r bg-card/30 backdrop-blur-sm min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Progress */}
            <div className="mt-8 space-y-4">
              <h3 className="font-medium text-sm">Progression vente</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Découverte</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Démonstration</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Négociation</span>
                  <span>30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>

            {/* Objectifs rapides */}
            <div className="mt-8 p-4 bg-primary/5 rounded-lg">
              <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Objectif principal
              </h3>
              <p className="text-xs text-muted-foreground">
                {scenario.main_objectives[0] || "Voir détails du scénario"}
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === "company" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Analyse de l'entreprise</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations générales */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Nom</TableCell>
                          <TableCell>{scenario.company_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Secteur</TableCell>
                          <TableCell>{scenario.company_sector}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Taille</TableCell>
                          <TableCell>{scenario.company_size}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Budget</TableCell>
                          <TableCell className="font-bold text-success">{scenario.budget_range}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Description et contexte */}
                <Card>
                  <CardHeader>
                    <CardTitle>Description & Contexte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Objectifs principaux</h4>
                      <div className="flex flex-wrap gap-2">
                        {scenario.main_objectives.slice(0, 2).map((objective, index) => (
                          <Badge key={index} variant="outline">{objective}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pain Points */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      Points de douleur identifiés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scenario.pain_points.map((pain, index) => (
                        <div key={index} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <AlertCircle className="h-3 w-3 text-destructive" />
                            </div>
                            <p className="text-sm">{pain}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Informations entreprise</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Détails complémentaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Outils disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {scenario.available_tools.map((tool, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Objectifs principaux</h4>
                    <div className="space-y-2">
                      {scenario.main_objectives.map((objective, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-success/5 rounded">
                          <Target className="h-4 w-4 text-success mt-0.5" />
                          <span className="text-sm">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "product" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Analyse du scénario</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Métriques clés */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Métriques de performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">Probabilité de succès</p>
                        <p className="text-2xl font-bold text-primary">{scenario.success_probability}%</p>
                      </div>
                      <div className="text-center p-4 bg-success/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">Difficulté</p>
                        <Badge className={getDifficultyColor(scenario.difficulty)}>{scenario.difficulty}</Badge>
                      </div>
                      <div className="text-center p-4 bg-accent/5 rounded-lg">
                        <p className="text-sm text-muted-foreground">Budget disponible</p>
                        <p className="text-lg font-bold text-accent">{scenario.budget_range}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Outils disponibles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Outils disponibles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scenario.available_tools.map((tool, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-primary/5 rounded">
                          <Calculator className="h-4 w-4 text-primary" />
                          <span className="text-sm">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Points de douleur */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      Points de douleur
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scenario.pain_points.slice(0, 3).map((pain, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-destructive/5 rounded">
                          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                          <span className="text-sm">{pain}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "analysis" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Vue d'ensemble</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Objectifs détaillés */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Objectifs détaillés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scenario.main_objectives.map((objective, index) => (
                        <div key={index} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-primary">{index + 1}</span>
                            </div>
                            <p className="text-sm">{objective}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Outils disponibles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-success" />
                      Outils d'aide à la vente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scenario.available_tools.map((tool, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-success/5 rounded-lg">
                          <Calculator className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Points de douleur complets */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      Défis à relever
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scenario.pain_points.map((pain, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                          <span className="text-sm">{pain}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "objections" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Conseils pour ce scénario</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Conseils stratégiques */}
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Target className="h-5 w-5" />
                      Approche recommandée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">1</span>
                        <div>
                          <h4 className="font-medium">Qualification initiale</h4>
                          <p className="text-sm text-muted-foreground">Comprendre leurs défis actuels et leurs contraintes budgétaires</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">2</span>
                        <div>
                          <h4 className="font-medium">Démonstration ciblée</h4>
                          <p className="text-sm text-muted-foreground">Adapter la présentation aux points de douleur identifiés</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">3</span>
                        <div>
                          <h4 className="font-medium">Négociation finale</h4>
                          <p className="text-sm text-muted-foreground">Présenter une proposition personnalisée avec ROI clairement défini</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Points d'attention */}
                <Card className="bg-gradient-to-r from-warning/5 to-warning/10 border-warning/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-warning">
                      <AlertCircle className="h-5 w-5" />
                      Points d'attention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scenario.difficulty === "Débutant" && (
                        <p className="text-sm">Ce scénario est idéal pour s'entraîner aux techniques de base de vente et de qualification.</p>
                      )}
                      {scenario.difficulty === "Intermédiaire" && (
                        <p className="text-sm">Scénario nécessitant une bonne maîtrise des objections et des techniques de négociation.</p>
                      )}
                      {scenario.difficulty === "Avancé" && (
                        <p className="text-sm">Scénario complexe demandant des compétences avancées en vente consultative et gestion des parties prenantes.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Voice Coach Widget */}
      <EnhancedVoiceCoach scenario={scenario} open={true} onToggle={() => {}} />
    </div>
  );
}