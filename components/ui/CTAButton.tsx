import {Link} from '@/lib/i18n';

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

export function CTAButton({href, children, variant = 'primary'}: CTAButtonProps) {
  const classes =
    variant === 'primary'
      ? 'bg-[var(--gold)] text-[var(--navy)] hover:opacity-90'
      : 'border border-white/40 bg-white/10 text-white hover:bg-white/20';

  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${classes}`}>
      {children}
    </Link>
  );
}
