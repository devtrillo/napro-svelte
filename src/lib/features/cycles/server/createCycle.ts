import dayjs from 'dayjs';

import { db } from '$lib/server/db';
import { cycleTable } from '$lib/server/db/schema';

export async function createCycle(userId: number) {
  return await db
    .insert(cycleTable)
    .values({
      startDate: dayjs().toISOString(),
      userId,
    })
    .returning();
}
