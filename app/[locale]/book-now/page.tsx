export default async function BookNowPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold text-[var(--navy)]">{locale === 'fr' ? 'Réserver un nettoyage' : 'Book a cleaning'}</h1>
      <p className="mt-4 max-w-2xl text-slate-600">{locale === 'fr' ? 'Page de conversion de base prête pour le futur formulaire ou widget de réservation.' : 'Base conversion page ready for the future booking form or embedded scheduling widget.'}</p>
    </div>
  );
}
