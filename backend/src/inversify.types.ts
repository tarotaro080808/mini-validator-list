const TYPES = {
  Server: Symbol.for("Server"),
  Service: Symbol.for("Store"),
  Querier: Symbol.for("Querier"),
  Configuration: Symbol.for("Configuration"),
  ProcessEnv: Symbol.for("ProcessEnv"),
  Crypto: Symbol.for("Crypto"),
  Lib: {
    Koa: {
      App: Symbol.for("Lib.Koa.App"),
      Router: Symbol.for("Lib.Koa.Router")
    },
    Logger: Symbol.for("Logger")
  }
};

export { TYPES };
