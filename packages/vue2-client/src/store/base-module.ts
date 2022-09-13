import { VuexModule, Mutation } from 'vuex-module-decorators';

export default class BaseModule extends VuexModule {

    @Mutation
    mutate<T>(mutation: (state: T) => void) {
        mutation((this as unknown as T));
    }

}
