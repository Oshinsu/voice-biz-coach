import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, AlertTriangle, CheckCircle, Target, 
  DollarSign, Users, Clock, Zap, Brain,
  TrendingUp, Award, Lightbulb, ArrowRight
} from 'lucide-react';

export const ObjectionStrategy: React.FC = () => {
  const objections = [
    {
      category: "Budget",
      icon: DollarSign,
      color: "red",
      objection: "Le coût est trop élevé pour notre budget actuel",
      responses: [
        "Calculons ensemble le coût de ne pas agir : perte de compétitivité, baisse d'attractivité...",
        "Notre pilote gratuit 6 mois vous permet de mesurer le ROI avant investissement",
        "Le coût par étudiant (250€/an) est inférieur à un manuel spécialisé premium",
        "Financement étalé possible + réduction 30% première année"
      ],
      evidence: "École similaire: ROI de 340% en 2 ans via amélioration taux d'emploi diplômés",
      nextStep: "Préparation business case avec données financières ESCAP"
    },
    {
      category: "Technique",
      icon: Zap,
      color: "orange",
      objection: "L'intégration avec nos systèmes existants sera complexe",
      responses: [
        "Notre API native s'intègre en <48h avec tous les LMS majeurs (Moodle, Canvas...)",
        "Équipe technique dédiée pour accompagnement gratuit pendant onboarding",
        "Pas de modification infrastructure requise, déploiement cloud sécurisé",
        "99.9% uptime garanti avec redondance multi-zones"
      ],
      evidence: "HEC: intégration complète réalisée en 3 jours avec 0 interruption de service",
      nextStep: "Audit technique gratuit avec votre DSI"
    },
    {
      category: "Pédagogique",
      icon: Brain,
      color: "yellow",
      objection: "Nos professeurs ne sont pas prêts pour ce changement",
      responses: [
        "Programme de formation professeurs en 3 étapes sur 6 mois",
        "Support pédagogique dédié avec best practices intégrées",
        "Interface intuitive : 89% des professeurs autonomes en <2h",
        "Champions internes identifiés pour accompagner le changement"
      ],
      evidence: "ESSEC: 95% satisfaction professeurs après 3 mois d'utilisation",
      nextStep: "Workshop découverte pour équipe pédagogique volontaire"
    },
    {
      category: "Efficacité",
      icon: Target,
      color: "blue",
      objection: "Comment prouver l'efficacité pédagogique réelle ?",
      responses: [
        "Analytics détaillés : progression compétences, temps engagement, scores performance",
        "Méthodologie d'évaluation validée scientifiquement (études peer-reviewed)",
        "Comparaison avant/après avec groupes témoins possible",
        "Certification compétences avec badges reconnus par entreprises partenaires"
      ],
      evidence: "Étude 12 mois : +67% compétences négociation vs méthodes traditionnelles",
      nextStep: "Protocole de mesure d'impact personnalisé ESCAP"
    },
    {
      category: "Timing",
      icon: Clock,
      color: "purple",
      objection: "Ce n'est pas le bon moment, trop de projets en cours",
      responses: [
        "Le pilote gratuit ne mobilise que 2h/semaine pour 1 professeur",
        "Déploiement progressif aligné sur votre planning académique",
        "Support complet : vous vous concentrez sur la pédagogie, nous sur la technique",
        "Concurrence s'équipe : chaque mois de retard = avantage concurrentiel perdu"
      ],
      evidence: "Écoles concurrentes adoptent massivement : 40% en 2024 vs 12% en 2023",
      nextStep: "Planning de déploiement adapté à vos contraintes"
    },
    {
      category: "Alternative",
      icon: Users,
      color: "green",
      objection: "Nous préférons développer une solution interne",
      responses: [
        "Coût développement interne estimé : 2-3M€ sur 3 ans + équipe 8 personnes",
        "Time-to-market : 18-24 mois vs déploiement immédiat",
        "Notre R&D : 40 ingénieurs spécialisés IA éducative depuis 5 ans",
        "Maintenance, évolutions, support : charges récurrentes lourdes"
      ],
      evidence: "Université Paris-Dauphine: abandon projet interne après 18 mois et 1.2M€",
      nextStep: "Comparaison détaillée coûts/bénéfices build vs buy"
    }
  ];

  const getColorClass = (color: string) => {
    const colors = {
      red: "border-red-200 bg-red-50",
      orange: "border-orange-200 bg-orange-50",
      yellow: "border-yellow-200 bg-yellow-50",
      blue: "border-blue-200 bg-blue-50",
      purple: "border-purple-200 bg-purple-50",
      green: "border-green-200 bg-green-50"
    };
    return colors[color as keyof typeof colors] || "border-gray-200 bg-gray-50";
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      red: "text-red-800",
      orange: "text-orange-800",
      yellow: "text-yellow-800",
      blue: "text-blue-800",
      purple: "text-purple-800",
      green: "text-green-800"
    };
    return colors[color as keyof typeof colors] || "text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Sales Strategy Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Stratégie commerciale globale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium">Approche consultative</p>
              <p className="text-sm text-muted-foreground">Audit et recommandations</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="font-medium">Preuves sociales</p>
              <p className="text-sm text-muted-foreground">Cas clients similaires</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="font-medium">Pilote risk-free</p>
              <p className="text-sm text-muted-foreground">Démonstration valeur</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Séquence de vente recommandée</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-sm">Audit pédagogique gratuit + benchmark</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span className="text-sm">Démonstration personnalisée avec cas ESCAP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-sm">Proposition pilote 6 mois département test</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span className="text-sm">Présentation résultats + business case complet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                  <span className="text-sm">Négociation contrat + déploiement global</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Points d'appui décisionnels</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Pression concurrentielle (HEC/ESSEC équipées)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Attentes génération Z étudiants</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Demandes entreprises partenaires</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Objectifs digitaux direction générale</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">ROI mesurable et rapide (6-12 mois)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objection Handling Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Matrice de gestion des objections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {objections.map((obj, index) => (
              <div key={index} className={`p-6 border rounded-lg ${getColorClass(obj.color)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <obj.icon className={`h-6 w-6 ${getTextColorClass(obj.color)}`} />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getTextColorClass(obj.color)}>
                          {obj.category}
                        </Badge>
                        <h4 className={`font-semibold ${getTextColorClass(obj.color)}`}>
                          "{obj.objection}"
                        </h4>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Réponses recommandées :</h5>
                      <div className="space-y-1">
                        {obj.responses.map((response, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600" />
                            <p className="text-sm">{response}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-1 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Preuve sociale
                        </h5>
                        <p className="text-sm italic">{obj.evidence}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-1 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Étape suivante
                        </h5>
                        <p className="text-sm font-medium">{obj.nextStep}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Closing Techniques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Techniques de closing adaptées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Closing assumptif (recommandé)</h4>
              <div className="p-4 border rounded-lg">
                <p className="text-sm italic mb-2">
                  "Vu l'urgence de modernisation et les résultats exceptionnels du pilote, 
                  je propose qu'on lance le déploiement dès la rentrée. Préférez-vous commencer 
                  par le département Commerce ou Marketing ?"
                </p>
                <p className="text-xs text-muted-foreground">
                  ✓ Présuppose l'accord ✓ Offre un choix ✓ Crée urgence positive
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Closing alternative</h4>
              <div className="p-4 border rounded-lg">
                <p className="text-sm italic mb-2">
                  "Deux options s'offrent à vous : soit on démarre avec le package Professional 
                  pour 200 étudiants, soit on vise directement l'Enterprise pour toute l'école. 
                  Qu'est-ce qui correspond mieux à votre vision ?"
                </p>
                <p className="text-xs text-muted-foreground">
                  ✓ Évite le "non" ✓ Guide vers la solution ✓ Valorise l'ambition
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Signaux d'achat à identifier</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm mb-2">Signaux verbaux</h5>
                <ul className="text-xs space-y-1">
                  <li>• "Comment se passerait l'intégration ?"</li>
                  <li>• "Quels seraient les délais ?"</li>
                  <li>• "Et pour la formation des professeurs ?"</li>
                  <li>• "Le budget pourrait être validé si..."</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm mb-2">Signaux comportementaux</h5>
                <ul className="text-xs space-y-1">
                  <li>• Prend des notes détaillées</li>
                  <li>• Pose questions techniques précises</li>
                  <li>• Évoque planning/organisation interne</li>
                  <li>• Demande références clients</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm mb-2">Signaux d'engagement</h5>
                <ul className="text-xs space-y-1">
                  <li>• Propose de rencontrer l'équipe</li>
                  <li>• Suggère démonstration élargie</li>
                  <li>• Évoque validation direction générale</li>
                  <li>• Demande proposition formelle</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Moment optimal de closing</h4>
            <p className="text-sm text-green-700">
              Après démonstration du pilote et présentation des résultats tangibles. 
              L'enthousiasme est à son maximum, les bénéfices sont prouvés, 
              les objections ont été traitées. C'est le moment de transformer l'essai.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Post-Sale Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Stratégie post-vente et expansion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Onboarding réussi (3 premiers mois)</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Kick-off avec équipe projet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Formation intensive professeurs champions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Intégration technique LMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Premiers résultats mesurés et communiqués</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Ajustements basés sur feedback</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Opportunités d'expansion</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Extension autres départements (Marketing, RH...)</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Modules complémentaires (négociation B2B, pitch...)</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Formation continue professeurs avancée</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">API personnalisations spécifiques ESCAP</p>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Partenariat stratégique co-développement</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};