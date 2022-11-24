import Vue from "vue";
import { Module, Action, getModule } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { GitHubState } from './state'
import { container } from '@/inversify.config';
import { CreateBranch } from '@kylefinley.net/github-commands/src';
import { AuthModule } from './auth-module'

@Module({ namespaced: true, name: 'GitHub' })
export class GitHubModule extends BaseModule implements GitHubState {

  @Action
  async createBranch(params: { vue: Vue }) {

    const authModule = container.get<AuthModule>("AuthModule");
    const createBranchCommand = container.get<CreateBranch>("CreateBranch");

    try {

      console.log('GetHubModule.createBranch', params);

      const response = createBranchCommand.runAsync({
        access_token: authModule.access_token,
        name: 'foo',
        owner: 'kfinley',
        parentBranch: 'heads/main',
        repo: 'KyleFinley.net'
      });

      console.log('response', response);
    } catch (error) {
      console.log('ERROR', error);
    }
  }
}

export const getGitHubModule = (vue: Vue) => getModule(GitHubModule, vue.$store);
