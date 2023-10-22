import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { elysia } from "lucia/middleware";
import { client } from "../database";
import { config } from "../env";

const envAliasMap = {
  production: "PROD",
  development: "DEV",
} as const;

const envAlias = envAliasMap[config.env.NODE_ENV];

const auth = lucia({
  env: envAlias,
  middleware: elysia(),
  sessionCookie: {
    expires: false,
  },
  adapter: libsql(client, {
    user: "users",
    key: "users_key",
    session: "users_session",
  }),
  getUserAttributes: (data) => {
    return {
      username: data?.username,
    };
  },
});

export type Auth = typeof auth;
