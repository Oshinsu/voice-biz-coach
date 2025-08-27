export interface Company {
  name: string;
  sector: string;
  size: string;
  revenue: string;
  location: string;
  description: string;
  painPoints: string[];
  currentSolution: string;
  budget: string;
  timeline: string;
  employees?: string;
  website?: string;
  linkedin?: string;
  foundedYear?: number;
  keyPeople?: string[];
}

export interface Interlocutor {
  name: string;
  role: string;
  personality: string;
  communicationStyle: string;
  decisionPower: string;
  priorities: string[];
  concerns: string[];
  motivations: string[];
  experience: string;
  background?: string;
  psychologyProfile?: any;
  linkedinProfile?: any;
  decisionProcess?: string;
}

export interface Product {
  name: string;
  description: string;
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
  };
  pricing_starter?: string;
  pricing_professional?: string;
  pricing_enterprise?: string;
  key_features?: string[];
  competitive_advantages?: string[];
  implementation_time?: string;
  target_segments?: string[];
  technical_specs?: any;
  keyFeatures: string[];
  competitiveAdvantages: string[];
  roi: string;
  implementationTime: string;
  technicalSpecs?: any;
  marketPositioning?: any;
  targetSegments?: string[];
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Stakeholder {
  name: string;
  role: string;
  influence: string;
  support: string;
  concerns: string[];
  approach: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  company: Company;
  interlocutor: Interlocutor;
  product: Product;
  objectives: string[];
  salesGoal: string;
  expectedRevenue: string;
  swot: SwotAnalysis;
  competitorSwot: SwotAnalysis;
  probableObjections: string[];
  successCriteria: string[];
  tools: string[];
  difficulty: "Facile" | "Moyen" | "Difficile";
  probability: number;
  stakeholders?: Stakeholder[];
  // Additional fields for complete data  
  main_objectives?: string[];
  available_tools?: string[];
  pain_points?: string[];
  company_name?: string;
  company_sector?: string;
  company_size?: string;
  budget_range?: string;
  success_probability?: number;
  expected_revenue?: string;
}

export const consolidatedScenarios: Scenario[] = [
  {
    id: "kpi-performance",
    title: "Optimisation Analytics E-commerce",
    description: "Vendre une plateforme d'analytics avancée à un e-commerce en croissance rapide avec des défis d'attribution multi-canal",
    difficulty: "Moyen",
    probability: 75,
    company: {
      name: "ModaStyle",
      sector: "E-commerce Mode",
      size: "50 employés",
      revenue: "8M€/an",
      location: "Lyon, France",
      description: "E-commerce spécialisé dans la mode éthique et durable, fondé en 2018 par Clara Dubois, ancienne acheteuse chez Zara. Pionnier français du commerce équitable en ligne avec 12 marques partenaires certifiées GOTS. Croissance de 45% en 2023, présence en France, Belgique et Suisse. Stack technique : Shopify Plus, Klaviyo pour l'email, Meta Ads et Google Ads. Équipe de 50 personnes répartie entre Lyon (siège), entrepôt Rillieux-la-Pape et télétravail. Ambition : devenir leader européen de la mode éthique d'ici 2027.",
      painPoints: [
        "Attribution marketing fragmentée : impossible de savoir si une vente vient de Google, Facebook, email ou influenceurs", 
        "Taux de churn de 23% sans comprendre les signaux précurseurs de départ",
        "Budget publicitaire de 80k€/mois mal optimisé faute de visibilité cross-canal",
        "Équipe marketing frustrée de passer 40% de son temps sur des rapports manuels",
        "Retours produits de 12% avec peu d'insights sur les raisons",
        "Saisonnalité imprévisible malgré 5 ans d'historique"
      ],
      currentSolution: "Google Analytics 4 + Google Ads + Facebook Business Manager + Klaviyo + 15 fichiers Excel consolidés manuellement chaque semaine par Sophie Martin",
      budget: "15-25k€/an pour analytics (budget total marketing 1M€)",
      timeline: "Q1 2024 - urgence car lancement collection printemps",
      foundedYear: 2018,
      keyPeople: [
        "Clara Dubois - CEO & Fondatrice (Ex-Zara, visionnaire mode éthique)",
        "Sophie Martin - Directrice Marketing & Analytics",
        "Jules Moreau - Traffic Manager (spécialiste acquisition)",
        "Amélie Durant - CRM Manager (email marketing)"
      ]
    },
    interlocutor: {
      name: "Sophie Martin",
      role: "Directrice Marketing & Analytics",
      personality: "Perfectionniste data-driven, impatiente face à l'inefficacité, adore les dashboards et métriques. Workaholic assumée qui vérifie ses KPIs le dimanche soir. Frustrée de ne pas avoir les bonnes données pour prendre des décisions rapides.",
      communicationStyle: "Directe et chiffrée. Coupe court aux discussions sans données. Pose 3 questions précises par minute en rendez-vous. Adore les graphiques et déteste les présentations PowerPoint fleuves. Prend des notes sur son iPad avec Apple Pencil.",
      decisionPower: "Décisionnaire jusqu'à 30k€, validation CEO Clara Dubois au-delà. Influence forte sur la roadmap tech et budgets marketing.",
      priorities: [
        "Attribution précise du ROI par canal marketing", 
        "Réduction du CAC (actuellement 47€, objectif 35€)",
        "Prédiction du churn client pour actions préventives",
        "Automatisation des reportings hebdomadaires",
        "Optimisation des budgets publicitaires en temps réel"
      ],
      concerns: [
        "Temps d'implémentation : ne peut pas se permettre 2 mois sans data",
        "Formation équipe : Jules (traffic manager) et Amélie (CRM) peu techniques",
        "Intégration avec Shopify Plus sans casser les conversions actuelles", 
        "Fiabilité des prédictions IA : a été échaudée par un outil précédent"
      ],
      motivations: [
        "Reconnaissance professionnelle : veut être promue VP Growth en 2024",
        "Performance financière : bonus indexé sur l'amélioration du ROAS",
        "Passion data : ancienne consultante chez Converteo, fascinée par les corrélations"
      ],
      experience: "8 ans en marketing digital : 3 ans chez Converteo (conseil), 2 ans chez Spartoo (e-commerce), 3 ans chez ModaStyle. MBA HEC spécialisation Marketing Quantitatif. Certification Google Analytics, certifiée Facebook Blueprint."
    },
    product: {
      name: "DataTrack Pro",
      description: "Plateforme d'attribution marketing et analytics prédictive spécialement conçue pour les e-commerces omni-canal. IA propriétaire entraînée sur 500M+ de sessions e-commerce. Connecteurs natifs avec 200+ outils marketing. Déploiement sans code en 24h.",
      pricing: {
        starter: "299€/mois (jusqu'à 100k sessions/mois, 5 canaux)",
        professional: "599€/mois (jusqu'à 500k sessions/mois, canaux illimités, IA prédictive)", 
        enterprise: "1200€/mois (sessions illimitées, white-label, API dédiée, CSM)"
      },
      keyFeatures: [
        "Attribution multi-touch avec modèles Shapley et Data-Driven",
        "Prédiction de churn avec 89% de précision (30j avant)",
        "Optimisation budgets publicitaires en temps réel via algorithmes génétiques",
        "Segmentation automatique de la clientèle (RFM enrichi)",
        "Calcul de LTV prédictive par cohorte et segment",
        "Alertes intelligentes sur les anomalies de performance",
        "Tableau de bord temps réel avec 50+ métriques e-commerce",
        "Recommandations IA d'actions marketing (quotidiennes)",
        "Tests A/B automatisés sur les campagnes",
        "Intégration native Shopify, Klaviyo, Meta, Google, TikTok"
      ],
      competitiveAdvantages: [
        "Setup sans code en 24h vs 2-6 semaines pour Northbeam/Triple Whale",
        "IA propriétaire 30% plus précise que Google Analytics 4 sur l'attribution",
        "Support français avec CSM dédié vs support international",
        "Coût 60% inférieur à Northbeam pour fonctionnalités équivalentes",
        "Spécialisation mode/lifestyle : connaît les saisonnalités secteur"
      ],
      roi: "Clients moyens : +47% ROAS, -23% CAC, +12% LTV en 6 mois. Retour investissement 312% première année.",
      implementationTime: "24h setup + 1 semaine calibrage IA + formation équipe"
    },
    objectives: [
      "Démontrer la valeur du tracking unifié vs silos actuels",
      "Quantifier les pertes dues à l'attribution fragmentée",
      "Prouver le ROI 312% sur la première année",
      "Rassurer sur la simplicité d'implémentation (24h)",
      "Convaincre sur la spécialisation e-commerce mode"
    ],
    salesGoal: "Contrat Professional à 599€/mois (12 mois)",
    expectedRevenue: "7,188€ première année",
    swot: {
      strengths: [
        "IA propriétaire entraînée sur 500M+ sessions e-commerce (impact: 9/10, probabilité: 9/10)",
        "Setup en 24h vs 2-6 semaines concurrence (impact: 8/10, probabilité: 10/10)",
        "Spécialisation e-commerce mode/lifestyle avec use cases sectoriels (impact: 7/10, probabilité: 8/10)",
        "Support client français avec CSM dédiés (impact: 6/10, probabilité: 9/10)",
        "Prix 60% inférieur à Northbeam/Triple Whale (impact: 8/10, probabilité: 10/10)",
        "Connecteurs natifs avec 200+ outils marketing sans développement (impact: 7/10, probabilité: 9/10)",
        "Prédiction churn 89% précision (impact: 8/10, probabilité: 8/10)"
      ],
      weaknesses: [
        "Startup 3 ans vs Google/Facebook établis (impact: 6/10, probabilité: 8/10)",
        "Prix premium vs Google Analytics gratuit (impact: 7/10, probabilité: 9/10)",
        "Dépendance APIs tierces (Facebook, Google) (impact: 5/10, probabilité: 7/10)",
        "Courbe apprentissage nouvelles métriques (impact: 4/10, probabilité: 6/10)",
        "Historique client limitée à 24 mois (impact: 3/10, probabilité: 8/10)"
      ],
      opportunities: [
        "iOS 14.5+ complique attribution Facebook/Google (impact: 9/10, probabilité: 10/10)",
        "Croissance e-commerce +45% nécessite meilleurs outils (impact: 8/10, probabilité: 9/10)",
        "Inflation publicitaire +30% oblige optimisation (impact: 8/10, probabilité: 9/10)",
        "Mode éthique en croissance 60%/an (impact: 7/10, probabilité: 8/10)",
        "RGPD renforce besoin first-party data (impact: 6/10, probabilité: 8/10)"
      ],
      threats: [
        "Google améliore GA4 attribution (impact: 7/10, probabilité: 6/10)",
        "Northbeam baisse prix agressivement (impact: 6/10, probabilité: 5/10)",
        "Récession réduit budgets marketing (impact: 8/10, probabilité: 4/10)",
        "Apple/Meta changent APIs (impact: 7/10, probabilité: 6/10)",
        "Client développe solution interne (impact: 5/10, probabilité: 3/10)"
      ]
    },
    competitorSwot: {
      strengths: [
        "Google Analytics 4 : Gratuit, intégration native Google Ads, familiarité équipe",
        "Triple Whale : Interface simple, marketing viral, communauté e-commerce",
        "Northbeam : Références Shopify, attribution avancée, levée de fonds importante"
      ],
      weaknesses: [
        "GA4 : Attribution limitée, interface complexe, silos avec autres outils",
        "Northbeam : Prix 3x supérieur, support offshore, complexité setup 6 semaines",
        "Triple Whale : Attribution basique, pas de prédictif, coût 2x supérieur"
      ],
      opportunities: [
        "Budget marketing ModaStyle en croissance (+25% prévu 2024)",
        "Besoin urgent attribution cross-canal pour collection printemps"
      ],
      threats: [
        "DataTrack Pro offre meilleur rapport qualité/prix/setup",
        "Spécialisation mode éthique avantage concurrentiel majeur",
        "Support français vs offshore valorisé par Sophie Martin"
      ]
    },
    probableObjections: [
      "599€/mois c'est 4x plus cher que notre budget analytics actuel ! Comment justifier cette dépense face à Clara qui surveille chaque euro ?",
      "Google Analytics est gratuit et on le maîtrise déjà. Pourquoi compliquer avec un nouvel outil quand on peut optimiser notre usage actuel ?",
      "Vos 47% d'amélioration ROAS, c'est calculé sur quoi ? On a déjà testé 3 outils qui promettaient des miracles et ça n'a rien donné.",
      "24h de setup ça paraît trop beau pour être vrai. Et si ça plante pendant le lancement de notre collection printemps ? On ne peut pas se permettre de perdre de la data.",
      "Comment être sûr que vos prédictions churn sont fiables ? Notre dernier outil prédictif avait 30% de faux positifs et on a harcelé des bons clients.",
      "Mon équipe Jules et Amélie vont encore râler s'il faut apprendre un nouvel outil. Combien d'heures de formation faut-il vraiment ?",
      "Nos données clients sont sensibles, comment garantir la sécurité ? Où sont hébergées les données ? Êtes-vous conformes RGPD ?",
      "Et si vous fermez dans 2 ans ? Une startup contre Google c'est David contre Goliath. Comment assurer la continuité de nos analytics ?",
      "L'intégration avec Shopify Plus ne va pas casser nos conversions actuelles ? On fait 8M€/an, on ne peut pas se permettre le moindre bug.",
      "Vos concurrents Northbeam et Triple Whale sont plus connus, pourquoi choisir DataTrack Pro ? Qu'est-ce qui vous différencie vraiment ?"
    ],
    successCriteria: [
      "Démonstration live attribution sur données ModaStyle réelles",
      "Audit gratuit révélant 15-25% d'optimisation possible",
      "Validation technique intégration Shopify Plus sans risque",
      "Témoignage client e-commerce mode similaire (CA 5-15M€)",
      "Négociation pilote 3 mois avec garantie satisfait/remboursé",
      "Formation équipe incluse avec certification"
    ],
    tools: [
      "Audit attribution actuel révélant pertes cachées",
      "Calculateur ROI personnalisé ModaStyle",
      "Comparateur coût/bénéfice vs GA4 + outils actuels",
      "Simulateur impact sur CAC et ROAS",
      "Planning implémentation sans risque business"
    ],
    stakeholders: [
      {
        name: "Sophie Martin",
        role: "Décisionnaire Principal - Directrice Marketing",
        influence: "Très élevée",
        support: "Neutre-Positif (frustrée situation actuelle)",
        concerns: ["ROI réel", "Formation équipe", "Complexité technique", "Temps implémentation"],
        approach: "Démonstration ROI chiffré + audit gratuit + formation incluse"
      },
      {
        name: "Clara Dubois",
        role: "Validation Budget Final - CEO",
        influence: "Décisive au-delà 25k€",
        support: "Neutre (focus croissance rentable)",
        concerns: ["Impact P&L", "ROI business", "Risque opérationnel"],
        approach: "Présentation business case + impact croissance"
      },
      {
        name: "Jules Moreau",
        role: "Utilisateur Final - Traffic Manager",
        influence: "Moyenne (adoption outil)",
        support: "Résistant (confortable GA4)",
        concerns: ["Courbe apprentissage", "Efficacité quotidienne"],
        approach: "Formation hands-on + bénéfices concrets quotidiens"
      }
    ]
  },
  {
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
    ]
  },
  {
    id: "retail-personalization",
    title: "IA Personnalisation Retail",
    description: "Vendre une solution de personnalisation par IA à une chaîne de magasins mode pour optimiser l'expérience client omnicanal",
    difficulty: "Moyen",
    probability: 58,
    company: {
      name: "StyleChain",
      sector: "Retail Mode & Accessoires",
      size: "150 employés, 45 magasins",
      revenue: "25M€/an",
      location: "Bordeaux, France",
      description: "Chaîne familiale fondée en 1995, spécialisée mode féminine 25-45 ans. 45 boutiques en France, site e-commerce depuis 2018. Concurrence Zara/H&M et pure-players. Repositionnement premium local en cours.",
      painPoints: [
        "Taux conversion e-commerce 1.2% vs 2.8% marché",
        "Expérience client déconnectée magasin/online",
        "Stocks invendus 18% vs 12% objectif",
        "Personnalisation rudimentaire (âge/géo seulement)",
        "Concurrence pure-players sur recommandations IA"
      ],
      currentSolution: "Shopify Plus + Klaviyo + recommandations basiques + CRM Salesforce",
      budget: "80-150k€ pour transformation digitale",
      timeline: "Rentrée 2024 - préparation saison automne-hiver",
      foundedYear: 1995,
      keyPeople: [
        "Isabelle Moreau - CEO (2e génération, fille fondateur)",
        "David Chen - Digital Director (Ex-Galeries Lafayette)",
        "Marine Dubois - Directrice Marketing"
      ]
    },
    interlocutor: {
      name: "David Chen",
      role: "Digital Director",
      personality: "Ambitieux et orienté innovation, frustré par les limites actuelles. Passionné de tech retail, veut positionner StyleChain comme leader digital régional. Impatient de résultats concrets.",
      communicationStyle: "Moderne et data-driven, parle en KPIs et benchmarks. Utilise beaucoup d'anglicismes tech. Adore les démos interactives et proof-of-concepts.",
      decisionPower: "Décisionnaire opérationnel jusqu'à 100k€, validation CEO pour stratégique",
      priorities: [
        "Augmentation conversion e-commerce 1.2% vers 2.5%",
        "Unification expérience client omnicanal",
        "Réduction invendus 18% vers 12%",
        "Personnalisation avancée vs pure-players",
        "ROI digital transformation mesurable"
      ],
      concerns: [
        "Complexité intégration avec Shopify existant",
        "Adoption par équipes magasins (moyenne âge 42 ans)",
        "ROI réel vs promesses tech vendors",
        "Temps implémentation avant saison critique"
      ],
      motivations: [
        "Reconnaissance : devenir leader retail tech régional",
        "Performance : bonus sur croissance digital (+20% objectif)",
        "Innovation : passion nouvelles technologies retail"
      ],
      experience: "12 ans retail digital : 5 ans Galeries Lafayette (omnicanal), 4 ans Citadium (e-commerce), 3 ans StyleChain. MBA Digital ESSEC."
    },
    product: {
      name: "RetailAI Personalization",
      description: "Suite IA personnalisation omnicanal pour retail mode. Machine Learning comportemental temps réel, recommandations visuelles, inventory optimization. 200+ retailers européens.",
      pricing: {
        starter: "1500€/mois (e-commerce seul, 50k visiteurs/mois)",
        professional: "3500€/mois (omnicanal, 200k visiteurs/mois, analytics avancés)",
        enterprise: "7500€/mois (multi-marques, APIs custom, CSM dédié)"
      },
      keyFeatures: [
        "Recommandations visuelles IA (similitude produits)",
        "Personnalisation temps réel (comportement + historique)",
        "Inventory optimization prédictive",
        "Omnicanal unifié (magasin + online)",
        "A/B testing automatisé recommandations",
        "Analytics avancés ROI personnalisation",
        "Intégration native Shopify/Salesforce",
        "Dashboard temps réel performance",
        "Notifications push personnalisées",
        "Chatbot shopping assistant IA"
      ],
      competitiveAdvantages: [
        "Spécialisation mode/lifestyle vs généralistes",
        "IA visuelle propriétaire reconnaissance styles",
        "Omnicanal natif vs solutions pure e-commerce",
        "Support français vs offshore",
        "Intégration Shopify Plus certifiée"
      ],
      roi: "Clients moyens : +85% conversion, +40% panier moyen, -25% invendus",
      implementationTime: "8 semaines : 3 sem config + 3 sem formation + 2 sem optimisation"
    },
    objectives: [
      "Démontrer augmentation conversion 1.2% vers 2.5%",
      "Prouver réduction invendus via inventory optimization",
      "Rassurer intégration Shopify Plus sans risque",
      "Quantifier ROI omnicanal vs e-commerce seul",
      "Convaincre facilité adoption équipes magasins"
    ],
    salesGoal: "Contrat Professional 12 mois = 42,000€",
    expectedRevenue: "42,000€ première année",
    swot: {
      strengths: [
        "IA visuelle propriétaire mode/lifestyle",
        "Omnicanal natif magasin + e-commerce",
        "200+ retailers références",
        "Spécialisation retail mode française",
        "Intégration Shopify Plus certifiée"
      ],
      weaknesses: [
        "Prix premium vs solutions basiques",
        "Startup 4 ans vs Amazon/Google",
        "Dépendance qualité données produits",
        "Formation équipes magasins nécessaire"
      ],
      opportunities: [
        "Digitalisation retail accélérée post-COVID",
        "Attentes clients personnalisation +67%",
        "Concurrence Amazon nécessite différenciation",
        "Budget transformation digitale retail +35%"
      ],
      threats: [
        "Amazon/Google lancent solutions similaires",
        "Recession réduit budgets transformation",
        "Shopify développe fonctionnalités natives",
        "Pure-players augmentent pression prix"
      ]
    },
    competitorSwot: {
      strengths: [
        "Shopify Plus fonctionnalités natives gratuites",
        "Équipes habituées outils actuels",
        "Recommandations basiques existantes"
      ],
      weaknesses: [
        "Conversion 1.2% vs 2.8% marché",
        "Personnalisation rudimentaire",
        "Expérience déconnectée online/offline",
        "Invendus 18% vs 12% objectif"
      ],
      opportunities: [
        "Amélioration progressive outils existants",
        "Formation équipes sur fonctionnalités Shopify"
      ],
      threats: [
        "Retard personnalisation vs pure-players",
        "Perte parts marché face concurrence IA",
        "Clients attendent expérience Amazon-like"
      ]
    },
    probableObjections: [
      "3500€/mois c'est notre budget marketing digital mensuel ! Comment justifier cette dépense face aux actionnaires familiaux ?",
      "Nos clientes de 35-45 ans viennent pour le conseil humain en magasin. Une IA va-t-elle vraiment améliorer leur expérience ?",
      "Shopify Plus a déjà des recommandations intégrées. Pourquoi payer pour quelque chose qu'on a déjà ?",
      "Nos équipes magasins ont 42 ans de moyenne et utilisent encore des carnets papier. Comment vont-elles adopter votre solution ?",
      "8 semaines d'implémentation juste avant la rentrée c'est risqué. Et si ça plante pendant notre pic de ventes automne-hiver ?",
      "85% d'augmentation conversion ça paraît irréaliste. Sur quels clients avez-vous mesuré ces résultats ?",
      "Notre catalogue change toutes les 6 semaines avec la fast-fashion. Votre IA va-t-elle suivre ce rythme ?",
      "Et la confidentialité des données clients ? Nos clientes sont sensibles au tracking, surtout en magasin.",
      "Si Amazon lance demain des outils similaires gratuits, qu'est-ce qui nous protège de votre obsolescence ?",
      "Comment mesurer concrètement le ROI omnicanal ? Les ventes croisées magasin/online sont difficiles à tracker."
    ],
    successCriteria: [
      "Audit conversion actuelle révélant potentiel 2x",
      "Démonstration live personnalisation temps réel",
      "Validation technique intégration Shopify/Salesforce",
      "Témoignage retailer mode similaire (20-50M€ CA)",
      "Pilote A/B test 3 mois sur segment clients",
      "Formation équipes incluse avec certification"
    ],
    tools: [
      "Audit conversion funnel e-commerce actuel",
      "Simulateur ROI personnalisation",
      "Comparateur performance vs benchmarks retail",
      "Calculateur réduction invendus",
      "Planning intégration omnicanal sans risque"
    ],
    stakeholders: [
      {
        name: "David Chen",
        role: "Décisionnaire Principal - Digital Director",
        influence: "Très élevée",
        support: "Positif (innovation)",
        concerns: ["ROI mesurable", "Intégration technique", "Adoption équipes"],
        approach: "Démonstration ROI + proof-of-concept + formation"
      },
      {
        name: "Isabelle Moreau",
        role: "Validation Stratégique - CEO",
        influence: "Décisive pour budget >80k€",
        support: "Neutre-Prudente (tradition familiale)",
        concerns: ["ROI business", "Complexité", "Impact client"],
        approach: "Business case différenciation + témoignages clients"
      },
      {
        name: "Marine Dubois",
        role: "Utilisatrice - Directrice Marketing",
        influence: "Moyenne (adoption marketing)",
        support: "Neutre-Positive",
        concerns: ["Complexité outils", "Formation équipe"],
        approach: "Formation marketing + bénéfices campagnes"
      }
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
  },
  {
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
    ]
  },
  {
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
    ]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return consolidatedScenarios.find(scenario => scenario.id === id);
};

// Export for compatibility
export const scenarios = consolidatedScenarios;