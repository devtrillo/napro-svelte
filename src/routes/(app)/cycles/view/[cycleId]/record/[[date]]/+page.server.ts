import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { and, eq } from 'drizzle-orm';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import { loadCycle } from '$lib/features/cycles/server/load';
import { db } from '$lib/server/db';
import { cycleTable, dayTable } from '$lib/server/db/schema';

import type { Actions, PageServerLoad } from './$types';
import { insertObservationSchema } from './schema';

export const load: PageServerLoad = async (event) => {
  const { cycle } = await event.parent();
  if (!cycle) redirect(302, '/cycles');

  const date = dayjs(event.params.date).format('YYYY-MM-DD');

  const dayQuery = await db.query.dayTable.findFirst({
    where: and(eq(dayTable.date, date), eq(dayTable.cycleId, Number(event.params.cycleId))),
  });

  const formValues = insertObservationSchema.safeParse(dayQuery);
  const dayRecord: z.infer<typeof insertObservationSchema> = formValues.success
    ? formValues.data
    : {
        dischargeType: '',
        flowType: '',
        frequency: '',
        lubricationStatus: '',
        notes: '',
      };

  return {
    form: await superValidate(dayRecord, zod(insertObservationSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const date = dayjs(event.params.date).format('YYYY-MM-DD');
    const form = await superValidate(event, zod(insertObservationSchema));

    if (!form.valid) return fail(400, { form });

    const cycle = await loadCycle(Number(event.params.cycleId));
    if (!cycle) return fail(404, { form });
    if (dayjs(cycle?.startDate).isAfter(dayjs(event.params.date))) {
      await db
        .update(cycleTable)
        .set({
          startDate: date,
        })
        .where(eq(cycleTable.id, Number(event.params.cycleId)));
    }

    await db
      .insert(dayTable)
      .values({
        cycleId: Number(event.params.cycleId),
        date,
        ...form.data,
      })
      .onConflictDoUpdate({ set: form.data, target: [dayTable.cycleId, dayTable.date] });

    return message(form, 'User updated!');
  },
};
