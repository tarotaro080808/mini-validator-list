export interface ReactState {}

export interface ValidatorState extends ReactState {
  _validators: any[];
  filteredValidators: any[];
  filteredValidatorsForAutosuggest: any[];
  uniqueDomains: any[];
  ready: boolean;
}

export interface Response<T> {
  list: T[];
  lastUpdated: Date;
}

export interface ValidatorList {
  domain: string;
}

export interface GeoList {
  domain: string;
}

export interface IFilter {
  defaultOnly: boolean;
  verifiedOnly: boolean;
  mainNetOnly: boolean;
  sort: boolean;
  filterWord: string;
}
