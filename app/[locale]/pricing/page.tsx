import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import Image from 'next/image';
import type {Metadata} from 'next';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Cleaning Prices in Montreal | Sparkling Stays',
    titleFr: 'Tarifs de nettoyage à Montréal | Sparkling Stays',
    desc: 'Transparent cleaning prices for homes, offices, and Airbnbs in Montreal. Get an instant quote online — pricing depends on property size, type, and frequency.',
    descFr: 'Tarifs de nettoyage transparents pour maisons, bureaux et Airbnbs à Montréal. Obtenez un devis instantané en ligne — les prix dépendent de la taille, du type et de la fréquence.',
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
      desc: 'Nettoyage récurrent pour garder votre espace propre chaque semaine, aux deux semaines ou chaque mois.',
      features: ['Aspirateur et moppe de tous les planchers', 'Cuisine et salle de bain nettoyées et désinfectées', 'Époussetage des surfaces et meubles', 'Faire les lits et ranger les pièces', 'Vider les poubelles et recyclage', 'Essuyer les surfaces fréquemment touchées'],
      popular: false,
    },
    {
      name: 'Grand ménage',
      desc: 'Nettoyage en profondeur de chaque coin, du plancher au plafond. Idéal comme première visite ou rafraîchissement saisonnier.',
      features: ['Tout de l\'entretien régulier', 'Intérieur du four, micro-ondes et réfrigérateur', 'Plinthes, cadres de porte et rebords', 'Derrière et sous les meubles', 'Luminaires, ventilateurs et couvercles de ventilation', 'Joints de carrelage et portes de douche'],
      popular: true,
    },
    {
      name: 'Déménagement',
      desc: 'Remise à neuf complète avant ou après un déménagement — résultats prêts pour l\'inspection.',
      features: ['Grand ménage complet', 'Intérieur de toutes les armoires et tiroirs', 'Nettoyage du réfrigérateur, four et lave-vaisselle', 'Fenêtres intérieures et rails', 'Retrait de poussière, toiles et marques sur les murs', 'Prêt pour l\'inspection'],
      popular: false,
    },
  ] : [
    {
      name: 'Regular Cleaning',
      desc: 'Recurring cleaning to keep your space consistently fresh — available weekly, biweekly, or monthly.',
      features: ['Vacuum and mop all floors', 'Kitchen and bathroom cleaned and sanitized', 'Dust all surfaces and furniture', 'Make beds and tidy rooms', 'Empty trash and recycling', 'Wipe high-touch surfaces'],
      popular: false,
    },
    {
      name: 'Deep Cleaning',
      desc: 'Thorough top-to-bottom clean for every corner of your space. Ideal as a first visit or seasonal refresh.',
      features: ['Everything in regular cleaning', 'Inside oven, microwave, and fridge', 'Baseboards, door frames, and sills', 'Behind and under furniture', 'Light fixtures, fans, and vent covers', 'Tile grout and shower doors'],
      popular: true,
    },
    {
      name: 'Move In/Out',
      desc: 'Full reset clean before or after your move — inspection-ready results.',
      features: ['Full deep clean', 'Inside all cabinets and drawers', 'Fridge, oven, and dishwasher interior', 'Interior windows and tracks', 'Dust, cobweb, and wall mark removal', 'Inspection-ready finish'],
      popular: false,
    },
  ];

  const additionalServices = isFr ? [
    {name: 'Nettoyage commercial', desc: 'Commerces, restaurants, gyms et espaces d\'affaires'},
    {name: 'Nettoyage de bureau', desc: 'Bureaux, espaces de coworking et suites professionnelles'},
    {name: 'Nettoyage Airbnb', desc: 'Rotations rapides entre les séjours d\'invités'},
    {name: 'Nettoyage de fenêtres', desc: 'Fenêtres intérieures et extérieures, moustiquaires et rails'},
    {name: 'Après rénovation', desc: 'Poussière fine, résidus de peinture et débris de construction'},
    {name: 'Service de femme de ménage', desc: 'Ménagères professionnelles de confiance pour votre maison'},
  ] : [
    {name: 'Commercial Cleaning', desc: 'Retail stores, restaurants, gyms, and business spaces'},
    {name: 'Office Cleaning', desc: 'Offices, coworking spaces, and professional suites'},
    {name: 'Airbnb Turnover', desc: 'Fast-turnaround cleaning between guest stays'},
    {name: 'Window Cleaning', desc: 'Interior and exterior windows, screens, and tracks'},
    {name: 'Post-Renovation', desc: 'Fine dust, paint residue, and construction debris removal'},
    {name: 'Maid Services', desc: 'Trusted, professional housekeepers for your home'},
  ];

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'Tarifs' : 'Pricing', url: `${BASE}/${locale}/pricing`}
      ])} />

      <section className="relative bg-[#1d2432] py-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/media/large-windows.png" alt="Clean home interior" fill className="object-cover opacity-15" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-[1180px] px-6">
          <nav className="mb-4 text-sm text-white/60">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Tarifs' : 'Pricing'}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {isFr ? 'Nos services et tarifs' : 'Our Services & Pricing'}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {isFr ? 'Le prix dépend du type de propriété, de la taille et de la fréquence. Obtenez un devis instantané en réservant en ligne.' : 'Pricing depends on your property type, size, and frequency. Get an instant quote by booking online.'}
          </p>
        </div>
      </section>

      {/* Service tiers */}
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
          {isFr ? 'Les prix sont calculés automatiquement en fonction de votre propriété lors de la réservation en ligne.' : 'Prices are calculated automatically based on your property when you book online.'}
        </p>
      </section>

      {/* Additional services */}
      <section className="bg-[#fbf5e8] py-16">
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
            {isFr ? 'Services additionnels' : 'Additional Services'}
          </h2>
          <p className="mt-3 text-[16px] text-[#5f6776]">
            {isFr ? 'Chaque service est tarifé selon la taille de votre espace et vos besoins spécifiques.' : 'Each service is priced based on your space size and specific needs.'}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((a) => (
              <Link key={a.name} href={`/${locale}/book-now`} className="flex flex-col rounded-[3px] bg-white px-6 py-5 shadow-sm transition hover:border-[#cfa21a] hover:shadow-md">
                <span className="text-[15px] font-medium text-[#1c2333]">{a.name}</span>
                <span className="mt-1 text-[14px] text-[#5f6776]">{a.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How pricing works */}
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
          {isFr ? 'Comment nos tarifs fonctionnent' : 'How Our Pricing Works'}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(isFr ? [
            {step: '1', title: 'Choisissez votre service', desc: 'Sélectionnez le type de nettoyage dont vous avez besoin.'},
            {step: '2', title: 'Décrivez votre propriété', desc: 'Indiquez la taille, le nombre de chambres et salles de bain.'},
            {step: '3', title: 'Choisissez la fréquence', desc: 'Hebdomadaire, bimensuel ou mensuel — les visites régulières coûtent moins.'},
            {step: '4', title: 'Obtenez votre prix', desc: 'Votre tarif est calculé instantanément. Réservez en ligne en quelques clics.'},
          ] : [
            {step: '1', title: 'Choose your service', desc: 'Select the type of cleaning you need.'},
            {step: '2', title: 'Describe your property', desc: 'Tell us the size, bedrooms, and bathrooms.'},
            {step: '3', title: 'Pick your frequency', desc: 'Weekly, biweekly, or monthly — recurring visits cost less.'},
            {step: '4', title: 'Get your price', desc: 'Your rate is calculated instantly. Book online in a few clicks.'},
          ]).map((item) => (
            <div key={item.step} className="rounded-[3px] border border-[#ede6d8] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cfa21a] text-sm font-bold text-[#152033]">{item.step}</div>
              <h3 className="mt-4 text-[16px] font-semibold text-[#1c2333]">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-[#5f6776]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frequency savings */}
      <section className="bg-[#fbf5e8] py-16">
        <div className="mx-auto max-w-[1180px] px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
            {isFr ? 'Économisez avec un plan récurrent' : 'Save with a Recurring Plan'}
          </h2>
          <p className="mt-4 text-[17px] text-[#5f6776]">
            {isFr ? 'Plus vous réservez fréquemment, moins chaque visite coûte. L\'entretien récurrent est plus rapide et plus efficace que de tout recommencer à zéro.' : 'The more frequently you book, the less each visit costs. Recurring maintenance is faster and more efficient than starting from scratch every time.'}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {(isFr ? [
              {freq: 'Hebdomadaire', note: 'Meilleur tarif par visite', highlight: true},
              {freq: 'Aux 2 semaines', note: 'Le plus populaire', highlight: false},
              {freq: 'Mensuel', note: 'Idéal pour les petits espaces', highlight: false},
            ] : [
              {freq: 'Weekly', note: 'Best rate per visit', highlight: true},
              {freq: 'Bi-weekly', note: 'Most popular', highlight: false},
              {freq: 'Monthly', note: 'Great for smaller spaces', highlight: false},
            ]).map((f) => (
              <div key={f.freq} className={`rounded-[3px] border p-6 text-center ${f.highlight ? 'border-[#cfa21a] bg-white' : 'border-[#ede6d8] bg-white'}`}>
                <p className="text-lg font-semibold text-[#1c2333]">{f.freq}</p>
                <p className="mt-1 text-sm text-[#b38716]">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d2432] py-16 text-center text-white">
        <div className="mx-auto max-w-[760px] px-6">
          <h2 className="text-3xl font-semibold">{isFr ? 'Obtenez votre devis instantané' : 'Get your instant quote'}</h2>
          <p className="mt-4 text-lg text-white/70">{isFr ? 'Réservez en ligne et obtenez votre prix en quelques clics. Sans engagement.' : 'Book online and get your price in a few clicks. No obligation.'}</p>
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
