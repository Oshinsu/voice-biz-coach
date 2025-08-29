import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, Activity, TrendingUp, Eye, 
  CheckCircle, Shield, Zap, Target,
  Database, Cpu, Globe, Lock
} from 'lucide-react';
import { Product } from '@/hooks/useScenarios';

interface DataTrackProOverviewProps {
  product: Product;
}

export const DataTrackProOverview: React.FC<DataTrackProOverviewProps> = ({ product }) => {
  // Real DataTrack Pro specifications for ModaStyle
  const getDataTrackSpecs = () => ({
    type: 'Marketing Analytics Platform',
    targetSegment: 'E-commerce Mode & Lifestyle',
    estimatedROI: '220%',
    paybackPeriod: '5,8 mois',
    monthlyValue: '€4,800',
    features: [
      'Attribution multi-touch 360°',
      'Prédiction churn clients premium',
      'Dashboard temps réel conversion',
      'Segmentation comportementale IA',
      'Analytics cross-canal unifié'
    ],
    technicalSpecs: [
      { key: 'Intégrations natives', value: 'Shopify Plus, Facebook Ads, Google Ads, TikTok' },
      { key: 'API & Webhooks', value: 'REST API v2.0, Webhooks temps réel' },
      { key: 'Sécurité', value: 'RGPD, SOC2 Type II, chiffrement AES-256' },
      { key: 'Performance', value: 'SLA 99.9%, latence <200ms, backup 4x/jour' }
    ],
    competitiveAdvantages: [
      'Spécialisé e-commerce mode vs généralistes',
      'Attribution multi-touch vs last-click',
      'IA prédictive native vs modules externes',
      'Support français dédié mode & lifestyle'
    ]
  });

  const specs = getDataTrackSpecs();

  // ROI Breakdown calculation for ModaStyle (réaliste)
  const getRoiBreakdown = () => {
    const monthlyRevenue = 665000; // 8M€ annual / 12
    const currentAttributionLoss = monthlyRevenue * 0.12; // 12% perte attribution (plus réaliste)
    const churnReduction = monthlyRevenue * 0.08; // 8% réduction churn
    const conversionImprovement = monthlyRevenue * 0.05; // 5% amélioration conversion
    
    const monthlyGain = currentAttributionLoss + churnReduction + conversionImprovement;
    const annualGain = monthlyGain * 12;
    const toolCost = 599 * 12; // 7,188€/an
    const roi = ((annualGain - toolCost) / toolCost * 100).toFixed(0);
    
    return {
      monthlyGain: Math.round(monthlyGain),
      annualGain: Math.round(annualGain),
      toolCost,
      roi: `${roi}%`
    };
  };

  const roiData = getRoiBreakdown();

  return (
    <div className="space-y-6">
      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Plateforme</p>
          <p className="text-lg font-bold">{specs.type}</p>
        </div>
        <div className="text-center p-4 bg-secondary/5 rounded-lg">
          <Target className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <p className="text-sm text-muted-foreground">Segment</p>
          <p className="text-lg font-bold">{specs.targetSegment}</p>
        </div>
        <div className="text-center p-4 bg-accent/5 rounded-lg">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
          <p className="text-sm text-muted-foreground">ROI ModaStyle</p>
          <p className="text-lg font-bold">{specs.estimatedROI}</p>
        </div>
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <p className="text-sm text-muted-foreground">Retour investissement</p>
          <p className="text-lg font-bold">{specs.paybackPeriod}</p>
        </div>
      </div>

      {/* ROI Breakdown for ModaStyle */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Projection ROI ModaStyle (8M€ CA annuel)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-green-700">Gains mensuels estimés:</p>
            <ul className="ml-4 space-y-1 text-green-600">
              <li>• Attribution récupérée: +€{Math.round(roiData.monthlyGain * 0.5).toLocaleString()}</li>
              <li>• Réduction churn: +€{Math.round(roiData.monthlyGain * 0.33).toLocaleString()}</li>
              <li>• Conversion optimisée: +€{Math.round(roiData.monthlyGain * 0.17).toLocaleString()}</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-blue-700">Retour sur investissement:</p>
            <ul className="ml-4 space-y-1 text-blue-600">
              <li>• Gain annuel: €{roiData.annualGain.toLocaleString()}</li>
              <li>• Coût outil: €{roiData.toolCost.toLocaleString()}</li>
              <li>• <strong>ROI: {roiData.roi}</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div>
        <h4 className="font-semibold mb-3">DataTrack Pro - Plateforme d'Analytics E-commerce</h4>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* Technical Specs and Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Spécifications techniques
          </h4>
          <div className="space-y-2 text-sm">
            {specs.technicalSpecs.map((spec, index) => (
              <p key={index}>
                <span className="font-medium">{spec.key}:</span> {spec.value}
              </p>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Fonctionnalités spécialisées
          </h4>
          <div className="space-y-2">
            {specs.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing for ModaStyle Context */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="text-center mb-4">
            <h4 className="font-semibold">Starter</h4>
            <p className="text-3xl font-bold mt-2">€199</p>
            <p className="text-sm text-muted-foreground">par mois</p>
          </div>
          <ul className="text-sm space-y-1">
            <li>✓ Analytics de base</li>
            <li>✓ 3 intégrations</li>
            <li>✓ Support email</li>
            <li>✓ Rapports mensuels</li>
          </ul>
        </div>
        
        <div className="p-4 border-2 border-primary rounded-lg relative">
          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2" variant="default">
            Recommandé ModaStyle
          </Badge>
          <div className="text-center mb-4">
            <h4 className="font-semibold">Professional</h4>
            <p className="text-3xl font-bold mt-2">€599</p>
            <p className="text-sm text-muted-foreground">par mois</p>
          </div>
          <ul className="text-sm space-y-1">
            <li>✓ Attribution multi-touch</li>
            <li>✓ Prédiction churn IA</li>
            <li>✓ Intégrations illimitées</li>
            <li>✓ Support prioritaire</li>
            <li>✓ Dashboards temps réel</li>
          </ul>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-center mb-4">
            <h4 className="font-semibold">Enterprise</h4>
            <p className="text-3xl font-bold mt-2">Sur mesure</p>
            <p className="text-sm text-muted-foreground">à partir de €1,200</p>
          </div>
          <ul className="text-sm space-y-1">
            <li>✓ Solution personnalisée</li>
            <li>✓ Onboarding dédié</li>
            <li>✓ SLA garantis 99.9%</li>
            <li>✓ Support 24/7</li>
          </ul>
        </div>
      </div>

      {/* Implementation for ModaStyle */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <Database className="h-4 w-4" />
          Implémentation ModaStyle (Professional)
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• <strong>Setup:</strong> 899€ (implémentation + formation équipe 2 jours)</p>
          <p>• <strong>Timeline:</strong> Shopify Plus connecté en 48h, formation équipe J+7</p>
          <p>• <strong>Migration:</strong> Historique 24 mois importé automatiquement</p>
          <p>• <strong>Support:</strong> Account manager français dédié mode & lifestyle</p>
        </div>
      </div>

      {/* Competitive Advantages vs Northbeam, Triple Whale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Avantages vs concurrence
          </h4>
          <ul className="text-sm text-green-700 space-y-1">
            {specs.competitiveAdvantages.map((advantage, index) => (
              <li key={index}>• {advantage}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Spécificités e-commerce mode
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Métriques mode: LTV, saisonnalité, collections</li>
            <li>• Intégration native influenceurs/UGC</li>
            <li>• Analytics cross-génération (Gen Z, Millenials)</li>
            <li>• Benchmark secteur mode éthique</li>
          </ul>
        </div>
      </div>
    </div>
  );
};