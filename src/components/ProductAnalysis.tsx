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
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="text-2xl font-bold">VNS 3.0</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
              <p className="text-2xl font-bold">50,000+</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm text-muted-foreground">Institutions</p>
              <p className="text-2xl font-bold">150+</p>
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
              <h4 className="font-semibold mb-3">Technologies core</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">IA Conversationnelle:</span> GPT-4 + modèles propriétaires</p>
                <p><span className="font-medium">Reconnaissance vocale:</span> Whisper API + Azure Speech</p>
                <p><span className="font-medium">Analytics:</span> Machine Learning avancé</p>
                <p><span className="font-medium">Cloud:</span> AWS + Microsoft Azure</p>
                <p><span className="font-medium">Sécurité:</span> SOC 2 Type II, RGPD compliant</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Fonctionnalités clés</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Simulations de négociation réalistes</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Feedback instantané et détaillé</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Analytics de performance avancés</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Intégration LMS (Moodle, Canvas, etc.)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Dashboard professeur complet</p>
                </div>
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
                <h4 className="font-semibold">Campus Starter</h4>
                <p className="text-3xl font-bold mt-2">150€</p>
                <p className="text-sm text-muted-foreground">par étudiant/an</p>
              </div>
              <ul className="text-sm space-y-1">
                <li>✓ 10 scénarios standard</li>
                <li>✓ Analytics de base</li>
                <li>✓ Support email</li>
                <li>✓ Formation initiale</li>
              </ul>
            </div>
            
            <div className="p-4 border-2 border-primary rounded-lg relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
                Recommandé
              </Badge>
              <div className="text-center mb-4">
                <h4 className="font-semibold">Campus Professional</h4>
                <p className="text-3xl font-bold mt-2">250€</p>
                <p className="text-sm text-muted-foreground">par étudiant/an</p>
              </div>
              <ul className="text-sm space-y-1">
                <li>✓ 25 scénarios + sur-mesure</li>
                <li>✓ Analytics avancés</li>
                <li>✓ Support prioritaire</li>
                <li>✓ Formation complète</li>
                <li>✓ Intégration LMS</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="text-center mb-4">
                <h4 className="font-semibold">Campus Enterprise</h4>
                <p className="text-3xl font-bold mt-2">400€</p>
                <p className="text-sm text-muted-foreground">par étudiant/an</p>
              </div>
              <ul className="text-sm space-y-1">
                <li>✓ Scénarios illimités</li>
                <li>✓ IA personnalisée</li>
                <li>✓ Account manager dédié</li>
                <li>✓ API complète</li>
                <li>✓ Onboarding premium</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Offre spéciale ESCAP</h4>
            <p className="text-sm text-blue-700">
              Pilote gratuit 6 mois pour un département (50 étudiants max) + 
              réduction de 30% la première année si adoption complète.
            </p>
          </div>
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
                  <li>• Technologie IA de pointe</li>
                  <li>• Interface intuitive</li>
                  <li>• Feedbacks en temps réel</li>
                  <li>• ROI mesurable</li>
                  <li>• Support client excellent</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Opportunités</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Marché éducatif en croissance</li>
                  <li>• Demande digitalisation forte</li>
                  <li>• Partenariats institutionnels</li>
                  <li>• Expansion internationale</li>
                  <li>• Nouvelles verticales (corporate)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Faiblesses</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Prix premium</li>
                  <li>• Courbe d'apprentissage</li>
                  <li>• Dépendance technologique</li>
                  <li>• Personnalisation limitée</li>
                  <li>• Startup récente</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Menaces</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Concurrence GAFAM</li>
                  <li>• Solutions open source</li>
                  <li>• Restrictions budget éducation</li>
                  <li>• Évolution rapide IA</li>
                  <li>• Réglementation données</li>
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
            <h4 className="font-semibold mb-3">Mini plan marketing pour ESCAP</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-medium">Phase 1: Sensibilisation (Mois 1-2)</h5>
                <ul className="text-sm space-y-1">
                  <li>• Webinar exclusif pour ESCAP</li>
                  <li>• Démonstration live avec scénarios commerce</li>
                  <li>• Étude de cas HEC/ESSEC</li>
                  <li>• Analyse ROI personnalisée</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium">Phase 2: Pilote (Mois 3-8)</h5>
                <ul className="text-sm space-y-1">
                  <li>• Pilote gratuit département vente</li>
                  <li>• Formation professeurs dédiée</li>
                  <li>• Support technique premium</li>
                  <li>• Mesure impact pédagogique</li>
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
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Directeurs pédagogiques</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Responsables innovation et modernisation
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-medium">Pain:</span> Méthodes obsolètes</p>
                <p><span className="font-medium">Gain:</span> Innovation reconnue</p>
                <p><span className="font-medium">Decision:</span> Budgets moins de 300k€</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Professeurs commerce</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Enseignants négociation et vente
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-medium">Pain:</span> Étudiants désengagés</p>
                <p><span className="font-medium">Gain:</span> Cours interactifs</p>
                <p><span className="font-medium">Decision:</span> Influence forte</p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">DSI/Directions tech</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Responsables infrastructure digitale
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-medium">Pain:</span> Intégrations complexes</p>
                <p><span className="font-medium">Gain:</span> Solution clé en main</p>
                <p><span className="font-medium">Decision:</span> Validation technique</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};