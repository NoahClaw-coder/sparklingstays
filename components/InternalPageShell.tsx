import Link from 'next/link';

export function InternalPageShell({
  title,
  eyebrow,
  description,
  locale
}: {
  title: string;
  eyebrow: string;
  description: string;
  locale: 'en' | 'fr';
}) {
  return (
    <main className="min-h-screen bg-[#fffaf0] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-sm font-bold uppercase tracking-[0.22em] text-[#b78307]">{eyebrow}</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-[#1a1a2e]">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/${locale}`} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800">
              {locale === 'fr' ? 'Accueil' : 'Back to home'}
            </Link>
            <Link href={`/${locale}/book-now`} className="rounded-full bg-[#d4a017] px-5 py-3 text-sm font-bold text-[#1a1a2e]">
              {locale === 'fr' ? 'Réserver' : 'Book now'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
