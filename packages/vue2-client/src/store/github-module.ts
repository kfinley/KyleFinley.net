import { getModule } from "vuex-module-decorators";
import { Module, Action } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { GitHubState, Status } from './state'
import { container } from '@/inversify.config';
import { CreateBranch } from '@kylefinley.net/github-commands/src';
import { authModule } from ".";

@Module({ namespaced: true, name: 'GitHub' })
export class GitHubModule extends BaseModule implements GitHubState {

  @Action
  async createBranch(params: {}) {
    const response = container.get<CreateBranch>("CreateBranch").runAsync({
      access_token: authModule.access_token,
      container,
      name: 'foo',
      owner: 'kfinley',
      parentBranch: 'main',
      repo: 'KyleFinley.net'
    });

    console.log('response', response);
  }
}

export const getGitHubModule = (vue: Vue) => getModule(GitHubModule, vue.$store);
