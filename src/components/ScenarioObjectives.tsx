import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Phone, Calendar, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { useScenarios } from '@/hooks/useScenarios';

interface ScenarioObjectivesProps {
  scenarioId: string;
}

export const ScenarioObjectives: React.FC<ScenarioObjectivesProps> = ({ scenarioId }) => {
  const { getScenarioById } = useScenarios();
  const scenario = getScenarioById(scenarioId);
  
  if (!scenario?.specificObjectives) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Objectifs spécifiques en cours de développement pour ce scénario...
          </p>
        </CardContent>
      </Card>
    );
  }

  const objectives = scenario.specificObjectives;

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble des objectifs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Objectifs commerciaux par type d'appel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cold Call Objectives */}
            <div className="p-6 border rounded-lg bg-orange-50/50">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-800">Cold Call</h3>
                <Badge variant="destructive" className="bg-orange-100 text-orange-700">
                  Appel à froid
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">Objectif Principal</h4>
                  <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                    {objectives.coldCall.primary}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">Objectif Secondaire</h4>
                  <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                    {objectives.coldCall.secondary}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Critère de Succès</h4>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-700">
                      {objectives.coldCall.successMetrics}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RDV Objectives */}
            <div className="p-6 border rounded-lg bg-green-50/50">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">RDV Planifié</h3>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  Rendez-vous
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Objectif Principal</h4>
                  <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                    {objectives.rdv.primary}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Objectif Secondaire</h4>
                  <p className="text-sm text-gray-700 bg-white/50 p-3 rounded">
                    {objectives.rdv.secondary}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Critère de Succès</h4>
                  <div className="flex items-start gap-2 bg-blue-50 p-3 rounded">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      {objectives.rdv.successMetrics}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métriques de performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Métriques de performance adaptées au scénario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">75%</div>
              <div className="text-sm text-blue-700">Taux de décrochage Cold Call</div>
              <div className="text-xs text-muted-foreground">Objectif: &gt;80%</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">45%</div>
              <div className="text-sm text-green-700">Conversion RDV → Pilote</div>
              <div className="text-xs text-muted-foreground">Objectif: &gt;50%</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">7 min</div>
              <div className="text-sm text-purple-700">Durée moyenne Cold Call</div>
              <div className="text-xs text-muted-foreground">Objectif: 5-8 min</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">21 jours</div>
              <div className="text-sm text-orange-700">Cycle de vente moyen</div>
              <div className="text-xs text-muted-foreground">Objectif: &lt;28 jours</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conseils tactiques spécifiques au scénario */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Conseils tactiques pour {scenarioId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3">Cold Call - Conseils</h4>
              <ul className="text-sm space-y-2 text-orange-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  Pitch de 30 secondes maximum pour capter l'attention
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  Identifier rapidement le pain point principal
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  Ne pas vendre la solution mais vendre le RDV
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  Utiliser des références crédibles du secteur
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">RDV - Conseils</h4>
              <ul className="text-sm space-y-2 text-green-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  Discovery approfondie avec questions ouvertes
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  Démonstration personnalisée selon besoins
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  Quantifier ROI avec chiffres précis
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  Cartographier tous les stakeholders
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};