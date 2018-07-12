export type HashMap<TType> = { [key: string]: TType };

export type DefaultUnlRawResponse = {
  blob: string;
};

export type ValidatorRawResponse = {
  domain: string;
  domain_state: string;
  validation_public_key: string;
}[];

export type RippleValidatorList = {
  lastUpdated: Date;
  list: {
    pubkey: string; 
    domain: string;
    verified: boolean;
    default: boolean;
  }[];
};

export interface IProcessEnv extends HashMap<string> {}

export interface IConfiguration {
  getFetchInterval(): number;
  getDefaultUNLsURL(): string;
  getValidatorsURL(): string;
  getPort(): number;
}

export interface IQuerier {
  getDefaultUnl(): Promise<DefaultUnlRawResponse>;
  getValidators(): Promise<ValidatorRawResponse>;
}

export interface IService {
  get(): Promise<RippleValidatorList>;
}

export interface ICrypto {
  parseDefaultUNLResponse: (
    defaultUNLResponse: DefaultUnlRawResponse
  ) => string[];
}
