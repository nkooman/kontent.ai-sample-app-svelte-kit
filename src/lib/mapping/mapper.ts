import morphismPkg from 'morphism';
import {
  aboutUsSchema,
  articleDetailSchema,
  articleSchema,
  brewerDetailSchema,
  brewerSchema,
  cafeSchema,
  coffeeDetailSchema,
  coffeeSchema,
  factAboutUsSchema,
  homeSchema
} from '$lib/mapping/schemas';

// @ts-expect-error Workaround for CommonJS module import
const morphism = morphismPkg?.morphism ?? morphismPkg;

export const homeMapper = morphism(homeSchema);
export const articleMapper = morphism(articleSchema);
export const articleDetailMapper = morphism(articleDetailSchema);
export const cafeMapper = morphism(cafeSchema);
export const factAboutUsMapper = morphism(factAboutUsSchema);
export const aboutUsMapper = morphism(aboutUsSchema);
export const coffeeMapper = morphism(coffeeSchema);
export const coffeeDetailMapper = morphism(coffeeDetailSchema);
export const brewerMapper = morphism(brewerSchema);
export const brewerDetailMapper = morphism(brewerDetailSchema);
