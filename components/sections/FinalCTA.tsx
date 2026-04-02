import {CTAButton} from '@/components/ui/CTAButton';

export function FinalCTA({locale}: {locale: string}) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl bg-[#1a1a2e] px-8 py-12 text-white">
        <h2 className="text-3xl font-bold">
          {locale === 'fr' ? 'Prêt pour la phase suivante' : 'Ready for the next phase'}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
          {locale === 'fr'
            ? 'La fondation technique est en cours de validation. Les pages de conversion et les pages SEO seront remplies sur cette base.'
            : 'The technical foundation is being validated. Conversion pages and SEO pages will now be built on top of it.'}
        </p>
        <div className="mt-8">
          <CTAButton href="/contact" locale={locale}>
            {locale === 'fr' ? 'Voir le point de contact' : 'View contact point'}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
