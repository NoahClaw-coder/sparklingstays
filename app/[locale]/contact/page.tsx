import {siteConfig} from '@/lib/seo';

export default async function ContactPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold text-[var(--navy)]">{locale === 'fr' ? 'Contact' : 'Contact'}</h1>
      <p className="mt-4 text-slate-600">{locale === 'fr' ? 'Contactez Sparkling Stays pour réserver ou demander une soumission.' : 'Contact Sparkling Stays for scheduling or quote requests.'}</p>
      <div className="mt-6 space-y-2 text-slate-700">
        <p>{siteConfig.phone}</p>
        <p>{siteConfig.email}</p>
      </div>
    </div>
  );
}
