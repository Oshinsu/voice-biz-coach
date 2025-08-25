import { ArrowRight, Brain, Users, BarChart3, Shield, GraduationCap, Mic, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      {/* Header Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-lg">
              <Brain className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Byss VNS</h1>
              <p className="text-xs text-muted-foreground">Virtual Negotiation Simulator</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">Accueil</Link>
            <Link to="/services" className="text-accent font-medium">Services</Link>
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
      <section className="pt-32 pb-20 px-6 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Solutions complètes</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Services &amp; Solutions
            <span className="text-accent block">Byss VNS</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services pour révolutionner 
            l'enseignement commercial avec l'IA vocale de pointe
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nos Services Principaux
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Révolutionnez l'enseignement commercial avec notre simulateur de négociation vocale alimenté par GPT-4o Realtime. 
              Vos étudiants s'entraînent face à des interlocuteurs IA ultra-réalistes dans des scénarios métier authentiques.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-4 bg-${service.color}/10 rounded-xl`}>
                      <service.icon className={`h-8 w-8 text-${service.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6 bg-secondary/30">
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
              <Card key={index} className="bg-card border-0 shadow-lg hover:shadow-xl transition-shadow">
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
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Intelligence Artificielle</Badge>
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
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Mic className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Conversation Naturelle</h4>
                    <p className="text-sm text-muted-foreground">
                      Interactions vocales fluides avec latence ultra-faible (&lt;200ms)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Target className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Adaptation Intelligente</h4>
                    <p className="text-sm text-muted-foreground">
                      L'IA s'adapte au niveau et au style de chaque étudiant en temps réel
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <BarChart3 className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Analyse Comportementale</h4>
                    <p className="text-sm text-muted-foreground">
                      Détection des patterns de communication et des émotions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl"></div>
              <Card className="relative bg-card/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-4">
                        <Brain className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">Performance en Temps Réel</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                        <span className="text-sm">Précision de reconnaissance</span>
                        <span className="font-bold text-accent">99.2%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-success/5 rounded-lg">
                        <span className="text-sm">Latence moyenne</span>
                        <span className="font-bold text-success">180ms</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                        <span className="text-sm">Langues supportées</span>
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
      <section className="py-20 px-6 bg-secondary/30">
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
              <Card key={index} className="text-center bg-card border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-light"></div>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à transformer votre enseignement ?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Découvrez comment Byss VNS peut révolutionner la formation commerciale 
            dans votre établissement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-accent text-lg px-8 py-4">
              Planifier une démo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4">
              Télécharger la brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}