import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  if (!!event.locals.session && event.locals.user) redirect(302, '/cycles');
}) satisfies PageServerLoad;
