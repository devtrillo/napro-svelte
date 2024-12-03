import { relations } from 'drizzle-orm';
import { integer, serial, timestamp } from 'drizzle-orm/pg-core';

import { userTable } from './auth';
import { createTable } from './utils';

export const cycleTable = createTable('cycle', {
  endDate: timestamp('end_date', { mode: 'string' }),
  id: serial('id').primaryKey().notNull(),
  startDate: timestamp('start_date', { mode: 'string' }).defaultNow().notNull(),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const cycleRelations = relations(cycleTable, ({ one }) => ({
  user: one(userTable, { fields: [cycleTable.userId], references: [userTable.id] }),
}));

export type Cycle = typeof cycleTable.$inferSelect;
