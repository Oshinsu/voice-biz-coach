import { ArrowRight, Brain, TrendingUp, Users, Zap, CheckCircle, Star, Mic, BarChart3, Shield, GraduationCap, Building, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scenarios } from "@/data/scenarios";
import { EnhancedHeader } from "./EnhancedHeader";
import { EnhancedStats } from "./EnhancedStats";
import { TrustElements } from "./TrustElements";


const getScenarioIcon = (scenarioId: string) => {
  const iconMap: { [key: string]: any } = {
    "byss-vns-school": GraduationCap,
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
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Enhanced Header */}
      <EnhancedHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-3 mb-8 animate-bounce-gentle hover:bg-accent/15 transition-all duration-300 cursor-pointer group">
                <Zap className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-accent">Powered by OpenAI GPT-4o Realtime</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse ml-2"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in leading-tight">
                <span className="text-accent bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Byss VNS</span><br />
                <span className="relative">
                  Virtual Negotiation
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground to-accent bg-clip-text text-transparent blur-sm"></div>
                </span>
                <span className="text-accent block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Simulator</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-slide-up leading-relaxed">
                Formez vos étudiants aux techniques de négociation commerciale avec notre simulateur vocal IA de pointe. 
                Une technologie révolutionnaire pour l'enseignement commercial moderne.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-scale-in">
                <Button size="lg" className="bg-gradient-cta hover:shadow-lg hover:shadow-accent/30 text-accent-foreground group text-lg px-8 py-4 hover:scale-105 transition-all duration-300" asChild>
                  <Link to="/scenarios">
                      Découvrir la plateforme  
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300" asChild>
                  <Link to="/auth">
                    Essai gratuit
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/60">
                <div className="flex items-center gap-2 animate-slide-in-left">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>IA vocale la plus avancée</span>
                </div>
                <div className="flex items-center gap-2 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Scénarios ultra-réalistes</span>
                </div>
                <div className="flex items-center gap-2 animate-slide-in-left" style={{ animationDelay: '400ms' }}>
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Analytics en temps réel</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-accent-light/20 rounded-3xl blur-3xl animate-pulse-glow"></div>
              <Card className="relative bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden hover:shadow-accent/20 transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20">
                      <div className="p-3 bg-gradient-cta rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Mic className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">Session en cours</p>
                        <p className="text-sm text-muted-foreground">Négociation avec TechCorp</p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground font-medium">Progression globale</span>
                        <span className="text-sm font-bold text-accent">68%</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
                        <div className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-1000 ease-out" style={{ width: '68%' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 hover:bg-success/15 transition-colors">
                        <div className="text-2xl font-bold text-success">85%</div>
                        <div className="text-xs text-muted-foreground">Taux de réussite</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:bg-accent/15 transition-colors">
                        <div className="text-2xl font-bold text-accent">12</div>
                        <div className="text-xs text-muted-foreground">Objections gérées</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span>Simulation en temps réel</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <EnhancedStats 
        totalCompanies={totalCompanies}
        totalRevenue={totalRevenue}
        avgSuccessRate={avgSuccessRate}
      />

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
      <section className="py-20 px-6 bg-gradient-to-br from-background via-background/95 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 animate-bounce-gentle">
              Scénarios d'entraînement
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              Maîtrisez tous les{" "}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                contextes commerciaux
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up">
              Découvrez nos scénarios de vente réalistes conçus pour développer vos compétences 
              dans différents secteurs et situations commerciales.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {scenarios.slice(0, 6).map((scenario, index) => (
              <Card 
                key={scenario.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {scenario.title}
                    </h3>
                    <Badge 
                      className={`ml-2 text-xs ${
                        scenario.difficulty === 'Facile' ? 'bg-green-100 text-green-800 border-green-200' :
                        scenario.difficulty === 'Moyen' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}
                    >
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {scenario.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {scenario.company.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {scenario.expectedRevenue}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 p-2 bg-background/50 rounded">
                    <div className="text-center">
                      <div className="text-sm font-bold text-accent">{scenario.probability}%</div>
                      <div className="text-xs text-muted-foreground">Succès</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-foreground">{scenario.objectives.length}</div>
                      <div className="text-xs text-muted-foreground">Objectifs</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-cta hover:shadow-lg hover:shadow-accent/30 text-accent-foreground transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/auth">
                      Commencer
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-accent/30 hover:bg-accent/10 hover:border-accent text-accent hover:text-accent transition-all duration-300"
              asChild
            >
              <Link to="/scenarios">
                Voir tous les scénarios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <TrustElements />

      {/* Enhanced Pricing Section */}
      <section className="py-20 px-6 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 animate-bounce-gentle">
              Tarification transparente
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              Une solution complète pour votre établissement
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Accès illimité pour tous vos étudiants et formateurs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Pricing Card */}
            <Card className="bg-gradient-to-br from-card via-card/90 to-card/80 border-0 shadow-2xl hover:shadow-accent/20 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Solution Premium</span>
                  </div>
                  <div className="text-6xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent mb-2">
                    749€
                  </div>
                  <div className="text-lg text-muted-foreground">par mois</div>
                  <div className="text-sm text-muted-foreground/70 mt-2">+ coûts API OpenAI variables</div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Accès illimité pour tous les étudiants",
                    "Tableaux de bord enseignants avancés",
                    "Analytics détaillés par étudiant",
                    "Support prioritaire 24/7",
                    "Intégration LMS personnalisée",
                    "Formation équipe pédagogique",
                    "Scénarios personnalisés sur demande",
                    "Rapports de performance détaillés"
                  ].map((feature, index) => (
                    <div 
                      key={feature}
                      className="flex items-center gap-3 animate-slide-in-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-cta hover:shadow-lg hover:shadow-accent/30 text-accent-foreground text-lg py-4 hover:scale-105 transition-all duration-300" asChild>
                  <Link to="/contact">
                    Demander une démo personnalisée
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Value Propositions */}
            <div className="space-y-8">
              <div className="animate-slide-in-right">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Pourquoi choisir Byss VNS ?
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Brain,
                      title: "ROI mesurable",
                      description: "Amélioration de 40% des compétences commerciales selon nos études"
                    },
                    {
                      icon: Shield,
                      title: "Sécurité garantie",
                      description: "Conformité RGPD et hébergement en Europe avec chiffrement end-to-end"
                    },
                    {
                      icon: Users,
                      title: "Support dédié",
                      description: "Équipe d'experts pédagogiques pour vous accompagner dans le déploiement"
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={item.title}
                        className="flex gap-4 p-4 bg-background/50 rounded-xl border border-border/50 hover:bg-background transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 animate-scale-in">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="font-semibold text-success">Garantie satisfait ou remboursé</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Essai gratuit de 30 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-primary-light/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 animate-bounce-gentle">
            🚀 Révolution pédagogique
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in leading-tight">
            Révolutionnez l'enseignement
            <span className="block text-accent bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              commercial
            </span>
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            Rejoignez les écoles de commerce qui forment déjà la nouvelle génération 
            de négociateurs avec l'IA vocale de pointe. L'avenir de l'éducation commerciale commence aujourd'hui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-scale-in">
            <Button size="lg" className="bg-accent hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 text-accent-foreground text-lg px-10 py-4 hover:scale-105 transition-all duration-300 group" asChild>
              <Link to="/auth">
                Démarrer l'essai gratuit
                <CheckCircle className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 text-lg px-10 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-105" asChild>
              <Link to="/contact">
                Planifier une présentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-primary-foreground/70 animate-slide-up" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Configuration en 24h</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Formation incluse</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Support dédié</span>
            </div>
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