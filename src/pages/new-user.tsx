import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import { ctx } from "../context";
import { redirect } from "../lib";

export const newUser = new Elysia()
  .use(ctx)
  .get("/new-user", ({ html, session, set, headers }) => {
    if (!session) {
      redirect({ set, headers }, "/");
      return;
    }
    return html(() => (
      <BaseHtml>
        <div>
          <h1 safe>Hey there, {session?.user.name}</h1>
          <p>Do you want to join or creaet a organization?</p>
        </div>
      </BaseHtml>
    ));
  });
