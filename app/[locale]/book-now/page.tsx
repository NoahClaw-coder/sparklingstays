import {setRequestLocale} from 'next-intl/server';

export default async function BookNowPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">{locale === 'fr' ? 'Réserver' : 'Book now'}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'La page de conversion finale sera branchée à l’outil de réservation pendant la phase contenu.'
          : 'The final conversion page will be connected to the booking flow during the content phase.'}
      </p>
    </section>
  );
}
