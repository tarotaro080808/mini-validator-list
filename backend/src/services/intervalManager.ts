import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../inversify.types";

import { HashMap, Lib } from "../types";

@injectable()
export default class IntervalManager {
  private _keys: HashMap<NodeJS.Timer> = {};

  constructor(@inject(TYPES.Lib.Logger) protected _logger: Lib.ILogger) {}

  clearInterval(name: string) {
    if (this._keys[name]) {
      clearInterval(this._keys[name]);
    }
  }

  createInterval(name: string, action: () => void, interval: number) {
    this.clearInterval(name);
    this._keys[name] = setInterval(() => {
      action();
    }, interval);
  }
}
