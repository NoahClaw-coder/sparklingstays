import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {CTAButton} from '@/components/ui/CTAButton';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

type Locale = 'en' | 'fr';

const serviceCards = {
  en: [
    {
      title: 'Home Cleaning',
      description: 'Recurring and one-time cleaning for houses, condos, and apartments across Greater Montreal.',
      image: '/media/cleaning-maid-1.png',
      href: '/services/home-cleaning'
    },
    {
      title: 'Deep Cleaning',
      description: 'Detailed top-to-bottom cleaning for seasonal resets, first visits, and move-related projects.',
      image: '/media/Deep-Cleaning-2.png',
      href: '/services/deep-cleaning'
    },
    {
      title: 'Commercial Cleaning',
      description: 'Flexible cleaning support for offices, clinics, shops, and professional spaces.',
      image: '/media/Commercial-cleaning-1.png',
      href: '/services/commercial-cleaning'
    },
    {
      title: 'Window Cleaning',
      description: 'Interior window cleaning for homes and businesses that want a brighter, cleaner finish.',
      image: '/media/Large-windows-1.png',
      href: '/services/window-cleaning'
    },
    {
      title: 'Airbnb Cleaning',
      description: 'Fast turnover support for hosts who need reliable resets between guests.',
      image: '/media/image-2-2048x1366.png',
      href: '/services/airbnb-cleaning'
    },
    {
      title: 'Post-Renovation Cleaning',
      description: 'Dust, debris, and detail cleaning after home or office renovation work.',
      image: '/media/reno.png',
      href: '/services/post-renovation-cleaning'
    }
  ],
  fr: [
    {
      title: 'Entretien ménager résidentiel',
      description: 'Entretien récurrent ou ponctuel pour maisons, condos et appartements dans le Grand Montréal.',
      image: '/media/cleaning-maid-1.png',
      href: '/services/home-cleaning'
    },
    {
      title: 'Grand ménage',
      description: 'Nettoyage détaillé de fond en comble pour remises à neuf saisonnières, premières visites et projets liés aux déménagements.',
      image: '/media/Deep-Cleaning-2.png',
      href: '/services/deep-cleaning'
    },
    {
      title: 'Nettoyage commercial',
      description: 'Soutien flexible pour bureaux, cliniques, commerces et espaces professionnels.',
      image: '/media/Commercial-cleaning-1.png',
      href: '/services/commercial-cleaning'
    },
    {
      title: 'Nettoyage de fenêtres',
      description: 'Nettoyage intérieur de fenêtres pour maisons et commerces qui veulent une finition plus lumineuse.',
      image: '/media/Large-windows-1.png',
      href: '/services/window-cleaning'
    },
    {
      title: 'Nettoyage Airbnb',
      description: 'Service rapide entre les séjours pour les hôtes qui veulent un turnover fiable.',
      image: '/media/image-2-2048x1366.png',
      href: '/services/airbnb-cleaning'
    },
    {
      title: 'Nettoyage après rénovation',
      description: 'Élimination de la poussière, des débris et nettoyage de détail après les travaux.',
      image: '/media/reno.png',
      href: '/services/post-renovation-cleaning'
    }
  ]
};

const content = {
  en: {
    reviewLabel: 'Top-rated Montreal cleaning company',
    heroTitle: 'Professional cleaners in Montreal for homes, rentals, and businesses',
    heroBody:
      'Sparkling Stays provides residential, commercial, office, Airbnb, deep-cleaning, and move-related cleaning services across Montreal, Laval, the West Island, and the South Shore.',
    primaryCta: 'Book now',
    secondaryCta: 'Call us now',
    sectionEyebrow: 'Our cleaning services in Montreal',
    sectionTitle: 'Real cleaning support built around how people actually book',
    sectionBody:
      'We rebuilt this experience around the way Sparkling Stays actually operates: strong visual proof, service-first navigation, and clear next steps for homeowners, hosts, and businesses.',
    whyTitle: 'Why clients choose Sparkling Stays',
    whyPoints: [
      'Bilingual service across Montreal and surrounding areas',
      'Residential, commercial, office, and Airbnb cleaning support',
      'Flexible scheduling for recurring visits or one-time resets',
      'Clear quotes and fast next steps before booking'
    ],
    processEyebrow: 'How it works',
    processTitle: 'Simple booking. Clear service. Strong follow-through.',
    process: [
      {
        step: '01',
        title: 'Tell us what you need cleaned',
        body: 'Share your property type, neighborhood, and whether you need recurring support, a one-time deep clean, or commercial service.'
      },
      {
        step: '02',
        title: 'We confirm scope and timing',
        body: 'We guide the quote path based on the size of the space, service type, and scheduling details that matter.'
      },
      {
        step: '03',
        title: 'You get a cleaner, better-kept space',
        body: 'Our service flow is built to be straightforward, responsive, and dependable from inquiry to finished cleaning.'
      }
    ],
    serviceAreaTitle: 'Serving homes and businesses across Greater Montreal',
    serviceAreaBody:
      'Montreal, Laval, West Island, South Shore, and the surrounding local neighborhoods already live inside the structure of the rebuilt site — not as afterthoughts, but as real service areas.',
    areaCards: ['Montreal', 'Laval', 'West Island', 'South Shore'],
    faqTitle: 'Questions clients ask before booking',
    faqItems: [
      {
        question: 'Do you clean both residential and commercial spaces?',
        answer:
          'Yes. Sparkling Stays supports homes, apartments, condos, offices, clinics, rentals, and short-term rental properties across Greater Montreal.'
      },
      {
        question: 'Which areas do you serve?',
        answer:
          'We actively serve Montreal, Laval, the West Island, the South Shore, and many surrounding neighborhoods through our dedicated local pages.'
      },
      {
        question: 'Can I request one-time or recurring cleaning?',
        answer:
          'Yes. You can request recurring cleaning, a one-time deep clean, move-related cleaning, post-renovation help, Airbnb turnover service, and more.'
      },
      {
        question: 'Can I book in English or French?',
        answer:
          'Yes. Sparkling Stays provides bilingual support in both English and French.'
      }
    ],
    finalTitle: 'Need cleaning services in Montreal or nearby?',
    finalBody:
      'Tell us what kind of space you have and what type of cleaning support you need. We’ll point you to the right next step quickly.',
    finalPrimary: 'Get a quote',
    finalSecondary: 'Contact us'
  },
  fr: {
    reviewLabel: 'Entreprise d’entretien très bien cotée à Montréal',
    heroTitle: 'Des nettoyeurs professionnels à Montréal pour maisons, locations et entreprises',
    heroBody:
      'Sparkling Stays offre des services d’entretien résidentiel, commercial, de bureaux, Airbnb, de grand ménage et de nettoyage lié aux déménagements partout à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud.',
    primaryCta: 'Réserver',
    secondaryCta: 'Appelez-nous',
    sectionEyebrow: 'Nos services d’entretien à Montréal',
    sectionTitle: 'Un vrai soutien en nettoyage pensé selon la façon dont les gens réservent',
    sectionBody:
      'Cette nouvelle page est reconstruite autour du fonctionnement réel de Sparkling Stays : plus de preuve visuelle, une navigation orientée services et des prochaines étapes claires pour les propriétaires, hôtes et entreprises.',
    whyTitle: 'Pourquoi les clients choisissent Sparkling Stays',
    whyPoints: [
      'Service bilingue partout à Montréal et dans les secteurs voisins',
      'Soutien résidentiel, commercial, de bureaux et Airbnb',
      'Horaire flexible pour visites récurrentes ou remises à zéro ponctuelles',
      'Soumissions claires et prochaines étapes rapides avant la réservation'
    ],
    processEyebrow: 'Comment ça fonctionne',
    processTitle: 'Réservation simple. Service clair. Suivi solide.',
    process: [
      {
        step: '01',
        title: 'Dites-nous ce qu’il faut nettoyer',
        body: 'Partagez votre type de propriété, votre quartier et si vous avez besoin d’un service récurrent, d’un grand ménage ponctuel ou d’un service commercial.'
      },
      {
        step: '02',
        title: 'Nous confirmons la portée et le moment',
        body: 'Nous orientons la soumission selon la taille de l’espace, le type de service et les détails d’horaire qui comptent.'
      },
      {
        step: '03',
        title: 'Vous profitez d’un espace plus propre et mieux entretenu',
        body: 'Notre parcours de service est conçu pour être simple, réactif et fiable du premier contact jusqu’au nettoyage terminé.'
      }
    ],
    serviceAreaTitle: 'Au service des maisons et entreprises partout dans le Grand Montréal',
    serviceAreaBody:
      'Montréal, Laval, l’Ouest-de-l’Île, la Rive-Sud et les quartiers voisins font déjà partie intégrante de la nouvelle structure du site — pas comme un ajout secondaire, mais comme de vraies zones de service.',
    areaCards: ['Montréal', 'Laval', 'Ouest-de-l’Île', 'Rive-Sud'],
    faqTitle: 'Questions fréquentes avant de réserver',
    faqItems: [
      {
        question: 'Offrez-vous le nettoyage résidentiel et commercial?',
        answer:
          'Oui. Sparkling Stays accompagne les maisons, appartements, condos, bureaux, cliniques, locations et propriétés de location courte durée partout dans le Grand Montréal.'
      },
      {
        question: 'Quels secteurs desservez-vous?',
        answer:
          'Nous desservons activement Montréal, Laval, l’Ouest-de-l’Île, la Rive-Sud et plusieurs quartiers voisins via nos pages locales dédiées.'
      },
      {
        question: 'Puis-je demander un service ponctuel ou récurrent?',
        answer:
          'Oui. Vous pouvez demander un entretien récurrent, un grand ménage ponctuel, un nettoyage lié aux déménagements, après rénovation, Airbnb et plus encore.'
      },
      {
        question: 'Puis-je réserver en français ou en anglais?',
        answer:
          'Oui. Sparkling Stays offre un accompagnement bilingue en français et en anglais.'
      }
    ],
    finalTitle: 'Besoin d’un service de nettoyage à Montréal ou dans les environs?',
    finalBody:
      'Dites-nous quel type d’espace vous avez et le type de soutien en nettoyage recherché. Nous vous orienterons rapidement vers la bonne prochaine étape.',
    finalPrimary: 'Obtenir une soumission',
    finalSecondary: 'Nous contacter'
  }
} satisfies Record<Locale, any>;

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = content[locale as Locale];
  const shared = await getTranslations({locale});

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1a1a2e] text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/ac95f789bf-1-e1731494146414.jpg"
        >
          <source src="/media/cleaning-services-montreal.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#1a1a2e]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1320]/80 via-[#1a1a2e]/55 to-[#1a1a2e]/35" />

        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-4 rounded-full bg-white/92 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
              <Image
                src="/media/Google-5-star-black-bng-Photoroom.png"
                alt="Google five star rating"
                width={130}
                height={18}
                className="h-auto w-[110px]"
              />
              <span>{t.reviewLabel}</span>
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              {t.heroBody}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CTAButton href="/book-now" locale={locale}>
                {t.primaryCta}
              </CTAButton>
              <a
                href="tel:438-867-8770"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/20"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-md rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-sm">
              <Image
                src="/media/Clean-Kitchen-2.png"
                alt="Sparkling kitchen cleaning"
                width={620}
                height={380}
                className="h-[260px] w-full rounded-[22px] object-cover"
              />
              <div className="grid gap-4 p-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/90 p-4 text-slate-900">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a1a2e]">Coverage</div>
                  <div className="mt-2 text-lg font-bold">Montreal + nearby</div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {locale === 'fr' ? 'Laval, Ouest-de-l’Île et Rive-Sud inclus.' : 'Laval, West Island, and South Shore included.'}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#d4a017] p-4 text-[#1a1a2e]">
                  <div className="text-xs font-bold uppercase tracking-[0.18em]">Booking</div>
                  <div className="mt-2 text-lg font-bold">Fast next step</div>
                  <p className="mt-2 text-sm leading-6 text-[#1a1a2e]/85">
                    {locale === 'fr' ? 'Soumission claire avant la réservation.' : 'Clear quote path before booking.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-18">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b78307]">{t.sectionEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{t.sectionTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">{t.sectionBody}</p>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards[locale as Locale].map((card) => (
              <a key={card.title} href={`/${locale}${card.href}`} className="group overflow-hidden rounded-[26px] bg-[#f8f6f1] shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-60 overflow-hidden">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{card.description}</p>
                  <div className="mt-5 inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] text-[#1a1a2e]">
                    {locale === 'fr' ? 'Voir le service' : 'See service'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1ece2] py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-slate-200 shadow-xl">
            <Image src="/media/office-cleaning-services-montreal-1.png" alt="Office cleaning by Sparkling Stays" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b78307]">{shared('hero.eyebrow')}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{t.whyTitle}</h2>
            <div className="mt-8 grid gap-4">
              {t.whyPoints.map((point: string) => (
                <div key={point} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <span className="mt-1 inline-block h-3 w-3 rounded-full bg-[#d4a017]" />
                  <p className="text-base leading-7 text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-18">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b78307]">{t.processEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{t.processTitle}</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {t.process.map((item: any) => (
              <div key={item.step} className="rounded-[28px] border border-slate-200 bg-[#faf7f1] p-8 shadow-sm">
                <div className="text-sm font-bold uppercase tracking-[0.25em] text-[#b78307]">{item.step}</div>
                <h3 className="mt-5 text-2xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a2e] py-18 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">{t.serviceAreaTitle}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">{t.serviceAreaBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.areaCards.map((area: string) => (
                <span key={area} className="rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f4d58d]">
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-2xl">
            <Image src="/media/Diseno-sin-titulo-15.webp" alt="Move in move out cleaning" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-18">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b78307]">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{t.faqTitle}</h2>
          </div>
          <div className="mt-12">
            <FAQAccordion items={t.faqItems} />
          </div>
        </div>
      </section>

      <section className="px-6 py-18">
        <div className="mx-auto overflow-hidden rounded-[36px] bg-[#1a1a2e] shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr] lg:items-stretch">
            <div className="p-10 md:p-14">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f4d58d]">Sparkling Stays</p>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-white">{t.finalTitle}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">{t.finalBody}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="/book-now" locale={locale}>{t.finalPrimary}</CTAButton>
                <CTAButton href="/contact" locale={locale} variant="secondary">{t.finalSecondary}</CTAButton>
              </div>
            </div>
            <div className="relative min-h-[320px] lg:min-h-full">
              <Image src="/media/ac95f789bf-1-e1731494146414.jpg" alt="Sparkling Stays service" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
