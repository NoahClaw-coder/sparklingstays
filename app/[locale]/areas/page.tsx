import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import Image from 'next/image';
import type {Metadata} from 'next';
import neighborhoods from '@/content/neighborhoods.json';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

const hubNames: Record<string, {en: string; fr: string}> = {
  montreal: {en: 'Montreal', fr: 'Montréal'},
  laval: {en: 'Laval', fr: 'Laval'},
  'west-island': {en: 'West Island', fr: "Ouest-de-l'Île"},
  'south-shore': {en: 'South Shore', fr: 'Rive-Sud'}
};
const hubOrder = ['montreal', 'west-island', 'south-shore'];

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Service Areas | Sparkling Stays',
    titleFr: 'Secteurs desservis | Sparkling Stays',
    desc: 'Sparkling Stays serves 25+ neighborhoods across Montreal, Laval, West Island, and South Shore. Find cleaning services near you.',
    descFr: 'Sparkling Stays dessert plus de 25 quartiers à Montréal, Laval, West Island et Rive-Sud. Trouvez un service de nettoyage près de chez vous.',
    path: '/areas',
    locale
  });
}

export default async function AreasPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  const grouped = hubOrder.reduce<Record<string, typeof neighborhoods>>((acc, hub) => {
    acc[hub] = neighborhoods.filter((n) => n.hub === hub);
    return acc;
  }, {});

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'Secteurs' : 'Areas', url: `${BASE}/${locale}/areas`}
      ])} />

      <section className="relative bg-[#1d2432] py-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/media/team-cleaning.png" alt="Cleaning service areas in Montreal" fill className="object-cover opacity-15" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-[1180px] px-6">
          <nav className="mb-4 text-sm text-white/70">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Secteurs' : 'Areas'}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{isFr ? 'Secteurs desservis' : 'Service Areas'}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {isFr ? 'Nettoyage résidentiel et commercial dans plus de 25 quartiers du Grand Montréal.' : 'Residential and commercial cleaning across 25+ neighborhoods in Greater Montreal.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-16">
        {/* Regional hub cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(hubNames).map(([slug, h]) => (
            <Link key={slug} href={`/${locale}/areas/${slug}`} className="flex flex-col items-center justify-center rounded-[3px] border border-[#ede6d8] bg-[#fbf5e8] p-8 text-center transition hover:-translate-y-0.5 hover:border-[#cfa21a] hover:shadow-md">
              <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? h.fr : h.en}</h2>
              <span className="mt-2 text-sm text-[#b38716]">{isFr ? 'Voir le secteur →' : 'View area →'}</span>
            </Link>
          ))}
        </div>

        {/* Neighborhood lists grouped by hub */}
        {hubOrder.map((hub) => {
          const areas = grouped[hub];
          if (!areas || areas.length === 0) return null;
          const hubLabel = hubNames[hub];
          return (
            <div key={hub} className="mt-12">
              <h2 className="text-2xl font-semibold text-[#1c2333]">
                <Link href={`/${locale}/areas/${hub}`} className="hover:text-[#b38716]">
                  {isFr ? hubLabel.fr : hubLabel.en}
                </Link>
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {areas.map((n) => (
                  <Link key={n.slug} href={`/${locale}/areas/${n.slug}`} className="rounded-[3px] border border-[#ede6d8] bg-white p-4 text-[15px] text-[#5f6776] transition hover:border-[#cfa21a] hover:text-[#b38716]">
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 text-center">
          <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#FEE569] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white">
            {isFr ? 'RÉSERVER MAINTENANT' : 'BOOK NOW'}
          </Link>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
