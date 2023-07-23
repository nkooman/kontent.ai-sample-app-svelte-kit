import { get } from 'svelte/store';
import { locale } from 'svelte-intl-precompile';
import { createDeliveryClient } from '$lib/client';
import { SELECTED_ENVIRONMENT_COOKIE_NAME } from '$lib/const';
import { contentTypes, type Cafe as CafeType } from '$lib/models';
import { cafeMapper } from '$lib/mapping/mapper';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
  const deliveryClient = createDeliveryClient(
    cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? ''
  );

  const response = deliveryClient
    .items<CafeType>()
    .type(contentTypes.cafe.codename)
    .languageParameter(get(locale))
    .orderByDescending('system.name')
    .toPromise()
    .then(response => cafeMapper(response.data.items))
    .catch(() => undefined);

  return {
    cafes: await response,
    infoMessage: url.searchParams.get('infoMessage')
  };
};
