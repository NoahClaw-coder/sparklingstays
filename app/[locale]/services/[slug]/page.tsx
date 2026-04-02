import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import services from '@/content/services.json';

type Props = {params: Promise<{locale: 'en' | 'fr'; slug: string}>};

export default async function ServiceDetailPage({params}: Props) {
  const {locale, slug} = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const isFr = locale === 'fr';
  const title = isFr ? svc.titleFr : svc.title;
  const desc = isFr ? svc.descFr : svc.desc;
  const body = isFr ? svc.bodyFr : svc.body;

  return (
    <div className="min-h-screen bg-white text-[#1b2434]">
      <section className="relative h-[340px] overflow-hidden bg-[#e8ebef]">
        <Image src={svc.image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1180px] px-6 pb-10">
          <nav className="mb-4 text-sm text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/services`} className="hover:text-white">{isFr ? 'Services' : 'Services'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg leading-8 text-[#5f6776]">{desc}</p>
            <div className="mt-8 text-[17px] leading-8 text-[#4c5565]">{body}</div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#cfa21a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
                {isFr ? 'RÉSERVER' : 'BOOK NOW'}
              </Link>
              <a href="tel:438-867-8770" className="rounded-sm border border-[#ddd2be] bg-white px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b2434]">
                {isFr ? 'APPELEZ-NOUS' : 'CALL US'}
              </a>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-[3px] border border-[#ede6d8] bg-[#fbf5e8] p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Pourquoi Sparkling Stays?' : 'Why Sparkling Stays?'}</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-[#5f6776]">
                <li>✓ {isFr ? 'Service fiable et ponctuel' : 'Reliable and on-time service'}</li>
                <li>✓ {isFr ? 'Équipe vérifiée et assurée' : 'Background-checked and insured team'}</li>
                <li>✓ {isFr ? 'Produits écologiques' : 'Eco-friendly products'}</li>
                <li>✓ {isFr ? 'Garantie satisfaction 100%' : '100% satisfaction guarantee'}</li>
              </ul>
            </div>
            <div className="rounded-[3px] border border-[#ede6d8] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Secteurs desservis' : 'Areas served'}</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#5f6776]">Montreal, Laval, West Island, South Shore</p>
              <Link href={`/${locale}/areas`} className="mt-3 inline-block text-sm font-semibold text-[#b38716]">
                {isFr ? 'Voir tous les secteurs →' : 'See all areas →'}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
