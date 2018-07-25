import { injectable, inject } from "inversify";
import { IConfiguration, IProcessEnv } from "./types";
import { TYPES } from "./inversify.types";

@injectable()
export default class Configuration implements IConfiguration {
  constructor(@inject(TYPES.ProcessEnv) private _env: IProcessEnv) {}
  private getFromProcessEnv(name: string) {
    return this._env[name];
  }

  getPort(): number {
    return parseInt(this.getFromProcessEnv("PORT"));
  }

  getFetchInterval(): number {
    return parseInt(this.getFromProcessEnv("FETCH_INTERVAL"));
  }

  getGeoInfoFetchInterval(): number {
    return parseInt(this.getFromProcessEnv("GEO_FETCH_INTERVAL"));
  }

  getDefaultUNLsURL(): string {
    return this.getFromProcessEnv("DEFAULT_UNL_URL");
  }

  getValidatorsURL(): string {
    return this.getFromProcessEnv("VALIDATORS_URL");
  }

  getValidatorDailyReportsURL(): string {
    return this.getFromProcessEnv("VALIDATOR_DAILY_REPORTS_URL");
  }

  getIPStackFetchURL(): string {
    return this.getFromProcessEnv("IPSTACK_GET_URL");
  }

  getIPStackApiKey(): string {
    return this.getFromProcessEnv("IPSTACK_API_KEY");
  }

  getAltNetDomainsPattern(): RegExp {
    return new RegExp(this.getFromProcessEnv("ALTNET_DOMAINS_PATTERN"));
  }
}
