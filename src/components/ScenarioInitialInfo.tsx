import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, DollarSign, Calendar, Target, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import { useScenarios } from '@/hooks/useScenarios';
import { useByssVnsData } from '@/hooks/useByssVnsData';

interface ScenarioInitialInfoProps {
  scenarioId: string;
  scenario: any;
}

export const ScenarioInitialInfo: React.FC<ScenarioInitialInfoProps> = ({ 
  scenarioId, 
  scenario 
}) => {
  const { getScenarioById } = useScenarios();
  const scenarioData = getScenarioById(scenarioId);
  const { data: byssData, getDisplayMetrics } = useByssVnsData();
  
  if (!scenarioData?.marketData?.marketOverview) {
    return null;
  }

  const marketData = scenarioData.marketData;
  const marketOverview = marketData?.marketOverview;
  const objectives = scenarioData.specificObjectives;
  const isByssVnsScenario = scenarioId === 'byss-vns-school';
  const displayMetrics = isByssVnsScenario ? getDisplayMetrics() : null;

  return (
    <div className="space-y-6">
      {/* Spécifique Byss VNS - Métriques clés */}
      {isByssVnsScenario && displayMetrics && (
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Byss VNS - Solution IA Conversationnelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-card rounded-lg border">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Prix annuel</p>
                <p className="font-bold text-primary">{displayMetrics.pricing}</p>
                <p className="text-xs text-muted-foreground">+ coûts API clients</p>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg border">
                <Zap className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-muted-foreground">Technologie IA</p>
                <p className="font-bold text-green-700">{displayMetrics.technology}</p>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg border">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-muted-foreground">Déploiement</p>
                <p className="font-bold text-blue-700">{displayMetrics.setup}</p>
              </div>
              
              <div className="text-center p-4 bg-card rounded-lg border">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-muted-foreground">ROI an 1</p>
                <p className="font-bold text-purple-700">{displayMetrics.roi.roiPercent}</p>
              </div>
            </div>
            
            {/* Avantages clés Byss VNS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Avantages Technologiques
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• IA conversationnelle avancée (GPT-4)</li>
                  <li>• Analyse émotionnelle en temps réel</li>
                  <li>• Rapports automatisés détaillés</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Impact pour EDHEC
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• {byssData.edhec.students} étudiants impactés</li>
                  <li>• Évaluations 24h/24, 7j/7</li>
                  <li>• Réduction coûts de 60%</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vue d'ensemble du marché */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Contexte Marché - {scenario.company?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Taille marché</p>
              <p className="font-semibold">{marketOverview.marketSize}</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-muted-foreground">Croissance</p>
              <p className="font-semibold text-green-700">{marketOverview.growthRate}</p>
            </div>
            
            {marketOverview.budgetRange && (
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-muted-foreground">Budget type</p>
                <p className="font-semibold text-blue-700">{marketOverview.budgetRange}</p>
              </div>
            )}
            
            {marketOverview.expectedROI && (
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-muted-foreground">ROI attendu</p>
                <p className="font-semibold text-purple-700">{marketOverview.expectedROI}</p>
              </div>
            )}
          </div>
          
          {marketOverview.timeline && (
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">Timeline projet:</span>
                <span className="text-orange-700">{marketOverview.timeline}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Objectifs spécifiques par type d'appel */}
      {objectives && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Objectifs par Type d'Approche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cold Call */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="bg-orange-100 text-orange-700">
                    Cold Call
                  </Badge>
                </div>
                <div className="space-y-2 pl-4 border-l-2 border-orange-200">
                  <div>
                    <p className="text-sm font-medium text-orange-800">Objectif Principal:</p>
                    <p className="text-sm text-muted-foreground">{objectives.coldCall?.primary}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-800">Objectif Secondaire:</p>
                    <p className="text-sm text-muted-foreground">{objectives.coldCall?.secondary}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-800">Succès:</p>
                    <p className="text-sm text-green-600">{objectives.coldCall?.successMetrics}</p>
                  </div>
                </div>
              </div>

              {/* RDV */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    RDV Planifié
                  </Badge>
                </div>
                <div className="space-y-2 pl-4 border-l-2 border-green-200">
                  <div>
                    <p className="text-sm font-medium text-green-800">Objectif Principal:</p>
                    <p className="text-sm text-muted-foreground">{objectives.rdv?.primary}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Objectif Secondaire:</p>
                    <p className="text-sm text-muted-foreground">{objectives.rdv?.secondary}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Succès:</p>
                    <p className="text-sm text-green-600">{objectives.rdv?.successMetrics}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Métriques contextuelles spécifiques */}
      {marketOverview.currentProcessingTime && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Métriques Actuelles du Secteur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {marketOverview.currentProcessingTime && (
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-muted-foreground">Temps de traitement</p>
                  <p className="text-lg font-bold text-red-600">{marketOverview.currentProcessingTime}</p>
                </div>
              )}
              {marketOverview.errorRate && (
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-muted-foreground">Taux d'erreur</p>
                  <p className="text-lg font-bold text-orange-600">{marketOverview.errorRate}</p>
                </div>
              )}
              {marketOverview.costPerTransaction && (
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-muted-foreground">Coût/transaction</p>
                  <p className="text-lg font-bold text-blue-600">{marketOverview.costPerTransaction}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};