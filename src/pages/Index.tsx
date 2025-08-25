import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { scenarios } from "@/data/scenarios";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Shield, 
  Zap, 
  Users,
  Building2,
  CalendarDays,
  CreditCard,
  PlayCircle 
} from "lucide-react";

const Index = () => {
  const getScenarioIcon = (scenarioId: string) => {
    const icons = {
      "kpi-performance": TrendingUp,
      "saas-crm": DollarSign,
      "marketplace-b2b": Target,
      "formation-digitale": Users,
      "cybersecurite-pme": Shield,
      "erp-manufacturing": Zap,
    };
    return icons[scenarioId as keyof typeof icons] || Target;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile": return "text-green-600 bg-green-100";
      case "Moyen": return "text-orange-600 bg-orange-100";
      case "Difficile": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sales Coach AI Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Maîtrisez vos techniques commerciales avec des scénarios réalistes et un accompagnement IA personnalisé
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Scénarios</p>
                  <p className="text-3xl font-bold text-primary">{scenarios.length}</p>
                </div>
                <Target className="h-12 w-12 text-primary/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CA Total Visé</p>
                  <p className="text-3xl font-bold text-accent">
                    {scenarios.reduce((total, s) => total + parseFloat(s.expectedRevenue.replace(/[€,]/g, '')), 0).toLocaleString('fr-FR')}€
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-accent/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/10 to-success/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux Succès Moyen</p>
                  <p className="text-3xl font-bold text-success">
                    {Math.round(scenarios.reduce((total, s) => total + s.probability, 0) / scenarios.length)}%
                  </p>
                </div>
                <TrendingUp className="h-12 w-12 text-success/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Entreprises</p>
                  <p className="text-3xl font-bold text-warning">{scenarios.length}</p>
                </div>
                <Building2 className="h-12 w-12 text-warning/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenarios Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Scénarios de Vente</h2>
            <p className="text-muted-foreground">
              Choisissez un scénario pour commencer votre entraînement commercial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario) => {
              const Icon = getScenarioIcon(scenario.id);
              
              return (
                <Card 
                  key={scenario.id} 
                  className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-secondary/20 border-border/50 hover:border-primary/50"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <Badge className={getDifficultyColor(scenario.difficulty)}>
                        {scenario.difficulty}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {scenario.title}
                    </CardTitle>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {scenario.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Company Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span className="font-medium">{scenario.company.name}</span>
                        <span className="text-muted-foreground">• {scenario.company.sector}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{scenario.company.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span>{scenario.company.revenue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3 text-muted-foreground" />
                          <span>{scenario.company.budget}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3 text-muted-foreground" />
                          <span>{scenario.company.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sales Goal */}
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                      <div className="text-center space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">OBJECTIF DE VENTE</p>
                        <p className="font-bold text-primary">{scenario.expectedRevenue}</p>
                        <p className="text-xs text-muted-foreground">{scenario.salesGoal}</p>
                      </div>
                    </div>

                    {/* Success Probability */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Probabilité de succès</span>
                        <span className="font-medium">{scenario.probability}%</span>
                      </div>
                      <Progress value={scenario.probability} className="h-2" />
                    </div>

                    {/* Action Button */}
                    <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={`/scenario/${scenario.id}`} className="flex items-center justify-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        Commencer le scénario
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Prêt à améliorer vos performances commerciales ?</h3>
              <p className="text-muted-foreground mb-6">
                Chaque scénario inclut des données d'entreprise réalistes, des analyses SWOT détaillées, 
                et un coach IA vocal pour vous accompagner dans votre apprentissage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  🎯 Scénarios réalistes
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  🤖 Coach IA vocal
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  📊 Analytics détaillées
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  💼 Entreprises variées
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;