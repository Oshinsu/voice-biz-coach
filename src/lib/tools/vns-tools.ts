import { z } from "zod";

export const logEvent = {
  name: "log_event",
  description: "Journaliser un moment clé pendant la session.",
  parameters: z.object({
    t: z.number().describe("timestamp sec"),
    phase: z.enum(["ouverture","decouverte","objections","closing"]),
    note: z.string()
  })
};

export const scoreTurn = {
  name: "score_turn", 
  description: "Scorer le tour de l'élève (0–5) par compétence.",
  parameters: z.object({
    t: z.number(),
    skills: z.object({
      ouverture: z.number().min(0).max(5),
      ecoute_active: z.number().min(0).max(5),
      decouverte: z.number().min(0).max(5),
      objections: z.number().min(0).max(5),
      next_step: z.number().min(0).max(5)
    }),
    evidence: z.array(z.string()).describe("citations brèves"),
  })
};

export const endSession = {
  name: "end_session",
  description: "Clôturer la session et produire le rapport final.",
  parameters: z.object({
    summary_1line: z.string(),
    actions_3: z.array(z.string()).length(3),
    overall: z.number().min(0).max(5)
  })
};

export interface VNSReport {
  scenario: "cold_call" | "rdv";
  scores: {
    ouverture: number;
    ecoute_active: number;
    decouverte: number;
    objections: number;
    next_step: number;
    overall: number;
  };
  moments_cles: Array<{
    t: number;
    phase: "ouverture" | "decouverte" | "objections" | "closing";
    note: string;
  }>;
  recap_1_phrase: string;
  actions_3: string[];
}