import { Elysia } from "elysia";
import { config } from "./env";
import { buildApp } from "./utils/server";

async function main() {
  const app = await buildApp();

  app.listen(config.env.PORT);
}

main();
