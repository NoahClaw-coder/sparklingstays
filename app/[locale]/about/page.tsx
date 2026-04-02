import {InternalPageShell} from '@/components/InternalPageShell';

export default async function AboutPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <InternalPageShell
      locale={locale}
      eyebrow={locale === 'fr' ? 'À propos' : 'About Sparkling Stays'}
      title={locale === 'fr' ? 'À propos de Sparkling Stays' : 'About Sparkling Stays'}
      description={locale === 'fr' ? 'Page provisoire du nouveau build. Le design final de cette page sera aligné sur le site live Sparkling Stays une fois le système partagé terminé.' : 'Temporary page in the fresh rebuild. Final design will be aligned with the live Sparkling Stays site once the shared system is finished.'}
    />
  );
}
