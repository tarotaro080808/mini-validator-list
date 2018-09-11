export type HashMap<TType> = { [key: string]: TType };

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
  getGAExcludedReferralDomainsRegex(): RegExp;
  getGoogleJwtJsonFilePath(): string;
  isProduction(): boolean;
  getGitHubPersonalToken(): string;
}

export interface ILogger {
  info(message: string);
  warn(message: string);
  error(message: string);
}

export interface ILoggerFactory {
  create(name: string): ILogger;
}

export interface IWebClient {
  get: <T>(url: string) => Promise<T>;
}

export interface ICrypto {
  parseDefaultUNLBlob: (blob: string) => string[];
}

/**
 * API Handlers
 */
export type HandlerArgs<TParams, TQuery> = {
  params: TParams;
  query: TQuery;
};

export type Handler<TParams, TQuery, TData> = (
  args?: HandlerArgs<TParams, TQuery>
) => Promise<TData>;

export type Route = {
  method: string;
  path: string;
  handler: Function;
};

export interface IRoutes {
  get(): Route[];
}

export interface ICache {
  get: <TItem>(
    key: string,
    variant: string,
    setter: () => Promise<TItem>,
    interval: number
  ) => Promise<TItem>;
}

export enum Frequency {
  Often = 1000 * 60, // every 60 seconds
  Rarely = 1000 * 60 * 60 * 24, // every 24 hours
  Never = -1
}
