import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSalesStore } from "@/store/salesStore";
import { salesPhases, getPhaseById, getNextPhases } from "@/data/salesPhases";
import { Brain, CheckCircle2, AlertCircle, ArrowRight, Lightbulb, Phone, Calendar } from "lucide-react";

export const CoachPanel = () => {
  const {
    currentPhase,
    conversationType,
    setCurrentPhase,
    coachNotes,
    scores,
    nextSteps,
    mode,
    completeColdCall
  } = useSalesStore();

  const currentPhaseData = getPhaseById(currentPhase);
  const nextPhasesData = getNextPhases(currentPhase);
  const currentScore = scores[currentPhase] || 0;
  const latestNote = coachNotes.filter(note => note.phase === currentPhase).pop();

  const getPhaseScore = (phaseId: string) => scores[phaseId] || 0;
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="h-full space-y-4">
      {/* Phase Tracker */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5" />
            Phase Tracker
            <Badge variant="outline" className="ml-auto">
              {conversationType === 'cold-call' ? (
                <><Phone className="h-3 w-3 mr-1" /> Cold Call</>
              ) : (
                <><Calendar className="h-3 w-3 mr-1" /> RDV</>
              )}
            </Badge>
          </CardTitle>
          <CardDescription>
            Suivi de votre progression commerciale - {conversationType === 'cold-call' ? 'Objectif: Décrocher un RDV' : 'Objectif: Conclure la vente'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Phase actuelle */}
          {currentPhaseData && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{currentPhaseData.title}</h4>
                <Badge 
                  variant={getScoreBadgeVariant(currentScore)}
                  className="text-xs"
                >
                  {currentScore}%
                </Badge>
              </div>
              
              <Progress value={currentScore} className="h-2" />
              
              <p className="text-sm text-muted-foreground">
                {currentPhaseData.description}
              </p>
              
              <div className="text-xs text-muted-foreground">
                <strong>Durée attendue:</strong> {currentPhaseData.duration[conversationType]}
              </div>
            </div>
          )}

          {/* Navigation phases */}
          {nextPhasesData.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                PROCHAINES ÉTAPES
              </label>
              <div className="space-y-1">
                {nextPhasesData.map((phase) => (
                  <Button
                    key={phase.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPhase(phase.id)}
                    className="w-full justify-start h-auto p-2"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <ArrowRight className="h-3 w-3" />
                      <span className="text-xs">{phase.title}</span>
                      <Badge 
                        variant="outline" 
                        className="ml-auto text-xs"
                      >
                        {getPhaseScore(phase.id)}%
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Vue d'ensemble des phases */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              PROGRESSION GLOBALE
            </label>
            <ScrollArea className="h-32">
              <div className="space-y-1">
                {salesPhases.map((phase) => {
                  const score = getPhaseScore(phase.id);
                  const isActive = phase.id === currentPhase;
                  const isApplicable = conversationType === 'rdv' || ['ouverture', 'decouverte', 'reformulation', 'objections', 'closing'].includes(phase.id);
                  
                  if (!isApplicable) return null;
                  
                  return (
                    <div
                      key={phase.id}
                      className={`flex items-center justify-between p-2 rounded-sm ${
                        isActive ? 'bg-muted' : ''
                      }`}
                    >
                      <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                        {phase.title}
                      </span>
                      <span className={`text-xs ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          
          {/* Actions rapides */}
          {conversationType === 'cold-call' && currentPhase === 'closing' && currentScore >= 70 && (
            <Button 
              onClick={completeColdCall}
              size="sm"
              className="w-full"
            >
              ✅ Marquer le Cold Call comme réussi
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Feedback du coach */}
      {mode === 'coach' && latestNote && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5" />
              Feedback Coach
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant={getScoreBadgeVariant(latestNote.score)}>
                {latestNote.score}/100
              </Badge>
              <span className="text-sm text-muted-foreground">
                {latestNote.phase}
              </span>
            </div>
            
            <p className="text-sm">{latestNote.feedback}</p>
            
            {latestNote.actions.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  ACTIONS RECOMMANDÉES
                </label>
                <div className="space-y-1">
                  {latestNote.actions.map((action, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 mt-1 text-muted-foreground" />
                      <span className="text-xs">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5" />
              Next Steps
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Objectifs phase actuelle */}
      {currentPhaseData && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Objectifs</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              {currentPhaseData.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2" />
                  <span className="text-sm">{objective}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};