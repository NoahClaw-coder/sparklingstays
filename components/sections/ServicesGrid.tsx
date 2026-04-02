import {ServiceCard} from '@/components/ui/ServiceCard';

export function ServicesGrid({
  locale,
  services
}: {
  locale: string;
  services: {slug: string; name: {en: string; fr: string}; description: {en: string; fr: string}}[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          {locale === 'fr' ? 'Structure de services' : 'Service structure'}
        </p>
        <h2 className="mt-4 text-3xl font-bold text-slate-950">
          {locale === 'fr' ? 'Les pages piliers sont prêtes à être remplies' : 'The pillar pages are ready to be filled'}
        </h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.name[locale as 'en' | 'fr']}
            description={service.description[locale as 'en' | 'fr']}
          />
        ))}
      </div>
    </section>
  );
}
