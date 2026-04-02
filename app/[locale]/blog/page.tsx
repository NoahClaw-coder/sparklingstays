import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/lib/i18n';

const posts = [
  'bathtub-cleaning-without-scrubbing',
  'comment-nettoyer-une-baignoire-sans-frotter'
];

export default async function BlogIndexPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">Blog</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        {locale === 'fr'
          ? 'Les articles seront reconstruits à la phase 3. Les routes prioritaires existent déjà pour éviter les impasses.'
          : 'Blog articles will be rebuilt in Phase 3. Priority routes already exist so redirects do not dead-end.'}
      </p>
      <ul className="mt-8 space-y-3">
        {posts.map((post) => (
          <li key={post}>
            <Link href={`/blog/${post}`} locale={locale} className="text-[#1a1a2e] underline underline-offset-4">
              {post}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
