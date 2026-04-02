import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {siteConfig, getCanonical} from '@/lib/seo';
import {CTAButton} from '@/components/ui/CTAButton';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';
type Params = Promise<{locale: string}>;

type ContactPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  primaryCta: string;
  secondaryCta: string;
  heroNote: string;
  pathwaysTitle: string;
  pathwaysIntro: string;
  pathways: {
    title: string;
    body: string;
    bullets: string[];
    cta: string;
    href: string;
    variant?: 'secondary';
  }[];
  contactCardTitle: string;
  contactCardBody: string;
  directLabel: string;
  coverageLabel: string;
  inquiryLabel: string;
  inquiryTypes: string[];
  expectationsTitle: string;
  expectationsIntro: string;
  expectationItems: string[];
  areasTitle: string;
  areasIntro: string;
  serviceAreas: string[];
  prepTitle: string;
  prepItems: string[];
  faqTitle: string;
  faqs: {question: string; answer: string}[];
  finalTitle: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const contactPageContent = {
  en: {
    eyebrow: 'Clear next steps for cleaning inquiries in Greater Montreal',
    title: 'Contact Sparkling Stays',
    description:
      'Reach Sparkling Stays for residential and commercial cleaning inquiries across Montreal, Laval, the West Island, and the South Shore. Use this page to request a quote, ask a service question, or get direct help choosing the right cleaning path.',
    metaTitle: 'Contact Sparkling Stays | Montreal Cleaning Inquiries',
    metaDescription:
      'Contact Sparkling Stays for residential and commercial cleaning in Montreal, Laval, West Island, and the South Shore. Request a quote, ask questions, and get bilingual support.',
    lastUpdated: 'Last updated: April 2026',
    primaryCta: 'Request a quote',
    secondaryCta: 'Book now',
    heroNote:
      'This page is built to make contact easy, not to promise instant answers we cannot support. If you share the type of space, your area, and what kind of cleaning you need, we can guide you to the right next step faster.',
    pathwaysTitle: 'Choose the contact path that fits your request',
    pathwaysIntro:
      'Not every inquiry needs the same route. If you want pricing, request a quote. If you need help choosing the service or want to confirm fit first, contact the team directly.',
    pathways: [
      {
        title: 'Request a quote',
        body: 'Best for first-time visits, deep cleaning, commercial cleaning, and any request where the scope may depend on property size, condition, or priorities.',
        bullets: [
          'Recommended for most new residential clients',
          'Best path for commercial and custom-scope requests',
          'Useful when timing, layout, or condition may affect pricing'
        ],
        cta: 'Start your quote request',
        href: '/book-now'
      },
      {
        title: 'Contact the team directly',
        body: 'Best for quick questions, bilingual support, service selection help, or confirming whether Sparkling Stays covers your area before you move forward.',
        bullets: [
          `Call ${siteConfig.phone}`,
          `Email ${siteConfig.email}`,
          'Helpful for both English and French inquiries'
        ],
        cta: 'See direct contact details',
        href: '/contact',
        variant: 'secondary'
      }
    ],
    contactCardTitle: 'Direct contact details',
    contactCardBody:
      'If you already know you want to speak with someone, use the approved Sparkling Stays contact details below. This is the best path for straightforward questions, service clarification, and quote follow-up.',
    directLabel: 'Call or email',
    coverageLabel: 'Coverage area',
    inquiryLabel: 'Common inquiry types',
    inquiryTypes: [
      'Recurring home cleaning',
      'One-time or deep cleaning',
      'Commercial cleaning requests',
      'Airbnb or rental turnover support',
      'General service-fit questions'
    ],
    expectationsTitle: 'What to expect when you contact us',
    expectationsIntro:
      'We keep contact expectations grounded. The goal is to collect the right details early so your request is routed to the right service path instead of forcing a generic answer.',
    expectationItems: [
      'We review your service type, location, and the kind of space you need cleaned.',
      'We may guide you toward quote support when the scope depends on size, condition, frequency, or access details.',
      'We support inquiries in English and French.',
      'Commercial requests usually need more detail than a flat residential-style answer can provide.',
      'If your request is not a fit for an instant answer, we keep the next step clear rather than guessing.'
    ],
    areasTitle: 'Serving Greater Montreal',
    areasIntro:
      'Sparkling Stays focuses on the areas already referenced throughout the site so clients have a clear sense of coverage before reaching out.',
    serviceAreas: ['Montreal', 'Laval', 'West Island', 'South Shore'],
    prepTitle: 'What helps us guide your inquiry faster',
    prepItems: [
      'Your neighborhood or service area',
      'Whether the space is a condo, apartment, house, office, clinic, retail space, or rental property',
      'Whether you need recurring cleaning, one-time cleaning, or a deeper reset',
      'Any preferred timing, access notes, or priority rooms/areas',
      'Whether you mainly need pricing, booking guidance, or service clarification'
    ],
    faqTitle: 'Contact FAQs',
    faqs: [
      {
        question: 'What is the best way to contact Sparkling Stays?',
        answer:
          'If you need pricing or your request may require custom scope, start with a quote request. If you have a quick question or want help choosing the right service, call or email Sparkling Stays directly.'
      },
      {
        question: 'Do you support clients in both English and French?',
        answer: 'Yes. Sparkling Stays supports inquiries, quote requests, and service discussions in both English and French.'
      },
      {
        question: 'What areas does Sparkling Stays cover?',
        answer:
          'Sparkling Stays serves Montreal, Laval, the West Island, and the South Shore, with contact and quote support framed around Greater Montreal coverage.'
      },
      {
        question: 'Can I use this page for commercial cleaning inquiries?',
        answer:
          'Yes. Commercial inquiries are welcome here, but they often need more detail than a basic residential request. In many cases, quote support is the better starting point.'
      },
      {
        question: 'Do you promise immediate response times?',
        answer:
          'No specific response-time promise is made on this page. Instead, we focus on clear intake so your inquiry can move toward the right next step as efficiently as possible.'
      }
    ],
    finalTitle: 'Ready to talk through your cleaning needs?',
    finalBody:
      'Tell us what kind of space you have, where you are located, and whether you need recurring support, a one-time clean, or a custom commercial quote. We will help you take the right next step.',
    finalPrimary: 'Request your quote',
    finalSecondary: 'View booking guidance'
  },
  fr: {
    eyebrow: 'Des prochaines étapes claires pour vos demandes dans le Grand Montréal',
    title: 'Contacter Sparkling Stays',
    description:
      'Communiquez avec Sparkling Stays pour vos besoins de nettoyage résidentiel ou commercial à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Cette page vous permet de demander un devis, poser une question ou obtenir de l’aide pour choisir le bon service.',
    metaTitle: 'Contacter Sparkling Stays | Demandes de nettoyage à Montréal',
    metaDescription:
      'Contactez Sparkling Stays pour des services de nettoyage résidentiel et commercial à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Demandez un devis ou obtenez de l’aide bilingue.',
    lastUpdated: 'Dernière mise à jour : avril 2026',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Réserver maintenant',
    heroNote:
      'Cette page sert à faciliter le contact, pas à promettre une réponse instantanée que nous ne pouvons pas appuyer. Si vous partagez le type d’espace, votre secteur et le type de nettoyage recherché, nous pouvons vous orienter plus rapidement vers la bonne prochaine étape.',
    pathwaysTitle: 'Choisissez le parcours adapté à votre demande',
    pathwaysIntro:
      'Chaque demande ne suit pas le même chemin. Si vous voulez un prix, commencez par un devis. Si vous avez surtout besoin d’aide pour choisir le bon service ou valider l’adéquation, contactez directement l’équipe.',
    pathways: [
      {
        title: 'Demander un devis',
        body: 'Le meilleur choix pour une première visite, un grand ménage, un nettoyage commercial ou toute demande dont la portée dépend de la taille, de l’état des lieux ou des priorités.',
        bullets: [
          'Recommandé pour la plupart des nouveaux clients résidentiels',
          'Le meilleur parcours pour les demandes commerciales et sur mesure',
          'Utile lorsque l’horaire, la configuration ou l’état des lieux peut influencer le prix'
        ],
        cta: 'Commencer votre demande de devis',
        href: '/book-now'
      },
      {
        title: 'Contacter l’équipe directement',
        body: 'Le meilleur choix pour les questions rapides, l’accompagnement bilingue, l’aide au choix du service ou la validation de votre secteur avant d’aller plus loin.',
        bullets: [
          `Appelez au ${siteConfig.phone}`,
          `Écrivez à ${siteConfig.email}`,
          'Pratique pour les demandes en français comme en anglais'
        ],
        cta: 'Voir les coordonnées directes',
        href: '/contact',
        variant: 'secondary'
      }
    ],
    contactCardTitle: 'Coordonnées directes',
    contactCardBody:
      'Si vous savez déjà que vous voulez parler à quelqu’un, utilisez les coordonnées approuvées de Sparkling Stays ci-dessous. C’est le meilleur parcours pour les questions simples, les précisions sur les services et le suivi d’un devis.',
    directLabel: 'Téléphone ou courriel',
    coverageLabel: 'Zone de service',
    inquiryLabel: 'Demandes fréquentes',
    inquiryTypes: [
      'Entretien ménager récurrent',
      'Ménage ponctuel ou grand ménage',
      'Demandes de nettoyage commercial',
      'Soutien pour Airbnb ou rotations locatives',
      'Questions générales sur le bon service'
    ],
    expectationsTitle: 'À quoi vous attendre lorsque vous nous contactez',
    expectationsIntro:
      'Nous gardons les attentes réalistes. Le but est de recueillir les bons détails dès le départ afin d’orienter votre demande vers le bon parcours de service au lieu de forcer une réponse générique.',
    expectationItems: [
      'Nous examinons le type de service, votre secteur et le type d’espace à nettoyer.',
      'Nous pouvons vous orienter vers un devis lorsque la portée dépend de la taille, de l’état, de la fréquence ou des conditions d’accès.',
      'Nous accompagnons les demandes en français et en anglais.',
      'Les demandes commerciales exigent souvent plus de détails qu’une simple réponse de type résidentiel.',
      'Si votre demande ne se prête pas à une réponse immédiate, nous clarifions la prochaine étape au lieu de deviner.'
    ],
    areasTitle: 'Au service du Grand Montréal',
    areasIntro:
      'Sparkling Stays se concentre sur les secteurs déjà mentionnés ailleurs sur le site afin que les clients aient une vision claire de la couverture avant de nous écrire.',
    serviceAreas: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
    prepTitle: 'Ce qui nous aide à mieux vous guider rapidement',
    prepItems: [
      'Votre quartier ou votre secteur de service',
      'Le fait que l’espace soit un condo, appartement, maison, bureau, clinique, commerce ou bien locatif',
      'Le fait que vous vouliez un service récurrent, ponctuel ou une remise à niveau plus approfondie',
      'Toute préférence d’horaire, note d’accès ou zone prioritaire',
      'Le fait que vous cherchiez surtout un prix, une aide à la réservation ou une clarification sur le service'
    ],
    faqTitle: 'FAQ de contact',
    faqs: [
      {
        question: 'Quelle est la meilleure façon de contacter Sparkling Stays?',
        answer:
          'Si vous avez besoin d’un prix ou si votre demande exige probablement une portée sur mesure, commencez par une demande de devis. Si vous avez une question rapide ou besoin d’aide pour choisir le bon service, appelez ou écrivez directement à Sparkling Stays.'
      },
      {
        question: 'Offrez-vous le service en français et en anglais?',
        answer:
          'Oui. Sparkling Stays accompagne les demandes, devis et échanges de service dans les deux langues.'
      },
      {
        question: 'Quels secteurs couvrez-vous?',
        answer:
          'Sparkling Stays dessert Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud, avec un parcours de contact et de devis pensé pour le Grand Montréal.'
      },
      {
        question: 'Puis-je utiliser cette page pour une demande commerciale?',
        answer:
          'Oui. Les demandes commerciales sont bienvenues ici, mais elles exigent souvent plus de détails qu’une demande résidentielle standard. Dans plusieurs cas, le devis est donc le meilleur point de départ.'
      },
      {
        question: 'Promettez-vous un délai de réponse précis?',
        answer:
          'Non. Cette page ne présente pas de promesse précise de délai de réponse. Nous mettons plutôt l’accent sur une bonne prise d’information afin de vous orienter efficacement vers la bonne prochaine étape.'
      }
    ],
    finalTitle: 'Prêt à nous parler de vos besoins de nettoyage?',
    finalBody:
      'Dites-nous quel type d’espace vous avez, dans quel secteur vous vous trouvez et si vous avez besoin d’un entretien récurrent, d’un ménage ponctuel ou d’un devis commercial personnalisé. Nous vous aiderons à prendre la bonne prochaine étape.',
    finalPrimary: 'Demander votre devis',
    finalSecondary: 'Voir le parcours de réservation'
  }
} as const satisfies Record<Locale, ContactPageContent>;

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale} = await params;
  const content = contactPageContent[locale as Locale] ?? contactPageContent.en;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: getCanonical(locale, '/contact'),
      languages: {
        'en-CA': `${siteConfig.url}/en/contact`,
        'fr-CA': `${siteConfig.url}/fr/contact`
      }
    }
  };
}

export default async function ContactPage({params}: {params: Params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = contactPageContent[locale as Locale] ?? contactPageContent.en;

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

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: getCanonical(locale, '/contact'),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: content.serviceAreas,
    description: content.description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(contactJsonLd)}} />

      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: locale === 'fr' ? 'Contact' : 'Contact'}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/book-now" locale={locale}>{content.primaryCta}</CTAButton>
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
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">{content.pathwaysTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">{content.pathwaysIntro}</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {content.pathways.map((pathway) => (
                <article key={pathway.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-xl font-bold text-slate-950">{pathway.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{pathway.body}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                    {pathway.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className={`mt-2 h-2.5 w-2.5 rounded-full ${'variant' in pathway && pathway.variant === 'secondary' ? 'bg-[#1a1a2e]' : 'bg-[#d4a017]'}`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <CTAButton href={pathway.href} locale={locale} variant={'variant' in pathway ? pathway.variant : undefined}>{pathway.cta}</CTAButton>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-950">{content.contactCardTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">{content.contactCardBody}</p>
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{content.directLabel}</p>
                <p className="mt-4 text-sm leading-7 text-slate-700">{siteConfig.phone}</p>
                <p className="text-sm leading-7 text-slate-700">{siteConfig.email}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{content.coverageLabel}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  {content.serviceAreas.map((area) => (
                    <li key={area} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{content.inquiryLabel}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  {content.inquiryTypes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-3xl font-bold text-slate-950">{content.expectationsTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.expectationsIntro}</p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                {content.expectationItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-3xl font-bold text-slate-950">{content.areasTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.areasIntro}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.serviceAreas.map((area) => (
                  <div key={area} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                    <p className="text-base font-semibold text-slate-950">{area}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-[#1a1a2e] p-6 text-white">
                <h3 className="text-xl font-semibold">{content.prepTitle}</h3>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
                  {content.prepItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#f4d58d]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
            <CTAButton href="/book-now" locale={locale}>{content.finalPrimary}</CTAButton>
            <CTAButton href="/book-now" locale={locale} variant="secondary">
              {content.finalSecondary}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
