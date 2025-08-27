import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Scenario as StaticScenario } from '@/data/consolidatedScenarios';
import { Scenario as SupabaseScenario } from '@/hooks/useScenarios';
import { Persona } from '@/data/personas';
import { SalesPhase } from '@/data/salesPhases';

export type Mode = 'roleplay' | 'coach';
export type ConversationType = 'cold-call' | 'rdv';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  phase?: string;
}

export interface CoachNote {
  id: string;
  phase: string;
  score: number;
  feedback: string;
  actions: string[];
  timestamp: Date;
}

export interface CalcResult {
  id: string;
  type: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  timestamp: Date;
}

export interface SalesState {
  // Mode et configuration
  mode: Mode;
  conversationType: ConversationType;
  currentPhase: string;
  selectedScenario: StaticScenario | SupabaseScenario | null;
  selectedPersona: Persona | null;
  difficulty: 'facile' | 'moyen' | 'difficile';
  
  // Progression et déblocage
  coldCallCompleted: boolean;
  rdvUnlocked: boolean;
  
  // Conversation
  messages: Message[];
  transcript: string[];
  
  // Coach
  coachNotes: CoachNote[];
  scores: Record<string, number>;
  nextSteps: string[];
  
  // Objections et outils
  availableObjections: string[];
  kpiDrafts: Record<string, any>;
  calcResults: CalcResult[];
  
  // Actions
  setMode: (mode: Mode) => void;
  setConversationType: (type: ConversationType) => void;
  setCurrentPhase: (phase: string) => void;
  setScenario: (scenario: StaticScenario | SupabaseScenario | null) => void;
  setPersona: (persona: Persona | null) => void;
  setDifficulty: (difficulty: 'facile' | 'moyen' | 'difficile') => void;
  
  // Progression
  completeColdCall: () => void;
  unlockRdv: () => void;
  
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  addCoachNote: (note: Omit<CoachNote, 'id' | 'timestamp'>) => void;
  addCalcResult: (result: Omit<CalcResult, 'id' | 'timestamp'>) => void;
  
  updateScore: (phase: string, score: number) => void;
  setNextSteps: (steps: string[]) => void;
  
  clearSession: () => void;
}

export const useSalesStore = create<SalesState>()(
  persist(
    (set, get) => ({
      // État initial
      mode: 'roleplay',
      conversationType: 'cold-call',
      currentPhase: 'ouverture',
      selectedScenario: null,
      selectedPersona: null,
      difficulty: 'moyen',
      
      // Progression
      coldCallCompleted: false,
      rdvUnlocked: false,
      
      messages: [],
      transcript: [],
      
      coachNotes: [],
      scores: {},
      nextSteps: [],
      
      availableObjections: [],
      kpiDrafts: {},
      calcResults: [],
      
      // Actions
      setMode: (mode) => set({ mode }),
      setConversationType: (type) => set({ conversationType: type }),
      setCurrentPhase: (phase) => set({ currentPhase: phase }),
      setScenario: (scenario) => set({ selectedScenario: scenario }),
      setPersona: (persona) => set({ selectedPersona: persona }),
      setDifficulty: (difficulty) => set({ difficulty }),
      
      // Progression
      completeColdCall: () => set({ coldCallCompleted: true, rdvUnlocked: true }),
      unlockRdv: () => set({ rdvUnlocked: true }),
      
      addMessage: (messageData) => {
        const message: Message = {
          ...messageData,
          id: crypto.randomUUID(),
          timestamp: new Date()
        };
        set((state) => ({
          messages: [...state.messages, message]
        }));
      },
      
      addCoachNote: (noteData) => {
        const note: CoachNote = {
          ...noteData,
          id: crypto.randomUUID(),
          timestamp: new Date()
        };
        set((state) => ({
          coachNotes: [...state.coachNotes, note]
        }));
      },
      
      addCalcResult: (resultData) => {
        const result: CalcResult = {
          ...resultData,
          id: crypto.randomUUID(),
          timestamp: new Date()
        };
        set((state) => ({
          calcResults: [...state.calcResults, result]
        }));
      },
      
      updateScore: (phase, score) => {
        set((state) => ({
          scores: { ...state.scores, [phase]: score }
        }));
      },
      
      setNextSteps: (steps) => set({ nextSteps: steps }),
      
      clearSession: () => set({
        messages: [],
        transcript: [],
        coachNotes: [],
        scores: {},
        nextSteps: [],
        calcResults: [],
        currentPhase: 'ouverture',
        conversationType: 'cold-call'
      })
    }),
    {
      name: 'sales-coach-storage',
      partialize: (state) => ({
        // Ne persister que certaines données
        selectedScenario: state.selectedScenario,
        selectedPersona: state.selectedPersona,
        difficulty: state.difficulty,
        mode: state.mode,
        conversationType: state.conversationType,
        coldCallCompleted: state.coldCallCompleted,
        rdvUnlocked: state.rdvUnlocked
      })
    }
  )
);