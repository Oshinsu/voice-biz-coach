/**
 * SYSTÈME DISCOVERY INTELLIGENT
 * Functions contextuelles pour réalisme conversationnel
 */

import { consolidatedScenarios } from '@/data/scenarios';

/**
 * Génère le système de discovery functions pour un scénario
 */
export function generateDiscoverySystem(scenarioId: string, trustLevel: number): string {
  return `## DISCOVERY FUNCTIONS CONTEXTUELLES

### askColleague(question, expertise)
**Contextes ${scenarioId}:**
- "Laisse-moi demander à notre équipe ${getTeamExpertise(scenarioId)}"
- "Je dois consulter notre expert ${getPainPointExpertise(scenarioId)}"

### checkBudget(requestType, amount)  
**Budget contexte:** ${getBudgetContext(scenarioId)}
**Cycle décision:** ${getDecisionCycle(scenarioId)}

### consultDecisionMaker(topic, urgency)
**Décideurs impliqués:** ${getStakeholders(scenarioId)}

### reviewInternalOptions(area)
**Solutions actuelles:** ${getCurrentSolutions(scenarioId)}

## RÈGLE RÉVÉLATION PROGRESSIVE
Trust ${trustLevel}/100: ${getRevealationRule(trustLevel)}`;
}

// Helpers pour contexte spécialisé par scénario
function getTeamExpertise(scenarioId: string): string {
  const expertises = {
    'kpi-performance': 'technique (Thomas CTO)',
    'fintech-startup': 'compliance (équipe risk)',
    'cybersecurity-consulting': 'SOC (analystes sécurité)',
    'saas-hr-tool': 'product (équipe UX)',
    'digital-agency': 'delivery (chef de projet)',
    'retail-personalization': 'IT (équipe système)',
    'industrial-marketplace': 'procurement (sourcing)',
    'manufacturing-iot': 'production (ingénieurs process)'
  };
  
  return expertises[scenarioId as keyof typeof expertises] || 'interne';
}

function getPainPointExpertise(scenarioId: string): string {
  const painPoints = {
    'kpi-performance': 'analytics/attribution',
    'fintech-startup': 'fraude/compliance',
    'cybersecurity-consulting': 'threat intel/SOC',
    'saas-hr-tool': 'people analytics/UX',
    'digital-agency': 'client success/delivery',
    'retail-personalization': 'personalization/CRM',
    'industrial-marketplace': 'sourcing/supply chain',
    'manufacturing-iot': 'maintenance prédictive/OEE'
  };
  
  return painPoints[scenarioId as keyof typeof painPoints] || 'métier';
}

function getBudgetContext(scenarioId: string): string {
  const budgets = {
    'kpi-performance': '15-40k€/an (validation Sophie + Clara)',
    'fintech-startup': '200-400k€ (sécurité critique)',
    'cybersecurity-consulting': '800k€-1.2M€ (budget sécurité)',
    'saas-hr-tool': '150-250k€ (people ops)',
    'digital-agency': '50-150k€ (outils productivité)',
    'retail-personalization': '200-500k€ (transformation digitale)',
    'industrial-marketplace': '200-500k€ (digitalisation achats)',
    'manufacturing-iot': '300-800k€ (Industry 4.0)'
  };
  
  return budgets[scenarioId as keyof typeof budgets] || 'Budget à qualifier';
}

function getDecisionCycle(scenarioId: string): string {
  const cycles = {
    'kpi-performance': '2-3 mois (urgence campagne mars)',
    'fintech-startup': '3-6 mois (POC compliance)',
    'cybersecurity-consulting': '6-12 mois (audit sécurité)',
    'saas-hr-tool': '2-4 mois (urgence hypercroissance)',
    'digital-agency': '1-2 mois (productivité immédiate)',
    'retail-personalization': '3-6 mois (test magasins pilotes)',
    'industrial-marketplace': '6-12 mois (process établis)',
    'manufacturing-iot': '3-9 mois (impact production)'
  };
  
  return cycles[scenarioId as keyof typeof cycles] || 'Timeline standard';
}

function getStakeholders(scenarioId: string): string {
  const stakeholders = {
    'kpi-performance': 'Sophie (décideur), Clara CEO (approval budget), Thomas CTO (validation technique)',
    'fintech-startup': 'Marie CTO (décideur), CEO (approval), Risk Officer (validation)',
    'cybersecurity-consulting': 'David CISO (décideur), CEO (budget), IT (implémentation)',
    'saas-hr-tool': 'Sarah DRH (décideur), CEO (validation), IT (technique)',
    'digital-agency': 'Julien CEO (décideur), COO (opérationnel), Équipe (adoption)',
    'retail-personalization': 'Philippe Digital (décideur), CEO (budget), IT/Stores (déploiement)',
    'industrial-marketplace': 'Michel Achats (décideur), CEO (validation), ERP/IT (technique)',
    'manufacturing-iot': 'Laurent Production (décideur), CEO (budget), IT/Maintenance (technique)'
  };
  
  return stakeholders[scenarioId as keyof typeof stakeholders] || 'Équipe décision';
}

function getCurrentSolutions(scenarioId: string): string {
  const solutions = {
    'kpi-performance': 'GA4 + Meta Business + Excel (consolidation manuelle)',
    'fintech-startup': 'Solutions internes + outils legacy banking',
    'cybersecurity-consulting': 'SIEM basique + outils ponctuels',
    'saas-hr-tool': 'SIRH basique + spreadsheets + outils dispersés',
    'digital-agency': 'Outils séparés project management + time tracking',
    'retail-personalization': 'CRM basique + segments manuels',
    'industrial-marketplace': 'ERP + négociation manuelle + Excel',
    'manufacturing-iot': 'GMAO traditionnel + maintenance préventive'
  };
  
  return solutions[scenarioId as keyof typeof solutions] || 'Solutions actuelles';
}

function getRevealationRule(trustLevel: number): string {
  if (trustLevel < 25) return 'Informations générales uniquement, méfiance sur détails';
  if (trustLevel < 50) return 'Commence à partager défis, évalue pertinence solution';
  if (trustLevel < 75) return 'Partage détails opérationnels, questions techniques précises';
  return 'Ouvert sur stratégie, budget, timeline, implique équipe décision';
}