import { parseISO, isValid, format } from 'date-fns';
import { locales } from '$lib/utils/language-codes';

export const formatDate = (
  date: string,
  locale: string,
  formatStr = 'MMMM dd'
) => {
  const parsedDate = parseISO(date);

  return isValid(parsedDate)
    ? format(parsedDate, formatStr, {
        locale: locales[locale]
      })
    : '';
};

export const formatPrice = (price: number, locale: string) =>
  price.toLocaleString(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  });
