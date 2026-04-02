import {InternalPageShell} from '@/components/InternalPageShell';

export default async function ContactPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <InternalPageShell
      locale={locale}
      eyebrow={locale === 'fr' ? 'Contact' : 'Contact'}
      title={locale === 'fr' ? 'Contactez Sparkling Stays' : 'Contact Sparkling Stays'}
      description={locale === 'fr' ? 'La page contact complète sera reconstruite proprement dans le nouveau système exact-site.' : 'The full contact page will be rebuilt cleanly inside the new exact-site system.'}
    />
  );
}
