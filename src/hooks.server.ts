import type { Handle } from '@sveltejs/kit';
import { englishCode } from '$lib/utils/language-codes';

export const handle: Handle = ({ event, resolve }) => {
  const language = event.cookies.get('lang') ?? englishCode;

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', language)
  });
};
