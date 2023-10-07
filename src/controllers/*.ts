import * as ElysiaModule from "elysia";
import * as AuthModule from "./auth";

export const api = new ElysiaModule.default({
  prefix: "/api",
}).use(AuthModule.authController);
