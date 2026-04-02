import {getTranslations} from 'next-intl/server';
import {CTAButton} from '@/components/ui/CTAButton';
import {siteConfig} from '@/lib/seo';

export async function Hero({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'hero'});

  return (
    <section className="overflow-hidden rounded-[2rem] bg-[var(--navy)] px-6 py-16 text-white shadow-2xl md:px-12 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold-soft)]">{t('eyebrow')}</p>
      <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{t('title')}</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{t('description')}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <CTAButton href="/book-now">{t('primaryCta')}</CTAButton>
        <CTAButton href="/services/home-cleaning" variant="secondary">{t('secondaryCta')}</CTAButton>
      </div>
      <div className="mt-10 grid gap-4 text-sm text-slate-200 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Bilingual service across Montreal and nearby suburbs.</div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Residential, office, Airbnb, and post-renovation cleaning.</div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Call {siteConfig.phone} for fast scheduling.</div>
      </div>
    </section>
  );
}
