import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import neighborhoods from '@/content/data/neighborhoods.json';

const hubs = {
  'west-island': {en: 'West Island', fr: 'Ouest-de-l’Île'},
  'rive-sud': {en: 'South Shore', fr: 'Rive-Sud'},
  laval: {en: 'Laval', fr: 'Laval'},
  'downtown-montreal': {en: 'Downtown Montreal', fr: 'Centre-ville de Montréal'}
};

export default async function AreaDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const neighborhood = neighborhoods.find((item) => item.slug === slug);
  const hub = hubs[slug as keyof typeof hubs];

  if (!neighborhood && !hub) {
    notFound();
  }

  const title = neighborhood?.name ?? hub?.[locale as 'en' | 'fr'];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Phase 2 queue</p>
      <h1 className="mt-4 text-4xl font-bold text-slate-950">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'Cette route de secteur est en place pour recevoir la page SEO complète avec FAQ, liens internes et personnalisation locale.'
          : 'This area route is in place and ready for the full SEO page with FAQ, internal links, and local customization.'}
      </p>
    </section>
  );
}
