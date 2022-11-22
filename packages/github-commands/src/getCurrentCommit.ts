//import { Octokit } from 'octokit';
import { Octokit } from "https://cdn.skypack.dev/octokit";

//TODO: convert to Command
export const getCurrentCommit = async (
  github: Octokit,
  owner: string,
  repo: string,
  branch: string = 'main'
) => {
  const { data: refData } = await github.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  })
  const commitSha = refData.object.sha
  const { data: commitData } = await github.rest.git.getCommit({
    owner,
    repo,
    commit_sha: commitSha,
  })
  return {
    commitSha,
    treeSha: commitData.tree.sha,
  }
}
