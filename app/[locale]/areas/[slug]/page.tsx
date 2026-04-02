import Link from 'next/link';
import {notFound} from 'next/navigation';
import neighborhoods from '@/content/neighborhoods.json';

type Props = {params: Promise<{locale: 'en' | 'fr'; slug: string}>};

const hubs: Record<string, {en: string; fr: string}> = {
  'montreal': {en: 'Montreal', fr: 'Montréal'},
  'laval': {en: 'Laval', fr: 'Laval'},
  'west-island': {en: 'West Island', fr: 'Ouest-de-l\'Île'},
  'south-shore': {en: 'South Shore', fr: 'Rive-Sud'}
};

// also allow regional hub slugs
const isHub = (slug: string) => slug in hubs;

export default async function AreaDetailPage({params}: Props) {
  const {locale, slug} = await params;
  const isFr = locale === 'fr';

  let name: string;
  let hubLabel: string | undefined;
  let description: string;

  if (isHub(slug)) {
    const hub = hubs[slug];
    name = isFr ? hub.fr : hub.en;
    description = isFr
      ? `Sparkling Stays offre des services de nettoyage résidentiel et commercial dans la région de ${name}.`
      : `Sparkling Stays provides residential and commercial cleaning services across the ${name} region.`;
  } else {
    const n = neighborhoods.find((item) => item.slug === slug);
    if (!n) notFound();
    name = n.name;
    const hub = hubs[n.hub];
    hubLabel = hub ? (isFr ? hub.fr : hub.en) : undefined;
    description = isFr
      ? `Sparkling Stays offre des services de nettoyage résidentiel et commercial à ${name}${hubLabel ? `, dans le secteur ${hubLabel}` : ''}.`
      : `Sparkling Stays provides residential and commercial cleaning services in ${name}${hubLabel ? ` within the ${hubLabel} area` : ''}.`;
  }

  const nearby = neighborhoods
    .filter((n) => n.slug !== slug)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-[#1b2434]">
      <section className="bg-[#1d2432] text-white">
        <div className="mx-auto max-w-[1180px] px-6 py-16">
          <nav className="mb-4 text-sm text-white/70">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/areas`} className="hover:text-white">{isFr ? 'Secteurs' : 'Areas'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{name}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {isFr ? `Nettoyage à ${name}` : `Cleaning Services in ${name}`}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#cfa21a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
              {isFr ? 'RÉSERVER' : 'BOOK NOW'}
            </Link>
            <a href="tel:438-867-8770" className="rounded-sm border border-white/40 bg-white/10 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white">
              438-867-8770
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
              {isFr ? `Services de nettoyage à ${name}` : `Cleaning services available in ${name}`}
            </h2>
            <ul className="mt-6 space-y-3 text-[15px] leading-7 text-[#5f6776]">
              <li>✓ {isFr ? 'Entretien ménager résidentiel récurrent' : 'Recurring residential cleaning'}</li>
              <li>✓ {isFr ? 'Grand ménage et remises à neuf' : 'Deep cleaning and seasonal resets'}</li>
              <li>✓ {isFr ? 'Nettoyage commercial et de bureaux' : 'Commercial and office cleaning'}</li>
              <li>✓ {isFr ? 'Nettoyage Airbnb et turnovers' : 'Airbnb and turnover cleaning'}</li>
              <li>✓ {isFr ? 'Ménage de déménagement' : 'Move-in / move-out cleaning'}</li>
              <li>✓ {isFr ? 'Nettoyage après rénovation' : 'Post-renovation cleaning'}</li>
            </ul>

            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#1c2333]">
              {isFr ? 'Questions fréquentes' : 'Frequently Asked Questions'}
            </h2>
            <div className="mt-6 space-y-4">
              {[
                {q: isFr ? `Offrez-vous un service de nettoyage à ${name}?` : `Do you offer cleaning services in ${name}?`, a: isFr ? `Oui. Sparkling Stays dessert ${name} pour l'entretien résidentiel et commercial.` : `Yes. Sparkling Stays serves ${name} for residential and commercial cleaning.`},
                {q: isFr ? `Comment obtenir un devis?` : `How do I get a quote?`, a: isFr ? `Contactez-nous avec votre type de propriété, taille et fréquence souhaitée.` : `Contact us with your property type, size, and preferred frequency.`},
                {q: isFr ? `Quels types de propriétés nettoyez-vous?` : `What types of properties do you clean?`, a: isFr ? `Maisons, condos, appartements, bureaux et espaces commerciaux.` : `Homes, condos, apartments, offices, and commercial spaces.`}
              ].map((faq) => (
                <details key={faq.q} className="rounded-[3px] border border-[#e7dcc8] bg-[#fbf5e8] px-6 py-4">
                  <summary className="cursor-pointer text-[16px] font-medium text-[#1d2434]">{faq.q}</summary>
                  <p className="mt-3 text-[15px] leading-7 text-[#646d7c]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[3px] border border-[#ede6d8] bg-[#fbf5e8] p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Autres secteurs' : 'Nearby areas'}</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-[#5f6776]">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/${locale}/areas/${n.slug}`} className="hover:text-[#b38716]">{n.name}</Link>
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/areas`} className="mt-4 inline-block text-sm font-semibold text-[#b38716]">
                {isFr ? 'Voir tous les secteurs →' : 'See all areas →'}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
