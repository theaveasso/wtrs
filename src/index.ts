import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { html } from "@elysiajs/html";
import { bar, click, getRoot } from "./controller/bar";

const app = new Elysia();

app.use(swagger()).use(html());
app.onError(({ error }) => {
  return new Response(error.toString());
});

app.get("/", () => getRoot());

// app.post("/clicked", () => click());
app
  .post(
    "/foo",
    ({ body }) => {
      return bar(body);
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
