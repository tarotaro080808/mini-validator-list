import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";

@injectable()
export default class StatsHandler implements api.IStatsHandler {
  constructor(
    @inject(TYPES.Proxy.DefaultUnl) private _defaultUnl: domain.IDefaultUnl,
    @inject(TYPES.Proxy.Validators) private _validators: domain.IValidators,
    @inject(TYPES.Proxy.Geo) private _geo: domain.IGeo,
    @inject(TYPES.Proxy.Stats) private _stats: domain.IStats
  ) {}

  getStats = async args => {
    args.params.lastNHours || 6;

    const defaultUnl = await this._defaultUnl.getDefaultUnl();
    const dailyReports = await this._stats.getDailyReports();
    const validators = await this._validators.getValidators();
    const domainGeoList = await this._geo.getDomainGeoList(validators);
    const validatorSummary = await this._validators.getValidatorSummary(
      undefined,
      defaultUnl,
      dailyReports,
      validators,
      domainGeoList
    );
    console.log(
      "DR:",
      dailyReports[0].last_datetime,
      "VL:",
      validators[0].last_datetime,
      "SY",
      validatorSummary[0].last_datetime
    );
    return this._stats.getSummary(validatorSummary);
  };

  getDefaultUnlMovementStats = async () => {
    const archives = await this._defaultUnl.getDefaultUnlArchives();
    const defaultUnl = await this._defaultUnl.getDefaultUnl();
    const dailyReports = await this._stats.getDailyReports();
    const validators = await this._validators.getValidators();
    const domainGeoList = await this._geo.getDomainGeoList(validators);
    const validatorSummary = await this._validators.getValidatorSummary(
      undefined,
      defaultUnl,
      dailyReports,
      validators,
      domainGeoList
    );
    return this._defaultUnl.getDefaultUnlStats(archives, validatorSummary);
  };
}
