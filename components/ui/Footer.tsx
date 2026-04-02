import {getTranslations} from 'next-intl/server';
import {Link} from '@/lib/i18n';
import {siteConfig} from '@/lib/seo';

export async function Footer({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'footer'});

  return (
    <footer className="mt-20 bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">Sparkling Stays</p>
          <p className="mt-3 max-w-sm text-sm text-slate-300">{t('tagline')}</p>
        </div>
        <div className="space-y-2 text-sm text-slate-200">
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
          <p>Montreal, Laval, West Island, South Shore</p>
        </div>
        <div className="space-y-2 text-sm text-slate-200">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-400">© 2026 Sparkling Stays. {t('rights')}</div>
    </footer>
  );
}
