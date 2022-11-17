import { getModule } from "vuex-module-decorators";
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { WebSocketsState, WebSocketsStatus } from './state';
import Sockette from 'sockette';
import { Socket } from '../types';
import BaseModule from "./base-module";

@Module({ namespaced: true, name: 'WebSockets' })
export class WebSocketsModule extends BaseModule implements WebSocketsState {
  status: WebSocketsStatus = WebSocketsStatus.None;

  socket!: Socket;

  //TODO: fix this...
  url: string = `${process.env.NODE_ENV === 'production' ? '6ii0i7gdbe.execute-api.us-east-1.amazonaws.com/v1' : 'localhost:3001'}`;

  protocol = `${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}`;

  @Action
  handleSocketMessage(ev: MessageEvent) {
    const { subject, message } = JSON.parse(ev.data);
    this.context.dispatch(subject, message, { root: true });
  };

  @Action
  handleSocketClose(ev: CloseEvent) {
    console.log('handleSocketClose', ev);
  }

  @Action
  connect(code: string) {

    const wsUrl = `${this.protocol}://${this.url}`;

    console.log(`connecting to socket: ${wsUrl}`);
    const socket = new Sockette(wsUrl, {
      protocols: code,
      onmessage: this.handleSocketMessage,
      // onreconnect?: (this: Sockette, ev: Event | CloseEvent) => any;
      // onmaximum?: (this: Sockette, ev: CloseEvent) => any;
      onclose: this.handleSocketClose,
      //  onerror?: (this: Sockette, ev: Event) => any;
      timeout: 60000,
      maxAttempts: -1 // -1 for testing b/c it turns of the auto-reconnect features of sockette
    });

    this.context.commit('mutate',
      (state: WebSocketsState) => state.socket = socket);
  }

}

export const getWSModule = (vue: Vue) => getModule(WebSocketsModule, vue.$store);
