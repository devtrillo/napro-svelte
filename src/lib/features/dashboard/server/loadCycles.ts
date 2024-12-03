import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { usersToCycles } from '$lib/server/db/schema';

export default async function loadCycles(userId?: number) {
  if (!userId) return [];
  return db.query.usersToCycles.findFirst({
    where: eq(usersToCycles.userId, userId),
    with: { cycle: true },
  });
}
