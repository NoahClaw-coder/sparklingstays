export default async function PricingPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold text-[var(--navy)]">{locale === 'fr' ? 'Tarifs' : 'Pricing'}</h1>
      <p className="mt-4 text-slate-600">{locale === 'fr' ? 'Structure de page tarifaire prête pour les offres résidentielles et commerciales.' : 'Pricing page structure is ready for residential and commercial offers.'}</p>
    </div>
  );
}
