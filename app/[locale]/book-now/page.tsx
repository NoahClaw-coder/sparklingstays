import {SiteShell} from '@/components/SiteShell';
import Link from 'next/link';
import type {Metadata} from 'next';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Book a Cleaning | Sparkling Stays Montreal',
    titleFr: 'Réserver un nettoyage | Sparkling Stays Montréal',
    desc: 'Book your cleaning online with Sparkling Stays. Residential, commercial, Airbnb, and deep cleaning across Montreal, Laval, West Island, and South Shore.',
    descFr: 'Réservez votre nettoyage en ligne avec Sparkling Stays. Résidentiel, commercial, Airbnb et grand ménage à Montréal, Laval, West Island et Rive-Sud.',
    path: '/book-now',
    locale
  });
}

export default async function BookNowPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'Réserver' : 'Book Now', url: `${BASE}/${locale}/book-now`}
      ])} />

      <section className="bg-[#fbf5e8] py-16">
        <div className="mx-auto max-w-[960px] px-6">
          <nav className="mb-4 text-sm text-[#5f6776]">
            <Link href={`/${locale}`} className="hover:text-[#b38716]">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1c2333]">{isFr ? 'Réserver' : 'Book Now'}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight text-[#1c2333] md:text-5xl">
            {isFr ? 'Réservez votre nettoyage' : 'Book Your Cleaning'}
          </h1>
          <p className="mt-5 text-lg text-[#5f6776]">
            {isFr ? 'Choisissez votre service, sélectionnez une date et réservez en ligne. C\'est rapide et facile.' : 'Choose your service, pick a date, and book online. It\'s quick and easy.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[960px] px-6 py-12">
        <iframe
          src="https://sparklingstays.bookingkoala.com/booknow?embed=true"
          style={{border: 'none', height: '1000px'}}
          width="100%"
          scrolling="no"
          title={isFr ? 'Formulaire de réservation Sparkling Stays' : 'Sparkling Stays Booking Form'}
        />
        {/* BookingKoala auto-resize script */}
        <script src="https://sparklingstays.bookingkoala.com/resources/embed.js" async />
      </section>

      <section className="bg-[#fbf5e8] py-12">
        <div className="mx-auto grid max-w-[960px] gap-6 px-6 sm:grid-cols-3">
          <div className="rounded-[3px] border border-[#ede6d8] bg-white p-6 text-center">
            <div className="text-2xl">✓</div>
            <h3 className="mt-2 font-semibold text-[#1c2333]">{isFr ? 'Équipe vérifiée et assurée' : 'Background-checked & insured'}</h3>
          </div>
          <div className="rounded-[3px] border border-[#ede6d8] bg-white p-6 text-center">
            <div className="text-2xl">✓</div>
            <h3 className="mt-2 font-semibold text-[#1c2333]">{isFr ? 'Produits écologiques' : 'Eco-friendly products'}</h3>
          </div>
          <div className="rounded-[3px] border border-[#ede6d8] bg-white p-6 text-center">
            <div className="text-2xl">✓</div>
            <h3 className="mt-2 font-semibold text-[#1c2333]">{isFr ? 'Garantie satisfaction 100%' : '100% satisfaction guarantee'}</h3>
          </div>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
