import { eq, sql } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { cycleTable } from '$lib/server/db/schema';

export async function loadCycles(userId?: number, page = 0) {
  const limit = 10;
  if (!userId) return [];

  const where = eq(cycleTable.userId, userId);
  return db.query.cycleTable.findMany({
    limit,
    offset: (page - 1) * limit,
    where,
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
