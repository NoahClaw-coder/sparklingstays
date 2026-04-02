import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {siteConfig, getCanonical} from '@/lib/seo';
import {CTAButton} from '@/components/ui/CTAButton';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';
type Params = Promise<{locale: string}>;

type AboutPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  primaryCta: string;
  secondaryCta: string;
  heroNote: string;
  introTitle: string;
  introBody: string;
  positioningTitle: string;
  positioningBody: string;
  positioningPoints: string[];
  coverageTitle: string;
  coverageIntro: string;
  coverageAreas: string[];
  audienceTitle: string;
  audienceIntro: string;
  audienceCards: {
    title: string;
    body: string;
    bullets: string[];
  }[];
  reasonsTitle: string;
  reasons: {
    title: string;
    body: string;
  }[];
  standardsTitle: string;
  standardsBody: string;
  standardsPoints: string[];
  faqTitle: string;
  faqs: {question: string; answer: string}[];
  finalTitle: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const aboutPageContent = {
  en: {
    eyebrow: 'A practical cleaning partner for homes and businesses',
    title: 'About Sparkling Stays',
    description:
      'Sparkling Stays provides professional residential and commercial cleaning across Montreal, Laval, the West Island, and the South Shore. We focus on clear communication, dependable service, and honest scope guidance so clients know what to expect before the visit begins.',
    metaTitle: 'About Sparkling Stays | Montreal Cleaning Company',
    metaDescription:
      'Learn about Sparkling Stays, a Montreal-area cleaning company serving homes and businesses across Montreal, Laval, West Island, and the South Shore with clear communication and dependable service.',
    lastUpdated: 'Last updated: April 2026',
    primaryCta: 'Request a quote',
    secondaryCta: 'Book now',
    heroNote:
      'We keep our positioning grounded: no inflated claims, no fake certifications, and no made-up origin story. Clients choose Sparkling Stays because they want a cleaning company that communicates clearly, shows up prepared, and matches the service to the real condition of the space.',
    introTitle: 'Built around trust, clarity, and repeatable quality',
    introBody:
      'A cleaning company does not earn trust from nice branding alone. It earns trust by being clear about what is included, responsive when clients have questions, and realistic about scope, timing, and pricing. Sparkling Stays is positioned for clients who want that kind of straightforward service experience instead of vague promises or last-minute surprises.',
    positioningTitle: 'What Sparkling Stays stands for',
    positioningBody:
      'We serve clients who care about a well-kept home, a professional business environment, or a smoother rental turnover process. That means our role is not just to “clean,” but to reduce stress, protect presentation, and make ongoing upkeep easier to manage.',
    positioningPoints: [
      'Clear service guidance for residential, commercial, and higher-detail cleaning needs',
      'Bilingual support in English and French for inquiries, quotes, and service coordination',
      'Honest quote framing based on the real size, condition, and priorities of the space',
      'A local Greater Montreal focus instead of trying to look like a generic national brand'
    ],
    coverageTitle: 'Service coverage across Greater Montreal',
    coverageIntro:
      'Sparkling Stays supports clients across the main Montreal-area service zones we reference throughout the site. If your property falls within one of these areas, we can guide you toward the right next step quickly.',
    coverageAreas: ['Montreal', 'Laval', 'West Island', 'South Shore'],
    audienceTitle: 'Who Sparkling Stays is for',
    audienceIntro:
      'Our best-fit clients usually care about reliability, communication, and a cleaner space that supports daily life or day-to-day operations. We are especially well positioned for:',
    audienceCards: [
      {
        title: 'Busy households',
        body: 'For homeowners, condo residents, tenants, and families who want regular upkeep or a one-time reset without unclear pricing or confusing booking paths.',
        bullets: [
          'Recurring home cleaning',
          'Deep cleaning before or after busy periods',
          'Support for condos, apartments, and family homes'
        ]
      },
      {
        title: 'Property-focused clients',
        body: 'For Airbnb hosts, rental operators, and people preparing a property for guests, turnover, or presentation-sensitive moments.',
        bullets: [
          'Short-term rental cleaning support',
          'Presentation-first service expectations',
          'Fast direction toward the right scope for turnovers or resets'
        ]
      },
      {
        title: 'Businesses and professional spaces',
        body: 'For offices, retail environments, clinics, and other workplaces that need dependable cleaning support and a quote process tied to the real operating environment.',
        bullets: [
          'Custom commercial scope guidance',
          'Scheduling that respects business operations',
          'A professional standard for client-facing spaces'
        ]
      }
    ],
    reasonsTitle: 'Why clients choose Sparkling Stays',
    reasons: [
      {
        title: 'Straight answers before the visit',
        body: 'We explain the likely service path, the quote logic, and the next step clearly instead of hiding key details behind generic marketing language.'
      },
      {
        title: 'Local coverage with practical expectations',
        body: 'Our service positioning is built around Greater Montreal realities, including neighborhood travel, property types, and bilingual client support.'
      },
      {
        title: 'Residential and commercial flexibility',
        body: 'Some clients need recurring household support, others need deeper one-time work, and businesses often need custom scoping. We account for that instead of forcing every request into one package.'
      },
      {
        title: 'A cleaner handoff from inquiry to service',
        body: 'The goal is to reduce confusion early so clients can move from “I need help” to the right quote, booking path, or conversation without friction.'
      }
    ],
    standardsTitle: 'How we think about quality and trust',
    standardsBody:
      'Trust is built through process. Sparkling Stays emphasizes clear intake, realistic service recommendations, and consistent communication because those are the things that help a cleaning relationship last. We do not rely on exaggerated claims to create confidence.',
    standardsPoints: [
      'Clear recommendations on whether a space needs maintenance cleaning, deep cleaning, or commercial scope',
      'Service communication designed to keep expectations aligned before the appointment',
      'Practical support for both first-time and recurring clients',
      'A focus on dependable presentation for homes, rentals, and business environments'
    ],
    faqTitle: 'About Sparkling Stays FAQs',
    faqs: [
      {
        question: 'What kind of cleaning company is Sparkling Stays?',
        answer:
          'Sparkling Stays is a Montreal-area cleaning company focused on residential and commercial service across Montreal, Laval, the West Island, and the South Shore. The brand is positioned around clear communication, honest quote guidance, and dependable service support.'
      },
      {
        question: 'Who is Sparkling Stays best for?',
        answer:
          'Sparkling Stays is a strong fit for busy households, Airbnb or rental-related property needs, and businesses that want a professional cleaning partner without vague pricing or unclear scope.'
      },
      {
        question: 'Do you serve clients in both English and French?',
        answer:
          'Yes. Sparkling Stays supports clients in both English and French for quote requests, service questions, and scheduling conversations.'
      },
      {
        question: 'What areas do you cover?',
        answer:
          'Sparkling Stays serves Montreal, Laval, the West Island, and the South Shore, with service guidance built around Greater Montreal coverage.'
      },
      {
        question: 'Why does Sparkling Stays avoid overly specific company-history claims here?',
        answer:
          'Because this page is written to stay grounded in what can be supported. Rather than inventing credentials or a brand story for marketing effect, we focus on the real value clients can evaluate: communication, scope clarity, local coverage, and service fit.'
      }
    ],
    finalTitle: 'Want to see if Sparkling Stays is the right fit?',
    finalBody:
      'Tell us about your home, rental, office, clinic, or commercial space. We will guide you to the right cleaning path with clear next steps instead of pushing a one-size-fits-all package.',
    finalPrimary: 'Get your quote',
    finalSecondary: 'Start booking'
  },
  fr: {
    eyebrow: 'Un partenaire de nettoyage pratique pour les logements et les entreprises',
    title: 'À propos de Sparkling Stays',
    description:
      'Sparkling Stays offre des services d’entretien ménager résidentiel et commercial à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Nous misons sur une communication claire, un service fiable et un cadrage honnête de la portée afin que les clients sachent à quoi s’attendre avant même la visite.',
    metaTitle: 'À propos de Sparkling Stays | Entreprise de nettoyage à Montréal',
    metaDescription:
      'Découvrez Sparkling Stays, une entreprise de nettoyage du Grand Montréal au service des logements et des entreprises à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud.',
    lastUpdated: 'Dernière mise à jour : avril 2026',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Réserver maintenant',
    heroNote:
      'Notre positionnement reste volontairement réaliste : pas de promesses gonflées, pas de certifications inventées et pas d’histoire d’entreprise fabriquée. Les clients choisissent Sparkling Stays parce qu’ils veulent une entreprise de nettoyage qui communique clairement, arrive préparée et adapte le service à l’état réel des lieux.',
    introTitle: 'Pensé autour de la confiance, de la clarté et d’une qualité reproductible',
    introBody:
      'Une entreprise de nettoyage ne gagne pas la confiance grâce à son image seulement. Elle la gagne en expliquant clairement ce qui est inclus, en répondant rapidement aux questions et en restant réaliste sur la portée, l’horaire et le prix. Sparkling Stays s’adresse aux clients qui recherchent ce type d’expérience simple et directe plutôt que des promesses vagues ou des surprises de dernière minute.',
    positioningTitle: 'Ce que représente Sparkling Stays',
    positioningBody:
      'Nous accompagnons les clients qui veulent un logement bien entretenu, un environnement professionnel propre ou une meilleure préparation d’un bien locatif. Notre rôle ne se limite donc pas à “faire le ménage”, mais aussi à réduire le stress, protéger la présentation des lieux et simplifier l’entretien au fil du temps.',
    positioningPoints: [
      'Un accompagnement clair pour les besoins résidentiels, commerciaux et les nettoyages plus détaillés',
      'Un service bilingue en français et en anglais pour les demandes, devis et suivis',
      'Un devis honnête selon la taille réelle, l’état des lieux et les priorités du client',
      'Une approche locale du Grand Montréal plutôt qu’une image générique de grande chaîne'
    ],
    coverageTitle: 'Couverture dans le Grand Montréal',
    coverageIntro:
      'Sparkling Stays accompagne les clients dans les principales zones de service mises de l’avant sur le site. Si votre propriété se trouve dans l’un de ces secteurs, nous pouvons vous orienter rapidement vers la bonne prochaine étape.',
    coverageAreas: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
    audienceTitle: 'Pour qui Sparkling Stays est le bon choix',
    audienceIntro:
      'Nos meilleurs clients recherchent surtout la fiabilité, une bonne communication et un espace plus propre qui soutient leur quotidien ou leurs opérations. Nous sommes particulièrement bien positionnés pour :',
    audienceCards: [
      {
        title: 'Les foyers occupés',
        body: 'Pour les propriétaires, résidents de condo, locataires et familles qui veulent un entretien régulier ou une remise à niveau ponctuelle sans prix flou ni parcours compliqué.',
        bullets: [
          'Entretien ménager récurrent',
          'Grand ménage avant ou après une période chargée',
          'Soutien pour condos, appartements et maisons familiales'
        ]
      },
      {
        title: 'Les clients axés sur la propriété',
        body: 'Pour les hôtes Airbnb, opérateurs locatifs et personnes qui préparent un bien pour des invités, une rotation ou un moment où la présentation compte.',
        bullets: [
          'Soutien pour locations court terme',
          'Attentes centrées sur la présentation',
          'Orientation rapide vers la bonne portée pour les turnovers ou remises à niveau'
        ]
      },
      {
        title: 'Les entreprises et espaces professionnels',
        body: 'Pour les bureaux, commerces, cliniques et autres lieux de travail qui veulent un soutien fiable et un devis lié à la réalité opérationnelle du site.',
        bullets: [
          'Cadrage commercial personnalisé',
          'Planification qui respecte les opérations de l’entreprise',
          'Standard professionnel pour les espaces accueillant des clients'
        ]
      }
    ],
    reasonsTitle: 'Pourquoi les clients choisissent Sparkling Stays',
    reasons: [
      {
        title: 'Des réponses claires avant la visite',
        body: 'Nous expliquons clairement le parcours de service probable, la logique du devis et la prochaine étape au lieu de cacher les informations importantes derrière un langage marketing vague.'
      },
      {
        title: 'Une couverture locale avec des attentes réalistes',
        body: 'Notre positionnement est pensé pour les réalités du Grand Montréal, y compris les déplacements, les types de propriétés et l’accompagnement bilingue.'
      },
      {
        title: 'Une vraie flexibilité résidentielle et commerciale',
        body: 'Certains clients ont besoin d’un entretien récurrent, d’autres d’un ménage ponctuel plus poussé, et les entreprises demandent souvent une portée sur mesure. Nous en tenons compte au lieu d’imposer le même forfait à tout le monde.'
      },
      {
        title: 'Un passage plus simple de la demande au service',
        body: 'Le but est de réduire la confusion dès le départ afin que le client passe plus facilement de “j’ai besoin d’aide” au bon devis, à la bonne réservation ou à la bonne conversation.'
      }
    ],
    standardsTitle: 'Notre approche de la qualité et de la confiance',
    standardsBody:
      'La confiance se construit par le processus. Sparkling Stays met l’accent sur une bonne prise d’informations, des recommandations réalistes et une communication constante, parce que ce sont ces éléments qui aident la relation de service à durer. Nous ne comptons pas sur des promesses exagérées pour inspirer confiance.',
    standardsPoints: [
      'Des recommandations claires entre entretien standard, grand ménage ou portée commerciale',
      'Une communication conçue pour garder les attentes alignées avant le rendez-vous',
      'Un accompagnement pratique pour les nouveaux clients comme pour les clients récurrents',
      'Une attention particulière à la présentation des logements, locations et espaces professionnels'
    ],
    faqTitle: 'FAQ à propos de Sparkling Stays',
    faqs: [
      {
        question: 'Quel type d’entreprise est Sparkling Stays?',
        answer:
          'Sparkling Stays est une entreprise de nettoyage du Grand Montréal axée sur les services résidentiels et commerciaux à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. La marque mise sur une communication claire, des devis honnêtes et un accompagnement fiable.'
      },
      {
        question: 'Pour quels clients Sparkling Stays est-il le plus adapté?',
        answer:
          'Sparkling Stays convient bien aux foyers occupés, aux besoins liés aux propriétés locatives comme Airbnb, et aux entreprises qui veulent un partenaire de nettoyage professionnel sans portée floue ni tarification vague.'
      },
      {
        question: 'Offrez-vous le service en français et en anglais?',
        answer:
          'Oui. Sparkling Stays accompagne les clients en français et en anglais pour les demandes de devis, les questions de service et les échanges liés à la planification.'
      },
      {
        question: 'Quels secteurs couvrez-vous?',
        answer:
          'Sparkling Stays dessert Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud, avec un accompagnement conçu pour la réalité du Grand Montréal.'
      },
      {
        question: 'Pourquoi éviter d’afficher ici une histoire d’entreprise trop précise?',
        answer:
          'Parce que cette page a été rédigée pour rester ancrée dans ce qui peut être appuyé. Au lieu d’inventer des références ou une histoire de marque pour faire joli, nous mettons l’accent sur la valeur réelle que le client peut juger : la communication, la clarté de la portée, la couverture locale et l’adéquation du service.'
      }
    ],
    finalTitle: 'Vous voulez vérifier si Sparkling Stays vous convient?',
    finalBody:
      'Parlez-nous de votre logement, location, bureau, clinique ou espace commercial. Nous vous guiderons vers le bon parcours de nettoyage avec des prochaines étapes claires, sans vous pousser vers un forfait unique mal adapté.',
    finalPrimary: 'Obtenir votre devis',
    finalSecondary: 'Commencer la réservation'
  }
} as const satisfies Record<Locale, AboutPageContent>;

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale} = await params;
  const content = aboutPageContent[locale as Locale] ?? aboutPageContent.en;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: getCanonical(locale, '/about'),
      languages: {
        'en-CA': `${siteConfig.url}/en/about`,
        'fr-CA': `${siteConfig.url}/fr/about`
      }
    }
  };
}

export default async function AboutPage({params}: {params: Params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = aboutPageContent[locale as Locale] ?? aboutPageContent.en;

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

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: getCanonical(locale, '/about'),
    areaServed: content.coverageAreas,
    description: content.description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(aboutJsonLd)}} />

      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: locale === 'fr' ? 'À propos' : 'About'}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/contact" locale={locale}>{content.primaryCta}</CTAButton>
            <CTAButton href="/book-now" locale={locale} variant="secondary">
              {content.secondaryCta}
            </CTAButton>
          </div>
          <div className="mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
            {content.heroNote}
          </div>
          <p className="mt-6 text-sm text-slate-300">{content.lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.introTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.introBody}</p>
            </div>
            <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.positioningTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.positioningBody}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                {content.positioningPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-950">{content.coverageTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.coverageIntro}</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              {content.coverageAreas.map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                {locale === 'fr' ? 'Contact direct' : 'Direct contact'}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">{siteConfig.phone}</p>
              <p className="text-sm leading-7 text-slate-700">{siteConfig.email}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-950">{content.audienceTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.audienceIntro}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {content.audienceCards.map((card) => (
              <article key={card.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-xl font-bold text-slate-950">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">{card.body}</p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-3xl font-bold text-slate-950">{content.reasonsTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.reasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold text-slate-950">{reason.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-700">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-[#1a1a2e] p-8 text-white">
            <h2 className="text-3xl font-bold tracking-tight">{content.standardsTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">{content.standardsBody}</p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2 text-sm leading-7 text-slate-200">
              {content.standardsPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f4d58d]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-950">{content.faqTitle}</h2>
        </div>
        <div className="mt-10">
          <FAQAccordion items={content.faqs} />
        </div>
      </section>

      <section className="bg-[#1a1a2e] py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{content.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">{content.finalBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" locale={locale}>{content.finalPrimary}</CTAButton>
            <CTAButton href="/book-now" locale={locale} variant="secondary">
              {content.finalSecondary}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
