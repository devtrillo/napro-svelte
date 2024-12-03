import { customType, pgTableCreator } from 'drizzle-orm/pg-core';

export const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return 'bytea';
  },
});

export const createTable = pgTableCreator((name: string) => `napro_tech_${name}`);
