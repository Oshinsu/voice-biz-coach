import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Package, Target, Zap, DollarSign, TrendingUp, 
  CheckCircle, AlertTriangle, Users, BarChart3,
  Lightbulb, Award, Shield, Globe
} from 'lucide-react';
import { Product } from '@/hooks/useScenarios';

interface ProductAnalysisProps {
  products?: Product[];
}

export const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ products = [] }) => {
  const mainProduct = products[0]; // Get the first product for main display
  return (
    <div className="space-y-6">
      {/* Product Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {mainProduct?.name || 'Produit'} - Vue d'ensemble
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="text-2xl font-bold">{mainProduct?.name?.includes('Fintech') ? 'SaaS' : mainProduct?.name?.includes('Analytics') ? 'B2B' : 'Platform'}</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="text-sm text-muted-foreground">Segment cible</p>
              <p className="text-2xl font-bold">{mainProduct?.target_segments?.[0] || 'Enterprise'}</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm text-muted-foreground">ROI estimé</p>
              <p className="text-2xl font-bold">{mainProduct?.roi || '350%'}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Description du produit</h4>
            <p className="text-sm text-muted-foreground">
              {mainProduct?.description || 'Description du produit non disponible.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Spécifications techniques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Spécifications techniques</h4>
              <div className="space-y-2 text-sm">
                {mainProduct?.technical_specs && typeof mainProduct.technical_specs === 'object' ? (
                  Object.entries(mainProduct.technical_specs).map(([key, value]) => (
                    <p key={key}><span className="font-medium">{key}:</span> {String(value)}</p>
                  ))
                ) : (
                  <>
                    <p><span className="font-medium">Architecture:</span> Cloud-native, microservices</p>
                    <p><span className="font-medium">Sécurité:</span> SSL/TLS, authentification multi-facteurs</p>
                    <p><span className="font-medium">Intégrations:</span> API REST, webhooks</p>
                    <p><span className="font-medium">Conformité:</span> RGPD, SOC 2</p>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Fonctionnalités clés</h4>
              <div className="space-y-2">
                {mainProduct?.key_features?.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{feature}</p>
                  </div>
                )) || (
                  <>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Interface utilisateur intuitive</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Analytics avancés</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Support multi-plateforme</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Stratégie tarifaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-center mb-4">
                <h4 className="font-semibold">Starter</h4>
                <p className="text-3xl font-bold mt-2">{mainProduct?.pricing_starter || '99€'}</p>
                <p className="text-sm text-muted-foreground">par mois</p>
              </div>
              <ul className="text-sm space-y-1">
                <li>✓ Fonctionnalités de base</li>
                <li>✓ Support email</li>
                <li>✓ Documentation complète</li>
                <li>✓ Intégrations standards</li>
              </ul>
            </div>
            
            <div className="p-4 border-2 border-primary rounded-lg relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
                Recommandé
              </Badge>
              <div className="text-center mb-4">
                <h4 className="font-semibold">Professional</h4>
                <p className="text-3xl font-bold mt-2">{mainProduct?.pricing_professional || '299€'}</p>
                <p className="text-sm text-muted-foreground">par mois</p>
              </div>
              <ul className="text-sm space-y-1">
                <li>✓ Toutes les fonctionnalités</li>
                <li>✓ Analytics avancés</li>
                <li>✓ Support prioritaire</li>
                <li>✓ Intégrations premium</li>
                <li>✓ API complète</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="text-center mb-4">
                <h4 className="font-semibold">Enterprise</h4>
                <p className="text-3xl font-bold mt-2">{mainProduct?.pricing_enterprise || 'Sur mesure'}</p>
                <p className="text-sm text-muted-foreground">contact</p>
              </div>
              <ul className="text-sm space-y-1">
                <li>✓ Solution personnalisée</li>
                <li>✓ Account manager dédié</li>
                <li>✓ SLA garantis</li>
                <li>✓ Déploiement on-premise</li>
                <li>✓ Support 24/7</li>
              </ul>
            </div>
          </div>
          
          {mainProduct?.implementation_time && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Mise en œuvre</h4>
              <p className="text-sm text-blue-700">
                Temps d'implémentation estimé : {mainProduct.implementation_time}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product SWOT */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analyse SWOT du produit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Forces</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  {mainProduct?.competitive_advantages?.map((advantage, index) => (
                    <li key={index}>• {advantage}</li>
                  )) || (
                    <>
                      <li>• Interface utilisateur intuitive</li>
                      <li>• Technologie robuste</li>
                      <li>• Support client réactif</li>
                      <li>• Évolutivité du produit</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Opportunités</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Marché en expansion</li>
                  <li>• Digitalisation accélérée</li>
                  <li>• Nouveaux partenariats</li>
                  <li>• Innovation continue</li>
                  <li>• Expansion géographique</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Faiblesses</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Positionnement premium</li>
                  <li>• Courbe d'apprentissage</li>
                  <li>• Dépendance technologique</li>
                  <li>• Concurrence établie</li>
                  <li>• Besoin de validation marché</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Menaces</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Évolution rapide du marché</li>
                  <li>• Nouveaux entrants</li>
                  <li>• Changements réglementaires</li>
                  <li>• Contraintes budgétaires clients</li>
                  <li>• Obsolescence technologique</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Positioning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Positionnement concurrentiel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-center mb-2">Leader technologique</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Innovation IA</span>
                  <span className="font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Facilité d'usage</span>
                  <span className="font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-center mb-2">Avantage concurrentiel</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Précision analytics</span>
                  <span className="font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Support client</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-center mb-2">Position marché</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Part de marché</span>
                  <span className="font-medium">15%</span>
                </div>
                <Progress value={15} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Croissance</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Stratégie de positioning</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-medium">Phase 1: Validation (Mois 1-3)</h5>
                <ul className="text-sm space-y-1">
                  <li>• Démonstrations produit ciblées</li>
                  <li>• Études de cas sectorielles</li>
                  <li>• Proof of concept</li>
                  <li>• Analyse competitive</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium">Phase 2: Déploiement (Mois 4-12)</h5>
                <ul className="text-sm space-y-1">
                  <li>• Pilote avec clients sélectionnés</li>
                  <li>• Formation équipes internes</li>
                  <li>• Optimisation continue</li>
                  <li>• Mesure des résultats</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Cibles et personas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mainProduct?.target_segments?.map((segment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">{segment}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Segment cible principal du produit
                </p>
                <div className="space-y-1 text-xs">
                  <p><span className="font-medium">Besoins:</span> Solutions efficaces</p>
                  <p><span className="font-medium">Bénéfices:</span> ROI mesuré</p>
                  <p><span className="font-medium">Décision:</span> Validation métier</p>
                </div>
              </div>
            )) || (
              <>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Entreprises</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Organisations cherchant l'efficacité
                  </p>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Pain:</span> Processus manuels</p>
                    <p><span className="font-medium">Gain:</span> Automatisation</p>
                    <p><span className="font-medium">Decision:</span> Direction métier</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Équipes techniques</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Développeurs et ingénieurs
                  </p>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Pain:</span> Outils fragmentés</p>
                    <p><span className="font-medium">Gain:</span> Plateforme unifiée</p>
                    <p><span className="font-medium">Decision:</span> Validation technique</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Décideurs</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Management et direction
                  </p>
                  <div className="space-y-1 text-xs">
                    <p><span className="font-medium">Pain:</span> Manque de visibilité</p>
                    <p><span className="font-medium">Gain:</span> Analytics précis</p>
                    <p><span className="font-medium">Decision:</span> Approbation budgétaire</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};