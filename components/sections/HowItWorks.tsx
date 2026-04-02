const steps = {
  en: [
    {
      title: 'Tell us what needs cleaning',
      description: 'Share the type of space, your location, and whether you need a one-time clean or a recurring plan.'
    },
    {
      title: 'Receive a clear quote and schedule',
      description: 'We confirm the service details, timing, and any priorities so expectations are clear before the visit.'
    },
    {
      title: 'Enjoy a cleaner, better-kept space',
      description: 'Our team arrives ready to deliver dependable service with care, consistency, and bilingual support.'
    }
  ],
  fr: [
    {
      title: 'Dites-nous ce qu’il faut nettoyer',
      description: 'Indiquez le type d’espace, votre secteur et si vous voulez un service ponctuel ou récurrent.'
    },
    {
      title: 'Recevez une soumission claire et un horaire',
      description: 'Nous confirmons les détails du service, le moment de passage et les priorités avant la visite.'
    },
    {
      title: 'Profitez d’un espace propre et bien entretenu',
      description: 'Notre équipe se présente prête à offrir un service fiable, soigné et bilingue.'
    }
  ]
};

export function HowItWorks({locale}: {locale: string}) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            {locale === 'fr' ? 'Comment ça fonctionne' : 'How it works'}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">
            {locale === 'fr'
              ? 'Une réservation simple, un service fiable'
              : 'A simple booking process with dependable follow-through'}
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps[locale as 'en' | 'fr'].map((step, index) => (
            <div key={step.title} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">0{index + 1}</div>
              <p className="mt-4 text-lg font-semibold text-slate-950">{step.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
