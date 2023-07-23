import { error, redirect } from '@sveltejs/kit';
import { articleDetailMapper } from '$lib/mapping/mapper';
import { createDeliveryClient } from '$lib/client';
import { contentTypes, type Article as ArticleType } from '$lib/models';
import { LANGUAGE_COOKIE_NAME, SELECTED_ENVIRONMENT_COOKIE_NAME } from '$lib/const';
import { englishCode } from '$lib/utils/language-codes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
  if (!params.articleId) {
    return redirect(302, '/articles');
  }

  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode

  const deliveryClient = createDeliveryClient(environmentId);

  const articleDetail = deliveryClient
    .items<ArticleType>()
    .type(contentTypes.article.codename)
    .equalsFilter('system.id', params.articleId)
    .elementsParameter([
      contentTypes.article.elements.title.codename,
      contentTypes.article.elements.teaser_image.codename,
      contentTypes.article.elements.post_date.codename,
      contentTypes.article.elements.body_copy.codename,
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
    .languageParameter(language)
    .orderByDescending('system.name')
    .limitParameter(1)
    .toPromise()
    .then(response => articleDetailMapper(response.data.items)?.[0]);

    if (!(await articleDetail)) {
      throw error(404, 'Not found');
    }

  return {
    articleDetail
  };
};
