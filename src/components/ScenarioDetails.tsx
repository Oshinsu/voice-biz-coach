
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
  BarChart3,
  Zap
} from 'lucide-react';
import { ProductAnalysis } from './ProductAnalysis';
import { MarketAnalysis } from './MarketAnalysis';
import { ObjectionStrategy } from './ObjectionStrategy';
import { ScenarioObjectives } from './ScenarioObjectives';
import { ScenarioInitialInfo } from './ScenarioInitialInfo';

interface ScenarioDetailsProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    company: {
      name: string;
      sector: string;
      size: string;
      revenue: string;
      location: string;
      description: string;
      painPoints: string[] | Array<{
        issue: string;
        description: string;
        cost: string;
        impact: string;
      }>;
      currentSolution: string;
      budget: string;
      timeline: string;
    };
    interlocutor: any;
    product: any;
    objectives: string[];
    swot: any;
    competitorSwot: any;
    probableObjections: string[];
    successCriteria: string[];
    tools: string[];
    probability: number;
    stakeholders?: any[];
  };
}

export const ScenarioDetails: React.FC<ScenarioDetailsProps> = ({ scenario }) => {
  const [loading, setLoading] = React.useState(false);

  // Get data from scenario props (already loaded by useScenarios)
  const interlocutor = scenario.interlocutor || null;
  const product = scenario.product || null;
  const companySwot = scenario.swot || null;
  const productSwot = scenario.competitorSwot || null;
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
              {scenario.company.name}
            </CardTitle>
            <Badge variant={scenario.difficulty === 'Facile' ? 'secondary' : scenario.difficulty === 'Moyen' ? 'default' : 'destructive'}>
              {scenario.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{scenario.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <Building className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Secteur</p>
              <p className="text-sm font-medium">{scenario.company.sector}</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-accent" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Budget</p>
              <p className="text-sm font-medium">{scenario.company.budget}</p>
            </div>
            <div className="text-center p-4 bg-muted/5 rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Taille</p>
              <p className="text-sm font-medium">{scenario.company.size}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="product">Produit</TabsTrigger>
          <TabsTrigger value="analysis">Analyses</TabsTrigger>
          <TabsTrigger value="objectives">Objectifs</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ScenarioInitialInfo scenarioId={scenario.id} scenario={scenario} />
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          {/* Section EDHEC */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                EDHEC Business School - Client Cible
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                École de commerce française prestigieuse, fondée en 1906, qui cherche à révolutionner son enseignement commercial
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Profil Entreprise</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Secteur:</span> {scenario.company.sector}
                  </div>
                  <div>
                    <span className="font-medium">Taille:</span> {scenario.company.size}
                  </div>
                  <div>
                    <span className="font-medium">Revenus:</span> {scenario.company.revenue}
                  </div>
                  <div>
                    <span className="font-medium">Budget Innovation:</span> {scenario.company.budget}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Points de Douleur Critiques</h4>
                <div className="space-y-3">
                  {Array.isArray(scenario.company.painPoints) && 
                   scenario.company.painPoints.slice(0, 4).map((pain: any, index: number) => (
                    <div key={index} className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        {typeof pain === 'string' ? pain : pain.issue || pain.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Écosystème Technologique</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">LMS:</span> Blackboard Learn Ultra + Microsoft Teams
                  </div>
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">Simulations:</span> Cesim + Marketplace (85k€/an)
                  </div>
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">Analytics:</span> Power BI + custom dashboards
                  </div>
                  <div className="p-3 border rounded-lg">
                    <span className="font-medium">Infrastructure:</span> Azure Education + on-premise
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scenario.company.name} est une entreprise du secteur {scenario.company.sector} de taille {scenario.company.size}. 
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
                  {scenario.company.painPoints.map((pain, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg border-l-4 border-orange-500">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 mt-0.5 text-orange-500 flex-shrink-0" />
                        <div className="flex-1">
                          {typeof pain === 'string' ? (
                            <span className="text-sm">{pain}</span>
                          ) : (
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">{pain.issue}</h5>
                              <p className="text-xs text-muted-foreground">{pain.description}</p>
                              <div className="flex gap-4 text-xs">
                                <span className="text-red-600 font-medium">Impact: {pain.impact}</span>
                                <span className="text-orange-600 font-medium">Coût: {pain.cost}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Byss VNS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Byss VNS - Solution Révolutionnaire
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Simulateur vocal IA pour transformer l'enseignement commercial avec GPT-4o Realtime
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SWOT Analysis Byss VNS */}
              {scenario.swot && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analyse SWOT - Byss VNS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h5 className="font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Forces
                      </h5>
                      <ul className="text-sm space-y-1">
                        {renderSwotItems(scenario.swot.strengths).map((strength: string, index: number) => (
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
                        {renderSwotItems(scenario.swot.weaknesses).map((weakness: string, index: number) => (
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
                        {renderSwotItems(scenario.swot.opportunities).map((opportunity: string, index: number) => (
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
                        {renderSwotItems(scenario.swot.threats).map((threat: string, index: number) => (
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

              <div>
                <h4 className="font-semibold mb-3">Positionnement & Avantages</h4>
                <div className="space-y-3">
                  {scenario.product.competitiveAdvantages.slice(0, 4).map((advantage: string, index: number) => (
                    <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-blue-800 dark:text-blue-200">{advantage}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">ROI & Valeur</h4>
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg">
                  <p className="text-sm leading-relaxed">{scenario.product.roi}</p>
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
          <ProductAnalysis 
            products={[scenario.product]} 
            scenarioId={scenario.id}
            productSwot={scenario.competitorSwot}
          />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <MarketAnalysis 
            swotAnalyses={scenario.swot ? [scenario.swot] : []} 
            sector={scenario.company?.sector}
            companyName={scenario.company?.name}
            scenarioId={scenario.id}
          />
        </TabsContent>

        <TabsContent value="objectives" className="space-y-6">
          <ScenarioObjectives scenarioId={scenario.id} />
        </TabsContent>

        <TabsContent value="objections" className="space-y-6">
          <ObjectionStrategy scenarioId={scenario.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
