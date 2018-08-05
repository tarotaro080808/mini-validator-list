import { injectable, inject } from "inversify";
import "reflect-metadata";
import {
  IConfiguration,
  Lib,
  Cache,
  ICacheManagerFactory,
  ICacheManager,
  IGoogleService,
  IIntervalManager
} from "../types";
import * as moment from "moment";
import { TYPES } from "../inversify.types";

type AvailableTypes = any;

@injectable()
export default class GoogleAnalyticsService implements IGoogleService {
  private _cacheManager: ICacheManager<AvailableTypes>;

  constructor(
    @inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger,
    @inject(TYPES.Configuration) private _configuration: IConfiguration,
    @inject(TYPES.CacheManagerFactory)
    private _cacheManagerFactory: ICacheManagerFactory,
    @inject(TYPES.Lib.GoogleApi)
    private _googleQueierPromise: Promise<Lib.Google.IApi>,
    @inject(TYPES.IntervalManager) private _intervalManger: IIntervalManager
  ) {
    this._cacheManager = this._cacheManagerFactory.create(_logger);
    this._startIntervalFetchAll();
    this._startInitialFetchAll();
  }

  private _startIntervalFetchAll() {
    const interval = this._configuration.getGAFetchInterval();
    this._intervalManger.createInterval(
      "gaFetch",
      () => this._fetchReport(),
      interval
    );
  }

  private async _startInitialFetchAll() {
    this._fetchReport();
  }

  private async _fetchReport() {
    this._cacheManager.set(Cache.TYPES.GOOGLE_REFERRALS, async () => {
      const res = await (await this._googleQueierPromise).reports.batchGet({
        requestBody: {
          reportRequests: [
            {
              viewId: this._configuration.getGAViewId(),
              dateRanges: [
                {
                  startDate: "2018-01-01",
                  endDate: moment(new Date()).format("YYYY-MM-DD")
                }
              ],
              dimensions: [
                {
                  name: "ga:fullReferrer"
                }
              ]
            }
          ]
        }
      });

      const excludeRegex = this._configuration.getGAExcludedReferrerDomainsRegex();

      // sort
      const list = res.data.reports[0].data.rows.reduce((prev, curr) => {
        const fullReferrer = curr.dimensions[0];
        const domain = fullReferrer.split("/")[0];
        const views = parseInt(curr.metrics[0].values[0]);
        const url = `https://${fullReferrer}`;
        const title = fullReferrer
          .replace(domain, "")
          .replace(/[-_\/]{1,}/gi, " ")
          .trim();

        // check if the referrer has dot (.)
        if (domain.indexOf(".") < 0) {
          return prev;
        }

        // check if it is listed in excluded domains
        if (excludeRegex.exec(domain)) {
          return prev;
        }

        // exclude top page referrals
        if (fullReferrer.replace(domain, "") === "/") {
          return prev;
        }

        if (!prev[domain]) {
          prev[domain] = [];
        }
        prev.push({ fullReferrer, domain, views, url, title });
        return prev;
      }, []);

      const sortByViews = (a, b) => {
        return -1 * (a.views > b.views ? 1 : a.views < b.views ? -1 : 0);
      };

      list.sort(sortByViews);

      return Promise.resolve(list);
    });
  }

  async getReferrals(): Promise<Cache.IDataCache<Lib.Google.IApiResponse[]>> {
    await this._cacheManager.waitFor(Cache.TYPES.GOOGLE_REFERRALS);
    return this._cacheManager.get<Lib.Google.IApiResponse[]>(
      Cache.TYPES.GOOGLE_REFERRALS
    );
  }
}
