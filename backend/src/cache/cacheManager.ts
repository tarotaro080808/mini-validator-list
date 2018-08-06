import { HashMap, Cache, Lib, ICacheManager } from "../types";

export default class CacheManager<TCacheType>
  implements ICacheManager<TCacheType> {
  private _cache: HashMap<Cache.IDataCache<TCacheType>> = {};
  constructor(private _logger: Lib.ILogger) {}

  get<TExtractCacheType extends TCacheType>(name: string) {
    return <Cache.IDataCache<TExtractCacheType>>this._cache[name];
  }

  private _set(name: string, value: TCacheType | TCacheType[]) {
    let valueArray: TCacheType[] = [];
    if (!Array.isArray(value)) {
      valueArray.push(value);
    } else {
      valueArray = <TCacheType[]>value;
    }
    this._cache[name] = {
      lastUpdated: new Date(),
      list: valueArray
    };
  }

  async set(name: string, workflow: () => Promise<TCacheType | TCacheType[]>) {
    this._logger.info(`fetching data for cache[${name}]...`);
    const data = await workflow();
    this._set(name, data);
    this._logger.info(`cache[${name}] has been populated.`);
    return Promise.resolve();
  }

  async waitFor(name: string, who: string = "") {
    return new Promise<boolean>((resolve, reject) => {
      if (this._cache[name]) {
        return resolve(true);
      }

      // wait until the cache is populated.
      const interval = 1000;
      const timeout = interval * 60;
      let expired = false;
      let elapsed = 0;
      const key = setInterval(() => {
        this._logger.info(
          `${who}: waiting for the cache[${name}] to be populated...`
        );
        if (this._cache[name] || expired) {
          clearInterval(key);

          if (this._cache[name]) {
            this._logger.info(`${who}: cache[${name}] has been populated.`);
            resolve(true);
          } else {
            const message = `${who}: waited long enough for cache[${name}] to be populated. Terminated.`;
            this._logger.warn(message);
            reject(message);
          }
        }
        expired = elapsed > timeout;
        elapsed += interval;
      }, interval);
    });
  }
}
