import neighborhoods from '@/content/data/neighborhoods.json';
import services from '@/content/data/services.json';

export type Locale = 'en' | 'fr';

type Localized = {en: string; fr: string};

type Service = {
  slug: string;
  name: Localized;
  description: Localized;
};

export function getServices() {
  return services as Service[];
}

export function getNeighborhoods() {
  return neighborhoods as Array<{slug: string; name: string; hub: string; impressions: number}>;
}
