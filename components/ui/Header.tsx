import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/lib/i18n';
import {siteConfig} from '@/lib/seo';
import {LocaleSwitcher} from './LocaleSwitcher';

const socials = [
  {label: 'Instagram', href: 'https://www.instagram.com/sparklingstays/'},
  {label: 'Facebook', href: 'https://www.facebook.com/SparklingStays'},
  {label: 'Yelp', href: 'https://www.yelp.ca/biz/sparkling-stays-montr%C3%A9al-2'},
  {label: 'Pinterest', href: 'https://www.pinterest.ca/sparklingstays'}
];

export async function Header({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'nav'});

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="bg-[#1a1a2e] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-slate-100">
            <a href={`mailto:${siteConfig.email}`} className="transition hover:text-[#f4d58d]">
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone}`} className="transition hover:text-[#f4d58d]">
              {siteConfig.phone}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            {socials.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-[#f4d58d]">
                {item.label}
              </a>
            ))}
            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" locale={locale} className="flex items-center gap-4">
          <Image src="/media/Logo-Transparency.png" alt="Sparkling Stays" width={180} height={56} className="h-11 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-semibold text-slate-800 lg:flex">
          <Link href="/services" locale={locale} className="transition hover:text-[#d4a017]">{t('services')}</Link>
          <Link href="/areas" locale={locale} className="transition hover:text-[#d4a017]">{t('areas')}</Link>
          <Link href="/pricing" locale={locale} className="transition hover:text-[#d4a017]">{t('pricing')}</Link>
          <Link href="/about" locale={locale} className="transition hover:text-[#d4a017]">{t('about')}</Link>
          <Link href="/faq" locale={locale} className="transition hover:text-[#d4a017]">{t('faq')}</Link>
          <Link href="/contact" locale={locale} className="transition hover:text-[#d4a017]">{t('contact')}</Link>
          <Link
            href="/book-now"
            locale={locale}
            className="rounded-full bg-[#d4a017] px-5 py-3 text-sm font-bold text-[#1a1a2e] shadow-sm transition hover:bg-[#f4d58d]"
          >
            {t('bookNow')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
