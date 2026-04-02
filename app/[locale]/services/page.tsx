import {InternalPageShell} from '@/components/InternalPageShell';

export default async function ServicesPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <InternalPageShell
      locale={locale}
      eyebrow={locale === 'fr' ? 'Services' : 'Services'}
      title={locale === 'fr' ? 'Services de nettoyage' : 'Cleaning Services'}
      description={locale === 'fr' ? 'Le hub services sera reconstruit pour refléter la structure finale du site et préserver les intentions SEO.' : 'The services hub will be rebuilt to reflect the final site structure and preserve SEO intent.'}
    />
  );
}
