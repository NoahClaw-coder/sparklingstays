import {setRequestLocale} from 'next-intl/server';

export default async function BlogPostPlaceholder({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Phase 3 queue</p>
      <h1 className="mt-4 text-4xl font-bold text-slate-950">{slug.replace(/-/g, ' ')}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'Cette route d’article a été créée en phase 0 pour préserver la continuité des redirections et préparer la reconstruction éditoriale.'
          : 'This article route was created in Phase 0 to preserve redirect continuity and prepare for the editorial rebuild.'}
      </p>
    </article>
  );
}
