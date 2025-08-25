import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Scenario } from '@/data/scenarios';
import { Persona } from '@/data/personas';
import { SalesPhase } from '@/data/salesPhases';

export type Mode = 'roleplay' | 'coach';

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
  currentPhase: string;
  selectedScenario: Scenario | null;
  selectedPersona: Persona | null;
  difficulty: 'facile' | 'moyen' | 'difficile';
  
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
  setCurrentPhase: (phase: string) => void;
  setScenario: (scenario: Scenario | null) => void;
  setPersona: (persona: Persona | null) => void;
  setDifficulty: (difficulty: 'facile' | 'moyen' | 'difficile') => void;
  
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
      currentPhase: 'ouverture',
      selectedScenario: null,
      selectedPersona: null,
      difficulty: 'moyen',
      
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
      setCurrentPhase: (phase) => set({ currentPhase: phase }),
      setScenario: (scenario) => set({ selectedScenario: scenario }),
      setPersona: (persona) => set({ selectedPersona: persona }),
      setDifficulty: (difficulty) => set({ difficulty }),
      
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
        currentPhase: 'ouverture'
      })
    }),
    {
      name: 'sales-coach-storage',
      partialize: (state) => ({
        // Ne persister que certaines données
        selectedScenario: state.selectedScenario,
        selectedPersona: state.selectedPersona,
        difficulty: state.difficulty,
        mode: state.mode
      })
    }
  )
);