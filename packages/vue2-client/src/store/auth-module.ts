import { getModule } from "vuex-module-decorators";
import { Module, Action } from 'vuex-module-decorators';
import BaseModule from './base-module'
import { AuthState, Status } from './state'
import { getWSModule } from "@/store/ws-module";

@Module({ namespaced: true, name: 'Auth' })
export class AuthModule extends BaseModule implements AuthState {
  status: Status = Status.None
  access_token!: string

  @Action
  async authWithCode(params: { code: string, vue: Vue }) {

    const wsModule = getWSModule(params.vue); // Hack...
    wsModule.connect(params.code);

  }

  @Action
  token(params: { access_token: string }) {
    this.context.commit('mutate',
      (state: AuthState) => {
        state.access_token = params.access_token,
          state.status = Status.Authenticated
      });
  }
}

export const getAuthModule = (vue: Vue) => getModule(AuthModule, vue.$store);
