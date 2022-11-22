import { Container, injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
// import { Octokit } from 'octokit';
import { Octokit } from "https://cdn.skypack.dev/octokit";
import { getCurrentCommit } from './getCurrentCommit';

export interface CreateBranchRequest {
  access_token: string;
  owner: string;
  repo: string;
  parentBranch: string;
  name: string;
  container: Container;
}

export interface CreateBranchResponse {
  name: string;
}

@injectable()
export class CreateBranch implements Command<CreateBranchRequest, CreateBranchResponse> {

  async runAsync(params: CreateBranchRequest): Promise<CreateBranchResponse> {

    console.log(params);

    const octokit = new Octokit({
      request: {
        fetch: window.fetch
      },
      log: console,
      // baseUrl,
      auth: params.access_token,
      // throttle: {
      //   onRateLimit: (retryAfter, options) => {
      //     console.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

      //     if (options.request.retryCount === 0) {
      //       // only retries once
      //       console.log(`Retrying after ${retryAfter} seconds!`)
      //       return true
      //     }
      //   },
      //   onAbuseLimit: (_, options) => {
      //     // does not retry, only logs a warning
      //     console.warn(`Abuse detected for request ${options.method} ${options.url}`)
      //   },
      // },
    });

    const owner = `kfinley` //TODO: fix this...
    const repoName = `kylefinley.net` //TODO: fix this...

    const latestCommit = await getCurrentCommit(octokit, owner, repoName);
    console.log('latestCommit', latestCommit);

    // octokit.rest.git.createRef({

    // })

    return {
      name: latestCommit.commitSha
    }
  }

}
