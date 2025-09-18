import { useState, useCallback, useRef } from 'react';
import { CognitiveStateManager } from '@/lib/cognitive-discovery';

interface UseCognitiveDiscoveryProps {
  scenarioData: any;
  interlocutorData: any;
}

export function useCognitiveDiscovery({ scenarioData, interlocutorData }: UseCognitiveDiscoveryProps) {
  const cognitiveManagerRef = useRef<CognitiveStateManager | null>(null);
  const [trustLevel, setTrustLevel] = useState(0);
  const [availableInformation, setAvailableInformation] = useState<Record<string, any>>({});
  const [revealedLayers, setRevealedLayers] = useState<any[]>([]);

  // Initialize cognitive manager
  const initializeCognitive = useCallback((conversationType: 'cold-call' | 'rdv' = 'cold-call') => {
    if (!cognitiveManagerRef.current) {
      cognitiveManagerRef.current = new CognitiveStateManager(scenarioData, interlocutorData, conversationType);
      updateState();
    }
  }, [scenarioData, interlocutorData]);

  // Update state from cognitive manager
  const updateState = useCallback(() => {
    if (cognitiveManagerRef.current) {
      setTrustLevel(cognitiveManagerRef.current.getTrustLevel());
      setAvailableInformation(cognitiveManagerRef.current.getAvailableInformation());
      setRevealedLayers(cognitiveManagerRef.current.getRevealedLayers());
    }
  }, []);

  // Add behavioral trigger
  const addBehavioralTrigger = useCallback((trigger: string) => {
    if (cognitiveManagerRef.current) {
      cognitiveManagerRef.current.addBehavioralTrigger(trigger);
      updateState();
    }
  }, [updateState]);

  // Add to conversation memory
  const addToMemory = useCallback((entry: string) => {
    if (cognitiveManagerRef.current) {
      cognitiveManagerRef.current.addToMemory(entry);
    }
  }, []);

  // Get current cognitive state
  const getCognitiveState = useCallback(() => {
    return cognitiveManagerRef.current?.getState();
  }, []);

  // Analyze conversation for behavioral triggers
  const analyzeConversation = useCallback((message: string) => {
    const triggers = [];
    
    // Detect identification
    if (message.toLowerCase().includes('je suis') || message.toLowerCase().includes('je travaille')) {
      triggers.push('identify_self');
    }
    
    // Detect purpose explanation
    if (message.toLowerCase().includes('je vous appelle pour') || message.toLowerCase().includes('objectif')) {
      triggers.push('explain_purpose');
    }
    
    // Detect sector understanding
    if (message.toLowerCase().includes(scenarioData.company_sector.toLowerCase())) {
      triggers.push('understand_sector');
    }
    
    // Detect relevant questions
    if (message.includes('?') && (
      message.toLowerCase().includes('défi') || 
      message.toLowerCase().includes('problème') ||
      message.toLowerCase().includes('objectif')
    )) {
      triggers.push('ask_relevant_questions');
    }
    
    // Detect expertise demonstration
    if (message.toLowerCase().includes('expérience') || message.toLowerCase().includes('client similaire')) {
      triggers.push('show_expertise');
    }
    
    // Detect value proposition
    if (message.toLowerCase().includes('économie') || message.toLowerCase().includes('améliorer')) {
      triggers.push('show_value');
    }
    
    // Add detected triggers
    triggers.forEach(trigger => addBehavioralTrigger(trigger));
    
    // Add to memory
    addToMemory(`Sales rep: ${message}`);
  }, [scenarioData, addBehavioralTrigger, addToMemory]);

  return {
    initializeCognitive,
    trustLevel,
    availableInformation,
    revealedLayers,
    addBehavioralTrigger,
    addToMemory,
    getCognitiveState,
    analyzeConversation,
    cognitiveManager: cognitiveManagerRef.current
  };
}