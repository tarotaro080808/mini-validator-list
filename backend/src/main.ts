import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { IService, IConfiguration } from "./interfaces";

import * as Koa from "koa";
import * as Router from "koa-router";

const configuration = myContainer.get<IConfiguration>(TYPES.Configuration);
const service = myContainer.get<IService>(TYPES.Service);

const app = new Koa();
const router = new Router();

router.get("/api/validators", async ctx => {
  const result = await service.get();
  ctx.body = result;
});

app.use(router.routes()).listen(configuration.getPort());

