import { ArrowRight, Brain, TrendingUp, Users, Zap, CheckCircle, Star, Mic, BarChart3, Shield, GraduationCap, Building, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestButton } from "@/components/ui/test-button";
import { MagicSpotlight } from "@/components/ui/magic-spotlight";
import { useScenarios } from "@/hooks/useScenarios";
import { EnhancedHeader } from "./EnhancedHeader";
import { EnhancedStats } from "./EnhancedStats";
import { TrustElements } from "./TrustElements";
import { motion } from "framer-motion";

export function ByssHomepage() {
  const { scenarios, loading, error } = useScenarios();
  
  console.log('ByssHomepage rendering:', { scenarios: scenarios?.length, loading, error });
  
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <EnhancedHeader />

      {/* Hero Section - Ultra Moderne avec Animations */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-2 mb-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Zap className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-sm font-medium text-accent">Intelligence Artificielle Conversationnelle</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-accent drop-shadow-lg">Byss VNS</span><br />
                <span className="text-primary-foreground">Virtual Negotiation</span><br />
                <span className="text-accent drop-shadow-lg">Simulator</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Apprenez les techniques de négociation commerciale avec notre simulateur de conversation intelligent. 
                Pratiquez vos ventes dans un environnement sécurisé et interactif.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <TestButton variant="magic" size="lg" className="px-8 py-4" asChild>
                  <Link to="/scenarios">
                    Découvrir la plateforme  
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </TestButton>
                <TestButton variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4" asChild>
                  <Link to="/auth">
                    Essai gratuit
                  </Link>
                </TestButton>
              </motion.div>

              <motion.div 
                className="flex flex-wrap items-center gap-6 text-primary-foreground/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {[
                  "Conversations ultra-réalistes",
                  "Scénarios ultra-réalistes", 
                  "Suivi de vos progrès"
                ].map((feature, index) => (
                  <motion.div 
                    key={feature}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-accent animate-pulse" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <MagicSpotlight className="w-full">
                <Card className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <motion.div 
                        className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className="p-3 bg-accent rounded-lg"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Mic className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-primary-foreground">Session en cours</p>
                          <p className="text-sm text-primary-foreground/70">Négociation avec TechCorp</p>
                        </div>
                        <div className="ml-auto">
                          <motion.div 
                            className="w-3 h-3 bg-accent rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.div>
                        </div>
                      </motion.div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-primary-foreground/70 font-medium">Progression globale</span>
                          <motion.span 
                            className="text-sm font-bold text-accent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                          >
                            68%
                          </motion.span>
                        </div>
                        <div className="w-full h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-accent rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: '68%' }}
                            transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <motion.div 
                          className="text-center p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div 
                            className="text-2xl font-bold text-accent"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2, type: "spring", stiffness: 200 }}
                          >
                            85%
                          </motion.div>
                          <div className="text-xs text-primary-foreground/70">Taux de réussite</div>
                        </motion.div>
                        <motion.div 
                          className="text-center p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div 
                            className="text-2xl font-bold text-accent"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
                          >
                            12
                          </motion.div>
                          <div className="text-xs text-primary-foreground/70">Objections gérées</div>
                        </motion.div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-xs text-primary-foreground/70">
                        <motion.div 
                          className="w-2 h-2 bg-accent rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                        <span>Simulation en temps réel</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MagicSpotlight>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section Interactive - Fond Blanc */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Performances en temps réel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des résultats concrets pour l'apprentissage commercial moderne
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                value: totalCompanies,
                label: "Scénarios B2B disponibles",
                delay: 0
              },
              {
                icon: TrendingUp,
                value: "87%",
                label: "Satisfaction étudiants EDHEC",
                delay: 0.1
              },
              {
                icon: BarChart3,
                value: "92%",
                label: "Amélioration des compétences",
                delay: 0.2
              },
              {
                icon: Clock,
                value: "24/7",
                label: "Disponibilité plateforme",
                delay: 0.3
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                >
                  <MagicSpotlight>
                    <Card className="relative overflow-hidden bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div 
                            className="p-3 rounded-full bg-accent/10 group-hover:bg-accent group-hover:scale-110 transition-all duration-300"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="h-6 w-6 text-accent group-hover:text-primary transition-colors duration-300" />
                          </motion.div>
                          <motion.div 
                            className="w-2 h-2 bg-accent rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <motion.div 
                          className="text-3xl font-bold mb-2 text-primary"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + stat.delay, type: "spring", stiffness: 200 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </MagicSpotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section Premium - Glassmorphism */}
      <section className="py-20 px-6 bg-gradient-to-br from-background via-background/80 to-background relative overflow-hidden">
        {/* Background Glass Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
                Technologie de pointe
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Technologie d'intelligence artificielle<br />
              <span className="text-accent drop-shadow-sm">conversationnelle</span>
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Notre plateforme utilise une intelligence artificielle avancée pour créer 
              des conversations réalistes et vous aider à progresser efficacement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Conversations Intelligentes",
                description: "Parlez naturellement avec un client virtuel qui s'adapte à vos réponses et vous aide à améliorer vos techniques de vente.",
                delay: 0
              },
              {
                icon: BarChart3,
                title: "Suivi de Progression",
                description: "Visualisez vos progrès avec des graphiques simples et des conseils personnalisés pour améliorer vos compétences commerciales.",
                delay: 0.1
              },
              {
                icon: GraduationCap,
                title: "Apprentissage Pratique",
                description: "Apprenez en pratiquant directement avec des situations réelles adaptées à votre niveau et vos objectifs pédagogiques.",
                delay: 0.2
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                >
                  <MagicSpotlight>
                    <Card className="bg-background/40 backdrop-blur-lg border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500 group h-full">
                      <CardContent className="p-8 text-center">
                        <motion.div 
                          className="p-4 bg-accent/10 rounded-lg w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity,
                              delay: index * 0.5
                            }}
                          >
                            <Icon className="h-8 w-8 text-accent" />
                          </motion.div>
                        </motion.div>
                        <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-primary/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </MagicSpotlight>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <TrustElements />

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