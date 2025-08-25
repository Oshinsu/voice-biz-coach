import { ArrowRight, Brain, TrendingUp, Users, Zap, CheckCircle, Star, Mic, BarChart3, Shield, GraduationCap, Building, Target, PlayCircle, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedHeader } from "./EnhancedHeader";
import { TrustElements } from "./TrustElements";

export function ByssHomepage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <EnhancedHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 35, 102, 0.9), rgba(0, 35, 102, 0.7)), url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2088&auto=format&fit=crop')`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-8">
                <div className="w-20 h-1 bg-accent mb-6"></div>
                <h3 className="text-accent font-medium text-lg mb-4 tracking-wide">
                  RÉVÉLEZ VOTRE POTENTIEL
                </h3>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                L'expertise au service de<br />
                <span className="text-white">votre réussite</span><br />
                <span className="text-white">commerciale</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-12 max-w-2xl leading-relaxed">
                Byss VNS est votre partenaire de confiance pour booster vos compétences en 
                négociation commerciale, aspects stratégiques de la vente digitale, 
                et anglais des affaires. Nous proposons également des 
                ressources exclusives avec notre simulateur vocal IA de négociation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg text-lg font-medium" asChild>
                  <Link to="/scenarios">
                    Nos Services
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-medium" asChild>
                  <Link to="/auth">
                    En Savoir Plus →
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Demo Card */}
            <div className="relative">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                      <div className="p-3 bg-accent rounded-xl">
                        <Mic className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary">Session IA en cours</p>
                        <p className="text-sm text-muted-foreground">Négociation avec TechCorp</p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground font-medium">Progression globale</span>
                        <span className="text-sm font-bold text-accent">68%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: '68%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="text-2xl font-bold text-green-600">85%</div>
                        <div className="text-xs text-gray-600">Taux de réussite</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-xs text-gray-600">Objections gérées</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span>Simulation IA en temps réel</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Inspired by Métora */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="bg-primary rounded-3xl p-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Formation professionnelle" 
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <div className="bg-primary rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Byss VNS – Forgez votre Supériorité Stratégique
                </h2>
                <p className="text-lg leading-relaxed">
                  Créée par l'expertise en négociation et en développement commercial, Byss VNS est née de la volonté de transmettre des 
                  compétences indispensables à la réussite dans un environnement professionnel compétitif. 
                  Fort d'une riche expérience en négociation et en développement commercial, nous avons su 
                  allier pédagogie, expertise technique et maîtrise de l'IA pour offrir des formations 
                  innovantes et adaptées aux réalités du marché commercial. Notre mission : transformer 
                  vos ambitions en compétences concrètes et vous donner les clés pour exceller dans vos 
                  domaines d'activité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Transformez Vos Ambitions en Victoires
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Sous la direction de notre expertise, bénéficiez d'une formation 
                solide et d'un savoir-faire reconnu dans la formation professionnelle 
                et la négociation.
              </p>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-bold text-accent mb-2">24%</div>
                <h3 className="font-semibold text-primary mb-2">Productivité en hausse</h3>
                <p className="text-sm text-muted-foreground">
                  Les entreprises investissant dans des formations en ligne constatent en moyenne 
                  une augmentation de 24% de la productivité de leurs employés.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">90%</div>
                <h3 className="font-semibold text-primary mb-2">Adoption par les entreprises</h3>
                <p className="text-sm text-muted-foreground">
                  Près de 90% des entreprises à l'échelle mondiale utilisent désormais la formation en 
                  ligne pour développer les compétences de leurs collaborateurs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-bold text-accent mb-2">35%</div>
                <h3 className="font-semibold text-primary mb-2">Impact sur la négociation</h3>
                <p className="text-sm text-muted-foreground">
                  Les professionnels ayant suivi une formation en négociation améliorent leurs taux de 
                  succès dans la conclusion d'accords d'environ 35%.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">-50%</div>
                <h3 className="font-semibold text-primary mb-2">Réduction des coûts</h3>
                <p className="text-sm text-muted-foreground">
                  La formation en ligne permet de réduire les coûts liés à l'apprentissage jusqu'à 50% par 
                  rapport aux formations en présentiel traditionnelles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <div className="mb-8">
                <div className="w-20 h-1 bg-accent mb-6"></div>
                <h3 className="text-accent font-medium text-lg mb-4 tracking-wide">
                  NOS VALEURS
                </h3>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Byss VNS – L'Académie des Négociateurs du Futur
              </h2>
              
              <p className="text-lg mb-8 leading-relaxed opacity-90">
                Dans le monde professionnel, <strong>votre valeur n'est pas celle que 
                vous pensez, elle est celle que vous pouvez démontrer.</strong>
              </p>
              
              <p className="text-lg mb-12 leading-relaxed opacity-90">
                Chez <strong>Byss VNS</strong>, nous enseignons l'impact, la persuasion et 
                l'influence. Nos formations ne se limitent pas à vous 
                apprendre, elles vous arment pour un monde où chaque mot, 
                chaque contrat, chaque négociation peut être un <strong>game 
                changer</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-accent text-2xl mb-4">✓</div>
                  <h3 className="font-bold text-xl mb-3">
                    Les erreurs fatales à éviter qui peuvent vous coûter un deal.
                  </h3>
                  <p className="opacity-80">
                    Verrouiller un deal à votre avantage sans laisser une faille 
                    juridique.
                  </p>
                </div>
                
                <div>
                  <div className="text-accent text-2xl mb-4">✓</div>
                  <h3 className="font-bold text-xl mb-3">
                    Comment identifier et exploiter les failles de votre interlocuteur.
                  </h3>
                  <p className="opacity-80">
                    Convaincre, influencer et obtenir ce que vous voulez, même face aux 
                    interlocuteurs les plus coriaces.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop" 
                alt="Professionnelle au travail" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Votre passerelle vers l'excellence
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Investissez dans votre développement aujourd'hui pour ouvrir les portes d'un 
            futur prometteur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-accent hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-medium" asChild>
              <Link to="/scenarios">
                Découvrir nos formations
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-medium" asChild>
              <Link to="/auth">
                Commencer gratuitement
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <TrustElements />
    </div>
  );
}