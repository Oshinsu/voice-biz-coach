import { Brain, Scale, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Terms() {
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
      <section className="pt-32 pb-12 px-6 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-4 bg-accent/10 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <Scale className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-6">
            Dernière mise à jour : 25 août 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-0 shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Objet et champ d'application</h2>
                <p className="text-muted-foreground mb-6">
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme 
                  Byss VNS (Virtual Negotiation Simulator), un service de formation commerciale par intelligence 
                  artificielle vocale proposé par la société Byss.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">2. Définitions</h2>
                <div className="text-muted-foreground mb-6">
                  <p><strong>« Plateforme » :</strong> désigne l'ensemble des services Byss VNS accessibles via l'interface web.</p>
                  <p><strong>« Utilisateur » :</strong> désigne toute personne physique utilisant la Plateforme.</p>
                  <p><strong>« Client » :</strong> désigne l'établissement d'enseignement ayant souscrit un abonnement.</p>
                  <p><strong>« Contenu » :</strong> désigne tous les éléments présents sur la Plateforme (textes, images, vidéos, données).</p>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-4">3. Acceptation des conditions</h2>
                <p className="text-muted-foreground mb-6">
                  L'utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGU. 
                  Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">4. Description des services</h2>
                <p className="text-muted-foreground mb-4">
                  Byss VNS propose une plateforme de formation commerciale utilisant l'intelligence artificielle 
                  vocale pour simuler des négociations B2B. Les services incluent :
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Accès aux simulations de négociation vocale IA</li>
                  <li>• Tableaux de bord d'analyse des performances</li>
                  <li>• Bibliothèque de scénarios commerciaux</li>
                  <li>• Outils de gestion pédagogique pour les formateurs</li>
                  <li>• Support technique et pédagogique</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">5. Conditions d'accès</h2>
                <p className="text-muted-foreground mb-4">
                  L'accès à la Plateforme est réservé aux établissements d'enseignement et leurs étudiants 
                  dûment autorisés. L'utilisateur doit :
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Être âgé d'au moins 16 ans</li>
                  <li>• Fournir des informations exactes lors de l'inscription</li>
                  <li>• Respecter les règles d'usage de l'établissement</li>
                  <li>• Maintenir la confidentialité de ses identifiants</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">6. Obligations de l'utilisateur</h2>
                <p className="text-muted-foreground mb-4">L'utilisateur s'engage à :</p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Utiliser la Plateforme conformément à sa destination pédagogique</li>
                  <li>• Ne pas tenter de contourner les mesures de sécurité</li>
                  <li>• Ne pas partager ses identifiants avec des tiers</li>
                  <li>• Respecter les droits de propriété intellectuelle</li>
                  <li>• Ne pas utiliser la Plateforme à des fins illégales ou nuisibles</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">7. Propriété intellectuelle</h2>
                <p className="text-muted-foreground mb-6">
                  Tous les éléments de la Plateforme (interface, contenu, algorithmes, base de données) 
                  sont protégés par les droits de propriété intellectuelle. Toute reproduction, 
                  représentation, modification ou exploitation sans autorisation est interdite.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">8. Protection des données personnelles</h2>
                <p className="text-muted-foreground mb-6">
                  Le traitement des données personnelles est régi par notre Politique de Confidentialité, 
                  conforme au RGPD. Nous nous engageons à protéger la vie privée des utilisateurs et 
                  à traiter leurs données de manière transparente et sécurisée.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">9. Responsabilités et garanties</h2>
                <p className="text-muted-foreground mb-4">
                  Byss s'efforce d'assurer la disponibilité et la fiabilité de la Plateforme. 
                  Cependant, nous ne garantissons pas :
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• L'absence d'interruptions ou d'erreurs</li>
                  <li>• La compatibilité avec tous les environnements techniques</li>
                  <li>• L'exactitude absolue des simulations IA</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation de responsabilité</h2>
                <p className="text-muted-foreground mb-6">
                  La responsabilité de Byss est limitée aux dommages directs et prévisibles. 
                  En aucun cas, nous ne pourrons être tenus responsables des dommages indirects, 
                  perte de données, manque à gagner ou préjudice commercial.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">11. Tarification et facturation</h2>
                <p className="text-muted-foreground mb-6">
                  Les tarifs sont indiqués hors taxes et peuvent être modifiés avec un préavis de 30 jours. 
                  La facturation s'effectue mensuellement à terme échu. Les coûts d'utilisation de l'API 
                  OpenAI sont facturés en sus selon la consommation réelle.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">12. Résiliation</h2>
                <p className="text-muted-foreground mb-6">
                  L'abonnement peut être résilié par chaque partie avec un préavis de 30 jours. 
                  En cas de manquement grave aux présentes CGU, Byss peut suspendre ou résilier 
                  l'accès immédiatement.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">13. Modification des CGU</h2>
                <p className="text-muted-foreground mb-6">
                  Byss se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les utilisateurs seront informés des modifications par email et via la Plateforme. 
                  La poursuite de l'utilisation vaut acceptation des nouvelles conditions.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">14. Droit applicable et juridiction</h2>
                <p className="text-muted-foreground mb-6">
                  Les présentes CGU sont régies par le droit français. Tout litige relève de la 
                  compétence exclusive des tribunaux de Paris, sauf disposition contraire d'ordre public.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">15. Contact</h2>
                <p className="text-muted-foreground mb-6">
                  Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
                </p>
                <div className="text-muted-foreground">
                  <p><strong>Email :</strong> legal@byss-vns.com</p>
                  <p><strong>Adresse :</strong> 123 Avenue de l'Innovation, 75001 Paris, France</p>
                  <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-accent" />
                  Documents Connexes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/privacy" className="block text-accent hover:underline">
                    → Politique de Confidentialité
                  </Link>
                  <Link to="/contact" className="block text-accent hover:underline">
                    → Nous Contacter
                  </Link>
                  <a href="#" className="block text-accent hover:underline">
                    → Mentions Légales
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Questions ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Notre équipe juridique est disponible pour répondre à vos questions 
                  concernant ces conditions d'utilisation.
                </p>
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent-dark text-accent-foreground">
                    Nous Contacter
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}