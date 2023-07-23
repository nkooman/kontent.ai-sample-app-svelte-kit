import { createDeliveryClient } from "$lib/client";
import { LANGUAGE_COOKIE_NAME, SELECTED_ENVIRONMENT_COOKIE_NAME } from "$lib/const";
import { contentTypes, type AboutUs as AboutUsType } from '$lib/models';
import { aboutUsMapper } from '$lib/mapping/mapper';
import { englishCode } from "$lib/utils/language-codes";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode

  const deliveryClient = createDeliveryClient(environmentId);

  const response = deliveryClient
    .items<AboutUsType>()
    .type(contentTypes.about_us.codename)
    .languageParameter(language)
    .elementsParameter([
      'modular_content',
      contentTypes.about_us.elements.facts.codename,
      contentTypes.fact_about_us.elements.title.codename,
      contentTypes.fact_about_us.elements.description.codename,
      contentTypes.fact_about_us.elements.image.codename,
      contentTypes.article.elements.metadata__meta_title.codename,
      contentTypes.article.elements.metadata__meta_description.codename,
      contentTypes.article.elements.metadata__og_title.codename,
      contentTypes.article.elements.metadata__og_description.codename,
      contentTypes.article.elements.metadata__og_image.codename,
      contentTypes.article.elements.metadata__twitter_title.codename,
      contentTypes.article.elements.metadata__twitter_site.codename,
      contentTypes.article.elements.metadata__twitter_creator.codename,
      contentTypes.article.elements.metadata__twitter_description.codename,
      contentTypes.article.elements.metadata__twitter_image.codename
    ])
    .limitParameter(1)
    .toPromise()
    .then(response => aboutUsMapper(response.data.items[0]))
    .catch(() => undefined);

  return {
    aboutUs: await response
  };
};
