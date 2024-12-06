import { relations } from 'drizzle-orm';
import {
  decimal,
  integer,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { userTable } from './auth';
import { createTable } from './utils';

export const cycleTable = createTable('cycle', {
  endDate: timestamp('end_date', { mode: 'string' }),
  id: serial('id').primaryKey().notNull(),
  ppp: smallint('ppp'),
  score: decimal('score'),
  startDate: timestamp('start_date', { mode: 'string' }).defaultNow().notNull(),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const dayTable = createTable(
  'day',
  {
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    cycleId: integer('cycle_id')
      .references(() => cycleTable.id, { onDelete: 'cascade' })
      .notNull(),
    date: timestamp('observation_date', { mode: 'string' }).notNull(),
    dischargeType: varchar('discharge_type', { length: 4 }).notNull(),
    flowType: varchar('flow_type', { length: 4 }).notNull(),
    frequency: varchar('frequency', { length: 4 }).notNull(),
    lubricationStatus: varchar('lubrication_status', { length: 4 }).notNull(),
    notes: text('notes'),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.cycleId, t.date] }),
  }),
);

export const cycleRelations = relations(cycleTable, ({ one, many }) => ({
  days: many(dayTable),
  user: one(userTable, { fields: [cycleTable.userId], references: [userTable.id] }),
}));

export const dayRelations = relations(dayTable, ({ one }) => ({
  cycle: one(cycleTable, {
    fields: [dayTable.cycleId],
    references: [cycleTable.id],
  }),
}));

export type Cycle = typeof cycleTable.$inferSelect;
export type Day = typeof dayTable.$inferSelect;
