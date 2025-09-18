import { ArrowRight, Brain, Users, Target, Award, CheckCircle, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestButton } from "@/components/ui/test-button";
import { MagicSpotlight } from "@/components/ui/magic-spotlight";
import { motion } from "framer-motion";

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
              { to: "/services", label: "Services" },
              { to: "/about", label: "Qui sommes-nous", active: true },
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
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-6 bg-secondary text-accent backdrop-blur-sm border border-accent/30">Notre Mission</Badge>
              </motion.div>
               <motion.h1 
                 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
               >
                 L'Alliance de l'Innovation
                 <motion.span 
                   className="text-accent block drop-shadow-lg"
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8, delay: 0.8 }}
                 >
                   et de la Formation
                 </motion.span>
               </motion.h1>
               <motion.p 
                 className="text-xl text-primary-foreground/80 mb-8 leading-relaxed"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.6 }}
               >
                 Byss Agency et Metora s'unissent pour créer Byss VNS : le premier simulateur vocal 
                 de négociation commerciale alimenté par l'IA GPT-4o Realtime. Une révolution 
                 technologique au service de l'excellence pédagogique.
               </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                 {[
                   { value: "2", label: "Entreprises partenaires" },
                   { value: "1", label: "Produit révolutionnaire" }
                 ].map((stat, index) => (
                   <motion.div 
                     key={stat.label}
                     className="text-center"
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: 1.2 + index * 0.2, type: "spring", stiffness: 200 }}
                     whileHover={{ scale: 1.05 }}
                   >
                     <motion.div 
                       className="text-4xl font-bold text-accent mb-2"
                       animate={{ scale: [1, 1.1, 1] }}
                       transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                     >
                       {stat.value}
                     </motion.div>
                     <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                   </motion.div>
                 ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <MagicSpotlight className="w-full">
                <Card className="bg-card/90 backdrop-blur-lg border border-border/50 shadow-2xl">
                  <CardContent className="p-8">
                    <motion.h3 
                      className="text-2xl font-bold mb-6 text-center text-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      Notre Vision
                    </motion.h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Innovation Permanente",
                          description: "Intégrer les dernières avancées en IA pour des expériences toujours plus réalistes",
                          delay: 0
                        },
                        {
                          title: "Accessibilité Universelle",
                          description: "Démocratiser l'accès à une formation commerciale de qualité pour tous",
                          delay: 0.1
                        },
                        {
                          title: "Impact Mesurable",
                          description: "Créer des outils qui génèrent des résultats concrets et durables",
                          delay: 0.2
                        }
                      ].map((item, index) => (
                        <motion.div 
                          key={item.title}
                          className="flex items-start gap-3 group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 + item.delay }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0 group-hover:text-accent transition-colors duration-300" />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold mb-1 text-foreground group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MagicSpotlight>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section Interactive */}
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
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chacune de nos décisions et innovations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MagicSpotlight>
                  <Card className="text-center group hover:shadow-2xl transition-all duration-500 bg-card/90 backdrop-blur-sm border border-border/50 h-full">
                    <CardContent className="p-6">
                      <motion.div 
                        className="p-4 bg-secondary rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300"
                        whileHover={{ scale: 1.2, rotate: 10 }}
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
                          <value.icon className="h-8 w-8 text-accent group-hover:text-primary transition-colors duration-300" />
                        </motion.div>
                      </motion.div>
                      <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </MagicSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-secondary">
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
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="bg-card border border-border shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-accent mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-bold mb-3 text-foreground">{milestone.title}</h3>
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
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-card border border-border overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-accent" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-accent font-medium mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-4 text-xs">
                    {member.speciality}
                  </Badge>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                   <div className="flex justify-center gap-2">
                     <TestButton size="sm" variant="outline" className="p-2">
                       <Linkedin className="h-4 w-4" />
                     </TestButton>
                     <TestButton size="sm" variant="outline" className="p-2">
                       <Mail className="h-4 w-4" />
                     </TestButton>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Excellence */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">Excellence Technique</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Pourquoi choisir
                <span className="text-accent block">Byss VNS ?</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-card rounded-lg mt-1 border border-border">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Technologie de Pointe</h3>
                    <p className="text-muted-foreground">
                      Intégration exclusive de l'API OpenAI GPT-4o Realtime, 
                      la technologie d'IA conversationnelle la plus avancée au monde.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-card rounded-lg mt-1 border border-border">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Expertise Pédagogique</h3>
                    <p className="text-muted-foreground">
                      Développé en collaboration avec des experts en sciences de l'éducation 
                      et des formateurs commerciaux de renom.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-card rounded-lg mt-1 border border-border">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Résultats Prouvés</h3>
                    <p className="text-muted-foreground">
                      Amélioration moyenne de 65% des performances commerciales 
                      chez nos utilisateurs après 3 mois d'utilisation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-card border border-border shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-center text-foreground">Certifications & Partenariats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium text-foreground">OpenAI Partner</span>
                      <Badge className="bg-accent text-accent-foreground">Certified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium text-foreground">RGPD Compliance</span>
                      <Badge className="bg-success text-success-foreground">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium text-foreground">ISO 27001</span>
                      <Badge className="bg-primary text-primary-foreground">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            Rejoignez l'Innovation Pédagogique
          </motion.h2>
          <motion.p 
            className="text-xl text-primary-foreground/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez comment Byss VNS peut transformer l'expérience d'apprentissage 
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
                   Planifier une rencontre
                   <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
               </TestButton>
             </motion.div>
             <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <TestButton variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4" asChild>
                 <Link to="/services">
                   En savoir plus
                 </Link>
               </TestButton>
             </motion.div>
           </motion.div>
         </div>
       </section>
     </div>
   );
 }