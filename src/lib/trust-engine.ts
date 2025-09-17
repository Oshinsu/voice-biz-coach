export interface TrustState {
  level: number;
  phase: "ouverture" | "decouverte" | "objections" | "closing";
  lastChange: number;
  evidence: string[];
}

export class TrustEngine {
  private state: TrustState;
  private mode: "cold" | "rdv";
  private onStateChange?: (state: TrustState) => void;

  constructor(mode: "cold" | "rdv", onStateChange?: (state: TrustState) => void) {
    this.mode = mode;
    this.onStateChange = onStateChange;
    this.state = {
      level: mode === "cold" ? 0 : 2,
      phase: "ouverture",
      lastChange: Date.now(),
      evidence: []
    };
  }

  getState(): TrustState {
    return { ...this.state };
  }

  // Analyse le message de l'utilisateur et ajuste le trust
  analyzeUserMessage(message: string): { trustChange: number; reason: string } {
    const msg = message.toLowerCase();
    
    // Triggers positifs (+1)
    if (this.hasPositiveTriggers(msg)) {
      const reason = this.getPositiveReason(msg);
      this.adjustTrust(1, reason);
      return { trustChange: 1, reason };
    }
    
    // Triggers négatifs (-1)
    if (this.hasNegativeTriggers(msg)) {
      const reason = this.getNegativeReason(msg);
      this.adjustTrust(-1, reason);
      return { trustChange: -1, reason };
    }

    return { trustChange: 0, reason: "Pas de changement significatif" };
  }

  private hasPositiveTriggers(msg: string): boolean {
    const positiveTriggers = [
      /reformuler|si je comprends bien|vous dites que/,
      /comment.*fonctionne|pouvez-vous.*expliquer/,
      /quel.*impact|combien.*temps|quelle.*fréquence/,
      /qui.*décide|comment.*processus|quand.*budget/,
      /proposer.*rendez-vous|planifier.*suite/
    ];
    
    return positiveTriggers.some(trigger => trigger.test(msg));
  }

  private hasNegativeTriggers(msg: string): boolean {
    const negativeTriggers = [
      /notre solution|notre produit|nous proposons/,
      /roi garanti|meilleur.*marché|révolutionnaire/,
      /tous.*clients|success stories|témoignages/,
      /présentation.*complète|démonstration.*produit/
    ];
    
    return negativeTriggers.some(trigger => trigger.test(msg));
  }

  private getPositiveReason(msg: string): string {
    if (/reformuler|si je comprends bien/.test(msg)) return "Reformulation active";
    if (/comment.*fonctionne/.test(msg)) return "Question ouverte pertinente";
    if (/quel.*impact/.test(msg)) return "Creuse les enjeux";
    if (/qui.*décide/.test(msg)) return "Qualification décision";
    if (/proposer.*rendez-vous/.test(msg)) return "Propose next step";
    return "Approche consultative";
  }

  private getNegativeReason(msg: string): string {
    if (/notre solution/.test(msg)) return "Pitch produit trop tôt";
    if (/roi garanti/.test(msg)) return "Promesses non crédibles";
    if (/tous.*clients/.test(msg)) return "Arguments génériques";
    if (/présentation.*complète/.test(msg)) return "Approche trop frontale";
    return "Manque d'écoute";
  }

  private adjustTrust(delta: number, reason: string) {
    const maxLevel = this.mode === "cold" ? 5 : 5;
    const minLevel = 0;
    
    const newLevel = Math.max(minLevel, Math.min(maxLevel, this.state.level + delta));
    
    if (newLevel !== this.state.level) {
      this.state.level = newLevel;
      this.state.lastChange = Date.now();
      this.state.evidence.push(`${delta > 0 ? "+" : ""}${delta}: ${reason}`);
      
      // Garder seulement les 5 dernières preuves
      if (this.state.evidence.length > 5) {
        this.state.evidence = this.state.evidence.slice(-5);
      }
      
      this.onStateChange?.(this.getState());
    }
  }

  updatePhase(phase: TrustState["phase"]) {
    if (this.state.phase !== phase) {
      this.state.phase = phase;
      this.onStateChange?.(this.getState());
    }
  }

  // Retourne les informations que Sophie doit révéler selon le niveau de trust
  getRevealedInfo(): string[] {
    const coldReveal = [
      [], // Trust 0: Réponses minimales
      ["Pain points généraux", "Context basique entreprise"], // Trust 1
      ["Cross-device tracking problème", "Attribution fragmentée"], // Trust 2  
      ["Process reporting manuel", "Contraintes techniques"], // Trust 3
      ["Budget 80k€/mois", "Timeline collection printemps"], // Trust 4
      ["Accepte RDV", "2 créneaux proposés"] // Trust 5
    ];

    const rdvReveal = [
      [], [],
      ["KPIs e-commerce", "Parties prenantes", "Contexte métier"], // Trust 2
      ["Pains détaillés attribution", "Risques saisonnalité", "Dépendances équipe"], // Trust 3
      ["Métriques: -30% temps reporting", "ROI attendu", "Critères succès"], // Trust 4
      ["Go POC", "Planning comité validation"] // Trust 5
    ];

    const reveals = this.mode === "cold" ? coldReveal : rdvReveal;
    return reveals[this.state.level] || [];
  }
}