import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Sparkling Stays',
  description: 'The page you are looking for could not be found. Browse our cleaning services in Montreal, Laval, and the South Shore.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f9fafb' }}>
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: '#2563eb', marginBottom: 8 }}>404</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: '#111827' }}>
            Page Not Found
          </h1>
          <p style={{ color: '#6b7280', marginBottom: 8 }}>
            The page you&apos;re looking for has moved or no longer exists.
          </p>
          <p style={{ color: '#6b7280', marginBottom: 40 }}>
            La page que vous cherchez a été déplacée ou n&apos;existe plus.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
            <Link href="/en" style={linkStyle('#2563eb', '#fff')}>
              Home / Accueil (EN)
            </Link>
            <Link href="/fr" style={linkStyle('#16a34a', '#fff')}>
              Accueil (FR)
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
            <NavCard title="Services (EN)" links={[
              { href: '/en/services', label: 'All Services' },
              { href: '/en/services/home-cleaning', label: 'Home Cleaning' },
              { href: '/en/services/deep-cleaning', label: 'Deep Cleaning' },
              { href: '/en/services/move-in-out-cleaning', label: 'Move In/Out' },
              { href: '/en/services/airbnb-cleaning', label: 'Airbnb Cleaning' },
            ]} />
            <NavCard title="Services (FR)" links={[
              { href: '/fr/services', label: 'Tous les services' },
              { href: '/fr/services/home-cleaning', label: 'Nettoyage résidentiel' },
              { href: '/fr/services/deep-cleaning', label: 'Nettoyage en profondeur' },
              { href: '/fr/services/move-in-out-cleaning', label: 'Déménagement' },
              { href: '/fr/services/airbnb-cleaning', label: 'Airbnb' },
            ]} />
            <NavCard title="Areas (EN)" links={[
              { href: '/en/areas', label: 'All Areas' },
              { href: '/en/areas/downtown-montreal', label: 'Downtown Montreal' },
              { href: '/en/areas/laval', label: 'Laval' },
              { href: '/en/areas/west-island', label: 'West Island' },
              { href: '/en/areas/south-shore', label: 'South Shore' },
            ]} />
            <NavCard title="Info" links={[
              { href: '/en/pricing', label: 'Pricing' },
              { href: '/fr/pricing', label: 'Tarifs' },
              { href: '/en/book-now', label: 'Book Now' },
              { href: '/en/contact', label: 'Contact' },
              { href: '/en/blog', label: 'Blog' },
            ]} />
          </div>
        </main>
      </body>
    </html>
  );
}

function linkStyle(bg: string, color: string) {
  return {
    display: 'block',
    background: bg,
    color,
    padding: '14px 24px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 16,
  } as React.CSSProperties;
}

function NavCard({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
      <div style={{ fontWeight: 700, marginBottom: 8, color: '#374151', fontSize: 14 }}>{title}</div>
      {links.map(l => (
        <Link key={l.href} href={l.href} style={{ display: 'block', color: '#2563eb', textDecoration: 'none', fontSize: 14, padding: '2px 0' }}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
