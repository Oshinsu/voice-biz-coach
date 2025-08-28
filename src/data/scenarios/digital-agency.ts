import { Scenario } from './types';

export const digitalAgencyScenario: Scenario = {
  id: "digital-agency",
  title: "Plateforme Client Management",
  description: "Vendre une plateforme de gestion client tout-en-un à une agence digitale en croissance",
  difficulty: "Facile",
  probability: 72,
  company: {
    name: "Pixel Perfect Agency",
    sector: "Agence Digitale - Marketing & Développement",
    size: "12 employés",
    revenue: "1.2M€/an",
    location: "Nantes, France",
    description: "Agence fondée en 2019 spécialisée sites web, apps mobiles et marketing digital pour PME. Croissance 60%/an. 45 clients actifs. Expertise React/Node.js et growth hacking.",
    painPoints: [
      "Gestion projets dispersée (Trello + Slack + Google Drive)",
      "Suivi temps manuel chronophage et imprécis",
      "Facturation retardée = trésorerie tendue",
      "Communication client chaotique (email + WhatsApp)",
      "Perte de leads faute de follow-up organisé"
    ],
    currentSolution: "Trello + Slack + Google Workspace + facturation Excel",
    budget: "200-400€/mois pour outils gestion",
    timeline: "Immédiat - problème cash-flow urgent",
    foundedYear: 2019,
    keyPeople: [
      "Julien Moreau - CEO & Founder (Ex-developer freelance)",
      "Sarah Lambert - COO (Ex-consultante)",
      "Alex Chen - Lead Developer"
    ]
  },
  interlocutor: {
    name: "Sarah Lambert",
    role: "COO - Chief Operating Officer",
    personality: "Organisée et efficace, ancienne consultante frustrée par le chaos startup. Adore les process et la productivité. Pragmatique sur les investissements tech.",
    communicationStyle: "Directe et orientée solutions. Parle en gains de temps et économies. Apprécie les démonstrations concrètes avec vrais cas d'usage.",
    decisionPower: "Décisionnaire jusqu'à 500€/mois, validation CEO pour engagements annuels",
    priorities: [
      "Centralisation outils éparpillés",
      "Automatisation facturation (délai 7j max)",
      "Amélioration rentabilité projets (+20%)",
      "Structuration processus commerciaux",
      "Gain temps admin (2h/jour objectif)"
    ],
    concerns: [
      "Migration données depuis outils actuels",
      "Adoption par équipe technique habituée Slack",
      "Coût mensuel vs budget serré startup",
      "Temps formation en pleine croissance"
    ],
    motivations: [
      "Efficacité : passion optimisation process",
      "Croissance : structurer pour passer à 20 employés",
      "Reconnaissance : prouver impact organisationnel"
    ],
    experience: "8 ans ops : 4 ans conseil chez EY (process optimization), 2 ans startup EdTech (COO), 2 ans Pixel Perfect. Master Management EMLYON."
  },
  product: {
    name: "AgencyFlow Pro",
    description: "Plateforme tout-en-un gestion agence digitale : CRM, gestion projets, time tracking, facturation automatique, portail client. Spécialement conçue pour agences 5-50 employés.",
    pricing: {
      starter: "49€/mois (5 utilisateurs, fonctionnalités de base)",
      professional: "149€/mois (15 utilisateurs, automatisations avancées)",
      enterprise: "299€/mois (utilisateurs illimités, white-label, API)"
    },
    keyFeatures: [
      "CRM intégré avec pipeline commercial automatisé",
      "Gestion projets agile avec templates agence",
      "Time tracking automatique avec facturation",
      "Devis/factures automatiques conformes françaises",
      "Portail client avec suivi temps réel projets",
      "Rapports rentabilité par client/projet",
      "Intégrations natives (Slack, Google, Stripe)",
      "Templates contrats agence personnalisables",
      "Dashboard financier temps réel",
      "Mobile app iOS/Android"
    ],
    competitiveAdvantages: [
      "Spécialisation agences vs généralistes",
      "Interface française vs solutions US",
      "Facturation française automatique",
      "Support tech français réactif",
      "Prix agence vs enterprise tools"
    ],
    roi: "Clients moyens : +30% rentabilité projets, +2h productivité/jour, -5j délai facturation",
    implementationTime: "1 semaine : migration données + formation équipe"
  },
  objectives: [
    "Démontrer centralisation vs chaos actuel",
    "Quantifier gain temps 2h/jour équipe",
    "Prouver amélioration cash-flow facturation",
    "Rassurer simplicité migration données",
    "Convaincre ROI sur rentabilité projets"
  ],
  salesGoal: "Contrat Professional 12 mois = 1,788€",
  expectedRevenue: "1,788€ première année",
  swot: {
    strengths: [
      "Spécialisation agences digitales françaises",
      "Fonctionnalités métier intégrées",
      "Prix adapté PME vs enterprise",
      "Support français responsive",
      "Migration rapide 1 semaine"
    ],
    weaknesses: [
      "Moins connu que Monday/Notion",
      "Fonctionnalités avancées limitées vs Salesforce",
      "Jeune sur marché (2 ans)",
      "Écosystème intégrations restreint"
    ],
    opportunities: [
      "Boom agences digitales post-COVID",
      "Besoin structuration PME en croissance",
      "Digitalisation process métier +40%",
      "Budget outils productivité +25%"
    ],
    threats: [
      "Monday.com développe templates agence",
      "Notion améliore fonctionnalités CRM",
      "Récession réduit budgets outils",
      "Google Workspace ajoute gestion projets"
    ]
  },
  competitorSwot: {
    strengths: [
      "Outils actuels gratuits/low-cost",
      "Équipe habituée workflow Slack/Trello",
      "Flexibilité totale configuration"
    ],
    weaknesses: [
      "Dispersion 5+ outils différents",
      "Facturation manuelle = 5j délai",
      "Pas de vision globale rentabilité",
      "Communication client chaotique"
    ],
    opportunities: [
      "Optimisation progressive outils gratuits",
      "Formation équipe sur fonctionnalités avancées"
    ],
    threats: [
      "Perte temps quotidienne 2h équipe",
      "Cash-flow tendu délais facturation",
      "Erreurs humaines process manuels",
      "Croissance bridée par manque structure"
    ]
  },
  probableObjections: [
    "149€/mois pour 12 personnes c'est notre budget serveurs ! Comment justifier cette dépense pour une startup ?",
    "On a déjà Trello, Slack et Google Drive qui marchent bien. Pourquoi tout changer maintenant ?",
    "Notre équipe dev est habituée aux outils techniques. Ils vont résister à un changement d'organisation.",
    "1 semaine de migration en pleine croissance c'est risqué. On ne peut pas arrêter de livrer pour nos clients.",
    "Et si votre plateforme tombe en panne ? On gère 45 clients, on ne peut pas se permettre d'interruption.",
    "Vos 30% d'amélioration rentabilité, c'est calculé comment ? Nos marges sont déjà optimisées.",
    "Les données de nos clients sont confidentielles. Comment garantir la sécurité sur votre plateforme ?",
    "Monday.com et Notion sont plus connus et ont plus de fonctionnalités. Pourquoi choisir AgencyFlow ?",
    "Si on grandit à 25 personnes, vos 15 utilisateurs max ne suffiront plus. Il faudra repayer l'upgrade ?",
    "Notre facturation Excel marche depuis 3 ans. Pourquoi risquer de casser quelque chose qui fonctionne ?"
  ],
  successCriteria: [
    "Audit process actuels révélant 2h/jour perdues",
    "Démonstration migration données sans perte",
    "Validation technique intégrations Slack/Google",
    "Témoignage agence similaire (10-15 personnes)",
    "Test gratuit 30j sur projet pilote",
    "Formation équipe incluse"
  ],
  tools: [
    "Audit efficiency process actuels",
    "Calculateur gain temps/ROI",
    "Simulateur amélioration cash-flow",
    "Comparateur coût vs dispersion outils",
    "Planning migration sans interruption"
  ],
  stakeholders: [
    {
      name: "Sarah Lambert",
      role: "Décisionnaire Principal - COO",
      influence: "Très élevée",
      support: "Positif (besoin structure)",
      concerns: ["Migration", "Adoption équipe", "Coût"],
      approach: "Démonstration gains concrets + test gratuit"
    },
    {
      name: "Julien Moreau",
      role: "Validation Budget - CEO",
      influence: "Décisive pour >300€/mois",
      support: "Neutre-Positif (croissance)",
      concerns: ["ROI", "Priorités budget", "Complexité"],
      approach: "Business case croissance + structuration"
    },
    {
      name: "Alex Chen",
      role: "Utilisateur - Lead Developer",
      influence: "Moyenne (adoption technique)",
      support: "Neutre-Résistant (status quo)",
      concerns: ["Changement workflow", "Intégrations tech"],
      approach: "Démonstration technique + conservation Slack"
    }
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'Audit workflow productivity expert',
      description: 'Analyse complète écosystème tools et optimisation temps équipe'
    },
    evidence: {
      title: 'Agences digitales leaders',
      description: 'WeScale, TheFamily, Eleven Labs : +40% marge, -25% temps admin'
    },
    pilot: {
      title: 'Pilote productivité 60 jours',
      description: 'Tests sur 3 projets clients avec mesure ROI temps'
    },
    sequence: [
      'Audit tools ecosystem : mapping 15+ outils actuels + pain points',
      'Time tracking analysis : audit 2 semaines temps équipe réel',
      'Workflow mapping : identification 12 sources fragmentation',
      'ROI calculation : quantification heures perdues vs coût AgencyFlow',
      'Demo live personnalisée : simulation projets clients réels',
      'Pilote 60 jours : déploiement 3 projets test + mesure gains',
      'Business case validation : ROI marge opérationnelle prouvé',
      'Scaling plan : déploiement tous projets + formation équipe'
    ],
    leveragePoints: [
      'Période haute activité Q1 : 12 projets simultanés = chaos management',
      'Concurrence prix : marge faible nécessite optimisation opérationnelle',
      'Growth frustration : croissance bloquée par inefficacités internes',
      'Talent retention : équipe épuisée par admin chronophage',
      'Client satisfaction : délais serrés impossibles sans productivité optimale'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "2.3B€ marché agences digitales France, 45B$ mondial",
      growthRate: "+18% CAGR agences, +22% outils productivity",
      budgetRange: "8K-25K€/an tools management, 15-35% budget ops",
      expectedROI: "+40% marge opérationnelle, -25% temps admin",
      timeline: "Urgent Q1 2024 : pic activité client",
      keyPlayers: ["Monday.com", "Asana", "Notion", "ClickUp", "Smartsheet"],
      marketFragmentation: "67% agences utilisent 8+ tools sans intégration",
      timeWaste: "23% temps équipe perdu coordination tools",
      clientPressure: "89% clients exigent délais plus courts 2024 vs 2023"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Identifier principal pain point productivité et quantifier impact",
      secondary: "Évaluer maturité outils + budget disponible",
      successMetrics: "RDV audit workflow 45min + accès stack tools"
    },
    rdv: {
      primary: "Démontrer ROI AgencyFlow via simulation projets réels",
      secondary: "Obtenir validation pilote 60j + buy-in équipe leadership",
      successMetrics: "Pilote approuvé + timeline définie + sponsors identifiés"
    }
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Outils existants",
      objection: "On a déjà Notion + Slack + Harvest, pourquoi changer ?",
      frequency: "Très fréquente" as const,
      responses: [
        "Justement, c'est exactement le problème : 3 outils = 3 sources de vérité différentes. Combien de fois par semaine perdez-vous des infos entre ces plateformes ?",
        "WeScale utilisait exactement le même setup : ils ont gagné 8h/semaine par personne en centralisant",
        "Vos clients paient pour de la créativité, pas pour que vous passiez 30% du temps à chercher des infos"
      ],
      evidence: "Case study WeScale : 8h/semaine économisées par personne = 2 jours productifs supplémentaires",
      nextStep: "Audit gratuit de votre stack actuel pour quantifier les pertes de temps exactes"
    },
    {
      category: "Budget",
      objection: "15k€/an c'est cher, nos marges sont déjà serrées",
      frequency: "Très fréquente" as const,
      responses: [
        "Si on économise ne serait-ce que 1h/semaine par personne (8 personnes), c'est 8h x 50€ = 400€/semaine soit 20k€/an d'économies",
        "TheFamily a augmenté sa marge de 40% la première année grâce à l'optimisation workflow",
        "C'est 0.5% de votre CA pour potentiellement 15-20% de marge supplémentaire"
      ],
      evidence: "ROI TheFamily : +40% marge an 1, payback en 4 mois",
      nextStep: "Calcul ROI personnalisé basé sur vos tarifs et temps équipe actuels"
    },
    {
      category: "Résistance changement",
      objection: "L'équipe est habituée à nos outils, ils vont résister",
      frequency: "Fréquente" as const,
      responses: [
        "L'interface AgencyFlow ressemble à Notion mais avec la puissance d'un ERP. La transition est douce",
        "On inclut 2 semaines d'accompagnement change management + formation personnalisée",
        "Eleven Labs : 'En 3 jours, impossible de revenir en arrière, trop addictif'"
      ],
      evidence: "Testimonial Eleven Labs + programme d'accompagnement change management",
      nextStep: "Demo interface à l'équipe pour valider l'ergonomie et l'adoption"
    },
    {
      category: "Intégrations",
      objection: "On a trop d'intégrations custom, ça va être compliqué",
      frequency: "Fréquente" as const,
      responses: [
        "AgencyFlow a des connecteurs natifs pour 200+ outils et une API ouverte pour le reste",
        "Notre équipe tech gère l'intégration, vous n'avez rien à développer",
        "On garde vos outils critiques et on centralise juste la vue management"
      ],
      evidence: "200+ connecteurs + équipe d'intégration dédiée",
      nextStep: "Audit technique de vos intégrations actuelles + plan de migration"
    }
  ]
};