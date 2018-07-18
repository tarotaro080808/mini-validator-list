import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IQuerier, IConfiguration, ResolveDnsResponse } from "./interfaces";
import { TYPES } from "./types";

import axios from "axios";
import * as dns from "dns";
import * as bluebird from "bluebird";

@injectable()
export default class Querier implements IQuerier {
  private _lookupAsync = bluebird.promisify(dns.lookup);

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
    return this._get(this._configuration.getValidatorsURL()).then(
      data => data.validators
    );
  }

  async getIpFromDomain(domain: string) {
    const data = await bluebird
      .try<ResolveDnsResponse>(() =>
        this._lookupAsync(domain).then(address => {
          return { domain: domain, ip: address };
        })
      )
      .catch(() => ({ domain: domain, ip: "" }));
    return Promise.resolve(data);
  }

  async getGeoInfo(ips: string[]) {
    const url = `${this._configuration.getIPStackFetchURL()}/${ips.join(",")}`;
    const queryParam = this._configuration.getIPStackApiKey();
    const data = await bluebird
      .delay(200)
      .then(() => this._get(`${url}?access_key=${queryParam}`));
    return data;
  }
}
