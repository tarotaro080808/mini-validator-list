import { localStorageService } from "./localStorageService";
import { res } from "../resources";

class InternationalizationService {
  private _availableLanguages = { en: "English", ja: "日本語" };

  getAvailableLanguages = () => this._availableLanguages;

  setLanguage = (lang: string) => {
    localStorageService.setAppData({ lang: lang });
  };

  isLanguageSet = () => {
    return !!localStorageService.getAppData().lang;
  };

  translate = (resource: string, params?: { [key: string]: string }) => {
    const lang = localStorageService.getAppData().lang;
    return resource[lang] || resource["en"];
  };
}

const i18nService = new InternationalizationService();

const t = i18nService.translate;

export { i18nService, t, res };
