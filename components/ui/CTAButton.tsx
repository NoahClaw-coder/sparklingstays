import {Link} from '@/lib/i18n';

export function CTAButton({
  href,
  locale,
  children,
  variant = 'primary'
}: {
  href: string;
  locale: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const classes =
    variant === 'primary'
      ? 'bg-[#1a1a2e] text-white hover:bg-[#23233c]'
      : 'bg-white text-[#1a1a2e] ring-1 ring-slate-300 hover:bg-slate-50';

  return (
    <Link
      href={href}
      locale={locale}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
