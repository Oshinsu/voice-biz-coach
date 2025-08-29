import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Target, BarChart3, Zap, Users, TrendingUp,
  Shield, Grid3X3, Layers, ArrowRight
} from 'lucide-react';
import { GenericMarketingStrategy } from './GenericMarketingStrategy';
import { GenericBCGMatrix } from './GenericBCGMatrix';
import { SwotMatrix } from '../SwotMatrix';

interface MarketingToolsDashboardProps {
  scenarioId: string;
  productSwot?: any;
}

export const MarketingToolsDashboard: React.FC<MarketingToolsDashboardProps> = ({ 
  scenarioId,
  productSwot 
}) => {
  const tools = [
    {
      id: 'porter',
      name: 'Forces de Porter',
      description: 'Analyse de l\'intensité concurrentielle',
      icon: Shield,
      category: 'Environnement',
      complexity: 'Avancé'
    },
    {
      id: 'ansoff',
      name: 'Matrice d\'Ansoff',
      description: 'Stratégies de croissance et expansion',
      icon: Grid3X3,
      category: 'Croissance',
      complexity: 'Intermédiaire'
    },
    {
      id: 'bcg',
      name: 'Matrice BCG',
      description: 'Analyse du portefeuille d\'activités',
      icon: BarChart3,
      category: 'Portfolio',
      complexity: 'Intermédiaire'
    },
    {
      id: 'swot',
      name: 'Analyse SWOT',
      description: 'Forces, faiblesses, opportunités, menaces',
      icon: Target,
      category: 'Diagnostic',
      complexity: 'Basique'
    },
    {
      id: 'marketing-mix',
      name: 'Stratégie Marketing',
      description: 'Positionnement et mix marketing complet',
      icon: Zap,
      category: 'Opérationnel',
      complexity: 'Avancé'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Environnement': 'bg-blue-100 text-blue-800',
      'Croissance': 'bg-green-100 text-green-800',
      'Portfolio': 'bg-purple-100 text-purple-800',
      'Diagnostic': 'bg-orange-100 text-orange-800',
      'Opérationnel': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getComplexityColor = (complexity: string) => {
    const colors: Record<string, string> = {
      'Basique': 'bg-green-50 text-green-700 border-green-200',
      'Intermédiaire': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Avancé': 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[complexity] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Outils d'Analyse Marketing</h3>
        <p className="text-muted-foreground">
          Suite complète d'outils stratégiques pour l'analyse concurrentielle et marketing
        </p>
      </div>


      {/* Tools Tabs */}
      <Tabs defaultValue="porter" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="porter" className="text-xs">Porter</TabsTrigger>
          <TabsTrigger value="swot" className="text-xs">SWOT</TabsTrigger>
          <TabsTrigger value="marketing" className="text-xs">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="porter" className="space-y-6">
          <div className="p-6 text-center">
            <p className="text-muted-foreground">
              Analyse Porter en cours de développement pour ce scénario...
            </p>
          </div>
        </TabsContent>

        <TabsContent value="swot" className="space-y-6">
          <SwotMatrix scenarioId={scenarioId} />
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <GenericMarketingStrategy scenarioId={scenarioId} productSwot={productSwot} />
        </TabsContent>
      </Tabs>

      {/* Strategic Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Synthèse stratégique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-800">Diagnostic concurrentiel</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Target className="h-3 w-3 text-emerald-600" />
                  SWOT pour forces/faiblesses vs concurrence
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-emerald-600" />
                  Porter pour intensité concurrentielle
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-teal-800">Déploiement</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-teal-600" />
                  Setup DataTrack Pro en 4-6 semaines
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-teal-600" />
                  Formation équipe Sophie incluse
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-800">ROI & Performance</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-cyan-600" />
                  220% ROI première année ModaStyle
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3 text-cyan-600" />
                  Attribution multi-touch précise vs GA4
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};