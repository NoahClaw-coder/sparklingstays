import Link from 'next/link';
import {notFound} from 'next/navigation';
import posts from '@/content/blog.json';

type Props = {params: Promise<{locale: 'en' | 'fr'; slug: string}>};

export default async function BlogPost({params}: Props) {
  const {locale, slug} = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isFr = locale === 'fr';
  const title = isFr ? post.titleFr : post.title;
  const body = isFr ? post.bodyFr : post.body;

  return (
    <div className="min-h-screen bg-white text-[#1b2434]">
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
  );
}
