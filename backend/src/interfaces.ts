export type HashMap<TType> = { [key: string]: TType };

export type DefaultUnlRawResponse = {
  blob: string;
};

export type ValidatorRawResponse = {
  domain: string;
  domain_state: string;
  validation_public_key: string;
}[];

export interface IDataCache<TCacheType> {
  lastUpdated: Date;
  list: TCacheType[];
}

export type RippleValidatorList = {
  pubkey: string;
  domain: string;
  verified: boolean;
  default: boolean;
};

export type GeoInfoList = Lib.IPStackResponse;

export interface IValidatorDataCache extends IDataCache<RippleValidatorList> {}

export interface IGeoDataCache extends IDataCache<GeoInfoList> {}

export type ResolveDnsResponse = {
  domain: string;
  ip: string;
};

export interface IProcessEnv extends HashMap<string> {}

export interface IConfiguration {
  getFetchInterval(): number;
  getGeoInfoFetchInterval(): number;
  getDefaultUNLsURL(): string;
  getValidatorsURL(): string;
  getIPStackFetchURL(): string;
  getIPStackApiKey(): string;
  getPort(): number;
  getExcludedDomains(): string[];
}

export interface IQuerier {
  getDefaultUnl(): Promise<DefaultUnlRawResponse>;
  getValidators(): Promise<ValidatorRawResponse>;
  getIpFromDomain(domain: string): Promise<ResolveDnsResponse>;
  getGeoInfo(ips: string[]): Promise<Lib.IPStackResponse>;
}

export interface IService {
  getValidatorInfo(): Promise<IValidatorDataCache>;
  getGeoInfo(): Promise<IGeoDataCache>;
}

export interface ICrypto {
  parseDefaultUNLResponse: (
    defaultUNLResponse: DefaultUnlRawResponse
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
}
