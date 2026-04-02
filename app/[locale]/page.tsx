import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/sections/Hero';
import {ServicesGrid} from '@/components/sections/ServicesGrid';
import {HowItWorks} from '@/components/sections/HowItWorks';
import {FinalCTA} from '@/components/sections/FinalCTA';
import {FAQAccordion} from '@/components/ui/FAQAccordion';
import services from '@/content/data/services.json';

type Locale = 'en' | 'fr';

const homepageContent = {
  en: {
    trustEyebrow: 'Why homeowners and teams choose Sparkling Stays',
    trustTitle: 'Dependable cleaning built for busy Montreal schedules',
    trustCards: [
      {
        title: 'Reliable residential care',
        description:
          'Recurring and one-time cleaning for houses, condos, apartments, and move-related resets with clear communication from start to finish.'
      },
      {
        title: 'Professional commercial support',
        description:
          'Cleaning plans for offices, clinics, retail spaces, and short-term rental properties that need consistent presentation and flexible scheduling.'
      },
      {
        title: 'Bilingual, trustworthy service',
        description:
          'Our team serves clients comfortably in English or French and focuses on punctual arrivals, respectful service, and attention to detail.'
      }
    ],
    coverageEyebrow: 'Service coverage',
    coverageTitle: 'Cleaning support across Greater Montreal',
    coverageDescription:
      'We help homeowners, property managers, and businesses maintain clean spaces throughout the region with practical scheduling and dependable follow-through.',
    coverageAreasTitle: 'Primary service areas',
    coverageAreas: ['Montreal', 'Laval', 'West Island', 'South Shore'],
    coverageSpacesTitle: 'Common spaces we clean',
    coverageSpaces: [
      'Homes, condos, and apartments',
      'Offices and commercial spaces',
      'Airbnb and short-term rentals',
      'Move-in, move-out, and post-renovation projects'
    ],
    faqEyebrow: 'Questions clients ask before booking',
    faqTitle: 'Straight answers before you schedule',
    faqItems: [
      {
        question: 'Do you clean both homes and businesses?',
        answer:
          'Yes. Sparkling Stays offers residential and commercial cleaning services, including homes, condos, offices, retail spaces, and short-term rentals.'
      },
      {
        question: 'Which areas do you serve?',
        answer:
          'We serve Montreal, Laval, the West Island, and the South Shore. If you are nearby and unsure, contact us and we can confirm availability.'
      },
      {
        question: 'Can I book recurring or one-time cleaning?',
        answer:
          'Absolutely. We support one-time deep cleans, recurring housekeeping, office cleaning schedules, and turnover cleaning for rental properties.'
      },
      {
        question: 'Can I communicate in English or French?',
        answer:
          'Yes. We provide bilingual service so clients can book, ask questions, and manage their cleaning plan comfortably in English or French.'
      }
    ]
  },
  fr: {
    trustEyebrow: 'Pourquoi les clients choisissent Sparkling Stays',
    trustTitle: 'Un service d’entretien fiable pour les horaires chargés du Grand Montréal',
    trustCards: [
      {
        title: 'Un entretien résidentiel fiable',
        description:
          'Service ponctuel ou récurrent pour maisons, condos, appartements et remises à neuf avec une communication claire du début à la fin.'
      },
      {
        title: 'Un soutien commercial professionnel',
        description:
          'Plans d’entretien pour bureaux, cliniques, commerces et locations courte durée qui demandent une présentation constante et un horaire flexible.'
      },
      {
        title: 'Un service bilingue et rassurant',
        description:
          'Notre équipe accompagne les clients en français ou en anglais avec ponctualité, respect des lieux et souci du détail.'
      }
    ],
    coverageEyebrow: 'Zone desservie',
    coverageTitle: 'Un service d’entretien partout dans le Grand Montréal',
    coverageDescription:
      'Nous aidons les propriétaires, gestionnaires et entreprises à garder des espaces propres grâce à une planification simple et un suivi fiable.',
    coverageAreasTitle: 'Secteurs principaux',
    coverageAreas: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
    coverageSpacesTitle: 'Espaces souvent entretenus',
    coverageSpaces: [
      'Maisons, condos et appartements',
      'Bureaux et espaces commerciaux',
      'Airbnb et locations courte durée',
      'Entrées, sorties et nettoyages après rénovation'
    ],
    faqEyebrow: 'Questions fréquentes avant de réserver',
    faqTitle: 'Des réponses claires avant de planifier votre entretien',
    faqItems: [
      {
        question: 'Offrez-vous l’entretien résidentiel et commercial?',
        answer:
          'Oui. Sparkling Stays offre des services d’entretien résidentiel et commercial pour maisons, condos, bureaux, commerces et locations courte durée.'
      },
      {
        question: 'Quels secteurs desservez-vous?',
        answer:
          'Nous desservons Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud. Si vous êtes à proximité, contactez-nous et nous confirmerons la disponibilité.'
      },
      {
        question: 'Puis-je réserver un service ponctuel ou récurrent?',
        answer:
          'Oui. Nous prenons en charge les grands ménages ponctuels, l’entretien régulier, les horaires de bureaux et les turnovers pour locations.'
      },
      {
        question: 'Puis-je communiquer en français ou en anglais?',
        answer:
          'Oui. Notre service est bilingue, donc vous pouvez réserver, poser vos questions et organiser votre entretien dans la langue de votre choix.'
      }
    ]
  }
} satisfies Record<Locale, {
  trustEyebrow: string;
  trustTitle: string;
  trustCards: {title: string; description: string}[];
  coverageEyebrow: string;
  coverageTitle: string;
  coverageDescription: string;
  coverageAreasTitle: string;
  coverageAreas: string[];
  coverageSpacesTitle: string;
  coverageSpaces: string[];
  faqEyebrow: string;
  faqTitle: string;
  faqItems: {question: string; answer: string}[];
}>;

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const content = homepageContent[locale as Locale];

  return (
    <>
      <Hero
        locale={locale}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
        primaryCta={t('hero.primaryCta')}
        secondaryCta={t('hero.secondaryCta')}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">{content.trustEyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">{content.trustTitle}</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.trustCards.map((card) => (
            <article key={card.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ServicesGrid locale={locale} services={services} />

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">{content.coverageEyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">{content.coverageTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{content.coverageDescription}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-950">{content.coverageAreasTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {content.coverageAreas.map((area) => (
                  <li key={area} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-950">{content.coverageSpacesTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {content.coverageSpaces.map((space) => (
                  <li key={space} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                    <span>{space}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks locale={locale} />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">{content.faqEyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">{content.faqTitle}</h2>
        </div>
        <div className="mt-10">
          <FAQAccordion items={content.faqItems} />
        </div>
      </section>

      <FinalCTA locale={locale} />
    </>
  );
}
