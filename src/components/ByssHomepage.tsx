import { ArrowRight, Brain, TrendingUp, Users, Zap, CheckCircle, Star, Mic, BarChart3, Shield, GraduationCap, Building, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedHeader } from "./EnhancedHeader";

export function ByssHomepage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <EnhancedHeader />

      {/* Hero Section - Fond Bleu Marine */}
      <section className="pt-32 pb-20 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-2 mb-8">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-accent">Powered by OpenAI GPT-4o Realtime</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-accent">Byss VNS</span><br />
                <span className="text-primary-foreground">Virtual Negotiation</span><br />
                <span className="text-accent">Simulator</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed">
                Formez vos étudiants aux techniques de négociation commerciale avec notre simulateur vocal IA de pointe. 
                Une technologie révolutionnaire pour l'enseignement commercial moderne.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4" asChild>
                  <Link to="/scenarios">
                    Découvrir la plateforme  
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4" asChild>
                  <Link to="/auth">
                    Essai gratuit
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>IA vocale la plus avancée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Scénarios ultra-réalistes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Analytics en temps réel</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
                      <div className="p-3 bg-accent rounded-lg">
                        <Mic className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary-foreground">Session en cours</p>
                        <p className="text-sm text-primary-foreground/70">Négociation avec TechCorp</p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-primary-foreground/70 font-medium">Progression globale</span>
                        <span className="text-sm font-bold text-accent">68%</span>
                      </div>
                      <div className="w-full h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
                        <div className="text-2xl font-bold text-accent">85%</div>
                        <div className="text-xs text-primary-foreground/70">Taux de réussite</div>
                      </div>
                      <div className="text-center p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
                        <div className="text-2xl font-bold text-accent">12</div>
                        <div className="text-xs text-primary-foreground/70">Objections gérées</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-primary-foreground/70">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Simulation en temps réel</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Fond Blanc */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Performances en temps réel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des résultats concrets pour l'apprentissage commercial moderne
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative overflow-hidden bg-background border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 group rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-accent group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
                <div className="text-3xl font-bold mb-2 text-primary">12</div>
                <div className="text-sm text-muted-foreground font-medium">Scénarios B2B disponibles</div>
              </div>
            </div>
            
            <div className="relative overflow-hidden bg-background border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 group rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-accent group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
                <div className="text-3xl font-bold mb-2 text-primary">85%</div>
                <div className="text-sm text-muted-foreground font-medium">Taux de satisfaction étudiants</div>
              </div>
            </div>
            
            <div className="relative overflow-hidden bg-background border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 group rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-accent group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
                <div className="text-3xl font-bold mb-2 text-primary">92%</div>
                <div className="text-sm text-muted-foreground font-medium">Amélioration des compétences</div>
              </div>
            </div>
            
            <div className="relative overflow-hidden bg-background border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 group rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-accent group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
                <div className="text-3xl font-bold mb-2 text-primary">24/7</div>
                <div className="text-sm text-muted-foreground font-medium">Disponibilité plateforme</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section - Fond Blanc */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-primary">Technologie de pointe</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Propulsé par l'IA vocale<br />
              <span className="text-accent">la plus avancée</span>
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Notre plateforme utilise OpenAI GPT-4o Realtime API, l'IA conversationnelle 
              la plus sophistiquée disponible, pour des simulations ultra-réalistes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border border-primary/20 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-accent/10 rounded-lg w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary">IA Conversationnelle</h3>
                <p className="text-primary/80">
                  Conversations vocales naturelles avec analyse en temps réel des émotions, 
                  du ton et des techniques de négociation utilisées.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border border-primary/20 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-accent/10 rounded-lg w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary">Analytics Avancés</h3>
                <p className="text-primary/80">
                  Tableaux de bord détaillés pour suivre les progrès des étudiants, 
                  identifier les points d'amélioration et personnaliser l'enseignement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border border-primary/20 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="p-4 bg-accent/10 rounded-lg w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary">Pédagogie Innovante</h3>
                <p className="text-primary/80">
                  Méthodes d'apprentissage immersives basées sur la pratique, 
                  adaptées aux programmes des écoles de commerce modernes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Pricing Section - Fond Bleu Marine */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-foreground/10 text-accent border border-accent/30">
              Tarification transparente
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Une solution complète pour votre établissement
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Accès illimité pour tous vos étudiants et formateurs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Pricing Card */}
            <Card className="bg-primary-foreground border border-primary-foreground/20 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Solution Premium</span>
                  </div>
                  <div className="text-6xl font-bold text-primary mb-2">
                    749€
                  </div>
                  <div className="text-lg text-primary/80">par mois</div>
                  <div className="text-sm text-primary/60 mt-2">+ coûts API OpenAI variables</div>
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
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-primary">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-primary text-lg py-4" asChild>
                  <Link to="/contact">
                    Demander une démo personnalisée
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Value Propositions */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-6">
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
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4 p-4 bg-primary-foreground/10 rounded-xl border border-primary-foreground/20">
                        <div className="p-3 bg-accent/20 rounded-lg flex-shrink-0 border border-accent/30">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary-foreground mb-2">{item.title}</h4>
                          <p className="text-sm text-primary-foreground/80 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 bg-primary-foreground/10 rounded-xl border border-primary-foreground/20">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-accent" />
                  <span className="font-semibold text-accent">Garantie satisfait ou remboursé</span>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Essai gratuit de 30 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Fond Bleu Marine */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-primary-foreground/10 text-accent border border-accent/30">
            🚀 Révolution pédagogique
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Révolutionnez l'enseignement
            <span className="block text-accent">
              commercial
            </span>
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Rejoignez les écoles de commerce qui forment déjà la nouvelle génération 
            de commerciaux avec notre technologie IA révolutionnaire.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4" asChild>
              <Link to="/auth">
                Commencer l'essai gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4" asChild>
              <Link to="/contact">
                Programmer une présentation
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">30 jours</div>
              <div className="text-primary-foreground/80">Essai gratuit</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-primary-foreground/80">Support dédié</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-primary-foreground/80">Satisfait ou remboursé</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Fond Blanc */}
      <footer className="py-16 px-6 bg-background border-t border-primary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-primary">Byss VNS</span>
              </div>
              <p className="text-primary/80 mb-6 max-w-md">
                La plateforme de formation commerciale IA qui révolutionne l'apprentissage 
                des techniques de négociation dans l'enseignement supérieur.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-4">Plateforme</h4>
              <ul className="space-y-2 text-primary/80">
                <li><Link to="/scenarios" className="hover:text-accent">Scénarios</Link></li>
                <li><Link to="/about" className="hover:text-accent">À propos</Link></li>
                <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-4">Légal</h4>
              <ul className="space-y-2 text-primary/80">
                <li><Link to="/privacy" className="hover:text-accent">Confidentialité</Link></li>
                <li><Link to="/terms" className="hover:text-accent">Conditions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-12 pt-8 text-center text-primary/80">
            <p>&copy; 2024 Byss VNS. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}