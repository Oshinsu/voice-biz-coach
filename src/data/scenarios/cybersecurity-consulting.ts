import { Scenario } from './types';

export const cybersecurityConsultingScenario: Scenario = {
  id: "cybersecurity-consulting",
  title: "Audit Cybersécurité Compliance",
  description: "Vendre un audit de cybersécurité et mise en conformité RGPD à une PME industrielle",
  difficulty: "Moyen",
  probability: 65,
  company: {
    name: "TechnoMetal Solutions",
    sector: "Industrie - Usinage de précision",
    size: "85 employés",
    revenue: "12M€/an",
    location: "Grenoble, France",
    description: "PME familiale fondée en 1987, spécialisée usinage pièces automobiles et aéronautique. Clients : Safran, Airbus, PSA. Certification ISO 9001. Récente digitalisation avec ERP et CRM.",
    painPoints: [
      "Cyberattaque ransomware évitée de justesse (mars 2024)",
      "Audit CNIL prévu 2024 = stress compliance RGPD",
      "Système informatique vieillissant (Windows 7 encore)",
      "Employés peu sensibilisés cybersécurité",
      "Données clients industriels sensibles à protéger"
    ],
    currentSolution: "Antivirus basique + sauvegardes manuelles + DSI externe ponctuel",
    budget: "25-50k€ pour cybersécurité (suite incident)",
    timeline: "Urgent - avant audit CNIL Q3 2024",
    foundedYear: 1987,
    keyPeople: [
      "Pierre Dubois - CEO (fils fondateur, 2e génération)",
      "Marie Leroy - Directrice Administrative et Financière",
      "Jean-Marc Brun - Responsable Production"
    ]
  },
  interlocutor: {
    name: "Marie Leroy",
    role: "Directrice Administrative et Financière",
    personality: "Rigoureuse et prudente, obsédée par la conformité légale. Échaudée par le quasi-ransomware. Méticuleuse sur les process et documentations. Stressée par l'audit CNIL.",
    communicationStyle: "Formelle et détaillée, demande beaucoup de justificatifs. Adore les rapports complets et matrices de risques. Sceptique face aux promesses sans preuves.",
    decisionPower: "Forte influence sur budgets admin/juridique, validation CEO pour >30k€",
    priorities: [
      "Conformité RGPD avant audit CNIL",
      "Protection données clients industriels",
      "Sécurisation systèmes après incident",
      "Formation équipe sensibilisation cyber",
      "Documentation complète process sécurité"
    ],
    concerns: [
      "Coût audit vs budget limité PME",
      "Complexité mise en conformité",
      "Interruption production pendant audit",
      "Fiabilité recommandations consultant",
      "Suivi post-audit et maintenance"
    ],
    motivations: [
      "Conformité légale : éviter sanctions CNIL",
      "Sécurité : protéger patrimoine données",
      "Réputation : rassurer clients industriels"
    ],
    experience: "18 ans PME industrielle : 10 ans comptable, 8 ans DAF TechnoMetal. Formation RGPD AFNOR 2018. Expert-comptable mémorialiste."
  },
  product: {
    name: "CyberGuard Compliance",
    description: "Audit cybersécurité complet + mise en conformité RGPD spécialisé PME industrielles. Méthodologie ANSSI, certification ISO 27001. 150+ PME auditées.",
    pricing: {
      starter: "Audit Express 8k€ (cybersécurité de base, 5j)",
      professional: "Audit Complet 15k€ (cyber + RGPD + plan action, 10j)",
      enterprise: "Audit Premium 25k€ (tout inclus + suivi 6 mois, 15j)"
    },
    keyFeatures: [
      "Audit cybersécurité technique complet (infrastructure, réseaux)",
      "Audit RGPD conformité légale documentée",
      "Tests intrusion ethique sur systèmes",
      "Analyse risques méthodologie EBIOS",
      "Plan action priorisé avec timeline",
      "Formation sensibilisation équipe",
      "Templates politiques sécurité",
      "Accompagnement mise en œuvre 6 mois",
      "Certification conformité pour clients",
      "Hotline support cyber incident"
    ],
    competitiveAdvantages: [
      "Spécialisation PME industrielles vs généralistes",
      "Méthodologie ANSSI certifiée",
      "Équipe experts français (pas offshore)",
      "Accompagnement mise en œuvre inclus",
      "Prix PME vs grands cabinets"
    ],
    roi: "0 sanctions CNIL, +95% niveau sécurité, contrats clients sécurisés",
    implementationTime: "3 semaines audit + 3 mois accompagnement mise en conformité"
  },
  objectives: [
    "Démontrer criticité vulnérabilités actuelles",
    "Prouver expertise PME industrielles",
    "Rassurer conformité RGPD garantie",
    "Quantifier ROI protection vs sanctions",
    "Convaincre accompagnement post-audit"
  ],
  salesGoal: "Audit Complet 15,000€",
  expectedRevenue: "15,000€",
  swot: {
    strengths: [
      "Spécialisation PME industrielles françaises",
      "Méthodologie ANSSI/ISO 27001 certifiée",
      "150+ PME références similaires",
      "Accompagnement post-audit inclus",
      "Équipe experts français locaux"
    ],
    weaknesses: [
      "Boutique 8 consultants vs grands cabinets",
      "Prix premium vs audits basiques",
      "Pas de présence internationale",
      "Jeune sur marché (4 ans)"
    ],
    opportunities: [
      "Cyberattaques PME +300% depuis COVID",
      "Durcissement réglementation CNIL",
      "Budgets cybersécurité PME +150%",
      "Obligation cyber industries critiques"
    ],
    threats: [
      "Grands cabinets (Deloitte, EY) baissent prix",
      "DSI externes proposent audits basiques",
      "Outils automatisés remplacent audits",
      "Récession réduit budgets sécurité"
    ]
  },
  competitorSwot: {
    strengths: [
      "DSI externe connaît déjà systèmes",
      "Audit gratuit rapide possible",
      "Relation confiance établie"
    ],
    weaknesses: [
      "Pas spécialiste cybersécurité/RGPD",
      "Audit superficiel sans méthodologie",
      "Pas d'accompagnement post-audit",
      "Responsabilité limitée recommandations"
    ],
    opportunities: [
      "Amélioration compétences cybersécurité",
      "Formation RGPD équipe actuelle"
    ],
    threats: [
      "Audit professionnel révèle vulnérabilités critiques",
      "CNIL sanctionne malgré 'audit' interne",
      "Clients industriels exigent certifications"
    ]
  },
  probableObjections: [
    "15k€ pour un audit c'est énorme pour une PME ! Notre DSI externe pourrait faire ça pour 3k€.",
    "On a déjà évité le ransomware en mars, ça prouve que nos défenses fonctionnent. Pourquoi dépenser plus ?",
    "3 semaines d'audit ça va perturber notre production. On ne peut pas arrêter l'usine pour de la paperasse.",
    "La CNIL ne contrôle que les grosses entreprises. Avec 85 employés, on n'est pas prioritaires.",
    "Vos recommandations vont nous coûter combien en plus ? Si c'est pour nous dire d'acheter 50k€ de matériel...",
    "Notre secteur industriel est peu touché par le cyber comparé à la banque. Nos données ne valent rien.",
    "On fait de l'usinage, pas de l'informatique. Nos clients s'en fichent de notre cybersécurité.",
    "Et si votre audit révèle des failles que nos concurrents pourraient exploiter ? C'est risqué.",
    "Les consultants promettent toujours des catastrophes pour vendre. Comment être sûr que c'est vraiment nécessaire ?",
    "Deloitte nous a proposé un audit pour 12k€. Pourquoi payer plus cher pour une petite boîte ?"
  ],
  successCriteria: [
    "Pré-audit gratuit révélant vulnérabilités critiques",
    "Validation méthodologie ANSSI/ISO 27001",
    "Références PME industrielles contactées",
    "Démonstration templates RGPD inclus",
    "Négociation paiement étalé 3 fois",
    "Garantie satisfaction audit"
  ],
  tools: [
    "Pré-audit cybersécurité gratuit express",
    "Checklist conformité RGPD actuelle",
    "Calculateur sanctions CNIL potentielles",
    "Benchmark sécurité secteur industriel",
    "Planning audit sans interruption production"
  ],
  stakeholders: [
    {
      name: "Marie Leroy",
      role: "Décisionnaire Principal - DAF",
      influence: "Très élevée",
      support: "Neutre-Positive (conformité)",
      concerns: ["Coût", "Conformité RGPD", "Interruption"],
      approach: "Conformité légale + pré-audit gratuit"
    },
    {
      name: "Pierre Dubois",
      role: "Validation Budget - CEO",
      influence: "Décisive pour >25k€",
      support: "Neutre-Prudent (incident récent)",
      concerns: ["ROI", "Continuité production", "Réputation"],
      approach: "Protection patrimoine + rassurer clients"
    },
    {
      name: "Jean-Marc Brun",
      role: "Impact Opérationnel - Resp. Production",
      influence: "Moyenne (planning audit)",
      support: "Neutre-Résistant (disruption)",
      concerns: ["Interruption production", "Accès systèmes"],
      approach: "Planning adapté production + bénéfices sécurité"
    }
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'Risk assessment & compliance expert',
      description: 'Audit cyber-risques complet et mise en conformité RGPD/NIS2'
    },
    evidence: {
      title: 'PME industrielles protégées',
      description: 'MetalCorp, PlastiForm, TechnoSteel : zéro incident, conformité 100%'
    },
    pilot: {
      title: 'Audit cyber-risques gratuit',
      description: 'Évaluation 48h + roadmap conformité personnalisée'
    },
    sequence: [
      'Audit cyber-sécurité express : scan vulnérabilités + compliance check',
      'Risk assessment métier : analyse impacts business cyber-attaques',
      'Benchmark réglementaire : gap analysis RGPD + NIS2 + sectoriels',
      'Démonstration CyberGuard : simulation attaque + détection temps réel',
      'Business case sécurité : coût breach vs investissement protection',
      'Roadmap conformité : plan 90j mise en conformité complète',
      'Pilot cyber-protection : déploiement monitoring 30j + SOC',
      'Certification compliance : validation audits externes + labels'
    ],
    leveragePoints: [
      'Urgence NIS2 : deadline mars 2025, amendes jusqu\'à 10M€',
      'Cyber-assurance : renouvellement 2024 exige conformité renforcée',
      'Concurrence internationale : attaques ciblées PME françaises +180%',
      'Réputation client : une faille = perte confiance + contrats',
      'Continuité activité : arrêt production = 50k€/jour en moyenne'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "9.8B€ cybersécurité France, 345B$ mondial",
      growthRate: "+15% CAGR France, +12% mondial",
      budgetRange: "50K-200K€/an PME industrielles, 2-5% CA",
      expectedROI: "ROI 15:1 (économies vs coût breach)",
      timeline: "Urgence NIS2 : mars 2025 deadline",
      keyPlayers: ["Thales", "Orange Cyberdefense", "Sophos", "CrowdStrike", "Fortinet"],
      threatLevel: "+180% cyberattaques PME 2024 vs 2023",
      compliancePressure: "89% PME non-conformes NIS2, amendes 10M€",
      insuranceTrend: "Cyber-assurance: +45% exigences conformité 2024"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Identifier niveau maturité cyber + gaps conformité critiques",
      secondary: "Évaluer budget sécurité disponible + urgences réglementaires",
      successMetrics: "RDV audit gratuit 2h + accès infrastructure IT"
    },
    rdv: {
      primary: "Démontrer vulnérabilités critiques + impact business",
      secondary: "Valider roadmap conformité + budget protection",
      successMetrics: "Audit approuvé + roadmap signée + sponsor exec validé"
    }
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Budget serré",
      objection: "150k€/an c'est énorme pour une PME comme nous",
      frequency: "Très fréquente" as const,
      responses: [
        "Une seule cyberattaque coûte en moyenne 380k€ à une PME industrielle + 23 jours d'arrêt production",
        "Les amendes NIS2 peuvent aller jusqu'à 10M€ si vous n'êtes pas conformes en mars 2025",
        "MetalCorp a économisé 650k€ la première année grâce à la prévention d'une attaque par ransomware"
      ],
      evidence: "Étude ANSSI 2024 : coût moyen breach PME industrielle 380k€ + case MetalCorp",
      nextStep: "Calcul ROI personnalisé : coût arrêt production vs investissement protection"
    },
    {
      category: "Urgence perçue",
      objection: "On n'a jamais été attaqués, ce n'est pas urgent",
      frequency: "Très fréquente" as const,
      responses: [
        "87% des PME industrielles attaquées en 2024 pensaient la même chose 6 mois avant",
        "Les attaquants ciblent spécifiquement les PME car elles sont moins protégées que les grands groupes",
        "NIS2 devient obligatoire en mars 2025 : si vous attendez, vous risquez 10M€ d'amende"
      ],
      evidence: "Statistiques ANSSI + deadline réglementaire NIS2 mars 2025",
      nextStep: "Audit gratuit express 48h pour identifier vos vulnérabilités cachées"
    },
    {
      category: "Complexité technique",
      objection: "Notre IT est basique, on n'a pas les compétences pour gérer ça",
      frequency: "Fréquente" as const,
      responses: [
        "C'est exactement pourquoi CyberGuard existe : solution clé en main avec SOC 24/7 externalisé",
        "Pas besoin d'expertise interne, notre équipe gère tout : monitoring, incidents, conformité",
        "TechnoSteel n'avait aucune expertise cyber : 6 mois après, conformité 100% sans embauche"
      ],
      evidence: "SOC externalisé 24/7 + case study TechnoSteel",
      nextStep: "Démonstration interface simple + présentation équipe SOC dédiée"
    },
    {
      category: "Priorités business",
      objection: "On a d'autres urgences : nouveau site, expansion commerciale...",
      frequency: "Fréquente" as const,
      responses: [
        "Une cyberattaque peut détruire en 24h tous vos investissements commerciaux",
        "Vos clients B2B exigent de plus en plus des garanties cyber avant de signer",
        "Le cyber devient un avantage concurrentiel : 73% des donneurs d'ordre privilégient les fournisseurs cyber-sécurisés"
      ],
      evidence: "Enquête donneur d'ordre 2024 + impact réputation post-breach",
      nextStep: "Business case : cyber-sécurité comme levier de croissance commerciale"
    }
  ]
};