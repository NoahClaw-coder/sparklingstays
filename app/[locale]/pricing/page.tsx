import {InternalPageShell} from '@/components/InternalPageShell';

export default async function PricingPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <InternalPageShell
      locale={locale}
      eyebrow={locale === 'fr' ? 'Tarifs' : 'Pricing'}
      title={locale === 'fr' ? 'Tarifs de Sparkling Stays' : 'Sparkling Stays Pricing'}
      description={locale === 'fr' ? 'La page tarifs finale sera reconstruite à partir de la stratégie SEO et du design live.' : 'The final pricing page will be rebuilt from the SEO plan and the live-site design system.'}
    />
  );
}
