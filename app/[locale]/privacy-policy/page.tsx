import Link from 'next/link';
import {SiteShell} from '@/components/SiteShell';
import {makeMeta, breadcrumbSchema, JsonLd} from '@/lib/seo';
import type {Metadata} from 'next';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Privacy Policy | Sparkling Stays',
    titleFr: 'Politique de confidentialité | Sparkling Stays',
    desc: 'Read Sparkling Stays privacy policy. We respect your data and never share personal information with third parties.',
    descFr: 'Lisez la politique de confidentialité de Sparkling Stays. Nous respectons vos données et ne les partageons jamais avec des tiers.',
    path: '/privacy-policy',
    locale
  });
}

export default async function PrivacyPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';
  return (
    <SiteShell locale={locale}>
    <div className="mx-auto max-w-[860px] px-6 py-16 text-[#1b2434]">
      <JsonLd data={breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: isFr ? 'Confidentialité' : 'Privacy Policy', url: `${BASE}/${locale}/privacy-policy`}
      ])} />
      <nav className="mb-6 text-sm text-[#5f6776]">
        <Link href={`/${locale}`} className="hover:text-[#b38716]">{isFr ? 'Accueil' : 'Home'}</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1c2333]">{isFr ? 'Confidentialité' : 'Privacy Policy'}</span>
      </nav>
      <h1 className="text-3xl font-semibold">{isFr ? 'Politique de confidentialité' : 'Privacy Policy'}</h1>
      <div className="mt-8 space-y-6 text-[15px] leading-7 text-[#5f6776]">
        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Informations collectées' : 'Information We Collect'}</h2>
        <p>{isFr ? 'Nous recueillons les informations que vous nous fournissez directement : nom, email, numéro de téléphone, adresse, et toute information relative à votre demande de service.' : 'We collect information you provide directly: name, email, phone number, address, and any details related to your service request.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Utilisation des informations' : 'How We Use Your Information'}</h2>
        <p>{isFr ? 'Vos informations sont utilisées uniquement pour planifier et fournir nos services de nettoyage, communiquer avec vous concernant vos réservations et améliorer notre service.' : 'Your information is used solely to schedule and deliver our cleaning services, communicate with you about your bookings, and improve our service.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Partage des données' : 'Data Sharing'}</h2>
        <p>{isFr ? 'Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins de marketing. Vos informations restent confidentielles.' : 'We do not sell, rent, or share your personal data with third parties for marketing purposes. Your information remains confidential.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">{isFr ? 'Sécurité' : 'Security'}</h2>
        <p>{isFr ? 'Nous prenons des mesures raisonnables pour protéger vos informations personnelles contre l\'accès non autorisé, la modification ou la divulgation.' : 'We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure.'}</p>

        <h2 className="text-xl font-semibold text-[#1c2333]">Contact</h2>
        <p>{isFr ? 'Pour toute question concernant cette politique, contactez-nous à' : 'For questions about this policy, contact us at'} <a href="mailto:info@sparklingstays.com" className="text-[#b38716]">info@sparklingstays.com</a>.</p>
      </div>
    </div>
    </SiteShell>
  );
}
