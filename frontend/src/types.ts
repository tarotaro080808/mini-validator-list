export enum AppMode {
  CURRENT_MODE = "CURRENT",
  ARCHIVE_MODE = "ARCHIVE"
}

export type ThemeType = "dark" | "light";

export type Language = "en" | "ja";

export type AppData = {
  themeType: ThemeType;
  lang: Language;
};

export namespace State {
  export type App = {
    themeType: ThemeType;
    lang: Language;
  };
  export type Validator = {
    _validators: any[];
    filter: IFilter;
    filteredValidators: any[];
    filteredValidatorsForAutosuggest: any[];
    uniqueDomains: any[];
    archives: any[];
    selectedDefaultUnlId: undefined;
  };
  export type Analytics = {
    referres: any[];
    ready: boolean;
  };
  export type ArchivesState = {
    archives: any[];
    lastUpdated: Date;
    ready: boolean;
  };
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
