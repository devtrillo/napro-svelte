import dayjs from 'dayjs';
import { and, eq } from 'drizzle-orm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import { loadCycle } from '$lib/features/cycles/server/load';
import { db } from '$lib/server/db';
import { cycleTable, dayTable } from '$lib/server/db/schema';

import type { Actions, PageServerLoad } from './$types';
import { insertObservationSchema } from './schema';

export const load: PageServerLoad = async (event) => {
  await event.parent();
  const date = dayjs(event.params.date)
    .set('hour', -6)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
    .toISOString();

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
    const date = dayjs(event.params.date)
      .set('hour', -6)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toISOString();
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

    const newValues = {
      dischargeType: form.data.dischargeType,
      flowType: form.data.flowType || '',
      frequency: form.data.frequency || '',
      lubricationStatus: form.data.lubricationStatus || '',
      notes: form.data.notes,
    };
    console.log('NV', newValues);

    const where = and(eq(dayTable.date, date), eq(dayTable.cycleId, Number(event.params.cycleId)));
    const exists = await db.query.dayTable.findFirst({
      where,
    });
    console.log('EX', exists);
    if (exists) {
      await db.update(dayTable).set(newValues).where(where);
      //update element
    } else {
      await db.insert(dayTable).values({
        cycleId: Number(event.params.cycleId),
        date,
        ...newValues,
      });
    }

    return { form };
  },
};
