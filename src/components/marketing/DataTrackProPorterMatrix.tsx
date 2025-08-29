import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, Zap, Users, TrendingUp, AlertTriangle,
  DollarSign, Target, Cpu
} from 'lucide-react';

interface DataTrackProPorterMatrixProps {
  scenarioId: string;
}

export const DataTrackProPorterMatrix: React.FC<DataTrackProPorterMatrixProps> = ({ scenarioId }) => {
  // Porter's 5 Forces analysis for DataTrack Pro in the marketing analytics market
  const porterForces = {
    competitiveRivalry: {
      title: "Intensité concurrentielle",
      level: "Élevée",
      score: 75,
      factors: [
        {
          name: "Google Analytics 4",
          threat: "Élevé",
          description: "Gratuit, intégré Google Ads, familier équipes",
          marketShare: "65%",
          differentiation: "Limité attribution, interface complexe, pas de prédictif"
        },
        {
          name: "Triple Whale",
          threat: "Moyen",
          description: "Interface simple, marketing viral, communauté active",
          marketShare: "8%",
          differentiation: "Prix 2x supérieur, support offshore, attribution basique"
        },
        {
          name: "Northbeam",
          threat: "Élevé",
          description: "Attribution avancée, références Shopify Plus",
          marketShare: "12%",
          differentiation: "Prix 3x supérieur, complexité setup, marché US-centré"
        }
      ],
      recommendations: "Focus différenciation prix/support français + spécialisation e-commerce mode"
    },
    supplierPower: {
      title: "Pouvoir fournisseurs",
      level: "Moyen-Élevé",
      score: 65,
      factors: [
        {
          name: "APIs Publicitaires",
          dependency: "Critique",
          description: "Facebook Ads API, Google Ads API, TikTok for Business",
          risk: "Changements ToS, limitations rate, coûts"
        },
        {
          name: "Plateformes E-commerce", 
          dependency: "Élevée",
          description: "Shopify, WooCommerce, Magento webhooks & APIs",
          risk: "Dépendance partenariats, certifications"
        },
        {
          name: "Infrastructure Cloud",
          dependency: "Moyenne",
          description: "AWS, Google Cloud pour data processing & IA",
          risk: "Coûts scaling, vendor lock-in"
        }
      ],
      recommendations: "Diversifier intégrations, développer partenariats stratégiques"
    },
    buyerPower: {
      title: "Pouvoir acheteurs",
      level: "Moyen",
      score: 55,
      factors: [
        {
          name: "PME E-commerce (ModaStyle)",
          power: "Moyen",
          description: "Budget 15-40K€/an, sensible prix, besoin support",
          leverage: "Comparaison concurrence, négociation contrat"
        },
        {
          name: "Enterprise E-commerce",
          power: "Élevé",
          description: "Budget >100K€/an, exigences techniques élevées",
          leverage: "RFP complexes, cycles longs, négociations agressives"
        },
        {
          name: "Agences Marketing",
          power: "Faible",
          description: "Revendent à clients finaux, marge priorité",
          leverage: "Volume clients, recommandations"
        }
      ],
      recommendations: "Segmentation pricing, valeur ajoutée claire, support premium"
    },
    newEntrants: {
      title: "Menace nouveaux entrants",
      level: "Élevé",
      score: 70,
      factors: [
        {
          name: "Startups IA Analytics",
          threat: "Élevé",
          description: "Funding abundant, technologie accessible, APIs ouvertes",
          barriers: "Faibles - APIs publiques, cloud facile, talents disponibles"
        },
        {
          name: "Agences qui productisent",
          threat: "Moyen",
          description: "Expertise client, connaissance marché français",
          barriers: "Moyennes - développement produit, R&D continue"
        },
        {
          name: "Big Tech expansion",
          threat: "Élevé",
          description: "Google, Meta pourraient améliorer leurs outils",
          barriers: "Faibles - ressources illimitées, base installée"
        }
      ],
      recommendations: "Innovation continue, fidélisation clients, barrières switching cost"
    },
    substitutes: {
      title: "Produits substituts",
      level: "Moyen-Élevé",
      score: 60,
      factors: [
        {
          name: "Outils gratuits (GA4 + Excel)",
          attractiveness: "Élevé",
          description: "Coût zéro, familiarité équipes, contrôle total",
          limitations: "Temps manual, attribution limitée, pas de prédictif"
        },
        {
          name: "Solutions internes",
          attractiveness: "Moyen",
          description: "Développement data team interne, contrôle complet",
          limitations: "Coût développement, maintenance, expertise rare"
        },
        {
          name: "Agences en mode service",
          attractiveness: "Moyen",
          description: "Expertise externe, rapports custom, relation humaine",
          limitations: "Coût élevé, dépendance, pas temps réel"
        }
      ],
      recommendations: "ROI démontré vs alternatives, automatisation maximum, facilité usage"
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Faible': return 'text-green-600 bg-green-50 border-green-200';
      case 'Moyen': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Moyen-Élevé': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Élevé': case 'Élevée': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getForceIcon = (force: string) => {
    switch (force) {
      case 'competitiveRivalry': return <Shield className="h-5 w-5" />;
      case 'supplierPower': return <Cpu className="h-5 w-5" />;
      case 'buyerPower': return <Users className="h-5 w-5" />;
      case 'newEntrants': return <TrendingUp className="h-5 w-5" />;
      case 'substitutes': return <AlertTriangle className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Competitive Rivalry */}
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              {getForceIcon('competitiveRivalry')}
              {porterForces.competitiveRivalry.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getLevelColor(porterForces.competitiveRivalry.level)}>
                {porterForces.competitiveRivalry.level}
              </Badge>
              <Progress value={porterForces.competitiveRivalry.score} className="flex-1" />
              <span className="text-sm font-medium">{porterForces.competitiveRivalry.score}%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {porterForces.competitiveRivalry.factors.map((competitor, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-red-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-800">{competitor.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    Part: {competitor.marketShare}
                  </Badge>
                </div>
                <p className="text-sm text-red-700 mb-2">{competitor.description}</p>
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  <strong>Notre différenciation:</strong> {competitor.differentiation}
                </p>
              </div>
            ))}
            <div className="mt-3 p-3 bg-red-100 rounded-lg text-sm text-red-800">
              <strong>Recommandation ModaStyle:</strong> {porterForces.competitiveRivalry.recommendations}
            </div>
          </CardContent>
        </Card>

        {/* Supplier Power */}
        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              {getForceIcon('supplierPower')}
              {porterForces.supplierPower.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getLevelColor(porterForces.supplierPower.level)}>
                {porterForces.supplierPower.level}
              </Badge>
              <Progress value={porterForces.supplierPower.score} className="flex-1" />
              <span className="text-sm font-medium">{porterForces.supplierPower.score}%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {porterForces.supplierPower.factors.map((supplier, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-orange-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-orange-800">{supplier.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {supplier.dependency}
                  </Badge>
                </div>
                <p className="text-sm text-orange-700 mb-2">{supplier.description}</p>
                <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  <strong>Risques:</strong> {supplier.risk}
                </p>
              </div>
            ))}
            <div className="mt-3 p-3 bg-orange-100 rounded-lg text-sm text-orange-800">
              <strong>Stratégie:</strong> {porterForces.supplierPower.recommendations}
            </div>
          </CardContent>
        </Card>

        {/* Buyer Power */}
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              {getForceIcon('buyerPower')}
              {porterForces.buyerPower.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getLevelColor(porterForces.buyerPower.level)}>
                {porterForces.buyerPower.level}
              </Badge>
              <Progress value={porterForces.buyerPower.score} className="flex-1" />
              <span className="text-sm font-medium">{porterForces.buyerPower.score}%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {porterForces.buyerPower.factors.map((buyer, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-800">{buyer.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    Pouvoir: {buyer.power}
                  </Badge>
                </div>
                <p className="text-sm text-blue-700 mb-2">{buyer.description}</p>
                <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  <strong>Levier négociation:</strong> {buyer.leverage}
                </p>
              </div>
            ))}
            <div className="mt-3 p-3 bg-blue-100 rounded-lg text-sm text-blue-800">
              <strong>Approche ModaStyle:</strong> {porterForces.buyerPower.recommendations}
            </div>
          </CardContent>
        </Card>

        {/* New Entrants */}
        <Card className="border-purple-200 bg-purple-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              {getForceIcon('newEntrants')}
              {porterForces.newEntrants.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getLevelColor(porterForces.newEntrants.level)}>
                {porterForces.newEntrants.level}
              </Badge>
              <Progress value={porterForces.newEntrants.score} className="flex-1" />
              <span className="text-sm font-medium">{porterForces.newEntrants.score}%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {porterForces.newEntrants.factors.map((entrant, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-purple-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-800">{entrant.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    Menace: {entrant.threat}
                  </Badge>
                </div>
                <p className="text-sm text-purple-700 mb-2">{entrant.description}</p>
                <p className="text-xs text-purple-600 bg-purple-50 p-2 rounded">
                  <strong>Barrières:</strong> {entrant.barriers}
                </p>
              </div>
            ))}
            <div className="mt-3 p-3 bg-purple-100 rounded-lg text-sm text-purple-800">
              <strong>Défense:</strong> {porterForces.newEntrants.recommendations}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Substitutes - Full Width */}
      <Card className="border-yellow-200 bg-yellow-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            {getForceIcon('substitutes')}
            {porterForces.substitutes.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getLevelColor(porterForces.substitutes.level)}>
              {porterForces.substitutes.level}
            </Badge>
            <Progress value={porterForces.substitutes.score} className="flex-1 max-w-xs" />
            <span className="text-sm font-medium">{porterForces.substitutes.score}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {porterForces.substitutes.factors.map((substitute, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-yellow-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-yellow-800">{substitute.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {substitute.attractiveness}
                  </Badge>
                </div>
                <p className="text-sm text-yellow-700 mb-2">{substitute.description}</p>
                <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                  <strong>Limites:</strong> {substitute.limitations}
                </p>
              </div>
            ))}
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg text-sm text-yellow-800">
            <strong>Contre-stratégie:</strong> {porterForces.substitutes.recommendations}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Summary for DataTrack Pro */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse Porter - Position concurrentielle DataTrack Pro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Avantages concurrentiels
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Prix 60% inférieur à Northbeam</li>
                <li>• Setup 24h vs 6 semaines concurrence</li>
                <li>• Support français vs offshore</li>
                <li>• Spécialisation e-commerce mode</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Risques à surveiller
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Google améliore GA4 attribution</li>
                <li>• Nouveaux entrants IA well-funded</li>
                <li>• Dépendance APIs publicitaires</li>
                <li>• Prix vs gratuit GA4</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Recommandation ModaStyle
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Window d'opportunité forte</li>
                <li>• Différenciation claire vs GA4</li>
                <li>• Support français valorisé</li>
                <li>• ROI 220% justifie premium</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};