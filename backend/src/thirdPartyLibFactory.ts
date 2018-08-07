import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./inversify.types";

import * as Koa from "koa";
import * as Router from "koa-router";
import * as winston from "winston";
import { google } from "googleapis";
import * as Octokit from "@octokit/rest";
import { IThirdPartyLibFactory, IConfiguration } from "./types";

@injectable()
export default class ThirdPartyLibFactory implements IThirdPartyLibFactory {
  constructor(
    @inject(TYPES.Configuration) private _configuration: IConfiguration
  ) {}
  createServer = () => new Koa();
  createRouter = () => new Router();
  createLogger = () => {
    return winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  };
  createGAReportingApi = async () => {
    const client = await google.auth.getClient({
      keyFile: this._configuration.getGoogleJwtJsonFilePath(),
      scopes: "https://www.googleapis.com/auth/analytics"
    });
    const analytics = google.analyticsreporting({
      version: "v4",
      auth: client
    });
    return analytics;
  };
  createGitHubApi = () => new Octokit();
}
