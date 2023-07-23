import { englishCode, spanishCode } from '$lib/utils/language-codes';

interface linkType {
  linkId?: string;
  type: string;
  urlSlug: string;
}

export const getAboutUsLink = (language: string): string => {
  return !language || language.toLowerCase() === englishCode.toLowerCase()
    ? `about-us`
    : language && language.toLowerCase() === spanishCode.toLowerCase()
    ? `acerca-de`
    : '';
};

export const resolveContentLink = (
  link: linkType,
  language: string = englishCode
): string => {
  let resultLink;
  switch (link.type) {
    case 'about_us':
      resultLink = `${link.urlSlug}`;
      break;

    case 'fact_about_us':
      resultLink = 'about-us';
      break;

    case 'article':
      resultLink = `articles/${link.linkId}`;
      break;

    case 'brewer':
      resultLink = `store/brewers/${link.urlSlug}`;
      break;

    case 'cafe':
      resultLink = 'cafes';
      break;

    case 'coffee':
      resultLink = `store/coffees/${link.urlSlug}`;
      break;

    case 'office':
      resultLink = 'contacts';
      break;

    case 'home':
      resultLink = '';
      break;

    default:
      resultLink = '';
      break;
  }

  return `/${language}/${resultLink}`.toLowerCase();
};
