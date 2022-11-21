import Vue from "vue";
import Vuex, { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import { ArticlesModule } from "./articles-module";
import { AuthModule } from "./auth-module";
import { GitHubModule } from "./github-module";
import { WebSocketsModule } from "./ws-module";

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = new Vuex.Store<any>({});

export default store;
export * from './state';

let authModule: AuthModule;
let articlesModule: ArticlesModule;
let webSocketsModule: WebSocketsModule;
let gitHubModule: GitHubModule

export function initializeModules(store: Store<any>): void {
  // authModule = getModule(AuthModule, store);
  // webSocketsModule = getModule(WebSocketsModule, store);
  // articlesModule = getModule(ArticlesModule, store);
  // gitHubModule = getModule(GitHubModule, store);
}
