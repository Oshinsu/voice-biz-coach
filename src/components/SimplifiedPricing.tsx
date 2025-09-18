import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calculator, Euro, TrendingUp } from 'lucide-react';

export const SimplifiedPricing: React.FC = () => {
  const pricingBreakdown = [
    {
      category: "Solution Byss VNS",
      monthly: "749€",
      yearly: "8 988€",
      description: "Plateforme complète pour tous les étudiants",
      details: [
        "Accès illimité pour 2 800 étudiants",
        "Tableaux de bord pour professeurs",
        "Support technique 24/7",
        "Formation de l'équipe pédagogique"
      ]
    },
    {
      category: "Coûts IA (variables)",
      monthly: "~200€",
      yearly: "~2 400€",
      description: "Coût par conversation avec l'IA",
      details: [
        "Environ 0,10€ par session de 15 minutes",
        "Estimation basée sur usage moyen",
        "Facturation réelle à l'usage",
        "Optimisation automatique incluse"
      ]
    }
  ];

  const comparison = [
    {
      item: "Solution actuelle (Cesim + Marketplace)",
      cost: "85 000€/an",
      limitations: "Simulations texte uniquement, pas de voix",
      color: "text-red-600"
    },
    {
      item: "Assessment Centers physiques",
      cost: "850€ par étudiant (× 2 800) = 2 380 000€",
      limitations: "Seulement 2 fois par an maximum",
      color: "text-red-600"
    },
    {
      item: "Byss VNS (nouvelle solution)",
      cost: "~11 400€/an",
      limitations: "Utilisable tous les jours, 24h/24",
      color: "text-green-600"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tarification Simple et Transparente
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comparaison des coûts pour EDHEC Business School
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pricing Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingBreakdown.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="text-center mb-4">
                  <h3 className="font-semibold mb-2">{item.category}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-primary">{item.monthly}</span>
                    <span className="text-sm text-muted-foreground">/mois</span>
                  </div>
                  <div className="text-lg text-muted-foreground">{item.yearly} /an</div>
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                </div>
                <div className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Total Cost */}
          <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Coût total estimé</h3>
                <p className="text-sm text-muted-foreground">Pour EDHEC (2 800 étudiants)</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">~11 400€/an</div>
                <div className="text-sm text-muted-foreground">949€/mois</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Comparaison avec les Solutions Actuelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparison.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.item}</h4>
                  <p className="text-sm text-muted-foreground">{item.limitations}</p>
                </div>
                <div className={`text-right font-semibold ${item.color}`}>
                  {item.cost}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800 dark:text-green-200">Économies Potentielles</span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Économie de plus de 95%</strong> par rapport aux assessment centers physiques
              tout en offrant une disponibilité 24h/24 et une expérience plus riche.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculation */}
      <Card>
        <CardHeader>
          <CardTitle>Retour sur Investissement (ROI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">+25%</div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                Amélioration engagement étudiant visée
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-sm text-green-800 dark:text-green-200">
                Disponibilité pour la pratique
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">×100</div>
              <div className="text-sm text-purple-800 dark:text-purple-200">
                Plus de sessions de pratique possibles
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};