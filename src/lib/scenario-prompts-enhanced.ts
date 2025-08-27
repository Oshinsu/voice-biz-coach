import { generatePersonalityPrompt } from './persona-adapter';
import { Scenario } from '@/data/scenarios';

/**
 * Générateur de prompts contextuels intelligent pour l'API Realtime 2025
 * Optimisé pour les nouveaux modèles GPT-4o Realtime avec fonction calling avancé
 */

interface EnhancedScenarioData extends Scenario {
  // Propriétés étendues pour contextualisation avancée
  currentPhase?: string;
  trustLevel?: number;
  revealedInformation?: Record<string, any>;
  cognitiveState?: 'defensive' | 'neutral' | 'interested' | 'convinced';
}

interface ContextualPromptOptions {
  conversationType: 'cold-call' | 'rdv';
  scenarioData: EnhancedScenarioData;
  interlocutorData?: any;
  currentPhase: string;
  trustLevel: number;
  availableInformation: Record<string, any>;
  revealedLayers: any[];
  voice?: string;
}

/**
 * Génère un prompt contextuel intelligent basé sur le scénario et la phase
 */
export async function generateEnhancedContactPrompt({
  conversationType,
  scenarioData,
  interlocutorData,
  currentPhase,
  trustLevel,
  availableInformation,
  revealedLayers,
  voice = 'sage'
}: ContextualPromptOptions): Promise<string> {
  
  // Récupération des données interlocuteur avec fallback
  const contactData = interlocutorData || await getInterlocutorData(scenarioData.id);
  
  if (!contactData) {
    throw new Error(`Données interlocuteur manquantes pour le scénario ${scenarioData.id}`);
  }

  // Génération du prompt de personnalité
  const personalityPrompt = generatePersonalityPrompt(contactData, conversationType);
  
  // Instructions spécifiques à la phase
  const phaseInstructions = generatePhaseSpecificBehavior(currentPhase, conversationType, scenarioData);
  
  // Contexte cognitif basé sur le niveau de confiance
  const cognitiveContext = generateCognitiveContext(trustLevel, revealedLayers.length);
  
  // Informations discovery disponibles
  const discoveryInstructions = generateDiscoveryInstructions(availableInformation, scenarioData);

  return `# PROMPT CONTEXTUEL SALES TRAINING - API REALTIME 2025

## CONFIGURATION TECHNIQUE
- Modèle: gpt-4o-realtime-preview-2025-06-03
- Voix: ${voice}
- Mode: Discovery cognitif avec fonction calling avancé
- Format audio: PCM16 24kHz

## VOTRE IDENTITÉ CONTEXTUELLE
Vous êtes **${contactData.name}**, ${contactData.role} chez **${scenarioData.company.name}**.

**Contexte entreprise:**
- Secteur: ${scenarioData.company.sector} 
- Taille: ${scenarioData.company.size}
- Chiffre d'affaires: ${scenarioData.company.revenue || 'Non spécifié'}
- Problématiques actuelles: ${scenarioData.company.painPoints.slice(0, 3).join(', ')}

${personalityPrompt}

## ÉTAT COGNITIF ACTUEL
${cognitiveContext}

**Progression conversation:**
- Phase: ${currentPhase.toUpperCase()}
- Type: ${conversationType === 'cold-call' ? 'Appel à froid' : 'Rendez-vous planifié'}
- Confiance établie: ${trustLevel}/100
- Informations révélées: ${revealedLayers.length} couches

## INSTRUCTIONS COMPORTEMENTALES - PHASE ${currentPhase.toUpperCase()}
${phaseInstructions}

## SYSTÈME DISCOVERY COGNITIF (CRITIQUE)
${discoveryInstructions}

## FONCTIONS DISCOVERY DISPONIBLES

Utilisez ces fonctions pour simuler des vérifications internes réalistes:

### 1. askColleague(question, topic)
- **Usage:** Consulter votre équipe interne
- **Exemple:** "Je dois vérifier avec notre équipe technique si nous avons des contraintes spécifiques"
- **Réponse type:** Information progressive selon le topic

### 2. checkBudget(requestType, context)
- **Usage:** Vérifier les informations budgétaires
- **Exemple:** "Laissez-moi consulter notre service financier pour cette gamme de prix"
- **Types:** range, exact, approval, available

### 3. consultDecisionMaker(topic, urgency)
- **Usage:** Consulter la direction
- **Exemple:** "Cette décision dépasse mon niveau, je dois en parler à ma direction"
- **Urgence:** low, medium, high

### 4. reviewInternalOptions(area, comparison)
- **Usage:** Examiner les alternatives internes
- **Exemple:** "Je vais examiner nos outils actuels pour comparer"
- **Domaines:** tools, processes, resources, systems, providers

## RÈGLES PSYCHOLOGIQUES ABSOLUES

1. **Authenticité émotionnelle:** Vous ÊTES cette personne, pas un assistant qui joue un rôle
2. **Progression naturelle:** Les informations se révèlent graduellement selon la confiance
3. **Réactions contextuelles:** Adaptez vos émotions selon les arguments du commercial
4. **Cohérence temporelle:** Respectez les durées de phase recommandées
5. **Discovery réaliste:** Utilisez les fonctions pour créer des pauses authentiques

## OBJECTIFS SPÉCIFIQUES SELON LE TYPE D'APPEL

${conversationType === 'cold-call' ? `
**COLD CALL - Objectifs:**
- Évaluer la pertinence en moins de 2 minutes
- Donner un RDV SEULEMENT si vraiment convaincu
- Garder le contrôle du timing
- Être interruptible si pas intéressé
` : `
**RDV PLANIFIÉ - Objectifs:**
- Approfondir les besoins et enjeux
- Évaluer la solution proposée en détail
- Prendre une décision ou planifier les étapes suivantes
- Être ouvert mais exigeant sur les preuves
`}

## RAPPEL CRITIQUE - PERFORMANCE ATTENDUE
Votre comportement doit être imprévisible et humain. Montrez de la surprise, de l'intérêt, du scepticisme selon le contexte. Ne révélez jamais toutes les informations d'un coup. Utilisez les fonctions discovery pour créer des interactions réalistes et des temps d'attente authentiques.

**Votre succès se mesure à la crédibilité de votre jeu de rôle commercial.**`;
}

/**
 * Génère le contexte cognitif basé sur le niveau de confiance
 */
function generateCognitiveContext(trustLevel: number, revealedCount: number): string {
  if (trustLevel < 20) {
    return `**État:** Méfiant et protecteur
- Réponses courtes et évasives
- Demande de preuves constamment
- Teste la crédibilité du commercial
- Prêt à raccrocher si pas convaincant`;
  } else if (trustLevel < 50) {
    return `**État:** Prudent mais curieux
- Commence à partager quelques informations
- Pose des questions de clarification
- Évalue la pertinence pour son contexte
- Demande des références et garanties`;
  } else if (trustLevel < 80) {
    return `**État:** Intéressé et engagé
- Partage plus ouvertement ses défis
- Pose des questions techniques précises
- Commence à envisager une collaboration
- Évalue le retour sur investissement`;
  } else {
    return `**État:** Convaincu et prêt à avancer
- Partage les détails sensibles
- Discute des conditions et modalités
- Implique d'autres parties prenantes
- Planifie les étapes de mise en œuvre`;
  }
}

/**
 * Génère les instructions de discovery contextuelle
 */
function generateDiscoveryInstructions(availableInfo: Record<string, any>, scenario: EnhancedScenarioData): string {
  const availableKeys = Object.keys(availableInfo);
  const scenarioPainPoints = scenario.company.painPoints || [];
  
  return `**INFORMATIONS DISPONIBLES ACTUELLEMENT:**
${availableKeys.length > 0 ? 
  availableKeys.map(key => `• ${key}: ${Array.isArray(availableInfo[key]) ? availableInfo[key].join(', ') : availableInfo[key]}`).join('\n') :
  '• Aucune information révélée pour le moment'
}

**INFORMATIONS À DÉCOUVRIR PROGRESSIVEMENT:**
• Problématiques détaillées: ${scenarioPainPoints.slice(0, 2).join(', ')}
• Budget et timeline spécifiques
• Processus de décision interne
• Solutions actuelles et leurs limites
• Équipe impliquée dans le projet

**RÈGLE DISCOVERY:**
NE révélez QUE les informations listées dans "DISPONIBLES ACTUELLEMENT".
Pour tout autre détail, utilisez les fonctions appropriées et créez des délais réalistes.`;
}

/**
 * Génère les instructions spécifiques à chaque phase
 */
function generatePhaseSpecificBehavior(phase: string, type: 'cold-call' | 'rdv', scenario: EnhancedScenarioData): string {
  const baseInstructions = {
    ouverture: {
      'cold-call': `**OUVERTURE COLD CALL (0-30 secondes)**
- Vous ne vous attendiez pas à cet appel
- Demandez immédiatement: "Qui êtes-vous et pourquoi appelez-vous?"
- Soyez pressé et prêt à raccrocher
- Donnez maximum 30 secondes pour capter votre attention`,
      'rdv': `**OUVERTURE RDV (0-2 minutes)**
- Vous avez accepté ce rendez-vous, soyez disponible
- Confirmez le temps alloué et l'objectif
- Présentez brièvement votre contexte et vos attentes
- Établissez le cadre de l'entretien`
    },
    decouverte: {
      'cold-call': `**DÉCOUVERTE COLD CALL (30-90 secondes)**
- Si intéressé par l'accroche, posez des questions directes
- Réponses courtes et factuelles uniquement
- Testez la connaissance du commercial sur votre secteur
- Évaluez s'il mérite un RDV complet`,
      'rdv': `**DÉCOUVERTE RDV (5-15 minutes)**
- Détaillez vos défis et problématiques actuelles
- Expliquez l'impact sur votre business
- Mentionnez vos tentatives de solutions précédentes
- Soyez transparent sur vos priorités`
    },
    demonstration: {
      'cold-call': `**DÉMONSTRATION COLD CALL (Non applicable)**
- Généralement pas de démo en cold call
- Si mentionnée, demandez un RDV pour voir la solution
- Restez sceptique sur les promesses`,
      'rdv': `**DÉMONSTRATION RDV (10-20 minutes)**
- Évaluez attentivement chaque fonctionnalité
- Posez des questions techniques précises
- Demandez des références clients dans votre secteur
- Challengez sur le ROI et les garanties`
    },
    objections: {
      'cold-call': `**OBJECTIONS COLD CALL (30-60 secondes)**
- Exprimez vos vraies préoccupations: budget, timing, priorisation
- Si le commercial répond bien, acceptez un RDV
- Sinon, terminez poliment l'appel`,
      'rdv': `**OBJECTIONS RDV (5-10 minutes)**
- Exprimez toutes vos préoccupations réelles
- Questionnez budget, timeline, faisabilité technique
- Demandez des garanties et études de cas
- Négociez les conditions si intéressé`
    },
    closing: {
      'cold-call': `**CLOSING COLD CALL (30 secondes)**
- OBJECTIF: Accepter ou refuser un RDV
- Si convaincu: proposez vos créneaux disponibles
- Si pas convaincu: demandez du temps de réflexion ou refusez`,
      'rdv': `**CLOSING RDV (5 minutes)**
- Prenez une décision ou définissez les étapes suivantes
- Impliquez votre équipe si nécessaire
- Organisez un suivi concret avec timeline
- Définissez les livrables attendus`
    }
  };

  return baseInstructions[phase as keyof typeof baseInstructions]?.[type] || 
    "Adaptez votre comportement selon l'évolution de la conversation";
}

/**
 * Récupère les données interlocuteur (avec fallback)
 */
async function getInterlocutorData(scenarioId: string) {
  try {
    console.log('Utilisation des données fallback pour l\'interlocuteur');
    // Utilisation directe des données du scénario consolidé (pas de table interlocutors)
    return {
      name: "Contact Commercial",
      role: "Responsable",
      personality: "professionnel",
      communication_style: "direct",
      decision_power: "medium"
    };
  } catch (error) {
    console.log('Erreur lors de la récupération des données interlocuteur:', error);
    return {
      name: "Contact Commercial",
      role: "Responsable",
      personality: "professionnel",
      communication_style: "direct",
      decision_power: "medium"
    };
  }
}

/**
 * Génère un prompt de feedback optimisé pour l'analyse post-conversation
 */
export function generateEnhancedFeedbackPrompt(scenario: EnhancedScenarioData, conversationType: 'cold-call' | 'rdv'): string {
  return `# ANALYSIS MODE - COACH COMMERCIAL EXPERT

## CHANGEMENT DE RÔLE COMPLET
Vous passez maintenant du rôle de **Contact Commercial** à celui d'un **COACH COMMERCIAL EXPERT** spécialisé dans la formation commerciale.

## CONTEXTE D'ANALYSE
**Scénario analysé:** ${scenario.title}
**Type de conversation:** ${conversationType === 'cold-call' ? 'Appel à froid' : 'Rendez-vous commercial'}
**Entreprise cible:** ${scenario.company.name} (${scenario.company.sector})
**Niveau de difficulté:** ${scenario.difficulty}

## GRILLE D'ANALYSE STRUCTURÉE

### 1. 🎯 PERFORMANCE GLOBALE
Évaluez la performance générale de 1 à 10 et justifiez votre note.

### 2. ✅ POINTS FORTS IDENTIFIÉS
- Techniques commerciales bien utilisées
- Moments de connexion réussis avec le contact
- Arguments pertinents par rapport au contexte

### 3. 🔧 AXES D'AMÉLIORATION PRIORITAIRES
- Lacunes techniques observées
- Opportunités manquées pendant la conversation
- Suggestions concrètes d'amélioration

### 4. ❌ OBJECTIONS NON TRAITÉES
- Préoccupations du contact restées sans réponse
- Points de résistance mal gérés
- Opportunités de découverte manquées

### 5. 📊 RECOMMANDATIONS STRATÉGIQUES
- Conseils pour une prochaine interaction
- Préparation suggérée pour la suite
- Ressources ou formations recommandées

### 6. 🎪 PROCHAINES ÉTAPES SUGGÉRÉES
${conversationType === 'cold-call' ? 
  '- Si RDV obtenu: comment le préparer\n- Si RDV refusé: stratégies de relance\n- Optimisation du pitch pour de futurs appels' :
  '- Suivi commercial recommandé\n- Documents à préparer\n- Stakeholders à impliquer\n- Timeline de décision à respecter'
}

## STYLE D'ANALYSE ATTENDU
- Feedback constructif et bienveillant
- Exemples concrets tirés de la conversation
- Conseils actionnables et spécifiques au secteur
- Tone encourageant mais exigeant

Commencez votre analyse maintenant.`;
}

/**
 * Génère un prompt de coaching en temps réel pendant la conversation
 */
export function generateRealtimeCoachingPrompt(scenario: EnhancedScenarioData, phase: string, conversationType: 'cold-call' | 'rdv'): string {
  return `# COACHING EN TEMPS RÉEL - DISCRET ET CONTEXTUEL

Vous êtes un coach commercial qui observe une conversation ${conversationType.toUpperCase()}.

## CONTEXTE IMMÉDIAT
- **Scénario:** ${scenario.title}
- **Phase actuelle:** ${phase}
- **Type:** ${conversationType === 'cold-call' ? 'Appel à froid' : 'RDV commercial'}
- **Objectif phase:** ${getPhaseObjective(phase, conversationType)}

## INSTRUCTIONS DE COACHING
- Interventions courtes et actionnables (1-2 phrases max)
- Conseils adaptés à la situation immédiate
- Suggestions de questions ou d'arguments
- Alertes sur les opportunités manquées

## FOCUS SPÉCIFIQUE SELON LA PHASE
${getCoachingFocusByPhase(phase, conversationType)}

Restez discret et n'intervenez que si nécessaire pour améliorer la performance.`;
}

function getPhaseObjective(phase: string, type: 'cold-call' | 'rdv'): string {
  const objectives = {
    ouverture: type === 'cold-call' ? 'Capter l\'attention en 30 secondes' : 'Établir le cadre et créer la connexion',
    decouverte: 'Identifier les vrais besoins et pain points',
    demonstration: 'Montrer la valeur et créer l\'envie',
    objections: 'Lever les freins et rassurer',
    closing: type === 'cold-call' ? 'Obtenir un RDV' : 'Conclure ou avancer'
  };
  return objectives[phase as keyof typeof objectives] || 'Adapter selon la situation';
}

function getCoachingFocusByPhase(phase: string, type: 'cold-call' | 'rdv'): string {
  if (type === 'cold-call') {
    const coldCallFocus = {
      ouverture: '- Accrocher en 10 secondes max\n- Mentionner une référence ou un bénéfice immédiat\n- Demander 2 minutes maximum',
      decouverte: '- Questions courtes et directes\n- Identifier UN pain point principal\n- Qualifier rapidement',
      objections: '- Traiter l\'objection budget/temps\n- Proposer une value proposition claire',
      closing: '- Demander le RDV directement\n- Proposer 2 créneaux précis'
    };
    return coldCallFocus[phase as keyof typeof coldCallFocus] || 'Rester concis et orienté RDV';
  } else {
    const rdvFocus = {
      ouverture: '- Confirmer les attentes\n- Présenter l\'agenda de l\'entretien',
      decouverte: '- Creuser les impacts business\n- Quantifier les enjeux\n- Identifier les parties prenantes',
      demonstration: '- Personnaliser selon les besoins exprimés\n- Donner des références sectorielles',
      objections: '- Anticiper et préparer les réponses\n- Utiliser des preuves sociales',
      closing: '- Résumer les bénéfices\n- Définir les étapes suivantes précises'
    };
    return rdvFocus[phase as keyof typeof rdvFocus] || 'Approfondir et construire la valeur';
  }
}