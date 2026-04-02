import {notFound} from 'next/navigation';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {CTAButton} from '@/components/ui/CTAButton';
import {JsonLd} from '@/components/seo/JsonLd';
import {getServices} from '@/lib/content';
import {siteConfig} from '@/lib/seo';

export default async function ServicePage({params}: {params: Promise<{locale: 'en' | 'fr'; service: string}>}) {
  const {locale, service} = await params;
  const item = getServices().find((entry) => entry.slug === service);

  if (!item) notFound();

  return (
    <div className="space-y-8 py-6">
      <Breadcrumbs items={[{label: 'Home', href: '/'}, {label: locale === 'fr' ? 'Services' : 'Services', href: '/services/home-cleaning'}, {label: item.name[locale]}]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: item.name[locale],
          provider: {'@type': 'LocalBusiness', name: siteConfig.name},
          areaServed: ['Montreal', 'Laval', 'West Island', 'South Shore']
        }}
      />
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">Sparkling Stays</p>
        <h1 className="mt-4 text-4xl font-bold text-[var(--navy)]">{item.name[locale]}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{item.description[locale]}</p>
        <div className="mt-6"><CTAButton href="/book-now">{locale === 'fr' ? 'Obtenir une soumission' : 'Get a quote'}</CTAButton></div>
      </div>
    </div>
  );
}
