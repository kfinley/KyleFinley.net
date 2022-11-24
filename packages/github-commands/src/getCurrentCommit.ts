import { Command } from "@kylefinley.net/commands/src";
import GitHubCommand from "./GitHubCommand";

// Example of how to use @octokit as a reference for api params while
// building custom GitHub API. F12ing to RestEndpointMethodTypes shows
// the GH api urls.
// import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types";
// type getRef = RestEndpointMethodTypes["git"]["getRef"];

export interface GetCurrentCommitRequest {
  owner: string,
  repo: string,
  branch: string,
  access_token: string
}

export interface GetCurrentCommitResponse {

}

export class GetCurrentCommit
  extends GitHubCommand
  implements Command<GetCurrentCommitRequest, GetCurrentCommitResponse>{

  async runAsync(params: GetCurrentCommitRequest): Promise<GetCurrentCommitResponse> {

    var response = await this.getAsync(`/repos/${params.owner}/${params.repo}/git/ref/${params.branch}`, {
      Authorization: `Bearer ${params.access_token}`
    });

    const { data } = response;
    
    console.log(data);

    return {

    }

  }

}

//TODO: convert to Command
export const getCurrentCommit = async (
  // github: Octokit,
  owner: string,
  repo: string,
  branch: string = 'main'
) => {

  // const { data: refData } = await github.rest.git.getRef({
  //   owner,
  //   repo,
  //   ref: `heads/${branch}`,
  // })
  // const commitSha = refData.object.sha
  // const { data: commitData } = await github.rest.git.getCommit({
  //   owner,
  //   repo,
  //   commit_sha: commitSha,
  // })
  // return {
  //   commitSha,
  //   treeSha: commitData.tree.sha,
  // }
}
