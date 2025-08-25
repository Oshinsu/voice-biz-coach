import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { scenarios } from "@/data/scenarios";
import { personas } from "@/data/personas";
import { useSalesStore } from "@/store/salesStore";
import { Calculator, TrendingUp, Target, Zap, Phone, Calendar, Lock } from "lucide-react";

const conversationTypeOptions = [
  { 
    value: 'cold-call', 
    label: 'Cold Call', 
    description: 'Appel à froid pour décrocher un RDV',
    icon: <Phone className="h-4 w-4" />,
    duration: '5-15 minutes'
  },
  { 
    value: 'rdv', 
    label: 'Rendez-vous Commercial', 
    description: 'RDV planifié avec toutes les phases',
    icon: <Calendar className="h-4 w-4" />,
    duration: '20-45 minutes'
  }
];

const difficultyOptions = [
  { value: 'facile', label: 'Facile', description: 'Prospect coopératif' },
  { value: 'moyen', label: 'Moyen', description: 'Quelques objections' },
  { value: 'difficile', label: 'Difficile', description: 'Prospect sceptique' }
];

const getScenarioIcon = (scenarioId: string) => {
  switch (scenarioId) {
    case 'kpi-performance':
      return <TrendingUp className="h-4 w-4" />;
    case 'ca-benefice':
      return <Calculator className="h-4 w-4" />;
    case 'etude-marche':
      return <Target className="h-4 w-4" />;
    default:
      return <Zap className="h-4 w-4" />;
  }
};

export const ScenarioSelector = () => {
  const {
    selectedScenario,
    selectedPersona,
    difficulty,
    conversationType,
    coldCallCompleted,
    rdvUnlocked,
    setScenario,
    setPersona,
    setDifficulty,
    setConversationType,
    clearSession
  } = useSalesStore();
  
  const [localScenario, setLocalScenario] = useState(selectedScenario?.id || '');
  const [localPersona, setLocalPersona] = useState(selectedPersona?.id || '');
  const [localDifficulty, setLocalDifficulty] = useState(difficulty);
  const [localConversationType, setLocalConversationType] = useState(conversationType);

  const handleStart = () => {
    const scenario = scenarios.find(s => s.id === localScenario);
    const persona = personas.find(p => p.id === localPersona);
    
    if (scenario && persona) {
      setScenario(scenario);
      setPersona(persona);
      setDifficulty(localDifficulty);
      setConversationType(localConversationType);
      clearSession();
    }
  };

  const canStart = localScenario && localPersona;
  const isRdvLocked = localConversationType === 'rdv' && !rdvUnlocked;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Configuration
        </CardTitle>
        <CardDescription>
          Choisissez votre scénario et persona pour commencer
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Type de conversation */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Type de conversation</label>
          <Select value={localConversationType} onValueChange={(value: any) => setLocalConversationType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {conversationTypeOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.value === 'rdv' && !rdvUnlocked}
                >
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {option.value === 'rdv' && !rdvUnlocked && (
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {option.description} • {option.duration}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {localConversationType === 'rdv' && !rdvUnlocked && (
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              💡 Complétez d'abord un Cold Call avec succès pour débloquer les RDV complets
            </div>
          )}
          
          {coldCallCompleted && (
            <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
              ✅ Cold Call complété - RDV débloqués !
            </div>
          )}
        </div>

        <Separator />

        {/* Sélection du scénario */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Scénario</label>
          <Select value={localScenario} onValueChange={setLocalScenario}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir un scénario..." />
            </SelectTrigger>
            <SelectContent>
              {scenarios.map((scenario) => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  <div className="flex items-center gap-2">
                    {getScenarioIcon(scenario.id)}
                    <span>{scenario.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {localScenario && (
            <Card className="border-muted">
              <CardContent className="p-4">
                {(() => {
                  const scenario = scenarios.find(s => s.id === localScenario);
                  return scenario ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {scenario.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">
                            {tool.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </CardContent>
            </Card>
          )}
        </div>

        <Separator />

        {/* Sélection du persona */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Persona</label>
          <Select value={localPersona} onValueChange={setLocalPersona}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir un persona..." />
            </SelectTrigger>
            <SelectContent>
              {personas.map((persona) => (
                <SelectItem key={persona.id} value={persona.id}>
                  <div className="space-y-1">
                    <div className="font-medium">{persona.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {persona.sector} • {persona.companySize}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {localPersona && (
            <Card className="border-muted">
              <CardContent className="p-4">
                {(() => {
                  const persona = personas.find(p => p.id === localPersona);
                  return persona ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">{persona.sector}</p>
                          <p className="text-xs text-muted-foreground">
                            {persona.companySize} • {persona.budget}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Style de communication</p>
                          <p className="text-sm">{persona.communicationStyle}</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </CardContent>
            </Card>
          )}
        </div>

        <Separator />

        {/* Difficulté */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Difficulté</label>
          <Select value={localDifficulty} onValueChange={(value: any) => setLocalDifficulty(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficultyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="space-y-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={handleStart} 
            disabled={!canStart || isRdvLocked}
            className="w-full"
          >
            {isRdvLocked ? 'RDV verrouillé' : selectedScenario ? 'Redémarrer la session' : 'Démarrer la session'}
          </Button>
          
          {selectedScenario && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Session active : {selectedScenario.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {conversationType === 'cold-call' ? 'Cold Call' : 'RDV Commercial'} avec {selectedPersona?.title}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};