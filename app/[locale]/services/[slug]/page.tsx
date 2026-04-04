import {SiteShell} from "@/components/SiteShell";
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import services from '@/content/services.json';
import neighborhoods from '@/content/neighborhoods.json';
import {makeMeta, serviceSchema, breadcrumbSchema, JsonLd} from '@/lib/seo';
import {MarkdownContent} from '@/components/MarkdownContent';

type Props = {params: Promise<{locale: 'en' | 'fr'; slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return {};
  return makeMeta({
    title: `${svc.title} in Montreal | Sparkling Stays`,
    titleFr: `${svc.titleFr} à Montréal | Sparkling Stays`,
    desc: svc.desc,
    descFr: svc.descFr,
    path: `/services/${slug}`,
    locale
  });
}

const relatedServices = (current: string) => services.filter(s => s.slug !== current).slice(0, 4);
const topAreas = neighborhoods.slice(0, 6);

export default async function ServiceDetailPage({params}: Props) {
  const {locale, slug} = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const isFr = locale === 'fr';
  const title = isFr ? svc.titleFr : svc.title;
  const desc = isFr ? svc.descFr : svc.desc;
  const body = isFr ? svc.bodyFr : svc.body;
  const BASE = 'https://sparklingstays.com';

  const crumbs = [
    {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
    {name: 'Services', url: `${BASE}/${locale}/services`},
    {name: title, url: `${BASE}/${locale}/services/${slug}`}
  ];

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={[
        serviceSchema(title, desc, slug, locale),
        breadcrumbSchema(crumbs)
      ]} />

      <section className="relative h-[340px] overflow-hidden bg-[#e8ebef]">
        <Image src={svc.image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1180px] px-6 pb-10">
          <nav className="mb-4 text-sm text-white/80">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/services`} className="hover:text-white">Services</Link>
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
            <MarkdownContent content={body} className="mt-8" />

            {/* Internal links to area pages */}
            <h2 className="mt-12 text-2xl font-semibold text-[#1c2333]">
              {isFr ? 'Disponible dans ces secteurs' : 'Available in these areas'}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {topAreas.map((area) => (
                <Link key={area.slug} href={`/${locale}/areas/${area.slug}`} className="rounded-full border border-[#ede6d8] bg-[#fbf5e8] px-4 py-2 text-sm text-[#5f6776] hover:border-[#cfa21a] hover:text-[#b38716]">
                  {area.name}
                </Link>
              ))}
              <Link href={`/${locale}/areas`} className="rounded-full border border-[#cfa21a] bg-white px-4 py-2 text-sm font-semibold text-[#b38716]">
                {isFr ? 'Tous les secteurs →' : 'All areas →'}
              </Link>
            </div>

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

            {/* Related services cross-links */}
            <div className="rounded-[3px] border border-[#ede6d8] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Autres services' : 'Related services'}</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-[#5f6776]">
                {relatedServices(slug).map((rs) => (
                  <li key={rs.slug}>
                    <Link href={`/${locale}/services/${rs.slug}`} className="hover:text-[#b38716]">
                      {isFr ? rs.titleFr : rs.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/services`} className="mt-3 inline-block text-sm font-semibold text-[#b38716]">
                {isFr ? 'Tous les services →' : 'All services →'}
              </Link>
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
    </SiteShell>
  );
}
