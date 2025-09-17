import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Map, Rocket } from 'lucide-react';

interface DataTrackProAnsoffMatrixProps {
  scenarioId: string;
}

export const DataTrackProAnsoffMatrix: React.FC<DataTrackProAnsoffMatrixProps> = ({ scenarioId }) => {
  // Ansoff Matrix strategies specifically for DataTrack Pro
  const ansoffStrategies = {
    marketPenetration: {
      title: "Pénétration de marché",
      subtitle: "Marchés existants + Produits existants",
      risk: "Faible",
      priority: "Immédiate",
      strategies: [
        {
          name: "Acquisition e-commerce mode français",
          description: "Cibler PME mode éthique 5-50M€ CA avec Shopify Plus",
          target: "450 prospects identifiés",
          timeline: "3-6 mois",
          investment: "€50K marketing digital",
          expectedGain: "+180 nouveaux clients"
        },
        {
          name: "Upsell clients Basic vers Professional",
          description: "Migration attribution multi-touch pour clients existants",
          target: "67% clients Basic éligibles",
          timeline: "2-4 mois",
          investment: "€25K campagne nurturing",
          expectedGain: "+€340K ARR"
        }
      ]
    },
    productDevelopment: {
      title: "Développement produit",
      subtitle: "Marchés existants + Nouveaux produits",
      risk: "Moyen",
      priority: "6-12 mois",
      strategies: [
        {
          name: "AI Suite Mode & Lifestyle",
          description: "Prédictions saisonnalité, tendances, influence tracking",
          target: "E-commerce mode premium",
          timeline: "8-12 mois",
          investment: "€200K R&D IA",
          expectedGain: "+€150K ARR premium features"
        },
        {
          name: "Social Commerce Analytics",
          description: "TikTok Shop, Instagram Shopping, influence ROI",
          target: "Brands Gen Z focalisées",
          timeline: "4-6 mois",
          investment: "€80K intégrations API",
          expectedGain: "+€90K ARR nouveaux modules"
        }
      ]
    },
    marketDevelopment: {
      title: "Développement marché",
      subtitle: "Nouveaux marchés + Produits existants",
      risk: "Moyen-Élevé",
      priority: "12-18 mois",
      strategies: [
        {
          name: "Expansion verticale beauté/cosmétiques",
          description: "Adapter analytics aux spécificités cosmétiques",
          target: "300+ marques beauté France",
          timeline: "9-15 mois",
          investment: "€120K adaptation produit",
          expectedGain: "+€200K ARR nouveau segment"
        },
        {
          name: "Marché européen mode éthique",
          description: "Allemagne, Benelux, Italie - partenaires locaux",
          target: "1,200 prospects EU",
          timeline: "12-18 mois",
          investment: "€300K expansion internationale",
          expectedGain: "+€450K ARR marchés EU"
        }
      ]
    },
    diversification: {
      title: "Diversification",
      subtitle: "Nouveaux marchés + Nouveaux produits",
      risk: "Élevé",
      priority: "18+ mois",
      strategies: [
        {
          name: "Platform ESG Analytics",
          description: "Analytics impact environnemental, supply chain éthique",
          target: "Entreprises B-Corp, labels éthiques",
          timeline: "18-24 mois",
          investment: "€400K nouveau produit",
          expectedGain: "+€300K ARR marché ESG"
        },
        {
          name: "Retail physique + digital",
          description: "Analytics omnicanal magasins physiques + online",
          target: "Retailers hybrides",
          timeline: "20-30 mois",
          investment: "€600K R&D omnicanal",
          expectedGain: "+€500K ARR nouveau marché"
        }
      ]
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Faible': return 'text-green-600 bg-green-50';
      case 'Moyen': return 'text-yellow-600 bg-yellow-50';
      case 'Moyen-Élevé': return 'text-orange-600 bg-orange-50';
      case 'Élevé': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'marketPenetration': return <Target className="h-5 w-5" />;
      case 'productDevelopment': return <TrendingUp className="h-5 w-5" />;
      case 'marketDevelopment': return <Map className="h-5 w-5" />;
      case 'diversification': return <Rocket className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Penetration */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              {getQuadrantIcon('marketPenetration')}
              {ansoffStrategies.marketPenetration.title}
            </CardTitle>
            <p className="text-sm text-green-600">{ansoffStrategies.marketPenetration.subtitle}</p>
            <div className="flex gap-2">
              <Badge className={getRiskColor(ansoffStrategies.marketPenetration.risk)}>
                Risque: {ansoffStrategies.marketPenetration.risk}
              </Badge>
              <Badge variant="outline">
                {ansoffStrategies.marketPenetration.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ansoffStrategies.marketPenetration.strategies.map((strategy, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-800">{strategy.name}</h4>
                <p className="text-sm mt-1 text-green-700">{strategy.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-green-600">
                  <span>Cible: {strategy.target}</span>
                  <span>Timeline: {strategy.timeline}</span>
                  <span>Investissement: {strategy.investment}</span>
                  <span>Gain attendu: {strategy.expectedGain}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
              <strong>Recommandation ModaStyle:</strong> Stratégie prioritaire. 
              Marché e-commerce mode en croissance, positionnement DataTrack Pro optimal.
            </div>
          </CardContent>
        </Card>

        {/* Product Development */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              {getQuadrantIcon('productDevelopment')}
              {ansoffStrategies.productDevelopment.title}
            </CardTitle>
            <p className="text-sm text-blue-600">{ansoffStrategies.productDevelopment.subtitle}</p>
            <div className="flex gap-2">
              <Badge className={getRiskColor(ansoffStrategies.productDevelopment.risk)}>
                Risque: {ansoffStrategies.productDevelopment.risk}
              </Badge>
              <Badge variant="outline">
                {ansoffStrategies.productDevelopment.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ansoffStrategies.productDevelopment.strategies.map((strategy, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800">{strategy.name}</h4>
                <p className="text-sm mt-1 text-blue-700">{strategy.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-blue-600">
                  <span>Cible: {strategy.target}</span>
                  <span>Timeline: {strategy.timeline}</span>
                  <span>Investissement: {strategy.investment}</span>
                  <span>Gain attendu: {strategy.expectedGain}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
              <strong>Opportunité ModaStyle:</strong> IA prédictive et social commerce 
              critiques pour mode éthique. Early adopter advantage significatif.
            </div>
          </CardContent>
        </Card>

        {/* Market Development */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              {getQuadrantIcon('marketDevelopment')}
              {ansoffStrategies.marketDevelopment.title}
            </CardTitle>
            <p className="text-sm text-orange-600">{ansoffStrategies.marketDevelopment.subtitle}</p>
            <div className="flex gap-2">
              <Badge className={getRiskColor(ansoffStrategies.marketDevelopment.risk)}>
                Risque: {ansoffStrategies.marketDevelopment.risk}
              </Badge>
              <Badge variant="outline">
                {ansoffStrategies.marketDevelopment.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ansoffStrategies.marketDevelopment.strategies.map((strategy, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-800">{strategy.name}</h4>
                <p className="text-sm mt-1 text-orange-700">{strategy.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-orange-600">
                  <span>Cible: {strategy.target}</span>
                  <span>Timeline: {strategy.timeline}</span>
                  <span>Investissement: {strategy.investment}</span>
                  <span>Gain attendu: {strategy.expectedGain}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-orange-100 rounded text-xs text-orange-800">
              <strong>Potentiel ModaStyle:</strong> Après succès français, 
              expansion EU avec même proposition valeur analytics mode.
            </div>
          </CardContent>
        </Card>

        {/* Diversification */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              {getQuadrantIcon('diversification')}
              {ansoffStrategies.diversification.title}
            </CardTitle>
            <p className="text-sm text-red-600">{ansoffStrategies.diversification.subtitle}</p>
            <div className="flex gap-2">
              <Badge className={getRiskColor(ansoffStrategies.diversification.risk)}>
                Risque: {ansoffStrategies.diversification.risk}
              </Badge>
              <Badge variant="outline">
                {ansoffStrategies.diversification.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ansoffStrategies.diversification.strategies.map((strategy, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-red-100">
                <h4 className="font-semibold text-red-800">{strategy.name}</h4>
                <p className="text-sm mt-1 text-red-700">{strategy.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-red-600">
                  <span>Cible: {strategy.target}</span>
                  <span>Timeline: {strategy.timeline}</span>
                  <span>Investissement: {strategy.investment}</span>
                  <span>Gain attendu: {strategy.expectedGain}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-800">
              <strong>Vision long terme:</strong> Analytics ESG aligné avec mission ModaStyle mode éthique. 
              Risque élevé mais synergies potentielles fortes.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Roadmap for ModaStyle */}
      <Card>
        <CardHeader>
          <CardTitle>Roadmap stratégique DataTrack Pro - Perspective ModaStyle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <h4 className="font-semibold text-green-800">Phase 1 (0-6 mois)</h4>
                <p className="text-sm text-green-700 mt-2">Pénétration marché</p>
                <p className="text-xs text-green-600">Risque faible, ROI immédiat</p>
                <Progress value={100} className="mt-2" />
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800">Phase 2 (6-12 mois)</h4>
                <p className="text-sm text-blue-700 mt-2">Développement produit</p>
                <p className="text-xs text-blue-600">IA & Social Commerce</p>
                <Progress value={75} className="mt-2" />
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <h4 className="font-semibold text-orange-800">Phase 3 (12-18 mois)</h4>
                <p className="text-sm text-orange-700 mt-2">Nouveaux marchés</p>
                <p className="text-xs text-orange-600">Expansion géographique</p>
                <Progress value={25} className="mt-2" />
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <h4 className="font-semibold text-red-800">Phase 4 (18+ mois)</h4>
                <p className="text-sm text-red-700 mt-2">Diversification</p>
                <p className="text-xs text-red-600">ESG & Omnicanal</p>
                <Progress value={10} className="mt-2" />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Recommandation immédiate pour ModaStyle</h4>
              <p className="text-sm text-gray-700">
                Démarrer avec stratégie pénétration marché (Phase 1) - Professional €599/mois. 
                ROI 312% prouvé, risque minimal. Préparer Phase 2 IA prédictive pour avantage concurrentiel mode éthique.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};