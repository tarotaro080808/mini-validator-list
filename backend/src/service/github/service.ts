import "reflect-metadata";
import { injectable, inject, TYPES } from "../../inversify";
import { IGitHubService } from "../types";
import { GitHubClient, ILogger, ILoggerFactory } from "../../lib/types";

const fileNameRegexp = new RegExp(/^index\..*\.json$/);
const dateRegexp = new RegExp(/index\.([\d-]{1,})\.json/);

const isDefaultUnlFile = file => {
  return !!fileNameRegexp.exec(file.name);
};

const getDate = file => {
  const match = dateRegexp.exec(file.name);
  if (match.length > 1) {
    return match[1];
  }
  return "";
};

@injectable()
export default class GitHubService implements IGitHubService {
  private _logger: ILogger;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) _loggerFactory: ILoggerFactory,
    @inject(TYPES.Lib.GitHubClient) private _githubClient: GitHubClient
  ) {
    this._logger = _loggerFactory.create("Service.GitHubService");
  }

  getDefaultUnlArchives = async () => {
    this._logger.info(`Fetching archives from GitHub page...`);

    const res = await this._githubClient.repos.getContent({
      owner: "ripple",
      repo: "vl",
      path: ""
    });
    const data = res.data.filter(isDefaultUnlFile).map(file => {
      return {
        name: file.name,
        url: file.download_url,
        date: getDate(file)
      };
    });
    return data;
  };
}
