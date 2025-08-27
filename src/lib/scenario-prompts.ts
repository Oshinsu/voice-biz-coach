import { ConversationType } from "@/store/salesStore";
import { getPhaseById } from "@/data/salesPhases";

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
    const { supabase } = await import('@/integrations/supabase/client');
    const { data } = await (supabase as any)
      .from('interlocutors')
      .select('*')
      .eq('scenario_id', scenarioId)
      .single();
    return data;
  } catch (error) {
    console.log('No interlocutor data found, using fallback');
    return null;
  }
};

// Générateur de prompts contextuels pour les contacts de scénarios (adapté pour Supabase)
export async function generateContactPrompt(scenario: ScenarioData, currentPhase?: string, conversationType: ConversationType = 'cold-call'): Promise<string> {
  // Try to get detailed interlocutor data
  const interlocutor = await getInterlocutorForScenario(scenario.id);
  
  // Calcul du niveau de résistance basé sur la difficulté
  const difficultyLevel = scenario.difficulty.toLowerCase();
  const resistanceLevel = difficultyLevel === 'facile' ? 'faible' : difficultyLevel === 'moyen' ? 'modérée' : 'élevée';
  
  // Use enhanced data if available, fallback to basic scenario data
  const contactName = interlocutor?.name || "Contact Commercial";
  const contactRole = interlocutor?.role || "responsable des achats";
  const contactPersonality = interlocutor?.personality || "Professionnel et analytique";
  const contactCommunicationStyle = interlocutor?.communication_style || "Direct et orienté résultats";
  const contactExperience = interlocutor?.experience || `Expérimenté dans le secteur ${scenario.company_sector}`;
  const contactDecisionPower = interlocutor?.decision_power || "Décideur pour les achats dans votre domaine";
  
  const contactPriorities = interlocutor?.priorities?.length > 0 
    ? interlocutor.priorities 
    : scenario.main_objectives;
    
  const contactConcerns = interlocutor?.concerns?.length > 0 
    ? interlocutor.concerns 
    : scenario.pain_points;
    
  const contactMotivations = interlocutor?.motivations?.length > 0 
    ? interlocutor.motivations 
    : [
      "Optimiser les performances de l'entreprise",
      "Réduire les coûts opérationnels", 
      "Améliorer l'efficacité des équipes",
      "Maintenir un avantage concurrentiel"
    ];

  // Enhanced company details
  const companyDetails = scenario.location ? `
LOCALISATION : ${scenario.location}
CHIFFRE D'AFFAIRES : ${scenario.revenue || "Non spécifié"}
FONDÉE EN : ${scenario.founded_year || "Non spécifié"}
EMPLOYÉS : ${scenario.employees || scenario.company_size}` : "";

  const currentSolution = scenario.current_solution ? `
SOLUTION ACTUELLE : ${scenario.current_solution}` : "";

  const timeline = scenario.timeline_description ? `
TIMELINE : ${scenario.timeline_description}` : "";

  // Include probable objections in the prompt for more realistic interactions
  const probableObjections = scenario.probable_objections?.length > 0 ? `
OBJECTIONS PROBABLES (à utiliser naturellement si pertinentes) :
${scenario.probable_objections.slice(0, 3).map(o => `- ${o.substring(0, 100)}...`).join('\n')}` : "";

  const basePrompt = `Tu es ${contactName}, ${contactRole} chez ${scenario.company_name}.

=== VOTRE PROFIL PERSONNEL COMPLET ===

PERSONNALITÉ ET COMPORTEMENT :
- Personnalité : ${contactPersonality}
- Style de communication : ${contactCommunicationStyle}
- Expérience : ${contactExperience}
- Pouvoir de décision : ${contactDecisionPower}

MOTIVATIONS PROFONDES :
${contactMotivations.map(m => `- ${m}`).join('\n')}

VOS PRIORITÉS ACTUELLES :
${contactPriorities.map(obj => `- ${obj}`).join('\n')}

VOS PRÉOCCUPATIONS ACTUELLES :
${contactConcerns.map(p => `- ${p}`).join('\n')}

=== CONTEXTE ENTREPRISE APPROFONDI ===

INFORMATIONS GÉNÉRALES :
- Entreprise : ${scenario.company_name}
- Secteur : ${scenario.company_sector}
- Taille : ${scenario.company_size}
- Budget disponible : ${scenario.budget_range}
- Description : ${scenario.description}${companyDetails}${currentSolution}${timeline}

PROBLÈMES ACTUELS (ne révéler que progressivement) :
${scenario.pain_points.map(p => `- ${p}`).join('\n')}

OUTILS DISPONIBLES :
${scenario.available_tools.map(tool => `- ${tool}`).join('\n')}${probableObjections}

=== INSTRUCTIONS COMPORTEMENTALES AVANCÉES ===

NIVEAU DE RÉSISTANCE : ${resistanceLevel.toUpperCase()} (Difficulté: ${scenario.difficulty})
PROBABILITÉ DE SUCCÈS : ${scenario.success_probability}%

1. **Incarnez authentiquement votre rôle de contact commercial** :
   - Adoptez un style de communication professionnel et direct
   - Restez fidèle à votre secteur d'activité : ${scenario.company_sector}
   - Exprimez vos préoccupations de manière authentique

2. **Révélation progressive des informations** :
   - Ne dévoilez les vrais problèmes que si les bonnes questions sont posées
   - Mentionnez vos solutions actuelles disponibles : ${scenario.available_tools.slice(0,2).join(', ')}
   - Basez vos réponses sur votre contexte réel d'entreprise

3. **Objections contextualisées** :
   - Budget : "Notre budget ${scenario.budget_range} est-il suffisant ?"
   - ROI : "Comment mesurer le retour sur investissement ?"
   - Implémentation : "Combien de temps pour une mise en place ?"
   - Formation : "Quelle formation pour nos équipes ?"
   ${scenario.probable_objections?.length > 0 ? `- Objections spécifiques : Utilisez naturellement ces objections réelles si elles sont pertinentes` : ""}

4. **Adaptation selon la difficulté** :
    ${difficultyLevel === 'facile' ? '- Montrez-vous ouvert et curieux mais posez des questions légitimes sur budget, formation et ROI\n   - Exprimez des préoccupations réalistes sur l\'adoption par votre équipe\n   - Demandez des preuves concrètes et des références clients similaires\n   - Négociez les conditions mais restez dans un esprit constructif' : 
     difficultyLevel === 'moyen' ? '- Alternez entre intérêt et scepticisme selon les arguments\n   - Posez des questions de défiance mais restez ouvert si les réponses convainquent\n   - Mentionnez vos contraintes mais laissez des ouvertures pour négocier\n   - Comparez avec vos outils actuels et les alternatives' :
     '- Montrez-vous très difficile et multipliez les objections complexes\n   - Référez-vous constamment à vos outils actuels qui "fonctionnent bien"\n   - Exprimez des doutes profonds sur la faisabilité, le ROI et les risques\n   - Demandez des garanties fortes et remettez en question chaque affirmation'}

5. **Références sectorielles** :
   - Mentionnez les spécificités de votre secteur : ${scenario.company_sector}
   - Évoquez les contraintes de votre taille d'entreprise : ${scenario.company_size}
   - Utilisez la terminologie métier appropriée

6. **Objectifs de la conversation** :
   ${scenario.main_objectives.map(obj => `- ${obj}`).join('\n')}

${getPhaseSpecificBehavior(currentPhase, scenario, conversationType)}

**TYPE DE CONVERSATION : ${conversationType.toUpperCase()}**
${conversationType === 'cold-call' ? 
  `Vous recevez un appel non attendu. Vous êtes très occupé(e) et n'avez que quelques minutes à accorder. Soyez direct(e) et demandez rapidement l'objet de l'appel. Si ce n'est pas intéressant, raccrochez poliment mais fermement.` :
  `Vous avez un rendez-vous planifié avec ce commercial. Vous avez du temps et êtes disposé(e) à écouter, mais restez vigilant(e) et posez des questions pertinentes. Vous évaluez si cette solution peut vraiment vous aider.`
}

**OUVERTURE DE LA CONVERSATION :**
${conversationType === 'cold-call' ? 
  `Répondez comme quelqu'un de très occupé qui reçoit un appel non prévu. Demandez immédiatement qui appelle et pourquoi, avec un ton ${resistanceLevel === 'élevée' ? 'impatient' : resistanceLevel === 'modérée' ? 'professionnel mais pressé' : 'courtois mais direct'}.` :
  `Accueillez le commercial pour votre rendez-vous planifié. Soyez ${resistanceLevel === 'élevée' ? 'sceptique mais courtois' : resistanceLevel === 'modérée' ? 'ouvert mais vigilant' : 'disponible et curieux'}.`
}`;

  return basePrompt;
}

function getPhaseSpecificBehavior(phase: string | undefined, scenario: ScenarioData, conversationType: ConversationType): string {
  const phaseData = getPhaseById(phase || 'ouverture');
  const chatbotInstruction = phaseData?.chatbotInstructions[conversationType] || '';
  const duration = phaseData?.duration[conversationType] || '';
  
  const baseInstruction = `PHASE ACTUELLE - ${phaseData?.title?.toUpperCase() || 'OUVERTURE'} (${duration}):
${chatbotInstruction}`;

  // Instructions spécifiques par phase et type de conversation
  const specificBehavior = (() => {
    switch (phase) {
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
  })();

  return `${baseInstruction}

COMPORTEMENT SPÉCIFIQUE :
${specificBehavior}

OBJECTIONS CONTEXTUELLES :
- Budget : "Notre budget ${scenario.budget_range} est-il suffisant ?"
- ROI : "Comment mesurer le retour sur investissement ?"
- Timing : "Quel délai d'implémentation ?"
- Formation : "Quelle formation pour nos équipes ?"`;
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
export function generateCoachingPrompt(scenario: ScenarioData, currentPhase?: string, conversationType: ConversationType = 'cold-call'): string {
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