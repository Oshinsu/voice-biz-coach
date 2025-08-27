import { Scenario } from './types';

export const kpiPerformanceScenario: Scenario = {
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
};