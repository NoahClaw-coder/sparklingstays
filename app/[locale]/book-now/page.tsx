import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {siteConfig, getCanonical} from '@/lib/seo';
import {CTAButton} from '@/components/ui/CTAButton';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';
type Params = Promise<{locale: string}>;

type BookNowPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  heroNote: string;
  guidanceTitle: string;
  guidanceIntro: string;
  serviceCards: {
    name: string;
    summary: string;
    bestFor: string[];
  }[];
  expectationTitle: string;
  expectationItems: string[];
  processTitle: string;
  processSteps: {
    title: string;
    body: string;
  }[];
  contactCardTitle: string;
  contactCardBody: string;
  contactHighlights: string[];
  quoteCardTitle: string;
  quoteCardBody: string;
  quoteHighlights: string[];
  checklistTitle: string;
  checklistItems: string[];
  faqTitle: string;
  faqs: {question: string; answer: string}[];
  finalTitle: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const bookNowPageContent = {
  en: {
    eyebrow: 'Start your cleaning request with the right path',
    title: 'Book Cleaning Service in Montreal',
    description:
      'Sparkling Stays helps Montreal-area clients move from “I need cleaning” to the right next step fast. Choose the service type, understand what to expect, and either request a quote or contact our team directly for booking support.',
    metaTitle: 'Book Cleaning Service in Montreal | Sparkling Stays',
    metaDescription:
      'Book residential or commercial cleaning in Montreal, Laval, West Island, and the South Shore. Choose the right service path, understand the process, and request your quote.',
    lastUpdated: 'Last updated: April 2026',
    primaryCta: 'Request a quote',
    secondaryCta: 'Contact our team',
    secondaryHref: '/contact',
    heroNote:
      'Online instant checkout is not live on this page yet. For now, we use a guided booking path so you get the right scope, timing, and quote instead of being pushed into the wrong package.',
    guidanceTitle: 'Choose the service path that matches your space',
    guidanceIntro:
      'Most booking delays happen when the service type is unclear. If you choose the right category first, we can guide pricing and timing much faster.',
    serviceCards: [
      {
        name: 'Recurring home cleaning',
        summary: 'Best for weekly, biweekly, or monthly maintenance in condos, apartments, and family homes.',
        bestFor: [
          'Homes that are already in reasonably good shape',
          'Busy households that want a reliable cleaning rhythm',
          'Clients who want the best long-term value per visit'
        ]
      },
      {
        name: 'One-time or deep cleaning',
        summary: 'Best when the home needs a reset before guests, after a busy period, or before starting recurring service.',
        bestFor: [
          'First-time professional cleaning visits',
          'Seasonal resets or catch-up cleaning',
          'Homes with heavier buildup or detail-focused needs'
        ]
      },
      {
        name: 'Commercial cleaning',
        summary: 'Best for offices, retail spaces, clinics, and workplaces that need dependable scheduled upkeep.',
        bestFor: [
          'Client-facing businesses where presentation matters',
          'Teams that need recurring cleaning after hours or during low-disruption windows',
          'Spaces that need custom quote support rather than flat residential pricing'
        ]
      }
    ],
    expectationTitle: 'What to expect before your booking is confirmed',
    expectationItems: [
      'We review your service type, location, and the size or layout of the space.',
      'We confirm whether standard upkeep, deep cleaning, or commercial scope is the best fit.',
      'We provide the next step clearly: a quote, a callback, or direct scheduling support when the scope is straightforward.',
      'If your request needs custom pricing, we do not fake an instant booking. We guide you to the correct quote path instead.'
    ],
    processTitle: 'How the interim booking flow works',
    processSteps: [
      {
        title: '1. Tell us what you need',
        body: 'Share whether the space is residential or commercial, the approximate size, your preferred timing, and whether this is recurring or one-time service.'
      },
      {
        title: '2. We match the right scope',
        body: 'We use your details to recommend the right cleaning category so pricing and expectations are based on the real condition of the space.'
      },
      {
        title: '3. You get the right next step',
        body: 'Simple requests can move quickly toward scheduling. More detailed jobs are routed to quote support so nothing important gets missed.'
      }
    ],
    contactCardTitle: 'Need help before you submit?',
    contactCardBody:
      'If you are unsure which service fits your space, contact Sparkling Stays directly and we will point you to the right option in English or French.',
    contactHighlights: [
      `Call ${siteConfig.phone}`,
      `Email ${siteConfig.email}`,
      'Helpful for urgent questions, service selection, or commercial requests'
    ],
    quoteCardTitle: 'Best path for most new clients',
    quoteCardBody:
      'Requesting a quote is usually the fastest way to start because it lets us confirm the right scope before locking in timing.',
    quoteHighlights: [
      'Ideal for first-time visits and deep cleaning',
      'Useful when your home size or condition may affect the final scope',
      'Recommended for all commercial cleaning requests'
    ],
    checklistTitle: 'What to include in your request',
    checklistItems: [
      'Your location in Montreal, Laval, West Island, or the South Shore',
      'Type of property: condo, apartment, house, office, clinic, retail, or other workspace',
      'Approximate size or number of rooms',
      'Whether you want recurring cleaning, one-time cleaning, or a deeper reset',
      'Any timing needs, access notes, or priority areas'
    ],
    faqTitle: 'Booking FAQs',
    faqs: [
      {
        question: 'Can I fully book online right now from this page?',
        answer:
          'Not yet. This page currently routes you through a guided quote or contact path so we can confirm the right service and avoid incorrect bookings.'
      },
      {
        question: 'What is the fastest way to get started?',
        answer:
          'For most first-time clients, requesting a quote is the fastest path because it gives our team the details needed to confirm the right scope and next step.'
      },
      {
        question: 'Should I choose quote support or direct contact?',
        answer:
          'Choose quote support if you need pricing or are unsure about the correct scope. Choose direct contact if you have a quick question, need bilingual guidance, or want help deciding between services.'
      },
      {
        question: 'Do commercial cleaning requests follow the same path?',
        answer:
          'Commercial requests are usually handled through custom quote support because the schedule, traffic, and workspace setup affect the final scope more than a simple flat rate would.'
      },
      {
        question: 'Do you support clients in both English and French?',
        answer:
          'Yes. Sparkling Stays supports booking and quote requests in both English and French.'
      }
    ],
    finalTitle: 'Ready to move forward?',
    finalBody:
      'Start with the path that matches your space. We will help you get from inquiry to the right cleaning plan without pretending every booking is one-click simple.',
    finalPrimary: 'Request your quote',
    finalSecondary: 'Talk to us first'
  },
  fr: {
    eyebrow: 'Commencez votre demande avec le bon parcours',
    title: 'Réserver un service de nettoyage à Montréal',
    description:
      'Sparkling Stays aide les clients du Grand Montréal à passer rapidement de “j’ai besoin de ménage” à la bonne prochaine étape. Choisissez le bon type de service, comprenez le processus, puis demandez un devis ou contactez notre équipe directement.',
    metaTitle: 'Réserver un service de nettoyage à Montréal | Sparkling Stays',
    metaDescription:
      'Réservez un service de nettoyage résidentiel ou commercial à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Choisissez le bon parcours et demandez votre devis.',
    lastUpdated: 'Dernière mise à jour : avril 2026',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Contacter notre équipe',
    secondaryHref: '/contact',
    heroNote:
      'La réservation instantanée en ligne n’est pas encore active sur cette page. Pour le moment, nous utilisons un parcours guidé afin de confirmer la bonne portée, le bon moment et le bon devis plutôt que de vous diriger vers un forfait mal adapté.',
    guidanceTitle: 'Choisissez le parcours adapté à votre espace',
    guidanceIntro:
      'La plupart des retards commencent lorsque le type de service n’est pas clair. Si la bonne catégorie est choisie dès le départ, nous pouvons confirmer le prix et l’horaire beaucoup plus rapidement.',
    serviceCards: [
      {
        name: 'Entretien ménager récurrent',
        summary: 'Le meilleur choix pour un entretien hebdomadaire, aux deux semaines ou mensuel dans les condos, appartements et maisons.',
        bestFor: [
          'Les logements déjà dans un état généralement correct',
          'Les foyers occupés qui veulent un rythme de nettoyage fiable',
          'Les clients qui recherchent la meilleure valeur à long terme par visite'
        ]
      },
      {
        name: 'Ménage ponctuel ou grand ménage',
        summary: 'Le meilleur choix lorsque le logement a besoin d’une remise à niveau avant des invités, après une période chargée ou avant de commencer un service récurrent.',
        bestFor: [
          'Les premières visites de nettoyage professionnel',
          'Les remises à neuf saisonnières ou le rattrapage',
          'Les logements avec plus d’accumulation ou des besoins plus détaillés'
        ]
      },
      {
        name: 'Nettoyage commercial',
        summary: 'Le meilleur choix pour les bureaux, commerces, cliniques et lieux de travail qui ont besoin d’un entretien régulier fiable.',
        bestFor: [
          'Les entreprises recevant des clients où la présentation compte',
          'Les équipes qui veulent un entretien récurrent après les heures d’ouverture ou avec peu de perturbation',
          'Les espaces qui ont besoin d’un devis personnalisé plutôt qu’un tarif résidentiel fixe'
        ]
      }
    ],
    expectationTitle: 'À quoi vous attendre avant la confirmation',
    expectationItems: [
      'Nous vérifions le type de service, l’emplacement et la taille ou la configuration de l’espace.',
      'Nous confirmons si un entretien standard, un grand ménage ou une portée commerciale est le meilleur choix.',
      'Nous indiquons clairement la prochaine étape : devis, rappel ou soutien direct à la réservation lorsque la demande est simple.',
      'Si votre demande exige un prix personnalisé, nous ne simulons pas une réservation instantanée. Nous vous dirigeons vers le bon parcours de devis.'
    ],
    processTitle: 'Comment fonctionne le parcours de réservation actuel',
    processSteps: [
      {
        title: '1. Dites-nous ce qu’il vous faut',
        body: 'Indiquez si l’espace est résidentiel ou commercial, sa taille approximative, le moment souhaité et s’il s’agit d’un service récurrent ou ponctuel.'
      },
      {
        title: '2. Nous confirmons la bonne portée',
        body: 'Nous utilisons vos détails pour recommander la bonne catégorie de nettoyage afin que le prix et les attentes reflètent la vraie réalité des lieux.'
      },
      {
        title: '3. Vous obtenez la bonne prochaine étape',
        body: 'Les demandes simples peuvent avancer rapidement vers la planification. Les mandats plus détaillés sont dirigés vers un devis afin de ne rien manquer.'
      }
    ],
    contactCardTitle: 'Besoin d’aide avant de soumettre votre demande?',
    contactCardBody:
      'Si vous ne savez pas quel service convient à votre espace, contactez directement Sparkling Stays et nous vous orienterons vers la bonne option en français ou en anglais.',
    contactHighlights: [
      `Appelez au ${siteConfig.phone}`,
      `Écrivez à ${siteConfig.email}`,
      'Pratique pour les questions urgentes, le choix du service ou les demandes commerciales'
    ],
    quoteCardTitle: 'Le meilleur parcours pour la plupart des nouveaux clients',
    quoteCardBody:
      'Demander un devis est généralement la façon la plus rapide de commencer, parce que cela nous permet de confirmer la bonne portée avant de fixer le moment du service.',
    quoteHighlights: [
      'Idéal pour les premières visites et les grands ménages',
      'Utile lorsque la taille ou l’état du logement peut influencer la portée finale',
      'Recommandé pour toutes les demandes de nettoyage commercial'
    ],
    checklistTitle: 'Quoi inclure dans votre demande',
    checklistItems: [
      'Votre secteur à Montréal, Laval, dans l’Ouest-de-l’Île ou sur la Rive-Sud',
      'Le type de propriété : condo, appartement, maison, bureau, clinique, commerce ou autre espace',
      'La taille approximative ou le nombre de pièces',
      'Le fait que vous vouliez un entretien récurrent, ponctuel ou une remise à neuf plus complète',
      'Les besoins d’horaire, les notes d’accès ou les zones prioritaires'
    ],
    faqTitle: 'FAQ sur la réservation',
    faqs: [
      {
        question: 'Puis-je réserver entièrement en ligne à partir de cette page?',
        answer:
          'Pas encore. Pour le moment, cette page vous dirige vers un parcours guidé par devis ou contact afin de confirmer le bon service et d’éviter les réservations inexactes.'
      },
      {
        question: 'Quelle est la façon la plus rapide de commencer?',
        answer:
          'Pour la plupart des nouveaux clients, demander un devis est le chemin le plus rapide, car notre équipe obtient ainsi les détails nécessaires pour confirmer la bonne portée et la prochaine étape.'
      },
      {
        question: 'Devrais-je demander un devis ou contacter l’équipe directement?',
        answer:
          'Choisissez le devis si vous voulez un prix ou si la portée n’est pas encore claire. Choisissez le contact direct si vous avez une question rapide, besoin d’un accompagnement bilingue ou d’aide pour choisir entre les services.'
      },
      {
        question: 'Les demandes commerciales suivent-elles le même parcours?',
        answer:
          'Les demandes commerciales passent habituellement par un devis personnalisé, parce que l’horaire, le passage et la configuration des lieux influencent davantage la portée finale qu’un simple tarif fixe.'
      },
      {
        question: 'Offrez-vous le service en français et en anglais?',
        answer:
          'Oui. Sparkling Stays accompagne les demandes de réservation et de devis dans les deux langues.'
      }
    ],
    finalTitle: 'Prêt à avancer?',
    finalBody:
      'Commencez par le parcours adapté à votre espace. Nous vous aiderons à passer de la demande au bon plan de nettoyage sans prétendre que chaque réservation se fait en un seul clic.',
    finalPrimary: 'Demander votre devis',
    finalSecondary: 'Parler à notre équipe d’abord'
  }
} as const satisfies Record<Locale, BookNowPageContent>;

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale} = await params;
  const content = bookNowPageContent[locale as Locale] ?? bookNowPageContent.en;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: getCanonical(locale, '/book-now'),
      languages: {
        'en-CA': `${siteConfig.url}/en/book-now`,
        'fr-CA': `${siteConfig.url}/fr/book-now`
      }
    }
  };
}

export default async function BookNowPage({params}: {params: Params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = bookNowPageContent[locale as Locale] ?? bookNowPageContent.en;

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

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore']
    },
    description: content.description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd)}} />

      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: locale === 'fr' ? 'Réserver' : 'Book now'}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/contact" locale={locale}>{content.primaryCta}</CTAButton>
            <CTAButton href={content.secondaryHref} locale={locale} variant="secondary">
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
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">{content.guidanceTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">{content.guidanceIntro}</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {content.serviceCards.map((card) => (
                <article key={card.name} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-xl font-bold text-slate-950">{card.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{card.summary}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                    {card.bestFor.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-950">{content.expectationTitle}</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
              {content.expectationItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-3xl font-bold text-slate-950">{content.processTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {content.processSteps.map((step) => (
                <div key={step.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-950">{content.quoteCardTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.quoteCardBody}</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              {content.quoteHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CTAButton href="/contact" locale={locale}>{content.primaryCta}</CTAButton>
            </div>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-950">{content.contactCardTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.contactCardBody}</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              {content.contactHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CTAButton href={content.secondaryHref} locale={locale} variant="secondary">
                {content.secondaryCta}
              </CTAButton>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-[#1a1a2e] p-8 text-white">
            <h2 className="text-3xl font-bold tracking-tight">{content.checklistTitle}</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2 text-sm leading-7 text-slate-200">
              {content.checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f4d58d]" />
                  <span>{item}</span>
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
            <CTAButton href={content.secondaryHref} locale={locale} variant="secondary">
              {content.finalSecondary}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
