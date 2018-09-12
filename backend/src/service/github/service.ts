import "reflect-metadata";
import * as Octokit from "@octokit/rest";
import { injectable, inject, TYPES } from "../../inversify";
import { IGitHubService } from "../types";
import { ILogger, ILoggerFactory, IConfiguration } from "../../lib/types";

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
  private _githubClient: Octokit;

  constructor(
    @inject(TYPES.Lib.LoggerFactory) _loggerFactory: ILoggerFactory,
    @inject(TYPES.Lib.Configuration) private _configuration: IConfiguration
  ) {
    this._logger = _loggerFactory.create("Service.GitHubService");
    this._githubClient = this._createGitHubClient();
  }

  private _createGitHubClient = () => {
    const oktokit = new Octokit();
    const token = this._configuration.getGitHubPersonalToken();
    // using a token can increase the rate limit
    if (token) {
      oktokit.authenticate({
        type: "token",
        token: token
      });
      this._logger.info(`Authenticated with GitHub.`);
    }
    return oktokit;
  };

  getDefaultUnlArchives = async () => {
    this._logger.info(`getDefaultUnlArchives`);

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
