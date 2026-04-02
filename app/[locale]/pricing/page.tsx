import {setRequestLocale} from 'next-intl/server';

export default async function PricingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">{locale === 'fr' ? 'Tarifs' : 'Pricing'}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'La page de tarification finale sera rédigée en phase 1. Cette étape confirme simplement le routage bilingue, la structure SEO et la place réservée pour le contenu.'
          : 'The final pricing page will be written in Phase 1. This step simply confirms the bilingual routing, SEO structure, and content slot are ready.'}
      </p>
    </section>
  );
}
