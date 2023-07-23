import { SELECTED_ENVIRONMENT_COOKIE_NAME } from 'src/lib/const';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
  return {
    currentEnvironmentId: cookies.get(SELECTED_ENVIRONMENT_COOKIE_NAME)
  };
};
