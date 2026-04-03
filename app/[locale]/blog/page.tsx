import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import type {Metadata} from 'next';
import posts from '@/content/blog.json';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Cleaning Tips & Guides | Sparkling Stays Blog',
    titleFr: 'Conseils et guides de nettoyage | Blog Sparkling Stays',
    desc: 'Cleaning tips, pricing guides, and expert advice from Sparkling Stays. Learn how to keep your Montreal home, office, or Airbnb spotless.',
    descFr: 'Conseils de nettoyage, guides tarifaires et conseils d\'experts de Sparkling Stays. Apprenez à garder votre maison, bureau ou Airbnb impeccable.',
    path: '/blog',
    locale
  });
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'Articles' : 'Blog', url: `${BASE}/${locale}/blog`}
      ])} />

      <section className="bg-[#1d2432] py-16 text-white">
        <div className="mx-auto max-w-[1180px] px-6">
          <nav className="mb-4 text-sm text-white/60">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Articles' : 'Blog'}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {isFr ? 'Conseils de nettoyage et guides' : 'Cleaning Tips & Guides'}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {isFr ? 'Conseils pratiques pour garder votre espace propre et organisé.' : 'Practical advice to keep your space clean and organized.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group rounded-[3px] border border-[#ede6d8] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md">
              <h2 className="text-xl font-semibold text-[#1c2333] group-hover:text-[#b38716]">
                {isFr ? post.titleFr : post.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-[#5f6776]">
                {isFr ? post.bodyFr.slice(0, 150) + '…' : post.body.slice(0, 150) + '…'}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[#b38716]">
                {isFr ? 'Lire l\'article →' : 'Read more →'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#fbf5e8] py-16 text-center">
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="text-2xl font-semibold text-[#1c2333]">{isFr ? 'Prêt à réserver?' : 'Ready to book?'}</h2>
          <p className="mt-3 text-[#5f6776]">{isFr ? 'Obtenez un devis gratuit en quelques minutes.' : 'Get a free quote in minutes.'}</p>
          <Link href={`/${locale}/book-now`} className="mt-6 inline-flex rounded-sm bg-[#cfa21a] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
            {isFr ? 'RÉSERVER' : 'BOOK NOW'}
          </Link>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
