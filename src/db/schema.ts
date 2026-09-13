import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const members = sqliteTable('membros', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const igrejas = sqliteTable('igrejas', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
})