import type { LayoutServerLoad } from './$types';
import { englishCode, languageCodesLowerCase } from '$lib/utils/language-codes';
import {
  SELECTED_ENVIRONMENT_COOKIE_NAME,
  PROJECT_CONFIGURATION_PATH
} from '$lib/const';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const environmentId = cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME) ?? null;

  if (!environmentId && url.pathname !== PROJECT_CONFIGURATION_PATH) {
    throw redirect(302, PROJECT_CONFIGURATION_PATH);
  }

  const languageCookie = cookies.get('lang') ?? '';
  const language = languageCodesLowerCase.includes(languageCookie)
    ? languageCookie
    : englishCode;

  if (
    (url.pathname === '/' ||
    !languageCodesLowerCase.some(code => url.pathname.startsWith(`/${code}`))
    && url.pathname !== PROJECT_CONFIGURATION_PATH)
  ) {
    throw redirect(302, `/${language.toLowerCase()}${url.pathname}`);
  }

  const infoMessage = url.searchParams.get('infoMessage');

  return {
    language,
    environmentId,
    infoMessage
  };
};
