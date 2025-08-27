import { useState, useCallback, useRef } from 'react';
import { Scenario } from '@/data/scenarios';

/**
 * Hook amélioré pour gérer la découverte cognitive progressive
 * Optimisé pour l'API Realtime 2025 et les nouvelles fonctionnalités
 */

interface CognitiveState {
  trustLevel: number;
  revealedInformation: Record<string, any>;
  behavioralTriggers: string[];
  conversationMemory: ConversationEntry[];
  cognitiveMode: 'defensive' | 'neutral' | 'interested' | 'convinced';
  informationLayers: InformationLayer[];
}

interface ConversationEntry {
  timestamp: Date;
  speaker: 'user' | 'contact';
  content: string;
  triggers?: string[];
  trustImpact?: number;
}

interface InformationLayer {
  id: string;
  type: 'surface' | 'business' | 'technical' | 'financial' | 'strategic';
  content: Record<string, any>;
  unlockTrustLevel: number;
  revealed: boolean;
}

interface UseCognitiveDiscoveryEnhancedProps {
  scenarioData: Scenario;
  conversationType: 'cold-call' | 'rdv';
  voice?: string;
}

export function useCognitiveDiscoveryEnhanced({
  scenarioData,
  conversationType,
  voice = 'sage'
}: UseCognitiveDiscoveryEnhancedProps) {
  
  const [cognitiveState, setCognitiveState] = useState<CognitiveState>({
    trustLevel: conversationType === 'cold-call' ? 0 : 20, // RDV commence avec plus de confiance
    revealedInformation: {},
    behavioralTriggers: [],
    conversationMemory: [],
    cognitiveMode: conversationType === 'cold-call' ? 'defensive' : 'neutral',
    informationLayers: []
  });

  const lastUpdateRef = useRef<Date>(new Date());

  /**
   * Initialise les couches d'information selon le scénario
   */
  const initializeInformationLayers = useCallback(() => {
    const layers: InformationLayer[] = [
      {
        id: 'surface',
        type: 'surface',
        content: {
          company_name: scenarioData.company.name,
          sector: scenarioData.company.sector,
          role: "Nous utilisons quelques outils pour notre activité"
        },
        unlockTrustLevel: 0,
        revealed: true
      },
      {
        id: 'business_context',
        type: 'business',
        content: {
          main_challenges: scenarioData.pain_points.slice(0, 2),
          team_size: scenarioData.company.size,
          general_priorities: "Améliorer notre efficacité opérationnelle"
        },
        unlockTrustLevel: 20,
        revealed: false
      },
      {
        id: 'technical_details',
        type: 'technical',
        content: {
          current_tools: scenarioData.current_solution || "Solutions diverses",
          technical_constraints: "Nous avons quelques limitations techniques",
          integration_concerns: "L'intégration est un point important pour nous"
        },
        unlockTrustLevel: 40,
        revealed: false
      },
      {
        id: 'financial_scope',
        type: 'financial',
        content: {
          budget_range: scenarioData.budget_range,
          decision_timeline: conversationType === 'cold-call' ? "À évaluer" : "Trimestre en cours",
          financial_constraints: "Le budget doit être justifié"
        },
        unlockTrustLevel: 60,
        revealed: false
      },
      {
        id: 'strategic_vision',
        type: 'strategic',
        content: {
          strategic_objectives: scenarioData.objectives?.slice(0, 2) || ["Croissance", "Efficacité"],
          decision_makers: "La décision implique plusieurs parties prenantes",
          success_criteria: scenarioData.successCriteria?.slice(0, 2) || ["ROI", "Adoption utilisateur"]
        },
        unlockTrustLevel: 80,
        revealed: false
      }
    ];

    setCognitiveState(prev => ({
      ...prev,
      informationLayers: layers,
      revealedInformation: layers[0].content // Surface info disponible immédiatement
    }));
  }, [scenarioData, conversationType]);

  /**
   * Ajoute un déclencheur comportemental et évalue l'impact sur la confiance
   */
  const addBehavioralTrigger = useCallback((trigger: string, trustImpact: number = 0) => {
    setCognitiveState(prev => {
      const newTrustLevel = Math.max(0, Math.min(100, prev.trustLevel + trustImpact));
      const newMode = getCognitiveMode(newTrustLevel);
      
      // Débloquer des couches d'information selon le nouveau niveau de confiance
      const updatedLayers = prev.informationLayers.map(layer => ({
        ...layer,
        revealed: layer.revealed || layer.unlockTrustLevel <= newTrustLevel
      }));

      // Mettre à jour les informations révélées
      const newRevealedInfo = { ...prev.revealedInformation };
      updatedLayers.filter(layer => layer.revealed).forEach(layer => {
        Object.assign(newRevealedInfo, layer.content);
      });

      return {
        ...prev,
        trustLevel: newTrustLevel,
        cognitiveMode: newMode,
        behavioralTriggers: [...prev.behavioralTriggers, trigger],
        informationLayers: updatedLayers,
        revealedInformation: newRevealedInfo
      };
    });

    lastUpdateRef.current = new Date();
  }, []);

  /**
   * Ajoute une entrée de conversation et analyse les déclencheurs
   */
  const addConversationEntry = useCallback((speaker: 'user' | 'contact', content: string) => {
    const entry: ConversationEntry = {
      timestamp: new Date(),
      speaker,
      content,
      triggers: [],
      trustImpact: 0
    };

    // Analyse automatique des déclencheurs positifs
    if (speaker === 'user') {
      entry.triggers = analyzeUserMessage(content);
      entry.trustImpact = calculateTrustImpact(content, entry.triggers);
    }

    setCognitiveState(prev => ({
      ...prev,
      conversationMemory: [...prev.conversationMemory.slice(-10), entry] // Garder les 10 derniers
    }));

    // Appliquer l'impact sur la confiance si nécessaire
    if (entry.trustImpact !== 0) {
      addBehavioralTrigger(`Message analysé: ${content.slice(0, 50)}...`, entry.trustImpact);
    }
  }, [addBehavioralTrigger]);

  /**
   * Analyse un message utilisateur pour identifier les déclencheurs
   */
  const analyzeUserMessage = (message: string): string[] => {
    const triggers: string[] = [];
    const lowerMessage = message.toLowerCase();

    // Déclencheurs positifs
    if (lowerMessage.includes('comprend') || lowerMessage.includes('connais')) {
      triggers.push('shows_understanding');
    }
    if (lowerMessage.includes('secteur') || lowerMessage.includes('métier')) {
      triggers.push('sector_knowledge');
    }
    if (lowerMessage.includes('référence') || lowerMessage.includes('client')) {
      triggers.push('mentions_references');
    }
    if (lowerMessage.includes('retour sur investissement') || lowerMessage.includes('roi')) {
      triggers.push('focuses_on_roi');
    }

    // Déclencheurs négatifs
    if (lowerMessage.includes('cher') || lowerMessage.includes('coût')) {
      triggers.push('price_concern');
    }
    if (lowerMessage.includes('temps') || lowerMessage.includes('occupé')) {
      triggers.push('time_pressure');
    }

    return triggers;
  };

  /**
   * Calcule l'impact sur la confiance basé sur les déclencheurs
   */
  const calculateTrustImpact = (message: string, triggers: string[]): number => {
    let impact = 0;
    
    triggers.forEach(trigger => {
      switch (trigger) {
        case 'shows_understanding':
          impact += 5;
          break;
        case 'sector_knowledge':
          impact += 8;
          break;
        case 'mentions_references':
          impact += 6;
          break;
        case 'focuses_on_roi':
          impact += 4;
          break;
        case 'price_concern':
          impact -= 3;
          break;
        case 'time_pressure':
          impact -= 2;
          break;
      }
    });

    return impact;
  };

  /**
   * Détermine le mode cognitif selon le niveau de confiance
   */
  const getCognitiveMode = (trustLevel: number): CognitiveState['cognitiveMode'] => {
    if (trustLevel < 25) return 'defensive';
    if (trustLevel < 50) return 'neutral';
    if (trustLevel < 75) return 'interested';
    return 'convinced';
  };

  /**
   * Génère un contexte pour l'IA basé sur l'état cognitif actuel
   */
  const getCurrentContext = useCallback(() => {
    const { trustLevel, cognitiveMode, revealedInformation, informationLayers } = cognitiveState;
    
    return {
      trustLevel,
      cognitiveMode,
      availableInformation: revealedInformation,
      revealedLayers: informationLayers.filter(layer => layer.revealed),
      nextUnlockLevel: informationLayers.find(layer => !layer.revealed)?.unlockTrustLevel || 100,
      conversationContext: {
        type: conversationType,
        voice: voice,
        scenario: scenarioData.title
      }
    };
  }, [cognitiveState, conversationType, voice, scenarioData]);

  /**
   * Simule une réponse de découverte basée sur le type de fonction appelée
   */
  const simulateDiscoveryResponse = useCallback((functionName: string, args: any) => {
    const { trustLevel } = cognitiveState;
    
    const responses = {
      askColleague: {
        low: "Je vais me renseigner et vous recontacter.",
        medium: "D'après mon collègue, nous avons effectivement ce type de besoin.",
        high: "Mon équipe confirme que c'est exactement notre problématique actuelle."
      },
      checkBudget: {
        low: conversationType === 'cold-call' ? 
          "Le budget n'est pas encore défini." : 
          "Nous avons un budget alloué mais je dois vérifier les détails.",
        medium: "Nous avons effectivement prévu un budget dans cette gamme.",
        high: `Notre budget est de ${scenarioData.budget_range} pour ce type de projet.`
      },
      consultDecisionMaker: {
        low: "Je dois en parler à ma direction avant de pouvoir vous donner une réponse.",
        medium: "Ma direction est ouverte à ce type de solution, je peux vous organiser une rencontre.",
        high: "Nous sommes prêts à impliquer notre direction dans les discussions."
      },
      reviewInternalOptions: {
        low: "Nous utilisons actuellement d'autres solutions.",
        medium: "Nos outils actuels ont certaines limitations que votre solution pourrait résoudre.",
        high: `Nous utilisons ${scenarioData.current_solution || 'des outils variés'} mais nous cherchons à évoluer.`
      }
    };

    const responseLevel = trustLevel < 30 ? 'low' : trustLevel < 70 ? 'medium' : 'high';
    return responses[functionName as keyof typeof responses]?.[responseLevel] || 
           "Je vais examiner cette question et revenir vers vous.";
  }, [cognitiveState, conversationType, scenarioData]);

  return {
    // État actuel
    trustLevel: cognitiveState.trustLevel,
    cognitiveMode: cognitiveState.cognitiveMode,
    revealedInformation: cognitiveState.revealedInformation,
    availableLayers: cognitiveState.informationLayers.filter(l => l.revealed),
    nextUnlockLevel: cognitiveState.informationLayers.find(l => !l.revealed)?.unlockTrustLevel || 100,
    
    // Actions
    initializeInformationLayers,
    addBehavioralTrigger,
    addConversationEntry,
    getCurrentContext,
    simulateDiscoveryResponse,
    
    // Helpers
    getProgressIndicator: () => ({
      current: cognitiveState.trustLevel,
      phases: [
        { name: 'Défensif', range: [0, 25], color: 'red' },
        { name: 'Neutre', range: [25, 50], color: 'yellow' },
        { name: 'Intéressé', range: [50, 75], color: 'orange' },
        { name: 'Convaincu', range: [75, 100], color: 'green' }
      ]
    }),
    
    getConversationSummary: () => ({
      totalMessages: cognitiveState.conversationMemory.length,
      averageTrustImpact: cognitiveState.conversationMemory.reduce((acc, entry) => 
        acc + (entry.trustImpact || 0), 0) / Math.max(cognitiveState.conversationMemory.length, 1),
      triggersCount: cognitiveState.behavioralTriggers.length,
      lastUpdate: lastUpdateRef.current
    })
  };
}