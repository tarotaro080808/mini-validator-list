import { injectable, inject } from "inversify";
import { IConfiguration, IProcessEnv } from "./interfaces";
import { TYPES } from "./types";

@injectable()
export default class Configuration implements IConfiguration {
  constructor(@inject(TYPES.ProcessEnv) private _env: IProcessEnv) {}
  private get(name: string) {
    return this._env[name];
  }

  getPort(): number {
    return parseInt(this.get("PORT"));
  }

  getFetchInterval(): number {
    return parseInt(this.get("FETCH_INTERVAL"));
  }

  getDefaultUNLsURL(): string {
    return this.get("DEFAULT_UNL_URL");
  }

  getValidatorsURL(): string {
    return this.get("VALIDATORS_URL");
  }
}
