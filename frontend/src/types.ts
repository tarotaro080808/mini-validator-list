export interface ReactState {}

export interface ValidatorState extends ReactState {
  _validators: any[];
  filter: IFilter;
  filteredValidators: any[];
  filteredValidatorsForAutosuggest: any[];
  uniqueDomains: any[];
  ready: boolean;
}
export interface AnalyticsState extends ReactState {
  referres: any[];
  ready: boolean;
}

export interface ArchivesState extends ReactState {
  archives: any[];
  lastUpdated: Date;
  ready: boolean;
}

export interface Response<T> {
  list: T[];
  lastUpdated: Date;
}

export interface ValidatorList {
  domain: string;
}

export interface ReferralsList {}

export interface Archive {
  date: string;
  name: string;
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
