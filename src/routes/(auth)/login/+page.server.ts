import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { loginSchema } from '$lib/features/auth/server/schema';

import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {
    form: await superValidate(zod(loginSchema)),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema));

    if (!form.valid) return fail(400, { form });

    return { form };
  },
};
