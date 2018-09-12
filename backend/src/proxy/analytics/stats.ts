import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { Cache } from "../types";
import { Domains, Models } from "../../domain/types";
import { cache, cached } from "../../lib/cache/smartCache";

@injectable()
export default class StatsProxy implements Domains.IStats {
  constructor(@inject(TYPES.Domain.Stats) private _actual: Domains.IStats) {}

  @cache({ key: Cache.Stats.key, interval: Cache.Stats.interval })
  async getSummary(
    @cached(Cache.ValidatorsSummary.key)
    validatorList: Models.ValidatorSummary[]
  ) {
    return this._actual.getSummary(validatorList);
  }

  @cache({
    key: Cache.DailyReports.key,
    interval: Cache.DailyReports.interval
  })
  async getDailyReports() {
    return this._actual.getDailyReports();
  }
}
