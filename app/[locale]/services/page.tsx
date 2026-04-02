import {setRequestLocale} from 'next-intl/server';
import services from '@/content/data/services.json';

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">
        {locale === 'fr' ? 'Services à développer en phase 1' : 'Services to be built in Phase 1'}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'Les huit pages piliers de service seront rédigées et optimisées à la prochaine étape. La structure et les données de base sont déjà prêtes.'
          : 'The eight service pillar pages will be written and optimized in the next phase. The structure and core data are already in place.'}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.slug} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">{service.name[locale as 'en' | 'fr']}</h2>
            <p className="mt-2 text-slate-700">{service.description[locale as 'en' | 'fr']}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
