import Link from 'next/link';
import posts from '@/content/blog.json';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export default async function BlogIndex({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen bg-white text-[#1b2434]">
      <section className="bg-[#fbf5e8] py-16">
        <div className="mx-auto max-w-[1180px] px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#1c2333] md:text-5xl">
            {isFr ? 'Articles et conseils' : 'Cleaning Tips & Guides'}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#5f6776]">
            {isFr ? 'Conseils pratiques pour garder votre espace propre et bien entretenu.' : 'Practical advice for keeping your space clean and well-maintained.'}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="block rounded-[3px] border border-[#ede6d8] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? post.titleFr : post.title}</h2>
              <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-[#5f6776]">{isFr ? post.bodyFr : post.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
