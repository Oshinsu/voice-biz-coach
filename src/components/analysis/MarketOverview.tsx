import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, TrendingUp, Building, Users, 
  ArrowUp, ArrowDown, CheckCircle, AlertTriangle 
} from 'lucide-react';

interface MarketData {
  marketSize?: string;
  growth?: string;
  institutions?: string;
  users?: string;
  sector: string;
}

interface MarketOverviewProps {
  marketData: MarketData;
  competitive?: boolean;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ 
  marketData, 
  competitive = false 
}) => {
  // Generate sector-specific market data
  const getSectorData = (sector: string) => {
    const sectorMappings: Record<string, any> = {
      'Enseignement Supérieur': {
        size: '€32Md',
        growth: '8.5%',
        institutions: '280+',
        users: '380K',
        segments: [
          { name: 'EdTech IA', value: 35 },
          { name: 'Simulations', value: 25 },
          { name: 'LMS & Plateformes', value: 22 },
          { name: 'Analytics Learning', value: 18 }
        ],
        trends: [
          { trend: 'IA pédagogique +145%', up: true },
          { trend: 'Simulations immersives +85%', up: true },
          { trend: 'Soft skills focus +70%', up: true },
          { trend: 'Méthodes traditionnelles -35%', up: false }
        ]
      },
      'Cybersécurité': {
        size: '€45Md',
        growth: '12.8%',
        institutions: '15,000+',
        users: '5.2M',
        segments: [
          { name: 'Protection réseau', value: 30 },
          { name: 'Sécurité cloud', value: 28 },
          { name: 'Formation sécurité', value: 25 },
          { name: 'Audit & conformité', value: 17 }
        ],
        trends: [
          { trend: 'Zero Trust +150%', up: true },
          { trend: 'Sécurité cloud +110%', up: true },
          { trend: 'Formation cyber +85%', up: true },
          { trend: 'Solutions on-premise -35%', up: false }
        ]
      },
      'Fintech': {
        size: '€89Md',
        growth: '15.2%',
        institutions: '8,500+',
        users: '12M',
        segments: [
          { name: 'Paiements', value: 32 },
          { name: 'Néobanques', value: 28 },
          { name: 'Investissement', value: 22 },
          { name: 'Assurance', value: 18 }
        ],
        trends: [
          { trend: 'BNPL +200%', up: true },
          { trend: 'Crypto services +130%', up: true },
          { trend: 'Open banking +95%', up: true },
          { trend: 'Banques traditionnelles -25%', up: false }
        ]
      }
    };

    // Find matching sector or use default
    const matchedSector = Object.keys(sectorMappings).find(key => 
      sector.toLowerCase().includes(key.toLowerCase())
    );
    
    return sectorMappings[matchedSector || 'Enseignement Supérieur'];
  };

  const sectorData = getSectorData(marketData.sector);

  return (
    <div className="space-y-6">
      {/* Market Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Marché {marketData.sector}</p>
          <p className="text-2xl font-bold">{marketData.marketSize || sectorData.size}</p>
        </div>
        <div className="text-center p-4 bg-secondary/5 rounded-lg">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <p className="text-sm text-muted-foreground">Croissance annuelle</p>
          <p className="text-2xl font-bold">{marketData.growth || sectorData.growth}</p>
        </div>
        <div className="text-center p-4 bg-accent/5 rounded-lg">
          <Building className="h-8 w-8 mx-auto mb-2 text-accent" />
          <p className="text-sm text-muted-foreground">Entreprises France</p>
          <p className="text-2xl font-bold">{marketData.institutions || sectorData.institutions}</p>
        </div>
        <div className="text-center p-4 bg-muted/5 rounded-lg">
          <Users className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Utilisateurs</p>
          <p className="text-2xl font-bold">{marketData.users || sectorData.users}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Segments */}
        <div>
          <h4 className="font-semibold mb-3">Segments de marché {marketData.sector}</h4>
          <div className="space-y-3">
            {sectorData.segments.map((segment: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{segment.name}</span>
                  <span className="font-medium">{segment.value}%</span>
                </div>
                <Progress value={segment.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div>
          <h4 className="font-semibold mb-3">Tendances clés 2024-2026</h4>
          <div className="space-y-2">
            {sectorData.trends.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                {item.up ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">{item.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};