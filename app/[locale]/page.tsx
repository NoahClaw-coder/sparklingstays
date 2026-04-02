import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/lib/i18n';
import {Hero} from '@/components/sections/Hero';
import {ServicesGrid} from '@/components/sections/ServicesGrid';
import {HowItWorks} from '@/components/sections/HowItWorks';
import {FinalCTA} from '@/components/sections/FinalCTA';
import services from '@/content/data/services.json';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale});

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
      <ServicesGrid locale={locale} services={services} />
      <HowItWorks locale={locale} />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            {locale === 'fr' ? 'Phase 0' : 'Phase 0'}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">
            {locale === 'fr'
              ? 'Fondation du nouveau site bilingue en place'
              : 'The bilingual rebuild foundation is in place'}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            {locale === 'fr'
              ? 'Cette étape met en place la structure Next.js, l’architecture bilingue, les composants réutilisables et les fichiers SEO techniques. Les pages finales seront produites à la phase suivante.'
              : 'This stage sets up the Next.js architecture, bilingual routing, reusable components, and technical SEO files. Final page copy will be produced in the next phase.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-slate-700">
            <span className="rounded-full bg-slate-100 px-4 py-2">Next.js 15</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">next-intl</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">next-sitemap</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">EN / FR routing</span>
          </div>
          <div className="mt-8">
            <Link href="/pricing" locale={locale} className="inline-flex rounded-full bg-[#1a1a2e] px-6 py-3 font-semibold text-white transition hover:bg-[#23233c]">
              {locale === 'fr' ? 'Voir la structure du site' : 'See the site structure'}
            </Link>
          </div>
        </div>
      </section>
      <FinalCTA locale={locale} />
    </>
  );
}
