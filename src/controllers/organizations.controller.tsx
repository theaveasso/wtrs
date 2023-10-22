import { Elysia, t } from "elysia";
import { createOrganization, getOrganizations } from "../services/organizations.service";

export const organizations = new Elysia({ prefix: "/organizations" })
  .get("/", async () => await getOrganizations())
  .post("/", async ({ body }) => await createOrganization(body), {
    body: t.Object({
      name: t.String({
        minLength: 1,
        maxLength: 280,
      })
    })
  })
