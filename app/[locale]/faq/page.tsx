import {setRequestLocale} from 'next-intl/server';
import {FAQAccordion} from '@/components/ui/FAQAccordion';

const faqContent = {
  en: [
    {
      question: 'When will the full rebuilt pages go live?',
      answer: 'The full service, pricing, and area pages are scheduled for the next content phase after the foundation work is verified.'
    },
    {
      question: 'What is included in Phase 0?',
      answer: 'Phase 0 covers the Next.js app setup, bilingual routing, reusable components, technical SEO files, and redirect mapping.'
    }
  ],
  fr: [
    {
      question: 'Quand les pages complètes du nouveau site seront-elles prêtes?',
      answer: 'Les pages de service, de tarification et de secteurs seront produites à la phase suivante une fois la fondation validée.'
    },
    {
      question: 'Qu’est-ce qui est inclus dans la phase 0?',
      answer: 'La phase 0 couvre la mise en place de Next.js, le routage bilingue, les composants réutilisables, les fichiers SEO techniques et la cartographie des redirections.'
    }
  ]
};

export default async function FaqPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">FAQ</h1>
      <div className="mt-8">
        <FAQAccordion items={faqContent[locale as 'en' | 'fr']} />
      </div>
    </section>
  );
}
