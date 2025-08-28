import { Scenario } from './types';

export const manufacturingIotScenario: Scenario = {
  id: "manufacturing-iot",
  title: "Solution IoT Industrie 4.0",
  description: "Vendre une solution IoT de monitoring industriel à un manufacturier traditionnel pour optimiser la production",
  difficulty: "Difficile",
  probability: 38,
  company: {
    name: "Plastiform Industries",
    sector: "Plasturgie - Injection plastique",
    size: "200 employés",
    revenue: "35M€/an",
    location: "Oyonnax, France (Vallée de la Plasturgie)",
    description: "Entreprise familiale 3e génération, leader européen emballages cosmétiques. 45 presses injection, 3 sites production. Clients : L'Oréal, LVMH, Unilever. Certification ISO 9001/14001.",
    painPoints: [
      "Arrêts machine imprévisibles : 8% temps production perdu",
      "Maintenance préventive insuffisante = pannes coûteuses",
      "Qualité variable : 2.3% rebuts vs 1.5% objectif",
      "Consommation énergétique non optimisée (+15% vs benchmarks)",
      "Visibilité production temps réel limitée"
    ],
    currentSolution: "GMAO basique + contrôles manuels + reporting Excel",
    budget: "150-300k€ pour industrie 4.0 (subventions région possibles)",
    timeline: "2025 - préparation plan investissement",
    foundedYear: 1975,
    keyPeople: [
      "Robert Moreau - PDG (3e génération famille)",
      "Philippe Dubois - Directeur Technique",
      "Martine Leroy - Directrice Qualité"
    ]
  },
  interlocutor: {
    name: "Philippe Dubois",
    role: "Directeur Technique",
    personality: "Ingénieur traditionnel prudent face aux nouvelles technologies. Très opérationnel, connaît chaque machine. Sceptique sur ROI digital mais ouvert si preuves tangibles.",
    communicationStyle: "Technique et terre-à-terre. Parle en TRS, rendements et coûts machine. Méfiant face aux promesses commerciales. Apprécie les démonstrations concrètes.",
    decisionPower: "Forte influence technique, validation PDG pour investissements >200k€",
    priorities: [
      "Réduction arrêts machine imprévisibles",
      "Amélioration TRS (actuellement 75%, objectif 85%)",
      "Optimisation consommation énergétique",
      "Maintenance prédictive vs réactive",
      "Amélioration qualité production"
    ],
    concerns: [
      "Complexité installation sans arrêt production",
      "ROI réel vs promesses industrie 4.0",
      "Formation équipe maintenance traditionnelle",
      "Fiabilité capteurs en environnement industriel",
      "Coût vs bénéfices incertains"
    ],
    motivations: [
      "Excellence technique : optimiser rendements machines",
      "Compétitivité : maintenir avantage vs concurrence",
      "Innovation maîtrisée : évolution technologique progressive"
    ],
    experience: "25 ans plasturgie : ingénieur production, puis responsable maintenance, maintenant directeur technique Plastiform depuis 8 ans. Formation ENSAM."
  },
  product: {
    name: "IndustryIQ Platform",
    description: "Solution IoT complète industrie 4.0 spécialisée plasturgie : capteurs sans fil, analytics prédictifs, optimisation énergétique. 200+ sites manufacturiers équipés.",
    pricing: {
      starter: "15k€/machine (monitoring basique, 10 machines max)",
      professional: "25k€/machine (prédictif + optimisation, 50 machines)",
      enterprise: "35k€/machine (suite complète + IA, machines illimitées)"
    },
    keyFeatures: [
      "Capteurs IoT sans fil (température, vibration, consommation)",
      "Analytics prédictifs pannes machines (90% précision)",
      "Optimisation énergétique temps réel (-20% consommation)",
      "Dashboard production temps réel (TRS, OEE, qualité)",
      "Alertes préventives maintenance smartphone/email",
      "IA détection anomalies qualité production",
      "Rapports conformité ISO 9001/14001 automatiques",
      "Intégration ERP/GMAO existants",
      "Mobile app techniciens maintenance",
      "Analytics benchmarking secteur plasturgie"
    ],
    competitiveAdvantages: [
      "Spécialisation plasturgie vs généralistes",
      "Installation sans arrêt production",
      "Analytics adaptés presses injection",
      "Support technique français expert",
      "ROI prouvé 200+ sites manufacturiers"
    ],
    roi: "Clients moyens : +12% TRS, -30% arrêts imprévisibles, -20% coûts énergie",
    implementationTime: "3 mois : 1 mois installation + 2 mois calibrage IA"
  },
  objectives: [
    "Démontrer augmentation TRS 75% vers 85%",
    "Prouver réduction arrêts imprévisibles 30%",
    "Quantifier économies énergétiques 20%",
    "Rassurer installation sans arrêt production",
    "Convaincre spécialisation plasturgie"
  ],
  salesGoal: "Contrat Professional 20 machines = 500,000€",
  expectedRevenue: "500,000€ (possibles subventions 40%)",
  swot: {
    strengths: [
      "Spécialisation plasturgie + injection plastique",
      "200+ références sites manufacturiers",
      "Installation sans arrêt production",
      "Analytics prédictifs 90% précision",
      "Support technique français expert secteur"
    ],
    weaknesses: [
      "Prix premium vs solutions basiques",
      "Startup 5 ans vs etablis (Siemens, Schneider)",
      "Dépendance qualité réseau client",
      "Complexité technique pour PME familiales"
    ],
    opportunities: [
      "Industrie 4.0 : subventions publiques +50%",
      "Coûts énergie +40% = besoin optimisation",
      "Pénurie techniciens = besoin automatisation",
      "Concurrence asiatique = besoin efficacité"
    ],
    threats: [
      "Siemens/Schneider développent offres PME",
      "Récession industrielle réduit investissements",
      "Clients développent solutions internes",
      "Nouvelles réglementations environnementales"
    ]
  },
  competitorSwot: {
    strengths: [
      "GMAO actuelle maîtrisée par équipes",
      "Maintenance préventive programmée existante",
      "Connaissance empirique machines par techniciens",
      "Coût apparent zéro (systèmes actuels amortis)"
    ],
    weaknesses: [
      "8% temps production perdu arrêts imprévisibles",
      "Maintenance réactive coûteuse vs prédictive",
      "Consommation énergie +15% vs benchmarks",
      "Qualité 2.3% rebuts vs 1.5% objectif",
      "Visibilité production limitée temps réel"
    ],
    opportunities: [
      "Formation équipe sur maintenance prédictive",
      "Optimisation planning maintenance actuel"
    ],
    threats: [
      "Concurrence adopte industrie 4.0 = avantage compétitif",
      "Coûts énergie impactent rentabilité sans optimisation",
      "Clients exigent traçabilité digitale production",
      "Réglementations environnementales renforcées"
    ]
  },
  probableObjections: [
    "25k€ par machine pour 45 presses ça fait plus d'1M€ ! C'est notre budget investissement annuel complet.",
    "Nos techniciens connaissent leurs machines par cœur depuis 20 ans. Ils n'ont pas besoin de capteurs pour savoir quand ça va tomber en panne.",
    "La plasturgie c'est robuste et fiable. Nos presses tournent depuis 15 ans, pourquoi compliquer avec de l'électronique ?",
    "3 mois d'installation ça va perturber notre production. On livre L'Oréal en flux tendu, on ne peut pas se permettre de retard.",
    "Et si vos capteurs tombent en panne ? On se retrouve avec des machines arrêtées à cause de votre électronique.",
    "90% de précision prédictive ça veut dire 10% de fausses alertes. Nos équipes vont perdre confiance.",
    "Siemens nous a proposé la même chose pour moitié prix avec leur nouvelle offre PME.",
    "Nos données de production sont confidentielles. Comment garantir qu'elles ne partent pas chez nos concurrents ?",
    "Dans 5 ans vos capteurs seront obsolètes et il faudra tout changer. C'est de l'argent foutu par les fenêtres.",
    "On fait 2.3% de rebuts, c'est déjà bien pour notre secteur. Pas besoin d'IA pour descendre à 1.5%."
  ],
  successCriteria: [
    "Audit TRS actuel révélant potentiel +10 points",
    "Démonstration capteurs sur presse pilote",
    "Validation technique installation sans arrêt",
    "Références plasturgie similaires visitées",
    "Pilote 6 mois sur 3 presses non-critiques",
    "Dossier subventions région préparé"
  ],
  tools: [
    "Audit TRS et OEE machines actuelles",
    "Calculateur économies énergétiques",
    "Simulateur ROI maintenance prédictive",
    "Benchmark performance secteur plasturgie",
    "Dossier subventions industrie 4.0 région"
  ],
  stakeholders: [
    {
      name: "Philippe Dubois",
      role: "Décisionnaire Technique - Directeur Technique",
      influence: "Très élevée",
      support: "Neutre-Sceptique",
      concerns: ["ROI réel", "Complexité", "Formation équipe"],
      approach: "Preuves techniques + ROI TRS + pilote"
    },
    {
      name: "Robert Moreau",
      role: "Validation Investissement - PDG",
      influence: "Décisive pour >200k€",
      support: "Neutre-Prudent (tradition)",
      concerns: ["ROI business", "Disruption", "Famille entreprise"],
      approach: "Avantage concurrentiel + subventions + tradition innovation"
    },
    {
      name: "Martine Leroy",
      role: "Impact Qualité - Directrice Qualité",
      influence: "Moyenne (conformité)",
      support: "Neutre-Positive (amélioration)",
      concerns: ["Conformité ISO", "Traçabilité", "Fiabilité"],
      approach: "Amélioration qualité + conformité automatique"
    }
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'Industry 4.0 transformation expert',
      description: 'Optimisation production et maintenance prédictive IoT'
    },
    evidence: {
      title: 'Industriels transformés',
      description: 'Michelin, Schneider, Legrand : -35% downtime, +28% efficacité'
    },
    pilot: {
      title: 'Pilote IoT 120 jours',
      description: 'Installation 3 lignes production avec garantie gains'
    },
    sequence: [
      'Audit production 4.0 : analyse lignes + identification goulots',
      'Maintenance assessment : coûts downtime + inefficacités actuelles',
      'Benchmark industrie : performance vs leaders secteur plasturgie',
      'Demo live IoT : simulation monitoring temps réel sur vos machines',
      'ROI calculation : économies maintenance + gains productivité',
      'Pilote 120 jours : installation IoT 3 lignes + mesure performances',
      'Validation ROI : proof gains opérationnels + optimisation',
      'Scaling plan : déploiement toutes lignes + formation équipe'
    ],
    leveragePoints: [
      'Inflation énergie : +67% coûts, monitoring IoT = optimisation consommation',
      'Shortage main-d\'œuvre : automatisation = moins de dépendance personnel',
      'Pression clients : qualité + délais sans faille, monitoring = garantie',
      'Concurrence low-cost : efficacité opérationnelle = survie marché',
      'Conformité ISO : traçabilité automatique = certification simplifiée'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "180B€ Industry 4.0 Europe, 1200B$ mondial",
      growthRate: "+15% CAGR industrie 4.0, +25% IoT industriel",
      budgetRange: "200K-1M€/an PME industrielles, 1-3% CA",
      expectedROI: "-35% downtime, +28% efficacité, +15% marge",
      timeline: "Urgence compétitivité : inflation + shortage personnel",
      keyPlayers: ["Siemens", "GE Digital", "Schneider Electric", "ABB", "Rockwell"],
      adoptionRate: "34% PME industrielles équipées IoT avancé",
      downtimeCost: "50k€/jour downtime moyen PME plasturgie",
      energyCrisis: "+67% coûts énergie, monitoring = 12-18% économies"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Quantifier coûts downtime + inefficacités production actuelles",
      secondary: "Évaluer budget transformation 4.0 + urgences opérationnelles",
      successMetrics: "RDV audit production + accès métriques machines"
    },
    rdv: {
      primary: "Démontrer ROI IndustryIQ via simulation gains production",
      secondary: "Valider pilote 3 lignes + buy-in direction technique",
      successMetrics: "Pilote approuvé + budget investi + timeline signée"
    }
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Budget investissement",
      objection: "400k€ c'est lourd pour une PME, surtout en période difficile",
      frequency: "Très fréquente" as const,
      responses: [
        "Vos downtimes vous coûtent déjà 50k€/jour. Avec IndustryIQ, Michelin a réduit les arrêts de 35% = 650k€ économies an 1",
        "L'inflation énergie vous coûte +200k€/an. Notre monitoring optimise la consommation : -18% = 36k€ économies annuelles",
        "Schneider Electric : ROI 240% sur 3 ans avec notre solution"
      ],
      evidence: "Case study Michelin downtime + économies énergie Schneider",
      nextStep: "Audit gratuit coûts cachés production + calcul ROI personnalisé"
    },
    {
      category: "Complexité technique",
      objection: "Nos machines ont 15 ans, elles ne sont pas compatibles IoT",
      frequency: "Très fréquente" as const,
      responses: [
        "IndustryIQ fonctionne sur toutes machines via capteurs retrofit, aucune modification nécessaire",
        "Legrand avait des machines de 1995 : installation en 3 jours sans arrêt production",
        "80% de nos clients ont des machines anciennes, c'est notre spécialité"
      ],
      evidence: "Capteurs retrofit universels + case study Legrand machines anciennes",
      nextStep: "Audit technique machines + démonstration capteurs compatibles"
    },
    {
      category: "Résistance équipe",
      objection: "Les opérateurs vont avoir peur d'être surveillés ou remplacés",
      frequency: "Fréquente" as const,
      responses: [
        "Au contraire, IndustryIQ les aide : alertes préventives évitent pannes stress, maintenance plus facile",
        "Chez Plastiform, les opérateurs sont devenus nos meilleurs ambassadeurs après 2 semaines",
        "Pas de surveillance personnel, monitoring machines pour les aider, pas les contrôler"
      ],
      evidence: "Témoignage opérateurs Plastiform + focus aide vs surveillance",
      nextStep: "Présentation solution aux équipes terrain + retours utilisateurs"
    },
    {
      category: "Timing",
      objection: "On a déjà beaucoup de projets, pas le temps de se lancer",
      frequency: "Fréquente" as const,
      responses: [
        "Installation sans arrêt production, notre équipe gère tout pendant que vous continuez à produire",
        "Chaque mois d'attente = 40k€ de downtime évitable en plus",
        "Michelin a installé pendant leur période de pointe : aucune perturbation, gains immédiats"
      ],
      evidence: "Installation non-disruptive + case study Michelin période pointe",
      nextStep: "Planning installation compatible production + engagement non-disruption"
    },
    {
      category: "Concurrence",
      objection: "Siemens nous a fait une proposition, ils sont plus connus",
      frequency: "Occasionnelle" as const,
      responses: [
        "Siemens = solution complexe 18 mois déploiement, 1.2M€. IndustryIQ = 3 mois, 400k€, même résultats",
        "Nous sommes spécialisés PME plasturgie, Siemens cible les multinationales",
        "Notre support français vs équipes offshore, réactivité 24h vs 5 jours"
      ],
      evidence: "Benchmark coût/délai vs Siemens + spécialisation PME",
      nextStep: "Comparatif détaillé + références clients similaires"
    }
  ]
};