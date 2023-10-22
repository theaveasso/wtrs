import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    PORT: z.number().default(3000),
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
});

export const config = {
  env,
};
