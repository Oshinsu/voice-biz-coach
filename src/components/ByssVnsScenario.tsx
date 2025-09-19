import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestButton } from '@/components/ui/test-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MagicSpotlight } from '@/components/ui/magic-spotlight';
import { SophieAgentsSDK } from '@/components/voice-agents';
import { 
  Building2, 
  TrendingUp, 
  Target, 
  Users, 
  Zap, 
  Phone,
  Calendar,
  Trophy,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  Shield,
  TrendingDown,
  Package,
  DollarSign,
  LineChart,
  Briefcase,
  FileText,
  MessageSquare,
  Star,
  Globe,
  Settings
} from 'lucide-react';
import { useScenarios } from '@/hooks/useScenarios';

interface ByssVnsScenarioProps {
  onStartSession?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.03
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

export const ByssVnsScenario: React.FC<ByssVnsScenarioProps> = ({ onStartSession }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById('byss-vns-school');
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);

  if (!scenario) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Scénario EDHEC non trouvé</p>
      </div>
    );
  }

  const handleStartSession = () => {
    setShowVoiceAgent(true);
    onStartSession?.();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 min-h-screen"
    >
      {/* Section 1: Vue d'ensemble EDHEC */}
      <motion.div variants={itemVariants}>
        <MagicSpotlight className="relative overflow-hidden">
          <Card className="border-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {scenario.company.name}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    {scenario.description}
                  </p>
                </div>
                <Badge variant="destructive" className="text-sm">
                  {scenario.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">Ranking</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {scenario.company.metrics.rankingFT}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Étudiants</span>
                  </div>
                  <p className="text-sm text-muted-foreground">9,000 étudiants</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Timeline</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Innovation 2024</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Target className="w-5 h-5" />
                    <span className="font-medium">Contact</span>
                  </div>
                  <p className="text-sm text-muted-foreground">S. Hennion-Moreau</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>

      {/* Section 2-6: 5 Onglets détaillés */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="edhec" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="edhec" className="flex items-center gap-1 text-xs">
              <Building2 className="w-3 h-3" />
              EDHEC
            </TabsTrigger>
            <TabsTrigger value="byss" className="flex items-center gap-1 text-xs">
              <Zap className="w-3 h-3" />
              BYSS VNS
            </TabsTrigger>
            <TabsTrigger value="produit" className="flex items-center gap-1 text-xs">
              <Package className="w-3 h-3" />
              Produit
            </TabsTrigger>
            <TabsTrigger value="marche" className="flex items-center gap-1 text-xs">
              <BarChart3 className="w-3 h-3" />
              Marché
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex items-center gap-1 text-xs">
              <Target className="w-3 h-3" />
              Commercial
            </TabsTrigger>
          </TabsList>

          {/* Onglet 1: Entreprise EDHEC */}
          <TabsContent value="edhec" className="space-y-4">
            {/* SWOT EDHEC */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  SWOT Analysis - EDHEC Business School
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-emerald-700 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Forces
                      </h4>
                      <ul className="space-y-1 text-sm text-emerald-600">
                        <li>• 4ème mondial Financial Times MSc Finance</li>
                        <li>• 94% employabilité diplômés</li>
                        <li>• 160M€ CA, solidité financière</li>
                        <li>• Brand recognition international</li>
                        <li>• Réseau alumni puissant (50,000)</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <h4 className="font-medium text-amber-700 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Opportunités
                      </h4>
                      <ul className="space-y-1 text-sm text-amber-600">
                        <li>• Leadership IA éducative (early adopter)</li>
                        <li>• Différentiation vs HEC/ESSEC/ESCP</li>
                        <li>• Marché EdTech: +35% CAGR</li>
                        <li>• Expansion digital learning</li>
                        <li>• Partenariats tech innovants</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Faiblesses
                      </h4>
                      <ul className="space-y-1 text-sm text-red-600">
                        <li>• Innovation tech: behind competitors</li>
                        <li>• Outils formation: obsoletes (Cesim 2010)</li>
                        <li>• Scalabilité limitée formats actuels</li>
                        <li>• Engagement étudiant: 82% seulement</li>
                        <li>• ROI formation: difficilement mesurable</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h4 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Menaces
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• Concurrence HEC/ESSEC sur l'innovation</li>
                        <li>• Disruption EdTech startups</li>
                        <li>• Budget contraints post-COVID</li>
                        <li>• Expectations étudiants: expérience digitale</li>
                        <li>• Perte leadership si pas d'innovation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Métriques EDHEC */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Métriques & KPIs EDHEC (Vérifiés)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Performance Académique</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ranking FT MSc Finance</span>
                        <span className="font-medium">#4 Mondial</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Employabilité 6 mois</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Satisfaction étudiants</span>
                        <span className="font-medium">82%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Métriques Business</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Chiffre d'affaires</span>
                        <span className="font-medium">160M€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Corporate Training</span>
                        <span className="font-medium">15M€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget IT annuel</span>
                        <span className="font-medium">500k€</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Écosystème Tech</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>LMS actuel</span>
                        <span className="font-medium">Blackboard</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Simulation business</span>
                        <span className="font-medium">Cesim (85k€)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Environnement</span>
                        <span className="font-medium">Microsoft 365</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pain Points EDHEC */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Pain Points Critiques EDHEC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {[
                    "Outils simulation obsolètes: Cesim date de 2010, UX dégradée",
                    "Scalabilité formations limitée: 1 prof = 25 étudiants max",
                    "ROI formation impossible à mesurer précisément",
                    "Engagement étudiant stagnant: 82% vs objectif 90%",
                    "Concurrence innovation: HEC/ESSEC investissent massivement IA",
                    "Pression budgétaire: optimiser coût par étudiant formé"
                  ].map((pain, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                    >
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{pain}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet 2: Entreprise BYSS VNS */}
          <TabsContent value="byss" className="space-y-4">
            {/* SWOT BYSS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  SWOT Analysis - BYSS VNS (Notre Entreprise)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-emerald-700 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Forces
                      </h4>
                      <ul className="space-y-1 text-sm text-emerald-600">
                        <li>• Technologie GPT-4o Realtime exclusive</li>
                        <li>• Partnership OpenAI Agents SDK</li>
                        <li>• Équipe expertise IA + EdTech</li>
                        <li>• Product-Market Fit validé (EDHEC pilot)</li>
                        <li>• Innovation 18 mois d'avance marché</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <h4 className="font-medium text-amber-700 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Opportunités
                      </h4>
                      <ul className="space-y-1 text-sm text-amber-600">
                        <li>• Marché EdTech IA: 890B$ en 2028</li>
                        <li>• Remplacement Cesim/Marketplace obsolètes</li>
                        <li>• Expansion corporate training</li>
                        <li>• Partenariats business schools européennes</li>
                        <li>• Leadership vocal AI training</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Faiblesses
                      </h4>
                      <ul className="space-y-1 text-sm text-red-600">
                        <li>• Startup 3 personnes: ressources limitées</li>
                        <li>• Pre-revenue: pas de track record</li>
                        <li>• Dépendance technologique OpenAI</li>
                        <li>• Capital limité: 50k€ bootstrap</li>
                        <li>• Pas de réseau commercial établi</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h4 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Menaces
                      </h4>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>• OpenAI lance produit concurrent direct</li>
                        <li>• Incumbents (Cesim) développent IA</li>
                        <li>• Cycle adoption lent business schools</li>
                        <li>• Regulation IA éducation</li>
                        <li>• Concurrence Big Tech (Google, Microsoft)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Porter's 5 Forces */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Porter's 5 Forces - Analyse Concurrentielle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-700 mb-2">Concurrence Directe</h4>
                    <div className="space-y-1 text-sm text-red-600">
                      <div className="flex justify-between">
                        <span>Intensité</span>
                        <span className="font-medium">ÉLEVÉE</span>
                      </div>
                      <p>Cesim, Marketplace Simulations, Simformer</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-700 mb-2">Nouveaux Entrants</h4>
                    <div className="space-y-1 text-sm text-orange-600">
                      <div className="flex justify-between">
                        <span>Menace</span>
                        <span className="font-medium">MOYENNE</span>
                      </div>
                      <p>Barrières tech élevées, capital requis</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-700 mb-2">Produits Substituts</h4>
                    <div className="space-y-1 text-sm text-yellow-600">
                      <div className="flex justify-between">
                        <span>Menace</span>
                        <span className="font-medium">FAIBLE</span>
                      </div>
                      <p>Formations classiques, role-play physique</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-700 mb-2">Pouvoir Fournisseurs</h4>
                    <div className="space-y-1 text-sm text-blue-600">
                      <div className="flex justify-between">
                        <span>Force</span>
                        <span className="font-medium">ÉLEVÉE</span>
                      </div>
                      <p>Dépendance OpenAI GPT-4o</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-2">Pouvoir Clients</h4>
                    <div className="space-y-1 text-sm text-green-600">
                      <div className="flex justify-between">
                        <span>Force</span>
                        <span className="font-medium">MOYENNE</span>
                      </div>
                      <p>Business schools: budgets contraints</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Équipe BYSS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Équipe & Positionnement BYSS VNS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Équipe Fondatrice</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">CTO Tech Lead</p>
                          <p className="text-xs text-muted-foreground">OpenAI Partnership, 8 ans IA</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">CEO Business</p>
                          <p className="text-xs text-muted-foreground">Ex-EdTech, Harvard MBA</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">Advisor Pedagogy</p>
                          <p className="text-xs text-muted-foreground">Prof EDHEC, expertise sales</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Différentiation Concurrentielle</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Seule solution vocale IA temps réel</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Analytics comportementaux avancés</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">20+ personas client calibrées</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Intégration LMS native</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Conformité RGPD éducation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet 3: Produit BYSS VNS */}
          <TabsContent value="produit" className="space-y-4">
            {/* Features Produit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Byss VNS - Simulateur Vocal IA (Détails Produit)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Vision Produit</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Premier simulateur de négociation commerciale avec IA conversationnelle vocale temps réel. 
                    Révolutionne l'apprentissage des soft skills par l'expérience immersive et l'analytics comportemental.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Core Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">IA Vocale GPT-4o Realtime</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">20+ Personas Client Calibrées</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Analytics Comportementaux</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Scenarios Personnalisables</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-secondary">Intégrations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span className="text-sm">LMS Blackboard/Moodle</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span className="text-sm">Microsoft Teams</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span className="text-sm">API Analytics Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Export Données GDPR</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-accent">Enterprise</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">SSO SAML/LDAP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">Hosting EU (RGPD)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">Support 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Custom Branding</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Pricing Transparent - Business Schools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Starter</h4>
                    <div className="text-2xl font-bold mb-2">599€ <span className="text-sm text-muted-foreground">/mois</span></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Étudiants inclus</span>
                        <span className="font-medium">50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scenarios</span>
                        <span className="font-medium">5 standards</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Analytics</span>
                        <span className="font-medium">Basiques</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support</span>
                        <span className="font-medium">Email</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Professional</h4>
                      <Badge variant="default">EDHEC</Badge>
                    </div>
                    <div className="text-2xl font-bold mb-2">1,299€ <span className="text-sm text-muted-foreground">/mois</span></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Étudiants inclus</span>
                        <span className="font-medium">200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scenarios</span>
                        <span className="font-medium">15 + customs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Analytics</span>
                        <span className="font-medium">Avancés</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support</span>
                        <span className="font-medium">Priority</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Enterprise</h4>
                    <div className="text-2xl font-bold mb-2">Custom <span className="text-sm text-muted-foreground">pricing</span></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Étudiants</span>
                        <span className="font-medium">Unlimited</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scenarios</span>
                        <span className="font-medium">Unlimited</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Analytics</span>
                        <span className="font-medium">Full Suite</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Support</span>
                        <span className="font-medium">24/7 Dedicated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI & Specs Techniques */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    ROI Attendu EDHEC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                      <h4 className="font-medium text-emerald-700 mb-2">Gains Quantifiables</h4>
                      <div className="space-y-1 text-sm text-emerald-600">
                        <div className="flex justify-between">
                          <span>Engagement étudiants</span>
                          <span className="font-medium">82% → 92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Scalabilité formation</span>
                          <span className="font-medium">x10 capacity</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coût par étudiant</span>
                          <span className="font-medium">-40%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-700 mb-2">Valeur Stratégique</h4>
                      <div className="space-y-1 text-sm text-blue-600">
                        <p>• Leadership innovation 18 mois</p>
                        <p>• Différentiation vs HEC/ESSEC</p>
                        <p>• Premium positioning international</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Specs Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Infrastructure</h4>
                      <p className="text-xs text-muted-foreground">AWS EU-West, 99.9% uptime, auto-scaling</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Sécurité</h4>
                      <p className="text-xs text-muted-foreground">RGPD compliant, encryption AES-256, SSO SAML</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">APIs</h4>
                      <p className="text-xs text-muted-foreground">REST/GraphQL, webhooks, LMS connectors</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Analytics</h4>
                      <p className="text-xs text-muted-foreground">Real-time metrics, ML insights, export Excel/PDF</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Performance</h4>
                      <p className="text-xs text-muted-foreground">Latence &lt;200ms, support 1000+ concurrent users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet 4: Analyse de Marché */}
          <TabsContent value="marche" className="space-y-4">
            {/* Taille de Marché */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Marché EdTech IA - Sizing & Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Marché Global</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>EdTech 2024</span>
                        <span className="font-medium">$348B</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IA Education 2028</span>
                        <span className="font-medium">$890B</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CAGR 2024-2028</span>
                        <span className="font-medium text-primary">+35%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Marché Adressable</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Business Schools EU</span>
                        <span className="font-medium">2,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget moyen IT</span>
                        <span className="font-medium">€200k</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TAM Simulation</span>
                        <span className="font-medium text-secondary">€480M</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Marché Accessible</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Top 100 Schools EU</span>
                        <span className="font-medium">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget simulation</span>
                        <span className="font-medium">€50k avg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SAM Early Adopters</span>
                        <span className="font-medium text-accent">€5M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paysage Concurrentiel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Competitive Landscape - Business Simulation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-primary">Incumbents Leaders</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <div>
                            <p className="font-medium text-sm">Cesim</p>
                            <p className="text-xs text-muted-foreground">Leader historique, 500+ schools</p>
                          </div>
                          <Badge variant="destructive">Obsolète</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div>
                            <p className="font-medium text-sm">Marketplace Simulations</p>
                            <p className="text-xs text-muted-foreground">US leader, €200M revenue</p>
                          </div>
                          <Badge variant="secondary">Pas d'IA</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div>
                            <p className="font-medium text-sm">Simformer</p>
                            <p className="text-xs text-muted-foreground">Challenger européen</p>
                          </div>
                          <Badge variant="outline">Traditional</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-primary">Emerging Players</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div>
                            <p className="font-medium text-sm">BYSS VNS</p>
                            <p className="text-xs text-muted-foreground">Vocal IA first-mover</p>
                          </div>
                          <Badge variant="default">Innovation</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <p className="font-medium text-sm">Future Competitors</p>
                            <p className="text-xs text-muted-foreground">Big Tech entrance</p>
                          </div>
                          <Badge variant="outline">Threat 2025</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">BYSS VNS Differentiation</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Avantages Technologiques</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Seule solution vocale IA temps réel</li>
                          <li>• Analytics comportementaux ML</li>
                          <li>• 18 mois d'avance technologique</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Avantages Business</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Coût 40% inférieur vs Cesim</li>
                          <li>• Implementation 10x plus rapide</li>
                          <li>• Scalabilité unlimited étudiants</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trends Innovation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  Trends Innovation Pédagogique 2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary">Drivers Technologiques</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">IA Conversationnelle</p>
                          <p className="text-xs text-muted-foreground">GPT-4o révolutionne l'apprentissage interactif</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">Personalisation ML</p>
                          <p className="text-xs text-muted-foreground">Adaptive learning basé sur performance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">Analytics Comportementaux</p>
                          <p className="text-xs text-muted-foreground">Soft skills measurement précis</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary">Needs Pédagogiques</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">Soft Skills Focus</p>
                          <p className="text-xs text-muted-foreground">Communication, négociation, leadership</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">Scalabilité Formation</p>
                          <p className="text-xs text-muted-foreground">1 prof → 1000 étudiants simultanés</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-sm">ROI Mesurable</p>
                          <p className="text-xs text-muted-foreground">Analytics progrès étudiants quantifiés</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet 5: Commercial */}
          <TabsContent value="commercial" className="space-y-4">
            {/* Stratégie Sales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Stratégie Commerciale EDHEC - 8 Étapes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary">Phase Discovery</h4>
                    <div className="space-y-3">
                      {[
                        "1. Research approfondie EDHEC pain points",
                        "2. Cold Call Sophie Hennion-Moreau",
                        "3. Qualify decision process & budget",
                        "4. Map stakeholders & influences"
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <p className="text-sm">{step.split('. ')[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary">Phase Closing</h4>
                    <div className="space-y-3">
                      {[
                        "5. Démonstration live Byss VNS",
                        "6. Business case ROI personnalisé",
                        "7. Pilot program 90 jours MSc",
                        "8. Contract signature + deployment"
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 5}
                          </div>
                          <p className="text-sm">{step.split('. ')[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objections & Réponses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Objections Probables & Réponses Calibrées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      objection: "\"Nous avons déjà Cesim qui fonctionne bien\"",
                      reponse: "Cesim date de 2010, pas d'IA vocale. BYSS VNS = x10 engagement étudiants, analytics comportementaux impossibles avec Cesim.",
                      type: "Concurrence"
                    },
                    {
                      objection: "\"Budget contraint, pas de budget innovation IA\"",
                      reponse: "15k€/an vs 85k€ Cesim actuel = économie 70k€. ROI positif dès 6 mois avec augmentation satisfaction étudiants.",
                      type: "Budget"
                    },
                    {
                      objection: "\"Technologie trop récente, pas assez mature\"",
                      reponse: "GPT-4o OpenAI = standard industry. 18 mois d'avance = leadership innovation vs HEC/ESSEC. Risk calculated pour early advantage.",
                      type: "Risque Tech"
                    },
                    {
                      objection: "\"Qui êtes-vous ? Startup inconnue vs Cesim\"",
                      reponse: "Partnership OpenAI officiel, ex-EDHEC advisor équipe. Pilot program 90j = risk minimum, upside maximum différentiation.",
                      type: "Crédibilité"
                    },
                    {
                      objection: "\"Intégration compliquée avec notre LMS\"",
                      reponse: "API Blackboard native, SSO SAML, déploiement 1 semaine. Setup inclus dans licence, formation équipe IT comprise.",
                      type: "Technique"
                    }
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        <div className="flex-1 space-y-2">
                          <p className="text-sm font-medium text-destructive">"{item.objection}"</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="font-medium text-primary">Réponse:</span> {item.reponse}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Case & Stakeholders */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Business Case ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <h4 className="font-medium text-emerald-700 mb-2">Investment</h4>
                      <div className="space-y-1 text-sm text-emerald-600">
                        <div className="flex justify-between">
                          <span>Licence annuelle BYSS</span>
                          <span className="font-medium">15,000€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>vs Cesim actuel</span>
                          <span className="text-destructive">85,000€</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="font-medium">Économie Année 1</span>
                          <span className="font-bold">70,000€</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-700 mb-2">Gains Qualitatifs</h4>
                      <ul className="space-y-1 text-sm text-blue-600">
                        <li>• Leadership IA 18 mois vs concurrents</li>
                        <li>• Engagement étudiants: 82% → 92%</li>
                        <li>• Scalabilité: x10 capacity formation</li>
                        <li>• Différentiation premium international</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Stakeholders Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div>
                        <p className="font-medium text-sm">Sophie Hennion-Moreau</p>
                        <p className="text-xs text-muted-foreground">Directrice Innovation</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">Champion</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Influence: 85%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                      <div>
                        <p className="font-medium text-sm">Emmanuel Métais</p>
                        <p className="text-xs text-muted-foreground">Directeur Général</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">Validator</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Budget &gt;15k€</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-accent/20">
                      <div>
                        <p className="font-medium text-sm">Frédéric Fréry</p>
                        <p className="text-xs text-muted-foreground">Professeur Strategy</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Influencer</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Usage adoption</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/5 rounded-lg border border-muted/20">
                      <div>
                        <p className="font-medium text-sm">IT Team</p>
                        <p className="text-xs text-muted-foreground">Technical Implementation</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Supporter</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Integration</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Next Steps - Timeline Pilot EDHEC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Objectif: Pilot Program Janvier 2024</h4>
                    <p className="text-sm text-muted-foreground">MSc International Business - 25 étudiants - 90 jours - 25,000€ budget</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-primary">Semaine 1-2</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Cold call Sophie initial contact</li>
                        <li>• Research pain points validation</li>
                        <li>• Schedule demo meeting</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-secondary">Semaine 3-4</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Live demo Byss VNS</li>
                        <li>• Business case présentation</li>
                        <li>• Stakeholders introduction</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-accent">Mois 2</h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• Pilot program negotiation</li>
                        <li>• Contract signature</li>
                        <li>• Deployment janvier 2024</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* CTA Principal avec MagicSpotlight */}
      <motion.div variants={itemVariants}>
        <MagicSpotlight className="relative">
          <Card className="border-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Démarrer la Session IA Sophie Hennion-Moreau</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Testez vos compétences commerciales face à la Directrice Innovation EDHEC. 
                  IA conversationnelle ultra-réaliste avec Agents SDK OpenAI.
                </p>
                <TestButton 
                  onClick={handleStartSession}
                  size="lg"
                  variant="magic"
                  className="px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Démarrer Session IA
                </TestButton>
              </div>
            </CardContent>
          </Card>
        </MagicSpotlight>
      </motion.div>

      {/* Voice Agent Modal */}
      {showVoiceAgent && (
        <SophieAgentsSDK 
          conversationType="rdv"
          open={showVoiceAgent}
          onToggle={() => setShowVoiceAgent(false)}
        />
      )}
    </motion.div>
  );
};