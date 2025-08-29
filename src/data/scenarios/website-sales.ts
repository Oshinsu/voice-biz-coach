import { Scenario } from './types';

export const websiteSalesScenario: Scenario = {
  id: "website-sales",
  title: "Vente de Site Internet Restaurant",
  description: "Vendre une solution web complète à un restaurant traditionnel français pour développer sa présence digitale et moderniser son activité",
  difficulty: "Moyen",
  probability: 68,
  company: {
    name: "Le Petit Marché",
    sector: "Restauration Traditionnelle",
    size: "8 employés",
    revenue: "850K€/an",
    location: "Lyon 3ème, Presqu'île",
    description: "Restaurant traditionnel familial fondé en 1987, spécialisé cuisine lyonnaise authentique. Clientèle fidèle locale + touristes. 2ème génération familiale, attachement fort aux traditions mais consciente des enjeux de modernisation.",
    painPoints: [
      "Visibilité online inexistante - pas de site web professionnel",
      "Concurrence restaurants avec livraison et réservation en ligne",
      "Perte clientèle jeune (25-40 ans) qui cherche tout online",
      "Gestion réservations téléphonique chronophage",
      "Pas de présence sur plateformes de livraison par choix"
    ],
    currentSolution: "Page Facebook basique + téléphone pour réservations + bouche-à-oreille",
    budget: "2-5K€ budget site + 50-150€/mois maintenance",
    timeline: "Rentrée 2024 - avant période automne-hiver",
    foundedYear: 1987,
    keyPeople: [
      "Marie Dubois - Propriétaire-gérante (45 ans, fille du fondateur)",
      "Paul Dubois - Chef cuisinier (50 ans, fondateur, père de Marie)",
      "Julien Martin - Serveur/Responsable salle (28 ans, 4 ans ancienneté)"
    ]
  },
  interlocutor: {
    name: "Marie Dubois",
    role: "Propriétaire-gérante",
    personality: "Femme d'affaires pragmatique et directe, très attachée aux valeurs familiales et à l'authenticité du restaurant. Sceptique face aux nouvelles technologies mais ouverte si elle voit un bénéfice concret pour l'activité. Protectrice de l'image traditionnelle tout en étant consciente de la nécessité d'évoluer.",
    communicationStyle: "Directe et sans détour, pose des questions pratiques et financières. Utilise un vocabulaire simple, apprécie les explications claires sans jargon technique. Décisionnaire rapide une fois convaincue.",
    decisionPower: "Décisionnaire finale, gère le budget et les investissements",
    priorities: [
      "Augmenter la fréquentation, surtout en semaine",
      "Attirer une clientèle plus jeune sans perdre les habitués",
      "Simplifier la gestion des réservations",
      "Améliorer la visibilité locale sans dénaturer l'identité",
      "Générer plus de chiffre d'affaires avec un budget maîtrisé"
    ],
    concerns: [
      "Coût du site et maintenance mensuelle",
      "Complexité d'utilisation et de mise à jour",
      "Risque de perdre l'authenticité et le côté traditionnel",
      "Temps nécessaire pour apprendre à gérer le site",
      "Efficacité réelle vs bouche-à-oreille traditionnel"
    ],
    motivations: [
      "Pérenniser l'héritage familial en s'adaptant aux temps modernes",
      "Augmenter le chiffre d'affaires pour sécuriser l'avenir",
      "Faciliter le travail quotidien (gestion réservations)",
      "Fierté de moderniser tout en gardant l'âme du lieu"
    ],
    experience: "15 ans dans la restauration familiale, formation hôtellerie-restauration, gestion d'entreprise familiale depuis 8 ans"
  },
  product: {
    name: "RestoWeb Tradition",
    description: "Solution web complète spécialement conçue pour restaurants traditionnels : site vitrine + système de réservation + gestion menu + présence locale optimisée",
    pricing: {
      starter: "1,200€ + 49€/mois",
      professional: "2,500€ + 99€/mois", 
      enterprise: "4,200€ + 149€/mois"
    },
    keyFeatures: [
      "Site vitrine responsive avec galerie photos plats",
      "Système de réservation en ligne intégré",
      "Gestion menu avec photos et descriptions",
      "Optimisation référencement local Google",
      "Integration Google Maps et avis clients",
      "Formulaire de contact et informations pratiques",
      "Galerie photos ambiance restaurant",
      "Blog pour actualités et événements",
      "Interface d'administration simple",
      "Sauvegarde automatique quotidienne"
    ],
    competitiveAdvantages: [
      "Spécialisé restaurants traditionnels vs agences généralistes",
      "Interface ultra-simple pour restaurateurs peu tech",
      "Design respectueux de l'identité traditionnelle",
      "Support téléphonique français personnalisé",
      "Prix transparents sans surprise",
      "Formation incluse avec prise en main assistée"
    ],
    roi: "Clients moyens : +25% réservations, +35% visibilité locale, -60% temps gestion réservations",
    implementationTime: "3 semaines : 1 sem création + 1 sem formation + 1 sem optimisation"
  },
  objectives: [
    "Démontrer l'impact sur la visibilité locale et les réservations",
    "Rassurer sur la simplicité d'utilisation au quotidien",
    "Prouver le respect de l'identité traditionnelle du restaurant",
    "Quantifier le ROI vs investissement et maintenance",
    "Convaincre de la nécessité face à la concurrence moderne"
  ],
  salesGoal: "Contrat Professional à 2,500€ + 99€/mois (12 mois)",
  expectedRevenue: "3,688€ première année",
  swot: {
    strengths: [
      "Spécialisation restaurants traditionnels français",
      "Interface simple adaptée aux non-techniciens",
      "Support français personnalisé et formation incluse",
      "Prix adapté aux budgets restauration traditionnelle",
      "Respect identité authentique vs templates génériques"
    ],
    weaknesses: [
      "Startup récente vs agences établies",
      "Fonctionnalités limitées vs solutions enterprise",
      "Dépendance Google pour référencement local",
      "Marché de niche (restaurants traditionnels seulement)"
    ],
    opportunities: [
      "Digital gap important chez restaurateurs traditionnels",
      "Clients recherchent authenticité + commodité digitale",
      "Google privilégie présence web pour référencement local",
      "Générations digitales natives 70% clientèle future"
    ],
    threats: [
      "Plateformes type Deliveroo proposent sites gratuits",
      "Agences low-cost avec templates génériques",
      "Solutions DIY type Wix de plus en plus simples",
      "Crise économique réduit budgets marketing restaurants"
    ]
  },
  competitorSwot: {
    strengths: [
      "Bouche-à-oreille traditionnel très efficace",
      "Clientèle fidèle habituée au contact téléphonique",
      "Économies sur coûts web et maintenance"
    ],
    weaknesses: [
      "Invisibilité totale pour nouvelles générations",
      "Concurrence défavorable vs restaurants digitalisés",
      "Gestion réservations téléphonique chronophage",
      "Pas de présence sur Google Maps/recherche locale"
    ],
    opportunities: [
      "Amélioration progressive de la présence Facebook",
      "Partenariats avec plateformes de réservation existantes"
    ],
    threats: [
      "Perte continue de clientèle jeune vers concurrence digitale",
      "Référencement Google défavorable vs concurrents avec site",
      "Image dépassée face aux attentes clients modernes"
    ]
  },
  probableObjections: [
    "2,500€ c'est énorme pour nous ! Notre budget marketing annuel c'est même pas ça. Comment justifier cette dépense ?",
    "Nos clients habitués préfèrent téléphoner, ils ont 50-60 ans. Internet c'est pour les jeunes, pas notre clientèle.",
    "On a déjà une page Facebook, ça suffit non ? Pourquoi payer pour un site en plus ?",
    "Je ne sais même pas utiliser un ordinateur correctement. Comment je vais gérer un site web ?",
    "Et si ça ne marche pas ? On aura payé pour rien et on n'aura pas les clients en plus.",
    "99€ par mois c'est lourd à long terme. Ça fait plus de 1000€ par an juste pour la maintenance !",
    "Notre restaurant a du charme justement parce qu'il est traditionnel. Un site web va casser cette image.",
    "Les plateformes comme LaFourchette proposent déjà des solutions de réservation gratuites.",
    "Combien de temps il faut pour que ça marche ? On ne peut pas attendre 6 mois pour voir des résultats.",
    "Et la concurrence ? Si tout le monde a un site, on ne se démarquera plus par notre authenticité."
  ],
  successCriteria: [
    "Démonstration live d'exemples restaurants traditionnels similaires",
    "Audit visibilité locale révélant potentiel de croissance",
    "Validation simplicité interface avec démonstration hands-on",
    "Témoignage restaurateur local ayant eu des résultats concrets",
    "Test gratuit 1 mois avec mesure impact réservations",
    "Formation personnalisée incluse avec support continu"
  ],
  tools: [
    "Audit visibilité Google locale actuelle",
    "Calculateur ROI personnalisé pour restaurants",
    "Comparateur coût/bénéfice vs solutions alternatives",
    "Simulateur d'impact sur réservations et chiffre d'affaires",
    "Planning de déploiement adapté à l'activité restaurant"
  ],
  stakeholders: [
    {
      name: "Marie Dubois",
      role: "Décisionnaire Principale - Propriétaire-gérante",
      influence: "Très élevée",
      support: "Neutre-Sceptique (prudente face aux nouvelles technologies)",
      concerns: ["ROI réel", "Complexité d'usage", "Coût récurrent", "Impact sur image traditionnelle"],
      approach: "Démonstration simplicité + témoignages restaurants similaires + ROI chiffré"
    },
    {
      name: "Paul Dubois",
      role: "Influenceur - Chef fondateur",
      influence: "Élevée (opinion respectée par Marie)",
      support: "Résistant (attaché tradition)",
      concerns: ["Dénaturation de l'identité", "Complexité", "Coût"],
      approach: "Rassurer sur respect tradition + exemples restaurants familiaux modernisés"
    },
    {
      name: "Julien Martin",
      role: "Utilisateur Final - Responsable salle",
      influence: "Moyenne (adoption quotidienne)",
      support: "Positif (jeune, à l'aise avec digital)",
      concerns: ["Formation", "Changement habitudes"],
      approach: "Formation pratique + bénéfices gestion réservations simplifiée"
    }
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'Expert digital restaurants traditionnels',
      description: 'Modernisation respectueuse de l\'identité avec résultats mesurables'
    },
    evidence: {
      title: 'Restaurants familiaux transformés',
      description: 'Bouchon lyonnais, bistrot parisien : +40% réservations, identité préservée'
    },
    pilot: {
      title: 'Test gratuit 30 jours',
      description: 'Site complet opérationnel avec mesure impact réservations réel'
    },
    sequence: [
      'Audit visibilité locale : analyse présence Google vs concurrents quartier',
      'Diagnostic digital : évaluation gap avec attentes clientèle moderne',
      'Benchmark local : performance restaurants digitalisés vs traditionnels',
      'Démonstration personnalisée : site exemple restaurant traditionnel similaire',
      'Calcul ROI : impact réservations + économie temps gestion',
      'Test 30 jours : déploiement site complet avec formation',
      'Mesure résultats : tracking réservations et trafic local',
      'Optimisation : ajustements basés sur performance réelle'
    ],
    leveragePoints: [
      'Rentrée 2024 : période clé restauration, préparation saison automne-hiver',
      'Concurrence locale : restaurants voisins avec sites gagnent parts de marché',
      'Génération digitale : 78% cherchent restaurants online avant de choisir',
      'Google privilégie : sites web pour classement recherche locale',
      'Simplification : réservations automatisées libèrent temps pour cuisine/service'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "180,000 restaurants France, 120,000 sans site web professionnel",
      growthRate: "+15% recherches online restaurants, +25% réservations digitales",
      budgetRange: "1-5K€ investissement initial, 50-200€/mois maintenance",
      expectedROI: "+25% réservations, +35% visibilité locale, +15% CA moyen",
      timeline: "Urgent rentrée 2024 avant concurrence saison automne-hiver",
      keyPlayers: ["LaFourchette", "Zenchef", "Agences locales", "Solutions DIY"],
      digitalGap: "67% restaurants traditionnels sans présence web digne",
      customerBehavior: "73% clients consultent internet avant choix restaurant",
      localSearchGrowth: "+45% recherches 'restaurant près de moi' depuis 2022"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Identifier impact manque visibilité online + quantifier pertes clientèle",
      secondary: "Évaluer budget modernisation + réceptivité au changement",
      successMetrics: "RDV démonstration + accès analytics réservations actuelles"
    },
    rdv: {
      primary: "Démontrer ROI RestoWeb via simulation réservations + visibilité",
      secondary: "Rassurer simplicité + obtenir test gratuit 30 jours",
      successMetrics: "Test approuvé + budget validé + formation planifiée"
    }
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Budget coût",
      objection: "2,500€ + 99€/mois c'est trop cher pour notre petit restaurant",
      frequency: "Très fréquente" as const,
      responses: [
        "Le Bouchon des Filles à Lyon a généré +8K€ de CA supplémentaire dès les 3 premiers mois",
        "99€/mois = 3€/jour, moins qu'un café ! Pour automatiser vos réservations 24h/24",
        "Vos concurrents avec sites captent vos clients potentiels chaque jour"
      ],
      evidence: "Case study Bouchon des Filles : ROI 320% an 1 + économie 10h/semaine gestion",
      nextStep: "Calcul ROI personnalisé sur votre activité + témoignage restaurant similaire"
    },
    {
      category: "Clientèle âgée",
      objection: "Nos clients ont 50-60 ans, ils téléphonent, internet c'est pas pour eux",
      frequency: "Très fréquente" as const,
      responses: [
        "73% des 50+ utilisent internet pour choisir restaurants. Vos clients aussi !",
        "Le site garde le téléphone : c'est un complément, pas un remplacement",
        "Le Bistrot Paul Bert (clientèle 55 ans moyenne) : +30% nouvelles réservations via site"
      ],
      evidence: "Étude INSEE 2024 : 73% des 50+ actifs online + case study Bistrot Paul Bert",
      nextStep: "Démonstration interface simple + témoignage restaurateur clientèle âgée"
    },
    {
      category: "Complexité technique",
      objection: "Je ne sais pas utiliser l'informatique, c'est trop compliqué pour moi",
      frequency: "Fréquente" as const,
      responses: [
        "Interface aussi simple qu'envoyer un SMS : 3 clics pour modifier le menu",
        "Formation personnalisée chez vous jusqu'à autonomie complète",
        "Martine (65 ans) du Petit Marche gère son site depuis 2 ans sans problème"
      ],
      evidence: "Interface ultra-simple + formation sur-mesure + témoignage Martine 65 ans",
      nextStep: "Démonstration hands-on simplicité + planning formation personnalisée"
    },
    {
      category: "Perte d'authenticité",
      objection: "Un site web va casser l'image traditionnelle de notre restaurant",
      frequency: "Fréquente" as const,
      responses: [
        "Nos sites mettent en valeur l'authenticité : photos maison, histoire familiale, recettes traditionnelles",
        "Le Comptoir du Relais a gardé son âme tout en attirant +40% de jeunes clients",
        "Internet révèle votre authenticité au monde, il ne la cache pas"
      ],
      evidence: "Portfolio restaurants traditionnels + case study Comptoir du Relais",
      nextStep: "Galerie exemples sites restaurants authentiques + mock-up personnalisé"
    },
    {
      category: "Efficacité douteuse", 
      objection: "Et si ça ne marche pas ? On aura payé pour rien",
      frequency: "Occasionnelle" as const,
      responses: [
        "Test gratuit 30 jours : vous voyez les résultats avant de payer",
        "Garantie +20% réservations dans les 6 mois ou remboursement",
        "95% de nos restaurants traditionnels renouvellent : preuve que ça marche"
      ],
      evidence: "Test gratuit + garantie performance + taux renouvellement 95%",
      nextStep: "Mise en place test gratuit immédiat + contrat avec garantie"
    }
  ]
};