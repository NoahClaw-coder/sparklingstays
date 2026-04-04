import {HomepageExact} from '@/components/HomepageExact';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import type {Metadata} from 'next';
import {makeMeta} from '@/lib/seo';

type Props = { params: Promise<{locale: 'en' | 'fr'}> };

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return makeMeta({
    title: 'Sparkling Stays | Professional Cleaning Services in Montreal',
    titleFr: 'Sparkling Stays | Services de nettoyage professionnel à Montréal',
    desc: 'Professional residential and commercial cleaning services across Greater Montreal, Laval, West Island, and South Shore. Book online or call 438-867-8770.',
    descFr: 'Services de nettoyage résidentiel et commercial dans le Grand Montréal, Laval, West Island et Rive-Sud. Réservez en ligne ou appelez le 438-867-8770.',
    path: '',
    locale
  });
}

export default async function LocaleHome({params}: Props) {
  const {locale} = await params;
  const messages = locale === 'fr' ? fr : en;
  return <HomepageExact locale={locale} nav={messages.nav} hero={messages.hero} />;
}
