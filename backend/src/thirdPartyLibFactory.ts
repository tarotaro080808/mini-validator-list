import { injectable } from "inversify";
import "reflect-metadata";

import * as Koa from "koa";
import * as Router from "koa-router";
import * as winston from "winston";
import { IThirdPartyLibFactory } from "./types";

@injectable()
export default class ThirdPartyLibFactory implements IThirdPartyLibFactory {
  createServer = () => new Koa();
  createRouter = () => new Router();
  createLogger = () => {
    return winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  };
}
