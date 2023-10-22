import type { Config } from "drizzle-kit";
import { config } from "./src/env";

const dbCredentials = {
  url: config.env.DATABASE_URL,
  authToken: config.env.DATABASE_AUTH_TOKEN!,
};

export default {
  schema: "./src/database/schema.ts",
  driver: "turso",
  dbCredentials,
  verbose: true,
  strict: true,
} satisfies Config;
