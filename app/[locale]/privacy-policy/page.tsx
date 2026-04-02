export default async function PrivacyPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  return (
    <div className="mx-auto max-w-[860px] px-6 py-16 text-[#1b2434]">
      <h1 className="text-3xl font-semibold">{isFr ? 'Politique de confidentialité' : 'Privacy Policy'}</h1>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-[#5f6776]">
        <p>{isFr ? 'Sparkling Stays respecte votre vie privée. Nous recueillons uniquement les informations nécessaires pour fournir nos services de nettoyage.' : 'Sparkling Stays respects your privacy. We only collect information necessary to provide our cleaning services.'}</p>
        <p>{isFr ? 'Nous ne vendons ni ne partageons vos données personnelles avec des tiers à des fins de marketing.' : 'We do not sell or share your personal data with third parties for marketing purposes.'}</p>
        <p>{isFr ? 'Pour toute question, contactez-nous à info@sparklingstays.com.' : 'For any questions, contact us at info@sparklingstays.com.'}</p>
      </div>
    </div>
  );
}
