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
  ]
};