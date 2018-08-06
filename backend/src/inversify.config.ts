import { Container } from "inversify";
import {
  IRippleService,
  IConfiguration,
  ICacheManagerFactory,
  IProcessEnv,
  ICrypto,
  IQuerier,
  IServer,
  Lib,
  IGoogleService,
  IThirdPartyLibFactory,
  IIntervalManager,
  IGitHubService
} from "./types";
import { TYPES } from "./inversify.types";
import { Server, DevServer } from "./server";
import RippleService from "./services/rippleService";
import GoogleService from "./services/googleAnalyticsService";
import Configuration from "./configuration";
import CacheManagerFactory from "./cache/cacheManagerFactory";
import Crypto from "./crypto";
import Querier from "./querier";
import ThirdPartyLibFactory from "./thirdPartyLibFactory";
import IntervalManager from "./services/intervalManager";
import GitHubService from "./services/githubService";

require("dotenv").config();

const myContainer = new Container();

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
  .bind<IRippleService>(TYPES.RippleService)
  .to(RippleService)
  .inSingletonScope();
myContainer
  .bind<IGoogleService>(TYPES.GoogleService)
  .to(GoogleService)
  .inSingletonScope();
myContainer
  .bind<IGitHubService>(TYPES.GitHubService)
  .to(GitHubService)
  .inSingletonScope();
myContainer
  .bind<IConfiguration>(TYPES.Configuration)
  .to(Configuration)
  .inSingletonScope();
myContainer
  .bind<IIntervalManager>(TYPES.IntervalManager)
  .to(IntervalManager)
  .inSingletonScope();
myContainer
  .bind<ICacheManagerFactory>(TYPES.CacheManagerFactory)
  .to(CacheManagerFactory)
  .inSingletonScope();
myContainer
  .bind<IServer>(TYPES.Server)
  .to(process.env["NODE_ENV"] === "production" ? Server : DevServer)
  .inSingletonScope();
myContainer
  .bind<IThirdPartyLibFactory>(TYPES.ThirdPartyLibFactory)
  .to(ThirdPartyLibFactory)
  .inSingletonScope();

// third party libraries
const thirdPartyLibFactory = myContainer.get<IThirdPartyLibFactory>(
  TYPES.ThirdPartyLibFactory
);

myContainer
  .bind<Lib.ILogger>(TYPES.Lib.Logger)
  .toConstantValue(thirdPartyLibFactory.createLogger());
myContainer
  .bind<Lib.Koa.IServer>(TYPES.Lib.Koa.App)
  .toConstantValue(thirdPartyLibFactory.createServer());
myContainer
  .bind<Lib.Koa.IRouter>(TYPES.Lib.Koa.Router)
  .toConstantValue(thirdPartyLibFactory.createRouter());
myContainer
  .bind<Promise<Lib.Google.IApi>>(TYPES.Lib.GoogleApi)
  .toConstantValue(thirdPartyLibFactory.createGAReportingApi());
myContainer
  .bind<Lib.GitHub.IApi>(TYPES.Lib.GitHubApi)
  .toConstantValue(thirdPartyLibFactory.createGitHubApi());

export { myContainer };
