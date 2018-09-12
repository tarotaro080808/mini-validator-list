import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { Domains, Models } from "../../domain/types";
import { Cache } from "../types";
import { cached, cache } from "../../lib/cache/smartCache";

@injectable()
export default class ValidatorsProxy implements Domains.IValidators {
  constructor(
    @inject(TYPES.Domain.Validators) private _actual: Domains.IValidators
  ) {}

  @cache({
    key: Cache.Validators.key,
    interval: Cache.Validators.interval
  })
  async getValidators() {
    return this._actual.getValidators();
  }

  @cache({
    key: Cache.ValidatorsSummary.key,
    interval: Cache.ValidatorsSummary.interval
  })
  async getValidatorSummary(
    _date: string,
    @cached(Cache.DefaultUnl.key) defaultUnl: Models.DefaultUnl,
    @cached(Cache.DailyReports.key) dailyReports: Models.DailyReports[],
    @cached(Cache.Validators.key) allValidators: Models.Validator[],
    @cached(Cache.Geo.key) domainGeoList: Models.DomainGeo[]
  ) {
    return this._actual.getValidatorSummary(
      _date,
      defaultUnl,
      dailyReports,
      allValidators,
      domainGeoList
    );
  }
}
