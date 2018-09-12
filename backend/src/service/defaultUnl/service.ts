import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import {
  IWebClient,
  IConfiguration,
  ILoggerFactory,
  ILogger
} from "../../lib/types";
import { Service, IDefaultUnlService } from "../types";

@injectable()
export default class RippleDefaultUnlSiteService implements IDefaultUnlService {
  private _logger: ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) private _loggerFactory: ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: IWebClient
  ) {
    this._logger = this._loggerFactory.create(`Service.RippleDefaultUnlSiteService`);
  }

  getDefaultUnl = async () => {
    this._logger.info(`getDefaultUnl`);
    return this._webClient.get<Service.RippleDataApi.DefaultUnlResponse>(
      this._configuration.getDefaultUNLsURL()
    );
  };

  getDefaultUnlByUrl = async (url: string) => {
    this._logger.info(`getDefaultUnlByUrl ${url}`);
    return this._webClient.get<Service.RippleDataApi.DefaultUnlResponse>(url);
  };
}
