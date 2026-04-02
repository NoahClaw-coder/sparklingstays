import {siteConfig} from '@/lib/seo';

export function Footer({locale, tagline, rights}: {locale: string; tagline: string; rights: string}) {
  return (
    <footer className="border-t border-slate-200 bg-[#1a1a2e] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">Sparkling Stays</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            {locale === 'fr' ? 'Coordonnées' : 'Contact'}
          </h3>
          <p className="mt-3 text-sm text-slate-200">{siteConfig.phone}</p>
          <p className="mt-1 text-sm text-slate-200">{siteConfig.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            {locale === 'fr' ? 'Zone de service' : 'Service area'}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            {locale === 'fr'
              ? 'Montréal, Laval, Ouest-de-l’Île et Rive-Sud.'
              : 'Montreal, Laval, West Island, and the South Shore.'}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Sparkling Stays. {rights}
      </div>
    </footer>
  );
}
