// Données spécifiques par scénario pour personnaliser l'expérience d'apprentissage

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
  marketOverview: {
    marketSize: "2.1B€ marché EdTech France",
    growthRate: "+15.8% CAGR",
    budgetRange: "150K-500K€",
    expectedROI: "22%",
    timeline: "Rentrée 2025",
    currentProcessingTime: "6-8h",
    errorRate: "12-15%",
    costPerTransaction: "45€"
  },

  objectives: {
    coldCall: {
      primary: "Identifier les défis pédagogiques actuels",
      secondary: "Évaluer l'ouverture à l'innovation",
      successMetrics: "RDV avec responsable pédagogique obtenu"
    },
    rdv: {
      primary: "Démontrer l'impact sur l'engagement étudiant",
      secondary: "Présenter le ROI pédagogique mesurable",
      successMetrics: "Autorisation pilote sur 1 département"
    }
  },

  objections: [
    {
      category: "Budget / ROI",
      objection: "Le budget formation est serré cette année",
      frequency: "Très fréquente" as const,
      responses: [
        "ROI 22% dès la première année : 150K€ investis = 183K€ de valeur générée",
        "Pilote gratuit 3 mois : validation concrète avant tout engagement",
        "Économies : -40% temps préparation cours, +60% efficacité pédagogique",
        "Budget étalé possible : 30% année 1, 70% après validation résultats"
      ],
      evidence: "EM Lyon : ROI 31% première année + 89% satisfaction étudiants",
      nextStep: "Simulation ROI personnalisée ESCAP avec vos coûts actuels",
      persona_adaptation: "Focus ROI chiffré pour DG, bénéfices pédagogiques pour directeur académique"
    },
    {
      category: "Résistance au changement",
      objection: "Les professeurs ne sont pas prêts pour ces outils",
      frequency: "Fréquente" as const,
      responses: [
        "Formation complète incluse : 16h réparties sur 2 mois",
        "Champions internes : 2-3 professeurs early adopters formés en priorité",
        "Accompagnement individuel : 1h/semaine/professeur pendant 6 semaines",
        "Interface intuitive : 94% professeurs autonomes après 3 sessions"
      ],
      evidence: "KEDGE : 97% adoption professeurs en 4 mois, 0 résistance après formation",
      nextStep: "Rencontre avec vos professeurs les plus innovants pour témoignage",
      persona_adaptation: "Rassurer sur accompagnement et progressivité"
    },
    {
      category: "Efficacité pédagogique",
      objection: "Est-ce que ça améliore vraiment l'apprentissage ?",
      frequency: "Très fréquente" as const,
      responses: [
        "+73% engagement étudiant vs cours magistraux traditionnels",
        "+45% rétention des compétences à 6 mois (vs +12% méthodes classiques)",
        "Évaluation continue : tracking progression en temps réel",
        "Personnalisation : adaptation niveau et rythme de chaque étudiant"
      ],
      evidence: "ESSEC : +67% réussite aux évaluations commerciales, +52% satisfaction étudiants",
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

// ============= FINTECH STARTUP =============
const fintechStartupData = {
  marketOverview: {
    marketSize: "15.2B$ marché global fintech",
    growthRate: "+22% CAGR",
    budgetRange: "2M-5M€",
    expectedROI: "35%",
    timeline: "Q2 2025",
    keyPlayers: ["Stripe", "Adyen", "Checkout.com"]
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
  marketOverview: {
    marketSize: "943B$ e-commerce mondial",
    growthRate: "+14.7% CAGR",
    budgetRange: "500K-1.5M€",
    expectedROI: "25%",
    timeline: "Q3 2025"
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
    }
  ] as ScenarioObjections[]
};

// ============= DIGITAL AGENCY =============
const digitalAgencyData = {
  marketOverview: {
    marketSize: "567B$ services digitaux",
    growthRate: "+11.2% CAGR", 
    budgetRange: "200K-800K€",
    expectedROI: "30%"
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