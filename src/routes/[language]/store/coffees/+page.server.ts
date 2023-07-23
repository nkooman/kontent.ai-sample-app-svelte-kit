import {
  SELECTED_ENVIRONMENT_COOKIE_NAME,
  LANGUAGE_COOKIE_NAME
} from '$lib/const';
import { englishCode } from '$lib/utils/language-codes';
import { createDeliveryClient } from '$lib/client';
import { contentTypes, type Coffee } from '$lib/models';
import { coffeeMapper } from '$lib/mapping/mapper';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode;

  const deliveryClient = createDeliveryClient(environmentId);

  const processingTerms = url.searchParams.get('processing')?.split(',') ?? [];
  const productStatusTerms =
    url.searchParams.get('productStatus')?.split(',') ?? [];

  let query = deliveryClient.items<Coffee>().type(contentTypes.coffee.codename);

  if (processingTerms.length) {
    query = query.anyFilter('elements.processing', processingTerms);
  }

  if (productStatusTerms.length) {
    query = query.anyFilter('elements.product_status', productStatusTerms);
  }

  const coffeesResponse = query
    .orderByAscending('elements.product_name')
    .languageParameter(language)
    .toPromise()
    .then(response => coffeeMapper(response.data.items))
    .catch(() => undefined);

  const processingTaxonomyResponse = deliveryClient
    .taxonomy(contentTypes.coffee.elements.processing.codename)
    .toPromise()
    .then(response => response.data.taxonomy.terms)
    .then(terms =>
      terms.map(processingTerm => ({
        id: processingTerm.codename,
        checked: processingTerms.includes(processingTerm.codename),
        label: processingTerm.name
      }))
    )
    .catch(() => undefined);

  const productStatusTaxonomyResponse = deliveryClient
    .taxonomy(contentTypes.coffee.elements.product_status.codename)
    .toPromise()
    .then(response => response.data.taxonomy.terms)
    .then(terms =>
      terms.map(term => ({
        id: term.codename,
        checked: productStatusTerms.includes(term.codename),
        label: term.name
      }))
    )
    .catch(() => undefined);

  return {
    coffees: await coffeesResponse,
    processings: await processingTaxonomyResponse,
    productStatuses: await productStatusTaxonomyResponse
  };
};
