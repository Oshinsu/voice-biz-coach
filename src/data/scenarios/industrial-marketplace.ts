import { Scenario } from './types';

export const industrialMarketplaceScenario: Scenario = {
  id: "industrial-marketplace",
  title: "Marketplace B2B Industrielle",
  description: "Convaincre un leader de la métallurgie d'adopter une marketplace B2B pour optimiser ses achats industriels avec un ROI de 15% et une réduction des délais fournisseurs",
  difficulty: "Difficile",
  probability: 45,
  company: {
    name: "MetalCast Précision",
    sector: "Métallurgie de précision",
    size: "150 employés, 25M€ CA",
    revenue: "25M€/an (croissance 8% mais marges sous pression)",
    location: "Oyonnax, France (Vallée de la Plasturgie)",
    description: "Fonderie familiale créée en 1978 par la famille Dubois, spécialisée dans les pièces métalliques haute précision pour l'automobile (PSA, Renault) et l'aéronautique (Safran). 3e génération aux commandes avec Pierre Dubois (CEO), 52 ans. Certification ISO 9001, TS 16949 automobile. Équipements: 8 presses injection, 2 tours multibroches, cellule robotisée. Concurrence chinoise forte, obligation d'innovation constante.",
    painPoints: [
      "Négociations fournisseurs chronophages : 40% du temps des 6 acheteurs passé en appels/emails",
      "Visibilité prix marché limitée : suspicion de surpaiement sur l'acier (+12% vs marché)",
      "Ruptures approvisionnement coûteuses : 3 arrêts production en 2023 = 45k€ de perte",
      "Process achats non digitalisé : 200 bons de commande papier/mois, erreurs récurrentes",
      "Dépendance 5 fournisseurs historiques : risque concentration, peu de négociation possible",
      "Gestion stock approximative : 350k€ immobilisé vs 280k€ optimal selon audit",
      "Reporting achats inexistant : impossible de mesurer performance acheteurs ou fournisseurs"
    ],
    currentSolution: "Négociation directe téléphonique + catalogues papier fournisseurs + ERP Sage pour commandes + Excel pour suivi prix",
    budget: "15-30k€/an (soit 0,1% CA) mais ouvert si ROI prouvé sur optimisation achats (objectif -3% coûts)",
    timeline: "Q2 2024 pour préparation budget 2025, implémentation souhaitée janvier 2025",
    foundedYear: 1978,
    keyPeople: [
      "Pierre Dubois - CEO (3e génération famille, ingénieur ENSAM)",
      "Christine Moreau - Directrice Achats & Supply Chain",
      "Marc Leroy - Directeur Technique & Production",
      "Sophie Martin - DAF (contrôle gestion)"
    ]
  },
  interlocutor: {
    name: "Christine Moreau",
    role: "Directrice Achats & Supply Chain",
    personality: "Rigoureuse et analytique, ancienne contrôleur de gestion reconvertie achats. Workaholic qui maîtrise Excel à la perfection. Frustrée par le manque d'outils modernes mais pragmatique sur les investissements. Fière de ses relations fournisseurs construites en 12 ans.",
    communicationStyle: "Directe et factuelle, pose 5 questions précises par sujet abordé. Adore les chiffres et tableaux comparatifs. Interrompt si pas assez concret. Prend des notes manuscrites détaillées dans son carnet Moleskine rouge.",
    decisionPower: "Décisionnaire opérationnel jusqu'à 25k€. Au-delà, validation Pierre Dubois (CEO) et CFO requis. Forte influence sur stratégie achats et choix fournisseurs.",
    priorities: [
      "Réduction coûts achats de 3% (objectif 2024 imposé par actionnaires familiaux)",
      "Sécurisation approvisionnements critiques (acier, aluminium, traitements)",
      "Digitalisation process achats pour gagner en efficacité",
      "Diversification base fournisseurs pour réduire dépendances",
      "Amélioration indicateurs performance achats (actuellement inexistants)"
    ],
    concerns: [
      "Qualité fournisseurs marketplace vs partenaires historiques de confiance",
      "Complexité technique adoption par équipe achat (moyenne d'âge 48 ans)",
      "Risque rupture approvisionnement pendant transition",
      "ROI réel vs promesses commerciales des éditeurs",
      "Confidentialité prix négociés avec concurrents sur plateforme"
    ],
    motivations: [
      "Reconnaissance professionnelle : moderniser achats et prouver impact business",
      "Performance financière : bonus indexé sur économies réalisées",
      "Efficacité opérationnelle : moins de temps admin, plus de stratégie"
    ],
    experience: "12 ans chez MetalCast : 5 ans contrôle gestion, 7 ans achats. Diplômée ESCP, formation achats HEC Executive. Connaissance parfaite des coûts matières et fournisseurs historiques."
  },
  product: {
    name: "IndustryMarket Pro",
    description: "Marketplace B2B spécialisée industrie avec 50 000+ fournisseurs vérifiés, outils de négociation automatisée, analytics achats avancés et garantie approvisionnement. IA de matching fournisseur/besoin et prédiction prix matières.",
    pricing: {
      starter: "999€/mois (jusqu'à 1000 ref, 3 acheteurs)",
      professional: "2500€/mois (refs illimitées, 10 acheteurs, analytics avancés)",
      enterprise: "5000€/mois (multi-sites, API ERP, CSM dédié, SLA 99.9%)"
    },
    keyFeatures: [
      "50 000+ fournisseurs industrie vérifiés (certifications, santé financière)",
      "Négociation inversée automatisée : fournisseurs enchérissent sur vos appels d'offres",
      "Analytics achats : suivi prix marché, performance fournisseurs, économies réalisées",
      "Intégration ERP native (Sage, SAP, Oracle) pour commandes automatiques",
      "IA matching fournisseur/besoin selon géographie, délais, certifications",
      "Prédiction prix matières (acier, alu, cuivre) sur 6 mois",
      "Catalogue intelligent : 2M+ références techniques avec équivalences",
      "Workflow validation commandes multi-niveaux selon montants",
      "SLA fournisseurs contractuels avec pénalités retard automatiques",
      "Dashboard temps réel : stock, commandes en cours, alertes rupture"
    ],
    competitiveAdvantages: [
      "Spécialisation industrie vs marketplaces généralistes (Amazon Business)",
      "Fournisseurs européens vérifiés vs Alibaba (confiance, délais, qualité)",
      "Négociation inversée vs négociation directe traditionnelle (+15% économies)",
      "IA prédictive prix vs réactivité pure (+8% optimisation budgets)",
      "Intégration ERP native vs silos de données",
      "Support français vs support offshore Ariba/Oracle"
    ],
    roi: "Clients similaires : 15% réduction coûts achats, 25% gain temps acheteurs, 40% réduction ruptures stock",
    implementationTime: "3 mois : 1 mois setup + 1 mois formation + 1 mois optimisation"
  },
  objectives: [
    "Démontrer économies de 3-5% sur budget achats annuel (750k€-1,25M€)",
    "Prouver sécurisation approvisionnements vs risques actuels",
    "Rassurer sur qualité fournisseurs marketplace vs historiques",
    "Quantifier gain temps équipe achats pour tâches stratégiques",
    "Convaincre sur facilité adoption et ROI rapide"
  ],
  salesGoal: "Contrat Enterprise 36 mois = 180 000€ (5k€/mois)",
  expectedRevenue: "180 000€ TTC sur 3 ans",
  swot: {
    strengths: [
      "50 000 fournisseurs vérifiés vs 5 actuels (diversification)",
      "IA négociation automatisée vs processus manuels chronophages",
      "Analytics temps réel vs reporting Excel hebdomadaire",
      "Spécialisation industrie vs généralistes Amazon/Alibaba",
      "Garantie approvisionnement contractuelle vs dépendance fournisseurs",
      "Support français dédié vs call-centers offshore",
      "Intégration ERP Sage native vs silos de données"
    ],
    weaknesses: [
      "Startup 4 ans vs relations fournisseurs 12 ans établies",
      "Prix 5k€/mois vs négociation directe 'gratuite'",
      "Changement habitudes équipe vs maîtrise processus actuels",
      "Dépendance plateforme SaaS vs contrôle total interne",
      "Courbe apprentissage 3 mois vs efficacité immédiate"
    ],
    opportunities: [
      "Digitalisation achats industriels : marché 2,3Md€ croissance 12%/an",
      "Pression coûts post-COVID oblige optimisation achats",
      "Pénurie matières premières nécessite diversification fournisseurs",
      "Génération digital natives arrive aux achats (45% <35 ans)",
      "Réglementations supply chain (devoir vigilance) favorisent traçabilité"
    ],
    threats: [
      "Amazon Business attaque marché B2B avec pricing agressif",
      "SAP Ariba/Oracle améliore UX et baisse prix marketplace",
      "Récession économique réduit budgets transformation digitale",
      "Fournisseurs historiques contre-attaquent avec conditions préférentielles"
    ]
  },
  competitorSwot: {
    strengths: [
      "Relations personnelles établies depuis 12 ans avec 5 fournisseurs clés",
      "Négociations directes flexibles et conditions préférentielles obtenues",
      "Maîtrise parfaite processus par équipe achats expérimentée",
      "Coût apparent zéro (pas d'abonnement plateforme)",
      "Contrôle total sur confidentialité prix et stratégies achats"
    ],
    weaknesses: [
      "Vision prix marché limitée = suspicion surpaiement 12% vs marché",
      "Dépendance excessive 5 fournisseurs = risque rupture approvisionnement",
      "40% temps acheteurs perdu en négociations répétitives vs tâches stratégiques",
      "Aucun benchmark performance fournisseurs ou KPIs achats",
      "Processus papier chronophage et source d'erreurs (200 BC/mois)",
      "Gestion stock approximative = 70k€ surstockage identifié"
    ],
    opportunities: [
      "Maintien relations humaines directes avec fournisseurs partenaires",
      "Flexibilité totale sur conditions et délais de paiement",
      "Pas de formation équipe ni changement habitudes"
    ],
    threats: [
      "Concurrents adoptent marketplaces et obtiennent prix plus compétitifs",
      "Fournisseurs historiques augmentent prix faute d'alternative connue",
      "Équipe achats frustrée par outils obsolètes vs marché",
      "Perte opportunités économies 15% soit 375k€/an non récupérés"
    ]
  },
  probableObjections: [
    "Nos fournisseurs actuels nous conviennent parfaitement depuis 15 ans, on a des relations de confiance avec eux. Pourquoi bouleverser des partenariats qui marchent ?",
    "5000€/mois c'est énorme pour notre taille ! Ça représente 60k€/an soit 0,24% de notre CA. Comment justifier cette dépense face aux actionnaires familiaux qui demandent 8% d'économies ?",
    "Notre équipe achats a 48 ans de moyenne d'âge et maîtrise parfaitement les négociations directes. Ils vont résister à ce changement de méthode après 20 ans d'expérience.",
    "Comment être sûr que vos 50 000 fournisseurs sont aussi fiables que nos partenaires actuels ? Nous ne pouvons pas nous permettre une rupture sur les pièces critiques pour Renault.",
    "Et la confidentialité ? Nos prix négociés et nos plans industriels ne peuvent pas être visibles sur une plateforme externe. Comment garantir la sécurité de ces données sensibles ?",
    "Vos 15% d'économies, c'est calculé sur quoi ? Nous négocions déjà serré et nos fournisseurs locaux nous font des conditions préférentielles qu'une plateforme n'aura jamais.",
    "3 mois d'implémentation c'est impossible ! On ne peut pas arrêter nos approvisionnements pendant la montée en charge. Et former 6 acheteurs qui travaillent encore avec des catalogues papier ?",
    "Qu'est-ce qui nous garantit que cette marketplace existera encore dans 5 ans ? Si vous fermez, on se retrouve sans fournisseurs et on a perdu nos relations historiques.",
    "On fait de la métallurgie de précision, pas du commodity. Nos pièces nécessitent des adaptations techniques que seuls nos fournisseurs historiques maîtrisent vraiment.",
    "Et en cas de litige qualité ou de retard livraison ? Avec nos fournisseurs actuels, j'appelle directement le patron. Sur votre plateforme, qui sera responsable ?"
  ],
  successCriteria: [
    "Audit coûts actuels accepté révélant 8-15% d'économies potentielles",
    "Démonstration live convaincante avec cas d'usage métallurgie",
    "Validation technique intégration ERP Sage par DSI",
    "Références clients similaires (métallurgie/automobile) contactées",
    "Pilote 3 mois accepté sur 20% des achats non critiques",
    "Négociation tarif préférentiel PME familiale obtenue"
  ],
  tools: [
    "Audit économies potentielles achats actuels",
    "Calculateur ROI 36 mois avec économies vs investissement",
    "Benchmark prix matières vs marché (acier, alu, cuivre)",
    "Planificateur implémentation par phases sans rupture",
    "Simulateur performance fournisseurs actuels vs marketplace"
  ],
  stakeholders: [
    {
      name: "Christine Moreau",
      role: "Décisionnaire Principal - Directrice Achats",
      influence: "Très élevée",
      support: "Neutre-Positive (frustrations actuelles)",
      concerns: ["Qualité fournisseurs", "Adoption équipe", "ROI réel"],
      approach: "Audit économies + démonstration qualité + formation"
    },
    {
      name: "Pierre Dubois",
      role: "Validation Investissement - CEO",
      influence: "Décisive pour >25k€",
      support: "Neutre-Prudent (tradition familiale)",
      concerns: ["ROI business", "Disruption", "Relations fournisseurs"],
      approach: "Business case économies + préservation partenariats"
    },
    {
      name: "Sophie Martin",
      role: "Validation Budget - DAF",
      influence: "Élevée (contrôle financier)",
      support: "Neutre-Sceptique (coûts)",
      concerns: ["ROI financier", "Budget serré", "Risques"],
      approach: "Chiffrage précis économies + pilote limité"
    }
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'Procurement digital transformation expert',
      description: 'Révolution achats industriels et optimisation supply chain'
    },
    evidence: {
      title: 'Industriels achats optimisés',
      description: 'Vallourec, ArcelorMittal, Faurecia : -25% coûts, +40% efficacité'
    },
    pilot: {
      title: 'Pilote achats 90 jours',
      description: 'Test marketplace sur familles critiques avec garantie économies'
    },
    sequence: [
      'Audit processus achats : mapping workflow + pain points négociation',
      'Spend analysis : analyse 24 mois achats + potentiel optimisation',
      'Supplier assessment : évaluation portefeuille fournisseurs actuel',
      'Demo marketplace : simulation sourcing + négociation temps réel',
      'ROI calculation : économies achats + gains productivité équipe',
      'Pilote 90 jours : test familles critiques + mesure performances',
      'Validation gains : proof économies + amélioration KPIs achats',
      'Scaling plan : déploiement tous achats + formation équipe'
    ],
    leveragePoints: [
      'Inflation matières : +45% acier, marketplace = négociation optimisée',
      'Supply chain crisis : diversification fournisseurs = sécurisation',
      'Pressure marge : optimisation achats = survie compétitivité',
      'Digitalisation retard : concurrence avance, rattrapage urgent',
      'Équipe achats débordée : automatisation = focus valeur ajoutée'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "890B€ achats industriels Europe, 4200B$ mondial",
      growthRate: "+8% CAGR achats digitaux, +22% marketplaces B2B",
      budgetRange: "50K-200K€/an transformation achats, 0.1-0.3% spend",
      expectedROI: "-25% coûts achats, +40% efficacité équipe",
      timeline: "Urgence compétitivité : inflation + supply chain",
      keyPlayers: ["Ariba", "Jaggaer", "Ivalua", "Zycus", "Coupa"],
      digitalizationGap: "67% PME industrielles achats manuels",
      supplierRisk: "43% disruption supply chain 2024",
      costPressure: "+45% matières premières, optimisation critique"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Quantifier inefficacités achats + potentiel économies process",
      secondary: "Évaluer budget transformation + urgences supply chain",
      successMetrics: "RDV démonstration + accès données spend analysis"
    },
    rdv: {
      primary: "Démontrer ROI IndustryMarket via simulation négociations",
      secondary: "Valider pilote familles critiques + buy-in direction achats",
      successMetrics: "Pilote approuvé + budget alloué + timeline définie"
    }
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Relations fournisseurs",
      objection: "Nos fournisseurs historiques ne voudront pas passer par une marketplace",
      frequency: "Très fréquente" as const,
      responses: [
        "Vallourec gardait ses fournisseurs stratégiques en direct, marketplace pour sourcing nouveaux + négociation optimisée",
        "Vos fournisseurs bénéficient aussi : visibilité marché, process simplifié, paiements plus rapides",
        "ArcelorMittal : 'Nos fournisseurs nous remercient, relations plus transparentes et efficaces'"
      ],
      evidence: "Case study Vallourec approche hybride + testimonial ArcelorMittal",
      nextStep: "Stratégie déploiement respectueuse relations historiques"
    },
    {
      category: "Budget",
      objection: "120k€/an c'est cher, surtout si on n'est pas sûrs des économies",
      frequency: "Très fréquente" as const,
      responses: [
        "Vos achats de 8M€/an : 5% d'économies = 400k€. Notre solution = ROI 330% la première année",
        "Faurecia a économisé 680k€ première année avec investissement 150k€",
        "On garantit minimum 200k€ économies an 1 ou remboursement"
      ],
      evidence: "ROI Faurecia 680k€ + garantie contractuelle économies",
      nextStep: "Calcul ROI personnalisé sur votre spend + garantie performance"
    },
    {
      category: "Complexité changement",
      objection: "Christine et son équipe vont résister, elles ont leurs habitudes",
      frequency: "Fréquente" as const,
      responses: [
        "Interface simple comme Amazon Business, apprentissage 2h max",
        "Formation personnalisée + accompagnement change management inclus",
        "Responsable achats Vallourec : 'Impossible de revenir en arrière, trop d'efficacité gagnée'"
      ],
      evidence: "Interface intuitive + programme accompagnement + testimonial utilisatrice",
      nextStep: "Démonstration interface à Christine + plan accompagnement"
    },
    {
      category: "Timing",
      objection: "Période tendue avec inflation, pas le moment de changer",
      frequency: "Fréquente" as const,
      responses: [
        "C'est exactement le bon moment ! Inflation +45% matières = chaque % d'économie compte",
        "Faurecia a déployé en pleine crise COVID : économies immédiates cruciales pour survie",
        "Setup 6 semaines, économies dès les premières négociations"
      ],
      evidence: "Case study Faurecia déploiement crise + économies immédiates",
      nextStep: "Planning déploiement express compatible contraintes inflation"
    },
    {
      category: "Sécurité données",
      objection: "Nos données achats sont stratégiques, on ne peut pas les externaliser",
      frequency: "Occasionnelle" as const,
      responses: [
        "Données hébergées en Europe, conformité RGPD + ISO 27001, même niveau que vos banques",
        "Architecture zero-trust : vos données chiffrées, accès contrôlé, audit trail complet",
        "ArcelorMittal nous fait confiance pour 12B€ d'achats annuels"
      ],
      evidence: "Certifications sécurité + référence ArcelorMittal trust",
      nextStep: "Audit sécurité avec votre DSI + visite datacenters"
    }
  ]
};