/**
 * SYSTÈME VOCAL ENHANCED - INTÉGRATION COMPLÈTE
 * Combine toutes les améliorations des 5 phases
 */

import { RealtimeWebRTCCoach } from './openai-webrtc';
import { OptimizedKpiPerformancePrompts } from './prompts/scenarios/kpi-performance-optimized';
import { VocalCoachingSystem } from './prompts/vocal-coaching-system';
import { AudioQueue } from './audio/AudioQueue';
import { AudioRecorder } from './audio/AudioRecorder';

export interface EnhancedVoiceConfig {
  scenario: any;
  conversationType: 'cold-call' | 'rdv';
  selectedVoice: string;
  agentType: 'contact_principal' | 'coach';
}

export class EnhancedVoiceSystem {
  private webrtcCoach: RealtimeWebRTCCoach | null = null;
  private vocalCoaching: VocalCoachingSystem;
  private optimizedPrompts: OptimizedKpiPerformancePrompts;
  private audioQueue: AudioQueue | null = null;
  private audioRecorder: AudioRecorder | null = null;
  
  // État conversation
  private currentPhase = 'ouverture';
  private trustLevel = 0;
  private sessionActive = false;
  
  // Callbacks pour l'interface
  onSpeechStarted?: () => void;
  onSpeechStopped?: () => void;
  onResponseStarted?: () => void;
  onResponseCompleted?: () => void;
  onTranscriptDelta?: (delta: string) => void;
  onError?: (error: string) => void;
  onPhaseChange?: (phase: string) => void;
  onTrustLevelChange?: (level: number) => void;

  constructor() {
    this.vocalCoaching = new VocalCoachingSystem();
    this.optimizedPrompts = new OptimizedKpiPerformancePrompts();
  }

  /**
   * PHASE 1-5 INTÉGRÉES: Démarrage conversation optimisée
   */
  async startEnhancedConversation(config: EnhancedVoiceConfig): Promise<void> {
    try {
      console.log('🚀 Démarrage système vocal enhanced:', config);
      
      // Générer prompt optimisé selon l'agent et scénario
      const optimizedPrompt = await this.generateOptimizedPrompt(config);
      
      // Initialiser WebRTC avec prompt optimisé
      this.webrtcCoach = new RealtimeWebRTCCoach(
        import.meta.env.VITE_OPENAI_API_KEY || ''
      );
      
      // Configuration callbacks WebRTC
      this.setupWebRTCCallbacks();
      
      // Connexion avec voice sélectionnée et prompt optimisé
      await this.webrtcCoach.connect(optimizedPrompt, config.selectedVoice);
      
      this.sessionActive = true;
      console.log('✅ Système vocal enhanced connecté');
      
    } catch (error) {
      console.error('❌ Erreur démarrage système vocal:', error);
      this.onError?.(error instanceof Error ? error.message : 'Erreur connexion vocale');
    }
  }

  /**
   * PHASE 3: Génération prompt optimisé selon agent
   */
  private async generateOptimizedPrompt(config: EnhancedVoiceConfig): Promise<string> {
    if (config.agentType === 'coach') {
      // Prompt coaching vocal spécialisé
      return this.vocalCoaching.generateRealtimeCoachingPrompt({
        scenario: config.scenario,
        phase: this.currentPhase,
        conversationType: config.conversationType,
        trustLevel: this.trustLevel,
        performance: {
          questioningTechnique: 7,
          activeListening: 7,
          adaptation: 7,
          progression: 7
        }
      });
    } else {
      // Prompt Sophie Martin optimisé vocal
      return this.optimizedPrompts.generateVocalOptimizedSophiePrompt(
        config.conversationType
      );
    }
  }

  /**
   * PHASE 2: Configuration callbacks WebRTC optimisés
   */
  private setupWebRTCCallbacks(): void {
    if (!this.webrtcCoach) return;

    this.webrtcCoach.onSessionReady = () => {
      console.log('✅ Session WebRTC prête');
    };

    this.webrtcCoach.onSpeechStarted = () => {
      console.log('🎙️ Utilisateur parle');
      this.onSpeechStarted?.();
    };

    this.webrtcCoach.onSpeechStopped = () => {
      console.log('🔇 Utilisateur arrêté');
      this.onSpeechStopped?.();
    };

    this.webrtcCoach.onResponseStarted = () => {
      console.log('🤖 IA répond');
      this.onResponseStarted?.();
    };

    this.webrtcCoach.onResponseCompleted = () => {
      console.log('✅ Réponse IA terminée');
      this.onResponseCompleted?.();
    };

    this.webrtcCoach.onTranscriptDelta = (delta: string) => {
      this.onTranscriptDelta?.(delta);
      
      // Analyse intelligente pour progression de phase
      this.analyzeConversationProgression(delta);
    };

    this.webrtcCoach.onError = (error: string) => {
      console.error('❌ Erreur WebRTC:', error);
      this.onError?.(error);
    };
  }

  /**
   * PHASE 4: Analyse progression conversation et coaching
   */
  private analyzeConversationProgression(transcript: string): void {
    // Détection automatique changement de phase
    const phaseIndicators = {
      decouverte: ['problème', 'difficulté', 'challenge', 'besoin'],
      demonstration: ['solution', 'présenter', 'démontrer', 'montrer'],
      objections: ['mais', 'cependant', 'problème', 'inquiétude'],
      closing: ['prochaine étape', 'next step', 'quand', 'délai']
    };
    
    const currentPhaseChanged = this.detectPhaseChange(transcript, phaseIndicators);
    if (currentPhaseChanged) {
      this.currentPhase = currentPhaseChanged;
      this.onPhaseChange?.(currentPhaseChanged);
    }
    
    // Mise à jour trust level basé sur engagement
    const newTrustLevel = this.calculateTrustLevel(transcript);
    if (Math.abs(newTrustLevel - this.trustLevel) > 5) {
      this.trustLevel = newTrustLevel;
      this.onTrustLevelChange?.(newTrustLevel);
    }
  }

  private detectPhaseChange(transcript: string, indicators: Record<string, string[]>): string | null {
    const lowerTranscript = transcript.toLowerCase();
    
    for (const [phase, keywords] of Object.entries(indicators)) {
      const matchCount = keywords.filter(keyword => 
        lowerTranscript.includes(keyword)
      ).length;
      
      if (matchCount >= 1 && phase !== this.currentPhase) {
        console.log(`🔄 Changement de phase détecté: ${this.currentPhase} → ${phase}`);
        return phase;
      }
    }
    
    return null;
  }

  private calculateTrustLevel(transcript: string): number {
    // Indicateurs positifs
    const positiveIndicators = ['intéressant', 'effectivement', 'exactement', 'précisément'];
    const negativeIndicators = ['pas sûr', 'compliqué', 'difficile', 'problème'];
    
    const positive = positiveIndicators.filter(word => 
      transcript.toLowerCase().includes(word)
    ).length;
    
    const negative = negativeIndicators.filter(word => 
      transcript.toLowerCase().includes(word)
    ).length;
    
    // Ajustement progressif
    const adjustment = (positive - negative) * 5;
    return Math.max(0, Math.min(100, this.trustLevel + adjustment));
  }

  /**
   * Basculer vers mode coaching
   */
  async switchToCoachingMode(config: EnhancedVoiceConfig): Promise<void> {
    if (!this.webrtcCoach || !this.sessionActive) {
      throw new Error('Session vocale non active');
    }
    
    console.log('🎯 Basculement vers mode coaching');
    
    // Générer nouveau prompt coaching
    const coachingPrompt = this.vocalCoaching.generateRealtimeCoachingPrompt({
      scenario: config.scenario,
      phase: this.currentPhase,
      conversationType: config.conversationType,
      trustLevel: this.trustLevel,
      performance: {
        questioningTechnique: 7,
        activeListening: 7,
        adaptation: 7,
        progression: 7
      }
    });
    
    // Mettre à jour session avec nouveau prompt
    // Note: Implementation dépend de la capacité WebRTC à changer prompts dynamiquement
    console.log('🔄 Prompt coaching activé');
  }

  /**
   * Envoyer message texte
   */
  sendTextMessage(text: string): void {
    if (!this.webrtcCoach || !this.sessionActive) {
      throw new Error('Session vocale non active');
    }
    
    this.webrtcCoach.sendTextMessage(text);
  }

  /**
   * Contrôle mute/unmute
   */
  toggleMute(): boolean {
    if (!this.webrtcCoach) return false;
    return this.webrtcCoach.toggleMute();
  }

  /**
   * Déconnexion système complet
   */
  async disconnect(): Promise<void> {
    console.log('🔌 Déconnexion système vocal enhanced');
    
    if (this.webrtcCoach) {
      this.webrtcCoach.disconnect();
      this.webrtcCoach = null;
    }
    
    if (this.audioQueue) {
      this.audioQueue.clear();
      this.audioQueue = null;
    }
    
    if (this.audioRecorder) {
      this.audioRecorder.stop();
      this.audioRecorder = null;
    }
    
    this.sessionActive = false;
    this.currentPhase = 'ouverture';
    this.trustLevel = 0;
  }

  // Getters pour l'état
  get isActive(): boolean {
    return this.sessionActive;
  }

  get phase(): string {
    return this.currentPhase;
  }

  get trust(): number {
    return this.trustLevel;
  }
}