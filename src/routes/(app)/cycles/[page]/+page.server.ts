import { fail, redirect } from '@sveltejs/kit';

import { createCycle } from '$lib/features/cycles/server/createCycle';
import { getTotalCycles, loadCycles } from '$lib/features/cycles/server/load';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, parent }) => {
  const page = Number(params.page);
  if (page < 1) return redirect(302, '/cycles/1');
  if (!locals?.user?.id) return redirect(302, '/login');
  console.log(await loadCycles(locals.user.id, page));
  return {
    cycles: loadCycles(locals.user.id, page),
    parent: await parent(),
    totalCycles: getTotalCycles(locals.user.id),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401, { message: 'Unauthorized' });

    await createCycle(user.id);
  },
};
