import { TYPES } from "./inversify";
import { container } from "./inversify/bootstrap";
import { IConfiguration, ILoggerFactory } from "./lib/types";
import Routes from "./api/routes";
import Server from "./lib/koa/server";

const config = container.get<IConfiguration>(TYPES.Lib.Configuration);
const logger = container
  .get<ILoggerFactory>(TYPES.Lib.LoggerFactory)
  .create("main");

process.on("uncaughtException", err => {
  logger.error("Caught exception: " + err);
});

Server("/api", config, logger, Routes(container));

logger.info(`app started listeninig on port ${config.getPort()}...`);
