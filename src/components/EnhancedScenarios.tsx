import { useState } from "react";
import { ArrowRight, BarChart3, Users, TrendingUp, GraduationCap, Shield, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scenarios } from "@/data/scenarios";

const getScenarioIcon = (scenarioId: string) => {
  const iconMap: { [key: string]: any } = {
    "kpi-performance": BarChart3,
    "saas-crm": Users,
    "marketplace-b2b": TrendingUp,
    "formation-digitale": GraduationCap,
    "cybersecurite-pme": Shield,
    "erp-manufacturing": BarChart3,
  };
  return iconMap[scenarioId] || BarChart3;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Facile":
      return "bg-success text-success-foreground";
    case "Moyen":
      return "bg-warning text-warning-foreground";
    case "Difficile":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const popularityIndicators = [
  { threshold: 80, label: "🔥 Très populaire", color: "text-destructive" },
  { threshold: 60, label: "⭐ Populaire", color: "text-warning" },
  { threshold: 40, label: "👍 Apprécié", color: "text-success" }
];

export function EnhancedScenarios() {
  const [filter, setFilter] = useState<string>("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const difficulties = ["all", "Facile", "Moyen", "Difficile"];
  
  const filteredScenarios = scenarios.filter(scenario => 
    filter === "all" || scenario.difficulty === filter
  );

  const featuredScenario = scenarios[0]; // Premier scénario comme "featured"

  return (
    <section className="py-20 px-6 bg-gradient-feature relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 animate-bounce-gentle">
            Scénarios interactifs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Catalogue de négociations B2B
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            Entraînez vos étudiants sur des cas réels d'entreprises avec données financières, 
            analyses SWOT et objections authentiques.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 bg-background/70 backdrop-blur-sm p-2 rounded-full border border-border/50">
            <Filter className="h-4 w-4 text-muted-foreground ml-2" />
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={filter === difficulty ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(difficulty)}
                className={`rounded-full ${filter === difficulty ? 'bg-accent text-accent-foreground' : ''}`}
              >
                {difficulty === "all" ? "Tous" : difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Scenario */}
        {filter === "all" && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                🎯 Scénario recommandé
              </Badge>
            </div>
            <Card className="bg-gradient-card border-0 shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
              <div className="relative z-10 lg:flex">
                <div className="lg:w-2/3 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-primary/20 rounded-xl">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{featuredScenario.title}</h3>
                      <p className="text-muted-foreground">{featuredScenario.company.name}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className={getDifficultyColor(featuredScenario.difficulty)}>
                        {featuredScenario.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {featuredScenario.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-background/50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-accent">{featuredScenario.expectedRevenue}</div>
                      <div className="text-sm text-muted-foreground">Valeur du deal</div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-accent">{featuredScenario.probability}%</div>
                      <div className="text-sm text-muted-foreground">Taux de réussite</div>
                    </div>
                  </div>
                  
                  <Link to={`/scenario/${featuredScenario.id}`}>
                    <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                      Commencer maintenant
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className="lg:w-1/3 p-8 bg-primary/5 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                      <Star className="h-12 w-12 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Popularité</div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < 4 ? 'text-warning fill-current' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScenarios.slice(filter === "all" ? 1 : 0, filter === "all" ? 7 : 6).map((scenario, index) => {
            const Icon = getScenarioIcon(scenario.id);
            const popularity = popularityIndicators.find(p => scenario.probability >= p.threshold);
            
            return (
              <Card 
                key={scenario.id} 
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-background border border-border/50 animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(scenario.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <CardHeader className="space-y-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getDifficultyColor(scenario.difficulty)}>
                        {scenario.difficulty}
                      </Badge>
                      {popularity && (
                        <Badge variant="outline" className={`text-xs ${popularity.color} border-current`}>
                          {popularity.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {scenario.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {scenario.description.slice(0, 120)}...
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Entreprise</span>
                      <span className="font-medium">{scenario.company.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Valeur deal</span>
                      <span className="font-medium text-accent">{scenario.expectedRevenue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Succès attendu</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${hoveredCard === scenario.id ? 'bg-accent' : 'bg-accent/70'}`}
                            style={{ width: `${scenario.probability}%` }}
                          />
                        </div>
                        <span className="font-medium text-accent">{scenario.probability}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Link to={`/scenario/${scenario.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground group/btn">
                        Lancer la simulation
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Show All Button */}
        {filter !== "all" && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setFilter("all")}
              className="border-accent/30 text-accent hover:bg-accent/10"
            >
              Voir tous les scénarios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}