import {Hero} from '@/components/sections/Hero';
import {JsonLd} from '@/components/seo/JsonLd';
import {FAQAccordion} from '@/components/ui/FAQAccordion';
import {ServiceCard} from '@/components/ui/ServiceCard';
import {getServices} from '@/lib/content';
import {siteConfig} from '@/lib/seo';

const faqs = {
  en: [
    {question: 'What areas do you serve?', answer: 'Sparkling Stays serves Montreal, Laval, the West Island, and the South Shore.'},
    {question: 'Do you offer recurring cleaning?', answer: 'Yes. We handle weekly, biweekly, monthly, and one-time cleaning visits.'},
    {question: 'Can you clean offices and rentals?', answer: 'Yes. We cover offices, Airbnb turnovers, move-in/move-out work, and post-renovation cleaning.'}
  ],
  fr: [
    {question: 'Quels secteurs desservez-vous?', answer: 'Sparkling Stays dessert Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud.'},
    {question: 'Offrez-vous des nettoyages récurrents?', answer: 'Oui. Nous faisons des visites hebdomadaires, aux deux semaines, mensuelles et ponctuelles.'},
    {question: 'Faites-vous les bureaux et locations?', answer: 'Oui. Nous couvrons les bureaux, les turnovers Airbnb, les déménagements et l’après-rénovation.'}
  ]
} as const;

export default async function HomePage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  const services = getServices();

  return (
    <div className="space-y-16 py-4">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: siteConfig.name,
          url: siteConfig.url,
          telephone: '+1-438-867-8770',
          email: siteConfig.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Montreal',
            addressRegion: 'QC',
            addressCountry: 'CA'
          },
          areaServed: ['Montreal', 'Laval', 'Longueuil', 'West Island', 'South Shore']
        }}
      />
      <Hero locale={locale} />
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} slug={service.slug} title={service.name[locale]} description={service.description[locale]} />
        ))}
      </section>
      <section className="rounded-[2rem] bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-[var(--navy)]">{locale === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}</h2>
        <div className="mt-6">
          <FAQAccordion items={[...faqs[locale]]} />
        </div>
      </section>
    </div>
  );
}
