import { ArrowRight, Brain, Users, BarChart3, Shield, GraduationCap, Mic, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestButton } from "@/components/ui/test-button";
import { MagicSpotlight } from "@/components/ui/magic-spotlight";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      icon: Brain,
      title: "Simulateur de Négociation Vocale",
      description: "Vos étudiants négocient en temps réel avec des personas IA dotées de personnalités, objections et styles uniques",
      features: [
        "Conversations vocales naturelles en temps réel",
        "15+ personas avec biographies détaillées", 
        "Objections contextualisées selon l'entreprise",
        "Évaluation automatique des performances",
        "Adaptation intelligente du niveau de difficulté"
      ],
      color: "accent"
    },
    {
      icon: GraduationCap,
      title: "Bibliothèque de Scénarios Sectoriels",
      description: "50+ scénarios prêts à l'emploi avec analyses SWOT complètes, données financières et profils détaillés",
      features: [
        "50+ scénarios métier authentiques",
        "Données d'entreprises réalistes (CA, budget, timeline)",
        "Profils psychologiques des interlocuteurs", 
        "Possibilité de créer vos propres scénarios",
        "Intégration LMS native"
      ],
      color: "primary"
    },
    {
      icon: BarChart3,
      title: "Analytics Pédagogiques Avancées",
      description: "Tableau de bord complet pour suivre la progression : temps de parole, gestion des objections, taux de conversion",
      features: [
        "Dashboard temps réel par étudiant",
        "Scoring automatique des compétences",
        "Identification des points faibles",
        "Recommandations pédagogiques personnalisées",
        "Comparaisons inter-cohortes"
      ],
      color: "success"
    },
    {
      icon: Shield,
      title: "Sécurité & Conformité",
      description: "Protection des données et conformité RGPD",
      features: [
        "Chiffrement end-to-end",
        "Conformité RGPD complète",
        "Hébergement sécurisé EU",
        "Audit trails complets",
        "Contrôle d'accès granulaire"
      ],
      color: "destructive"
    }
  ];

  const industries = [
    {
      name: "Écoles de Commerce",
      description: "Formation aux techniques de négociation B2B et vente consultative",
      modules: ["Négociation complexe", "Vente solution", "Gestion d'objections", "Closing avancé"]
    },
    {
      name: "Centres de Formation",
      description: "Programmes de développement commercial pour professionnels",
      modules: ["Prospection digitale", "Vente téléphonique", "Négociation prix", "Suivi client"]
    },
    {
      name: "Universités",
      description: "Cursus business et management avec focus commercial",
      modules: ["Stratégie commerciale", "Marketing B2B", "CRM", "Analyse de marché"]
    },
    {
      name: "Entreprises",
      description: "Formation continue des équipes commerciales",
      modules: ["Techniques de vente", "Négociation interne", "Présentation", "Argumentation"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation Ultra-Premium */}
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="p-2 bg-accent rounded-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Brain className="h-6 w-6 text-accent-foreground" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">Byss VNS</h1>
                <p className="text-xs text-muted-foreground">Virtual Negotiation Simulator</p>
              </div>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: "/", label: "Accueil" },
              { to: "/services", label: "Services", active: true },
              { to: "/about", label: "Qui sommes-nous" },
              { to: "/contact", label: "Contact" }
            ].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link 
                  to={item.to} 
                  className={`${item.active ? 'text-accent font-medium' : 'text-muted-foreground hover:text-accent'} transition-colors duration-300 relative group`}
                >
                  {item.label}
                  {item.active && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TestButton variant="outline" asChild>
              <Link to="/auth">Connexion</Link>
            </TestButton>
            <TestButton variant="magic" asChild>
              <Link to="/auth">Essai gratuit</Link>
            </TestButton>
          </motion.div>
        </div>
      </header>

      {/* Hero Section Spectaculaire */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-accent/20 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-secondary text-accent backdrop-blur-sm border border-accent/30">Solutions complètes</Badge>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Services &amp; Solutions
            <motion.span 
              className="text-accent block drop-shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Byss VNS
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Découvrez notre gamme complète de services pour révolutionner 
            l'enseignement commercial avec l'IA vocale de pointe
          </motion.p>
        </div>
      </section>

      {/* Main Services Ultra Modernes */}
      <section className="py-20 px-6 bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
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
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nos Services Principaux
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Révolutionnez l'enseignement commercial avec notre simulateur de négociation vocale alimenté par GPT-4o Realtime. 
              Vos étudiants s'entraînent face à des interlocuteurs IA ultra-réalistes dans des scénarios métier authentiques.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MagicSpotlight>
                  <Card className="group hover:shadow-2xl transition-all duration-500 bg-card/90 backdrop-blur-sm border border-border/50 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div 
                          className="p-4 bg-secondary rounded-xl group-hover:bg-accent/20 transition-all duration-300"
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
                            <service.icon className="h-8 w-8 text-accent group-hover:text-primary transition-colors duration-300" />
                          </motion.div>
                        </motion.div>
                        <div>
                          <CardTitle className="text-2xl group-hover:text-accent transition-colors text-foreground">
                            {service.title}
                          </CardTitle>
                          <p className="text-muted-foreground mt-2">{service.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + featureIndex * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                            </motion.div>
                            <span className="text-sm text-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </MagicSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Secteurs d'Application
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos solutions s'adaptent aux besoins spécifiques de chaque secteur éducatif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-accent">{industry.name}</CardTitle>
                  <p className="text-muted-foreground">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Modules disponibles :</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.modules.map((module, moduleIndex) => (
                        <Badge key={moduleIndex} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">Intelligence Artificielle</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Technologie OpenAI
                <span className="text-accent block">GPT-4o Realtime</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre plateforme exploite la puissance de l'API Realtime d'OpenAI, 
                la technologie d'IA conversationnelle la plus avancée au monde, 
                pour créer des expériences de formation immersives et ultra-réalistes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary rounded-lg mt-1">
                    <Mic className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Conversation Naturelle</h4>
                    <p className="text-sm text-muted-foreground">
                      Interactions vocales fluides avec latence ultra-faible (&lt;200ms)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary rounded-lg mt-1">
                    <Target className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Adaptation Intelligente</h4>
                    <p className="text-sm text-muted-foreground">
                      L'IA s'adapte au niveau et au style de chaque étudiant en temps réel
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary rounded-lg mt-1">
                    <BarChart3 className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Analyse Comportementale</h4>
                    <p className="text-sm text-muted-foreground">
                      Détection des patterns de communication et des émotions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-card border border-border shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="p-4 bg-secondary rounded-full w-16 h-16 mx-auto mb-4">
                        <Brain className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Performance en Temps Réel</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                        <span className="text-sm text-foreground">Précision de reconnaissance</span>
                        <span className="font-bold text-accent">99.2%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                        <span className="text-sm text-foreground">Latence moyenne</span>
                        <span className="font-bold text-success">180ms</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                        <span className="text-sm text-foreground">Langues supportées</span>
                        <span className="font-bold text-primary">50+</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Processus d'Implémentation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un déploiement simple et rapide pour une intégration seamless dans vos programmes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Analyse de vos besoins et définition du périmètre d'intégration"
              },
              {
                step: "02", 
                title: "Configuration",
                description: "Paramétrage de la plateforme selon vos spécifications pédagogiques"
              },
              {
                step: "03",
                title: "Formation",
                description: "Formation de vos équipes pédagogiques et support technique"
              },
              {
                step: "04",
                title: "Déploiement",
                description: "Mise en production et accompagnement pour les premiers usages"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center bg-card border border-border shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Spectaculaire */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Prêt à transformer votre enseignement ?
          </motion.h2>
          <motion.p 
            className="text-xl text-primary-foreground/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez comment Byss VNS peut révolutionner la formation commerciale 
            dans votre établissement
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TestButton variant="magic" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/contact">
                  Planifier une démo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </TestButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TestButton variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4" asChild>
                <Link to="/scenarios">
                  Télécharger la brochure
                </Link>
              </TestButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}