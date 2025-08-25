import { ArrowRight, Brain, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Contact() {
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
            <Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">Qui sommes-nous</Link>
            <Link to="/contact" className="text-accent font-medium">Contact</Link>
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
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto">
            Prêt à révolutionner l'enseignement commercial dans votre établissement ? 
            Notre équipe d'experts est là pour répondre à toutes vos questions.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-card border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Demander une démonstration</CardTitle>
                  <p className="text-muted-foreground">
                    Remplissez ce formulaire et nous vous recontacterons rapidement 
                    pour planifier une présentation personnalisée.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input id="firstName" placeholder="Votre prénom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input id="lastName" placeholder="Votre nom" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input id="email" type="email" placeholder="votre.email@etablissement.edu" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+33 1 23 45 67 89" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Établissement *</Label>
                    <Input id="institution" placeholder="Nom de votre école/université" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Votre fonction *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre fonction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="director">Directeur/Directrice</SelectItem>
                        <SelectItem value="dean">Doyen</SelectItem>
                        <SelectItem value="professor">Professeur/Enseignant</SelectItem>
                        <SelectItem value="coordinator">Coordinateur pédagogique</SelectItem>
                        <SelectItem value="it">Responsable IT</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="students">Nombre d'étudiants concernés</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Estimez le nombre d'étudiants" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">Moins de 50</SelectItem>
                        <SelectItem value="200">50 - 200</SelectItem>
                        <SelectItem value="500">200 - 500</SelectItem>
                        <SelectItem value="1000">500 - 1000</SelectItem>
                        <SelectItem value="1000+">Plus de 1000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Calendrier de déploiement souhaité</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Quand souhaitez-vous déployer ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immédiatement</SelectItem>
                        <SelectItem value="q1">Prochain trimestre</SelectItem>
                        <SelectItem value="semester">Prochain semestre</SelectItem>
                        <SelectItem value="year">Année prochaine</SelectItem>
                        <SelectItem value="exploring">En phase d'exploration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Décrivez-nous vos besoins spécifiques, vos objectifs pédagogiques, ou toute question particulière..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent-dark text-accent-foreground text-lg py-3">
                    Envoyer la demande
                    <Send className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    En envoyant ce formulaire, vous acceptez que nous utilisions vos données 
                    pour vous recontacter concernant votre demande. 
                    <Link to="/privacy" className="text-accent hover:underline">
                      Politique de confidentialité
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <Card className="bg-gradient-card border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Contacts Directs</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-muted-foreground">hello@byss-vns.com</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Réponse sous 24h en jour ouvré
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Téléphone</h4>
                        <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Du lundi au vendredi, 9h-18h
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Adresse</h4>
                        <p className="text-muted-foreground">
                          123 Avenue de l'Innovation<br />
                          75001 Paris, France
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-gradient-card border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold">Horaires de Support</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lundi - Vendredi</span>
                      <span className="font-medium">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Samedi</span>
                      <span className="font-medium">10h00 - 16h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimanche</span>
                      <span className="font-medium text-muted-foreground">Fermé</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-accent/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Support d'urgence :</strong> Disponible 24/7 pour les clients 
                      avec contrat de support premium
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-card border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Actions Rapides</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-3 h-5 w-5" />
                      Télécharger la brochure complète
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-3 h-5 w-5" />
                      Planifier un appel découverte
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Brain className="mr-3 h-5 w-5" />
                      Accéder à la démo en ligne
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Questions Fréquentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <Card className="bg-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Quelle est la durée de déploiement ?</h4>
                <p className="text-sm text-muted-foreground">
                  Le déploiement complet prend généralement entre 2 et 4 semaines, 
                  incluant la formation de vos équipes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Proposez-vous une période d'essai ?</h4>
                <p className="text-sm text-muted-foreground">
                  Oui, nous offrons une période d'essai de 30 jours gratuite 
                  pour évaluer la plateforme avec vos étudiants.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">L'intégration LMS est-elle possible ?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolument ! Nous supportons les principales plateformes 
                  LMS (Moodle, Canvas, Blackboard, etc.).
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Quels sont les prérequis techniques ?</h4>
                <p className="text-sm text-muted-foreground">
                  Simple navigateur web moderne et connexion internet. 
                  Aucune installation logicielle requise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à démarrer ?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Planifions ensemble la transformation digitale de votre enseignement commercial
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-accent text-lg px-8 py-4">
            Planifier une démo personnalisée
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}