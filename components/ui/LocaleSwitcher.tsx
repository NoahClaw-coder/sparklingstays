import {Link} from '@/lib/i18n';

export function LocaleSwitcher({locale}: {locale: string}) {
  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <Link
      href="/"
      locale={otherLocale}
      className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700"
    >
      {otherLocale}
    </Link>
  );
}
