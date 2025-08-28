// Scenario-specific market analyses, objectives, and objections
// This file contains detailed, context-specific content for each scenario

export interface ScenarioMarketData {
  marketOverview: {
    size: string;
    growth: string;
    keyPlayers: string[];
    trends: string[];
    regulations?: string[];
  };
  competitiveLandscape: {
    directCompetitors: Array<{
      name: string;
      marketShare: string;
      strengths: string[];
      weaknesses: string[];
    }>;
    indirectCompetitors: string[];
    competitiveAdvantages: string[];
    marketGaps: string[];
  };
  opportunity: {
    tam: string;
    sam: string;
    som: string;
    growthDrivers: string[];
    marketSegments: Array<{
      name: string;
      size: string;
      growth: string;
    }>;
  };
}

export interface ScenarioObjectives {
  coldCall: {
    primary: string[];
    secondary: string[];
    success_metrics: string[];
  };
  meeting: {
    discovery: string[];
    demo: string[];
    closing: string[];
    success_metrics: string[];
  };
}

export interface ScenarioObjections {
  category: string;
  objection: string;
  frequency: "Très fréquente" | "Fréquente" | "Occasionnelle";
  responses: string[];
  evidence: string;
  nextStep: string;
  persona_adaptation?: string;
}

// KPI Performance scenario specific data
export const kpiPerformanceData = {
  marketData: {
    marketOverview: {
      size: "Le marché européen de l'EdTech dans l'enseignement supérieur représente 8,2 milliards d'euros",
      growth: "Croissance annuelle de 16,3% avec une accélération post-COVID",
      keyPlayers: [
        "Blackboard (leader LMS - 32% PDM)",
        "Canvas by Instructure (20% PDM)",
        "Moodle (15% PDM)",
        "D2L Brightspace (8% PDM)"
      ],
      trends: [
        "Micro-learning et formations courtes (+47% en 2024)",
        "Gamification pédagogique (+35% adoption)",
        "IA adaptative pour personnalisation (+28% demande)",
        "Réalité virtuelle pour soft skills (+22% intérêt)",
        "Analytics pédagogiques avancées (+31% demande)"
      ],
      regulations: [
        "RGPD strict sur données étudiants",
        "Certifications qualité (Qualiopi obligatoire)",
        "Accessibilité numérique (RGAA 4.1)"
      ]
    },
    competitiveLandscape: {
      directCompetitors: [
        {
          name: "Articulate 360",
          marketShare: "18% sur simulation business",
          strengths: ["Interface intuitive", "Bibliothèque templates", "Support technique excellent"],
          weaknesses: ["Prix élevé (2400€/an)", "Pas de focus métier spécifique", "Analytics basiques"]
        },
        {
          name: "iSpring Solutions",
          marketShare: "12% sur simulation B2B",
          strengths: ["Intégration PowerPoint", "Rapid learning", "Prix compétitif"],
          weaknesses: ["Limité sur IA adaptative", "Pas de coaching temps réel", "Support français faible"]
        },
        {
          name: "Gomo Learning",
          marketShare: "8% sur e-learning interactif",
          strengths: ["Responsive design", "Cloud native", "Collaboration équipes"],
          weaknesses: ["Pas de spécialisation commerciale", "Analytics limitées", "Coût par apprenant élevé"]
        }
      ],
      indirectCompetitors: [
        "Formations présentielles traditionnelles",
        "Coaching commercial externe",
        "Plateformes généralistes (LinkedIn Learning, Coursera)",
        "Solutions internes développées"
      ],
      competitiveAdvantages: [
        "IA conversationnelle spécialisée en négociation commerciale",
        "Scenarios hyper-réalistes basés sur vraies données sectorielles",
        "Coaching temps réel avec feedback personnalisé",
        "Analytics prédictives sur performance commerciale",
        "ROI mesurable et rapide (6-8 mois)",
        "Intégration native avec CRM (Salesforce, HubSpot, Pipedrive)"
      ],
      marketGaps: [
        "Manque de solutions spécialisées en simulation commerciale B2B",
        "Peu d'outils avec IA vraiment conversationnelle",
        "Analytics pédagogiques insuffisamment développées",
        "Gap entre formation théorique et pratique terrain"
      ]
    },
    opportunity: {
      tam: "8,2 Md€ (EdTech enseignement supérieur Europe)",
      sam: "1,1 Md€ (Formation commerciale et soft skills)",
      som: "180 M€ (Écoles commerce + formations spécialisées)",
      growthDrivers: [
        "Digitalisation forcée post-COVID (+43% budget digital)",
        "Guerre des talents nécessitant formation différenciante",
        "Exigences étudiants pour expérience immersive",
        "Pression employabilité et insertion professionnelle",
        "Besoins entreprises partenaires plus spécialisés"
      ],
      marketSegments: [
        {
          name: "Écoles de commerce (Tier 1)",
          size: "85 M€",
          growth: "+18% annuel"
        },
        {
          name: "Écoles de commerce (Tier 2-3)",
          size: "45 M€", 
          growth: "+22% annuel"
        },
        {
          name: "Universités - Masters spécialisés",
          size: "35 M€",
          growth: "+15% annuel"
        },
        {
          name: "Organismes formation continue",
          size: "25 M€",
          growth: "+25% annuel"
        }
      ]
    }
  } as ScenarioMarketData,

  objectives: {
    coldCall: {
      primary: [
        "Obtenir un RDV de 45min avec le Directeur Pédagogique dans les 10 jours",
        "Identifier le processus décisionnel et les autres stakeholders impliqués",
        "Qualifier le budget disponible et la temporalité du projet"
      ],
      secondary: [
        "Comprendre les enjeux spécifiques de modernisation pédagogique",
        "Identifier les frustrations avec les outils actuels",
        "Évaluer le niveau de maturité digitale de l'équipe"
      ],
      success_metrics: [
        "RDV confirmé dans l'agenda",
        "Contact direct décideur identifié", 
        "Budget qualifié (+/- 50K€)",
        "Timeline projet définie (3-6 mois)"
      ]
    },
    meeting: {
      discovery: [
        "Cartographier l'écosystème pédagogique actuel complet",
        "Identifier 3-5 pain points prioritaires avec impact business",
        "Définir les critères de succès et métriques de mesure",
        "Comprendre l'expérience étudiante actuelle vs souhaitée"
      ],
      demo: [
        "Démontrer la valeur via un cas d'usage concret ESCAP",
        "Faire tester l'interface par le prospect (hands-on 15min)",
        "Présenter le ROI calculé spécifiquement pour ESCAP",
        "Obtenir l'accord pour un pilote gratuit 6 semaines"
      ],
      closing: [
        "Négocier les termes du contrat (durée, périmètre, prix)",
        "Valider le budget et obtenir l'accord de principe",
        "Planifier les étapes de déploiement et formation équipes",
        "Signer le contrat ou obtenir un engagement ferme avec timeline"
      ],
      success_metrics: [
        "Stakeholders décisionnels tous impliqués",
        "Business case validé avec ROI >200%",
        "Pilote approuvé avec ressources allouées",
        "Planning projet défini avec milestones"
      ]
    }
  } as ScenarioObjectives,

  objections: [
    {
      category: "Budget / ROI",
      objection: "Le coût est trop élevé pour notre budget pédagogique actuel",
      frequency: "Très fréquente" as const,
      responses: [
        "Calculons ensemble le coût de l'immobilisme : perte d'attractivité étudiants, baisse classements, démotivation équipes...",
        "Notre pilote gratuit 6 semaines vous permet de mesurer le ROI exact avant tout investissement",
        "Investissement rentabilisé en 8-12 mois via amélioration satisfaction étudiants et différenciation concurrentielle",
        "Financement étalé possible + réduction 25% première année pour early adopters"
      ],
      evidence: "HEC Paris : ROI de 280% en 18 mois via augmentation attractivité programmes et réduction coûts formation",
      nextStep: "Préparation business case détaillé avec données financières spécifiques ESCAP",
      persona_adaptation: "Pour Directeur Pédagogique : focus impact satisfaction étudiants. Pour DG : focus différenciation concurrentielle"
    },
    {
      category: "Résistance au changement",
      objection: "Nos professeurs ne sont pas prêts pour ce type d'innovation",
      frequency: "Très fréquente" as const,
      responses: [
        "Programme d'accompagnement équipes en 3 étapes sur 8 semaines avec formation dédiée",
        "Interface intuitive : 92% des professeurs autonomes en moins de 2 heures selon nos études",
        "Champions internes identifiés pour porter le changement et former leurs collègues",
        "Support technique dédié avec hotline française et best practices intégrées"
      ],
      evidence: "ESSEC : 96% satisfaction équipes professorales après 3 mois d'utilisation et formation adaptée",
      nextStep: "Workshop découverte pour équipe volontaire + rencontre avec professeur ESSEC utilisateur",
      persona_adaptation: "Rassurer sur accompagnement humain et technique, pas juste outil"
    },
    {
      category: "Efficacité pédagogique",
      objection: "Comment prouver que c'est plus efficace que nos méthodes actuelles ?",
      frequency: "Fréquente" as const,
      responses: [
        "Analytics détaillés : progression compétences, temps engagement, scores performance, comparaisons cohortes",
        "Méthodologie d'évaluation validée scientifiquement (3 études peer-reviewed publiées)",
        "A/B testing possible : comparaison groupe témoin vs groupe utilisant la solution",
        "Certification compétences avec badges reconnus par 40+ entreprises partenaires"
      ],
      evidence: "Étude KEDGE 2024 : +73% compétences négociation vs méthodes traditionnelles sur cohorte 200 étudiants",
      nextStep: "Protocole de mesure d'impact personnalisé ESCAP avec KPIs définis ensemble",
      persona_adaptation: "Mettre l'accent sur rigueur scientifique et mesures objectives"
    },
    {
      category: "Intégration technique",
      objection: "L'intégration avec notre LMS sera trop complexe",
      frequency: "Fréquente" as const,
      responses: [
        "API native s'intégrant en 24-48h avec tous LMS majeurs (Moodle, Canvas, Blackboard...)",
        "Équipe technique dédiée pour accompagnement gratuit pendant tout l'onboarding",
        "Aucune modification infrastructure requise, déploiement cloud sécurisé RGPD-compliant",
        "99.97% uptime garanti avec redondance multi-zones et backup automatique"
      ],
      evidence: "SKEMA : intégration complète avec Moodle réalisée en 36h avec zéro interruption de service",
      nextStep: "Audit technique gratuit avec votre DSI et démonstration intégration",
      persona_adaptation: "Focus aspects techniques pour DSI, simplicité pour utilisateurs finaux"
    },
    {
      category: "Timing",
      objection: "Ce n'est pas le bon moment, nous avons trop de projets",
      frequency: "Fréquente" as const,
      responses: [
        "Le pilote ne mobilise que 3h/semaine pour 1 professeur volontaire",
        "Déploiement progressif totalement aligné sur votre calendrier académique",
        "Support complet : vous vous concentrez sur la pédagogie, nous gérons la technique",
        "Vos concurrents s'équipent massivement : chaque mois de retard = avantage perdu"
      ],
      evidence: "40% des écoles de commerce Tier 1 équipées en 2024 vs 15% en 2023 - accélération massive",
      nextStep: "Planning déploiement sur-mesure respectant vos contraintes et priorités",
      persona_adaptation: "Rassurer sur progressivité et flexibilité du déploiement"
    },
    {
      category: "Alternative interne",
      objection: "Nous préférons développer une solution en interne",
      frequency: "Occasionnelle" as const,
      responses: [
        "Coût développement interne : 800K€-1,2M€ sur 2-3 ans + équipe 6-8 personnes dédiées",
        "Time-to-market : 24-36 mois vs déploiement immédiat avec notre solution",
        "Notre R&D : 25 ingénieurs spécialisés IA conversationnelle éducative depuis 4 ans",
        "Maintenance, évolutions, conformité : charges récurrentes lourdes et chronophages"
      ],
      evidence: "Université Paris-Dauphine : abandon projet interne après 2 ans et 950K€ investis",
      nextStep: "Comparaison détaillée coûts/bénéfices/risques build vs buy sur 5 ans",
      persona_adaptation: "Focus ROI et time-to-market pour DG, complexité technique pour DSI"
    },
    {
      category: "Concurrence",
      objection: "Nous regardons aussi Articulate 360 qui est leader",
      frequency: "Fréquente" as const,
      responses: [
        "Articulate excellent pour e-learning classique, mais pas spécialisé simulation commerciale B2B",
        "Notre IA conversationnelle vs leurs templates statiques : expérience immersive incomparable",
        "Analytics prédictives sur performance vs reporting basique Articulate",
        "Prix similaire mais ROI supérieur grâce à spécialisation métier"
      ],
      evidence: "Benchmark indépendant Féfaur 2024 : notre solution 2,3x plus efficace sur compétences commerciales",
      nextStep: "Démonstration comparative en live + témoignage client ayant migré d'Articulate",
      persona_adaptation: "Reconnaître qualités concurrent mais montrer spécialisation unique"
    },
    {
      category: "Preuves sociales",
      objection: "Quelles sont vos références dans l'enseignement supérieur ?",
      frequency: "Occasionnelle" as const,
      responses: [
        "Clients actuels : ESSEC, KEDGE, SKEMA, EM Lyon (plus de 15 000 étudiants formés)",
        "Partenariats : HEC incubateur, Station F EdTech program, Label French Tech",
        "Reconnaissance : Prix Innovation EduTech 2024, Partenaire Microsoft Education",
        "Croissance : +340% clients sur 18 mois, 94% taux de renouvellement"
      ],
      evidence: "Étude satisfaction : NPS moyen 68 chez nos clients éducation vs 31 moyenne secteur",
      nextStep: "Mise en relation avec Directeur Innovation KEDGE pour retour d'expérience",
      persona_adaptation: "Adapter références selon profil : innovation pour DPed, business pour DG"
    }
  ] as ScenarioObjections[]
};

// Function to get scenario-specific data
export const getScenarioData = (scenarioId: string) => {
  switch (scenarioId) {
    case 'kpi-performance':
      return kpiPerformanceData;
    default:
      return kpiPerformanceData; // Fallback for now
  }
};