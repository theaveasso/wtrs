import { createClient, type Config } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { config } from "../env";

const options: Config = {
  url: config.env.DATABASE_URL,
  authToken: config.env.DATABASE_AUTH_TOKEN,
};

export const client = createClient(options);
export const db = drizzle(client, { logger: true });
