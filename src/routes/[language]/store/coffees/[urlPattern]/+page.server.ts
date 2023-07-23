import { LANGUAGE_COOKIE_NAME, SELECTED_ENVIRONMENT_COOKIE_NAME } from "$lib/const";
import { englishCode } from "$lib/utils/language-codes";
import { createDeliveryClient } from "$lib/client";
import { contentTypes, type Coffee as CoffeeType } from "$lib/models";
import { coffeeDetailMapper } from "$lib/mapping/mapper";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? '';
  const language = cookies.get(LANGUAGE_COOKIE_NAME) ?? englishCode;

  const deliveryClient = createDeliveryClient(environmentId);
  const response = deliveryClient
    .items<CoffeeType>()
    .type(contentTypes.coffee.codename)
    .equalsFilter('elements.url_pattern', params.urlPattern)
    .languageParameter(language)
    .limitParameter(1)
    .toPromise()
    .then(response => coffeeDetailMapper(response.data.items[0]))
    .catch(() => undefined);

  if (!(await response)) {
    throw error(404, 'Not found');
  }

  return ({
    coffeeDetail: await response,
  });
};
