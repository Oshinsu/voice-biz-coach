import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, User, Package, Target, AlertTriangle, CheckCircle, 
  TrendingUp, Briefcase, GraduationCap, MapPin, Calendar,
  DollarSign, Users, Award, Shield, Zap, BarChart3, 
  Globe, Phone, Mail, Linkedin, Heart, Brain, Trophy
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Scenario } from '@/hooks/useScenarios';
import { ProductAnalysis } from './ProductAnalysis';
import { MarketAnalysis } from './MarketAnalysis';
import { ObjectionStrategy } from './ObjectionStrategy';

interface ScenarioDetailsProps {
  scenario: Scenario;
}

interface Interlocutor {
  id: string;
  name: string;
  role: string;
  personality?: string;
  communication_style?: string;
  decision_power?: string;
  priorities?: string[];
  concerns?: string[];
  motivations?: string[];
  experience?: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  pricing_starter?: string;
  pricing_professional?: string;
  pricing_enterprise?: string;
  key_features?: string[];
  competitive_advantages?: string[];
  roi?: string;
  implementation_time?: string;
}

export const ScenarioDetails: React.FC<ScenarioDetailsProps> = ({ scenario }) => {
  const [loading, setLoading] = useState(false);

  // Get data from scenario props (already loaded by useScenarios)
  const interlocutor = scenario.interlocutors?.[0] || null;
  const product = scenario.products?.[0] || null;
  const companySwot = scenario.swot_analyses?.find(s => s.analysis_type === 'company') || null;
  const productSwot = scenario.swot_analyses?.find(s => s.analysis_type === 'product') || null;
  const stakeholders = scenario.stakeholders || [];

  if (loading) {
    return <div className="p-4 text-center">Chargement des détails...</div>;
  }

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
            <div>
              <p className="text-sm font-medium">Secteur</p>
              <p className="text-sm text-muted-foreground">{scenario.company_sector}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Taille</p>
              <p className="text-sm text-muted-foreground">{scenario.company_size}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Budget</p>
              <p className="text-sm text-muted-foreground">{scenario.budget_range}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Probabilité</p>
              <p className="text-sm text-muted-foreground">{scenario.success_probability}%</p>
            </div>
          </div>

          {scenario.location && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm font-medium">Localisation</p>
                <p className="text-sm text-muted-foreground">{scenario.location}</p>
              </div>
              {scenario.revenue && (
                <div>
                  <p className="text-sm font-medium">Chiffre d'affaires</p>
                  <p className="text-sm text-muted-foreground">{scenario.revenue}</p>
                </div>
              )}
              {scenario.founded_year && (
                <div>
                  <p className="text-sm font-medium">Fondée en</p>
                  <p className="text-sm text-muted-foreground">{scenario.founded_year}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabbed content */}
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
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Vue d'ensemble de l'entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Étudiants</p>
                  <p className="text-2xl font-bold">2,500</p>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg">
                  <GraduationCap className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <p className="text-sm text-muted-foreground">Professeurs</p>
                  <p className="text-2xl font-bold">150</p>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">Fondée en</p>
                  <p className="text-2xl font-bold">1988</p>
                </div>
                <div className="text-center p-4 bg-muted/5 rounded-lg">
                  <Award className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Classement</p>
                  <p className="text-2xl font-bold">Top 20</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Informations générales
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Localisation:</span> Aix-en-Provence, France</p>
                    <p><span className="font-medium">Type:</span> École de commerce privée</p>
                    <p><span className="font-medium">Accréditations:</span> AACSB, EQUIS, AMBA</p>
                    <p><span className="font-medium">Campus:</span> 3 sites (Aix, Paris, Londres)</p>
                    <p><span className="font-medium">Budget annuel:</span> ~45M€</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Performance académique
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Taux d'emploi post-diplôme</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Satisfaction étudiante</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Notoriété entreprises</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SWOT Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analyse SWOT de l'école
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Forces
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Réputation établie dans le commerce</li>
                      <li>• Réseau alumni fort (15,000+)</li>
                      <li>• Partenariats entreprises solides</li>
                      <li>• Campus moderne à Aix-en-Provence</li>
                      <li>• Programmes internationaux développés</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Opportunités
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Digitalisation de l'enseignement</li>
                      <li>• Nouvelles pédagogies immersives</li>
                      <li>• Expansion campus internationaux</li>
                      <li>• Partenariats technologiques</li>
                      <li>• Formation continue entreprises</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Faiblesses
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Méthodes pédagogiques traditionnelles</li>
                      <li>• Outils digitaux limités</li>
                      <li>• Coûts de scolarité élevés</li>
                      <li>• Formation professeurs au digital</li>
                      <li>• Évaluation compétences pratiques</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Menaces
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Concurrence écoles digitalisées</li>
                      <li>• Formations en ligne (MOOCs)</li>
                      <li>• Évolution attentes étudiants</li>
                      <li>• Réglementation changements</li>
                      <li>• Crise économique impact inscriptions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Context and Pain Points */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Contexte et défis actuels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Situation actuelle</h4>
                <p className="text-sm text-muted-foreground">
                  ESCAP fait face à une pression croissante pour moderniser ses méthodes d'enseignement commercial. 
                  Les étudiants demandent plus d'interactivité et de pratique, tandis que les entreprises partenaires 
                  exigent des diplômés mieux formés aux techniques de vente modernes.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Points de douleur identifiés</h4>
                <div className="space-y-2">
                  {scenario.pain_points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-orange-800">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Enjeux stratégiques</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-1">Compétitivité</h5>
                    <p className="text-xs text-muted-foreground">Maintenir son rang face aux écoles digitalisées</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-1">Innovation</h5>
                    <p className="text-xs text-muted-foreground">Intégrer les nouvelles technologies pédagogiques</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h5 className="font-medium text-sm mb-1">Employabilité</h5>
                    <p className="text-xs text-muted-foreground">Améliorer les compétences pratiques des diplômés</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profil de votre interlocuteur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Dr. Marie Dubois</h3>
                    <p className="text-lg text-muted-foreground">Directrice Pédagogique & Innovation</p>
                    <p className="text-sm text-muted-foreground">ESCAP - École Supérieure de Commerce</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>marie.dubois@escap.edu</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>+33 4 42 17 11 60</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Linkedin className="h-4 w-4" />
                      <span>linkedin.com/in/mariedubois</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Background */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Parcours professionnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold">2019 - Présent | Directrice Pédagogique & Innovation</h4>
                  <p className="text-sm text-muted-foreground">ESCAP - École Supérieure de Commerce</p>
                  <p className="text-sm mt-1">
                    Responsable de la modernisation des programmes, intégration des nouvelles technologies 
                    pédagogiques, supervision de 150 professeurs et coordination des partenariats entreprises.
                  </p>
                </div>
                
                <div className="border-l-2 border-muted pl-4">
                  <h4 className="font-semibold">2014 - 2019 | Responsable Innovation Pédagogique</h4>
                  <p className="text-sm text-muted-foreground">ESSEC Business School</p>
                  <p className="text-sm mt-1">
                    Développement de programmes digitaux, mise en place de solutions e-learning, 
                    formation des équipes aux outils numériques.
                  </p>
                </div>
                
                <div className="border-l-2 border-muted pl-4">
                  <h4 className="font-semibold">2008 - 2014 | Consultante Formation & Digital</h4>
                  <p className="text-sm text-muted-foreground">Deloitte Consulting</p>
                  <p className="text-sm mt-1">
                    Accompagnement d'institutions éducatives dans leur transformation digitale, 
                    audit pédagogique, recommandations stratégiques.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Psychological Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Profil psychologique et comportemental
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Personnalité
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Style DISC:</span> Influence + Consciencieux</p>
                    <p><span className="font-medium">Approche:</span> Analytique mais ouverte aux innovations</p>
                    <p><span className="font-medium">Valeurs:</span> Excellence académique, transformation digitale</p>
                    <p><span className="font-medium">Traits:</span> Rigoureuse, visionnaire, collaborative</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Motivations clés
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Moderniser l'expérience étudiante</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Maintenir l'excellence académique</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Améliorer l'employabilité des diplômés</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Reconnaissance par les pairs</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Préoccupations principales
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Résistance au changement des professeurs</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Budget limité pour les innovations</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Complexité technique des solutions</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">ROI difficile à mesurer</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Priorités actuelles
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Digitalisation des cours</span>
                        <span className="font-medium">Urgent</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Formation des professeurs</span>
                        <span className="font-medium">Important</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Partenariats technologiques</span>
                        <span className="font-medium">Modéré</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decision Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Processus de décision et influence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium">Pouvoir de décision</p>
                  <p className="text-sm text-muted-foreground">Élevé (budget moins de 300k€)</p>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <p className="font-medium">Influence interne</p>
                  <p className="text-sm text-muted-foreground">Très forte</p>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="font-medium">Réseau externe</p>
                  <p className="text-sm text-muted-foreground">Excellent</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Style de communication préféré</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Approche structurée avec données concrètes, études de cas détaillées, 
                  preuves d'efficacité pédagogique. Apprécie les démonstrations pratiques 
                  et les témoignages d'autres institutions.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <Badge variant="secondary">Factuel</Badge>
                  <Badge variant="secondary">Analytique</Badge>
                  <Badge variant="secondary">Collaboratif</Badge>
                  <Badge variant="secondary">Innovant</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product" className="space-y-4">
          <ProductAnalysis />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <MarketAnalysis />
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Objectifs commerciaux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Objectifs principaux</h4>
                <div className="space-y-2">
                  {scenario.main_objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>

              {scenario.sales_goal && (
                <div>
                  <h4 className="font-medium mb-2">Objectif de vente</h4>
                  <p className="text-sm text-muted-foreground">{scenario.sales_goal}</p>
                </div>
              )}

              {scenario.expected_revenue && (
                <div>
                  <h4 className="font-medium mb-2">Revenus attendus</h4>
                  <p className="text-sm text-muted-foreground">{scenario.expected_revenue}</p>
                </div>
              )}

              {scenario.success_criteria && scenario.success_criteria.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Critères de succès</h4>
                  <div className="space-y-1">
                    {scenario.success_criteria.map((criterion, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{criterion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objections" className="space-y-4">
          <ObjectionStrategy />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioDetails;