import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import Image from 'next/image';
import type {Metadata} from 'next';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Contact Us | Sparkling Stays',
    titleFr: 'Contactez-nous | Sparkling Stays',
    desc: 'Get in touch with Sparkling Stays. Call 438-867-8770 or email info@sparklingstays.com. Cleaning services across Montreal, Laval, West Island, and South Shore.',
    descFr: 'Contactez Sparkling Stays. Appelez le 438-867-8770 ou écrivez à info@sparklingstays.com. Services de nettoyage à Montréal, Laval, West Island et Rive-Sud.',
    path: '/contact',
    locale
  });
}

export default async function ContactPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: 'Contact', url: `${BASE}/${locale}/contact`}
      ])} />

      <section className="relative bg-[#1d2432] py-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/media/cleaning-maid.png" alt="Sparkling Stays cleaning team" fill className="object-cover opacity-15" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-[1180px] px-6">
          <nav className="mb-4 text-sm text-white/60">
            <Link href={`/${locale}`} className="hover:text-white">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {isFr ? 'Contactez-nous' : 'Get in Touch'}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {isFr ? 'Des questions? Besoin d\'un devis? Nous répondons rapidement.' : 'Questions? Need a quote? We respond fast.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1c2333]">
              {isFr ? 'Informations de contact' : 'Contact Information'}
            </h2>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fbf5e8] text-xl text-[#cfa21a]">📞</div>
                <div>
                  <p className="font-semibold text-[#1c2333]">{isFr ? 'Téléphone' : 'Phone'}</p>
                  <a href="tel:438-867-8770" className="text-[17px] text-[#5f6776] hover:text-[#b38716]">438-867-8770</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fbf5e8] text-xl text-[#cfa21a]">✉️</div>
                <div>
                  <p className="font-semibold text-[#1c2333]">Email</p>
                  <a href="mailto:info@sparklingstays.com" className="text-[17px] text-[#5f6776] hover:text-[#b38716]">info@sparklingstays.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fbf5e8] text-xl text-[#cfa21a]">📍</div>
                <div>
                  <p className="font-semibold text-[#1c2333]">{isFr ? 'Secteurs desservis' : 'Areas Served'}</p>
                  <p className="text-[17px] text-[#5f6776]">Montreal, Laval, West Island, South Shore</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fbf5e8] text-xl text-[#cfa21a]">🕐</div>
                <div>
                  <p className="font-semibold text-[#1c2333]">{isFr ? 'Heures' : 'Hours'}</p>
                  <p className="text-[17px] text-[#5f6776]">{isFr ? 'Lun–Sam: 8h–18h' : 'Mon–Sat: 8AM–6PM'}</p>
                  <p className="text-[15px] text-[#5f6776]">{isFr ? 'Dim: Fermé' : 'Sun: Closed'}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[3px] bg-[#fbf5e8] p-6">
              <h3 className="font-semibold text-[#1c2333]">{isFr ? 'Besoin d\'aide rapidement?' : 'Need quick help?'}</h3>
              <p className="mt-2 text-[15px] text-[#5f6776]">
                {isFr ? 'Consultez notre FAQ pour des réponses immédiates.' : 'Check our FAQ for instant answers.'}
              </p>
              <Link href={`/${locale}/faq`} className="mt-3 inline-block text-sm font-semibold text-[#b38716]">
                {isFr ? 'Voir la FAQ →' : 'View FAQ →'}
              </Link>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-[3px] border border-[#ede6d8] bg-white p-8">
            <h2 className="text-2xl font-semibold text-[#1c2333]">
              {isFr ? 'Envoyez-nous un message' : 'Send us a message'}
            </h2>
            <p className="mt-2 text-[15px] text-[#5f6776]">
              {isFr ? 'Nous répondons en moins de 2 heures pendant les heures d\'ouverture.' : 'We respond within 2 hours during business hours.'}
            </p>
            <form className="mt-6 space-y-4" action={`/${locale}/thank-you`} method="get">
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Nom' : 'Name'}</label>
                <input type="text" name="name" required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] text-[#1b2434] outline-none focus:border-[#cfa21a]" placeholder={isFr ? 'Votre nom' : 'Your name'} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">Email</label>
                <input type="email" name="email" required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] text-[#1b2434] outline-none focus:border-[#cfa21a]" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">{isFr ? 'Téléphone' : 'Phone'}</label>
                <input type="tel" name="phone" className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] text-[#1b2434] outline-none focus:border-[#cfa21a]" placeholder="(514) 000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c2333]">Message</label>
                <textarea name="message" rows={4} required className="mt-1 w-full rounded-[3px] border border-[#ddd2be] px-4 py-3 text-[15px] text-[#1b2434] outline-none focus:border-[#cfa21a]" placeholder={isFr ? 'Décrivez ce dont vous avez besoin…' : 'Tell us what you need…'} />
              </div>
              <button type="submit" className="w-full rounded-sm bg-[#cfa21a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#152033]">
                {isFr ? 'ENVOYER' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-[#e8ebef] py-16">
        <div className="mx-auto max-w-[1180px] px-6 text-center">
          <h2 className="text-2xl font-semibold text-[#1c2333]">{isFr ? 'Nous desservons le Grand Montréal' : 'Serving Greater Montreal'}</h2>
          <p className="mt-4 text-[#5f6776]">{isFr ? 'Montréal · Laval · West Island · Rive-Sud' : 'Montreal · Laval · West Island · South Shore'}</p>
          <Link href={`/${locale}/areas`} className="mt-6 inline-flex rounded-sm border border-[#ddd2be] bg-white px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b2434]">
            {isFr ? 'VOIR NOS SECTEURS' : 'VIEW SERVICE AREAS'}
          </Link>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
