import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

// This is a catch all route, so we throw a 404 error

export const load: PageServerLoad = () => {
  throw error(404, 'Not found');
};
