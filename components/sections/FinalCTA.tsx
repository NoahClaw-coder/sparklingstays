import {CTAButton} from '@/components/ui/CTAButton';

export function FinalCTA({locale}: {locale: string}) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl bg-[#1a1a2e] px-8 py-12 text-white">
        <h2 className="text-3xl font-bold">
          {locale === 'fr'
            ? 'Besoin d’un entretien résidentiel ou commercial?'
            : 'Need residential or commercial cleaning support?'}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
          {locale === 'fr'
            ? 'Parlez-nous de votre espace, de votre secteur et de la fréquence désirée. Nous vous aiderons à planifier un service d’entretien adapté à vos besoins.'
            : 'Tell us about your space, service area, and preferred frequency. We’ll help you plan the right cleaning service for your home, office, or rental property.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CTAButton href="/book-now" locale={locale}>
            {locale === 'fr' ? 'Obtenir une soumission' : 'Get a quote'}
          </CTAButton>
          <CTAButton href="/contact" locale={locale} variant="secondary">
            {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
