import { Scenario } from './types';

export const retailPersonalizationScenario: Scenario = {
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
};