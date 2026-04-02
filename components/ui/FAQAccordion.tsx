export function FAQAccordion({items}: {items: {question: string; answer: string}[]}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
            {item.question}
          </summary>
          <p className="mt-4 text-slate-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
