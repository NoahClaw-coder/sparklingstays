export default async function TermsPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  return (
    <div className="mx-auto max-w-[860px] px-6 py-16 text-[#1b2434]">
      <h1 className="text-3xl font-semibold">{isFr ? 'Conditions d\'utilisation' : 'Terms & Conditions'}</h1>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-[#5f6776]">
        <p>{isFr ? 'En utilisant les services de Sparkling Stays, vous acceptez les conditions suivantes.' : 'By using Sparkling Stays services, you agree to the following terms.'}</p>
        <p>{isFr ? 'Les services sont fournis selon les détails confirmés lors de la réservation. Les annulations doivent être faites au moins 24 heures à l\'avance.' : 'Services are provided based on the details confirmed at booking. Cancellations must be made at least 24 hours in advance.'}</p>
        <p>{isFr ? 'Pour toute question, contactez info@sparklingstays.com ou appelez le 438-867-8770.' : 'For any questions, contact info@sparklingstays.com or call 438-867-8770.'}</p>
      </div>
    </div>
  );
}
