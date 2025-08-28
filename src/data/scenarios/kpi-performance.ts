import { Scenario } from './types';

export const kpiPerformanceScenario: Scenario = {
  id: "kpi-performance",
  title: "Optimisation Analytics E-commerce",
  description: "Vendre DataTrack Pro de MarketingTech Solutions à ModaStyle pour révolutionner leur attribution marketing et analytics prédictive avec un ROI de 312% première année",
  difficulty: "Moyen",
  probability: 75,
  company: {
    name: "ModaStyle",
    sector: "E-commerce Mode Éthique",
    size: "50 employés (Marketing: 12, Tech: 8, Logistique: 15, Admin: 15)",
    revenue: "8M€/an (+45% croissance 2023, objectif 12M€ en 2024)",
    location: "Lyon, France - Siège social Presqu'île, entrepôt Rillieux-la-Pape",
    
    // Métriques détaillées entreprise
    metrics: {
      chiffreAffaires: "8M€ (2023) vs 5.5M€ (2022)",
      croissance: "+45% YoY (+65% T4 vs T4-1)",
      ebitda: "1.2M€ (15% marge)",
      beneficeNet: "640k€ (8% marge nette)",
      employes: 50,
      croissanceEquipe: "+25% en 2023 (40 → 50)",
      acquisitionClient: "47€ CAC moyen tous canaux",
      ltv: "165€ LTV moyenne (calculée sur 24 mois)",
      roas: "3.5x ROAS blended tous canaux",
      conversionRate: "2.1% desktop, 1.6% mobile",
      panierMoyen: "78€ (objectif 85€)",
      trafficMensuel: "180k visiteurs uniques/mois",
      clientsActifs: "12,500 clients actifs 12 derniers mois"
    },
    
    description: "E-commerce pionnier français mode éthique fondé 2018 par Clara Dubois (ex-acheteuse Zara). Révolutionne la mode durable avec 12 marques partenaires certifiées GOTS/OEKO-TEX. Catalogue 850 références : vêtements femme/homme/enfant, maroquinerie, bijoux. Positionnement premium (70-150€ pièce) vs fast-fashion. Présence France/Belgique/Suisse, expansion Allemagne prévue 2024. Mission: démocratiser mode éthique européenne. Stack: Shopify Plus, Klaviyo, Meta Ads, Google Ads, Gorgias support. Ambition: leader européen mode éthique 25M€ CA 2027.",
    
    // Historique et contexte approfondi
    companyHistory: {
      fondation: "2018 - Clara Dubois quitte Zara pour créer alternative éthique",
      etapes: [
        "2018-2019: Bootstrap 300k€ capital initial, 5 marques, 100 références",
        "2020: COVID boost e-commerce, +120% croissance, levée famille 800k€",
        "2021: Expansion Belgique/Suisse, migration Shopify Plus, 25 employés",
        "2022: Gamme homme/enfant, certificationsGOTS, 1er bénéfice 280k€",
        "2023: Série A 3M€ Partech/Ring Capital, entrepôt robotisé, 45% croissance"
      ]
    },
    
    ecosystemeTechnologique: {
      ecommerce: "Shopify Plus (99.7% uptime, 15k€/an)",
      emailMarketing: "Klaviyo (flows automation, 8k€/an)",
      publicite: "Meta Business Manager (35k€/mois), Google Ads (25k€/mois), Pinterest (8k€/mois)",
      analytics: "Google Analytics 4 + GTM + Facebook Pixel + TikTok Pixel",
      crm: "HubSpot Sales Hub (prospects B2B marques)",
      support: "Gorgias (chat, tickets, 180€/mois)",
      logistique: "WMS custom Shopify + Colissimo/Chronopost",
      comptabilite: "Sage 100 + Pennylane",
      design: "Figma + Adobe Creative Suite",
      dev: "GitHub + Vercel + Next.js custom apps"
    },

    painPoints: [
      "Attribution marketing fragmentée: impossible de tracer le customer journey réel. Une cliente voit une pub Facebook, clique, revient via Google 3 jours plus tard, achète après email Klaviyo → quel canal créditer? GA4 dit 'direct', Meta dit 'Facebook', Google dit 'recherche'. Résultat: optimisation budgets publicitaires à l'aveugle",
      "Taux de churn client 23% sans signaux prédictifs: clients fidèles partent soudainement sans warning. Exemple: Émilie R., cliente VIP 850€ achats 18 mois, disparaît après retour produit mal géré. Impossible d'identifier pattern pour action préventive",
      "Budget publicitaire 80k€/mois mal alloué: 45% Meta, 30% Google, 15% Pinterest, 10% influence. Allocation historique vs performance réelle. Meta performe T4 mode hiver, Google meilleur T2 mode été, mais budgets fixes toute l'année",
      "Équipe marketing épuisée par reporting manuel: Sophie + Jules + Amélie passent 16h/semaine à consolider 15 fichiers Excel différents. Données dispo mercredi pour décisions lundi suivant = réactivité impossible face concurrence",
      "Retours produits 12% vs 8% marché mode éthique: problème taille (35%), couleur différente écran (25%), qualité tissu (20%), défaut fabrication (20%). Aucun predictif pour anticiper avant production",
      "Saisonnalité erratique malgré 5 ans data: collection printemps 2023 -15% vs prévision, été +25%, automne-hiver normal. Impossible optimiser stocks/marketing sans patterns fiables",
      "Segmentation client rudimentaire: 3 segments (nouveaux, actifs, VIP) vs 15+ segments potentiels. Campaigns email 'one size fits all' = 18% open rate vs 35% possible avec hyperpersonnalisation",
      "Mobile experience sous-optimisée: 65% trafic mobile mais 35% revenus seulement. Conversion mobile 1.6% vs 2.1% desktop. Problème UX checkout mobile identifié mais pas priorisé faute de ROI calculé",
      "Influence marketing non-mesurable: 40k€ investis/trimestre micro-influenceurs mode éthique, impossible de mesurer ROAS réel. Codes promo uniques créent friction, liens bio non-trackés"
    ],
    
    currentSolution: "Architecture analytics fragmentée: Google Analytics 4 (gratuit, setup basique) + Google Ads conversion tracking + Facebook Business Manager analytics + Klaviyo email analytics + Shopify Analytics (natif) + 15 fichiers Excel consolidés manuellement par Sophie Martin chaque lundi. Temps consolidation: 4h/semaine. Fiabilité données: 75% (20% écarts entre sources). Réactivité décision: 7 jours délai. Granularité insight: macro seulement (pas de micro-segments).",
    
    budget: "15-25k€/an analytics tools vs 1M€ total marketing budget (1.5-2.5% budget). Comparaison: 960k€ média advertising, 180k€ content/création, 120k€ influence, 80k€ tools & tech, 60k€ events/PR. Appétit investissement si ROI prouvé: jusqu'à 40k€ première année.",
    
    timeline: "Urgence maximale Q1 2024: lancement collection printemps-été crucial (40% CA annuel réalisé Q2-Q3). Besoin attribution parfaite avant campagne lancement mars 2024. Décision décembre 2023, déploiement janvier 2024, opérationnel février pour optimisation mars-avril.",
    
    foundedYear: 2018,
    keyPeople: [
      "Clara Dubois - CEO & Fondatrice, 34 ans (Ex-acheteuse senior Zara 6 ans, ESSEC). Visionnaire mode éthique européenne, leadership inspirant équipe, obsédée customer experience. Network influent mode/retail",
      "Sophie Martin - Directrice Marketing & Analytics, 29 ans (Ex-Converteo 3 ans, Ex-Spartoo 2 ans, HEC marketing quanti). Data-driven excellence, frustrée limitations tools actuels, workaholic assumée",
      "Jules Moreau - Traffic Manager, 26 ans (Ex-freelance Meta Ads, spécialiste acquisition). Expert growth hacking, maîtrise budgets publicitaires, créatif campagnes visuelles mode",
      "Amélie Durant - CRM Manager, 31 ans (Ex-Sephora email marketing, spécialiste retention). Experte lifecycle marketing, personnalisation email, customer journey mapping",
      "Thomas Dubois - CTO, 32 ans (frère Clara, Ex-dev lead Criteo, Polytechnique). Architecture Shopify Plus, optimisation performance, innovation tech retail",
      "Marc Lecomte - COO, 38 ans (Ex-directeur ops Showroomprivé, supply chain expert). Gestion croissance opérationnelle, logistique, recrutement équipe"
    ],
    
    // Données financières et opérationnelles détaillées
    detailedFinancials: {
      revenue2023: "8,000,000€",
      revenue2022: "5,500,000€", 
      revenue2021: "3,800,000€",
      grossMargin: "62% (4.96M€ marge brute)",
      costOfGoodsSold: "38% (3.04M€)",
      marketingSpend: "1,000,000€ (12.5% CA)",
      personnelCosts: "1,400,000€ (17.5% CA, 50 employés)",
      operatingExpenses: "1,560,000€ (tech, logistique, admin)",
      ebitda: "1,200,000€ (15%)",
      taxes: "360,000€",
      netProfit: "640,000€ (8%)",
      cashFlow: "1,100,000€",
      inventoryValue: "850,000€",
      accountsReceivable: "0€ (B2C direct)",
      workingCapital: "650,000€"
    }
  },
  interlocutor: {
    name: "Sophie Martin",
    role: "Directrice Marketing & Analytics",
    
    // Profil psychologique approfondi
    personality: "Perfectionniste data-driven obsédée par l'excellence opérationnelle. Ex-consultante Converteo habituée aux standards corporates, frustrée par les limitations startup. Workaholic assumée: checks KPIs dimanche 23h, répond emails vacation, dort 5h/nuit en période campagne. Tempérament impatient face inefficacité: coupe réunions sans agenda, exige ROI chiffré sur chaque décision. Passion authentique pour les patterns data cachés. Stress permanent croissance ModaStyle vs ressources limitées. Leadership technique reconnu équipe marketing.",
    
    // Profil LinkedIn simulé
    linkedinProfile: {
      headline: "Directrice Marketing & Analytics @ModaStyle | Ex-Converteo | Data-Driven Growth Expert | HEC MBA",
      experience: [
        "ModaStyle (3 ans) - Directrice Marketing & Analytics: +300% croissance revenue, setup attribution avancée, team leadership 6 personnes",
        "Spartoo (2 ans) - Senior Marketing Manager: optimisation ROAS +65%, gestion budget 500k€, acquisition multicanal",
        "Converteo (3 ans) - Consultant Analytics: audit attribution 50+ clients, expertise GA360/Adobe Analytics, transformation digitale retail"
      ],
      education: "HEC Paris - MBA Marketing Quantitatif (Major promo), Centrale Lyon - Ingénieur (data science option)",
      certifications: "Google Analytics Certified, Facebook Blueprint Certified, Google Ads Certified, Mixpanel Certified",
      publications: [
        "Attribution Marketing : Dépasser les silos data pour l'e-commerce mode (eCommerce Mag, juin 2023)",
        "Interview : Comment ModaStyle a multiplié par 4 son ROAS en 18 mois (JDN, mars 2023)"
      ],
      network: "850+ connexions (marketing directors, growth managers, consultants analytics)",
      activite: "Posts hebdomadaires sur attribution marketing, partage études de cas croissance, commente tendances retail tech"
    },
    
    // Habitudes et préférences détaillées  
    workingStyle: {
      horairesTravail: "8h30-19h30 + weekend matin + urgences soir",
      outilsQuotidiens: "iPad Pro + Apple Pencil (notes manuscrites), MacBook Pro 16' (analyses), iPhone (monitoring constant)",
      rituelsProductivite: "Meditation 10min matin, check dashboards avec café 8h45, synthèse KPIs équipe tous lundis 9h",
      espaceTravail: "Bureau debout modulable, 3 écrans (dashboard permanent), notes post-it colorées système personnel",
      communicationPreferences: "Slack pour urgences, email synthèse, visio max 45min, déteste small talk"
    },
    
    communicationStyle: "Communication ultra-directe factuelle, aucune tolérance pour approximations ou langue de bois. Rythme soutenu: 3 questions précises/minute, interrompt si dérive sujet. Adore graphiques courbes/histogrammes, déteste PowerPoint corporate fleuve. Prend notes manuscrites structurées iPad (mindmapping couleurs). Expressions favorites: 'Quels sont les chiffres?', 'ROI mesurable comment?', 'Timeline réaliste?'. Body language: contact visuel direct, stylo en main, vérifie notifications discrètement si pas captivée.",
    
    decisionPower: "Décisionnaire opérationnel jusqu'à 30k€ (validation board 24h). Au-delà: co-décision CEO Clara Dubois (relation trust forte). Influence majeure roadmap produit marketing, budgets publicitaires, choix tools marketing stack. Veto technique sur outils analytics si standards qualité non respectés. Input stratégique pricing, lancement produits, expansion géographique.",
    
    priorities: [
      "Attribution marketing unifiée: résoudre fragmentation GA4/Meta/Google → vision customer journey 360° pour optimisation budgets 80k€/mois",
      "Réduction CAC de 47€ vers 35€: optimisation acquisition tous canaux via data granulaire, amélioration conversion, retention early stage",
      "Prédiction churn client ML: modèle prédictif 15-30j avant départ potentiel pour actions préventives (email, discount, support proactif)",
      "Automatisation reporting: éliminer 16h/semaine consolidation manuelle équipe → time-to-insight 24h max vs 7j actuels",
      "Optimisation budgets temps réel: allocation dynamique Meta/Google/Pinterest selon performance journalière vs allocation fixe mensuelle",
      "Segmentation clients avancée: passer de 3 segments actuels à 15+ micro-segments comportementaux pour hyperpersonnalisation",
      "Mobile optimization ROI: améliorer conversion mobile 1.6%→2.5% via data UX précise (65% trafic, 35% revenue = opportunité massive)"
    ],
    
    concerns: [
      "Temps implémentation critique: période lancement collection mars 2024 = zéro tolérance interruption data. Maximum 2 semaines transition sinon report 6 mois",
      "Formation équipe résistance: Jules (26 ans, technique) OK, Amélie (31 ans, moins tech) risque friction. Besoin accompagnement change management",
      "Intégration Shopify Plus: 8M€ CA en jeu, moindre bug checkout = catastrophe. Exige tests AB sandbox + rollback plan + monitoring temps réel",
      "Fiabilité prédictions IA: précédent échec outil prediction (40% faux positifs) → équipe sceptique. Besoin validation statistique rigoureuse + benchmarks",
      "Confidentialité données: RGPD strict mode éthique + compétition féroce = aucune donnée client externalisable. Serveurs européens mandatory",
      "Dépendance vendor: si plateforme tombe, ModaStyle aveugle 24h = perte 22k€ CA/jour. SLA 99.9% + backup solutions exigés",
      "Evolution tarifaire: startup → scale-up, volumes x3 prévus 2024-2026. Pricing scalable sans explosion coûts sinon budget insoutenable"
    ],
    
    motivations: [
      "Reconnaissance professionnelle: ambition VP Growth 2024 (équipe 15 personnes, stock-options), benchmark industrie mode éthique, speaker conférences marketing",
      "Performance financière: bonus 20% salaire indexé amélioration ROAS +10% + réduction CAC -15% + croissance revenue +40%",
      "Passion data pure: fascinée corrélations cachées, patterns comportementaux, prédictions ML. Kiff personnel résoudre puzzles analytics complexes",
      "Impact mission: aider Clara révolutionner industrie mode, prouver que éthique + performance = possible, legacy professionnelle positive",
      "Challenge technique: repousser limites e-commerce analytics, innover méthodes attribution, devenir référence expertise secteur"
    ],
    
    experience: "8 années expertise marketing digital analytics: CONVERTEO (3 ans, 2019-2022): Consultant Senior Analytics spécialisé e-commerce/retail. Clients: Fnac-Darty, Monoprix, Showroomprivé. Expertise: audit attribution, setup GA360/Adobe Analytics, transformation data-driven +50 missions. SPARTOO (2 ans, 2017-2019): Marketing Manager acquisition. Gestion budget 500k€/an, optimisation ROAS +65%, déploiement attribution cross-device, équipe 4 personnes. MODASTYLE (3 ans, 2022-present): Directrice Marketing & Analytics. Recrutée par Clara pour structurer analytics scale-up. Résultats: +300% revenue, setup stack marketing complet, équipe 3→6 personnes, autorité reconnue data."
  },
  product: {
    name: "DataTrack Pro",
    
    // Identité et positionnement de notre entreprise
    vendor: {
      companyName: "MarketingTech Solutions",
      founded: 2021,
      headquarters: "Paris La Défense, France",
      employees: 45,
      revenue: "8M€ ARR (2023)",
      mission: "Démocratiser l'attribution marketing IA pour les e-commerces européens 1M-50M€ CA",
      vision: "Devenir la référence attribution marketing Europe d'ici 2027",
      values: ["Excellence technique", "Transparence ROI", "Support client français", "Innovation responsable"],
      leadership: [
        "Marie Dubois - CEO (Ex-VP Analytics Criteo, Polytechnique)",
        "Thomas Chen - CTO (Ex-Principal Engineer Facebook, Stanford PhD)",
        "Sarah Martin - VP Sales (Ex-Director EMEA Mixpanel)"
      ],
      funding: "Série A 12M€ (2023) - Partech Partners lead, BPI France",
      certifications: ["ISO 27001", "SOC 2 Type II", "RGPD compliant", "Shopify Plus Partner"],
      awards: ["Best Analytics Startup 2023 (La French Tech)", "Innovation Award E-commerce Paris 2023"]
    },
    
    description: "Suite d'attribution marketing et analytics prédictive nouvelle génération, spécialement développée pour e-commerces européens 1M-50M€ CA. IA propriétaire entraînée sur 500M+ sessions e-commerce réelles. Architecture serverless ultra-scalable. Connecteurs natifs 200+ outils marketing sans développement. Setup no-code 24h vs 2-6 semaines concurrence. Conformité RGPD native. Support français expert e-commerce.",
    
    // Positionnement marketing détaillé
    marketingPositioning: {
      tagline: "L'attribution marketing enfin fiable pour l'e-commerce européen",
      targetMarket: "E-commerces 1M-50M€ CA, 10k-1M sessions/mois, multi-canal acquisition",
      valueProposition: "Révélez le vrai ROI de chaque canal marketing avec l'IA la plus précise d'Europe",
      differentiators: [
        "IA propriétaire 94% précision vs 78% GA4",
        "Setup 24h vs 2-6 semaines concurrence", 
        "Prix transparent par session vs licensing complexe",
        "Support français expert vs offshore",
        "RGPD native vs adaptations US"
      ],
      competitiveSet: ["Google Analytics 4", "Triple Whale", "Northbeam", "Mixpanel", "Amplitude"],
      winningMessages: [
        "Enfin savoir quel canal génère vraiment vos ventes",
        "L'attribution marketing sans les maux de tête techniques",
        "L'alternative européenne aux solutions US complexes"
      ]
    },
    
    pricing: {
      starter: "299€/mois HT (jusqu'à 100k sessions/mois, 5 canaux, attribution basique, support email)",
      professional: "599€/mois HT (jusqu'à 500k sessions/mois, canaux illimités, IA prédictive, support prioritaire)", 
      enterprise: "1200€/mois HT (sessions illimitées, white-label, API dédiée, CSM personnel, SLA 99.9%)",
      enterprise_plus: "Sur-mesure (multi-marques, données custom, intégrations spécifiques, consulting stratégique)",
      
      // Structure tarifaire détaillée
      pricingModel: "Usage-based transparent: prix par session trackée/mois vs revenue share opaque concurrence",
      setupFees: "0€ (inclus dans abonnement)",
      contractTerms: "12 mois minimum, paiement mensuel ou annuel (-15%)",
      overage: "0.002€/session supplémentaire au-delà du plan",
      migration: "Gratuite depuis GA4/Mixpanel (service blanc gant inclus)",
      cancelPolicy: "30j préavis, data export garanti 90j"
    },
    keyFeatures: [
      // Attribution Marketing Avancée
      "Attribution multi-touch propriétaire: modèles Shapley, Data-Driven, First-Click, Last-Click, Time-Decay avec weights personnalisables selon business model",
      "Customer Journey Mapping 360°: visualisation parcours complet prospect → client avec touchpoints cross-device, cross-canal temps réel",
      "Attribution incrementale: mesure lift réel chaque canal via tests géo-holdout automatisés, correlation analysis, media mix modeling",
      "View-through attribution: tracking impressions non-cliquées avec fenêtre attribution paramétrable 1-30j, impact mesurable brand awareness",
      
      // Intelligence Artificielle Prédictive  
      "Prédiction churn client ML: algorithme propriétaire 89% précision, alertes 15-30j avant départ probable avec scores confiance individuels",
      "LTV prédictive dynamique: calcul lifetime value par segment client temps réel avec facteurs comportementaux, saisonniers, produits",
      "Prédiction demande produits: forecasting ventes par SKU, optimisation stocks, détection tendances émergentes via NLP réseaux sociaux",
      "Anomaly detection automatique: alertes intelligentes baisse performance, pics trafic, fraude potentielle avec contextualisation business",
      
      // Optimisation Budgets & Campagnes
      "Optimisation budgets algorithmique: allocation automatique Meta/Google/Pinterest selon performance temps réel + contraintes business",
      "Bid optimization cross-canal: suggestions enchères optimales par keyword/audience/placement avec simulation ROI",
      "Creative performance analytics: scoring automatique visuels/copies avec recommandations A/B tests, trend analysis créatives",
      "Audience intelligence: enrichissement segments 1st party data + lookalikes algorithmes propriétaires vs plateformes",
      
      // Segmentation & Personnalisation
      "Segmentation comportementale ML: micro-segments automatiques RFM enrichi + navigation + engagement + préférences produits",
      "Customer 360 unifié: vue unique client toutes interactions online/offline, transactions, support, emails, réseaux sociaux",
      "Personnalisation temps réel: recommandations produits, contenus, offres adaptées profil visiteur avec learning continu",
      "Cohort analysis avancée: retention curves, revenue curves par acquisition source avec prédictions évolution",
      
      // Analytics & Reporting  
      "Dashboard temps réel 50+ KPIs: métriques business customisables avec drill-down granulaire, comparaisons périodes, benchmarks secteur",
      "Attribution reporting automatisé: rapports performance canal avec ROI, ROAS, CAC, LTV par segment/période/géographie",
      "Executive dashboard: synthèse C-level performance marketing, alertes business-critical, KPIs objectifs stratégiques",
      "Custom metrics builder: création métriques propriétaires formules personnalisées adaptées business model unique",
      
      // Intégrations & Technical
      "Connecteurs no-code 200+: intégration native Shopify, Klaviyo, Meta, Google, TikTok, Pinterest, Snapchat, Amazon, Criteo...",
      "API REST/GraphQL: accès data programmable pour intégrations custom, data warehouse, business intelligence externe",
      "Data export illimité: extractions data brute CSV/JSON, intégration BigQuery/Snowflake, ownership complète données",
      "Real-time sync: synchronisation données <30 secondes toutes sources, webhooks events business-critical"
    ],
    competitiveAdvantages: [
      // Excellence Technique & Innovation
      "IA propriétaire révolutionnaire: dataset unique 500M+ sessions e-commerce européennes, algorithmes attribution 94% précision vs 78% GA4, 89% Google Ads",
      "Setup no-code 24h: déploiement complet sans développement vs 2-6 semaines Northbeam/Triple Whale/Mixpanel, 0 interruption business",
      "Architecture cloud-native: scalabilité automatique, latence <100ms, uptime 99.99% SLA contractuel vs solutions legacy instables",
      "Innovation continue R&D: 40% budget R&D, 15 data scientists, releases bi-hebdomadaires vs concurrents stagnants",
      
      // Expertise Marché Européen
      "Spécialisation e-commerce européen: compliance RGPD native, serveurs EU, expertise réglementations locales vs solutions US adaptées",
      "Secteur mode/lifestyle: algorithmes entraînés spécifiquement saisonnalités mode, comportements shopping fashion, conversions mobile",
      "Support français excellence: équipe CSM experts e-commerce, response time <2h, formation incluse vs call centers offshore médiocres",
      "Références clients France: 200+ e-commerces français 1M-50M€, case studies sectoriels, network entraide clients",
      
      // Transparence & ROI
      "Pricing transparent équitable: modèle par session simple vs revenue share opaque/licensing complexe concurrents qui explosent avec croissance",
      "ROI prouvé mesurable: +312% ROI moyen première année clients similaires, metrics auditées cabinet externe vs promesses invérifiables",
      "Garantie satisfaction: 30j satisfait/remboursé + SLA performance contractuel vs concurrents sans garanties",
      "Migration gratuite white-glove: service migration données depuis GA4/Mixpanel inclus vs facturation services professionnels",
      
      // Avantages Compétitifs Spécifiques vs Leaders
      "vs Google Analytics 4: Attribution 30% plus précise, interface moderne, prédictif natif, 0 limitations sampling, support humain",
      "vs Triple Whale: 60% moins cher, attribution plus sophistiquée, IA prédictive avancée, intégrations natives 3x plus nombreuses",
      "vs Northbeam: 70% moins cher, setup 10x plus rapide, support français, conformité RGPD native, algorithmes plus performants",
      "vs Mixpanel: Spécialisation e-commerce vs généraliste, attribution marketing native, pricing équitable, support métier expert"
    ],
    roi: "Clients moyens : +47% ROAS, -23% CAC, +12% LTV en 6 mois. Retour investissement 312% première année.",
    implementationTime: "24h setup + 1 semaine calibrage IA + formation équipe"
  },
  // Objectifs pédagogiques selon type d'appel
  objectives: [
    // Cold Call - Phase Découverte & Qualification
    "DÉCOUVRIR les frustrations analytics actuelles: identifier douleurs précises Sophie (reporting manuel, attribution fragmentée, décisions retardées)",
    "QUALIFIER budget/timeline: confirmer urgence Q1 2024, budget 15-25k€ disponible, pouvoir décision Sophie jusqu'à 30k€",
    "DIAGNOSTIQUER architecture analytics: mapper outils actuels (GA4/Meta/Google/Klaviyo/Excel), identifier gaps critiques ROI tracking",
    "CRÉER urgence business: quantifier coût inaction (budgets 80k€/mois mal optimisés, opportunités manquées croissance 45%)",
    "SÉCURISER rendez-vous découverte: obtenir 45min agenda Sophie + accès datasets ModaStyle pour audit gratuit personnalisé",
    
    // RDV Découverte - Analyse Besoins & Démonstration Valeur  
    "AUDITER performance marketing actuelle: révéler attribution errors, budget waste, churn signals non-détectés via analyse data réelle",
    "DÉMONTRER ROI potentiel chiffré: calculer gains attribution précise (15-25% budget optimization), churn prédiction (retention +30%)",
    "PROUVER différenciation technique: comparaison live GA4 vs DataTrack Pro sur données ModaStyle, showcase IA attribution avancée",
    "RASSURER sur implémentation: présenter roadmap 24h setup, formation incluse, migration garantie sans perte data historique",
    "VALIDER fit solution/besoins: confirmer adéquation fonctionnalités priorités Sophie, addressing concerns techniques spécifiques",
    
    // RDV Démonstration - Proof of Concept & Closing  
    "PRÉSENTER POC personnalisé: démonstration live sur vraies données ModaStyle, simulations optimisation budgets, prédictions churn",
    "QUANTIFIER business case précis: ROI 312% première année, réduction CAC 47€→35€, optimisation ROAS +40%, gains temps 16h/semaine",
    "GÉRER objections techniques: réponses préparées intégration Shopify, formation équipe, fiabilité prédictions, sécurité données",
    "NÉGOCIER accord pilote: proposer test 3 mois Professional plan avec garantie performance, migration data incluse, formation équipe",
    "FERMER signature contrat: présenter contrat 12 mois avec ROI garanti, escalade CEO Clara si nécessaire validation >30k€"
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
  ],

  // Stratégie commerciale intégrée
  salesStrategy: {
    approach: {
      title: 'Audit attribution marketing expert',
      description: 'Analyse complète fragmentation data et optimisation budgets publicitaires'
    },
    evidence: {
      title: 'Clients e-commerce similaires',
      description: 'TheKooples, Sézane, Maisons du Monde : +35% ROAS, -28% CAC'
    },
    pilot: {
      title: 'Pilote attribution 90 jours',
      description: 'Test sur 30% budget publicitaire avec garantie performance'
    },
    sequence: [
      'Audit attribution 360° : analyse stack actuel (GA4/Meta/Google/Klaviyo)',
      'Mapping customer journey : identification touchpoints non trackés',
      'Benchmark e-commerce mode : performance attribution vs 15 concurrents',
      'Démonstration live : dashboard attribution temps réel sur vos campagnes',
      'Business case personnalisé : ROI optimisation sur budget 80k€/mois',
      'Pilote 90 jours : tracking multi-touch attribution sur segments tests',
      'Mesure impact : gain ROAS et économies budget publicitaire',
      'Scaling plan : déploiement attribution complète + formation équipe'
    ],
    leveragePoints: [
      'Urgence Q1 2024 : lancement collection printemps = 40% CA annuel',
      'Budget gaspillé : 25-35% du budget publicitaire mal attribué',
      'Concurrence aggressive : autres marques mode optimisent déjà attribution',
      'Pression croissance : objectif 12M€ CA vs 8M€ actuel nécessite ROAS optimisé',
      'ROI immédiat : gains visibles dès 30 jours, payback 4-6 mois'
    ]
  },

  // Données marché intégrées
  marketData: {
    marketOverview: {
      marketSize: "4.8B€ Marketing Attribution France, 21B$ mondial",
      growthRate: "+28% CAGR France, +31% mondial",
      budgetRange: "15K-40K€/an PME, jusqu'à 200K€ enterprise",
      expectedROI: "35% gain ROAS moyenne, 28% réduction CAC",
      timeline: "Urgence Q1 2024 pour campagnes printemps",
      keyPlayers: ["Triple Whale", "Northbeam", "Mixpanel", "Segment", "Google Analytics"],
      marketPenetration: "23% e-commerce équipés attribution avancée",
      budgetWaste: "30-35% budget publicitaire mal attribué",
      roas: "ROAS moyen 3.5x vs 4.8x avec attribution optimisée"
    }
  },

  // Objectifs spécifiques intégrés
  specificObjectives: {
    coldCall: {
      primary: "Décrocher audit attribution 45min avec Sophie Martin sous 15 jours",
      secondary: "Cartographier ecosystem marketing ModaStyle + identifier pain points attribution",
      successMetrics: "RDV confirmé + access pain points + budget range validé"
    },
    rdv: {
      primary: "Convaincre lancer pilote attribution 90 jours sur 30% budget (25k€)",
      secondary: "Obtenir buy-in CEO Clara + mapping décision process + timeline validation",
      successMetrics: "Pilote validé + budget alloué + timeline signée + sponsorship exec"
    }
  },

  // Objections détaillées intégrées
  detailedObjections: [
    {
      category: "Budget",
      objection: "25k€ c'est trop cher pour un outil analytics, on a déjà Google Analytics gratuit",
      frequency: "Très fréquente" as const,
      responses: [
        "Votre budget publicitaire est de 80k€/mois. Si DataTrack vous fait économiser ne serait-ce que 10% grâce à une meilleure attribution, cela représente 8k€/mois soit 96k€/an d'économies",
        "Google Analytics vous coûte en réalité 16h/semaine de temps équipe soit 35k€/an en coût caché",
        "TheKooples a économisé 180k€ la première année avec notre solution"
      ],
      evidence: "ROI client TheKooples : -28% CAC, +35% ROAS = 180k€ économies an 1",
      nextStep: "Audit gratuit pour quantifier votre potentiel d'économies exact"
    },
    {
      category: "Timing",
      objection: "On n'a pas le temps de changer d'outil maintenant, on lance la collection printemps",
      frequency: "Très fréquente" as const,
      responses: [
        "C'est exactement pour ça qu'il faut agir maintenant. Cette collection représente 40% de votre CA annuel, vous ne pouvez pas vous permettre une attribution approximative",
        "Notre setup prend 24h vs 6 semaines pour la concurrence. On peut être opérationnels avant votre campagne de lancement",
        "Sézane a déployé DataTrack 3 semaines avant leur collection été : +42% performance campagne vs N-1"
      ],
      evidence: "Case study Sézane : déploiement 3 semaines avant collection = +42% performance",
      nextStep: "Planning détaillé déploiement 3 semaines compatible avec votre calendrier"
    },
    {
      category: "Technique",
      objection: "Notre setup Shopify/GA4 est complexe, on a peur de casser quelque chose",
      frequency: "Fréquente" as const,
      responses: [
        "Notre connecteur Shopify Plus est certifié et utilisé par 200+ e-commerces sans incident",
        "Le déploiement se fait en parallèle de votre setup actuel, sans interruption",
        "On propose un rollback automatique si problème détecté"
      ],
      evidence: "200+ déploiements Shopify sans incident, certification Shopify Plus Partner",
      nextStep: "Demo technique avec votre CTO Thomas pour valider l'intégration"
    },
    {
      category: "Équipe",
      objection: "Mon équipe n'aura pas le temps d'apprendre un nouvel outil",
      frequency: "Fréquente" as const,
      responses: [
        "L'interface est intuitive, nos clients e-commerce sont opérationnels en 2h de formation",
        "On inclut 8h de formation personnalisée + 3 mois de support priority",
        "Amélie chez Sézane : 'Plus simple que GA4, enfin des insights actionnables'"
      ],
      evidence: "Testimonial Sézane : 'Formation 2h, équipe autonome J+1'",
      nextStep: "Session découverte interface 30min avec Jules et Amélie"
    },
    {
      category: "Concurrence",
      objection: "On regarde aussi Triple Whale / Northbeam, ils sont moins chers",
      frequency: "Occasionnelle" as const,
      responses: [
        "Triple Whale : setup 6 semaines, support offshore, pricing US non transparent. Nous : 24h setup, support français, prix fixe",
        "Northbeam cible les gros US retailers, interface complexe. Nous sommes spécialisés e-commerce français 1-50M€",
        "Notre IA est entraînée sur 500M sessions e-commerce européennes vs data US généraliste"
      ],
      evidence: "Benchmark : nous 94% précision vs 82% Triple Whale selon étude Ecommerce Mag",
      nextStep: "Tableau comparatif détaillé + pilot head-to-head sur vos données"
    }
  ]
};