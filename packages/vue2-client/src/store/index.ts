import Vue from "vue";
import Vuex, { Store } from "vuex";
// import { getModule, VuexModule } from "vuex-module-decorators";
// import { AuthModule } from './auth-module';
// import { ArticlesModule } from './articles-module';
// import { WebSocketsModule } from './ws-module';
// import BaseModule from './base-module';

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = new Vuex.Store<any>({});

export default store
export * from './state'
// export { getArticlesModule } from './articles-module'
// export * from './ws-module';

// let authModule: AuthModule;
// let articlesModule: ArticlesModule;
// let webSocketsModule: WebSocketsModule;

// export function initializeModules(store: Store<any>): void {
//   // webSocketsModule = getModule(WebSocketsModule, store);
//   // authModule = getModule(AuthModule, store);
//   // articlesModule = getModule(ArticlesModule, store);
// }

// export { authModule, articlesModule, webSocketsModule }


