import {Link} from '@/lib/i18n';

type ServiceCardProps = {
  slug: string;
  title: string;
  description: string;
};

export function ServiceCard({slug, title, description}: ServiceCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">Service</p>
      <h3 className="mt-3 text-xl font-semibold text-[var(--navy)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <Link href={`/services/${slug}`} className="mt-5 inline-flex text-sm font-semibold text-[var(--navy)]">
        Learn more →
      </Link>
    </article>
  );
}
