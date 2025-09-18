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
import { ConsolidatedTrustSection } from "./ConsolidatedTrustSection";
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
      <ConsolidatedTrustSection />

      {/* Pricing Section Premium - Ultra Moderne */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 via-transparent to-transparent"></div>
          <motion.div 
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
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
              <Badge className="mb-4 bg-primary-foreground/10 text-accent border border-accent/30 backdrop-blur-sm">
                Tarification transparente
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Une solution complète pour votre établissement
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Accès illimité pour tous vos étudiants et formateurs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Pricing Card Ultra Premium */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MagicSpotlight>
                <Card className="bg-primary-foreground/95 backdrop-blur-lg border border-primary-foreground/20 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                  {/* Gradient Border Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <motion.div 
                      className="text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div 
                        className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Star className="h-4 w-4 text-accent" />
                        </motion.div>
                        <span className="text-sm font-medium text-accent">Solution Premium</span>
                      </motion.div>
                      <motion.div 
                        className="text-6xl font-bold text-primary mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      >
                        749€
                      </motion.div>
                      <div className="text-lg text-primary/80">par mois</div>
                      <div className="text-sm text-primary/60 mt-2">+ coûts API OpenAI variables</div>
                    </motion.div>
                    
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
                        <motion.div 
                          key={feature}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                          </motion.div>
                          <span className="text-primary">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TestButton variant="magic" className="w-full text-lg py-4" asChild>
                        <Link to="/contact">
                          Demander une démo personnalisée
                        </Link>
                      </TestButton>
                    </motion.div>
                  </CardContent>
                </Card>
              </MagicSpotlight>
            </motion.div>

            {/* Value Propositions Ultra Modernes */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <motion.h3 
                  className="text-2xl font-bold text-primary-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Pourquoi choisir Byss VNS ?
                </motion.h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Brain,
                      title: "ROI mesurable",
                      description: "Amélioration de 40% des compétences commerciales selon nos études",
                      delay: 0
                    },
                    {
                      icon: Shield,
                      title: "Sécurité garantie", 
                      description: "Conformité RGPD et hébergement en Europe avec chiffrement end-to-end",
                      delay: 0.1
                    },
                    {
                      icon: Users,
                      title: "Support dédié",
                      description: "Équipe d'experts pédagogiques pour vous accompagner dans le déploiement",
                      delay: 0.2
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={item.title}
                        className="flex gap-4 p-4 bg-primary-foreground/10 rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 group"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + item.delay }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div 
                          className="p-3 bg-accent/20 rounded-lg flex-shrink-0 border border-accent/30 group-hover:bg-accent/30 transition-all duration-300"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <Icon className="h-6 w-6 text-accent" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-primary-foreground mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                          <p className="text-sm text-primary-foreground/80 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div 
                className="p-6 bg-primary-foreground/10 rounded-xl border border-primary-foreground/20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="h-6 w-6 text-accent" />
                  </motion.div>
                  <span className="font-semibold text-accent">Garantie satisfait ou remboursé</span>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Essai gratuit de 30 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section Ultra Spectaculaire */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary via-primary/98 to-primary/95 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary-foreground/10 text-accent border border-accent/30 backdrop-blur-sm">
              🚀 Révolution pédagogique
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Révolutionnez l'enseignement
            <motion.span 
              className="block text-accent drop-shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              commercial
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Rejoignez les écoles de commerce qui forment déjà la nouvelle génération 
            de commerciaux avec notre technologie IA révolutionnaire.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TestButton variant="magic" size="lg" className="px-8 py-4" asChild>
                <Link to="/auth">
                  Commencer l'essai gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </TestButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TestButton variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4" asChild>
                <Link to="/contact">
                  Programmer une présentation
                </Link>
              </TestButton>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { value: "30 jours", label: "Essai gratuit", delay: 0 },
              { value: "24/7", label: "Support dédié", delay: 0.1 },
              { value: "100%", label: "Satisfait ou remboursé", delay: 0.2 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + stat.delay, type: "spring", stiffness: 200 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-accent mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Premium - Design Moderne */}
      <footer className="py-16 px-6 bg-gradient-to-br from-background via-background/95 to-background/90 border-t border-primary/20 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="p-2 bg-primary rounded-lg"
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </motion.div>
                <span className="text-xl font-bold text-primary">Byss VNS</span>
              </motion.div>
              <p className="text-primary/80 mb-6 max-w-md leading-relaxed">
                La plateforme de formation commerciale IA qui révolutionne l'apprentissage 
                des techniques de négociation dans l'enseignement supérieur.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-semibold text-primary mb-4">Plateforme</h4>
              <ul className="space-y-2 text-primary/80">
                {[
                  { to: "/scenarios", label: "Scénarios" },
                  { to: "/about", label: "À propos" },
                  { to: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Link 
                      to={link.to} 
                      className="hover:text-accent transition-colors duration-300 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="font-semibold text-primary mb-4">Légal</h4>
              <ul className="space-y-2 text-primary/80">
                {[
                  { to: "/privacy", label: "Confidentialité" },
                  { to: "/terms", label: "Conditions" }
                ].map((link, index) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Link 
                      to={link.to} 
                      className="hover:text-accent transition-colors duration-300 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t border-primary/20 mt-12 pt-8 text-center text-primary/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
          >
            <p>&copy; 2024 Byss VNS. Tous droits réservés.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}