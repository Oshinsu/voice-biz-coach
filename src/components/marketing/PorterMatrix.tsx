import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useScenarios } from '@/hooks/useScenarios';
import { 
  Shield, Zap, Users, Building2, Target,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  AlertTriangle
} from 'lucide-react';

interface PorterForce {
  name: string;
  intensity: 'Faible' | 'Moyenne' | 'Forte';
  score: number;
  factors: string[];
  impact: string;
}

interface PorterMatrixProps {
  scenarioId: string;
}

const getPorterData = (scenarioId: string, scenario: any) => {
  // Check if scenario has Porter data
  if (scenario?.marketData?.competitiveForces) {
    return {
      centerCompany: scenario.company.name,
      forces: scenario.marketData.competitiveForces
    };
  }

  // Fallback data for scenarios without specific Porter data
  const defaultPorterData = {
    centerCompany: scenario?.company?.name || 'Entreprise',
    forces: {
      suppliers: {
        name: 'Pouvoir fournisseurs',
        intensity: 'Moyenne' as const,
        score: 60,
        factors: [
          'Fournisseurs diversifiés disponibles',
          'Concurrence modérée entre fournisseurs',
          'Coûts de changement acceptables',
          'Qualité standardisée du marché'
        ],
        impact: 'Négociation équilibrée, choix stratégiques possibles'
      },
      buyers: {
        name: 'Pouvoir clients',
        intensity: 'Forte' as const,
        score: 75,
        factors: [
          'Clients informés et comparatifs',
          'Alternatives multiples disponibles',
          'Sensibilité prix élevée',
          'Exigences qualité croissantes'
        ],
        impact: 'Pression forte sur prix et valeur, différenciation critique'
      },
      newEntrants: {
        name: 'Nouveaux entrants',
        intensity: 'Moyenne' as const,
        score: 65,
        factors: [
          'Barrières à l\'entrée modérées',
          'Capital initial requis raisonnable',
          'Savoir-faire accessible',
          'Marché en croissance attractif'
        ],
        impact: 'Veille concurrentielle nécessaire, innovation continue'
      },
      substitutes: {
        name: 'Produits substituts',
        intensity: 'Moyenne' as const,
        score: 55,
        factors: [
          'Solutions alternatives émergentes',
          'Technologies disruptives potentielles',
          'Changement comportements clients',
          'Innovation technologique rapide'
        ],
        impact: 'Adaptation constante, positionnement valeur renforcé'
      },
      rivalry: {
        name: 'Rivalité concurrentielle',
        intensity: 'Forte' as const,
        score: 80,
        factors: [
          'Concurrents nombreux et actifs',
          'Différenciation complexe',
          'Compétition sur plusieurs leviers',
          'Marché mature et disputé'
        ],
        impact: 'Innovation et excellence opérationnelle requises'
      }
    }
  };

  return defaultPorterData;
};

export const PorterMatrix: React.FC<PorterMatrixProps> = ({ scenarioId }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);
  const data = getPorterData(scenarioId, scenario);
  
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Faible': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Forte': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ForceCard = ({ force, position }: { force: PorterForce; position: string }) => (
    <Card className={`relative hover:shadow-lg transition-all duration-300 animate-fade-in ${getIntensityColor(force.intensity)}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold flex items-center justify-between">
          {force.name}
          <Badge variant="outline" className={`text-xs ${getIntensityColor(force.intensity)}`}>
            {force.intensity}
          </Badge>
        </CardTitle>
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">Intensité</span>
            <span className="text-xs font-bold">{force.score}/100</span>
          </div>
          <Progress value={force.score} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h5 className="text-xs font-semibold mb-1">Facteurs clés:</h5>
            <ul className="space-y-1">
              {force.factors.map((factor, index) => (
                <li key={index} className="text-xs flex items-start gap-1">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-2">
            <h5 className="text-xs font-semibold mb-1">Impact stratégique:</h5>
            <p className="text-xs italic">{force.impact}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Analyse des 5 Forces de Porter</h3>
        <p className="text-muted-foreground">Évaluation de l'intensité concurrentielle</p>
      </div>

      {/* Porter Matrix Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-center h-24">
            <ArrowLeft className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <ForceCard force={data.forces.suppliers} position="left" />
          <div className="text-center">
            <Shield className="h-6 w-6 mx-auto text-primary" />
            <p className="text-xs text-muted-foreground mt-1">Fournisseurs</p>
          </div>
        </div>

        {/* Center Column */}
        <div className="space-y-6">
          <ForceCard force={data.forces.newEntrants} position="top" />
          <div className="flex items-center justify-center">
            <ArrowUp className="h-6 w-6 text-primary" />
          </div>
          
          {/* Center Company */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h4 className="font-bold text-lg mb-2">{data.centerCompany}</h4>
              <p className="text-sm text-muted-foreground">Position concurrentielle</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-semibold">Avantage</p>
                  <p>Innovation</p>
                </div>
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-semibold">Défi</p>
                  <p>Scalabilité</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center">
            <ArrowDown className="h-6 w-6 text-primary" />
          </div>
          <ForceCard force={data.forces.substitutes} position="bottom" />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-center h-24">
            <ArrowRight className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <ForceCard force={data.forces.buyers} position="right" />
          <div className="text-center">
            <Users className="h-6 w-6 mx-auto text-primary" />
            <p className="text-xs text-muted-foreground mt-1">Clients</p>
          </div>
        </div>
      </div>

      {/* Rivalry at bottom */}
      <div className="text-center">
        <ForceCard force={data.forces.rivalry} position="center" />
        <div className="mt-2 flex items-center justify-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <p className="text-sm font-medium text-orange-700">Rivalité sectorielle</p>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommandations stratégiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-green-700">Actions prioritaires:</h5>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Renforcer différenciation produit
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Développer barrières à l'entrée
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Fidéliser clients clés
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-orange-700">Vigilance requise:</h5>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  Surveiller nouveaux entrants
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  Anticiper évolution substituts
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  Optimiser chaîne valeur
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};