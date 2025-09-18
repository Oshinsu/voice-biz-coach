import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, BookOpen, TrendingUp } from 'lucide-react';

interface StudentModeToggleProps {
  isStudentMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export const StudentModeToggle: React.FC<StudentModeToggleProps> = ({ 
  isStudentMode, 
  onToggle 
}) => {
  return (
    <Card className="border-2 border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="h-5 w-5" />
          Mode d'affichage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {isStudentMode ? 'Mode Étudiant BTS' : 'Mode Professeur'}
              </span>
              <Badge variant={isStudentMode ? "default" : "secondary"}>
                {isStudentMode ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {isStudentMode 
                ? 'Interface simplifiée avec vocabulaire accessible'
                : 'Interface complète avec terminologie technique'
              }
            </p>
          </div>
          <Switch 
            checked={isStudentMode} 
            onCheckedChange={onToggle}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className={`p-3 rounded-lg border-2 ${isStudentMode ? 'border-primary bg-primary/5' : 'border-muted'}`}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Mode Étudiant</span>
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Vocabulaire simplifié</li>
              <li>• Glossaire intégré</li>
              <li>• Explications détaillées</li>
              <li>• Métriques en français</li>
            </ul>
          </div>

          <div className={`p-3 rounded-lg border-2 ${!isStudentMode ? 'border-primary bg-primary/5' : 'border-muted'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4" />
              <span className="font-medium">Mode Professeur</span>
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Terminologie technique</li>
              <li>• Données complètes</li>
              <li>• Analyses avancées</li>
              <li>• Métriques business</li>
            </ul>
          </div>
        </div>

        <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="font-medium text-accent">Recommandation pédagogique</span>
          </div>
          <p className="text-sm">
            Pour les étudiants BTS : commencer en mode étudiant puis progresser vers le mode professeur 
            au fur et à mesure de l'apprentissage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};