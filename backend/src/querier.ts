import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IQuerier, IConfiguration } from "./interfaces";
import { TYPES } from "./types";

import axios from "axios";

@injectable()
export default class Querier implements IQuerier {
  constructor(
    @inject(TYPES.Configuration) private _configuration: IConfiguration
  ) {}

  private _get(url: string): Promise<any> {
    return axios.get(url).then(a => a.data);
  }

  getDefaultUnl() {
    return this._get(this._configuration.getDefaultUNLsURL());
  }

  getValidators() {
    return this._get(this._configuration.getValidatorsURL()).then(data =>
      data.validators
    );
  }
}
