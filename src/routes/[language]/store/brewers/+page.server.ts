import {
  SELECTED_ENVIRONMENT_COOKIE_NAME,
  LANGUAGE_COOKIE_NAME
} from '$lib/const';
import { englishCode } from '$lib/utils/language-codes';
import { createDeliveryClient } from '$lib/client';
import { contentTypes, type Brewer } from '$lib/models';
import { brewerMapper } from '$lib/mapping/mapper';
import { formatPrice } from '$lib/utils/format';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, url }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode;

  const deliveryClient = createDeliveryClient(environmentId);

  const manufacturerTerms =
    url.searchParams.get('manufacturer')?.split(',') ?? [];
  const productStatusTerms =
    url.searchParams.get('productStatus')?.split(',') ?? [];
  const priceRange = url.searchParams.get('priceRange')?.split(',') ?? [];

  let query = deliveryClient.items<Brewer>().type(contentTypes.brewer.codename);

  if (manufacturerTerms.length) {
    query = query.anyFilter('elements.manufacturer', manufacturerTerms);
  }

  if (productStatusTerms.length) {
    query = query.anyFilter('elements.product_status', productStatusTerms);
  }

  if (priceRange.length) {
    const prices = priceRange
      .flatMap(range => range.split('-'))
      .map(num => Number.parseInt(num, 10));

    query = query.rangeFilter(
      'elements.price',
      Math.min(...prices).toString(),
      Math.max(...prices).toString()
    );
  }

  const brewersResponse = query
    .orderByAscending('elements.product_name')
    .languageParameter(language)
    .toPromise()
    .then(response => brewerMapper(response.data.items))
    .catch(() => undefined);

  if (!(await brewersResponse)) {
    throw error(404, 'Not found');
  }

  const manufacturerTaxonomyResponse = deliveryClient
    .taxonomy(contentTypes.brewer.elements.manufacturer.codename)
    .toPromise()
    .then(response => response.data.taxonomy.terms)
    .then(terms =>
      terms.map(manufacturerTerm => ({
        id: manufacturerTerm.codename,
        checked: manufacturerTerms.includes(manufacturerTerm.codename),
        label: manufacturerTerm.name
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

  const priceRangeOptions = [
    { min: 0, max: 50 },
    { min: 50, max: 250 },
    { min: 250, max: 5000 }
  ];

  const priceRanges = priceRangeOptions.map(range => {
    const rangeId = `${range.min}-${range.max}`;
    return {
      id: rangeId,
      checked: priceRange.includes(rangeId),
      label: `${formatPrice(range.min, language)} - ${formatPrice(
        range.max,
        language
      )}`
    };
  });

  return {
    brewers: await brewersResponse,
    manufacturers: await manufacturerTaxonomyResponse,
    productStatuses: await productStatusTaxonomyResponse,
    priceRanges
  };
};
