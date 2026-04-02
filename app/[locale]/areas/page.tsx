import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import neighborhoods from '@/content/data/neighborhoods.json';
import {siteConfig, getCanonical} from '@/lib/seo';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CTAButton} from '@/components/ui/CTAButton';
import {Link} from '@/lib/i18n';

type Locale = 'en' | 'fr';
type Params = Promise<{locale: string}>;

const hubLabels = {
  'west-island': {en: 'West Island', fr: 'Ouest-de-l’Île'},
  'rive-sud': {en: 'South Shore', fr: 'Rive-Sud'},
  laval: {en: 'Laval', fr: 'Laval'},
  'downtown-montreal': {en: 'Montreal', fr: 'Montréal'}
} as const;

const pageContent = {
  en: {
    metaTitle: 'Cleaning Service Areas in Montreal | Sparkling Stays',
    metaDescription:
      'Browse Sparkling Stays cleaning service areas across Montreal, Laval, the West Island, and the South Shore.',
    eyebrow: 'Service areas',
    title: 'Cleaning service areas across Greater Montreal',
    description:
      'Sparkling Stays serves residential and commercial clients across Montreal, Laval, the West Island, and the South Shore. Browse the priority area pages below to find the location closest to you and learn how our cleaning services fit your area.',
    introTitle: 'Where we work',
    introBody:
      'Our service-area pages are designed to make local coverage clearer. Whether you need recurring home cleaning, deep cleaning, office support, Airbnb turnover help, or a more specialized service, these pages help you find the right local entry point before requesting a quote.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'Book now'
  },
  fr: {
    metaTitle: 'Secteurs desservis pour le nettoyage à Montréal | Sparkling Stays',
    metaDescription:
      'Parcourez les secteurs desservis par Sparkling Stays à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud.',
    eyebrow: 'Secteurs desservis',
    title: 'Nos secteurs de service dans le Grand Montréal',
    description:
      'Sparkling Stays accompagne des clients résidentiels et commerciaux à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Parcourez les pages de secteur prioritaires ci-dessous pour trouver la zone la plus proche de vous et voir comment nos services s’adaptent à votre secteur.',
    introTitle: 'Où nous travaillons',
    introBody:
      'Nos pages de secteur sont conçues pour rendre la couverture locale plus claire. Que vous ayez besoin d’un entretien ménager récurrent, d’un grand ménage, d’un entretien de bureau, d’un turnover Airbnb ou d’un service plus spécialisé, ces pages vous aident à trouver le bon point d’entrée local avant de demander un devis.',
    ctaPrimary: 'Demander un devis',
    ctaSecondary: 'Réserver'
  }
} as const;

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale} = await params;
  const content = pageContent[locale as Locale] ?? pageContent.en;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: getCanonical(locale, '/areas'),
      languages: {
        'en-CA': `${siteConfig.url}/en/areas`,
        'fr-CA': `${siteConfig.url}/fr/areas`
      }
    }
  };
}

export default async function AreasPage({params}: {params: Params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = pageContent[locale as Locale] ?? pageContent.en;

  return (
    <>
      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: locale === 'fr' ? 'Secteurs' : 'Areas'}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/contact" locale={locale}>{content.ctaPrimary}</CTAButton>
            <CTAButton href="/book-now" locale={locale} variant="secondary">{content.ctaSecondary}</CTAButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-950">{content.introTitle}</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">{content.introBody}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.slug}
              href={`/areas/${neighborhood.slug}`}
              locale={locale}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                {hubLabels[neighborhood.hub as keyof typeof hubLabels]?.[locale as Locale] ?? neighborhood.hub}
              </div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{neighborhood.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {locale === 'fr' ? 'Secteur local prioritaire pour le développement SEO et la demande de devis.' : 'Priority local service page for SEO expansion and quote requests.'}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                {locale === 'fr' ? 'Impressions estimées' : 'Estimated impressions'}: {neighborhood.impressions.toLocaleString('en-CA')}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
