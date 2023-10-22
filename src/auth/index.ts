import { lucia } from "lucia";
import { config } from "../env";

const envAliasMap = {
  production: "PROD",
  development: "DEV",
} as const;

const envAlias = envAliasMap[config.env.NODE_ENV];

export type Auth = typeof auth;
