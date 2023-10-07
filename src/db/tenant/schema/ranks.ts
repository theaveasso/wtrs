import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ranks = sqliteTable(
    "ranks",
    {
        id: integer("id", { mode: "number" }).primaryKey({
            autoIncrement: true,
        }),
        user_id: text("user_id"),
        title: text("title").notNull(),
        status: text("status").notNull(),
        description: text("description").notNull(),
        point: integer("point", { mode: "number" }),
        joined_at: integer("created_at", { mode: "timestamp" }).notNull(),
        resign_at: integer("resign_at", { mode: "timestamp" }),
    },
    (table) => ({
        title_index: index("title_index").on(table.status),
    }),
);

export type Rank = typeof ranks.$inferSelect;
