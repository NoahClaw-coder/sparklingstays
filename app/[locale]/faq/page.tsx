import {InternalPageShell} from '@/components/InternalPageShell';

export default async function FAQPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <InternalPageShell
      locale={locale}
      eyebrow="FAQ"
      title={locale === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
      description={locale === 'fr' ? 'Cette page servira à porter la FAQ du site live dans le nouveau build.' : 'This page will be used to port the live-site FAQ into the new build.'}
    />
  );
}
