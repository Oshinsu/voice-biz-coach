import { ArrowRight, Brain, TrendingUp, Users, Zap, CheckCircle, Star, Mic, BarChart3, Shield, GraduationCap } from "lucide-react";
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

export function ByssHomepage() {
  const totalRevenue = scenarios.reduce((sum, scenario) => 
    sum + parseFloat(scenario.expectedRevenue.replace(/[€,]/g, '')), 0
  );
  const avgSuccessRate = Math.round(scenarios.reduce((sum, s) => sum + s.probability, 0) / scenarios.length);
  const totalCompanies = scenarios.length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-lg">
              <Brain className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Byss VNS</h1>
              <p className="text-xs text-muted-foreground">Virtual Negotiation Simulator</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-accent transition-colors font-medium">Accueil</Link>
            <Link to="/services" className="text-muted-foreground hover:text-accent transition-colors">Services</Link>
            <Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">Qui sommes-nous</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline">Connexion</Button>
            <Button className="bg-accent hover:bg-accent-dark text-accent-foreground">
              Essai gratuit
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-8 animate-bounce-gentle">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Powered by OpenAI GPT-4o Realtime</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in leading-tight">
                <span className="text-accent">Byss VNS</span><br />
                Virtual Negotiation
                <span className="text-accent block">Simulator</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-slide-up leading-relaxed">
                Formez vos étudiants aux techniques de négociation commerciale avec notre simulateur vocal IA de pointe. 
                Une technologie révolutionnaire pour l'enseignement commercial moderne.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-scale-in">
                <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-accent group text-lg px-8 py-4">
                  Découvrir la plateforme
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4">
                  Démo personnalisée
                </Button>
              </div>

              <div className="flex items-center gap-6 text-primary-foreground/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>IA vocale la plus avancée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Scénarios ultra-réalistes</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl"></div>
              <Card className="relative bg-card/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-xl">
                      <div className="p-3 bg-accent rounded-full">
                        <Mic className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">Session en cours</p>
                        <p className="text-sm text-muted-foreground">Négociation avec TechCorp</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progression</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-success/10 rounded-xl">
                        <div className="text-2xl font-bold text-success">85%</div>
                        <div className="text-xs text-muted-foreground">Taux de réussite</div>
                      </div>
                      <div className="text-center p-4 bg-accent/10 rounded-xl">
                        <div className="text-2xl font-bold text-accent">12</div>
                        <div className="text-xs text-muted-foreground">Objections gérées</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">{totalCompanies}</div>
                <div className="text-sm text-muted-foreground">Scénarios B2B</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">{(totalRevenue/1000000).toFixed(1)}M€</div>
                <div className="text-sm text-muted-foreground">Valeur des deals</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">{avgSuccessRate}%</div>
                <div className="text-sm text-muted-foreground">Taux moyen</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Disponibilité</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Technologie de pointe</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Propulsé par l'IA vocale<br />
              <span className="text-accent">la plus avancée</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre plateforme utilise OpenAI GPT-4o Realtime API, l'IA conversationnelle 
              la plus sophistiquée disponible, pour des simulations ultra-réalistes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">IA Conversationnelle</h3>
                <p className="text-muted-foreground">
                  Conversations vocales naturelles avec analyse en temps réel des émotions, 
                  du ton et des techniques de négociation utilisées.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Analytics Avancés</h3>
                <p className="text-muted-foreground">
                  Tableaux de bord détaillés pour suivre les progrès des étudiants, 
                  identifier les points d'amélioration et personnaliser l'enseignement.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Pédagogie Innovante</h3>
                <p className="text-muted-foreground">
                  Méthodes d'apprentissage immersives basées sur la pratique, 
                  adaptées aux programmes des écoles de commerce modernes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Scénarios de négociation B2B
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entraînez vos étudiants sur des cas réels d'entreprises avec données financières, 
              analyses SWOT et objections authentiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.slice(0, 6).map((scenario, index) => {
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
                        {scenario.description.slice(0, 120)}...
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
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
                        <span className="text-muted-foreground">Complexité</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent transition-all duration-500"
                              style={{ width: `${scenario.probability}%` }}
                            />
                          </div>
                          <span className="font-medium text-accent">{scenario.probability}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Link to={`/scenario/${scenario.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground group">
                          Lancer la simulation
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Tarification transparente</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Une solution complète pour votre établissement
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Accès illimité pour tous vos étudiants et formateurs
          </p>

          <Card className="bg-gradient-card border-0 shadow-2xl max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-accent mb-2">749€</div>
                <div className="text-lg text-muted-foreground">par mois</div>
                <div className="text-sm text-muted-foreground mt-2">+ coûts API OpenAI</div>
              </div>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Accès illimité pour tous les étudiants</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Tableaux de bord enseignants</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Analytics détaillés par étudiant</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Support prioritaire</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Intégration LMS</span>
                </div>
              </div>

              <Button className="w-full bg-accent hover:bg-accent-dark text-accent-foreground text-lg py-3">
                Demander une démo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Révolutionnez l'enseignement commercial
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Rejoignez les écoles de commerce qui forment déjà la nouvelle génération 
            de négociateurs avec l'IA vocale de pointe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-accent text-lg px-8 py-4">
              Démarrer l'essai gratuit
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4">
              Planifier une présentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent rounded-lg">
                  <Brain className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Byss VNS</h3>
                  <p className="text-xs text-muted-foreground">Virtual Negotiation Simulator</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                La plateforme de formation commerciale alimentée par l'IA vocale la plus avancée.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Plateforme</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-muted-foreground hover:text-accent transition-colors">Accueil</Link>
                <Link to="/services" className="block text-sm text-muted-foreground hover:text-accent transition-colors">Services</Link>
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-accent transition-colors">Qui sommes-nous</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-accent transition-colors">Contact</Link>
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-accent transition-colors">Confidentialité</Link>
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-accent transition-colors">CGU</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>hello@byss-vns.com</p>
                <p>+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Byss VNS. Tous droits réservés. Powered by OpenAI GPT-4o Realtime API.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}