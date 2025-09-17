/**
 * SYSTÈME DISCOVERY CONTEXTUEL - PHASE 3 DU PLAN
 * Fonctions discovery adaptées aux secteurs et révélation progressive
 */

import { consolidatedScenarios } from '@/data/scenarios';

export interface DiscoveryLayer {
  id: string;
  level: number; // 1-5, 1 = surface, 5 = confidentiel
  category: 'business' | 'technical' | 'financial' | 'strategic';
  information: Record<string, any>;
  trustRequired: number; // Niveau de confiance requis pour révéler
  triggerConditions: string[];
}

export interface SectoralDiscoveryConfig {
  sectorId: string;
  sectorName: string;
  discoveryLayers: DiscoveryLayer[];
  specificFunctions: DiscoveryFunction[];
  budgetRanges: string[];
  decisionTimelines: string[];
  stakeholderHierarchy: string[];
}

export interface DiscoveryFunction {
  name: string;
  description: string;
  sectorSpecific: boolean;
  responseTemplates: Record<string, string>;
  delayRange: [number, number]; // en secondes
  trustImpact: number; // +/- impact sur la confiance
}

/**
 * GESTIONNAIRE DISCOVERY CONTEXTUEL
 */
export class ContextualDiscoveryManager {
  private scenario: any;
  private scenarioData: any;
  private revealedLayers: DiscoveryLayer[] = [];
  private currentTrustLevel: number = 0;
  private discoveryHistory: Array<{functionName: string, timestamp: Date, response: string}> = [];

  constructor(scenario: any, initialTrustLevel: number = 0) {
    this.scenario = scenario;
    this.scenarioData = consolidatedScenarios.find(s => s.id === scenario.id);
    this.currentTrustLevel = initialTrustLevel;
  }

  /**
   * CONFIGURATION DISCOVERY PAR SECTEUR
   */
  getSectoralDiscoveryConfig(): SectoralDiscoveryConfig {
    const sector = this.scenario.company.sector;
    
    const scenarioId = this.scenario.id?.toLowerCase() || '';
    
    if (scenarioId.includes('byss') || scenarioId.includes('school')) {
      return this.getEducationDiscoveryConfig();
    }
    
    switch (sector) {
      case 'Finance':
      case 'Fintech':
        return this.getFintechDiscoveryConfig();
      
      case 'Enseignement Supérieur':
      case 'EdTech':
        return this.getEdTechDiscoveryConfig();
      
      default:
        return this.getGenericDiscoveryConfig();
    }
  }

  /**
   * DISCOVERY EDTECH SPÉCIALISÉ - BYSS VNS
   */
  private getEducationDiscoveryConfig(): SectoralDiscoveryConfig {
    return {
      sectorId: 'education',
      sectorName: 'EdTech & Business Schools',
      discoveryLayers: [
        {
          id: 'surface_education',
          level: 1,
          category: 'business',
          information: {
            currentSetup: "3 simulateurs déployés (finance, stratégie, négociation)",
            studentVolume: "9000 étudiants, programme Grande École",
            mainChallenges: ["Engagement étudiant", "Différenciation vs HEC/ESSEC", "ROI pédagogique"],
            basicInterest: "Recherche solution soft skills communication/vente"
          },
          trustRequired: 5,
          triggerConditions: ['pedagogical_questions', 'student_engagement_discussion']
        },
        {
          id: 'operational_education',
          level: 2,
          category: 'technical',
          information: {
            currentBudget: "800K€ alloués innovation pédagogique 2024",
            techEcosystem: "LMS Canvas, simulateurs existants, plateforme vidéo",
            facultyAdoption: "Resistance au changement, besoin formation",
            metrics: "Satisfaction étudiants 82%, adoption tech 65%"
          },
          trustRequired: 20,
          triggerConditions: ['budget_context', 'implementation_questions']
        },
        {
          id: 'strategic_education',
          level: 3,
          category: 'strategic',
          information: {
            competitivePressure: "HEC lance simulateur IA Q2 2025, ESSEC investit 2M€",
            strategicGoals: "+25% engagement étudiant, -30% heures coaching",
            accreditation: "Critères EQUIS/AACSB innovation pédagogique",
            timeline: "Déploiement souhaité septembre 2025"
          },
          trustRequired: 40,
          triggerConditions: ['competitive_analysis', 'strategic_discussion']
        },
        {
          id: 'decision_education',
          level: 4,
          category: 'financial',
          information: {
            detailedBudget: "300K€ disponibles immédiatement, 500K€ validation Dean",
            decisionMakers: "Emmanuel Métais (Dean), Frédéric Fréry (DG Académique)",
            timeline: "Décision janvier, déploiement septembre 2025",
            alternatives: "Évaluation Capsim, Marketplace Simulations depuis octobre"
          },
          trustRequired: 60,
          triggerConditions: ['budget_approval', 'vendor_comparison']
        },
        {
          id: 'confidential_education',
          level: 5,
          category: 'strategic',
          information: {
            internalProject: "Projet IA générative pour personnalisation pédagogique",
            boardPressure: "Objectif top 5 européen d'ici 2027",
            partnerships: "Discussions partenariat tech avec Microsoft/Google",
            concerns: "Résistance faculté seniors, budget serré post-COVID"
          },
          trustRequired: 80,
          triggerConditions: ['deep_trust', 'strategic_alignment']
        }
      ],
      specificFunctions: [
        {
          name: "getCurrentSimulators",
          description: "Consulter l'utilisation des simulateurs actuels",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "Nous avons quelques outils en place...",
            medium_trust: "Nos simulateurs finance et stratégie sont bien adoptés, mais manquent soft skills...",
            high_trust: "Voici les métriques détaillées d'usage: Finance sim 85% adoption, Stratégie 78%, mais zéro sur communication..."
          },
          delayRange: [1, 3],
          trustImpact: 8
        },
        {
          name: "getStudentFeedback",
          description: "Accéder aux retours étudiants sur innovation pédagogique",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "Les étudiants sont demandeurs d'innovation...",
            medium_trust: "82% satisfaction globale, mais ils réclament plus d'interactivité...",
            high_trust: "Feedback détaillé: 'Plus de pratique conversationnelle' revient dans 67% des évaluations..."
          },
          delayRange: [2, 4],
          trustImpact: 6
        },
        {
          name: "checkBudgetEducation",
          description: "Vérifier la disponibilité budgétaire pour innovation",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "Le budget innovation existe, mais je dois vérifier les allocations...",
            medium_trust: "800K€ cette année, dont 300K€ encore disponibles...",
            high_trust: "Budget détaillé: 300K€ disponibles immédiatement, 500K€ avec validation Dean possible..."
          },
          delayRange: [2, 5],
          trustImpact: 10
        },
        {
          name: "consultFaculty",
          description: "Consulter l'équipe pédagogique sur adoption nouvelle solution",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "L'équipe est généralement ouverte aux innovations...",
            medium_trust: "Mitigé - les jeunes profs sont enthousiastes, les seniors plus réticents...",
            high_trust: "Frédéric Fréry supporte, mais il faut convaincre 3-4 professeurs influents qui résistent au changement..."
          },
          delayRange: [3, 6],
          trustImpact: 12
        }
      ],
      budgetRanges: ["100-300K€", "300-600K€", "600K-1M€"],
      decisionTimelines: ["Janvier 2025", "Mars 2025", "Septembre 2025"],
      stakeholderHierarchy: ["Directrice Innovation", "Directeur Académique", "Dean", "Conseil"]
    };
  }

  /**
   * DISCOVERY FINTECH SPÉCIALISÉ
   */
  private getFintechDiscoveryConfig(): SectoralDiscoveryConfig {
    return {
      sectorId: 'fintech',
      sectorName: 'Financial Technology',
      discoveryLayers: [
        {
          id: 'surface_fintech',
          level: 1,
          category: 'business',
          information: {
            currentVolume: "500K transactions/jour",
            mainChallenges: ["Détection fraude", "Compliance", "Coûts opérationnels"],
            basicBudget: "Budget innovation: 1-2M€"
          },
          trustRequired: 10,
          triggerConditions: ['general_questions', 'initial_discovery']
        },
        {
          id: 'technical_fintech',
          level: 2,
          category: 'technical',
          information: {
            currentStack: "Python, PostgreSQL, Kafka",
            apiVolume: "10K calls/min peak",
            complianceRequirements: ["SOX", "PCI DSS", "GDPR"],
            integrationPoints: ["Core Banking", "Payment Processors", "Risk Systems"]
          },
          trustRequired: 30,
          triggerConditions: ['technical_questions', 'integration_discussion']
        },
        {
          id: 'financial_fintech',
          level: 3,
          category: 'financial',
          information: {
            detailedBudget: "1.5M€ approuvés pour Q2-Q3",
            costOfFraud: "250K€/trimestre en faux positifs",
            expectedROI: "30% sur 18 mois",
            approvalProcess: "Board approval required > 500K€"
          },
          trustRequired: 50,
          triggerConditions: ['budget_discussion', 'roi_evaluation']
        },
        {
          id: 'strategic_fintech',
          level: 4,
          category: 'strategic',
          information: {
            competitivePosition: "Retard sur la concurrence de 12-18 mois",
            regulatoryPressure: "Nouvelle regulation Q4 2025",
            growthTargets: "Double transaction volume d'ici 2026",
            acquisitionPlans: "Évaluation rachat fintech spécialisée"
          },
          trustRequired: 70,
          triggerConditions: ['strategic_discussion', 'competitive_analysis']
        },
        {
          id: 'confidential_fintech',
          level: 5,
          category: 'strategic',
          information: {
            internalProjects: "Projet confidentiel IA générative",
            boardConcerns: "Pression actionnaires sur costs",
            alternativeSolutions: "Évaluation builds vs buy depuis 6 mois",
            timelinePressure: "Décision avant board meeting mars 2025"
          },
          trustRequired: 90,
          triggerConditions: ['deep_trust', 'final_decision']
        }
      ],
      specificFunctions: [
        {
          name: "checkComplianceRequirements",
          description: "Vérifier les exigences de conformité spécifiques",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "Je dois consulter notre département compliance...",
            medium_trust: "Nos principales contraintes sont SOX et PCI DSS...",
            high_trust: "Voici nos exigences détaillées de conformité..."
          },
          delayRange: [2, 4],
          trustImpact: 5
        },
        {
          name: "reviewRiskMetrics",
          description: "Consulter les métriques de risque actuelles",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "Ces données sont sensibles, je dois vérifier...",
            medium_trust: "Nos taux de faux positifs sont préoccupants...",
            high_trust: "Voici nos métriques détaillées de performance risque..."
          },
          delayRange: [3, 6],
          trustImpact: 8
        }
      ],
      budgetRanges: ["500K-1M€", "1M-2M€", "2M-5M€"],
      decisionTimelines: ["Q2 2025", "Q3 2025", "H2 2025"],
      stakeholderHierarchy: ["CTO", "CRO", "CFO", "CEO", "Board"]
    };
  }

  /**
   * DISCOVERY RETAIL SPÉCIALISÉ
   */
  private getRetailDiscoveryConfig(): SectoralDiscoveryConfig {
    return {
      sectorId: 'retail',
      sectorName: 'Retail & E-commerce',
      discoveryLayers: [
        {
          id: 'surface_retail',
          level: 1,
          category: 'business',
          information: {
            currentVolume: "100K customers actifs/mois",
            mainChallenges: ["Personnalisation", "Conversion", "Fidélisation"],
            basicBudget: "Budget marketing tech: 300-800K€"
          },
          trustRequired: 10,
          triggerConditions: ['general_questions', 'initial_discovery']
        },
        {
          id: 'technical_retail', 
          level: 2,
          category: 'technical',
          information: {
            currentPlatform: "Magento Commerce + custom",
            trafficVolume: "50K visitors/jour",
            conversionRate: "2.3% desktop, 1.8% mobile",
            integrationNeeds: ["CRM", "ERP", "Inventory", "Analytics"]
          },
          trustRequired: 30,
          triggerConditions: ['technical_questions', 'platform_discussion']
        }
      ],
      specificFunctions: [
        {
          name: "checkCustomerSegmentation",
          description: "Consulter la segmentation client actuelle",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "Je dois vérifier avec l'équipe marketing...",
            medium_trust: "Nous avons 5 segments principaux...",
            high_trust: "Voici notre mapping détaillé des segments..."
          },
          delayRange: [2, 3],
          trustImpact: 4
        }
      ],
      budgetRanges: ["100K-300K€", "300K-800K€", "800K-1.5M€"],
      decisionTimelines: ["Q1 2025", "Q2 2025", "H2 2025"],
      stakeholderHierarchy: ["CMO", "CTO", "CDO", "CEO"]
    };
  }

  /**
   * DISCOVERY MANUFACTURING SPÉCIALISÉ
   */
  private getManufacturingDiscoveryConfig(): SectoralDiscoveryConfig {
    return {
      sectorId: 'manufacturing',
      sectorName: 'Manufacturing & Industry',
      discoveryLayers: [
        {
          id: 'surface_manufacturing',
          level: 1,
          category: 'business',
          information: {
            productionVolume: "100K units/mois",
            mainChallenges: ["Maintenance prédictive", "Optimisation", "Traçabilité"],
            basicBudget: "Budget industrie 4.0: 500K-1M€"
          },
          trustRequired: 10,
          triggerConditions: ['general_questions', 'initial_discovery']
        }
      ],
      specificFunctions: [
        {
          name: "checkProductionMetrics",
          description: "Consulter les métriques de production",
          sectorSpecific: true,
          responseTemplates: {
            low_trust: "Ces données sont confidentielles...",
            medium_trust: "Nos rendements actuels sont...",
            high_trust: "Voici nos KPIs détaillés de production..."
          },
          delayRange: [3, 5],
          trustImpact: 6
        }
      ],
      budgetRanges: ["500K-1M€", "1M-3M€", "3M-10M€"],
      decisionTimelines: ["Q3 2025", "H2 2025", "2026"],
      stakeholderHierarchy: ["COO", "CTO", "CFO", "CEO"]
    };
  }

  /**
   * DISCOVERY GÉNÉRIQUE
   */
  private getGenericDiscoveryConfig(): SectoralDiscoveryConfig {
    return {
      sectorId: 'generic',
      sectorName: 'Secteur Générique',
      discoveryLayers: [],
      specificFunctions: [],
      budgetRanges: ["100K-500K€", "500K-1M€", "1M-3M€"],
      decisionTimelines: ["Q2 2025", "Q3 2025", "H2 2025"],
      stakeholderHierarchy: ["Manager", "Director", "VP", "CEO"]
    };
  }

  /**
   * EXÉCUTION DISCOVERY CONTEXTUELLE
   */
  async executeDiscoveryFunction(
    functionName: string, 
    parameters: Record<string, any>
  ): Promise<{response: string, newInfo: any, trustDelta: number}> {
    
    const config = this.getSectoralDiscoveryConfig();
    const func = config.specificFunctions.find(f => f.name === functionName);
    
    if (!func) {
      return this.executeGenericDiscovery(functionName, parameters);
    }

    // Détermination du niveau de trust pour la réponse
    const trustLevelCategory = this.getTrustLevel();
    const template = this.selectResponseTemplate(func, trustLevelCategory);
    
    // Simulation délai réaliste
    const delay = this.getRandomDelay(func.delayRange);
    await this.simulateDelay(delay);

    // Révélation progressive d'informations
    const trustLevelNumber = this.currentTrustLevel;
    const newInfo = this.revealInformation(functionName, this.currentTrustLevel);
    
    // Impact sur la confiance
    const trustDelta = func.trustImpact * this.getTrustMultiplier(parameters);
    this.updateTrustLevel(trustDelta);

    // Enregistrement historique
    const response = this.buildContextualResponse(template, newInfo, parameters);
    this.recordDiscoveryAction(functionName, response);

    return {
      response,
      newInfo,
      trustDelta
    };
  }

  /**
   * RÉVÉLATION PROGRESSIVE D'INFORMATIONS
   */
  private revealInformation(functionName: string, trustLevel: number): any {
    const config = this.getSectoralDiscoveryConfig();
    const availableLayers = config.discoveryLayers.filter(
      layer => layer.trustRequired <= trustLevel && !this.revealedLayers.includes(layer)
    );

    const newInfo: any = {};
    
    availableLayers.forEach(layer => {
      if (this.shouldRevealLayer(layer, functionName)) {
        Object.assign(newInfo, layer.information);
        this.revealedLayers.push(layer);
      }
    });

    return newInfo;
  }

  /**
   * HELPERS
   */
  private getTrustLevel(): 'low' | 'medium' | 'high' {
    if (this.currentTrustLevel < 30) return 'low';
    if (this.currentTrustLevel < 70) return 'medium';
    return 'high';
  }

  private selectResponseTemplate(func: DiscoveryFunction, trustLevel: 'low' | 'medium' | 'high'): string {
    return func.responseTemplates[`${trustLevel}_trust`] || func.responseTemplates['low_trust'];
  }

  private getRandomDelay([min, max]: [number, number]): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async simulateDelay(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  private shouldRevealLayer(layer: DiscoveryLayer, functionName: string): boolean {
    return layer.triggerConditions.some(condition => 
      functionName.toLowerCase().includes(condition.toLowerCase())
    );
  }

  private getTrustMultiplier(parameters: Record<string, any>): number {
    // Facteurs qui influencent l'impact sur la confiance
    let multiplier = 1;
    
    if (parameters.urgency === 'high') multiplier += 0.2;
    if (parameters.confidential === true) multiplier += 0.3;
    if (parameters.strategic === true) multiplier += 0.4;
    
    return multiplier;
  }

  private updateTrustLevel(delta: number): void {
    this.currentTrustLevel = Math.max(0, Math.min(100, this.currentTrustLevel + delta));
  }

  private buildContextualResponse(template: string, newInfo: any, parameters: any): string {
    let response = template;
    
    // Injection des informations contextuelles
    if (Object.keys(newInfo).length > 0) {
      const infoSummary = Object.entries(newInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      response += ` Voici ce que je peux partager: ${infoSummary}`;
    }

    return response;
  }

  private recordDiscoveryAction(functionName: string, response: string): void {
    this.discoveryHistory.push({
      functionName,
      timestamp: new Date(),
      response: response.slice(0, 100) + '...'
    });
  }

  private async executeGenericDiscovery(
    functionName: string, 
    parameters: Record<string, any>
  ): Promise<{response: string, newInfo: any, trustDelta: number}> {
    
    // Gestion des fonctions discovery standard
    const genericResponses = {
      askColleague: `Je consulte l'équipe ${parameters.expertise || 'concernée'}... [pause 2-3 sec]`,
      checkBudget: `Vérification budget ${parameters.requestType || 'standard'}... [pause 1-2 sec]`,
      consultDecisionMaker: `Contact direction pour ${parameters.topic || 'validation'}... [pause 3-5 sec]`,
      reviewInternalOptions: `Examen solutions ${parameters.area || 'actuelles'}... [pause 2-4 sec]`
    };

    await this.simulateDelay(2);
    
    return {
      response: genericResponses[functionName as keyof typeof genericResponses] || "Vérification en cours...",
      newInfo: {},
      trustDelta: 2
    };
  }

  /**
   * GETTERS
   */
  getCurrentTrustLevel(): number {
    return this.currentTrustLevel;
  }

  getRevealedLayers(): DiscoveryLayer[] {
    return this.revealedLayers;
  }

  getDiscoveryHistory(): Array<{functionName: string, timestamp: Date, response: string}> {
    return this.discoveryHistory;
  }

  getAvailableInformation(): Record<string, any> {
    const allInfo: Record<string, any> = {};
    this.revealedLayers.forEach(layer => {
      Object.assign(allInfo, layer.information);
    });
    return allInfo;
  }
}