import {CTAButton} from '@/components/ui/CTAButton';
import {TrustBadges} from '@/components/ui/TrustBadges';

export function Hero({
  locale,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta
}: {
  locale: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}) {
  return (
    <section className="bg-[#1a1a2e] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:flex lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f4d58d]">{eyebrow}</p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-200">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/book-now" locale={locale}>{primaryCta}</CTAButton>
            <CTAButton href="/services" locale={locale} variant="secondary">{secondaryCta}</CTAButton>
          </div>
          <div className="mt-8">
            <TrustBadges locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
