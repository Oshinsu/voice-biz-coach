import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Building2, User, Package, Target, TrendingUp, AlertCircle, Calculator, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getScenarioById } from "@/data/scenarios";
import { useSalesStore } from "@/store/salesStore";
import { useEffect, useState } from "react";
import { EnhancedVoiceCoach } from "@/components/EnhancedVoiceCoach";

export default function ScenarioPage() {
  const { id } = useParams();
  const scenario = id ? getScenarioById(id) : null;
  const { setScenario } = useSalesStore();
  const [activeSection, setActiveSection] = useState("company");

  useEffect(() => {
    if (scenario) {
      setScenario(scenario);
    }
  }, [scenario, setScenario]);

  if (!scenario) {
    return <Navigate to="/" replace />;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile": return "bg-green-100 text-green-800";
      case "Moyen": return "bg-orange-100 text-orange-800";
      case "Difficile": return "bg-red-100 text-red-800";
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
              <Link to="/" className="flex items-center gap-2">
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
                    <p className="text-sm text-muted-foreground">CA Visé</p>
                    <p className="text-2xl font-bold text-primary">{scenario.expectedRevenue}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-success/10 to-success/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Probabilité</p>
                    <p className="text-2xl font-bold text-success">{scenario.probability}%</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Budget Client</p>
                    <p className="text-2xl font-bold text-accent">{scenario.company.budget}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="text-2xl font-bold text-warning">{scenario.company.timeline}</p>
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
                {scenario.salesGoal}
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
                          <TableCell>{scenario.company.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Secteur</TableCell>
                          <TableCell>{scenario.company.sector}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Taille</TableCell>
                          <TableCell>{scenario.company.size}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Chiffre d'affaires</TableCell>
                          <TableCell>{scenario.company.revenue}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Localisation</TableCell>
                          <TableCell>{scenario.company.location}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Budget</TableCell>
                          <TableCell className="font-bold text-success">{scenario.company.budget}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Timeline</TableCell>
                          <TableCell className="font-bold text-warning">{scenario.company.timeline}</TableCell>
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
                      <h4 className="font-medium mb-2">Activité principale</h4>
                      <p className="text-sm text-muted-foreground">{scenario.company.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Solution actuelle</h4>
                      <Badge variant="outline">{scenario.company.currentSolution}</Badge>
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
                      {scenario.company.painPoints.map((pain, index) => (
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
                <h2 className="text-2xl font-bold">Profil du contact</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations personnelles */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Nom</TableCell>
                          <TableCell>{scenario.interlocutor.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Poste</TableCell>
                          <TableCell>{scenario.interlocutor.role}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Expérience</TableCell>
                          <TableCell>{scenario.interlocutor.experience}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pouvoir de décision</TableCell>
                          <TableCell className="font-bold text-primary">{scenario.interlocutor.decisionPower}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Profil psychologique */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profil psychologique</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Personnalité</h4>
                      <p className="text-sm text-muted-foreground">{scenario.interlocutor.personality}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Style de communication</h4>
                      <p className="text-sm text-muted-foreground">{scenario.interlocutor.communicationStyle}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Priorités et motivations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-success">Priorités & Motivations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Priorités</h4>
                        <div className="flex flex-wrap gap-2">
                          {scenario.interlocutor.priorities.map((priority, index) => (
                            <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                              {priority}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Motivations</h4>
                        <div className="flex flex-wrap gap-2">
                          {scenario.interlocutor.motivations.map((motivation, index) => (
                            <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                              {motivation}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Préoccupations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-destructive">Préoccupations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scenario.interlocutor.concerns.map((concern, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-destructive/5 rounded">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span className="text-sm">{concern}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "product" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Notre Produit</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations produit */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>{scenario.product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{scenario.product.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">ROI</h4>
                        <Badge className="bg-success/10 text-success">{scenario.product.roi}</Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Implémentation</h4>
                        <Badge className="bg-warning/10 text-warning">{scenario.product.implementationTime}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Grille tarifaire
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plan</TableHead>
                          <TableHead>Prix</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Starter</TableCell>
                          <TableCell className="font-medium">{scenario.product.pricing.starter}</TableCell>
                        </TableRow>
                        <TableRow className="bg-primary/5">
                          <TableCell>Professional</TableCell>
                          <TableCell className="font-bold text-primary">{scenario.product.pricing.professional}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Enterprise</TableCell>
                          <TableCell className="font-medium">{scenario.product.pricing.enterprise}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Fonctionnalités */}
                <Card>
                  <CardHeader>
                    <CardTitle>Fonctionnalités clés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scenario.product.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-primary/5 rounded">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Avantages concurrentiels */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-success" />
                      Avantages concurrentiels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scenario.product.competitiveAdvantages.map((advantage, index) => (
                        <div key={index} className="p-4 bg-success/5 border border-success/20 rounded-lg">
                          <div className="flex items-start gap-3">
                            <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                            <p className="text-sm">{advantage}</p>
                          </div>
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
                <h2 className="text-2xl font-bold">Analyses SWOT</h2>
              </div>

              <Tabs defaultValue="notre-produit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="notre-produit">Notre Produit</TabsTrigger>
                  <TabsTrigger value="leur-situation">Leur Situation</TabsTrigger>
                </TabsList>

                <TabsContent value="notre-produit" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Forces */}
                    <Card className="border-success/20">
                      <CardHeader>
                        <CardTitle className="text-success">Forces</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.swot.strengths.map((strength, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-success/5 rounded">
                              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                              <span className="text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Faiblesses */}
                    <Card className="border-destructive/20">
                      <CardHeader>
                        <CardTitle className="text-destructive">Faiblesses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.swot.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-destructive/5 rounded">
                              <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                              <span className="text-sm">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Opportunités */}
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-primary">Opportunités</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.swot.opportunities.map((opportunity, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-primary/5 rounded">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <span className="text-sm">{opportunity}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Menaces */}
                    <Card className="border-warning/20">
                      <CardHeader>
                        <CardTitle className="text-warning">Menaces</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.swot.threats.map((threat, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-warning/5 rounded">
                              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                              <span className="text-sm">{threat}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="leur-situation" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Forces concurrence */}
                    <Card className="border-success/20">
                      <CardHeader>
                        <CardTitle className="text-success">Forces actuelles</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.competitorSwot.strengths.map((strength, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-success/5 rounded">
                              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                              <span className="text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Faiblesses concurrence */}
                    <Card className="border-destructive/20">
                      <CardHeader>
                        <CardTitle className="text-destructive">Faiblesses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.competitorSwot.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-destructive/5 rounded">
                              <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                              <span className="text-sm">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Opportunités concurrence */}
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-primary">Opportunités</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.competitorSwot.opportunities.map((opportunity, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-primary/5 rounded">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <span className="text-sm">{opportunity}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Menaces concurrence */}
                    <Card className="border-warning/20">
                      <CardHeader>
                        <CardTitle className="text-warning">Menaces</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {scenario.competitorSwot.threats.map((threat, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-warning/5 rounded">
                              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                              <span className="text-sm">{threat}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeSection === "objections" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Objections Probables</h2>
              </div>

              <div className="space-y-4">
                {scenario.probableObjections.map((objection, index) => (
                  <Card key={index} className="border-l-4 border-l-destructive">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-destructive/10 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Objection #{index + 1}</h3>
                          <p className="text-muted-foreground italic">"{objection}"</p>
                          
                          {/* Réponse suggérée */}
                          <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg">
                            <h4 className="font-medium text-success mb-2">Réponse suggérée :</h4>
                            <p className="text-sm text-muted-foreground">
                              {index === 0 && "Je comprends votre préoccupation sur le coût. Regardons ensemble le ROI que vous pourriez obtenir..."}
                              {index === 1 && "C'est une excellente base que vous avez avec Google Analytics. Notre solution va plus loin en..."}
                              {index > 1 && "Analysons ensemble cette objection et trouvons la meilleure approche pour y répondre."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Critères de succès */}
              <Card className="bg-gradient-to-r from-success/5 to-success/10 border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <Target className="h-5 w-5" />
                    Critères de succès
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {scenario.successCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-success/5 rounded">
                        <Target className="h-4 w-4 text-success" />
                        <span className="text-sm">{criteria}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Voice Coach Widget */}
      <EnhancedVoiceCoach scenario={scenario} isOpen={true} onToggle={() => {}} />
    </div>
  );
}