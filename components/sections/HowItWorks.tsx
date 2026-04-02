const steps = {
  en: ['Choose your service', 'Confirm area and frequency', 'Finalize quote and booking'],
  fr: ['Choisissez le service', 'Confirmez le secteur et la fréquence', 'Finalisez la soumission et la réservation']
};

export function HowItWorks({locale}: {locale: string}) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-slate-950">
          {locale === 'fr' ? 'Comment la nouvelle architecture est pensée' : 'How the new architecture is organized'}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps[locale as 'en' | 'fr'].map((step, index) => (
            <div key={step} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">0{index + 1}</div>
              <p className="mt-4 text-lg font-semibold text-slate-950">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
