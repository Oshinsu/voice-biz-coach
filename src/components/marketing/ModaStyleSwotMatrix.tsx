import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Target, Shield, Zap } from "lucide-react";

interface ModaStyleSwotMatrixProps {
  title: string;
  variant?: "default" | "competitive";
}

export function ModaStyleSwotMatrix({ title, variant = "default" }: ModaStyleSwotMatrixProps) {
  // SWOT Analysis specifically for DataTrack Pro at ModaStyle
  const modaStyleSwot = {
    strengths: [
      "Spécialisation e-commerce mode éthique vs généralistes",
      "Attribution multi-touch native vs last-click concurrent",
      "Support français dédié lifestyle vs offshore",
      "Setup 48h vs 6 semaines concurrence (Northbeam)",
      "Prix 66% inférieur Northbeam, 50% Triple Whale",
      "Métriques mode natives : LTV, saisonnalité, collections",
      "Cas clients similaires (Grain de Malice, Spartoo)",
      "Compliance RGPD native vs adaptation US tools"
    ],
    weaknesses: [
      "Notoriété limitée vs Google Analytics (gratuit)",
      "R&D IA prédictive en développement vs maturité concurrence",
      "Équipe réduite vs ressources Big Tech (Google, Meta)",
      "Références clients limitées vs base installée GA4",
      "Couverture géographique France vs international",
      "Intégrations API limitées vs écosystème Google",
      "Budget marketing restreint vs mastodontes secteur"
    ],
    opportunities: [
      "Marché e-commerce mode français 15,2Md€ (+12% croissance)",
      "Attribution complexity croissante (iOS 14.5, cookies)",
      "Généralistes (GA4) inadaptés spécificités mode éthique",
      "Social commerce explosion (TikTok Shop, Instagram Shopping)", 
      "IA prédictive demand forte segment mode premium",
      "Réglementation RGPD avantage vs solutions US",
      "ESG analytics trend mode éthique et consciente",
      "Consolidation PME mode → besoin solutions pro"
    ],
    threats: [
      "Google améliore GA4 attribution (Enhanced Conversions)",
      "Northbeam/Triple Whale développent features françaises",
      "Big Tech (Meta, Google) lancent solutions dédiées mode",
      "Récession économique → budgets marketing réduits",
      "Nouvelles startups IA bien financées (Series A/B)",
      "Agences internalisent développement analytics",
      "Plateformes e-commerce (Shopify) développent analytics native",
      "Réglementation données plus stricte → compliance costs"
    ]
  };

  const getImpactColor = (type: string, index: number) => {
    // Alternate colors for visual distinction
    const colors = {
      strengths: index % 2 === 0 ? "bg-green-100" : "bg-green-50",
      weaknesses: index % 2 === 0 ? "bg-red-100" : "bg-red-50", 
      opportunities: index % 2 === 0 ? "bg-blue-100" : "bg-blue-50",
      threats: index % 2 === 0 ? "bg-orange-100" : "bg-orange-50"
    };
    return colors[type as keyof typeof colors] || "bg-gray-50";
  };

  const getStrengthLevel = (strength: string) => {
    if (strength.includes("66% inférieur") || strength.includes("48h vs 6 semaines")) return "Critique";
    if (strength.includes("Attribution multi-touch") || strength.includes("Spécialisation")) return "Majeur";
    return "Important";
  };

  const getThreatLevel = (threat: string) => {
    if (threat.includes("Google améliore") || threat.includes("Big Tech")) return "Élevé";
    if (threat.includes("Northbeam") || threat.includes("startups IA")) return "Moyen-Élevé";
    return "Moyen";
  };

  const getThreatLevelColor = (level: string) => {
    switch(level) {
      case "Élevé": return "text-red-700 bg-red-100";
      case "Moyen-Élevé": return "text-orange-700 bg-orange-100";
      case "Moyen": return "text-yellow-700 bg-yellow-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">Analyse SWOT DataTrack Pro pour le cas ModaStyle</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TrendingUp className="h-5 w-5" />
              Forces (Strengths)
              <Badge variant="outline" className="text-green-700">
                {modaStyleSwot.strengths.length} éléments
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {modaStyleSwot.strengths.map((strength, index) => (
              <div key={index} className={`p-2 rounded-lg ${getImpactColor('strengths', index)}`}>
                <div className="flex items-start gap-2">
                  <Badge className={`text-xs ${
                    getStrengthLevel(strength) === 'Critique' ? 'bg-green-600 text-white' :
                    getStrengthLevel(strength) === 'Majeur' ? 'bg-green-500 text-white' : 
                    'bg-green-400 text-white'
                  }`}>
                    {getStrengthLevel(strength)}
                  </Badge>
                  <span className="text-sm flex-1">{strength}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <TrendingDown className="h-5 w-5" />
              Faiblesses (Weaknesses)
              <Badge variant="outline" className="text-red-700">
                {modaStyleSwot.weaknesses.length} éléments
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {modaStyleSwot.weaknesses.map((weakness, index) => (
              <div key={index} className={`p-2 rounded-lg text-sm ${getImpactColor('weaknesses', index)}`}>
                • {weakness}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Target className="h-5 w-5" />
              Opportunités (Opportunities)
              <Badge variant="outline" className="text-blue-700">
                {modaStyleSwot.opportunities.length} éléments
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {modaStyleSwot.opportunities.map((opportunity, index) => (
              <div key={index} className={`p-2 rounded-lg text-sm ${getImpactColor('opportunities', index)}`}>
                • {opportunity}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Threats */}
        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Menaces (Threats)
              <Badge variant="outline" className="text-orange-700">
                {modaStyleSwot.threats.length} éléments
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {modaStyleSwot.threats.map((threat, index) => (
              <div key={index} className={`p-2 rounded-lg ${getImpactColor('threats', index)}`}>
                <div className="flex items-start gap-2">
                  <Badge className={`text-xs ${getThreatLevelColor(getThreatLevel(threat))}`}>
                    {getThreatLevel(threat)}
                  </Badge>
                  <span className="text-sm flex-1">{threat}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Strategic Synthesis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Synthèse stratégique ModaStyle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Recommandations immédiates
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Exploiter différenciation prix/rapidité setup</li>
                <li>• Capitaliser sur spécialisation mode éthique</li>
                <li>• Développer références clients françaises</li>
                <li>• Accelerer R&D IA prédictive</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Opportunités prioritaires</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Marché mode français 15,2Md€ en croissance</li>
                <li>• Attribution complexity post-iOS 14.5</li>
                <li>• Social commerce (TikTok Shop, Instagram)</li>
                <li>• ESG analytics mode éthique</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Risques à mitiger</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Google améliore GA4 (Enhanced Conversions)</li>
                <li>• Surveillance concurrence US (Northbeam/Triple Whale)</li>
                <li>• Accélération innovation IA</li>
                <li>• Protection différenciation française</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Verdict stratégique pour ModaStyle</h4>
            <p className="text-sm text-gray-700">
              <strong>Window d'opportunité forte</strong> - DataTrack Pro bien positionné avec 
              différenciation claire (spécialisation mode + prix + setup). Moment optimal pour 
              ModaStyle de switcher avant que concurrence rattrape retard sur marché français.
              ROI 312% justifie premium vs gratuit GA4.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}