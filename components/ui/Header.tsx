import {getTranslations} from 'next-intl/server';
import {Link} from '@/lib/i18n';
import {siteConfig} from '@/lib/seo';
import {LocaleSwitcher} from './LocaleSwitcher';

export async function Header({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'nav'});

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div>
          <Link href="/" locale={locale} className="text-lg font-bold tracking-tight text-[#1a1a2e]">
            Sparkling Stays
          </Link>
          <div className="text-sm text-slate-600">{siteConfig.phone}</div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/services" locale={locale}>{t('services')}</Link>
          <Link href="/areas" locale={locale}>{t('areas')}</Link>
          <Link href="/pricing" locale={locale}>{t('pricing')}</Link>
          <Link href="/about" locale={locale}>{t('about')}</Link>
          <Link href="/faq" locale={locale}>{t('faq')}</Link>
          <Link href="/contact" locale={locale}>{t('contact')}</Link>
          <Link href="/book-now" locale={locale} className="rounded-full bg-[#d4a017] px-4 py-2 text-[#1a1a2e]">
            {t('bookNow')}
          </Link>
          <LocaleSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
