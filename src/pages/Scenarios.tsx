import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestButton } from "@/components/ui/test-button";
import { MagicSpotlight } from "@/components/ui/magic-spotlight";
import { ModernScenarioCard } from "@/components/ModernScenarioCard";
import { EnhancedHeader } from "@/components/EnhancedHeader";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building, Users, TrendingUp, Target, ArrowRight, 
  Star, MapPin, Calendar, DollarSign, Loader2, AlertCircle, Filter, Search, Brain
} from "lucide-react";
import { useScenarios } from "@/hooks/useScenarios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Scenarios = () => {
  const { scenarios, loading, error } = useScenarios();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");

  // Filtered scenarios
  const filteredScenarios = useMemo(() => {
    return scenarios.filter(scenario => {
      const matchesSearch = scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (scenario.company_name || "").toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDifficulty = difficultyFilter === "all" || scenario.difficulty === difficultyFilter;
      const matchesSector = sectorFilter === "all" || (scenario.company_sector || "").includes(sectorFilter);
      
      return matchesSearch && matchesDifficulty && matchesSector;
    });
  }, [scenarios, searchTerm, difficultyFilter, sectorFilter]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      case "Intermédiaire": return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Avancé": return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <EnhancedHeader />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-accent mx-auto" />
            </motion.div>
            <motion.p 
              className="text-lg text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Chargement des scénarios révolutionnaires...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <EnhancedHeader />
        <div className="pt-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Alert className="max-w-2xl mx-auto border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                Erreur lors du chargement des scénarios: {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <EnhancedHeader />
      
      <main className="pt-20 relative z-10">
        {/* Hero Section Ultra-Moderne */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Target className="mr-2 h-4 w-4" />
                </motion.div>
                Scénarios d'entraînement
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Maîtrisez tous les{" "}
              <motion.span 
                className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent drop-shadow-lg"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                contextes commerciaux
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Découvrez nos scénarios de vente ultra-réalistes conçus pour développer vos compétences 
              dans différents secteurs et situations commerciales avec l'IA GPT-4o Realtime.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { icon: Building, label: `${scenarios.length} secteurs différents` },
                { icon: Target, label: "Objectifs personnalisés" },
                { icon: TrendingUp, label: "Niveaux progressifs" },
                { icon: Brain, label: "IA conversationnelle" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-3 rounded-full border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-5 w-5 text-accent group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Filtres Ultra-Interactifs */}
            <motion.div 
              className="max-w-4xl mx-auto mb-12 p-6 bg-background/60 backdrop-blur-lg rounded-2xl border border-border/50 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Filter className="h-5 w-5 text-accent" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground">Filtres Intelligents</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un scénario..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-background/80 backdrop-blur-sm border-border/50 focus:border-accent transition-all duration-300"
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/50 focus:border-accent transition-all duration-300">
                      <SelectValue placeholder="Niveau de difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les niveaux</SelectItem>
                      <SelectItem value="Débutant">Débutant</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Avancé">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/50 focus:border-accent transition-all duration-300">
                      <SelectValue placeholder="Secteur d'activité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les secteurs</SelectItem>
                      <SelectItem value="Technologie">Technologie</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Santé">Santé</SelectItem>
                      <SelectItem value="Éducation">Éducation</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-4 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-sm text-muted-foreground">
                  <motion.span
                    key={filteredScenarios.length}
                    initial={{ scale: 1.2, color: "hsl(var(--accent))" }}
                    animate={{ scale: 1, color: "hsl(var(--muted-foreground))" }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredScenarios.length}
                  </motion.span> scénario{filteredScenarios.length > 1 ? 's' : ''} trouvé{filteredScenarios.length > 1 ? 's' : ''}
                </span>
                {(searchTerm || difficultyFilter !== "all" || sectorFilter !== "all") && (
                  <motion.button
                    onClick={() => {
                      setSearchTerm("");
                      setDifficultyFilter("all");
                      setSectorFilter("all");
                    }}
                    className="text-xs text-accent hover:text-accent/80 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Réinitialiser les filtres
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Scenarios Grid Révolutionnaire */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={filteredScenarios.length}
                className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredScenarios.map((scenario, index) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -8 }}
                    layout
                  >
                    <MagicSpotlight className="h-full">
                      <Card className="group hover:shadow-2xl transition-all duration-500 bg-card/90 backdrop-blur-sm border border-border/50 overflow-hidden h-full flex flex-col">
                        <CardContent className="p-8 flex-1 flex flex-col">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <motion.h3 
                                className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300"
                                whileHover={{ scale: 1.02 }}
                              >
                                {scenario.title}
                              </motion.h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {scenario.description}
                              </p>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge 
                                className={`ml-4 ${getDifficultyColor(scenario.difficulty)} flex-shrink-0 backdrop-blur-sm`}
                              >
                                {scenario.difficulty}
                              </Badge>
                            </motion.div>
                          </div>

                          {/* Company Info Premium */}
                          <div className="space-y-3 mb-6 p-4 bg-secondary/30 rounded-lg backdrop-blur-sm">
                            {[
                              { icon: Building, label: scenario.company_name || scenario.company?.name },
                              { icon: MapPin, label: scenario.company_sector || scenario.company?.sector },
                              { icon: Users, label: scenario.company_size || scenario.company?.size },
                              { icon: DollarSign, label: scenario.budget_range || scenario.company?.budget }
                            ].map((info, infoIndex) => info.label && (
                              <motion.div 
                                key={infoIndex}
                                className="flex items-center gap-2 group/item"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 + infoIndex * 0.1 }}
                                whileHover={{ x: 5 }}
                              >
                                <motion.div
                                  whileHover={{ rotate: 360, scale: 1.2 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <info.icon className="h-4 w-4 text-muted-foreground group-hover/item:text-accent transition-colors duration-300 flex-shrink-0" />
                                </motion.div>
                                <span className="text-sm text-foreground line-clamp-1 group-hover/item:text-accent transition-colors duration-300">
                                  {info.label}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Stats Interactive */}
                          <motion.div 
                            className="flex items-center justify-between mb-6 p-4 bg-background/50 rounded-lg backdrop-blur-sm"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            {[
                              { 
                                value: (scenario.main_objectives || scenario.objectives || []).length, 
                                label: "Objectifs",
                                color: "text-accent"
                              },
                              { 
                                value: (scenario.available_tools || scenario.tools || []).length, 
                                label: "Outils",
                                color: "text-primary"
                              },
                              { 
                                value: scenario.difficulty, 
                                label: "Niveau",
                                color: "text-success"
                              }
                            ].map((stat, statIndex) => (
                              <motion.div 
                                key={statIndex}
                                className="text-center"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <motion.div 
                                  className={`text-lg font-bold ${stat.color}`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ 
                                    delay: 0.8 + index * 0.1 + statIndex * 0.1, 
                                    type: "spring", 
                                    stiffness: 200 
                                  }}
                                >
                                  {stat.value}
                                </motion.div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                              </motion.div>
                            ))}
                          </motion.div>

                          {/* Pain Points Preview */}
                          <motion.div 
                            className="mb-6 flex-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 + index * 0.1 }}
                          >
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                              >
                                <Target className="h-4 w-4 text-accent" />
                              </motion.div>
                              Enjeux principaux :
                            </h4>
                            <div className="space-y-2">
                              {(scenario.pain_points || scenario.company?.painPoints || []).slice(0, 2).map((point, idx) => (
                                <motion.div 
                                  key={idx}
                                  className="text-xs text-muted-foreground flex items-start gap-2 p-2 bg-secondary/20 rounded-md"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.2 + index * 0.1 + idx * 0.1 }}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                >
                                  <motion.div 
                                    className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                                  />
                                  <span className="line-clamp-1">
                                    {typeof point === 'string' ? point : point.issue}
                                  </span>
                                </motion.div>
                              ))}
                              {(scenario.pain_points || scenario.company?.painPoints || []).length > 2 && (
                                <motion.div 
                                  className="text-xs text-accent font-medium pl-4"
                                  animate={{ opacity: [0.6, 1, 0.6] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  +{(scenario.pain_points || scenario.company?.painPoints || []).length - 2} autres enjeux...
                                </motion.div>
                              )}
                            </div>
                          </motion.div>

                          {/* CTA Spectaculaire */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-auto"
                          >
                            <TestButton 
                              variant="magic"
                              className="w-full group/button"
                              asChild
                            >
                              <Link to={`/scenario/${scenario.id}`}>
                                <span className="flex items-center justify-center">
                                  Commencer ce scénario
                                  <motion.div
                                    className="ml-2"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-300" />
                                  </motion.div>
                                </span>
                              </Link>
                            </TestButton>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </MagicSpotlight>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredScenarios.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Aucun scénario trouvé</h3>
                <p className="text-muted-foreground mb-6">Essayez de modifier vos filtres pour découvrir nos scénarios.</p>
                <TestButton 
                  onClick={() => {
                    setSearchTerm("");
                    setDifficultyFilter("all");
                    setSectorFilter("all");
                  }}
                  variant="outline"
                >
                  Réinitialiser les filtres
                </TestButton>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section Ultra-Premium */}
        <section className="py-20 px-6 bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Prêt à développer vos compétences commerciales ?
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Choisissez un scénario adapté à votre niveau et commencez votre entraînement dès maintenant avec notre IA révolutionnaire.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TestButton variant="magic" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/contact">
                  Demander une démonstration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </TestButton>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Scenarios;