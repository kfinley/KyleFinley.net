import Vue from "vue";
import { Module, Action, getModule } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { GitHubState } from './state'
import { container } from '@/inversify.config';
import { CreateBranch } from '@kylefinley.net/github-commands/src';
import { getAuthModule } from './auth-module'

@Module({ namespaced: true, name: 'GitHub' })
export class GitHubModule extends BaseModule implements GitHubState {

  @Action
  async createBranch(params: { vue: Vue }) {

    try {

      console.log('GetHubModule.createBranch', params);
      console.log('container', container);
      const authModule = getAuthModule(params.vue); // Hack...

      const cmd = container.get<CreateBranch>("CreateBranch");
      console.log('cmd', cmd);

      const response = cmd.runAsync({
        access_token: authModule.access_token,
        // container,
        name: 'foo',
        owner: 'kfinley',
        parentBranch: 'main',
        repo: 'KyleFinley.net'
      });

      console.log('response', response);
    } catch (error) {
      console.log('ERROR', error);
    }
  }
}

export const getGitHubModule = (vue: Vue) => getModule(GitHubModule, vue.$store);
