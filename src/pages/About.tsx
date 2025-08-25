import { ArrowRight, Brain, Users, Target, Award, CheckCircle, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function About() {
  const team = [
    {
      name: "Gary Bissol",
      role: "Co-fondateur & CEO",
      speciality: "Développement & Marketing",
      description: "Fondateur de Byss Agency en 2021, spécialisé dans le développement d'applications et le marketing digital.",
      linkedin: "#"
    },
    {
      name: "Johan Chamlong",
      role: "Co-fondateur & CTO", 
      speciality: "Formation & Technologie",
      description: "Expert en formation en ligne et technologies éducatives. Fondateur de Metora en février 2025.",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: Brain,
      title: "Innovation Technologique",
      description: "Nous repoussons constamment les limites de l'IA conversationnelle pour créer les expériences les plus réalistes possibles."
    },
    {
      icon: Users,
      title: "Excellence Pédagogique", 
      description: "Chaque fonctionnalité est conçue avec les meilleures pratiques éducatives pour maximiser l'apprentissage."
    },
    {
      icon: Target,
      title: "Impact Mesurable",
      description: "Nous nous engageons à fournir des outils qui génèrent des résultats concrets et mesurables."
    },
    {
      icon: Award,
      title: "Qualité Premium",
      description: "Nos standards de qualité sont les plus élevés de l'industrie, de la technologie au support client."
    }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Fondation de Byss Agency",
      description: "Gary Bissol fonde Byss Agency, spécialisée dans le développement d'applications et le marketing digital."
    },
    {
      year: "Mai 2024", 
      title: "Rencontre des Fondateurs",
      description: "Gary Bissol et Johan Chamlong se rencontrent et décident d'unir leurs expertises complémentaires."
    },
    {
      year: "Février 2025",
      title: "Création de Metora",
      description: "Lancement de Metora, plateforme de formation en ligne développée par Johan Chamlong."
    },
    {
      year: "Mars 2025",
      title: "Développement du Prototype",
      description: "Alliance Byss Agency × Metora : développement du prototype Byss VNS avec l'API OpenAI GPT-4o Realtime."
    },
    {
      year: "Septembre 2025",
      title: "Lancement Commercial",
      description: "Lancement officiel de Byss VNS auprès des écoles de commerce et organismes de formation."
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
            <Link to="/services" className="text-muted-foreground hover:text-accent transition-colors">Services</Link>
            <Link to="/about" className="text-accent font-medium">Qui sommes-nous</Link>
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Notre Mission</Badge>
               <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                 L'Alliance de l'Innovation
                 <span className="text-accent block">et de la Formation</span>
               </h1>
               <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                 Byss Agency et Metora s'unissent pour créer Byss VNS : le premier simulateur vocal 
                 de négociation commerciale alimenté par l'IA GPT-4o Realtime. Une révolution 
                 technologique au service de l'excellence pédagogique.
               </p>
              
              <div className="grid grid-cols-2 gap-6">
                 <div className="text-center">
                   <div className="text-4xl font-bold text-accent mb-2">2</div>
                   <div className="text-sm text-primary-foreground/60">Entreprises partenaires</div>
                 </div>
                 <div className="text-center">
                   <div className="text-4xl font-bold text-accent mb-2">1</div>
                   <div className="text-sm text-primary-foreground/60">Produit révolutionnaire</div>
                 </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl"></div>
              <Card className="relative bg-card/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Notre Vision</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Innovation Permanente</h4>
                        <p className="text-sm text-muted-foreground">
                          Intégrer les dernières avancées en IA pour des expériences toujours plus réalistes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Accessibilité Universelle</h4>
                        <p className="text-sm text-muted-foreground">
                          Démocratiser l'accès à une formation commerciale de qualité pour tous
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Impact Mesurable</h4>
                        <p className="text-sm text-muted-foreground">
                          Créer des outils qui génèrent des résultats concrets et durables
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chacune de nos décisions et innovations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
                <CardContent className="p-6">
                  <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <value.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Notre Parcours
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              De la vision initiale aux déploiements actuels, découvrez les étapes clés de notre développement
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/20"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="bg-card border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-bold mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="relative">
                    <div className="w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Notre Équipe d'Experts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une équipe pluridisciplinaire alliant expertise technique, 
              pédagogique et commerciale
            </p>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-accent" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-4 text-xs">
                    {member.speciality}
                  </Badge>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" className="p-2">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-2">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Excellence */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Excellence Technique</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Pourquoi choisir
                <span className="text-accent block">Byss VNS ?</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Technologie de Pointe</h3>
                    <p className="text-muted-foreground">
                      Intégration exclusive de l'API OpenAI GPT-4o Realtime, 
                      la technologie d'IA conversationnelle la plus avancée au monde.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Expertise Pédagogique</h3>
                    <p className="text-muted-foreground">
                      Développé en collaboration avec des experts en sciences de l'éducation 
                      et des formateurs commerciaux de renom.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Résultats Prouvés</h3>
                    <p className="text-muted-foreground">
                      Amélioration moyenne de 65% des performances commerciales 
                      chez nos utilisateurs après 3 mois d'utilisation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl"></div>
              <Card className="relative bg-card/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">Certifications & Partenariats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                      <span className="font-medium">OpenAI Partner</span>
                      <Badge className="bg-accent/10 text-accent">Certified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                      <span className="font-medium">RGPD Compliance</span>
                      <Badge className="bg-success/10 text-success">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium">ISO 27001</span>
                      <Badge className="bg-primary/10 text-primary">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Rejoignez l'Innovation Pédagogique
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Découvrez comment Byss VNS peut transformer l'expérience d'apprentissage 
            dans votre établissement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-accent text-lg px-8 py-4">
              Planifier une rencontre
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4">
              En savoir plus
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}