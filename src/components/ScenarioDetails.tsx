import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, User, Package, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Scenario } from '@/hooks/useScenarios';

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
  const [interlocutor, setInterlocutor] = useState<Interlocutor | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnhancedData = async () => {
      try {
        setLoading(true);
        
        // Fetch interlocutor data
        const { data: interlocutorData } = await (supabase as any)
          .from('interlocutors')
          .select('*')
          .eq('scenario_id', scenario.id)
          .single();
        
        // Fetch product data
        const { data: productData } = await (supabase as any)
          .from('products')
          .select('*')
          .eq('scenario_id', scenario.id)
          .single();

        setInterlocutor(interlocutorData);
        setProduct(productData);
      } catch (error) {
        console.log('Enhanced data not available, using basic scenario data');
      } finally {
        setLoading(false);
      }
    };

    fetchEnhancedData();
  }, [scenario.id]);

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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="product">Produit</TabsTrigger>
          <TabsTrigger value="objectives">Objectifs</TabsTrigger>
          <TabsTrigger value="strategy">Stratégie</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Contexte de l'entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scenario.current_solution && (
                <div>
                  <h4 className="font-medium mb-2">Solution actuelle</h4>
                  <p className="text-sm text-muted-foreground">{scenario.current_solution}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Points de douleur</h4>
                <div className="space-y-2">
                  {scenario.pain_points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {scenario.key_people && scenario.key_people.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Personnes clés</h4>
                  <div className="space-y-1">
                    {scenario.key_people.map((person, index) => (
                      <p key={index} className="text-sm text-muted-foreground">{person}</p>
                    ))}
                  </div>
                </div>
              )}

              {scenario.timeline_description && (
                <div>
                  <h4 className="font-medium mb-2">Timeline</h4>
                  <p className="text-sm text-muted-foreground">{scenario.timeline_description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Votre interlocuteur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {interlocutor ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">{interlocutor.name}</h4>
                      <p className="text-sm text-muted-foreground">{interlocutor.role}</p>
                    </div>
                    {interlocutor.decision_power && (
                      <div>
                        <h4 className="font-medium mb-1">Pouvoir de décision</h4>
                        <p className="text-sm text-muted-foreground">{interlocutor.decision_power}</p>
                      </div>
                    )}
                  </div>

                  {interlocutor.personality && (
                    <div>
                      <h4 className="font-medium mb-2">Personnalité</h4>
                      <p className="text-sm text-muted-foreground">{interlocutor.personality}</p>
                    </div>
                  )}

                  {interlocutor.communication_style && (
                    <div>
                      <h4 className="font-medium mb-2">Style de communication</h4>
                      <p className="text-sm text-muted-foreground">{interlocutor.communication_style}</p>
                    </div>
                  )}

                  {interlocutor.priorities && interlocutor.priorities.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Priorités</h4>
                      <div className="space-y-1">
                        {interlocutor.priorities.map((priority, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{priority}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {interlocutor.concerns && interlocutor.concerns.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Préoccupations</h4>
                      <div className="space-y-1">
                        {interlocutor.concerns.map((concern, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{concern}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {interlocutor.motivations && interlocutor.motivations.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Motivations</h4>
                      <div className="space-y-1">
                        {interlocutor.motivations.map((motivation, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{motivation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {interlocutor.experience && (
                    <div>
                      <h4 className="font-medium mb-2">Expérience</h4>
                      <p className="text-sm text-muted-foreground">{interlocutor.experience}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Informations détaillées du contact non disponibles. Les données de base du scénario seront utilisées.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produit à vendre
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product ? (
                <>
                  <div>
                    <h4 className="font-medium mb-1">{product.name}</h4>
                    {product.description && (
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    )}
                  </div>

                  {(product.pricing_starter || product.pricing_professional || product.pricing_enterprise) && (
                    <div>
                      <h4 className="font-medium mb-2">Tarification</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {product.pricing_starter && (
                          <div className="p-3 border rounded-lg">
                            <h5 className="font-medium text-sm">Starter</h5>
                            <p className="text-sm text-muted-foreground">{product.pricing_starter}</p>
                          </div>
                        )}
                        {product.pricing_professional && (
                          <div className="p-3 border rounded-lg">
                            <h5 className="font-medium text-sm">Professional</h5>
                            <p className="text-sm text-muted-foreground">{product.pricing_professional}</p>
                          </div>
                        )}
                        {product.pricing_enterprise && (
                          <div className="p-3 border rounded-lg">
                            <h5 className="font-medium text-sm">Enterprise</h5>
                            <p className="text-sm text-muted-foreground">{product.pricing_enterprise}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {product.key_features && product.key_features.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Fonctionnalités clés</h4>
                      <div className="space-y-1">
                        {product.key_features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.competitive_advantages && product.competitive_advantages.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Avantages concurrentiels</h4>
                      <div className="space-y-1">
                        {product.competitive_advantages.map((advantage, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{advantage}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.roi && (
                    <div>
                      <h4 className="font-medium mb-2">ROI attendu</h4>
                      <p className="text-sm text-muted-foreground">{product.roi}</p>
                    </div>
                  )}

                  {product.implementation_time && (
                    <div>
                      <h4 className="font-medium mb-2">Temps d'implémentation</h4>
                      <p className="text-sm text-muted-foreground">{product.implementation_time}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Informations produit détaillées non disponibles. Les données de base du scénario seront utilisées.
                </p>
              )}
            </CardContent>
          </Card>
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

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Stratégie et objections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scenario.available_tools && scenario.available_tools.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Outils commerciaux disponibles</h4>
                  <div className="space-y-1">
                    {scenario.available_tools.map((tool, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{tool}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {scenario.probable_objections && scenario.probable_objections.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Objections probables</h4>
                  <div className="space-y-2">
                    {scenario.probable_objections.map((objection, index) => (
                      <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-800">{objection}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {scenario.tools && scenario.tools.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Outils d'aide à la vente</h4>
                  <div className="space-y-1">
                    {scenario.tools.map((tool, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{tool}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioDetails;