import {setRequestLocale} from 'next-intl/server';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">{locale === 'fr' ? 'À propos' : 'About us'}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'Le récit de marque, la preuve sociale et les éléments de confiance seront finalisés en phase 1.'
          : 'Brand story, proof, and trust elements will be finalized in Phase 1.'}
      </p>
    </section>
  );
}
