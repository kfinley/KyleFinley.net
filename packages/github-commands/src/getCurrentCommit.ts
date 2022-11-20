import { Octokit } from '@octokit/rest';

//TODO: convert to Command
export const getCurrentCommit = async (
  github: Octokit,
  owner: string,
  repo: string,
  branch: string = 'main'
) => {
  const { data: refData } = await github.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  })
  const commitSha = refData.object.sha
  const { data: commitData } = await github.git.getCommit({
    owner,
    repo,
    commit_sha: commitSha,
  })
  return {
    commitSha,
    treeSha: commitData.tree.sha,
  }
}
