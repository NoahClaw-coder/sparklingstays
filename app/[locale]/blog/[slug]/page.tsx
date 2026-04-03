import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import posts from '@/content/blog.json';
import services from '@/content/services.json';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'; slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return makeMeta({
    title: post.title,
    titleFr: post.titleFr,
    desc: post.body.slice(0, 155) + '…',
    descFr: post.bodyFr.slice(0, 155) + '…',
    path: `/blog/${slug}`,
    locale
  });
}

const relatedPosts = (current: string) => posts.filter(p => p.slug !== current).slice(0, 4);

export default async function BlogPost({params}: Props) {
  const {locale, slug} = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isFr = locale === 'fr';
  const title = isFr ? post.titleFr : post.title;
  const body = isFr ? post.bodyFr : post.body;
  const BASE = 'https://sparklingstays.com';

  const crumbs = [
    {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
    {name: isFr ? 'Articles' : 'Blog', url: `${BASE}/${locale}/blog`},
    {name: title, url: `${BASE}/${locale}/blog/${slug}`}
  ];

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="bg-[#fbf5e8] py-16">
        <div className="mx-auto max-w-[860px] px-6">
          <nav className="mb-4 text-sm text-[#5f6776]">
            <Link href={`/${locale}`} className="hover:text-[#b38716]">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[#b38716]">{isFr ? 'Articles' : 'Blog'}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1c2333]">{title}</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1c2333] md:text-4xl">{title}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-[860px] px-6 py-16">
        <div className="text-[17px] leading-8 text-[#4c5565]">{body}</div>

        {/* Service cross-links */}
        <div className="mt-12 rounded-[3px] border border-[#ede6d8] bg-[#fbf5e8] p-6">
          <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Services connexes' : 'Related services'}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {services.slice(0, 5).map((svc) => (
              <Link key={svc.slug} href={`/${locale}/services/${svc.slug}`} className="rounded-full border border-[#ede6d8] bg-white px-4 py-2 text-sm text-[#5f6776] hover:border-[#cfa21a] hover:text-[#b38716]">
                {isFr ? svc.titleFr : svc.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Related posts */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Autres articles' : 'More articles'}</h3>
          <ul className="mt-4 space-y-2 text-[15px] text-[#5f6776]">
            {relatedPosts(slug).map((rp) => (
              <li key={rp.slug}>
                <Link href={`/${locale}/blog/${rp.slug}`} className="hover:text-[#b38716]">
                  {isFr ? rp.titleFr : rp.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#cfa21a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
            {isFr ? 'RÉSERVER' : 'BOOK NOW'}
          </Link>
          <Link href={`/${locale}/services`} className="rounded-sm border border-[#ddd2be] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b2434]">
            {isFr ? 'NOS SERVICES' : 'OUR SERVICES'}
          </Link>
        </div>
      </article>
    </div>
    </SiteShell>
  );
}
