import { error } from '@sveltejs/kit';
import languageCodes, { englishCode } from '$lib/utils/language-codes';
import { createDeliveryClient } from '$lib/client';
import { LANGUAGE_COOKIE_NAME, SELECTED_ENVIRONMENT_COOKIE_NAME } from '$lib/const';
import { contentTypes, type  Home as HomeType } from '$lib/models';
import { homeMapper } from '$lib/mapping/mapper';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode;

  if (!languageCodes.some(code => code === language)) {
    throw error(404, 'Not found');
  }

  const deliveryClient = createDeliveryClient(environmentId);

  const response = deliveryClient
    .items<HomeType>()
    .type(contentTypes.home.codename)
    .languageParameter(language)
    .limitParameter(1)
    .toPromise()
    .then(response => homeMapper(response.data.items[0]))
    .catch(() => undefined);

  return ({
    home: await response,
  });
};
