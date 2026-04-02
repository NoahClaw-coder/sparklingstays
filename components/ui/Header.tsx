import {getTranslations} from 'next-intl/server';
import {Link} from '@/lib/i18n';
import {siteConfig} from '@/lib/seo';

export async function Header({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'nav'});

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="text-lg font-bold text-[var(--navy)]">
          Sparkling Stays
        </Link>
        <nav className="hidden gap-5 text-sm text-slate-700 md:flex">
          <Link href="/services/home-cleaning">{t('services')}</Link>
          <Link href="/areas/west-island">{t('areas')}</Link>
          <Link href="/pricing">{t('pricing')}</Link>
          <Link href="/about">{t('about')}</Link>
          <Link href="/faq">{t('faq')}</Link>
          <Link href="/contact">{t('contact')}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a className="hidden text-sm font-medium text-[var(--navy)] md:block" href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          <Link href="/book-now" className="rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-semibold text-white">
            {t('bookNow')}
          </Link>
        </div>
      </div>
    </header>
  );
}
