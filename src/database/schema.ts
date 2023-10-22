import {
  blob,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const organization = sqliteTable("organization", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").unique().notNull(),
});

export const user = sqliteTable(
  "user",
  {
    id: integer("id"),
    organizationId: integer("organization_id").references(
      () => organization.id,
    ),
    username: text("username").unique().notNull(),
    email: text("email").notNull(),
  },
  (table) => {
    return { pk: primaryKey(table.username, table.organizationId) };
  },
);

export const session = sqliteTable("user_session", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});
