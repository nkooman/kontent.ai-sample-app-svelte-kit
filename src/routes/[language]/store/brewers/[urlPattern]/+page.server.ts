import { LANGUAGE_COOKIE_NAME, SELECTED_ENVIRONMENT_COOKIE_NAME } from "$lib/const";
import { englishCode } from "$lib/utils/language-codes";
import { createDeliveryClient } from "$lib/client";
import { contentTypes, type Brewer as BrewerType } from "$lib/models";
import { brewerDetailMapper } from "$lib/mapping/mapper";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode;

  const deliveryClient = createDeliveryClient(environmentId);
  const response = deliveryClient
    .items<BrewerType>()
    .type(contentTypes.brewer.codename)
    .equalsFilter('elements.url_pattern', params.urlPattern)
    .languageParameter(language)
    .limitParameter(1)
    .toPromise()
    .then(response => brewerDetailMapper(response.data.items[0]))
    .catch(() => undefined);

  return ({
    brewerDetail: await response,
  });
};
