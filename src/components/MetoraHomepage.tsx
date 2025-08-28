import { ArrowRight, BarChart3, Target, TrendingUp, Users, Zap, CheckCircle, Star, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScenarios } from "@/hooks/useScenarios";

const getScenarioIcon = (scenarioId: string) => {
  const iconMap: { [key: string]: any } = {
    "retail-personalization": BarChart3,
    "digital-agency": Users,
    "fintech-startup": Target,
    "saas-hr-tool": TrendingUp,
    "byss-vns-school": GraduationCap,
    "consulting-firm": BarChart3,
  };
  return iconMap[scenarioId] || BarChart3;
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Débutant":
      return "bg-success text-success-foreground";
    case "Intermédiaire":
      return "bg-warning text-warning-foreground";
    case "Avancé":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function MetoraHomepage() {
  const { scenarios, loading } = useScenarios();
  
  const totalRevenue = scenarios.reduce((sum, scenario) => {
    const revenue = scenario.expected_revenue ? 
      parseFloat(scenario.expected_revenue.replace(/[€,]/g, '')) : 0;
    return sum + revenue;
  }, 0);
  const avgSuccessRate = scenarios.length > 0 ? 
    Math.round(scenarios.reduce((sum, s) => sum + s.success_probability, 0) / scenarios.length) : 0;
  const totalCompanies = scenarios.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
          <p className="mt-4 text-primary-foreground/80">Chargement des scénarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6 animate-bounce-gentle">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Nouvelle plateforme de sales coaching</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Maîtrisez l'art de la
            <span className="text-accent block">vente B2B</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto animate-slide-up">
            Entraînez-vous sur des scénarios de vente réels avec notre coach vocal IA. 
            Analysez vos performances, améliorez vos techniques et maximisez vos taux de conversion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
            <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-accent group">
              Commencer l'entraînement
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Voir la démo
            </Button>
          </div>

          {/* Global Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
            <Card className="bg-card/80 backdrop-blur-sm border-primary-foreground/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">{totalCompanies}</div>
                <div className="text-sm text-muted-foreground">Scénarios disponibles</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm border-primary-foreground/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">{(totalRevenue/1000).toFixed(0)}k€</div>
                <div className="text-sm text-muted-foreground">CA potentiel total</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm border-primary-foreground/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">{avgSuccessRate}%</div>
                <div className="text-sm text-muted-foreground">Taux de succès moyen</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm border-primary-foreground/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Secteurs couverts</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scenarios Grid */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Scénarios de vente B2B
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque scénario est basé sur des situations réelles avec des entreprises, 
              interlocuteurs et objections authentiques.
            </p>
          </div>

          {loading ? (
            <div className="col-span-full text-center">Chargement des scénarios...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scenarios.map((scenario, index) => {
                const Icon = getScenarioIcon(scenario.id);
                return (
                  <Card 
                    key={scenario.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty}
                        </Badge>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {scenario.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {scenario.description}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Entreprise</span>
                          <span className="font-medium">{scenario.company_name}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Secteur</span>
                          <span className="font-medium">{scenario.company_sector}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">CA visé</span>
                          <span className="font-medium text-accent">{scenario.expected_revenue || 'Non défini'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Probabilité</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-accent transition-all duration-500"
                                style={{ width: `${scenario.success_probability}%` }}
                              />
                            </div>
                            <span className="font-medium text-accent">{scenario.success_probability}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Link to={`/scenario/${scenario.id}`}>
                          <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground group">
                            Commencer le scénario
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fonctionnalités avancées
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour développer vos compétences commerciales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-card border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Coach vocal IA</h3>
                <p className="text-muted-foreground">
                  Entraînez-vous avec un coach IA qui s'adapte à chaque scénario et vous donne des feedbacks personnalisés
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Analytics avancés</h3>
                <p className="text-muted-foreground">
                  Analysez vos performances avec des métriques détaillées et identifiez vos axes d'amélioration
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Scénarios réalistes</h3>
                <p className="text-muted-foreground">
                  Basés sur de vraies entreprises avec des données financières, analyses SWOT et objections authentiques
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dupont",
                role: "Business Developer",
                company: "TechCorp",
                content: "Grâce aux scénarios Métora, j'ai amélioré mon taux de conversion de 40%. Les situations sont ultra-réalistes.",
                rating: 5
              },
              {
                name: "Pierre Martin",
                role: "Sales Manager",
                company: "InnovSolutions",
                content: "Le coach vocal m'a aidé à mieux gérer les objections. C'est comme avoir un mentor disponible 24/7.",
                rating: 5
              },
              {
                name: "Sophie Chen",
                role: "Account Executive",
                company: "DataFlow",
                content: "Les analyses SWOT détaillées m'ont permis de mieux préparer mes rendez-vous clients. Indispensable !",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Prêt à révolutionner vos ventes ?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Rejoignez des centaines de commerciaux qui améliorent leurs performances chaque jour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-accent">
              Commencer gratuitement
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Planifier une démo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}