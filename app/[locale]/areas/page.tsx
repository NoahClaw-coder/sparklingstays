import {setRequestLocale} from 'next-intl/server';
import neighborhoods from '@/content/data/neighborhoods.json';

export default async function AreasPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">
        {locale === 'fr' ? 'Secteurs prioritaires du site' : 'Priority service areas'}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'Les pages de quartier et les pages hubs seront générées après la phase fondation. Cette liste reflète la priorité basée sur les impressions de recherche.'
          : 'Neighborhood pages and hub pages will be generated after the foundation phase. This list reflects the priority based on search impressions.'}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((neighborhood) => (
          <div key={neighborhood.slug} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{neighborhood.hub}</div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{neighborhood.name}</h2>
            <p className="mt-2 text-slate-700">
              {locale === 'fr' ? 'Impressions estimées' : 'Estimated impressions'}: {neighborhood.impressions.toLocaleString('en-CA')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
