import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  if (!event.locals?.user?.id) return redirect(302, '/login');

  return {
    name: event.locals.user.name,
  };
};
