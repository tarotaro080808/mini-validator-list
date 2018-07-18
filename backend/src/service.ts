import { injectable, inject } from "inversify";
import "reflect-metadata";
import {
  IService,
  IConfiguration,
  ICrypto,
  RippleValidatorList,
  IValidatorDataCache,
  IGeoDataCache,
  IQuerier,
  Lib,
  ResolveDnsResponse,
  GeoInfoList,
  HashMap,
  IDataCache
} from "./interfaces";
import { TYPES } from "./types";

type CacheType = IDataCache<GeoInfoList | RippleValidatorList>;

@injectable()
export default class Service implements IService {
  private _cache: HashMap<CacheType> = {};

  constructor(
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Querier) private _querier: IQuerier,
    @inject(TYPES.Crypto) private _crypto: ICrypto
  ) {
    this._fetch().then(() => {
      this._fetchGeoInfo();
    });

    const validatorFetchInterval = this._configuration.getFetchInterval();
    setInterval(() => {
      this._fetch();
    }, validatorFetchInterval);

    const geoInfoFetchInterval = this._configuration.getGeoInfoFetchInterval();
    setInterval(() => {
      this._fetchGeoInfo();
    }, geoInfoFetchInterval);
  }

  private async _fetchGeoInfo() {
    if (!this._cache["validators"]) {
      return;
    }

    // lookup ip address from the domain
    const capturedDomains = {};
    const promises: Promise<ResolveDnsResponse>[] = this._cache[
      "validators"
    ].list.reduce((prev, v) => {
      if (v.domain && !capturedDomains[v.domain]) {
        prev.push(this._querier.getIpFromDomain(v.domain));
        capturedDomains[v.domain] = true;
      }
      return prev;
    }, []);

    // get domain and address pair
    const domainAndAddressPairs = await Promise.all(promises);

    const list: Lib.IPStackResponse[] = [];
    const ipStackPromises = domainAndAddressPairs.reduce((prev, curr) => {
      if (curr.ip) {
        prev.push(this._querier.getGeoInfo([curr.ip]));
      }
      return prev;
    }, []);

    const geoDataSet: GeoInfoList[] = await Promise.all(ipStackPromises);
    domainAndAddressPairs.forEach(domainAndAddressPair => {
      if (domainAndAddressPair.ip) {
        const geoData = geoDataSet.filter(
          g => g.ip === domainAndAddressPair.ip
        )[0];
        list.push({
          domain: domainAndAddressPair.domain,
          ip: domainAndAddressPair.ip,
          country_name: geoData.country_name,
          region_name: geoData.region_name,
          city: geoData.city,
          latitude: geoData.latitude,
          longitude: geoData.longitude
        });
      }
    });

    const geoInfo: IGeoDataCache = {
      lastUpdated: new Date(),
      list: list
    };

    this._cache["geo"] = geoInfo;
  }

  private async _fetch() {
    const result = await Promise.all([
      this._querier.getDefaultUnl(),
      this._querier.getValidators()
    ]);

    const parsedDefaultUNLs = this._crypto.parseDefaultUNLResponse(result[0]);
    const parsedValidatorList = result[1];
    const excludedDomains = this._configuration.getExcludedDomains();

    const formattedValidatorList: IValidatorDataCache = {
      lastUpdated: new Date(),
      list: parsedValidatorList
        .filter(
          v => v.validation_public_key && excludedDomains.indexOf(v.domain) < 0
        )
        .map(v => ({
          pubkey: v.validation_public_key,
          domain: v.domain,
          verified: v.domain_state === "verified",
          default:
            parsedDefaultUNLs.findIndex(d => d === v.validation_public_key) >= 0
        }))
    };

    this._cache["validators"] = formattedValidatorList;
  }

  private async _getCache(name: string): Promise<CacheType> {
    return new Promise<CacheType>(resolve => {
      // wait until the cache is populated.
      if (!this._cache[name]) {
        const key = setInterval(() => {
          if (this._cache[name]) {
            clearInterval(key);
          }
        }, 200);
      }
      resolve(this._cache[name]);
    });
  }

  async getValidatorInfo(): Promise<IValidatorDataCache> {
    return <Promise<IValidatorDataCache>>this._getCache("validators");
  }

  async getGeoInfo(): Promise<IGeoDataCache> {
    return <Promise<IGeoDataCache>>this._getCache("geo");
  }
}
