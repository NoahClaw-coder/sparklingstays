const badges = ['Insured team', 'Flexible scheduling', 'Bilingual service'];

export function TrustBadges({locale}: {locale: string}) {
  const labels =
    locale === 'fr'
      ? ['Équipe assurée', 'Horaire flexible', 'Service bilingue']
      : badges;

  return (
    <div className="flex flex-wrap gap-3">
      {labels.map((badge) => (
        <span key={badge} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20">
          {badge}
        </span>
      ))}
    </div>
  );
}
