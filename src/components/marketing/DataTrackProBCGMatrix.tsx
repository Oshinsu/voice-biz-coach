import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, DollarSign, HelpCircle, Minus } from 'lucide-react';

interface DataTrackProBCGMatrixProps {
  scenarioId: string;
}

export const DataTrackProBCGMatrix: React.FC<DataTrackProBCGMatrixProps> = ({ scenarioId }) => {
  // BCG Matrix data specifically for DataTrack Pro portfolio
  const bcgData = {
    stars: [
      {
        name: "Core Analytics Platform",
        marketGrowth: "35%",
        marketShare: "12%",
        description: "Attribution multi-touch et dashboards temps réel",
        investment: "R&D continu + expansion équipe",
        revenue: "€2.1M ARR"
      }
    ],
    cashCows: [
      {
        name: "Legacy Reporting Tools",
        marketGrowth: "5%",
        marketShare: "28%",
        description: "Rapports standards et exports CSV",
        investment: "Maintenance minimale",
        revenue: "€1.8M ARR stable"
      }
    ],
    questionMarks: [
      {
        name: "AI Prediction Suite",
        marketGrowth: "60%",
        marketShare: "3%",
        description: "Prédiction churn, lifetime value, tendances mode",
        investment: "€400K investissement IA",
        revenue: "€300K ARR croissance"
      },
      {
        name: "Social Commerce Analytics",
        marketGrowth: "45%",
        marketShare: "5%",
        description: "TikTok Shop, Instagram Shopping, influence tracking",
        investment: "Partenariats stratégiques",
        revenue: "€150K ARR"
      }
    ],
    dogs: [
      {
        name: "Email Analytics Module",
        marketGrowth: "2%",
        marketShare: "8%",
        description: "Analytics email marketing basique",
        investment: "Phase out programmé",
        revenue: "€120K ARR déclin"
      }
    ]
  };

  const getQuadrantStyle = (quadrant: string) => {
    switch (quadrant) {
      case 'star':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'cashCow':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'questionMark':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'dog':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'star':
        return <Star className="h-5 w-5" />;
      case 'cashCow':
        return <DollarSign className="h-5 w-5" />;
      case 'questionMark':
        return <HelpCircle className="h-5 w-5" />;
      case 'dog':
        return <Minus className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stars Quadrant */}
        <Card className={getQuadrantStyle('star')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('star')}
              Vedettes (Stars)
              <Badge variant="secondary">Forte croissance, forte part</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bcgData.stars.map((item, index) => (
              <div key={index} className="p-3 bg-white/50 rounded-lg">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm mt-1">{item.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <span>Croissance: {item.marketGrowth}</span>
                  <span>Part marché: {item.marketShare}</span>
                  <span>Revenue: {item.revenue}</span>
                  <span className="col-span-2">Stratégie: {item.investment}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
              <strong>Recommandation ModaStyle:</strong> Investir massivement. 
              Le marché analytics e-commerce explose, DataTrack Pro bien positionné.
            </div>
          </CardContent>
        </Card>

        {/* Question Marks Quadrant */}
        <Card className={getQuadrantStyle('questionMark')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('questionMark')}
              Dilemmes (Question Marks)
              <Badge variant="secondary">Forte croissance, faible part</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bcgData.questionMarks.map((item, index) => (
              <div key={index} className="p-3 bg-white/50 rounded-lg">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm mt-1">{item.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <span>Croissance: {item.marketGrowth}</span>
                  <span>Part marché: {item.marketShare}</span>
                  <span>Revenue: {item.revenue}</span>
                  <span className="col-span-2">Stratégie: {item.investment}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
              <strong>Opportunité ModaStyle:</strong> IA prédictive cruciale pour mode éthique.
              Social commerce en explosion, early adopter advantage.
            </div>
          </CardContent>
        </Card>

        {/* Cash Cows Quadrant */}
        <Card className={getQuadrantStyle('cashCow')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('cashCow')}
              Vaches à lait (Cash Cows)
              <Badge variant="secondary">Faible croissance, forte part</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bcgData.cashCows.map((item, index) => (
              <div key={index} className="p-3 bg-white/50 rounded-lg">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm mt-1">{item.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <span>Croissance: {item.marketGrowth}</span>
                  <span>Part marché: {item.marketShare}</span>
                  <span>Revenue: {item.revenue}</span>
                  <span className="col-span-2">Stratégie: {item.investment}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-green-100 rounded text-xs">
              <strong>Valeur ModaStyle:</strong> Outils matures, stables, financement innovation.
              Transition progressive vers nouvelles fonctionnalités.
            </div>
          </CardContent>
        </Card>

        {/* Dogs Quadrant */}
        <Card className={getQuadrantStyle('dog')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getQuadrantIcon('dog')}
              Poids morts (Dogs)
              <Badge variant="secondary">Faible croissance, faible part</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bcgData.dogs.map((item, index) => (
              <div key={index} className="p-3 bg-white/50 rounded-lg">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm mt-1">{item.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <span>Croissance: {item.marketGrowth}</span>
                  <span>Part marché: {item.marketShare}</span>
                  <span>Revenue: {item.revenue}</span>
                  <span className="col-span-2">Stratégie: {item.investment}</span>
                </div>
              </div>
            ))}
            <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
              <strong>Impact ModaStyle:</strong> Module obsolète, 
              migration vers outils email spécialisés (Klaviyo, Mailchimp).
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Summary for DataTrack Pro */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse stratégique DataTrack Pro pour ModaStyle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Recommandations immédiates</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Souscrire Core Analytics (Professional €599/mois)</li>
                <li>• Tester AI Prediction en pilot (gratuit 30 jours)</li>
                <li>• Préparer migration email analytics</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Opportunités 6-12 mois</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Social Commerce Analytics pour TikTok Shop</li>
                <li>• Intégration influenceurs tracking</li>
                <li>• Benchmarks secteur mode éthique</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">ROI attendu</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Récupération attribution: +€87K/mois</li>
                <li>• Optimisation churn: +€55K/mois</li>
                <li>• <strong>ROI total: 312% an 1</strong></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};