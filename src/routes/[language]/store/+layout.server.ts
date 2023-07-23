import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ url }) => {
  if (url.pathname.endsWith('store')) {
    throw redirect(302, `${url.pathname}/coffees`);
  }
};
