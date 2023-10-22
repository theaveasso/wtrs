import { buildServer } from "./utils/server";
import { logger } from "./utils/logger";
import { config } from "./env";

async function main() {
  const app = await buildServer()

  app.listen(config.env.PORT);
  logger.info(
    `app is listening on ${config.env.HOST}:${config.env.PORT}`,
  );
}

main()
