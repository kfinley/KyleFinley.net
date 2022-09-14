// Loaded once per application. Required for dependency injection
import "reflect-metadata";

import Vue, { PluginFunction, PluginObject } from "vue";
import { Store } from "vuex";
import router from "vue-router";
// import VuexPersist from "vuex-persist";
import { getModule } from 'vuex-module-decorators';
import { extend } from 'vee-validate';
// import { RouteNames } from "../router";
import { ArticlesModule } from '../store/articles-module'

import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.scss";

export const setupModules = (store: Store<any>): void => {
  store.registerModule("Articles", ArticlesModule)  
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

      // setupValidation(extend);
      setupModules(options.store);

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
