import Link from 'next/link';
import {SiteShell} from '@/components/SiteShell';

export default async function ThankYouPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  return (
    <SiteShell locale={locale}>
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-center text-[#1b2434]">
      <div>
        <h1 className="text-4xl font-semibold">{isFr ? 'Merci!' : 'Thank You!'}</h1>
        <p className="mt-4 text-lg text-[#5f6776]">{isFr ? 'Votre demande a été envoyée. Nous vous contacterons sous peu.' : 'Your request has been submitted. We will be in touch shortly.'}</p>
        <Link href={`/${locale}`} className="mt-8 inline-flex rounded-sm bg-[#FEE569] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white">
          {isFr ? 'RETOUR À L\'ACCUEIL' : 'BACK TO HOME'}
        </Link>
      </div>
    </div>
    </SiteShell>
  );
}
