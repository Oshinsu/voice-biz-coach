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
}

export interface Product {
  name: string;
  description: string;
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
  };
  keyFeatures: string[];
  competitiveAdvantages: string[];
  roi: string;
  implementationTime: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
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
}

export const scenarios: Scenario[] = [
  {
    id: "byss-vns-school",
    title: "Byss VNS pour École Commerce",
    description: "Vendre Byss VNS à l'École Supérieure de Commerce d'Aix-en-Provence pour moderniser l'enseignement commercial",
    company: {
      name: "ESCAP - École Supérieure de Commerce d'Aix-en-Provence",
      sector: "Enseignement Supérieur - Commerce",
      size: "Institution de taille moyenne (2500 étudiants, 150 professeurs)",
      revenue: "Budget formation annuel : 3,2M€",
      location: "Aix-en-Provence, France",
      description: "École de commerce reconnue fondée en 1985, spécialisée dans les formations commerciales et marketing. Réputée pour ses programmes Master Commerce et ses partenariats entreprises.",
      painPoints: [
        "Méthodes d'enseignement commercial traditionnelles dépassées",
        "Manque d'engagement des étudiants en cours de vente",
        "Difficulté à évaluer les compétences pratiques de négociation",
        "Pression croissante pour moderniser l'approche pédagogique",
        "Concurrence avec écoles plus digitalisées"
      ],
      currentSolution: "Jeux de rôles traditionnels, cas d'étude papier, simulations basiques",
      budget: "150 000€ - 300 000€ pour solutions pédagogiques innovantes",
      timeline: "Déploiement souhaité pour la rentrée de septembre (6 mois)"
    },
    interlocutor: {
      name: "Dr. Marie Rousseau",
      role: "Directrice Pédagogique Master Commerce et Négociation",
      personality: "Innovatrice pragmatique, exigeante sur la qualité pédagogique, ouverte aux nouvelles technologies mais prudente sur les investissements",
      communicationStyle: "Professionnelle et structurée, pose des questions précises, apprécie les preuves d'efficacité pédagogique",
      decisionPower: "Forte influence - Décisionnaire pour son département avec validation Directeur Général requis pour budgets >200k€",
      priorities: [
        "Améliorer l'employabilité des diplômés",
        "Moderniser les méthodes pédagogiques",
        "Maintenir l'excellence académique de l'école",
        "Justifier les investissements par des résultats mesurables"
      ],
      concerns: [
        "Complexité technique d'adoption pour les professeurs",
        "ROI difficile à mesurer dans l'éducation",
        "Résistance au changement du corps professoral",
        "Budget serré avec autres priorités d'investissement"
      ],
      motivations: [
        "Être reconnue comme pionnière en innovation pédagogique",
        "Améliorer la satisfaction et réussite étudiante",
        "Attirer de meilleurs étudiants grâce à la modernité",
        "Obtenir des témoignages positifs d'entreprises partenaires"
      ],
      experience: "15 ans dans l'enseignement supérieur, ancienne consultante en stratégie commerciale, docteure en sciences de gestion"
    },
    product: {
      name: "Byss VNS - Voice Negotiation Simulator",
      description: "Plateforme de simulation commerciale par IA conversationnelle, permettant aux étudiants de s'entraîner à la négociation avec des personas clients réalistes",
      pricing: {
        starter: "Licence Éducation : 25€/étudiant/an (minimum 50 étudiants)",
        professional: "Licence Département : 18€/étudiant/an (minimum 200 étudiants) + outils pédagogiques avancés",
        enterprise: "Licence École : 12€/étudiant/an (minimum 500 étudiants) + formation professeurs + support dédié"
      },
      keyFeatures: [
        "Simulations vocales IA avec 50+ personas clients variés",
        "Scénarios commerciaux adaptés aux secteurs d'activité",
        "Évaluation automatique des performances de négociation",
        "Dashboard pédagogique pour suivi des étudiants",
        "Bibliothèque de cas d'usage business réels",
        "Intégration LMS (Moodle, Canvas, Blackboard)",
        "Rapports détaillés de progression individuelle",
        "Mode coaching en temps réel pour accompagnement"
      ],
      competitiveAdvantages: [
        "Seule solution IA conversationnelle dédiée à l'enseignement commercial",
        "Adaptation française des méthodes de vente locales",
        "Évolutivité des scenarios selon besoins pédagogiques",
        "Engagement étudiant supérieur aux méthodes traditionnelles",
        "Mesure objective des compétences soft skills"
      ],
      roi: "30% d'amélioration des résultats de négociation étudiante, 45% d'augmentation de l'engagement cours",
      implementationTime: "6-8 semaines avec formation professeurs incluse"
    },
    objectives: [
      "Démontrer l'impact pédagogique supérieur de Byss VNS vs méthodes traditionnelles",
      "Prouver l'facilité d'adoption par les professeurs",
      "Présenter un ROI clair en termes d'employabilité étudiante",
      "Rassurer sur le support technique et pédagogique",
      "Obtenir un accord pour un pilote département avant déploiement complet"
    ],
    salesGoal: "Contrat licence École (500+ étudiants) sur 3 ans = 180 000€ TTC",
    expectedRevenue: "180 000€ sur 3 ans (60k€/an)",
    swot: {
      strengths: [
        "Solution innovante unique sur le marché éducatif français",
        "IA conversationnelle de pointe développée en France",
        "Équipe fondatrice expérience EdTech + Commercial",
        "Adaptabilité aux besoins spécifiques pédagogiques",
        "Prix compétitif vs solutions internationales"
      ],
      weaknesses: [
        "Startup jeune avec références limitées dans l'éducation",
        "Technologie complexe nécessitant accompagnement change management",
        "Dépendance à la qualité de connexion internet",
        "Courbe d'apprentissage pour professeurs moins tech-savvy"
      ],
      opportunities: [
        "Digitalisation accélérée de l'enseignement supérieur post-COVID",
        "Demande croissante pour soft skills dans recrutement",
        "Budgets européens pour transformation numérique éducation",
        "Partenariats potentiels avec autres écoles du réseau",
        "Expansion vers universités et écoles d'ingénieurs"
      ],
      threats: [
        "Arrivée de géants tech (Microsoft, Google) sur le marché EdTech",
        "Résistance structurelle au changement dans l'enseignement",
        "Réductions budgets éducation en période économique difficile",
        "Concurrence solutions gratuites ou low-cost existantes"
      ]
    },
    competitorSwot: {
      strengths: [
        "Capsim Business Simulation : Marché établi, références internationales",
        "Marketplace Simulations : Intégration LMS native, support multilingue",
        "Jeux de rôles traditionnels : Pas de coût technologique, maîtrise professeurs"
      ],
      weaknesses: [
        "Solutions génériques non adaptées marché français",
        "Pas d'IA conversationnelle pour simulations vocales réalistes",
        "Interfaces souvent datées et peu engageantes",
        "Support technique limité en français"
      ],
      opportunities: [
        "Budget éducation en croissance pour transformation digitale",
        "Besoin établi de modernisation pédagogique"
      ],
      threats: [
        "Innovation Byss VNS disruptive sur leurs modèles économiques",
        "Adaptation possible de leurs solutions au marché français"
      ]
    },
    probableObjections: [
      "Le budget est-il justifié comparé aux méthodes actuelles gratuites ? Comment prouver concrètement que 25€/étudiant génèrera plus de valeur que les jeux de rôles traditionnels qui ne coûtent rien ?",
      "Nos professeurs vont-ils réussir à adopter cette technologie ? Certains ont plus de 55 ans et sont peu à l'aise avec le digital. Combien d'heures de formation faudra-t-il ? Et si ils résistent au changement ?",
      "Comment mesurer concrètement l'amélioration des résultats étudiants ? Sur quels KPIs ? Comment comparer avec les promotions précédentes ? Avez-vous des études longitudinales sur 3-5 ans ?",
      "Que se passe-t-il si la technologie dysfonctionne en plein cours ? Avez-vous un plan de continuité ? Comment gérer 50 étudiants frustrés si l'IA ne répond plus ? Quel est votre taux de disponibilité ?",
      "N'est-ce pas trop complexe pour nos étudiants moins à l'aise avec la tech ? Comment adaptez-vous l'interface pour différents niveaux ? Et pour les étudiants dyslexiques ou avec troubles de l'attention ?",
      "Avez-vous des références d'autres écoles qui utilisent déjà votre solution ? Surtout en France ? Pouvons-nous parler directement aux directeurs pédagogiques ? Depuis combien de temps l'utilisent-ils ?",
      "Comment garantir la protection des données étudiantes ? Êtes-vous conformes RGPD ? Où sont hébergées les données ? Qui y a accès ? Quelle est votre politique de rétention ?",
      "Le contrat peut-il être adapté si les résultats ne sont pas au rendez-vous ? Y a-t-il des clauses de performance ? Pouvons-nous arrêter en cours d'année ? Proposez-vous une garantie 'satisfait ou remboursé' ?",
      "Comment intégrer cela avec notre LMS Moodle existant ? Nos étudiants devront-ils jongler entre deux plateformes ? Les notes remontent-elles automatiquement ? Et la synchronisation des classes ?",
      "Et si mes collègues professeurs voient cela comme une menace à leur emploi ? Comment les rassurer ? L'IA va-t-elle remplacer l'humain ? Comment valoriser leur expertise pédagogique avec votre outil ?"
    ],
    successCriteria: [
      "Accord Dr. Rousseau pour présentation au Comité de Direction",
      "Démonstration live convaincante avec professeurs témoins",
      "Proposition pilote acceptée sur 1 classe test (50 étudiants)",
      "Validation technique infrastructure par DSI de l'école",
      "Négociation contrat cadre pluriannuel",
      "Engagement formation professeurs incluse"
    ],
    tools: [
      "Calculateur ROI Éducatif (employabilité, satisfaction, ranking)",
      "Comparateur vs solutions concurrentes",
      "Audit pédagogique méthodes actuelles",
      "Planificateur implémentation académique",
      "Simulateur budget départemental"
    ],
    difficulty: "Moyen",
    probability: 68
  },
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
      timeline: "Q1 2024 - urgence car lancement collection printemps"
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
    objectives: ["Démontrer la valeur du tracking unifié", "Quantifier les pertes actuelles"],
    salesGoal: "Contrat Pro à 599€/mois (12 mois)",
    expectedRevenue: "7,188€",
    swot: {
      strengths: [
        "IA propriétaire entraînée sur 500M+ sessions e-commerce (impact: 9/10, probabilité: 9/10)",
        "Setup en 24h vs 2-6 semaines concurrence (impact: 8/10, probabilité: 10/10)",
        "Spécialisation e-commerce mode/lifestyle avec use cases sectoriels (impact: 7/10, probabilité: 8/10)",
        "Support client français avec CSM dédiés (impact: 6/10, probabilité: 9/10)",
        "Prix 60% inférieur à Northbeam/Triple Whale (impact: 8/10, probabilité: 10/10)",
        "Connecteurs natifs avec 200+ outils marketing sans développement (impact: 7/10, probabilité: 9/10)",
        "ROI prouvé : +47% ROAS moyen chez clients similaires (impact: 9/10, probabilité: 8/10)"
      ],
      weaknesses: [
        "Startup de 2 ans vs acteurs établis depuis 10+ ans (impact: 6/10, probabilité: 8/10)",
        "Prix premium vs Google Analytics gratuit (impact: 7/10, probabilité: 9/10)",
        "Équipe technique de 12 personnes vs 200+ chez Salesforce (impact: 5/10, probabilité: 7/10)",
        "Pas encore de certification ISO 27001 (impact: 4/10, probabilité: 6/10)",
        "Fonctionnalités avancées encore en développement (impact: 5/10, probabilité: 6/10)"
      ],
      opportunities: [
        "Marché attribution marketing croît de 23% par an (impact: 9/10, probabilité: 9/10)",
        "iOS 14.5 et cookieless obligent à repenser l'attribution (impact: 8/10, probabilité: 10/10)",
        "ModaStyle a un besoin urgent Q1 2024 (impact: 9/10, probabilité: 8/10)",
        "Frustration client avec setup complexe des concurrents (impact: 7/10, probabilité: 8/10)",
        "Budget marketing 1M€ permet investissement analytics (impact: 8/10, probabilité: 7/10)"
      ],
      threats: [
        "Northbeam, Triple Whale avec 5-10M$ de funding (impact: 7/10, probabilité: 8/10)",
        "Google Analytics 4 s'améliore constamment (impact: 6/10, probabilité: 9/10)",
        "Solutions open-source comme PostHog gagnent en maturité (impact: 5/10, probabilité: 6/10)",
        "Recession économique réduit budgets outils marketing (impact: 8/10, probabilité: 4/10)",
        "Réglementation RGPD/DMA peut limiter tracking (impact: 6/10, probabilité: 7/10)"
      ]
    },
    competitorSwot: {
      strengths: [
        "Google Analytics 4 gratuit et universellement connu (impact: 8/10, probabilité: 10/10)",
        "Équipe maîtrise déjà Excel et process actuels (impact: 6/10, probabilité: 10/10)",
        "Coût total actuel proche de zéro (impact: 7/10, probabilité: 10/10)",
        "Données historiques de 5 ans dans GA4 (impact: 6/10, probabilité: 9/10)"
      ],
      weaknesses: [
        "Attribution multi-touch impossible dans GA4 (impact: 9/10, probabilité: 10/10)",
        "Aucune prédiction de churn ou LTV (impact: 8/10, probabilité: 10/10)",
        "Reporting manuel chronophage : 2j/semaine perdus (impact: 7/10, probabilité: 10/10)",
        "Données en silos : impossible de croiser Facebook + Google + Klaviyo (impact: 8/10, probabilité: 10/10)",
        "Optimisation budgets publicitaires reactive, pas proactive (impact: 7/10, probabilité: 9/10)"
      ],
      opportunities: [
        "Économies immédiates sans nouvel outil (impact: 6/10, probabilité: 10/10)",
        "Pas de formation équipe requise (impact: 4/10, probabilité: 10/10)",
        "Contrôle total des données (impact: 5/10, probabilité: 8/10)"
      ],
      threats: [
        "Concurrents ModaStyle utilisent des outils plus avancés (impact: 8/10, probabilité: 7/10)",
        "Mauvaises décisions marketing faute de data fiable (impact: 9/10, probabilité: 8/10)",
        "Perte de 23% des clients sans signaux d'alerte (impact: 9/10, probabilité: 9/10)",
        "ROAS stagnant alors que budgets publicitaires augmentent (impact: 8/10, probabilité: 8/10)"
      ]
    },
    probableObjections: [
      "C'est trop cher pour nous, 599€/mois ça représente 7k€/an soit plus que notre budget total analytics actuel. Comment justifier cette dépense à Clara notre CEO ?",
      "Google Analytics 4 suffit largement pour nos besoins, c'est gratuit et on a déjà 5 ans d'historique. Pourquoi compliquer avec un nouvel outil quand GA4 fait déjà l'attribution ?",
      "On n'a pas le temps de former l'équipe sur un nouvel outil maintenant, surtout avec le lancement collection printemps qui arrive. Jules et Amélie sont déjà surchargés.",
      "Comment être sûr que vos prédictions IA sont fiables ? On a testé un outil de prédiction de churn l'an dernier qui s'est planté, on a perdu confiance dans ces technologies.",
      "Et si on migre et qu'on perd nos données historiques ? Ou que l'intégration avec Shopify Plus casse quelque chose dans notre tunnel de conversion actuel ?",
      "Vous dites 24h de setup mais combien de temps réel pour que l'IA soit calibrée correctement ? Et le temps de former l'équipe, de migrer nos dashboards Excel ?",
      "On a déjà Klaviyo pour la segmentation client et Google Ads pour l'optimisation des budgets. En quoi votre solution fait mieux que ces outils spécialisés ?",
      "Comment garantir que les données de nos clients (lifestyle, achats) restent confidentielles ? Êtes-vous conformes RGPD ? Où sont hébergées les données ?",
      "Et si votre startup ferme dans 2 ans ? On sera bloqués avec un outil qu'on ne maîtrise pas. Quelle garantie de pérennité avez-vous ?",
      "Vos 47% d'amélioration ROAS, c'est sur quelle typologie de clients ? Des e-commerces mode comme nous ? Avec quel budget publicitaire ? Pouvez-vous nous donner des références exactes ?"
    ],
    successCriteria: ["Démonstration des pertes actuelles", "ROI chiffré présenté"],
    tools: ["calc_kpi", "score_phase"]
  },
  {
    id: "saas-crm",
    title: "Solution CRM pour PME",
    description: "Vendre un CRM innovant à une PME en croissance rapide",
    difficulty: "Facile",
    probability: 85,
    company: {
      name: "TechServices",
      sector: "Services IT",
      size: "25 employés",
      revenue: "3M€/an",
      location: "Lille, France",
      description: "ESN spécialisée dans l'accompagnement digital des PME depuis 2015. Fondée par Marc Dubois et Thomas Leroy, deux anciens consultants d'Accenture. Expertise : migration cloud, cybersécurité, digitalisation processus métier. Clients typiques : PME 50-200 salariés dans l'industrie et services. Croissance 25% par an depuis 3 ans. Équipe : 8 développeurs, 4 consultants fonctionnels, 6 chefs de projet, 4 commerciaux, 3 support. Certifications Microsoft Gold Partner, AWS Select Partner. Ambition : atteindre 5M€ CA en 2025 et ouvrir antenne Bruxelles.",
      painPoints: [
        "Leads dispersés entre 4 commerciaux sans visibilité centralisée : perte d'opportunités par doublons",
        "Suivi client post-projet inexistant : taux de renouvellement de seulement 60% vs 85% marché",
        "Reporting commercial manuel : Marc passe 1 jour/semaine à consolider Excel de chaque commercial",
        "Pipeline prévisionnel impossible : difficile de prévoir trésorerie et ressources",
        "Relances prospects incohérentes : chaque commercial a sa méthode, pas de standardisation",
        "Historique client perdu : quand un commercial part, toute la relation client s'évapore",
        "Facturation retardée faute de visibilité sur l'avancement projets"
      ],
      currentSolution: "4 fichiers Excel distincts (un par commercial) + Outlook pour emails + OneNote pour notes clients + Teams pour communication interne",
      budget: "5-10k€/an (représente 0,2% du CA mais Marc prêt à investir pour structurer croissance)",
      timeline: "Q2 2024 - urgence car recrutement 3 nouveaux commerciaux prévu"
    },
    interlocutor: {
      name: "Marc Dubois",
      role: "Co-fondateur & Directeur Commercial",
      personality: "Entrepreneur pragmatique, ancien consultant habitué aux méthodes structurées mais qui privilégie l'efficacité à la sophistication. Impatient face aux outils complexes. Leader bienveillant mais exigeant sur les résultats. Adore les démonstrations concrètes plutôt que les discours théoriques.",
      communicationStyle: "Direct et terre-à-terre. Aime les exemples concrets et les chiffres simples. Coupe court aux présentations trop techniques. Préfère les réunions de 30min max. Teste immédiatement ce qu'on lui montre. Pose des questions pratiques du type 'combien de clics pour faire ça ?'",
      decisionPower: "Décisionnaire final jusqu'à 15k€/an, co-décision avec Thomas Leroy (CTO) au-delà. Influence forte sur tous les choix outils et process commerciaux.",
      priorities: [
        "Simplicité d'adoption par équipe commerciale (âge moyen 28 ans, niveau tech variable)",
        "ROI visible sous 3 mois : gain temps ou amélioration conversion",
        "Centralisation données clients sans perdre informations existantes", 
        "Standardisation process commercial pour faciliter onboarding nouveaux",
        "Visibilité pipeline pour anticiper besoins en recrutement"
      ],
      concerns: [
        "Résistance équipe aux changements : dernière tentative CRM (Zoho) abandonnée en 2022",
        "Temps de formation : équipe commerciale sur le terrain 80% du temps",
        "Migration données Excel sans perte : 3 ans d'historique client critique",
        "Coût caché : méfiant après expérience coûteuse avec éditeur qui multipliait les modules"
      ],
      motivations: [
        "Ambition croissance : passer de 4 à 7 commerciaux nécessite structuration",
        "Reconnaissance professionnelle : être l'ESN la mieux organisée de Lille",
        "Performance financière : améliorer marge en optimisant temps commercial"
      ],
      experience: "12 ans total : 4 ans consultant senior chez Accenture (finance/industrie), 8 ans entrepreneur (3 ans création TechServices, 5 ans développement). Formation : Master Management Lille, certifié PMP. Connaît bien les enjeux tech mais privilégie business value."
    },
    product: {
      name: "SalesFlow CRM",
      description: "CRM nouvelle génération spécialement conçu pour les PME de services avec workflows automatisés et interface mobile-first. Développé par une équipe française ex-Salesforce. +2000 PME clientes, note 4.8/5 sur Capterra.",
      pricing: {
        starter: "29€/mois/utilisateur (pipeline + contacts, 1000 contacts max)",
        professional: "49€/mois/utilisateur (automation + reporting, contacts illimités, mobile)",
        enterprise: "89€/mois/utilisateur (API + intégrations avancées + support prioritaire)"
      },
      keyFeatures: [
        "Pipeline visuel drag & drop inspiré de Trello",
        "Mobile-first : 90% des actions faisables depuis smartphone",
        "Automation marketing : sequences emails, relances automatiques, scoring leads",
        "Reporting temps réel avec 25+ métriques commerciales et forecasting",
        "Intégration native Office 365, Google Workspace, comptabilité (Sage, Cegid)",
        "Import automatique emails et calendrier sans configuration",
        "Templates sectoriels pré-configurés pour ESN/conseil",
        "Notifications intelligentes : alertes opportunités chaudes, relances oubliées",
        "Tableau de bord manager : performance équipe, répartition prospects",
        "Gestion devis/factures intégrée avec signature électronique"
      ],
      competitiveAdvantages: [
        "Interface 3x plus simple que Salesforce, formation 2h vs 2 jours",
        "Migration assistée gratuite avec préservation historique Excel",
        "Support téléphonique français (Nantes) vs chatbot international",
        "Prix 40% inférieur à HubSpot pour fonctionnalités équivalentes",
        "Spécialisation PME services : templates et workflows sectoriels"
      ],
      roi: "Clients moyens : +35% taux conversion, -50% temps admin commercial, +25% CA/commercial en 6 mois. ROI 280% première année.",
      implementationTime: "3 jours configuration + 1 semaine formation équipe + migration données"
    },
    objectives: ["Démontrer la simplicité d'usage", "Calculer le gain de productivité"],
    salesGoal: "Contrat Pro pour 10 utilisateurs (12 mois)",
    expectedRevenue: "5,880€",
    swot: {
      strengths: [
        "Interface ultra-intuitive : adoption 90% vs 60% marché (impact: 8/10, probabilité: 9/10)",
        "Support français avec hotline directe (impact: 7/10, probabilité: 10/10)",
        "Prix 40% inférieur à HubSpot/Salesforce (impact: 8/10, probabilité: 10/10)",
        "Migration gratuite avec conservation historique (impact: 9/10, probabilité: 10/10)",
        "Spécialisation PME services avec templates sectoriels (impact: 7/10, probabilité: 8/10)",
        "Mobile-first : 90% fonctionnalités disponibles sur smartphone (impact: 6/10, probabilité: 9/10)",
        "ROI prouvé : +35% taux conversion moyen clients (impact: 9/10, probabilité: 8/10)"
      ],
      weaknesses: [
        "Jeune société (5 ans) vs Salesforce/Microsoft établis (impact: 5/10, probabilité: 7/10)",
        "Fonctionnalités enterprise limitées vs solutions haut de gamme (impact: 4/10, probabilité: 6/10)",
        "Équipe R&D de 15 personnes vs 1000+ chez Salesforce (impact: 4/10, probabilité: 7/10)",
        "Pas encore de certifications sectorielles (ISO 27001 en cours) (impact: 3/10, probabilité: 5/10)"
      ],
      opportunities: [
        "Marché CRM PME croît de 15% par an en France (impact: 8/10, probabilité: 9/10)",
        "Post-COVID accélère digitalisation commerciale (impact: 7/10, probabilité: 8/10)",
        "TechServices prévoit croissance : besoin urgent structuration (impact: 9/10, probabilité: 8/10)",
        "Frustration avec solutions complexes ouvre marché simplicité (impact: 7/10, probabilité: 7/10)",
        "Télétravail nécessite outils collaboratifs mobiles (impact: 6/10, probabilité: 9/10)"
      ],
      threats: [
        "Microsoft/Google offrent CRM dans leurs suites Office (impact: 6/10, probabilité: 8/10)",
        "HubSpot améliore son offering PME (impact: 5/10, probabilité: 7/10)",
        "Solutions open-source comme SuiteCRM gagnent maturité (impact: 4/10, probabilité: 6/10)",
        "Récession économique réduit budgets digitalisation (impact: 7/10, probabilité: 3/10)"
      ]
    },
    competitorSwot: {
      strengths: [
        "Excel maîtrisé par 100% équipe commerciale (impact: 6/10, probabilité: 10/10)",
        "Coût zéro et contrôle total des données (impact: 7/10, probabilité: 10/10)",
        "Flexibilité totale : chacun adapte sa méthode (impact: 5/10, probabilité: 9/10)",
        "Pas de dépendance externe ou de formation requise (impact: 5/10, probabilité: 10/10)"
      ],
      weaknesses: [
        "Aucune centralisation : 4 sources de vérité différentes (impact: 9/10, probabilité: 10/10)",
        "Pas de suivi automatique des relances (impact: 7/10, probabilité: 10/10)",
        "Reporting consolidé prend 8h/semaine à Marc (impact: 6/10, probabilité: 10/10)",
        "Perte historique client quand commercial part (impact: 8/10, probabilité: 8/10)",
        "Impossible de forecaster pipeline de manière fiable (impact: 8/10, probabilité: 9/10)",
        "Erreurs de saisie et doublons fréquents (impact: 6/10, probabilité: 8/10)"
      ],
      opportunities: [
        "Économies immédiates sans investissement (impact: 6/10, probabilité: 10/10)",
        "Chaque commercial garde ses habitudes (impact: 4/10, probabilité: 9/10)",
        "Pas de risque technique ou de panne (impact: 3/10, probabilité: 8/10)"
      ],
      threats: [
        "Concurrents ESN plus organisés gagnent appels d'offres (impact: 8/10, probabilité: 7/10)",
        "Croissance impossible à gérer sans structuration (impact: 9/10, probabilité: 8/10)",
        "Turnover commercial fait perdre relations clients (impact: 8/10, probabilité: 6/10)",
        "Manque de visibilité nuit à la trésorerie prévisionnelle (impact: 7/10, probabilité: 9/10)"
      ]
    },
    probableObjections: [
      "On s'en sort très bien avec nos 4 Excel actuels, chaque commercial maîtrise sa méthode. Pourquoi changer un système qui fonctionne depuis 8 ans ?",
      "49€/utilisateur/mois pour 10 personnes, ça fait 490€/mois soit 6k€/an. C'est énorme pour une PME de notre taille ! Excel ne coûte rien en plus d'Office 365.",
      "C'est sûrement compliqué à mettre en place et nos commerciaux n'ont pas le temps de se former. Ils sont sur le terrain 80% du temps chez les clients.",
      "Comment migrer 3 ans de données client sans rien perdre ? Et si on se trompe dans l'import ? On ne peut pas se permettre de perdre l'historique de nos plus gros clients.",
      "Nos commerciaux sont déjà efficaces avec leurs méthodes personnelles. Paul fait 120% de ses objectifs avec son Excel, pourquoi le contraindre à changer ?",
      "En cas de panne internet ou de bug de votre plateforme, on fait comment ? Avec Excel au moins on a le contrôle et ça marche même hors ligne.",
      "Thomas (notre CTO) va râler sur encore un nouvel abonnement SaaS. On a déjà Office 365, Teams, notre ERP Sage... Combien d'outils en plus ?",
      "Vos 35% d'amélioration du taux de conversion, c'est mesuré comment ? Sur quelle période ? Avec quels types d'entreprises ? Nous on fait du service, pas du produit.",
      "Et la formation de mes 3 nouveaux commerciaux qu'on recrute ? Il faudra les former sur votre outil en plus de nos process métier. Ça rallonge l'onboarding.",
      "Si ça marche pas, on peut annuler ? Y a-t-il une période d'essai ? Et pour récupérer nos données si on veut arrêter ?"
    ],
    successCriteria: ["Démonstration pipeline visuel", "Calcul gain productivité"],
    tools: ["demo_crm", "calc_productivite"]
  },
  {
    id: "marketplace-b2b",
    title: "Marketplace B2B Industrie",
    description: "Convaincre un industriel d'adopter une marketplace B2B pour ses achats",
    difficulty: "Difficile",
    probability: 45,
    company: {
      name: "MétalPro Industries",
      sector: "Métallurgie",
      size: "150 employés",
      revenue: "25M€/an",
      location: "Saint-Étienne, France",
      description: "Fabricant de pièces métalliques de précision fondé en 1987 par la famille Moreau. Leader régional usinage/découpe laser pour Renault, PSA, Safran, Thales. Certification ISO 9001, TS 16949 automobile, EN 9100 aéronautique. 3 sites : Saint-Étienne (siège + R&D), Firminy (production série), Roanne (prototypage). 150 employés : 80 production, 25 bureau d'études, 20 qualité/méthodes, 15 support, 10 commercial. CA stable malgré crise auto. Enjeu : diversification vers médical et énergie pour réduire dépendance automobile.",
      painPoints: [
        "Approvisionnement de 1200+ références auprès de 80 fournisseurs sans visibilité globale",
        "Négociations manuelles chronophages : 6 semaines moyenne pour nouvelle référence",
        "Manque transparence prix marché : découvre tarifs plus bas chez concurrents a posteriori",
        "Ruptures stock imprévisibles : 15% retards livraison clients par défaut fournisseur",
        "Process achats non digitalisé : catalogues papier, bons de commande fax",
        "Audit fournisseurs insuffisant : 2 incidents qualité coûteux en 2023",
        "Pas de sourcing alternatif systématique sur pièces critiques"
      ],
      currentSolution: "ERP Sage X3 + Excel pour comparatifs + téléphone/email fournisseurs + catalogues papier + réseau relationnel Catherine",
      budget: "50-100k€/an (0,3% CA mais direction pousse économies achats post-crise)",
      timeline: "Q3-Q4 2024 - budget voté, pression actionnaires familiaux pour optimiser coûts"
    },
    interlocutor: {
      name: "Catherine Moreau",
      role: "Directrice Achats & Supply Chain",
      personality: "Perfectionniste méthodique, fille du fondateur habituée aux process rigoureux. Conservatrice par nature mais consciente des enjeux de modernisation. Très respectée en interne pour son expertise technique. Redoute les changements brusques mais ouverte si ROI démontré.",
      communicationStyle: "Formelle et structurée. Aime les présentations détaillées avec chiffres et références. Pose des questions techniques précises. Vérifie toujours les sources. Préfère les réunions en présentiel avec supports papier. Méfiance initiale puis confiance durable.",
      decisionPower: "Influence très forte auprès de son frère Jean-Marc (PDG). Décisionnaire jusqu'à 75k€, validation CA au-delà. Son avis technique fait autorité en interne.",
      priorities: [
        "Réduction coûts achats de 8% demandée par actionnaires familiaux",
        "Sécurisation approvisionnement pièces critiques (zéro rupture client)",
        "Diversification sourcing pour réduire dépendance fournisseurs locaux",
        "Amélioration délais négociation : objectif 3 semaines vs 6 actuelles",
        "Traçabilité complète pour audits clients aéronautique"
      ],
      concerns: [
        "Fiabilité plateforme : ne peut pas se permettre bug sur commandes critiques",
        "Résistance équipe achats (moyenne d'âge 48 ans, peu digitalisée)",
        "Dépendance technologique : peur de perdre autonomie et relations fournisseurs",
        "Sécurité données : plans industriels et prix négociés confidentiels",
        "Formation équipe : 6 acheteurs avec niveaux informatiques hétérogènes"
      ],
      motivations: [
        "Reconnaissance professionnelle : prouver la valeur des achats dans la famille",
        "Performance financière : bonus indexé sur économies réalisées",
        "Modernisation : ne pas être en retard vs concurrents qui digitalisent"
      ],
      experience: "18 ans total : formation ingénieur EMSE Saint-Étienne, 3 ans acheteur chez Michelin, 15 ans MétalPro (évolution interne). Spécialiste métallurgie, certification achats CDAF. Connaissance approfondie supply chain automobile/aéro."
    },
    product: {
      name: "IndustryConnect",
      description: "Marketplace B2B spécialisée pour l'industrie avec outils de négociation avancés",
      pricing: {
        starter: "999€/mois",
        professional: "2500€/mois",
        enterprise: "5000€/mois"
      },
      keyFeatures: ["Catalogue 50k+ fournisseurs", "Négociation automatisée", "Analytics achats"],
      competitiveAdvantages: ["Spécialisation industrie", "Garantie approvisionnement"],
      roi: "15% réduction coûts achats",
      implementationTime: "3 mois"
    },
    objectives: ["Prouver les économies réalisables", "Rassurer sur la fiabilité"],
    salesGoal: "Contrat Enterprise (24 mois)",
    expectedRevenue: "120,000€",
    swot: {
      strengths: ["Spécialisation industrie", "Large réseau fournisseurs"],
      weaknesses: ["Prix élevé", "Complexité déploiement"],
      opportunities: ["Digitalisation achats", "Pression coûts"],
      threats: ["Concurrents généralistes", "Résistance changement"]
    },
    competitorSwot: {
      strengths: ["Relations établies", "Processus maîtrisés"],
      weaknesses: ["Manque de transparence", "Coûts cachés"],
      opportunities: ["Négociation directe", "Flexibilité"],
      threats: ["Dépendance fournisseurs", "Manque d'optimisation"]
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
    successCriteria: ["Audit coûts actuels", "Démonstration ROI 15%"],
    tools: ["audit_achats", "calc_economies"]
  },
  {
    id: "formation-digitale",
    title: "Plateforme Formation Digitale",
    description: "Vendre une solution de formation en ligne à une grande entreprise",
    difficulty: "Moyen",
    probability: 65,
    company: {
      name: "GlobalCorp",
      sector: "Services Financiers",
      size: "800 employés",
      revenue: "120M€/an",
      location: "La Défense, France",
      description: "Groupe financier proposant des solutions d'investissement aux entreprises",
      painPoints: ["Formation présentielle coûteuse", "Montée en compétences lente", "Suivi formation difficile"],
      currentSolution: "Formations présentielles + organismes externes",
      budget: "100-200k€/an",
      timeline: "Q1 2024"
    },
    interlocutor: {
      name: "Julien Rousseau",
      role: "DRH",
      personality: "Innovant et orienté performance",
      communicationStyle: "Stratégique, cherche l'impact business",
      decisionPower: "Décisionnaire avec validation COMEX",
      priorities: ["ROI formation", "Engagement collaborateurs"],
      concerns: ["Adoption utilisateurs", "Mesure efficacité"],
      motivations: ["Innovation RH", "Performance équipes"],
      experience: "10 ans en RH et transformation"
    },
    product: {
      name: "LearnHub Enterprise",
      description: "Plateforme de formation digitale avec IA adaptive et analytics avancés",
      pricing: {
        starter: "15€/mois/utilisateur",
        professional: "25€/mois/utilisateur",
        enterprise: "40€/mois/utilisateur"
      },
      keyFeatures: ["IA adaptive", "Catalogue 5000+ formations", "Analytics détaillés"],
      competitiveAdvantages: ["Personnalisation IA", "Intégration SIRH"],
      roi: "40% réduction coûts formation",
      implementationTime: "6 semaines"
    },
    objectives: ["Démontrer l'économie vs présentiel", "Prouver l'engagement utilisateur"],
    salesGoal: "Contrat Enterprise 500 utilisateurs (24 mois)",
    expectedRevenue: "480,000€",
    swot: {
      strengths: ["IA propriétaire", "Large catalogue"],
      weaknesses: ["Prix premium", "Complexité technique"],
      opportunities: ["Digitalisation formation", "Réduction coûts"],
      threats: ["Concurrents établis", "Résistance changement"]
    },
    competitorSwot: {
      strengths: ["Formation reconnue", "Interaction humaine"],
      weaknesses: ["Coûts élevés", "Pas de flexibilité"],
      opportunities: ["Qualité pédagogique", "Réseautage"],
      threats: ["Coûts croissants", "Indisponibilité"]
    },
    probableObjections: [
      "La formation présentielle reste plus efficace pour nos métiers complexes. Nos collaborateurs ont besoin d'interaction humaine pour maîtriser les réglementations financières. Comment l'IA peut-elle remplacer l'expertise d'un formateur senior ?",
      "40€/mois/utilisateur pour 500 personnes, ça fait 20k€/mois soit 240k€/an ! C'est plus cher que nos formations actuelles. Comment justifier cette explosion des coûts au COMEX ?",
      "Nos équipes vont-elles vraiment utiliser cette plateforme ? On a déjà essayé des outils digitaux qui sont restés vides. Comment garantir l'adoption par 800 collaborateurs de générations différentes ?",
      "Comment mesurer concrètement l'efficacité vs nos formations présentielles ? Avec nos organismes actuels, on a des évaluations à chaud et à froid, des certifications reconnues. Qu'est-ce qui prouve que l'IA fait mieux ?",
      "Et l'intégration avec notre SIRH ? On a un système complexe avec Workday, nos données RH sont sensibles. Combien de temps et de ressources IT pour connecter tout ça ?",
      "Vos 5000 formations, sont-elles adaptées à la finance ? Nous avons des besoins très spécifiques : réglementation MIFID, Bâle III, RGPD financier. Avez-vous l'expertise métier nécessaire ?",
      "En cas de contrôle AMF ou ACPR, comment prouver que nos collaborateurs ont bien été formés ? Nos organismes actuels nous délivrent des attestations officielles reconnues par les régulateurs.",
      "6 semaines d'implémentation pendant que nos équipes doivent continuer à se former ? On a des obligations légales de formation continue qu'on ne peut pas interrompre.",
      "Et la confidentialité de nos données ? Nos stratégies d'investissement et nos méthodes sont confidentielles. Comment garantir que vos algorithmes IA ne les exploitent pas pour d'autres clients ?",
      "Si votre plateforme tombe en panne un jour d'examen ou de certification obligatoire ? Avec nos organismes, on a toujours une solution de secours. Quel est votre plan de continuité ?"
    ],
    successCriteria: ["Calcul économies vs présentiel", "Démonstration engagement"],
    tools: ["calc_formation", "demo_ia"]
  },
  {
    id: "cybersecurite-pme",
    title: "Solution Cybersécurité PME",
    description: "Convaincre une PME d'investir dans une solution de cybersécurité complète",
    difficulty: "Difficile",
    probability: 55,
    company: {
      name: "InnoTech Solutions",
      sector: "Ingénierie",
      size: "75 employés",
      revenue: "12M€/an",
      location: "Grenoble, France",
      description: "Bureau d'études spécialisé en solutions techniques pour l'industrie",
      painPoints: ["Données sensibles exposées", "Attaques phishing fréquentes", "Pas de politique sécurité"],
      currentSolution: "Antivirus basique + firewall",
      budget: "20-40k€/an",
      timeline: "Q2 2024"
    },
    interlocutor: {
      name: "Pierre Lacroix",
      role: "Directeur Technique",
      personality: "Technique et sceptique",
      communicationStyle: "Précis, aime les détails techniques",
      decisionPower: "Décisionnaire technique, validation PDG",
      priorities: ["Protection données", "Continuité activité"],
      concerns: ["Complexité", "Impact performance"],
      motivations: ["Sécurité", "Conformité réglementaire"],
      experience: "12 ans en direction technique"
    },
    product: {
      name: "SecureShield Pro",
      description: "Suite cybersécurité complète avec monitoring 24/7 et formation utilisateurs",
      pricing: {
        starter: "199€/mois",
        professional: "499€/mois",
        enterprise: "999€/mois"
      },
      keyFeatures: ["Monitoring 24/7", "Formation utilisateurs", "Sauvegarde cloud"],
      competitiveAdvantages: ["Support français", "Conformité RGPD"],
      roi: "Évite 1 incident = 500% ROI",
      implementationTime: "4 semaines"
    },
    objectives: ["Évaluer les risques actuels", "Démontrer le coût d'un incident"],
    salesGoal: "Contrat Professional (24 mois)",
    expectedRevenue: "23,952€",
    swot: {
      strengths: ["Solution complète", "Support local"],
      weaknesses: ["Prix vs antivirus simple", "Complexité perçue"],
      opportunities: ["Menaces croissantes", "Réglementation"],
      threats: ["Solutions gratuites", "Déni du risque"]
    },
    competitorSwot: {
      strengths: ["Coût faible", "Simplicité"],
      weaknesses: ["Protection limitée", "Pas de support"],
      opportunities: ["Économies immédiates", "Facilité"],
      threats: ["Vulnérabilités", "Non-conformité"]
    },
    probableObjections: [
      "On n'a jamais eu de problème de sécurité en 15 ans d'existence ! Notre antivirus et firewall basiques ont toujours suffi. Pourquoi investir dans quelque chose qu'on n'a jamais eu besoin ?",
      "499€/mois c'est démesuré pour une PME de 75 personnes ! Ça représente 6k€/an soit 0,05% de notre CA. Nos clients ne nous demandent pas de certification cybersécurité, pourquoi dépenser autant ?",
      "Nos ingénieurs sont assez intelligents pour ne pas cliquer sur des emails suspects. Et nos données techniques sont déjà protégées par mot de passe. En quoi votre solution fait mieux ?",
      "Comment être sûr que votre monitoring 24/7 ne va pas ralentir nos systèmes ? Nos postes de conception CAO ont besoin de toute la puissance disponible, on ne peut pas se permettre de pertes de performance.",
      "Et vos sauvegardes cloud ? Nos plans industriels pour Safran et Thales sont ultra-confidentiels. Comment garantir qu'ils ne seront pas accessibles depuis l'extérieur ou par vos équipes ?",
      "Vos formations utilisateurs, c'est du temps perdu ! Nos ingénieurs travaillent 50h/semaine sur des projets urgents. Ils n'ont pas 4 heures à perdre en sensibilisation cybersécurité.",
      "4 semaines d'implémentation pendant lesquelles on risque des dysfonctionnements ? On a des délais serrés avec nos clients défense. Un bug dans nos systèmes nous coûterait plus cher qu'un hypothétique piratage.",
      "Et si votre solution nous fait rater une certification ISO 27001 qu'on n'a même pas ? Nos clients actuels ne l'exigent pas, pourquoi compliquer nos process avec des normes qu'on ne maîtrise pas ?",
      "Comment prouver que 'éviter 1 incident = 500% ROI' ? C'est du marketing ! Vous ne pouvez pas quantifier quelque chose qui n'est jamais arrivé. Et si l'incident n'arrive jamais ?",
      "Notre DSI Pierre maîtrise parfaitement nos systèmes actuels. Pourquoi le forcer à apprendre vos outils alors qu'il gère déjà la production, les sauvegardes et la maintenance ?"
    ],
    successCriteria: ["Audit sécurité", "Calcul coût incident"],
    tools: ["audit_securite", "calc_risque"]
  },
  {
    id: "erp-manufacturing",
    title: "ERP Manufacturier",
    description: "Vendre un ERP spécialisé à un industriel en transformation digitale",
    difficulty: "Difficile",
    probability: 40,
    company: {
      name: "PlastiForm Industries",
      sector: "Plasturgie",
      size: "200 employés",
      revenue: "35M€/an",
      location: "Oyonnax, France",
      description: "Fabricant de pièces plastiques techniques pour l'automobile et l'électronique",
      painPoints: ["Systèmes non intégrés", "Visibilité production limitée", "Planification manuelle"],
      currentSolution: "ERP legacy + Excel",
      budget: "200-500k€",
      timeline: "Q4 2024 - Q1 2025"
    },
    interlocutor: {
      name: "Alain Bertrand",
      role: "Directeur Industriel",
      personality: "Pragmatique et exigeant",
      communicationStyle: "Direct, orienté terrain",
      decisionPower: "Influence forte, validation CA",
      priorities: ["Performance production", "ROI mesurable"],
      concerns: ["Disruption production", "Complexité migration"],
      motivations: ["Modernisation", "Compétitivité"],
      experience: "20 ans dans l'industrie"
    },
    product: {
      name: "ManufactureOne",
      description: "ERP manufacturier avec MES intégré et analytics temps réel",
      pricing: {
        starter: "5000€/mois",
        professional: "12000€/mois",
        enterprise: "25000€/mois"
      },
      keyFeatures: ["MES intégré", "Analytics temps réel", "Planification IA"],
      competitiveAdvantages: ["Spécialisation industrie", "Déploiement modulaire"],
      roi: "20% gain productivité",
      implementationTime: "12 mois"
    },
    objectives: ["Auditer les inefficacités actuelles", "Projeter les gains productivité"],
    salesGoal: "Contrat Professional (36 mois)",
    expectedRevenue: "432,000€",
    swot: {
      strengths: ["Spécialisation industrie", "Expertise métier"],
      weaknesses: ["Prix élevé", "Complexité déploiement"],
      opportunities: ["Transformation digitale", "Industrie 4.0"],
      threats: ["ERP généralistes", "Solutions maison"]
    },
    competitorSwot: {
      strengths: ["Solution connue", "Investissement amorti"],
      weaknesses: ["Obsolescence", "Silos données"],
      opportunities: ["Pas de disruption", "Équipes formées"],
      threats: ["Perte compétitivité", "Maintenance coûteuse"]
    },
    probableObjections: [
      "Notre ERP legacy fonctionne encore parfaitement après 20 ans ! Il est amorti, nos équipes le maîtrisent, pourquoi investir 432k€ dans quelque chose qui marche déjà ?",
      "12 000€/mois pendant 36 mois c'est colossal ! Ça représente 1,2% de notre CA. Comment justifier cet investissement pharaonique alors qu'on demande 5% d'économies à tous les services ?",
      "12 mois d'implémentation c'est inacceptable ! On ne peut pas arrêter la production pendant un an. Nos clients auto comme PSA ne nous pardonneraient aucun retard de livraison.",
      "Comment migrer 20 ans de données historiques sans les corrompre ? On a l'historique de tous nos moules, nos gammes de fabrication, nos temps de cycle. Une erreur nous coûterait des millions.",
      "Vos 20% de gains de productivité, on les voit où concrètement ? Nos opérateurs à l'injection connaissent leurs machines par cœur. Un MES ne les rendra pas plus rapides !",
      "Et la formation de 200 employés dont 150 en production ? Certains travaillent chez nous depuis 30 ans avec leurs habitudes. Comment les convaincre d'utiliser des tablettes tactiles ?",
      "Votre solution va-t-elle s'intégrer avec nos 15 machines d'injection qui ont 10-25 ans ? Certaines n'ont même pas d'interface numérique. Combien coûtera la mise aux normes ?",
      "En cas de bug de votre système, comment on fait ? Avec notre ERP actuel, notre informaticien Pierre peut tout réparer. Avec votre cloud, on dépend de votre support à distance.",
      "Et nos spécificités plasturgie ? On fait du bi-injection, du surmoulage, des inserts métalliques. Votre ERP généraliste connaît-il vraiment nos contraintes techniques ?",
      "Si dans 5 ans vous êtes rachetés par Oracle ou SAP, qu'est-ce qui nous garantit que les tarifs ne vont pas exploser ? On sera prisonniers de votre plateforme sans possibilité de retour."
    ],
    successCriteria: ["Audit performance actuelle", "Business case ROI 20%"],
    tools: ["audit_erp", "calc_productivite"]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};