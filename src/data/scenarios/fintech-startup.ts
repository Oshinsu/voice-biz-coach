import { Scenario } from './types';

export const fintechStartupScenario: Scenario = {
  id: "fintech-startup",
  title: "Solution CreditAI pour Fintech",
  description: "Vendre une solution d'évaluation crédit par IA à une fintech émergente spécialisée dans le crédit aux PME",
  difficulty: "Difficile",
  probability: 42,
  company: {
    name: "FlexCredit",
    sector: "Fintech - Crédit PME",
    size: "25 employés",
    revenue: "2.5M€/an",
    location: "Paris, France",
    description: "Fintech fondée en 2020 spécialisée dans le crédit express aux PME. Algorithmes propriétaires d'évaluation risque. 5000+ dossiers traités, ticket moyen 45k€. Levée série A 3M€ en 2023. Objectif : 50M€ de crédit distribué en 2024.",
    painPoints: [
      "Évaluation crédit manuelle chronophage : 4h/dossier vs 30min concurrence",
      "Taux défaut 3.2% supérieur objectif 2% réglementaire",
      "Croissance bridée par capacité analyse : 50 dossiers/semaine max",
      "Concurrence néobanques avec IA avancée (Qonto, Pennylane)",
      "Pression réglementaire Banque de France sur ratios prudentiels"
    ],
    currentSolution: "Score interne basique + vérifications manuelles + Banque de France",
    budget: "100-200k€ pour tech credit scoring",
    timeline: "Q2 2024 - urgence réglementaire",
    foundedYear: 2020,
    keyPeople: [
      "Thomas Dubois - CEO (Ex-BNP Paribas, expert financement PME)",
      "Sarah Cohen - CTO (Ex-Dataiku, spécialiste ML finance)",
      "Marc Leroy - Head of Risk (Ex-Société Générale)"
    ]
  },
  interlocutor: {
    name: "Marc Leroy",
    role: "Head of Risk & Compliance",
    personality: "Rigoureux et prudent, ancien banquier traditionnel reconverti fintech. Obsédé par la conformité réglementaire et la gestion du risque. Méticuleux sur les validations et preuves statistiques.",
    communicationStyle: "Technique et précis, pose des questions sur les modèles statistiques. Adore les backtests et validations historiques. Sceptique face aux promesses commerciales sans preuves.",
    decisionPower: "Décisionnaire technique jusqu'à 150k€, validation CEO/CTO pour stratégique",
    priorities: [
      "Réduction taux défaut sous 2% (obligation réglementaire)",
      "Accélération processus credit scoring (4h vers 30min)",
      "Conformité Banque de France et ACPR",
      "Montée en charge analyse (100 dossiers/semaine)",
      "Amélioration predictibilité cash-flow"
    ],
    concerns: [
      "Fiabilité modèles IA vs méthodes éprouvées",
      "Explicabilité décisions pour autorités (RGPD, Banque de France)",
      "Intégration avec stack tech existant",
      "Validation réglementaire nouveau modèle",
      "Temps formation équipe risk (5 analystes)"
    ],
    motivations: [
      "Excellence professionnelle : construire meilleur credit scoring France",
      "Conformité réglementaire : éviter sanctions Banque de France",
      "Innovation fintech : moderniser finance traditionnelle"
    ],
    experience: "15 ans finance : 10 ans Société Générale (risk management), 3 ans consultant fintech, 2 ans FlexCredit. Master Finance Dauphine + CFA."
  },
  product: {
    name: "CreditAI Engine",
    description: "Solution IA avancée d'évaluation crédit PME. Machine Learning sur 100M+ dossiers européens. APIs temps réel, explicabilité réglementaire, conformité Banque de France. Réduction 70% temps analyse.",
    pricing: {
      starter: "2000€/mois (500 analyses/mois, API standard)",
      professional: "5000€/mois (2000 analyses/mois, explicabilité avancée)",
      enterprise: "12000€/mois (analyses illimitées, modèles custom, support dédié)"
    },
    keyFeatures: [
      "IA prédictive 94% précision vs 87% méthodes traditionnelles",
      "Analyse 30min vs 4h processus manuel actuel",
      "Explicabilité réglementaire (RGPD, Banque de France)",
      "APIs temps réel intégration CRM/workflow",
      "Dashboard risk avec alertes automatiques",
      "Backtesting historique sur 5+ ans données",
      "Scoring multidimensionnel (financier, comportemental, sectoriel)",
      "Conformité Bâle III et directives européennes",
      "Machine Learning adaptatif selon portefeuille",
      "Rapports compliance automatiques"
    ],
    competitiveAdvantages: [
      "Spécialisation PME française vs modèles génériques US",
      "Explicabilité complète vs boîtes noires concurrentes",
      "Dataset 100M+ dossiers européens vs 10M competitors",
      "Support réglementaire français vs offshore",
      "Intégration native fintechs vs banques traditionnelles"
    ],
    roi: "Clients similaires : -40% taux défaut, +300% vitesse analyse, +150% capacité traitement",
    implementationTime: "6 semaines : 2 sem integration + 2 sem calibrage + 2 sem validation"
  },
  objectives: [
    "Démontrer réduction taux défaut 3.2% vers 2%",
    "Prouver accélération analyse 4h vers 30min",
    "Rassurer conformité réglementaire Banque de France",
    "Quantifier ROI sur capacité traitement dossiers",
    "Convaincre fiabilité vs méthodes actuelles"
  ],
  salesGoal: "Contrat Professional 12 mois = 60,000€",
  expectedRevenue: "60,000€ première année",
  swot: {
    strengths: [
      "IA 94% précision vs 87% méthodes traditionnelles",
      "Dataset 100M+ dossiers européens unique",
      "Explicabilité réglementaire complète",
      "Spécialisation PME française",
      "Support réglementaire expert Banque de France"
    ],
    weaknesses: [
      "Startup 2 ans vs établis (FICO, SAS)",
      "Prix premium vs solutions basiques",
      "Dépendance données clients qualité",
      "Courbe apprentissage équipe risk"
    ],
    opportunities: [
      "Réglementation renforce exigences IA explicable",
      "Croissance fintech PME +45%/an",
      "Digitalisation accelerée post-COVID",
      "Pénurie analystes credit qualifiés"
    ],
    threats: [
      "FICO/SAS développent solutions similaires",
      "Récession augmente défauts imprévisibles",
      "Changements réglementaires Banque de France",
      "Concurrents néobanques mutualisent coûts"
    ]
  },
  competitorSwot: {
    strengths: [
      "Processus manuel maîtrisé par équipe",
      "Relations directes Banque de France",
      "Connaissance secteurs PME locaux"
    ],
    weaknesses: [
      "4h/dossier vs 30min marché",
      "Taux défaut 3.2% vs objectif 2%",
      "Capacité limitée 50 dossiers/semaine",
      "Subjectivité analyse humaine"
    ],
    opportunities: [
      "Amélioration continue processus existants",
      "Formation équipe sur nouveaux critères"
    ],
    threats: [
      "Retard technologique vs concurrence",
      "Sanctions réglementaires si taux défaut maintenu",
      "Perte parts marché face néobanques automatisées"
    ]
  },
  probableObjections: [
    "5000€/mois pour une fintech de notre taille c'est énorme ! Ça représente 10% de notre budget tech annuel.",
    "Nos analystes connaissent parfaitement les PME françaises. Comment une IA peut-elle remplacer cette expertise humaine ?",
    "La Banque de France va-t-elle vraiment accepter vos modèles ? Il nous faut des garanties écrites sur la conformité réglementaire.",
    "94% de précision c'est calculé sur quel échantillon ? Nos PME sont spécifiques, vos données d'entraînement sont-elles représentatives ?",
    "Et si vos modèles se trompent et qu'on prête à des entreprises qui font défaut ? Qui sera responsable des pertes ?",
    "6 semaines d'implémentation en pleine croissance c'est risqué. On ne peut pas arrêter d'analyser pendant la transition.",
    "Comment expliquer à un client PME refusé que c'est une IA qui a décidé ? Ça ne passera jamais auprès de nos entrepreneurs.",
    "Vos concurrents FICO et SAS ont 30 ans d'expérience. Pourquoi prendre le risque avec une startup de 2 ans ?",
    "Les données de nos clients PME sont ultra-sensibles. Comment garantir la sécurité et la confidentialité ?",
    "Si on atteint nos objectifs sans votre solution, pourquoi changer quelque chose qui marche déjà ?"
  ],
  successCriteria: [
    "Validation technique conformité Banque de France",
    "Backtest sur données historiques FlexCredit",
    "Références fintech similaires contactées",
    "Démonstration live sur vrais dossiers",
    "Pilote 3 mois sur 30% portefeuille non-critique",
    "Formation équipe risk incluse"
  ],
  tools: [
    "Audit conformité réglementaire actuelle",
    "Backtest prédictif sur historique 2 ans",
    "Calculateur ROI réduction défauts",
    "Comparateur temps/coût vs méthodes actuelles",
    "Simulateur montée charge 100 dossiers/semaine"
  ],
  stakeholders: [
    {
      name: "Marc Leroy",
      role: "Décisionnaire Principal - Head of Risk",
      influence: "Très élevée",
      support: "Neutre-Sceptique",
      concerns: ["Conformité réglementaire", "Fiabilité modèles", "Formation équipe"],
      approach: "Validation technique + conformité + backtests"
    },
    {
      name: "Thomas Dubois",
      role: "Validation Stratégique - CEO",
      influence: "Décisive pour budget >100k€",
      support: "Neutre-Positif (croissance)",
      concerns: ["ROI business", "Risque réglementaire", "Compétitivité"],
      approach: "Business case croissance + avantage concurrentiel"
    },
    {
      name: "Sarah Cohen",
      role: "Validation Technique - CTO",
      influence: "Élevée (intégration tech)",
      support: "Neutre-Positif (innovation)",
      concerns: ["Architecture technique", "APIs", "Scalabilité"],
      approach: "Démonstration technique + intégration stack"
    }
  ],

  // Stratégie commerciale intégrée
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

  // Données marché intégrées
  marketData: {
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
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
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

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Performance IA",
      objection: "Vos algorithmes sont-ils meilleurs que nos modèles internes ?",
      frequency: "Très fréquente" as const,
      responses: [
        "Nos modèles sont entraînés sur 500M+ transactions cross-sectorielles vs vos données limitées au secteur",
        "Benchmark indépendant Forrester : 94% précision vs 78% moyenne marché",
        "Tests A/B chez 15 fintech similaires : -35% faux positifs, +28% détection fraude"
      ],
      evidence: "Benchmark Forrester 2024 + résultats live clients",
      nextStep: "POC comparatif sur vos données historiques 6 mois"
    },
    {
      category: "Sécurité",
      objection: "Confier nos données de paiement à un prestataire externe, c'est risqué",
      frequency: "Très fréquente" as const,
      responses: [
        "Nous sommes certifiés PCI DSS Level 1, même niveau que Stripe/Adyen",
        "Nos datacenters sont en Europe, conformité GDPR native + audit Big4 trimestriel",
        "Architecture zero-trust : vos données restent chiffrées en permanence"
      ],
      evidence: "Certifications + audit trail + clients Tier 1 banking",
      nextStep: "Audit sécurité avec votre RSSI + visite datacenter"
    },
    {
      category: "Coût",
      objection: "2M€ sur 3 ans c'est énorme pour une startup",
      frequency: "Fréquente" as const,
      responses: [
        "Vos pertes fraude actuelles : 1.8M€/an. Notre ROI : break-even 14 mois",
        "Coût faux positifs : 340k€/an client frustration. Réduction 35% = 120k€ économies",
        "Modèle SaaS évolutif : vous payez selon votre croissance"
      ],
      evidence: "Calcul ROI personnalisé + cas clients croissance similaire",
      nextStep: "Business case détaillé avec CFO + modèle pricing adaptatif"
    }
  ],

  // Métriques de performance spécifiques fintech
  performanceMetrics: {
    kpis: [
      { name: "Taux de défaut", current: "3.2%", target: "2%", category: "Risque" },
      { name: "Temps d'analyse", current: "4h", target: "30min", category: "Efficacité" },
      { name: "Capacité hebdo", current: "50 dossiers", target: "100 dossiers", category: "Volume" },
      { name: "Ticket moyen", current: "45k€", target: "50k€", category: "Business" }
    ],
    industrySpecific: {
      defaultRate: "3.2% vs objectif 2% (obligation réglementaire)",
      processingTime: "4h/dossier vs 30min concurrence",
      weeklyCapacity: "50 dossiers/semaine max (objectif 100)",
      averageTicket: "45k€ crédit moyen PME"
    }
  },

  // Conseils tactiques approche commerciale fintech
  tacticalAdvice: {
    coldCall: [
      "Éviter fin de trimestre (reporting réglementaire)",
      "Axer conformité réglementaire urgente",
      "Profil analytique précis, preuves statistiques"
    ],
    rdv: [
      "Présentation technique 45min avec backtests",
      "Focus taux défaut + vitesse analyse + capacité",
      "Backtest sur données historiques FlexCredit"
    ],
    industrySpecific: [
      "Spécialisation fintech/risk management",
      "Argumentaire conformité réglementaire", 
      "Validation statistique obligatoire"
    ]
  },

  // Techniques de closing spécifiques fintech/risk
  closingTechniques: {
    buyingSignals: [
      "Questions détaillées sur modèles statistiques",
      "Demande backtest sur données historiques", 
      "Questions conformité réglementaire Banque de France",
      "Intérêt pour pilote sur portefeuille non-critique",
      "Discussion timeline validation réglementaire"
    ],
    scripts: [
      "Marc, vos objectifs réglementaires 2% sont critiques. Notre pilote 3 mois vous donne les preuves nécessaires. Démarrons dès maintenant ?",
      "FlexCredit a le potentiel pour devenir leader crédit PME IA. Notre technologie vous y mène. Validons le projet pilote ?",
      "Chaque semaine de retard vous coûte en capacité et conformité. Lançons le backtest cette semaine ?"
    ],
    postSaleStrategy: [
      "Intégration technique progressive avec équipe risk",
      "Formation spécialisée analystes crédit + certification", 
      "Support réglementaire continu Banque de France",
      "Monitoring performance + optimisation modèles"
    ],
    industryAdapted: true
  }
};