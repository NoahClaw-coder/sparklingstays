import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {siteConfig, getCanonical} from '@/lib/seo';
import {CTAButton} from '@/components/ui/CTAButton';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';
type Params = Promise<{locale: string}>;

type FaqPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  primaryCta: string;
  secondaryCta: string;
  heroNote: string;
  categoriesTitle: string;
  categoriesIntro: string;
  categories: {
    title: string;
    body: string;
    bullets: string[];
  }[];
  expectationTitle: string;
  expectationIntro: string;
  expectationItems: string[];
  contactTitle: string;
  contactBody: string;
  contactItems: string[];
  faqTitle: string;
  faqs: {question: string; answer: string}[];
  finalTitle: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const faqPageContent: Record<Locale, FaqPageContent> = {
  en: {
    eyebrow: 'Straight answers for residential and commercial cleaning across Greater Montreal',
    title: 'Frequently Asked Questions',
    description:
      'Find clear answers about Sparkling Stays cleaning services in Montreal, Laval, the West Island, and the South Shore. Learn how recurring service, one-time cleaning, deep cleaning, quotes, coverage areas, bilingual support, and specialty requests are handled.',
    metaTitle: 'Cleaning Service FAQ | Sparkling Stays Montreal',
    metaDescription:
      'Read Sparkling Stays FAQs about home and commercial cleaning, deep cleaning, quotes, service areas, bilingual support, and specialty requests in Greater Montreal.',
    lastUpdated: 'Last updated: April 2026',
    primaryCta: 'Request a quote',
    secondaryCta: 'Contact us',
    heroNote:
      'This FAQ is meant to remove confusion before you reach out. It explains how Sparkling Stays frames service types, pricing conversations, and next steps without making promises the site does not support.',
    categoriesTitle: 'What clients usually want clarified first',
    categoriesIntro:
      'Most questions fall into a few practical buckets: what kind of cleaning to choose, how pricing is handled, where service is offered, and what to expect before scheduling moves forward.',
    categories: [
      {
        title: 'Service fit',
        body: 'The right category matters because recurring cleaning, one-time visits, deep cleaning, and commercial work are not scoped the same way.',
        bullets: [
          'Recurring home cleaning is best for ongoing upkeep',
          'One-time and deep cleaning are better for resets or first visits',
          'Commercial work usually needs a custom quote rather than flat residential framing'
        ]
      },
      {
        title: 'Quote expectations',
        body: 'Not every request can be priced instantly. Scope often depends on size, condition, frequency, and property type.',
        bullets: [
          'Residential upkeep may be easier to frame quickly',
          'Deep cleaning and first-time visits often need more context',
          'Commercial requests usually need custom details before pricing is confirmed'
        ]
      },
      {
        title: 'Coverage and communication',
        body: 'Clients also want to know whether Sparkling Stays covers their area and whether support is available in English or French.',
        bullets: [
          'Coverage is framed around Greater Montreal',
          'English and French support are both available',
          'Direct contact is useful when you need help choosing the right path'
        ]
      }
    ],
    expectationTitle: 'Good information helps the next step move faster',
    expectationIntro:
      'If you contact Sparkling Stays with a few basic details, it becomes much easier to point you to the right service path instead of guessing.',
    expectationItems: [
      'Your neighborhood or service area',
      'Whether the space is residential or commercial',
      'Whether you need recurring support, a one-time clean, or a deeper reset',
      'Approximate size, layout, or number of rooms',
      'Any timing needs, access notes, or priority areas'
    ],
    contactTitle: 'Still unsure which route fits?',
    contactBody:
      'If your question is really about fit rather than a simple yes-or-no answer, use the contact page or start a quote request. That is usually the clearest way to get the right next step.',
    contactItems: [
      `Call ${siteConfig.phone}`,
      `Email ${siteConfig.email}`,
      'Support available in English and French',
      'Best for service selection and quote guidance'
    ],
    faqTitle: 'FAQ',
    faqs: [
      {
        question: 'Do you offer residential and commercial cleaning?',
        answer:
          'Yes. Sparkling Stays supports both residential and commercial cleaning. Residential requests usually include recurring home cleaning, one-time cleaning, and deep cleaning, while commercial requests are handled with more custom scope support.'
      },
      {
        question: 'What is the difference between recurring cleaning and one-time cleaning?',
        answer:
          'Recurring cleaning is designed for ongoing upkeep on a weekly, biweekly, or monthly basis. One-time cleaning is better when you need a single visit, a catch-up clean, or help before deciding whether regular service makes sense.'
      },
      {
        question: 'When should I choose deep cleaning instead of standard upkeep?',
        answer:
          'Deep cleaning is usually the better fit for first visits, seasonal resets, or spaces that need more detail and buildup removal than a standard maintenance visit. If the home needs a more complete reset, deep cleaning is often the safer starting point.'
      },
      {
        question: 'Can you give me an exact price right away?',
        answer:
          'Sometimes a request can be framed quickly, but Sparkling Stays does not assume every job can be priced instantly. Final scope can depend on the size of the space, its current condition, the service frequency, and whether the request is residential or commercial.'
      },
      {
        question: 'What is the best way to request a quote?',
        answer:
          'For most new clients, the quote path is the best starting point. It gives Sparkling Stays the details needed to confirm the right service type and next step before scheduling moves forward.'
      },
      {
        question: 'Do commercial cleaning requests work the same way as home cleaning?',
        answer:
          'Not exactly. Commercial cleaning often needs more detail about the type of workplace, traffic, timing, and cleaning priorities, so it is usually handled through custom quote support instead of residential-style pricing guidance.'
      },
      {
        question: 'What areas does Sparkling Stays serve?',
        answer:
          'Sparkling Stays is positioned around Greater Montreal service coverage, including Montreal, Laval, the West Island, and the South Shore.'
      },
      {
        question: 'Do you offer service in both English and French?',
        answer:
          'Yes. Sparkling Stays supports inquiries, quote requests, and service discussions in both English and French.'
      },
      {
        question: 'Can I ask about specialty cleaning needs?',
        answer:
          'Yes. Specialty requests such as Airbnb turnover support, office cleaning, post-renovation cleaning, window cleaning, or other custom-scope needs can be discussed through the quote or contact path so the team can confirm fit and next steps clearly.'
      },
      {
        question: 'Can I fully book online from the FAQ page?',
        answer:
          'No. The FAQ page is informational. If you are ready to move forward, it will direct you to the quote or contact path rather than pretending the job is already fully confirmed online.'
      }
    ],
    finalTitle: 'Ready to move from questions to the right next step?',
    finalBody:
      'If you already know the type of cleaning you need, request a quote. If you still need help choosing the right path, contact Sparkling Stays directly.',
    finalPrimary: 'Request your quote',
    finalSecondary: 'Contact Sparkling Stays'
  },
  fr: {
    eyebrow: 'Des réponses claires pour le nettoyage résidentiel et commercial dans le Grand Montréal',
    title: 'Questions fréquentes',
    description:
      'Trouvez des réponses claires sur les services de nettoyage de Sparkling Stays à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud. Apprenez comment sont présentés les services récurrents, les ménages ponctuels, les grands ménages, les devis, la couverture, le soutien bilingue et les demandes spécialisées.',
    metaTitle: 'FAQ entretien ménager | Sparkling Stays Montréal',
    metaDescription:
      'Consultez la FAQ de Sparkling Stays sur le nettoyage résidentiel et commercial, les grands ménages, les devis, les zones desservies, le soutien bilingue et les demandes spécialisées dans le Grand Montréal.',
    lastUpdated: 'Dernière mise à jour : avril 2026',
    primaryCta: 'Demander un devis',
    secondaryCta: 'Nous contacter',
    heroNote:
      'Cette FAQ sert à enlever les zones grises avant votre prise de contact. Elle explique comment Sparkling Stays présente les types de service, les discussions de prix et les prochaines étapes, sans faire de promesses que le site ne peut pas appuyer.',
    categoriesTitle: 'Ce que les clients veulent surtout clarifier',
    categoriesIntro:
      'La plupart des questions reviennent aux mêmes sujets pratiques : quel type de nettoyage choisir, comment le prix est abordé, où le service est offert et à quoi s’attendre avant que la planification avance.',
    categories: [
      {
        title: 'Choix du service',
        body: 'La bonne catégorie compte, parce qu’un entretien récurrent, un ménage ponctuel, un grand ménage et un mandat commercial ne se définissent pas de la même façon.',
        bullets: [
          'L’entretien ménager récurrent convient mieux au maintien régulier',
          'Le ménage ponctuel et le grand ménage conviennent mieux aux remises à niveau ou aux premières visites',
          'Les mandats commerciaux demandent souvent un devis sur mesure plutôt qu’une logique résidentielle fixe'
        ]
      },
      {
        title: 'Attentes de devis',
        body: 'Chaque demande ne peut pas être chiffrée instantanément. La portée dépend souvent de la taille, de l’état des lieux, de la fréquence et du type de propriété.',
        bullets: [
          'Un entretien résidentiel régulier peut être plus simple à cadrer rapidement',
          'Un grand ménage ou une première visite demande souvent plus de contexte',
          'Les demandes commerciales exigent généralement des détails personnalisés avant de confirmer un prix'
        ]
      },
      {
        title: 'Couverture et communication',
        body: 'Les clients veulent aussi savoir si Sparkling Stays dessert leur secteur et si le soutien est disponible en français comme en anglais.',
        bullets: [
          'La couverture est présentée autour du Grand Montréal',
          'Le soutien est offert en français et en anglais',
          'Le contact direct est utile si vous hésitez encore sur le bon parcours'
        ]
      }
    ],
    expectationTitle: 'Les bonnes informations accélèrent la prochaine étape',
    expectationIntro:
      'Si vous contactez Sparkling Stays avec quelques détails de base, il devient plus facile de vous orienter vers le bon parcours au lieu de deviner.',
    expectationItems: [
      'Votre quartier ou votre secteur de service',
      'Le fait que l’espace soit résidentiel ou commercial',
      'Le fait que vous ayez besoin d’un service récurrent, ponctuel ou d’une remise à niveau plus approfondie',
      'La taille approximative, la configuration ou le nombre de pièces',
      'Toute contrainte d’horaire, note d’accès ou zone prioritaire'
    ],
    contactTitle: 'Vous hésitez encore sur le bon parcours?',
    contactBody:
      'Si votre question porte surtout sur l’adéquation du service plutôt que sur une simple réponse oui/non, utilisez la page de contact ou commencez par une demande de devis. C’est généralement la façon la plus claire d’obtenir la bonne prochaine étape.',
    contactItems: [
      `Appelez au ${siteConfig.phone}`,
      `Écrivez à ${siteConfig.email}`,
      'Soutien offert en français et en anglais',
      'Idéal pour choisir le bon service et obtenir des indications de devis'
    ],
    faqTitle: 'FAQ',
    faqs: [
      {
        question: 'Offrez-vous le nettoyage résidentiel et commercial?',
        answer:
          'Oui. Sparkling Stays propose des services de nettoyage résidentiel et commercial. Les demandes résidentielles couvrent habituellement l’entretien ménager récurrent, les ménages ponctuels et les grands ménages, alors que les demandes commerciales sont traitées avec une portée plus personnalisée.'
      },
      {
        question: 'Quelle est la différence entre un entretien récurrent et un ménage ponctuel?',
        answer:
          'L’entretien récurrent vise le maintien régulier, par exemple chaque semaine, aux deux semaines ou chaque mois. Le ménage ponctuel convient mieux lorsque vous avez besoin d’une seule visite, d’un rattrapage ou d’un service avant de décider si un entretien régulier est approprié.'
      },
      {
        question: 'Quand devrais-je choisir un grand ménage plutôt qu’un entretien standard?',
        answer:
          'Le grand ménage convient généralement mieux aux premières visites, aux remises à niveau saisonnières ou aux espaces qui demandent plus de détails et de nettoyage d’accumulation qu’une visite d’entretien standard. Si le logement a besoin d’une vraie remise à zéro, c’est souvent le point de départ le plus prudent.'
      },
      {
        question: 'Pouvez-vous me donner un prix exact immédiatement?',
        answer:
          'Parfois, une demande peut être cadrée rapidement, mais Sparkling Stays ne présume pas que chaque mandat peut être chiffré instantanément. La portée finale peut dépendre de la taille de l’espace, de son état actuel, de la fréquence du service et du fait que la demande soit résidentielle ou commerciale.'
      },
      {
        question: 'Quelle est la meilleure façon de demander un devis?',
        answer:
          'Pour la plupart des nouveaux clients, le parcours de devis est le meilleur point de départ. Il permet à Sparkling Stays de confirmer le bon type de service et la bonne prochaine étape avant que la planification avance.'
      },
      {
        question: 'Les demandes commerciales suivent-elles le même processus que le ménage résidentiel?',
        answer:
          'Pas exactement. Le nettoyage commercial exige souvent plus de détails sur le type d’espace, l’achalandage, l’horaire et les priorités de nettoyage. Il est donc généralement traité par un devis personnalisé plutôt qu’avec une logique résidentielle fixe.'
      },
      {
        question: 'Quels secteurs sont desservis par Sparkling Stays?',
        answer:
          'Sparkling Stays est présenté autour d’une couverture du Grand Montréal, incluant Montréal, Laval, l’Ouest-de-l’Île et la Rive-Sud.'
      },
      {
        question: 'Offrez-vous le service en français et en anglais?',
        answer:
          'Oui. Sparkling Stays accompagne les demandes, les devis et les échanges de service dans les deux langues.'
      },
      {
        question: 'Puis-je poser des questions sur des besoins de nettoyage spécialisés?',
        answer:
          'Oui. Les demandes spécialisées comme les rotations Airbnb, l’entretien de bureaux, le nettoyage après rénovation, le lavage de fenêtres ou d’autres besoins sur mesure peuvent être discutées via le parcours de devis ou de contact afin de confirmer clairement l’adéquation et la prochaine étape.'
      },
      {
        question: 'Puis-je réserver complètement en ligne à partir de la FAQ?',
        answer:
          'Non. La page FAQ est informative. Si vous êtes prêt à aller de l’avant, elle vous redirige vers le parcours de devis ou de contact plutôt que de laisser croire qu’un mandat est déjà entièrement confirmé en ligne.'
      }
    ],
    finalTitle: 'Prêt à passer des questions à la bonne prochaine étape?',
    finalBody:
      'Si vous savez déjà quel type de nettoyage vous faut, demandez un devis. Si vous avez encore besoin d’aide pour choisir le bon parcours, contactez Sparkling Stays directement.',
    finalPrimary: 'Demander votre devis',
    finalSecondary: 'Contacter Sparkling Stays'
  }
};

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale} = await params;
  const content = faqPageContent[locale as Locale] ?? faqPageContent.en;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: getCanonical(locale, '/faq'),
      languages: {
        'en-CA': `${siteConfig.url}/en/faq`,
        'fr-CA': `${siteConfig.url}/fr/faq`
      }
    }
  };
}

export default async function FaqPage({params}: {params: Params}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const content = faqPageContent[locale as Locale] ?? faqPageContent.en;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />

      <section className="bg-[#1a1a2e] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <Breadcrumbs
            items={[
              {label: locale === 'fr' ? 'Accueil' : 'Home', href: '/'},
              {label: 'FAQ'}
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{content.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/book-now" locale={locale}>{content.primaryCta}</CTAButton>
            <CTAButton href="/contact" locale={locale} variant="secondary">
              {content.secondaryCta}
            </CTAButton>
          </div>
          <div className="mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
            {content.heroNote}
          </div>
          <p className="mt-6 text-sm text-slate-300">{content.lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">{content.categoriesTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">{content.categoriesIntro}</p>
            <div className="mt-8 grid gap-6">
              {content.categories.map((category, index) => (
                <article key={category.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-slate-950">{category.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{category.body}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                    {category.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.expectationTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.expectationIntro}</p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                {content.expectationItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#1a1a2e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">{content.contactTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{content.contactBody}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                {content.contactItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a017]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="/book-now" locale={locale}>{content.primaryCta}</CTAButton>
                <CTAButton href="/contact" locale={locale} variant="secondary">
                  {content.secondaryCta}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-950">{content.faqTitle}</h2>
          </div>
          <div className="mt-10">
            <FAQAccordion items={content.faqs} />
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a2e] py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{content.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">{content.finalBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/book-now" locale={locale}>{content.finalPrimary}</CTAButton>
            <CTAButton href="/contact" locale={locale} variant="secondary">
              {content.finalSecondary}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
