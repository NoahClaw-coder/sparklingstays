import {InternalPageShell} from '@/components/InternalPageShell';

export default async function AreasPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <InternalPageShell
      locale={locale}
      eyebrow={locale === 'fr' ? 'Secteurs' : 'Areas'}
      title={locale === 'fr' ? 'Secteurs desservis' : 'Service Areas'}
      description={locale === 'fr' ? 'Le hub local sera reconstruit à partir du sitemap cible et des données GSC déjà sélectionnées.' : 'The local hub will be rebuilt from the target sitemap and the GSC-backed local dataset already selected.'}
    />
  );
}
