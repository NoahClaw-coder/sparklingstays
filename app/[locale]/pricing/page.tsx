import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import type {Metadata} from 'next';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Cleaning Prices in Montreal | Sparkling Stays',
    titleFr: 'Tarifs de nettoyage à Montréal | Sparkling Stays',
    desc: 'Transparent cleaning prices for homes, offices, and Airbnbs in Montreal. Request a free quote — pricing depends on property size, type, and frequency.',
    descFr: 'Tarifs de nettoyage transparents pour maisons, bureaux et Airbnbs à Montréal. Demandez un devis gratuit — les prix dépendent de la taille, du type et de la fréquence.',
    path: '/pricing',
    locale
  });
}

export default async function PricingPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  const tiers = isFr ? [
    {
      name: 'Entretien régulier',
      desc: 'Nettoyage récurrent pour garder votre espace propre chaque semaine.',
      starting: 'À partir de 120$/visite',
      features: ['Aspirateur et moppe', 'Cuisine et salle de bain', 'Époussetage des surfaces', 'Faire les lits', 'Vider les poubelles'],
      popular: false,
    },
    {
      name: 'Grand ménage',
      desc: 'Nettoyage en profondeur de chaque coin, du plancher au plafond.',
      starting: 'À partir de 200$/visite',
      features: ['Tout de l\'entretien régulier', 'Intérieur des électroménagers', 'Plinthes et cadres de porte', 'Derrière et sous les meubles', 'Luminaires et ventilateurs'],
      popular: true,
    },
    {
      name: 'Déménagement',
      desc: 'Remise à neuf complète avant ou après un déménagement.',
      starting: 'À partir de 250$/visite',
      features: ['Grand ménage complet', 'Intérieur des armoires', 'Nettoyage du réfrigérateur et four', 'Fenêtres intérieures', 'Prêt pour l\'inspection'],
      popular: false,
    },
  ] : [
    {
      name: 'Regular Cleaning',
      desc: 'Recurring cleaning to keep your space consistently fresh.',
      starting: 'Starting at $120/visit',
      features: ['Vacuum and mop floors', 'Kitchen and bathroom', 'Dust all surfaces', 'Make beds', 'Empty trash'],
      popular: false,
    },
    {
      name: 'Deep Cleaning',
      desc: 'Thorough top-to-bottom clean for every corner of your space.',
      starting: 'Starting at $200/visit',
      features: ['Everything in regular', 'Inside appliances', 'Baseboards and door frames', 'Behind and under furniture', 'Light fixtures and fans'],
      popular: true,
    },
    {
      name: 'Move In/Out',
      desc: 'Full reset clean before or after your move.',
      starting: 'Starting at $250/visit',
      features: ['Full deep clean', 'Inside all cabinets', 'Fridge and oven interior', 'Interior windows', 'Inspection-ready finish'],
      popular: false,
    },
  ];

  const addons = isFr ? [
    {name: 'Nettoyage commercial', price: 'Sur devis'},
    {name: 'Nettoyage de bureau', price: 'Sur devis'},
    {name: 'Nettoyage Airbnb', price: 'À partir de 100$'},
    {name: 'Nettoyage de fenêtres', price: 'À partir de 80$'},
    {name: 'Après rénovation', price: 'Sur devis'},
    {name: 'Nettoyage de tapis', price: 'À partir de 75$'},
  ] : [
    {name: 'Commercial cleaning', price: 'Custom quote'},
    {name: 'Office cleaning', price: 'Custom quote'},
    {name: 'Airbnb turnover', price: 'From $100'},
    {name: 'Window cleaning', price: 'From $80'},
    {name: 'Post-renovation', price: 'Custom quote'},
    {name: 'Carpet cleaning', price: 'From $75'},
  ];

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'Tarifs' : 'Pricing', url: `${BASE}/${locale}/pricing`}
      ])} />

      <section className="bg-[#1d2432] py-16 text-white">
        <div className="mx-auto max-w-[1180px] px-6">
          <nav className="mb-4 text-sm text-white/60">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Tarifs' : 'Pricing'}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {isFr ? 'Tarifs transparents' : 'Transparent Pricing'}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {isFr ? 'Des prix clairs adaptés à votre espace. Pas de frais cachés.' : 'Clear pricing tailored to your space. No hidden fees.'}
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative rounded-[3px] border p-8 ${tier.popular ? 'border-[#cfa21a] bg-white shadow-lg' : 'border-[#ede6d8] bg-white'}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-6 rounded-full bg-[#cfa21a] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#152033]">
                  {isFr ? 'Populaire' : 'Most popular'}
                </div>
              )}
              <h3 className="text-xl font-semibold text-[#1c2333]">{tier.name}</h3>
              <p className="mt-2 text-[15px] text-[#5f6776]">{tier.desc}</p>
              <p className="mt-4 text-2xl font-bold text-[#1c2333]">{tier.starting}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[15px] text-[#5f6776]">
                    <span className="mt-0.5 text-[#cfa21a]">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/book-now`} className={`mt-8 block w-full rounded-sm py-4 text-center text-[12px] font-bold uppercase tracking-[0.22em] ${tier.popular ? 'bg-[#cfa21a] text-[#152033]' : 'border border-[#ddd2be] text-[#1b2434]'}`}>
                {isFr ? 'OBTENIR UN DEVIS' : 'GET A QUOTE'}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[15px] text-[#5f6776]">
          {isFr ? 'Les prix finaux dépendent de la taille du logement, de la fréquence et de l\'état de propreté actuel.' : 'Final prices depend on home size, frequency, and current cleanliness.'}
        </p>
      </section>

      {/* Add-on services */}
      <section className="bg-[#fbf5e8] py-16">
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
            {isFr ? 'Services additionnels' : 'Additional Services'}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((a) => (
              <div key={a.name} className="flex items-center justify-between rounded-[3px] bg-white px-6 py-4 shadow-sm">
                <span className="text-[15px] font-medium text-[#1c2333]">{a.name}</span>
                <span className="text-[15px] font-semibold text-[#b38716]">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequency discounts */}
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
          {isFr ? 'Rabais pour fréquence récurrente' : 'Recurring Frequency Discounts'}
        </h2>
        <p className="mt-4 text-[17px] text-[#5f6776]">
          {isFr ? 'Plus vous réservez fréquemment, moins ça coûte par visite.' : 'The more frequently you book, the less you pay per visit.'}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {freq: isFr ? 'Hebdomadaire' : 'Weekly', discount: isFr ? 'Meilleur tarif' : 'Best rate', highlight: true},
            {freq: isFr ? 'Aux 2 semaines' : 'Bi-weekly', discount: isFr ? 'Tarif réduit' : 'Reduced rate', highlight: false},
            {freq: isFr ? 'Mensuel' : 'Monthly', discount: isFr ? 'Tarif régulier' : 'Standard rate', highlight: false},
          ].map((f) => (
            <div key={f.freq} className={`rounded-[3px] border p-6 text-center ${f.highlight ? 'border-[#cfa21a] bg-[#fbf5e8]' : 'border-[#ede6d8] bg-white'}`}>
              <p className="text-lg font-semibold text-[#1c2333]">{f.freq}</p>
              <p className="mt-1 text-sm text-[#b38716]">{f.discount}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d2432] py-16 text-center text-white">
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="text-3xl font-semibold">{isFr ? 'Obtenez votre devis gratuit' : 'Get your free quote'}</h2>
          <p className="mt-4 text-lg text-white/70">{isFr ? 'Dites-nous ce dont vous avez besoin et nous vous répondons rapidement.' : 'Tell us what you need and we\'ll get back to you fast.'}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#cfa21a] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
              {isFr ? 'RÉSERVER MAINTENANT' : 'BOOK NOW'}
            </Link>
            <a href="tel:438-867-8770" className="rounded-sm border border-white/40 bg-white/10 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white">
              438-867-8770
            </a>
          </div>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
