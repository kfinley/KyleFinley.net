import { getModule } from "vuex-module-decorators";
import { Module, Action } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { AuthState, Status } from './state'
import { ApiClient, apiClient } from "@/utils/apiClient";

@Module({ namespaced: true, name: 'Auth' })
export class AuthModule extends BaseModule implements AuthState {
  status: Status = Status.None
  client: ApiClient = new apiClient();

  @Action
  async codeForTokens(code: string) {

    console.log('codeForTokens')

    const api = new URL('/login/oauth/access_token', 'https://github.com')

    api.searchParams.set('client_id', import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID)
    api.searchParams.set('client_secret', import.meta.env.VITE_GITHUB_OAUTH_CLIENT_SECRET)
    api.searchParams.set('code', code)

    var response = await this.client.postAsync(api.toString(), {})

    console.log(response);

  }
}

export const getAuthModule = (vue: Vue) => getModule(AuthModule, vue.$store);
