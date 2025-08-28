import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Phone, 
  Calendar, 
  Search, 
  Presentation, 
  HandshakeIcon,
  CheckCircle,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { getScenarioData } from '@/data/scenarioSpecificData';

interface ScenarioObjectivesProps {
  scenarioId?: string;
}

export const ScenarioObjectives: React.FC<ScenarioObjectivesProps> = ({ 
  scenarioId = 'kpi-performance' 
}) => {
  const scenarioData = getScenarioData(scenarioId);
  const { objectives } = scenarioData;

  const objectiveTypes = [
    {
      id: 'cold-call',
      label: 'Cold Call',
      icon: Phone,
      description: 'Appel à froid pour premier contact',
      objectives: objectives.coldCall,
      isStructured: true
    },
    {
      id: 'discovery',
      label: 'RDV Discovery',
      icon: Search,
      description: 'Entretien de découverte des besoins',
      objectives: objectives.meeting.discovery,
      isStructured: false
    },
    {
      id: 'demo',
      label: 'RDV Démo',
      icon: Presentation,
      description: 'Présentation de la solution',
      objectives: objectives.meeting.demo,
      isStructured: false
    },
    {
      id: 'closing',
      label: 'RDV Closing',
      icon: HandshakeIcon,
      description: 'Négociation et signature',
      objectives: objectives.meeting.closing,
      isStructured: false
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Objectifs pédagogiques par type d'interaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Les objectifs sont adaptés selon le type d'appel et le niveau de progression dans le cycle de vente. 
            Chaque interaction a des objectifs spécifiques à atteindre pour faire progresser l'opportunité commerciale.
          </p>

          <Tabs defaultValue="cold-call" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {objectiveTypes.map((type) => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="flex items-center gap-2"
                >
                  <type.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{type.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {objectiveTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className="space-y-6">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <type.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{type.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>

                {type.isStructured && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Objectifs principaux
                      </h4>
                      <div className="space-y-3">
                        {(type.objectives as any).primary.map((objective: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-secondary" />
                        Objectifs secondaires
                      </h4>
                      <div className="space-y-3">
                        {(type.objectives as any).secondary.map((objective: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                            <span className="text-sm">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!type.isStructured && (
                  <div>
                    <h4 className="font-semibold mb-3">Objectifs à atteindre</h4>
                    <div className="space-y-3">
                      {(type.objectives as string[]).map((objective: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                          <Target className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    Métriques de succès
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(type.isStructured ? (type.objectives as any).success_metrics : objectives.meeting.success_metrics).map((metric: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Conseils tactiques pour cette phase
                  </h4>
                  <div className="text-sm text-yellow-700">
                    {type.id === 'cold-call' && (
                      <ul className="space-y-1">
                        <li>• Préparer un pitch de 30 secondes maximum</li>
                        <li>• Identifier rapidement si c'est le bon interlocuteur</li>
                        <li>• Ne pas vendre la solution mais vendre le RDV</li>
                        <li>• Utiliser des références crédibles (ESSEC, KEDGE)</li>
                      </ul>
                    )}
                    {type.id === 'discovery' && (
                      <ul className="space-y-1">
                        <li>• Poser des questions ouvertes pour comprendre le contexte</li>
                        <li>• Écouter plus que parler (règle 70/30)</li>
                        <li>• Identifier les enjeux business, pas juste techniques</li>
                        <li>• Cartographier tous les stakeholders impliqués</li>
                      </ul>
                    )}
                    {type.id === 'demo' && (
                      <ul className="space-y-1">
                        <li>• Adapter la démo aux besoins identifiés en discovery</li>
                        <li>• Faire manipuler l'outil par le prospect</li>
                        <li>• Montrer des cas d'usage concrets ESCAP</li>
                        <li>• Présenter le ROI avec des chiffres précis</li>
                      </ul>
                    )}
                    {type.id === 'closing' && (
                      <ul className="space-y-1">
                        <li>• Récapituler tous les bénéfices validés ensemble</li>
                        <li>• Traiter les dernières objections avec patience</li>
                        <li>• Proposer des alternatives de closing (assumptif, alternatif)</li>
                        <li>• Sécuriser les next steps même sans signature immédiate</li>
                      </ul>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};