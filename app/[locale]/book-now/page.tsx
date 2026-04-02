import {InternalPageShell} from '@/components/InternalPageShell';

export default async function BookNowPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  return (
    <InternalPageShell
      locale={locale}
      eyebrow={locale === 'fr' ? 'Réservation' : 'Booking'}
      title={locale === 'fr' ? 'Réserver un nettoyage' : 'Book a Cleaning'}
      description={locale === 'fr' ? 'Le parcours de réservation sera branché ensuite sur le nouveau système tout en gardant le style du site live.' : 'The booking flow will be wired next into the new system while keeping the live-site styling.'}
    />
  );
}
