import {setRequestLocale} from 'next-intl/server';
import {siteConfig} from '@/lib/seo';

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">{locale === 'fr' ? 'Contact' : 'Contact us'}</h1>
      <div className="mt-6 space-y-3 text-lg text-slate-700">
        <p>{siteConfig.phone}</p>
        <p>{siteConfig.email}</p>
        <p>{locale === 'fr' ? 'Montréal, Québec, Canada' : 'Montreal, Quebec, Canada'}</p>
      </div>
    </section>
  );
}
