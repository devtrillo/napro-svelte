import { count, eq, sql } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { cycleTable, dayTable } from '$lib/server/db/schema';

import { CYCLE_LIMIT_FETCH } from '../CONSTANT';

export async function loadCycle(id: number) {
  return await db.query.cycleTable.findFirst({
    where: eq(cycleTable.id, id),
    with: {
      days: {
        orderBy: (day, { asc }) => [asc(day.date)],
      },
    },
  });
}

export async function getTotalCycles(userId?: number) {
  if (!userId) return 0;

  const where = eq(cycleTable.userId, userId);
  const [{ count }] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as('count'),
    })
    .from(cycleTable)
    .where(where);
  return count;
}

export async function loadCycles(userId?: number, page = 0) {
  if (!userId) return [];

  const where = eq(cycleTable.userId, userId);

  return await db
    .select({
      days: count(dayTable.date),
      endDate: cycleTable.endDate,
      id: cycleTable.id,
      ppp: cycleTable.ppp,
      score: cycleTable.score,
      startDate: cycleTable.startDate,
    })
    .from(cycleTable)
    .leftJoin(dayTable, eq(cycleTable.id, dayTable.cycleId))
    .groupBy(cycleTable.id)
    .orderBy(cycleTable.startDate)
    .where(where)
    .limit(CYCLE_LIMIT_FETCH)
    .offset((page - 1) * CYCLE_LIMIT_FETCH);
}
