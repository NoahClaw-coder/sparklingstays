import {HomepageExact} from '@/components/HomepageExact';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

type Props = { params: Promise<{locale: 'en' | 'fr'}> };

export default async function LocaleHome({params}: Props) {
  const {locale} = await params;
  const messages = locale === 'fr' ? fr : en;
  return <HomepageExact locale={locale} nav={messages.nav} hero={messages.hero} />;
}
