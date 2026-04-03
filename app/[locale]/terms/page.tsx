import Link from 'next/link';
import {SiteShell} from '@/components/SiteShell';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';
import type {Metadata} from 'next';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Terms & Conditions | Sparkling Stays',
    titleFr: 'Conditions d\'utilisation | Sparkling Stays',
    desc: 'Terms and conditions for Sparkling Stays cleaning services in Montreal.',
    descFr: 'Conditions d\'utilisation des services de nettoyage Sparkling Stays à Montréal.',
    path: '/terms',
    locale
  });
}

export default async function TermsPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';
  return (
    <SiteShell locale={locale}>
    <div className="mx-auto max-w-[860px] px-6 py-16 text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'Conditions' : 'Terms', url: `${BASE}/${locale}/terms`}
      ])} />
      <nav className="mb-6 text-sm text-[#5f6776]">
        <Link href={`/${locale}`} className="hover:text-[#b38716]">{isFr ? 'Accueil' : 'Home'}</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1c2333]">{isFr ? 'Conditions' : 'Terms'}</span>
      </nav>
      <h1 className="text-3xl font-semibold">{isFr ? 'Conditions d\'utilisation' : 'Terms & Conditions'}</h1>
      <div className="mt-8 space-y-6 text-[15px] leading-7 text-[#5f6776]">
        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Services' : 'Services'}</h2>
        <p>{isFr ? 'Sparkling Stays fournit des services de nettoyage résidentiel et commercial dans le Grand Montréal. Les services spécifiques, la fréquence et les tarifs sont convenus avant chaque engagement.' : 'Sparkling Stays provides residential and commercial cleaning services in Greater Montreal. Specific services, frequency, and rates are agreed upon before each engagement.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Réservations et annulations' : 'Bookings & Cancellations'}</h2>
        <p>{isFr ? 'Les réservations sont confirmées par email ou par téléphone. Les annulations doivent être faites au moins 24 heures à l\'avance. Les annulations tardives peuvent entraîner des frais.' : 'Bookings are confirmed via email or phone. Cancellations must be made at least 24 hours in advance. Late cancellations may incur a fee.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Accès à la propriété' : 'Property Access'}</h2>
        <p>{isFr ? 'Le client est responsable de fournir l\'accès à la propriété à l\'heure prévue. Si notre équipe ne peut pas accéder à la propriété, des frais de déplacement peuvent s\'appliquer.' : 'The client is responsible for providing property access at the scheduled time. If our team cannot access the property, a trip fee may apply.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Garantie satisfaction' : 'Satisfaction Guarantee'}</h2>
        <p>{isFr ? 'Si vous n\'êtes pas satisfait de notre travail, contactez-nous dans les 24 heures et nous revenons corriger le problème gratuitement.' : 'If you are not satisfied with our work, contact us within 24 hours and we will return to fix the issue at no charge.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Responsabilité' : 'Liability'}</h2>
        <p>{isFr ? 'Sparkling Stays est assuré. En cas de dommage accidentel pendant le nettoyage, veuillez nous contacter immédiatement pour résoudre la situation.' : 'Sparkling Stays is insured. In the event of accidental damage during cleaning, please contact us immediately to resolve the situation.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">Contact</h2>
        <p>{isFr ? 'Pour toute question concernant ces conditions, contactez-nous à' : 'For questions about these terms, contact us at'} <a href="mailto:info@sparklingstays.com" className="text-[#b38716]">info@sparklingstays.com</a>.</p>
      </div>
    </div>
    </SiteShell>
  );
}
