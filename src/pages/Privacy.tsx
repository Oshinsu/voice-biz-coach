import { Brain, Shield, Lock, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Privacy() {
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
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Politique de Confidentialité
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge className="bg-accent/10 text-accent border-accent/20">RGPD Compliant</Badge>
            <Badge className="bg-success/10 text-success border-success/20">ISO 27001</Badge>
          </div>
          <p className="text-lg text-primary-foreground/80">
            Dernière mise à jour : 25 août 2024
          </p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-card border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-accent/10 rounded-full w-12 h-12 mx-auto mb-4">
                  <Lock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-bold mb-2">Chiffrement End-to-End</h3>
                <p className="text-sm text-muted-foreground">
                  Toutes vos données sont chiffrées en transit et au repos
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-success/10 rounded-full w-12 h-12 mx-auto mb-4">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-bold mb-2">Conformité RGPD</h3>
                <p className="text-sm text-muted-foreground">
                  Respect total du Règlement Général sur la Protection des Données
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Transparence Totale</h3>
                <p className="text-sm text-muted-foreground">
                  Vous contrôlez entièrement vos données personnelles
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Responsable du traitement</h2>
                <p className="text-muted-foreground mb-6">
                  Byss, société par actions simplifiée au capital de 100 000 €, immatriculée au RCS de Paris 
                  sous le numéro 123 456 789, dont le siège social est situé au 123 Avenue de l'Innovation, 
                  75001 Paris, France, est le responsable du traitement de vos données personnelles.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">2. Données collectées</h2>
                <p className="text-muted-foreground mb-4">
                  Dans le cadre de l'utilisation de la plateforme Byss VNS, nous collectons les données suivantes :
                </p>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">Données d'identification :</h3>
                <ul className="text-muted-foreground mb-4 space-y-1">
                  <li>• Nom et prénom</li>
                  <li>• Adresse email institutionnelle</li>
                  <li>• Établissement d'affiliation</li>
                  <li>• Fonction/statut (étudiant, enseignant, administrateur)</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Données d'utilisation :</h3>
                <ul className="text-muted-foreground mb-4 space-y-1">
                  <li>• Enregistrements vocaux des simulations (temporaires)</li>
                  <li>• Transcriptions des conversations</li>
                  <li>• Métriques de performance (scores, durées, techniques utilisées)</li>
                  <li>• Données de navigation et d'usage de la plateforme</li>
                  <li>• Logs techniques (adresse IP, navigateur, timestamps)</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Données techniques :</h3>
                <ul className="text-muted-foreground mb-6 space-y-1">
                  <li>• Informations sur le dispositif utilisé</li>
                  <li>• Données de géolocalisation (pays/région)</li>
                  <li>• Préférences linguistiques</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">3. Finalités du traitement</h2>
                <p className="text-muted-foreground mb-4">Vos données sont traitées pour les finalités suivantes :</p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• <strong>Fourniture du service :</strong> Permettre l'accès et l'utilisation de la plateforme</li>
                  <li>• <strong>Pédagogie :</strong> Analyser les performances et fournir des feedbacks personnalisés</li>
                  <li>• <strong>Administration :</strong> Gestion des comptes utilisateurs et support technique</li>
                  <li>• <strong>Amélioration :</strong> Optimisation de l'IA et des fonctionnalités</li>
                  <li>• <strong>Sécurité :</strong> Protection contre les usages frauduleux</li>
                  <li>• <strong>Conformité :</strong> Respect des obligations légales et réglementaires</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">4. Base légale</h2>
                <p className="text-muted-foreground mb-6">
                  Le traitement de vos données repose sur l'exécution du contrat de service souscrit par votre 
                  établissement (art. 6.1.b du RGPD) et sur notre intérêt légitime à améliorer nos services 
                  (art. 6.1.f du RGPD). Pour les données sensibles comme les enregistrements vocaux, 
                  nous nous appuyons sur votre consentement explicite.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">5. Conservation des données</h2>
                <div className="text-muted-foreground mb-6">
                  <p><strong>Enregistrements vocaux :</strong> Supprimés automatiquement après 24 heures</p>
                  <p><strong>Transcriptions :</strong> Conservées pendant la durée de formation + 1 an</p>
                  <p><strong>Données de performance :</strong> Conservées pendant 3 ans après la fin des études</p>
                  <p><strong>Données de compte :</strong> Conservées pendant la durée du contrat + 5 ans</p>
                  <p><strong>Logs techniques :</strong> Conservés pendant 12 mois maximum</p>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-4">6. Partage des données</h2>
                <p className="text-muted-foreground mb-4">
                  Vos données peuvent être partagées avec :
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• <strong>OpenAI :</strong> Pour le traitement des simulations IA (partenaire certifié)</li>
                  <li>• <strong>Votre établissement :</strong> Données de performance pour le suivi pédagogique</li>
                  <li>• <strong>Prestataires techniques :</strong> Hébergement sécurisé (AWS Europe)</li>
                  <li>• <strong>Autorités :</strong> En cas d'obligation légale uniquement</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">7. Sécurité des données</h2>
                <p className="text-muted-foreground mb-4">
                  Nous mettons en œuvre des mesures de sécurité de niveau entreprise :
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Chiffrement AES-256 des données en transit et au repos</li>
                  <li>• Authentification multi-facteurs pour les accès administrateur</li>
                  <li>• Audits de sécurité réguliers par des tiers certifiés</li>
                  <li>• Hébergement dans des centres de données certifiés ISO 27001</li>
                  <li>• Surveillance 24/7 et détection d'intrusion</li>
                  <li>• Sauvegarde chiffrée et plan de continuité d'activité</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">8. Vos droits</h2>
                <p className="text-muted-foreground mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• <strong>Droit d'accès :</strong> Connaître les données vous concernant</li>
                  <li>• <strong>Droit de rectification :</strong> Corriger les données inexactes</li>
                  <li>• <strong>Droit à l'effacement :</strong> Supprimer vos données (sous conditions)</li>
                  <li>• <strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                  <li>• <strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                  <li>• <strong>Droit d'opposition :</strong> Vous opposer au traitement (sous conditions)</li>
                  <li>• <strong>Droit de retrait du consentement :</strong> Pour les traitements basés sur le consentement</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mb-4">9. Transferts internationaux</h2>
                <p className="text-muted-foreground mb-6">
                  Nos données sont hébergées exclusivement dans l'Union Européenne. Les échanges avec OpenAI 
                  sont sécurisés par des clauses contractuelles types approuvées par la Commission Européenne 
                  et leur certification SOC 2 Type II.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">10. Cookies et technologies similaires</h2>
                <p className="text-muted-foreground mb-6">
                  Nous utilisons uniquement des cookies techniques essentiels au fonctionnement de la plateforme. 
                  Aucun cookie de tracking ou publicitaire n'est déployé. Vous pouvez configurer votre navigateur 
                  pour refuser les cookies, mais cela peut affecter le fonctionnement du service.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">11. Modifications de la politique</h2>
                <p className="text-muted-foreground mb-6">
                  Cette politique peut être mise à jour pour refléter les évolutions de nos services ou 
                  de la réglementation. Vous serez informé de toute modification substantielle par email 
                  et via la plateforme au moins 30 jours avant l'entrée en vigueur.
                </p>

                <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact et réclamations</h2>
                <p className="text-muted-foreground mb-4">
                  Pour exercer vos droits ou pour toute question relative à cette politique :
                </p>
                <div className="text-muted-foreground mb-4">
                  <p><strong>Délégué à la Protection des Données (DPO) :</strong></p>
                  <p>Email : dpo@byss-vns.com</p>
                  <p>Adresse : 123 Avenue de l'Innovation, 75001 Paris, France</p>
                  <p>Téléphone : +33 1 23 45 67 89</p>
                </div>
                <p className="text-muted-foreground mb-6">
                  <strong>Délai de réponse :</strong> Nous nous engageons à répondre dans un délai de 30 jours 
                  maximum. En cas de réclamation, vous pouvez également vous adresser à la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Actions */}
      <section className="py-12 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-accent" />
                  Exercer vos droits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Vous souhaitez accéder à vos données, les modifier ou les supprimer ? 
                  Contactez notre DPO.
                </p>
                <Button className="bg-accent hover:bg-accent-dark text-accent-foreground">
                  Contacter le DPO
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Documents connexes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/terms" className="block text-accent hover:underline">
                    → Conditions Générales d'Utilisation
                  </Link>
                  <Link to="/contact" className="block text-accent hover:underline">
                    → Nous Contacter
                  </Link>
                  <a href="#" className="block text-accent hover:underline">
                    → Centre de Préférences
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}