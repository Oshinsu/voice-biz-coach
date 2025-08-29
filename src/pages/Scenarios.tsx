import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedHeader } from "@/components/EnhancedHeader";
import { Link } from "react-router-dom";
import { 
  Building, Users, TrendingUp, Target, ArrowRight, 
  Star, MapPin, Calendar, DollarSign, Loader2, AlertCircle 
} from "lucide-react";
import { useScenarios } from "@/hooks/useScenarios";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Scenarios = () => {
  const { scenarios, loading, error } = useScenarios();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "bg-green-100 text-green-800 border-green-200";
      case "Intermédiaire": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Avancé": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <EnhancedHeader />
        <div className="pt-24 px-6">
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erreur lors du chargement des scénarios: {error}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 animate-bounce-gentle">
              Scénarios d'entraînement
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Maîtrisez tous les{" "}
              <span className="bg-gradient-to-r from-accent to-accent bg-clip-text text-transparent">
                contextes commerciaux
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up">
              Découvrez nos scénarios de vente réalistes conçus pour développer vos compétences 
              dans différents secteurs et situations commerciales.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full border">
                <Building className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">{scenarios.length} secteurs différents</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full border">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Objectifs personnalisés</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full border">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Niveaux progressifs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Scenarios Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {scenarios.map((scenario, index) => (
                <Card 
                  key={scenario.id} 
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {scenario.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {scenario.description}
                        </p>
                      </div>
                      <Badge 
                        className={`ml-4 ${getDifficultyColor(scenario.difficulty)} flex-shrink-0`}
                      >
                        {scenario.difficulty}
                      </Badge>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium line-clamp-1">
                          {scenario.company_name || scenario.company?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {scenario.company_sector || scenario.company?.sector}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground line-clamp-1">
                          {scenario.company_size || scenario.company?.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {scenario.budget_range || scenario.company?.budget}
                        </span>
                      </div>
                    </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-6 p-3 bg-background/50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{(scenario.main_objectives || scenario.objectives || []).length}</div>
                <div className="text-xs text-muted-foreground">Objectifs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{(scenario.available_tools || scenario.tools || []).length}</div>
                <div className="text-xs text-muted-foreground">Outils</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{scenario.difficulty}</div>
                <div className="text-xs text-muted-foreground">Niveau</div>
              </div>
            </div>

                    {/* Pain Points Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Enjeux principaux :</h4>
                      <div className="space-y-1">
                        {(scenario.pain_points || scenario.company?.painPoints || []).slice(0, 2).map((point, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="line-clamp-1">
                              {typeof point === 'string' ? point : point.issue}
                            </span>
                          </div>
                        ))}
                        {(scenario.pain_points || scenario.company?.painPoints || []).length > 2 && (
                          <div className="text-xs text-accent font-medium">
                            +{(scenario.pain_points || scenario.company?.painPoints || []).length - 2} autres enjeux...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button 
                      className="w-full bg-gradient-cta hover:shadow-lg hover:shadow-accent/30 text-accent-foreground transition-all duration-300 hover:scale-105 group"
                      asChild
                    >
                      <Link to={`/scenario/${scenario.id}`}>
                        Commencer ce scénario
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-accent/5 to-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Prêt à développer vos compétences commerciales ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choisissez un scénario adapté à votre niveau et commencez votre entraînement dès maintenant.
            </p>
            <Button size="lg" className="bg-gradient-cta hover:shadow-lg hover:shadow-accent/30 text-accent-foreground text-lg px-8 py-4 hover:scale-105 transition-all duration-300" asChild>
              <Link to="/contact">
                Demander une démonstration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Scenarios;