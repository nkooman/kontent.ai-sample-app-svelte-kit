import type { Article } from '$lib/mapping/models/article';
import type { HeroUnit } from '$lib/mapping/models/hero-unit';
import type { FactAboutUs } from '$lib/mapping/models/fact-about-us';
import type { Cafe } from '$lib/mapping/models/cafe';
import type { Metadata } from '$lib/mapping/models/metadata';

export type Home = {
  id: string;
  heroUnit: HeroUnit;
  articles: Article[];
  factAboutUs: FactAboutUs;
  cafes: Cafe[];
  metadata: Metadata;
};
