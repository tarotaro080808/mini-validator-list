import { Container } from "inversify";
import {
  IService,
  IConfiguration,
  IProcessEnv,
  ICrypto,
  IQuerier,
  IServer,
  Lib
} from "./types";
import { TYPES } from "./inversify.types";
import { Server, DevServer } from "./server";
import Service from "./service";
import Configuration from "./configuration";
import Crypto from "./crypto";
import Querier from "./querier";
import ThirdPartyLibFactory from "./thirdPartyLibFactory";

require("dotenv").config();

const myContainer = new Container();
const thirdPartyLibFactory = new ThirdPartyLibFactory();

myContainer.bind<IProcessEnv>(TYPES.ProcessEnv).toConstantValue(process.env);
myContainer
  .bind<ICrypto>(TYPES.Crypto)
  .to(Crypto)
  .inSingletonScope();
myContainer
  .bind<IQuerier>(TYPES.Querier)
  .to(Querier)
  .inSingletonScope();
myContainer
  .bind<IService>(TYPES.Service)
  .to(Service)
  .inSingletonScope();
myContainer
  .bind<IConfiguration>(TYPES.Configuration)
  .to(Configuration)
  .inSingletonScope();
myContainer
  .bind<IServer>(TYPES.Server)
  .to(process.env["NODE_ENV"] === "production" ? Server : DevServer)
  .inSingletonScope();

// third party libraries
myContainer
  .bind<Lib.ILogger>(TYPES.Lib.Logger)
  .toConstantValue(thirdPartyLibFactory.createLogger());
myContainer
  .bind<Lib.Koa.IServer>(TYPES.Lib.Koa.App)
  .toConstantValue(thirdPartyLibFactory.createServer());
myContainer
  .bind<Lib.Koa.IRouter>(TYPES.Lib.Koa.Router)
  .toConstantValue(thirdPartyLibFactory.createRouter());

export { myContainer };
