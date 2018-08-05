import { Logger } from "../node_modules/winston";
import Koa from "koa";
import Router from "koa-router";
import { analyticsreporting_v4 } from "../node_modules/googleapis";

export type HashMap<TType> = { [key: string]: TType };

export interface IThirdPartyLibFactory {
  createServer(): Lib.Koa.IServer;
  createRouter(): Lib.Koa.IRouter;
  createLogger(): Lib.ILogger;
  createGAReportingApi(): Promise<Lib.Google.IApi>;
}

export interface ICacheManagerFactory {
  create<TCacheType>(_logger: Lib.ILogger): ICacheManager<TCacheType>;
}

export interface IIntervalManager {
  clearInterval(name: string): void;
  createInterval(name: string, action: () => void, interval: number): void;
}

export interface ICacheManager<TCacheType> {
  get<TExtractCacheType extends TCacheType>(
    name: string
  ): Cache.IDataCache<TExtractCacheType>;
  set(name: string, action: () => Promise<TCacheType | TCacheType[]>): void;
  waitFor(name: string, who?: string): void;
}

export interface IServer {
  listen(): void;
}

export namespace Cache {
  export const TYPES = {
    RIPPLE_DEFAULT_UNL: "ripple.defaultUNL",
    RIPPLE_DAILY_REPORT: "ripple.reports",
    RIPPLE_VALIDATORS: "ripple.validators",
    GOOGLE_REFERRALS: "google.referrals",
    IPSTACK_GEO: "ipstack.geo",
    MERGED_DATA: "data.merged"
  };
  export interface IDataCache<TCacheType> {
    lastUpdated: Date;
    list: TCacheType[];
  }
  export type MergedDataCache = {
    pubkey: string;
    domain: string;
    is_ripple: boolean;
    verified: boolean;
    default: boolean;
    is_alt_net: boolean;
    agreement: number;
    disagreement: number;
    total_ledgers: number;
    city: string;
    country_name: string;
    region_name: string;
    latitude: number;
    longitude: number;
  };
}

export type ResolveDnsResponse = {
  domain: string;
  ip: string;
};

export interface IProcessEnv extends HashMap<string> {}

export interface IConfiguration {
  getFetchInterval(): number;
  getGeoInfoFetchInterval(): number;
  getGAFetchInterval(): number;
  getDefaultUNLsURL(): string;
  getValidatorsURL(): string;
  getValidatorDailyReportsURL(): string;
  getIPStackFetchURL(): string;
  getIPStackApiKey(): string;
  getPort(): number;
  getAltNetDomainsPattern(): RegExp;
  getGAViewId(): string;
  getGAExcludedReferrerDomainsRegex(): RegExp;
  getGoogleJwtJsonFilePath(): string;
}

export interface IQuerier {
  getDefaultUnl(): Promise<Lib.RippleData.DefaultUnlRawResponse>;
  getValidators(): Promise<Lib.RippleData.ValidatorRawResponse[]>;
  getValidatorDailyReports(): Promise<Lib.RippleData.DailyReportRawResponse[]>;
  getIpFromDomain(domain: string): Promise<ResolveDnsResponse>;
  getGeoInfo(ips: string[]): Promise<Lib.IPStackResponse>;
}

export interface IRippleService {
  getValidatorInfo(): Promise<Cache.IDataCache<Cache.MergedDataCache>>;
  getGeoInfo(): Promise<Cache.IDataCache<Lib.IPStackResponse>>;
}

export interface IGoogleService {
  getReferrals(): Promise<Cache.IDataCache<Lib.Google.IApiResponse[]>>;
}

export interface ICrypto {
  parseDefaultUNLResponse: (
    defaultUNLResponse: Lib.RippleData.DefaultUnlRawResponse
  ) => string[];
}

export namespace Lib {
  export type IPStackResponse = {
    domain?: string;
    ip: string;
    country_name: string;
    region_name: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  export namespace RippleData {
    export type DefaultUnlRawResponse = {
      blob: string;
    };
    export type ValidatorRawResponse = {
      domain: string;
      domain_state: string;
      validation_public_key: string;
    };
    export type DailyReportRawResponse = {
      validation_public_key: string;
      date: string;
      total_ledgers: number;
      main_net_agreement: string;
      main_net_ledgers: number;
      alt_net_agreement: string;
      alt_net_ledgers: number;
      other_ledgers: number;
      domain: string;
      domain_state: string;
      last_datetime: string;
      is_report_available: boolean;
    };
  }
  export interface ILogger extends Logger {}
  export namespace Koa {
    export interface IServer extends Koa {}
    export interface IRouter extends Router {}
  }
  export namespace Google {
    export type JwtJson = {
      web: {
        client_id: string;
        project_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_secret: string;
      };
    };
    export interface IApi extends analyticsreporting_v4.Analyticsreporting {}
    export interface IApiResponse {
      domain: string;
      referrers: { referrer: string; views: number }[];
    }
  }
}
