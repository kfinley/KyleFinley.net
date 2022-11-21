import Vue, { PluginFunction, PluginObject } from "vue";
import { Store } from "vuex";
import router from "vue-router";
// import VuexPersist from "vuex-persist";
// import { initializeModules } from "@/store";
import bootstrapper from "@/bootstrapper";
import { ArticlesModule } from '../store/articles-module'
import { AuthModule } from '../store/auth-module'
import { WebSocketsModule } from "@/store/ws-module";
import { GitHubModule } from "@/store/github-module";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.scss";
// import { initializeModules } from "@/store";

export const setupModules = (store: Store<any>): void => {
  store.registerModule('Auth', AuthModule);
  store.registerModule('Articles', ArticlesModule);
  store.registerModule('WebSockets', WebSocketsModule);
  store.registerModule("GitHub", GitHubModule);

  //TODO: investigate. This blows things up...
  // initializeModules(store);
};

export interface ClientPlugin extends PluginObject<ClientPluginOptions> {
  install: PluginFunction<ClientPluginOptions>
}

export interface ClientPluginOptions {
  appName: string;
  router: router;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: Store<any>;
}

const plugin = {
  install(vue: typeof Vue, options?: ClientPluginOptions) {

    if (options !== undefined && options.router && options.store) {

      const appName = options.appName ?? "KyleFinley.net";

      bootstrapper(options.store);
      // setupModules(options.store);

      // setupValidation(extend);

      // router provided to add any plugin routes.
      // i.e. options.router.addRoutes(routes);

      // const vuexLocalStorage = new VuexPersist({
      //   key: appName, // The key to store the state on in the storage provider.
      //   storage: window.localStorage, // or window.sessionStorage or localForage
      //   // Function that passes the state and returns the state with only the objects you want to store.
      //   reducer: (state: { Notification: NotificationState, Registration: RegistrationState, User: UserState }) => ({
      //     User: {
      //       authTokens: state.User.authTokens,
      //       currentUser: state.User.currentUser
      //     }
      //   }),
      //   // Function that passes a mutation and lets you decide if it should update the state in localStorage.
      //   // filter: (mutation) => true
      // });

      // vuexLocalStorage.plugin(options.store);

    }
  },
};

export default plugin as ClientPlugin;
