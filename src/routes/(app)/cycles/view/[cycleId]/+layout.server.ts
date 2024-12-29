import { redirect } from '@sveltejs/kit';

import { loadCycle } from '$lib/features/cycles/server/load';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
  const cycle = await loadCycle(Number(params.cycleId));
  if (!cycle) return redirect(302, '/');

  return {
    cycle,
  };
};
