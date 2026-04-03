import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import neighborhoods from '@/content/neighborhoods.json';
import services from '@/content/services.json';
import {makeMeta, faqSchema, breadcrumbSchema, areaServedSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'; slug: string}>};

const hubs: Record<string, {en: string; fr: string}> = {
  montreal: {en: 'Montreal', fr: 'Montréal'},
  laval: {en: 'Laval', fr: 'Laval'},
  'west-island': {en: 'West Island', fr: "Ouest-de-l'Île"},
  'south-shore': {en: 'South Shore', fr: 'Rive-Sud'}
};
const isHub = (slug: string) => slug in hubs;

function getName(slug: string, locale: string) {
  if (isHub(slug)) {
    const h = hubs[slug];
    return locale === 'fr' ? h.fr : h.en;
  }
  const n = neighborhoods.find((item) => item.slug === slug);
  return n ? n.name : null;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const name = getName(slug, locale);
  if (!name) return {};
  const n = neighborhoods.find(item => item.slug === slug) as typeof neighborhoods[number] & {desc?: string; descFr?: string} | undefined;
  const metaDesc = (locale === 'fr' ? n?.descFr : n?.desc) || `Professional residential and commercial cleaning in ${name}. Sparkling Stays serves homes, condos, offices, and Airbnbs. Book online or call 438-867-8770.`;
  const metaDescFr = n?.descFr || `Nettoyage résidentiel et commercial professionnel à ${name}. Sparkling Stays dessert maisons, condos, bureaux et Airbnbs. Réservez en ligne ou appelez le 438-867-8770.`;
  return makeMeta({
    title: `Cleaning Services in ${name} | Sparkling Stays`,
    titleFr: `Services de nettoyage à ${name} | Sparkling Stays`,
    desc: metaDesc,
    descFr: metaDescFr,
    path: `/areas/${slug}`,
    locale
  });
}

export default async function AreaDetailPage({params}: Props) {
  const {locale, slug} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  let name: string;
  let hubLabel: string | undefined;
  let bodyText = '';
  let descText = '';
  let areaImage = '/media/team-cleaning.png';

  if (isHub(slug)) {
    const hub = hubs[slug];
    name = isFr ? hub.fr : hub.en;
  } else {
    const n = neighborhoods.find((item) => item.slug === slug) as typeof neighborhoods[number] & {body?: string; bodyFr?: string; desc?: string; descFr?: string; image?: string};
    if (!n) notFound();
    name = n.name;
    const hub = hubs[n.hub];
    hubLabel = hub ? (isFr ? hub.fr : hub.en) : undefined;
    bodyText = (isFr ? n.bodyFr : n.body) || '';
    descText = (isFr ? n.descFr : n.desc) || '';
    if (n.image) areaImage = n.image;
  }

  const description = descText || (isFr
    ? `Sparkling Stays offre des services de nettoyage résidentiel et commercial à ${name}${hubLabel ? `, dans le secteur ${hubLabel}` : ''}.`
    : `Sparkling Stays provides residential and commercial cleaning services in ${name}${hubLabel ? ` within the ${hubLabel} area` : ''}.`);

  // Nearby areas — same hub first, then others
  const currentN = neighborhoods.find(n => n.slug === slug);
  const sameHub = currentN ? neighborhoods.filter(n => n.hub === currentN.hub && n.slug !== slug) : [];
  const otherAreas = neighborhoods.filter(n => n.slug !== slug && !sameHub.includes(n));
  const nearby = [...sameHub, ...otherAreas].slice(0, 6);

  const faqs = [
    {q: isFr ? `Offrez-vous un service de nettoyage à ${name}?` : `Do you offer cleaning services in ${name}?`, a: isFr ? `Oui. Sparkling Stays dessert ${name} pour l'entretien résidentiel et commercial.` : `Yes. Sparkling Stays serves ${name} for residential and commercial cleaning.`},
    {q: isFr ? 'Comment obtenir un devis?' : 'How do I get a quote?', a: isFr ? 'Contactez-nous avec votre type de propriété, taille et fréquence souhaitée.' : 'Contact us with your property type, size, and preferred frequency.'},
    {q: isFr ? 'Quels types de propriétés nettoyez-vous?' : 'What types of properties do you clean?', a: isFr ? 'Maisons, condos, appartements, bureaux et espaces commerciaux.' : 'Homes, condos, apartments, offices, and commercial spaces.'}
  ];

  const crumbs = [
    {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
    {name: isFr ? 'Secteurs' : 'Areas', url: `${BASE}/${locale}/areas`},
    {name, url: `${BASE}/${locale}/areas/${slug}`}
  ];

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={[
        areaServedSchema(name, slug, locale, services.map(s => isFr ? s.titleFr : s.title)),
        faqSchema(faqs),
        breadcrumbSchema(crumbs)
      ]} />

      <section className="relative bg-[#1d2432] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/media/clean-kitchen.png" alt={`Cleaning services in ${name}`} fill className="object-cover opacity-15" sizes="100vw" priority />
        </div>
        <div className="relative mx-auto max-w-[1180px] px-6 py-16">
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
        <div className="mb-10 overflow-hidden rounded-lg">
          <Image src={areaImage} alt={isFr ? `Équipe de nettoyage professionnel à ${name}` : `Professional cleaning team in ${name}`} width={1024} height={683} className="h-auto w-full" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {/* Area description */}
            {bodyText && (
              <div className="mb-10">
                {bodyText.split('\n\n').map((para, i) => (
                  <p key={i} className="mt-4 text-[16px] leading-8 text-[#5f6776] first:mt-0">{para}</p>
                ))}
              </div>
            )}

            {/* Service cross-links */}
            <h2 className="text-3xl font-semibold tracking-tight text-[#1c2333]">
              {isFr ? `Services de nettoyage à ${name}` : `Cleaning services available in ${name}`}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((svc) => (
                <Link key={svc.slug} href={`/${locale}/services/${svc.slug}`} className="flex items-start gap-3 rounded-[3px] border border-[#ede6d8] bg-white p-4 transition hover:border-[#cfa21a]">
                  <span className="mt-0.5 text-[#cfa21a]">✓</span>
                  <span className="text-[15px] text-[#5f6776] hover:text-[#b38716]">{isFr ? svc.titleFr : svc.title}</span>
                </Link>
              ))}
            </div>

            {/* FAQ section */}
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#1c2333]">
              {isFr ? 'Questions fréquentes' : 'Frequently Asked Questions'}
            </h2>
            <div className="mt-6 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="rounded-[3px] border border-[#e7dcc8] bg-[#fbf5e8] px-6 py-4">
                  <summary className="cursor-pointer text-[16px] font-medium text-[#1d2434]">{faq.q}</summary>
                  <p className="mt-3 text-[15px] leading-7 text-[#646d7c]">{faq.a}</p>
                </details>
              ))}
            </div>

            {/* Blog cross-links */}
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#1c2333]">
              {isFr ? 'Articles utiles' : 'Helpful articles'}
            </h2>
            <ul className="mt-4 space-y-2 text-[15px] text-[#5f6776]">
              <li><Link href={`/${locale}/blog/how-much-does-cleaning-cost-in-montreal`} className="hover:text-[#b38716]">{isFr ? 'Combien coûte le ménage à Montréal?' : 'How Much Does Cleaning Cost in Montreal?'}</Link></li>
              <li><Link href={`/${locale}/blog/deep-cleaning-vs-standard-cleaning-montreal`} className="hover:text-[#b38716]">{isFr ? 'Grand ménage vs entretien régulier' : 'Deep Cleaning vs Standard Cleaning'}</Link></li>
              <li><Link href={`/${locale}/blog/how-often-should-you-book-recurring-cleaning`} className="hover:text-[#b38716]">{isFr ? 'À quelle fréquence réserver?' : 'How Often Should You Book?'}</Link></li>
            </ul>
          </div>

          <aside className="space-y-6">
            {/* Nearby areas */}
            <div className="rounded-[3px] border border-[#ede6d8] bg-[#fbf5e8] p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Secteurs à proximité' : 'Nearby areas'}</h3>
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

            {/* Regional hubs */}
            <div className="rounded-[3px] border border-[#ede6d8] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Régions' : 'Regions'}</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-[#5f6776]">
                {Object.entries(hubs).map(([hSlug, h]) => (
                  <li key={hSlug}>
                    <Link href={`/${locale}/areas/${hSlug}`} className="hover:text-[#b38716]">{isFr ? h.fr : h.en}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA card */}
            <div className="rounded-[3px] bg-[#1d2432] p-6 text-white">
              <h3 className="text-lg font-semibold">{isFr ? 'Obtenez une soumission' : 'Get a free quote'}</h3>
              <p className="mt-2 text-sm text-white/70">{isFr ? 'Réponse rapide, sans engagement.' : 'Fast response, no obligation.'}</p>
              <Link href={`/${locale}/book-now`} className="mt-4 inline-flex rounded-sm bg-[#cfa21a] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
                {isFr ? 'RÉSERVER' : 'BOOK NOW'}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
