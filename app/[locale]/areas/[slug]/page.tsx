import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import neighborhoods from '@/content/data/neighborhoods.json';
import {siteConfig, getCanonical} from '@/lib/seo';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CTAButton} from '@/components/ui/CTAButton';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';
type Params = Promise<{locale: string; slug: string}>;

type FAQItem = {
  question: string;
  answer: string;
};

type AreaContent = {
  name: string;
  hubLabel?: string;
  description: string;
  intro: string;
  supportTitle: string;
  supportPoints: string[];
  whyTitle: string;
  whyBody: string;
  serviceFocusTitle: string;
  serviceFocusBody: string;
  coverageTitle: string;
  coverageBody: string;
  localHighlightsTitle: string;
  localHighlights: string[];
  ctaTitle: string;
  ctaBody: string;
  faqs: FAQItem[];
};

const hubs = {
  'west-island': {en: 'West Island', fr: 'Ouest-de-l’Île'},
  'rive-sud': {en: 'South Shore', fr: 'Rive-Sud'},
  laval: {en: 'Laval', fr: 'Laval'},
  'downtown-montreal': {en: 'Montreal', fr: 'Montréal'}
} as const;

const areaFaqs = {
  en: (name: string) => [
    {
      question: `Do you offer home cleaning in ${name}?`,
      answer: `Yes. Sparkling Stays supports residential cleaning in ${name}, including recurring cleaning, one-time visits, deep cleaning, and move-related service depending on the scope of the job.`
    },
    {
      question: `Do you serve commercial clients in ${name}?`,
      answer: `Yes. We also support offices and other commercial spaces in ${name} when the schedule, scope, and location are a fit.`
    },
    {
      question: `Can I request service in English or French in ${name}?`,
      answer: `Yes. Sparkling Stays provides bilingual support in English and French for quotes, booking conversations, and service coordination.`
    },
    {
      question: `How do I get a quote for cleaning in ${name}?`,
      answer: `The fastest path is to contact Sparkling Stays with your property type, approximate size, location, and whether you need recurring, one-time, or specialty cleaning.`
    }
  ],
  fr: (name: string) => [
    {
      question: `Offrez-vous un service d’entretien ménager à ${name}?`,
      answer: `Oui. Sparkling Stays offre du nettoyage résidentiel à ${name}, y compris l’entretien récurrent, les visites ponctuelles, le grand ménage et les ménages liés à un déménagement selon la portée du travail.`
    },
    {
      question: `Desserviez-vous aussi les clients commerciaux à ${name}?`,
      answer: `Oui. Nous accompagnons aussi les bureaux et autres espaces commerciaux à ${name} lorsque l’horaire, la portée du service et l’emplacement conviennent.`
    },
    {
      question: `Puis-je obtenir le service en français ou en anglais à ${name}?`,
      answer: `Oui. Sparkling Stays offre un accompagnement bilingue en français et en anglais pour les devis, les réservations et la coordination.`
    },
    {
      question: `Comment obtenir un devis pour un nettoyage à ${name}?`,
      answer: `Le plus simple est de contacter Sparkling Stays avec le type de propriété, la taille approximative, le secteur et le type de service souhaité : récurrent, ponctuel ou spécialisé.`
    }
  ]
};

const lavalOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Laval, with stronger support for recurring home cleaning, deep cleans, office upkeep, and turnover-style requests across major Laval sectors.',
    intro:
      'Laval is one of Sparkling Stays’ highest-priority expansion areas because it combines busy family households, condo living, small-business demand, and clients who want a reliable cleaning partner closer to home. This page gives Laval visitors a more specific local overview than the generic area template, while keeping the same quote and booking flow used across the site.',
    supportTitle: 'Cleaning services we position most strongly in Laval',
    supportPoints: [
      'Recurring house cleaning for family homes, condos, and townhouses',
      'Deep cleaning before hosting, after busy periods, or as a seasonal reset',
      'Office and small commercial cleaning for professional spaces in Laval',
      'Move-related, Airbnb-style turnover, window cleaning, and custom requests when the scope is a fit'
    ],
    whyTitle: 'Why Laval deserves a stronger local page',
    whyBody:
      'Many Laval clients are comparing providers that say they serve Greater Montreal without clearly explaining how service works outside the island. This Laval page gives clearer local framing, confirms bilingual support, and makes it easier for households and businesses to ask for the right service without guessing whether their area is actively covered.',
    serviceFocusTitle: 'How Sparkling Stays approaches Laval service requests',
    serviceFocusBody:
      'Our Laval positioning is built around practical, dependable cleaning support: recurring upkeep for busy homes, one-time resets when a property needs extra attention, and flexible commercial help for offices or client-facing spaces. When a request comes in, we use the property type, service scope, schedule, and exact Laval location to guide the quote path instead of forcing a one-size-fits-all package.',
    coverageTitle: 'Coverage framing for Laval clients',
    coverageBody:
      'We use Laval as a dedicated service-area route rather than treating it like a vague add-on to Montreal. That matters for clients in neighbourhoods such as Chomedey, Sainte-Dorothée, Laval-des-Rapides, Duvernay, Fabreville, Vimont, Auteuil, and Saint-Vincent-de-Paul who want to know that their request is being evaluated with local routing in mind.',
    localHighlightsTitle: 'What this Laval page helps communicate',
    localHighlights: [
      'Sparkling Stays actively positions Laval as its own priority local market',
      'Residential and commercial cleaning requests can both start from this route',
      'Bilingual quote support makes coordination easier for English- and French-speaking clients',
      'The page supports stronger local SEO without breaking the reusable area architecture'
    ],
    ctaTitle: 'Need cleaning services in Laval?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have, where in Laval you are located, and whether you need recurring, one-time, or commercial support. We will guide you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you clean homes and condos across Laval?',
        answer:
          'Yes. Sparkling Stays supports homes, condos, apartments, and townhouses in Laval, especially for recurring cleaning, deep cleaning, and one-time reset visits.'
      },
      {
        question: 'Which parts of Laval do you usually mention when discussing coverage?',
        answer:
          'We frame Laval coverage broadly and often reference areas such as Chomedey, Sainte-Dorothée, Laval-des-Rapides, Duvernay, Fabreville, Vimont, Auteuil, and Saint-Vincent-de-Paul to make local coverage clearer.'
      },
      {
        question: 'Can businesses in Laval request office or commercial cleaning?',
        answer:
          'Yes. Offices and other commercial spaces in Laval can request service when the schedule, property type, and cleaning scope are a good fit for Sparkling Stays.'
      },
      {
        question: 'What should I include when requesting a Laval cleaning quote?',
        answer:
          'Include your Laval sector, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep cleaning, or commercial service so we can route your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Laval, avec un positionnement plus fort pour l’entretien ménager récurrent, les grands ménages, l’entretien de bureaux et les demandes de turnover dans plusieurs secteurs de Laval.',
    intro:
      'Laval est l’un des secteurs d’expansion les plus prioritaires pour Sparkling Stays, car on y retrouve à la fois des familles occupées, des condos, de petites entreprises et des clients qui veulent un partenaire de confiance près de chez eux. Cette page donne donc un aperçu local plus précis que le gabarit générique, tout en conservant le même parcours de devis et de réservation que le reste du site.',
    supportTitle: 'Services que nous mettons le plus de l’avant à Laval',
    supportPoints: [
      'Entretien ménager récurrent pour maisons familiales, condos et maisons de ville',
      'Grand ménage avant de recevoir, après une période chargée ou pour une remise à neuf saisonnière',
      'Nettoyage de bureaux et de petits espaces commerciaux à Laval',
      'Ménages liés aux déménagements, turnovers de type Airbnb, nettoyage de fenêtres et demandes sur mesure lorsque la portée convient'
    ],
    whyTitle: 'Pourquoi Laval mérite une page locale plus solide',
    whyBody:
      'Beaucoup de clients à Laval comparent des entreprises qui disent desservir le Grand Montréal sans expliquer clairement comment le service fonctionne hors de l’île. Cette page Laval donne un cadrage local plus net, confirme l’accompagnement bilingue et aide les foyers comme les entreprises à demander le bon service sans se demander si leur secteur est réellement couvert.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Laval',
    serviceFocusBody:
      'Notre positionnement à Laval repose sur un service pratique et fiable : entretien récurrent pour les foyers occupés, ménages ponctuels lorsque la propriété a besoin d’une remise à niveau, et soutien commercial flexible pour les bureaux ou espaces recevant des clients. Lorsqu’une demande arrive, nous utilisons le type de propriété, la portée, l’horaire et le secteur exact à Laval pour orienter le devis au lieu d’imposer une formule unique.',
    coverageTitle: 'Comment nous présentons la couverture à Laval',
    coverageBody:
      'Nous traitons Laval comme un secteur de service dédié plutôt que comme une simple extension floue de Montréal. C’est important pour les clients de secteurs comme Chomedey, Sainte-Dorothée, Laval-des-Rapides, Duvernay, Fabreville, Vimont, Auteuil et Saint-Vincent-de-Paul qui veulent savoir que leur demande est évaluée avec une vraie logique locale.',
    localHighlightsTitle: 'Ce que cette page Laval permet de mieux communiquer',
    localHighlights: [
      'Sparkling Stays présente Laval comme un marché local prioritaire à part entière',
      'Les demandes résidentielles et commerciales peuvent toutes deux démarrer depuis cette page',
      'Le soutien bilingue simplifie la coordination pour les clients francophones et anglophones',
      'La page renforce le SEO local sans casser l’architecture réutilisable des autres secteurs'
    ],
    ctaTitle: 'Besoin d’un service de nettoyage à Laval?',
    ctaBody:
      'Expliquez à Sparkling Stays votre type de propriété, votre secteur à Laval et si vous avez besoin d’un service récurrent, ponctuel ou commercial. Nous vous orienterons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Nettoyez-vous les maisons et condos partout à Laval?',
        answer:
          'Oui. Sparkling Stays accompagne les maisons, condos, appartements et maisons de ville à Laval, surtout pour l’entretien récurrent, le grand ménage et les visites ponctuelles de remise à niveau.'
      },
      {
        question: 'Quels secteurs de Laval mentionnez-vous le plus souvent pour la couverture?',
        answer:
          'Nous présentons la couverture à Laval de façon large et faisons souvent référence à des secteurs comme Chomedey, Sainte-Dorothée, Laval-des-Rapides, Duvernay, Fabreville, Vimont, Auteuil et Saint-Vincent-de-Paul pour rendre la desserte plus concrète.'
      },
      {
        question: 'Les entreprises à Laval peuvent-elles demander un nettoyage commercial ou de bureau?',
        answer:
          'Oui. Les bureaux et autres espaces commerciaux à Laval peuvent demander un service lorsque l’horaire, le type de propriété et la portée du nettoyage correspondent bien à Sparkling Stays.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Laval?',
        answer:
          'Indiquez votre secteur à Laval, le type de propriété, la taille approximative, l’horaire souhaité et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage ou d’un service commercial afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const brossardOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Brossard, with stronger local positioning for family homes, condo towers, office spaces, and South Shore clients who want dependable bilingual support close to Quartier DIX30 and the REM corridor.',
    intro:
      'Brossard is the next highest-priority local page after Laval because it combines dense condo living, established family neighbourhoods, fast-growing commercial pockets, and strong South Shore search demand. Instead of leaving Brossard on the generic template, this version gives the route clearer local relevance while preserving the same reusable architecture, metadata pattern, and conversion flow used across the site.',
    supportTitle: 'Cleaning services we emphasize most in Brossard',
    supportPoints: [
      'Recurring house cleaning for single-family homes, condos, and townhomes across Brossard',
      'Deep cleaning for busy households, seasonal resets, and move-related transitions',
      'Office and commercial cleaning for professional spaces near Quartier DIX30 and local business zones',
      'Turnover-style, post-event, window-cleaning, and custom quote requests when the scope is a fit'
    ],
    whyTitle: 'Why Brossard needs its own stronger local page',
    whyBody:
      'Brossard clients often want more than a generic “South Shore” mention. They want to know whether a cleaning company understands the mix of condos, suburban homes, shopping-district traffic, and bilingual day-to-day coordination that defines the city. This page answers that need directly, giving Brossard searchers a more credible local landing page without breaking the site-wide template system.',
    serviceFocusTitle: 'How Sparkling Stays frames Brossard cleaning requests',
    serviceFocusBody:
      'Our Brossard positioning focuses on practical coverage for the city’s main property types: recurring support for occupied homes, detailed cleaning for condos and apartment units, and flexible commercial help for offices and client-facing spaces. We use the exact location in Brossard, property type, schedule, and cleaning scope to guide each quote request instead of treating every South Shore lead the same way.',
    coverageTitle: 'Coverage framing for Brossard clients',
    coverageBody:
      'We present Brossard as a meaningful service-area destination within the South Shore, not just a pass-through market. That matters for clients near Quartier DIX30, the REM stations, Sections A through R, and adjacent corridors who want confirmation that residential and commercial requests in Brossard are being evaluated with local routing in mind.',
    localHighlightsTitle: 'What this Brossard page now communicates',
    localHighlights: [
      'Brossard is positioned as a priority South Shore market, not just a generic surrounding area',
      'The page speaks to both residential demand and office/commercial demand in one route',
      'Bilingual service coordination is highlighted for local quote and scheduling conversations',
      'The stronger local messaging improves SEO value while keeping the reusable area-page architecture intact'
    ],
    ctaTitle: 'Need cleaning services in Brossard?',
    ctaBody:
      'Tell Sparkling Stays where you are in Brossard, what type of property you have, and whether you need recurring, one-time, deep-cleaning, or commercial support. We will point you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you clean condos, apartments, and homes in Brossard?',
        answer:
          'Yes. Sparkling Stays supports houses, condos, apartments, and townhomes in Brossard, especially for recurring home cleaning, deep-cleaning visits, and one-time reset requests.'
      },
      {
        question: 'Do you position Brossard separately from the rest of the South Shore?',
        answer:
          'Yes. Brossard has enough residential density, condo inventory, and commercial activity to justify its own stronger local page rather than being treated as a generic South Shore mention.'
      },
      {
        question: 'Can offices and commercial spaces in Brossard request cleaning service?',
        answer:
          'Yes. Offices and other commercial spaces in Brossard can request cleaning when the property type, cleaning scope, and schedule are a good fit for Sparkling Stays.'
      },
      {
        question: 'What should I include when requesting a cleaning quote in Brossard?',
        answer:
          'Include your Brossard sector or nearby landmark, property type, approximate size, preferred timing, and whether you need recurring, one-time, deep-cleaning, or commercial service so we can route the request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Brossard, avec un positionnement local plus fort pour les maisons familiales, les tours de condos, les espaces de bureau et les clients de la Rive-Sud qui veulent un accompagnement bilingue fiable près du Quartier DIX30 et du corridor du REM.',
    intro:
      'Brossard est la prochaine page locale la plus prioritaire après Laval, car la ville combine une forte densité de condos, des quartiers familiaux bien établis, des pôles commerciaux en croissance et une demande de recherche solide sur la Rive-Sud. Au lieu de laisser Brossard sur le gabarit générique, cette version donne à la route une pertinence locale plus nette tout en conservant la même architecture réutilisable, le même pattern de métadonnées et le même parcours de conversion que le reste du site.',
    supportTitle: 'Services que nous mettons le plus de l’avant à Brossard',
    supportPoints: [
      'Entretien ménager récurrent pour maisons unifamiliales, condos et maisons de ville partout à Brossard',
      'Grand ménage pour foyers occupés, remises à neuf saisonnières et transitions liées aux déménagements',
      'Nettoyage de bureaux et d’espaces commerciaux près du Quartier DIX30 et des zones d’affaires locales',
      'Demandes de type turnover, après événement, nettoyage de fenêtres et devis sur mesure lorsque la portée convient'
    ],
    whyTitle: 'Pourquoi Brossard mérite une page locale plus solide',
    whyBody:
      'Les clients de Brossard veulent souvent plus qu’une simple mention générique de la “Rive-Sud”. Ils veulent savoir si l’entreprise comprend le mélange de condos, de maisons suburbaines, de circulation autour des zones commerciales et de coordination bilingue au quotidien qui caractérise la ville. Cette page répond à ce besoin de façon directe et donne aux visiteurs de Brossard une page d’atterrissage plus crédible sans casser le système de gabarit du site.',
    serviceFocusTitle: 'Comment Sparkling Stays présente les demandes de nettoyage à Brossard',
    serviceFocusBody:
      'Notre positionnement à Brossard met l’accent sur une couverture pratique pour les principaux types de propriétés de la ville : soutien récurrent pour les maisons occupées, nettoyage détaillé pour les condos et appartements, et aide commerciale flexible pour les bureaux et espaces recevant des clients. Nous utilisons le secteur exact à Brossard, le type de propriété, l’horaire et la portée du nettoyage pour orienter chaque demande de devis au lieu de traiter tous les leads de la Rive-Sud de la même manière.',
    coverageTitle: 'Comment nous cadrons la couverture à Brossard',
    coverageBody:
      'Nous présentons Brossard comme un secteur de service important sur la Rive-Sud, et non comme un simple marché de passage. C’est pertinent pour les clients près du Quartier DIX30, des stations du REM, des secteurs A à R et des corridors voisins qui veulent confirmer que les demandes résidentielles et commerciales à Brossard sont évaluées avec une logique locale.',
    localHighlightsTitle: 'Ce que cette page Brossard communique maintenant',
    localHighlights: [
      'Brossard est présenté comme un marché prioritaire de la Rive-Sud, pas seulement comme un secteur générique autour de Montréal',
      'La page parle à la fois de la demande résidentielle et de la demande de bureaux/commerciale',
      'Le service bilingue est mis de l’avant pour les échanges de devis et de planification',
      'Le message local plus fort améliore la valeur SEO tout en conservant l’architecture réutilisable des pages de secteurs'
    ],
    ctaTitle: 'Besoin d’un service de nettoyage à Brossard?',
    ctaBody:
      'Dites à Sparkling Stays où vous êtes à Brossard, quel type de propriété vous avez et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage ou d’un soutien commercial. Nous vous orienterons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Nettoyez-vous les condos, appartements et maisons à Brossard?',
        answer:
          'Oui. Sparkling Stays accompagne les maisons, condos, appartements et maisons de ville à Brossard, surtout pour l’entretien ménager récurrent, les grands ménages et les demandes ponctuelles de remise à niveau.'
      },
      {
        question: 'Positionnez-vous Brossard séparément du reste de la Rive-Sud?',
        answer:
          'Oui. Brossard a assez de densité résidentielle, d’inventaire de condos et d’activité commerciale pour mériter une page locale plus forte au lieu d’être traitée comme une simple mention générique de la Rive-Sud.'
      },
      {
        question: 'Les bureaux et espaces commerciaux à Brossard peuvent-ils demander un service?',
        answer:
          'Oui. Les bureaux et autres espaces commerciaux à Brossard peuvent demander un service lorsque le type de propriété, la portée du nettoyage et l’horaire correspondent bien à Sparkling Stays.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis de nettoyage à Brossard?',
        answer:
          'Indiquez votre secteur à Brossard ou un repère proche, le type de propriété, la taille approximative, le moment souhaité et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage ou d’un service commercial afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const longueuilOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Longueuil, with stronger local positioning for South Shore households, family homes, condos, and workplace cleaning requests that need a clearer neighborhood-level route.',
    intro:
      'Longueuil is one of the strongest remaining South Shore targets in the neighborhood rollout and gives Sparkling Stays another high-intent local page beyond Brossard. This richer page helps Longueuil visitors understand that Sparkling Stays is not treating the South Shore as an afterthought, but as an active service zone for homes, offices, and specialty cleaning needs.',
    supportTitle: 'Most common cleaning needs in Longueuil',
    supportPoints: [
      'Recurring home cleaning for apartments, condos, and family properties',
      'Deep cleaning and one-time reset visits for homes that need stronger catch-up support',
      'Commercial cleaning for offices and client-facing spaces in Longueuil',
      'Specialty requests such as move-related cleaning, Airbnb-style turnover support, window cleaning, and post-renovation cleanup'
    ],
    whyTitle: 'Why Longueuil matters in the neighborhood rollout',
    whyBody:
      'Longueuil has high search demand and plays an important role in Sparkling Stays’ South Shore coverage strategy. A stronger local page helps the business show that it understands the area as its own market, not just a spillover mention from Montreal. That improves clarity for local quote requests and strengthens the broader local SEO structure at the same time.',
    serviceFocusTitle: 'How Sparkling Stays handles Longueuil requests',
    serviceFocusBody:
      'Longueuil requests are routed using the same practical model as the rest of the site: property type, approximate size, cleaning frequency, and scope determine the best next step. That may mean recurring residential support, a one-time reset, a deep-clean path, commercial cleaning, or a specialty quote depending on what the client actually needs.',
    coverageTitle: 'Coverage framing for Longueuil clients',
    coverageBody:
      'We position Longueuil as a real local service page so clients do not have to guess whether South Shore coverage is active. This is especially useful for households and businesses that want a provider already thinking in local routing terms rather than treating the area like a secondary edge case.',
    localHighlightsTitle: 'What this Longueuil page helps communicate',
    localHighlights: [
      'Longueuil is treated as a priority South Shore market for Sparkling Stays',
      'Residential and commercial cleaning requests can both begin from this page',
      'The page improves local service clarity before quote or booking requests',
      'It strengthens the South Shore cluster while preserving the reusable area-page architecture'
    ],
    ctaTitle: 'Need cleaning services in Longueuil?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have in Longueuil, what kind of cleaning support you need, and whether the request is recurring, one-time, commercial, or specialty. We will point you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Longueuil?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Longueuil for condos, apartments, and family homes, along with one-time and deeper cleaning requests when more detail is needed.'
      },
      {
        question: 'Can offices and businesses in Longueuil request commercial cleaning?',
        answer:
          'Yes. Offices and other business spaces in Longueuil can request commercial cleaning support when the scope, property type, and schedule fit Sparkling Stays service capacity.'
      },
      {
        question: 'Why does Longueuil have its own local page?',
        answer:
          'Longueuil has strong local search demand and is one of the most important South Shore areas in the current rollout, so it deserves clearer service framing than a generic regional mention.'
      },
      {
        question: 'What should I include in a Longueuil quote request?',
        answer:
          'Include your area in Longueuil, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, commercial, or specialty cleaning so we can guide your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Longueuil, avec un positionnement local plus fort pour les foyers de la Rive-Sud, les maisons familiales, les condos et les demandes d’entretien de lieux de travail qui ont besoin d’un parcours local plus clair.',
    intro:
      'Longueuil est l’un des marchés restants les plus solides dans le déploiement des quartiers et donne à Sparkling Stays une autre page locale à forte intention sur la Rive-Sud après Brossard. Cette version enrichie aide les visiteurs de Longueuil à comprendre que la Rive-Sud est traitée comme une vraie zone de service pour les foyers, les bureaux et les demandes spécialisées.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Longueuil',
    supportPoints: [
      'Entretien ménager récurrent pour appartements, condos et maisons familiales',
      'Grand ménage et remises à niveau ponctuelles pour les espaces qui demandent plus de rattrapage',
      'Nettoyage commercial pour bureaux et espaces recevant des clients à Longueuil',
      'Demandes spécialisées comme ménage lié à un déménagement, turnover de type Airbnb, nettoyage de fenêtres et nettoyage après rénovation'
    ],
    whyTitle: 'Pourquoi Longueuil compte dans le déploiement des quartiers',
    whyBody:
      'Longueuil a une forte demande de recherche et joue un rôle important dans la stratégie de couverture de Sparkling Stays sur la Rive-Sud. Une page locale plus forte aide l’entreprise à montrer qu’elle comprend le secteur comme un marché à part entière, pas seulement comme une mention secondaire liée à Montréal. Cela améliore la clarté des demandes de devis tout en renforçant la structure SEO locale globale.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Longueuil',
    serviceFocusBody:
      'Les demandes provenant de Longueuil suivent la même logique pratique que le reste du site : le type de propriété, la taille approximative, la fréquence et la portée du nettoyage déterminent ensuite la meilleure prochaine étape. Cela peut mener vers un service résidentiel récurrent, un ménage ponctuel, un grand ménage, un nettoyage commercial ou un devis spécialisé selon le besoin réel du client.',
    coverageTitle: 'Comment nous présentons la couverture à Longueuil',
    coverageBody:
      'Nous traitons Longueuil comme une vraie page locale de service afin que les clients n’aient pas à deviner si la couverture de la Rive-Sud est réellement active. C’est particulièrement utile pour les foyers et entreprises qui veulent un fournisseur déjà structuré autour d’une logique locale claire.',
    localHighlightsTitle: 'Ce que cette page Longueuil permet de mieux communiquer',
    localHighlights: [
      'Longueuil est traité comme un marché prioritaire sur la Rive-Sud',
      'Les demandes résidentielles et commerciales peuvent toutes deux commencer ici',
      'La page clarifie mieux le service local avant la demande de devis ou la réservation',
      'Elle renforce le cluster de la Rive-Sud tout en gardant l’architecture réutilisable des pages de secteur'
    ],
    ctaTitle: 'Besoin d’un service de nettoyage à Longueuil?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Longueuil, le type de nettoyage souhaité et si la demande est récurrente, ponctuelle, commerciale ou spécialisée. Nous vous dirigerons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Longueuil?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Longueuil pour condos, appartements et maisons familiales, ainsi que des demandes ponctuelles ou plus approfondies lorsque le lieu demande plus de détail.'
      },
      {
        question: 'Les bureaux et entreprises à Longueuil peuvent-ils demander un nettoyage commercial?',
        answer:
          'Oui. Les bureaux et autres espaces professionnels à Longueuil peuvent demander un service commercial lorsque la portée, le type de lieu et l’horaire conviennent à Sparkling Stays.'
      },
      {
        question: 'Pourquoi Longueuil a-t-il sa propre page locale?',
        answer:
          'Longueuil a une forte demande locale et fait partie des secteurs les plus importants sur la Rive-Sud dans le déploiement actuel. Il mérite donc un cadrage plus précis qu’une simple mention régionale.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Longueuil?',
        answer:
          'Indiquez votre secteur à Longueuil, le type de propriété, la taille approximative, l’horaire souhaité et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage, commercial ou spécialisé afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const pointeClaireOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Pointe-Claire, with stronger West Island positioning for family homes, condos, offices, and specialty cleaning requests that need a more local entry point.',
    intro:
      'Pointe-Claire is the strongest remaining West Island neighborhood in the current rollout and gives Sparkling Stays an important foothold beyond the South Shore cluster. This richer page helps Pointe-Claire visitors see that West Island service is being treated as an active local market for homes, offices, and specialty cleaning needs rather than a generic overflow from central Montreal.',
    supportTitle: 'Most common cleaning needs in Pointe-Claire',
    supportPoints: [
      'Recurring home cleaning for condos, apartments, townhomes, and family houses',
      'Deep cleaning and one-time reset visits for homes that need stronger catch-up support',
      'Commercial cleaning for offices, clinics, and client-facing businesses in the West Island',
      'Specialty requests such as move-related cleaning, Airbnb-style turnovers, window cleaning, and post-renovation cleanup'
    ],
    whyTitle: 'Why Pointe-Claire matters in the West Island rollout',
    whyBody:
      'Pointe-Claire is one of the clearest West Island expansion pages because it combines strong local demand, mixed residential and commercial property types, and clients who often want to confirm coverage before requesting a quote. A richer local page helps Sparkling Stays show that West Island routing is active and not just implied through city-wide messaging.',
    serviceFocusTitle: 'How Sparkling Stays handles Pointe-Claire requests',
    serviceFocusBody:
      'Pointe-Claire requests follow the same practical quote-first logic as the rest of the site: the property type, approximate size, cleaning frequency, and scope determine whether the right next step is recurring home support, one-time cleaning, deep cleaning, commercial service, or a specialty quote path. This keeps the page locally relevant without breaking the shared architecture.',
    coverageTitle: 'Coverage framing for Pointe-Claire clients',
    coverageBody:
      'We position Pointe-Claire as a real West Island service page so households and businesses do not have to guess whether they sit inside active coverage. That local framing matters for clients who want cleaner confirmation before reaching out, especially when comparing providers that only reference Montreal broadly.',
    localHighlightsTitle: 'What this Pointe-Claire page helps communicate',
    localHighlights: [
      'Pointe-Claire is treated as a priority West Island market for Sparkling Stays',
      'Residential and commercial cleaning requests can both begin from this page',
      'The page improves West Island service clarity before quote or booking requests',
      'It strengthens the local cluster while preserving the reusable area-page architecture'
    ],
    ctaTitle: 'Need cleaning services in Pointe-Claire?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have in Pointe-Claire, what kind of cleaning support you need, and whether the request is recurring, one-time, commercial, or specialty. We will guide you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Pointe-Claire?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Pointe-Claire for condos, apartments, townhomes, and family homes, along with one-time and deeper cleaning requests when more detail is needed.'
      },
      {
        question: 'Can offices and businesses in Pointe-Claire request commercial cleaning?',
        answer:
          'Yes. Offices and other business spaces in Pointe-Claire can request commercial cleaning support when the scope, property type, and schedule fit Sparkling Stays service capacity.'
      },
      {
        question: 'Why does Pointe-Claire have its own local page?',
        answer:
          'Pointe-Claire has strong local demand and is one of the top remaining West Island targets in the current rollout, so it deserves clearer service framing than a generic regional mention.'
      },
      {
        question: 'What should I include in a Pointe-Claire quote request?',
        answer:
          'Include your area in Pointe-Claire, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, commercial, or specialty cleaning so we can route your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Pointe-Claire, avec un positionnement plus fort dans l’Ouest-de-l’Île pour les maisons familiales, les condos, les bureaux et les demandes spécialisées qui ont besoin d’un point d’entrée local plus clair.',
    intro:
      'Pointe-Claire est le meilleur secteur restant dans l’Ouest-de-l’Île dans le déploiement actuel et donne à Sparkling Stays un point d’ancrage important au-delà du cluster de la Rive-Sud. Cette page enrichie aide les visiteurs de Pointe-Claire à voir que l’Ouest-de-l’Île est traité comme un vrai marché local pour les foyers, les bureaux et les besoins de nettoyage spécialisés, plutôt que comme un simple prolongement générique de Montréal.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Pointe-Claire',
    supportPoints: [
      'Entretien ménager récurrent pour condos, appartements, maisons de ville et maisons familiales',
      'Grand ménage et remises à niveau ponctuelles pour les espaces qui demandent plus de rattrapage',
      'Nettoyage commercial pour bureaux, cliniques et entreprises recevant des clients dans l’Ouest-de-l’Île',
      'Demandes spécialisées comme ménage lié à un déménagement, turnover de type Airbnb, nettoyage de fenêtres et nettoyage après rénovation'
    ],
    whyTitle: 'Pourquoi Pointe-Claire compte dans le déploiement de l’Ouest-de-l’Île',
    whyBody:
      'Pointe-Claire est l’une des pages d’expansion les plus claires dans l’Ouest-de-l’Île parce qu’on y retrouve une demande locale forte, un mélange de propriétés résidentielles et commerciales, et des clients qui veulent souvent confirmer la couverture avant de demander un devis. Une page locale plus riche aide Sparkling Stays à montrer que la desserte de l’Ouest-de-l’Île est bien active et pas seulement implicite dans un message trop large sur Montréal.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Pointe-Claire',
    serviceFocusBody:
      'Les demandes provenant de Pointe-Claire suivent la même logique pratique de devis que le reste du site : le type de propriété, la taille approximative, la fréquence et la portée du nettoyage déterminent ensuite si la meilleure prochaine étape est un service résidentiel récurrent, un ménage ponctuel, un grand ménage, un service commercial ou un devis spécialisé. Cela garde la page locale sans casser l’architecture partagée.',
    coverageTitle: 'Comment nous présentons la couverture à Pointe-Claire',
    coverageBody:
      'Nous positionnons Pointe-Claire comme une vraie page de service dans l’Ouest-de-l’Île afin que les foyers et les entreprises n’aient pas à deviner s’ils se trouvent dans une zone activement desservie. Cette logique locale compte beaucoup pour les clients qui veulent une confirmation plus nette avant de nous écrire, surtout lorsqu’ils comparent avec des entreprises qui parlent seulement de Montréal de manière générale.',
    localHighlightsTitle: 'Ce que cette page Pointe-Claire permet de mieux communiquer',
    localHighlights: [
      'Pointe-Claire est traité comme un marché prioritaire dans l’Ouest-de-l’Île',
      'Les demandes résidentielles et commerciales peuvent toutes deux commencer ici',
      'La page améliore la clarté du service dans l’Ouest-de-l’Île avant le devis ou la réservation',
      'Elle renforce le cluster local tout en gardant une architecture de page réutilisable'
    ],
    ctaTitle: 'Besoin d’un service de nettoyage à Pointe-Claire?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Pointe-Claire, le type de nettoyage souhaité et si la demande est récurrente, ponctuelle, commerciale ou spécialisée. Nous vous guiderons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Pointe-Claire?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Pointe-Claire pour condos, appartements, maisons de ville et maisons familiales, ainsi que des demandes ponctuelles ou plus approfondies lorsque plus de détail est nécessaire.'
      },
      {
        question: 'Les bureaux et entreprises à Pointe-Claire peuvent-ils demander un nettoyage commercial?',
        answer:
          'Oui. Les bureaux et autres espaces professionnels à Pointe-Claire peuvent demander un service commercial lorsque la portée, le type de lieu et l’horaire conviennent à Sparkling Stays.'
      },
      {
        question: 'Pourquoi Pointe-Claire a-t-il sa propre page locale?',
        answer:
          'Pointe-Claire a une forte demande locale et fait partie des meilleurs secteurs restants dans l’Ouest-de-l’Île dans le déploiement actuel. Il mérite donc un cadrage plus précis qu’une simple mention régionale.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Pointe-Claire?',
        answer:
          'Indiquez votre secteur à Pointe-Claire, le type de propriété, la taille approximative, l’horaire souhaité et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage, commercial ou spécialisé afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const kirklandOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Kirkland, with stronger West Island positioning for family homes, townhouses, offices, and specialty cleaning requests that need a more local route.',
    intro:
      'Kirkland is one of the stronger remaining West Island neighborhoods in the Phase 2 rollout and gives Sparkling Stays a more complete local cluster beyond Pointe-Claire. This richer page helps Kirkland visitors see that West Island service is handled intentionally, with cleaner pathways for recurring home cleaning, one-time resets, office support, and specialty requests.',
    supportTitle: 'Most common cleaning needs in Kirkland',
    supportPoints: [
      'Recurring home cleaning for family homes, townhouses, condos, and apartments',
      'Deep cleaning and one-time reset visits when a property needs more detailed catch-up work',
      'Commercial cleaning for offices, clinics, and client-facing business spaces in Kirkland',
      'Specialty requests such as move-related cleaning, Airbnb-style turnovers, window cleaning, and post-renovation cleanup'
    ],
    whyTitle: 'Why Kirkland matters in the West Island rollout',
    whyBody:
      'Kirkland helps Sparkling Stays deepen its West Island coverage with a page aimed at a residential-heavy local market that still includes professional and commercial demand. A richer Kirkland page improves local service clarity, supports neighborhood-level search intent, and makes the broader West Island cluster feel more deliberate and complete.',
    serviceFocusTitle: 'How Sparkling Stays handles Kirkland requests',
    serviceFocusBody:
      'Kirkland requests follow the same practical quote-first logic used across the site: the property type, approximate size, service frequency, and cleaning scope determine the best next step. That may mean recurring residential support, one-time or deep cleaning, commercial service, or a specialty quote path depending on what the space actually needs.',
    coverageTitle: 'Coverage framing for Kirkland clients',
    coverageBody:
      'We frame Kirkland as an active West Island service page rather than a vague edge area. That helps local households and businesses understand that Sparkling Stays is thinking in neighborhood terms, not just relying on broad Montreal coverage language.',
    localHighlightsTitle: 'What this Kirkland page helps communicate',
    localHighlights: [
      'Kirkland is positioned as an active West Island local market',
      'Residential and commercial requests can both begin from this page',
      'The page improves neighborhood-level clarity before quote or booking requests',
      'It strengthens the West Island cluster while preserving the reusable area-page architecture'
    ],
    ctaTitle: 'Need cleaning services in Kirkland?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have in Kirkland, what kind of cleaning support you need, and whether the request is recurring, one-time, commercial, or specialty. We will guide you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Kirkland?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Kirkland for family homes, townhouses, condos, and apartments, along with one-time and deeper cleaning requests when more detailed work is needed.'
      },
      {
        question: 'Can offices and businesses in Kirkland request commercial cleaning?',
        answer:
          'Yes. Offices and other business spaces in Kirkland can request commercial cleaning support when the scope, property type, and schedule are a fit.'
      },
      {
        question: 'Why does Kirkland have its own local page?',
        answer:
          'Kirkland is one of the stronger remaining West Island neighborhoods in the rollout and deserves clearer local service framing than a generic regional mention.'
      },
      {
        question: 'What should I include in a Kirkland quote request?',
        answer:
          'Include your area in Kirkland, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, commercial, or specialty cleaning so we can route your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Kirkland, avec un positionnement plus fort dans l’Ouest-de-l’Île pour les maisons familiales, les maisons de ville, les bureaux et les demandes spécialisées qui ont besoin d’un parcours plus local.',
    intro:
      'Kirkland est l’un des quartiers les plus solides encore restants dans le déploiement Phase 2 de l’Ouest-de-l’Île et permet à Sparkling Stays de compléter plus clairement son cluster local après Pointe-Claire. Cette page enrichie aide les visiteurs de Kirkland à voir que la desserte de l’Ouest-de-l’Île est traitée intentionnellement, avec des parcours plus nets pour l’entretien récurrent, les ménages ponctuels, l’entretien de bureaux et les demandes spécialisées.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Kirkland',
    supportPoints: [
      'Entretien ménager récurrent pour maisons familiales, maisons de ville, condos et appartements',
      'Grand ménage et remises à niveau ponctuelles lorsque la propriété demande plus de rattrapage détaillé',
      'Nettoyage commercial pour bureaux, cliniques et espaces d’affaires recevant des clients à Kirkland',
      'Demandes spécialisées comme ménage lié à un déménagement, turnover de type Airbnb, nettoyage de fenêtres et nettoyage après rénovation'
    ],
    whyTitle: 'Pourquoi Kirkland compte dans le déploiement de l’Ouest-de-l’Île',
    whyBody:
      'Kirkland aide Sparkling Stays à approfondir sa couverture dans l’Ouest-de-l’Île avec une page visant un marché local très résidentiel qui comprend aussi une demande professionnelle et commerciale. Une page Kirkland plus riche améliore la clarté du service local, soutient l’intention de recherche par quartier et rend le cluster de l’Ouest-de-l’Île plus cohérent.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Kirkland',
    serviceFocusBody:
      'Les demandes provenant de Kirkland suivent la même logique pratique de devis utilisée partout sur le site : le type de propriété, la taille approximative, la fréquence et la portée du nettoyage déterminent ensuite la meilleure prochaine étape. Cela peut mener vers un service résidentiel récurrent, un ménage ponctuel ou en profondeur, un service commercial ou un devis spécialisé selon le besoin réel du lieu.',
    coverageTitle: 'Comment nous présentons la couverture à Kirkland',
    coverageBody:
      'Nous présentons Kirkland comme une vraie page active de service dans l’Ouest-de-l’Île plutôt qu’une zone périphérique floue. Cela aide les foyers et les entreprises locales à comprendre que Sparkling Stays pense déjà en termes de quartiers et pas seulement en termes de couverture large de Montréal.',
    localHighlightsTitle: 'Ce que cette page Kirkland permet de mieux communiquer',
    localHighlights: [
      'Kirkland est positionné comme un marché local actif dans l’Ouest-de-l’Île',
      'Les demandes résidentielles et commerciales peuvent toutes deux commencer ici',
      'La page améliore la clarté par quartier avant le devis ou la réservation',
      'Elle renforce le cluster de l’Ouest-de-l’Île tout en gardant une architecture de page réutilisable'
    ],
    ctaTitle: 'Besoin d’un service de nettoyage à Kirkland?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Kirkland, le type de nettoyage souhaité et si la demande est récurrente, ponctuelle, commerciale ou spécialisée. Nous vous guiderons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Kirkland?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Kirkland pour maisons familiales, maisons de ville, condos et appartements, ainsi que des demandes ponctuelles ou plus approfondies lorsque plus de détail est requis.'
      },
      {
        question: 'Les bureaux et entreprises à Kirkland peuvent-ils demander un nettoyage commercial?',
        answer:
          'Oui. Les bureaux et autres espaces professionnels à Kirkland peuvent demander un service commercial lorsque la portée, le type de lieu et l’horaire conviennent.'
      },
      {
        question: 'Pourquoi Kirkland a-t-il sa propre page locale?',
        answer:
          'Kirkland fait partie des quartiers encore les plus solides dans le déploiement de l’Ouest-de-l’Île et mérite donc un cadrage local plus clair qu’une simple mention régionale.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Kirkland?',
        answer:
          'Indiquez votre secteur à Kirkland, le type de propriété, la taille approximative, l’horaire souhaité et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage, commercial ou spécialisé afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const ddoOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Dollard-des-Ormeaux, with stronger West Island positioning for family homes, condos, offices, and specialty cleaning requests that need clearer local service framing.',
    intro:
      'Dollard-des-Ormeaux is the highest-priority remaining West Island neighborhood by impressions and gives Sparkling Stays a strong local page for households and businesses that want coverage confirmed outside central Montreal. This richer page helps DDO visitors understand that West Island cleaning is a real operating lane, not just a broad mention buried inside city-wide messaging.',
    supportTitle: 'Most common cleaning needs in Dollard-des-Ormeaux',
    supportPoints: [
      'Recurring home cleaning for family homes, condos, townhomes, and apartments',
      'Deep cleaning and one-time reset visits for properties that need stronger catch-up work',
      'Commercial cleaning for offices, clinics, and client-facing business spaces in DDO',
      'Specialty requests such as move-related cleaning, Airbnb-style turnover support, window cleaning, and post-renovation cleanup'
    ],
    whyTitle: 'Why Dollard-des-Ormeaux matters in the West Island rollout',
    whyBody:
      'Dollard-des-Ormeaux combines strong search demand with a mix of residential neighborhoods and commercial activity, making it one of the most valuable remaining West Island pages. A richer local page helps Sparkling Stays capture that intent more clearly, reinforce active West Island coverage, and build a stronger local cluster rather than relying on generic regional language.',
    serviceFocusTitle: 'How Sparkling Stays handles Dollard-des-Ormeaux requests',
    serviceFocusBody:
      'DDO requests use the same practical quote-first routing as the rest of the site: property type, approximate size, frequency, and cleaning scope determine whether the best next step is recurring home cleaning, one-time or deep cleaning, commercial support, or a specialty quote path. This keeps the page locally relevant while preserving the shared architecture.',
    coverageTitle: 'Coverage framing for DDO clients',
    coverageBody:
      'We present Dollard-des-Ormeaux as a real local service page so clients do not have to guess whether West Island support is active. That matters for households and businesses comparing providers and looking for clearer confirmation before they request a quote.',
    localHighlightsTitle: 'What this DDO page helps communicate',
    localHighlights: [
      'Dollard-des-Ormeaux is treated as a priority West Island local market',
      'Residential and commercial cleaning requests can both start from this page',
      'The page improves neighborhood-level clarity before quote or booking requests',
      'It strengthens the West Island cluster while preserving the reusable area-page architecture'
    ],
    ctaTitle: 'Need cleaning services in Dollard-des-Ormeaux?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have in Dollard-des-Ormeaux, what type of cleaning support you need, and whether the request is recurring, one-time, commercial, or specialty. We will guide you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Dollard-des-Ormeaux?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Dollard-des-Ormeaux for family homes, condos, townhomes, and apartments, along with one-time and deeper cleaning requests when more detailed work is needed.'
      },
      {
        question: 'Can offices and businesses in Dollard-des-Ormeaux request commercial cleaning?',
        answer:
          'Yes. Offices and other business spaces in Dollard-des-Ormeaux can request commercial cleaning support when the scope, property type, and schedule fit Sparkling Stays service capacity.'
      },
      {
        question: 'Why does Dollard-des-Ormeaux have its own local page?',
        answer:
          'Dollard-des-Ormeaux has strong local search demand and is the highest-priority remaining West Island neighborhood in the rollout, so it deserves more specific service framing than a generic regional mention.'
      },
      {
        question: 'What should I include in a Dollard-des-Ormeaux quote request?',
        answer:
          'Include your area in Dollard-des-Ormeaux, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, commercial, or specialty cleaning so we can route your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Dollard-des-Ormeaux, avec un positionnement plus fort dans l’Ouest-de-l’Île pour les maisons familiales, les condos, les bureaux et les demandes spécialisées qui demandent une présentation locale plus claire.',
    intro:
      'Dollard-des-Ormeaux est le secteur restant le plus prioritaire dans l’Ouest-de-l’Île selon les impressions et donne à Sparkling Stays une page locale forte pour les foyers et les entreprises qui veulent confirmer la couverture en dehors du centre de Montréal. Cette page enrichie aide les visiteurs de DDO à comprendre que la desserte de l’Ouest-de-l’Île est une vraie voie active, et non une simple mention générale intégrée à un message large sur Montréal.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Dollard-des-Ormeaux',
    supportPoints: [
      'Entretien ménager récurrent pour maisons familiales, condos, maisons de ville et appartements',
      'Grand ménage et remises à niveau ponctuelles pour les propriétés qui demandent plus de rattrapage',
      'Nettoyage commercial pour bureaux, cliniques et espaces d’affaires recevant des clients à DDO',
      'Demandes spécialisées comme ménage lié à un déménagement, turnover de type Airbnb, nettoyage de fenêtres et nettoyage après rénovation'
    ],
    whyTitle: 'Pourquoi Dollard-des-Ormeaux compte dans le déploiement de l’Ouest-de-l’Île',
    whyBody:
      'Dollard-des-Ormeaux combine une forte demande de recherche avec un mélange de quartiers résidentiels et d’activité commerciale, ce qui en fait l’une des pages les plus utiles encore restantes dans l’Ouest-de-l’Île. Une page locale plus riche aide Sparkling Stays à capter cette intention plus clairement, à renforcer la preuve de couverture active dans l’Ouest-de-l’Île et à construire un cluster local plus solide qu’un simple langage régional générique.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Dollard-des-Ormeaux',
    serviceFocusBody:
      'Les demandes DDO utilisent la même logique pratique de devis que le reste du site : le type de propriété, la taille approximative, la fréquence et la portée du nettoyage déterminent ensuite si la meilleure prochaine étape est un entretien ménager récurrent, un ménage ponctuel ou en profondeur, un service commercial ou un devis spécialisé. Cela garde la page locale tout en préservant l’architecture partagée.',
    coverageTitle: 'Comment nous présentons la couverture à DDO',
    coverageBody:
      'Nous présentons Dollard-des-Ormeaux comme une vraie page locale de service afin que les clients n’aient pas à deviner si le soutien dans l’Ouest-de-l’Île est actif. Cela compte beaucoup pour les foyers et les entreprises qui comparent des fournisseurs et veulent une confirmation plus claire avant de demander un devis.',
    localHighlightsTitle: 'Ce que cette page DDO permet de mieux communiquer',
    localHighlights: [
      'Dollard-des-Ormeaux est traité comme un marché local prioritaire dans l’Ouest-de-l’Île',
      'Les demandes résidentielles et commerciales peuvent toutes deux commencer ici',
      'La page améliore la clarté par quartier avant le devis ou la réservation',
      'Elle renforce le cluster de l’Ouest-de-l’Île tout en gardant une architecture de page réutilisable'
    ],
    ctaTitle: 'Besoin d’un service de nettoyage à Dollard-des-Ormeaux?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Dollard-des-Ormeaux, le type de nettoyage souhaité et si la demande est récurrente, ponctuelle, commerciale ou spécialisée. Nous vous guiderons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Dollard-des-Ormeaux?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Dollard-des-Ormeaux pour maisons familiales, condos, maisons de ville et appartements, ainsi que des demandes ponctuelles ou plus approfondies lorsque plus de détail est nécessaire.'
      },
      {
        question: 'Les bureaux et entreprises à Dollard-des-Ormeaux peuvent-ils demander un nettoyage commercial?',
        answer:
          'Oui. Les bureaux et autres espaces professionnels à Dollard-des-Ormeaux peuvent demander un service commercial lorsque la portée, le type de lieu et l’horaire conviennent.'
      },
      {
        question: 'Pourquoi Dollard-des-Ormeaux a-t-il sa propre page locale?',
        answer:
          'Dollard-des-Ormeaux a une forte demande locale et représente le secteur restant le plus prioritaire dans l’Ouest-de-l’Île. Il mérite donc un cadrage plus précis qu’une simple mention régionale.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Dollard-des-Ormeaux?',
        answer:
          'Indiquez votre secteur à Dollard-des-Ormeaux, le type de propriété, la taille approximative, l’horaire souhaité et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage, commercial ou spécialisé afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const pierrefondsOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Pierrefonds, with stronger West Island positioning for family homes, multi-level residences, condos, offices, and localized cleaning requests that need clearer neighborhood-level coverage framing.',
    intro:
      'Pierrefonds is the next highest-priority West Island neighborhood after Dollard-des-Ormeaux and helps Sparkling Stays extend its local cluster into a residential-heavy market with consistent family-home demand. This richer page gives Pierrefonds visitors more specific local relevance than the generic template while preserving the same dynamic architecture, metadata pattern, and CTA flow used across the rest of the site.',
    supportTitle: 'Most common cleaning needs in Pierrefonds',
    supportPoints: [
      'Recurring home cleaning for detached houses, townhomes, condos, and apartments across Pierrefonds',
      'Deep cleaning and one-time reset visits for busy households, seasonal catch-up work, and move-related transitions',
      'Commercial cleaning for offices, clinics, studios, and neighborhood-facing business spaces in the West Island',
      'Specialty requests such as post-renovation cleanup, Airbnb-style turnovers, window cleaning, and custom quote requests when the scope is a fit'
    ],
    whyTitle: 'Why Pierrefonds matters in the West Island rollout',
    whyBody:
      'Pierrefonds adds depth to Sparkling Stays’ West Island presence because it serves a large residential area where clients often want a provider that feels local rather than city-wide and vague. A stronger Pierrefonds page helps capture that search intent, confirms active coverage beyond central Montreal, and makes the broader West Island cluster feel more complete and credible.',
    serviceFocusTitle: 'How Sparkling Stays handles Pierrefonds requests',
    serviceFocusBody:
      'Pierrefonds requests follow the same practical quote-first routing used across the site: property type, approximate size, service frequency, and cleaning scope determine whether the best next step is recurring residential cleaning, one-time support, a deep-cleaning visit, commercial service, or a specialty quote path. That keeps the page locally specific without breaking the shared area-page system used for every neighborhood route.',
    coverageTitle: 'Coverage framing for Pierrefonds clients',
    coverageBody:
      'We present Pierrefonds as an active West Island service page rather than folding it into a broad “Montreal” label. That matters for households and businesses near Pierrefonds-Roxboro, Gouin Boulevard corridors, and established residential pockets that want clearer confirmation their quote request is being evaluated with local routing in mind.',
    localHighlightsTitle: 'What this Pierrefonds page helps communicate',
    localHighlights: [
      'Pierrefonds is treated as a priority West Island neighborhood for Sparkling Stays',
      'The page speaks to both home-cleaning demand and local office/commercial demand',
      'Neighborhood-level coverage and bilingual quote support are made clearer before contact',
      'The stronger local messaging improves SEO value while keeping the reusable area-page architecture intact'
    ],
    ctaTitle: 'Need cleaning services in Pierrefonds?',
    ctaBody:
      'Tell Sparkling Stays where you are in Pierrefonds, what kind of property you have, and whether you need recurring, one-time, deep-cleaning, or commercial support. We will guide you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Pierrefonds?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Pierrefonds for detached homes, townhouses, condos, and apartments, along with one-time and deeper cleaning requests when more detailed work is needed.'
      },
      {
        question: 'Can offices and businesses in Pierrefonds request commercial cleaning?',
        answer:
          'Yes. Offices and other business spaces in Pierrefonds can request commercial cleaning support when the property type, cleaning scope, and schedule are a good fit for Sparkling Stays.'
      },
      {
        question: 'Why does Pierrefonds have its own local page?',
        answer:
          'Pierrefonds is the next highest-priority West Island neighborhood in the rollout after Dollard-des-Ormeaux and deserves more specific service framing than a generic regional mention.'
      },
      {
        question: 'What should I include in a Pierrefonds quote request?',
        answer:
          'Include your area in Pierrefonds, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, commercial, or specialty cleaning so we can route your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Pierrefonds, avec un positionnement plus fort dans l’Ouest-de-l’Île pour les maisons familiales, les résidences à plusieurs niveaux, les condos, les bureaux et les demandes locales qui ont besoin d’un cadrage de couverture plus précis par quartier.',
    intro:
      'Pierrefonds est le prochain quartier le plus prioritaire dans l’Ouest-de-l’Île après Dollard-des-Ormeaux et aide Sparkling Stays à étendre son cluster local dans un marché très résidentiel avec une demande constante de maisons familiales. Cette page enrichie donne aux visiteurs de Pierrefonds un message plus spécifique que le gabarit générique tout en conservant la même architecture dynamique, le même pattern de métadonnées et le même parcours CTA que le reste du site.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Pierrefonds',
    supportPoints: [
      'Entretien ménager récurrent pour maisons détachées, maisons de ville, condos et appartements partout à Pierrefonds',
      'Grand ménage et remises à niveau ponctuelles pour foyers occupés, rattrapage saisonnier et transitions liées aux déménagements',
      'Nettoyage commercial pour bureaux, cliniques, studios et espaces d’affaires de quartier dans l’Ouest-de-l’Île',
      'Demandes spécialisées comme nettoyage après rénovation, turnovers de type Airbnb, nettoyage de fenêtres et devis sur mesure lorsque la portée convient'
    ],
    whyTitle: 'Pourquoi Pierrefonds compte dans le déploiement de l’Ouest-de-l’Île',
    whyBody:
      'Pierrefonds donne plus de profondeur à la présence de Sparkling Stays dans l’Ouest-de-l’Île parce qu’il s’agit d’un grand secteur résidentiel où les clients veulent souvent un fournisseur qui semble réellement local, et non un service flou à l’échelle de la ville. Une page Pierrefonds plus forte aide à capter cette intention de recherche, confirme une couverture active au-delà du centre de Montréal et rend le cluster de l’Ouest-de-l’Île plus complet et crédible.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Pierrefonds',
    serviceFocusBody:
      'Les demandes provenant de Pierrefonds suivent la même logique pratique de devis utilisée partout sur le site : le type de propriété, la taille approximative, la fréquence du service et la portée du nettoyage déterminent ensuite si la meilleure prochaine étape est un entretien résidentiel récurrent, un service ponctuel, un grand ménage, un service commercial ou un devis spécialisé. Cela rend la page plus locale sans casser le système partagé des pages de secteurs.',
    coverageTitle: 'Comment nous présentons la couverture à Pierrefonds',
    coverageBody:
      'Nous présentons Pierrefonds comme une page active de service dans l’Ouest-de-l’Île au lieu de le fondre dans une simple étiquette générale de “Montréal”. C’est important pour les foyers et entreprises près de Pierrefonds-Roxboro, des axes du boulevard Gouin et des zones résidentielles établies qui veulent une confirmation plus claire que leur demande est évaluée avec une logique locale.',
    localHighlightsTitle: 'Ce que cette page Pierrefonds permet de mieux communiquer',
    localHighlights: [
      'Pierrefonds est traité comme un quartier prioritaire dans l’Ouest-de-l’Île pour Sparkling Stays',
      'La page parle à la fois de la demande résidentielle et de la demande locale de bureaux/commerciale',
      'La couverture par quartier et le soutien bilingue pour les devis sont plus clairs avant la prise de contact',
      'Le message local plus fort améliore la valeur SEO tout en gardant l’architecture réutilisable des pages de secteurs'
    ],
    ctaTitle: 'Besoin d’un service de nettoyage à Pierrefonds?',
    ctaBody:
      'Dites à Sparkling Stays où vous êtes à Pierrefonds, quel type de propriété vous avez et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage ou d’un soutien commercial. Nous vous guiderons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Pierrefonds?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Pierrefonds pour maisons détachées, maisons de ville, condos et appartements, ainsi que des demandes ponctuelles ou plus approfondies lorsque plus de détail est nécessaire.'
      },
      {
        question: 'Les bureaux et entreprises à Pierrefonds peuvent-ils demander un nettoyage commercial?',
        answer:
          'Oui. Les bureaux et autres espaces professionnels à Pierrefonds peuvent demander un service commercial lorsque le type de lieu, la portée du nettoyage et l’horaire conviennent à Sparkling Stays.'
      },
      {
        question: 'Pourquoi Pierrefonds a-t-il sa propre page locale?',
        answer:
          'Pierrefonds est le prochain quartier le plus prioritaire dans l’Ouest-de-l’Île après Dollard-des-Ormeaux dans le déploiement actuel et mérite donc un cadrage plus précis qu’une simple mention régionale.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Pierrefonds?',
        answer:
          'Indiquez votre secteur à Pierrefonds, le type de propriété, la taille approximative, l’horaire souhaité et si vous avez besoin d’un service récurrent, ponctuel, d’un grand ménage, commercial ou spécialisé afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const chamblyOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Chambly, with South Shore positioning tailored to the town\'s family-home character, waterfront neighborhoods along the Richelieu River, and growing demand from households that want a reliable local cleaning partner.',
    intro:
      'Chambly is a quieter South Shore community that stands apart from the urban density of Brossard or Longueuil. Its appeal is rooted in waterfront living along the Richelieu River, the historic character around Fort Chambly, and a growing base of families who chose the area for space, affordability, and quality of life. This page gives Chambly visitors a local entry point with clearer service framing than a generic South Shore mention.',
    supportTitle: 'Most common cleaning needs in Chambly',
    supportPoints: [
      'Recurring home cleaning for single-family houses, townhomes, and newer developments across Chambly',
      'Deep cleaning and seasonal reset visits for larger family properties and homes near the Richelieu waterfront',
      'Move-related cleaning for households relocating to or from the Chambly area',
      'Specialty requests such as post-renovation cleanup, Airbnb-style turnovers, and window cleaning when the scope fits'
    ],
    whyTitle: 'Why Chambly matters in the South Shore rollout',
    whyBody:
      'Chambly gives Sparkling Stays a stronger foothold in the outer South Shore beyond Brossard and Longueuil. The town has steady residential demand from families in established neighborhoods and newer housing developments, and clients here often want confirmation that a cleaning company actually serves their area rather than treating it as an afterthought beyond the main suburban belt.',
    serviceFocusTitle: 'How Sparkling Stays handles Chambly requests',
    serviceFocusBody:
      'Chambly requests follow the same practical quote-first logic used across the site: property type, approximate size, cleaning frequency, and scope determine whether the best next step is recurring residential cleaning, a one-time deep clean, move-related support, or a specialty quote path. The quieter suburban character of Chambly means most requests lean toward family-home upkeep and seasonal resets rather than commercial or high-density condo work.',
    coverageTitle: 'Coverage framing for Chambly clients',
    coverageBody:
      'We present Chambly as a dedicated South Shore service page so clients along the Richelieu River corridor and surrounding residential streets do not have to guess whether their area falls inside active coverage. That local framing matters for households comparing providers that only mention Montreal or Longueuil without confirming service this far south.',
    localHighlightsTitle: 'What this Chambly page helps communicate',
    localHighlights: [
      'Chambly is positioned as an active South Shore service area, not a generic overflow zone',
      'The page speaks directly to family-home and waterfront-neighborhood cleaning demand',
      'Bilingual quote support and local service clarity are established before the contact step',
      'The stronger local messaging improves South Shore SEO coverage while preserving the reusable area-page architecture'
    ],
    ctaTitle: 'Need cleaning services in Chambly?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have in Chambly, your preferred cleaning schedule, and whether you need recurring support, a one-time deep clean, or move-related help. We will guide you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Chambly?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Chambly for single-family houses, townhomes, and newer developments, along with one-time and deeper cleaning requests when more detailed work is needed.'
      },
      {
        question: 'Do you serve the areas near Fort Chambly and the Richelieu River?',
        answer:
          'Yes. Chambly coverage includes neighborhoods along the Richelieu River waterfront, the historic Fort Chambly area, and surrounding residential streets throughout the town.'
      },
      {
        question: 'Why does Chambly have its own local page?',
        answer:
          'Chambly has meaningful local search demand and sits far enough from the main South Shore urban belt that clients want clearer confirmation of coverage before requesting a quote.'
      },
      {
        question: 'What should I include in a Chambly quote request?',
        answer:
          'Include your area in Chambly, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, or move-related cleaning so we can route your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Chambly, avec un positionnement Rive-Sud adapté au caractère familial de la ville, aux quartiers riverains le long de la rivière Richelieu et à la demande croissante des foyers qui veulent un partenaire de nettoyage local fiable.',
    intro:
      'Chambly se distingue de la densité urbaine de Brossard ou Longueuil par son rythme plus calme, son cadre riverain le long du Richelieu, le caractère historique autour du Fort-Chambly et une base croissante de familles qui ont choisi le secteur pour l\'espace, l\'accessibilité et la qualité de vie. Cette page donne aux visiteurs de Chambly un point d\'entrée local plus clair qu\'une simple mention générique de la Rive-Sud.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Chambly',
    supportPoints: [
      'Entretien ménager récurrent pour maisons unifamiliales, maisons de ville et nouveaux développements à Chambly',
      'Grand ménage et remises à neuf saisonnières pour les propriétés familiales et les maisons près du Richelieu',
      'Ménage lié aux déménagements pour les foyers qui arrivent ou quittent le secteur de Chambly',
      'Demandes spécialisées comme nettoyage après rénovation, turnovers de type Airbnb et nettoyage de fenêtres lorsque la portée convient'
    ],
    whyTitle: 'Pourquoi Chambly compte dans le déploiement de la Rive-Sud',
    whyBody:
      'Chambly donne à Sparkling Stays un ancrage plus fort dans la Rive-Sud extérieure, au-delà de Brossard et Longueuil. La ville a une demande résidentielle constante venant de familles dans des quartiers établis et des développements plus récents, et les clients d\'ici veulent souvent confirmer qu\'une entreprise de nettoyage dessert réellement leur secteur au lieu de le traiter comme un ajout secondaire au-delà de la ceinture suburbaine principale.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Chambly',
    serviceFocusBody:
      'Les demandes provenant de Chambly suivent la même logique pratique de devis que le reste du site : le type de propriété, la taille approximative, la fréquence et la portée du nettoyage déterminent si la meilleure prochaine étape est un entretien résidentiel récurrent, un grand ménage ponctuel, un service lié au déménagement ou un devis spécialisé. Le caractère suburbain plus tranquille de Chambly fait que la plupart des demandes portent sur l\'entretien de maisons familiales et les remises à neuf saisonnières.',
    coverageTitle: 'Comment nous présentons la couverture à Chambly',
    coverageBody:
      'Nous présentons Chambly comme une page de service dédiée sur la Rive-Sud afin que les clients le long du corridor de la rivière Richelieu et des rues résidentielles environnantes n\'aient pas à deviner si leur secteur est activement desservi. Ce cadrage local compte pour les foyers qui comparent des fournisseurs mentionnant seulement Montréal ou Longueuil sans confirmer un service aussi loin au sud.',
    localHighlightsTitle: 'Ce que cette page Chambly permet de mieux communiquer',
    localHighlights: [
      'Chambly est positionné comme un secteur de service actif sur la Rive-Sud, pas comme une zone de débordement générique',
      'La page s\'adresse directement à la demande de nettoyage pour les maisons familiales et les quartiers riverains',
      'Le soutien bilingue et la clarté du service local sont établis avant l\'étape de prise de contact',
      'Le message local plus fort améliore la couverture SEO de la Rive-Sud tout en gardant l\'architecture réutilisable des pages de secteurs'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Chambly?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Chambly, votre horaire préféré et si vous avez besoin d\'un entretien récurrent, d\'un grand ménage ponctuel ou d\'un service lié au déménagement. Nous vous orienterons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Chambly?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Chambly pour maisons unifamiliales, maisons de ville et développements récents, ainsi que des demandes ponctuelles ou plus approfondies lorsque plus de détail est nécessaire.'
      },
      {
        question: 'Desservez-vous les secteurs près du Fort-Chambly et de la rivière Richelieu?',
        answer:
          'Oui. La couverture de Chambly inclut les quartiers le long du Richelieu, le secteur historique du Fort-Chambly et les rues résidentielles environnantes partout dans la ville.'
      },
      {
        question: 'Pourquoi Chambly a-t-il sa propre page locale?',
        answer:
          'Chambly a une demande locale significative et se situe assez loin de la ceinture suburbaine principale pour que les clients veuillent une confirmation plus claire de la couverture avant de demander un devis.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Chambly?',
        answer:
          'Indiquez votre secteur à Chambly, le type de propriété, la taille approximative, l\'horaire souhaité et si vous avez besoin d\'un service récurrent, ponctuel, d\'un grand ménage ou d\'un service lié au déménagement afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const saintConstantOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential cleaning services in Saint-Constant, with South Shore positioning tailored to the town\'s growing suburban neighborhoods, newer housing developments along the A-30 corridor, and families seeking dependable home cleaning closer to home.',
    intro:
      'Saint-Constant is one of the faster-growing South Shore suburbs and gives Sparkling Stays a local page for a market defined by newer housing developments, young families, and residential demand that keeps expanding along the A-30 and autoroute 15 corridors. This page provides Saint-Constant visitors with clearer local framing than a generic South Shore mention, while preserving the same architecture and quote flow used across the site.',
    supportTitle: 'Most common cleaning needs in Saint-Constant',
    supportPoints: [
      'Recurring home cleaning for newer single-family houses, townhomes, and semi-detached properties',
      'Deep cleaning and seasonal reset visits for busy family households',
      'Move-in and move-out cleaning for families relocating into Saint-Constant\'s growing developments',
      'Specialty requests such as post-construction cleanup for new builds and window cleaning when the scope fits'
    ],
    whyTitle: 'Why Saint-Constant matters in the South Shore rollout',
    whyBody:
      'Saint-Constant helps Sparkling Stays reach a growing suburban pocket that sits between the larger Brossard-Longueuil belt and the outer South Shore communities. The town\'s steady stream of new housing construction and young-family arrivals creates consistent cleaning demand that deserves its own local entry point rather than being folded into a vague regional mention.',
    serviceFocusTitle: 'How Sparkling Stays handles Saint-Constant requests',
    serviceFocusBody:
      'Saint-Constant requests follow the same quote-first routing used across the site: property type, approximate size, cleaning frequency, and scope determine the best next step. Because the area skews toward newer single-family homes and townhomes, most requests focus on recurring upkeep, move-related cleaning, and seasonal deep cleans rather than high-rise condo or heavy commercial work.',
    coverageTitle: 'Coverage framing for Saint-Constant clients',
    coverageBody:
      'We present Saint-Constant as an active South Shore service page so families in newer developments near the A-30, along boulevard Monchamp, and in surrounding residential pockets can confirm coverage without guessing. That matters for households comparing providers that only reference larger South Shore cities without confirming they serve communities this far from central Montreal.',
    localHighlightsTitle: 'What this Saint-Constant page helps communicate',
    localHighlights: [
      'Saint-Constant is positioned as a growing South Shore market, not a generic overflow zone',
      'The page speaks to newer-development and young-family cleaning demand specifically',
      'Bilingual quote support and local coverage clarity are established before the contact step',
      'The stronger local messaging strengthens the South Shore SEO cluster while preserving the reusable area-page architecture'
    ],
    ctaTitle: 'Need cleaning services in Saint-Constant?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have in Saint-Constant, your preferred schedule, and whether you need recurring support, a deep clean, or move-related help. We will guide you to the right next step quickly.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Saint-Constant?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Saint-Constant for single-family homes, townhomes, and semi-detached properties, along with one-time and deeper cleaning requests when more detailed work is needed.'
      },
      {
        question: 'Do you serve newer housing developments in Saint-Constant?',
        answer:
          'Yes. Saint-Constant coverage includes newer residential developments along the A-30 corridor and surrounding areas, as well as established streets throughout the town.'
      },
      {
        question: 'Why does Saint-Constant have its own local page?',
        answer:
          'Saint-Constant is one of the faster-growing South Shore communities with steady cleaning demand from new homeowners and young families, so it deserves clearer service framing than a generic regional mention.'
      },
      {
        question: 'What should I include in a Saint-Constant quote request?',
        answer:
          'Include your area in Saint-Constant, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, or move-related cleaning so we can route your request properly.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel à Saint-Constant, avec un positionnement Rive-Sud adapté aux quartiers suburbains en croissance, aux développements résidentiels plus récents le long du corridor de l\'A-30 et aux familles qui cherchent un entretien ménager fiable près de chez elles.',
    intro:
      'Saint-Constant est l\'une des banlieues de la Rive-Sud qui croît le plus rapidement et donne à Sparkling Stays une page locale pour un marché défini par des développements résidentiels récents, de jeunes familles et une demande qui ne cesse d\'augmenter le long des corridors de l\'A-30 et de l\'autoroute 15. Cette page offre aux visiteurs de Saint-Constant un cadrage local plus clair qu\'une simple mention de la Rive-Sud, tout en conservant la même architecture et le même parcours de devis que le reste du site.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Saint-Constant',
    supportPoints: [
      'Entretien ménager récurrent pour maisons unifamiliales, maisons de ville et jumelés plus récents',
      'Grand ménage et remises à neuf saisonnières pour les foyers familiaux occupés',
      'Ménage d\'entrée et de sortie pour les familles qui emménagent dans les développements en croissance de Saint-Constant',
      'Demandes spécialisées comme nettoyage après construction pour les maisons neuves et nettoyage de fenêtres lorsque la portée convient'
    ],
    whyTitle: 'Pourquoi Saint-Constant compte dans le déploiement de la Rive-Sud',
    whyBody:
      'Saint-Constant aide Sparkling Stays à rejoindre une poche suburbaine en croissance située entre la ceinture Brossard-Longueuil et les communautés plus éloignées de la Rive-Sud. Le flux constant de constructions neuves et d\'arrivées de jeunes familles crée une demande de nettoyage régulière qui mérite son propre point d\'entrée local au lieu d\'être fondu dans une mention régionale vague.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Saint-Constant',
    serviceFocusBody:
      'Les demandes provenant de Saint-Constant suivent la même logique de devis que le reste du site : le type de propriété, la taille approximative, la fréquence et la portée du nettoyage déterminent la meilleure prochaine étape. Comme le secteur penche vers les maisons unifamiliales récentes et les maisons de ville, la plupart des demandes portent sur l\'entretien récurrent, le nettoyage lié aux déménagements et les grands ménages saisonniers plutôt que sur le condo en hauteur ou le commercial lourd.',
    coverageTitle: 'Comment nous présentons la couverture à Saint-Constant',
    coverageBody:
      'Nous présentons Saint-Constant comme une page de service active sur la Rive-Sud afin que les familles dans les développements récents près de l\'A-30, le long du boulevard Monchamp et dans les quartiers résidentiels environnants puissent confirmer la couverture sans deviner. C\'est important pour les foyers qui comparent des fournisseurs ne mentionnant que les plus grandes villes de la Rive-Sud sans confirmer un service jusqu\'ici.',
    localHighlightsTitle: 'Ce que cette page Saint-Constant permet de mieux communiquer',
    localHighlights: [
      'Saint-Constant est positionné comme un marché en croissance sur la Rive-Sud, pas comme une zone de débordement générique',
      'La page s\'adresse spécifiquement à la demande de nettoyage des nouveaux développements et des jeunes familles',
      'Le soutien bilingue et la clarté de la couverture locale sont établis avant la prise de contact',
      'Le message local plus fort renforce le cluster SEO de la Rive-Sud tout en gardant l\'architecture réutilisable des pages de secteurs'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Saint-Constant?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Saint-Constant, votre horaire préféré et si vous avez besoin d\'un entretien récurrent, d\'un grand ménage ou d\'un service lié au déménagement. Nous vous orienterons rapidement vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Saint-Constant?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Saint-Constant pour maisons unifamiliales, maisons de ville et jumelés, ainsi que des demandes ponctuelles ou plus approfondies lorsque plus de détail est nécessaire.'
      },
      {
        question: 'Desservez-vous les développements résidentiels plus récents à Saint-Constant?',
        answer:
          'Oui. La couverture de Saint-Constant inclut les développements résidentiels récents le long du corridor de l\'A-30 et les secteurs environnants, ainsi que les rues établies partout dans la ville.'
      },
      {
        question: 'Pourquoi Saint-Constant a-t-il sa propre page locale?',
        answer:
          'Saint-Constant est l\'une des communautés de la Rive-Sud qui croît le plus rapidement, avec une demande constante de la part de nouveaux propriétaires et de jeunes familles. Il mérite donc un cadrage plus précis qu\'une simple mention régionale.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Saint-Constant?',
        answer:
          'Indiquez votre secteur à Saint-Constant, le type de propriété, la taille approximative, l\'horaire souhaité et si vous avez besoin d\'un service récurrent, ponctuel, d\'un grand ménage ou d\'un service lié au déménagement afin que nous puissions bien orienter la demande.'
      }
    ]
  }
};

const saintHubertOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential and commercial cleaning services in Saint-Hubert, with South Shore positioning for the borough\'s established family neighborhoods, newer townhome developments, and growing demand from Longueuil\'s eastern residential corridor.',
    intro: 'Saint-Hubert is a residential-heavy borough within Longueuil that combines older family neighborhoods near the Saint-Hubert airport corridor with newer townhome and condo developments further east. This creates a steady stream of cleaning demand from families, young homeowners, and renters who want a provider that knows the area rather than treating it as generic South Shore territory.',
    supportTitle: 'Most common cleaning needs in Saint-Hubert',
    supportPoints: ['Recurring home cleaning for family homes, townhomes, and apartments across Saint-Hubert', 'Deep cleaning and seasonal resets for busy family households', 'Move-related cleaning for families entering or leaving the growing east-end developments', 'Specialty requests such as post-renovation cleanup and window cleaning'],
    whyTitle: 'Why Saint-Hubert matters in the South Shore rollout',
    whyBody: 'Saint-Hubert extends the South Shore cluster into Longueuil\'s eastern corridor, capturing search intent from a residential area that feels distinct from central Longueuil or Brossard. A dedicated page helps clients here find Sparkling Stays without navigating through broader South Shore content.',
    serviceFocusTitle: 'How Sparkling Stays handles Saint-Hubert requests',
    serviceFocusBody: 'Saint-Hubert requests follow the same quote-first logic: property type, size, frequency, and scope determine the best path. Most requests lean toward recurring family-home upkeep and move-related cleaning given the area\'s residential character.',
    coverageTitle: 'Coverage framing for Saint-Hubert clients',
    coverageBody: 'We present Saint-Hubert as an active South Shore service page so residents near the airport corridor, along Cousineau Boulevard, and in newer eastern developments can confirm coverage before requesting a quote.',
    localHighlightsTitle: 'What this Saint-Hubert page communicates',
    localHighlights: ['Saint-Hubert is positioned as an active service area within the South Shore cluster', 'The page addresses family-home and newer-development cleaning demand', 'Local coverage is confirmed for Longueuil\'s eastern residential corridor', 'The messaging strengthens the South Shore SEO footprint while preserving the shared template'],
    ctaTitle: 'Need cleaning services in Saint-Hubert?',
    ctaBody: 'Tell Sparkling Stays what kind of property you have in Saint-Hubert and the type of cleaning support you need. We will guide you to the right next step.',
    faqs: [{question: 'Do you offer recurring cleaning in Saint-Hubert?', answer: 'Yes. Sparkling Stays supports recurring home cleaning in Saint-Hubert for family homes, townhomes, and apartments, along with one-time and deeper cleaning requests.'}, {question: 'Do you serve newer developments in east Saint-Hubert?', answer: 'Yes. Coverage includes newer townhome and condo developments in the eastern corridor as well as established residential streets throughout the borough.'}, {question: 'Why does Saint-Hubert have its own page?', answer: 'Saint-Hubert has a distinct residential identity within Longueuil that benefits from dedicated local framing rather than a generic South Shore mention.'}, {question: 'What should I include in a Saint-Hubert quote request?', answer: 'Include your area in Saint-Hubert, property type, approximate size, preferred schedule, and the type of cleaning you need.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Saint-Hubert, avec un positionnement Rive-Sud pour les quartiers familiaux établis, les développements de maisons de ville plus récents et la demande croissante du corridor résidentiel est de Longueuil.',
    intro: 'Saint-Hubert est un arrondissement à forte dominante résidentielle de Longueuil qui combine des quartiers familiaux plus anciens près du corridor de l\'aéroport avec des développements de maisons de ville et de condos plus récents vers l\'est. Cela crée une demande constante de nettoyage venant de familles, de jeunes propriétaires et de locataires qui veulent un fournisseur connaissant le secteur.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Saint-Hubert',
    supportPoints: ['Entretien ménager récurrent pour maisons familiales, maisons de ville et appartements à Saint-Hubert', 'Grand ménage et remises à neuf saisonnières pour foyers familiaux occupés', 'Ménage lié aux déménagements pour les familles qui arrivent ou quittent les développements en croissance à l\'est', 'Demandes spécialisées comme nettoyage après rénovation et nettoyage de fenêtres'],
    whyTitle: 'Pourquoi Saint-Hubert compte dans le déploiement de la Rive-Sud',
    whyBody: 'Saint-Hubert étend le cluster de la Rive-Sud dans le corridor est de Longueuil, captant l\'intention de recherche d\'un secteur résidentiel qui se distingue du centre de Longueuil ou de Brossard. Une page dédiée aide les clients d\'ici à trouver Sparkling Stays sans naviguer dans du contenu Rive-Sud trop large.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Saint-Hubert',
    serviceFocusBody: 'Les demandes de Saint-Hubert suivent la même logique de devis : type de propriété, taille, fréquence et portée déterminent le meilleur parcours. La plupart des demandes portent sur l\'entretien récurrent de maisons familiales et le ménage de déménagement étant donné le caractère résidentiel du secteur.',
    coverageTitle: 'Comment nous présentons la couverture à Saint-Hubert',
    coverageBody: 'Nous présentons Saint-Hubert comme une page active de service sur la Rive-Sud afin que les résidents près du corridor de l\'aéroport, le long du boulevard Cousineau et dans les développements plus récents à l\'est puissent confirmer la couverture.',
    localHighlightsTitle: 'Ce que cette page Saint-Hubert communique',
    localHighlights: ['Saint-Hubert est positionné comme un secteur de service actif dans le cluster de la Rive-Sud', 'La page s\'adresse à la demande de nettoyage pour les maisons familiales et les développements récents', 'La couverture locale est confirmée pour le corridor résidentiel est de Longueuil', 'Le message renforce l\'empreinte SEO de la Rive-Sud tout en gardant le gabarit partagé'],
    ctaTitle: 'Besoin d\'un service de nettoyage à Saint-Hubert?',
    ctaBody: 'Expliquez à Sparkling Stays le type de propriété que vous avez à Saint-Hubert et le type de nettoyage souhaité. Nous vous guiderons vers la bonne prochaine étape.',
    faqs: [{question: 'Offrez-vous un entretien récurrent à Saint-Hubert?', answer: 'Oui. Sparkling Stays offre un entretien ménager récurrent à Saint-Hubert pour maisons familiales, maisons de ville et appartements, ainsi que des demandes ponctuelles ou plus approfondies.'}, {question: 'Desservez-vous les développements récents à l\'est de Saint-Hubert?', answer: 'Oui. La couverture inclut les développements récents de maisons de ville et condos dans le corridor est ainsi que les rues résidentielles établies dans tout l\'arrondissement.'}, {question: 'Pourquoi Saint-Hubert a-t-il sa propre page?', answer: 'Saint-Hubert a une identité résidentielle distincte au sein de Longueuil qui bénéficie d\'un cadrage local dédié plutôt qu\'une mention générique de la Rive-Sud.'}, {question: 'Que faut-il inclure dans une demande de devis pour Saint-Hubert?', answer: 'Indiquez votre secteur à Saint-Hubert, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'}]
  }
};

const plateauOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential cleaning services in Plateau-Mont-Royal, with positioning tailored to the borough\'s dense mix of walk-up apartments, duplexes, triplexes, and the vibrant urban lifestyle that defines one of Montreal\'s most iconic neighborhoods.',
    intro: 'The Plateau is one of Montreal\'s densest and most culturally vibrant neighborhoods, characterized by its iconic walk-up apartment buildings, colorful duplexes and triplexes, tree-lined streets, and a resident mix of young professionals, families, and long-time locals. Cleaning demand here centers on apartment and multi-unit living rather than large suburban homes.',
    supportTitle: 'Most common cleaning needs on the Plateau',
    supportPoints: ['Recurring home cleaning for apartments, duplexes, triplexes, and walk-up units', 'Deep cleaning and move-in/move-out support for the Plateau\'s active rental and condo market', 'Seasonal reset visits and spring cleaning for units with limited storage space', 'Airbnb turnover cleaning for short-term rental hosts in one of Montreal\'s most popular tourist neighborhoods'],
    whyTitle: 'Why the Plateau matters in the neighborhood rollout',
    whyBody: 'The Plateau has some of the highest residential density in Montreal and strong search intent for apartment-scale cleaning services. A dedicated page helps Sparkling Stays capture that intent with messaging that fits urban apartment living rather than suburban house cleaning.',
    serviceFocusTitle: 'How Sparkling Stays handles Plateau requests',
    serviceFocusBody: 'Plateau requests are routed by unit type and cleaning scope. Most are apartment or duplex cleans where the quote factors in unit size, number of rooms, floor level, and access logistics rather than the lot size and multi-level considerations of suburban properties.',
    coverageTitle: 'Coverage framing for Plateau clients',
    coverageBody: 'We position the Plateau as a dedicated urban service area covering the corridor from Mont-Royal Avenue to Sherbrooke, from Parc La Fontaine to Saint-Laurent Boulevard. That helps Plateau residents find apartment-specific cleaning support quickly.',
    localHighlightsTitle: 'What this Plateau page communicates',
    localHighlights: ['The Plateau is positioned as a high-density urban service area', 'The page speaks to apartment, duplex, and rental cleaning demand', 'Airbnb turnover and move-related services are highlighted for the active rental market', 'Local messaging captures urban cleaning intent distinct from suburban neighborhoods'],
    ctaTitle: 'Need cleaning services on the Plateau?',
    ctaBody: 'Tell Sparkling Stays about your Plateau apartment or unit, its size, and the type of cleaning you need. We will connect you with the right quote path.',
    faqs: [{question: 'Do you clean apartments and duplexes on the Plateau?', answer: 'Yes. Sparkling Stays supports recurring and one-time cleaning for apartments, duplexes, triplexes, and walk-up units across Plateau-Mont-Royal.'}, {question: 'Do you offer Airbnb turnover cleaning on the Plateau?', answer: 'Yes. Short-term rental hosts in the Plateau can request turnover cleaning support when the schedule and scope are a fit.'}, {question: 'How do you handle building access on the Plateau?', answer: 'We coordinate access details with the client before the first visit, including buzzer codes, key pickup, and any building-specific logistics.'}, {question: 'What should I include in a Plateau quote request?', answer: 'Include your address or cross-street, unit type, approximate size, number of rooms, preferred schedule, and the type of cleaning you need.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel sur le Plateau-Mont-Royal, avec un positionnement adapté au mélange dense d\'appartements sans ascenseur, de duplex, de triplex et au mode de vie urbain vibrant qui définit l\'un des quartiers les plus emblématiques de Montréal.',
    intro: 'Le Plateau est l\'un des quartiers les plus denses et culturellement dynamiques de Montréal, caractérisé par ses immeubles à appartements emblématiques, ses duplex et triplex colorés, ses rues bordées d\'arbres et un mélange de jeunes professionnels, de familles et de résidents de longue date. La demande de nettoyage ici se concentre sur la vie en appartement et en multi-logement plutôt que sur les grandes maisons suburbaines.',
    supportTitle: 'Besoins de nettoyage les plus fréquents sur le Plateau',
    supportPoints: ['Entretien ménager récurrent pour appartements, duplex, triplex et logements sans ascenseur', 'Grand ménage et service d\'entrée/sortie pour le marché locatif et de condos actif du Plateau', 'Remises à neuf saisonnières et grand ménage de printemps pour logements avec espace de rangement limité', 'Nettoyage de type turnover Airbnb pour les hôtes de location court terme dans l\'un des quartiers touristiques les plus populaires de Montréal'],
    whyTitle: 'Pourquoi le Plateau compte dans le déploiement des quartiers',
    whyBody: 'Le Plateau a l\'une des plus fortes densités résidentielles de Montréal et une intention de recherche élevée pour les services de nettoyage à l\'échelle d\'un appartement. Une page dédiée aide Sparkling Stays à capter cette intention avec un message adapté à la vie en appartement urbain plutôt qu\'au nettoyage de maison suburbaine.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes du Plateau',
    serviceFocusBody: 'Les demandes du Plateau sont orientées par type de logement et portée du nettoyage. La plupart sont des nettoyages d\'appartements ou de duplex où le devis tient compte de la taille, du nombre de pièces, de l\'étage et de la logistique d\'accès plutôt que de la taille du terrain et des considérations multi-niveaux des propriétés suburbaines.',
    coverageTitle: 'Comment nous présentons la couverture sur le Plateau',
    coverageBody: 'Nous positionnons le Plateau comme un secteur de service urbain dédié couvrant le corridor de l\'avenue Mont-Royal à Sherbrooke, du Parc La Fontaine au boulevard Saint-Laurent. Cela aide les résidents du Plateau à trouver rapidement du soutien en nettoyage adapté aux appartements.',
    localHighlightsTitle: 'Ce que cette page du Plateau communique',
    localHighlights: ['Le Plateau est positionné comme un secteur de service urbain à haute densité', 'La page s\'adresse à la demande de nettoyage d\'appartements, duplex et locations', 'Les services Airbnb turnover et liés aux déménagements sont mis de l\'avant pour le marché locatif actif', 'Le message local capte l\'intention de nettoyage urbain distincte des quartiers suburbains'],
    ctaTitle: 'Besoin d\'un service de nettoyage sur le Plateau?',
    ctaBody: 'Parlez à Sparkling Stays de votre appartement ou logement sur le Plateau, de sa taille et du type de nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de devis.',
    faqs: [{question: 'Nettoyez-vous les appartements et duplex sur le Plateau?', answer: 'Oui. Sparkling Stays offre un nettoyage récurrent et ponctuel pour appartements, duplex, triplex et logements sans ascenseur sur le Plateau-Mont-Royal.'}, {question: 'Offrez-vous du nettoyage turnover Airbnb sur le Plateau?', answer: 'Oui. Les hôtes de location court terme sur le Plateau peuvent demander un service de turnover lorsque l\'horaire et la portée conviennent.'}, {question: 'Comment gérez-vous l\'accès aux immeubles sur le Plateau?', answer: 'Nous coordonnons les détails d\'accès avec le client avant la première visite, incluant les codes de sonnette, la récupération des clés et la logistique propre à l\'immeuble.'}, {question: 'Que faut-il inclure dans une demande de devis pour le Plateau?', answer: 'Indiquez votre adresse ou coin de rue, le type de logement, la taille approximative, le nombre de pièces, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'}]
  }
};

const lachineOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential cleaning services in Lachine, with positioning tailored to the borough\'s waterfront condos along the Lachine Canal, established family homes, and the growing residential demand between downtown Montreal and the West Island.',
    intro: 'Lachine sits along the Lachine Canal and the St. Lawrence River, bridging downtown Montreal and the West Island. Its mix of heritage waterfront neighborhoods, newer condo developments near the canal, and established family streets creates cleaning demand from a diverse residential base that wants a locally aware provider.',
    supportTitle: 'Most common cleaning needs in Lachine',
    supportPoints: ['Recurring home cleaning for canal-area condos, family homes, and apartments', 'Deep cleaning and seasonal resets for waterfront and heritage properties', 'Move-related cleaning for the active condo market near the Lachine Canal', 'Specialty requests including window cleaning and post-renovation cleanup'],
    whyTitle: 'Why Lachine matters in the neighborhood rollout',
    whyBody: 'Lachine connects the downtown and West Island clusters geographically and captures search intent from a waterfront community that feels distinct from both. A local page helps residents along the canal and surrounding streets find cleaning support without searching through broader Montreal content.',
    serviceFocusTitle: 'How Sparkling Stays handles Lachine requests',
    serviceFocusBody: 'Lachine requests follow the standard quote-first routing, with particular attention to whether the property is a canal-area condo, a family home on the established streets, or a waterfront unit with specific access or layout considerations.',
    coverageTitle: 'Coverage framing for Lachine clients',
    coverageBody: 'We present Lachine as an active local service page covering the Lachine Canal corridor, the waterfront, and surrounding residential neighborhoods so clients do not have to guess whether their area falls within coverage.',
    localHighlightsTitle: 'What this Lachine page communicates',
    localHighlights: ['Lachine is positioned as a waterfront service area bridging downtown and the West Island', 'The page speaks to canal-area condo and family-home cleaning demand', 'Local coverage is confirmed for the Lachine Canal corridor and surrounding streets', 'The messaging fills a geographic gap between the downtown and West Island clusters'],
    ctaTitle: 'Need cleaning services in Lachine?',
    ctaBody: 'Tell Sparkling Stays what kind of property you have in Lachine and the type of cleaning you need. We will guide you to the right quote path.',
    faqs: [{question: 'Do you clean condos near the Lachine Canal?', answer: 'Yes. Sparkling Stays supports recurring and one-time cleaning for condos, apartments, and family homes along the Lachine Canal and surrounding Lachine neighborhoods.'}, {question: 'Do you serve all of Lachine?', answer: 'Yes. Coverage includes canal-area developments, waterfront streets, established family neighborhoods, and surrounding residential areas throughout the borough.'}, {question: 'Why does Lachine have its own page?', answer: 'Lachine bridges downtown Montreal and the West Island with a distinct waterfront character that benefits from dedicated local framing.'}, {question: 'What should I include in a Lachine quote request?', answer: 'Include your location in Lachine, property type, approximate size, preferred schedule, and the type of cleaning you need.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel à Lachine, avec un positionnement adapté aux condos en bord du canal de Lachine, aux maisons familiales établies et à la demande résidentielle croissante entre le centre-ville et l\'Ouest-de-l\'Île.',
    intro: 'Lachine longe le canal de Lachine et le fleuve Saint-Laurent, faisant le pont entre le centre-ville et l\'Ouest-de-l\'Île. Son mélange de quartiers patrimoniaux en bord de l\'eau, de développements de condos récents près du canal et de rues familiales établies crée une demande de nettoyage venant d\'une base résidentielle diversifiée qui veut un fournisseur connaissant le secteur.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Lachine',
    supportPoints: ['Entretien ménager récurrent pour condos près du canal, maisons familiales et appartements', 'Grand ménage et remises à neuf saisonnières pour propriétés riveraines et patrimoniales', 'Ménage lié aux déménagements pour le marché actif de condos près du canal de Lachine', 'Demandes spécialisées incluant nettoyage de fenêtres et nettoyage après rénovation'],
    whyTitle: 'Pourquoi Lachine compte dans le déploiement des quartiers',
    whyBody: 'Lachine connecte géographiquement les clusters du centre-ville et de l\'Ouest-de-l\'Île et capte l\'intention de recherche d\'une communauté riveraine qui se distingue des deux. Une page locale aide les résidents le long du canal et des rues environnantes à trouver du soutien en nettoyage sans chercher dans du contenu montréalais trop large.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Lachine',
    serviceFocusBody: 'Les demandes de Lachine suivent la logique standard de devis, avec une attention particulière selon que la propriété est un condo près du canal, une maison familiale sur les rues établies ou une unité en bord de l\'eau avec des considérations d\'accès ou de disposition spécifiques.',
    coverageTitle: 'Comment nous présentons la couverture à Lachine',
    coverageBody: 'Nous présentons Lachine comme une page active de service local couvrant le corridor du canal de Lachine, le bord de l\'eau et les quartiers résidentiels environnants afin que les clients n\'aient pas à deviner si leur secteur est couvert.',
    localHighlightsTitle: 'Ce que cette page Lachine communique',
    localHighlights: ['Lachine est positionné comme un secteur de service riverain faisant le pont entre le centre-ville et l\'Ouest-de-l\'Île', 'La page s\'adresse à la demande de nettoyage des condos près du canal et des maisons familiales', 'La couverture locale est confirmée pour le corridor du canal de Lachine et les rues environnantes', 'Le message comble un écart géographique entre les clusters du centre-ville et de l\'Ouest-de-l\'Île'],
    ctaTitle: 'Besoin d\'un service de nettoyage à Lachine?',
    ctaBody: 'Expliquez à Sparkling Stays le type de propriété que vous avez à Lachine et le type de nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de devis.',
    faqs: [{question: 'Nettoyez-vous les condos près du canal de Lachine?', answer: 'Oui. Sparkling Stays offre un nettoyage récurrent et ponctuel pour condos, appartements et maisons familiales le long du canal de Lachine et dans les quartiers environnants.'}, {question: 'Desservez-vous tout Lachine?', answer: 'Oui. La couverture inclut les développements près du canal, les rues en bord de l\'eau, les quartiers familiaux établis et les zones résidentielles de tout l\'arrondissement.'}, {question: 'Pourquoi Lachine a-t-il sa propre page?', answer: 'Lachine fait le pont entre le centre-ville et l\'Ouest-de-l\'Île avec un caractère riverain distinct qui bénéficie d\'un cadrage local dédié.'}, {question: 'Que faut-il inclure dans une demande de devis pour Lachine?', answer: 'Indiquez votre emplacement à Lachine, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'}]
  }
};

const cdnOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential cleaning services in Côte-des-Neiges, with positioning tailored to the neighborhood\'s dense mix of apartment buildings, student housing, family homes near the mountain, and multicultural households.',
    intro: 'Côte-des-Neiges is one of Montreal\'s most diverse and densely populated neighborhoods, home to a wide range of apartment buildings, student housing near the universities, family homes closer to Mount Royal, and a multicultural community with varied cleaning needs. This page helps CDN residents find apartment-scale cleaning support with local relevance.',
    supportTitle: 'Most common cleaning needs in Côte-des-Neiges',
    supportPoints: ['Recurring home cleaning for apartments, condos, and family homes across CDN', 'Deep cleaning and move-in/move-out support for the active rental market', 'Student-housing and shared-apartment cleaning during lease transitions', 'Specialty requests including seasonal resets and window cleaning'],
    whyTitle: 'Why Côte-des-Neiges matters in the neighborhood rollout',
    whyBody: 'CDN has high residential density and significant rental turnover, creating year-round cleaning demand. A dedicated page captures search intent from a neighborhood that feels distinct from both downtown Ville-Marie and the adjacent Westmount or NDG areas.',
    serviceFocusTitle: 'How Sparkling Stays handles CDN requests',
    serviceFocusBody: 'CDN requests are routed by unit type and scope. The neighborhood\'s mix of small apartments, larger family units, and shared student housing means the quote process adapts to a wider range of living situations than most Montreal neighborhoods.',
    coverageTitle: 'Coverage framing for CDN clients',
    coverageBody: 'We position Côte-des-Neiges as a dedicated local service page covering the corridor from Chemin de la Côte-des-Neiges to Victoria Avenue, and from Queen Mary to the mountain. That helps CDN residents find cleaning support tailored to apartment living.',
    localHighlightsTitle: 'What this CDN page communicates',
    localHighlights: ['Côte-des-Neiges is positioned as a high-density urban service area', 'The page speaks to apartment, student-housing, and family-home cleaning demand', 'Move-related services are highlighted for the active rental market', 'Local messaging captures CDN-specific search intent'],
    ctaTitle: 'Need cleaning services in Côte-des-Neiges?',
    ctaBody: 'Tell Sparkling Stays about your CDN apartment or home, its size, and the type of cleaning you need. We will connect you with the right quote path.',
    faqs: [{question: 'Do you clean apartments in Côte-des-Neiges?', answer: 'Yes. Sparkling Stays supports recurring and one-time cleaning for apartments, condos, and family homes across Côte-des-Neiges.'}, {question: 'Do you offer move-in/move-out cleaning in CDN?', answer: 'Yes. Move-related cleaning is available for tenants and landlords in the CDN rental market.'}, {question: 'Why does Côte-des-Neiges have its own page?', answer: 'CDN has high density and active rental turnover that create distinct cleaning demand, better served by a dedicated local page.'}, {question: 'What should I include in a CDN quote request?', answer: 'Include your address or cross-street, unit type, approximate size, preferred schedule, and the type of cleaning you need.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel à Côte-des-Neiges, avec un positionnement adapté au mélange dense d\'immeubles à appartements, de logements étudiants, de maisons familiales près de la montagne et de foyers multiculturels du quartier.',
    intro: 'Côte-des-Neiges est l\'un des quartiers les plus diversifiés et densément peuplés de Montréal, abritant un large éventail d\'immeubles à appartements, de logements étudiants près des universités, de maisons familiales plus proches du mont Royal et une communauté multiculturelle aux besoins de nettoyage variés. Cette page aide les résidents de CDN à trouver du soutien en nettoyage à l\'échelle d\'un appartement avec une pertinence locale.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Côte-des-Neiges',
    supportPoints: ['Entretien ménager récurrent pour appartements, condos et maisons familiales à CDN', 'Grand ménage et service d\'entrée/sortie pour le marché locatif actif', 'Nettoyage de logements étudiants et d\'appartements partagés lors des transitions de bail', 'Demandes spécialisées incluant remises à neuf saisonnières et nettoyage de fenêtres'],
    whyTitle: 'Pourquoi Côte-des-Neiges compte dans le déploiement des quartiers',
    whyBody: 'CDN a une forte densité résidentielle et un roulement locatif significatif, créant une demande de nettoyage à l\'année. Une page dédiée capte l\'intention de recherche d\'un quartier qui se distingue autant du centre-ville que des secteurs adjacents de Westmount ou NDG.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes de CDN',
    serviceFocusBody: 'Les demandes de CDN sont orientées par type de logement et portée. Le mélange de petits appartements, d\'unités familiales plus grandes et de logements étudiants partagés fait que le processus de devis s\'adapte à un éventail de situations de vie plus large que la plupart des quartiers montréalais.',
    coverageTitle: 'Comment nous présentons la couverture à CDN',
    coverageBody: 'Nous positionnons Côte-des-Neiges comme une page locale dédiée couvrant le corridor du chemin de la Côte-des-Neiges à l\'avenue Victoria, et de Queen Mary à la montagne. Cela aide les résidents de CDN à trouver du nettoyage adapté à la vie en appartement.',
    localHighlightsTitle: 'Ce que cette page CDN communique',
    localHighlights: ['Côte-des-Neiges est positionné comme un secteur de service urbain à haute densité', 'La page s\'adresse à la demande de nettoyage d\'appartements, logements étudiants et maisons familiales', 'Les services liés aux déménagements sont mis de l\'avant pour le marché locatif actif', 'Le message local capte l\'intention de recherche spécifique à CDN'],
    ctaTitle: 'Besoin d\'un service de nettoyage à Côte-des-Neiges?',
    ctaBody: 'Parlez à Sparkling Stays de votre appartement ou maison à CDN, de sa taille et du type de nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de devis.',
    faqs: [{question: 'Nettoyez-vous les appartements à Côte-des-Neiges?', answer: 'Oui. Sparkling Stays offre un nettoyage récurrent et ponctuel pour appartements, condos et maisons familiales à Côte-des-Neiges.'}, {question: 'Offrez-vous du ménage d\'entrée/sortie à CDN?', answer: 'Oui. Le ménage lié aux déménagements est disponible pour locataires et propriétaires dans le marché locatif de CDN.'}, {question: 'Pourquoi Côte-des-Neiges a-t-il sa propre page?', answer: 'CDN a une forte densité et un roulement locatif actif qui créent une demande de nettoyage distincte, mieux servie par une page locale dédiée.'}, {question: 'Que faut-il inclure dans une demande de devis pour CDN?', answer: 'Indiquez votre adresse ou coin de rue, le type de logement, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'}]
  }
};

const ndgOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential cleaning services in Notre-Dame-de-Grâce (NDG), with positioning tailored to the neighborhood\'s tree-lined residential streets, family duplexes, apartment buildings, and households that want a provider familiar with NDG\'s residential character.',
    intro: 'NDG is one of Montreal\'s most established residential neighborhoods, known for its leafy streets, family-friendly atmosphere, mix of duplexes, triplexes, and apartment buildings, and a strong sense of community. Cleaning demand here centers on family-home upkeep, apartment cleaning, and seasonal maintenance for properties that balance older construction with everyday living.',
    supportTitle: 'Most common cleaning needs in NDG',
    supportPoints: ['Recurring home cleaning for duplexes, triplexes, apartments, and family homes', 'Deep cleaning and seasonal resets for older properties with more detailed cleaning needs', 'Move-related cleaning for NDG\'s active rental market', 'Specialty requests including window cleaning and post-renovation cleanup for older buildings'],
    whyTitle: 'Why NDG matters in the neighborhood rollout',
    whyBody: 'NDG has consistent residential cleaning demand from a stable family-oriented community. A dedicated page helps capture search intent from residents who identify strongly with their neighborhood rather than searching for generic Montreal cleaning.',
    serviceFocusTitle: 'How Sparkling Stays handles NDG requests',
    serviceFocusBody: 'NDG requests follow standard quote-first routing with attention to the neighborhood\'s typical property types: duplexes with separate units, older apartments with unique layouts, and family homes that may have multiple levels and older construction details.',
    coverageTitle: 'Coverage framing for NDG clients',
    coverageBody: 'We position NDG as a dedicated local service page covering the Monkland Village corridor, Sherbrooke West, and surrounding residential streets so NDG residents can confirm coverage quickly.',
    localHighlightsTitle: 'What this NDG page communicates',
    localHighlights: ['NDG is positioned as a family-oriented residential service area', 'The page speaks to duplex, apartment, and family-home cleaning demand', 'Local coverage is confirmed for the Monkland Village area and surrounding streets', 'The messaging captures NDG-specific search intent for neighborhood-aware clients'],
    ctaTitle: 'Need cleaning services in NDG?',
    ctaBody: 'Tell Sparkling Stays about your NDG home or apartment and the type of cleaning you need. We will guide you to the right quote path.',
    faqs: [{question: 'Do you clean duplexes and apartments in NDG?', answer: 'Yes. Sparkling Stays supports recurring and one-time cleaning for duplexes, triplexes, apartments, and family homes across Notre-Dame-de-Grâce.'}, {question: 'Do you serve the Monkland Village area?', answer: 'Yes. Coverage includes Monkland Village, Sherbrooke West, and surrounding residential streets throughout NDG.'}, {question: 'Why does NDG have its own page?', answer: 'NDG has a strong neighborhood identity and consistent residential cleaning demand that benefits from dedicated local framing.'}, {question: 'What should I include in an NDG quote request?', answer: 'Include your location in NDG, property type, approximate size, preferred schedule, and the type of cleaning you need.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel à Notre-Dame-de-Grâce (NDG), avec un positionnement adapté aux rues résidentielles bordées d\'arbres, aux duplex familiaux, aux immeubles à appartements et aux foyers qui veulent un fournisseur connaissant le caractère résidentiel de NDG.',
    intro: 'NDG est l\'un des quartiers résidentiels les plus établis de Montréal, reconnu pour ses rues verdoyantes, son ambiance familiale, son mélange de duplex, triplex et immeubles à appartements, et un fort sentiment communautaire. La demande de nettoyage ici se concentre sur l\'entretien de maisons familiales, le nettoyage d\'appartements et l\'entretien saisonnier pour des propriétés qui allient construction plus ancienne et vie quotidienne.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à NDG',
    supportPoints: ['Entretien ménager récurrent pour duplex, triplex, appartements et maisons familiales', 'Grand ménage et remises à neuf saisonnières pour propriétés plus anciennes avec des besoins de nettoyage plus détaillés', 'Ménage lié aux déménagements pour le marché locatif actif de NDG', 'Demandes spécialisées incluant nettoyage de fenêtres et nettoyage après rénovation pour immeubles plus anciens'],
    whyTitle: 'Pourquoi NDG compte dans le déploiement des quartiers',
    whyBody: 'NDG a une demande de nettoyage résidentiel constante venant d\'une communauté familiale stable. Une page dédiée aide à capter l\'intention de recherche de résidents qui s\'identifient fortement à leur quartier plutôt que de chercher du nettoyage générique à Montréal.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes de NDG',
    serviceFocusBody: 'Les demandes de NDG suivent la logique standard de devis avec attention aux types de propriétés typiques du quartier : duplex avec unités séparées, appartements plus anciens avec des configurations uniques, et maisons familiales qui peuvent avoir plusieurs niveaux et des détails de construction plus anciens.',
    coverageTitle: 'Comment nous présentons la couverture à NDG',
    coverageBody: 'Nous positionnons NDG comme une page locale dédiée couvrant le corridor du Village Monkland, Sherbrooke Ouest et les rues résidentielles environnantes afin que les résidents de NDG puissent confirmer la couverture rapidement.',
    localHighlightsTitle: 'Ce que cette page NDG communique',
    localHighlights: ['NDG est positionné comme un secteur de service résidentiel familial', 'La page s\'adresse à la demande de nettoyage de duplex, appartements et maisons familiales', 'La couverture locale est confirmée pour le Village Monkland et les rues environnantes', 'Le message capte l\'intention de recherche spécifique à NDG pour les clients attachés à leur quartier'],
    ctaTitle: 'Besoin d\'un service de nettoyage à NDG?',
    ctaBody: 'Parlez à Sparkling Stays de votre maison ou appartement à NDG et du type de nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de devis.',
    faqs: [{question: 'Nettoyez-vous les duplex et appartements à NDG?', answer: 'Oui. Sparkling Stays offre un nettoyage récurrent et ponctuel pour duplex, triplex, appartements et maisons familiales dans tout Notre-Dame-de-Grâce.'}, {question: 'Desservez-vous le secteur du Village Monkland?', answer: 'Oui. La couverture inclut le Village Monkland, Sherbrooke Ouest et les rues résidentielles environnantes dans tout NDG.'}, {question: 'Pourquoi NDG a-t-il sa propre page?', answer: 'NDG a une forte identité de quartier et une demande résidentielle constante qui bénéficie d\'un cadrage local dédié.'}, {question: 'Que faut-il inclure dans une demande de devis pour NDG?', answer: 'Indiquez votre emplacement à NDG, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'}]
  }
};

const rosemontOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential cleaning services in Rosemont, with positioning tailored to the neighborhood\'s mix of family-friendly residential streets, walk-up apartments, renovated duplexes, and growing demand from young families and professionals moving into one of Montreal\'s most sought-after neighborhoods.',
    intro: 'Rosemont has become one of Montreal\'s most popular residential neighborhoods, attracting young families and professionals with its tree-lined streets, renovated duplexes and triplexes, proximity to green spaces like Parc Maisonneuve, and a strong local community. Cleaning demand reflects this growth: recurring upkeep for renovated properties, move-related cleaning, and seasonal maintenance.',
    supportTitle: 'Most common cleaning needs in Rosemont',
    supportPoints: ['Recurring home cleaning for renovated duplexes, triplexes, condos, and family apartments', 'Deep cleaning and seasonal resets for properties with modern renovations', 'Move-related cleaning for the active real estate market in Rosemont', 'Specialty requests including post-renovation cleanup and window cleaning'],
    whyTitle: 'Why Rosemont matters in the neighborhood rollout',
    whyBody: 'Rosemont has strong and growing residential demand driven by neighborhood desirability and an active real estate market. A dedicated page captures search intent from residents who identify with Rosemont\'s specific character rather than searching generically for Montreal cleaning.',
    serviceFocusTitle: 'How Sparkling Stays handles Rosemont requests',
    serviceFocusBody: 'Rosemont requests follow standard quote-first routing with attention to the neighborhood\'s common property types: renovated duplexes with open layouts, modern condos, and family apartments. The quote process adapts to the specific property rather than defaulting to a suburban template.',
    coverageTitle: 'Coverage framing for Rosemont clients',
    coverageBody: 'We position Rosemont as a dedicated local service page covering the Petite-Patrie corridor, Beaubien, Masson, and surrounding residential streets so Rosemont residents can find cleaning support quickly.',
    localHighlightsTitle: 'What this Rosemont page communicates',
    localHighlights: ['Rosemont is positioned as a growing, in-demand residential service area', 'The page speaks to renovated-duplex, condo, and family-apartment cleaning demand', 'Local coverage is confirmed for Beaubien, Masson, Petite-Patrie, and surrounding areas', 'The messaging captures Rosemont-specific search intent for neighborhood-attached clients'],
    ctaTitle: 'Need cleaning services in Rosemont?',
    ctaBody: 'Tell Sparkling Stays about your Rosemont property and the type of cleaning you need. We will connect you with the right quote path.',
    faqs: [{question: 'Do you clean duplexes and condos in Rosemont?', answer: 'Yes. Sparkling Stays supports recurring and one-time cleaning for renovated duplexes, triplexes, condos, and family apartments across Rosemont.'}, {question: 'Do you serve the Beaubien and Masson corridors?', answer: 'Yes. Coverage includes Beaubien, Masson, the Petite-Patrie area, and surrounding residential streets throughout Rosemont.'}, {question: 'Why does Rosemont have its own page?', answer: 'Rosemont has strong neighborhood identity and growing residential demand that benefits from dedicated local framing rather than generic Montreal content.'}, {question: 'What should I include in a Rosemont quote request?', answer: 'Include your location in Rosemont, property type, approximate size, preferred schedule, and the type of cleaning you need.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel à Rosemont, avec un positionnement adapté au mélange de rues résidentielles familiales, d\'appartements sans ascenseur, de duplex rénovés et de la demande croissante des jeunes familles et professionnels qui s\'installent dans l\'un des quartiers les plus recherchés de Montréal.',
    intro: 'Rosemont est devenu l\'un des quartiers résidentiels les plus populaires de Montréal, attirant jeunes familles et professionnels avec ses rues bordées d\'arbres, ses duplex et triplex rénovés, sa proximité avec les espaces verts comme le Parc Maisonneuve et sa communauté locale dynamique. La demande de nettoyage reflète cette croissance : entretien récurrent pour propriétés rénovées, ménage de déménagement et entretien saisonnier.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Rosemont',
    supportPoints: ['Entretien ménager récurrent pour duplex rénovés, triplex, condos et appartements familiaux', 'Grand ménage et remises à neuf saisonnières pour propriétés avec rénovations modernes', 'Ménage lié aux déménagements pour le marché immobilier actif de Rosemont', 'Demandes spécialisées incluant nettoyage après rénovation et nettoyage de fenêtres'],
    whyTitle: 'Pourquoi Rosemont compte dans le déploiement des quartiers',
    whyBody: 'Rosemont a une demande résidentielle forte et croissante portée par la désirabilité du quartier et un marché immobilier actif. Une page dédiée capte l\'intention de recherche de résidents qui s\'identifient au caractère spécifique de Rosemont plutôt que de chercher du nettoyage générique à Montréal.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes de Rosemont',
    serviceFocusBody: 'Les demandes de Rosemont suivent la logique standard de devis avec attention aux types de propriétés courants du quartier : duplex rénovés avec plans ouverts, condos modernes et appartements familiaux. Le processus de devis s\'adapte à la propriété spécifique au lieu de défaut sur un gabarit suburbain.',
    coverageTitle: 'Comment nous présentons la couverture à Rosemont',
    coverageBody: 'Nous positionnons Rosemont comme une page locale dédiée couvrant le corridor Petite-Patrie, Beaubien, Masson et les rues résidentielles environnantes afin que les résidents de Rosemont puissent trouver du soutien en nettoyage rapidement.',
    localHighlightsTitle: 'Ce que cette page Rosemont communique',
    localHighlights: ['Rosemont est positionné comme un secteur de service résidentiel en croissance et recherché', 'La page s\'adresse à la demande de nettoyage de duplex rénovés, condos et appartements familiaux', 'La couverture locale est confirmée pour Beaubien, Masson, Petite-Patrie et les secteurs environnants', 'Le message capte l\'intention de recherche spécifique à Rosemont'],
    ctaTitle: 'Besoin d\'un service de nettoyage à Rosemont?',
    ctaBody: 'Parlez à Sparkling Stays de votre propriété à Rosemont et du type de nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de devis.',
    faqs: [{question: 'Nettoyez-vous les duplex et condos à Rosemont?', answer: 'Oui. Sparkling Stays offre un nettoyage récurrent et ponctuel pour duplex rénovés, triplex, condos et appartements familiaux dans tout Rosemont.'}, {question: 'Desservez-vous les corridors Beaubien et Masson?', answer: 'Oui. La couverture inclut Beaubien, Masson, le secteur Petite-Patrie et les rues résidentielles environnantes dans tout Rosemont.'}, {question: 'Pourquoi Rosemont a-t-il sa propre page?', answer: 'Rosemont a une forte identité de quartier et une demande résidentielle croissante qui bénéficie d\'un cadrage local dédié plutôt que de contenu montréalais générique.'}, {question: 'Que faut-il inclure dans une demande de devis pour Rosemont?', answer: 'Indiquez votre emplacement à Rosemont, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'}]
  }
};

const lasalleOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential cleaning services in LaSalle, with positioning tailored to the borough\'s mix of family homes, apartment complexes, waterfront condos near the St. Lawrence, and growing demand from households in one of Montreal\'s most populated boroughs.',
    intro: 'LaSalle is one of Montreal\'s largest boroughs by population, combining established family neighborhoods, large apartment complexes, newer waterfront condo developments, and a strong residential base. Cleaning demand here is driven by volume: a large number of households need recurring upkeep, move-related cleaning, and seasonal maintenance in a borough that offers more space than downtown at a lower cost.',
    supportTitle: 'Most common cleaning needs in LaSalle',
    supportPoints: ['Recurring home cleaning for family homes, apartments, condos, and townhomes', 'Deep cleaning and seasonal resets for the borough\'s large number of family households', 'Move-related cleaning for the active rental and condo market', 'Specialty requests including window cleaning and post-renovation cleanup'],
    whyTitle: 'Why LaSalle matters in the neighborhood rollout',
    whyBody: 'LaSalle\'s large residential population creates significant cleaning demand that is often underserved by providers focused on trendier or denser neighborhoods. A dedicated page helps Sparkling Stays capture that volume with local framing.',
    serviceFocusTitle: 'How Sparkling Stays handles LaSalle requests',
    serviceFocusBody: 'LaSalle requests follow standard quote-first routing. The borough\'s mix of property types means the process handles everything from apartment cleans to larger family-home visits, with quotes adapted to the specific property.',
    coverageTitle: 'Coverage framing for LaSalle clients',
    coverageBody: 'We position LaSalle as a dedicated local service page covering the borough from Newman Boulevard to the waterfront, so LaSalle residents can confirm coverage and request quotes without navigating broader Montreal content.',
    localHighlightsTitle: 'What this LaSalle page communicates',
    localHighlights: ['LaSalle is positioned as a high-population residential service area', 'The page addresses family-home, apartment, and waterfront-condo cleaning demand', 'Local coverage is confirmed for one of Montreal\'s most populated boroughs', 'The messaging captures LaSalle-specific search intent for a large residential base'],
    ctaTitle: 'Need cleaning services in LaSalle?',
    ctaBody: 'Tell Sparkling Stays about your LaSalle property and the type of cleaning you need. We will guide you to the right quote path.',
    faqs: [{question: 'Do you offer recurring cleaning in LaSalle?', answer: 'Yes. Sparkling Stays supports recurring home cleaning in LaSalle for family homes, apartments, condos, and townhomes.'}, {question: 'Do you serve waterfront areas of LaSalle?', answer: 'Yes. Coverage includes waterfront condo developments, established family neighborhoods, and surrounding residential areas throughout the borough.'}, {question: 'Why does LaSalle have its own page?', answer: 'LaSalle is one of Montreal\'s most populated boroughs with significant residential cleaning demand that benefits from dedicated local framing.'}, {question: 'What should I include in a LaSalle quote request?', answer: 'Include your location in LaSalle, property type, approximate size, preferred schedule, and the type of cleaning you need.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel à LaSalle, avec un positionnement adapté au mélange de maisons familiales, de complexes d\'appartements, de condos en bord de l\'eau près du Saint-Laurent et de la demande croissante des foyers dans l\'un des arrondissements les plus peuplés de Montréal.',
    intro: 'LaSalle est l\'un des plus grands arrondissements de Montréal par population, combinant des quartiers familiaux établis, de grands complexes d\'appartements, des développements de condos en bord de l\'eau plus récents et une base résidentielle forte. La demande de nettoyage ici est portée par le volume : un grand nombre de foyers ont besoin d\'entretien récurrent, de ménage de déménagement et d\'entretien saisonnier dans un arrondissement offrant plus d\'espace que le centre-ville à moindre coût.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à LaSalle',
    supportPoints: ['Entretien ménager récurrent pour maisons familiales, appartements, condos et maisons de ville', 'Grand ménage et remises à neuf saisonnières pour le grand nombre de foyers familiaux de l\'arrondissement', 'Ménage lié aux déménagements pour le marché locatif et de condos actif', 'Demandes spécialisées incluant nettoyage de fenêtres et nettoyage après rénovation'],
    whyTitle: 'Pourquoi LaSalle compte dans le déploiement des quartiers',
    whyBody: 'La grande population résidentielle de LaSalle crée une demande de nettoyage significative souvent sous-desservie par les fournisseurs concentrés sur des quartiers plus tendance ou plus denses. Une page dédiée aide Sparkling Stays à capter ce volume avec un cadrage local.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes de LaSalle',
    serviceFocusBody: 'Les demandes de LaSalle suivent la logique standard de devis. Le mélange de types de propriétés de l\'arrondissement fait que le processus gère autant des nettoyages d\'appartements que des visites de maisons familiales plus grandes, avec des devis adaptés à la propriété spécifique.',
    coverageTitle: 'Comment nous présentons la couverture à LaSalle',
    coverageBody: 'Nous positionnons LaSalle comme une page locale dédiée couvrant l\'arrondissement du boulevard Newman au bord de l\'eau, afin que les résidents de LaSalle puissent confirmer la couverture et demander des devis sans naviguer dans du contenu montréalais plus large.',
    localHighlightsTitle: 'Ce que cette page LaSalle communique',
    localHighlights: ['LaSalle est positionné comme un secteur de service résidentiel à forte population', 'La page traite de la demande de nettoyage pour maisons familiales, appartements et condos en bord de l\'eau', 'La couverture locale est confirmée pour l\'un des arrondissements les plus peuplés de Montréal', 'Le message capte l\'intention de recherche spécifique à LaSalle pour une large base résidentielle'],
    ctaTitle: 'Besoin d\'un service de nettoyage à LaSalle?',
    ctaBody: 'Parlez à Sparkling Stays de votre propriété à LaSalle et du type de nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de devis.',
    faqs: [{question: 'Offrez-vous un entretien récurrent à LaSalle?', answer: 'Oui. Sparkling Stays offre un entretien ménager récurrent à LaSalle pour maisons familiales, appartements, condos et maisons de ville.'}, {question: 'Desservez-vous les secteurs en bord de l\'eau à LaSalle?', answer: 'Oui. La couverture inclut les développements de condos en bord de l\'eau, les quartiers familiaux établis et les zones résidentielles de tout l\'arrondissement.'}, {question: 'Pourquoi LaSalle a-t-il sa propre page?', answer: 'LaSalle est l\'un des arrondissements les plus peuplés de Montréal avec une demande de nettoyage résidentiel significative qui bénéficie d\'un cadrage local dédié.'}, {question: 'Que faut-il inclure dans une demande de devis pour LaSalle?', answer: 'Indiquez votre emplacement à LaSalle, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'}]
  }
};

const vaudreuilOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description: 'Sparkling Stays provides residential cleaning services in Vaudreuil-Dorion, with positioning for the growing suburban community west of Montreal that combines established family neighborhoods, newer developments, and demand from households seeking reliable cleaning at the western edge of the Greater Montreal region.',
    intro: 'Vaudreuil-Dorion sits at the far western edge of the Greater Montreal commuter belt, known for its growing suburban character, mix of established neighborhoods and newer family-oriented developments, and a residential base that has expanded significantly in recent years. This page gives Vaudreuil-Dorion visitors a local entry point for cleaning services that acknowledges their distance from central Montreal.',
    supportTitle: 'Most common cleaning needs in Vaudreuil-Dorion',
    supportPoints: ['Recurring home cleaning for family homes, townhomes, and newer developments', 'Deep cleaning and seasonal resets for suburban properties', 'Move-related cleaning for families relocating to Vaudreuil-Dorion\'s growing developments', 'Specialty requests including post-construction cleanup for new builds'],
    whyTitle: 'Why Vaudreuil-Dorion matters at the edge of coverage',
    whyBody: 'Vaudreuil-Dorion represents the western boundary of Sparkling Stays\' Greater Montreal coverage. Its growing population and steady stream of new construction create real cleaning demand from families who want to confirm that a provider actually serves their area rather than stopping at the West Island.',
    serviceFocusTitle: 'How Sparkling Stays handles Vaudreuil-Dorion requests',
    serviceFocusBody: 'Vaudreuil-Dorion requests follow standard quote-first routing. Given the area\'s distance, the quote process confirms coverage feasibility alongside property type, size, and cleaning scope.',
    coverageTitle: 'Coverage framing for Vaudreuil-Dorion clients',
    coverageBody: 'We present Vaudreuil-Dorion as the western boundary of our active service area so families in this growing suburban community can confirm whether cleaning support is available for their specific location.',
    localHighlightsTitle: 'What this Vaudreuil-Dorion page communicates',
    localHighlights: ['Vaudreuil-Dorion is positioned as the western edge of Sparkling Stays\' coverage area', 'The page speaks to growing suburban and new-development cleaning demand', 'Coverage confirmation is emphasized given the distance from central Montreal', 'The messaging extends the Greater Montreal SEO footprint to its natural western limit'],
    ctaTitle: 'Need cleaning services in Vaudreuil-Dorion?',
    ctaBody: 'Tell Sparkling Stays about your Vaudreuil-Dorion property, its size, and the type of cleaning you need. We will confirm coverage and guide you from there.',
    faqs: [{question: 'Do you serve Vaudreuil-Dorion?', answer: 'Yes. Vaudreuil-Dorion is at the western edge of Sparkling Stays\' service area. We evaluate requests based on location, property type, and cleaning scope.'}, {question: 'Do you serve newer developments in Vaudreuil-Dorion?', answer: 'Yes. Coverage includes newer family-oriented developments as well as established residential neighborhoods throughout the city.'}, {question: 'Why does Vaudreuil-Dorion have its own page?', answer: 'Vaudreuil-Dorion has a growing residential population that wants to confirm cleaning coverage is available at the far western edge of the Greater Montreal region.'}, {question: 'What should I include in a Vaudreuil-Dorion quote request?', answer: 'Include your specific location in Vaudreuil-Dorion, property type, approximate size, preferred schedule, and the type of cleaning you need so we can confirm coverage and provide a quote.'}]
  },
  fr: {
    description: 'Sparkling Stays offre des services de nettoyage résidentiel à Vaudreuil-Dorion, avec un positionnement pour la communauté suburbaine en croissance à l\'ouest de Montréal qui combine des quartiers familiaux établis, des développements plus récents et une demande de foyers cherchant un nettoyage fiable à l\'extrémité ouest du Grand Montréal.',
    intro: 'Vaudreuil-Dorion se situe à l\'extrémité ouest de la ceinture de banlieue du Grand Montréal, reconnue pour son caractère suburbain en croissance, son mélange de quartiers établis et de développements familiaux plus récents, et une base résidentielle qui s\'est considérablement agrandie ces dernières années. Cette page donne aux visiteurs de Vaudreuil-Dorion un point d\'entrée local pour les services de nettoyage qui reconnaît leur distance du centre de Montréal.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Vaudreuil-Dorion',
    supportPoints: ['Entretien ménager récurrent pour maisons familiales, maisons de ville et développements récents', 'Grand ménage et remises à neuf saisonnières pour propriétés suburbaines', 'Ménage lié aux déménagements pour les familles qui s\'installent dans les développements en croissance de Vaudreuil-Dorion', 'Demandes spécialisées incluant nettoyage après construction pour les maisons neuves'],
    whyTitle: 'Pourquoi Vaudreuil-Dorion compte à la limite de la couverture',
    whyBody: 'Vaudreuil-Dorion représente la frontière ouest de la couverture Grand Montréal de Sparkling Stays. Sa population croissante et le flux constant de nouvelles constructions créent une demande réelle de nettoyage venant de familles qui veulent confirmer qu\'un fournisseur dessert réellement leur secteur au lieu de s\'arrêter à l\'Ouest-de-l\'Île.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes de Vaudreuil-Dorion',
    serviceFocusBody: 'Les demandes de Vaudreuil-Dorion suivent la logique standard de devis. Étant donné la distance du secteur, le processus de devis confirme la faisabilité de la couverture en plus du type de propriété, de la taille et de la portée du nettoyage.',
    coverageTitle: 'Comment nous présentons la couverture à Vaudreuil-Dorion',
    coverageBody: 'Nous présentons Vaudreuil-Dorion comme la frontière ouest de notre zone de service active afin que les familles de cette communauté suburbaine en croissance puissent confirmer si du soutien en nettoyage est disponible pour leur emplacement précis.',
    localHighlightsTitle: 'Ce que cette page Vaudreuil-Dorion communique',
    localHighlights: ['Vaudreuil-Dorion est positionné comme la limite ouest de la zone de couverture de Sparkling Stays', 'La page s\'adresse à la demande de nettoyage suburbaine en croissance et des nouveaux développements', 'La confirmation de couverture est mise de l\'avant étant donné la distance du centre de Montréal', 'Le message étend l\'empreinte SEO du Grand Montréal jusqu\'à sa limite naturelle à l\'ouest'],
    ctaTitle: 'Besoin d\'un service de nettoyage à Vaudreuil-Dorion?',
    ctaBody: 'Parlez à Sparkling Stays de votre propriété à Vaudreuil-Dorion, de sa taille et du type de nettoyage dont vous avez besoin. Nous confirmerons la couverture et vous guiderons à partir de là.',
    faqs: [{question: 'Desservez-vous Vaudreuil-Dorion?', answer: 'Oui. Vaudreuil-Dorion est à la limite ouest de la zone de service de Sparkling Stays. Nous évaluons les demandes selon l\'emplacement, le type de propriété et la portée du nettoyage.'}, {question: 'Desservez-vous les développements récents à Vaudreuil-Dorion?', answer: 'Oui. La couverture inclut les développements familiaux plus récents ainsi que les quartiers résidentiels établis dans toute la ville.'}, {question: 'Pourquoi Vaudreuil-Dorion a-t-il sa propre page?', answer: 'Vaudreuil-Dorion a une population résidentielle en croissance qui veut confirmer que la couverture de nettoyage est disponible à l\'extrémité ouest du Grand Montréal.'}, {question: 'Que faut-il inclure dans une demande de devis pour Vaudreuil-Dorion?', answer: 'Indiquez votre emplacement précis à Vaudreuil-Dorion, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin afin que nous puissions confirmer la couverture et fournir un devis.'}]
  }
};

const villeMarieOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Ville-Marie, Montreal\'s downtown core, with positioning tailored to condos, high-rise apartments, professional offices, and the unique cleaning needs of the city\'s densest urban borough.',
    intro:
      'Ville-Marie is Montreal\'s downtown heart — a dense urban borough where condos, rental apartments, office towers, and mixed-use buildings sit side by side. Cleaning demand here differs sharply from suburban markets: units tend to be smaller but turnover is higher, many residents are professionals or students on tight schedules, and commercial tenants need reliable office cleaning. This page gives Ville-Marie visitors a more relevant local entry point.',
    supportTitle: 'Most common cleaning needs in Ville-Marie',
    supportPoints: [
      'Recurring home cleaning for downtown condos, studio apartments, and rental units',
      'Deep cleaning and move-in/move-out support for the high tenant turnover common downtown',
      'Office and commercial cleaning for professional spaces, coworking offices, and retail-adjacent units',
      'Specialty requests such as Airbnb-style turnover cleaning for short-term rental hosts in the core'
    ],
    whyTitle: 'Why Ville-Marie matters in the neighborhood rollout',
    whyBody:
      'Ville-Marie has the highest density of potential clients per square kilometre in the network. The borough\'s mix of condo owners, renters, Airbnb hosts, and office tenants creates layered demand that a generic Montreal homepage cannot capture effectively. A dedicated local page helps Sparkling Stays speak to downtown-specific cleaning needs and search intent.',
    serviceFocusTitle: 'How Sparkling Stays handles Ville-Marie requests',
    serviceFocusBody:
      'Ville-Marie requests are routed by unit type and cleaning scope: a studio condo clean follows a different path than a multi-room office or a furnished Airbnb turnover. The quote process accounts for downtown-specific factors like building access procedures, elevator scheduling, and parking logistics that suburban properties rarely involve.',
    coverageTitle: 'Coverage framing for Ville-Marie clients',
    coverageBody:
      'We position Ville-Marie as a dedicated downtown service area covering the core from Old Montreal to the Quartier des Spectacles, the Golden Square Mile, and surrounding high-density residential corridors. That helps downtown residents and businesses find local cleaning support without navigating a page built for suburban households.',
    localHighlightsTitle: 'What this Ville-Marie page helps communicate',
    localHighlights: [
      'Ville-Marie is positioned as a high-priority downtown market with unique cleaning dynamics',
      'The page addresses condo, rental, Airbnb, and office cleaning needs in a single local entry point',
      'Downtown-specific logistics like building access and unit turnover are acknowledged in the service framing',
      'The stronger local messaging captures urban search intent while preserving the reusable area-page architecture'
    ],
    ctaTitle: 'Need cleaning services in Ville-Marie?',
    ctaBody:
      'Tell Sparkling Stays what kind of space you have downtown — condo, apartment, office, or short-term rental — and we will connect you with the right quote path.',
    faqs: [
      {
        question: 'Do you clean condos and apartments in downtown Montreal?',
        answer:
          'Yes. Sparkling Stays supports recurring and one-time cleaning for condos, studio apartments, and rental units across Ville-Marie, including move-in/move-out and Airbnb turnover service.'
      },
      {
        question: 'Do you offer office cleaning in Ville-Marie?',
        answer:
          'Yes. Offices, coworking spaces, and professional units in Ville-Marie can request commercial cleaning when the scope and schedule are a fit.'
      },
      {
        question: 'How do you handle building access and parking downtown?',
        answer:
          'The quote process accounts for building access procedures, elevator booking, and parking logistics. We coordinate these details with the client before the first visit.'
      },
      {
        question: 'What should I include in a Ville-Marie quote request?',
        answer:
          'Include your building location, unit type, approximate size, preferred schedule, and whether you need recurring, one-time, move-related, Airbnb turnover, or office cleaning.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Ville-Marie, le c\u0153ur du centre-ville de Montréal, avec un positionnement adapté aux condos, aux appartements en hauteur, aux bureaux professionnels et aux besoins uniques de l\'arrondissement le plus dense de la ville.',
    intro:
      'Ville-Marie est le c\u0153ur du centre-ville de Montréal — un arrondissement dense où condos, appartements locatifs, tours de bureaux et bâtiments à usage mixte coexistent. La demande de nettoyage ici diffère fortement des marchés suburbains : les unités sont plus petites mais le roulement est plus élevé, beaucoup de résidents sont des professionnels ou des étudiants avec des horaires serrés, et les locataires commerciaux ont besoin d\'un nettoyage de bureau fiable. Cette page donne aux visiteurs de Ville-Marie un point d\'entrée local plus pertinent.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Ville-Marie',
    supportPoints: [
      'Entretien ménager récurrent pour condos du centre-ville, studios et logements locatifs',
      'Grand ménage et service d\'entrée/sortie pour le roulement élevé des locataires typique du centre-ville',
      'Nettoyage de bureaux et commercial pour espaces professionnels, bureaux de coworking et locaux adjacents au commerce de détail',
      'Demandes spécialisées comme le nettoyage de type turnover Airbnb pour les hôtes de location court terme dans le centre'
    ],
    whyTitle: 'Pourquoi Ville-Marie compte dans le déploiement des quartiers',
    whyBody:
      'Ville-Marie a la plus haute densité de clients potentiels par kilomètre carré dans le réseau. Le mélange de propriétaires de condos, de locataires, d\'hôtes Airbnb et de locataires commerciaux crée une demande en couches qu\'une page d\'accueil générique de Montréal ne peut pas capter efficacement. Une page locale dédiée aide Sparkling Stays à répondre aux besoins spécifiques du centre-ville.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Ville-Marie',
    serviceFocusBody:
      'Les demandes de Ville-Marie sont orientées par type d\'unité et portée du nettoyage : un studio condo suit un parcours différent d\'un bureau multi-pièces ou d\'un turnover Airbnb meublé. Le processus de devis tient compte de facteurs propres au centre-ville comme les procédures d\'accès au bâtiment, la réservation d\'ascenseur et la logistique de stationnement.',
    coverageTitle: 'Comment nous présentons la couverture à Ville-Marie',
    coverageBody:
      'Nous positionnons Ville-Marie comme un secteur de service dédié au centre-ville couvrant le Vieux-Montréal, le Quartier des Spectacles, le Mille Carré Doré et les corridors résidentiels à haute densité environnants. Cela aide les résidents et entreprises du centre-ville à trouver du soutien local sans naviguer dans une page conçue pour les foyers suburbains.',
    localHighlightsTitle: 'Ce que cette page Ville-Marie permet de mieux communiquer',
    localHighlights: [
      'Ville-Marie est positionné comme un marché du centre-ville à haute priorité avec des dynamiques de nettoyage uniques',
      'La page traite des besoins de condo, location, Airbnb et bureau dans un seul point d\'entrée local',
      'La logistique propre au centre-ville comme l\'accès aux bâtiments et le roulement des unités est reconnue dans le cadrage',
      'Le message local plus fort capte l\'intention de recherche urbaine tout en gardant l\'architecture réutilisable'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Ville-Marie?',
    ctaBody:
      'Dites à Sparkling Stays quel type d\'espace vous avez au centre-ville — condo, appartement, bureau ou location court terme — et nous vous orienterons vers le bon parcours de devis.',
    faqs: [
      {
        question: 'Nettoyez-vous les condos et appartements au centre-ville de Montréal?',
        answer:
          'Oui. Sparkling Stays offre un nettoyage récurrent et ponctuel pour les condos, studios et logements locatifs à Ville-Marie, incluant le service d\'entrée/sortie et le turnover Airbnb.'
      },
      {
        question: 'Offrez-vous du nettoyage de bureaux à Ville-Marie?',
        answer:
          'Oui. Les bureaux, espaces de coworking et locaux professionnels à Ville-Marie peuvent demander un nettoyage commercial lorsque la portée et l\'horaire conviennent.'
      },
      {
        question: 'Comment gérez-vous l\'accès aux bâtiments et le stationnement au centre-ville?',
        answer:
          'Le processus de devis tient compte des procédures d\'accès, de la réservation d\'ascenseur et de la logistique de stationnement. Nous coordonnons ces détails avec le client avant la première visite.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Ville-Marie?',
        answer:
          'Indiquez l\'emplacement de votre immeuble, le type d\'unité, la taille approximative, l\'horaire souhaité et si vous avez besoin d\'un service récurrent, ponctuel, de déménagement, de turnover Airbnb ou de nettoyage de bureau.'
      }
    ]
  }
};

const beaconsfieldOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential cleaning services in Beaconsfield, with West Island positioning tailored to the city\'s lakefront estates, established family homes, and quality-conscious households that expect a higher standard of home cleaning service.',
    intro:
      'Beaconsfield is one of the West Island\'s most affluent residential communities, known for its lakefront properties along Lac Saint-Louis, mature tree-lined streets, and larger family homes. Cleaning demand here leans toward thorough, detail-oriented service for larger properties rather than quick condo cleans. This page gives Beaconsfield visitors a local entry point that acknowledges the area\'s distinct character.',
    supportTitle: 'Most common cleaning needs in Beaconsfield',
    supportPoints: [
      'Recurring home cleaning for larger family homes, heritage properties, and lakefront estates',
      'Deep cleaning and seasonal reset visits for multi-level residences with more square footage to cover',
      'Move-related cleaning for families transitioning into or out of Beaconsfield\'s established neighborhoods',
      'Window cleaning, post-renovation cleanup, and custom quote requests for properties with special requirements'
    ],
    whyTitle: 'Why Beaconsfield matters in the West Island rollout',
    whyBody:
      'Beaconsfield brings an upscale residential dimension to the West Island cluster. Clients here tend to have higher service expectations and larger properties, which means the default service framing needs to reflect quality, attention to detail, and a willingness to accommodate properties that go beyond the standard suburban template.',
    serviceFocusTitle: 'How Sparkling Stays handles Beaconsfield requests',
    serviceFocusBody:
      'Beaconsfield quotes pay closer attention to property size, number of levels, special surfaces, and any lakefront-specific considerations. The same practical quote-first system applies, but the framing acknowledges that Beaconsfield homes are often larger and require more thorough cleaning plans than a typical West Island townhome.',
    coverageTitle: 'Coverage framing for Beaconsfield clients',
    coverageBody:
      'We position Beaconsfield as a premium West Island service area so lakefront homeowners and established-neighborhood families can confirm coverage and service quality before requesting a quote. That matters in a market where clients compare providers carefully.',
    localHighlightsTitle: 'What this Beaconsfield page helps communicate',
    localHighlights: [
      'Beaconsfield is positioned as a quality-focused West Island service area',
      'The page speaks to larger-home and lakefront-property cleaning demand',
      'Service framing emphasizes thoroughness and attention to detail over speed',
      'The local messaging strengthens the West Island SEO cluster for premium residential intent'
    ],
    ctaTitle: 'Need cleaning services in Beaconsfield?',
    ctaBody:
      'Tell Sparkling Stays about your Beaconsfield property, its approximate size, and the kind of cleaning support you need. We will guide you to the right service path.',
    faqs: [
      {
        question: 'Do you clean larger homes and lakefront properties in Beaconsfield?',
        answer:
          'Yes. Sparkling Stays supports recurring and deep cleaning for larger family homes, heritage properties, and lakefront estates in Beaconsfield, with quotes adapted to property size and requirements.'
      },
      {
        question: 'Do you serve all of Beaconsfield?',
        answer:
          'Yes. Coverage includes lakefront streets along Lac Saint-Louis, established interior neighborhoods, and surrounding residential areas throughout the city.'
      },
      {
        question: 'Why does Beaconsfield have its own local page?',
        answer:
          'Beaconsfield has a distinct upscale residential character that benefits from dedicated local framing rather than a generic West Island mention.'
      },
      {
        question: 'What should I include in a Beaconsfield quote request?',
        answer:
          'Include your location in Beaconsfield, property type, approximate size, number of levels, preferred schedule, and whether you need recurring, one-time, deep, or specialty cleaning.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel à Beaconsfield, avec un positionnement Ouest-de-l\'Île adapté aux domaines en bord de lac, aux maisons familiales établies et aux foyers exigeants qui s\'attendent à un standard plus élevé de service de nettoyage.',
    intro:
      'Beaconsfield est l\'une des communautés résidentielles les plus cossüues de l\'Ouest-de-l\'Île, reconnue pour ses propriétés en bord du lac Saint-Louis, ses rues bordées d\'arbres matures et ses grandes maisons familiales. La demande de nettoyage ici penche vers un service minutieux et détaillé pour des propriétés plus grandes plutôt que des nettoyages rapides de condos. Cette page donne aux visiteurs de Beaconsfield un point d\'entrée qui reconnaît le caractère distinct du secteur.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Beaconsfield',
    supportPoints: [
      'Entretien ménager récurrent pour grandes maisons familiales, propriétés patrimoniales et domaines en bord de lac',
      'Grand ménage et remises à neuf saisonnières pour résidences à plusieurs niveaux avec plus de superficie à couvrir',
      'Ménage lié au déménagement pour les familles en transition dans les quartiers établis de Beaconsfield',
      'Nettoyage de fenêtres, nettoyage après rénovation et devis sur mesure pour propriétés avec des exigences particulières'
    ],
    whyTitle: 'Pourquoi Beaconsfield compte dans le déploiement de l\'Ouest-de-l\'Île',
    whyBody:
      'Beaconsfield apporte une dimension résidentielle haut de gamme au cluster de l\'Ouest-de-l\'Île. Les clients d\'ici ont généralement des attentes de service plus élevées et des propriétés plus grandes, ce qui signifie que le cadrage du service doit refléter la qualité, l\'attention au détail et la capacité de gérer des propriétés au-delà du gabarit suburbain standard.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Beaconsfield',
    serviceFocusBody:
      'Les devis pour Beaconsfield accordent plus d\'attention à la taille de la propriété, au nombre de niveaux, aux surfaces spéciales et aux considérations liées au bord du lac. Le même système pratique de devis en premier s\'applique, mais le cadrage reconnaît que les maisons de Beaconsfield sont souvent plus grandes et nécessitent des plans de nettoyage plus approfondis.',
    coverageTitle: 'Comment nous présentons la couverture à Beaconsfield',
    coverageBody:
      'Nous positionnons Beaconsfield comme un secteur de service premium dans l\'Ouest-de-l\'Île afin que les propriétaires en bord de lac et les familles de quartiers établis puissent confirmer la couverture et la qualité du service avant de demander un devis. Cela compte dans un marché où les clients comparent attentivement.',
    localHighlightsTitle: 'Ce que cette page Beaconsfield permet de mieux communiquer',
    localHighlights: [
      'Beaconsfield est positionné comme un secteur de service axé sur la qualité dans l\'Ouest-de-l\'Île',
      'La page s\'adresse à la demande de nettoyage pour les grandes maisons et les propriétés en bord de lac',
      'Le cadrage du service met l\'accent sur la minutie et l\'attention au détail plutôt que la rapidité',
      'Le message local renforce le cluster SEO de l\'Ouest-de-l\'Île pour l\'intention résidentielle premium'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Beaconsfield?',
    ctaBody:
      'Parlez à Sparkling Stays de votre propriété à Beaconsfield, de sa taille approximative et du type de soutien en nettoyage dont vous avez besoin. Nous vous guiderons vers le bon parcours de service.',
    faqs: [
      {
        question: 'Nettoyez-vous les grandes maisons et propriétés en bord de lac à Beaconsfield?',
        answer:
          'Oui. Sparkling Stays offre un entretien récurrent et un grand ménage pour les grandes maisons familiales, propriétés patrimoniales et domaines en bord de lac à Beaconsfield, avec des devis adaptés à la taille et aux exigences.'
      },
      {
        question: 'Desservez-vous tout Beaconsfield?',
        answer:
          'Oui. La couverture inclut les rues en bord du lac Saint-Louis, les quartiers intérieurs établis et les zones résidentielles environnantes dans toute la ville.'
      },
      {
        question: 'Pourquoi Beaconsfield a-t-il sa propre page locale?',
        answer:
          'Beaconsfield a un caractère résidentiel haut de gamme distinct qui bénéficie d\'un cadrage local dédié plutôt que d\'une simple mention générique de l\'Ouest-de-l\'Île.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Beaconsfield?',
        answer:
          'Indiquez votre emplacement à Beaconsfield, le type de propriété, la taille approximative, le nombre de niveaux, l\'horaire souhaité et si vous avez besoin d\'un service récurrent, ponctuel, d\'un grand ménage ou d\'un service spécialisé.'
      }
    ]
  }
};

const baieDUrfeOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential cleaning services in Baie-d\'Urfé, with West Island positioning tailored to the town\'s quiet lakefront character, spacious family properties, and households that value a more personalized cleaning experience.',
    intro:
      'Baie-d\'Urfé is one of the smallest and most residential communities on the West Island, known for its tranquil lakefront streets, large wooded lots, and a close-knit neighborhood feel. Cleaning demand here is almost entirely residential, focused on family homes that are often larger than average and require a provider comfortable working with more spacious properties.',
    supportTitle: 'Most common cleaning needs in Baie-d\'Urfé',
    supportPoints: [
      'Recurring home cleaning for spacious family homes and lakefront properties',
      'Deep cleaning and seasonal reset visits for larger residences with multiple levels and outdoor living areas',
      'Move-related cleaning for families transitioning in the Baie-d\'Urfé market',
      'Window cleaning and specialty requests for properties with waterfront or wooded-lot considerations'
    ],
    whyTitle: 'Why Baie-d\'Urfé matters in the West Island rollout',
    whyBody:
      'Baie-d\'Urfé rounds out the West Island cluster by covering the quiet lakefront corridor between Beaconsfield and Sainte-Anne-de-Bellevue. Although the town is small, its residents tend to have larger properties and higher service expectations, making it worth a dedicated local page rather than a generic mention.',
    serviceFocusTitle: 'How Sparkling Stays handles Baie-d\'Urfé requests',
    serviceFocusBody:
      'Baie-d\'Urfé requests are evaluated with attention to property size and layout, since homes here tend to be larger single-family residences on generous lots. The quote process adapts to the extra square footage and any lakefront or wooded-property considerations.',
    coverageTitle: 'Coverage framing for Baie-d\'Urfé clients',
    coverageBody:
      'We present Baie-d\'Urfé as an active West Island service page so residents of this quiet lakefront community can confirm local coverage. That matters for homeowners who want to know their provider is genuinely familiar with the area rather than treating it as an afterthought.',
    localHighlightsTitle: 'What this Baie-d\'Urfé page helps communicate',
    localHighlights: [
      'Baie-d\'Urfé is recognized as a distinct lakefront community within the West Island cluster',
      'The page speaks to larger-home and spacious-lot cleaning demand',
      'Local coverage is confirmed for a community that often feels overlooked by city-wide providers',
      'The messaging completes the West Island lakefront corridor from Beaconsfield to Sainte-Anne'
    ],
    ctaTitle: 'Need cleaning services in Baie-d\'Urfé?',
    ctaBody:
      'Tell Sparkling Stays about your Baie-d\'Urfé property, its approximate size, and the kind of cleaning support you need. We will guide you to the right service path.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Baie-d\'Urfé?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Baie-d\'Urfé for family homes and lakefront properties, along with one-time and deeper cleaning visits.'
      },
      {
        question: 'Do you serve lakefront properties in Baie-d\'Urfé?',
        answer:
          'Yes. Coverage includes lakefront homes along Lac Saint-Louis and the surrounding residential streets throughout the town.'
      },
      {
        question: 'Why does Baie-d\'Urfé have its own local page?',
        answer:
          'Baie-d\'Urfé has a distinct residential character with larger properties and lakefront homes that benefit from dedicated local framing.'
      },
      {
        question: 'What should I include in a Baie-d\'Urfé quote request?',
        answer:
          'Include your location in Baie-d\'Urfé, property type, approximate size, number of levels, preferred schedule, and the type of cleaning you need.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel à Baie-d\'Urfé, avec un positionnement Ouest-de-l\'Île adapté au caractère tranquille et riverain de la ville, à ses propriétés familiales spacieuses et aux foyers qui valorisent un service de nettoyage plus personnalisé.',
    intro:
      'Baie-d\'Urfé est l\'une des communautés les plus petites et les plus résidentielles de l\'Ouest-de-l\'Île, reconnue pour ses rues riveraines tranquilles, ses grands terrains boisés et son atmosphère de quartier intime. La demande de nettoyage ici est presque entièrement résidentielle, centrée sur des maisons familiales souvent plus grandes que la moyenne et nécessitant un fournisseur à l\'aise avec des propriétés plus spacieuses.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Baie-d\'Urfé',
    supportPoints: [
      'Entretien ménager récurrent pour maisons familiales spacieuses et propriétés en bord de lac',
      'Grand ménage et remises à neuf saisonnières pour résidences plus grandes à plusieurs niveaux et espaces de vie extérieurs',
      'Ménage lié au déménagement pour les familles en transition dans le marché de Baie-d\'Urfé',
      'Nettoyage de fenêtres et demandes spécialisées pour propriétés riveraines ou sur terrain boisé'
    ],
    whyTitle: 'Pourquoi Baie-d\'Urfé compte dans le déploiement de l\'Ouest-de-l\'Île',
    whyBody:
      'Baie-d\'Urfé complète le cluster de l\'Ouest-de-l\'Île en couvrant le corridor riverain tranquille entre Beaconsfield et Sainte-Anne-de-Bellevue. Bien que la ville soit petite, ses résidents ont tendance à avoir de plus grandes propriétés et des attentes de service plus élevées, ce qui justifie une page locale dédiée plutôt qu\'une mention générique.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Baie-d\'Urfé',
    serviceFocusBody:
      'Les demandes de Baie-d\'Urfé sont évaluées avec une attention particulière à la taille et la disposition de la propriété, puisque les maisons ici tendent à être de grandes résidences unifamiliales sur des terrains généreux. Le processus de devis s\'adapte à la superficie supplémentaire et aux considérations liées au bord de l\'eau ou au terrain boisé.',
    coverageTitle: 'Comment nous présentons la couverture à Baie-d\'Urfé',
    coverageBody:
      'Nous présentons Baie-d\'Urfé comme une page active de service dans l\'Ouest-de-l\'Île afin que les résidents de cette communauté riveraine tranquille puissent confirmer la couverture locale. Cela compte pour les propriétaires qui veulent savoir que leur fournisseur connaît vraiment le secteur.',
    localHighlightsTitle: 'Ce que cette page Baie-d\'Urfé permet de mieux communiquer',
    localHighlights: [
      'Baie-d\'Urfé est reconnu comme une communauté riveraine distincte dans le cluster de l\'Ouest-de-l\'Île',
      'La page s\'adresse à la demande de nettoyage pour les grandes maisons et les terrains spacieux',
      'La couverture locale est confirmée pour une communauté souvent négligée par les fournisseurs à l\'échelle de la ville',
      'Le message complète le corridor riverain de l\'Ouest-de-l\'Île de Beaconsfield à Sainte-Anne'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Baie-d\'Urfé?',
    ctaBody:
      'Parlez à Sparkling Stays de votre propriété à Baie-d\'Urfé, de sa taille approximative et du type de soutien en nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de service.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Baie-d\'Urfé?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Baie-d\'Urfé pour maisons familiales et propriétés en bord de lac, ainsi que des visites ponctuelles et des grands ménages.'
      },
      {
        question: 'Desservez-vous les propriétés en bord de lac à Baie-d\'Urfé?',
        answer:
          'Oui. La couverture inclut les maisons en bord du lac Saint-Louis et les rues résidentielles environnantes dans toute la ville.'
      },
      {
        question: 'Pourquoi Baie-d\'Urfé a-t-il sa propre page locale?',
        answer:
          'Baie-d\'Urfé a un caractère résidentiel distinct avec de plus grandes propriétés et des maisons en bord de lac qui bénéficient d\'un cadrage local dédié.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Baie-d\'Urfé?',
        answer:
          'Indiquez votre emplacement à Baie-d\'Urfé, le type de propriété, la taille approximative, le nombre de niveaux, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'
      }
    ]
  }
};

const westmountOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Westmount, with positioning tailored to the city\'s heritage homes, upscale condos, professional offices, and households that expect a premium cleaning experience in one of Montreal\'s most prestigious neighborhoods.',
    intro:
      'Westmount is Montreal\'s most recognized upscale residential enclave, home to heritage stone mansions, luxury condos, professional offices, and a community that expects a higher standard of service. Cleaning demand here reflects that: larger homes with multiple levels, high-end finishes that require careful handling, and clients who want a provider that understands the difference between a routine clean and a thorough, quality-focused visit.',
    supportTitle: 'Most common cleaning needs in Westmount',
    supportPoints: [
      'Recurring home cleaning for heritage homes, luxury condos, and multi-level family residences',
      'Deep cleaning and seasonal reset visits for larger properties with high-end finishes and special surfaces',
      'Office cleaning for professional spaces along Sherbrooke, Victoria Village, and Greene Avenue',
      'Specialty requests including post-renovation cleanup, window cleaning, and detailed whole-home resets'
    ],
    whyTitle: 'Why Westmount matters in the neighborhood rollout',
    whyBody:
      'Westmount is one of the highest-value neighborhoods in the network by service expectations and property size. A dedicated local page helps Sparkling Stays signal that Westmount is treated as a premium market with appropriate attention to quality, not just another pin on a map of Montreal neighborhoods.',
    serviceFocusTitle: 'How Sparkling Stays handles Westmount requests',
    serviceFocusBody:
      'Westmount quotes are built around property size, number of levels, finish quality, and any special requirements like heritage surface care or multi-zone scheduling. The service framing reflects the expectation that cleaning in Westmount is about thoroughness and care, not speed.',
    coverageTitle: 'Coverage framing for Westmount clients',
    coverageBody:
      'We position Westmount as a premium local service page so residents of Summit Circle, Upper Westmount, Victoria Village, and surrounding streets can confirm that Sparkling Stays treats their neighborhood with the attention it deserves.',
    localHighlightsTitle: 'What this Westmount page helps communicate',
    localHighlights: [
      'Westmount is positioned as a premium-quality service area within the Montreal network',
      'The page addresses heritage-home, luxury condo, and professional-office cleaning demand',
      'Service framing emphasizes quality, care, and detail over volume',
      'The local messaging targets high-intent search traffic from one of Montreal\'s most valuable neighborhoods'
    ],
    ctaTitle: 'Need cleaning services in Westmount?',
    ctaBody:
      'Tell Sparkling Stays about your Westmount property, its size and layout, and the kind of cleaning support you need. We will match you with the right service path.',
    faqs: [
      {
        question: 'Do you clean heritage homes and luxury condos in Westmount?',
        answer:
          'Yes. Sparkling Stays supports recurring and deep cleaning for heritage homes, luxury condos, and multi-level family residences in Westmount, with quotes adapted to property size, finishes, and special requirements.'
      },
      {
        question: 'Do you offer office cleaning in Westmount?',
        answer:
          'Yes. Professional offices along Sherbrooke, Victoria Village, Greene Avenue, and surrounding Westmount streets can request commercial cleaning when the scope and schedule are a fit.'
      },
      {
        question: 'Why does Westmount have its own local page?',
        answer:
          'Westmount has premium residential character and higher service expectations that are better served by a dedicated local page than a generic Montreal neighborhood mention.'
      },
      {
        question: 'What should I include in a Westmount quote request?',
        answer:
          'Include your location in Westmount, property type, approximate size, number of levels, any special surface or finish considerations, preferred schedule, and the type of cleaning you need.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Westmount, avec un positionnement adapté aux maisons patrimoniales, aux condos haut de gamme, aux bureaux professionnels et aux foyers qui s\'attendent à un service de nettoyage premium dans l\'un des quartiers les plus prestigieux de Montréal.',
    intro:
      'Westmount est l\'enclave résidentielle haut de gamme la plus reconnue de Montréal, abritant des manoirs de pierre patrimoniaux, des condos de luxe, des bureaux professionnels et une communauté qui s\'attend à un standard de service supérieur. La demande de nettoyage ici reflète cela : des maisons plus grandes à plusieurs niveaux, des finitions haut de gamme nécessitant un traitement soigneux, et des clients qui veulent un fournisseur comprenant la différence entre un nettoyage de routine et une visite approfondie axée sur la qualité.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Westmount',
    supportPoints: [
      'Entretien ménager récurrent pour maisons patrimoniales, condos de luxe et résidences familiales à plusieurs niveaux',
      'Grand ménage et remises à neuf saisonnières pour grandes propriétés avec finitions haut de gamme et surfaces spéciales',
      'Nettoyage de bureaux pour espaces professionnels le long de Sherbrooke, du Village Victoria et de l\'avenue Greene',
      'Demandes spécialisées incluant nettoyage après rénovation, nettoyage de fenêtres et remises à neuf détaillées de toute la maison'
    ],
    whyTitle: 'Pourquoi Westmount compte dans le déploiement des quartiers',
    whyBody:
      'Westmount est l\'un des quartiers à plus haute valeur du réseau en termes d\'attentes de service et de taille de propriété. Une page locale dédiée aide Sparkling Stays à signaler que Westmount est traité comme un marché premium avec l\'attention à la qualité qui s\'impose, et non comme un simple point parmi d\'autres sur la carte des quartiers montréalais.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Westmount',
    serviceFocusBody:
      'Les devis pour Westmount sont construits autour de la taille de la propriété, du nombre de niveaux, de la qualité des finitions et des exigences particulières comme l\'entretien de surfaces patrimoniales ou la planification multi-zones. Le cadrage du service reflète l\'attente que le nettoyage à Westmount vise la minutie et le soin, pas la rapidité.',
    coverageTitle: 'Comment nous présentons la couverture à Westmount',
    coverageBody:
      'Nous positionnons Westmount comme une page de service local premium afin que les résidents de Summit Circle, du Haut-Westmount, du Village Victoria et des rues environnantes puissent confirmer que Sparkling Stays traite leur quartier avec l\'attention qu\'il mérite.',
    localHighlightsTitle: 'Ce que cette page Westmount permet de mieux communiquer',
    localHighlights: [
      'Westmount est positionné comme un secteur de service de qualité premium dans le réseau montréalais',
      'La page traite de la demande de nettoyage pour maisons patrimoniales, condos de luxe et bureaux professionnels',
      'Le cadrage du service met l\'accent sur la qualité, le soin et le détail plutôt que le volume',
      'Le message local cible le trafic de recherche à forte intention provenant de l\'un des quartiers les plus prisés de Montréal'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Westmount?',
    ctaBody:
      'Parlez à Sparkling Stays de votre propriété à Westmount, de sa taille et sa disposition, et du type de soutien en nettoyage dont vous avez besoin. Nous vous orienterons vers le bon parcours de service.',
    faqs: [
      {
        question: 'Nettoyez-vous les maisons patrimoniales et condos de luxe à Westmount?',
        answer:
          'Oui. Sparkling Stays offre un entretien récurrent et un grand ménage pour les maisons patrimoniales, condos de luxe et résidences familiales à plusieurs niveaux à Westmount, avec des devis adaptés à la taille, aux finitions et aux exigences particulières.'
      },
      {
        question: 'Offrez-vous du nettoyage de bureaux à Westmount?',
        answer:
          'Oui. Les bureaux professionnels le long de Sherbrooke, du Village Victoria, de l\'avenue Greene et des rues environnantes de Westmount peuvent demander un nettoyage commercial lorsque la portée et l\'horaire conviennent.'
      },
      {
        question: 'Pourquoi Westmount a-t-il sa propre page locale?',
        answer:
          'Westmount a un caractère résidentiel premium et des attentes de service plus élevées qui sont mieux servies par une page locale dédiée qu\'une simple mention de quartier montréalais.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Westmount?',
        answer:
          'Indiquez votre emplacement à Westmount, le type de propriété, la taille approximative, le nombre de niveaux, les considérations de surfaces ou finitions spéciales, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'
      }
    ]
  }
};

const ilePerrotOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential cleaning services in Île-Perrot, with West Island positioning tailored to the island\'s waterfront properties, family homes, and growing suburban demand from households that want a cleaning partner familiar with their area.',
    intro:
      'Île-Perrot sits at the western edge of the Greater Montreal region, connected by bridges to the rest of the West Island and Vaudreuil-Dorion. Its mix of lakefront properties, established family homes, and newer developments creates a residential cleaning market that deserves its own local page rather than being buried under a generic West Island label.',
    supportTitle: 'Most common cleaning needs in Île-Perrot',
    supportPoints: [
      'Recurring home cleaning for waterfront properties, single-family homes, and townhomes across Île-Perrot',
      'Deep cleaning and seasonal reset visits for larger lakeside homes and properties with outdoor living areas',
      'Move-related cleaning for families relocating to or from the island',
      'Specialty requests such as post-renovation cleanup, window cleaning, and custom quote requests when the scope fits'
    ],
    whyTitle: 'Why Île-Perrot matters in the West Island rollout',
    whyBody:
      'Île-Perrot extends Sparkling Stays\' West Island coverage to the far western edge where clients often feel underserved by providers that stop at Pointe-Claire or Kirkland. The island\'s waterfront character and mix of property sizes create cleaning demand that is distinct from the more suburban interior neighborhoods.',
    serviceFocusTitle: 'How Sparkling Stays handles Île-Perrot requests',
    serviceFocusBody:
      'Île-Perrot requests follow the same practical quote-first routing used across the site. Because the area features a wider range of property sizes — from modest family homes to larger waterfront residences — the quote process pays particular attention to square footage, property layout, and whether waterfront-specific needs apply.',
    coverageTitle: 'Coverage framing for Île-Perrot clients',
    coverageBody:
      'We present Île-Perrot as an active West Island service page so residents on the island do not have to wonder whether their location falls within our coverage. This is especially relevant for clients west of the Galipeault Bridge who are used to being treated as "too far" by Montreal-centric providers.',
    localHighlightsTitle: 'What this Île-Perrot page helps communicate',
    localHighlights: [
      'Île-Perrot is positioned as an active far-West Island service area',
      'The page speaks to waterfront and family-home cleaning demand specifically',
      'Bilingual quote support and local coverage are confirmed before the contact step',
      'The local messaging extends the West Island SEO cluster to its natural western boundary'
    ],
    ctaTitle: 'Need cleaning services in Île-Perrot?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have on Île-Perrot, your preferred schedule, and whether you need recurring support, a deep clean, or move-related help. We will guide you to the right next step.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Île-Perrot?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Île-Perrot for family homes, waterfront properties, and townhomes, along with one-time and deeper cleaning requests.'
      },
      {
        question: 'Do you serve waterfront homes on Île-Perrot?',
        answer:
          'Yes. Île-Perrot coverage includes waterfront properties along Lac des Deux Montagnes and Lac Saint-Louis, as well as interior residential streets throughout the island.'
      },
      {
        question: 'Why does Île-Perrot have its own local page?',
        answer:
          'Île-Perrot sits at the far western edge of the West Island and its residents often need confirmation that a cleaning provider actually serves their area, rather than stopping at closer suburbs.'
      },
      {
        question: 'What should I include in an Île-Perrot quote request?',
        answer:
          'Include your location on Île-Perrot, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, or move-related cleaning.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel à Île-Perrot, avec un positionnement Ouest-de-l\'Île adapté aux propriétés riveraines, aux maisons familiales et à la demande suburbaine croissante des foyers qui veulent un partenaire de nettoyage connaissant bien leur secteur.',
    intro:
      'Île-Perrot se trouve à l\'extrémité ouest du Grand Montréal, reliée par des ponts au reste de l\'Ouest-de-l\'Île et à Vaudreuil-Dorion. Son mélange de propriétés en bordure de lac, de maisons familiales établies et de développements plus récents crée un marché résidentiel qui mérite sa propre page locale plutôt qu\'une simple mention générique de l\'Ouest-de-l\'Île.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Île-Perrot',
    supportPoints: [
      'Entretien ménager récurrent pour propriétés riveraines, maisons unifamiliales et maisons de ville à Île-Perrot',
      'Grand ménage et remises à neuf saisonnières pour les grandes résidences en bord de lac',
      'Ménage lié aux déménagements pour les familles qui arrivent ou quittent l\'île',
      'Demandes spécialisées comme nettoyage après rénovation, nettoyage de fenêtres et devis sur mesure lorsque la portée convient'
    ],
    whyTitle: 'Pourquoi Île-Perrot compte dans le déploiement de l\'Ouest-de-l\'Île',
    whyBody:
      'Île-Perrot étend la couverture de Sparkling Stays jusqu\'à l\'extrémité ouest, là où les clients se sentent souvent mal desservis par des fournisseurs qui s\'arrêtent à Pointe-Claire ou Kirkland. Le caractère riverain de l\'île et la variété des tailles de propriétés créent une demande distincte des quartiers suburbains intérieurs.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Île-Perrot',
    serviceFocusBody:
      'Les demandes d\'Île-Perrot suivent la même logique de devis que le reste du site. Comme le secteur présente une gamme plus large de tailles de propriétés — des maisons familiales modestes aux grandes résidences riveraines — le processus de devis accorde une attention particulière à la superficie, la disposition et les besoins spécifiques au bord de l\'eau.',
    coverageTitle: 'Comment nous présentons la couverture à Île-Perrot',
    coverageBody:
      'Nous présentons Île-Perrot comme une page active de service dans l\'Ouest-de-l\'Île afin que les résidents de l\'île n\'aient pas à se demander si leur emplacement tombe dans notre zone de desserte. C\'est particulièrement pertinent pour les clients à l\'ouest du pont Galipeault, habitués à être considérés comme « trop loin » par les fournisseurs centrés sur Montréal.',
    localHighlightsTitle: 'Ce que cette page Île-Perrot permet de mieux communiquer',
    localHighlights: [
      'Île-Perrot est positionné comme un secteur de service actif à l\'extrémité ouest de l\'Île',
      'La page s\'adresse spécifiquement à la demande de nettoyage pour les propriétés riveraines et familiales',
      'Le soutien bilingue et la couverture locale sont confirmés avant la prise de contact',
      'Le message local étend le cluster SEO de l\'Ouest-de-l\'Île jusqu\'à sa frontière naturelle'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Île-Perrot?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Île-Perrot, votre horaire préféré et si vous avez besoin d\'un entretien récurrent, d\'un grand ménage ou d\'un service lié au déménagement. Nous vous orienterons rapidement.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Île-Perrot?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Île-Perrot pour maisons familiales, propriétés riveraines et maisons de ville, ainsi que des demandes ponctuelles ou plus approfondies.'
      },
      {
        question: 'Desservez-vous les maisons en bord de lac à Île-Perrot?',
        answer:
          'Oui. La couverture d\'Île-Perrot inclut les propriétés riveraines le long du lac des Deux Montagnes et du lac Saint-Louis, ainsi que les rues résidentielles intérieures de l\'île.'
      },
      {
        question: 'Pourquoi Île-Perrot a-t-il sa propre page locale?',
        answer:
          'Île-Perrot se situe à l\'extrémité ouest de l\'Ouest-de-l\'Île et ses résidents ont souvent besoin de confirmer qu\'un fournisseur dessert réellement leur secteur, plutôt que de s\'arrêter aux banlieues plus proches.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Île-Perrot?',
        answer:
          'Indiquez votre emplacement sur Île-Perrot, le type de propriété, la taille approximative, l\'horaire souhaité et si vous avez besoin d\'un service récurrent, ponctuel, d\'un grand ménage ou d\'un service lié au déménagement.'
      }
    ]
  }
};

const westIslandHubOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services across the West Island of Montreal, covering Pointe-Claire, Kirkland, Pierrefonds, Dollard-des-Ormeaux, Beaconsfield, Baie-d\'Urfé, Île-Perrot, and surrounding communities.',
    intro:
      'The West Island is one of Sparkling Stays\' most active service regions, spanning a wide corridor from Lachine and Saint-Laurent on the eastern edge to Île-Perrot on the far west. This hub page connects visitors to our individual neighborhood pages while providing an overview of West Island cleaning coverage as a whole.',
    supportTitle: 'Common cleaning needs across the West Island',
    supportPoints: [
      'Recurring home cleaning for family homes, condos, and townhomes across all West Island communities',
      'Deep cleaning and seasonal reset visits for larger suburban properties',
      'Commercial cleaning for offices, clinics, and professional spaces in the West Island corridor',
      'Specialty requests including post-renovation cleanup, Airbnb turnovers, window cleaning, and move-related service'
    ],
    whyTitle: 'Why the West Island gets a hub page',
    whyBody:
      'The West Island includes dozens of distinct communities, each with its own residential character. A hub page helps clients who search broadly for "West Island cleaning" find the right starting point, while individual neighborhood pages handle more specific local intent. Together, this structure gives Sparkling Stays stronger regional coverage without relying on a single generic page.',
    serviceFocusTitle: 'How Sparkling Stays handles West Island requests',
    serviceFocusBody:
      'West Island requests are routed based on the client\'s specific location, property type, and cleaning needs. Whether someone is in a Kirkland townhome, a Beaconsfield lakefront estate, or a Pierrefonds apartment, the quote process uses local details to match the right service path rather than treating the entire region as one undifferentiated market.',
    coverageTitle: 'West Island communities we serve',
    coverageBody:
      'Sparkling Stays actively serves Pointe-Claire, Kirkland, Pierrefonds, Dollard-des-Ormeaux, Beaconsfield, Baie-d\'Urfé, Île-Perrot, Sainte-Anne-de-Bellevue, Senneville, and surrounding West Island neighborhoods. Each of our major communities has its own dedicated local page with area-specific service information.',
    localHighlightsTitle: 'What the West Island hub communicates',
    localHighlights: [
      'The West Island is one of Sparkling Stays\' highest-priority regional markets',
      'Individual neighborhood pages provide more specific local context for each community',
      'Residential and commercial cleaning requests are both supported across the corridor',
      'The hub strengthens regional SEO while connecting to deeper local pages'
    ],
    ctaTitle: 'Need cleaning services in the West Island?',
    ctaBody:
      'Tell Sparkling Stays where you are in the West Island, what kind of property you have, and what type of cleaning you need. We will connect you with the right quote path for your community.',
    faqs: [
      {
        question: 'Which West Island communities does Sparkling Stays serve?',
        answer:
          'Sparkling Stays serves Pointe-Claire, Kirkland, Pierrefonds, Dollard-des-Ormeaux, Beaconsfield, Baie-d\'Urfé, Île-Perrot, Sainte-Anne-de-Bellevue, Senneville, and surrounding West Island neighborhoods.'
      },
      {
        question: 'Do you offer both residential and commercial cleaning in the West Island?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning, deep cleaning, and one-time visits for residences, as well as office and commercial cleaning for businesses across the West Island.'
      },
      {
        question: 'How do I find the page for my specific West Island neighborhood?',
        answer:
          'Visit our service areas page to find your specific community. Major West Island neighborhoods each have their own dedicated page with local service details.'
      },
      {
        question: 'What should I include in a West Island quote request?',
        answer:
          'Include your specific West Island community, property type, approximate size, preferred schedule, and the type of cleaning you need so we can route your request to the right service path.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial dans l\'Ouest-de-l\'Île de Montréal, couvrant Pointe-Claire, Kirkland, Pierrefonds, Dollard-des-Ormeaux, Beaconsfield, Baie-d\'Urfé, Île-Perrot et les communautés environnantes.',
    intro:
      'L\'Ouest-de-l\'Île est l\'une des régions de service les plus actives de Sparkling Stays, s\'étendant sur un large corridor allant de Lachine et Saint-Laurent à l\'est jusqu\'à Île-Perrot à l\'extrême ouest. Cette page-hub relie les visiteurs à nos pages de quartiers individuelles tout en offrant un aperçu global de la couverture de nettoyage dans l\'Ouest-de-l\'Île.',
    supportTitle: 'Besoins de nettoyage courants dans l\'Ouest-de-l\'Île',
    supportPoints: [
      'Entretien ménager récurrent pour maisons familiales, condos et maisons de ville dans toutes les communautés de l\'Ouest-de-l\'Île',
      'Grand ménage et remises à neuf saisonnières pour les propriétés suburbaines plus grandes',
      'Nettoyage commercial pour bureaux, cliniques et espaces professionnels du corridor de l\'Ouest-de-l\'Île',
      'Demandes spécialisées incluant nettoyage après rénovation, turnovers Airbnb, nettoyage de fenêtres et service lié aux déménagements'
    ],
    whyTitle: 'Pourquoi l\'Ouest-de-l\'Île a sa propre page-hub',
    whyBody:
      'L\'Ouest-de-l\'Île regroupe des dizaines de communautés distinctes, chacune avec son propre caractère résidentiel. Une page-hub aide les clients qui cherchent « nettoyage Ouest-de-l\'Île » de manière large à trouver le bon point de départ, tandis que les pages de quartiers individuelles gèrent l\'intention locale plus précise. Ensemble, cette structure donne à Sparkling Stays une couverture régionale plus forte sans dépendre d\'une seule page générique.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes de l\'Ouest-de-l\'Île',
    serviceFocusBody:
      'Les demandes de l\'Ouest-de-l\'Île sont orientées selon l\'emplacement précis du client, le type de propriété et les besoins de nettoyage. Qu\'il s\'agisse d\'une maison de ville à Kirkland, d\'un domaine en bord de lac à Beaconsfield ou d\'un appartement à Pierrefonds, le processus de devis utilise les détails locaux pour trouver le bon parcours de service au lieu de traiter toute la région comme un marché indifférencié.',
    coverageTitle: 'Communautés de l\'Ouest-de-l\'Île que nous desservons',
    coverageBody:
      'Sparkling Stays dessert activement Pointe-Claire, Kirkland, Pierrefonds, Dollard-des-Ormeaux, Beaconsfield, Baie-d\'Urfé, Île-Perrot, Sainte-Anne-de-Bellevue, Senneville et les quartiers environnants. Chacune de nos communautés principales a sa propre page locale dédiée avec des informations de service spécifiques au secteur.',
    localHighlightsTitle: 'Ce que la page-hub de l\'Ouest-de-l\'Île communique',
    localHighlights: [
      'L\'Ouest-de-l\'Île est l\'un des marchés régionaux les plus prioritaires de Sparkling Stays',
      'Les pages de quartiers individuelles offrent un contexte local plus précis pour chaque communauté',
      'Les demandes résidentielles et commerciales sont toutes deux supportées dans le corridor',
      'La page-hub renforce le SEO régional tout en connectant vers des pages locales plus profondes'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage dans l\'Ouest-de-l\'Île?',
    ctaBody:
      'Dites à Sparkling Stays où vous êtes dans l\'Ouest-de-l\'Île, quel type de propriété vous avez et quel type de nettoyage vous recherchez. Nous vous connecterons au bon parcours de devis pour votre communauté.',
    faqs: [
      {
        question: 'Quelles communautés de l\'Ouest-de-l\'Île Sparkling Stays dessert-il?',
        answer:
          'Sparkling Stays dessert Pointe-Claire, Kirkland, Pierrefonds, Dollard-des-Ormeaux, Beaconsfield, Baie-d\'Urfé, Île-Perrot, Sainte-Anne-de-Bellevue, Senneville et les quartiers environnants de l\'Ouest-de-l\'Île.'
      },
      {
        question: 'Offrez-vous du nettoyage résidentiel et commercial dans l\'Ouest-de-l\'Île?',
        answer:
          'Oui. Sparkling Stays offre l\'entretien ménager récurrent, le grand ménage et les visites ponctuelles pour les résidences, ainsi que le nettoyage de bureaux et commercial pour les entreprises de l\'Ouest-de-l\'Île.'
      },
      {
        question: 'Comment trouver la page de mon quartier spécifique dans l\'Ouest-de-l\'Île?',
        answer:
          'Visitez notre page de secteurs pour trouver votre communauté. Les quartiers majeurs de l\'Ouest-de-l\'Île ont chacun leur propre page dédiée avec des détails de service locaux.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour l\'Ouest-de-l\'Île?',
        answer:
          'Indiquez votre communauté précise dans l\'Ouest-de-l\'Île, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin afin que nous puissions orienter votre demande vers le bon parcours.'
      }
    ]
  }
};

const saintLaurentOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Saint-Laurent, with positioning tailored to the borough\'s mix of industrial-adjacent offices, family homes, apartment buildings, and growing condo developments along the Thimens and Marcel-Laurin corridors.',
    intro:
      'Saint-Laurent sits at the crossroads of central Montreal and the West Island, making it one of the more versatile service areas in the Sparkling Stays network. The borough combines dense residential pockets with a significant commercial and industrial base, creating demand for both home cleaning and office cleaning that a generic "Montreal" page does not address clearly enough.',
    supportTitle: 'Most common cleaning needs in Saint-Laurent',
    supportPoints: [
      'Recurring home cleaning for apartments, condos, townhomes, and family homes across the borough',
      'Deep cleaning and seasonal reset visits for busy households',
      'Office and commercial cleaning for businesses in Saint-Laurent\'s industrial and commercial parks',
      'Specialty requests such as post-renovation cleanup, move-related cleaning, and window cleaning'
    ],
    whyTitle: 'Why Saint-Laurent matters in the neighborhood rollout',
    whyBody:
      'Saint-Laurent bridges the gap between the downtown Montreal cluster and the West Island corridor, and its dual residential-commercial character means clients here search with different intent than either pure suburban or pure downtown users. A dedicated local page captures that search demand more effectively and helps both homeowners and business managers find the right entry point.',
    serviceFocusTitle: 'How Sparkling Stays handles Saint-Laurent requests',
    serviceFocusBody:
      'Saint-Laurent requests are routed based on whether the need is residential or commercial, the property type, and the cleaning scope. The borough\'s density means requests range from small apartment cleanings to larger office-space contracts, so the quote process adapts accordingly rather than assuming a single property profile.',
    coverageTitle: 'Coverage framing for Saint-Laurent clients',
    coverageBody:
      'We position Saint-Laurent as its own service area rather than lumping it under a broad Montreal label. That helps residents near Côte-Vertu, Du Collège, and the Thimens corridor see that local cleaning support is available without needing to search through a city-wide page.',
    localHighlightsTitle: 'What this Saint-Laurent page helps communicate',
    localHighlights: [
      'Saint-Laurent is treated as an active local market bridging downtown and the West Island',
      'Both residential and commercial/office cleaning requests are supported from this page',
      'The page addresses the borough\'s mixed-use character rather than defaulting to generic messaging',
      'Local SEO coverage is strengthened for Montreal-to-West-Island search corridors'
    ],
    ctaTitle: 'Need cleaning services in Saint-Laurent?',
    ctaBody:
      'Tell Sparkling Stays what kind of space you have in Saint-Laurent — home, condo, office, or commercial — and we will guide you to the right quote path.',
    faqs: [
      {
        question: 'Do you offer both home and office cleaning in Saint-Laurent?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning for apartments, condos, and houses in Saint-Laurent, as well as office and commercial cleaning for businesses in the borough\'s commercial parks.'
      },
      {
        question: 'Which areas of Saint-Laurent do you cover?',
        answer:
          'Coverage includes residential neighborhoods near Côte-Vertu, Du Collège, the Thimens corridor, Marcel-Laurin, and surrounding areas throughout the borough.'
      },
      {
        question: 'Why does Saint-Laurent have its own local page?',
        answer:
          'Saint-Laurent bridges downtown Montreal and the West Island with a unique mix of residential and commercial demand that is better served by its own dedicated page.'
      },
      {
        question: 'What should I include in a Saint-Laurent quote request?',
        answer:
          'Include whether the space is residential or commercial, the property type, approximate size, preferred schedule, and the type of cleaning you need.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Saint-Laurent, avec un positionnement adapté au mélange de bureaux près des zones industrielles, de maisons familiales, d\'immeubles à appartements et de développements de condos le long des corridors Thimens et Marcel-Laurin.',
    intro:
      'Saint-Laurent se situe au carrefour du centre de Montréal et de l\'Ouest-de-l\'Île, ce qui en fait l\'un des secteurs de service les plus polyvalents du réseau Sparkling Stays. L\'arrondissement combine des poches résidentielles denses avec une base commerciale et industrielle importante, créant une demande pour le nettoyage résidentiel et le nettoyage de bureaux qu\'une page générique « Montréal » n\'adresse pas assez clairement.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Saint-Laurent',
    supportPoints: [
      'Entretien ménager récurrent pour appartements, condos, maisons de ville et maisons familiales dans l\'arrondissement',
      'Grand ménage et remises à neuf saisonnières pour les foyers occupés',
      'Nettoyage de bureaux et commercial pour les entreprises des parcs industriels et commerciaux de Saint-Laurent',
      'Demandes spécialisées comme nettoyage après rénovation, ménage lié au déménagement et nettoyage de fenêtres'
    ],
    whyTitle: 'Pourquoi Saint-Laurent compte dans le déploiement des quartiers',
    whyBody:
      'Saint-Laurent fait le pont entre le cluster du centre-ville et le corridor de l\'Ouest-de-l\'Île, et son double caractère résidentiel-commercial signifie que les clients d\'ici cherchent avec une intention différente de celle des usagers purement suburbains ou purement du centre-ville. Une page locale dédiée capte cette demande plus efficacement et aide autant les propriétaires que les gestionnaires d\'entreprise à trouver le bon point d\'entrée.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Saint-Laurent',
    serviceFocusBody:
      'Les demandes de Saint-Laurent sont orientées selon que le besoin est résidentiel ou commercial, le type de propriété et la portée du nettoyage. La densité de l\'arrondissement fait que les demandes vont du nettoyage de petit appartement aux contrats plus importants pour espaces de bureaux, et le processus de devis s\'adapte en conséquence.',
    coverageTitle: 'Comment nous présentons la couverture à Saint-Laurent',
    coverageBody:
      'Nous positionnons Saint-Laurent comme son propre secteur de service au lieu de le fondre sous une étiquette large de Montréal. Cela aide les résidents près de Côte-Vertu, Du Collège et du corridor Thimens à voir que du soutien local en nettoyage est disponible sans devoir naviguer dans une page à l\'échelle de la ville.',
    localHighlightsTitle: 'Ce que cette page Saint-Laurent permet de mieux communiquer',
    localHighlights: [
      'Saint-Laurent est traité comme un marché local actif faisant le pont entre le centre-ville et l\'Ouest-de-l\'Île',
      'Les demandes résidentielles et commerciales/bureaux sont toutes deux supportées depuis cette page',
      'La page tient compte du caractère mixte de l\'arrondissement au lieu de se contenter d\'un message générique',
      'La couverture SEO locale est renforcée pour les corridors de recherche Montréal-Ouest-de-l\'Île'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Saint-Laurent?',
    ctaBody:
      'Dites à Sparkling Stays quel type d\'espace vous avez à Saint-Laurent — maison, condo, bureau ou commercial — et nous vous orienterons vers le bon parcours de devis.',
    faqs: [
      {
        question: 'Offrez-vous du nettoyage résidentiel et de bureaux à Saint-Laurent?',
        answer:
          'Oui. Sparkling Stays offre l\'entretien ménager récurrent pour appartements, condos et maisons à Saint-Laurent, ainsi que le nettoyage de bureaux et commercial pour les entreprises des parcs commerciaux de l\'arrondissement.'
      },
      {
        question: 'Quels secteurs de Saint-Laurent couvrez-vous?',
        answer:
          'La couverture inclut les quartiers résidentiels près de Côte-Vertu, Du Collège, le corridor Thimens, Marcel-Laurin et les secteurs environnants dans tout l\'arrondissement.'
      },
      {
        question: 'Pourquoi Saint-Laurent a-t-il sa propre page locale?',
        answer:
          'Saint-Laurent fait le pont entre le centre-ville et l\'Ouest-de-l\'Île avec un mélange unique de demande résidentielle et commerciale qui est mieux servi par sa propre page dédiée.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Saint-Laurent?',
        answer:
          'Indiquez si l\'espace est résidentiel ou commercial, le type de propriété, la taille approximative, l\'horaire souhaité et le type de nettoyage dont vous avez besoin.'
      }
    ]
  }
};

const bouchervilleOverrides: Record<Locale, Omit<AreaContent, 'name' | 'hubLabel'>> = {
  en: {
    description:
      'Sparkling Stays provides residential and commercial cleaning services in Boucherville, with South Shore positioning tailored to the city\'s established family neighborhoods, waterfront areas along the St. Lawrence, and growing professional demand from households that value a cleaner local service experience.',
    intro:
      'Boucherville is one of the most desirable South Shore communities, known for its blend of heritage charm near the Old Village, established family neighborhoods, and newer residential developments. This creates cleaning demand from homeowners who care about quality and want a provider that treats Boucherville as a real market rather than a footnote on a broader South Shore page.',
    supportTitle: 'Most common cleaning needs in Boucherville',
    supportPoints: [
      'Recurring home cleaning for established family homes, newer developments, and waterfront-adjacent properties',
      'Deep cleaning and seasonal reset visits for larger homes and heritage properties near the Old Village',
      'Commercial cleaning for offices and professional spaces in Boucherville\'s business parks',
      'Specialty requests such as move-related cleaning, post-renovation cleanup, and window cleaning'
    ],
    whyTitle: 'Why Boucherville matters in the South Shore rollout',
    whyBody:
      'Boucherville adds an upmarket residential dimension to the South Shore cluster that complements the higher-volume markets of Brossard and Longueuil. Clients here often have higher service expectations and want a provider that understands the difference between a routine condo clean and a detailed family-home visit in an established neighborhood.',
    serviceFocusTitle: 'How Sparkling Stays handles Boucherville requests',
    serviceFocusBody:
      'Boucherville requests are evaluated with the same quote-first logic used across the site, but the local property mix — larger established homes, heritage properties, and upscale newer builds — means the quote process pays closer attention to square footage, property condition, and any special care requirements.',
    coverageTitle: 'Coverage framing for Boucherville clients',
    coverageBody:
      'We present Boucherville as an active South Shore service area so residents near the Old Village, De Montarville, and surrounding family neighborhoods can confirm local coverage before requesting a quote. That local framing matters for clients who expect a more polished service experience.',
    localHighlightsTitle: 'What this Boucherville page helps communicate',
    localHighlights: [
      'Boucherville is positioned as a quality-focused South Shore service area',
      'The page speaks to both established-home and newer-development cleaning demand',
      'Commercial and office cleaning requests from Boucherville\'s business parks are also supported',
      'The stronger local messaging builds the South Shore SEO cluster while preserving the reusable architecture'
    ],
    ctaTitle: 'Need cleaning services in Boucherville?',
    ctaBody:
      'Tell Sparkling Stays what kind of property you have in Boucherville, your preferred schedule, and the level of cleaning support you need. We will guide you to the right next step.',
    faqs: [
      {
        question: 'Do you offer recurring house cleaning in Boucherville?',
        answer:
          'Yes. Sparkling Stays supports recurring home cleaning in Boucherville for established family homes, newer builds, and waterfront-adjacent properties, along with one-time and deeper cleaning visits.'
      },
      {
        question: 'Do you serve the Old Village area of Boucherville?',
        answer:
          'Yes. Boucherville coverage includes the Old Village, De Montarville, and surrounding residential areas throughout the city.'
      },
      {
        question: 'Can businesses in Boucherville request commercial cleaning?',
        answer:
          'Yes. Offices and professional spaces in Boucherville\'s business parks can request commercial cleaning support when the scope and schedule are a fit.'
      },
      {
        question: 'What should I include in a Boucherville quote request?',
        answer:
          'Include your area in Boucherville, property type, approximate size, preferred schedule, and whether you need recurring, one-time, deep, commercial, or specialty cleaning.'
      }
    ]
  },
  fr: {
    description:
      'Sparkling Stays offre des services de nettoyage résidentiel et commercial à Boucherville, avec un positionnement Rive-Sud adapté aux quartiers familiaux établis, aux secteurs riverains le long du Saint-Laurent et à la demande professionnelle croissante des foyers qui valorisent un service local de qualité.',
    intro:
      'Boucherville est l\'une des communautés les plus recherchées de la Rive-Sud, reconnue pour son mélange de charme patrimonial près du Vieux-Boucherville, de quartiers familiaux établis et de développements résidentiels plus récents. Cela crée une demande de nettoyage venant de propriétaires exigeants qui veulent un fournisseur traitant Boucherville comme un vrai marché et non comme une note en bas de page sur une page Rive-Sud plus large.',
    supportTitle: 'Besoins de nettoyage les plus fréquents à Boucherville',
    supportPoints: [
      'Entretien ménager récurrent pour maisons familiales établies, développements récents et propriétés près du fleuve',
      'Grand ménage et remises à neuf saisonnières pour les grandes maisons et propriétés patrimoniales près du Vieux-Boucherville',
      'Nettoyage commercial pour bureaux et espaces professionnels dans les parcs d\'affaires de Boucherville',
      'Demandes spécialisées comme ménage lié au déménagement, nettoyage après rénovation et nettoyage de fenêtres'
    ],
    whyTitle: 'Pourquoi Boucherville compte dans le déploiement de la Rive-Sud',
    whyBody:
      'Boucherville ajoute une dimension résidentielle haut de gamme au cluster de la Rive-Sud qui complète les marchés à plus fort volume de Brossard et Longueuil. Les clients d\'ici ont souvent des attentes de service plus élevées et veulent un fournisseur qui comprend la différence entre un nettoyage de condo de routine et une visite détaillée de maison familiale dans un quartier établi.',
    serviceFocusTitle: 'Comment Sparkling Stays traite les demandes à Boucherville',
    serviceFocusBody:
      'Les demandes de Boucherville sont évaluées avec la même logique de devis que le reste du site, mais le mélange de propriétés local — grandes maisons établies, propriétés patrimoniales et constructions récentes haut de gamme — fait que le processus de devis accorde plus d\'attention à la superficie, l\'état de la propriété et les exigences particulières d\'entretien.',
    coverageTitle: 'Comment nous présentons la couverture à Boucherville',
    coverageBody:
      'Nous présentons Boucherville comme un secteur de service actif sur la Rive-Sud afin que les résidents près du Vieux-Boucherville, de De Montarville et des quartiers familiaux environnants puissent confirmer la couverture locale avant de demander un devis. Ce cadrage local compte pour les clients qui s\'attendent à un service plus soigné.',
    localHighlightsTitle: 'Ce que cette page Boucherville permet de mieux communiquer',
    localHighlights: [
      'Boucherville est positionné comme un secteur de service axé sur la qualité sur la Rive-Sud',
      'La page s\'adresse à la demande de nettoyage des maisons établies comme des développements récents',
      'Les demandes commerciales et de bureaux provenant des parcs d\'affaires de Boucherville sont aussi supportées',
      'Le message local plus fort construit le cluster SEO de la Rive-Sud tout en gardant l\'architecture réutilisable'
    ],
    ctaTitle: 'Besoin d\'un service de nettoyage à Boucherville?',
    ctaBody:
      'Expliquez à Sparkling Stays le type de propriété que vous avez à Boucherville, votre horaire préféré et le niveau de soutien en nettoyage dont vous avez besoin. Nous vous orienterons vers la bonne prochaine étape.',
    faqs: [
      {
        question: 'Offrez-vous un entretien ménager récurrent à Boucherville?',
        answer:
          'Oui. Sparkling Stays offre un entretien ménager récurrent à Boucherville pour maisons familiales établies, constructions récentes et propriétés proches du fleuve, ainsi que des visites ponctuelles et des grands ménages.'
      },
      {
        question: 'Desservez-vous le secteur du Vieux-Boucherville?',
        answer:
          'Oui. La couverture de Boucherville inclut le Vieux-Boucherville, De Montarville et les secteurs résidentiels environnants dans toute la ville.'
      },
      {
        question: 'Les entreprises à Boucherville peuvent-elles demander un nettoyage commercial?',
        answer:
          'Oui. Les bureaux et espaces professionnels dans les parcs d\'affaires de Boucherville peuvent demander un service commercial lorsque la portée et l\'horaire conviennent.'
      },
      {
        question: 'Que faut-il inclure dans une demande de devis pour Boucherville?',
        answer:
          'Indiquez votre secteur à Boucherville, le type de propriété, la taille approximative, l\'horaire souhaité et si vous avez besoin d\'un service récurrent, ponctuel, d\'un grand ménage, commercial ou spécialisé.'
      }
    ]
  }
};

function getAreaContent(locale: Locale, slug: string): AreaContent | null {
  const neighborhood = neighborhoods.find((item) => item.slug === slug);
  const hub = hubs[slug as keyof typeof hubs];

  if (!neighborhood && !hub) return null;

  const name = neighborhood?.name ?? hub?.[locale];
  const hubLabel = neighborhood ? hubs[neighborhood.hub as keyof typeof hubs]?.[locale] ?? neighborhood.hub : undefined;

  if (!name) return null;

  const baseContent: AreaContent = {
    name,
    hubLabel,
    description:
      locale === 'fr'
        ? `Sparkling Stays offre des services de nettoyage résidentiel et commercial à ${name}${hubLabel ? `, dans le secteur ${hubLabel},` : ''} avec un parcours simple pour les devis, les réservations et les demandes spécialisées.`
        : `Sparkling Stays offers residential and commercial cleaning services in ${name}${hubLabel ? ` within the ${hubLabel} area,` : ''} with a straightforward path for quotes, bookings, and specialty cleaning requests.`,
    intro:
      locale === 'fr'
        ? `${name} fait partie des secteurs prioritaires de Sparkling Stays dans le Grand Montréal. Cette page sert de point d’entrée local pour les clients qui recherchent un entretien ménager récurrent, un grand ménage, un nettoyage commercial ou un besoin plus spécialisé dans leur secteur.`
        : `${name} is one of Sparkling Stays’ priority local service areas in Greater Montreal. This page acts as a local entry point for clients looking for recurring home cleaning, deep cleaning, commercial support, or more specialized cleaning in their area.`,
    supportTitle: locale === 'fr' ? `Services courants à ${name}` : `Common cleaning needs in ${name}`,
    supportPoints:
      locale === 'fr'
        ? [
            'Entretien ménager résidentiel récurrent',
            'Grand ménage et remises à neuf ponctuelles',
            'Nettoyage commercial pour bureaux et espaces recevant des clients',
            'Turnovers Airbnb, nettoyage de fenêtres et demandes spécialisées'
          ]
        : [
            'Recurring residential cleaning',
            'Deep cleaning and one-time reset visits',
            'Commercial cleaning for offices and client-facing spaces',
            'Airbnb turnover support, window cleaning, and specialty requests'
          ],
    whyTitle: locale === 'fr' ? `Pourquoi cette page locale compte` : `Why this local page matters`,
    whyBody:
      locale === 'fr'
        ? `Les clients veulent souvent confirmer la couverture locale avant de demander un devis. En regroupant l’information de service autour de ${name}, Sparkling Stays rend la prochaine étape plus claire pour les foyers, les entreprises et les gestionnaires qui veulent savoir si leur secteur est bien desservi.`
        : `Clients often want to confirm local coverage before requesting a quote. By organizing service information around ${name}, Sparkling Stays makes the next step clearer for households, businesses, and property managers who want to know whether their area is actively covered.`,
    serviceFocusTitle:
      locale === 'fr' ? `Comment nous accompagnons les demandes à ${name}` : `How Sparkling Stays handles requests in ${name}`,
    serviceFocusBody:
      locale === 'fr'
        ? `Nous orientons les demandes provenant de ${name} selon le type de propriété, la fréquence souhaitée et la portée du nettoyage. Cela nous permet de guider les clients résidentiels, commerciaux et spécialisés vers le bon parcours de devis sans compliquer la prise de contact.`
        : `We route requests from ${name} based on property type, service frequency, and cleaning scope. That helps us guide residential, commercial, and specialty clients toward the right quote path without making the first contact step harder.`,
    coverageTitle: locale === 'fr' ? `Couverture de service à ${name}` : `Service coverage in ${name}`,
    coverageBody:
      locale === 'fr'
        ? `Cette page aide à confirmer que ${name} fait partie des secteurs suivis par Sparkling Stays dans le Grand Montréal, avec un accompagnement bilingue et des services adaptés aux besoins résidentiels comme commerciaux.`
        : `This page helps confirm that ${name} is part of Sparkling Stays’ active Greater Montreal coverage, with bilingual support and service options that can fit both residential and commercial needs.`,
    localHighlightsTitle: locale === 'fr' ? `En bref pour ${name}` : `At a glance for ${name}`,
    localHighlights:
      locale === 'fr'
        ? [
            `${name} fait partie des secteurs locaux prioritaires pour Sparkling Stays`,
            'Les demandes résidentielles, commerciales et spécialisées peuvent commencer ici',
            'Le service est présenté clairement pour aider à la demande de devis',
            'La page soutient la croissance SEO locale tout en gardant un gabarit réutilisable'
          ]
        : [
            `${name} is one of Sparkling Stays’ priority local pages`,
            'Residential, commercial, and specialty cleaning requests can start here',
            'The page clarifies local coverage before the quote request stage',
            'It supports local SEO growth while keeping the reusable template intact'
          ],
    ctaTitle: locale === 'fr' ? `Besoin d’un service de nettoyage à ${name}?` : `Need cleaning services in ${name}?`,
    ctaBody:
      locale === 'fr'
        ? `Demandez un devis à Sparkling Stays et obtenez le bon parcours pour votre propriété, votre horaire et le type de nettoyage dont vous avez besoin.`
        : `Request a quote from Sparkling Stays and get the right path for your property, your schedule, and the kind of cleaning support you need.`,
    faqs: areaFaqs[locale](name)
  };

  if (slug === 'laval') {
    return {
      ...baseContent,
      ...lavalOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'brossard') {
    return {
      ...baseContent,
      ...brossardOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'longueuil') {
    return {
      ...baseContent,
      ...longueuilOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'pointe-claire') {
    return {
      ...baseContent,
      ...pointeClaireOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'kirkland') {
    return {
      ...baseContent,
      ...kirklandOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'dollard-des-ormeaux') {
    return {
      ...baseContent,
      ...ddoOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'pierrefonds') {
    return {
      ...baseContent,
      ...pierrefondsOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'chambly') {
    return {
      ...baseContent,
      ...chamblyOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'saint-constant') {
    return {
      ...baseContent,
      ...saintConstantOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'ile-perrot') {
    return {
      ...baseContent,
      ...ilePerrotOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'west-island') {
    return {
      ...baseContent,
      ...westIslandHubOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'saint-laurent') {
    return {
      ...baseContent,
      ...saintLaurentOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'boucherville') {
    return {
      ...baseContent,
      ...bouchervilleOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'ville-marie') {
    return {
      ...baseContent,
      ...villeMarieOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'beaconsfield') {
    return {
      ...baseContent,
      ...beaconsfieldOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'baie-d-urfe') {
    return {
      ...baseContent,
      ...baieDUrfeOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'westmount') {
    return {
      ...baseContent,
      ...westmountOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'saint-hubert') {
    return {
      ...baseContent,
      ...saintHubertOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'plateau-mont-royal') {
    return {
      ...baseContent,
      ...plateauOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'lachine') {
    return {
      ...baseContent,
      ...lachineOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'cote-des-neiges') {
    return {
      ...baseContent,
      ...cdnOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'ndg') {
    return {
      ...baseContent,
      ...ndgOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'rosemont') {
    return {
      ...baseContent,
      ...rosemontOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'lasalle') {
    return {
      ...baseContent,
      ...lasalleOverrides[locale],
      name,
      hubLabel
    };
  }

  if (slug === 'vaudreuil-dorion') {
    return {
      ...baseContent,
      ...vaudreuilOverrides[locale],
      name,
      hubLabel
    };
  }

  return baseContent;
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale, slug} = await params;
  const content = getAreaContent(locale as Locale, slug);

  if (!content) return {};

  return {
    title:
      locale === 'fr'
        ? `Nettoyage à ${content.name} | Sparkling Stays`
        : `Cleaning Services in ${content.name} | Sparkling Stays`,
    description: content.description,
    alternates: {
      canonical: getCanonical(locale, `/areas/${slug}`),
      languages: {
        'en-CA': `${siteConfig.url}/en/areas/${slug}`,
        'fr-CA': `${siteConfig.url}/fr/areas/${slug}`
      }
    }
  };
}

export default async function AreaDetailPage({params}: {params: Params}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);
  const content = getAreaContent(locale as Locale, slug);

  if (!content) {
    notFound();
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />

      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: locale === 'fr' ? 'Secteurs' : 'Areas', href: '/areas'},
              {label: content.name}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">
            {locale === 'fr' ? 'Secteur local' : 'Local service area'}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">
            {locale === 'fr' ? `Nettoyage à ${content.name}` : `Cleaning Services in ${content.name}`}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="text-base leading-8 text-slate-700">{content.intro}</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.whyTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.whyBody}</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.serviceFocusTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.serviceFocusBody}</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.coverageTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.coverageBody}</p>
            </div>
          </div>
          <aside className="space-y-8">
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.supportTitle}</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                {content.supportPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.localHighlightsTitle}</h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                {content.localHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <FAQAccordion items={content.faqs} />
      </section>

      <section className="bg-[#1a1a2e] py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{content.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">{content.ctaBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" locale={locale}>{locale === 'fr' ? 'Demander un devis' : 'Request a quote'}</CTAButton>
            <CTAButton href="/book-now" locale={locale} variant="secondary">{locale === 'fr' ? 'Réserver' : 'Book now'}</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
