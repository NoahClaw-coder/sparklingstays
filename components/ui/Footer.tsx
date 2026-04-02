import Image from 'next/image';
import {siteConfig} from '@/lib/seo';
import {Link} from '@/lib/i18n';

const socials = [
  {label: 'Instagram', href: 'https://www.instagram.com/sparklingstays/'},
  {label: 'Facebook', href: 'https://www.facebook.com/SparklingStays'},
  {label: 'Yelp', href: 'https://www.yelp.ca/biz/sparkling-stays-montr%C3%A9al-2'},
  {label: 'Pinterest', href: 'https://www.pinterest.ca/sparklingstays'}
];

export function Footer({locale, tagline, rights}: {locale: string; tagline: string; rights: string}) {
  return (
    <footer className="bg-[#111423] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <Image src="/media/Logo-Transparency.png" alt="Sparkling Stays" width={190} height={58} className="h-12 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            {socials.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-2 transition hover:border-[#d4a017] hover:text-[#f4d58d]">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4d58d]">
            {locale === 'fr' ? 'Navigation' : 'Navigation'}
          </h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <Link href="/services" locale={locale} className="block hover:text-white">{locale === 'fr' ? 'Services' : 'Services'}</Link>
            <Link href="/areas" locale={locale} className="block hover:text-white">{locale === 'fr' ? 'Secteurs' : 'Areas'}</Link>
            <Link href="/pricing" locale={locale} className="block hover:text-white">{locale === 'fr' ? 'Tarifs' : 'Pricing'}</Link>
            <Link href="/about" locale={locale} className="block hover:text-white">{locale === 'fr' ? 'À propos' : 'About'}</Link>
            <Link href="/faq" locale={locale} className="block hover:text-white">FAQ</Link>
            <Link href="/contact" locale={locale} className="block hover:text-white">{locale === 'fr' ? 'Contact' : 'Contact'}</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4d58d]">
            {locale === 'fr' ? 'Coordonnées' : 'Contact'}
          </h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <a href={`tel:${siteConfig.phone}`} className="block hover:text-white">{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-white">{siteConfig.email}</a>
            <p>{locale === 'fr' ? 'Montréal, Laval, Ouest-de-l’Île et Rive-Sud' : 'Montreal, Laval, West Island, and South Shore'}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4d58d]">
            {locale === 'fr' ? 'Soumission rapide' : 'Quick quote'}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            {locale === 'fr'
              ? 'Besoin d’un entretien résidentiel ou commercial? Demandez une soumission et nous vous orienterons rapidement.'
              : 'Need residential or commercial cleaning? Request a quote and we’ll point you to the right next step quickly.'}
          </p>
          <Link
            href="/book-now"
            locale={locale}
            className="mt-5 inline-flex rounded-full bg-[#d4a017] px-5 py-3 text-sm font-bold text-[#1a1a2e] transition hover:bg-[#f4d58d]"
          >
            {locale === 'fr' ? 'Réserver maintenant' : 'Book now'}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Sparkling Stays. {rights}
      </div>
    </footer>
  );
}
