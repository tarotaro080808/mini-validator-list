import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IQuerier, IConfiguration, ResolveDnsResponse, Lib } from "./types";
import { TYPES } from "./inversify.types";

import axios from "axios";
import * as dns from "dns";
import * as bluebird from "bluebird";

@injectable()
export default class Querier implements IQuerier {
  private _lookupAsync = bluebird.promisify(dns.lookup);

  constructor(
    @inject(TYPES.Configuration) private _configuration: IConfiguration
  ) {}

  private async _get<T>(url: string): Promise<T> {
    return axios.get<T>(url).then(a => a.data);
  }

  async getDefaultUnl() {
    return this._get<Lib.RippleData.DefaultUnlRawResponse>(
      this._configuration.getDefaultUNLsURL()
    );
  }

  async getValidators() {
    return this._get<{ validators: Lib.RippleData.ValidatorRawResponse[] }>(
      this._configuration.getValidatorsURL()
    ).then(data => data.validators);
  }

  async getValidatorDailyReports() {
    return this._get<{ reports: Lib.RippleData.DailyReportRawResponse[] }>(
      this._configuration.getValidatorDailyReportsURL()
    ).then(data => data.reports);
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
      .then(() =>
        this._get<Lib.IPStackResponse>(`${url}?access_key=${queryParam}`)
      );
    return data;
  }
}
