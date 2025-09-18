import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Brain, Mic, BarChart3, Users, Shield, Zap, Target, 
  Clock, Award, TrendingUp, BookOpen, Star, GraduationCap,
  Euro, CheckCircle, AlertTriangle
} from 'lucide-react';
import { useByssVnsData } from '@/hooks/useByssVnsData';

interface ByssVnsOverviewProps {
  scenarioId: string;
}

export const ByssVnsOverview: React.FC<ByssVnsOverviewProps> = ({ scenarioId }) => {
  const { data, getDisplayMetrics, calculateROI } = useByssVnsData();
  const metrics = getDisplayMetrics();
  const roi = calculateROI();

  return (
    <div className="space-y-6">
      {/* En-tête avec pricing corrigé */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-8 w-8" />
            Byss VNS - Solution Complète pour EDHEC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{data.pricing.annualPrice}€</div>
              <div className="text-sm opacity-90">Prix annuel</div>
              <div className="text-xs opacity-75">+ coûts API</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{data.features.technology}</div>
              <div className="text-sm opacity-90">IA Vocale</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{data.features.setup}</div>
              <div className="text-sm opacity-90">Déploiement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{roi.roiPercent}</div>
              <div className="text-sm opacity-90">ROI an 1</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{data.edhec.students}</div>
              <div className="text-sm opacity-90">Étudiants</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Défis EDHEC */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Défis Critiques EDHEC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.edhec.painPoints.map((pain, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <Target className="h-5 w-5 text-destructive mt-1" />
                <div>
                  <p className="text-sm font-medium">{pain}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Solution Byss VNS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Solution Byss VNS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technologie */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Technologie IA</h3>
              </div>
              <ul className="space-y-2">
                {[
                  `${data.features.technology} API`,
                  `Latence ${data.features.latency}`,
                  `Disponibilité ${data.features.availability}`,
                  `${data.features.rgpdCompliant ? 'RGPD Conforme' : 'Non-conforme'}`
                ].map((feature, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pédagogie */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Innovation Pédagogique</h3>
              </div>
              <ul className="space-y-2">
                {[
                  'Simulations immersives 24/7',
                  'Analytics soft skills',
                  'Feedback temps réel',
                  'Personas diversifiés'
                ].map((feature, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold">Avantage Business</h3>
              </div>
              <ul className="space-y-2">
                {[
                  `Setup ${data.features.setup}`,
                  `Support ${data.features.support}`,
                  `ROI ${roi.roiPercent}`,
                  `Payback ${roi.paybackMonths} mois`
                ].map((feature, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Analysis avec nouveau pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Analyse ROI - Impact Financier Majeur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2 p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {roi.currentCost.toLocaleString()}€
              </div>
              <div className="text-sm text-red-700">
                Assessment Centers<br />
                (850€ × 2800 × 2/an)
              </div>
            </div>
            <div className="text-center space-y-2 p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data.pricing.annualPrice.toLocaleString()}€
              </div>
              <div className="text-sm text-blue-700">
                Byss VNS<br />
                (+ coûts API ~2-4k€)
              </div>
            </div>
            <div className="text-center space-y-2 p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {roi.savings.toLocaleString()}€
              </div>
              <div className="text-sm text-green-700">
                Économies<br />
                première année
              </div>
            </div>
            <div className="text-center space-y-2 p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {roi.roiPercent}
              </div>
              <div className="text-sm text-purple-700">
                ROI<br />
                année 1
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Impact Stratégique</span>
            </div>
            <p className="text-sm text-green-700">
              Byss VNS coûte <strong>67x moins cher</strong> que les assessment centers tout en offrant 
              une formation continue 24/7 pour tous les étudiants. Budget libéré: 4.76M€ 
              réallocables vers autres innovations pédagogiques.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Objectifs EDHEC */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Réponse aux Objectifs EDHEC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.edhec.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">{objective}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Directement adressé par Byss VNS
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};