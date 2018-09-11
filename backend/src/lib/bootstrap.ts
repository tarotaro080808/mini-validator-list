import { Container } from "inversify";
import {
  ICrypto,
  IWebClient,
  IProcessEnv,
  IConfiguration,
  ICache,
  ILoggerFactory
} from "./types";

import TYPES from "./";

import Configuration from "./util/configuration";
import Crypto from "./crypto/crypto";
import WebClient from "./external/webClient";
import Cache from "./cache/cache";
import LoggerFactory from "./logger/loggerFactory";

export default (container: Container) => {
  container
    .bind<IProcessEnv>(TYPES.Lib.ProcessEnv)
    .toConstantValue(<any>process.env);
  container
    .bind<ICache>(TYPES.Lib.Cache)
    .to(Cache)
    .inSingletonScope();
  container
    .bind<IConfiguration>(TYPES.Lib.Configuration)
    .to(Configuration)
    .inSingletonScope();
  container
    .bind<ICrypto>(TYPES.Lib.Crypto)
    .to(Crypto)
    .inSingletonScope();
  container
    .bind<IWebClient>(TYPES.Lib.WebClient)
    .to(WebClient)
    .inSingletonScope();
  container
    .bind<ILoggerFactory>(TYPES.Lib.LoggerFactory)
    .to(LoggerFactory)
    .inSingletonScope();
};
