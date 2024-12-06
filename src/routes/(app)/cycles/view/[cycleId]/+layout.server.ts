import { redirect } from '@sveltejs/kit';

import { loadCycle } from '$lib/features/cycles/server/load';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const cycle = await loadCycle(Number(params.cycleId));
  if (!cycle) return redirect(302, '/');

  return {
    cycle,
  };
};
