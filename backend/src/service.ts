import { injectable, inject } from "inversify";
import "reflect-metadata";
import {
  IService,
  IConfiguration,
  ICrypto,
  RippleValidatorList,
  IQuerier
} from "./interfaces";
import { TYPES } from "./types";

@injectable()
export default class Service implements IService {
  private _cache: RippleValidatorList;

  constructor(
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Querier) private _querier: IQuerier,
    @inject(TYPES.Crypto) private _crypto: ICrypto
  ) {
    this._fetch();

    const interval = this._configuration.getFetchInterval();
    setInterval(() => {
      this._fetch();
    }, interval);
  }

  private async _fetch() {
    const result = await Promise.all([
      this._querier.getDefaultUnl(),
      this._querier.getValidators()
    ]);

    const parsedDefaultUNLs = this._crypto.parseDefaultUNLResponse(result[0]);
    const parsedValidatorList = result[1];

    const formattedValidatorList: RippleValidatorList = {
      lastUpdated: new Date(),
      list: parsedValidatorList.filter(v => v.validation_public_key).map(v => ({
        pubkey: v.validation_public_key,
        domain: v.domain,
        verified: v.domain_state === "verified",
        default: parsedDefaultUNLs.findIndex(d => d === v.validation_public_key) >= 0
      }))
    };

    this._cache = formattedValidatorList;
  }

  async get(): Promise<RippleValidatorList> {
    return new Promise<RippleValidatorList>(resolve => {
      // wait until the cache is populated.
      if (!this._cache) {
        const key = setInterval(() => {
          if (this._cache) {
            clearInterval(key);
          }
        }, 200);
      }
      resolve(this._cache);
    });
  }
}
