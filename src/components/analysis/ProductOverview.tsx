import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, Zap, Users, Award, CheckCircle, 
  DollarSign, Target 
} from 'lucide-react';
import { Product } from '@/hooks/useScenarios';

interface ProductOverviewProps {
  product: Product;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({ product }) => {
  // Generate product type and segment based on product name/description
  const getProductType = () => {
    const name = product.name.toLowerCase();
    if (name.includes('analytics') || name.includes('data')) return 'Analytics';
    if (name.includes('security') || name.includes('cyber')) return 'Security';
    if (name.includes('fintech') || name.includes('payment')) return 'Fintech';
    if (name.includes('platform') || name.includes('saas')) return 'SaaS';
    return 'Platform';
  };

  const getTargetSegment = () => {
    return product.target_segments?.[0] || 'Enterprise';
  };

  const getEstimatedROI = () => {
    // Generate ROI based on product pricing
    const professional = product.pricing?.professional;
    if (professional) {
      const price = parseInt(professional.replace(/[^0-9]/g, ''));
      if (price > 500) return '400%';
      if (price > 200) return '350%';
      return '300%';
    }
    return '350%';
  };

  const getKeyFeatures = () => {
    return product.key_features || [
      'Interface utilisateur intuitive',
      'Analytics avancés', 
      'Support multi-plateforme',
      'Intégrations natives',
      'Sécurité renforcée'
    ];
  };

  const getTechnicalSpecs = () => {
    if (product.technical_specs && typeof product.technical_specs === 'object') {
      return Object.entries(product.technical_specs).map(([key, value]) => ({
        key,
        value: String(value)
      }));
    }

    return [
      { key: 'Architecture', value: 'Cloud-native, microservices' },
      { key: 'Sécurité', value: 'SSL/TLS, authentification multi-facteurs' },
      { key: 'Intégrations', value: 'API REST, webhooks' },
      { key: 'Conformité', value: 'RGPD, SOC 2' }
    ];
  };

  const getCompetitiveAdvantages = () => {
    return product.competitive_advantages || [
      'Interface utilisateur intuitive',
      'Technologie robuste',
      'Support client réactif',
      'Évolutivité du produit'
    ];
  };

  return (
    <div className="space-y-6">
      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="text-2xl font-bold">{getProductType()}</p>
        </div>
        <div className="text-center p-4 bg-secondary/5 rounded-lg">
          <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <p className="text-sm text-muted-foreground">Segment cible</p>
          <p className="text-2xl font-bold">{getTargetSegment()}</p>
        </div>
        <div className="text-center p-4 bg-accent/5 rounded-lg">
          <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
          <p className="text-sm text-muted-foreground">ROI estimé</p>
          <p className="text-2xl font-bold">{getEstimatedROI()}</p>
        </div>
      </div>

      {/* Product Description */}
      <div>
        <h4 className="font-semibold mb-3">Description du produit</h4>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* Technical Specs and Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Spécifications techniques</h4>
          <div className="space-y-2 text-sm">
            {getTechnicalSpecs().map((spec, index) => (
              <p key={index}>
                <span className="font-medium">{spec.key}:</span> {spec.value}
              </p>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Fonctionnalités clés</h4>
          <div className="space-y-2">
            {getKeyFeatures().map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      {product.pricing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-center mb-4">
              <h4 className="font-semibold">Starter</h4>
              <p className="text-3xl font-bold mt-2">{product.pricing.starter}</p>
              <p className="text-sm text-muted-foreground">par mois</p>
            </div>
            <ul className="text-sm space-y-1">
              <li>✓ Fonctionnalités de base</li>
              <li>✓ Support email</li>
              <li>✓ Documentation complète</li>
            </ul>
          </div>
          
          <div className="p-4 border-2 border-primary rounded-lg relative">
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
              Recommandé
            </Badge>
            <div className="text-center mb-4">
              <h4 className="font-semibold">Professional</h4>
              <p className="text-3xl font-bold mt-2">{product.pricing.professional}</p>
              <p className="text-sm text-muted-foreground">par mois</p>
            </div>
            <ul className="text-sm space-y-1">
              <li>✓ Toutes les fonctionnalités</li>
              <li>✓ Analytics avancés</li>
              <li>✓ Support prioritaire</li>
              <li>✓ API complète</li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="text-center mb-4">
              <h4 className="font-semibold">Enterprise</h4>
              <p className="text-3xl font-bold mt-2">{product.pricing.enterprise}</p>
              <p className="text-sm text-muted-foreground">contact</p>
            </div>
            <ul className="text-sm space-y-1">
              <li>✓ Solution personnalisée</li>
              <li>✓ Account manager dédié</li>
              <li>✓ SLA garantis</li>
              <li>✓ Support 24/7</li>
            </ul>
          </div>
        </div>
      )}

      {/* Implementation Time */}
      {product.implementation_time && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Mise en œuvre</h4>
          <p className="text-sm text-blue-700">
            Temps d'implémentation estimé : {product.implementation_time}
          </p>
        </div>
      )}

      {/* Competitive Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Forces du produit</h4>
          <ul className="text-sm text-green-700 space-y-1">
            {getCompetitiveAdvantages().map((advantage, index) => (
              <li key={index}>• {advantage}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Opportunités</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Marché en expansion</li>
            <li>• Digitalisation accélérée</li>
            <li>• Nouveaux partenariats</li>
            <li>• Innovation continue</li>
          </ul>
        </div>
      </div>
    </div>
  );
};