import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {routing} from '@/lib/i18n';
import {getCanonical, siteConfig} from '@/lib/seo';
import {Header} from '@/components/ui/Header';
import {Footer} from '@/components/ui/Footer';
import {LocalBusinessJsonLd} from '@/components/seo/JsonLd';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const isFrench = locale === 'fr';

  return {
    title: isFrench
      ? 'Sparkling Stays | Services d’entretien à Montréal'
      : 'Sparkling Stays | Cleaning Services in Montreal',
    description: isFrench
      ? 'Services d’entretien résidentiel et commercial à Montréal, Laval, dans l’Ouest-de-l’Île et sur la Rive-Sud.'
      : 'Residential and commercial cleaning services across Montreal, Laval, the West Island, and the South Shore.',
    alternates: {
      canonical: getCanonical(locale),
      languages: {
        'en-CA': `${siteConfig.url}/en`,
        'fr-CA': `${siteConfig.url}/fr`
      }
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as 'en' | 'fr')) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'footer'});
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocalBusinessJsonLd locale={locale} />
      <div className="min-h-screen bg-[#f6f4ef] text-slate-900">
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} tagline={t('tagline')} rights={t('rights')} />
      </div>
    </NextIntlClientProvider>
  );
}
