import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from './$types';
import { emailSchema } from './schema';

export const load = (async () => {
  return {
    form: await superValidate(zod(emailSchema)),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(emailSchema));
    if (!form.valid) return fail(400, { form });

    console.log('form valid');
    return { form };
  },
};
