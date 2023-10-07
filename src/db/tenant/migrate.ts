import { pushToTenantDB } from ".";
import { db } from "../primary";

const teams = await db.query.teams.findMany();

teams.forEach(async (team) => {
  await pushToTenantDB({
    dbName: team.database_name,
    authToken: team.database_auth_token,
    input: true,
  });

  console.log("[Migrate TenantDB] pushed to TenantDB", team.database_name);
});
