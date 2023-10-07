import { unlinkSync } from "fs";
import { createClient, type Config } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const getTenantDB = ({
  dbName,
  authToken,
}: {
  dbName: string;
  authToken: string;
}) => {
  const dbUrl = `libsql://${dbName}-theaveasso.turso.io`;
  const dbCredential = {
    url: dbUrl,
    authToken,
  };

  const tenantClient = createClient(dbCredential);
  const tenantDB = drizzle(tenantClient, { schema, logger: true });

  return {
    tenantClient,
    tenantDB,
  };
};

export const pushToTenantDB = async ({
  dbName,
  authToken,
  input,
}: {
  dbName: string;
  authToken: string;
  input?: boolean;
}) => {
  const tempConfigPath = "./src/db/tenant/drizzle.config.ts";
  const config = `
  export default {
    schema: "./src/db/tenant/schema/index.ts",
    driver: "turso",
    dbCredentials: {
      url: "libsql://${dbName}-theaveasso.turso.io",
      authToken: "${authToken}"
    },
    tablesFilter: ["!libsql_wasm_func_table"],
  }
`;
  await Bun.write(tempConfigPath, config);
  return new Promise((resolve, reject) => {
    Bun.spawn(
      [
        "bunx",
        "drizzle-kit",
        "push:sqlite",
        `--config=${tempConfigPath}`,
      ],
      {
        stdout: input ? "inherit" : undefined,
        stdin: input ? "inherit" : undefined,
        onExit(subprocess, exitCode, signalCode, error) {
          unlinkSync(tempConfigPath);
          if (exitCode === 0) {
            resolve(void 0);
          } else {
            log.error(
              error,
              "[TenantDB] Error pushing to Tenant DB",
            );
            reject(error);
          }
        },
      },
    );
  });
};
