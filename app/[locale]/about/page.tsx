export default async function AboutPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold text-[var(--navy)]">{locale === 'fr' ? 'À propos' : 'About Sparkling Stays'}</h1>
      <p className="mt-4 text-slate-600">{locale === 'fr' ? 'Page de base prête pour l’histoire de l’entreprise, la confiance et la preuve sociale.' : 'Base page ready for company story, trust-building content, and social proof.'}</p>
    </div>
  );
}
