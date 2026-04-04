import {SiteShell} from "@/components/SiteShell";
import Link from 'next/link';
import type {Metadata} from 'next';
import {makeMeta, faqSchema, breadcrumbSchema, JsonLd} from '@/lib/seo';

type Props = {params: Promise<{locale: 'en' | 'fr'}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'FAQ | Cleaning Services in Montreal | Sparkling Stays',
    titleFr: 'FAQ | Services de nettoyage à Montréal | Sparkling Stays',
    desc: 'Answers to common questions about Sparkling Stays cleaning services: pricing, booking, what\'s included, areas served, and more.',
    descFr: 'Réponses aux questions fréquentes sur les services de nettoyage Sparkling Stays : prix, réservation, ce qui est inclus, secteurs desservis et plus.',
    path: '/faq',
    locale
  });
}

export default async function FAQPage({params}: Props) {
  const {locale} = await params;
  const isFr = locale === 'fr';
  const BASE = 'https://sparklingstays.com';

  const faqs = isFr ? [
    {q: 'Quels services de nettoyage offrez-vous?', a: 'Sparkling Stays offre l\'entretien ménager résidentiel, le grand ménage, le nettoyage de déménagement, le nettoyage commercial, le nettoyage de bureaux, le nettoyage Airbnb, le nettoyage de fenêtres, le nettoyage après rénovation et les plans récurrents.'},
    {q: 'Quels secteurs de Montréal desservez-vous?', a: 'Nous desservons Montreal, Laval, West Island, Rive-Sud et plus de 25 quartiers incluant Brossard, Longueuil, Pointe-Claire, Kirkland, Dollard-des-Ormeaux, Pierrefonds, Westmount, Plateau-Mont-Royal et plusieurs autres.'},
    {q: 'Comment obtenir un devis?', a: 'Contactez-nous via notre formulaire de réservation en ligne ou appelez-nous au 438-867-8770. Nous vous répondons rapidement avec un prix basé sur votre type de propriété, sa taille et la fréquence souhaitée.'},
    {q: 'Combien coûte un nettoyage?', a: 'Les tarifs dépendent du type de service, de la taille du logement et de la fréquence. Un entretien standard pour un 3½ commence aux alentours de 120$. Contactez-nous pour un devis précis.'},
    {q: 'Que comprend un entretien ménager standard?', a: 'Un entretien standard comprend l\'aspirateur et la moppe des planchers, l\'époussetage des surfaces, le nettoyage de la cuisine (comptoirs, cuisinière, évier), le nettoyage complet des salles de bain, faire les lits et vider les poubelles.'},
    {q: 'Quelle est la différence entre le grand ménage et l\'entretien régulier?', a: 'L\'entretien régulier couvre le quotidien. Le grand ménage va plus loin : intérieur des électroménagers, plinthes, derrière les meubles, luminaires et zones qui accumulent la saleté. Idéal comme première visite ou remise à neuf saisonnière.'},
    {q: 'Dois-je être présent lors du nettoyage?', a: 'Non. Beaucoup de clients nous confient leur entrée ou nous laissent un accès. Nous faisons le travail et vous informons quand c\'est terminé.'},
    {q: 'Votre équipe est-elle vérifiée et assurée?', a: 'Oui. Tous nos nettoyeurs sont vérifiés, assurés et formés selon nos standards de qualité.'},
    {q: 'Utilisez-vous des produits écologiques?', a: 'Oui. Nous utilisons des produits d\'entretien écologiques, sécuritaires pour les enfants et les animaux.'},
    {q: 'Quelle est votre politique d\'annulation?', a: 'Les annulations doivent être faites au moins 24 heures à l\'avance. Contactez-nous par téléphone ou par email pour reporter ou annuler une visite.'},
    {q: 'Offrez-vous une garantie de satisfaction?', a: 'Oui. Si vous n\'êtes pas satisfait de notre travail, contactez-nous dans les 24 heures et nous revenons corriger gratuitement.'},
  ] : [
    {q: 'What cleaning services do you offer?', a: 'Sparkling Stays offers recurring home cleaning, deep cleaning, move-in/out cleaning, commercial cleaning, office cleaning, Airbnb turnover cleaning, window cleaning, post-renovation cleaning, and recurring cleaning plans.'},
    {q: 'What areas of Montreal do you serve?', a: 'We serve Montreal, Laval, West Island, South Shore, and 25+ neighborhoods including Brossard, Longueuil, Pointe-Claire, Kirkland, Dollard-des-Ormeaux, Pierrefonds, Westmount, Plateau-Mont-Royal, and more.'},
    {q: 'How do I get a quote?', a: 'Contact us through our online booking form or call us at 438-867-8770. We respond quickly with a price based on your property type, size, and preferred frequency.'},
    {q: 'How much does a cleaning cost?', a: 'Pricing depends on service type, home size, and frequency. A standard clean for a 1-bedroom starts around $120. Contact us for an accurate quote for your specific space.'},
    {q: 'What is included in a standard home cleaning?', a: 'A standard clean includes vacuuming and mopping floors, dusting surfaces, kitchen cleaning (counters, stovetop, sink), full bathroom cleaning, making beds, and emptying trash.'},
    {q: 'What is the difference between deep cleaning and regular cleaning?', a: 'Regular cleaning covers everyday maintenance. A deep clean goes further: inside appliances, baseboards, behind furniture, light fixtures, and areas that build up grime over time. Ideal as a first visit or seasonal reset.'},
    {q: 'Do I need to be home during the cleaning?', a: 'No. Many clients give us a key or entry code. We complete the cleaning and let you know when we\'re done.'},
    {q: 'Is your team background-checked and insured?', a: 'Yes. All our cleaners are background-checked, insured, and trained to our quality standards.'},
    {q: 'Do you use eco-friendly products?', a: 'Yes. We use eco-friendly cleaning products that are safe for children and pets.'},
    {q: 'What is your cancellation policy?', a: 'Cancellations must be made at least 24 hours in advance. Contact us by phone or email to reschedule or cancel a visit.'},
    {q: 'Do you offer a satisfaction guarantee?', a: 'Yes. If you\'re not satisfied with our work, contact us within 24 hours and we\'ll return to fix it at no charge.'},
  ];

  return (
    <SiteShell locale={locale}>
    <div className="min-h-screen bg-white text-[#1b2434]">
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([
        {name: isFr ? 'Accueil' : 'Home', url: `${BASE}/${locale}`},
        {name: 'FAQ', url: `${BASE}/${locale}/faq`}
      ])]} />

      <section className="bg-[#fbf5e8] py-16">
        <div className="mx-auto max-w-[860px] px-6">
          <nav className="mb-4 text-sm text-[#5f6776]">
            <Link href={`/${locale}`} className="hover:text-[#b38716]">{isFr ? 'Accueil' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1c2333]">FAQ</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight text-[#1c2333] md:text-5xl">
            {isFr ? 'Questions fréquentes' : 'Frequently Asked Questions'}
          </h1>
          <p className="mt-5 text-lg text-[#5f6776]">
            {isFr ? 'Tout ce que vous devez savoir avant de réserver.' : 'Everything you need to know before booking.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[860px] px-6 py-16">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-[3px] border border-[#e7dcc8] bg-[#fbf5e8] px-6 py-5 open:bg-white">
              <summary className="cursor-pointer list-none text-[16px] font-semibold text-[#1d2434]">
                <span className="mr-3 text-[#cfa21a]">+</span>{faq.q}
              </summary>
              <p className="mt-4 text-[15px] leading-7 text-[#646d7c]">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 rounded-[3px] bg-[#1d2432] p-8 text-center text-white">
          <h2 className="text-2xl font-semibold">{isFr ? 'Vous avez d\'autres questions?' : 'Still have questions?'}</h2>
          <p className="mt-3 text-white/70">{isFr ? 'Contactez-nous directement.' : 'Reach out to us directly.'}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className="rounded-sm border border-white/40 bg-white/10 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white">
              {isFr ? 'NOUS CONTACTER' : 'CONTACT US'}
            </Link>
            <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#FEE569] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white">
              {isFr ? 'RÉSERVER' : 'BOOK NOW'}
            </Link>
          </div>
        </div>
      </section>
    </div>
    </SiteShell>
  );
}
