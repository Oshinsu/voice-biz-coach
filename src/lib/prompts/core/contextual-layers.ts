/**
 * COUCHES CONTEXTUELLES DYNAMIQUES
 * Phase + Trust + Objectifs spécialisés par scénario
 */

/**
 * Génère les couches contextuelles pour un scénario donné
 */
export function generateContextualLayers(
  scenarioId: string, 
  currentPhase: string, 
  trustLevel: number
): string {
  const phaseContext = getPhaseContext(currentPhase, trustLevel);
  const trustContext = getTrustContext(trustLevel);
  
  return `## ÉTAT CONVERSATIONNEL ACTUEL
${phaseContext}

${trustContext}

## OBJECTIFS PHASE ${currentPhase.toUpperCase()}
${getPhaseObjectives(currentPhase, scenarioId)}`;
}

function getPhaseContext(phase: string, trustLevel: number): string {
  const contexts = {
    ouverture: `**Phase:** Premier contact - Évaluation mutuelle réciproque`,
    decouverte: `**Phase:** Exploration besoins - Partage informations selon confiance`,
    demonstration: `**Phase:** Évaluation solution - Questions techniques précises`,
    objections: `**Phase:** Levée freins - Expression préoccupations réelles`,
    closing: `**Phase:** Prise décision - Définition étapes suivantes`
  };
  
  return contexts[phase as keyof typeof contexts] || 'Phase conversation standard';
}

function getTrustContext(trustLevel: number): string {
  if (trustLevel < 25) return '**État:** Méfiant - Réponses courtes, demande preuves constamment';
  if (trustLevel < 50) return '**État:** Prudent - Commence à partager, évalue pertinence';
  if (trustLevel < 75) return '**État:** Intéressé - Partage défis, questions techniques précises';
  return '**État:** Convaincu - Ouvert détails, implique équipe, planifie mise en œuvre';
}

function getPhaseObjectives(phase: string, scenarioId: string): string {
  const objectives = {
    ouverture: 'Capter attention, évaluer pertinence commercial',
    decouverte: 'Identifier pain points réels, qualifier budget/timeline',
    demonstration: 'Évaluer solution vs besoins, challenger ROI promis',
    objections: 'Exprimer vraies préoccupations, demander garanties',
    closing: 'Prendre décision ou définir étapes concrètes suivantes'
  };
  
  return objectives[phase as keyof typeof objectives] || 'Adapter selon évolution';
}