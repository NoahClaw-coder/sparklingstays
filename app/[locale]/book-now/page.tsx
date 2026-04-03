import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import type {Metadata} from 'next';
import services from '@/content/services.json';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Book a Cleaning | Sparkling Stays Montreal',
    titleFr: 'Réserver un nettoyage | Sparkling Stays Montréal',
    desc: 'Request a cleaning quote from Sparkling Stays. Residential, commercial, Airbnb, and deep cleaning across Montreal, Laval, West Island, and South Shore.',
    descFr: 'Demandez un devis de nettoyage chez Sparkling Stays. Résidentiel, commercial, Airbnb et grand ménage à Montréal, Laval, West Island et Rive-Sud.',
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
        <div className="mx-auto max-w-[860px] px-6">
          <nav className="mb-4 text-sm text-[#5f6776]">
            <Link href={`/${locale}`} className="hover:text-[#b38716]">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1c2333]">{isFr ? 'Réserver' : 'Book Now'}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight text-[#1c2333] md:text-5xl">
            {isFr ? 'Réservez votre nettoyage' : 'Book Your Cleaning'}
          </h1>
          <p className="mt-5 text-lg text-[#5f6776]">
            {isFr ? 'Remplissez le formulaire ci-dessous et nous vous répondons rapidement avec un devis.' : 'Fill out the form below and we\'ll get back to you quickly with a quote.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[860px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <form className="space-y-5" action={`/${locale}/thank-you`} method="get">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Prénom' : 'First name'} *</label>
                <input type="text" name="first" required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Nom' : 'Last name'} *</label>
                <input type="text" name="last" required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">Email *</label>
                <input type="email" name="email" required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Téléphone' : 'Phone'} *</label>
                <input type="tel" name="phone" required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]" placeholder="(514) 000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Type de service' : 'Service type'} *</label>
              <select name="service" required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]">
                <option value="">{isFr ? 'Sélectionnez un service' : 'Select a service'}</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{isFr ? s.titleFr : s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Fréquence' : 'Frequency'}</label>
              <select name="frequency" className="mt-1 w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]">
                <option value="once">{isFr ? 'Service unique' : 'One-time'}</option>
                <option value="weekly">{isFr ? 'Hebdomadaire' : 'Weekly'}</option>
                <option value="biweekly">{isFr ? 'Aux 2 semaines' : 'Bi-weekly'}</option>
                <option value="monthly">{isFr ? 'Mensuel' : 'Monthly'}</option>
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Type de propriété' : 'Property type'}</label>
                <select name="property" className="mt-1 w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]">
                  <option value="house">{isFr ? 'Maison' : 'House'}</option>
                  <option value="condo">Condo</option>
                  <option value="apartment">{isFr ? 'Appartement' : 'Apartment'}</option>
                  <option value="office">{isFr ? 'Bureau' : 'Office'}</option>
                  <option value="commercial">{isFr ? 'Commercial' : 'Commercial space'}</option>
                  <option value="airbnb">Airbnb</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Chambres à coucher' : 'Bedrooms'}</label>
                <select name="bedrooms" className="mt-1 w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]">
                  <option value="studio">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Secteur' : 'Area'}</label>
              <select name="area" className="mt-1 w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]">
                <option value="montreal">Montreal</option>
                <option value="laval">Laval</option>
                <option value="west-island">West Island</option>
                <option value="south-shore">{isFr ? 'Rive-Sud' : 'South Shore'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Détails ou demandes spéciales' : 'Details or special requests'}</label>
              <textarea name="details" rows={3} className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] outline-none focus:border-[#cfa21a]" placeholder={isFr ? 'Animaux, allergies, instructions d\'accès…' : 'Pets, allergies, access instructions…'} />
            </div>

            <button type="submit" className="w-full rounded-sm bg-[#cfa21a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
              {isFr ? 'DEMANDER UN DEVIS' : 'REQUEST A QUOTE'}
            </button>
            <p className="text-center text-[13px] text-[#5f6776]">
              {isFr ? 'Nous répondons en moins de 2 heures.' : 'We respond within 2 hours.'}
            </p>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[3px] bg-[#1d2432] p-6 text-white">
              <h3 className="text-lg font-semibold">{isFr ? 'Besoin d\'aide rapide?' : 'Need help fast?'}</h3>
              <p className="mt-2 text-sm text-white/70">{isFr ? 'Appelez-nous directement.' : 'Call us directly.'}</p>
              <a href="tel:438-867-8770" className="mt-4 inline-flex text-xl font-bold text-[#cfa21a]">438-867-8770</a>
            </div>

            <div className="rounded-[3px] border border-[#ede6d8] bg-[#fbf5e8] p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Ce qui est inclus' : "What's included"}</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-[#5f6776]">
                <li>✓ {isFr ? 'Devis gratuit, sans engagement' : 'Free quote, no obligation'}</li>
                <li>✓ {isFr ? 'Équipe vérifiée et assurée' : 'Background-checked, insured team'}</li>
                <li>✓ {isFr ? 'Produits écologiques' : 'Eco-friendly products'}</li>
                <li>✓ {isFr ? 'Garantie satisfaction 100%' : '100% satisfaction guarantee'}</li>
              </ul>
            </div>

            <div className="rounded-[3px] border border-[#ede6d8] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#1c2333]">{isFr ? 'Voir nos tarifs' : 'See our pricing'}</h3>
              <p className="mt-2 text-[15px] text-[#5f6776]">{isFr ? 'Consultez notre grille de tarifs avant de réserver.' : 'Check our pricing grid before booking.'}</p>
              <Link href={`/${locale}/pricing`} className="mt-3 inline-block text-sm font-semibold text-[#b38716]">
                {isFr ? 'Voir les tarifs →' : 'View pricing →'}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
