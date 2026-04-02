import {FAQAccordion} from '@/components/ui/FAQAccordion';

export default async function FaqPage({params}: {params: Promise<{locale: 'en' | 'fr'}>}) {
  const {locale} = await params;
  const items = locale === 'fr'
    ? [
        {question: 'Offrez-vous un service bilingue?', answer: 'Oui. Nous servons les clients en français et en anglais.'},
        {question: 'Faites-vous des nettoyages ponctuels et récurrents?', answer: 'Oui. Les deux sont prévus dans la nouvelle architecture du site.'}
      ]
    : [
        {question: 'Do you offer bilingual service?', answer: 'Yes. Sparkling Stays serves clients in both English and French.'},
        {question: 'Do you handle one-time and recurring cleaning?', answer: 'Yes. The new site structure supports both service types.'}
      ];

  return (
    <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold text-[var(--navy)]">FAQ</h1>
      <FAQAccordion items={items} />
    </div>
  );
}
