import { Scenario } from './types';

export const saasHrToolScenario: Scenario = {
  id: "saas-hr-tool",
  title: "Plateforme RH SaaS",
  description: "Vendre une solution RH complète à une entreprise en croissance pour digitaliser la gestion des talents",
  difficulty: "Moyen",
  probability: 68,
  company: {
    name: "GreenTech Innovations",
    sector: "Cleantech - Énergies Renouvelables",
    size: "120 employés",
    revenue: "18M€/an",
    location: "Toulouse, France",
    description: "Scale-up cleantech fondée en 2016, développe solutions solaires industrielles. Croissance 85%/an. Équipes R&D (40%), Commercial (30%), Ops (30%). Levée série B 8M€ 2023.",
    painPoints: [
      "Recrutement chronophage : 45j délai moyen vs 25j marché",
      "Onboarding manuel chaotique nouveaux employés",
      "Gestion performance informelle sans structure",
      "RH débordée : 1 RH pour 120 employés",
      "Turnover 22% (stress croissance) vs 15% souhaité"
    ],
    currentSolution: "Excel + emails + entretiens papier + Workday basique",
    budget: "15-30k€/an pour digitalisation RH",
    timeline: "Q2 2024 - avant nouvelle vague recrutements",
    foundedYear: 2016,
    keyPeople: [
      "Élodie Martin - CEO & Co-fondatrice (Ex-McKinsey Energy)",
      "Camille Dubois - DRH (Ex-Schneider Electric)",
      "Thomas Chen - CTO"
    ]
  },
  interlocutor: {
    name: "Camille Dubois",
    role: "Directrice des Ressources Humaines",
    personality: "Moderne et orientée employee experience, frustrée par les outils obsolètes. Passionnée de people analytics et bien-être au travail. Débordée par la croissance.",
    communicationStyle: "Collaborative et orientée impact humain. Parle en engagement et satisfaction employés. Apprécie les métriques RH et benchmarks.",
    decisionPower: "Décisionnaire opérationnel jusqu'à 25k€, validation CEO pour stratégique",
    priorities: [
      "Réduction délai recrutement 45j vers 25j",
      "Amélioration onboarding et retention",
      "Automatisation tâches admin RH",
      "Structuration gestion performance",
      "Analytics RH pour pilotage croissance"
    ],
    concerns: [
      "Adoption par équipes techniques habituées simplicité",
      "Migration données RH existantes",
      "Conformité RGPD données personnelles",
      "Coût vs budget RH startup",
      "Temps formation en pleine croissance"
    ],
    motivations: [
      "Impact positif : améliorer employee experience",
      "Efficacité : automatiser pour se concentrer sur stratégique",
      "Innovation : moderniser RH d'une scale-up tech"
    ],
    experience: "10 ans RH : 5 ans Schneider Electric (HRBP), 3 ans scale-up EdTech (DRH), 2 ans GreenTech. Master RH Dauphine + certification People Analytics."
  },
  product: {
    name: "TalentFlow Suite",
    description: "Plateforme RH complète pour scale-ups : ATS, onboarding, performance, analytics. Spécialisée entreprises tech 50-500 employés. Interface moderne, mobile-first.",
    pricing: {
      starter: "12€/employé/mois (ATS + onboarding, jusqu'à 100 employés)",
      professional: "18€/employé/mois (performance + analytics, jusqu'à 300)",
      enterprise: "25€/employé/mois (everything + API, illimité)"
    },
    keyFeatures: [
      "ATS intelligent avec scoring candidats IA",
      "Onboarding digital parcours personnalisés",
      "Gestion performance OKRs + feedback 360°",
      "Analytics RH temps réel (turnover, engagement)",
      "Mobile app collaborateurs iOS/Android",
      "Intégrations Slack, Teams, Google Workspace",
      "Workflows automatisés RH personnalisables",
      "Base connaissance formation collaborative",
      "Enquêtes engagement automatiques",
      "Conformité RGPD native française"
    ],
    competitiveAdvantages: [
      "Spécialisation scale-ups tech vs généralistes",
      "Interface moderne vs legacy (SAP, Workday)",
      "Prix transparent par employé vs licensing complexe",
      "Setup rapide 2 semaines vs 6 mois",
      "Support français vs offshore"
    ],
    roi: "Clients moyens : -40% délai recrutement, +60% satisfaction onboarding, +25% retention",
    implementationTime: "2 semaines setup + 1 mois adoption complète"
  },
  objectives: [
    "Démontrer réduction délai recrutement 45j vers 25j",
    "Prouver amélioration employee experience mesurable",
    "Rassurer simplicité vs complexity enterprise tools",
    "Quantifier ROI sur productivité RH équipe",
    "Convaincre spécialisation scale-ups tech"
  ],
  salesGoal: "Contrat Professional 120 employés = 25,920€/an",
  expectedRevenue: "25,920€ première année",
  swot: {
    strengths: [
      "Spécialisation scale-ups tech 50-500 employés",
      "Interface moderne mobile-first vs legacy",
      "Prix transparent simple vs licensing complexe",
      "Setup rapide 2 semaines vs 6 mois",
      "Support français expertise scale-ups"
    ],
    weaknesses: [
      "Jeune sur marché vs SAP/Workday établis",
      "Fonctionnalités enterprise limitées vs leaders",
      "R&D limitée vs budgets géants",
      "Références scale-ups vs grandes entreprises"
    ],
    opportunities: [
      "Boom scale-ups tech post-COVID",
      "Digitalisation RH +65% PME/ETI",
      "Employee experience priorité post-pandémie",
      "Budget RH tech +40% scale-ups"
    ],
    threats: [
      "Workday/SAP développent offres SMB",
      "Slack/Teams ajoutent fonctionnalités RH",
      "Récession réduit croissance scale-ups",
      "Google Workspace intègre RH basique"
    ]
  },
  competitorSwot: {
    strengths: [
      "Workday basique déjà en place",
      "Équipe habituée processus actuels",
      "Coût apparent faible (basique inclus)"
    ],
    weaknesses: [
      "Délai recrutement 45j vs 25j marché",
      "Onboarding manuel = expérience dégradée",
      "RH débordée 1 pour 120 employés",
      "Pas d'analytics RH pour pilotage"
    ],
    opportunities: [
      "Formation équipe Workday avancé",
      "Optimisation processus manuels actuels"
    ],
    threats: [
      "Turnover 22% = coût recrutement élevé",
      "Concurrence talents nécessite employee experience",
      "Croissance bridée par capacité RH limitée"
    ]
  },
  probableObjections: [
    "18€/employé/mois pour 120 personnes ça fait 2160€/mois ! C'est notre budget formation annuel.",
    "Workday est déjà en place et fonctionne. Pourquoi changer maintenant en pleine croissance ?",
    "Nos développeurs vont encore râler contre un nouvel outil. Ils préfèrent Slack pour tout.",
    "2 semaines de migration c'est optimiste. Et si on perd des données RH critiques ?",
    "Vos -40% délai recrutement, c'est mesuré sur quel type d'entreprises ? Nous on recrute des profils très techniques.",
    "Notre croissance est imprévisible, on va passer à 200 employés l'an prochain. Vos prix vont exploser.",
    "Les données RH sont ultra-sensibles. Comment garantir la sécurité vs Workday qui a 20 ans d'expérience ?",
    "Et si vous fermez dans 3 ans ? Une startup RH contre les géants SAP/Oracle c'est risqué.",
    "Notre CEO Élodie surveille chaque dépense depuis la levée. Comment justifier 25k€ pour de la RH ?",
    "BambooHR propose les mêmes fonctionnalités pour 15€/employé. Pourquoi payer plus ?"
  ],
  successCriteria: [
    "Audit processus RH révélant inefficacités",
    "Démonstration ATS avec vrais profils techniques",
    "Validation RGPD et sécurité données",
    "Témoignage scale-up cleantech/tech similaire",
    "Pilote 3 mois département (R&D ou Commercial)",
    "Formation équipe RH incluse"
  ],
  tools: [
    "Audit processus recrutement actuels",
    "Calculateur coût turnover vs investissement",
    "Benchmark délais recrutement secteur tech",
    "Simulateur ROI productivité RH",
    "Planning migration sans disruption"
  ],
  stakeholders: [
    {
      name: "Camille Dubois",
      role: "Décisionnaire Principal - DRH",
      influence: "Très élevée",
      support: "Positif (modernisation)",
      concerns: ["Adoption équipe", "Migration", "Coût"],
      approach: "Employee experience + efficacité RH"
    },
    {
      name: "Élodie Martin",
      role: "Validation Stratégique - CEO",
      influence: "Décisive pour >20k€",
      support: "Neutre-Positive (croissance)",
      concerns: ["ROI", "Priorités budget", "Scale-up challenges"],
      approach: "Impact croissance + employee retention"
    },
    {
      name: "Thomas Chen",
      role: "Utilisateur - CTO",
      influence: "Moyenne (adoption tech)",
      support: "Neutre",
      concerns: ["Intégrations", "Simplicité", "Developer experience"],
      approach: "Intégrations Slack + simplicité vs enterprise"
    }
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'HR efficiency & scaling expert',
      description: 'Optimisation processus RH et préparation hypercroissance'
    },
    evidence: {
      title: 'Scale-ups tech similaires',
      description: 'Algolia, Datadog, ContentSquare : -50% temps recrutement, +40% rétention'
    },
    pilot: {
      title: 'Pilote recrutement 60 jours',
      description: 'Test complet cycle recrutement + onboarding automation'
    },
    sequence: [
      'Audit processus RH : mapping workflows recrutement + onboarding',
      'Time-to-hire analysis : benchmark vs marché tech français',
      'ROI calculation : coût recrutement actuel vs TalentFlow automation',
      'Démonstration personnalisée : simulation recrutement profil tech',
      'Intégration assessment : compatibilité stack tech existant',
      'Pilote recrutement : test 2-3 postes avec métriques comparatives',
      'Performance review : ROI temps + qualité recrutement',
      'Scaling plan : déploiement complet + formation équipe RH'
    ],
    leveragePoints: [
      'Hypercroissance : objectif 200 personnes 2024 vs 120 actuellement',
      'Guerre des talents : pénurie développeurs +35% time-to-hire marché',
      'Coût opportunité : poste non pourvu = 15k€/mois manque à gagner',
      'Scaling RH : équipe RH saturée, processus manuels non scalables',
      'Compétitivité : candidate experience déterminante attraction talents'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "2.1B€ HR Tech France, 24B$ mondial",
      growthRate: "+25% CAGR France, +11% mondial",
      budgetRange: "50K-150K€/an scale-ups, 800-1500€/employé",
      expectedROI: "+40% efficacité RH, -50% time-to-hire",
      timeline: "Urgence Q1 2024 : hypercroissance recrutement",
      keyPlayers: ["Workday", "BambooHR", "Personio", "HiBob", "Lucca"],
      talentShortage: "Pénurie développeurs : +35% time-to-hire 2024",
      scalingPressure: "77% scale-ups tech doublent équipe en 18 mois",
      candidateExperience: "89% candidats rejettent après mauvaise experience"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Quantifier pain points recrutement + coût time-to-hire actuel",
      secondary: "Identifier budget RH disponible + objectifs croissance",
      successMetrics: "RDV démonstration 45min + accès metrics recrutement"
    },
    rdv: {
      primary: "Démontrer ROI TalentFlow via simulation recrutement",
      secondary: "Valider pilote + intégration stack + buy-in CEO",
      successMetrics: "Pilote approuvé + budget alloué + timeline définie"
    }
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Outils existants",
      objection: "On utilise déjà LinkedIn Recruiter + Excel, ça marche",
      frequency: "Très fréquente" as const,
      responses: [
        "Algolia utilisait exactement le même setup : ils sont passés de 45 à 18 jours de time-to-hire avec TalentFlow",
        "Excel ne scale pas : à 200 personnes, vous allez perdre des candidats dans les macros",
        "LinkedIn c'est juste la source, TalentFlow c'est tout le pipeline : tri automatique, scoring, onboarding"
      ],
      evidence: "Case study Algolia : time-to-hire -60% + témoignage DRH",
      nextStep: "Audit de votre processus actuel + simulation gain temps avec TalentFlow"
    },
    {
      category: "Budget",
      objection: "80k€/an pour 120 personnes, c'est 700€ par employé",
      frequency: "Très fréquente" as const,
      responses: [
        "Un poste de dev non pourvu vous coûte 15k€/mois. Si TalentFlow fait gagner 2 semaines sur 1 recrutement, c'est déjà rentabilisé",
        "ContentSquare calcule 180k€ d'économies an 1 : réduction coûts recrutement + productivité RH",
        "Vous allez recruter 80 personnes en 2024 : 700€ vs 15k€ de coût de recrutement externe par poste"
      ],
      evidence: "ROI ContentSquare 180k€ + benchmark coûts recrutement externes",
      nextStep: "Calcul ROI personnalisé basé sur vos objectifs recrutement 2024"
    },
    {
      category: "Timing",
      objection: "Pas le bon moment, on est en pleine croissance",
      frequency: "Fréquente" as const,
      responses: [
        "C'est exactement le bon moment ! Plus vous attendez, plus le rattrapage sera difficile",
        "Datadog a déployé TalentFlow en pleine hypercroissance : gain immédiat sur les recrutements suivants",
        "Setup en 2 semaines, ROI dès le 3ème recrutement"
      ],
      evidence: "Case study Datadog déploiement en hypercroissance",
      nextStep: "Planning déploiement express 2 semaines compatible avec votre roadmap"
    },
    {
      category: "Équipe",
      objection: "Camille va avoir du mal avec un nouvel outil, elle n'est pas très tech",
      frequency: "Fréquente" as const,
      responses: [
        "L'interface TalentFlow est aussi simple que LinkedIn, mais en plus puissant",
        "On inclut 1 semaine de formation personnalisée + 3 mois de support dédié",
        "DRH chez Algolia : 'Plus simple que notre ancien Excel, impossible de faire marche arrière'"
      ],
      evidence: "Interface intuitive + programme formation + testimonial utilisatrice",
      nextStep: "Démonstration interface à Camille + accès sandbox pour tests"
    }
  ]
};