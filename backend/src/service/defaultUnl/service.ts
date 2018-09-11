import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IWebClient, IConfiguration } from "../../lib/types";
import { Service, IDefaultUnlService } from "../types";

@injectable()
export default class RippleDefaultUnlSiteService implements IDefaultUnlService {
  constructor(
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: IWebClient
  ) {}

  getDefaultUnl = async () => {
    return this._webClient.get<Service.RippleDataApi.DefaultUnlResponse>(
      this._configuration.getDefaultUNLsURL()
    );
  };

  getDefaultUnlByUrl = async (url: string) => {
    return this._webClient.get<Service.RippleDataApi.DefaultUnlResponse>(url);
  };
}
