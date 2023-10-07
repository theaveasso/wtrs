import { relations } from "drizzle-orm";
import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { teams } from ".";

export const user = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email"),
    picture: text("picture").notNull(),
    teamId: text("team_id"),
});

export const userRelation = relations(user, ({ one }) => ({
    team: one(teams, {
        fields: [user.teamId],
        references: [teams.id],
    }),
}));

export const session = sqliteTable("users_session", {
    id: text("id").primaryKey(),
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

export const key = sqliteTable("users_key", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    hashedPassword: text("hashed_password"),
});
