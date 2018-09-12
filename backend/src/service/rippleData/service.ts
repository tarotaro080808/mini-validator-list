import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import {
  IWebClient,
  IConfiguration,
  ILoggerFactory,
  ILogger
} from "../../lib/types";
import { Service, IRippleDataService } from "../types";

@injectable()
export default class RippleDataService implements IRippleDataService {
  private _logger: ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) private _loggerFactory: ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: IWebClient
  ) {
    this._logger = this._loggerFactory.create(`Service.RippleDataService`);
  }

  getValidators = async () => {
    this._logger.info(`getValidators`);
    return this._webClient
      .get<{ validators: Service.RippleDataApi.GetValidatorsResponse }>(
        this._configuration.getValidatorsURL()
      )
      .then(data => data.validators);
  };

  getValidatorDailyReports = async () => {
    this._logger.info(`getValidatorDailyReports`);
    return this._webClient
      .get<{ reports: Service.RippleDataApi.GetDailyReportResponse }>(
        this._configuration.getValidatorDailyReportsURL()
      )
      .then(data => data.reports);
  };
}
