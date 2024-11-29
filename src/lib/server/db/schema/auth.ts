import dayjs from 'dayjs';
import {
  boolean,
  customType,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return 'bytea';
  },
});

const createTable = pgTableCreator((name: string) => `napro_tech_${name}`);

export const userTable = createTable(
  'user',
  {
    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    email: text('email').unique().notNull(),
    googleId: text('google_id').unique(),
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    picture: text('picture'),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [{ googleIdIndex: uniqueIndex('google_id_index').on(table.googleId) }],
);

export const sessionTable = createTable('session', {
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  twoFactorVerified: boolean('two_factor_verified').notNull().default(false),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const passKeyTable = createTable('passkey_credential', {
  algorithm: integer('algorithm').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  id: bytea('id').primaryKey(),
  name: text('name').notNull(),
  publicKey: bytea('public_key').notNull(),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});
export const securityKeyCredential = createTable('security_key_credential', {
  algorithm: integer('algorithm').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  id: bytea('id').primaryKey(),
  name: text('name').notNull(),
  publicKey: bytea('public_key').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});
export const emailVerificationTable = createTable('email_verification', {
  code: text('code').notNull(),
  email: text('email').notNull(),
  expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const passwordResetTable = createTable('password_reset_session', {
  code: text('code').notNull(),
  email: text('email').notNull(),
  emailVerified: boolean('email_verified').notNull().default(false),
  expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
  id: serial('id').primaryKey(),
  twoFactorVerified: boolean('two_factor_verified').notNull().default(false),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export const totpCredentialTable = createTable('totp_credential', {
  id: serial('id').primaryKey(),
  key: bytea('key').notNull(),
  userId: integer('user_id')
    .references(() => userTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export type SecurityKeyCredential = typeof securityKeyCredential.$inferSelect;
export type User = Omit<typeof userTable.$inferSelect, 'createdAt'> & {
  createdAt: dayjs.Dayjs;
};
export type Session = Omit<typeof sessionTable.$inferSelect, 'expiresAt'> & {
  expiresAt: dayjs.Dayjs;
};
