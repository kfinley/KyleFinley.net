import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = new Vuex.Store<any>({});

export default store
export * from './state'
export { getArticlesModule } from './articles-module'

