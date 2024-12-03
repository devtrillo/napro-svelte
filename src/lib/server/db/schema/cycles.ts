import type { Dayjs } from 'dayjs';
import { relations } from 'drizzle-orm';
import { integer, primaryKey, serial, timestamp } from 'drizzle-orm/pg-core';

import { userTable } from './auth';
import { createTable } from './utils';

export const cycleTable = createTable('cycle', {
  endDate: timestamp('end_date', { mode: 'string' }),
  id: serial('id').primaryKey().notNull(),
  startDate: timestamp('start_date', { mode: 'string' }).defaultNow().notNull(),
});

export const cycleRelations = relations(cycleTable, ({ many }) => ({
  usersToCycles: many(usersToCycles),
}));

export const usersToCycles = createTable(
  'users_to_cycles',
  {
    cycleId: integer('cycle_id')
      .references(() => cycleTable.id, { onDelete: 'cascade' })
      .notNull(),
    userId: integer('user_id')
      .references(() => userTable.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.cycleId],
    }),
  }),
);

export const usersToCyclesRelations = relations(usersToCycles, ({ one }) => ({
  cycle: one(cycleTable, { fields: [usersToCycles.userId], references: [cycleTable.id] }),
  user: one(userTable, { fields: [usersToCycles.userId], references: [userTable.id] }),
}));

export type Cycle = Omit<typeof cycleTable.$inferSelect, 'endDate' | 'startDate'> & {
  startDate: Dayjs;
  endDate?: Dayjs;
};
