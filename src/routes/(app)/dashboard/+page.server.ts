import { redirect } from '@sveltejs/kit';

import loadCycles from '$lib/features/dashboard/server/loadCycles';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  if (!event.locals?.user?.id) return redirect(302, '/login');

  return {
    cycles: loadCycles(event.locals.user.id),
    name: event.locals.user.name,
  };
};
