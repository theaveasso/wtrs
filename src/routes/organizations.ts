import { Elysia } from "elysia";

export const organizations = new Elysia({ prefix: "/organizations" })
  .get("/", () => { })
  .post("/", () => { })
