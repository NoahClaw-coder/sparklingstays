import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import services from '@/content/data/services.json';
import {siteConfig, getCanonical} from '@/lib/seo';
import {CTAButton} from '@/components/ui/CTAButton';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';

type Params = Promise<{locale: string; service: string}>;

type ServicePageContent = {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  directAnswer: string;
  lastUpdated: string;
  sections: {
    whyTitle: string;
    whyBody: string;
    includedTitle: string;
    includedItems: string[];
    fitTitle: string;
    fitBody: string;
    processTitle: string;
    processItems: string[];
    trustTitle: string;
    trustItems: string[];
    faqTitle: string;
    faqs: {question: string; answer: string}[];
  };
  ctas: {primary: string; secondary: string; contact: string};
  metaTitle: string;
  metaDescription: string;
  areaServed: string[];
  heroCtaTitle: string;
  heroCtaBody: string;
};

const servicePageContent = {
  'home-cleaning': {
    en: {
      title: 'Home Cleaning Services in Montreal',
      description:
        'Sparkling Stays provides recurring and one-time home cleaning services in Montreal, Laval, the West Island, and the South Shore with bilingual support and dependable scheduling.',
      eyebrow: 'Residential cleaning in Greater Montreal',
      intro:
        'Sparkling Stays offers home cleaning services in Montreal for busy households that want a clean, comfortable space without the stress of handling every detail alone. We serve condos, apartments, family homes, and move-related cleanups across Montreal, Laval, the West Island, and the South Shore.',
      directAnswer:
        'If you need reliable home cleaning in Montreal, Sparkling Stays handles recurring housekeeping, one-time resets, and detail-focused visits tailored to your space. Our bilingual team helps homeowners and tenants keep kitchens, bathrooms, bedrooms, and shared living areas consistently clean with scheduling that fits real life.',
      lastUpdated: 'Last updated: April 2026',
      sections: {
        whyTitle: 'What our home cleaning service covers',
        whyBody:
          'We build cleaning visits around how people actually live in their homes. That means focusing on kitchens that get used every day, bathrooms that need consistent sanitizing, floors that collect dust and debris, and living spaces that should feel calm and guest-ready. Whether you want weekly support, biweekly maintenance, monthly upkeep, or a one-time refresh before a move or event, the plan is adjusted to your needs.',
        includedTitle: 'Common tasks included',
        includedItems: [
          'Kitchen counters, appliance exteriors, sinks, and high-touch surfaces',
          'Bathroom cleaning and sanitizing for showers, tubs, toilets, mirrors, and vanities',
          'Dusting of reachable surfaces, furniture, shelves, and décor',
          'Vacuuming and mopping of floors throughout the home',
          'Bedroom and living-area reset, including tidy finishing touches where appropriate',
          'Attention to entryways, hallways, and everyday buildup in shared spaces'
        ],
        fitTitle: 'Built for Montreal homes, condos, and apartments',
        fitBody:
          'Residential cleaning in Greater Montreal is not one-size-fits-all. Downtown condos often need efficient maintenance in smaller spaces. Family homes in Laval or the South Shore usually need a broader room-by-room routine. West Island homes often benefit from flexible recurring service that keeps up with busy weekday schedules. We adapt the visit based on layout, usage, and your priorities instead of applying a generic checklist.',
        processTitle: 'How booking works',
        processItems: [
          'Tell us about your home, your preferred schedule, and whether you need recurring or one-time cleaning.',
          'We confirm the service scope, timing, and any priorities such as bathrooms, kitchen buildup, or move-related cleaning.',
          'Our team arrives on schedule, completes the cleaning plan, and leaves your space refreshed and ready to use.'
        ],
        trustTitle: 'Why clients choose Sparkling Stays',
        trustItems: [
          'Bilingual communication in English and French',
          'Recurring and one-time residential cleaning options',
          'Coverage across Montreal, Laval, West Island, and South Shore',
          'Useful for condos, apartments, family homes, and move-related resets'
        ],
        faqTitle: 'Home cleaning FAQs',
        faqs: [
          {
            question: 'Do you offer recurring home cleaning in Montreal?',
            answer:
              'Yes. Sparkling Stays offers recurring home cleaning on weekly, biweekly, and monthly schedules, along with one-time visits when you need extra help.'
          },
          {
            question: 'Do you clean condos and apartments as well as houses?',
            answer:
              'Yes. We clean condos, apartments, and houses across Greater Montreal. The cleaning plan is adjusted to the size, layout, and priorities of the home.'
          },
          {
            question: 'Which areas do you cover for residential cleaning?',
            answer:
              'We cover Montreal, Laval, the West Island, and the South Shore. If you are just outside those areas, contact us and we can confirm availability.'
          },
          {
            question: 'Can I book a one-time cleaning before moving or after a busy period?',
            answer:
              'Absolutely. Many clients book one-time home cleaning before moving, after hosting, after travel, or when they need a full reset.'
          },
          {
            question: 'Is service available in English and French?',
            answer:
              'Yes. Sparkling Stays provides bilingual support so you can communicate comfortably in either English or French.'
          }
        ]
      },
      ctas: {
        primary: 'Book home cleaning',
        secondary: 'View pricing',
        contact: 'Contact us'
      },
      metaTitle: 'Home Cleaning Services in Montreal | Sparkling Stays',
      metaDescription:
        'Home cleaning services across Montreal, Laval, West Island, and the South Shore. Book recurring or one-time residential cleaning with Sparkling Stays.',
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore'],
      heroCtaTitle: 'Need reliable home cleaning in Montreal?',
      heroCtaBody:
        'Book recurring or one-time cleaning with Sparkling Stays and keep your home consistently clean without adding more to your week.'
    },
    fr: {
      title: 'Services d’entretien ménager résidentiel à Montréal',
      description:
        'Sparkling Stays offre des services d’entretien ménager résidentiel à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud avec un service bilingue et une planification fiable.',
      eyebrow: 'Entretien résidentiel dans le Grand Montréal',
      intro:
        'Sparkling Stays offre des services d’entretien ménager résidentiel à Montréal pour les foyers occupés qui veulent garder un espace propre et agréable sans tout gérer eux-mêmes. Nous desservons les condos, appartements, maisons familiales et nettoyages liés aux déménagements partout à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud.',
      directAnswer:
        'Si vous cherchez un service d’entretien ménager résidentiel fiable à Montréal, Sparkling Stays prend en charge l’entretien régulier, les visites ponctuelles et les nettoyages de remise à neuf adaptés à votre espace. Notre équipe bilingue aide les propriétaires et locataires à garder cuisines, salles de bain, chambres et aires de vie propres avec un horaire réaliste.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      sections: {
        whyTitle: 'Ce que comprend notre service résidentiel',
        whyBody:
          'Nous organisons chaque visite d’entretien selon la réalité du foyer. Cela veut dire porter une attention particulière aux cuisines utilisées tous les jours, aux salles de bain qui demandent une désinfection constante, aux planchers qui accumulent poussière et débris, ainsi qu’aux pièces de vie qui doivent rester accueillantes. Que vous vouliez un entretien hebdomadaire, aux deux semaines, mensuel ou un grand ménage ponctuel avant un déménagement ou un événement, le service est ajusté à vos besoins.',
        includedTitle: 'Tâches couramment incluses',
        includedItems: [
          'Comptoirs de cuisine, extérieur des électroménagers, éviers et surfaces fréquemment touchées',
          'Nettoyage et désinfection des salles de bain : douche, bain, toilette, miroirs et vanité',
          'Époussetage des surfaces accessibles, meubles, étagères et objets décoratifs',
          'Aspiration et lavage des planchers dans l’ensemble du logement',
          'Remise en ordre des chambres et des aires de vie avec une finition soignée lorsque pertinent',
          'Attention particulière aux entrées, couloirs et accumulations du quotidien'
        ],
        fitTitle: 'Adapté aux condos, appartements et maisons de Montréal',
        fitBody:
          'L’entretien résidentiel dans le Grand Montréal n’est pas uniforme. Les condos du centre-ville demandent souvent un entretien efficace dans des espaces compacts. Les maisons familiales à Laval ou sur la Rive-Sud exigent souvent une routine plus large, pièce par pièce. Les résidences de l’Ouest-de-l’Île bénéficient souvent d’un service récurrent flexible qui suit des semaines chargées. Nous adaptons la visite selon l’espace, l’utilisation des lieux et vos priorités.',
        processTitle: 'Comment la réservation fonctionne',
        processItems: [
          'Vous nous indiquez votre type de logement, l’horaire souhaité et si vous voulez un service ponctuel ou récurrent.',
          'Nous confirmons la portée du service, l’heure et les priorités comme les salles de bain, la cuisine ou un ménage lié à un déménagement.',
          'Notre équipe arrive à l’heure, effectue le plan prévu et laisse votre espace propre et prêt à être utilisé.'
        ],
        trustTitle: 'Pourquoi les clients choisissent Sparkling Stays',
        trustItems: [
          'Communication bilingue en français et en anglais',
          'Options d’entretien régulier ou ponctuel',
          'Service offert à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
          'Idéal pour condos, appartements, maisons familiales et remises à neuf'
        ],
        faqTitle: 'FAQ sur l’entretien ménager résidentiel',
        faqs: [
          {
            question: 'Offrez-vous un service d’entretien ménager récurrent à Montréal?',
            answer:
              'Oui. Sparkling Stays offre un entretien ménager hebdomadaire, aux deux semaines et mensuel, ainsi que des visites ponctuelles lorsque vous avez besoin d’aide.'
          },
          {
            question: 'Nettoyez-vous les condos et appartements en plus des maisons?',
            answer:
              'Oui. Nous entretenons des condos, appartements et maisons partout dans le Grand Montréal. Le service est ajusté à la taille du logement, à sa configuration et à vos priorités.'
          },
          {
            question: 'Quels secteurs couvrez-vous pour l’entretien résidentiel?',
            answer:
              'Nous desservons Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud. Si vous êtes juste à l’extérieur de ces secteurs, contactez-nous pour confirmer la disponibilité.'
          },
          {
            question: 'Puis-je réserver un ménage ponctuel avant un déménagement ou après une période chargée?',
            answer:
              'Oui. Plusieurs clients réservent un ménage ponctuel avant un déménagement, après une réception, au retour d’un voyage ou lorsqu’ils veulent simplement repartir à neuf.'
          },
          {
            question: 'Le service est-il offert en français et en anglais?',
            answer:
              'Oui. Sparkling Stays offre un service bilingue pour que vous puissiez organiser votre entretien dans la langue de votre choix.'
          }
        ]
      },
      ctas: {
        primary: 'Réserver un entretien',
        secondary: 'Voir les tarifs',
        contact: 'Nous contacter'
      },
      metaTitle: 'Entretien ménager résidentiel à Montréal | Sparkling Stays',
      metaDescription:
        'Entretien ménager résidentiel à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Réservez un service ponctuel ou récurrent avec Sparkling Stays.',
      areaServed: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
      heroCtaTitle: 'Besoin d’un entretien ménager résidentiel fiable à Montréal?',
      heroCtaBody:
        'Réservez un service ponctuel ou récurrent avec Sparkling Stays et gardez votre espace propre sans perdre de temps.'
    }
  },
  'maid-services': {
    en: {
      title: 'Maid Services in Montreal',
      description:
        'Sparkling Stays provides flexible maid services in Montreal for busy households that need dependable recurring help with cleaning, tidying, and day-to-day home upkeep.',
      eyebrow: 'Flexible housekeeping support across Greater Montreal',
      intro:
        'Sparkling Stays offers maid services in Montreal for households that want practical, recurring help staying on top of the home. This service is a strong fit for busy professionals, families, seniors, and anyone who wants regular cleaning support that keeps the space neat, comfortable, and easier to manage week after week.',
      directAnswer:
        'If you need maid services in Montreal, Sparkling Stays provides recurring housekeeping support tailored to your routine, priorities, and home layout. We focus on the everyday cleaning and reset work that helps kitchens, bathrooms, bedrooms, and shared spaces stay consistently clean instead of slipping into catch-up mode.',
      lastUpdated: 'Last updated: April 2026',
      sections: {
        whyTitle: 'What our maid service is designed to handle',
        whyBody:
          'Maid service is ideal when you want more regular household support than a one-time cleaning visit. Instead of waiting for buildup to become overwhelming, recurring visits help maintain a cleaner baseline throughout the home. We focus on the rooms that affect day-to-day comfort most, while keeping the service flexible enough to reflect how your household actually lives.',
        includedTitle: 'Common maid-service tasks',
        includedItems: [
          'Kitchen upkeep including counters, sinks, appliance exteriors, and visible everyday mess',
          'Bathroom cleaning and sanitizing for toilets, tubs, showers, mirrors, and vanities',
          'Dusting of accessible surfaces, furniture, shelves, and frequently used living areas',
          'Vacuuming and mopping of floors throughout the home',
          'Bedroom and common-area straightening with a clean, reset finish',
          'Attention to high-touch surfaces, entryways, and the lived-in spaces that get messy fastest'
        ],
        fitTitle: 'A practical fit for busy households that need consistent help',
        fitBody:
          'Many Montreal clients choose maid services because regular upkeep is harder to maintain around work, childcare, commuting, or mobility constraints. Some want weekly help to stay ahead of the mess. Others prefer biweekly support to keep the home from falling behind. Whether you live in a downtown condo, a family home in Laval, or a house on the South Shore, the goal is the same: steady support that makes home life easier.',
        processTitle: 'How maid-service booking works',
        processItems: [
          'Tell us about your home, preferred frequency, and the rooms or tasks you want handled most consistently.',
          'We confirm the service scope, scheduling rhythm, and any household priorities so the visits match your routine.',
          'Our team arrives on schedule, completes the agreed housekeeping plan, and helps keep your home cleaner from one visit to the next.'
        ],
        trustTitle: 'Why households book Sparkling Stays for maid service',
        trustItems: [
          'Ideal for weekly, biweekly, or ongoing housekeeping support',
          'Bilingual communication in English and French',
          'Service across Montreal, Laval, the West Island, and the South Shore',
          'Helpful for professionals, families, seniors, and households that want consistent home upkeep'
        ],
        faqTitle: 'Maid service FAQs',
        faqs: [
          {
            question: 'How are maid services different from one-time cleaning?',
            answer:
              'Maid services are typically scheduled on a recurring basis so the home stays under control over time. One-time cleaning is better for occasional resets, while maid service is better for ongoing household support.'
          },
          {
            question: 'Can I book maid service weekly or every two weeks?',
            answer:
              'Yes. Sparkling Stays offers weekly, biweekly, and other recurring schedules depending on your needs, home size, and preferred routine.'
          },
          {
            question: 'Do maid services include bathrooms, kitchens, and floors?',
            answer:
              'Yes. Those are usually the core focus areas, along with dusting, tidying, and general upkeep in bedrooms and living spaces based on the agreed scope.'
          },
          {
            question: 'Which areas do you serve for maid services?',
            answer:
              'We provide maid services across Montreal, Laval, the West Island, and the South Shore. Reach out if you want to confirm availability for a nearby area.'
          },
          {
            question: 'Is maid service available in English and French?',
            answer:
              'Yes. Sparkling Stays provides bilingual support so ongoing scheduling and service communication can happen in either language.'
          }
        ]
      },
      ctas: {
        primary: 'Book maid service',
        secondary: 'View pricing',
        contact: 'Contact us'
      },
      metaTitle: 'Maid Services in Montreal | Sparkling Stays',
      metaDescription:
        'Flexible maid services in Montreal for recurring housekeeping and regular home upkeep. Sparkling Stays serves Montreal, Laval, West Island, and the South Shore.',
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore'],
      heroCtaTitle: 'Need reliable housekeeping help that fits your routine?',
      heroCtaBody:
        'Book recurring maid service with Sparkling Stays and keep your home cleaner, calmer, and easier to stay on top of every week.'
    },
    fr: {
      title: 'Services de femme de ménage à Montréal',
      description:
        'Sparkling Stays offre des services de femme de ménage à Montréal pour les foyers occupés qui ont besoin d’une aide fiable et récurrente pour le ménage, la remise en ordre et l’entretien courant.',
      eyebrow: 'Aide ménagère flexible dans le Grand Montréal',
      intro:
        'Sparkling Stays offre des services de femme de ménage à Montréal pour les foyers qui veulent un soutien concret et récurrent afin de garder la maison en ordre. Ce service convient bien aux professionnels occupés, aux familles, aux aînés et à toute personne qui veut une aide régulière pour garder l’espace propre, confortable et plus facile à gérer semaine après semaine.',
      directAnswer:
        'Si vous cherchez des services de femme de ménage à Montréal, Sparkling Stays offre un soutien ménager récurrent adapté à votre routine, à vos priorités et à la configuration de votre logement. Nous nous concentrons sur l’entretien quotidien qui aide les cuisines, salles de bain, chambres et aires communes à rester propres de façon constante, plutôt que de retomber sans cesse dans le rattrapage.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      sections: {
        whyTitle: 'À quoi sert notre service de femme de ménage',
        whyBody:
          'Le service de femme de ménage convient lorsque vous voulez un soutien plus régulier qu’une simple visite ponctuelle. Au lieu d’attendre que l’accumulation devienne difficile à gérer, des visites récurrentes permettent de maintenir une meilleure base de propreté dans toute la maison. Nous accordons la priorité aux pièces qui influencent le plus le confort au quotidien, tout en gardant une approche assez flexible pour refléter la vraie vie du foyer.',
        includedTitle: 'Tâches couramment incluses',
        includedItems: [
          'Entretien de la cuisine, y compris comptoirs, évier, extérieur des électroménagers et désordre visible du quotidien',
          'Nettoyage et désinfection des salles de bain : toilettes, bain, douche, miroirs et vanités',
          'Époussetage des surfaces accessibles, meubles, étagères et aires de vie souvent utilisées',
          'Aspiration et lavage des planchers dans l’ensemble du logement',
          'Remise en ordre des chambres et des espaces communs avec une finition propre et soignée',
          'Attention particulière aux surfaces fréquemment touchées, aux entrées et aux zones qui se salissent le plus vite'
        ],
        fitTitle: 'Un bon choix pour les foyers occupés qui veulent une aide constante',
        fitBody:
          'Plusieurs clients à Montréal choisissent ce service parce qu’il devient difficile de suivre l’entretien régulier avec le travail, les enfants, les déplacements ou certaines limites physiques. Certains veulent une visite hebdomadaire pour rester en contrôle. D’autres préfèrent un rythme aux deux semaines. Que vous habitiez un condo au centre-ville, une maison familiale à Laval ou une résidence sur la Rive-Sud, l’objectif reste le même : un soutien constant qui simplifie la vie à la maison.',
        processTitle: 'Comment fonctionne la réservation',
        processItems: [
          'Vous nous parlez de votre logement, de la fréquence souhaitée et des pièces ou tâches à prendre en charge de façon régulière.',
          'Nous confirmons la portée du service, le rythme des visites et les priorités du foyer afin que le plan corresponde à votre routine.',
          'Notre équipe arrive à l’heure, effectue le plan ménager convenu et vous aide à garder votre espace plus propre d’une visite à l’autre.'
        ],
        trustTitle: 'Pourquoi les foyers choisissent Sparkling Stays',
        trustItems: [
          'Idéal pour un soutien ménager hebdomadaire, aux deux semaines ou récurrent',
          'Communication bilingue en français et en anglais',
          'Service offert à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
          'Utile pour professionnels, familles, aînés et foyers qui veulent un entretien constant'
        ],
        faqTitle: 'FAQ sur les services de femme de ménage',
        faqs: [
          {
            question: 'Quelle est la différence entre un service de femme de ménage et un ménage ponctuel?',
            answer:
              'Les services de femme de ménage sont généralement prévus de façon récurrente pour garder la maison sous contrôle au fil du temps. Un ménage ponctuel convient mieux à une remise à neuf occasionnelle, tandis qu’un service récurrent convient mieux au soutien continu du foyer.'
          },
          {
            question: 'Puis-je réserver un service chaque semaine ou aux deux semaines?',
            answer:
              'Oui. Sparkling Stays offre des fréquences hebdomadaires, aux deux semaines et d’autres horaires récurrents selon vos besoins, la taille du logement et votre routine.'
          },
          {
            question: 'Le service couvre-t-il les salles de bain, la cuisine et les planchers?',
            answer:
              'Oui. Ce sont habituellement les zones principales, avec l’époussetage, la remise en ordre et l’entretien général des chambres et espaces de vie selon la portée convenue.'
          },
          {
            question: 'Quels secteurs desservez-vous pour ce service?',
            answer:
              'Nous offrons les services de femme de ménage à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Contactez-nous si vous voulez confirmer la disponibilité pour un secteur voisin.'
          },
          {
            question: 'Le service est-il offert en français et en anglais?',
            answer:
              'Oui. Sparkling Stays offre un service bilingue afin que la coordination continue et la planification se fassent facilement dans la langue de votre choix.'
          }
        ]
      },
      ctas: {
        primary: 'Réserver un service ménager',
        secondary: 'Voir les tarifs',
        contact: 'Nous contacter'
      },
      metaTitle: 'Services de femme de ménage à Montréal | Sparkling Stays',
      metaDescription:
        'Services de femme de ménage à Montréal pour un entretien récurrent et une aide ménagère flexible. Sparkling Stays dessert Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud.',
      areaServed: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
      heroCtaTitle: 'Besoin d’une aide ménagère fiable qui suit votre routine?',
      heroCtaBody:
        'Réservez un service de femme de ménage récurrent avec Sparkling Stays et gardez votre maison plus propre, plus calme et plus facile à gérer chaque semaine.'
    }
  },
  'airbnb-cleaning': {
    en: {
      title: 'Airbnb Cleaning Services in Montreal',
      description:
        'Sparkling Stays provides Airbnb cleaning services in Montreal for short-term rentals, furnished apartments, and vacation properties that need fast, dependable turnover support.',
      eyebrow: 'Short-term rental turnover cleaning across Greater Montreal',
      intro:
        'Sparkling Stays offers Airbnb cleaning services in Montreal for hosts and property managers who need rentals cleaned, reset, and ready between guests. We support Airbnb units, furnished condos, executive rentals, and other short-term stays across Montreal, Laval, the West Island, and the South Shore with a service designed around tight turnaround windows.',
      directAnswer:
        'If you need reliable Airbnb cleaning in Montreal, Sparkling Stays handles the turnover work that helps your rental stay guest-ready. We focus on bathrooms, kitchens, floors, linens or reset priorities you outline, and the presentation details that matter when every check-in affects reviews.',
      lastUpdated: 'Last updated: April 2026',
      sections: {
        whyTitle: 'What our Airbnb cleaning service is built for',
        whyBody:
          'Short-term rental cleaning is different from standard residential service because the goal is not just cleanliness. The unit also needs to feel reset, presentable, and ready for the next arrival on schedule. That means paying attention to turnover timing, visible presentation, bathroom and kitchen sanitizing, garbage removal, and the small details that shape a guest’s first impression the moment they walk in.',
        includedTitle: 'Common Airbnb turnover tasks',
        includedItems: [
          'Bathroom cleaning and sanitizing for toilets, showers, tubs, mirrors, sinks, and vanities',
          'Kitchen reset including counters, sink, appliance exteriors, backsplash areas, and visible surface buildup',
          'Vacuuming and mopping floors throughout the rental, including entryways and guest-use zones',
          'Dusting of reachable surfaces, tables, shelves, headboards, and presentation-sensitive areas',
          'Trash removal and general room reset so the property feels fresh for the next guest',
          'Attention to staging details and host priorities that support smoother turnovers and stronger guest impressions'
        ],
        fitTitle: 'A strong fit for hosts, co-hosts, and property managers',
        fitBody:
          'Airbnb cleaning is ideal when your rental needs dependable turnovers without last-minute scrambling. Some Montreal hosts manage one condo and simply want a cleaner, more repeatable process between bookings. Others oversee multiple furnished units and need support that keeps guest-ready standards consistent. Whether the property is downtown, in Old Montreal, near the airport, in Laval, or on the South Shore, the service is structured around speed, presentation, and reliability.',
        processTitle: 'How Airbnb turnover booking works',
        processItems: [
          'Tell us about the property, guest turnover timing, and any reset details that matter most between stays.',
          'We confirm the service scope, access plan, and priorities such as bathrooms, kitchen presentation, visible touchpoints, or recurring turnover needs.',
          'Our team completes the turnover cleaning so the unit is refreshed, guest-ready, and aligned with the standards you want to maintain.'
        ],
        trustTitle: 'Why short-term rental hosts choose Sparkling Stays',
        trustItems: [
          'Designed for Airbnb turnovers, furnished rentals, and guest-ready resets',
          'Bilingual communication in English and French',
          'Service coverage across Montreal, Laval, the West Island, and the South Shore',
          'Helpful for independent hosts, co-hosts, and property managers who need dependable turnaround support'
        ],
        faqTitle: 'Airbnb cleaning FAQs',
        faqs: [
          {
            question: 'Do you clean Airbnb units and other short-term rentals in Montreal?',
            answer:
              'Yes. Sparkling Stays provides Airbnb cleaning for short-term rentals, furnished apartments, and guest turnover situations across Greater Montreal.'
          },
          {
            question: 'Is Airbnb cleaning different from regular home cleaning?',
            answer:
              'Yes. Airbnb cleaning is focused on turnover readiness, which means the space needs to be both clean and presentation-ready before the next guest arrives. Timing, visual reset, and guest-facing details matter more than in a standard maintenance visit.'
          },
          {
            question: 'Can you handle recurring turnovers between guest stays?',
            answer:
              'Yes. Many hosts use Sparkling Stays for recurring turnover support so the property stays consistent from one booking to the next.'
          },
          {
            question: 'Which areas do you serve for Airbnb cleaning?',
            answer:
              'We serve Montreal, Laval, the West Island, and the South Shore. Contact us if you want to confirm availability for a nearby short-term rental property.'
          },
          {
            question: 'Can the service be coordinated in English or French?',
            answer:
              'Yes. Sparkling Stays provides bilingual support so hosts, co-hosts, and property managers can coordinate turnovers in either language.'
          }
        ]
      },
      ctas: {
        primary: 'Book Airbnb cleaning',
        secondary: 'View pricing',
        contact: 'Contact us'
      },
      metaTitle: 'Airbnb Cleaning Services in Montreal | Sparkling Stays',
      metaDescription:
        'Airbnb cleaning services in Montreal for short-term rental turnovers, furnished apartments, and guest-ready resets. Sparkling Stays serves Montreal, Laval, West Island, and the South Shore.',
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore'],
      heroCtaTitle: 'Need fast, dependable turnover cleaning between guests?',
      heroCtaBody:
        'Book Airbnb cleaning with Sparkling Stays and keep your rental clean, reset, and ready for every arrival without last-minute stress.'
    },
    fr: {
      title: 'Service de nettoyage Airbnb à Montréal',
      description:
        'Sparkling Stays offre un service de nettoyage Airbnb à Montréal pour les locations courte durée, condos meublés et propriétés locatives qui ont besoin d’un entretien rapide et fiable entre les séjours.',
      eyebrow: 'Nettoyage de rotation pour locations courte durée dans le Grand Montréal',
      intro:
        'Sparkling Stays offre un service de nettoyage Airbnb à Montréal pour les hôtes et gestionnaires qui doivent remettre un logement propre, prêt et bien présenté entre deux séjours. Nous desservons les unités Airbnb, condos meublés, locations exécutives et autres hébergements de courte durée à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud avec une approche pensée pour les délais serrés.',
      directAnswer:
        'Si vous cherchez un service fiable de nettoyage Airbnb à Montréal, Sparkling Stays prend en charge le ménage de rotation qui aide votre location à rester prête pour les voyageurs. Nous nous concentrons sur les salles de bain, la cuisine, les planchers, les priorités de remise en ordre que vous précisez et les détails de présentation qui comptent quand chaque arrivée peut influencer les avis.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      sections: {
        whyTitle: 'À quoi sert notre service de nettoyage Airbnb',
        whyBody:
          'Le nettoyage pour location courte durée diffère d’un entretien résidentiel standard, car l’objectif n’est pas seulement la propreté. Le logement doit aussi paraître remis à neuf, accueillant et prêt pour la prochaine arrivée au bon moment. Cela exige une attention au délai de rotation, à la présentation visuelle, à la désinfection de la cuisine et de la salle de bain, à la gestion des déchets et aux petits détails qui influencent la première impression du voyageur.',
        includedTitle: 'Tâches courantes lors d’un ménage Airbnb',
        includedItems: [
          'Nettoyage et désinfection des salles de bain : toilette, douche, bain, miroirs, lavabo et vanité',
          'Remise en ordre de la cuisine, y compris comptoirs, évier, extérieur des électroménagers, dosseret et accumulation visible',
          'Aspiration et lavage des planchers dans tout le logement, y compris l’entrée et les zones utilisées par les voyageurs',
          'Époussetage des surfaces accessibles, tables, étagères, têtes de lit et zones sensibles à la présentation',
          'Sortie des déchets et remise en ordre générale afin que le logement paraisse frais pour le prochain séjour',
          'Attention aux détails de présentation et aux priorités de l’hôte pour faciliter les rotations et soutenir de meilleurs avis'
        ],
        fitTitle: 'Un bon choix pour les hôtes, co-hôtes et gestionnaires',
        fitBody:
          'Le nettoyage Airbnb convient parfaitement quand votre location demande des rotations fiables sans improvisation de dernière minute. Certains hôtes à Montréal gèrent un seul condo et veulent simplement un processus plus stable entre les réservations. D’autres supervisent plusieurs logements meublés et ont besoin d’un soutien qui garde un niveau constant de préparation pour les voyageurs. Que la propriété soit au centre-ville, dans le Vieux-Montréal, près de l’aéroport, à Laval ou sur la Rive-Sud, le service est structuré autour de la rapidité, de la présentation et de la fiabilité.',
        processTitle: 'Comment fonctionne une réservation Airbnb',
        processItems: [
          'Vous nous indiquez le type de propriété, le délai entre les voyageurs et les détails de remise en ordre les plus importants.',
          'Nous confirmons la portée du service, le mode d’accès et les priorités comme les salles de bain, la présentation de la cuisine, les points de contact visibles ou les rotations récurrentes.',
          'Notre équipe effectue le ménage de rotation afin que l’unité soit rafraîchie, prête pour les voyageurs et conforme au niveau de qualité que vous voulez maintenir.'
        ],
        trustTitle: 'Pourquoi les hôtes choisissent Sparkling Stays',
        trustItems: [
          'Conçu pour les rotations Airbnb, locations meublées et remises à neuf prêtes pour les voyageurs',
          'Communication bilingue en français et en anglais',
          'Service offert à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
          'Utile pour les hôtes indépendants, co-hôtes et gestionnaires qui veulent un soutien de rotation fiable'
        ],
        faqTitle: 'FAQ sur le nettoyage Airbnb',
        faqs: [
          {
            question: 'Nettoyez-vous les unités Airbnb et autres locations courte durée à Montréal?',
            answer:
              'Oui. Sparkling Stays offre le nettoyage Airbnb pour les locations courte durée, appartements meublés et situations de rotation entre voyageurs partout dans le Grand Montréal.'
          },
          {
            question: 'Le nettoyage Airbnb est-il différent d’un ménage résidentiel régulier?',
            answer:
              'Oui. Le nettoyage Airbnb vise la préparation entre deux séjours, donc l’espace doit être propre et visuellement prêt avant l’arrivée suivante. Le délai, la remise en ordre visuelle et les détails liés à l’expérience du voyageur prennent plus d’importance qu’avec un simple entretien régulier.'
          },
          {
            question: 'Pouvez-vous gérer des rotations récurrentes entre les séjours?',
            answer:
              'Oui. Plusieurs hôtes utilisent Sparkling Stays pour un soutien récurrent entre les réservations afin de garder une qualité constante d’un séjour à l’autre.'
          },
          {
            question: 'Quels secteurs desservez-vous pour le nettoyage Airbnb?',
            answer:
              'Nous desservons Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud. Contactez-nous si vous voulez confirmer la disponibilité pour une location courte durée dans un secteur voisin.'
          },
          {
            question: 'Le service peut-il être coordonné en français ou en anglais?',
            answer:
              'Oui. Sparkling Stays offre un service bilingue afin que les hôtes, co-hôtes et gestionnaires puissent coordonner les rotations dans la langue de leur choix.'
          }
        ]
      },
      ctas: {
        primary: 'Réserver un nettoyage Airbnb',
        secondary: 'Voir les tarifs',
        contact: 'Nous contacter'
      },
      metaTitle: 'Nettoyage Airbnb à Montréal | Sparkling Stays',
      metaDescription:
        'Service de nettoyage Airbnb à Montréal pour rotations de locations courte durée, condos meublés et logements prêts pour les voyageurs. Sparkling Stays dessert Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud.',
      areaServed: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
      heroCtaTitle: 'Besoin d’un ménage de rotation rapide et fiable entre deux séjours?',
      heroCtaBody:
        'Réservez un nettoyage Airbnb avec Sparkling Stays et gardez votre location propre, remise en ordre et prête pour chaque arrivée sans stress de dernière minute.'
    }
  },
  'deep-cleaning': {
    en: {
      title: 'Deep Cleaning Services in Montreal',
      description:
        'Sparkling Stays provides deep cleaning services in Montreal for move-ins, move-outs, seasonal resets, and homes that need more than standard upkeep.',
      eyebrow: 'Top-to-bottom cleaning for detailed resets',
      intro:
        'Sparkling Stays offers deep cleaning services in Montreal for homes that need extra attention beyond a regular maintenance visit. This service is ideal when you are catching up after a busy season, preparing for guests, moving in or out, or resetting a home that has built up dust, grease, soap residue, and neglected detail work.',
      directAnswer:
        'If your home needs a real reset, our deep cleaning service focuses on the buildup that standard cleaning often leaves behind. We work through kitchens, bathrooms, floors, trim, reachable fixtures, and overlooked surfaces so your space feels fully refreshed, not just quickly tidied.',
      lastUpdated: 'Last updated: April 2026',
      sections: {
        whyTitle: 'What makes deep cleaning different',
        whyBody:
          'Deep cleaning is designed for homes that need more time, more detail, and more thorough top-to-bottom attention than a recurring cleaning visit. Instead of focusing only on maintenance, we target built-up grime in kitchens and bathrooms, dust on trim and baseboards, residue on fixtures, and the hard-to-ignore areas that make a space feel overdue for a reset.',
        includedTitle: 'What is usually included in a deep clean',
        includedItems: [
          'Detailed kitchen cleaning including cabinet fronts, backsplash areas, appliance exteriors, and stubborn surface buildup',
          'Bathroom scrubbing and sanitizing for showers, tubs, tile, toilets, sinks, mirrors, and vanities',
          'Dusting of baseboards, window ledges, trim, doors, and other reachable detail surfaces',
          'Vacuuming and mopping throughout the home, including corners and edges that are easy to miss',
          'Cleaning of high-touch points such as switches, handles, railings, and commonly used surfaces',
          'A fuller room-by-room reset for homes preparing for a fresh start, move, or seasonal refresh'
        ],
        fitTitle: 'When deep cleaning is the right fit',
        fitBody:
          'Many Montreal clients book deep cleaning when a home has gone too long between professional visits, before listing or moving, after renovations or hosting, or during spring and fall resets. It is also a smart first appointment before starting recurring service, because it gives the home a cleaner baseline that is easier to maintain over time.',
        processTitle: 'How a deep-clean booking works',
        processItems: [
          'Tell us about the size of the home, the current condition, and whether the cleaning is for a move, a seasonal reset, or a first-time catch-up visit.',
          'We confirm priorities, expected scope, and the areas that need extra attention so the visit is aligned with the real condition of the space.',
          'Our team completes the deep-cleaning plan and leaves the home reset, refreshed, and ready for regular use or the next step.'
        ],
        trustTitle: 'Why clients book Sparkling Stays for deep cleaning',
        trustItems: [
          'Useful for move-ins, move-outs, first visits, and seasonal home resets',
          'Bilingual service in English and French',
          'Coverage across Montreal, Laval, the West Island, and the South Shore',
          'A more detailed approach than standard maintenance cleaning'
        ],
        faqTitle: 'Deep cleaning FAQs',
        faqs: [
          {
            question: 'What is the difference between regular cleaning and deep cleaning?',
            answer:
              'Regular cleaning is meant for ongoing maintenance. Deep cleaning adds more time and detail, with extra attention to buildup, trim, baseboards, fixtures, and neglected surfaces that need a fuller reset.'
          },
          {
            question: 'Is deep cleaning a good option before starting recurring service?',
            answer:
              'Yes. Many clients begin with a deep clean so the home starts from a better baseline before moving to weekly, biweekly, or monthly maintenance.'
          },
          {
            question: 'Do you offer deep cleaning for move-ins and move-outs in Montreal?',
            answer:
              'Yes. Deep cleaning is commonly booked before moving into a new place, after moving out, or when preparing a property for the next occupant.'
          },
          {
            question: 'Which areas do you serve for deep cleaning?',
            answer:
              'We provide deep cleaning across Montreal, Laval, the West Island, and the South Shore. Contact us if you want to confirm coverage for a nearby area.'
          },
          {
            question: 'Can I request focus on kitchens and bathrooms during a deep clean?',
            answer:
              'Absolutely. Kitchens and bathrooms are often the top priority during deep cleaning, and we can align the visit around the areas with the most buildup.'
          }
        ]
      },
      ctas: {
        primary: 'Book a deep clean',
        secondary: 'See pricing',
        contact: 'Contact us'
      },
      metaTitle: 'Deep Cleaning Services in Montreal | Sparkling Stays',
      metaDescription:
        'Deep cleaning services in Montreal for move-ins, move-outs, seasonal resets, and first-time catch-up visits. Sparkling Stays serves Montreal, Laval, West Island, and the South Shore.',
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore'],
      heroCtaTitle: 'Need a full home reset, not just a quick tidy-up?',
      heroCtaBody:
        'Book deep cleaning with Sparkling Stays for detailed top-to-bottom care before a move, after a busy stretch, or whenever your space needs a serious refresh.'
    },
    fr: {
      title: 'Service de grand ménage à Montréal',
      description:
        'Sparkling Stays offre un service de grand ménage à Montréal pour les emménagements, déménagements, remises à neuf saisonnières et logements qui demandent plus qu’un entretien régulier.',
      eyebrow: 'Nettoyage en profondeur pour une vraie remise à neuf',
      intro:
        'Sparkling Stays offre un service de grand ménage à Montréal pour les logements qui demandent plus d’attention qu’une visite d’entretien habituelle. Ce service convient bien après une période chargée, avant l’arrivée d’invités, lors d’un emménagement ou d’un déménagement, ou quand la poussière, la graisse, les résidus de savon et les détails négligés se sont accumulés.',
      directAnswer:
        'Si votre logement a besoin d’une vraie remise à neuf, notre service de grand ménage vise l’accumulation que l’entretien standard laisse souvent derrière lui. Nous travaillons les cuisines, salles de bain, planchers, moulures, surfaces accessibles et zones souvent oubliées pour que l’espace paraisse réellement rafraîchi.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      sections: {
        whyTitle: 'Ce qui distingue un grand ménage',
        whyBody:
          'Le grand ménage est conçu pour les logements qui demandent plus de temps, plus de détails et une attention plus complète qu’une visite d’entretien récurrente. Au lieu de viser seulement le maintien de la propreté, nous ciblons la saleté incrustée dans la cuisine et la salle de bain, la poussière sur les moulures et plinthes, les résidus sur les accessoires et toutes les zones qui donnent l’impression qu’une vraie remise à neuf s’impose.',
        includedTitle: 'Ce qui est généralement inclus',
        includedItems: [
          'Nettoyage détaillé de la cuisine, y compris façades d’armoires, dosseret, extérieur des électroménagers et accumulation tenace',
          'Récurage et désinfection des salles de bain : douche, bain, céramique, toilette, lavabo, miroirs et vanité',
          'Époussetage des plinthes, rebords de fenêtres, moulures, portes et autres surfaces de détail accessibles',
          'Aspiration et lavage des planchers partout dans le logement, y compris les coins et les bordures souvent oubliés',
          'Nettoyage des points de contact fréquents comme interrupteurs, poignées, rampes et surfaces souvent utilisées',
          'Remise en ordre plus complète pièce par pièce avant un nouveau départ, un déménagement ou un ménage saisonnier'
        ],
        fitTitle: 'Quand le grand ménage est le bon choix',
        fitBody:
          'Plusieurs clients à Montréal réservent un grand ménage quand le logement n’a pas été entretenu en profondeur depuis longtemps, avant une mise en vente ou un déménagement, après des travaux ou une réception, ou lors des remises à neuf du printemps et de l’automne. C’est aussi un excellent premier rendez-vous avant de passer à un entretien récurrent, parce qu’il crée une base plus propre et plus facile à maintenir.',
        processTitle: 'Comment fonctionne une réservation de grand ménage',
        processItems: [
          'Vous nous indiquez la taille du logement, son état actuel et si le ménage est prévu pour un déménagement, une remise à neuf saisonnière ou une première grande remise en ordre.',
          'Nous confirmons les priorités, la portée prévue et les zones qui demandent plus d’attention afin que la visite corresponde à la réalité du logement.',
          'Notre équipe effectue le plan de grand ménage et laisse un espace remis à neuf, rafraîchi et prêt pour la suite.'
        ],
        trustTitle: 'Pourquoi les clients réservent Sparkling Stays',
        trustItems: [
          'Idéal pour les emménagements, déménagements, premières visites et remises à neuf saisonnières',
          'Service bilingue en français et en anglais',
          'Présence à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
          'Approche plus détaillée qu’un simple entretien de maintien'
        ],
        faqTitle: 'FAQ sur le grand ménage',
        faqs: [
          {
            question: 'Quelle est la différence entre un entretien régulier et un grand ménage?',
            answer:
              'L’entretien régulier sert au maintien. Le grand ménage ajoute plus de temps et de détails, avec une attention particulière à l’accumulation, aux plinthes, aux accessoires et aux surfaces négligées qui demandent une remise à neuf plus complète.'
          },
          {
            question: 'Le grand ménage est-il une bonne option avant de commencer un service récurrent?',
            answer:
              'Oui. Plusieurs clients commencent par un grand ménage afin d’établir une meilleure base avant de passer à un entretien hebdomadaire, aux deux semaines ou mensuel.'
          },
          {
            question: 'Offrez-vous le grand ménage pour les emménagements et déménagements à Montréal?',
            answer:
              'Oui. Le grand ménage est souvent réservé avant un emménagement, après un déménagement ou pour préparer un logement au prochain occupant.'
          },
          {
            question: 'Quels secteurs desservez-vous pour le grand ménage?',
            answer:
              'Nous offrons le grand ménage à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Contactez-nous si vous voulez confirmer la disponibilité pour un secteur voisin.'
          },
          {
            question: 'Puis-je mettre l’accent sur la cuisine et les salles de bain?',
            answer:
              'Oui. Les cuisines et salles de bain font souvent partie des grandes priorités pendant un grand ménage, et nous pouvons orienter la visite vers les zones où l’accumulation est la plus importante.'
          }
        ]
      },
      ctas: {
        primary: 'Réserver un grand ménage',
        secondary: 'Voir les tarifs',
        contact: 'Nous contacter'
      },
      metaTitle: 'Grand ménage à Montréal | Sparkling Stays',
      metaDescription:
        'Service de grand ménage à Montréal pour emménagements, déménagements, remises à neuf saisonnières et premières visites. Sparkling Stays dessert Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud.',
      areaServed: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
      heroCtaTitle: 'Besoin d’une vraie remise à neuf, pas juste d’un coup rapide?',
      heroCtaBody:
        'Réservez un grand ménage avec Sparkling Stays avant un déménagement, après une période chargée ou chaque fois que votre espace a besoin d’un nettoyage en profondeur.'
    }
  },
  'window-cleaning': {
    en: {
      title: 'Window Cleaning Services in Montreal',
      description:
        'Sparkling Stays provides window cleaning services in Montreal, Laval, the West Island, and the South Shore for homes and businesses that want brighter spaces and cleaner glass.',
      eyebrow: 'Clearer windows for homes and businesses',
      intro:
        'Sparkling Stays offers window cleaning services in Montreal for homeowners, offices, and commercial spaces that want cleaner glass, better light, and a fresher overall appearance. Clean windows make a visible difference quickly, especially in entry areas, customer-facing spaces, and rooms where natural light matters.',
      directAnswer:
        'If you need window cleaning in Montreal, Sparkling Stays helps remove visible dust, smudges, and grime so your windows look cleaner and your space feels brighter. This service is useful for both residential and commercial properties that want a more polished appearance without handling the work in-house.',
      lastUpdated: 'Last updated: April 2026',
      sections: {
        whyTitle: 'What window cleaning helps improve',
        whyBody:
          'Window cleaning is one of the fastest ways to improve how a space looks from both inside and outside. Cleaner glass helps bring in more light, sharpens the look of the property, and removes the dullness that builds up over time from dust, weather, fingerprints, and daily use. It is especially valuable in businesses that receive clients and in homes where windows strongly affect the feel of the room.',
        includedTitle: 'Common window-cleaning focus areas',
        includedItems: [
          'Cleaning of accessible interior glass surfaces to remove smudges, dust, and visible buildup',
          'Attention to entry glass, room-facing windows, and other areas that shape first impressions',
          'Detail work on visible marks and residue that reduce clarity and brightness',
          'Support for residential and commercial spaces that want a cleaner, more polished finish',
          'Helpful upkeep for customer-facing properties, offices, homes, and furnished spaces',
          'A simple service that can noticeably improve presentation and light quality'
        ],
        fitTitle: 'A practical fit for homes, offices, and customer-facing spaces',
        fitBody:
          'Window cleaning is especially useful when a space depends on natural light or visual presentation. Homes benefit when living areas feel brighter and less dull. Offices and commercial interiors benefit when entry glass, meeting spaces, and customer-facing windows look cleaner and more professional. Across Montreal, this service works well as part of regular upkeep or as a targeted visual refresh.',
        processTitle: 'How window-cleaning service works',
        processItems: [
          'Tell us about the space, the type of windows involved, and whether the service is for a home or business.',
          'We confirm the scope, accessibility, and the areas where cleaner glass will make the biggest visible difference.',
          'Our team completes the cleaning plan so the windows look clearer, brighter, and better maintained.'
        ],
        trustTitle: 'Why clients choose Sparkling Stays for window cleaning',
        trustItems: [
          'Useful for residential and commercial properties',
          'Bilingual communication in English and French',
          'Service across Montreal, Laval, the West Island, and the South Shore',
          'A clean visual upgrade that supports both comfort and presentation'
        ],
        faqTitle: 'Window cleaning FAQs',
        faqs: [
          {
            question: 'Do you offer window cleaning for homes and businesses?',
            answer:
              'Yes. Sparkling Stays provides window cleaning support for both residential and commercial spaces depending on the scope and accessibility of the windows.'
          },
          {
            question: 'Why is window cleaning worth booking regularly?',
            answer:
              'Regular window cleaning helps maintain a brighter, cleaner-looking space and prevents visible buildup from making the property feel neglected or dull.'
          },
          {
            question: 'Can window cleaning improve customer-facing presentation?',
            answer:
              'Absolutely. Clean glass improves first impressions in offices, storefronts, and other spaces where visitors notice the environment right away.'
          },
          {
            question: 'Which areas do you serve for window cleaning?',
            answer:
              'We serve Montreal, Laval, the West Island, and the South Shore. Contact us if you want to confirm availability for a nearby location.'
          },
          {
            question: 'Is service available in English and French?',
            answer:
              'Yes. Sparkling Stays provides bilingual support so planning and coordination can happen in either language.'
          }
        ]
      },
      ctas: {
        primary: 'Book window cleaning',
        secondary: 'View pricing',
        contact: 'Contact us'
      },
      metaTitle: 'Window Cleaning Services in Montreal | Sparkling Stays',
      metaDescription:
        'Window cleaning services in Montreal for brighter homes, cleaner offices, and better presentation across Montreal, Laval, West Island, and the South Shore.',
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore'],
      heroCtaTitle: 'Need cleaner windows that brighten the whole space?',
      heroCtaBody:
        'Book window cleaning with Sparkling Stays for a simple visual upgrade that makes your home or business look cleaner and feel fresher.'
    },
    fr: {
      title: 'Service de nettoyage de fenêtres à Montréal',
      description:
        'Sparkling Stays offre un service de nettoyage de fenêtres à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud pour les maisons et entreprises qui veulent des vitres plus propres et des espaces plus lumineux.',
      eyebrow: 'Des fenêtres plus nettes pour maisons et entreprises',
      intro:
        'Sparkling Stays offre un service de nettoyage de fenêtres à Montréal pour les propriétaires, bureaux et commerces qui veulent des vitres plus propres, plus de lumière et une apparence générale plus fraîche. Des fenêtres nettes changent rapidement l’impression d’un espace, surtout dans les entrées, les lieux recevant des clients et les pièces où la lumière naturelle compte beaucoup.',
      directAnswer:
        'Si vous cherchez un service de nettoyage de fenêtres à Montréal, Sparkling Stays aide à enlever la poussière visible, les traces et la saleté afin que vos vitres paraissent plus propres et que l’espace semble plus lumineux. Ce service convient autant aux propriétés résidentielles qu’aux espaces commerciaux qui veulent une apparence plus soignée sans gérer ce travail eux-mêmes.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      sections: {
        whyTitle: 'Ce que le nettoyage de fenêtres améliore',
        whyBody:
          'Le nettoyage de fenêtres est l’un des moyens les plus rapides d’améliorer l’apparence d’un espace, à l’intérieur comme à l’extérieur. Des vitres propres laissent mieux entrer la lumière, rehaussent l’allure de la propriété et éliminent l’aspect terne causé par la poussière, la météo, les traces de doigts et l’usage quotidien. C’est particulièrement utile dans les entreprises qui reçoivent des clients et dans les maisons où les fenêtres influencent fortement l’ambiance des pièces.',
        includedTitle: 'Zones souvent visées par le nettoyage de fenêtres',
        includedItems: [
          'Nettoyage des surfaces vitrées intérieures accessibles pour enlever traces, poussière et accumulation visible',
          'Attention portée aux vitres d’entrée, fenêtres visibles depuis les pièces et autres zones qui influencent la première impression',
          'Travail de détail sur les marques visibles et résidus qui réduisent la clarté et la luminosité',
          'Soutien pour les espaces résidentiels et commerciaux qui veulent une finition plus propre et soignée',
          'Entretien utile pour propriétés recevant des clients, bureaux, maisons et logements meublés',
          'Un service simple qui peut améliorer rapidement la présentation et la lumière naturelle'
        ],
        fitTitle: 'Un bon choix pour maisons, bureaux et espaces recevant du public',
        fitBody:
          'Le nettoyage de fenêtres est particulièrement utile lorsque l’espace dépend de la lumière naturelle ou de la présentation visuelle. Les maisons en profitent lorsque les pièces paraissent plus claires et moins ternes. Les bureaux et espaces commerciaux en profitent lorsque les vitres d’entrée, salles de réunion et zones visibles par les clients paraissent plus propres et plus professionnelles. Dans le Grand Montréal, ce service fonctionne bien comme entretien régulier ou comme rafraîchissement ciblé.',
        processTitle: 'Comment le service fonctionne',
        processItems: [
          'Vous nous décrivez l’espace, le type de fenêtres concernées et s’il s’agit d’une maison ou d’une entreprise.',
          'Nous confirmons la portée, l’accessibilité et les zones où des vitres plus propres auront le plus d’impact visuel.',
          'Notre équipe effectue le plan convenu afin que les fenêtres paraissent plus nettes, plus lumineuses et mieux entretenues.'
        ],
        trustTitle: 'Pourquoi les clients choisissent Sparkling Stays',
        trustItems: [
          'Utile pour propriétés résidentielles et commerciales',
          'Communication bilingue en français et en anglais',
          'Service à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
          'Une amélioration visuelle simple qui soutient à la fois le confort et la présentation'
        ],
        faqTitle: 'FAQ sur le nettoyage de fenêtres',
        faqs: [
          {
            question: 'Offrez-vous le nettoyage de fenêtres pour maisons et entreprises?',
            answer:
              'Oui. Sparkling Stays offre un service de nettoyage de fenêtres pour les espaces résidentiels et commerciaux selon la portée et l’accessibilité des vitres.'
          },
          {
            question: 'Pourquoi réserver ce service régulièrement?',
            answer:
              'Un nettoyage régulier aide à garder un espace plus lumineux et plus propre visuellement, tout en évitant que l’accumulation visible donne une impression négligée ou terne.'
          },
          {
            question: 'Le nettoyage de fenêtres peut-il améliorer l’image auprès des clients?',
            answer:
              'Oui. Des vitres propres améliorent la première impression dans les bureaux, commerces et autres espaces où les visiteurs remarquent rapidement l’environnement.'
          },
          {
            question: 'Quels secteurs desservez-vous pour le nettoyage de fenêtres?',
            answer:
              'Nous desservons Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud. Contactez-nous si vous voulez confirmer la disponibilité pour un secteur voisin.'
          },
          {
            question: 'Le service est-il offert en français et en anglais?',
            answer:
              'Oui. Sparkling Stays offre un service bilingue afin que la planification et la coordination se fassent facilement dans la langue de votre choix.'
          }
        ]
      },
      ctas: {
        primary: 'Réserver un nettoyage de fenêtres',
        secondary: 'Voir les tarifs',
        contact: 'Nous contacter'
      },
      metaTitle: 'Nettoyage de fenêtres à Montréal | Sparkling Stays',
      metaDescription:
        'Service de nettoyage de fenêtres à Montréal pour des maisons plus lumineuses, des bureaux plus propres et une meilleure présentation visuelle.',
      areaServed: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
      heroCtaTitle: 'Besoin de fenêtres plus propres pour illuminer tout l’espace?',
      heroCtaBody:
        'Réservez un nettoyage de fenêtres avec Sparkling Stays pour une amélioration visuelle simple qui rend votre maison ou votre entreprise plus nette et plus fraîche.'
    }
  },
  'post-renovation-cleaning': {
    en: {
      title: 'Post-Renovation Cleaning Services in Montreal',
      description:
        'Sparkling Stays provides post-renovation cleaning services in Montreal for homes, condos, offices, and commercial spaces that need dust, debris, and fine-detail cleanup after construction work.',
      eyebrow: 'Detailed cleanup after construction, remodeling, and upgrades',
      intro:
        'Sparkling Stays offers post-renovation cleaning services in Montreal for property owners, contractors, landlords, and businesses that need a space cleaned properly after work is done. Renovation projects often leave behind drywall dust, fine debris, adhesive residue, smudges, and detail work that standard cleaning is not built to handle. We help bring the space from worksite condition to move-in, reopen, or handoff ready.',
      directAnswer:
        'If you need post-renovation cleaning in Montreal, Sparkling Stays focuses on the dust, residue, and finishing cleanup that remain after construction or remodeling. We clean the visible mess, the hard-to-ignore fine dust, and the detail surfaces that need attention before a home or commercial space feels truly ready to use again.',
      lastUpdated: 'Last updated: April 2026',
      sections: {
        whyTitle: 'What post-renovation cleaning is designed to handle',
        whyBody:
          'Cleaning after renovations is different from ordinary maintenance service because construction dust spreads far beyond the work zone. It settles on floors, baseboards, vents, trim, fixtures, shelves, and other surfaces that make a freshly renovated space still feel unfinished. Our post-renovation cleaning service is designed to remove that leftover dust and debris, improve presentation, and help the property feel ready for everyday use, staging, tenants, staff, or customers.',
        includedTitle: 'Common post-renovation cleaning tasks',
        includedItems: [
          'Removal of visible construction dust from accessible surfaces, ledges, trim, and room details',
          'Detailed cleaning of floors, corners, edges, and high-buildup zones affected by renovation debris',
          'Wipe-down of counters, cabinets, fixtures, switches, and other reachable finishing surfaces',
          'Bathroom and kitchen cleanup to remove dust, residue, and post-project grime from key use areas',
          'Vacuuming and mopping to help eliminate fine particles left after sanding, cutting, or installation work',
          'Final presentation-focused cleaning that helps the space feel ready for move-in, turnover, or reopening'
        ],
        fitTitle: 'A strong fit after remodels, repairs, and interior upgrades',
        fitBody:
          'Post-renovation cleaning is useful after kitchen remodels, bathroom renovations, flooring replacement, painting, basement finishing, tenant turnovers, office improvements, and other interior projects that leave dust and mess behind. Some Montreal clients book this service before moving back into a room or handing over a finished project. Others use it before listing a property, reopening a business area, or preparing a newly upgraded space for tenants, guests, or staff.',
        processTitle: 'How post-renovation cleaning works',
        processItems: [
          'Tell us what type of renovation was completed, the size of the space, and whether the cleaning is for a home, condo, office, or commercial property.',
          'We confirm the condition of the site, the areas affected by dust or debris, and any priority zones that need extra finishing attention.',
          'Our team completes the cleanup plan so the renovated space looks cleaner, feels more finished, and is ready for the next step.'
        ],
        trustTitle: 'Why clients book Sparkling Stays after renovation work',
        trustItems: [
          'Helpful after remodeling, repairs, painting, flooring, and interior construction projects',
          'Bilingual communication in English and French',
          'Service across Montreal, Laval, the West Island, and the South Shore',
          'Useful for homeowners, property managers, contractors, offices, and commercial interiors'
        ],
        faqTitle: 'Post-renovation cleaning FAQs',
        faqs: [
          {
            question: 'What is included in post-renovation cleaning?',
            answer:
              'Post-renovation cleaning focuses on removing construction dust, debris, and residue from accessible surfaces, floors, kitchens, bathrooms, trim, fixtures, and the detail areas that standard cleaning often misses after a project.'
          },
          {
            question: 'Do you clean after small renovations as well as larger projects?',
            answer:
              'Yes. We can help after both smaller upgrades and broader renovation work, depending on the condition of the space and the scope of cleanup needed.'
          },
          {
            question: 'Is post-renovation cleaning useful before move-in or handoff?',
            answer:
              'Absolutely. Many clients book this service before moving into a renovated home, turning over a rental, staging a property, or handing a completed project back to the owner or tenant.'
          },
          {
            question: 'Which areas do you serve for post-renovation cleaning?',
            answer:
              'We provide post-renovation cleaning across Montreal, Laval, the West Island, and the South Shore. Reach out if you want to confirm service for a nearby location.'
          },
          {
            question: 'Can the service be coordinated in English or French?',
            answer:
              'Yes. Sparkling Stays offers bilingual support so renovation-related scheduling and service details can be handled comfortably in either language.'
          }
        ]
      },
      ctas: {
        primary: 'Book post-renovation cleaning',
        secondary: 'View pricing',
        contact: 'Contact us'
      },
      metaTitle: 'Post-Renovation Cleaning Services in Montreal | Sparkling Stays',
      metaDescription:
        'Post-renovation cleaning in Montreal for homes, condos, offices, and commercial spaces that need dust, debris, and detail cleanup after construction or remodeling.',
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore'],
      heroCtaTitle: 'Need the space cleaned properly after renovation work wraps up?',
      heroCtaBody:
        'Book post-renovation cleaning with Sparkling Stays to clear dust, debris, and finishing mess so your space feels ready to use, show, or reopen.'
    },
    fr: {
      title: 'Service de nettoyage après rénovation à Montréal',
      description:
        'Sparkling Stays offre un service de nettoyage après rénovation à Montréal pour les maisons, condos, bureaux et espaces commerciaux qui ont besoin d’éliminer poussière, débris et résidus après des travaux.',
      eyebrow: 'Nettoyage de finition après travaux, rénovations et améliorations intérieures',
      intro:
        'Sparkling Stays offre un service de nettoyage après rénovation à Montréal pour les propriétaires, entrepreneurs, gestionnaires et entreprises qui doivent remettre un espace en bon état après des travaux. Les rénovations laissent souvent derrière elles de la poussière de gypse, des particules fines, des résidus adhésifs, des traces et tout un travail de détail qu’un entretien standard ne couvre pas vraiment. Nous aidons à faire passer l’espace d’un chantier terminé à un lieu prêt à habiter, à relouer, à rouvrir ou à remettre au client.',
      directAnswer:
        'Si vous cherchez un service de nettoyage après rénovation à Montréal, Sparkling Stays s’occupe de la poussière, des résidus et du ménage de finition qui restent après des travaux ou un réaménagement. Nous nettoyons le désordre visible, la poussière fine difficile à ignorer et les surfaces de détail qui doivent être soignées avant qu’un logement ou un espace commercial paraisse réellement prêt à être utilisé.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      sections: {
        whyTitle: 'À quoi sert le nettoyage après rénovation',
        whyBody:
          'Le nettoyage après rénovation diffère d’un entretien ordinaire parce que la poussière de chantier se propage bien au-delà de la zone des travaux. Elle se dépose sur les planchers, plinthes, bouches d’aération, moulures, luminaires, tablettes et autres surfaces qui donnent encore l’impression que le lieu n’est pas tout à fait terminé. Notre service vise à retirer cette poussière et ces débris, à améliorer la présentation et à aider la propriété à paraître prête pour la vie quotidienne, la mise en location, la reprise des activités ou l’accueil des occupants.',
        includedTitle: 'Tâches courantes après rénovation',
        includedItems: [
          'Retrait de la poussière de construction visible sur les surfaces accessibles, rebords, moulures et détails de pièce',
          'Nettoyage détaillé des planchers, coins, bordures et zones où les débris de travaux s’accumulent',
          'Essuyage des comptoirs, armoires, accessoires, interrupteurs et autres surfaces de finition accessibles',
          'Nettoyage des cuisines et salles de bain pour enlever poussière, résidus et saleté post-travaux dans les zones essentielles',
          'Aspiration et lavage des planchers pour aider à éliminer les particules fines laissées après sablage, coupe ou installation',
          'Nettoyage final axé sur la présentation afin que l’espace paraisse prêt pour un emménagement, une remise des clés ou une réouverture'
        ],
        fitTitle: 'Un bon choix après remodelage, réparations et améliorations intérieures',
        fitBody:
          'Le nettoyage après rénovation est utile après une rénovation de cuisine, une salle de bain refaite, un remplacement de planchers, des travaux de peinture, l’aménagement d’un sous-sol, une remise en état locative, une amélioration de bureaux ou tout autre projet intérieur qui laisse poussière et désordre. Certains clients à Montréal réservent ce service avant de réintégrer une pièce ou de remettre un projet terminé. D’autres l’utilisent avant d’afficher une propriété, de rouvrir une zone commerciale ou de préparer un espace amélioré pour des locataires, des invités ou des employés.',
        processTitle: 'Comment fonctionne le nettoyage après rénovation',
        processItems: [
          'Vous nous indiquez le type de travaux réalisés, la taille de l’espace et s’il s’agit d’une maison, d’un condo, d’un bureau ou d’un local commercial.',
          'Nous confirmons l’état du site, les zones touchées par la poussière ou les débris et les endroits prioritaires qui demandent une finition plus poussée.',
          'Notre équipe effectue le plan de nettoyage afin que l’espace rénové paraisse plus propre, plus fini et prêt pour la prochaine étape.'
        ],
        trustTitle: 'Pourquoi les clients choisissent Sparkling Stays après des travaux',
        trustItems: [
          'Utile après rénovations, réparations, peinture, remplacement de planchers et projets de construction intérieure',
          'Communication bilingue en français et en anglais',
          'Service offert à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
          'Pertinent pour propriétaires, gestionnaires, entrepreneurs, bureaux et espaces commerciaux'
        ],
        faqTitle: 'FAQ sur le nettoyage après rénovation',
        faqs: [
          {
            question: 'Qu’est-ce qui est inclus dans un nettoyage après rénovation?',
            answer:
              'Le nettoyage après rénovation vise à retirer la poussière de chantier, les débris et les résidus des surfaces accessibles, des planchers, des cuisines, des salles de bain, des moulures, des accessoires et des zones de détail qu’un ménage standard laisse souvent derrière lui après des travaux.'
          },
          {
            question: 'Nettoyez-vous après de petits travaux comme après de plus gros projets?',
            answer:
              'Oui. Nous pouvons intervenir après de petites améliorations comme après des rénovations plus importantes, selon l’état du lieu et la portée du nettoyage nécessaire.'
          },
          {
            question: 'Ce service est-il utile avant un emménagement ou une remise des clés?',
            answer:
              'Oui. Plusieurs clients réservent ce service avant d’emménager dans un logement rénové, de remettre une location, de préparer une propriété ou de retourner un projet terminé au propriétaire ou au locataire.'
          },
          {
            question: 'Quels secteurs desservez-vous pour le nettoyage après rénovation?',
            answer:
              'Nous offrons le nettoyage après rénovation à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Contactez-nous si vous voulez confirmer la disponibilité pour un secteur voisin.'
          },
          {
            question: 'Le service peut-il être coordonné en français ou en anglais?',
            answer:
              'Oui. Sparkling Stays offre un service bilingue afin que la coordination des travaux et du nettoyage puisse se faire facilement dans la langue de votre choix.'
          }
        ]
      },
      ctas: {
        primary: 'Réserver un nettoyage après rénovation',
        secondary: 'Voir les tarifs',
        contact: 'Nous contacter'
      },
      metaTitle: 'Nettoyage après rénovation à Montréal | Sparkling Stays',
      metaDescription:
        'Service de nettoyage après rénovation à Montréal pour maisons, condos, bureaux et espaces commerciaux qui ont besoin d’éliminer poussière, débris et résidus après des travaux.',
      areaServed: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
      heroCtaTitle: 'Besoin d’un vrai nettoyage de finition après les travaux?',
      heroCtaBody:
        'Réservez un nettoyage après rénovation avec Sparkling Stays pour éliminer poussière, débris et traces de chantier afin que l’espace soit prêt à être utilisé, montré ou rouvert.'
    }
  },
  'commercial-cleaning': {
    en: {
      title: 'Commercial Cleaning Services in Montreal',
      description:
        'Sparkling Stays provides dependable commercial cleaning services in Montreal for offices, clinics, studios, retail spaces, and small business environments that need consistent professional upkeep.',
      eyebrow: 'Professional cleaning for businesses across Greater Montreal',
      intro:
        'Sparkling Stays offers commercial cleaning services in Montreal for businesses that need a clean, organized space for staff, customers, and day-to-day operations. We support offices, clinics, boutiques, showrooms, shared workspaces, and other commercial interiors across Montreal, Laval, the West Island, and the South Shore.',
      directAnswer:
        'If you need reliable commercial cleaning in Montreal, Sparkling Stays helps keep your workplace presentable, hygienic, and easier to manage. We tailor the scope around your space, traffic level, and operating hours so cleaning supports the business instead of disrupting it.',
      lastUpdated: 'Last updated: April 2026',
      sections: {
        whyTitle: 'What our commercial cleaning service is built for',
        whyBody:
          'Commercial spaces need more than a generic cleaning checklist. Entryways, reception desks, washrooms, breakrooms, treatment rooms, shared kitchens, meeting areas, and high-touch surfaces all affect how your business feels to employees and visitors. Our commercial cleaning service is designed to maintain a cleaner work environment, reduce visible buildup, and support a professional first impression.',
        includedTitle: 'Common tasks included in commercial cleaning',
        includedItems: [
          'Cleaning and sanitizing of washrooms, sinks, mirrors, fixtures, and high-touch points',
          'Wiping desks, counters, reception surfaces, tables, and other reachable work areas as requested',
          'Dusting of accessible furniture, ledges, shelving, trim, and shared-space surfaces',
          'Vacuuming and mopping floors in offices, hallways, waiting rooms, and commercial common areas',
          'Breakroom and kitchenette cleaning, including counters, sinks, appliance exteriors, and touchpoints',
          'Trash removal and general reset of spaces used by staff, customers, or clients'
        ],
        fitTitle: 'A good fit for offices, clinics, retail, and service businesses',
        fitBody:
          'Commercial cleaning is a strong fit when your space has daily staff traffic, customer-facing areas, or hygiene expectations that cannot be left to occasional upkeep. Montreal offices often need after-hours cleaning that keeps teams productive the next morning. Clinics and wellness spaces benefit from reliable sanitizing routines. Retail and service businesses need consistent presentation so the space reflects the quality of the business itself.',
        processTitle: 'How commercial cleaning starts',
        processItems: [
          'Tell us about your business type, square footage, preferred schedule, and whether you need daytime, evening, or recurring service.',
          'We confirm the scope, priority zones, and practical details like access, traffic patterns, and any client-facing areas that matter most.',
          'Our team follows the agreed cleaning plan so your workplace stays clean, professional, and ready for staff and visitors.'
        ],
        trustTitle: 'Why businesses choose Sparkling Stays',
        trustItems: [
          'Useful for offices, clinics, retail spaces, studios, and other commercial interiors',
          'Bilingual communication in English and French',
          'Service coverage across Montreal, Laval, the West Island, and the South Shore',
          'Flexible cleaning scope built around business operations and customer-facing standards'
        ],
        faqTitle: 'Commercial cleaning FAQs',
        faqs: [
          {
            question: 'What kinds of businesses do you clean?',
            answer:
              'We provide commercial cleaning for offices, clinics, boutiques, studios, service businesses, and other professional interiors across Greater Montreal.'
          },
          {
            question: 'Can commercial cleaning be scheduled outside business hours?',
            answer:
              'Yes. Many businesses prefer cleaning before opening, after closing, or during lower-traffic periods so the service does not interrupt operations.'
          },
          {
            question: 'Do you clean employee areas and customer-facing areas?',
            answer:
              'Yes. We can cover reception areas, offices, washrooms, meeting rooms, breakrooms, and other interior spaces based on the agreed scope.'
          },
          {
            question: 'Which areas do you serve for commercial cleaning?',
            answer:
              'We serve Montreal, Laval, the West Island, and the South Shore. If your business is nearby, contact us and we can confirm availability.'
          },
          {
            question: 'Is commercial cleaning available in English and French?',
            answer:
              'Yes. Sparkling Stays provides bilingual support so scheduling and service coordination can happen comfortably in either language.'
          }
        ]
      },
      ctas: {
        primary: 'Book commercial cleaning',
        secondary: 'View pricing',
        contact: 'Contact us'
      },
      metaTitle: 'Commercial Cleaning Services in Montreal | Sparkling Stays',
      metaDescription:
        'Commercial cleaning services in Montreal for offices, clinics, retail spaces, and professional interiors. Sparkling Stays serves Montreal, Laval, West Island, and the South Shore.',
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore'],
      heroCtaTitle: 'Need a cleaner workplace that stays ready for staff and clients?',
      heroCtaBody:
        'Book commercial cleaning with Sparkling Stays for reliable upkeep that helps your business look professional and run more smoothly.'
    },
    fr: {
      title: 'Service de nettoyage commercial à Montréal',
      description:
        'Sparkling Stays offre un service de nettoyage commercial fiable à Montréal pour les bureaux, cliniques, studios, commerces et autres espaces professionnels qui demandent un entretien constant.',
      eyebrow: 'Entretien professionnel pour entreprises dans le Grand Montréal',
      intro:
        'Sparkling Stays offre un service de nettoyage commercial à Montréal pour les entreprises qui ont besoin d’un espace propre, organisé et accueillant pour leur équipe, leur clientèle et leurs activités quotidiennes. Nous desservons les bureaux, cliniques, boutiques, salles de montre, espaces partagés et autres environnements commerciaux intérieurs à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud.',
      directAnswer:
        'Si vous cherchez un service de nettoyage commercial fiable à Montréal, Sparkling Stays vous aide à garder un lieu de travail présentable, hygiénique et plus simple à gérer. Nous adaptons la portée du service à votre espace, au niveau de circulation et à vos heures d’ouverture afin que le ménage soutienne vos opérations au lieu de les déranger.',
      lastUpdated: 'Dernière mise à jour : avril 2026',
      sections: {
        whyTitle: 'À quoi sert notre service de nettoyage commercial',
        whyBody:
          'Les espaces commerciaux demandent plus qu’une liste de tâches générique. Les entrées, réceptions, salles de bain, salles de pause, salles de traitement, cuisines partagées, salles de réunion et surfaces fréquemment touchées influencent directement l’expérience des employés et des visiteurs. Notre service est conçu pour maintenir un environnement de travail plus propre, limiter l’accumulation visible et soutenir une image professionnelle constante.',
        includedTitle: 'Tâches couramment incluses en nettoyage commercial',
        includedItems: [
          'Nettoyage et désinfection des salles de bain, lavabos, miroirs, accessoires et points de contact fréquents',
          'Essuyage des bureaux, comptoirs, surfaces d’accueil, tables et autres zones de travail accessibles selon les besoins',
          'Époussetage du mobilier accessible, rebords, tablettes, moulures et surfaces partagées',
          'Aspiration et lavage des planchers dans les bureaux, couloirs, salles d’attente et aires communes commerciales',
          'Nettoyage des salles de pause et cuisinettes, y compris comptoirs, éviers, extérieur des appareils et zones touchées',
          'Vidage des poubelles et remise en ordre générale des espaces utilisés par le personnel et la clientèle'
        ],
        fitTitle: 'Adapté aux bureaux, cliniques, commerces et entreprises de service',
        fitBody:
          'Le nettoyage commercial convient particulièrement aux lieux qui reçoivent du personnel chaque jour, accueillent des clients ou doivent respecter des attentes constantes en matière de propreté. Les bureaux à Montréal ont souvent besoin d’un entretien hors des heures d’ouverture pour ne pas nuire à la productivité. Les cliniques et espaces bien-être bénéficient de routines de désinfection fiables. Les commerces et entreprises de service ont besoin d’une présentation régulière qui reflète la qualité de leur marque.',
        processTitle: 'Comment démarrer un service commercial',
        processItems: [
          'Vous nous indiquez votre type d’entreprise, la superficie, l’horaire souhaité et si vous préférez un service de jour, de soir ou récurrent.',
          'Nous confirmons la portée du service, les zones prioritaires et les détails pratiques comme l’accès, la circulation et les espaces clients à privilégier.',
          'Notre équipe suit le plan convenu afin de garder votre lieu de travail propre, professionnel et prêt pour votre équipe comme pour vos visiteurs.'
        ],
        trustTitle: 'Pourquoi les entreprises choisissent Sparkling Stays',
        trustItems: [
          'Convient aux bureaux, cliniques, commerces, studios et autres espaces professionnels intérieurs',
          'Communication bilingue en français et en anglais',
          'Service offert à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud',
          'Portée flexible adaptée aux opérations réelles et aux standards de présentation de votre entreprise'
        ],
        faqTitle: 'FAQ sur le nettoyage commercial',
        faqs: [
          {
            question: 'Quels types d’entreprises nettoyez-vous?',
            answer:
              'Nous offrons le nettoyage commercial pour les bureaux, cliniques, boutiques, studios, entreprises de service et autres espaces professionnels dans le Grand Montréal.'
          },
          {
            question: 'Le nettoyage commercial peut-il être planifié hors des heures d’ouverture?',
            answer:
              'Oui. Plusieurs entreprises préfèrent un entretien avant l’ouverture, après la fermeture ou pendant les périodes plus calmes afin de ne pas interrompre les opérations.'
          },
          {
            question: 'Nettoyez-vous les espaces employés et les zones destinées aux clients?',
            answer:
              'Oui. Nous pouvons couvrir la réception, les bureaux, salles de bain, salles de réunion, salles de pause et autres espaces intérieurs selon la portée convenue.'
          },
          {
            question: 'Quels secteurs desservez-vous pour le nettoyage commercial?',
            answer:
              'Nous desservons Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud. Si votre entreprise est située à proximité, contactez-nous pour confirmer la disponibilité.'
          },
          {
            question: 'Le service de nettoyage commercial est-il offert en français et en anglais?',
            answer:
              'Oui. Sparkling Stays offre un service bilingue afin que la coordination et la planification se fassent facilement dans la langue de votre choix.'
          }
        ]
      },
      ctas: {
        primary: 'Réserver un nettoyage commercial',
        secondary: 'Voir les tarifs',
        contact: 'Nous contacter'
      },
      metaTitle: 'Nettoyage commercial à Montréal | Sparkling Stays',
      metaDescription:
        'Service de nettoyage commercial à Montréal pour bureaux, cliniques, commerces et espaces professionnels. Sparkling Stays dessert Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud.',
      areaServed: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
      heroCtaTitle: 'Besoin d’un lieu de travail plus propre, prêt pour l’équipe et la clientèle?',
      heroCtaBody:
        'Réservez un service de nettoyage commercial avec Sparkling Stays pour un entretien fiable qui aide votre entreprise à rester professionnelle et bien organisée.'
    }
  }
} as const satisfies Record<string, Record<Locale, ServicePageContent>>;

function getServicePageContent(service: string, locale: Locale) {
  const routeContent = servicePageContent[service as keyof typeof servicePageContent];
  return routeContent?.[locale];
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale, service} = await params;
  const routeContent = getServicePageContent(service, locale as Locale);

  if (routeContent) {
    return {
      title: routeContent.metaTitle,
      description: routeContent.metaDescription,
      alternates: {
        canonical: getCanonical(locale, `/services/${service}`),
        languages: {
          'en-CA': `${siteConfig.url}/en/services/${service}`,
          'fr-CA': `${siteConfig.url}/fr/services/${service}`
        }
      }
    };
  }

  const match = services.find((item) => item.slug === service);

  if (!match) {
    return {};
  }

  return {
    title: `${match.name[locale as Locale]} | Sparkling Stays Montreal`,
    description: match.description[locale as Locale],
    alternates: {
      canonical: getCanonical(locale, `/services/${service}`),
      languages: {
        'en-CA': `${siteConfig.url}/en/services/${service}`,
        'fr-CA': `${siteConfig.url}/fr/services/${service}`
      }
    }
  };
}

export default async function ServiceDetailPage({params}: {params: Params}) {
  const {locale, service} = await params;
  setRequestLocale(locale);

  const match = services.find((item) => item.slug === service);

  if (!match) {
    notFound();
  }

  const content = getServicePageContent(service, locale as Locale);

  if (!content) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumbs
          items={[
            {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
            {label: locale === 'fr' ? 'Services' : 'Services', href: '/services'},
            {label: match.name[locale as Locale]}
          ]}
        />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Phase 1 queue</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">{match.name[locale as Locale]}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">{match.description[locale as Locale]}</p>
        <p className="mt-6 text-slate-700">
          {locale === 'fr'
            ? 'La structure de cette page est prête. Le contenu complet sera ajouté dans la prochaine passe de production des services.'
            : 'This page structure is ready. Full content will be added in the next service production pass.'}
        </p>
        <div className="mt-8">
          <CTAButton href="/book-now" locale={locale}>
            {locale === 'fr' ? 'Réserver' : 'Book now'}
          </CTAButton>
        </div>
      </section>
    );
  }

  const serviceName = match.name[locale as Locale];
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.sections.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: content.description,
    areaServed: content.areaServed,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: '+1-438-867-8770',
      email: siteConfig.email,
      url: `${siteConfig.url}/${locale}`
    },
    url: `${siteConfig.url}/${locale}/services/${service}`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />

      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: locale === 'fr' ? 'Services' : 'Services', href: '/services'},
              {label: serviceName}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.directAnswer}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/book-now" locale={locale}>{content.ctas.primary}</CTAButton>
            <CTAButton href="/pricing" locale={locale} variant="secondary">{content.ctas.secondary}</CTAButton>
          </div>
          <p className="mt-6 text-sm text-slate-300">{content.lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg leading-8 text-slate-700">{content.intro}</p>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.sections.whyTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.sections.whyBody}</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.sections.fitTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.sections.fitBody}</p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-950">{content.sections.includedTitle}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                {content.sections.includedItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-950">{content.sections.trustTitle}</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                {content.sections.trustItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-bold text-slate-950">{content.sections.processTitle}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {content.sections.processItems.map((item, index) => (
                <div key={item} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-950">{content.sections.faqTitle}</h2>
        </div>
        <div className="mt-10">
          <FAQAccordion items={content.sections.faqs} />
        </div>
      </section>

      <section className="bg-[#1a1a2e] py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{content.heroCtaTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">{content.heroCtaBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/book-now" locale={locale}>{content.ctas.primary}</CTAButton>
            <CTAButton href="/contact" locale={locale} variant="secondary">
              {content.ctas.contact}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
