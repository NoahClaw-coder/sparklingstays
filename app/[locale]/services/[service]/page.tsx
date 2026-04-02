import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import services from '@/content/data/services.json';
import {CTAButton} from '@/components/ui/CTAButton';

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{locale: string; service: string}>;
}) {
  const {locale, service} = await params;
  setRequestLocale(locale);

  const match = services.find((item) => item.slug === service);

  if (!match) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Phase 1 queue</p>
      <h1 className="mt-4 text-4xl font-bold text-slate-950">{match.name[locale as 'en' | 'fr']}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">{match.description[locale as 'en' | 'fr']}</p>
      <p className="mt-6 text-slate-700">
        {locale === 'fr'
          ? 'La route, la structure SEO et le point d’atterrissage sont maintenant prêts. Le contenu complet sera ajouté à la phase 1.'
          : 'The route, SEO structure, and landing destination are now ready. Full content will be added in Phase 1.'}
      </p>
      <div className="mt-8">
        <CTAButton href="/book-now" locale={locale}>
          {locale === 'fr' ? 'Réserver' : 'Book now'}
        </CTAButton>
      </div>
    </section>
  );
}
