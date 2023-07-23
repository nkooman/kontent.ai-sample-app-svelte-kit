import { articleMapper } from '$lib/mapping/mapper';
import { createDeliveryClient } from '$lib/client';
import { contentTypes, type Article as ArticleType } from '$lib/models';
import { LANGUAGE_COOKIE_NAME, SELECTED_ENVIRONMENT_COOKIE_NAME } from '$lib/const';
import { englishCode } from '$lib/utils/language-codes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode

  const deliveryClient = createDeliveryClient(environmentId);

  const articles = deliveryClient
    .items<ArticleType>()
    .type(contentTypes.article.codename)
    .languageParameter(language)
    .orderByDescending('elements.post_date')
    .limitParameter(10)
    .toPromise()
    .then(response => articleMapper(response.data.items));

  return {
    articles
  };
};
