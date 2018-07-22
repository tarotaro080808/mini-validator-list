import { myContainer } from "./inversify.config";
import { TYPES } from "./inversify.types";
import { IServer, Lib } from "./types";

const logger = myContainer.get<Lib.ILogger>(TYPES.Lib.Logger);
process.on("uncaughtException", err => {
  logger.error("Caught exception: " + err);
});

const server = myContainer.get<IServer>(TYPES.Server);
server.listen();
