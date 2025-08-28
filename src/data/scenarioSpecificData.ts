// Données spécifiques par scénario pour personnaliser l'expérience d'apprentissage

interface ScenarioSalesStrategy {
  approach: {
    title: string;
    description: string;
  };
  evidence: {
    title: string;
    description: string;
  };
  pilot: {
    title: string;
    description: string;
  };
  sequence: string[];
  leveragePoints: string[];
}

interface ScenarioMarketData {
  marketOverview: {
    marketSize: string;
    growthRate: string;
    budgetRange?: string;
    expectedROI?: string;
    timeline?: string;
    keyPlayers?: string[];
    currentProcessingTime?: string;
    errorRate?: string;
    costPerTransaction?: string;
  };
  technicalChallenges?: string[];
}

interface ScenarioObjectives {
  coldCall: {
    primary: string;
    secondary: string;
    successMetrics: string;
  };
  rdv: {
    primary: string;
    secondary: string;
    successMetrics: string;
  };
}

interface ScenarioObjections {
  category: string;
  objection: string;
  frequency: 'Très fréquente' | 'Fréquente' | 'Occasionnelle';
  responses: string[];
  evidence: string;
  nextStep: string;
  persona_adaptation?: string;
}

// ============= KPI PERFORMANCE (ÉCOLE DE COMMERCE) =============
const kpiPerformanceData = {
  salesStrategy: {
    approach: {
      title: 'Audit attribution marketing expert',
      description: 'Analyse complète fragmentation data et optimisation budgets publicitaires'
    },
    evidence: {
      title: 'Clients e-commerce similaires',
      description: 'TheKooples, Sézane, Maisons du Monde : +35% ROAS, -28% CAC'
    },
    pilot: {
      title: 'Pilote attribution 90 jours',
      description: 'Test sur 30% budget publicitaire avec garantie performance'
    },
    sequence: [
      'Audit attribution 360° : analyse stack actuel (GA4/Meta/Google/Klaviyo)',
      'Mapping customer journey : identification touchpoints non trackés',
      'Benchmark e-commerce mode : performance attribution vs 15 concurrents',
      'Démonstration live : dashboard attribution temps réel sur vos campagnes',
      'Business case personnalisé : ROI optimisation sur budget 80k€/mois',
      'Pilote 90 jours : tracking multi-touch attribution sur segments tests',
      'Mesure impact : gain ROAS et économies budget publicitaire',
      'Scaling plan : déploiement attribution complète + formation équipe'
    ],
    leveragePoints: [
      'Urgence Q1 2024 : lancement collection printemps = 40% CA annuel',
      'Budget gaspillé : 25-35% du budget publicitaire mal attribué',
      'Concurrence aggressive : autres marques mode optimisent déjà attribution',
      'Pression croissance : objectif 12M€ CA vs 8M€ actuel nécessite ROAS optimisé',
      'ROI immédiat : gains visibles dès 30 jours, payback 4-6 mois'
    ]
  },
  marketOverview: {
    marketSize: "4.8B€ Marketing Attribution France, 21B$ mondial",
    growthRate: "+28% CAGR France, +31% mondial",
    budgetRange: "15K-40K€/an PME, jusqu'à 200K€ enterprise",
    expectedROI: "35% gain ROAS moyenne, 28% réduction CAC",
    timeline: "Urgence Q1 2024 pour campagnes printemps",
    keyPlayers: ["Triple Whale", "Northbeam", "Mixpanel", "Segment", "Google Analytics"],
    marketPenetration: "23% e-commerce équipés attribution avancée",
    budgetWaste: "30-35% budget publicitaire mal attribué",
    roas: "ROAS moyen 3.5x vs 4.8x avec attribution optimisée",
    currentProcessingTime: "16h/semaine consolidation manuelle",
    errorRate: "25-30% erreurs attribution",
    costPerTransaction: "3.2€ coût attribution par commande"
  },

  objectives: {
    coldCall: {
      primary: "Identifier les problèmes d'attribution actuels",
      secondary: "Évaluer l'urgence optimisation budget publicitaire",
      successMetrics: "RDV avec directrice marketing + CTO obtenu"
    },
    rdv: {
      primary: "Démontrer l'optimisation ROAS possible",
      secondary: "Présenter le ROI sur budget 80k€/mois",
      successMetrics: "Validation pilote 90 jours sur segments tests"
    }
  },

  objections: [
    {
      category: "Budget Analytics",
      objection: "Le budget analytics est limité cette année",
      frequency: "Très fréquente" as const,
      responses: [
        "ROI 35% ROAS gain : 25k€ investis = 28k€ économies publicitaires/mois",
        "Pilote payant gagnant : coût pilote 5k€ vs 15k€ économies garanties",
        "Budget autofinancé : économies publicitaires > coût plateforme",
        "Paiement au résultat possible : pas de fee si objectifs ROAS non atteints"
      ],
      evidence: "Sézane : ROI 280% première année + 35% gain ROAS sur budget 120k€/mois",
      nextStep: "Simulation ROI sur votre budget 80k€/mois avec scénarios réalistes",
      persona_adaptation: "Focus optimisation budget pour Sophie, impact sur croissance pour Clara"
    },
    {
      category: "Formation équipe",
      objection: "L'équipe marketing n'a pas le temps de se former",
      frequency: "Fréquente" as const,
      responses: [
        "Formation intégrée au pilote : 6h réparties sur 3 semaines",
        "Sophie championne interne : formation approfondie puis cascade",
        "Interface intuitive : dashboard familier type GA4 enrichi",
        "Support réactif : chat support 9h-19h + onboarding dédié"
      ],
      evidence: "TheKooples : équipe marketing autonome en 15 jours, 0 résistance",
      nextStep: "Démonstration interface avec Sophie + planning formation personnalisé",
      persona_adaptation: "Rassurer sur simplicité et accompagnement progressif"
    },
    {
      category: "Intégration technique",
      objection: "L'intégration avec Shopify/Klaviyo sera complexe",
      frequency: "Très fréquente" as const,
      responses: [
        "Connecteurs natifs Shopify Plus + Klaviyo : installation 2-4h",
        "Thomas accompagné par notre CTO : support technique dédié",
        "Zéro impact checkout : tracking côté serveur, 0 latence",
        "API documentée + sandbox : tests complets avant prod"
      ],
      evidence: "Maisons du Monde : intégration Shopify + Klaviyo en 6h, 0 interruption",
      nextStep: "Audit technique avec Thomas + démonstration intégration sandbox",
      persona_adaptation: "Focus sécurité et performance pour Thomas, simplicité pour Sophie"
    },
    {
      category: "Timing campagnes",
      objection: "Nous lançons la collection printemps, pas le moment",
      frequency: "Fréquente" as const,
      responses: [
        "Justement le moment idéal : optimiser attribution AVANT pic trafic mars-mai",
        "Installation en janvier : opérationnel pour campagnes février-mars",
        "Gain critique : 40% CA annuel Q2-Q3 = attribution optimisée essentielle",
        "Support renforcé : équipe dédiée pendant lancement collection"
      ],
      evidence: "Sandro : attribution optimisée 30j avant collection été = +42% ROAS vs année précédente",
      nextStep: "Planning installation aligné sur calendrier campagnes printemps",
      persona_adaptation: "Montrer l'urgence business et l'avantage concurrentiel"
    },
    {
      category: "GA4 existant",
      objection: "Google Analytics 4 nous donne déjà les données nécessaires",
      frequency: "Très fréquente" as const,
      responses: [
        "GA4 = attribution last-click vs notre attribution multi-touch réelle",
        "GA4 échantillonnage + data modeling vs tracking 100% précis",
        "Cross-device + iOS 14.5 : GA4 perd 40-50% du tracking vs notre solution",
        "Business intelligence avancée : optimisation budgets vs reporting basique"
      ],
      evidence: "Étude 2024 : GA4 sous-estime 35% des conversions vs attribution multi-touch",
      nextStep: "Audit comparatif GA4 vs attribution réelle sur vos campagnes actuelles",
      persona_adaptation: "Expliquer les limites techniques GA4 et bénéfices business"
    },
    {
      category: "Concurrence",
      objection: "Nous regardons aussi Triple Whale qui est spécialisé e-commerce",
      frequency: "Fréquente" as const,
      responses: [
        "Triple Whale excellent pour Shopify basique, nous spécialisés mode/lifestyle",
        "Notre IA attribution vs leurs règles statiques : précision supérieure",
        "Intégration Klaviyo avancée : segmentation attribution vs basique Triple Whale",
        "Prix similaire mais ROI supérieur grâce à algorithmes propriétaires"
      ],
      evidence: "Migration Reformation de Triple Whale : +18% précision attribution en 90j",
      nextStep: "Benchmark live Triple Whale vs nous sur vos données + témoignage client",
      persona_adaptation: "Reconnaître qualités concurrent mais montrer différenciation technique"
    },
    {
      category: "Changement solution",
      objection: "Nous venons d'implémenter des changements, pourquoi encore bouger ?",
      frequency: "Fréquente" as const,
      responses: [
        "Pas de remplacement : enrichissement de vos outils actuels",
        "Installation non-intrusive : overlay sur GA4, pas de migration",
        "ROI immédiat : optimisation sans tout recommencer",
        "Complémentarité : garde GA4 + ajoute attribution précise"
      ],
      evidence: "Jacquemus : enrichissement stack existant, +31% ROAS sans migration",
      nextStep: "Audit de coexistence avec votre stack actuel",
      persona_adaptation: "Rassurer sur continuité pour Thomas, gains pour Sophie"
    },
    {
      category: "Preuves e-commerce mode",
      objection: "Avez-vous des références dans la mode éthique ?",
      frequency: "Occasionnelle" as const,
      responses: [
        "Clients mode actuels : Sézane, TheKooples, Maje, Isabel Marant",
        "Spécialisation lifestyle : compréhension cycles saisonniers et comportements",
        "Vertical mode éthique : Reformation, Gabriela Hearst, Veja trackées",
        "Croissance : +180% clients mode en 12 mois, 96% satisfaction"
      ],
      evidence: "Veja : +28% ROAS sur campagnes sneakers éthiques, attribution cross-device optimisée",
      nextStep: "Échange avec Sézane CMO pour retour d'expérience mode éthique",
      persona_adaptation: "Références sectorielles pour crédibilité auprès Sophie et Clara"
    }
  ] as ScenarioObjections[]
};

// ============= FINTECH STARTUP =============
const fintechStartupData = {
  salesStrategy: {
    approach: {
      title: 'Technical Deep Dive Expert',
      description: 'Analyse exhaustive algorithmes ML et architecture micro-services'
    },
    evidence: {
      title: 'Performance benchmarks en production',
      description: 'Tests live sur 50M+ transactions avec comparaisons A/B'
    },
    pilot: {
      title: 'Proof of concept risk-free',
      description: 'Intégration sandbox 45j avec garantie performance'
    },
    sequence: [
      'Audit technique complet : stack ML actuel, data pipeline, modèles en production',
      'Assessment security & compliance : PCI DSS, GDPR, Open Banking API',
      'Benchmark performance : tests comparatifs sur 6 mois données historiques',
      'Architecture review : scalabilité, latence, coûts infrastructure cloud',
      'POC intégration sandbox : API testing, load testing, fraud simulation',
      'Validation business case : ROI, réduction faux positifs, impact UX',
      'Go-live production : déploiement graduel avec monitoring 24/7',
      'Optimization continue : A/B testing et amélioration algorithmes'
    ],
    leveragePoints: [
      'Urgence réglementaire : PCI DSS Level 1 + Open Banking + DORA 2025',
      'Guerre concurrentielle : Revolut, N26, Monzo innovation perpétuelle',
      'Explosion fraude : +156% tentatives 2024, coût moyen 2.1M€/incident',
      'Hypercroissance : scaling 10x volumes sans dégradation performance',
      'Investor pressure : metrics de fraud detection dans due diligence levées'
    ]
  },
  marketOverview: {
    marketSize: "15.2B$ global fintech, 890M€ France",
    growthRate: "+22% CAGR global, +31% CAGR France",
    budgetRange: "2M-5M€ R&D (dont 30-40% sécurité/compliance)",
    expectedROI: "35% an 1, 180% cumulé 3 ans",
    timeline: "Q2 2025 (deadline DORA compliance)",
    keyPlayers: ["Stripe", "Adyen", "Checkout.com", "Klarna", "PayPal"],
    fraudLosses: "4.7B$ pertes fraude 2024, +23% vs 2023",
    regulatoryFines: "127M€ amendes ACPR/AMF 2024",
    customerAcquisition: "89€ CAC moyen, +45% vs banques",
    transactionLatency: "127ms moyenne vs 67ms néobanques leader",
    falsePositiveRate: "12-18% vs 3-5% meilleures solutions",
    complianceDelay: "14 mois average regulatory approval"
  },
  
  objectives: {
    coldCall: {
      primary: "Identifier le pain point principal en détection de fraude",
      secondary: "Évaluer budget R&D disponible", 
      successMetrics: "RDV avec CTO + CRO obtenu"
    },
    rdv: {
      primary: "Quantifier les pertes actuelles liées à la fraude",
      secondary: "Comprendre stack technique et contraintes",
      successMetrics: "Proof of concept approuvé avec timeline"
    }
  },
  
  objections: [
    {
      category: "Performance IA",
      objection: "Vos algorithmes sont-ils meilleurs que nos modèles internes ?",
      frequency: "Très fréquente" as const,
      responses: [
        "Notre ensemble de 12 modèles ML spécialisés vs modèle unique classique",
        "99.94% précision vs 96-98% standard industrie",
        "50ms temps de réponse vs 200-500ms solutions traditionnelles",
        "Learning continu : amélioration 0.2% précision/mois automatique"
      ],
      evidence: "Klarna : réduction 67% faux positifs et +23% détection vraie fraude en 6 mois",
      nextStep: "Benchmark live sur vos données historiques anonymisées",
      persona_adaptation: "Focus technique pour CTO, impact business pour CEO"
    },
    {
      category: "Conformité réglementaire",
      objection: "Comment assurez-vous la conformité PCI DSS et GDPR ?",
      frequency: "Fréquente" as const,
      responses: [
        "Certification PCI DSS Level 1 + audits trimestriels PwC",
        "GDPR by design : privacy differential, chiffrement end-to-end",
        "Hosting Europe (AWS Frankfurt) + data residency garantie",
        "Explainabilité IA pour audits régulateurs (ACPR/AMF compliant)"
      ],
      evidence: "Revolut : validation ACPR en 3 mois vs 12-18 mois habituels",
      nextStep: "Audit sécurité gratuit par notre RSSI certifié CISSP",
      persona_adaptation: "Rassurer sur conformité pour CRO, détails techniques pour DSI"
    },
    {
      category: "Scalabilité",
      objection: "Votre solution peut-elle gérer notre croissance ?",
      frequency: "Fréquente" as const,
      responses: [
        "Architecture cloud-native : auto-scaling 0 à 100K TPS en 30 secondes",
        "Références : Revolut (150M transactions/jour), N26 (45M users)",
        "Multi-cloud : AWS + GCP redondance, 99.99% SLA garanti",
        "Performance linéaire : coût par transaction diminue avec le volume"
      ],
      evidence: "Monzo : passage de 1M à 50M transactions/mois sans dégradation performance",
      nextStep: "Test de charge gratuit sur votre architecture cible",
      persona_adaptation: "Aspects techniques pour CTO, economics pour CFO"
    }
  ] as ScenarioObjections[]
};

// ============= RETAIL PERSONALIZATION =============
const retailPersonalizationData = {
  salesStrategy: {
    approach: {
      title: 'ROI-driven omnichannel analysis',
      description: 'Audit conversion 360° et UX journey mapping complet'
    },
    evidence: {
      title: 'Impact business mesurable',
      description: '+28% conversion, +42% panier moyen, +52% rétention'
    },
    pilot: {
      title: 'A/B test omnicanal risk-free',
      description: 'Validation ROI 60 jours avec garantie performance'
    },
    sequence: [
      'Audit UX omnicanal : web, mobile, magasin + journey mapping client',
      'Analyse funnel conversion : identification points de friction majeurs',
      'Data audit 360° : CRM, historique achats, comportements, préférences',
      'Segmentation IA avancée : personas dynamiques et prédiction intent',
      'Setup A/B test personnalisation : magasin pilote + contrôle',
      'Déploiement engine recommandations : temps réel cross-sell/up-sell',
      'Mesure impact business : conversion, CLV, satisfaction, NPS',
      'Scaling omnicanal : déploiement tous touchpoints + optimisation'
    ],
    leveragePoints: [
      'Urgence concurrentielle : Amazon Personal Shopper + pure players natifs IA',
      'Révolution attentes clients : 73% exigent personnalisation temps réel',
      'Objectifs croissance agressive : +30% e-commerce mandaté direction',
      'Pression marge critique : inflation + guerre prix = nécessité optimisation',
      'Transformation post-COVID : 156% augmentation attentes omnicanalité'
    ]
  },
  marketOverview: {
    marketSize: "943B$ e-commerce mondial, 156B€ France",
    growthRate: "+14.7% CAGR mondial, +11.6% France",
    budgetRange: "500K-1.5M€ (dont 40% tech, 35% data, 25% change)",
    expectedROI: "25% an 1, 78% cumulé 3 ans",
    timeline: "Q3 2025 (avant pic saisonnier)",
    keyPlayers: ["Amazon", "Shopify Plus", "Salesforce Commerce", "Adobe Commerce"],
    conversionBenchmark: "2.86% moyenne e-commerce vs 4.2% personnalisé",
    basketValue: "89€ moyenne vs 126€ avec personnalisation",
    customerRetention: "27% an 1 vs 41% avec personnalisation",
    dataUtilization: "23% retailers utilisent <30% leur data client",
    personalizationGap: "67% retailers sans personnalisation temps réel",
    mobileConversion: "1.84% vs 2.67% desktop (gap personnalisation)"
  },
  
  objectives: {
    coldCall: {
      primary: "Identifier les défis de personnalisation omnicanalité",
      secondary: "Évaluer maturité data et IA",
      successMetrics: "RDV avec directeur digital obtenu"
    },
    rdv: {
      primary: "Démontrer ROI personnalisation sur conversion",
      secondary: "Présenter intégration stack existant",
      successMetrics: "Pilote magasin test autorisé"
    }
  },
  
  objections: [
    {
      category: "ROI personnalisation",
      objection: "Le ROI de la personnalisation est-il vraiment prouvé ?",
      frequency: "Très fréquente" as const,
      responses: [
        "+28% conversion rate moyenne avec notre IA vs +12% outils basiques",
        "+42% panier moyen grâce recommandations cross-sell intelligentes", 
        "ROI 4.2x en moyenne sur 12 mois (investissement 300K€ = +1.26M€ CA)",
        "98% clients voient amélioration dès mois 2"
      ],
      evidence: "La Redoute : +34% CA online et +52% taux de rétention en 8 mois",
      nextStep: "Simulation ROI personnalisée avec vos métriques actuelles",
      persona_adaptation: "Focus chiffres pour CFO, expérience client pour CMO"
    },
    {
      category: "Complexité technique",
      objection: "L'intégration sera trop complexe avec notre stack existant",
      frequency: "Fréquente" as const,
      responses: [
        "API-first : intégration 24-48h avec Shopify, Magento, WooCommerce, custom",
        "Pas de migration data : connexion directe à vos bases existantes",
        "Mode SaaS : zéro infrastructure à gérer de votre côté",
        "Support technique 24/7 pendant onboarding (2-3 semaines)"
      ],
      evidence: "Sézane : intégration Shopify Plus en 36h, live en production sans interruption",
      nextStep: "Audit technique gratuit de votre architecture actuelle",
      persona_adaptation: "Simplicité pour équipes métier, robustesse pour IT"
    },
    {
      category: "Données clients",
      objection: "Avons-nous suffisamment de données pour la personnalisation ?",
      frequency: "Fréquente" as const,
      responses: [
        "Minimum viable : 3 mois historique + 1000 clients actifs pour démarrer",
        "Enrichissement automatique : +67% data clients via comportement temps réel",
        "Sources multiples : CRM + web + mobile + magasin = vue client 360°",
        "Cold start : algorithmes performants même avec peu de données initiales"
      ],
      evidence: "Darty : amélioration 45% recommandations dès semaine 3 avec données limitées",
      nextStep: "Audit data gratuit : évaluation potentiel personnalisation",
      persona_adaptation: "Faisabilité technique pour IT, business case pour marketing"
    }
  ] as ScenarioObjections[]
};

// ============= DIGITAL AGENCY =============
const digitalAgencyData = {
  salesStrategy: {
    approach: {
      title: 'Audit productivité agence expert',
      description: 'Analyse workflow 360° et benchmark performance concurrentielle'
    },
    evidence: {
      title: 'ROI client et marge prouvés',
      description: '+5-8% marge, +156% performance vs agences classiques'
    },
    pilot: {
      title: 'Test équipe risk-free',
      description: 'Preuve efficacité 30j sur projet client réel'
    },
    sequence: [
      'Audit workflow complet : mapping processus actuels vs best practices',
      'Analyse competitive : benchmark 12 agences tier 1 équipées',
      'Assessment ROI client : impact tools sur performance et satisfaction',
      'Démonstration live sur projet client réel en cours',
      'Test 30 jours équipe pilote : validation gains productivité',
      'Business case personnalisé : ROI marge et différenciation',
      'Formation équipe et change management',
      'Déploiement global avec KPIs tracking performance'
    ],
    leveragePoints: [
      'Guerre concurrentielle : agences réseau mieux organisées + automation avancée',
      'Exigences clients croissantes : qualité premium + réactivité + transparence',
      'Objectif marge critique : 30% imposé direction vs 22% actuel',
      'Différenciation obligatoire : commoditisation services digitaux',
      'ROI immédiat : gains visibles dès premier mois déploiement'
    ]
  },
  marketOverview: {
    marketSize: "567B$ services digitaux, 45B€ France",
    growthRate: "+11.2% CAGR mondial, +8.7% France",
    budgetRange: "200K-800K€ (selon taille agence)",
    expectedROI: "30% an 1, 67% cumulé 3 ans",
    timeline: "Q1 2025 (avant rush projets printemps)",
    keyPlayers: ["Publicis", "Havas", "Wunderman Thompson", "agences boutiques"],
    marginPressure: "Marge moyenne 22% vs 30% objectif direction",
    clientRetention: "73% vs 89% agences équipées outils performance",
    timeToDeliver: "23% plus lent vs agences outillées",
    talentRetention: "67% vs 84% agences avec stack moderne"
  },
  
  objectives: {
    coldCall: {
      primary: "Identifier pain points productivité et marge",
      secondary: "Évaluer appétit innovation outils",
      successMetrics: "RDV avec COO/CEO obtenu"
    },
    rdv: {
      primary: "Quantifier gains productivité et différenciation",
      secondary: "Démontrer ROI client et rétention équipe",
      successMetrics: "Pilote sur 1 client approuvé"
    }
  },
  
  objections: [
    {
      category: "Différenciation compétitive",
      objection: "Qu'est-ce qui vous différencie des autres agences ?",
      frequency: "Très fréquente" as const,
      responses: [
        "Approche data-driven : 47 KPIs trackés vs 8-12 agences traditionnelles",
        "Stack propriétaire : automation 78% tâches répétitives", 
        "ROI clients : +156% performance moyenne vs -23% agences classiques",
        "Équipe senior : 8.3 ans expérience moyenne vs 4.2 ans marché"
      ],
      evidence: "Sézane : +89% qualified leads et -34% cost per acquisition en 6 mois",
      nextStep: "Audit gratuit de votre performance digitale actuelle",
      persona_adaptation: "Preuves techniques pour CMO, ROI pour CEO"
    },
    {
      category: "Engagement long terme",
      objection: "Comment s'assurer d'un partenariat durable ?",
      frequency: "Fréquente" as const,
      responses: [
        "Contrats performance : paiement lié aux résultats obtenus",
        "Transparence totale : accès direct à tous dashboards et data",
        "Équipe dédiée : même interlocuteurs sur toute la durée",
        "Formation incluse : autonomisation progressive de vos équipes"
      ],
      evidence: "94% de nos clients nous font confiance depuis 3+ ans",
      nextStep: "Rencontre avec clients référents pour témoignage direct",
      persona_adaptation: "Sécuriser la relation pour dirigeants"
    }
  ] as ScenarioObjections[]
};

// ============= CYBERSECURITY CONSULTING =============
const cybersecurityConsultingData = {
  salesStrategy: {
    approach: {
      title: 'Risk assessment',
      description: 'Audit sécurité et gap analysis'
    },
    evidence: {
      title: 'Conformité prouvée',
      description: '97% taux conformité clients'
    },
    pilot: {
      title: 'Audit gratuit',
      description: 'Évaluation risques 15 jours'
    },
    sequence: [
      'Audit sécurité gratuit et gap analysis NIS2',
      'Risk assessment et cartographie menaces',
      'Roadmap conformité personnalisée',
      'Tests pénétration et validation',
      'Mise en conformité et certification'
    ],
    leveragePoints: [
      'Urgence conformité NIS2/DORA 2024',
      'Multiplication cyberattaques secteur',
      'Coûts incidents vs coûts prévention',
      'Exigences clients et partenaires',
      'Réputation et continuité business'
    ]
  },
  marketOverview: {
    marketSize: "345B$ cybersécurité mondiale",
    growthRate: "+12.5% CAGR",
    budgetRange: "80K-300K€",
    expectedROI: "400%",
    timeline: "Q1 2025 (urgence NIS2)"
  },
  
  objectives: {
    coldCall: {
      primary: "Identifier niveau maturité cybersécurité actuel",
      secondary: "Évaluer urgence conformité réglementaire",
      successMetrics: "Audit de sécurité gratuit accepté"
    },
    rdv: {
      primary: "Quantifier risques et coûts non-conformité",
      secondary: "Présenter roadmap conformité NIS2/DORA",
      successMetrics: "Contrat audit complet signé"
    }
  },
  
  objections: [
    {
      category: "Expertise sectorielle",
      objection: "Avez-vous l'expertise spécifique à notre secteur ?",
      frequency: "Fréquente" as const,
      responses: [
        "15+ années cybersécurité financière : banques, assurance, fintech",
        "Certifications : CISSP, CISM, ISO 27001 Lead Auditor",
        "Connaissance réglementaire : NIS2, DORA, PCI DSS expert",
        "200+ audits menés : secteur bancaire, 97% taux de conformité atteint"
      ],
      evidence: "Crédit Agricole : 100% conformité DORA anticipée + 0 incidents majeurs sur 24 mois",
      nextStep: "Présentation de nos cas clients bancaires similaires",
      persona_adaptation: "Expertises techniques pour RSSI, conformité pour DG"
    },
    {
      category: "Coût / Budget",
      objection: "Les audits de sécurité coûtent très cher",
      frequency: "Très fréquente" as const,
      responses: [
        "ROI prouvé : 1€ investi en audit = 15€ économisés en incidents évités",
        "Approche modulaire : commencer par l'essentiel, étalement possible",
        "Subventions disponibles : BPI France cybersécurité jusqu'à 50%",
        "Coût incident majeur : 2.5M€ moyenne vs 50K€ audit complet"
      ],
      evidence: "Société Générale : audit 80K€ a permis d'éviter incident estimé à 12M€",
      nextStep: "Évaluation gratuite de votre niveau de risque actuel",
      persona_adaptation: "ROI pour direction, impacts techniques pour RSSI"
    }
  ] as ScenarioObjections[]
};

// ============= SAAS HR TOOL =============
const saasHrToolData = {
  salesStrategy: {
    approach: {
      title: 'Scale-up expertise',
      description: 'Audit processus RH croissance'
    },
    evidence: {
      title: 'Adoption rapide',
      description: '94% taux adoption équipes'
    },
    pilot: {
      title: 'Département test',
      description: 'Validation UX 30 jours'
    },
    sequence: [
      'Audit processus RH et identification goulots',
      'Cartographie intégrations SIRH existant',
      'Pilote département avec formation équipe',
      'Mesure gains productivité et satisfaction',
      'Déploiement global et change management'
    ],
    leveragePoints: [
      'Hypercroissance et scaling pains',
      'Guerre des talents et rétention',
      'Coûts inefficacité processus manuels',
      'Attentes employés outils modernes',
      'Compliance et reporting automatisé'
    ]
  },
  marketOverview: {
    marketSize: "320B$ HR tech mondiale",
    growthRate: "+10.4% CAGR",
    budgetRange: "50K-200K€",
    expectedROI: "180%",
    timeline: "Q2 2024 (avant recrutements été)"
  },
  
  objectives: {
    coldCall: {
      primary: "Identifier défis RH hypercroissance scale-up",
      secondary: "Évaluer douleur processus manuels actuels",
      successMetrics: "RDV avec DRH + CEO obtenu"
    },
    rdv: {
      primary: "Quantifier coût inefficacités RH actuelles",
      secondary: "Démontrer ROI automation et analytics",
      successMetrics: "Pilote département test autorisé"
    }
  },
  
  objections: [
    {
      category: "Adoption utilisateur",
      objection: "Comment garantir l'adoption par nos équipes RH ?",
      frequency: "Très fréquente" as const,
      responses: [
        "Taux adoption moyen 94% vs 67% solutions RH traditionnelles",
        "Interface intuitive : 2h formation vs 2-3 jours outils complexes",
        "Support dédié : success manager assigné pendant 12 mois",
        "Change management inclus : méthodologie éprouvée sur 150+ déploiements"
      ],
      evidence: "BNP Paribas : 97% adoption en 3 mois sur 2400 utilisateurs RH",
      nextStep: "Démonstration UX avec vos cas d'usage réels",
      persona_adaptation: "Simplicité pour utilisateurs RH, ROI pour DRH"
    },
    {
      category: "Intégration SIRH",
      objection: "L'intégration avec notre SIRH actuel sera compliquée",
      frequency: "Fréquente" as const,
      responses: [
        "Connecteurs natifs : Workday, SuccessFactors, ADP, Cegid Meta4",
        "API RESTful ouverte : intégration custom en 3-5 jours",
        "Migration data sécurisée : 99.98% intégrité garantie",
        "Mode hybrid : coexistence temporaire pendant transition"
      ],
      evidence: "L'Oréal : intégration SuccessFactors en 4 jours, 0 perte de data",
      nextStep: "Audit technique gratuit de votre SIRH actuel",
      persona_adaptation: "Simplicité technique pour IT, continuité pour RH"
    }
  ] as ScenarioObjections[]
};

// ============= MANUFACTURING IOT =============
const manufacturingIotData = {
  salesStrategy: {
    approach: {
      title: 'Industry 4.0 audit',
      description: 'Analyse OEE et maintenance'
    },
    evidence: {
      title: 'ROI industriel',
      description: '+22% OEE moyenne clients'
    },
    pilot: {
      title: 'Ligne pilote',
      description: 'Test IoT ligne production'
    },
    sequence: [
      'Audit industrie 4.0 et analyse OEE actuel',
      'Cartographie équipements et compatibilité',
      'Pilote IoT sur ligne de production test',
      'Validation gains OEE et prédictive',
      'Déploiement usine et scaling multi-sites'
    ],
    leveragePoints: [
      'Pression compétitivité internationale',
      'Coûts downtimes et maintenance',
      'Objectifs OEE et excellence opérationnelle',
      'Transition Industry 4.0 obligatoire',
      'Attraction talents et modernisation'
    ]
  },
  marketOverview: {
    marketSize: "750B$ Industry 4.0 mondial",
    growthRate: "+16.9% CAGR",
    budgetRange: "300K-1.2M€",
    expectedROI: "220%",
    timeline: "Q3 2024 (avant pic production)"
  },
  
  objectives: {
    coldCall: {
      primary: "Identifier défis OEE et maintenance prédictive",
      secondary: "Évaluer maturité digitale usine",
      successMetrics: "Visite site + audit gratuit acceptés"
    },
    rdv: {
      primary: "Quantifier gains OEE et réduction downtimes",
      secondary: "Démontrer ROI maintenance prédictive",
      successMetrics: "Pilote ligne production autorisé"
    }
  },
  
  objections: [
    {
      category: "Intégration systèmes legacy",
      objection: "Comment intégrer avec nos équipements industriels existants ?",
      frequency: "Très fréquente" as const,
      responses: [
        "Connecteurs natifs : 200+ protocoles industriels (Modbus, OPC-UA, MQTT...)",
        "Gateway IoT propriétaire : retrofit équipements anciens sans modification",
        "API universelle : intégration ERP/MES en 48-72h",
        "Backward compatibility : équipements 15+ ans supportés"
      ],
      evidence: "Michelin : intégration 847 machines sur 12 sites en 4 mois sans arrêt production",
      nextStep: "Audit technique gratuit de votre parc machines",
      persona_adaptation: "Compatibilité technique pour ingénieurs, ROI pour direction industrielle"
    },
    {
      category: "Sécurité industrielle",
      objection: "L'IoT représente un risque de sécurité pour nos lignes",
      frequency: "Fréquente" as const,
      responses: [
        "Réseau séparé : segmentation totale IT/OT avec firewall industriel",
        "Chiffrement bout en bout : AES-256 + certificats X.509",
        "Conformité IEC 62443 : standard cybersécurité industriel",
        "Monitoring 24/7 : détection anomalies et réponse automatique"
      ],
      evidence: "Airbus : déploiement sur lignes A350 sans incident sécurité depuis 2 ans",
      nextStep: "Audit sécurité gratuit de votre architecture industrielle",
      persona_adaptation: "Sécurité technique pour RSSI, continuité pour production"
    }
  ] as ScenarioObjections[]
};

// ============= INDUSTRIAL MARKETPLACE =============
const industrialMarketplaceData = {
  salesStrategy: {
    approach: {
      title: 'Procurement optimization',
      description: 'Audit processus achats'
    },
    evidence: {
      title: 'Économies prouvées',
      description: '-23% coûts achats moyens'
    },
    pilot: {
      title: 'Catégorie test',
      description: 'Pilote achats spécifiques'
    },
    sequence: [
      'Audit processus achats et spend analysis',
      'Mapping fournisseurs secteur et qualification',
      'Pilote catégorie achats avec sourcing',
      'Mesure économies et gains efficacité',
      'Déploiement toutes catégories et intégration ERP'
    ],
    leveragePoints: [
      'Pression coûts et optimisation budgets',
      'Complexité sourcing et qualification',
      'Délais approvisionnement critiques',
      'Compliance et traçabilité fournisseurs',
      'Digitalisation fonction achats'
    ]
  },
  marketOverview: {
    marketSize: "12.1T$ procurement B2B mondial",
    growthRate: "+8.4% CAGR",
    budgetRange: "200K-800K€",
    expectedROI: "150%",
    timeline: "Q4 2024 (optimisation budgets 2025)"
  },
  
  objectives: {
    coldCall: {
      primary: "Identifier inefficacités processus achats actuels",
      secondary: "Évaluer volume et complexité sourcing",
      successMetrics: "RDV avec directeur achats obtenu"
    },
    rdv: {
      primary: "Quantifier économies et gains efficacité",
      secondary: "Démontrer intégration ERP et conformité",
      successMetrics: "Pilote catégorie achats approuvé"
    }
  },
  
  objections: [
    {
      category: "Réseau fournisseurs",
      objection: "Avez-vous suffisamment de fournisseurs dans notre secteur ?",
      frequency: "Fréquente" as const,
      responses: [
        "12 000+ fournisseurs industriels qualifiés dans 47 secteurs",
        "Network effects : +340 nouveaux fournisseurs/mois organiquement",
        "Scoring qualité : 98.7% livraisons conformes sur 2.1M commandes", 
        "Spécialisation : 2400+ fournisseurs spécialisés votre secteur exact"
      ],
      evidence: "Bouygues Construction : 67% réduction délais approvisionnement et -23% coûts sur 18 mois",
      nextStep: "Mapping personnalisé fournisseurs disponibles pour vos besoins",
      persona_adaptation: "Réseau pour acheteurs, economics pour direction achats"
    },
    {
      category: "Contrôle qualité",
      objection: "Comment vous assurez-vous de la qualité des fournisseurs ?",
      frequency: "Très fréquente" as const,
      responses: [
        "Due diligence complète : audit financier, technique, compliance",
        "Scoring dynamique : 47 critères trackés en temps réel",
        "Reviews clients : notation transparente par pairs",
        "Garantie qualité : remboursement intégral si non-conformité"
      ],
      evidence: "Vinci : 99.2% satisfaction fournisseurs vs 87% processus traditionnel",
      nextStep: "Démonstration du processus de qualification fournisseurs",
      persona_adaptation: "Processus pour qualité, résultats pour achats"
    }
  ] as ScenarioObjections[]
};

// ============= EXPORT FUNCTION =============
export const getScenarioData = (scenarioId: string): any => {
  const dataMap = {
    'kpi-performance': kpiPerformanceData,
    'fintech-startup': fintechStartupData,
    'retail-personalization': retailPersonalizationData,
    'digital-agency': digitalAgencyData,
    'cybersecurity-consulting': cybersecurityConsultingData,
    'saas-hr-tool': saasHrToolData,
    'manufacturing-iot': manufacturingIotData,
    'industrial-marketplace': industrialMarketplaceData
  };
  
  return dataMap[scenarioId as keyof typeof dataMap] || kpiPerformanceData;
};