import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IConfiguration } from "../../lib/types";
import { Domains, Models } from "../../domain/types";
import { Cache } from "../types";

import MOCK_GEO_DATA from "../../resources/mock.getDomainGeoList";
import { cache, cached } from "../../lib/cache/smartCache";

@injectable()
export default class GeoProxy implements Domains.IGeo {
  constructor(
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.Domain.Geo) private _actual: Domains.IGeo
  ) {}

  @cache({ key: Cache.Geo.key, interval: Cache.Geo.interval })
  async getDomainGeoList(
    @cached(Cache.Validators.key) validators: Models.Validator[]
  ) {
    if (!this._configuration.isProduction()) {
      return Promise.resolve(<Models.DomainGeo[]>MOCK_GEO_DATA.list);
    }
    return this._actual.getDomainGeoList(validators);
  }
}
