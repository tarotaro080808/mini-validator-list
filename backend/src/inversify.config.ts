import { Container } from "inversify";
import { TYPES } from "./types";
import { IService, IConfiguration, IProcessEnv, ICrypto, IQuerier } from "./interfaces";
import Service from "./service";
import Configuration from "./configuration";
import Crypto from './crypto';
import Querier from './querier';

require('dotenv').config();

const myContainer = new Container();
myContainer.bind<IProcessEnv>(TYPES.ProcessEnv).toConstantValue(process.env);
myContainer.bind<ICrypto>(TYPES.Crypto).toConstantValue(new Crypto());
myContainer.bind<IQuerier>(TYPES.Querier).to(Querier);
myContainer.bind<IService>(TYPES.Service).to(Service);
myContainer.bind<IConfiguration>(TYPES.Configuration).to(Configuration);

export { myContainer };