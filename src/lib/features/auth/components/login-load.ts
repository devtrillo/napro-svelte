import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { loginSchema } from '../server/schema';

export async function LoginLoad() {
  return {
    form: await superValidate(zod(loginSchema)),
  };
}
