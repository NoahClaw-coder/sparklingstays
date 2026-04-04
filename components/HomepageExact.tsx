import Image from 'next/image';
import Link from 'next/link';

type Props = {
  locale: 'en' | 'fr';
  nav: {
    howItWorks: string;
    services: string;
    about: string;
    faqs: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    title: string;
    description: string;
    book: string;
    call: string;
  };
};

type ServiceCard = {
  title: string;
  image: string;
  href: string;
  description: string;
};

const serviceCards: ServiceCard[] = [
  {
    title: 'Home Cleaning',
    image: '/media/home-cleaning.png',
    href: '/services/home-cleaning',
    description: 'Take back your time while we take care of your home with recurring residential cleaning tailored to your routine.'
  },
  {
    title: 'Deep Cleaning',
    image: '/media/deep-cleaning.png',
    href: '/services/deep-cleaning',
    description: 'A more detailed top-to-bottom clean for homes and offices that need extra attention in overlooked areas.'
  },
  {
    title: 'Move In Out Cleaning',
    image: '/media/move-cleaning.webp',
    href: '/services/move-in-out-cleaning',
    description: 'Get a spotless reset before or after your move with a full-corner clean that leaves the place ready.'
  },
  {
    title: 'Commercial Cleaning',
    image: '/media/commercial-cleaning.png',
    href: '/services/commercial-cleaning',
    description: 'Reliable cleaning for commercial spaces that need a polished, client-ready environment week after week.'
  },
  {
    title: 'Office Cleaning',
    image: '/media/office-cleaning.png',
    href: '/services/office-cleaning',
    description: 'Keep workspaces fresh, sanitary, and welcoming with dependable office cleaning built around your schedule.'
  },
  {
    title: 'Maid Services',
    image: '/media/home-cleaning.png',
    href: '/services/maid-services',
    description: 'Dependable home upkeep with flexible visits and detailed cleaning matched to your household needs.'
  },
  {
    title: 'Airbnb Cleaning',
    image: '/media/deep-cleaning.png',
    href: '/services/airbnb-cleaning',
    description: 'Fast turnover cleaning that helps hosts deliver a polished five-star experience for every guest arrival.'
  },
  {
    title: 'Window Cleaning',
    image: '/media/office-cleaning.png',
    href: '/services/window-cleaning',
    description: 'Brighten the space with streak-free window cleaning that lets in more natural light.'
  },
  {
    title: 'Post Renovation Cleaning',
    image: '/media/reno.png',
    href: '/services/post-renovation-cleaning',
    description: 'Clear renovation dust and debris so the finished space feels clean, safe, and ready to enjoy.'
  }
];

const howItWorks = [
  {
    step: '01',
    title: 'Select a Service',
    description: 'Click on book now and choose the cleaning service you need.'
  },
  {
    step: '02',
    title: 'Schedule a Date',
    description: 'Select the date and time that best suits you for your visit.'
  },
  {
    step: '03',
    title: 'Enjoy Cleanliness',
    description: 'Look forward to our visit and enjoy a sparkling clean home.'
  }
];

const faqs = [
  'When should I consider hiring a professional cleaning service in Montreal?',
  'What’s the difference between a standard cleaning, deep cleaning, and move-in/move-out cleaning?',
  'How can I be sure of the quality of Sparkling Stays cleaning team?',
  'Do you bring your own cleaning products and equipment?',
  'Can I request specific services or leave special instructions?',
  'What does your 100% Satisfaction Guarantee cover?',
  'Do you offer cleaning services for commercial properties and offices?',
  'Do you share cleaning tips and advice with clients?',
  'How is my billing information protected?',
  'Is it possible to cancel my appointment?'
];

const footerServices = [
  'Home Cleaning',
  'Deep Cleaning',
  'Move In Out Cleaning',
  'Commercial Cleaning',
  'Office Cleaning',
  'Maid Services',
  'Airbnb Cleaning',
  'Window Cleaning',
  'Post Renovation Cleaning'
];

const footerAreas = [
  'Montreal',
  'West Island',
  'Laval',
  'Longueuil',
  'Brossard',
  'Pointe-Claire',
  'Kirkland',
  'Downtown Montreal',
  'NDG'
];

function SocialIcon({kind}: {kind: 'instagram' | 'facebook' | 'yelp' | 'pinterest'}) {
  const common = 'h-4 w-4';

  if (kind === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="currentColor">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.4-.1-1.4-.2-2.4-.2-2.4 0-4 1.4-4 4.2V11H7v3h2.2v7h4.3Z" />
      </svg>
    );
  }

  if (kind === 'yelp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="currentColor">
        <path d="M11.7 2.2c.7.1 1.3.6 1.5 1.3l1 5.5c.2 1-.7 1.8-1.7 1.6L8 9.7c-.8-.1-1.4-.8-1.5-1.6-.1-.8.3-1.6 1-2l2.8-1.6c.4-.2.9-.4 1.4-.3Zm6 4.7c.7.3 1.1 1 1.1 1.8 0 .6-.3 1.1-.8 1.5l-3.7 2.8c-.8.6-1.9.1-2-1l-.4-4.4c-.1-.8.3-1.5 1-1.9.5-.3 1.2-.3 1.8 0l3 1.2Zm1 7.3c.8.1 1.5.7 1.6 1.5.1.8-.3 1.6-1.1 2l-4.6 2c-1 .4-2-.5-1.7-1.6l1.1-4.2c.2-.8.9-1.3 1.7-1.3h3Zm-7.2 1.2c.9.3 1.3 1.3.8 2.2l-2.2 4.1c-.4.7-1.2 1-2 .8-.8-.3-1.3-1.1-1.2-1.9l.5-5c.1-1 1.1-1.7 2.1-1.4l2 .7Zm-4.4-3.8c.6.7.5 1.8-.3 2.3l-3.7 2.4c-.7.5-1.7.4-2.3-.2-.5-.6-.6-1.4-.2-2.1l2.2-4.1c.5-.9 1.7-1.1 2.4-.3l1.9 2Z" />
      </svg>
    );
  }

  if (kind === 'pinterest') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="currentColor">
        <path d="M12 3C7 3 4 6.5 4 10.4c0 2.4 1.3 4.6 3.3 5.4.3.1.5.1.6-.2l.6-2.2c.1-.2 0-.4-.1-.6-.4-.5-.8-1.4-.8-2.5 0-3.2 2.4-6 6.5-6 3.5 0 5.5 2.1 5.5 4.9 0 3.7-1.7 6.9-4.1 6.9-1.4 0-2.4-1.1-2-2.5.4-1.7 1.2-3.5 1.2-4.7 0-1.1-.6-2-1.8-2-1.4 0-2.5 1.5-2.5 3.4 0 1.2.4 2 .4 2l-1.6 6.7c-.5 2 .1 4.3.1 4.5.1.1.2.1.3 0 .1-.2 1.6-2 2.1-3.8l.8-3c.4.7 1.5 1.2 2.7 1.2 3.5 0 5.9-3.2 5.9-7.4C20 6.1 16.8 3 12 3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="currentColor">
      <path d="M7.8 2h8.4C19 2 22 5 22 7.8v8.4c0 2.9-3 5.8-5.8 5.8H7.8C5 22 2 19 2 16.2V7.8C2 5 5 2 7.8 2Zm-.2 2.3c-1.8 0-3.3 1.5-3.3 3.3v8.8c0 1.8 1.5 3.3 3.3 3.3h8.8c1.8 0 3.3-1.5 3.3-3.3V7.6c0-1.8-1.5-3.3-3.3-3.3H7.6Zm9.5 1.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10.1A5 5 0 0 1 12 7Zm0 2.2a2.8 2.8 0 1 0 0 5.7 2.8 2.8 0 0 0 0-5.7Z" />
    </svg>
  );
}

function SmallIcon({kind}: {kind: 'mail' | 'phone' | 'star' | 'check'}) {
  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7.5 4.5c.6-.6 1.5-.7 2.2-.2l2 1.5c.7.5.9 1.4.6 2.1l-.8 1.8c1 1.8 2.5 3.3 4.3 4.3l1.8-.8c.7-.3 1.6-.1 2.1.6l1.5 2c.5.7.4 1.7-.2 2.2l-1.4 1.4c-.8.8-2 1.2-3.2.9-3.3-.8-6.5-4-7.3-7.3-.3-1.2.1-2.4.9-3.2l1.5-1.3Z" />
      </svg>
    );
  }

  if (kind === 'star') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="m12 2.8 2.8 5.6 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 2.9 1.1-6.2L3 9.3l6.2-.9L12 2.8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function HomepageExact({locale, nav, hero}: Props) {
  return (
    <div className="bg-white text-[#1b2434]">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>

      <div className="border-b border-[#e5dcc5] bg-[#fbf5e8] text-[13px] text-[#5f6573]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a href="mailto:info@sparklingstays.com" className="flex items-center gap-2 hover:text-[#b38716]">
                <SmallIcon kind="mail" />
                <span>Email: info@sparklingstays.com</span>
              </a>
            </li>
            <li>
              <a href="tel:438-867-8770" className="flex items-center gap-2 hover:text-[#b38716]">
                <SmallIcon kind="phone" />
                <span>Call: 438-867-8770</span>
              </a>
            </li>
          </ul>
          <ul className="flex items-center gap-4 text-[#676d79]">
            <li>
              <a href="https://www.instagram.com/sparklingstays/" aria-label="Instagram" className="hover:text-[#b38716]">
                <SocialIcon kind="instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/SparklingStays" aria-label="Facebook" className="hover:text-[#b38716]">
                <SocialIcon kind="facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.yelp.ca/biz/sparkling-stays-montr%C3%A9al-2" aria-label="Yelp" className="hover:text-[#b38716]">
                <SocialIcon kind="yelp" />
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.ca/sparklingstays" aria-label="Pinterest" className="hover:text-[#b38716]">
                <SocialIcon kind="pinterest" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#ece5d5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-4 py-4 md:px-6">
          <Link href={`/${locale}`} className="shrink-0">
            <Image src="/media/logo.png" alt="Sparkling Stays" width={184} height={58} className="h-11 w-auto sm:h-12" priority />
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#4c5565] lg:flex">
            <a href="#how" className="transition hover:text-[#b38716]">{nav.howItWorks}</a>
            <a href="#services" className="transition hover:text-[#b38716]">{nav.services}</a>
            <a href="#about" className="transition hover:text-[#b38716]">{nav.about}</a>
            <a href="#faq" className="transition hover:text-[#b38716]">{nav.faqs}</a>
            <a href="#contact" className="transition hover:text-[#b38716]">{nav.contact}</a>
            <Link
              href={`/${locale}/book-now`}
              className="rounded-sm bg-[#FEE569] px-4 py-3 text-[12px] font-bold tracking-[0.2em] text-white shadow-[0_10px_24px_rgba(207,162,26,0.28)] transition hover:bg-[#fdd83a]"
            >
              {nav.bookNow}
            </Link>
          </nav>

          <Link
            href={`/${locale}/book-now`}
            className="rounded-sm bg-[#FEE569] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white lg:hidden"
          >
            {nav.bookNow}
          </Link>
        </div>
      </header>

      <main id="content">
        <section className="relative isolate overflow-hidden bg-[#9f9f9f]">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,18,28,0.36),rgba(14,18,28,0.52))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_48%)]" />

          <div className="relative mx-auto flex min-h-[650px] max-w-[1180px] items-center px-4 py-20 md:px-6 md:py-28">
            <div className="max-w-[640px] text-white">
              <Image
                src="/media/google-stars.png"
                alt="GOOGLE 5 STAR FOR MONTREAL CLEANING SERVICE"
                width={228}
                height={42}
                className="mb-7 h-auto w-[210px]"
                priority
              />
              <h1 className="max-w-[14ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-[66px]">
                {hero.title}
              </h1>
              <p className="mt-5 max-w-[34rem] text-lg leading-8 text-white/92 md:text-[21px]">
                {hero.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/book-now`}
                  className="rounded-xl bg-[#FEE569] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_35px_rgba(207,162,26,0.32)] transition hover:bg-[#fdd83a]"
                >
                  {hero.book}
                </Link>
                <a
                  href="tel:438-867-8770"
                  className="rounded-xl border border-white/55 bg-white/10 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white/18"
                >
                  {hero.call}
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/88">
                <div className="flex items-center gap-2">
                  <SmallIcon kind="star" />
                  <span>Google 5-star rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <SmallIcon kind="check" />
                  <span>Residential, commercial, and office cleaning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1180px] px-4 py-18 md:px-6 md:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-[-0.03em] text-[#1c2333] sm:text-4xl md:text-[48px]">
            Our Cleaning Services in Montreal
          </h2>
          <div className="mt-12 grid gap-x-7 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-[3px] border border-[#ede6d8] bg-white shadow-[0_18px_45px_rgba(19,29,43,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(19,29,43,0.12)]"
              >
                <Link href={`/${locale}${card.href}`} className="block">
                  <div className="relative aspect-[4/3] bg-[#e8ebef]">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-[29px] font-semibold tracking-[-0.03em] text-[#1c2333]">
                    <Link href={`/${locale}${card.href}`} className="hover:text-[#b38716]">
                      {card.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#61697a]">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="bg-[#fbf5e8] py-18 md:py-24">
          <div className="mx-auto max-w-[1180px] px-4 md:px-6">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#1c2333] sm:text-4xl md:text-[48px]">How it works?</h2>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-3">
              {howItWorks.map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-[3px] border border-[#eadfca] bg-white px-7 pb-8 pt-7 shadow-[0_18px_40px_rgba(25,33,48,0.06)]"
                >
                  <div className="absolute right-4 top-3 text-[68px] font-semibold leading-none text-[#f3e6c2]">{item.step}</div>
                  <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf5e8] text-[#c59a18]">
                    <SmallIcon kind="check" />
                  </div>
                  <h3 className="relative z-10 mt-5 text-[30px] font-semibold tracking-[-0.03em] text-[#1c2333]">{item.title}</h3>
                  <p className="relative z-10 mt-3 text-[15px] leading-7 text-[#646d7c]">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/book-now`}
                className="inline-flex rounded-xl bg-[#FEE569] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_35px_rgba(207,162,26,0.24)] transition hover:bg-[#fdd83a]"
              >
                BOOK NOW!
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1180px] px-4 py-18 md:px-6 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)]">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#1c2333] sm:text-4xl md:text-[48px]">
                #1 Professional Cleaners in Montreal
              </h2>
              <div className="mt-8 space-y-6 text-[17px] leading-8 text-[#5f6776]">
                <p>
                  At Sparkling Stays, we blend exceptional cleaning services with attentive customer care to deliver a smooth,
                  hassle-free experience from booking to finish.
                </p>
                <p>
                  Whether you need routine maintenance, a detailed deep clean, move in or move out support, or dependable
                  commercial cleaning, we tailor the work to your space and schedule.
                </p>
                <p>
                  Book online in minutes and see why Sparkling Stays has been a trusted Montreal cleaning company for over a decade.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[3px] border border-[#ebe3d5] bg-[#fbf5e8] p-8 shadow-[0_18px_40px_rgba(25,33,48,0.06)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#cfa21a] shadow-sm">
                    <SmallIcon kind="star" />
                  </div>
                  <div>
                    <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-[#1c2333]">GOOGLE REVIEWS</h3>
                    <p className="mt-1 text-[15px] text-[#606879]">Find out what our clients say about us</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {['Trusted by Montreal families', 'Flexible booking and reliable service'].map((item) => (
                  <div key={item} className="rounded-[3px] border border-[#ece4d5] bg-white p-5 shadow-[0_14px_30px_rgba(19,29,43,0.05)]">
                    <div className="flex items-start gap-3 text-[#1c2333]">
                      <div className="mt-1 text-[#cfa21a]">
                        <SmallIcon kind="check" />
                      </div>
                      <p className="text-[15px] leading-7 text-[#5f6776]">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#fbf5e8] py-18 md:py-24">
          <div className="mx-auto max-w-[980px] px-4 md:px-6">
            <h2 className="text-center text-3xl font-semibold tracking-[-0.03em] text-[#1c2333] sm:text-4xl md:text-[48px]">
              Frequently Asked Questions
            </h2>
            <div className="mt-12 space-y-4">
              {faqs.map((item, index) => (
                <details
                  key={item}
                  className="group rounded-[3px] border border-[#e7dcc8] bg-white px-6 py-5 shadow-[0_12px_28px_rgba(25,33,48,0.05)]"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[17px] font-medium leading-7 text-[#1d2434] marker:content-none">
                    <span>{item}</span>
                    <span className="text-2xl text-[#b38a18] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pt-4 text-[15px] leading-7 text-[#646d7c]">
                    We keep the process simple: tell us what kind of cleaning you need, share any notes for the team, and we’ll
                    match the visit to your home, office, or rental property with the right level of detail.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#eee3cf] bg-white py-18 md:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div>
              <p className="text-[34px] font-semibold leading-tight tracking-[-0.03em] text-[#1c2333]">Get your time back!</p>
              <p className="mt-3 max-w-[28rem] text-[18px] leading-8 text-[#636b7a]">
                Enjoy the peace of mind that comes with high-quality cleaners and a fast booking process.
              </p>
            </div>

            <div className="rounded-[3px] border border-[#eee3d1] bg-[#fbf5e8] p-6 shadow-[0_20px_45px_rgba(25,33,48,0.06)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-[#1c2333]">
                  <span className="mb-2 block">Name</span>
                  <input className="w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#cfa21a]" placeholder="Name" />
                </label>
                <label className="block text-sm font-medium text-[#1c2333]">
                  <span className="mb-2 block">Phone</span>
                  <input className="w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#cfa21a]" placeholder="Phone" />
                </label>
                <label className="block text-sm font-medium text-[#1c2333] sm:col-span-2">
                  <span className="mb-2 block">Email</span>
                  <input className="w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#cfa21a]" placeholder="Email" />
                </label>
                <label className="block text-sm font-medium text-[#1c2333] sm:col-span-2">
                  <span className="mb-2 block">Services</span>
                  <select className="w-full rounded-[3px] border border-[#ddd2be] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#cfa21a]">
                    <option>Select a service</option>
                    {footerServices.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-5">
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex rounded-xl bg-[#FEE569] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#fdd83a]"
                >
                  VIEW PRICING
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[#1d2432] text-white">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.1fr_0.85fr_0.85fr_1fr]">
          <div>
            <Image src="/media/logo.png" alt="Stylized house logo with text - Sparkling Stays" width={180} height={58} className="h-11 w-auto brightness-[1.2] saturate-0 invert" />
            <div className="mt-6 h-[150px] rounded-[3px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
              Service area map placeholder
              <br />
              Montreal, Laval, West Island,
              <br />
              South Shore and nearby zones.
            </div>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold tracking-[-0.03em]">Services</h3>
            <ul className="mt-5 space-y-3 text-[15px] text-white/72">
              {footerServices.map((item) => (
                <li key={item}>
                  <Link href={`/${locale}/services`} className="transition hover:text-[#f2cb58]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold tracking-[-0.03em]">Service Areas</h3>
            <ul className="mt-5 space-y-3 text-[15px] text-white/72">
              {footerAreas.map((item) => (
                <li key={item}>
                  <Link href={`/${locale}/areas`} className="transition hover:text-[#f2cb58]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[22px] font-semibold tracking-[-0.03em]">Contact Us</h3>
            <ul className="mt-5 space-y-4 text-[15px] text-white/72">
              <li>
                <a href="tel:438-867-8770" className="transition hover:text-[#f2cb58]">Call: 438-867-8770</a>
              </li>
              <li>
                <a href="mailto:info@sparklingstays.com" className="transition hover:text-[#f2cb58]">Email: info@sparklingstays.com</a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4 text-white/75">
              <a href="https://www.instagram.com/sparklingstays/" aria-label="Instagram" className="transition hover:text-[#f2cb58]"><SocialIcon kind="instagram" /></a>
              <a href="https://www.facebook.com/SparklingStays" aria-label="Facebook" className="transition hover:text-[#f2cb58]"><SocialIcon kind="facebook" /></a>
              <a href="https://www.yelp.ca/biz/sparkling-stays-montr%C3%A9al-2" aria-label="Yelp" className="transition hover:text-[#f2cb58]"><SocialIcon kind="yelp" /></a>
              <a href="https://www.pinterest.ca/sparklingstays" aria-label="Pinterest" className="transition hover:text-[#f2cb58]"><SocialIcon kind="pinterest" /></a>
            </div>

            <div className="mt-7 space-y-3 text-[15px] text-white/72">
              <p>Privacy Policy</p>
              <p>Terms &amp; Conditions</p>
              <p>Book Now</p>
            </div>

            <div className="mt-7 text-[15px] leading-7 text-white/72">
              <p>5850 Upper Lachine Rd</p>
              <p>Montreal, QC H4A 2B9</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/65 md:px-6">
          Copyright © 2025. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
