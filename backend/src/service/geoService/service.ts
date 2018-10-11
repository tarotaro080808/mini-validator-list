import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

import * as dns from "dns";
import * as bluebird from "bluebird";

@injectable()
export default class GeoService implements service.IGeoService {
  private _lookupAsync = bluebird.promisify(dns.lookup);

  constructor(
    @inject(TYPES.Lib.Configuration) private _configuration: lib.IConfiguration,
    @inject(TYPES.Lib.WebClient) protected _webClient: lib.IWebClient
  ) {}

  private _wait = async () => {
    return bluebird.delay(200);
  };

  getGeoData = async (domainOrIp: string) => {
    await this._wait();
    const url = `${this._configuration.ipStack.url}/${domainOrIp}?access_key=${
      this._configuration.ipStack.apiKey
    }`;
    return this._webClient
      .get<service.Geo.GeoResponseData>(url)
      .catch(() => <any>{});
  };

  getIpFromDomain = async (domain: string) => {
    return this._lookupAsync(domain).catch(() => "");
  };
}
