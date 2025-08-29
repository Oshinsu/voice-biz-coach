import React from 'react';
import { Package, TrendingUp, Clock, Star, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Product } from '@/hooks/useScenarios';

interface GenericProductOverviewProps {
  product: Product;
  scenarioId: string;
}

export const GenericProductOverview: React.FC<GenericProductOverviewProps> = ({ 
  product, 
  scenarioId 
}) => {
  // Derive product type based on scenario context
  const getProductType = () => {
    switch (scenarioId) {
      case 'fintech-startup':
        return 'Solution IA Credit Scoring';
      case 'digital-agency':
        return 'Plateforme Gestion Agence';
      case 'kpi-performance':
        return 'Analytics E-commerce';
      case 'retail-personalization':
        return 'Moteur Personnalisation';
      case 'cybersecurity-consulting':
        return 'Solution Cybersécurité';
      case 'saas-hr-tool':
        return 'Plateforme RH SaaS';
      case 'manufacturing-iot':
        return 'IoT Industriel';
      case 'industrial-marketplace':
        return 'Marketplace B2B';
      case 'byss-vns-school':
        return 'Plateforme Éducative';
      case 'website-sales':
        return 'CMS E-commerce';
      default:
        return 'Solution Technologique';
    }
  };

  // Derive target segment based on scenario and product data
  const getTargetSegment = () => {
    switch (scenarioId) {
      case 'fintech-startup':
        return 'Fintech PME';
      case 'digital-agency':
        return 'Agences Digitales';
      case 'kpi-performance':
        return 'E-commerce Mode';
      case 'retail-personalization':
        return 'Retail & E-commerce';
      case 'cybersecurity-consulting':
        return 'Entreprises 100-500M€';
      case 'saas-hr-tool':
        return 'PME 50-500 employés';
      case 'manufacturing-iot':
        return 'Industrie 4.0';
      case 'industrial-marketplace':
        return 'Industries B2B';
      case 'byss-vns-school':
        return 'Institutions Éducatives';
      case 'website-sales':
        return 'PME Commerce';
      default:
        return 'Entreprises B2B';
    }
  };

  // Calculate estimated ROI from product.roi or derive from scenario
  const getEstimatedROI = () => {
    if (product.roi) {
      // Extract number from ROI string
      const roiMatch = product.roi.match(/(\d+)%/);
      if (roiMatch) return parseInt(roiMatch[1]);
    }
    
    // Default ROI estimates by scenario type
    switch (scenarioId) {
      case 'fintech-startup':
        return 180; // High ROI for risk reduction
      case 'digital-agency':
        return 120; // Productivity gains
      case 'kpi-performance':
        return 312; // Attribution optimization
      case 'retail-personalization':
        return 250; // Personalization impact
      case 'cybersecurity-consulting':
        return 420; // Security ROI
      default:
        return 150;
    }
  };

  // Get key features from product data
  const getKeyFeatures = () => {
    return product.keyFeatures?.slice(0, 4) || [
      'Intelligence artificielle avancée',
      'Intégration native existant',
      'Interface intuitive française',
      'Support expert dédié'
    ];
  };

  // Get technical specifications based on scenario type
  const getTechnicalSpecs = () => {
    switch (scenarioId) {
      case 'fintech-startup':
        return [
          { label: 'Conformité', value: 'Banque de France, ACPR' },
          { label: 'Précision IA', value: '94% vs 87% traditionnel' },
          { label: 'Vitesse analyse', value: '30min vs 4h manuel' },
          { label: 'Dataset', value: '100M+ dossiers européens' }
        ];
      case 'digital-agency':
        return [
          { label: 'Utilisateurs', value: 'Jusqu\'à 15 utilisateurs' },
          { label: 'Intégrations', value: 'Slack, Google, Stripe' },
          { label: 'Templates', value: '50+ templates agence' },
          { label: 'Mobile', value: 'iOS/Android natif' }
        ];
      case 'kpi-performance':
        return [
          { label: 'Attribution', value: 'Multi-touch avancée' },
          { label: 'Connecteurs', value: 'Google, Meta, TikTok' },
          { label: 'Prédiction', value: '89% précision churn' },
          { label: 'Setup', value: '24h vs 2-6 semaines' }
        ];
      default:
        return [
          { label: 'Technologie', value: 'Cloud-native SaaS' },
          { label: 'Sécurité', value: 'SOC 2 Type II' },
          { label: 'API', value: 'REST + GraphQL' },
          { label: 'Conformité', value: 'RGPD compliant' }
        ];
    }
  };

  // Get competitive advantages from product data or defaults
  const getCompetitiveAdvantages = () => {
    return product.competitiveAdvantages?.slice(0, 4) || [
      'Spécialisation marché français',
      'Support client expert local',
      'Prix transparent sans surprise',
      'Implémentation rapide'
    ];
  };

  const productType = getProductType();
  const targetSegment = getTargetSegment();
  const estimatedROI = getEstimatedROI();
  const keyFeatures = getKeyFeatures();
  const technicalSpecs = getTechnicalSpecs();
  const competitiveAdvantages = getCompetitiveAdvantages();

  return (
    <div className="space-y-6">
      {/* Product Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-xs text-muted-foreground">{productType}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Segment</p>
                <p className="text-xs text-muted-foreground">{targetSegment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">ROI Estimé</p>
                <p className="text-xs text-muted-foreground">{estimatedROI}% première année</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Déploiement</p>
                <p className="text-xs text-muted-foreground">{product.implementationTime || '1-4 semaines'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {product.name}
          </CardTitle>
          <CardDescription>
            {product.description}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Spécifications Techniques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{spec.label}</span>
                <Badge variant="outline">{spec.value}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Fonctionnalités Clés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      <Card>
        <CardHeader>
          <CardTitle>Tarification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-primary">Starter</h4>
              <p className="text-2xl font-bold">{product.pricing?.starter}</p>
              <p className="text-sm text-muted-foreground mt-2">Idéal pour débuter</p>
            </div>
            <div className="p-4 border-2 border-primary rounded-lg">
              <h4 className="font-semibold text-primary">Professional</h4>
              <p className="text-2xl font-bold">{product.pricing?.professional}</p>
              <p className="text-sm text-muted-foreground mt-2">Recommandé</p>
              <Badge className="mt-2">Plus populaire</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-primary">Enterprise</h4>
              <p className="text-2xl font-bold">{product.pricing?.enterprise}</p>
              <p className="text-sm text-muted-foreground mt-2">Fonctionnalités complètes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Processus d'Implémentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold">Configuration Initiale</h4>
                <p className="text-sm text-muted-foreground">Setup et intégrations techniques</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold">Formation Équipe</h4>
                <p className="text-sm text-muted-foreground">Accompagnement et montée en compétences</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold">Go-Live</h4>
                <p className="text-sm text-muted-foreground">Déploiement et suivi performance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Avantages Concurrentiels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitiveAdvantages.map((advantage, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <Star className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{advantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};