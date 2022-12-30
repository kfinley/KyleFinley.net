import Vue from "vue";
import { Module, Action, getModule } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { GitHubState, Status } from './state'
import { container } from '@/inversify.config';
import { CreateBranch } from '@kylefinley.net/github-commands/src';
import { AuthModule } from './auth-module'

@Module({ namespaced: true, name: 'GitHub' })
export class GitHubModule extends BaseModule implements GitHubState {
  sources: Record<string, string> = {};
  status: Status = Status.None
  @Action
  async createBranch(params: { vue: Vue }) {

    const authModule = container.get<AuthModule>("AuthModule");
    const createBranchCommand = container.get<CreateBranch>("CreateBranch");

    try {

      //console.log('GetHubModule.createBranch', params);

      const response = createBranchCommand.runAsync({
        access_token: authModule.access_token,
        name: 'foo',
        owner: 'kfinley',
        parentBranch: 'heads/main',
        repo: 'KyleFinley.net'
      });

      //console.log('response', response);
    } catch (error) {
      console.log('ERROR', error);
    }
  }

  @Action
  async getSource(params: { path: string }) {

    this.context.commit('mutate',
      (state: GitHubState) => {
        state.status = Status.Loading
      });

    if (!this.sources[params.path]) {
      const data = await (await fetch(params.path)).json()
      this.context.commit('mutate',
        (state: GitHubState) => {
          state.sources[params.path] = data.content
        });
      this.context.commit('mutate',
        (state: GitHubState) => {
          state.status = Status.Loaded
        });
    }
  }
}

export const getGitHubModule = (vue: Vue) => getModule(GitHubModule, vue.$store);
