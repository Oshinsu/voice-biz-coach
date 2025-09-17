import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, Zap, Award, Target, CheckCircle 
} from 'lucide-react';

interface CompetitiveData {
  sector: string;
  directCompetitors?: string[];
  indirectCompetitors?: string[];
  advantages?: string[];
}

interface CompetitiveLandscapeProps {
  competitiveData: CompetitiveData;
}

export const CompetitiveLandscape: React.FC<CompetitiveLandscapeProps> = ({ 
  competitiveData 
}) => {
  // Generate sector-specific competitive data
  const getSectorCompetitors = (sector: string) => {
    const sectorMappings: Record<string, any> = {
      'E-commerce': {
        direct: [
          { name: 'Shopify Analytics', description: 'Leader marché, fonctions basiques', market: '35%' },
          { name: 'Adobe Analytics', description: 'Suite complète, complexe', market: '28%' }
        ],
        indirect: [
          { name: 'Google Analytics', description: 'Gratuit, limité e-commerce' },
          { name: 'Solutions maison', description: 'Tableaux de bord custom' },
          { name: 'Outils BI', description: 'Power BI, Tableau' }
        ],
        advantages: [
          'Spécialisation e-commerce',
          'Interface intuitive',
          'Analytics temps réel',
          'Intégrations natives',
          'Support personnalisé',
          'ROI mesurable'
        ],
        gaps: [
          'Solutions généralistes inadaptées',
          'Complexité technique élevée',
          'Support standardisé limité',
          'Coûts cachés récurrents',
          'Pas d\'adaptation e-commerce'
        ]
      },
      'Cybersécurité': {
        direct: [
          { name: 'CyberArk', description: 'Leader PAM, coûteux', market: '42%' },
          { name: 'Okta', description: 'Identité cloud, limité PAM', market: '31%' }
        ],
        indirect: [
          { name: 'Microsoft AD', description: 'Intégré, sécurité basique' },
          { name: 'Solutions SIEM', description: 'Splunk, QRadar' },
          { name: 'Audit manuel', description: 'Processus traditionnels' }
        ],
        advantages: [
          'Technologie de pointe',
          'Facilité déploiement',
          'Analytics avancés',
          'Conformité réglementaire',
          'Support expert',
          'ROI démontré'
        ],
        gaps: [
          'Solutions legacy complexes',
          'Déploiements longs (6+ mois)',
          'Interface utilisateur datée',
          'Coûts licences élevés',
          'Formation technique requise'
        ]
      },
      'Fintech': {
        direct: [
          { name: 'Stripe', description: 'Leader paiements, API-first', market: '38%' },
          { name: 'Adyen', description: 'Enterprise, complexe', market: '29%' }
        ],
        indirect: [
          { name: 'Banques traditionnelles', description: 'Services bancaires classiques' },
          { name: 'PayPal', description: 'B2C, limité B2B' },
          { name: 'Solutions bancaires', description: 'Core banking systems' }
        ],
        advantages: [
          'Innovation technologique',
          'API moderne',
          'Onboarding rapide',
          'Conformité PCI',
          'Analytics temps réel',
          'Support développeur'
        ],
        gaps: [
          'APIs legacy incompatibles',
          'Processus d\'intégration lents',
          'Documentation technique limitée',
          'Support généraliste',
          'Frais cachés complexes'
        ]
      }
    };

    const matchedSector = Object.keys(sectorMappings).find(key => 
      sector.toLowerCase().includes(key.toLowerCase())
    );
    
    return sectorMappings[matchedSector || 'E-commerce'];
  };

  const sectorData = getSectorCompetitors(competitiveData.sector);

  return (
    <div className="space-y-6">
      {/* Competitive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Direct Competitors */}
        <div className="p-4 border-2 border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Concurrents directs
          </h4>
          <div className="space-y-3">
            {sectorData.direct.map((competitor: any, index: number) => (
              <div key={index} className="p-2 bg-red-50 rounded">
                <p className="font-medium text-sm">{competitor.name}</p>
                <p className="text-xs text-red-700">{competitor.description}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span>Part marché:</span>
                  <span className="font-medium">{competitor.market}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indirect Competitors */}
        <div className="p-4 border-2 border-orange-200 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Concurrents indirects
          </h4>
          <div className="space-y-3">
            {sectorData.indirect.map((competitor: any, index: number) => (
              <div key={index} className="p-2 bg-orange-50 rounded">
                <p className="font-medium text-sm">{competitor.name}</p>
                <p className="text-xs text-orange-700">{competitor.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Position */}
        <div className="p-4 border-2 border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Notre position
          </h4>
          <div className="space-y-3">
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium text-sm">Innovation produit</p>
              <div className="flex justify-between text-xs mt-1">
                <span>Score:</span>
                <span className="font-medium">8.5/10</span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded">
              <p className="font-medium text-sm">Part de marché</p>
              <div className="flex justify-between text-xs mt-1">
                <span>Actuelle:</span>
                <span className="font-medium">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Competitive Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Nos avantages compétitifs</h4>
          <div className="space-y-2">
            {(competitiveData.advantages || sectorData.advantages).map((advantage: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{advantage}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Gaps concurrentiels à exploiter</h4>
          <div className="space-y-2">
            {sectorData.gaps.map((gap: string, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{gap}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};