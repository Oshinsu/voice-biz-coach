
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  TrendingUp, 
  Building, 
  DollarSign, 
  Users, 
  User, 
  Briefcase, 
  Brain, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Minus, 
  Shield, 
  AlertCircle,
  Star,
  Settings,
  Wrench,
  BarChart3
} from 'lucide-react';
import { ProductAnalysis } from './ProductAnalysis';
import { MarketAnalysis } from './MarketAnalysis';
import { ObjectionStrategy } from './ObjectionStrategy';

interface ScenarioDetailsProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    company_name: string;
    company_sector: string;
    company_size: string;
    budget_range: string;
    success_probability: number;
    main_objectives: string[];
    available_tools: string[];
    pain_points: string[];
    interlocutors?: any[];
    products?: any[];
    swot_analyses?: any[];
    stakeholders?: any[];
  };
}

export const ScenarioDetails: React.FC<ScenarioDetailsProps> = ({ scenario }) => {
  const [loading, setLoading] = React.useState(false);

  // Get data from scenario props (already loaded by useScenarios)
  const interlocutor = scenario.interlocutors?.[0] || null;
  const product = scenario.products?.[0] || null;
  const companySwot = scenario.swot_analyses?.find(s => s.analysis_type === 'company') || null;
  const productSwot = scenario.swot_analyses?.find(s => s.analysis_type === 'product') || null;
  const stakeholders = scenario.stakeholders || [];

  // Helper function to safely render SWOT items
  const renderSwotItems = (items: any) => {
    if (!items) return [];
    
    // If it's an array of strings
    if (Array.isArray(items)) {
      return items;
    }
    
    // If it's an object with string values
    if (typeof items === 'object' && items !== null) {
      return Object.values(items).filter(item => typeof item === 'string');
    }
    
    return [];
  };

  return (
    <div className="space-y-6">
      {/* Header with scenario overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {scenario.company_name}
            </CardTitle>
            <Badge variant={scenario.difficulty === 'Facile' ? 'secondary' : scenario.difficulty === 'Moyen' ? 'default' : 'destructive'}>
              {scenario.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{scenario.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Probabilité</p>
              <p className="text-lg font-bold">{scenario.success_probability}%</p>
            </div>
            <div className="text-center p-3 bg-secondary/5 rounded-lg">
              <Building className="h-6 w-6 mx-auto mb-1 text-secondary" />
              <p className="text-xs text-muted-foreground">Secteur</p>
              <p className="text-sm font-medium">{scenario.company_sector}</p>
            </div>
            <div className="text-center p-3 bg-accent/5 rounded-lg">
              <DollarSign className="h-6 w-6 mx-auto mb-1 text-accent" />
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm font-medium">{scenario.budget_range}</p>
            </div>
            <div className="text-center p-3 bg-muted/5 rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Taille</p>
              <p className="text-sm font-medium">{scenario.company_size}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed tabs */}
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="product">Produit</TabsTrigger>
          <TabsTrigger value="analysis">Analyses</TabsTrigger>
          <TabsTrigger value="objectives">Objectifs</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Vue d'ensemble de l'entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scenario.company_name} est une entreprise du secteur {scenario.company_sector} de taille {scenario.company_size}. 
                  Elle opère dans un environnement concurrentiel où l'innovation et l'efficacité opérationnelle sont essentielles pour maintenir sa position sur le marché.
                </p>
              </div>

              {companySwot && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analyse SWOT de l'entreprise
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h5 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Forces
                      </h5>
                      <ul className="text-sm space-y-1">
                        {renderSwotItems(companySwot.strengths).map((strength: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <h5 className="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Faiblesses
                      </h5>
                      <ul className="text-sm space-y-1">
                        {renderSwotItems(companySwot.weaknesses).map((weakness: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 mt-1 text-red-600 flex-shrink-0" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Opportunités
                      </h5>
                      <ul className="text-sm space-y-1">
                        {renderSwotItems(companySwot.opportunities).map((opportunity: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Plus className="h-3 w-3 mt-1 text-blue-600 flex-shrink-0" />
                            {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Menaces
                      </h5>
                      <ul className="text-sm space-y-1">
                        {renderSwotItems(companySwot.threats).map((threat: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <Minus className="h-3 w-3 mt-1 text-orange-600 flex-shrink-0" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {companySwot?.porter_analysis && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analyse des 5 Forces de Porter
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(companySwot.porter_analysis as Record<string, string>).map(([key, value]) => (
                      <div key={key} className="p-3 border rounded-lg">
                        <h5 className="font-medium capitalize mb-1">{key === 'rivalry' ? 'Rivalité' : key === 'suppliers' ? 'Fournisseurs' : key === 'buyers' ? 'Clients' : key === 'substitutes' ? 'Substituts' : 'Barrières'}</h5>
                        <p className="text-sm text-muted-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Points de douleur identifiés
                </h4>
                <div className="grid gap-3">
                  {scenario.pain_points.map((pain, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <AlertCircle className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
                      <span className="text-sm">{pain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          {interlocutor ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {interlocutor.name} - {interlocutor.role}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Profil professionnel
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Expérience:</span> {interlocutor.experience}</p>
                      <p><span className="font-medium">Formation:</span> {interlocutor.background}</p>
                      <p><span className="font-medium">Pouvoir de décision:</span> {interlocutor.decision_power}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Profil psychologique
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Personnalité:</span> {interlocutor.personality}</p>
                      <p><span className="font-medium">Style de communication:</span> {interlocutor.communication_style}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Priorités et motivations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Priorités</h5>
                      <ul className="space-y-1">
                        {interlocutor.priorities?.map((priority: string, index: number) => (
                          <li key={index} className="text-sm flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {priority}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Préoccupations</h5>
                      <ul className="space-y-1">
                        {interlocutor.concerns?.map((concern: string, index: number) => (
                          <li key={index} className="text-sm flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Motivations</h5>
                      <ul className="space-y-1">
                        {interlocutor.motivations?.map((motivation: string, index: number) => (
                          <li key={index} className="text-sm flex items-center gap-2">
                            <Star className="h-3 w-3 text-blue-500" />
                            {motivation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Processus de décision
                  </h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {interlocutor.decision_process}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Informations sur le contact en cours de chargement...</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="product" className="space-y-6">
          <ProductAnalysis products={scenario.products} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <MarketAnalysis swotAnalyses={scenario.swot_analyses} />
        </TabsContent>

        <TabsContent value="objectives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objectifs commerciaux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Objectifs principaux</h4>
                <div className="grid gap-3">
                  {scenario.main_objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                      <Target className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Outils disponibles
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scenario.available_tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Wrench className="h-4 w-4 text-secondary" />
                      <span className="text-sm">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objections" className="space-y-6">
          <ObjectionStrategy />
        </TabsContent>
      </Tabs>
    </div>
  );
};
