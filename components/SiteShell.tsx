import {SiteHeader} from './SiteHeader';
import {SiteFooter} from './SiteFooter';

export function SiteShell({locale, children}: {locale: string; children: React.ReactNode}) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="content">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
