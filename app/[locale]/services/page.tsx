import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import Image from 'next/image';
import type {Metadata} from 'next';
import services from '@/content/services.json';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Cleaning Services in Montreal | Sparkling Stays',
    titleFr: 'Services de nettoyage à Montréal | Sparkling Stays',
    desc: 'Professional home, office, commercial, Airbnb, deep, and move-in/out cleaning across Greater Montreal. Book online or call 438-867-8770.',
    descFr: 'Entretien ménager, nettoyage commercial, Airbnb, grand ménage et déménagement dans le Grand Montréal. Réservez en ligne ou appelez le 438-867-8770.',
    path: '/services',
    locale
  });
}

export default async function ServicesPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: 'Services', url: `${BASE}/${locale}/services`}
      ])} />

      <section className="relative bg-[#1d2432] py-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/media/commercial-cleaning.png" alt="Professional cleaning services" fill className="object-cover opacity-15" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-[1180px] px-6">
          <nav className="mb-4 text-sm text-white/70">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{isFr ? 'Nos services de nettoyage' : 'Our Cleaning Services'}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {isFr ? 'Entretien résidentiel et commercial dans le Grand Montréal, Laval, West Island et Rive-Sud.' : 'Residential and commercial cleaning across Greater Montreal, Laval, West Island, and South Shore.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <Link key={svc.slug} href={`/${locale}/services/${svc.slug}`} className="group overflow-hidden rounded-[3px] border border-[#ede6d8] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative h-[200px] bg-[#e8ebef]">
                <Image src={svc.image} alt={isFr ? svc.titleFr : svc.title} fill className="object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? svc.titleFr : svc.title}</h2>
                <p className="mt-2 line-clamp-2 text-[15px] leading-7 text-[#5f6776]">{isFr ? svc.descFr : svc.desc}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-[#b38716]">
                  {isFr ? 'En savoir plus →' : 'Learn more →'}
                </span>
              </div>
            </Link>
          ))}
        </div>

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
