import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestButton } from '@/components/ui/test-button';
import { MagicSpotlight } from '@/components/ui/magic-spotlight';
import { motion } from 'framer-motion';
import { 
  Building, Users, TrendingUp, Target, ArrowRight, 
  Star, MapPin, Calendar, DollarSign, Brain, Award
} from 'lucide-react';

interface ModernScenarioCardProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    probability: number;
    company?: {
      name: string;
      sector: string;
      size: string;
    };
  };
  onClick: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Facile": return "bg-green-500/10 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400";
    case "Moyen": return "bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";  
    case "Difficile": return "bg-red-500/10 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400";
    default: return "bg-gray-500/10 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

export const ModernScenarioCard: React.FC<ModernScenarioCardProps> = ({ scenario, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <MagicSpotlight className="h-full">
        <Card className="group h-full overflow-hidden border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Header with gradient */}
            <div className="p-6 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border-b border-border/30">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  {scenario.id === 'byss-vns-school' && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/30">
                      <Award className="h-3 w-3 mr-1" />
                      4ème Mondiale FT
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(scenario.difficulty)}
                >
                  {scenario.difficulty}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {scenario.title}
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {scenario.description}
              </p>
            </div>

            {/* Company Info */}
            {scenario.company && (
              <div className="px-6 py-4 space-y-3 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{scenario.company.name}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>{scenario.company.sector}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{scenario.company.size}</span>
                </div>

                {/* EDHEC specific badges */}
                {scenario.id === 'byss-vns-school' && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      <Brain className="h-3 w-3 mr-1" />
                      Innovation IA
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                      <Users className="h-3 w-3 mr-1" />
                      9K Étudiants
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Budget 80k€
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="p-6 pt-0 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Probabilité</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {scenario.probability}%
                  </Badge>
                </div>
              </div>
              
              <TestButton 
                onClick={onClick}
                className="w-full group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-200"
                size="sm"
              >
                Commencer le scénario
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </TestButton>
            </div>
          </CardContent>
        </Card>
      </MagicSpotlight>
    </motion.div>
  );
};