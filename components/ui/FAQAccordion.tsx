'use client';

import {useState} from 'react';

type FAQItem = {question: string; answer: string};

export function FAQAccordion({items}: {items: FAQItem[]}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpen(isOpen ? null : index)}>
              <span className="font-semibold text-[var(--navy)]">{item.question}</span>
              <span className="text-xl text-[var(--gold)]">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
