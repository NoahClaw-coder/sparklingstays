import Image from 'next/image';
import Link from 'next/link';

function SmallIcon({kind}: {kind: 'mail' | 'phone'}) {
  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7.5 4.5c.6-.6 1.5-.7 2.2-.2l2 1.5c.7.5.9 1.4.6 2.1l-.8 1.8c1 1.8 2.5 3.3 4.3 4.3l1.8-.8c.7-.3 1.6-.1 2.1.6l1.5 2c.5.7.4 1.7-.2 2.2l-1.4 1.4c-.8.8-2 1.2-3.2.9-3.3-.8-6.5-4-7.3-7.3-.3-1.2.1-2.4.9-3.2l1.5-1.3Z" />
    </svg>
  );
}

function SocialIcon({kind}: {kind: 'instagram' | 'facebook' | 'yelp' | 'pinterest'}) {
  const cls = 'h-4 w-4';
  if (kind === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.4-.1-1.4-.2-2.4-.2-2.4 0-4 1.4-4 4.2V11H7v3h2.2v7h4.3Z" /></svg>;
  if (kind === 'yelp') return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M11.7 2.2c.7.1 1.3.6 1.5 1.3l1 5.5c.2 1-.7 1.8-1.7 1.6L8 9.7c-.8-.1-1.4-.8-1.5-1.6-.1-.8.3-1.6 1-2l2.8-1.6c.4-.2.9-.4 1.4-.3Zm6 4.7c.7.3 1.1 1 1.1 1.8 0 .6-.3 1.1-.8 1.5l-3.7 2.8c-.8.6-1.9.1-2-1l-.4-4.4c-.1-.8.3-1.5 1-1.9.5-.3 1.2-.3 1.8 0l3 1.2Zm1 7.3c.8.1 1.5.7 1.6 1.5.1.8-.3 1.6-1.1 2l-4.6 2c-1 .4-2-.5-1.7-1.6l1.1-4.2c.2-.8.9-1.3 1.7-1.3h3Zm-7.2 1.2c.9.3 1.3 1.3.8 2.2l-2.2 4.1c-.4.7-1.2 1-2 .8-.8-.3-1.3-1.1-1.2-1.9l.5-5c.1-1 1.1-1.7 2.1-1.4l2 .7Zm-4.4-3.8c.6.7.5 1.8-.3 2.3l-3.7 2.4c-.7.5-1.7.4-2.3-.2-.5-.6-.6-1.4-.2-2.1l2.2-4.1c.5-.9 1.7-1.1 2.4-.3l1.9 2Z" /></svg>;
  if (kind === 'pinterest') return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M12 3C7 3 4 6.5 4 10.4c0 2.4 1.3 4.6 3.3 5.4.3.1.5.1.6-.2l.6-2.2c.1-.2 0-.4-.1-.6-.4-.5-.8-1.4-.8-2.5 0-3.2 2.4-6 6.5-6 3.5 0 5.5 2.1 5.5 4.9 0 3.7-1.7 6.9-4.1 6.9-1.4 0-2.4-1.1-2-2.5.4-1.7 1.2-3.5 1.2-4.7 0-1.1-.6-2-1.8-2-1.4 0-2.5 1.5-2.5 3.4 0 1.2.4 2 .4 2l-1.6 6.7c-.5 2 .1 4.3.1 4.5.1.1.2.1.3 0 .1-.2 1.6-2 2.1-3.8l.8-3c.4.7 1.5 1.2 2.7 1.2 3.5 0 5.9-3.2 5.9-7.4C20 6.1 16.8 3 12 3Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={cls} fill="currentColor"><path d="M7.8 2h8.4C19 2 22 5 22 7.8v8.4c0 2.9-3 5.8-5.8 5.8H7.8C5 22 2 19 2 16.2V7.8C2 5 5 2 7.8 2Zm-.2 2.3c-1.8 0-3.3 1.5-3.3 3.3v8.8c0 1.8 1.5 3.3 3.3 3.3h8.8c1.8 0 3.3-1.5 3.3-3.3V7.6c0-1.8-1.5-3.3-3.3-3.3H7.6Zm9.5 1.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10.1A5 5 0 0 1 12 7Zm0 2.2a2.8 2.8 0 1 0 0 5.7 2.8 2.8 0 0 0 0-5.7Z" /></svg>;
}

export function SiteHeader({locale}: {locale: string}) {
  const isFr = locale === 'fr';
  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2">Skip to content</a>

      {/* Top bar */}
      <div className="border-b border-[#e5dcc5] bg-[#fbf5e8] text-[13px] text-[#5f6573]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li><a href="mailto:info@sparklingstays.com" className="flex items-center gap-2 hover:text-[#b38716]"><SmallIcon kind="mail" /><span>Email: info@sparklingstays.com</span></a></li>
            <li><a href="tel:438-867-8770" className="flex items-center gap-2 hover:text-[#b38716]"><SmallIcon kind="phone" /><span>Call: 438-867-8770</span></a></li>
          </ul>
          <ul className="flex items-center gap-4 text-[#676d79]">
            <li><a href="https://www.instagram.com/sparklingstays/" aria-label="Instagram" className="hover:text-[#b38716]"><SocialIcon kind="instagram" /></a></li>
            <li><a href="https://www.facebook.com/SparklingStays" aria-label="Facebook" className="hover:text-[#b38716]"><SocialIcon kind="facebook" /></a></li>
            <li><a href="https://www.yelp.ca/biz/sparkling-stays-montr%C3%A9al-2" aria-label="Yelp" className="hover:text-[#b38716]"><SocialIcon kind="yelp" /></a></li>
            <li><a href="https://www.pinterest.ca/sparklingstays" aria-label="Pinterest" className="hover:text-[#b38716]"><SocialIcon kind="pinterest" /></a></li>
          </ul>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-30 border-b border-[#ece5d5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-4 py-4 md:px-6">
          <Link href={`/${locale}`} className="shrink-0">
            <Image src="/media/logo.png" alt="Sparkling Stays" width={184} height={58} className="h-11 w-auto sm:h-12" priority />
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#4c5565] lg:flex">
            <Link href={`/${locale}/services`} className="transition hover:text-[#b38716]">Services</Link>
            <Link href={`/${locale}/areas`} className="transition hover:text-[#b38716]">{isFr ? 'Secteurs' : 'Areas'}</Link>
            <Link href={`/${locale}/about`} className="transition hover:text-[#b38716]">{isFr ? 'À propos' : 'About'}</Link>
            <Link href={`/${locale}/pricing`} className="transition hover:text-[#b38716]">{isFr ? 'Tarifs' : 'Pricing'}</Link>
            <Link href={`/${locale}/blog`} className="transition hover:text-[#b38716]">Blog</Link>
            <Link href={`/${locale}/faq`} className="transition hover:text-[#b38716]">FAQ</Link>
            <Link href={`/${locale}/contact`} className="transition hover:text-[#b38716]">Contact</Link>
            <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#FEE569] px-4 py-3 text-[12px] font-bold tracking-[0.2em] text-white shadow-[0_10px_24px_rgba(207,162,26,0.28)] transition hover:bg-[#fdd83a]">
              {isFr ? 'RÉSERVER' : 'BOOK NOW'}
            </Link>
          </nav>

          <Link href={`/${locale}/book-now`} className="rounded-sm bg-[#FEE569] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white lg:hidden">
            {isFr ? 'RÉSERVER' : 'BOOK NOW'}
          </Link>
        </div>
      </header>
    </>
  );
}
