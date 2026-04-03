import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import Image from 'next/image';
import type {Metadata} from 'next';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'About Sparkling Stays | Professional Cleaning in Montreal',
    titleFr: 'À propos de Sparkling Stays | Nettoyage professionnel à Montréal',
    desc: 'Sparkling Stays is a Montreal-based cleaning company serving homes, condos, offices, and Airbnbs across Greater Montreal, Laval, West Island, and South Shore.',
    descFr: 'Sparkling Stays est une entreprise de nettoyage montréalaise desservant maisons, condos, bureaux et Airbnbs dans le Grand Montréal, Laval, West Island et Rive-Sud.',
    path: '/about',
    locale
  });
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  const values = isFr ? [
    {title: 'Fiabilité', body: 'Nous arrivons à l\'heure, nous faisons le travail correctement et nous respectons votre espace.'},
    {title: 'Transparence', body: 'Des prix clairs, pas de surprises. Vous savez exactement ce que vous obtenez avant que nous arrivions.'},
    {title: 'Qualité', body: 'Chaque visite est vérifiée. Si quelque chose ne correspond pas à nos normes, nous le corrigeons.'},
    {title: 'Confiance', body: 'Notre équipe est vérifiée, assurée et formée. Vous nous faites confiance avec votre espace.'},
  ] : [
    {title: 'Reliability', body: 'We show up on time, do the job right, and respect your space every visit.'},
    {title: 'Transparency', body: 'Clear pricing, no surprises. You know exactly what you\'re getting before we arrive.'},
    {title: 'Quality', body: 'Every visit is checked. If something doesn\'t meet our standard, we fix it.'},
    {title: 'Trust', body: 'Our team is background-checked, insured, and trained. You\'re trusting us with your space.'},
  ];

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'À propos' : 'About', url: `${BASE}/${locale}/about`}
      ])} />

      {/* Hero */}
      <section className="bg-[#1d2432] py-20 text-white">
        <div className="mx-auto max-w-[1180px] px-6">
          <nav className="mb-4 text-sm text-white/60">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'À propos' : 'About'}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            {isFr ? 'Une équipe de nettoyage en qui vous pouvez avoir confiance' : 'A cleaning team you can actually trust'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            {isFr
              ? 'Sparkling Stays est une entreprise de nettoyage basée à Montréal. Nous desservons les maisons, condos, bureaux et locations à court terme dans le Grand Montréal.'
              : 'Sparkling Stays is a Montreal-based cleaning company. We serve homes, condos, offices, and short-term rentals across Greater Montreal.'}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-[1180px] px-6 py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#b38716]">
              {isFr ? 'Notre mission' : 'Our mission'}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1c2333] md:text-4xl">
              {isFr ? 'Rendre votre espace propre, sans complication' : 'Make your space clean. No hassle.'}
            </h2>
            <p className="mt-6 text-[17px] leading-8 text-[#5f6776]">
              {isFr
                ? 'Trop de services de nettoyage sont peu fiables, imprévisibles ou difficiles à contacter. Sparkling Stays existe pour changer ça. Nous offrons un service cohérent, des prix honnêtes et une équipe qui se présente comme promis.'
                : 'Too many cleaning services are unreliable, inconsistent, or hard to reach. Sparkling Stays exists to change that. We provide consistent service, honest pricing, and a team that shows up as promised.'}
            </p>
            <p className="mt-4 text-[17px] leading-8 text-[#5f6776]">
              {isFr
                ? 'Que vous ayez besoin d\'un entretien hebdomadaire, d\'un grand ménage ponctuel ou d\'un nettoyage entre deux locataires, nous nous adaptons à votre situation.'
                : 'Whether you need weekly upkeep, a one-time deep clean, or turnover cleaning between guests, we adapt to your situation.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#cfa21a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
                {isFr ? 'RÉSERVER' : 'BOOK NOW'}
              </Link>
              <Link href={`/${locale}/services`} className="rounded-sm border border-[#ddd2be] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b2434]">
                {isFr ? 'NOS SERVICES' : 'OUR SERVICES'}
              </Link>
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-[3px]">
            <Image src="/media/home-cleaning.png" alt={isFr ? 'Équipe Sparkling Stays' : 'Sparkling Stays team'} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#fbf5e8] py-20">
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
            {isFr ? 'Ce qui nous guide' : 'What drives us'}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-[3px] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1c2333]">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#5f6776]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-[1180px] px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {num: '500+', label: isFr ? 'Clients satisfaits' : 'Happy clients'},
            {num: '4.9★', label: isFr ? 'Note Google moyenne' : 'Average Google rating'},
            {num: '100%', label: isFr ? 'Garantie satisfaction' : 'Satisfaction guarantee'},
          ].map((s) => (
            <div key={s.num} className="border-l-2 border-[#cfa21a] py-2 pl-6">
              <div className="text-4xl font-bold text-[#1c2333]">{s.num}</div>
              <div className="mt-1 text-[15px] text-[#5f6776]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d2432] py-16 text-center text-white">
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            {isFr ? 'Prêt à essayer Sparkling Stays?' : 'Ready to try Sparkling Stays?'}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {isFr ? 'Obtenez une soumission gratuite en quelques minutes.' : 'Get a free quote in minutes.'}
          </p>
          <Link href={`/${locale}/book-now`} className="mt-8 inline-flex rounded-sm bg-[#cfa21a] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
            {isFr ? 'RÉSERVER MAINTENANT' : 'BOOK NOW'}
          </Link>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
