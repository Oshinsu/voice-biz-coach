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
  ]
};