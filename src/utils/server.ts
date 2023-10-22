import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { getRoot } from "../controllers/bar";
import { getGists } from "../controllers/feeds";
import { organizations } from "../controllers/organizations.controller";

export async function buildServer() {
  const app = new Elysia()

  // plugins
  app
    .use(html())
    .onError(({ code, error, set }) => {
      if (code === "NOT_FOUND") {
        set.status = 404
        return "Not Found :("
      }
      return new Response(error.toString())
    })

  // routes
  app.get("/", () => getRoot())

  const wtrs = new Elysia({ prefix: "/feeds" })
    .get("/", () => getGists())
  const auth = new Elysia({ prefix: "/auth" })
    .post("sign-in", () => "sign-in")
    .post("sign-up", () => "sign-up")
    .post("profile", () => "profile")


  app.group("api/v1", app => app
    .use(wtrs)
    .use(auth)
    .use(organizations))

  return app
}
