export interface Scenario {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  mockData: Record<string, any>;
  probableObjections: string[];
  successCriteria: string[];
  tools: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "kpi-performance",
    title: "KPI Performance",
    description: "Définir et piloter les indicateurs clés : CTR, CPC, CPA, LTV, CAC payback",
    objectives: [
      "Analyser les performances actuelles",
      "Identifier les KPI critiques",
      "Proposer des optimisations",
      "Définir un plan d'action"
    ],
    mockData: {
      impressions: 50000,
      clics: 1500,
      conversions: 75,
      cout_total: 3000,
      ltv: 450,
      periode: "30 jours"
    },
    probableObjections: [
      "Ces métriques ne reflètent pas notre réalité",
      "Nos KPI actuels nous conviennent",
      "C'est trop complexe à mettre en place",
      "Le ROI n'est pas évident"
    ],
    successCriteria: [
      "KPI prioritaires identifiés",
      "Plan de mesure défini",
      "Outils de suivi proposés",
      "Objectifs chiffrés validés"
    ],
    tools: ["calc_kpi", "score_phase"]
  },
  {
    id: "ca-benefice",
    title: "CA & Bénéfice",
    description: "Calcul CA, marge brute, marge nette, seuil de rentabilité",
    objectives: [
      "Analyser la structure de coûts",
      "Calculer les marges",
      "Déterminer le seuil de rentabilité",
      "Projeter la croissance"
    ],
    mockData: {
      prix_unitaire: 150,
      qte_mensuelle: 200,
      cout_unitaire: 90,
      frais_fixes: 8000,
      taux_croissance: 15
    },
    probableObjections: [
      "Nos marges sont déjà optimisées",
      "Ces calculs sont trop théoriques",
      "Notre modèle économique est différent",
      "Le marché ne permet pas ces prix"
    ],
    successCriteria: [
      "Structure de coûts clarifiée",
      "Marges optimisées identifiées",
      "Seuil de rentabilité défini",
      "Plan de croissance validé"
    ],
    tools: ["calc_ca_benef", "score_phase"]
  },
  {
    id: "etude-marche",
    title: "Étude de marché",
    description: "Taille marché (TAM/SAM/SOM), concurrence, pricing, canaux",
    objectives: [
      "Dimensionner le marché accessible",
      "Analyser la concurrence",
      "Définir la stratégie pricing",
      "Identifier les canaux optimaux"
    ],
    mockData: {
      tam: "2.5 milliards €",
      sam: "150 millions €",
      som: "15 millions €",
      concurrents_directs: 8,
      part_marche_cible: 3,
      canaux: ["digital", "partenaires", "direct"]
    },
    probableObjections: [
      "Le marché est trop saturé",
      "Ces chiffres sont surévalués",
      "La concurrence est trop forte",
      "Nos canaux actuels suffisent"
    ],
    successCriteria: [
      "Marché adressable quantifié",
      "Positionnement concurrentiel défini",
      "Stratégie pricing validée",
      "Mix canaux optimisé"
    ],
    tools: ["make_swot", "make_pestel", "score_phase"]
  },
  {
    id: "swot-analysis",
    title: "SWOT",
    description: "Forces/faiblesses/opportunités/menaces par secteur",
    objectives: [
      "Identifier les forces internes",
      "Reconnaître les faiblesses",
      "Saisir les opportunités",
      "Anticiper les menaces"
    ],
    mockData: {
      secteur: "SaaS B2B",
      taille_entreprise: "50-200 employés",
      region: "France",
      maturite: "Scale-up"
    },
    probableObjections: [
      "Nous connaissons déjà nos forces",
      "Cette analyse est trop générale",
      "Nos faiblesses sont temporaires",
      "Le marché évolue trop vite"
    ],
    successCriteria: [
      "SWOT complète et réaliste",
      "Priorités stratégiques définies",
      "Plan d'action par axe",
      "Indicateurs de suivi"
    ],
    tools: ["make_swot", "score_phase"]
  },
  {
    id: "pestel-analysis",
    title: "PESTEL",
    description: "Macro-facteurs + impact sur la proposition de valeur",
    objectives: [
      "Analyser l'environnement macro",
      "Identifier les facteurs d'influence",
      "Évaluer les impacts business",
      "Adapter la stratégie"
    ],
    mockData: {
      secteur: "FinTech",
      region: "Europe",
      horizon: "3 ans",
      facteurs_critiques: ["réglementation", "technologie", "social"]
    },
    probableObjections: [
      "Ces facteurs nous dépassent",
      "Nous sommes trop petits pour être impactés",
      "L'analyse est trop macro",
      "Difficile à actionner"
    ],
    successCriteria: [
      "Facteurs macro identifiés",
      "Impacts quantifiés",
      "Stratégie adaptée",
      "Veille organisée"
    ],
    tools: ["make_pestel", "score_phase"]
  },
  {
    id: "usp-positioning",
    title: "USP & Positionnement & Cible",
    description: "Promesse, bénéfice produit, différenciation, segments",
    objectives: [
      "Définir la proposition unique",
      "Clarifier les bénéfices",
      "Différencier vs concurrence",
      "Segmenter les cibles"
    ],
    mockData: {
      produit: "Plateforme de gestion commerciale",
      cibles_principales: ["PME", "Commerciaux", "Dirigeants"],
      differentiants: ["IA intégrée", "Interface intuitive", "Prix compétitif"],
      pain_points: ["perte de temps", "manque de visibilité", "processus manuels"]
    },
    probableObjections: [
      "Notre USP est déjà claire",
      "Tous nos concurrents disent pareil",
      "C'est trop compliqué à expliquer",
      "Nos clients ne comprennent pas"
    ],
    successCriteria: [
      "USP formulée clairement",
      "Bénéfices quantifiés",
      "Différenciation évidente",
      "Segments priorisés"
    ],
    tools: ["craft_usp", "score_phase"]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};