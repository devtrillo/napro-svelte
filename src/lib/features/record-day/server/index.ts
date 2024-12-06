import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { recordDaySchema } from './schema';

export const recordDayForm = async () => {
  return await superValidate(zod(recordDaySchema));
};
