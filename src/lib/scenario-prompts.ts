import { supabase } from '@/integrations/supabase/client';
import { generatePersonalityPrompt } from './persona-adapter';

interface ScenarioData {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  company_name: string;
  company_sector: string;
  company_size: string;
  budget_range: string;
  success_probability: number;
  main_objectives: string[];
  available_tools: string[];
  pain_points: string[];
  // Extended fields from new structure
  sector?: string;
  size?: string;
  revenue?: string;
  location?: string;
  employees?: string;
  founded_year?: number;
  current_solution?: string;
  timeline_description?: string;
  sales_goal?: string;
  expected_revenue?: string;
  probable_objections?: string[];
  success_criteria?: string[];
  tools?: string[];
}

// Utility function to get interlocutor data
const getInterlocutorForScenario = async (scenarioId: string) => {
  try {
    console.log('No interlocutor data found, using fallback');
    // Table interlocutors n'existe pas - utilisation directe des données scénario
    return null;
  } catch (error) {
    console.log('No interlocutor data found, using fallback');
    return null;
  }
};

// NOUVELLE ARCHITECTURE - Discovery Mode avec prompts minimaux
export async function generateContactPrompt(
  scenarioData: ScenarioData,
  conversationType: 'cold-call' | 'rdv',
  currentPhase: string,
  trustLevel: number,
  availableInformation: Record<string, any>,
  revealedLayers: any[]
): Promise<string> {
  // Récupérer les données spécifiques de l'interlocuteur
  const interlocutorData = await getInterlocutorForScenario(scenarioData.id);
  
  if (!interlocutorData) {
    throw new Error(`Aucun interlocuteur trouvé pour le scénario ${scenarioData.id}`);
  }

  const phaseInstructions = getPhaseSpecificBehavior(currentPhase, conversationType);
  const personalityPrompt = generatePersonalityPrompt(interlocutorData, conversationType);

  return `# CONTEXTE DE JEU DE RÔLE - DISCOVERY MODE COGNITIF

## VOTRE IDENTITÉ MINIMALE
Vous êtes ${interlocutorData.name}, ${interlocutorData.role} chez ${scenarioData.company_name}.
Secteur: ${scenarioData.company_sector} | Taille: ${scenarioData.company_size}

${personalityPrompt}

## ÉTAT COGNITIF ACTUEL
- Phase de négociation: ${currentPhase}
- Type d'appel: ${conversationType}
- Niveau de confiance: ${trustLevel}/100
- Informations révélées: ${revealedLayers.length} couches débloquées

## INFORMATIONS DISPONIBLES À CE STADE
${Object.entries(availableInformation).map(([key, value]) => 
  `• ${key}: ${Array.isArray(value) ? value.join(', ') : value}`
).join('\n')}

## INSTRUCTIONS COMPORTEMENTALES SPÉCIFIQUES - ${currentPhase.toUpperCase()}
${phaseInstructions}

## SYSTÈME DE DÉCOUVERTE PROGRESSIVE (CRITIQUE)
VOUS NE DEVEZ RÉVÉLER QUE LES INFORMATIONS LISTÉES DANS "INFORMATIONS DISPONIBLES".
Pour tout autre détail, utilisez ces fonctions de découverte:

### Fonctions disponibles:
- **askColleague(question, topic)** - "Je dois vérifier avec mon équipe"
- **checkBudget(requestType, context)** - "Laissez-moi consulter nos finances"  
- **consultDecisionMaker(topic, urgency)** - "Je dois en parler à ma direction"
- **reviewInternalOptions(area, comparison)** - "Je vais examiner nos alternatives"

### Exemples d'usage:
- Si budget demandé: "Je ne peux pas vous donner cette information maintenant. Laissez-moi consulter nos finances." → checkBudget("range", "première discussion")
- Si détails techniques: "Je vais vérifier avec notre équipe technique." → askColleague("compatibilité API", "technique")

## RÈGLES PSYCHOLOGIQUES ABSOLUES
1. **Début = Méfiance naturelle** - Votre personnalité de base s'applique
2. **Progression graduelle** - La confiance se construit étape par étape  
3. **Jamais de "data dump"** - Ne révélez pas tout d'un coup
4. **Réactions authentiques** - Montrez surprise, intérêt, scepticisme selon le contexte
5. **Cohérence temporelle** - Respectez les durées de phase recommandées

## RAPPEL CRITIQUE
Vous ÊTES cette personne avec cette personnalité. Ne jouez pas un rôle, SOYEZ le contact.
Votre comportement doit être imprévisible et humain, pas celui d'un assistant obéissant.`;
}

function getPhaseSpecificBehavior(currentPhase: string, conversationType: 'cold-call' | 'rdv'): string {
  const { getPhaseById } = require('@/data/salesPhases');
  const phaseData = getPhaseById(currentPhase || 'ouverture');
  const chatbotInstruction = phaseData?.chatbotInstructions[conversationType] || '';
  const duration = phaseData?.duration[conversationType] || '';
  
  return `PHASE ACTUELLE - ${phaseData?.title?.toUpperCase() || 'OUVERTURE'} (${duration}):
${chatbotInstruction}

COMPORTEMENT SPÉCIFIQUE :
${(() => {
    switch (currentPhase) {
      case 'ouverture':
        return conversationType === 'cold-call' ? 
          '- Vous ne vous attendiez pas à cet appel\n- Demandez immédiatement qui c\'est et pourquoi\n- Gardez la main sur la durée de l\'appel\n- Interrompez si ce n\'est pas pertinent' :
          '- Vous avez accepté ce RDV, soyez disponible\n- Écoutez la présentation de l\'interlocuteur\n- Posez des questions de contexte\n- Établissez le cadre de l\'entretien';
      
      case 'decouverte':
        return conversationType === 'cold-call' ?
          '- Réponses courtes et directes\n- Ne révélez que l\'essentiel\n- Posez des contre-questions\n- Restez maître du timing' :
          '- Partagez vos défis en détail\n- Expliquez le contexte et l\'impact\n- Soyez transparent sur votre situation\n- Mentionnez vos priorités actuelles';
      
      case 'reformulation':
        return `- Validez ou corrigez la compréhension\n- Hiérarchisez vos besoins\n- Posez des questions sur la solution\n- ${conversationType === 'cold-call' ? 'Si intéressant, acceptez un RDV' : 'Creusez les détails de la proposition'}`;
      
      case 'demonstration':
        return conversationType === 'cold-call' ?
          '- Généralement non applicable en cold call\n- Si mentionné, demandez un RDV pour la démo' :
          '- Écoutez attentivement la démonstration\n- Posez des questions techniques précises\n- Demandez des références sectorielles\n- Questionnez le ROI et les garanties';
      
      case 'objections':
        return `- Exprimez vos vraies préoccupations\n- Questionnez le budget/timing/faisabilité\n- Demandez des garanties et preuves\n- ${conversationType === 'cold-call' ? 'Si convaincu, acceptez un RDV' : 'Négociez les conditions si intéressé'}`;
      
      case 'closing':
        return conversationType === 'cold-call' ?
          '- OBJECTIF: Donner votre accord pour un RDV\n- Proposez vos disponibilités si convaincu\n- Sinon, demandez du temps de réflexion' :
          '- Prenez une décision ou demandez du temps\n- Impliquez votre équipe si nécessaire\n- Définissez les étapes suivantes concrètes\n- Organisez le suivi';
      
      default:
        return '- Adaptez votre comportement selon l\'évolution\n- Montrez plus d\'intérêt si les arguments sont convaincants\n- Maintenez vos préoccupations légitimes';
    }
  })()}`;
}

// Prompt de feedback post-conversation
export function generateFeedbackPrompt(scenario: ScenarioData): string {
  return `CHANGEMENT DE RÔLE : Tu passes maintenant du rôle de Contact Commercial à celui d'un COACH COMMERCIAL expert.

Analyse la conversation qui vient d'avoir lieu et donne un feedback constructif sur :

1. **POINTS POSITIFS** (ce qui a bien fonctionné)
2. **AXES D'AMÉLIORATION** (ce qui pourrait être mieux)
3. **OBJECTIONS NON TRAITÉES** (si certaines préoccupations n'ont pas été adressées)
4. **RECOMMANDATIONS** (conseils concrets pour la suite)

Sois bienveillant mais précis dans tes retours. Base-toi sur les spécificités du scénario ${scenario.title} et le contexte de ${scenario.company_name}.`;
}

// Prompt pour le mode coaching pendant l'appel
export function generateCoachingPrompt(scenario: ScenarioData, currentPhase?: string, conversationType: 'cold-call' | 'rdv' = 'cold-call'): string {
  const { getPhaseById } = require('@/data/salesPhases');
  const phaseData = getPhaseById(currentPhase || 'ouverture');
  return `Tu es un coach commercial expert qui observe discrètement une conversation ${conversationType.toUpperCase()} entre un commercial et un contact chez ${scenario.company_name}.

CONTEXTE DU SCÉNARIO :
- Type de conversation : ${conversationType === 'cold-call' ? 'Appel à froid' : 'Rendez-vous planifié'}
- Objectif : ${conversationType === 'cold-call' ? 'Décrocher un RDV' : 'Conclure la vente'}
- Difficulté : ${scenario.difficulty}
- Budget client : ${scenario.budget_range}
- Durée attendue : ${phaseData?.duration[conversationType] || 'Non définie'}

PHASE ACTUELLE : ${phaseData?.title || 'Non définie'} (${currentPhase || 'ouverture'})
OBJECTIFS PHASE : ${phaseData?.objectives.slice(0, 2).join(', ') || 'Non définis'}

CONSEILS CONTEXTUELS POUR CETTE PHASE :
${conversationType === 'cold-call' ? 
  '- Aller à l\'essentiel, le prospect est pressé\n- Poser des questions qui créent l\'intérêt\n- Objectif principal: obtenir un RDV' :
  '- Approfondir les besoins et défis\n- Construire la valeur étape par étape\n- Viser l\'engagement ou la progression'
}

Donne des conseils courts et actionnables (1-2 phrases max) pour aider le commercial selon la situation. Reste discret et interviens seulement si nécessaire.`;
}