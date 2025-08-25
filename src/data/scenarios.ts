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
    id: "kpi-performance",
    title: "Optimisation Analytics E-commerce",
    description: "Vendre une plateforme d'analytics avancée à un e-commerce en croissance",
    difficulty: "Moyen",
    probability: 75,
    company: {
      name: "ModaStyle",
      sector: "E-commerce Mode",
      size: "50 employés",
      revenue: "8M€/an",
      location: "Lyon, France",
      description: "Boutique en ligne spécialisée dans la mode éthique et durable",
      painPoints: ["Difficulté à tracker le ROI des campagnes", "Perte de clients sans comprendre pourquoi"],
      currentSolution: "Google Analytics + tableurs Excel",
      budget: "15-25k€/an",
      timeline: "Q1 2024"
    },
    interlocutor: {
      name: "Sophie Martin",
      role: "Directrice Marketing",
      personality: "Analytique et perfectionniste",
      communicationStyle: "Directe, aime les chiffres concrets",
      decisionPower: "Décisionnaire avec validation CEO",
      priorities: ["ROI mesurable", "Facilité d'usage"],
      concerns: ["Coût", "Complexité"],
      motivations: ["Performance", "Croissance"],
      experience: "5 ans en marketing digital"
    },
    product: {
      name: "DataTrack Pro",
      description: "Plateforme analytics tout-en-un pour e-commerce avec IA prédictive",
      pricing: {
        starter: "299€/mois",
        professional: "599€/mois", 
        enterprise: "1200€/mois"
      },
      keyFeatures: ["Tracking multi-canal unifié", "Prédictions IA de churn"],
      competitiveAdvantages: ["Setup en 24h vs 2 semaines concurrence", "IA propriétaire 30% plus précise"],
      roi: "300% ROI en 6 mois",
      implementationTime: "2 semaines"
    },
    objectives: ["Démontrer la valeur du tracking unifié", "Quantifier les pertes actuelles"],
    salesGoal: "Contrat Pro à 599€/mois (12 mois)",
    expectedRevenue: "7,188€",
    swot: {
      strengths: ["IA propriétaire", "Setup rapide"],
      weaknesses: ["Prix premium", "Jeune entreprise"],
      opportunities: ["Marché en croissance", "Besoin urgent client"],
      threats: ["Concurrents établis", "Solutions open-source"]
    },
    competitorSwot: {
      strengths: ["Outils gratuits existants", "Habitudes établies"],
      weaknesses: ["Données silos", "Pas de prédictif"],
      opportunities: ["Coût zéro", "Connaissance interne"],
      threats: ["Manque de visibilité", "Erreurs décisions"]
    },
    probableObjections: ["C'est trop cher pour nous", "Google Analytics suffit"],
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
      description: "Société de services informatiques spécialisée dans l'accompagnement PME",
      painPoints: ["Gestion commerciale dispersée", "Suivi client inefficace", "Reporting manuel chronophage"],
      currentSolution: "Excel + emails",
      budget: "5-10k€/an",
      timeline: "Q2 2024"
    },
    interlocutor: {
      name: "Marc Dubois",
      role: "Directeur Commercial",
      personality: "Pragmatique et orienté résultats",
      communicationStyle: "Concret, apprécie la simplicité",
      decisionPower: "Décisionnaire final",
      priorities: ["Simplicité d'usage", "ROI rapide"],
      concerns: ["Formation équipe", "Migration données"],
      motivations: ["Efficacité", "Croissance chiffre d'affaires"],
      experience: "8 ans en direction commerciale"
    },
    product: {
      name: "SalesFlow CRM",
      description: "CRM tout-en-un simple et puissant pour PME",
      pricing: {
        starter: "29€/mois/utilisateur",
        professional: "49€/mois/utilisateur",
        enterprise: "89€/mois/utilisateur"
      },
      keyFeatures: ["Pipeline visuel", "Automation marketing", "Reporting temps réel"],
      competitiveAdvantages: ["Interface intuitive", "Migration assistée gratuite"],
      roi: "200% ROI en 3 mois",
      implementationTime: "1 semaine"
    },
    objectives: ["Démontrer la simplicité d'usage", "Calculer le gain de productivité"],
    salesGoal: "Contrat Pro pour 10 utilisateurs (12 mois)",
    expectedRevenue: "5,880€",
    swot: {
      strengths: ["Interface simple", "Support français"],
      weaknesses: ["Fonctionnalités limitées", "Jeune sur le marché"],
      opportunities: ["Marché PME en croissance", "Digitalisation urgente"],
      threats: ["Concurrents établis", "Solutions gratuites"]
    },
    competitorSwot: {
      strengths: ["Outils Excel familiers", "Coût zéro actuel"],
      weaknesses: ["Pas de centralisation", "Erreurs humaines"],
      opportunities: ["Connaissance interne", "Pas de formation"],
      threats: ["Perte d'opportunités", "Manque de visibilité"]
    },
    probableObjections: ["On s'en sort bien avec Excel", "C'est compliqué à mettre en place"],
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
      description: "Fabricant de pièces métalliques pour l'automobile et l'aéronautique",
      painPoints: ["Approvisionnement complexe", "Négociations longues", "Manque de transparence fournisseurs"],
      currentSolution: "Achats traditionnels via commercial",
      budget: "50-100k€/an",
      timeline: "Q3-Q4 2024"
    },
    interlocutor: {
      name: "Catherine Moreau",
      role: "Directrice Achats",
      personality: "Méticuleuse et conservatrice",
      communicationStyle: "Formelle, aime les preuves détaillées",
      decisionPower: "Influence forte, validation Direction Générale",
      priorities: ["Réduction coûts", "Sécurité approvisionnement"],
      concerns: ["Fiabilité plateforme", "Résistance équipes"],
      motivations: ["Optimisation", "Reconnaissance professionnelle"],
      experience: "15 ans en achats industriels"
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
    probableObjections: ["Nos fournisseurs actuels nous conviennent", "C'est trop cher pour nous"],
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
    probableObjections: ["La formation présentielle est plus efficace", "C'est trop cher par utilisateur"],
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
    probableObjections: ["On n'a jamais eu de problème", "C'est trop cher pour notre taille"],
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
    probableObjections: ["Notre ERP actuel fonctionne encore", "L'investissement est trop important"],
    successCriteria: ["Audit performance actuelle", "Business case ROI 20%"],
    tools: ["audit_erp", "calc_productivite"]
  }
];

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};