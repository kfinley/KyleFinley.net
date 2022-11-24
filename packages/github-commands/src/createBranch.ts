import { Container, injectable } from 'inversify-props';
import { Command } from '@kylefinley.net/commands/src';
// import { Octokit } from '@octokit/core';
// import { getCurrentCommit } from './getCurrentCommit';
import GitHubCommand from './GitHubCommand';
import { GetCurrentCommit } from './getCurrentCommit';

export interface CreateBranchRequest {
  access_token: string;
  owner: string;
  repo: string;
  parentBranch: string;
  name: string;
  // container: Container;
}

export interface CreateBranchResponse {
  name: string;
}

@injectable()
export class CreateBranch extends GitHubCommand implements Command<CreateBranchRequest, CreateBranchResponse> {

  async runAsync(params: CreateBranchRequest): Promise<CreateBranchResponse> {

    console.log('CreateBranch', params);

    var cmd = new GetCurrentCommit();
    cmd.runAsync({
      owner: params.owner,
      repo: params.repo,
      branch: params.parentBranch,
      access_token: params.access_token
    });

    // const octokit = new GitHub({
    //   log: console,
    //   // baseUrl,
    //   auth: params.access_token,
    //   // throttle: {
    //   //   onRateLimit: (retryAfter, options) => {
    //   //     console.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

    //   //     if (options.request.retryCount === 0) {
    //   //       // only retries once
    //   //       console.log(`Retrying after ${retryAfter} seconds!`)
    //   //       return true
    //   //     }
    //   //   },
    //   //   onAbuseLimit: (_, options) => {
    //   //     // does not retry, only logs a warning
    //   //     console.warn(`Abuse detected for request ${options.method} ${options.url}`)
    //   //   },
    //   // },
    // });


    //const latestCommit = await getCurrentCommit(owner, repoName);
    //console.log('latestCommit', latestCommit);

    // octokit.rest.git.createRef({

    // })

    return {
      name: 'foo' //latestCommit.commitSha
    }
  }

}
