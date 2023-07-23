import type { Schema, StrictSchema } from 'morphism';
import morphismPkg from 'morphism';
import type { Cafe } from '$lib/mapping/models/cafe';
import type { HeroUnit } from '$lib/mapping/models/hero-unit';
import type { Article } from '$lib/mapping/models/article';
import type { FactAboutUs } from '$lib/mapping/models/fact-about-us';
import type { Home } from '$lib/mapping/models/home';
import type { Metadata } from '$lib/mapping/models/metadata';
import type { AboutUs } from '$lib/mapping/models/about-us';
import type { ArticleDetail } from '$lib/mapping/models/article-detail';
import type { Coffee } from '$lib/mapping/models/coffee';
import type { Brewer } from '$lib/mapping/models/brewer';
import type { BrewerDetail } from '$lib/mapping/models/brewer-detail';
import type {
  Cafe as CafeEntity,
  HeroUnit as HeroUnitEntity,
  Article as ArticleEntity,
  FactAboutUs as FactAboutUsEntity,
  Home as HomeEntity,
  AboutUs as AboutUsEntity,
  Coffee as CoffeeEntity,
  Brewer as BrewerEntity
} from '$lib/models';
import type { CoffeeDetail } from './models/coffee-detail';

// @ts-expect-error Workaround for CommonJS module import
const morphism = morphismPkg?.morphism ?? morphismPkg;

export const metadataSchema: Schema<Metadata, object> = {
  title: 'elements.metadataMetaTitle',
  description: 'elements.metadataMetaDescription',
  ogTitle: 'elements.metadataOgTitle',
  ogImage: 'elements.metadataOgImage',
  ogDescription: 'elements.metadataOgDescription',
  twitterTitle: 'elements.metadataMetaTitle',
  twitterSite: 'elements.metadataTwitterSite',
  twitterCreator: 'elements.metadataTwitterCreator',
  twitterDescription: 'elements.metadataTwitterDescription',
  twitterImage: 'elements.metadataTwitterImage'
};

export const cafeSchema: StrictSchema<Cafe, CafeEntity> = {
  id: cafe => cafe.system.id,
  name: cafe => cafe.system.name,
  email: cafe => cafe.elements.email.value,
  phone: cafe => cafe.elements.phone.value,
  imageUrl: cafe => cafe.elements.photo.value[0].url,
  street: cafe => cafe.elements.street.value,
  city: cafe => cafe.elements.city.value,
  zipCode: cafe => cafe.elements.zipCode.value,
  state: cafe => cafe.elements.state.value,
  country: cafe => cafe.elements.country.value,
  dataAddress: cafe =>
    `${cafe.elements.city.value}, ${cafe.elements.street.value}`,
  countryWithState: cafe =>
    `${cafe.elements.country.value}${
      cafe.elements.state.value ? ', ' + cafe.elements.state.value : ''
    }`,
  location: cafe =>
    `${cafe.elements.city.value}, ${cafe.elements.country.value}${
      cafe.elements.state.value ? ', ' + cafe.elements.state.value : ''
    }`
};

export const heroUnitSchema: StrictSchema<HeroUnit, HeroUnitEntity> = {
  id: heroUnit => heroUnit.system.id,
  title: heroUnit => heroUnit.elements.title.value,
  marketingMessage: heroUnit => heroUnit.elements.marketingMessage,
  backgroundImage: heroUnit => heroUnit.elements.image?.value?.[0]?.url
};

export const articleSchema: StrictSchema<Article, ArticleEntity> = {
  id: article => article.system.id,
  title: article => article.elements.title?.value?.trim() ?? '',
  imageLink: article => article.elements.teaserImage?.value[0]?.url,
  summary: article => article.elements.summary?.value?.trim() ?? '',
  postDate: article => article.elements.postDate.value ?? ''
};

export const factAboutUsSchema: StrictSchema<FactAboutUs, FactAboutUsEntity> = {
  id: factAboutUs => factAboutUs.system.id,
  title: factAboutUs => factAboutUs.elements.title.value,
  description: factAboutUs => factAboutUs.elements.description,
  imageUrl: factAboutUs => factAboutUs.elements.image?.value?.[0]?.url
};

export const homeSchema: StrictSchema<Home, HomeEntity> = {
  id: home => home.system.id,
  heroUnit: home =>
    morphism(heroUnitSchema, home.elements.heroUnit.linkedItems[0]),
  articles: home => morphism(articleSchema, home.elements.articles.linkedItems),
  factAboutUs: home =>
    morphism(factAboutUsSchema, home.elements.ourStory.linkedItems[0]),
  cafes: home => morphism(cafeSchema, home.elements.cafes.linkedItems),
  metadata: morphism(metadataSchema)
};

export const articleDetailSchema: StrictSchema<ArticleDetail, ArticleEntity> = {
  id: article => article.system.id,
  article: article => ({
    ...morphism(articleSchema, article),
    bodyCopy: article.elements.bodyCopy
  }),
  metadata: morphism(metadataSchema)
};

export const aboutUsSchema: StrictSchema<AboutUs, AboutUsEntity> = {
  id: aboutUs => aboutUs.system.id,
  facts: aboutUs =>
    morphism(factAboutUsSchema, aboutUs.elements.facts.linkedItems),
  metadata: morphism(metadataSchema)
};

export const coffeeSchema: StrictSchema<Coffee, CoffeeEntity> = {
  id: coffee => coffee.system.id,
  codename: coffee => coffee.system.codename,
  imageLink: coffee => coffee.elements.image.value[0].url,
  name: coffee => coffee.elements.productName.value,
  price: coffee => coffee.elements.price.value,
  productStatus: coffee => coffee.elements.productStatus,
  urlPattern: coffee => coffee.elements.urlPattern.value,
  altitude: coffee => coffee.elements.altitude.value,
  farm: coffee => coffee.elements.farm.value,
  processing: coffee => coffee.elements.processing.value[0].name,
  variety: coffee => coffee.elements.variety.value
};
export const coffeeDetailSchema: StrictSchema<CoffeeDetail, CoffeeEntity> = {
  id: coffee => coffee.system.id,
  coffee: coffee => ({
    ...morphism(coffeeSchema, coffee),
    longDescription: coffee.elements.longDescription
  }),
  metadata: morphism(metadataSchema)
};

export const brewerSchema: StrictSchema<Brewer, BrewerEntity> = {
  id: brewer => brewer.system.id,
  codename: brewer => brewer.system.codename,
  imageLink: brewer => brewer.elements.image.value[0].url,
  name: brewer => brewer.elements.productName.value,
  price: brewer => brewer.elements.price.value,
  productStatus: brewer => brewer.elements.productStatus,
  urlPattern: brewer => brewer.elements.urlPattern.value,
  manufacturer: brewer => brewer.elements.manufacturer.value[0].name
};

export const brewerDetailSchema: StrictSchema<BrewerDetail, BrewerEntity> = {
  id: brewer => brewer.system.id,
  brewer: brewer => ({
    ...morphism(brewerSchema, brewer),
    longDescription: brewer.elements.longDescription
  }),
  metadata: morphism(metadataSchema)
};
