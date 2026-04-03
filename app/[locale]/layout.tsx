import {JsonLd, localBusinessSchema} from '@/lib/seo';

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return (
    <div lang={locale}>
      <JsonLd data={localBusinessSchema(locale)} />
      {children}
    </div>
  );
}
