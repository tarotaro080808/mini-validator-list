import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { _takeLastNHours } from "../../domain/common/util";
import * as moment from "moment";

@injectable()
export default class ValidatorHandler implements api.IValidatorHandler {
  constructor(
    @inject(TYPES.Proxy.DefaultUnl) private _defaultUnl: domain.IDefaultUnl,
    @inject(TYPES.Proxy.Geo) private _geo: domain.IGeo,
    @inject(TYPES.Proxy.Stats) private _stats: domain.IStats,
    @inject(TYPES.Proxy.Validators) private _validators: domain.IValidators
  ) {}

  getValidatorSummary = async args => {
    const date = args.query.d || "";
    const lastNHours = args.query.h || 6;

    const archives = await this._defaultUnl.getDefaultUnlArchives();
    const defaultUnl = await this._defaultUnl.getDefaultUnl(date, archives);
    const dailyReports = await this._stats.getDailyReports();
    const validators = await this._validators.getValidators();
    const domainGeoList = await this._geo.getDomainGeoList(validators);
    let data = await this._validators.getValidatorSummary(
      date,
      defaultUnl,
      dailyReports,
      validators,
      domainGeoList
    );

    // apply the filter by last n hours
    if (lastNHours > 0) {
      const current = moment().add(-lastNHours, "h");
      console.log(
        "DR:",
        dailyReports[0].last_datetime,
        "VL:",
        validators[0].last_datetime,
        "SY",
        data[0].last_datetime,
        "diff: ",
        moment(data[0].last_datetime).diff(current),
        "res: ",
        _takeLastNHours(current, moment(data[0].last_datetime))
      );
      data = data.filter(a =>
        _takeLastNHours(current, moment(a.last_datetime))
      );
    }

    return data;
  };
}
