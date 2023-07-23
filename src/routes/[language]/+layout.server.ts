import { LANGUAGE_COOKIE_NAME } from '$lib/const';
import languageCodes, { englishCode } from '$lib/utils/language-codes';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, params }) => {
  const language =
    languageCodes.find(code => code.toLocaleLowerCase() === params.language) ??
    englishCode;

  cookies.set(LANGUAGE_COOKIE_NAME, language, { path: '/' });

  return {
    language
  }
};
