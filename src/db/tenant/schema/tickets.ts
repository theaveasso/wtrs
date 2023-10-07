import { relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { chats } from "./chats";

export const tickets = sqliteTable(
    "tickets",
    {
        id: integer("id", { mode: "number" }).primaryKey({
            autoIncrement: true,
        }),
        assignee: text("assignee"),
        title: text("title").notNull(),
        status: text("status", { enum: ["open", "closed"] }).notNull(),
        priority: text("priority", {
            enum: ["low", "medium", "high", "highest"],
        }).notNull(),
        description: text("description").notNull(),
        joined_at: integer("created_at", { mode: "timestamp" }).notNull(),
        resign_at: integer("resign_at", { mode: "timestamp" }),
    },
    (table) => ({
        status_index: index("status_index").on(table.status),
        priority_index: index("priority_index").on(table.priority),
    }),
);

export const ticketsRelations = relations(tickets, ({ many }) => ({
    chats: many(chats),
}));

export type Ticket = typeof tickets.$inferSelect;
