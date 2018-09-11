import "reflect-metadata";
import { injectable } from "../../inversify";
import { ILoggerFactory, ILogger } from "../types";

import * as winston from "winston";

class Logger implements ILogger {
  constructor(private _name: string, private _logger: winston.Logger) {}

  info = (message: string) => {
    this._logger.info(message, { name: this._name });
  };

  error = (message: string) => {
    this._logger.error(message, { name: this._name });
  };

  warn = (message: string) => {
    this._logger.warn(message, { name: this._name });
  };
}

@injectable()
export default class LoggerFactory implements ILoggerFactory {
  private _logger: winston.Logger;

  constructor() {
    const transports: any[] = [];
    this._addConsoleLogging(transports);
    this._logger = winston.createLogger({
      transports: transports
    });
  }

  private _addConsoleLogging(transports: any[]) {
    transports.push(new winston.transports.Console());
  }

  create = (name: string) => {
    return new Logger(name, this._logger);
  };
}
