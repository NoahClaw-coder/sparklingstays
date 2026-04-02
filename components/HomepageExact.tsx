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

const serviceCards = [
  {title: 'Home Cleaning', image: '/media/home-cleaning.png'},
  {title: 'Deep Cleaning', image: '/media/deep-cleaning.png'},
  {title: 'Move In Out Cleaning', image: '/media/move-cleaning.webp'},
  {title: 'Commercial Cleaning', image: '/media/commercial-cleaning.png'},
  {title: 'Office Cleaning', image: '/media/office-cleaning.png'},
  {title: 'Post Renovation Cleaning', image: '/media/reno.png'}
];

export function HomepageExact({locale, nav, hero}: Props) {
  return (
    <div className="bg-white text-slate-900">
      <div className="border-b border-slate-200 bg-[#f8f3e6]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm text-slate-700">
          <div className="flex items-center gap-6">
            <a href="mailto:info@sparklingstays.com">Email: info@sparklingstays.com</a>
            <a href="tel:438-867-8770">Call: 438-867-8770</a>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>◐</span>
            <span>f</span>
            <span>★</span>
            <span>p</span>
          </div>
        </div>
      </div>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href={`/${locale}`}>
            <Image src="/media/logo.png" alt="Sparkling Stays" width={180} height={56} className="h-12 w-auto" priority />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#how" className="font-semibold text-slate-700">{nav.howItWorks}</a>
            <a href="#services" className="font-semibold text-slate-700">{nav.services}</a>
            <a href="#about" className="font-semibold text-slate-700">{nav.about}</a>
            <a href="#faq" className="font-semibold text-slate-700">{nav.faqs}</a>
            <a href="#contact" className="font-semibold text-slate-700">{nav.contact}</a>
            <Link href={`/${locale}/book-now`} className="rounded-full bg-[#d4a017] px-5 py-3 text-sm font-bold text-[#1a1a2e]">{nav.bookNow}</Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center text-white">
          <Image src="/media/google-stars.png" alt="Google stars" width={220} height={40} className="mb-8 h-auto w-[200px]" />
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">{hero.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-100">{hero.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/book-now`} className="rounded-full bg-[#d4a017] px-7 py-4 text-sm font-bold tracking-wide text-[#1a1a2e]">{hero.book}</Link>
            <a href="tel:438-867-8770" className="rounded-full border border-white/60 bg-white/10 px-7 py-4 text-sm font-bold tracking-wide text-white">{hero.call}</a>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-4xl font-bold text-slate-900">Our Cleaning Services in Montreal</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
              <div className="relative h-56">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900">{card.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="bg-[#f8f3e6] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900">How it works?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {['Select a Service', 'Schedule a Date', 'Enjoy Cleanliness'].map((item, i) => (
              <div key={item} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4a017]">0{i+1}</div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
      </section>

      <footer id="contact" className="border-t border-slate-200 bg-[#fffaf0]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center text-slate-700">
          <p>Sparkling Stays — Montreal Cleaning Service</p>
          <p className="mt-2">info@sparklingstays.com · 438-867-8770</p>
        </div>
      </footer>
    </div>
  );
}
