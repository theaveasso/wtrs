import { integer, sqliteTable, text, index, primaryKey, blob } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';


/////////////////////////// ORGANIZATIONS
export const organizations = sqliteTable("organizations", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  pictureUrl: text("picture_url"),
  // organization_url.
  // owner.
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
}, (table) => ({
  idx1: index("name_index").on(table.name)
}))

export type Organization = typeof organizations.$inferSelect;
export type InsertOrganization = typeof organizations.$inferInsert;
export const insertOrgSchema = createInsertSchema(organizations)
export const selectOrgSchema = createSelectSchema(organizations)

/////////////////////////// USERS
export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }),
  email: text("email").notNull(),
  username: text("username").notNull(),
  organizationId: integer("organization_id").references(() => organizations.id),
  role: text("role"),
  positionId: integer("position_id").references(() => positions.id),
  pictureUrl: text("picture_url"),
  joinedAt: integer("joined_at", { mode: "timestamp" }),
  leavedAt: integer("leaved_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
}, (table) => {
  return {
    pk: primaryKey(table.email, table.organizationId),
    idx1: index("users_id_index").on(table.id)
  }
})

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)

/////////////////////////// USERS_SESSION
export const session = sqliteTable("users_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
})

/////////////////////////// USERS_KEY
export const key = sqliteTable("users_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  hashedPassword: text("hashed_password"),
});

/////////////////////////// ROLES
export const roles = sqliteTable("roles", {
  id: integer("id", { mode: "number" }),
  role: text("title").notNull(),
  organizationId: integer("organization_id").references(() => organizations.id),
  permissions: text("permissions").$type<Array<string>>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
}, (table) => {
  return {
    pk: primaryKey(table.role, table.organizationId),
    idx1: index("roles_id_index").on(table.id)
  }
})
/////////////////////////// USERS_TO_ROLES
export const usersToRoles = sqliteTable("users_to_roles", {
  organizationId: integer("organization_id").references(() => organizations.id).notNull(),
  roleId: integer("role_id").references(() => roles.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull()
}, (table) => { return { pk: primaryKey(table.organizationId, table.roleId, table.userId) } })

/////////////////////////// POSITIONS
export const positions = sqliteTable("positions", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
})

/////////////////////////// GISTS
export const gists = sqliteTable("gists", {
  id: integer("id", { mode: "number" }),
  title: text("title").notNull(),
  description: text("description"),
  body: text("body").notNull(),
  organizationId: integer("organization_id").references(() => organizations.id),
  authorId: integer("author_id").notNull().references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
}, (table) => { return { pk: primaryKey(table.authorId, table.organizationId) } })

export type Gist = typeof gists.$inferSelect;
export type InsertGist = typeof gists.$inferInsert;
export const insertGistSchema = createInsertSchema(gists)
export const selectGistSchema = createSelectSchema(gists)
