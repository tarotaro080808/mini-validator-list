import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../inversify.types";
import { Lib } from '../types';

import CacheManager from "./cacheManager";

@injectable()
export default class CacheManagerFactory {
  constructor(@inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger) {}
  create<TCacheType>() {
    return new CacheManager<TCacheType>(this._logger);
  }
}
