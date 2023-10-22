import { type Config } from "drizzle-kit"
import { config } from "./src/env"

export default {
  out: "./migration",
  schema: "./src/db/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: config.env.DATABASE_URL,
    authToken: config.env.DATABASE_AUTH_TOKEN
  },
  breakpoints: false,
} satisfies Config
